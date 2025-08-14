// src/app/page.tsx
import Hero from "./landing/Hero";
import Testimonial from "./landing/Testimonial";
import WhyConnect from "./landing/WhyConnect";
import HowItWorks from "./landing/HowItWorks";
import Footer from "./landing/Footer";

export default function Page() {
  return (
    <>
      <Hero />
      <Testimonial />
      <WhyConnect />
      <HowItWorks />
      <Footer />
    </>
  );
}
