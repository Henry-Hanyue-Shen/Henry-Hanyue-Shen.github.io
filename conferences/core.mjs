// Date and calendar helpers shared by the page and its deterministic checks.
export function deadlineInstant(deadline) {
  const zoneText = deadline.tz || 'AoE';
  const embedded = zoneText.match(/^(\d{1,2}:\d{2})\s+/);
  const time = deadline.time || embedded?.[1] || '23:59';
  const seconds = deadline.time || embedded ? '00' : '59';
  const wall = Date.parse(`${deadline.date}T${time.padStart(5, '0')}:${seconds}Z`);
  const zone = zoneText.replace(/^\d{1,2}:\d{2}\s+/, '');
  const fixed = { AoE: -12, UTC: 0, PST: -8, PDT: -7 };
  if (zone in fixed) return wall - fixed[zone] * 3600000;
  const iana = { PT: 'America/Los_Angeles', ET: 'America/New_York', CET: 'Europe/Berlin' }[zone];
  if (!iana || !Number.isFinite(wall)) throw new Error(`Unsupported deadline: ${JSON.stringify(deadline)}`);
  const format = new Intl.DateTimeFormat('en-CA', { timeZone: iana, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
  let utc = wall;
  for (let i = 0; i < 3; i++) {
    const parts = Object.fromEntries(format.formatToParts(utc).map(p => [p.type,p.value]));
    const represented = Date.UTC(+parts.year,+parts.month-1,+parts.day,+parts.hour,+parts.minute,+parts.second);
    utc += wall - represented;
  }
  return utc;
}
export function openDeadlines(edition, now = Date.now()) {
  return edition.deadlines.filter(d => d.primary && deadlineInstant(d) > now).sort((a,b) => deadlineInstant(a)-deadlineInstant(b));
}
export function matches(item, filters) {
  return `${item.name} ${item.full} ${item.edition || ''} ${item.location || ''} ${item.publisher || ''}`.toLowerCase().includes(filters.q.trim().toLowerCase());
}
const icsEscape = value => String(value).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
const utcStamp = ms => new Date(ms).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z/,'Z');
function foldLine(line) {
  const encoder = new TextEncoder(); let bytes = 0; let output = '';
  for (const char of line) { const size = encoder.encode(char).length; if (bytes + size > 75) { output += '\r\n '; bytes = 1; } output += char; bytes += size; }
  return output;
}
export function makeCalendar(editions, now = Date.now()) {
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Hanyue Shen//Conference Calendar//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:Research deadlines'];
  for (const e of editions) for (const d of openDeadlines(e, now)) {
    const start = deadlineInstant(d);
    lines.push('BEGIN:VEVENT',`UID:${e.id}-${d.date}-${encodeURIComponent(d.label)}@henry-hanyue-shen.github.io`,`DTSTAMP:${utcStamp(now)}`,`DTSTART:${utcStamp(start)}`,`DTEND:${utcStamp(start+60000)}`,`SUMMARY:${icsEscape(`${e.edition}: ${d.label}${e.confirmed ? '' : ' (estimated)'}`)}`,`DESCRIPTION:${icsEscape(`${e.full}\nOriginal deadline: ${d.date} ${d.time || ''} ${d.tz}\n${e.confirmed ? 'Listed date. Check the official website for changes.' : 'Estimated date; not yet confirmed.'}`)}`,`URL:${e.url}`,'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.map(foldLine).join('\r\n')+'\r\n';
}
