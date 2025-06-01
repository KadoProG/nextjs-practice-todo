import { apiClient } from '@/lib/apiClient';
import { safeEnv } from '@/lib/apiClient/env';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  console.log('Login attempt:', { email, password });
  console.log(safeEnv.API_BASE_URL);
  try {
    const { response, data } = await apiClient.POST('/v1/login', {
      body: {
        email,
        password,
      },
    });
    if (!response.ok) {
      return NextResponse.json({ error: 'Login failed' }, { status: 401 });
    }
    if (!data?.token) {
      console.error('No token received from login');
      return NextResponse.json({ error: 'No token received' }, { status: 500 });
    }

    // CookieにトークンをHttpOnlyで保存
    const cookie = await cookies();
    cookie.set('access_token', data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60, // 1時間
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
