# X-Trending [中文说明-README_ZH.md](https://github.com/scottkiss/x-trending/blob/main/README_ZH.md)

A simple archival tool for daily trending topics on X (Twitter), organized by category and date. Built with Next.js.

## Features

- **Category Support**: Organize content into different topics (e.g., AI, Web3).
- **Date-based Archive**: View content by specific dates.
- **Clean UI**: Simple card-based layout to visualize tweets.

## Data Management

The content is strictly file-based and located in the `data` directory.

### Directory Structure

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

### How to Add Content

1.  **Create a Category**: Create a new folder inside the `data` directory. The folder name will become the category name (e.g., `data/design`).

2.  **Add Date File**: Inside the category folder, create a text file named with the date (format: `YYYY-MM-DD.txt`).

3.  **Add Links**: Paste X (Twitter) URLs into the text file, one link per line.

    Example content for `data/ai/2025-12-17.txt`:

    ```text
    https://twitter.com/user1/status/1234567890
    https://twitter.com/user2/status/0987654321
    ```

## Local Development

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

