import { components } from '@/lib/apiClient/types/schema';
import { useRouter } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';

export const useTodoList = () => {
  const router = useRouter();
  const { isLoading, data, mutate } = useSWR(
    '/api/todos',
    () =>
      fetch('/api/todos').then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            router.replace('/login');
            return;
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json() as Promise<{ tasks: components['schemas']['TaskResource'][] }>;
      }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const todos = React.useMemo(() => data?.tasks ?? [], [data]);

  return {
    isLoading,
    todos,
    mutate,
  };
};
