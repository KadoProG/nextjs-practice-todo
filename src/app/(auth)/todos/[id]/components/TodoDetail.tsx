'use client';

import LockIcon from '@/assets/lock.svg?react';
import EarthIcon from '@/assets/earth.svg?react';
import UserIcon from '@/assets/user.svg?react';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { components } from '@/lib/apiClient/types/schema';

type TaskResource = components['schemas']['TaskResource'];

export const TodoDetail = ({ initialTodo }: { initialTodo: TaskResource | undefined }) => {
  const { id } = useParams();
  const [todo, setTodo] = useState<TaskResource | undefined>(initialTodo);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodo = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/todos/${id}`);
      if (res.ok) {
        const data = await res.json();
        setTodo(data.task);
      }
    } catch (error) {
      console.error('Failed to fetch todo:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-6">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="flex flex-col gap-4 p-6">
        <p className="text-lg">Todo not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold">{todo.title}</h1>

      <div className="flex flex-col gap-2 rounded border border-border p-4">
        <p className="text-lg">{todo.description || 'No description'}</p>

        <div className="flex items-center gap-2">
          {!todo.is_public ? (
            <p className="flex items-center gap-1 text-[blue]">
              <LockIcon className="inline size-4" />
              <span className="text-sm">Private</span>
            </p>
          ) : (
            <p className="flex items-center gap-1 text-[green]">
              <EarthIcon className="inline size-4" />
              <span className="text-sm">Public</span>
            </p>
          )}
          <p className="text-sm">Status: {todo.is_done ? 'Completed' : 'In Progress'}</p>
        </div>

        <p className="flex items-center gap-1 text-sm">
          <UserIcon className="inline size-4" />
          Created by: {todo.created_user.name}
        </p>

        <p className="flex items-center gap-1 text-sm">
          <UserIcon className="inline size-4" />
          Assigned to:{' '}
          {todo.assigned_users.length === 0
            ? 'None'
            : todo.assigned_users.map((user) => user.name).join(', ')}
        </p>

        <p className="text-sm">
          Due date:{' '}
          {todo.expired_at ? dayjs(todo.expired_at).format('YYYY年MM月DD日 HH:mm') : 'None'}
        </p>

        <div className="flex flex-col gap-1 text-sm text-gray-500">
          <p>Created: {dayjs(todo.created_at).format('YYYY年MM月DD日 HH:mm')}</p>
          <p>Updated: {dayjs(todo.updated_at).format('YYYY年MM月DD日 HH:mm')}</p>
        </div>
      </div>

      <button
        onClick={fetchTodo}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? 'Refreshing...' : 'Refresh'}
      </button>
    </div>
  );
};
