// app/page.tsx

import Link from 'next/link';

export default function HomePage() {
  return (
    // This container will now pick up the new dark theme styles
    <div className="form-container" style={{ textAlign: 'center' }}>
      
      <h1>Welcome to MatchMaker</h1>

      <p>
        Find your perfect match today. <br />
        Whether you&apos;re looking for friends, a casual date, or a serious
        relationship, your journey starts here.
      </p>

      {/* 
        The primary button will now have the gradient and hover effect.
        The inline styles are still useful to override default link behavior.
      */}
      <Link 
        href="/signup" 
        className="button-primary" 
        style={{ textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}
      >
        Get Started & Sign Up
      </Link>

      <p style={{ marginTop: '2.5rem', fontSize: '0.9rem' }}>
        Already have an account?{' '}
        {/* We use the new .link-accent class for the themed link color */}
        <Link href="/login" className="link-accent">
          Log In
        </Link>
      </p>

    </div>
  );
}