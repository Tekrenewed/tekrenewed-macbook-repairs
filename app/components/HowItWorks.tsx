'use client';

import { motion } from 'framer-motion';

// SVG Icon for Walk-In
const WalkInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75a1.5 1.5 0 011.5 1.5v13.5a1.5 1.5 0 01-1.5 1.5h-6a1.5 1.5 0 01-1.5-1.5V15M6.75 12H12m0 0l-3-3m3 3l3-3m-3 3V3.75M6.75 6.75h.75v.75h-.75V6.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 18.75a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75V15m0 6.75v-2.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75h.75v.75h-.75V6.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12.75V15m0 6.75v-2.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15h16.5" />
  </svg>
);

// SVG Icon for Courier
const CourierIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M5.25 8.25h13.5M5.25 12h13.5m-13.5 3.75h13.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25H3v7.5h18v-7.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.T5v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" />
  </svg>
);

// SVG Icon for Mail-In
const MailInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-light-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-primary">Your Repair, Your Way</h2>
          <p className="mt-4 text-xl text-dark-text max-w-3xl mx-auto">We offer a range of flexible service options to get your MacBook fixed without the fuss.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          
          {/* Card 1: Walk-In */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col">
            <div className="flex-shrink-0"><WalkInIcon /></div>
            <h3 className="mt-6 text-2xl font-bold text-primary">Walk-In Repair</h3>
            <p className="mt-2 text-dark-text flex-grow">The fastest option for our local customers in Ealing, Hanwell, and West London.</p>
            <ol className="mt-6 space-y-3 text-left">
              <li className="flex">
                <span className="bg-secondary text-white rounded-full w-6 h-6 text-sm flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <span><strong>Visit Us:</strong> Drop by one of our workshops for a free, on-the-spot diagnosis.</span>
              </li>
              <li className="flex">
                <span className="bg-secondary text-white rounded-full w-6 h-6 text-sm flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <span><strong>We Repair:</strong> Our expert technicians will get to work, often completing the repair the very same day.</span>
              </li>
              <li className="flex">
                <span className="bg-secondary text-white rounded-full w-6 h-6 text-sm flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <span><strong>Collect:</strong> We'll notify you the moment it's ready for collection, working like new.</span>
              </li>
            </ol>
          </motion.div>

          {/* Card 2: Courier */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col">
            <div className="flex-shrink-0"><CourierIcon /></div>
            <h3 className="mt-6 text-2xl font-bold text-primary">London Courier Service</h3>
            <p className="mt-2 text-dark-text flex-grow">Ultimate convenience for Greater London and surrounding areas like Slough, Burnham, and Reading.</p>
            <ol className="mt-6 space-y-3 text-left">
              <li className="flex">
                <span className="bg-secondary text-white rounded-full w-6 h-6 text-sm flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <span><strong>Book Online:</strong> Get your instant quote and book a secure collection from your home or office.</span>
              </li>
              <li className="flex">
                <span className="bg-secondary text-white rounded-full w-6 h-6 text-sm flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <span><strong>We Collect & Repair:</strong> Our courier will safely transport your device to our workshop where we'll perform the repair.</span>
              </li>
              <li className="flex">
                <span className="bg-secondary text-white rounded-full w-6 h-6 text-sm flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <span><strong>We Return:</strong> We'll securely courier your repaired MacBook directly back to your doorstep.</span>
              </li>
            </ol>
          </motion.div>

          {/* Card 3: Mail-In */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col">
            <div className="flex-shrink-0"><MailInIcon /></div>
            <h3 className="mt-6 text-2xl font-bold text-primary">Nationwide Mail-In</h3>
            <p className="mt-2 text-dark-text flex-grow">A secure and insured repair service for all our customers across the UK.</p>
            <ol className="mt-6 space-y-3 text-left">
              <li className="flex">
                <span className="bg-secondary text-white rounded-full w-6 h-6 text-sm flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <span><strong>Get Your Quote:</strong> Use our online tool to get a price estimate and register your repair.</span>
              </li>
              <li className="flex">
                <span className="bg-secondary text-white rounded-full w-6 h-6 text-sm flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <span><strong>Post Securely:</strong> Package your MacBook and send it to us using a secure, tracked mail service.</span>
              </li>
              <li className="flex">
                <span className="bg-secondary text-white rounded-full w-6 h-6 text-sm flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <span><strong>We Repair & Return:</strong> We'll complete the repair and ship it back to you via an insured, next-day courier.</span>
              </li>
            </ol>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;