/**
 * Cosmos DB Service for Pilates Workout Generator
 * Track 1A.2: Cosmos DB Client, Query Builder, and Fetch Service
 * Track 1A.3: Database Seeding & Upsert Engine
 */

import { CosmosClient, Database, Container, SqlParameter, SqlQuerySpec } from '@azure/cosmos';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import type {
  Exercise,
  ExerciseDocument,
  MuscleGroup,
  DifficultyLevel,
  EquipmentType,
  WorkoutFocus
} from '../../../shared/types/exercise';

// Load environment variables from .env or local.settings.json
dotenv.config();

// Attempt to load from api/local.settings.json if present and env vars are not set
function loadLocalSettings(): void {
  const localSettingsPath = path.resolve(__dirname, '../../local.settings.json');
  if (fs.existsSync(localSettingsPath)) {
    try {
      const raw = fs.readFileSync(localSettingsPath, 'utf-8');
      const settings = JSON.parse(raw);
      if (settings?.Values) {
        Object.entries(settings.Values).forEach(([key, val]) => {
          if (!process.env[key] && typeof val === 'string') {
            process.env[key] = val;
          }
        });
      }
    } catch {
      // Ignore parse errors, proceed with existing process.env
    }
  }
}

loadLocalSettings();

/**
 * Filter options for querying exercises
 */
export interface ExerciseFilterOptions {
  muscleGroup?: MuscleGroup | string;
  difficulty?: DifficultyLevel | number;
  equipment?: EquipmentType | EquipmentType[] | string | string[];
  focus?: WorkoutFocus | WorkoutFocus[] | string | string[];
  category?: string;
  limit?: number;
  offset?: number;
}

/**
 * Service response envelope
 */
export interface ExerciseQueryResult {
  exercises: Exercise[];
  count: number;
  source: 'cosmos-db' | 'local-fallback';
  ruConsumed?: number;
}

/**
 * Cosmos DB Configuration
 */
export interface CosmosConfig {
  connectionString?: string;
  endpoint?: string;
  key?: string;
  databaseId: string;
  containerId: string;
  partitionKey: string;
}

export function getCosmosConfig(): CosmosConfig {
  return {
    connectionString: process.env.COSMOS_DB_CONNECTION_STRING || undefined,
    endpoint: process.env.COSMOS_DB_ENDPOINT || undefined,
    key: process.env.COSMOS_DB_KEY || undefined,
    databaseId: process.env.COSMOS_DB_DATABASE_ID || 'pilates-db',
    containerId: process.env.COSMOS_DB_CONTAINER_ID || 'exercises',
    partitionKey: process.env.COSMOS_DB_PARTITION_KEY || '/id',
  };
}

let cachedClient: CosmosClient | null = null;
let cachedContainer: Container | null = null;

/**
 * Check if valid Cosmos DB credentials are configured
 */
export function isCosmosConfigured(): boolean {
  const config = getCosmosConfig();
  if (config.connectionString && config.connectionString.trim().length > 0 && !config.connectionString.includes('<your-account-key>')) {
    return true;
  }
  if (config.endpoint && config.key && !config.endpoint.includes('<your-account-name>')) {
    return true;
  }
  return false;
}

/**
 * Get or initialize the CosmosClient instance
 */
export function getCosmosClient(): CosmosClient {
  if (cachedClient) {
    return cachedClient;
  }

  const config = getCosmosConfig();
  if (config.connectionString && !config.connectionString.includes('<your-account-key>')) {
    cachedClient = new CosmosClient(config.connectionString);
    return cachedClient;
  }

  if (config.endpoint && config.key && !config.endpoint.includes('<your-account-name>')) {
    cachedClient = new CosmosClient({
      endpoint: config.endpoint,
      key: config.key,
    });
    return cachedClient;
  }

  throw new Error('Cosmos DB is not configured. Please provide COSMOS_DB_CONNECTION_STRING or COSMOS_DB_ENDPOINT and COSMOS_DB_KEY.');
}

/**
 * Get the exercises container reference
 */
export async function getExercisesContainer(): Promise<Container> {
  if (cachedContainer) {
    return cachedContainer;
  }

  const client = getCosmosClient();
  const config = getCosmosConfig();
  const database = client.database(config.databaseId);
  cachedContainer = database.container(config.containerId);
  return cachedContainer;
}

/**
 * Load local exercises dataset from data/exercises.json as fallback
 */
export function getLocalExercises(): Exercise[] {
  const possiblePaths = [
    path.resolve(__dirname, '../../../data/exercises.json'),
    path.resolve(process.cwd(), 'data/exercises.json'),
    path.resolve(process.cwd(), '../data/exercises.json'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf-8');
      return JSON.parse(content) as Exercise[];
    }
  }

  throw new Error('Could not locate data/exercises.json in expected directories.');
}

/**
 * Apply in-memory filtering for local fallback or testing
 */
export function filterExercisesInMemory(
  exercises: Exercise[],
  filters: ExerciseFilterOptions
): Exercise[] {
  let result = [...exercises];

  if (filters.muscleGroup) {
    const mg = filters.muscleGroup.toLowerCase();
    result = result.filter((e) => e.muscleGroup.toLowerCase() === mg);
  }

  if (filters.difficulty !== undefined) {
    const diff = Number(filters.difficulty);
    result = result.filter((e) => e.difficulty === diff);
  }

  if (filters.category) {
    const cat = filters.category.toLowerCase();
    result = result.filter(
      (e) => e.category && e.category.toLowerCase().includes(cat)
    );
  }

  if (filters.focus) {
    const focusList = (Array.isArray(filters.focus) ? filters.focus : [filters.focus]).map((f) =>
      String(f).toLowerCase()
    );
    result = result.filter((e) => {
      if (!e.focus) return false;
      const exFocus = Array.isArray(e.focus) ? e.focus : [e.focus];
      return exFocus.some((f) => focusList.includes(String(f).toLowerCase()));
    });
  }

  if (filters.equipment) {
    const eqList = (
      Array.isArray(filters.equipment)
        ? filters.equipment
        : String(filters.equipment).split(',')
    )
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    if (eqList.length > 0) {
      result = result.filter((e) => {
        const itemEq = (Array.isArray(e.equipment) ? e.equipment : [e.equipment]).map((eq) =>
          eq.toLowerCase()
        );
        // Exercise matches if any of the queried equipment matches,
        // or if exercise equipment is a subset of queried equipment
        return itemEq.some((eq) => eqList.includes(eq));
      });
    }
  }

  return result.sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Apply limit/offset identically for Cosmos DB and local results
 */
function paginate<T>(items: T[], { offset = 0, limit }: ExerciseFilterOptions): T[] {
  return items.slice(offset, limit ? offset + limit : undefined);
}

/**
 * Fetch exercises from Azure Cosmos DB, or from the local JSON dataset when Cosmos DB is not configured
 * Track 1A.2 Implementation
 */
export async function getExercises(filters: ExerciseFilterOptions = {}): Promise<ExerciseQueryResult> {
  // If Cosmos DB is not configured, fall back to local dataset
  if (!isCosmosConfigured()) {
    const exercises = paginate(filterExercisesInMemory(getLocalExercises(), filters), filters);
    return {
      exercises,
      count: exercises.length,
      source: 'local-fallback',
    };
  }

  const container = await getExercisesContainer();

  // Construct SQL Query with parameters
  const conditions: string[] = ['1=1'];
  const parameters: SqlParameter[] = [];

  if (filters.muscleGroup) {
    conditions.push('c.muscleGroup = @muscleGroup');
    parameters.push({
      name: '@muscleGroup',
      value: filters.muscleGroup.toLowerCase(),
    });
  }

  if (filters.difficulty !== undefined) {
    conditions.push('c.difficulty = @difficulty');
    parameters.push({
      name: '@difficulty',
      value: Number(filters.difficulty),
    });
  }

  if (filters.category) {
    conditions.push('CONTAINS(LOWER(c.category), @category)');
    parameters.push({
      name: '@category',
      value: filters.category.toLowerCase(),
    });
  }

  if (filters.focus) {
    const focusVal = Array.isArray(filters.focus)
      ? filters.focus[0]
      : filters.focus;
    conditions.push('(c.focus = @focus OR ARRAY_CONTAINS(c.focus, @focus))');
    parameters.push({
      name: '@focus',
      value: String(focusVal).toLowerCase(),
    });
  }

  if (filters.equipment) {
    const eqList = (
      Array.isArray(filters.equipment)
        ? filters.equipment
        : String(filters.equipment).split(',')
    )
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    if (eqList.length === 1) {
      conditions.push(
        '(c.equipment = @equipment OR ARRAY_CONTAINS(c.equipment, @equipment))'
      );
      parameters.push({
        name: '@equipment',
        value: eqList[0],
      });
    } else if (eqList.length > 1) {
      // Multi-equipment OR matching
      const orClauses = eqList.map((eq, idx) => {
        parameters.push({ name: `@eq_${idx}`, value: eq });
        return `(c.equipment = @eq_${idx} OR ARRAY_CONTAINS(c.equipment, @eq_${idx}))`;
      });
      conditions.push(`(${orClauses.join(' OR ')})`);
    }
  }

  const queryText = `SELECT * FROM c WHERE ${conditions.join(' AND ')} ORDER BY c.id ASC`;

  const querySpec: SqlQuerySpec = {
    query: queryText,
    parameters,
  };

  const queryIterator = container.items.query<ExerciseDocument>(querySpec);
  const { resources, requestCharge } = await queryIterator.fetchAll();
  const exercises = paginate(resources, filters);

  return {
    exercises,
    count: exercises.length,
    source: 'cosmos-db',
    ruConsumed: requestCharge,
  };
}

/**
 * Fetch a single exercise by ID
 */
export async function getExerciseById(id: string): Promise<Exercise | null> {
  if (!isCosmosConfigured()) {
    const local = getLocalExercises();
    return local.find((e) => e.id === id) || null;
  }

  const container = await getExercisesContainer();
  const config = getCosmosConfig();

  if (config.partitionKey === '/id') {
    const { resource } = await container.item(id, id).read<ExerciseDocument>();
    return resource || null;
  }

  // Query by ID across partitions
  const querySpec: SqlQuerySpec = {
    query: 'SELECT * FROM c WHERE c.id = @id',
    parameters: [{ name: '@id', value: id }],
  };
  const { resources } = await container.items.query<ExerciseDocument>(querySpec).fetchAll();
  return resources.length > 0 ? resources[0] : null;
}

/**
 * Seeding statistics
 */
export interface SeedResult {
  success: boolean;
  totalExercises: number;
  inserted: number;
  failed: number;
  dryRun: boolean;
  source: string;
  errors: string[];
  durationMs: number;
  stats: {
    byMuscleGroup: Record<string, number>;
    byDifficulty: Record<number, number>;
    byEquipment: Record<string, number>;
    byFocus: Record<string, number>;
  };
}

/**
 * Seed Azure Cosmos DB with exercise documents
 * Track 1A.3 Implementation
 */
export async function seedCosmosDatabase(options: { dryRun?: boolean } = {}): Promise<SeedResult> {
  const startTime = Date.now();
  const dryRun = options.dryRun ?? false;
  const exercises = getLocalExercises();

  const stats = {
    byMuscleGroup: {} as Record<string, number>,
    byDifficulty: { 1: 0, 2: 0, 3: 0 } as Record<number, number>,
    byEquipment: {} as Record<string, number>,
    byFocus: {} as Record<string, number>,
  };

  // Compile statistics
  exercises.forEach((ex) => {
    stats.byMuscleGroup[ex.muscleGroup] = (stats.byMuscleGroup[ex.muscleGroup] || 0) + 1;
    stats.byDifficulty[ex.difficulty] = (stats.byDifficulty[ex.difficulty] || 0) + 1;

    const eqList = Array.isArray(ex.equipment) ? ex.equipment : [ex.equipment];
    eqList.forEach((eq) => {
      stats.byEquipment[eq] = (stats.byEquipment[eq] || 0) + 1;
    });

    const focusList = ex.focus ? (Array.isArray(ex.focus) ? ex.focus : [ex.focus]) : [];
    focusList.forEach((f) => {
      stats.byFocus[f] = (stats.byFocus[f] || 0) + 1;
    });
  });

  if (dryRun) {
    return {
      success: true,
      totalExercises: exercises.length,
      inserted: exercises.length,
      failed: 0,
      dryRun: true,
      source: 'local data/exercises.json (Dry Run)',
      errors: [],
      durationMs: Date.now() - startTime,
      stats,
    };
  }

  // Live Seeding to Cosmos DB
  if (!isCosmosConfigured()) {
    throw new Error(
      'Cosmos DB is not configured. Set COSMOS_DB_CONNECTION_STRING in your environment or api/local.settings.json, or pass --dry-run.'
    );
  }

  const client = getCosmosClient();
  const config = getCosmosConfig();

  // 1. Ensure database exists
  const { database } = await client.databases.createIfNotExists({
    id: config.databaseId,
  });

  // 2. Ensure container exists
  const { container } = await database.containers.createIfNotExists({
    id: config.containerId,
    partitionKey: {
      paths: [config.partitionKey],
    },
  });

  let inserted = 0;
  const errors: string[] = [];

  // 3. Upsert each exercise document
  for (const ex of exercises) {
    try {
      await container.items.upsert(ex);
      inserted++;
    } catch (err) {
      const errorMsg = `Failed to upsert exercise ${ex.id} (${ex.name}): ${(err as Error).message}`;
      errors.push(errorMsg);
    }
  }

  return {
    success: errors.length === 0,
    totalExercises: exercises.length,
    inserted,
    failed: errors.length,
    dryRun: false,
    source: `Azure Cosmos DB [${config.databaseId}/${config.containerId}]`,
    errors,
    durationMs: Date.now() - startTime,
    stats,
  };
}
