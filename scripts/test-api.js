#!/usr/bin/env node

/**
 * Test Suite for Pilates Workout Generator - Phase 1 Track A (API & DB)
 * Verifies:
 *  - 1A.2 Build fetch route: GET /api/exercises, query parameter filtering, validation, and error handling
 *  - 1A.3 Seed dataset: 45 balanced exercises across all equipment, focus, and difficulty levels
 *  - Both Azure Functions v4 handler and Express API runner
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

console.log('='.repeat(70));
console.log('Running Phase 1 Track A Test Suite: API & Database');
console.log('='.repeat(70));

let failures = 0;
let passed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`  ❌ FAIL: ${message}`);
    failures++;
  } else {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  }
}

async function runTests() {
  // Test 1: Validate compiled Azure Functions handler directly
  console.log('\n[1/4] Testing Azure Functions v4 Handler directly:');
  const { exercisesHandler } = require('../api/dist/api/src/functions/exercises');

  function createMockRequest(url, method = 'GET') {
    return {
      method,
      url,
      query: new URL(url).searchParams,
      headers: new Map(),
      params: {},
    };
  }

  const mockContext = {
    log: () => {},
    warn: () => {},
    error: () => {},
  };

  // 1.1 Fetch all exercises
  {
    const req = createMockRequest('http://localhost:7071/api/exercises');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 200, 'GET /api/exercises returns status 200');
    assert(Array.isArray(res.jsonBody), 'jsonBody is an array');
    assert(res.jsonBody.length === 45, `returns all 45 exercises (got ${res.jsonBody.length})`);
    assert(res.headers['X-Total-Count'] === '45', 'X-Total-Count header is 45');
    assert(res.headers['Access-Control-Allow-Origin'] === '*', 'CORS origin header present');
  }

  // 1.2 Point lookup by ID
  {
    const req = createMockRequest('http://localhost:7071/api/exercises?id=PIL-CORE-001');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 200, 'Lookup by id=PIL-CORE-001 returns 200');
    assert(res.jsonBody.name === 'Toe Taps (Marching)', 'Found correct exercise name');
    assert(res.jsonBody.muscleGroup === 'core', 'Found correct muscle group');
  }

  // 1.3 Point lookup 404
  {
    const req = createMockRequest('http://localhost:7071/api/exercises?id=NON_EXISTENT_ID');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 404, 'Non-existent ID returns 404 Not Found');
  }

  // 1.4 Filter by muscleGroup
  {
    const req = createMockRequest('http://localhost:7071/api/exercises?muscleGroup=core');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 200, 'Filtering by muscleGroup=core returns 200');
    assert(res.jsonBody.length === 12, `Returns 12 core exercises (got ${res.jsonBody.length})`);
    assert(res.jsonBody.every(e => e.muscleGroup === 'core'), 'All returned exercises have muscleGroup === core');
  }

  // 1.5 Filter by difficulty
  {
    const req = createMockRequest('http://localhost:7071/api/exercises?difficulty=1');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 200, 'Filtering by difficulty=1 returns 200');
    assert(res.jsonBody.length === 17, `Returns 17 beginner exercises (got ${res.jsonBody.length})`);
    assert(res.jsonBody.every(e => e.difficulty === 1), 'All returned exercises have difficulty === 1');
  }

  // 1.6 Filter by equipment: ball
  {
    const req = createMockRequest('http://localhost:7071/api/exercises?equipment=ball');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 200, 'Filtering by equipment=ball returns 200');
    assert(res.jsonBody.length === 7, `Returns 7 ball exercises (got ${res.jsonBody.length})`);
    assert(res.jsonBody.every(e => {
      const eq = Array.isArray(e.equipment) ? e.equipment : [e.equipment];
      return eq.includes('ball');
    }), 'All returned exercises include ball in equipment');
  }

  // 1.7 Filter by equipment: bands
  {
    const req = createMockRequest('http://localhost:7071/api/exercises?equipment=bands');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 200, 'Filtering by equipment=bands returns 200');
    assert(res.jsonBody.length === 8, `Returns 8 bands exercises (got ${res.jsonBody.length})`);
    assert(res.jsonBody.every(e => {
      const eq = Array.isArray(e.equipment) ? e.equipment : [e.equipment];
      return eq.includes('bands');
    }), 'All returned exercises include bands in equipment');
  }

  // 1.8 Filter by equipment: none (zero equipment bodyweight)
  {
    const req = createMockRequest('http://localhost:7071/api/exercises?equipment=none');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 200, 'Filtering by equipment=none returns 200');
    assert(res.jsonBody.length === 10, `Returns 10 no-equipment exercises (got ${res.jsonBody.length})`);
    assert(res.jsonBody.every(e => {
      const eq = Array.isArray(e.equipment) ? e.equipment : [e.equipment];
      return eq.includes('none');
    }), 'All returned exercises include none in equipment');
  }

  // 1.9 Filter by focus: stretch
  {
    const req = createMockRequest('http://localhost:7071/api/exercises?focus=stretch');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 200, 'Filtering by focus=stretch returns 200');
    assert(res.jsonBody.length === 9, `Returns 9 stretch exercises (got ${res.jsonBody.length})`);
  }

  // 1.10 Combined filters: muscleGroup=obliques & difficulty=2
  {
    const req = createMockRequest('http://localhost:7071/api/exercises?muscleGroup=obliques&difficulty=2');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 200, 'Combined filtering returns 200');
    assert(res.jsonBody.length > 0, 'Found intermediate oblique exercises');
    assert(res.jsonBody.every(e => e.muscleGroup === 'obliques' && e.difficulty === 2), 'Combined conditions strictly matched');
  }

  // 1.11 Validation: invalid muscleGroup
  {
    const req = createMockRequest('http://localhost:7071/api/exercises?muscleGroup=biceps_only');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 400, 'Invalid muscleGroup returns 400 Bad Request');
    assert(res.jsonBody.error === 'Bad Request', 'Error envelope contains error type');
  }

  // 1.12 Validation: invalid difficulty
  {
    const req = createMockRequest('http://localhost:7071/api/exercises?difficulty=99');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 400, 'Invalid difficulty returns 400 Bad Request');
  }

  // 1.13 Validation: invalid equipment
  {
    const req = createMockRequest('http://localhost:7071/api/exercises?equipment=kettlebell');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 400, 'Invalid equipment returns 400 Bad Request');
  }

  // 1.14 CORS OPTIONS Preflight
  {
    const req = createMockRequest('http://localhost:7071/api/exercises', 'OPTIONS');
    const res = await exercisesHandler(req, mockContext);
    assert(res.status === 204, 'OPTIONS preflight returns 204 No Content');
    assert(res.headers['Access-Control-Allow-Origin'] === '*', 'Preflight returns CORS origin header');
  }

  // Test 2: Testing Express Dev Server Endpoints over HTTP
  console.log('\n[2/4] Testing Express Dev Server HTTP Endpoints:');
  const app = require('../api/dist/api/src/dev-server').default;
  const server = http.createServer(app);

  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      console.log(`  Dev server listening on ephemeral port ${port} for test suite.`);
      resolve(port);
    });
  });

  const port = server.address().port;

  function httpGet(path) {
    return new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}${path}`, (res) => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => {
          let body;
          try {
            body = JSON.parse(raw);
          } catch {
            body = raw;
          }
          resolve({ status: res.statusCode, headers: res.headers, body });
        });
      }).on('error', reject);
    });
  }

  // 2.1 Health check endpoint
  {
    const res = await httpGet('/api/health');
    assert(res.status === 200, 'GET /api/health returns 200');
    assert(res.body.status === 'ok', 'Health response status is "ok"');
    assert(res.body.database === 'pilates-db', 'Database name reported in health check');
    assert(res.body.container === 'exercises', 'Container name reported in health check');
  }

  // 2.2 GET /api/exercises over HTTP
  {
    const res = await httpGet('/api/exercises');
    assert(res.status === 200, 'HTTP GET /api/exercises returns 200');
    assert(Array.isArray(res.body) && res.body.length === 45, 'HTTP GET returns all 45 exercises');
    assert(res.headers['x-total-count'] === '45', 'HTTP response includes x-total-count header');
  }

  // 2.3 GET /api/exercises/:id over HTTP
  {
    const res = await httpGet('/api/exercises/PIL-CORE-002');
    assert(res.status === 200, 'HTTP GET /api/exercises/PIL-CORE-002 returns 200');
    assert(res.body.name === 'The Hundred (Knees Bent)', 'HTTP GET returns correct exercise');
  }

  // 2.4 Pagination: limit and offset
  {
    const res = await httpGet('/api/exercises?limit=5&offset=10');
    assert(res.status === 200, 'HTTP GET with pagination returns 200');
    assert(res.body.length === 5, 'limit=5 returns 5 exercises');
    assert(res.body[0].id === 'PIL-BND-004', 'offset=10 correctly offsets results');
  }

  // Close HTTP test server
  await new Promise((resolve) => server.close(resolve));

  // Test 3: Routine generator handler
  console.log('\n[3/4] Testing POST /api/generate-routine handler:');
  const { generateRoutineHandler } = require('../api/dist/api/src/functions/generateRoutine');
  const post = (body) => generateRoutineHandler({ json: async () => body });
  {
    const res = await post({ focus: 'core', equipment: ['mat'], durationMinutes: 15 });
    const { exercises, totalSeconds } = res.jsonBody;
    assert(res.status === undefined, 'Valid request returns 200');
    assert(totalSeconds >= 900 && totalSeconds - exercises.at(-1).duration < 900, `Routine fills 15 minutes (got ${totalSeconds}s)`);
    assert(exercises.every((e, i) => i === 0 || e.muscleGroup !== exercises[i - 1].muscleGroup), 'No back-to-back muscle groups');
  }
  {
    const res = await post({ focus: 'yoga', equipment: ['mat'], durationMinutes: 15 });
    assert(res.status === 400, 'Invalid focus returns 400');
  }
  {
    const res = await post({ focus: 'core', equipment: ['mat'], durationMinutes: true });
    assert(res.status === 400, 'Non-numeric durationMinutes returns 400');
  }
  {
    const res = await post({ focus: 'upper_body', equipment: ['mat'], durationMinutes: 15 });
    assert(res.status === 422, 'No matching exercises returns 422');
  }

  // Test 4: Seeding Engine Dry Run Verification
  console.log('\n[4/4] Testing Cosmos DB Seeding Engine:');
  const { seedCosmosDatabase } = require('../api/dist/api/src/services/cosmosService');
  const seedResult = await seedCosmosDatabase({ dryRun: true });
  assert(seedResult.success === true, 'Seeding dry run reports success');
  assert(seedResult.totalExercises === 45, 'Seeding reports 45 exercises');
  assert(seedResult.inserted === 45, 'All 45 exercises marked ready for insertion');
  assert(seedResult.failed === 0, 'Zero errors in seed dataset');
  assert(seedResult.stats.byEquipment['ball'] === 7, '7 ball exercises validated in seed data');
  assert(seedResult.stats.byEquipment['bands'] === 8, '8 bands exercises validated in seed data');
  assert(seedResult.stats.byEquipment['none'] === 10, '10 bodyweight exercises validated in seed data');
  assert(seedResult.stats.byEquipment['mat'] === 18, '18 mat exercises validated in seed data');
  assert(seedResult.stats.byEquipment['reformer'] === 2, '2 reformer exercises validated in seed data');

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log(`Test Results: ${passed} Passed, ${failures} Failed`);
  console.log('='.repeat(70));

  if (failures > 0) {
    process.exit(1);
  } else {
    console.log('🎉 All Phase 1 Track A tests passed with flying colors!\n');
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
