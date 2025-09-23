'use client';

import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Locations from './components/Locations';
import TriageTool from './components/TriageTool';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const Section = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Section><Locations /></Section>
        <Section><TriageTool /></Section>
        <Section><HowItWorks /></Section>
        <Section><Services /></Section>
        <Section><SocialProof /></Section>
        <Section><FAQ /></Section>
      </main>
      <Footer />
    </>
  );
}
