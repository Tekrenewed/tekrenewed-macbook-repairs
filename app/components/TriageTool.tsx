'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { repairData } from '@/lib/repairData';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

type Quote = {
  diagnosis: string;
  priceRange: string;
};

const TriageTool = () => {
  const [step, setStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState('');
  const [problemCategory, setProblemCategory] = useState('');
  const [specificProblem, setSpecificProblem] = useState('');
  const [finalQuote, setFinalQuote] = useState<Quote | null>(null);
  const [customerDetails, setCustomerDetails] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setStep(2);
  };

  const handleCategorySelect = (category: string) => {
    setProblemCategory(category);
    setStep(3);
  };

  const handleProblemSelect = (problem: string) => {
    setSpecificProblem(problem);
    const quote = (repairData as any)[selectedModel][problemCategory][problem];
    setFinalQuote(quote);
    setStep(4);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalQuote) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        ...customerDetails,
        model: selectedModel,
        problem: specificProblem,
        priceRange: finalQuote.priceRange,
        diagnosis: finalQuote.diagnosis,
        submittedAt: new Date(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('There was an error submitting your quote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetTool = () => {
    setStep(1);
    setSelectedModel('');
    setProblemCategory('');
    setSpecificProblem('');
    setFinalQuote(null);
    setCustomerDetails({ name: '', email: '', phone: '' });
    setIsSubmitted(false);
  }

  const models = Object.keys(repairData);
  const categories = selectedModel ? Object.keys((repairData as any)[selectedModel]) : [];
  const problems = selectedModel && problemCategory ? Object.keys((repairData as any)[selectedModel][problemCategory]) : [];

  const renderStep = () => {
    if (isSubmitted) {
        return (
            <div className="text-center">
                <h3 className="text-2xl font-bold text-primary">Thank You!</h3>
                <p className="mt-4 text-lg">Your quote request has been submitted. We will be in touch shortly.</p>
                <button onClick={resetTool} className="mt-6 bg-secondary text-white px-6 py-2 rounded-md font-medium">Start New Quote</button>
            </div>
        )
    }

    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-2xl font-bold text-center text-primary">Select Your MacBook Model</h3>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {models.map(model => (
                <motion.button key={model} onClick={() => handleModelSelect(model)} whileHover={{ scale: 1.05 }} className="p-4 border rounded-lg">{model}</motion.button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
            <div>
                <h3 className="text-2xl font-bold text-center text-primary">What's the Problem?</h3>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    {categories.map(category => (
                        <motion.button key={category} onClick={() => handleCategorySelect(category)} whileHover={{ scale: 1.05 }} className="p-4 border rounded-lg">{category}</motion.button>
                    ))}
                </div>
                <button onClick={() => setStep(1)} className="mt-4 text-sm">Go Back</button>
            </div>
        );
      case 3:
        return (
            <div>
                <h3 className="text-2xl font-bold text-center text-primary">Select the Specific Issue</h3>
                <div className="grid grid-cols-1 gap-4 mt-6">
                    {problems.map(problem => (
                        <motion.button key={problem} onClick={() => handleProblemSelect(problem)} whileHover={{ scale: 1.05 }} className="p-4 border rounded-lg">{problem}</motion.button>
                    ))}
                </div>
                <button onClick={() => setStep(2)} className="mt-4 text-sm">Go Back</button>
            </div>
        );
      case 4:
        return (
          finalQuote && (
            <div>
              <h3 className="text-2xl font-bold text-center text-primary">Your Instant Estimate</h3>
              <div className="mt-6 p-6 bg-light-gray rounded-lg text-center">
                <p className="text-lg"><strong>Diagnosis:</strong> {finalQuote.diagnosis}</p>
                <p className="text-2xl font-bold text-primary my-4">Price: {finalQuote.priceRange}</p>
                <p className="text-sm">This is an estimate. A final quote will be provided after a free, hands-on inspection.</p>
              </div>
              <form onSubmit={handleFormSubmit} className="mt-6">
                <h4 className="text-xl font-bold text-center text-primary">Get this quote sent to your email</h4>
                <div className="space-y-4 mt-4">
                    <input type="text" name="name" placeholder="Name" required onChange={handleFormChange} className="w-full p-2 border rounded" />
                    <input type="email" name="email" placeholder="Email" required onChange={handleFormChange} className="w-full p-2 border rounded" />
                    <input type="tel" name="phone" placeholder="Phone (Optional)" onChange={handleFormChange} className="w-full p-2 border rounded" />
                </div>
                <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.05 }} className="w-full mt-4 bg-secondary text-white p-3 rounded-lg font-bold">
                    {isSubmitting ? 'Submitting...' : 'Submit Quote'}
                </motion.button>
              </form>
              <button onClick={() => setStep(3)} className="mt-4 text-sm">Go Back</button>
            </div>
          )
        );
      default:
        return null;
    }
  };

  return (
    <section id="triage-tool" className="py-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step + (isSubmitted ? 10 : 0)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderStep()}
                </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TriageTool;
