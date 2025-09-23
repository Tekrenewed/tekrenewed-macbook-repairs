'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'James P.',
    location: 'Ealing',
    quote: 'I thought my MacBook was done for after I spilled coffee on it. The team at the Ealing workshop were amazing. They fixed it in a day and were so professional. Can’t recommend them enough!',
  },
  {
    name: 'Sarah L.',
    location: 'Hanwell',
    quote: 'My MacBook Air screen cracked and I needed a fast repair for work. I went to the Hanwell branch and they replaced it while I waited. Fantastic service and a really fair price.',
  },
  {
    name: 'Tom H.',
    location: 'Slough',
    quote: 'Used the mail-in service from Slough. The process was seamless and so much faster than going to Apple. My battery was replaced and my laptop feels brand new again. Truly experts at what they do.',
  },
];

const SocialProof = () => {
  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-primary">Trusted by MacBook Users Across London</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-light-gray p-6 rounded-lg shadow-sm"
            >
              <p className="text-dark-text">"{testimonial.quote}"</p>
              <p className="mt-4 font-bold text-primary">- {testimonial.name}, {testimonial.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
