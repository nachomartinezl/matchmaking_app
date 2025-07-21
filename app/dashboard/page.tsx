// app/dashboard/page.tsx

import Image from 'next/image';
import styles from './Dashboard.module.css';

// Mock data for your matches - in a real app, this would come from an API
const matchesData = [
  { name: 'Lauren', age: 24, imageUrl: 'https://placehold.co/400x400/FFF/333?text=Lauren' },
  { name: 'Annie', age: 30, imageUrl: 'https://placehold.co/400x400/EEE/333?text=Annie' },
  { name: 'Luna', age: 29, imageUrl: 'https://placehold.co/400x400/DDD/333?text=Luna' },
];

// Mock data for the algorithm training buttons
const trainingTopics = ['Personality', 'Character', 'Emotional', 'Values'];

export default function DashboardPage() {
  const userName = 'Devan';
  const profileProgress = 80;

  return (
    <div className={styles.dashboardContainer}>
      
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
        <h2 className={styles.sectionTitle}>Matches</h2>
        <div className={styles.matchesGrid}>
          {matchesData.map((match) => (
            <div key={match.name} className={styles.matchCard}>
              <Image
                src={match.imageUrl}
                alt={`Profile picture of ${match.name}`}
                width={150}
                height={150}
                className={styles.matchImage}
              />
              <p className={styles.matchName}>{match.name}, {match.age}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Train Algorithm Section === */}
      <section>
        <h2 className={styles.sectionTitle}>Train your algorithm</h2>
        <div className={styles.trainGrid}>
          {trainingTopics.map((topic) => (
            <button key={topic} className={styles.trainButton}>
              {topic}
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}