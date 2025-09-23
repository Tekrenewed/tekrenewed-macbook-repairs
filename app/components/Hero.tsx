'use client';

import { motion } from 'framer-motion';

const Hero = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-4xl font-display font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          Expert MacBook Repair Across West London
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300"
        >
          From cracked screens to battery replacements and liquid damage, our certified technicians provide fast, expert service to get you back to work.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <motion.button
            onClick={() => scrollTo('triage-tool')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-secondary text-white px-8 py-3 rounded-md text-lg font-medium shadow-lg"
          >
            Start My Free Diagnosis
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
