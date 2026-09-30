/**
 * Azure Functions HTTP Trigger: GET /api/exercises
 * Track 1A.2: Build fetch route with Cosmos DB integration
 */

import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import {
  getExercises,
  getExerciseById,
  ExerciseFilterOptions,
} from '../services/cosmosService';

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
 * Common CORS headers
 */
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};

/**
 * Azure Functions v4 Request Handler for GET /api/exercises
 */
export async function exercisesHandler(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`[HTTP ${request.method}] /api/exercises received`);

  // Handle CORS Preflight
  if (request.method === 'OPTIONS') {
    return {
      status: 204,
      headers: CORS_HEADERS,
    };
  }

  try {
    const url = new URL(request.url);
    const query = url.searchParams;

    // Optional point read by ID: /api/exercises?id=PIL-CORE-001
    const idParam = query.get('id');
    if (idParam) {
      const exercise = await getExerciseById(idParam);
      if (!exercise) {
        return {
          status: 404,
          headers: {
            ...CORS_HEADERS,
            'Content-Type': 'application/json',
          },
          jsonBody: {
            error: 'Not Found',
            message: `Exercise with ID "${idParam}" was not found.`,
          },
        };
      }
      return {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json',
        },
        jsonBody: exercise,
      };
    }

    // Extract & validate filter parameters
    const filters: ExerciseFilterOptions = {};

    // 1. muscleGroup
    const muscleGroupParam = query.get('muscleGroup');
    if (muscleGroupParam) {
      const mg = muscleGroupParam.toLowerCase().trim();
      if (!VALID_MUSCLE_GROUPS.includes(mg)) {
        return {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          jsonBody: {
            error: 'Bad Request',
            message: `Invalid muscleGroup "${muscleGroupParam}". Allowed values: ${VALID_MUSCLE_GROUPS.join(', ')}`,
          },
        };
      }
      filters.muscleGroup = mg;
    }

    // 2. difficulty
    const difficultyParam = query.get('difficulty');
    if (difficultyParam) {
      const diff = parseInt(difficultyParam, 10);
      if (isNaN(diff) || ![1, 2, 3].includes(diff)) {
        return {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          jsonBody: {
            error: 'Bad Request',
            message: `Invalid difficulty "${difficultyParam}". Allowed values are 1 (Beginner), 2 (Intermediate), 3 (Advanced).`,
          },
        };
      }
      filters.difficulty = diff as 1 | 2 | 3;
    }

    // 3. equipment (supports single or comma-separated)
    const equipmentParam = query.get('equipment');
    if (equipmentParam) {
      const items = equipmentParam
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);

      for (const eq of items) {
        if (!VALID_EQUIPMENT.includes(eq)) {
          return {
            status: 400,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
            jsonBody: {
              error: 'Bad Request',
              message: `Invalid equipment "${eq}". Allowed values: ${VALID_EQUIPMENT.join(', ')}`,
            },
          };
        }
      }
      filters.equipment = items;
    }

    // 4. focus
    const focusParam = query.get('focus');
    if (focusParam) {
      const f = focusParam.toLowerCase().trim();
      if (!VALID_FOCUS.includes(f)) {
        return {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          jsonBody: {
            error: 'Bad Request',
            message: `Invalid focus "${focusParam}". Allowed values: ${VALID_FOCUS.join(', ')}`,
          },
        };
      }
      filters.focus = f;
    }

    // 5. category
    const categoryParam = query.get('category');
    if (categoryParam) {
      filters.category = categoryParam.trim();
    }

    // 6. limit & offset (pagination)
    const limitParam = query.get('limit');
    if (limitParam) {
      const lim = parseInt(limitParam, 10);
      if (!isNaN(lim) && lim > 0) {
        filters.limit = lim;
      }
    }

    const offsetParam = query.get('offset');
    if (offsetParam) {
      const off = parseInt(offsetParam, 10);
      if (!isNaN(off) && off >= 0) {
        filters.offset = off;
      }
    }

    // Execute query via Cosmos service
    const result = await getExercises(filters);

    return {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
        'X-Total-Count': result.count.toString(),
        'X-Data-Source': result.source,
        ...(result.ruConsumed ? { 'X-Cosmos-RU-Charge': result.ruConsumed.toString() } : {}),
      },
      jsonBody: result.exercises,
    };
  } catch (error) {
    const err = error as Error;
    context.error(`[Error in GET /api/exercises]: ${err.message}`, err.stack);

    return {
      status: 500,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
      jsonBody: {
        error: 'Internal Server Error',
        message: 'An unexpected error occurred while fetching exercises.',
      },
    };
  }
}

// Register the Azure Functions HTTP trigger (route: /api/exercises)
app.http('exercises', {
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'exercises',
  handler: exercisesHandler,
});
