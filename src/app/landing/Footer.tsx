"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const socials = [
    { key: "facebook", label: "Facebook", href: "#" },
    { key: "instagram", label: "Instagram", href: "#" },
    { key: "x", label: "X (Twitter)", href: "#" },
    { key: "youtube", label: "YouTube", href: "#" },
    { key: "tiktok", label: "TikTok", href: "#" },
    { key: "linkedin", label: "LinkedIn", href: "#" },
  ];

  return (
    <footer className={styles.wrap}>
      {/* CTA card */}
      <section className={styles.cta}>
        <div className={styles.ctaCard}>
          <span className={`${styles.cornerHeart} ${styles.left}`} aria-hidden />
          <span className={`${styles.cornerHeart} ${styles.right}`} aria-hidden />
          <p className={styles.kicker}>READY TO CONNECT?</p>
          <h3 className={styles.ctaTitle}>
            Join The People Finding Something Real.
          </h3>
          <Link href="/signup" className={styles.primaryBtn}>
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* brand + socials */}
      <div className={styles.brandBlock}>
        <div className={styles.brand}>
          <span className={styles.heart} aria-hidden />
          <span className={styles.brandName}>Connect</span>
        </div>

        <ul className={styles.socials} aria-label="social links">
          {socials.map((s) => (
            <li key={s.key}>
              <Link href={s.href} aria-label={s.label} className={styles.socialBtn}>
                {/* super-lightweight inline icons (letters as fallback) */}
                <span className={styles.icon} data-k={s.key} aria-hidden>
                  {s.key[0].toUpperCase()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <hr className={styles.rule} />

      {/* legal row */}
      <div className={styles.legalRow}>
        <nav className={styles.links}>
          <Link href="/terms">Terms of Use</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </nav>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Connect. Built for real connection.
        </p>
      </div>
    </footer>
  );
}
