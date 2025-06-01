import { cookies } from 'next/headers';

export const originFetch: typeof fetch = async (input, init) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value ?? null;
  const request = fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...init?.headers,
    },
    credentials: 'include',
  }).then((res) => res.clone());

  return request;
};
