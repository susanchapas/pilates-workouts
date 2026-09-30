/**
 * Pilates Workout Generator - Data Models & TypeScript Types
 * Track 1A.1: Data Models for Exercises
 */

/**
 * Primary muscle group or anatomical area targeted by the exercise.
 * Used by the scoring algorithm (Track 1B) to prevent consecutive identical
 * muscle groups and balance routine fatigue.
 */
export type MuscleGroup =
  | 'core'
  | 'obliques'
  | 'posterior_chain'
  | 'lower_body'
  | 'upper_body'
  | 'full_body';

/**
 * Numeric difficulty levels:
 * 1 = Beginner
 * 2 = Intermediate
 * 3 = Advanced
 */
export type DifficultyLevel = 1 | 2 | 3;

/**
 * Human-readable difficulty labels.
 */
export type DifficultyLabel = 'Beginner' | 'Intermediate' | 'Advanced';

/**
 * Supported equipment items.
 * Core wizard options: 'mat' | 'bands' | 'ball' | 'none'
 * Dataset extensions: 'reformer' | 'weights'
 */
export type EquipmentType =
  | 'mat'
  | 'bands'
  | 'ball'
  | 'none'
  | 'reformer'
  | 'weights';

/**
 * Routine focus categories selectable in the frontend wizard (Track 2C.1)
 * and filtered by the matching engine (Track 1B.1).
 */
export type WorkoutFocus =
  | 'core'
  | 'full_body'
  | 'stretch'
  | 'lower_body'
  | 'upper_body';

/**
 * Pilates functional categories from the exercise library.
 */
export type ExerciseCategory =
  | 'Anterior Core & Abdominals'
  | 'Obliques & Lateral Chain'
  | 'Posterior Chain & Spine Extensors'
  | 'Glutes, Hips & Lower Body'
  | 'Upper Body, Chest & Arms'
  | 'Full-Body Integration & Spinal Articulation';

/**
 * Core Exercise Data Model
 * Conforms to JSON document schema for Cosmos DB storage and API responses.
 *
 * Required fields per Track 1A.1:
 * - id: unique string identifier
 * - name: exercise title
 * - muscleGroup: primary target muscle group
 * - difficulty: numeric level (1-3)
 * - equipment: equipment requirement (array of types or single type)
 * - duration: duration in seconds
 * - instructions: execution instructions and coaching cues
 */
export interface Exercise {
  /** Unique document identifier (e.g. 'PIL-CORE-001') */
  id: string;

  /** Display name of the exercise */
  name: string;

  /** Primary anatomical target */
  muscleGroup: MuscleGroup;

  /** Difficulty rating from 1 (Beginner) to 3 (Advanced) */
  difficulty: DifficultyLevel;

  /** Required equipment */
  equipment: EquipmentType[] | EquipmentType;

  /** Standard duration in seconds */
  duration: number;

  /** Comprehensive execution instructions and form cues */
  instructions: string;

  // --- Supplementary / Dataset Metadata Fields ---

  /** Pilates functional category */
  category?: ExerciseCategory | string;

  /** Specific muscles activated */
  targetMuscles?: string[];

  /** Textual difficulty level representation */
  difficultyLabel?: DifficultyLabel;

  /** Routine focus compatibility */
  focus?: WorkoutFocus | WorkoutFocus[];

  /** Target repetition range or breath count */
  reps?: string;

  /** Quick coaching cue for active workout player */
  keyCue?: string;
}

/**
 * Cosmos DB Exercise Document
 * Represents the document as persisted in Azure Cosmos DB with system properties.
 */
export interface ExerciseDocument extends Exercise {
  /** Cosmos DB internal resource ID */
  _rid?: string;

  /** Cosmos DB resource URI */
  _self?: string;

  /** Cosmos DB entity tag for optimistic concurrency */
  _etag?: string;

  /** Cosmos DB attachments URI */
  _attachments?: string;

  /** Cosmos DB timestamp (seconds since Unix epoch) */
  _ts?: number;
}

/**
 * DTO for creating a new exercise via API
 */
export type CreateExerciseDto = Omit<
  Exercise,
  'id' | '_rid' | '_self' | '_etag' | '_attachments' | '_ts'
> & {
  id?: string;
};

/**
 * DTO for updating an existing exercise via API
 */
export type UpdateExerciseDto = Partial<CreateExerciseDto>;

/**
 * Constant mappings for difficulty ratings
 */
export const DIFFICULTY_MAP: Record<DifficultyLevel, DifficultyLabel> = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
};

/**
 * Mapping from Pilates library categories to canonical muscle groups
 */
export const CATEGORY_TO_MUSCLE_GROUP: Record<ExerciseCategory, MuscleGroup> = {
  'Anterior Core & Abdominals': 'core',
  'Obliques & Lateral Chain': 'obliques',
  'Posterior Chain & Spine Extensors': 'posterior_chain',
  'Glutes, Hips & Lower Body': 'lower_body',
  'Upper Body, Chest & Arms': 'upper_body',
  'Full-Body Integration & Spinal Articulation': 'full_body',
};

/**
 * Type guard to check if an object satisfies the Exercise interface
 */
export function isExercise(obj: unknown): obj is Exercise {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  const e = obj as Record<string, unknown>;

  const hasValidId = typeof e.id === 'string' && e.id.trim().length > 0;
  const hasValidName = typeof e.name === 'string' && e.name.trim().length > 0;
  const hasValidMuscleGroup =
    typeof e.muscleGroup === 'string' &&
    ['core', 'obliques', 'posterior_chain', 'lower_body', 'upper_body', 'full_body'].includes(
      e.muscleGroup
    );
  const hasValidDifficulty =
    typeof e.difficulty === 'number' && [1, 2, 3].includes(e.difficulty);
  const hasValidDuration =
    typeof e.duration === 'number' && e.duration >= 15 && e.duration <= 300;
  const hasValidInstructions =
    typeof e.instructions === 'string' && e.instructions.trim().length >= 10;

  const validEquipmentTypes: EquipmentType[] = [
    'mat',
    'bands',
    'ball',
    'none',
    'reformer',
    'weights',
  ];

  let hasValidEquipment = false;
  if (typeof e.equipment === 'string') {
    hasValidEquipment = validEquipmentTypes.includes(e.equipment as EquipmentType);
  } else if (Array.isArray(e.equipment) && e.equipment.length > 0) {
    hasValidEquipment = e.equipment.every(
      (eq) => typeof eq === 'string' && validEquipmentTypes.includes(eq as EquipmentType)
    );
  }

  return (
    hasValidId &&
    hasValidName &&
    hasValidMuscleGroup &&
    hasValidDifficulty &&
    hasValidDuration &&
    hasValidInstructions &&
    hasValidEquipment
  );
}
