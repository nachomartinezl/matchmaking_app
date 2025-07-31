// app/dashboard/page.tsx

import Image from "next/image";
import Link from "next/link";
import styles from "./Dashboard.module.css";
import { FaCog, FaSignOutAlt, FaHeart, FaBrain } from "react-icons/fa";
import { matchesData, trainingTopics } from "@/app/data/mockData";

export default function DashboardPage() {
  const userName = "Devan";
  const profileProgress = 80;

  return (
    <div className={styles.dashboardContainer}>
      {/* === Navbar === */}
      <nav className={styles.navbar}>
        <div className={styles.navbarBrand}>
          <h2>sync</h2>
        </div>
        <div className={styles.navbarIcons}>
          <button className="icon-button">
            <FaCog />
          </button>
          <button className="icon-button">
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
          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
          alt="Your profile picture"
          width={60}
          height={60}
          className={styles.profilePic}
        />
      </header>
      <div className="progress-bar-container" style={{ marginTop: '1rem' }}>
        <div
          className="progress-bar-fill"
          style={{ width: `${profileProgress}%` }}
        ></div>
      </div>

      {/* === Matches Section === */}
      <section>
        <h2 className="section-title">
          <FaHeart className="section-icon" />
          Matches
        </h2>
        <div className={styles.matchesContainer}>
          <div className={styles.matchesGrid}>
            {matchesData.map((match) => (
              <Link
                href={`/match/${match.id}`}
                key={match.id}
                className={styles.matchCard}
              >
                <Image
                  src={match.imageUrl}
                  alt={`Profile picture of ${match.name}`}
                  width={150}
                  height={150}
                  className={styles.matchImage}
                />
                <p className={styles.matchName}>
                  {match.name}, {match.age}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === Train Algorithm Section === */}
      <section>
        <h2 className="section-title">
          <FaBrain className="section-icon" />
          Train your algorithm
        </h2>
        <div className={styles.trainContainer}>
          <div className={styles.trainGrid}>
            {trainingTopics.map((topic) => (
              <Link
                href={`/train/${topic.id}`}
                key={topic.name}
                className={styles.trainButton}
              >
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
