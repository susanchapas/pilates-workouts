# Phase 1 Track A: API & Cosmos DB Documentation

## 1. Overview & Objectives

In accordance with [implementation.md](file:///Users/susanchapas/code/pilates-workouts/implementation.md#L32-L39), **Phase 1 Track A (Database and API)** provides the data access layer and exercise retrieval endpoints for the Pilates Workout Generator.

### Track A Deliverables Summary

| Milestone | Description | Status | Implementation |
|---|---|:---:|---|
| **1A.1** | Define data models & schema | ✅ Complete | [`schemas/exercise.schema.json`](file:///Users/susanchapas/code/pilates-workouts/schemas/exercise.schema.json), [`shared/types/exercise.ts`](file:///Users/susanchapas/code/pilates-workouts/shared/types/exercise.ts) |
| **1A.2** | Build fetch route `GET /api/exercises` | ✅ Complete | [`api/src/functions/exercises.ts`](file:///Users/susanchapas/code/pilates-workouts/api/src/functions/exercises.ts), [`api/src/services/cosmosService.ts`](file:///Users/susanchapas/code/pilates-workouts/api/src/services/cosmosService.ts), [`api/src/dev-server.ts`](file:///Users/susanchapas/code/pilates-workouts/api/src/dev-server.ts) |
| **1A.3** | Seed the database | ✅ Complete | [`api/src/seed.ts`](file:///Users/susanchapas/code/pilates-workouts/api/src/seed.ts), [`scripts/seed-cosmos.js`](file:///Users/susanchapas/code/pilates-workouts/scripts/seed-cosmos.js), [`data/exercises.json`](file:///Users/susanchapas/code/pilates-workouts/data/exercises.json) |

---

## 2. Architecture & Azure Integration

### 2.1 Azure Functions v4 Programming Model
- **Runtime:** Node.js (v18+) with TypeScript
- **Model:** Azure Functions v4 (`@azure/functions`)
- **HTTP Trigger:** `app.http('exercises', { methods: ['GET', 'OPTIONS'], route: 'exercises', ... })`
- **Azure Static Web Apps Ready:** Configured in `/api` to align with standard Azure SWA deployment (`api_location: "api"`).

### 2.2 Azure Cosmos DB SDK (`@azure/cosmos`)
- **Database:** `pilates-db` (configurable via `COSMOS_DB_DATABASE_ID`)
- **Container:** `exercises` (configurable via `COSMOS_DB_CONTAINER_ID`)
- **Partition Key:** `/id` (configurable via `COSMOS_DB_PARTITION_KEY`)
- **Query Engine:** Parameterized SQL queries preventing injection, optimizing RU consumption, and leveraging Cosmos DB indexing.
- **Graceful Fallback Mode:** When Azure Cosmos DB credentials are not configured (e.g. offline dev or fresh clone), the service automatically falls back to [`data/exercises.json`](file:///Users/susanchapas/code/pilates-workouts/data/exercises.json) with in-memory filtering. The active data source is transparently identified via the `X-Data-Source: cosmos-db` or `X-Data-Source: local-fallback` response header.

---

## 3. API Specification

### Endpoint: `GET /api/exercises`

Fetches the library of Pilates exercises with optional query parameter filtering.

#### Query Parameters

| Parameter | Type | Required | Allowed Values | Description |
|---|---|:---:|---|---|
| `id` | `string` | No | Any valid ID (e.g. `PIL-CORE-001`) | Direct point lookup for a single exercise |
| `muscleGroup` | `string` | No | `core`, `obliques`, `posterior_chain`, `lower_body`, `upper_body`, `full_body` | Filters exercises targeting the specified muscle group |
| `difficulty` | `integer` | No | `1`, `2`, `3` | Filters by difficulty (1 = Beginner, 2 = Intermediate, 3 = Advanced) |
| `equipment` | `string` | No | `mat`, `bands`, `ball`, `none`, `reformer`, `weights` | Single value or comma-separated list (e.g. `equipment=mat,bands`) |
| `focus` | `string` | No | `core`, `full_body`, `stretch`, `lower_body`, `upper_body` | Routine wizard focus filter |
| `category` | `string` | No | Any string | Case-insensitive substring match on Pilates category |
| `limit` | `integer` | No | Positive integer | Maximum number of exercises to return |
| `offset` | `integer` | No | Non-negative integer | Number of items to skip (pagination) |

#### Response Headers

- `Content-Type: application/json`
- `Access-Control-Allow-Origin: *`
- `X-Total-Count: <number>` — Total exercises matching query
- `X-Data-Source: cosmos-db | local-fallback` — Active backend data source
- `X-Cosmos-RU-Charge: <number>` — Cosmos DB Request Units consumed (when live)

#### Example Success Response (`200 OK`)

```json
[
  {
    "id": "PIL-CORE-001",
    "name": "Toe Taps (Marching)",
    "muscleGroup": "core",
    "difficulty": 1,
    "difficultyLabel": "Beginner",
    "equipment": ["none"],
    "duration": 60,
    "instructions": "Lie supine on the floor or mat with arms at your sides and legs bent in tabletop position...",
    "category": "Anterior Core & Abdominals",
    "targetMuscles": ["Transverse Abdominis", "Rectus Abdominis"],
    "focus": "core",
    "reps": "10-12 reps per side",
    "keyCue": "Keep pelvis anchored in neutral; hinge only from the hip joint."
  }
]
```

#### Error Handling

The API validates all input parameters and returns structured RFC-compliant JSON errors:

- **`400 Bad Request`**: Returned when an invalid parameter value is passed (e.g. `difficulty=99` or `muscleGroup=invalid`).
  ```json
  {
    "error": "Bad Request",
    "message": "Invalid difficulty \"99\". Allowed values are 1 (Beginner), 2 (Intermediate), 3 (Advanced)."
  }
  ```
- **`404 Not Found`**: Returned when querying a specific ID that does not exist.
  ```json
  {
    "error": "Not Found",
    "message": "Exercise with ID \"PIL-XYZ-999\" was not found."
  }
  ```
- **`500 Internal Server Error`**: Returned if an unhandled backend exception occurs.

---

## 4. Azure Cosmos DB Configuration & Seeding

### 4.1 Connection Settings

Azure connection settings are loaded from environment variables or [`api/local.settings.json`](file:///Users/susanchapas/code/pilates-workouts/api/local.settings.json):

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "COSMOS_DB_CONNECTION_STRING": "AccountEndpoint=https://<your-cosmos-account>.documents.azure.com:443/;AccountKey=<your-key>;",
    "COSMOS_DB_DATABASE_ID": "pilates-db",
    "COSMOS_DB_CONTAINER_ID": "exercises",
    "COSMOS_DB_PARTITION_KEY": "/id"
  }
}
```

### 4.2 Exercise Dataset Composition (45 Curated Exercises)

The dataset covers all combinations of equipment, focus, and difficulty needed by the matching engine (Track 1B) and frontend wizard (Track 2C):

- **Total Exercises:** 45
- **Equipment Distribution:**
  - `none` (zero-equipment bodyweight): 10 exercises
  - `mat`: 18 exercises
  - `bands` (resistance loop / band): 8 exercises
  - `ball` (mini Pilates stability ball): 7 exercises
  - `reformer`: 2 exercises
- **Muscle Group Distribution:**
  - `core`: 12 exercises
  - `obliques`: 7 exercises
  - `posterior_chain`: 8 exercises
  - `lower_body`: 6 exercises
  - `upper_body`: 6 exercises
  - `full_body`: 6 exercises
- **Difficulty Distribution:**
  - Level 1 (Beginner): 17 exercises
  - Level 2 (Intermediate): 17 exercises
  - Level 3 (Advanced): 11 exercises
- **Focus Distribution:**
  - `core`: 20 exercises
  - `full_body`: 16 exercises
  - `stretch`: 9 exercises

### 4.3 Running the Seeder

```bash
# Validate seed data without connecting to Azure (Dry Run)
npm run seed:dry-run

# Seed directly into Azure Cosmos DB (uses connection string)
npm run seed
```

---

## 5. Local Development & Testing

### 5.1 Local Dev Server
Since Azure Functions Core Tools (`func`) may not be pre-installed on every developer machine, a lightweight Express dev server is included in [`api/src/dev-server.ts`](file:///Users/susanchapas/code/pilates-workouts/api/src/dev-server.ts) that mirrors the Azure Functions route:

```bash
# Start local API dev server on port 7071
npm run dev:api
```

- Endpoint: `http://localhost:7071/api/exercises`
- Health check: `http://localhost:7071/api/health`

### 5.2 Build & Typecheck
```bash
# Compile TypeScript for Azure Functions
npm run build:api

# Typecheck entire monorepo
npm run typecheck
```

### 5.3 Test Suite
The automated test suite verifies both the compiled Azure Functions v4 handler and the Express server:

```bash
# Run schema validator + API tests
npm test

# Run API tests specifically
npm run test:api
```
