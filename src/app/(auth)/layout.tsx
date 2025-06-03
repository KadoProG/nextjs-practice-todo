import { apiClient } from '@/lib/apiClient';
import { getAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const token = await getAccessToken();

  const res = await apiClient.GET('/v1/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.response.ok) {
    redirect('/login'); // 認証済ユーザーは /home にリダイレクト
  }

  return <>{children}</>;
}
