"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

function SocialIcon({ icon, label }: { icon: string; label: string }) {
  const [src, setSrc] = useState(`https://cdn.simpleicons.org/${icon}/ffffff`);
  const fallback = `/landing/footer/icons/${icon}.png`;

  return (
    <Image
      src={src}
      alt={label}
      className={styles.socialIcon}
      width={18}
      height={18}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (src !== fallback) {
          setSrc(fallback);
        }
      }}
    />
  );
}

export default function Footer() {
  const socials = [
    { icon: "facebook", label: "Facebook", href: "#" },
    { icon: "instagram", label: "Instagram", href: "#" },
    { icon: "x", label: "X (Twitter)", href: "#" },
    { icon: "youtube", label: "YouTube", href: "#" },
    { icon: "tiktok", label: "TikTok", href: "#" },
    { icon: "linkedin", label: "LinkedIn", href: "#" }, // will fall back to PNG
  ];

  return (
    <footer className={styles.wrap}>
      {/* CTA card */}
      <section className={styles.cta}>
        <div className={styles.ctaCard}>
          <img
            src="/landing/footer/two_hearts.png"
            alt=""
            aria-hidden
            className={`${styles.cornerImg} ${styles.left}`}
          />
          <img
            src="/landing/footer/two_hearts_2.png"
            alt=""
            aria-hidden
            className={`${styles.cornerImg} ${styles.right}`}
          />

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
          <Image
            src="/landing/logo_white.png"
            alt="Connect logo"
            width={140}
            height={40}
            priority
          />
        </div>

        <ul className={styles.socials} aria-label="social links">
          {socials.map((s) => (
            <li key={s.icon}>
              <Link
                href={s.href}
                aria-label={s.label}
                className={styles.socialBtn}
              >
                <SocialIcon icon={s.icon} label={s.label} />
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
