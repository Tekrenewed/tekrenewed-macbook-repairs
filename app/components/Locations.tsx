'use client';

import { motion } from 'framer-motion';

const Locations = () => {
  return (
    <section id="locations" className="bg-light-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-primary">Visit Our West London Workshops</h2>
          <p className="mt-4 text-lg text-dark-text">Get hands-on help from our expert technicians.</p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <motion.div 
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-primary">Hanwell Workshop</h3>
            <p className="mt-4 text-dark-text">123 Hanwell High Street<br/>London, W7 3XX</p>
            <p className="mt-4 text-dark-text">020 8123 4567</p>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 inline-block bg-secondary text-white px-6 py-2 rounded-md font-medium"
            >
              Get Directions
            </motion.a>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-primary">Ealing Workshop</h3>
            <p className="mt-4 text-dark-text">456 Ealing Broadway<br/>London, W5 5JU</p>
            <p className="mt-4 text-dark-text">020 8987 6543</p>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 inline-block bg-secondary text-white px-6 py-2 rounded-md font-medium"
            >
              Get Directions
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
