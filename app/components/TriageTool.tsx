'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { macbookCategories, repairPricing } from '@/lib/repairData';
import { db, storage } from '@/lib/firebase'; // Import storage
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import storage functions

type Quote = {
  diagnosis: string;
  priceRange: string;
};

const TriageTool = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [problemCategory, setProblemCategory] = useState('');
  const [specificProblem, setSpecificProblem] = useState('');
  const [finalQuote, setFinalQuote] = useState<Quote | null>(null);
  const [customerDetails, setCustomerDetails] = useState({ name: '', email: '', phone: '', description: '' }); // Added description
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // For file input
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]); // For uploaded URLs
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // For upload state
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setStep(3);
  };

  const handleProblemCategorySelect = (category: string) => {
    setProblemCategory(category);
    setStep(4);
  };

  const handleProblemSelect = (problem: string) => {
    setSpecificProblem(problem);
    const quote = repairPricing[selectedModel][problemCategory][problem];
    setFinalQuote(quote);
    setStep(5);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // Added HTMLTextAreaElement
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    } else {
      setSelectedFiles([]);
    }
  };

  const uploadFiles = async (): Promise<string[]> => {
    if (selectedFiles.length === 0) return [];

    setIsUploading(true);
    const urls: string[] = [];
    try {
      for (const file of selectedFiles) {
        const storageRef = ref(storage, `repair-images/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              // setUploadProgress(progress); // If you want to show progress
            },
            (error) => {
              // Handle unsuccessful uploads
              console.error('File upload failed', error);
              reject(error);
            },
            () => {
              // Handle successful uploads on complete
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                urls.push(downloadURL);
                resolve();
              });
            }
          );
        });
      }
      setUploadedImageUrls(urls);
      return urls;
    } catch (error) {
      console.error('Error uploading files: ', error);
      alert('There was an error uploading your images. Please try again.');
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const handleWhatsAppChat = () => {
    const name = customerDetails.name || 'Customer';
    const issueDescription = customerDetails.description || 'no specific description provided';
    const message = `Hi, my name is ${name}. My MacBook has the following issue: ${issueDescription}. I used your Triage Tool and got an estimate for ${finalQuote?.priceRange || 'an unspecified repair'} for a ${selectedModel || 'MacBook'} with a ${specificProblem || 'general problem'}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/447355580800?text=${encodedMessage}`, '_blank');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalQuote) return;

    setIsSubmitting(true);
    let imageUrls: string[] = [];

    if (selectedFiles.length > 0) {
      imageUrls = await uploadFiles();
      if (imageUrls.length === 0 && selectedFiles.length > 0) { // If files were selected but none uploaded
        setIsSubmitting(false);
        return; // Stop submission if upload failed
      }
    }

    try {
      const docRef = await addDoc(collection(db, 'leads'), {
        ...customerDetails,
        model: selectedModel,
        problem: specificProblem,
        priceRange: finalQuote.priceRange,
        diagnosis: finalQuote.diagnosis,
        imageUrls: imageUrls, // Save uploaded image URLs
        submittedAt: new Date(),
      });

      // Call serverless function to send email (Part 4)
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadId: docRef.id,
          ...customerDetails,
          model: selectedModel,
          problem: specificProblem,
          priceRange: finalQuote.priceRange,
          diagnosis: finalQuote.diagnosis,
          imageUrls: imageUrls,
        }),
      });

      if (!emailResponse.ok) {
        console.error('Failed to send email', await emailResponse.text());
        alert('Quote submitted, but failed to send email notification.');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error adding document or sending email: ', error);
      alert('There was an error submitting your quote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetTool = () => {
    setStep(1);
    setSelectedCategory('');
    setSelectedModel('');
    setProblemCategory('');
    setSpecificProblem('');
    setFinalQuote(null);
    setCustomerDetails({ name: '', email: '', phone: '', description: '' }); // Reset description
    setSelectedFiles([]); // Reset files
    setUploadedImageUrls([]); // Reset uploaded URLs
    setIsSubmitted(false);
    setIsUploading(false); // Reset upload state
  }

  const categories = Object.keys(macbookCategories);
  const models = selectedCategory ? (macbookCategories as any)[selectedCategory] : [];
  const problemCategories = selectedModel ? Object.keys(repairPricing[selectedModel]) : [];
  const problems = selectedModel && problemCategory ? Object.keys(repairPricing[selectedModel][problemCategory]) : [];

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
            <h3 className="text-2xl font-bold text-center text-primary">Select Your MacBook Category</h3>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {categories.map(category => (
                <motion.button key={category} onClick={() => handleCategorySelect(category)} whileHover={{ scale: 1.05 }} className="p-4 border rounded-lg">{category}</motion.button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
            <div>
                <h3 className="text-2xl font-bold text-center text-primary">Select Your MacBook Model</h3>
                <div className="grid grid-cols-1 gap-4 mt-6">
                    {models.map((model: string) => (
                        <motion.button key={model} onClick={() => handleModelSelect(model)} whileHover={{ scale: 1.05 }} className="p-4 border rounded-lg">{model}</motion.button>
                    ))}
                </div>
                <button onClick={() => setStep(1)} className="mt-4 text-sm">Go Back</button>
            </div>
        );
      case 3:
        return (
            <div>
                <h3 className="text-2xl font-bold text-center text-primary">What's the Problem?</h3>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    {problemCategories.map(category => (
                        <motion.button key={category} onClick={() => handleProblemCategorySelect(category)} whileHover={{ scale: 1.05 }} className="p-4 border rounded-lg">{category}</motion.button>
                    ))}
                </div>
                <button onClick={() => setStep(2)} className="mt-4 text-sm">Go Back</button>
            </div>
        );
      case 4:
        return (
            <div>
                <h3 className="text-2xl font-bold text-center text-primary">Select the Specific Issue</h3>
                <div className="grid grid-cols-1 gap-4 mt-6">
                    {problems.map(problem => (
                        <motion.button key={problem} onClick={() => handleProblemSelect(problem)} whileHover={{ scale: 1.05 }} className="p-4 border rounded-lg">{problem}</motion.button>
                    ))}
                </div>
                <button onClick={() => setStep(3)} className="mt-4 text-sm">Go Back</button>
            </div>
        );
      case 5:
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
                    <input type="text" name="name" placeholder="Name" required onChange={handleFormChange} className="w-full p-2 border rounded" value={customerDetails.name} />
                    <input type="email" name="email" placeholder="Email" required onChange={handleFormChange} className="w-full p-2 border rounded" value={customerDetails.email} />
                    <input type="tel" name="phone" placeholder="Phone (Optional)" onChange={handleFormChange} className="w-full p-2 border rounded" value={customerDetails.phone} />
                    {/* New: Description Textarea */}
                    <textarea
                        name="description"
                        placeholder="Describe the issue in more detail (optional)"
                        rows={4}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded"
                        value={customerDetails.description}
                    ></textarea>
                    {/* New: File Upload Input */}
                    <div>
                        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                            Upload images (optional)
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                        />
                        {selectedFiles.length > 0 && (
                            <p className="mt-2 text-sm text-gray-500">Selected {selectedFiles.length} file(s).</p>
                        )}
                    </div>
                </div>
                <div className="mt-6 flex flex-col space-y-4">
                    {/* New: Submit via Email Button */}
                    <motion.button
                        type="submit" // This will trigger handleFormSubmit
                        disabled={isSubmitting || isUploading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-secondary text-white p-3 rounded-lg font-bold"
                    >
                        {isUploading ? 'Uploading Images...' : isSubmitting ? 'Submitting...' : 'Submit via Email'}
                    </motion.button>
                    {/* New: Chat on WhatsApp Button */}
                    <motion.button
                        type="button" // Important: not a submit button
                        onClick={handleWhatsAppChat}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-green-500 text-white p-3 rounded-lg font-bold"
                    >
                        Chat on WhatsApp
                    </motion.button>
                </div>
              </form>
              <button onClick={() => setStep(4)} className="mt-4 text-sm">Go Back</button>
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