// app/queue/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import styles from '../dashboard/Dashboard.module.css';

export default function QueuePage() {
  const userName = 'Devan';
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    // Assign a random queue position between 100 and 1000
    const initialPos = Math.floor(Math.random() * 900) + 100;
    setPosition(initialPos);
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navbarBrand}>
          <h2>sync</h2>
        </div>
        <div className={styles.navbarIcons}>
          <button className={styles.iconButton}>
            <FaCog />
          </button>
          <button className={styles.iconButton}>
            <FaSignOutAlt />
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <h1>Hello, {userName}</h1>
        </div>
        <Image
          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
          alt="Your profile picture"
          width={60}
          height={60}
          className={styles.profilePic}
        />
      </header>

      {/* Queue Message */}
      <section>
        <h2 className={styles.sectionTitle}>Queue</h2>
        <p>Due to unexpected high traffic, we need to limit access to the app.</p>

        <h2 className={styles.sectionTitle}>Your position in the queue:</h2>
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
      </section>
    </div>
  );
}
