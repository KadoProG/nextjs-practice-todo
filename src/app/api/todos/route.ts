import { apiClient } from '@/lib/apiClient';
import { getAccessToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { response, data } = await apiClient.GET('/v1/tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: response.status });
  }
  if (!data?.tasks) {
    return NextResponse.json({ error: 'No tasks found' }, { status: 404 });
  }
  return NextResponse.json({ tasks: data.tasks }, { status: 200 });
}
