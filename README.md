# 犬类驱虫查询 | Canine Parasite Finder

双语 React/Vite 静态网站，用于犬类寄生虫科普、常见驱虫药覆盖谱查询、成分机制说明和安全提示。

## 本地运行

```bash
npm install
npm run dev
```

构建生产版本：

```bash
npm run build
```

## 发送给其他人

这个项目是静态网站。运行 `npm run build` 后，`dist/` 目录可以部署到任何静态托管服务。

推荐方式：

- GitHub Pages：把仓库推到 GitHub，进入仓库 Settings -> Pages，Source 选择 GitHub Actions。之后每次推送到 `main` 分支都会自动部署。
- Netlify：登录 Netlify，把 `dist/` 文件夹拖到 Deploy 页面即可生成公网链接。
- Vercel：导入仓库，Framework Preset 选择 Vite，Build Command 为 `npm run build`，Output Directory 为 `dist`。

## 内容边界

本网站仅用于科普和查询，不提供剂量计算、诊断或处方建议。实际用药应按当地产品标签、犬只体重年龄限制、检测结果和兽医建议执行。
