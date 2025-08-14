"use client";

import Image from "next/image";
import styles from "./Testimonial.module.css";

export default function Testimonial() {
  return (
    <section className={styles.wrap} aria-labelledby="testimonials-heading">
      <div className={styles.inner}>
        <p id="testimonials-heading" className={styles.kicker}>
          WHAT OUR USERS SAY
        </p>

        <div className={styles.header}>
          <div className={styles.avatar}>
            <Image
              src="/landing/testimonial.png"
              alt="Lena & Jordan"
              fill
              sizes="64px"
            />
          </div>
          <div className={styles.name}>Lena &amp; Jordan</div>
        </div>

        <div className={styles.quoteWrap}>
          <blockquote className={styles.quote}>
            We Met On Connect Without Any Filters, No Pressure. Just Two People
            Being Real. And Now, We’re Together.
          </blockquote>
          <span aria-hidden className={styles.bigQuote}>&rdquo;</span>
        </div>

        <ul className={styles.pager} aria-label="testimonial navigation">
          <li className={`${styles.dot} ${styles.active}`} />
          <li className={styles.dot} />
          <li className={styles.dot} />
          <li className={styles.dot} />
        </ul>

        <p className={styles.disclaimer}>
          These testimonials are illustrative only. Not real user experiences.
        </p>
      </div>
    </section>
  );
}
