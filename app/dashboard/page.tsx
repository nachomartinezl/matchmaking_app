// app/dashboard/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import styles from './Dashboard.module.css';
import { FaUser, FaCog, FaSignOutAlt, FaHeart, FaBrain, FaUserAlt, FaUserFriends, FaBalanceScale, FaSmile } from 'react-icons/fa';

// Mock data for your matches - in a real app, this would come from an API
const matchesData = [
  { 
    id: 1,
    name: 'Lauren', 
    age: 24, 
    imageUrl: 'https://placehold.co/400x400/FFF/333?text=Lauren',
    bio: 'Passionate about art, music, and exploring new places. Looking for someone who enjoys deep conversations and spontaneous adventures.',
    height: '5\'7"',
    sign: 'Libra',
    country: 'United States'
  },
  { 
    id: 2,
    name: 'Annie', 
    age: 30, 
    imageUrl: 'https://placehold.co/400x400/EEE/333?text=Annie',
    bio: 'Coffee enthusiast, book lover, and outdoor adventurer. I value authenticity and am looking for someone with similar interests.',
    height: '5\'5"',
    sign: 'Taurus',
    country: 'Canada'
  },
  { 
    id: 3,
    name: 'Luna', 
    age: 29, 
    imageUrl: 'https://placehold.co/400x400/DDD/333?text=Luna',
    bio: 'Yoga instructor by day, stargazer by night. Seeking a connection with someone who appreciates mindfulness and the beauty of the universe.',
    height: '5\'9"',
    sign: 'Pisces',
    country: 'Australia'
  },
];

// Mock data for the algorithm training buttons with icons
const trainingTopics = [
  { id: 'personality', name: 'Personality', icon: <FaUserAlt /> },
  { id: 'character', name: 'Character', icon: <FaBalanceScale /> },
  { id: 'emotional', name: 'Emotional', icon: <FaSmile /> },
  { id: 'values', name: 'Values', icon: <FaUserFriends /> }
];

export default function DashboardPage() {
  const userName = 'Devan';
  const profileProgress = 80;

  return (
    <div className={styles.dashboardContainer}>
      
      {/* === Navbar === */}
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
      
      {/* === Header Section === */}
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <h1>Hello, {userName}</h1>
          <p>Your profile is {profileProgress}% complete</p>
        </div>
        <Image
          src="https://placehold.co/100x100/CCC/333?text=Devan"
          alt="Your profile picture"
          width={60}
          height={60}
          className={styles.profilePic}
        />
      </header>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${profileProgress}%` }}></div>
      </div>
      
      {/* === Matches Section === */}
      <section>
        <h2 className={styles.sectionTitle}>
          <FaHeart className={styles.sectionIcon} />
          Matches
        </h2>
        <div className={styles.matchesContainer}>
          <div className={styles.matchesGrid}>
            {matchesData.map((match) => (
              <Link href={`/match/${match.id}`} key={match.id} className={styles.matchCard}>
                <Image
                  src={match.imageUrl}
                  alt={`Profile picture of ${match.name}`}
                  width={150}
                  height={150}
                  className={styles.matchImage}
                />
                <p className={styles.matchName}>{match.name}, {match.age}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === Train Algorithm Section === */}
      <section>
        <h2 className={styles.sectionTitle}>
          <FaBrain className={styles.sectionIcon} />
          Train your algorithm
        </h2>
        <div className={styles.trainContainer}>
          <div className={styles.trainGrid}>
            {trainingTopics.map((topic) => (
              <Link href={`/train/${topic.id}`} key={topic.name} className={styles.trainButton}>
                <span className={styles.buttonIcon}>{topic.icon}</span>
                {topic.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
