"use client";

import Image from "next/image";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  return (
    <section className={styles.wrap} aria-labelledby="how-heading">
      <div className={styles.inner}>
        <p className={styles.kicker}>CONNECTING IS SIMPLE</p>
        <h2 id="how-heading" className={styles.title}>How It Works</h2>

        {/* Step 1 (right) */}
        <div className={`${styles.row} ${styles.right}`}>
          <div className={styles.media}>
            <span className={styles.stepPill}>Step 1</span>

            <span className={styles.avaSoloWrapper}>
              <span className={styles.avaSolo}>
                <Image src="/landing/howitworks/avatars/ava1.png" alt="" fill />
              </span>
              <span className={`${styles.badge} ${styles.plus}`}>
                <Image src="/landing/howitworks/icons/plus.png" alt="" fill />
              </span>
            </span>
          </div>

          <div className={styles.copy}>
            <h3 className={styles.h3}>Create Your Profile</h3>
            <p className={styles.desc}>
              Answer a few thoughtful prompts that reflect who you are and what actually
              matters to you. No pressure to be perfect — just be you.
            </p>
          </div>

          <img className={`${styles.arrow} ${styles.arrow1}`} src="/landing/howitworks/arrow.png" alt="" aria-hidden />
        </div>

        {/* Step 2 (left) */}
        <div className={`${styles.row} ${styles.left}`}>
          <div className={styles.media}>
            <span className={styles.stepPill}>Step 2</span>

            <div className={styles.avaStack}>
              <span className={`${styles.ava} ${styles.z3}`}>
                <Image src="/landing/howitworks/avatars/ava1.png" alt="" fill />
              </span>
              <span className={`${styles.ava} ${styles.z2}`}>
                <Image src="/landing/howitworks/avatars/ava2.png" alt="" fill />
              </span>
              <span className={`${styles.ava} ${styles.z1}`}>
                <Image src="/landing/howitworks/avatars/ava3.png" alt="" fill />
              </span>

              <span className={`${styles.badge} ${styles.heart}`}>
                <Image src="/landing/howitworks/icons/heart.png" alt="" fill />
              </span>
            </div>
          </div>

          <div className={styles.copy}>
            <h3 className={styles.h3}>Discover Matches That Align</h3>
            <p className={styles.desc}>
              We highlight people who genuinely share your values, lifestyle, and vibe —
              not just based on filters or surface details.
            </p>
          </div>

          <img className={`${styles.arrow} ${styles.arrow2}`} src="/landing/howitworks/arrow.png" alt="" aria-hidden />
        </div>

        {/* Step 3 (right) */}
        <div className={`${styles.row} ${styles.right}`}>
          <div className={styles.media}>
            <span className={styles.stepPill}>Step 3</span>

            <div className={styles.avaStack}>
              <span className={`${styles.ava} ${styles.z2}`}>
                <Image src="/landing/howitworks/avatars/ava1.png" alt="" fill />
              </span>
              <span className={`${styles.ava} ${styles.z3} ${styles.hasStatus}`}>
                <Image src="/landing/howitworks/avatars/ava2.png" alt="" fill />
                <span className={styles.statusDot} aria-hidden />
              </span>

              <span className={`${styles.badge} ${styles.message}`}>
                <Image src="/landing/howitworks/icons/message.png" alt="" fill />
              </span>
            </div>
          </div>

          <div className={styles.copy}>
            <h3 className={styles.h3}>Start Honest Conversations</h3>
            <p className={styles.desc}>
              Match with intention. Reach out when it feels right, and talk at your own
              pace — no forced swipes or pushy notifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
