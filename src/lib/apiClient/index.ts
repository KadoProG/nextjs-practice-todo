import { paths } from '@/lib/apiClient/types/schema';
import createClient from 'openapi-fetch';
import { originFetch } from '@/lib/apiClient/originFetch';
import { safeEnv } from '@/lib/apiClient/env';

export const apiClient = createClient<paths>({
  baseUrl: `${safeEnv.API_BASE_URL}`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  fetch: originFetch,
});
