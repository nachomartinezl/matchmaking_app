"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

// Updated SocialIcon component
function CdnSocialIcon({ keyName, label }: { keyName: string; label: string }) {
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
        if (src !== fallback) setSrc(fallback);
      }}
    />
  );
}

function SocialIcon({
  keyName,
  label,
  forceLocal,
}: {
  keyName: string;
  label: string;
  forceLocal?: boolean;
}) {
  const fallback = `/landing/footer/icons/${keyName}.png`;

  if (forceLocal) {
    return (
      <Image
        src={fallback}
        alt={label}
        className={styles.socialIcon}
        width={18}
        height={18}
        decoding="async"
      />
    );
  }

  return <CdnSocialIcon keyName={keyName} label={label} />;
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
            width={100}
            height={100}
          />
          <Image
            src="/landing/footer/two_hearts_2.png"
            alt=""
            aria-hidden
            className={`${styles.cornerImg} ${styles.right}`}
            width={100}
            height={100}
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