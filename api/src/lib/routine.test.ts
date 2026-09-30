import test from 'node:test';
import assert from 'node:assert/strict';
import type { Exercise } from '../../../shared/types/exercise';
import data from '../../../data/exercises.json';
import { filterExercises, generateRoutine, RoutineOptions } from './routine';

const exercises = data as Exercise[];

const noJitter = () => 0;
const cases: RoutineOptions[] = [
  { focus: 'core', equipment: ['mat'], durationMinutes: 15 },
  { focus: 'core', equipment: ['mat'], durationMinutes: 60 },
  { focus: 'full_body', equipment: ['mat', 'bands'], durationMinutes: 30 },
  { focus: 'stretch', equipment: ['mat'], durationMinutes: 15 },
];

test('filters by focus and available equipment', () => {
  const pool = filterExercises(exercises, 'full_body', ['mat']);
  assert.ok(pool.length > 0);
  for (const e of pool) {
    assert.equal(e.focus, 'full_body');
    assert.ok([e.equipment].flat().every((item) => item === 'mat' || item === 'none'));
  }
});

test('returns an empty routine when nothing matches', () => {
  assert.deepEqual(generateRoutine([], { focus: 'core', equipment: ['mat'], durationMinutes: 15 }), []);
});

for (const options of cases) {
  const label = `${options.focus} / ${options.equipment} / ${options.durationMinutes} min`;
  const routine = generateRoutine(exercises, options, noJitter);
  const seconds = routine.reduce((sum, e) => sum + e.duration, 0);
  const levels = routine.map((e) => e.difficulty);

  test(`${label}: fills the duration by less than one extra exercise`, () => {
    const target = options.durationMinutes * 60;
    assert.ok(seconds >= target);
    assert.ok(seconds - routine.at(-1)!.duration < target);
  });

  test(`${label}: never repeats a muscle group back to back`, () => {
    routine.slice(1).forEach((e, i) => assert.notEqual(e.muscleGroup, routine[i].muscleGroup));
  });

  test(`${label}: ramps up, peaks in the middle and cools down`, () => {
    const third = Math.floor(routine.length / 3);
    const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
    const [start, middle, end] = [levels.slice(0, third), levels.slice(third, -third), levels.slice(-third)].map(avg);
    assert.ok(levels[0] <= middle && middle > start && middle > end, levels.join(''));
    assert.equal(levels.at(-1), Math.min(...levels));
  });

  test(`${label}: uses every muscle group in the pool`, () => {
    const pool = filterExercises(exercises, options.focus, options.equipment);
    assert.deepEqual(
      new Set(routine.map((e) => e.muscleGroup)),
      new Set(pool.map((e) => e.muscleGroup))
    );
  });
}
