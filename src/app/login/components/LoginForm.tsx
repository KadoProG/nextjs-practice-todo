'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useCallback, useState } from 'react';

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      setIsSubmitting(false);
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Login failed:', errorData);
        return;
      }
      router.replace('/todos');
    },
    [email, password, router]
  );
  const disabledInput = isSubmitting;
  const disabledButton = disabledInput || !email || !password;

  return (
    <form
      className="flex min-w-[300px] flex-col gap-4 rounded border border-border p-4 shadow-md"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          disabled={disabledInput}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 rounded border border-border p-2 focus:ring-2 focus:outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          disabled={disabledInput}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 rounded border border-border p-2 focus:ring-2 focus:outline-none"
        />
      </div>
      <button
        disabled={disabledButton}
        type="submit"
        className="mt-4 rounded bg-blue-600 p-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Login
      </button>
    </form>
  );
};
