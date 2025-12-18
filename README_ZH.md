# X-Trending / 每日热点归档

一个用于归档和查看 X (Twitter) 每日热点的简单工具，支持按类别和日期组织内容。基于 Next.js 构建。

## 功能

- **分类支持**：将内容按不同主题（如 AI, Web3）分类。
- **按日期归档**：查看特定日期的内容。
- **简洁界面**：简单的卡片式布局展示推文。

## 数据管理

内容完全基于文件管理，位于 `data` 目录下。

### 目录结构

```text
data/
  ├── ai/
  │   ├── 2025-12-16.txt
  │   └── 2025-12-17.txt
  ├── web3/
  │   └── 2025-12-17.txt
  └── general/
      └── 2025-12-17.txt
```

### 如何添加内容

1.  **创建分类**：在 `data` 目录下创建一个新文件夹。文件夹名称将成为分类名称（例如 `data/design`）。

2.  **添加日期文件**：在分类文件夹内，创建一个以日期命名的文本文件（格式：`YYYY-MM-DD.txt`）。

3.  **添加链接**：将 X (Twitter) 的链接粘贴到文本文件中，每行一个链接。

    `data/ai/2025-12-17.txt` 内容示例：

    ```text
    https://twitter.com/user1/status/1234567890
    https://twitter.com/user2/status/0987654321
    ```

## 本地开发

首先，安装依赖：

```bash
npm install
```

然后，运行开发服务器：

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 部署到 Vercel

最简单的方式是使用 [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) 从 Next.js 的创作者部署您的 Next.js 应用。

查看 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying) 获取更多详细信息。
