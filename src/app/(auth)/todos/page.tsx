import { apiClient } from '@/lib/apiClient';
import { TodoList } from './components/TodoList';
import { getAccessToken } from '@/lib/auth';

const getTodos = async () => {
  const token = await getAccessToken();
  if (!token) throw new Error('Failed to Token');

  const { response, data } = await apiClient.GET('/v1/tasks', {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  return data?.tasks ?? [];
};

export default async function Page() {
  const todos = await getTodos();
  return <TodoList initialTodos={todos} />;
}
