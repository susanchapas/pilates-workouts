import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const steps = [
  "Analyzing your preferences...",
  "Filtering exercise bank...",
  "Building a balanced practice...",
  "Optimizing difficulty curve...",
  "Finalizing routine..."
];

export const RoutineLoaderPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 800);

    // Simulate API call finishing after ~4 seconds
    const redirectTimeout = setTimeout(() => {
      navigate('/routine');
    }, 4500);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center max-w-md w-full">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-6" />
        <h2 className="text-xl font-semibold text-neutral-800 mb-2">Generating Routine</h2>
        <div className="h-6">
          <p className="text-neutral-500 animate-pulse text-sm">
            {steps[currentStep]}
          </p>
        </div>
        
        <div className="w-full bg-neutral-100 h-2 rounded-full mt-8 overflow-hidden">
          <div 
            className="bg-blue-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
