// src/app/page.tsx
import './landing/landingFonts.css';
import Hero from './landing/Hero';
import Testimonial from './landing/Testimonial';
import WhyConnect from './landing/WhyConnect';
import HowItWorks from './landing/HowItWorks';
import Footer from './landing/Footer';

export default function Page() {
  return (
    <>
      {/* Landing page fonts only */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Mozilla+Headline:wght@200..700&display=swap"
        rel="stylesheet"
      />

      {/* Scoped font styles for landing */}
      <div className="landing-fonts">
        <Hero />
        <Testimonial />
        <WhyConnect />
        <HowItWorks />
        <Footer />
      </div>
    </>
  );
}
