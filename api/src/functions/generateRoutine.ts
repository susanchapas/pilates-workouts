import { app, HttpRequest, HttpResponseInit } from '@azure/functions';
import type { EquipmentType, WorkoutFocus } from '../../../shared/types/exercise';
import { getExercises } from '../services/cosmosService';
import { generateRoutine, RoutineOptions } from '../lib/routine';

const FOCUSES: WorkoutFocus[] = ['core', 'full_body', 'stretch', 'lower_body', 'upper_body'];
const EQUIPMENT: EquipmentType[] = ['mat', 'bands', 'ball', 'none', 'reformer', 'weights'];
const MAX_MINUTES = 120;

function validate(body: Partial<RoutineOptions> | null): string | undefined {
  const { focus, equipment, durationMinutes } = body ?? {};
  if (!focus || !FOCUSES.includes(focus)) return `focus must be one of: ${FOCUSES.join(', ')}`;
  if (!Array.isArray(equipment) || !equipment.every((e) => EQUIPMENT.includes(e))) {
    return `equipment must be an array of: ${EQUIPMENT.join(', ')}`;
  }
  if (typeof durationMinutes !== 'number' || !(durationMinutes > 0 && durationMinutes <= MAX_MINUTES)) {
    return `durationMinutes must be a number from 1 to ${MAX_MINUTES}`;
  }
}

export async function generateRoutineHandler(request: HttpRequest): Promise<HttpResponseInit> {
  const body = (await request.json().catch(() => null)) as Partial<RoutineOptions> | null;
  const error = validate(body);
  if (error) return { status: 400, jsonBody: { error } };

  const { focus, equipment, durationMinutes } = body as RoutineOptions;
  const { exercises: bank } = await getExercises();
  const exercises = generateRoutine(bank, { focus, equipment, durationMinutes });
  if (!exercises.length) {
    return { status: 422, jsonBody: { error: 'No exercises match this focus and equipment' } };
  }

  const totalSeconds = exercises.reduce((sum, e) => sum + e.duration, 0);
  return { jsonBody: { focus, equipment, durationMinutes, totalSeconds, exercises } };
}

app.http('generateRoutine', {
  methods: ['POST'],
  route: 'generate-routine',
  authLevel: 'anonymous',
  handler: generateRoutineHandler,
});
