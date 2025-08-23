"use client";

import Image from "next/image";
import styles from "./Testimonial.module.css";
import Link from "next/link";

export default function Testimonial() {
  return (
    <section className={styles.wrap} aria-labelledby="testimonials-heading">
      <div className={styles.inner}>
        {/* 1. Kicker is moved to be a direct child of .inner */}
        <p id="testimonials-heading" className={styles.kicker}>
          WHAT OUR USERS SAY
        </p>

        {/* 2. New wrapper for the main testimonial content */}
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              <Image
                src="/landing/testimonial/testimonial.png"
                alt="Lena & Jordan"
                fill
                sizes="64px"
              />
            </div>
            <div className={styles.name}>Lena &amp; Jordan</div>
          </div>

          <div className={styles.quoteWrap}>
            <blockquote className={styles.quote}>
              We Met On Connect Without Any Filters, No Pressure. Just Two
              People Being Real. And Now, We’re Together.
            </blockquote>
            <Image
              src="/landing/testimonial/quotes.svg"
              alt=""
              aria-hidden
              className={styles.bigQuote}
              width={50}
              height={50}
            />
          </div>
          <p className={styles.disclaimer}>
            These testimonials are illustrative only. Not real user experiences.
          </p>
        </div>
        <div className={styles.ctas}>
        <Link href="/signup" className={styles.primary}>
          Sign Up Now
        </Link>
      </div>
      </div>
    </section>
  );
}
