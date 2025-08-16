"use client";

import Image from "next/image";
import styles from "./WhyConnect.module.css";

export default function WhyConnect() {
  const items = [
    {
      icon: "/landing/whyconnect/icons/chat.png",
      title: "Build Real Connection",
      desc: "Not Just Swipes — Thoughtful, Human-First Matching.",
    },
    {
      icon: "/landing/whyconnect/icons/hand.png",
      title: "Inclusive By Design",
      desc: "Gluten-Free? Neurodivergent? Tired Of Filters? You’re Welcome Here.",
    },
    {
      icon: "/landing/whyconnect/icons/shield.png",
      title: "Safer Space",
      desc: "You Set The Pace. Mutual Respect Is Built-In From The Start.",
    },
  ];

  return (
    <section className={styles.wrap} aria-labelledby="why-heading">
      <div className={styles.band}>
        <p className={styles.kicker}>WHAT MAKES US DIFFERENT</p>
        <h2 id="why-heading" className={styles.title}>Why Connect?</h2>
      </div>

      <div className={styles.cards}>
        {items.map((it) => (
          <article key={it.title} className={styles.card}>
            <div className={styles.iconWrap}>
              <Image
                src={it.icon}
                alt=""
                fill
                sizes="48px"
                className={styles.icon}
              />
            </div>
            <h3 className={styles.cardTitle}>{it.title}</h3>
            <p className={styles.cardDesc}>{it.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
