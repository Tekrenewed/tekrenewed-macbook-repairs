'use client';

import { motion } from 'framer-motion';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-primary">Your Repair, Your Way</h2>
          <p className="mt-4 text-lg text-dark-text">Choose the service that works best for you.</p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {/* Column 1: Walk-In */}
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
              {/* Placeholder Icon */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <h3 className="mt-5 text-xl font-bold text-primary">Walk-In Repair</h3>
            <p className="mt-2 text-base text-dark-text">1. Visit us in Ealing or Hanwell.<br/>2. Get a free on-the-spot diagnosis.<br/>3. We'll fix it, often the same day.</p>
          </div>
          {/* Column 2: Courier */}
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
              {/* Placeholder Icon */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="mt-5 text-xl font-bold text-primary">London Courier Service</h3>
            <p className="mt-2 text-base text-dark-text">Book your repair online, and we'll arrange a courier to collect your MacBook, repair it, and return it to you safely.</p>
          </div>
          {/* Column 3: Mail-In */}
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
              {/* Placeholder Icon */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="mt-5 text-xl font-bold text-primary">Secure Mail-In</h3>
            <p className="mt-2 text-base text-dark-text">For clients in Slough, Reading, and nationwide. Post your device to us using our secure, insured service for a swift repair.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
