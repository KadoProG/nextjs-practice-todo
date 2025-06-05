import { apiClient } from '@/lib/apiClient';
import { getAccessToken } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { response, data } = await apiClient.GET('/v1/tasks/{task}', {
    params: {
      path: {
        task: parseInt(params.id, 10),
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: response.status });
  }

  if (!data?.task) {
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }

  return NextResponse.json({ task: data.task }, { status: 200 });
}
