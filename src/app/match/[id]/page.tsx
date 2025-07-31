'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import styles from './Match.module.css';
import { FaArrowLeft, FaHeart, FaTimes } from 'react-icons/fa';
import { matchesData } from '@/app/data/mockData';

export default function MatchPage() {
  const router = useRouter();
  const params = useParams();
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState('');
  
  // Parse the ID from the URL
  const matchId = parseInt(params.id || '', 10);
  const match = matchesData.find(m => m.id === matchId);
  
  if (!match) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h2>Match not found</h2>
          <button onClick={() => router.push('/dashboard')} className="icon-button" style={{ alignSelf: 'center', marginBottom: '1rem' }}>
            <FaArrowLeft /> Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  const handleBack = () => {
    router.push('/dashboard');
  };
  
  const handleReject = () => {
    setAnimationType('reject');
    setIsAnimating(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };
  
  const handleAccept = () => {
    setAnimationType('accept');
    setIsAnimating(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };
  
  return (
    <div className={`${styles.container} ${isAnimating ? styles[animationType] : ''}`}>
      <button
        onClick={handleBack}
        className="icon-button"
        style={{ alignSelf: 'flex-start', marginBottom: '0.5rem', fontSize: '1.5rem' }}
      >
        <FaArrowLeft />
      </button>
      
      <h1 className={styles.name}>{match.name}</h1>
      
      <div className={styles.imageContainer}>
        <Image
          src={match.imageUrl}
          alt={`Profile picture of ${match.name}`}
          width={200}
          height={200}
          className={styles.profileImage}
        />
      </div>
      
      <div className={styles.bioSection}>
        <p className={styles.bio}>{match.bio}</p>
      </div>
      
      <div className={styles.detailsSection}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Age</span>
          <span className={styles.detailValue}>{match.age}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Height</span>
          <span className={styles.detailValue}>{match.height}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Sign</span>
          <span className={styles.detailValue}>{match.sign}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Country</span>
          <span className={styles.detailValue}>{match.country}</span>
        </div>
      </div>
      
      <div className={styles.actionButtons}>
        <button onClick={handleReject} className={`${styles.actionButton} ${styles.rejectButton}`}>
          <FaTimes className={styles.buttonIcon} />
          <span>Reject</span>
        </button>
        <button onClick={handleAccept} className={`${styles.actionButton} ${styles.acceptButton}`}>
          <FaHeart className={styles.buttonIcon} />
          <span>Accept</span>
        </button>
      </div>
    </div>
  );
}
