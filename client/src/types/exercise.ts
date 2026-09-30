export type Difficulty = 1 | 2 | 3;
export type EquipmentType = 'mat' | 'bands' | 'ball' | 'none';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  difficulty: Difficulty;
  equipment: EquipmentType[];
  duration: number; // in seconds
  instructions: string;
}

export interface GeneratedRoutine {
  id: string;
  focus: string;
  duration: number;
  exercises: Exercise[];
}
