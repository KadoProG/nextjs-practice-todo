if (process.env.API_BASE_URL === undefined) {
  throw new Error('API_BASE_URL is not defined in the environment variables');
}

export const safeEnv = {
  /** バックエンドの API URL */
  API_BASE_URL: process.env.API_BASE_URL,
};
