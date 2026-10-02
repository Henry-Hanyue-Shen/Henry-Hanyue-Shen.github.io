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

页面上的栏目名是 **Updates**，内容存放在 `news-data.js`。每条动态有月份、正文和可选链接。例如：

```js
window.PROFILE_NEWS = [
  {
    date: "2026-10",
    text: "在这里写真实的动态内容。",
    url: "https://example.com/",
    linkText: "Details"
  },
  {
    date: "2026-09",
    text: "另一条不带链接的动态。"
  }
];
```

上面只是格式示例，请替换成真实的月份、内容和链接。

- `date` 使用 `YYYY-MM`，例如 `2026-10`，页面会显示为 `10.2026`。
- `text` 是动态正文，支持中文和英文。网站当前正文为英文，可保持一致。
- `inlineLinks` 可以给正文中的名字添加链接。例如 `inlineLinks: [{ text: "Lfff09", url: "https://github.com/Lfff09" }],` 会把正文中第一次出现的 `Lfff09` 变成可点击链接。不需要时可省略。
- `url` 是完整的 `https://...` 链接；`linkText` 是显示文字，例如 `Paper`、`Slides` 或 `Details`。不需要链接时可以省略这两项。
- 月份会自动从新到旧排序。同一个月有多条时，按文件中的先后顺序显示。
- 每条记录用 `{ ... }` 包裹，记录之间加逗号。保留最外层的 `window.PROFILE_NEWS = [ ... ];`。
- 正文中的英文双引号写成 `\"`，或者改用弯引号 `“ ”`，避免破坏字符串格式。
- 修改动态：直接修改相应记录。删除动态：删除该记录。清空列表后显示 `No updates yet.`。

### 为动态附上 PDF

1. 打开仓库的 [assets 文件夹](https://github.com/Henry-Hanyue-Shen/Henry-Hanyue-Shen.github.io/tree/main/assets)，选择 **Add file → Upload files**，上传 PDF 并提交到 `main`。使用简洁的英文文件名。
2. 在动态的 `url` 中填写 `https://henry-hanyue-shen.github.io/assets/文件名.pdf`，把 `linkText` 写成文件说明，例如 `AGU invitation letter (PDF)`。
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
- 字体、颜色、宽度和留白：编辑 [styles.css](https://github.com/Henry-Hanyue-Shen/Henry-Hanyue-Shen.github.io/edit/main/styles.css)。例如顶部的 `--link` 控制链接颜色，`--measure` 控制正文最大宽度。
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
- 动态突然消失时，检查 `news-data.js` 的逗号、双引号、括号和月份格式。本地可以运行 `node --check news-data.js` 检查语法（需要 Node.js）。
- 需要恢复某个文件时，打开该文件的 **History**，找到之前版本，将旧内容复制回当前文件并提交。使用新提交恢复即可，无需重写 Git 历史。

GitHub 官方参考：[Pages 快速入门](https://docs.github.com/en/pages/quickstart)。
