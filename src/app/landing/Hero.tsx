"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <main className={styles.wrap}>
      <a className={styles.topCta} href="/signup">Sign Up Now</a>

      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.heart} aria-hidden />
          <span className={styles.brandName}>Connect</span>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.copy}>
          <h1 className={styles.h1}>
            Connect With<br />Someone Who Truly<br />Gets You.
          </h1>
          <p className={styles.sub}>
            A human-first dating platform designed for real connection, not just surface swipes.
          </p>
          <div className={styles.ctas}>
            <Link href="/signup" className={styles.primary}>Sign Up Now</Link>
          </div>
        </div>

        <div className={styles.media}>
          {/* decorative hearts */}
          <span className={`${styles.heartBadge} ${styles.leftBadge}`} aria-hidden />
          <span className={`${styles.heartBadge} ${styles.rightBadge}`} aria-hidden />

          <div className={styles.card}>
            <Image
              src="/landing/hero.png"
              alt="Happy couple outdoors"
              fill
              className={styles.cardImg}
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}
