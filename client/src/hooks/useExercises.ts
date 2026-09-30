import { useEffect, useState } from 'react';
import type { Exercise } from '../../../shared/types/exercise';

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    fetch('/api/exercises')
      .then((res) => (res.ok ? res.json() : []))
      .then(setExercises)
      .catch(() => setExercises([]));
  }, []);

  return exercises;
}
