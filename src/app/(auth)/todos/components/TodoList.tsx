'use client';

import LockIcon from '@/assets/lock.svg?react';
import EarthIcon from '@/assets/earth.svg?react';
import UserIcon from '@/assets/user.svg?react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useCallback, useState, useTransition } from 'react';
import { components } from '@/lib/apiClient/types/schema';

export const TodoList = ({
  initialTodos,
}: {
  initialTodos: components['schemas']['TaskResource'][];
}) => {
  const [todos, setTodos] = useState(initialTodos);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    startTransition(async () => {
      const res = await fetch('/api/todos');
      if (res.ok) {
        const data = await res.json();
        setTodos(data.tasks);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold">TODOリスト</h1>
      {isLoading ? (
        <p className="text-lg">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-lg">No tasks available</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <li key={todo.id} className="rounded border border-border p-2 text-lg">
              <Link
                href={`/todos/${todo.id}`}
                className="block rounded px-1 text-[blue] transition hover:bg-bg-base-hover dark:hover:bg-bg-base-hover-dark"
              >
                {todo.title}
              </Link>
              <p className="text-sm">{todo.description}</p>

              {!todo.is_public && (
                <p className="flex items-center gap-1 text-[blue]">
                  <LockIcon className="inline size-4" />
                  <span className="text-sm">Private</span>
                </p>
              )}

              {todo.is_public && (
                <p className="flex items-center gap-1 text-[green]">
                  <EarthIcon className="inline size-4" />
                  <span className="text-sm">Public</span>
                </p>
              )}

              <p className="flex items-center gap-1 text-sm">
                <UserIcon className="inline size-4" />
                {todo.created_user.name} が作成
              </p>

              <p className="flex items-center gap-1 text-sm text-[blue]">
                <UserIcon className="inline size-4" />
                担当者：
                {todo.assigned_users.length === 0 && 'なし'}
                {todo.assigned_users.map((user) => user.name).join(', ')}
              </p>

              <p className="text-sm">
                期限：
                {todo.expired_at ? dayjs(todo.expired_at).format('YYYY年MM月DD日 HH:mm') : 'なし'}
              </p>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleRefresh}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        disabled={isPending || isLoading}
      >
        {isPending || isLoading ? 'Refreshing...' : 'Refresh'}
      </button>
      <p className="mt-2 text-sm text-gray-500">
        {isPending || isLoading ? 'Loading tasks...' : `Total tasks: ${todos.length}`}
      </p>
    </div>
  );
};
