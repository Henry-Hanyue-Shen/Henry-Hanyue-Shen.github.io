import { deadlineInstant, openDeadlines, matches, makeCalendar } from './core.mjs?v=20261015-1';

const $ = selector => document.querySelector(selector);
const node = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
};
function link(label, url) {
  const a = node('a', '', label);
  if (/^https?:\/\//.test(url)) { a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  return a;
}
function button(label, action, className = '') {
  const b = node('button', className, label); b.type = 'button'; b.addEventListener('click', action); return b;
}
const saved = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
let data, filters, view, selectedMonth, zone, clock = Date.now();
const ranks = ['A*','A','B','C','unranked'];
const views = ['deadlines','calendar','venues','journals'];
const browserZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
const fmt = (instant, options) => new Intl.DateTimeFormat('en-US', {timeZone:zone,...options}).format(instant);
const dateOnly = text => new Date(`${text}T12:00:00Z`);
const calendarDate = text => new Intl.DateTimeFormat('en-US', {month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).format(dateOnly(text));
const keyDate = instant => {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(instant).map(p=>[p.type,p.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
};
function eventDates(e) {
  if (!e.start) return 'Dates to be announced';
  return e.end && e.end !== e.start ? `${calendarDate(e.start)} – ${calendarDate(e.end)}` : calendarDate(e.start);
}
function badges(parent, e) {
  if (e.core) { const badge = node('span', `rank${e.core === 'A*' ? ' top' : ''}`,e.core); badge.title = `CORE rank ${e.core}`; parent.append(badge); }
  if (e.confirmed === false) parent.append(node('span','estimate','estimated'));
  if (e.isNew) parent.append(node('span','estimate','new'));
}
function identity(e) {
  const box = node('div','venue-identity');
  const name = node('span','venue-name',e.edition || e.name); badges(name,e); box.append(name);
  box.append(node('span','venue-full',e.full));
  box.append(node('div','tags',e.areas.map(a=>data.areas[a]?.short || a).join(' · ')));
  return box;
}
function download(editions) {
  const count = editions.reduce((n,e)=>n+openDeadlines(e,clock).length,0);
  if (!count) { $('#export-status').textContent = 'No future submission deadlines match these filters.'; return; }
  const url = URL.createObjectURL(new Blob([makeCalendar(editions,clock)],{type:'text/calendar;charset=utf-8'}));
  const a = node('a'); a.href = url; a.download = 'research-deadlines.ics'; document.body.append(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),10000);
  $('#export-status').textContent = `${count} deadlines exported. Import the file into your calendar.`;
}
function detailPanel(e) {
  const panel = node('div','entry-details');
  if (e.deadlines.length) {
    const table = node('table','detail-table');
    const head = node('thead'); const tr = node('tr');
    for (const heading of ['Milestone','As listed by venue',`Time in ${zone}`]) tr.append(node('th','',heading));
    head.append(tr); table.append(head); const tbody = node('tbody');
    for (const d of [...e.deadlines].sort((a,b)=>deadlineInstant(a)-deadlineInstant(b))) {
      const instant = deadlineInstant(d); const row = node('tr',instant <= clock ? 'closed' : '');
      row.append(node('td','',`${d.label}${instant <= clock ? ' · passed' : ''}`),node('td','',`${d.date} ${d.time || ''} ${d.tz}`),node('td','',fmt(instant,{year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'})));
      tbody.append(row);
    }
    table.append(tbody); panel.append(table);
  }
  panel.append(node('p','detail-status',e.confirmed ? 'Listed dates. Check the venue website for the latest submission details.' : 'Estimated schedule. These dates are provisional and may change.'));
  const links = node('div','detail-links'); links.append(link('Venue website ↗',e.url));
  if (e.source && e.source !== e.url) links.append(link(e.confirmed ? 'Submission information ↗' : 'Previous schedule ↗',e.source));
  if (openDeadlines(e,clock).length) links.append(button('Add deadlines to calendar ↓',()=>download([e])));
  panel.append(links); return panel;
}
function countdown(instant) {
  const hours = (instant-clock)/3600000;
  if (hours < 1) return `${Math.max(1,Math.ceil(hours*60))} min left`;
  if (hours < 48) return `${Math.ceil(hours)} hours left`;
  return `in ${Math.floor(hours/24)} days`;
}
function empty() {
  const box = node('div','empty'); box.append(node('h2','','No matching results'),node('p','','Try another search or broaden your filters.'),button('Reset filters',reset,'text-button')); return box;
}
function renderDeadlines(editions) {
  const rows = editions.map(e=>({e,open:openDeadlines(e,clock)})).filter(x=>x.open.length).sort((a,b)=>deadlineInstant(a.open[0])-deadlineInstant(b.open[0]));
  $('#result-count').textContent = `${rows.length} open calls · ${rows.reduce((n,r)=>n+r.open.length,0)} upcoming deadlines`;
  let month = ''; const fragment = document.createDocumentFragment();
  for (const {e,open} of rows) {
    const instant = deadlineInstant(open[0]); const group = fmt(instant,{month:'long',year:'numeric'});
    if (month !== group) { fragment.append(node('h2','month-heading',group)); month=group; }
    const details = node('details','entry'); details.id = e.id;
    const summary = node('summary');
    const date = node('div','deadline-date',fmt(instant,{month:'short',day:'numeric'}));
    date.append(node('span','deadline-time',fmt(instant,{weekday:'short',hour:'numeric',minute:'2-digit'})),node('span','countdown',countdown(instant)));
    const info = identity(e); info.append(node('span','expand-hint','Details +'));
    const milestones = node('div','milestones');
    for (const d of open.slice(0,3)) { const span=node('span','',`${d.label} · ${fmt(deadlineInstant(d),{month:'short',day:'numeric'})}`); span.title=`${d.date} ${d.time || ''} ${d.tz}`; milestones.append(span); }
    if(open.length>3) milestones.append(node('span','small',`+${open.length-3} more`));
    const event=node('div','event-meta',eventDates(e)); if(e.location) event.append(node('em','',e.location));
    summary.append(date,info,milestones,event); details.append(summary,detailPanel(e)); fragment.append(details);
  }
  $('#stage').replaceChildren(rows.length ? fragment : empty());
}
function renderVenues(editions) {
  const grouped=new Map();
  for(const e of editions) { if(!grouped.has(e.name)) grouped.set(e.name,[]); grouped.get(e.name).push(e); }
  $('#result-count').textContent=`${grouped.size} venues · ${editions.length} editions`;
  const fragment=document.createDocumentFragment();
  for(const [name,list] of [...grouped].sort((a,b)=>a[0].localeCompare(b[0]))) {
    list.sort((a,b)=>(a.start || a.edition).localeCompare(b.start || b.edition)); const first=list[0];
    const article=node('article','directory-entry');
    const heading=node('h2'); heading.append(link(name,first.url)); badges(heading,{core:first.core}); article.append(heading);
    article.append(node('p','venue-full',first.full),node('p','tags',first.areas.map(a=>data.areas[a]?.label || a).join(' · ')));
    const editionsList=node('div','edition-list');
    for(const e of list) {
      const line=node('div','edition-line'); line.append(link(e.edition,e.url));
      line.append(node('span','',`${eventDates(e)}${e.location ? ` · ${e.location}` : ''}${e.confirmed ? '' : ' · estimated'}`));
      editionsList.append(line);
    }
    article.append(editionsList); fragment.append(article);
  }
  $('#stage').replaceChildren(grouped.size ? fragment : empty());
}
function renderJournals(journals) {
  $('#result-count').textContent=`${journals.length} journals`;
  const fragment=document.createDocumentFragment();
  for(const j of [...journals].sort((a,b)=>a.name.localeCompare(b.name))) {
    const article=node('article','directory-entry'); const h=node('h2'); h.append(link(j.name,j.url)); badges(h,j); article.append(h);
    article.append(node('p','venue-full',j.full),node('p','tags',j.areas.map(a=>data.areas[a]?.label || a).join(' · ')),node('p','journal-meta',`${j.publisher}${j.since ? ` · Since ${j.since}` : ''}`));
    article.append(node('p','journal-meta',`${j.submission} · ${j.openAccess ? 'Open access' : 'Check access options with publisher'}`));
    const links=node('div','detail-links'); links.append(link('Journal website ↗',j.url)); article.append(links); fragment.append(article);
  }
  $('#stage').replaceChildren(journals.length ? fragment : empty());
}
function renderCalendar(editions) {
  const [year,month]=selectedMonth.split('-').map(Number); const monthStart=`${selectedMonth}-01`;
  const days=new Date(Date.UTC(year,month,0)).getUTCDate(); const monthEnd=`${selectedMonth}-${days}`;
  const events=[];
  for(const e of editions) {
    for(const d of e.deadlines.filter(d=>d.primary)) {
      const instant=deadlineInstant(d); const date=keyDate(instant);
      if(date>=monthStart && date<=monthEnd) events.push({date,end:date,e,label:d.label,instant,conference:false});
    }
    if(e.start && e.start<=monthEnd && (e.end || e.start)>=monthStart) events.push({date:e.start,end:e.end || e.start,e,label:e.location || 'Conference',conference:true});
  }
  events.sort((a,b)=>a.date.localeCompare(b.date)||a.e.name.localeCompare(b.e.name));
  $('#result-count').textContent=`${events.filter(e=>!e.conference).length} deadlines · ${events.filter(e=>e.conference).length} events this month`;
  const toolbar=node('div','calendar-toolbar'); toolbar.append(node('h2','',new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric',timeZone:'UTC'}).format(dateOnly(monthStart))));
  const controls=node('div','calendar-controls');
  function move(offset) { selectedMonth=new Date(Date.UTC(year,month-1+offset,1)).toISOString().slice(0,7); syncUrl(); render(); }
  const prev=button('←',()=>move(-1));prev.setAttribute('aria-label','Previous month');
  const next=button('→',()=>move(1));next.setAttribute('aria-label','Next month');
  controls.append(prev,button('Today',()=>{selectedMonth=keyDate(clock).slice(0,7);syncUrl();render();}),next);toolbar.append(controls);
  const grid=node('div','calendar-grid');grid.setAttribute('aria-label','Monthly calendar');
  for(const day of ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']) grid.append(node('div','weekday',day));
  const offset=(dateOnly(monthStart).getUTCDay()+6)%7;
  for(let i=0;i<offset;i++) grid.append(node('div','calendar-day outside'));
  for(let day=1;day<=days;day++) {
    const date=`${selectedMonth}-${String(day).padStart(2,'0')}`;const cell=node('div',`calendar-day${date===keyDate(clock)?' today':''}`);cell.append(node('span','day-number',day));
    for(const event of events.filter(e=>e.conference ? date>=e.date && date<=e.end : e.date===date)) {
      const a=node('span',`calendar-event${event.conference?' conference-event':''}`,event.e.name);
      a.title=`${event.e.edition} · ${event.label}${event.e.confirmed?'':' · estimated'}`;cell.append(a);
    }
    grid.append(cell);
  }
  for(let i=(offset+days)%7;i>0 && i<7;i++) grid.append(node('div','calendar-day outside'));
  const legend=node('p','calendar-legend');legend.append(node('span','','Maroon: submission deadline'),' · Grey: conference dates. Full details below.');
  const agenda=node('ul','agenda');
  for(const event of events) {
    const row=node('li'); const date=node('time','',event.conference ? `${calendarDate(event.date)}${event.end!==event.date?' – '+calendarDate(event.end):''}` : fmt(event.instant,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}));date.dateTime=event.date;
    const info=node('div');info.append(link(event.e.edition,event.e.url),node('span','agenda-kind',`${event.label}${event.e.confirmed?'':' · estimated'}${!event.conference && event.instant<clock?' · passed':''}`));row.append(date,info);agenda.append(row);
  }
  $('#stage').replaceChildren(toolbar,grid,legend,events.length?agenda:node('p','small','No matching deadlines or conferences in this month.'));
}
function render() {
  clock=Date.now();
  const editions=data.editions.filter(e=>matches(e,filters));
  document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));
  $('#edition-options').hidden=view==='journals';$('#export').hidden=view==='journals';$('#timezone').hidden=view==='journals'||view==='venues';
  $('#export').disabled=!editions.some(e=>openDeadlines(e,clock).length);
  if(view==='deadlines') renderDeadlines(editions);
  else if(view==='venues') renderVenues(editions);
  else if(view==='journals') renderJournals(data.journals.filter(j=>matches(j,filters)));
  else renderCalendar(editions);
}
function syncUrl() {
  const params=new URLSearchParams();params.set('view',view);
  if(filters.q)params.set('q',filters.q);
  if(filters.areas.length!==Object.keys(data.areas).length)params.set('areas',filters.areas.join(','));
  if(filters.ranks.length!==ranks.length)params.set('ranks',filters.ranks.join(','));
  if(!filters.estimated)params.set('estimated','0');
  if(filters.industry)params.set('industry','1');
  if(view==='calendar')params.set('month',selectedMonth);
  params.set('tz',zone);
  history.replaceState(null,'',`${location.pathname}?${params}`);
  save('conference-filters-v1',filters);save('conference-zone',zone);
}
function checkbox(text, checked, change, count) {
  const label=node('label','check');const input=node('input');input.type='checkbox';input.checked=checked;
  input.addEventListener('change',()=>change(input.checked));label.append(input,node('span','area-name',text));if(count!==undefined)label.append(node('span','area-count',count));return label;
}
function update(){syncUrl();render();$('#export-status').textContent='';}
function filterControls() {
  $('#rank-filters').replaceChildren(...ranks.map(rank=>checkbox(rank,filters.ranks.includes(rank),checked=>{filters.ranks=checked?[...filters.ranks,rank]:filters.ranks.filter(r=>r!==rank);update();})));
  const groups=document.createDocumentFragment();
  for(const group of data.groups) {
    const areaKeys=Object.keys(data.areas).filter(key=>data.areas[key].group===group);const field=node('fieldset');const legend=node('legend','group-heading');legend.append(node('span','',group));
    const actions=node('span','group-actions');
    for(const [text,include] of [['All',true],['None',false]]) { const b=button(text,()=>{filters.areas=filters.areas.filter(a=>!areaKeys.includes(a));if(include)filters.areas.push(...areaKeys);filterControls();update();});b.setAttribute('aria-label',`${text} ${group} areas`);actions.append(b); }
    legend.append(actions);field.append(legend);
    for(const key of areaKeys) {
      const count=new Set(data.editions.filter(e=>e.areas.includes(key)&&e.type!=='event').map(e=>e.name)).size;
      field.append(checkbox(data.areas[key].label,filters.areas.includes(key),checked=>{filters.areas=checked?[...filters.areas,key]:filters.areas.filter(a=>a!==key);update();},count));
    }
    groups.append(field);
  }
  $('#area-filters').replaceChildren(groups);$('#estimated').checked=filters.estimated;$('#industry').checked=filters.industry;$('#search').value=filters.q;
}
function reset(){filters={q:'',areas:Object.keys(data.areas),ranks:[...ranks],estimated:true,industry:false};filterControls();update();}
function init() {
  const params=new URLSearchParams(location.search);const stored=saved('conference-filters-v1');
  const explicit=[...params.keys()].some(k=>['view','q','areas','ranks','estimated','industry'].includes(k));
  filters={q:'',areas:Object.keys(data.areas),ranks:[...ranks],estimated:true,industry:false};
  if(!explicit && stored && typeof stored.q==='string' && Array.isArray(stored.areas) && Array.isArray(stored.ranks)) filters={...filters,...stored};
  if(params.has('q'))filters.q=params.get('q');
  if(params.has('areas'))filters.areas=params.get('areas').split(',').filter(a=>a in data.areas);
  if(params.has('ranks'))filters.ranks=params.get('ranks').split(',').filter(a=>ranks.includes(a));
  if(params.has('estimated'))filters.estimated=params.get('estimated')!=='0';
  if(params.has('industry'))filters.industry=params.get('industry')==='1';
  view=views.includes(params.get('view'))?params.get('view'):'deadlines';
  zone=params.get('tz')||saved('conference-zone')||browserZone;
  try { new Intl.DateTimeFormat('en-US',{timeZone:zone}).format(); } catch { zone=browserZone; }
  selectedMonth=/^\d{4}-(0[1-9]|1[0-2])$/.test(params.get('month')||'')?params.get('month'):keyDate(clock).slice(0,7);
  filterControls();
  const zoneSelect=node('select');zoneSelect.setAttribute('aria-label','Display time zone');
  for(const z of new Set([zone,browserZone,'America/New_York','America/Los_Angeles','Europe/London','Asia/Shanghai','UTC'])) {const option=node('option','',z.replaceAll('_',' '));option.value=z;zoneSelect.append(option);}
  zoneSelect.value=zone;zoneSelect.addEventListener('change',()=>{zone=zoneSelect.value;update();});$('#timezone').append('Times in',zoneSelect);
  $('#search').addEventListener('input',()=>{filters.q=$('#search').value;update();});
  $('#estimated').addEventListener('change',()=>{filters.estimated=$('#estimated').checked;update();});
  $('#industry').addEventListener('change',()=>{filters.industry=$('#industry').checked;update();});
  $('#reset').addEventListener('click',reset);
  $('#filters').addEventListener('submit',e=>e.preventDefault());
  $('#export').addEventListener('click',()=>download(data.editions.filter(e=>matches(e,filters))));
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.view;update();}));
  $('#snapshot-date').textContent=`Dataset snapshot: ${calendarDate(data.snapshotDate)}.`;
  const mobile=matchMedia('(max-width: 800px)');
  $('.filter-drawer').open=!mobile.matches;
  mobile.addEventListener('change',event=>{$('.filter-drawer').open=!event.matches;});
  syncUrl();render();
  setInterval(()=>{if(view==='deadlines' && !document.querySelector('.entry[open]'))render();},60000);
}
function setTheme() {
  const dark=document.documentElement.dataset.theme==='dark';$('#theme').setAttribute('aria-label',`Switch to ${dark?'light':'dark'} mode`);$('#theme').textContent=dark?'☼':'◐';
}
$('#theme').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('conference-theme',theme);}catch{}setTheme();});setTheme();
fetch('./data.json?v=20261015-1').then(response=>{if(!response.ok)throw new Error('Dataset unavailable');return response.json();}).then(json=>{data=json;init();}).catch(()=>{$('#result-count').textContent='Directory unavailable';$('#stage').replaceChildren(node('p','','The conference data could not be loaded. Please refresh this page.'));$('#export').disabled=true;});
