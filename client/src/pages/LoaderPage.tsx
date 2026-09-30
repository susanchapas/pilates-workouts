import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
  "Analyzing your preferences...",
  "Filtering exercise bank...",
  "Building a balanced sequence...",
  "Optimizing difficulty arc...",
  "Finalizing routine..."
];

export const LoaderPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => navigate('/overview'), 500);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-8"></div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 animate-pulse">
        {steps[currentStep]}
      </h2>
      <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mt-4">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
