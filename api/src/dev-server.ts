/**
 * Local Development Server (Express)
 * Implements Express route for GET /api/exercises per Track 1A.2
 * Allows local development without requiring Azure Functions Core Tools ('func')
 */

import express, { Request, Response } from 'express';
import cors from 'cors';
import {
  getExercises,
  getExerciseById,
  isCosmosConfigured,
  getCosmosConfig,
  ExerciseFilterOptions,
} from './services/cosmosService';

const app = express();
const PORT = process.env.PORT || 7071;

app.use(cors());
app.use(express.json());

const VALID_MUSCLE_GROUPS = [
  'core',
  'obliques',
  'posterior_chain',
  'lower_body',
  'upper_body',
  'full_body',
];

const VALID_EQUIPMENT = ['mat', 'bands', 'ball', 'none', 'reformer', 'weights'];
const VALID_FOCUS = ['core', 'full_body', 'stretch', 'lower_body', 'upper_body'];

/**
 * Health check & status endpoint
 */
app.get('/api/health', (req: Request, res: Response) => {
  const config = getCosmosConfig();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Pilates Workout Generator API',
    cosmosConfigured: isCosmosConfigured(),
    database: config.databaseId,
    container: config.containerId,
  });
});

/**
 * GET /api/exercises
 * Query parameters:
 *  - muscleGroup: string ('core', 'obliques', etc.)
 *  - difficulty: number (1, 2, 3)
 *  - equipment: string (comma-separated, e.g. 'mat,bands' or single 'mat')
 *  - focus: string ('core', 'full_body', 'stretch')
 *  - category: string
 *  - limit: number
 *  - offset: number
 */
app.get('/api/exercises', async (req: Request, res: Response) => {
  try {
    const { muscleGroup, difficulty, equipment, focus, category, limit, offset, id } = req.query;

    // Direct ID point lookup
    if (id && typeof id === 'string') {
      const exercise = await getExerciseById(id);
      if (!exercise) {
        res.status(404).json({
          error: 'Not Found',
          message: `Exercise with ID "${id}" was not found.`,
        });
        return;
      }
      res.json(exercise);
      return;
    }

    const filters: ExerciseFilterOptions = {};

    // 1. muscleGroup validation
    if (muscleGroup) {
      const mg = String(muscleGroup).toLowerCase().trim();
      if (!VALID_MUSCLE_GROUPS.includes(mg)) {
        res.status(400).json({
          error: 'Bad Request',
          message: `Invalid muscleGroup "${muscleGroup}". Allowed values: ${VALID_MUSCLE_GROUPS.join(', ')}`,
        });
        return;
      }
      filters.muscleGroup = mg;
    }

    // 2. difficulty validation
    if (difficulty !== undefined) {
      const diff = parseInt(String(difficulty), 10);
      if (isNaN(diff) || ![1, 2, 3].includes(diff)) {
        res.status(400).json({
          error: 'Bad Request',
          message: `Invalid difficulty "${difficulty}". Allowed values are 1 (Beginner), 2 (Intermediate), 3 (Advanced).`,
        });
        return;
      }
      filters.difficulty = diff as 1 | 2 | 3;
    }

    // 3. equipment validation
    if (equipment) {
      const items = String(equipment)
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);

      for (const eq of items) {
        if (!VALID_EQUIPMENT.includes(eq)) {
          res.status(400).json({
            error: 'Bad Request',
            message: `Invalid equipment "${eq}". Allowed values: ${VALID_EQUIPMENT.join(', ')}`,
          });
          return;
        }
      }
      filters.equipment = items;
    }

    // 4. focus validation
    if (focus) {
      const f = String(focus).toLowerCase().trim();
      if (!VALID_FOCUS.includes(f)) {
        res.status(400).json({
          error: 'Bad Request',
          message: `Invalid focus "${focus}". Allowed values: ${VALID_FOCUS.join(', ')}`,
        });
        return;
      }
      filters.focus = f;
    }

    // 5. category
    if (category) {
      filters.category = String(category).trim();
    }

    // 6. pagination
    if (limit) {
      const lim = parseInt(String(limit), 10);
      if (!isNaN(lim) && lim > 0) {
        filters.limit = lim;
      }
    }

    if (offset) {
      const off = parseInt(String(offset), 10);
      if (!isNaN(off) && off >= 0) {
        filters.offset = off;
      }
    }

    const result = await getExercises(filters);

    res.set({
      'X-Total-Count': result.count.toString(),
      'X-Data-Source': result.source,
      ...(result.ruConsumed ? { 'X-Cosmos-RU-Charge': result.ruConsumed.toString() } : {}),
    });

    res.json(result.exercises);
  } catch (error) {
    const err = error as Error;
    console.error(`[GET /api/exercises Error] ${err.message}`);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve exercises.',
    });
  }
});

/**
 * GET /api/exercises/:id
 */
app.get('/api/exercises/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exercise = await getExerciseById(id);
    if (!exercise) {
      res.status(404).json({
        error: 'Not Found',
        message: `Exercise with ID "${id}" was not found.`,
      });
      return;
    }
    res.json(exercise);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
});

// Start listening if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n Pilates Workout API Server running at http://localhost:${PORT}`);
    console.log(`   - Endpoint: http://localhost:${PORT}/api/exercises`);
    console.log(`   - Health:   http://localhost:${PORT}/api/health`);
    console.log(`   - Mode:     ${isCosmosConfigured() ? 'Azure Cosmos DB' : 'Local Fallback (data/exercises.json)'}\n`);
  });
}

export default app;
