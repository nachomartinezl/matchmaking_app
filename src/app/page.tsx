// src/app/page.tsx
import './landing/landingFonts.css';
import './landing/mozilla-headline.css';
import Hero from './landing/Hero';
import Testimonial from './landing/Testimonial';
import WhyConnect from './landing/WhyConnect';
import HowItWorks from './landing/HowItWorks';
import Footer from './landing/Footer';

export default function Page() {
  return (
    <>
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
