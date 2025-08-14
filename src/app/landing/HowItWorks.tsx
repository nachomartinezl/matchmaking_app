"use client";

import Image from "next/image";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  return (
    <section className={styles.wrap} aria-labelledby="how-heading">
      <div className={styles.inner}>
        <p className={styles.kicker}>CONNECTING IS SIMPLE</p>
        <h2 id="how-heading" className={styles.title}>How It Works</h2>

        {/* Step 1 - right column */}
        <div className={`${styles.row} ${styles.right}`}>
          <div className={styles.media}>
            <div className={styles.stepPill}>Step 1</div>
            <div className={styles.avaSolo}>
              <Image src="/landing/howitworks/ava1.jpg" alt="" fill />
            </div>
          </div>
          <div className={styles.copy}>
            <h3 className={styles.h3}>Create Your Profile</h3>
            <p className={styles.desc}>
              Answer a few thoughtful prompts that reflect who you are and what
              actually matters to you. No pressure to be perfect — just be you.
            </p>
          </div>
          <img className={`${styles.arrow} ${styles.arrow1}`} src="/landing/howitworks/arrow.svg" alt="" aria-hidden />
        </div>

        {/* Step 2 - left column */}
        <div className={`${styles.row} ${styles.left}`}>
          <div className={styles.media}>
            <div className={styles.stepPill}>Step 2</div>
            <div className={styles.avaStack}>
              <span className={styles.ava}><Image src="/landing/howitworks/ava1.jpg" alt="" fill /></span>
              <span className={styles.ava}><Image src="/landing/howitworks/ava2.jpg" alt="" fill /></span>
              <span className={styles.ava}><Image src="/landing/howitworks/ava3.jpg" alt="" fill /></span>
            </div>
          </div>
          <div className={styles.copy}>
            <h3 className={styles.h3}>Discover Matches That Align</h3>
            <p className={styles.desc}>
              We highlight people who genuinely share your values, lifestyle, and
              vibe — not just based on filters or surface details.
            </p>
          </div>
          <img className={`${styles.arrow} ${styles.arrow2}`} src="/landing/howitworks/arrow.png" alt="" aria-hidden />
        </div>

        {/* Step 3 - right column */}
        <div className={`${styles.row} ${styles.right}`}>
          <div className={styles.media}>
            <div className={styles.stepPill}>Step 3</div>
            <div className={styles.avaStack}>
              <span className={styles.ava}><Image src="/landing/howitworks/ava1.png" alt="" fill /></span>
              <span className={styles.ava}><Image src="/landing/howitworks/ava2.png" alt="" fill /></span>
            </div>
          </div>
          <div className={styles.copy}>
            <h3 className={styles.h3}>Start Honest Conversations</h3>
            <p className={styles.desc}>
              Match with intention. Reach out when it feels right, and talk at your
              own pace — no forced swipes or pushy notifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
