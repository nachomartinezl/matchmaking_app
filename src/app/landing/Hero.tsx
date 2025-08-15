"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <main className={styles.wrap}>
      <a className={styles.topCta} href="/signup">
        Sign Up Now
      </a>

      <header className={styles.header}>
        <div className={styles.brand}>
          <Image
            src="/landing/logo.png" // replace with your actual logo path
            alt="Connect logo"
            width={140}
            height={40}
            priority
          />
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.copy}>
          <h1 className={styles.h1}>
            Connect With
            <br />
            Someone Who Truly
            <br />
            Gets You.
          </h1>
          <p className={styles.sub}>
            A human-first dating platform designed for real connection, not just
            surface swipes.
          </p>
          <div className={styles.ctas}>
            <Link href="/signup" className={styles.primary}>
              Sign Up Now
            </Link>
          </div>
        </div>

        <div className={styles.media}>
          {/* replace CSS hearts with actual image hearts */}
          <Image
            src="/landing/hero/heart.png"
            alt=""
            width={32}
            height={32}
            className={`${styles.heartImg} ${styles.leftBadge}`}
            priority
          />
          <Image
            src="/landing/hero/heart.png"
            alt=""
            width={32}
            height={32}
            className={`${styles.heartImg} ${styles.rightBadge}`}
            priority
          />

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
