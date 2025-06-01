# TODO APP Frontend (Next.js)

Next.js でフロントエンドを作成。

- [React Version](https://github.com/KadoProG/todo-frontend-react-v2)
- [バックエンド Laravel](https://github.com/KadoProG/todo-frontend-react-v2)

## 起動方法

```shell
cp .env.example .env
npm ci
npm run dev
```

## ログ

- Next.js には **中間API** という概念があり、クライアントコンポーネントから API Router を叩き、API Router が本物のバックエンドを叩くというもの
  - `メリット` バックエンドのURLが公開されないからセキュリティ的に強くなる
  - `メリット` Cookie で認証情報を保持し、same origin 等の設定ができるため、XSS攻撃にも強くなる
  - `デメリット` 実質２個 API の fetch を記述する必要があり、開発者の負担が大きい
    - 特に最初から CSRF-TOKEN などがバックエンド側から付与される場合は過剰性能疑惑がある

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
