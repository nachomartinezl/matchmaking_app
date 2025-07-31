// app/queue/page.tsx

'use client';

import { useEffect, useState } from 'react';

export default function QueuePage() {
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    // Assign a random queue position between 100 and 1000
    const initialPos = Math.floor(Math.random() * 900) + 100;
    setPosition(initialPos);
  }, []);

  return (
    <div className="form-container">
      <h1>Queue</h1>
      <p>Due to unexpected high traffic, we need to limit access to the app.</p>

      <h2>Your position in the queue:</h2>
      <p
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          textAlign: 'center',
          margin: '1rem 0',
        }}
      >
        {position}
      </p>

      <p>Please wait while we get you in. We appreciate your patience!</p>
    </div>
  );
}
