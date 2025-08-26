"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

// Updated SocialIcon component
function SocialIcon({
  keyName,
  label,
  forceLocal,
}: {
  keyName: string;
  label: string;
  forceLocal?: boolean; // Accept the optional prop
}) {
  const fallback = `/landing/footer/icons/${keyName}.png`;
  const slug = useMemo(
    () =>
      (
        {
          facebook: "facebook",
          instagram: "instagram",
          x: "x",
          youtube: "youtube",
          tiktok: "tiktok",
        } as Record<string, string>
      )[keyName] || keyName,
    [keyName]
  );
  const cdn = `https://cdn.simpleicons.org/${slug}/ffffff`;
  const [src, setSrc] = useState<string>(cdn);

  const finalSrc = forceLocal ? fallback : src;

  // If forceLocal is true, render the local image immediately.
  return (
    // Use the next/image component for better performance and to satisfy the linter.
    <Image
      src={finalSrc}
      alt={label}
      className={styles.socialIcon}
      width={18}
      height={18}
      unoptimized={!forceLocal} // Don't optimize remote CDN images
      onError={() => {
        // Only try the fallback if the current source isn't already the fallback
        if (src !== fallback) setSrc(fallback);
      }}
    />
  );
}

export default function Footer() {
  // Updated socials array with the new property
  const socials = [
    { key: "facebook", label: "Facebook", href: "#" },
    { key: "instagram", label: "Instagram", href: "#" },
    { key: "x", label: "X (Twitter)", href: "#" },
    { key: "youtube", label: "YouTube", href: "#" },
    { key: "tiktok", label: "TikTok", href: "#" },
    { key: "linkedin", label: "LinkedIn", href: "#", forceLocal: true }, // Force local PNG for this icon
  ];

  return (
    <footer className={styles.wrap}>
      {/* CTA card */}
      <section className={styles.cta}>
        <div className={styles.ctaCard}>
          <Image
            src="/landing/footer/two_hearts.png"
            alt=""
            aria-hidden
            className={`${styles.cornerImg} ${styles.left}`}
            width={150} // Provide an estimated or actual width
            height={150} // Provide an estimated or actual height
          />
          <Image
            src="/landing/footer/two_hearts_2.png"
            alt=""
            aria-hidden
            className={`${styles.cornerImg} ${styles.right}`}
            width={150}
            height={150}
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
            <li key={s.key}>
              <Link
                href={s.href}
                aria-label={s.label}
                className={styles.socialBtn}
              >
                {/* Pass the new prop down to the component */}
                <SocialIcon
                  keyName={s.key}
                  label={s.label}
                  forceLocal={s.forceLocal}
                />
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