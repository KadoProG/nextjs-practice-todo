'use client';

import { useTodoList } from '@/app/todos/lib/useTodoList';

export const TodoList = () => {
  const { isLoading, todos, mutate } = useTodoList();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">TODOリスト</h1>
        {isLoading ? (
          <p className="text-lg">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="text-lg">No tasks available</p>
        ) : (
          <ul className="list-disc pl-5">
            {todos.map((todo) => (
              <li key={todo.id} className="text-lg">
                {todo.title}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => mutate()}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Refresh
        </button>
        <p className="mt-2 text-sm text-gray-500">
          {isLoading ? 'Loading tasks...' : `Total tasks: ${todos.length}`}
        </p>
      </div>
    </div>
  );
};
