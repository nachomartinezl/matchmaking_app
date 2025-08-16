// app/login/page.tsx

// app/login/page.tsx

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import styles from './Login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push('/queue');
    }
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

        {error && <p className={styles.error}>{error}</p>}

        <div className={`button-group ${styles.buttonGroup}`}>
          <button
            type="submit"
            className="button-primary"
            disabled={!email || !password || isLoading}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </div>
      </form>

      <p className={styles.signupLink}>
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="link-accent">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
