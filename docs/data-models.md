# Track 1A.1: Exercise Data Models & Schema Documentation

## 1. Overview & Objectives

In accordance with [implementation.md](file:///Users/susanchapas/code/pilates-workouts/implementation.md#L36), **Track 1A.1** defines the JSON document schema and data models for exercises in the Pilates Workout Generator.

The data model serves as the foundational data contract for:
1. **Azure Cosmos DB** (`exercises` container in Phase 0 / Track 1A.3)
2. **Backend API Routes** (`GET /api/exercises` in Track 1A.2)
3. **Scoring & Matching Engine** (`POST /api/generate-routine` in Track 1B.1 / 1B.2)
4. **Frontend Routine Wizard & Workout Player** (Phase 2 Tracks C & D)

All 45 exercises covering all combinations of equipment, focus, and difficulty have been mapped, transformed, and validated against this schema in [`data/exercises.json`](file:///Users/susanchapas/code/pilates-workouts/data/exercises.json).

---

## 2. Core Schema Specification

The schema is defined in standard JSON Schema (Draft-07) format in [`schemas/exercise.schema.json`](file:///Users/susanchapas/code/pilates-workouts/schemas/exercise.schema.json).

### Required Fields (Track 1A.1 Specification)

| Field | Type | Description | Allowed / Valid Values | Example |
|---|---|---|---|---|
| `id` | `string` | Unique document identifier in Cosmos DB | Alphanumeric with hyphens/underscores (`^[A-Za-z0-9_-]+$`) | `"PIL-CORE-001"` |
| `name` | `string` | Title of the Pilates exercise | String (2 to 100 characters) | `"Toe Taps (Marching)"` |
| `muscleGroup` | `string` | Primary anatomical target for algorithm fatigue distribution | `"core"`, `"obliques"`, `"posterior_chain"`, `"lower_body"`, `"upper_body"`, `"full_body"` | `"core"` |
| `difficulty` | `integer` | Difficulty tier for progression arcs | `1` (Beginner), `2` (Intermediate), `3` (Advanced) | `1` |
| `equipment` | `string[]` \| `string` | Required apparatus / props | Values from: `"mat"`, `"bands"`, `"ball"`, `"none"`, `"reformer"`, `"weights"` | `["mat"]` |
| `duration` | `integer` | Standard time in seconds per set/interval | Integer between `15` and `300` | `60` |
| `instructions` | `string` | Detailed step-by-step coaching guidance | String (10 to 1200 characters) | `"Lie supine on the mat with knees bent in tabletop..."` |

### Supplementary Metadata Fields (from `pilates_dataset.md`)

| Field | Type | Purpose | Example |
|---|---|---|---|
| `category` | `string` | Original functional Pilates category | `"Anterior Core & Abdominals"` |
| `targetMuscles` | `string[]` | Specific muscle activations | `["Transverse Abdominis", "Rectus Abdominis"]` |
| `difficultyLabel` | `string` | Human-readable difficulty badge | `"Beginner"`, `"Intermediate"`, `"Advanced"` |
| `focus` | `string` \| `string[]` | Routine focus filter for wizard (Core, Full Body, Stretch) | `"core"`, `"full_body"`, `"stretch"` |
| `reps` | `string` | Repetition or breath cycle recommendation | `"10-12 reps per side"` |
| `keyCue` | `string` | Concise audio/visual coaching cue for active timer player | `"Keep pelvis anchored in neutral; hinge only from the hip joint."` |

### Cosmos DB System Metadata Fields (Optional)

When retrieved from Azure Cosmos DB, the following system fields are preserved:
- `_rid`: Resource ID
- `_self`: Resource URI
- `_etag`: Entity tag for optimistic concurrency
- `_attachments`: Attachments URI
- `_ts`: Unix timestamp of last update

---

## 3. Dataset Mapping & Equipment Coverage

To ensure downstream algorithm matching (Track 1B) has valid candidates for any user equipment selection (`mat`, `bands`, `ball`, `none`) and focus (`core`, `full_body`, `stretch`), the library contains 45 balanced exercises:

### 3.1 Muscle Group & Focus Distribution

| Canonical `muscleGroup` | Wizard `focus` | Exercise Count |
|---|---|:---:|
| `core` | `core` | 12 |
| `obliques` | `core` | 7 |
| `posterior_chain` | `stretch` / `full_body` | 8 |
| `lower_body` | `full_body` | 6 |
| `upper_body` | `full_body` | 6 |
| `full_body` | `stretch` / `full_body` / `core` | 6 |
| **Total** | | **45** |

### 3.2 Equipment Distribution

| Equipment Type | Description | Count |
|---|---|:---:|
| `none` | Pure bodyweight, zero equipment needed | 10 |
| `mat` | Classical Pilates mat exercises | 18 |
| `bands` | Loop / resistance bands | 8 |
| `ball` | Pilates mini stability ball / overball | 7 |
| `reformer` | Classical studio reformer staples | 2 |
| **Total** | | **45** |

---

## 4. TypeScript Implementation

TypeScript types are exported from [`shared/types/exercise.ts`](file:///Users/susanchapas/code/pilates-workouts/shared/types/exercise.ts):

```typescript
import { Exercise, MuscleGroup, EquipmentType, DifficultyLevel } from '../shared/types/exercise';

// Example exercise object
const sampleExercise: Exercise = {
  id: "PIL-CORE-001",
  name: "Toe Taps (Marching)",
  muscleGroup: "core",
  difficulty: 1,
  equipment: ["mat"],
  duration: 60,
  instructions: "Lie supine on the mat with arms at your sides and legs bent in tabletop position...",
  category: "Anterior Core & Abdominals",
  targetMuscles: ["Transverse Abdominis", "Rectus Abdominis"],
  difficultyLabel: "Beginner",
  focus: "core",
  reps: "10-12 reps per side",
  keyCue: "Keep pelvis anchored in neutral; hinge only from the hip joint."
};
```

---

## 5. Algorithmic Integration (Preview of Tracks 1B & 2)

The data model directly fuels downstream tracks:

1. **Anti-Fatigue Scoring (Track 1B.1):**
   `candidate.muscleGroup !== previousExercise.muscleGroup` ensures no two consecutive exercises exhaust the same muscle group.
2. **Equipment Availability Filtering (Track 1B.1 / 2C.2):**
   If a user selects `['mat', 'bands']`, the query filters for exercises where `exercise.equipment` is a subset of the user's available equipment.
3. **Difficulty Arc Ramp & Cool Down (Track 1B.1):**
   The `difficulty` (1, 2, or 3) enables generating workouts following a warmup arc (1) -> peak effort (2/3) -> cooldown (1).
4. **Active Workout Player Display (Track 2D.3):**
   The player uses `duration` for the countdown timer, `keyCue` for the large prominent on-screen cue, and `instructions` for the expandable modal.

---

## 6. Verification and Validation

Run the test suite to validate the schema and all 44 exercise documents:

```bash
# Run schema and dataset validator
npm run validate

# Run TypeScript typechecker
npm run typecheck

# Run full test suite
npm test
```
