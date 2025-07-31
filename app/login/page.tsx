// app/login/page.tsx

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Here you would handle the actual login logic (e.g., API call)
    console.log('Logging in with:', { email, password });

    // Simulate API call
    setTimeout(() => {
      // Instead of alert, send user to the queue screen
      router.push('/queue');
    }, 1000);
  };

  return (
    <div className="form-container">
      <h1>Welcome Back</h1>
      <p>Log in to continue your journey.</p>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div
          className="button-group"
          style={{ flexDirection: 'column', marginTop: 'var(--space-md)' }}
        >
          <button
            type="submit"
            className="button-primary"
            disabled={!email || !password || isLoading}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </div>
      </form>

      <p style={{ marginTop: 'var(--space-md)' }}>
        Don't have an account?{' '}
        <Link href="/signup" className="link-accent">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
