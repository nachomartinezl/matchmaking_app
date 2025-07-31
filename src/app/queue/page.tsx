// app/queue/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  FaCog,
  FaSignOutAlt,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaEnvelope,
} from 'react-icons/fa';
import styles from '../dashboard/Dashboard.module.css';
import queueStyles from './Queue.module.css';

// Define the type for boosts
type BoostPlatform = 'whatsapp' | 'instagram' | 'facebook' | 'tiktok' | 'email';

export default function QueuePage() {
  const userName = 'Devan';
  const [position, setPosition] = useState<number>(0);
  const [boostsUsed, setBoostsUsed] = useState({
    whatsapp: false,
    instagram: false,
    facebook: false,
    tiktok: false,
    email: false,
  });

  useEffect(() => {
    // Assign a random queue position between 100 and 1000
    const initialPos = Math.floor(Math.random() * 900) + 100;
    setPosition(initialPos);
  }, []);

  const handleShare = (boostAmount: number, platform: BoostPlatform) => {
    if (boostsUsed[platform]) return; // Prevent re-using a boost

    // In a real app, you would trigger the native share API here.
    // For this demo, we'll just simulate the queue jump.
    console.log(`Sharing on ${platform} for a ${boostAmount} position boost.`);

    setPosition((prev) => Math.max(1, prev - boostAmount));
    setBoostsUsed((prev) => ({ ...prev, [platform]: true }));
  };

  const shareOptions = [
    {
      platform: 'whatsapp',
      icon: <FaWhatsapp />,
      text: 'Share on WhatsApp',
      boost: 10,
      style: queueStyles.whatsapp,
      handler: () => handleShare(10, 'whatsapp'),
    },
    {
      platform: 'instagram',
      icon: <FaInstagram />,
      text: 'Share on Instagram',
      boost: 5,
      style: queueStyles.instagram,
      handler: () => handleShare(5, 'instagram'),
    },
    {
      platform: 'facebook',
      icon: <FaFacebook />,
      text: 'Share on Facebook',
      boost: 5,
      style: queueStyles.facebook,
      handler: () => handleShare(5, 'facebook'),
    },
    {
      platform: 'tiktok',
      icon: <FaTiktok />,
      text: 'Share on TikTok',
      boost: 5,
      style: queueStyles.tiktok,
      handler: () => handleShare(5, 'tiktok'),
    },
    {
      platform: 'email',
      icon: <FaEnvelope />,
      text: 'Share via Email',
      boost: 3,
      style: queueStyles.email,
      handler: () => handleShare(3, 'email'),
    },
  ] as const; // Use 'as const' for stricter typing on platform names

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

      <div className={queueStyles.queueContainer}>
        {/* Queue Card */}
        <section className={queueStyles.queueCard}>
          <h2>Your position in the queue:</h2>
          <p className={queueStyles.positionNumber}>{position}</p>
          <p>Due to high demand, we&apos;ve created a queue to ensure the best experience for everyone. We appreciate your patience!</p>
        </section>

        {/* Share to Boost Section */}
        <section className={queueStyles.shareSection}>
          <h3>Want to get in faster?</h3>
          <p>Jump the queue by sharing with your friends!</p>
          <div className={queueStyles.shareButtons}>
            {shareOptions.map((option) => (
              <button
                key={option.platform}
                className={`${queueStyles.shareButton} ${option.style}`}
                onClick={option.handler}
                disabled={boostsUsed[option.platform]}
              >
                {option.icon}
                <span>{boostsUsed[option.platform] ? 'Boosted!' : option.text}</span>
                {!boostsUsed[option.platform] && (
                  <span className={queueStyles.boostText}>-{option.boost}</span>
                )}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
