import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Exercise } from '../types/exercise';

// Mock data for demo
const mockExercises: Exercise[] = [
  { id: '1', name: 'Hundred', muscleGroup: 'Core', difficulty: 1, equipment: ['mat'], duration: 60, instructions: '...' },
  { id: '2', name: 'Roll Up', muscleGroup: 'Core', difficulty: 2, equipment: ['mat'], duration: 60, instructions: '...' },
  { id: '3', name: 'Teaser', muscleGroup: 'Core', difficulty: 3, equipment: ['mat'], duration: 60, instructions: '...' },
  { id: '4', name: 'Swan', muscleGroup: 'Back', difficulty: 2, equipment: ['mat'], duration: 60, instructions: '...' },
  { id: '5', name: 'Childs Pose', muscleGroup: 'Full Body', difficulty: 1, equipment: ['mat'], duration: 60, instructions: '...' },
];

export const OverviewPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 mt-4">Your Routine is Ready</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">45-Minute Core Focus</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exercise</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockExercises.map((ex, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ex.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.muscleGroup}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.duration}s</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-1">
                    {[1,2,3].map(level => (
                      <div key={level} className={`h-2 w-4 rounded ${level <= ex.difficulty ? 'bg-blue-600' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Difficulty Arc</h3>
        <div className="h-32 flex items-end space-x-2">
          {mockExercises.map((ex, idx) => (
            <div key={idx} className="flex-1 flex flex-col justify-end group relative h-full">
              <div 
                className="bg-blue-500 rounded-t w-full transition-all"
                style={{ height: `${(ex.difficulty / 3) * 100}%` }}
              ></div>
              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs p-1 rounded whitespace-nowrap z-10 left-1/2 transform -translate-x-1/2">
                {ex.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
        >
          Back
        </button>
        <button 
          onClick={() => navigate('/player')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Start Workout
        </button>
      </div>
    </div>
  );
};
