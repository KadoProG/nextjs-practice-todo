import { paths } from '@/lib/apiClient/types/schema';
import createClient from 'openapi-fetch';
import { safeEnv } from '@/lib/env';

export const apiClient = createClient<paths>({
  baseUrl: `${safeEnv.API_BASE_URL}`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
