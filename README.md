# 徐艺丹｜个人介绍网页

一套无需安装 Node.js、无需构建的纯静态个人网页，可直接部署到 GitHub Pages。

## 文件结构

```text
xuyidan-notebook-portfolio/
├─ index.html       # 页面结构与内容
├─ styles.css       # 样式与响应式布局
├─ script.js        # 页面交互（提示卡、轻微视差、提示音）
├─ .nojekyll        # GitHub Pages 配置文件
└─ README.md        # 部署说明
```

## 上传到 GitHub Pages

1. 新建一个 GitHub 仓库，例如 `xuyidan-portfolio`。
2. 将此文件夹内的所有文件上传到仓库**根目录**。不要把文件再套进一层文件夹。
3. 进入仓库的 **Settings → Pages**。
4. 在 **Build and deployment** 中选择：
   - Source：`Deploy from a branch`
   - Branch：`main`
   - Folder：`/(root)`
5. 点击 **Save**，等待约 1–3 分钟即可获得网站链接。

如果 GitHub 用户名为 `your-name`，仓库名为 `xuyidan-portfolio`，常见访问地址为：

```text
https://your-name.github.io/xuyidan-portfolio/
```

## 修改个人信息

打开 `index.html`，搜索对应文字即可修改：

- 姓名与学校信息：搜索 `徐艺丹` 或 `广东工业大学`
- 兴趣与技能：搜索 `我喜欢` 与 `我擅长`
- 联系方式：搜索 `987052134@QQ.COM` 与 `13320654546`

## 页面特点

- 原创“手账纸张 + 轻松互动”视觉风格
- 大字标题、便利贴信息卡、纸张纹理、涂鸦小物
- 点击云朵、相机、火箭、兴趣与技能标签会出现小提示
- 邮箱和电话可直接点击联系
- 支持手机、平板与桌面端
- 无需本地服务器或安装依赖

## 注意

页面使用 Google Fonts；如果访问环境无法加载 Google 服务，浏览器会自动使用系统中文字体，页面仍可正常显示。
