import Link from 'next/link';

const homeLinks: { label: string; href: string }[] = [
  { label: 'TODOリスト（HOME画面）', href: '/todos' },
  { label: 'ログイン画面', href: '/login' },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-2 border border-border p-2">
        <h1 className="text-3xl font-bold">TODOアプリ</h1>
        <p className="text-lg">Next.js + Tailwind CSS + TypeScript</p>
        <p>
          バックエンドは
          <a
            href="https://github.com/KadoProG/laravel-todo-app-v2"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Laravel
          </a>
          を使用する。そのうちNext.jsのAPIモードを使用してバックエンドも実施してみたい気持ち。
        </p>
      </div>
      <h2 className="text-2xl font-bold">画面リスト</h2>
      <ul className="flex flex-col gap-2">
        {homeLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex gap-2 border border-border p-2 hover:bg-bg-base-hover"
            >
              {link.label}
              <span className="rounded-full bg-bg-second px-2 group-hover:bg-bg-second-hover">
                {link.href}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
