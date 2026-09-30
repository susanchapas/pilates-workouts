import type { EquipmentType, WorkoutFocus } from '../../../shared/types/exercise';

export type Focus = Extract<WorkoutFocus, 'core' | 'full_body' | 'stretch'>;
export type Equipment = Extract<EquipmentType, 'mat' | 'bands' | 'ball' | 'none'>;
export type Duration = 15 | 30 | 45 | 60;

export interface WizardState {
  goal: string;
  focus: Focus | null;
  equipment: Equipment[];
  duration: Duration;
}
