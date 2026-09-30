import type { EquipmentType, Exercise, WorkoutFocus } from '../../../shared/types/exercise';

export interface RoutineOptions {
  focus: WorkoutFocus;
  equipment: EquipmentType[];
  durationMinutes: number;
}

const WEIGHTS = { sameGroup: 100, difficulty: 15, groupBalance: 3, repeat: 8, jitter: 2 };
const PEAK_START = 0.35;
const PEAK_END = 0.7;

const asArray = <T>(value: T | T[] | undefined): T[] => [].concat((value ?? []) as never);

/**
 * Keeps exercises that match the focus and need only the available equipment ('none' is always available).
 */
export function filterExercises(exercises: Exercise[], focus: WorkoutFocus, equipment: EquipmentType[]): Exercise[] {
  const available = new Set<EquipmentType>([...equipment, 'none']);
  return exercises.filter(
    (e) => asArray(e.focus).includes(focus) && asArray(e.equipment).every((item) => available.has(item))
  );
}

/**
 * Difficulty arc shape from 0 (easiest) to 1 (hardest): ramp up, hold the peak, cool down.
 * @param progress elapsed fraction of the workout, 0..1
 */
function arc(progress: number): number {
  if (progress < PEAK_START) return progress / PEAK_START;
  if (progress <= PEAK_END) return 1;
  return Math.max(0, 1 - (progress - PEAK_END) / (1 - PEAK_END));
}

/**
 * Greedily builds a routine that fills the duration. Exercises repeat as extra sets when the pool is too small.
 */
export function generateRoutine(
  exercises: Exercise[],
  { focus, equipment, durationMinutes }: RoutineOptions,
  random: () => number = Math.random
): Exercise[] {
  const pool = filterExercises(exercises, focus, equipment);
  if (!pool.length) return [];

  const levels = pool.map((e) => e.difficulty);
  const minLevel = Math.min(...levels);
  const maxLevel = Math.max(...levels);
  const totalSeconds = durationMinutes * 60;
  const groupCounts = new Map<string, number>();
  const useCounts = new Map<string, number>();
  const routine: Exercise[] = [];
  let elapsed = 0;

  while (elapsed < totalSeconds) {
    const target = minLevel + (maxLevel - minLevel) * arc(elapsed / totalSeconds);
    const previous = routine.at(-1);
    const score = (e: Exercise) =>
      -(previous?.muscleGroup === e.muscleGroup ? WEIGHTS.sameGroup : 0) -
      WEIGHTS.difficulty * Math.abs(e.difficulty - target) -
      WEIGHTS.groupBalance * (groupCounts.get(e.muscleGroup) ?? 0) -
      WEIGHTS.repeat * (useCounts.get(e.id) ?? 0) +
      WEIGHTS.jitter * random();

    const best = pool
      .map((e) => ({ e, s: score(e) }))
      .reduce((a, b) => (b.s > a.s ? b : a)).e;
    routine.push(best);
    elapsed += best.duration;
    groupCounts.set(best.muscleGroup, (groupCounts.get(best.muscleGroup) ?? 0) + 1);
    useCounts.set(best.id, (useCounts.get(best.id) ?? 0) + 1);
  }

  return routine;
}
