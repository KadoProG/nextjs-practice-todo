import { apiClient } from '@/lib/apiClient';
import { getAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function GuestLayout({ children }: { children: React.ReactNode }) {
  const token = await getAccessToken();

  if (token) {
    const res = await apiClient.GET('/v1/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.response.ok) {
      redirect('/todos'); // 認証済ユーザーは /home にリダイレクト
    }
  }

  return <>{children}</>;
}
