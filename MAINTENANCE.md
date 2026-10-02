# 个人学术主页维护说明

- 网站：https://henry-hanyue-shen.github.io/
- 源码仓库：https://github.com/Henry-Hanyue-Shen/Henry-Hanyue-Shen.github.io
- 部署状态：https://github.com/Henry-Hanyue-Shen/Henry-Hanyue-Shen.github.io/actions

这是一个普通静态网站。日常修改可以直接在 GitHub 网页中完成，不需要安装开发工具。

## 1. 在 GitHub 上修改

1. 登录 `Henry-Hanyue-Shen`，打开下面对应的编辑链接。
2. 修改需要更新的内容。
3. 点击 **Commit changes**，填写简单说明，例如 `Update research interests`。
4. 选择提交到 **main** 分支，再确认提交。提交到 `main` 的内容会公开，并触发网站重新部署。
5. 在 **Actions** 中查看最新部署。成功后刷新网站；如仍看到旧内容，可用 `Ctrl+F5` 强制刷新。GitHub 提示发布可能需要最多约 10 分钟。

也可以先创建分支，在合并到 `main` 后再发布。只在本地保存文件不会更新公开网站。

## 2. 添加或修改 Updates（动态）

[直接编辑 news-data.js](https://github.com/Henry-Hanyue-Shen/Henry-Hanyue-Shen.github.io/edit/main/news-data.js)

页面上的栏目名是 **Updates**，内容存放在 `news-data.js`。普通动态只需具体日期和正文，也可以添加链接。例如：

```js
window.PROFILE_NEWS = [
  {
    date: "2026-10-01",
    text: "在这里写真实的动态内容。",
    url: "https://example.com/",
    linkText: "Details"
  },
  {
    date: "2026-09-24",
    text: "另一条不带链接的动态。"
  }
];
```

上面只是格式示例，请替换成真实的日期、内容和链接。

- `date` 使用 `YYYY-MM-DD`，例如 `2026-10-01`，页面按相同格式显示年月日。填写实际报告日期或收到通知的日期，不用整个会议的起止日期代替。旧的 `YYYY-MM` 格式仍可使用；确实不知道哪一天时，不要编造日期。
- `text` 是动态正文，支持中文和英文。网站当前正文为英文，可保持一致。
- `inlineLinks` 可以给正文中的名字添加链接。例如 `inlineLinks: [{ text: "Lfff09", url: "https://github.com/Lfff09" }],` 会把正文中第一次出现的 `Lfff09` 变成可点击链接。不需要时可省略。
- `url` 是完整的 `https://...` 链接；`linkText` 是显示文字，例如 `Paper`、`Slides` 或 `Details`。不需要链接时可以省略这两项。
- 日期会自动从新到旧排序。同一天有多条时，按文件中的先后顺序显示。不同日期的报告分别建立动态，例如现有的两条 FEDSM 报告。
- 每条记录用 `{ ... }` 包裹，记录之间加逗号。保留最外层的 `window.PROFILE_NEWS = [ ... ];`。
- 正文中的英文双引号写成 `\"`，或者改用弯引号 `“ ”`，避免破坏字符串格式。
- 修改动态：直接修改相应记录。删除动态：删除该记录。清空列表后显示 `No updates yet.`。

### 为会议动态整理论文和链接

会议动态可以分为会议标题、发表状态、论文和资料链接。将下面这样的记录添加到现有 `window.PROFILE_NEWS` 数组中，记得在相邻记录之间加逗号：

```js
{
  date: "2026-10-01",
  title: "Conference name",
  conferenceUrl: "https://example.com/conference",
  text: "在这里说明报告情况和真实的发表状态。",
  papers: [
    {
      title: "Paper title",
      reference: "可选的论文编号",
      resources: [
        { label: "Paper record", url: "https://example.com/paper" },
        { label: "Presentation slides (PDF)", url: "https://example.com/slides.pdf" }
      ]
    }
  ]
}
```

- `title` 是会议或动态标题；`conferenceUrl` 会在标题旁显示 `Conference program` 链接，填写列有自己论文名称的官方分会场、议程或论文详情页。不需要的字段可以省略。
- `text` 用于正文或发表状态。论文尚未出版时应保留 `pending publication`，正式出版后再修改。
- `papers` 中每个 `{ ... }` 对应一篇论文。同一天的多篇论文可以放在同一条动态中，每篇都有自己的 `title` 和资料链接。
- `reference` 是可选的论文编号。已注册 DOI 的论文可另加 `doi: "该论文的 DOI 编号",`；只填编号，不填 `https://doi.org/`，网页会自动生成可见链接。
- `resources` 中每个 `{ label, url }` 是一个链接。`label` 为显示文字，`url` 为完整网址。它既可以属于某篇论文，也可以直接属于整条动态。
- 论文还可以添加 `text` 和 `inlineLinks`，例如现有 AGU 条目的合作者说明及 GitHub 链接。
- 只发一条简短动态时，继续使用前面的简单格式即可，无需填写论文结构。

修改这些内容后，日期列、标题和链接的排版会自动保持一致，不需要编辑 HTML 或 CSS。

### 为动态附上 PDF

1. 打开仓库的 [assets 文件夹](https://github.com/Henry-Hanyue-Shen/Henry-Hanyue-Shen.github.io/tree/main/assets)，选择 **Add file → Upload files**，上传 PDF 并提交到 `main`。使用简洁的英文文件名。
2. 在对应动态或论文的 `resources` 中添加 `{ label: "文件说明 (PDF)", url: "https://henry-hanyue-shen.github.io/assets/文件名.pdf" }`。使用简单格式的动态也可以继续填写 `url` 和 `linkText`。
3. 提交动态，等待部署成功后，打开网站上的文件链接确认。

例如，本次 AGU26 文件的地址是 `https://henry-hanyue-shen.github.io/assets/agu26-invitation-2070697.pdf`。附件会公开，链接文字应准确说明文件类型。

## 3. 修改简介、研究方向和联系方式

[直接编辑 index.html](https://github.com/Henry-Hanyue-Shen/Henry-Hanyue-Shen.github.io/edit/main/index.html)

使用编辑器搜索定位对应位置：

| 要修改的内容 | 搜索关键词 |
| --- | --- |
| 姓名、页面标题 | `Hanyue Shen` 或 `<title>` |
| 头像旁的学校、专业和身份 | `class="affiliation"` |
| About Me 简介 | `class="biography"` |
| 研究方向 | `id="interests"` |
| 研究条目 | `id="research"` |
| 软件工具列表 | `id="software"` |
| 联系方式 | `id="contact"` |

修改 HTML 标签之间的文字即可。修改链接时，将 `href="..."` 内的网址一起更新。邮箱在头像下方和 Contact 中都有使用；更换邮箱时搜索旧邮箱，更新所有出现的位置。简介有重大变化时，也更新页面顶部的 `meta name="description"`。

## 4. 新增研究条目

在 `index.html` 中找到 `id="research"`，复制一个完整的 `<article class="research-entry"> ... </article>`，放到该区域内，然后替换标题、类型、介绍和链接：

```html
<article class="research-entry">
  <h3>研究或论文标题</h3>
  <p class="work-type">Manuscript / Conference / Research project</p>
  <p>简要介绍这项工作。</p>
  <p class="resource-links">
    <a href="https://example.com/">Paper and code</a>
  </p>
</article>
```

按实际状态填写稿件、项目或发表信息。页面按文件中的顺序显示研究条目。

## 5. 更换照片或调整外观

- 照片：将新照片以 `assets/portrait.jpg` 路径上传并提交，保持文件名和 JPG 格式一致。可在仓库首页使用 **Add file → Upload files**，上传含该文件的 `assets` 文件夹；提交前确认路径。若改用 PNG 等其他格式，需同步修改 `index.html` 中图片的 `src`。
- 字体、颜色、宽度和留白：编辑 [styles.css](https://github.com/Henry-Hanyue-Shen/Henry-Hanyue-Shen.github.io/edit/main/styles.css)。例如顶部的 `--link` 控制链接颜色，`--measure` 控制正文最大宽度，`--section-gap` 控制桌面端栏目间距。正文使用 `text-align: justify` 两端对齐，并启用英文自动断词；段落末行保持自然长度。
- 动态的显示逻辑位于 `news.js`，正常添加动态时不需要修改。

## 6. 本地修改与发布

首次下载源码：

```powershell
git clone https://github.com/Henry-Hanyue-Shen/Henry-Hanyue-Shen.github.io.git
cd Henry-Hanyue-Shen.github.io
```

开始新一轮修改前先执行 `git pull --ff-only`，避免覆盖在 GitHub 网页上做的更新。若提示本地已有改动，应先保留并处理这些改动。

本地预览可直接打开 `index.html`；也可运行：

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

然后访问 `http://127.0.0.1:8765/`。修改并检查后，在另一个终端中提交实际改过的文件，例如：

```powershell
git add news-data.js index.html
git commit -m "Update academic homepage"
git push origin main
```

## 7. 修改后没有生效或改错了

- 先确认修改已提交到 `main`，再检查 Actions 最新部署是否成功。
- 部署成功但仍看到旧内容时，等待几分钟，再使用 `Ctrl+F5` 或无痕窗口查看。
- 动态突然消失时，检查 `news-data.js` 的逗号、双引号、括号和日期格式，日期必须真实存在。本地可以运行 `node --check news-data.js` 检查语法（需要 Node.js）。
- 需要恢复某个文件时，打开该文件的 **History**，找到之前版本，将旧内容复制回当前文件并提交。使用新提交恢复即可，无需重写 Git 历史。

GitHub 官方参考：[Pages 快速入门](https://docs.github.com/en/pages/quickstart)。
