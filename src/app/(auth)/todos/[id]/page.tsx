import { apiClient } from '@/lib/apiClient';
import { TodoDetail } from './components/TodoDetail';
import { getAccessToken } from '@/lib/auth';
import { notFound } from 'next/navigation';

const getTodo = async (id: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error('Failed to Token');

  const { response, data } = await apiClient.GET('/v1/tasks/{task}', {
    params: {
      path: {
        task: parseInt(id, 10),
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch todo');
  }

  return data?.task;
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params; // why: https://qiita.com/na--san/items/944fbd935563be7ce7ea
  const todo = await getTodo(id);
  return <TodoDetail initialTodo={todo} />;
}
