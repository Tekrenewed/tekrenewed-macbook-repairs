'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How long will my repair take?',
    answer: 'Many common repairs, like screen and battery replacements, can often be completed the same day. For more complex issues like liquid damage, we usually require 2-3 business days for a full diagnosis and repair.',
  },
  {
    question: 'Is my data safe?',
    answer: 'Data safety is our top priority. We recommend you back up your device before any repair, but our technicians take every precaution to protect your data. We also offer data recovery services.',
  },
  {
    question: 'Do you offer a warranty?',
    answer: 'Yes, all our repairs come with a comprehensive 12-month warranty covering the parts we replaced and the labour. This gives you complete peace of mind.',
  },
  {
    question: 'What if the repair costs more than the estimate?',
    answer: 'Our initial quote is an estimate. If we discover a more complex issue during diagnosis, we will contact you with a revised quote BEFORE proceeding with any work. You are always in control.',
  },
  {
    question: 'Is the diagnosis really free?',
    answer: 'Absolutely. We offer a no-obligation, free diagnosis. If you choose not to proceed with the repair, there is no charge.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-light-gray py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-primary">Frequently Asked Questions</h2>
        </div>
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
              >
                <span className="font-medium text-primary">{faq.question}</span>
                <motion.span animate={{ rotate: openIndex === index ? 180 : 0 }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-gray-200">
                      <p className="text-dark-text">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
