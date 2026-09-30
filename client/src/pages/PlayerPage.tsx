import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Exercise } from '../types/exercise';

const mockExercises: Exercise[] = [
  { id: '1', name: 'Hundred', muscleGroup: 'Core', difficulty: 1, equipment: ['mat'], duration: 60, instructions: 'Pump arms up and down...' },
  { id: '2', name: 'Roll Up', muscleGroup: 'Core', difficulty: 2, equipment: ['mat'], duration: 60, instructions: 'Roll up smoothly...' },
  { id: '3', name: 'Teaser', muscleGroup: 'Core', difficulty: 3, equipment: ['mat'], duration: 60, instructions: 'Balance on sit bones...' },
];

export const PlayerPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mockExercises[0].duration);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const currentExercise = mockExercises[currentIndex];
  const nextExercise = mockExercises[currentIndex + 1];

  useEffect(() => {
    let timer: any;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isPlaying && timeLeft === 0) {
      if (currentIndex < mockExercises.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setTimeLeft(mockExercises[currentIndex + 1].duration);
      } else {
        setIsPlaying(false);
        // workout complete
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, currentIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header / Progress */}
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        <button onClick={() => navigate('/overview')} className="text-gray-400 hover:text-white">
          &larr; Exit
        </button>
        <div className="text-sm font-medium text-gray-400">
          Exercise {currentIndex + 1} of {mockExercises.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-800">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentIndex) / mockExercises.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-5xl font-bold mb-4">{currentExercise.name}</h2>
        <p className="text-xl text-gray-400 mb-12">{currentExercise.instructions}</p>

        <div className="text-8xl font-mono mb-12 font-light">
          {formatTime(timeLeft)}
        </div>

        <button 
          onClick={togglePlay}
          className="w-24 h-24 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-3xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      {/* Up Next */}
      {nextExercise && (
        <div className="p-6 bg-gray-800 flex justify-between items-center border-t border-gray-700">
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Up Next</div>
            <div className="text-xl font-medium">{nextExercise.name}</div>
          </div>
          <div className="text-gray-400">
            {formatTime(nextExercise.duration)}
          </div>
        </div>
      )}
    </div>
  );
};
