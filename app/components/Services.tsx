'use client';

import { motion } from 'framer-motion';

const services = [
  { name: 'Screen Replacement', description: 'Cracked or faulty screen? We use genuine quality parts to restore your display.' },
  { name: 'Battery Replacement', description: 'Restore your MacBook’s battery life and performance with a brand new battery.' },
  { name: 'Liquid Damage Repair', description: 'Our experts can rescue your MacBook from spills with ultrasonic cleaning.' },
  { name: 'Keyboard & Trackpad', description: 'We fix unresponsive keys, butterfly keyboard issues, and faulty trackpads.' },
  { name: 'Logic Board Repair', description: 'Advanced component-level repairs on the main logic board to save you money.' },
  { name: 'Data Recovery', description: 'We can help recover your precious data from failing hard drives or SSDs.' },
];

const Services = () => {
  return (
    <section id="services" className="bg-light-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-primary">Comprehensive MacBook Repair Services</h2>
          <p className="mt-4 text-lg text-dark-text">No matter the issue, our certified technicians can handle it.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div 
              key={service.name} 
              whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-primary">{service.name}</h3>
              <p className="mt-2 text-base text-dark-text">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
