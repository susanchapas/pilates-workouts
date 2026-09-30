#!/usr/bin/env node

/**
 * Exercise Data Model Validator
 * Validates data/exercises.json against schemas/exercise.schema.json
 * Track 1A.1: Define Data Models
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SCHEMA_PATH = path.join(ROOT_DIR, 'schemas', 'exercise.schema.json');
const DATA_PATH = path.join(ROOT_DIR, 'data', 'exercises.json');

console.log('='.repeat(70));
console.log('Pilates Exercise Data Model Validator - Track 1A.1');
console.log('='.repeat(70));

// 1. Check file existence
if (!fs.existsSync(SCHEMA_PATH)) {
  console.error(`❌ Schema file missing: ${SCHEMA_PATH}`);
  process.exit(1);
}

if (!fs.existsSync(DATA_PATH)) {
  console.error(`❌ Data file missing: ${DATA_PATH}`);
  process.exit(1);
}

// 2. Load schema and data
let schema;
let exercises;

try {
  schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf-8'));
  console.log(`✅ Loaded schema: "${schema.title}" (${SCHEMA_PATH})`);
} catch (err) {
  console.error(`❌ Failed to parse schema JSON: ${err.message}`);
  process.exit(1);
}

try {
  exercises = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  console.log(`✅ Loaded exercises data: ${exercises.length} items (${DATA_PATH})`);
} catch (err) {
  console.error(`❌ Failed to parse exercises data JSON: ${err.message}`);
  process.exit(1);
}

// 3. Validation Rules based on schema
const REQUIRED_FIELDS = schema.required || [
  'id',
  'name',
  'muscleGroup',
  'difficulty',
  'equipment',
  'duration',
  'instructions'
];

const VALID_MUSCLE_GROUPS = schema.properties.muscleGroup.enum;
const VALID_DIFFICULTIES = schema.properties.difficulty.enum;
const VALID_EQUIPMENT = ['mat', 'bands', 'ball', 'none', 'reformer', 'weights'];
const VALID_DIFFICULTY_LABELS = ['Beginner', 'Intermediate', 'Advanced'];
const VALID_FOCUS_VALUES = ['core', 'full_body', 'stretch', 'lower_body', 'upper_body'];

let errors = [];
const seenIds = new Set();
const stats = {
  total: exercises.length,
  byMuscleGroup: {},
  byDifficulty: { 1: 0, 2: 0, 3: 0 },
  byEquipment: {},
  byFocus: {}
};

exercises.forEach((ex, index) => {
  const prefix = `[Item ${index + 1} | ID: ${ex.id || 'MISSING'}]`;

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (ex[field] === undefined || ex[field] === null || ex[field] === '') {
      errors.push(`${prefix} Missing required field: "${field}"`);
    }
  }

  // ID validation
  if (typeof ex.id !== 'string' || !/^[A-Za-z0-9_-]+$/.test(ex.id)) {
    errors.push(`${prefix} "id" must be a valid alphanumeric string with hyphens/underscores.`);
  } else if (seenIds.has(ex.id)) {
    errors.push(`${prefix} Duplicate id found: "${ex.id}"`);
  } else {
    seenIds.add(ex.id);
  }

  // Name validation
  if (typeof ex.name !== 'string' || ex.name.trim().length < 2 || ex.name.trim().length > 100) {
    errors.push(`${prefix} "name" must be between 2 and 100 characters.`);
  }

  // Muscle group validation
  if (!VALID_MUSCLE_GROUPS.includes(ex.muscleGroup)) {
    errors.push(`${prefix} Invalid muscleGroup "${ex.muscleGroup}". Expected one of: ${VALID_MUSCLE_GROUPS.join(', ')}`);
  } else {
    stats.byMuscleGroup[ex.muscleGroup] = (stats.byMuscleGroup[ex.muscleGroup] || 0) + 1;
  }

  // Difficulty validation
  if (!VALID_DIFFICULTIES.includes(ex.difficulty)) {
    errors.push(`${prefix} Invalid difficulty ${ex.difficulty}. Expected 1, 2, or 3.`);
  } else {
    stats.byDifficulty[ex.difficulty] = (stats.byDifficulty[ex.difficulty] || 0) + 1;
  }

  // Equipment validation
  if (typeof ex.equipment === 'string') {
    if (!VALID_EQUIPMENT.includes(ex.equipment)) {
      errors.push(`${prefix} Invalid equipment string "${ex.equipment}".`);
    } else {
      stats.byEquipment[ex.equipment] = (stats.byEquipment[ex.equipment] || 0) + 1;
    }
  } else if (Array.isArray(ex.equipment)) {
    if (ex.equipment.length === 0) {
      errors.push(`${prefix} "equipment" array cannot be empty.`);
    }
    ex.equipment.forEach(eq => {
      if (!VALID_EQUIPMENT.includes(eq)) {
        errors.push(`${prefix} Invalid equipment item "${eq}" in array.`);
      }
      stats.byEquipment[eq] = (stats.byEquipment[eq] || 0) + 1;
    });
  } else {
    errors.push(`${prefix} "equipment" must be a string or array of strings.`);
  }

  // Duration validation
  if (typeof ex.duration !== 'number' || !Number.isInteger(ex.duration) || ex.duration < 15 || ex.duration > 300) {
    errors.push(`${prefix} "duration" must be an integer between 15 and 300 seconds. Got: ${ex.duration}`);
  }

  // Instructions validation
  if (typeof ex.instructions !== 'string' || ex.instructions.trim().length < 10) {
    errors.push(`${prefix} "instructions" must be a string with at least 10 characters.`);
  }

  // Supplementary checks
  if (ex.difficultyLabel && !VALID_DIFFICULTY_LABELS.includes(ex.difficultyLabel)) {
    errors.push(`${prefix} Invalid difficultyLabel "${ex.difficultyLabel}".`);
  }

  if (ex.difficulty && ex.difficultyLabel) {
    const expectedLabel = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' }[ex.difficulty];
    if (ex.difficultyLabel !== expectedLabel) {
      errors.push(`${prefix} Mismatched difficulty: difficulty is ${ex.difficulty} but difficultyLabel is "${ex.difficultyLabel}" (expected "${expectedLabel}").`);
    }
  }

  if (ex.focus) {
    const focusList = Array.isArray(ex.focus) ? ex.focus : [ex.focus];
    focusList.forEach(f => {
      if (!VALID_FOCUS_VALUES.includes(f)) {
        errors.push(`${prefix} Invalid focus value: "${f}".`);
      }
      stats.byFocus[f] = (stats.byFocus[f] || 0) + 1;
    });
  }
});

// Output results
console.log('\n--- Dataset Summary ---');
console.log(`Total Exercises: ${stats.total}`);
console.log('\nDistribution by Muscle Group:');
Object.entries(stats.byMuscleGroup).forEach(([k, v]) => {
  console.log(`  - ${k.padEnd(16)}: ${v} exercises`);
});

console.log('\nDistribution by Difficulty:');
console.log(`  - Level 1 (Beginner)    : ${stats.byDifficulty[1]}`);
console.log(`  - Level 2 (Intermediate): ${stats.byDifficulty[2]}`);
console.log(`  - Level 3 (Advanced)    : ${stats.byDifficulty[3]}`);

console.log('\nDistribution by Equipment:');
Object.entries(stats.byEquipment).forEach(([k, v]) => {
  console.log(`  - ${k.padEnd(12)}: ${v} occurrences`);
});

console.log('\nDistribution by Workout Focus:');
Object.entries(stats.byFocus).forEach(([k, v]) => {
  console.log(`  - ${k.padEnd(12)}: ${v} exercises`);
});

console.log('\n' + '-'.repeat(70));

if (errors.length > 0) {
  console.error(`\n❌ Validation FAILED with ${errors.length} error(s):`);
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log(`\n🎉 Validation PASSED: All ${stats.total} exercise documents strictly conform to the schema!`);
  console.log('='.repeat(70));
  process.exit(0);
}
