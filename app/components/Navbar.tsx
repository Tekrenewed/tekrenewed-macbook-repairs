'use client';

import { motion } from 'framer-motion';

const Navbar = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary">London Mac Repair</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={() => scrollTo('services')} className="text-dark-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Services</button>
              <button onClick={() => scrollTo('locations')} className="text-dark-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Locations</button>
              <button onClick={() => scrollTo('faq')} className="text-dark-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium">FAQ</button>
            </div>
          </div>
          <div className="hidden md:block">
            <motion.button
              onClick={() => scrollTo('triage-tool')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium shadow-md"
            >
              Get an Instant Quote
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
