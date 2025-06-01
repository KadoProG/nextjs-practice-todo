export const originFetch: typeof fetch = (input, init) => {
  const token = ''; // TODO
  const request = fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }).then((res) => res.clone());

  return request;
};
