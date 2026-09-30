const fs = require('fs');
const path = require('path');

const ROOT_DIR = '/Users/susanchapas/code/pilates-workouts';
const existingExercises = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data', 'exercises.json'), 'utf-8'));
const existingMap = new Map();
existingExercises.forEach(e => existingMap.set(e.id, e));

const exercises = [
  // 1. None / Bodyweight (Core, diff 1)
  {
    id: 'PIL-CORE-001',
    name: 'Toe Taps (Marching)',
    muscleGroup: 'core',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['none'],
    duration: 60,
    instructions: 'Lie supine on the floor or mat with arms at your sides and legs bent in tabletop position (hips and knees at 90 degrees). Inhale to prepare. Exhale as you slowly lower one foot toward the floor, hinging solely from the hip joint while maintaining a steady 90-degree knee bend. Lightly tap your toe to the floor, then inhale to return to tabletop. Alternate sides with steady abdominal control. Keep pelvis anchored in neutral; hinge only from the hip joint.',
    category: 'Anterior Core & Abdominals',
    targetMuscles: ['Transverse Abdominis', 'Rectus Abdominis'],
    focus: 'core',
    reps: '10-12 reps per side',
    keyCue: 'Keep pelvis anchored in neutral; hinge only from the hip joint.'
  },
  // 2. None / Bodyweight (Core, diff 1)
  {
    id: 'PIL-CORE-002',
    name: 'The Hundred (Knees Bent)',
    muscleGroup: 'core',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['none'],
    duration: 60,
    instructions: 'Lie supine on the floor or mat. Lift knees into tabletop or extend long at 45 degrees. Curl head, neck, and shoulders off the surface into thoracic flexion, reaching arms forward vigorously at hip height. Inhale for 5 rhythmic arm pumps, exhale for 5 rhythmic arm pumps. Complete 10 full breath cycles (100 pumps total). Keep your lower back anchored and abdomen drawn deeply toward the spine.',
    category: 'Anterior Core & Abdominals',
    targetMuscles: ['Transverse Abdominis', 'Anterior Core'],
    focus: 'core',
    reps: '10 breath cycles (100 pumps)',
    keyCue: 'Pump arms briskly from the shoulder joint while maintaining a C-curve.'
  },
  // 3. None / Bodyweight (Core, diff 1)
  {
    id: 'PIL-CORE-003',
    name: 'Single Leg Stretch',
    muscleGroup: 'core',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['none'],
    duration: 50,
    instructions: 'Lie supine with head and shoulders curled into an abdominal curl. Draw one knee into your chest, placing outside hand on the ankle and inside hand on the knee. Extend the opposite leg straight out at a 45-degree angle. Inhale to prepare, exhale as you switch legs with control and rhythm. Maintain pelvis stability and keep shoulders relaxed away from the ears.',
    category: 'Anterior Core & Abdominals',
    targetMuscles: ['Rectus Abdominis', 'Hip Flexors'],
    focus: 'core',
    reps: '10 reps per side',
    keyCue: 'Press hand to shin to maintain isometric resistance.'
  },
  // 4. Mat (Core, diff 2)
  {
    id: 'PIL-CORE-004',
    name: 'The Roll Up',
    muscleGroup: 'core',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['mat'],
    duration: 70,
    instructions: 'Lie supine on the mat with legs extended straight and glued together, feet flexed. Reach arms straight toward the ceiling, then overhead without flaring ribs. Inhale as arms lift past vertical and head nods forward. Exhale as you peel the spine off the mat bone by bone, reaching forward over toes in a deep C-curve while scooping the abdomen backward. Inhale to begin articulating down; exhale to return supine.',
    category: 'Anterior Core & Abdominals',
    targetMuscles: ['Rectus Abdominis', 'Transverse Abdominis'],
    focus: 'core',
    reps: '5-6 slow reps',
    keyCue: 'Peel the spine off the mat bone by bone; avoid using momentum.'
  },
  // 5. Mat (Core, diff 2)
  {
    id: 'PIL-CORE-005',
    name: 'Double Leg Stretch',
    muscleGroup: 'core',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['mat'],
    duration: 60,
    instructions: 'Lie supine curled into a tight abdominal ball with knees hugging toward chest and hands resting on shins. Inhale as you simultaneously reach both arms overhead by ears and extend both legs long at a 45-degree angle, keeping the low back anchored to the mat. Exhale as you sweep arms around in a wide circle and draw knees back into chest, pulling abdominals deeper.',
    category: 'Anterior Core & Abdominals',
    targetMuscles: ['Rectus Abdominis', 'Transverse Abdominis', 'Hip Flexors'],
    focus: 'core',
    reps: '8-10 reps',
    keyCue: 'Keep the lumbar spine firmly anchored as limbs reach in opposition.'
  },
  // 6. Mat (Core, diff 3)
  {
    id: 'PIL-CORE-007',
    name: 'The Teaser (Full Mat)',
    muscleGroup: 'core',
    difficulty: 3,
    difficultyLabel: 'Advanced',
    equipment: ['mat'],
    duration: 75,
    instructions: 'Lie supine with arms reaching overhead and legs extended together at a 45-degree angle. Inhale to lift arms toward the ceiling and nod head. Exhale as you roll your entire torso off the mat into a balanced V-sit on your sit bones, reaching arms parallel to extended legs. Hold with chest proud. Inhale, then exhale as you roll down vertebra by vertebra with control.',
    category: 'Anterior Core & Abdominals',
    targetMuscles: ['Rectus Abdominis', 'Iliopsoas', 'Transverse Abdominis'],
    focus: 'core',
    reps: '4-5 reps',
    keyCue: 'Lift chest open at the peak of the V-position; roll down with control.'
  },
  // 7. Mat (Core, diff 3)
  {
    id: 'PIL-CORE-009',
    name: 'Jackknife',
    muscleGroup: 'core',
    difficulty: 3,
    difficultyLabel: 'Advanced',
    equipment: ['mat'],
    duration: 60,
    instructions: 'Lie supine with arms pressed firmly into the mat. Inhale as straight legs lift to vertical and roll over torso parallel to the mat. Exhale as you Jackknife legs straight up toward the ceiling, balancing on shoulder girdle and triceps with hips fully extended. Inhale at the vertical peak. Exhale as you articulate the spine slowly down to the mat, vertebra by vertebra.',
    category: 'Anterior Core & Abdominals',
    targetMuscles: ['Rectus Abdominis', 'Transverse Abdominis', 'Triceps'],
    focus: 'core',
    reps: '3-4 reps',
    keyCue: 'Shoot legs straight toward the ceiling; articulate down one vertebra at a time.'
  },
  // 8. Mat (Obliques, diff 1)
  {
    id: 'PIL-OBL-001',
    name: 'Side Kick Series: Up/Down',
    muscleGroup: 'obliques',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['mat'],
    duration: 60,
    instructions: 'Lie on your side along the back edge of the mat, propped on forearm or head resting on bottom arm. Angle straight legs forward 30 degrees to front mat corner to support lumbar spine. Inhale as you kick top leg straight up toward ceiling with pointed toe and external rotation. Exhale as you flex foot and resist down through resistance, keeping waistline lifted off the mat.',
    category: 'Obliques & Lateral Chain',
    targetMuscles: ['Gluteus Medius', 'External Obliques', 'Tensor Fasciae Latae'],
    focus: 'core',
    reps: '10 reps per side',
    keyCue: 'Keep the underside waist lifted away from the mat throughout the kick.'
  },
  // 9. None / Bodyweight (Obliques, diff 2)
  {
    id: 'PIL-OBL-002',
    name: 'Criss-Cross',
    muscleGroup: 'obliques',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['none'],
    duration: 60,
    instructions: 'Lie supine in tabletop position with hands clasped lightly behind the base of the head, elbows wide. Curl head and chest up. Exhale to rotate your ribcage, bringing your right armpit toward your left knee as your right leg extends long at 45 degrees. Inhale back through center, then exhale and rotate to the opposite side. Avoid pulling on the neck; rotate strictly from the thoracic spine and obliques.',
    category: 'Obliques & Lateral Chain',
    targetMuscles: ['External Obliques', 'Internal Obliques', 'Transverse Abdominis'],
    focus: 'core',
    reps: '10 slow reps per side',
    keyCue: 'Lift armpit across toward opposite knee; keep both sit bones anchored.'
  },
  // 10. None / Bodyweight (Obliques, diff 2)
  {
    id: 'PIL-OBL-003',
    name: 'Side Plank (Knees Down)',
    muscleGroup: 'obliques',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['none'],
    duration: 50,
    instructions: 'Lie on your side with hips stacked, knees bent at 90 degrees, and bottom forearm resting firmly on the floor under your shoulder. Inhale to engage your lats and core. Exhale to lift hips up until your body forms a diagonal line from knees to head. Hold steady while maintaining an engaged lateral chain and proud chest. Inhale and lower with control.',
    category: 'Obliques & Lateral Chain',
    targetMuscles: ['Internal Obliques', 'External Obliques', 'Quadratus Lumborum'],
    focus: 'core',
    reps: '30-40s hold per side',
    keyCue: 'Lift out of bottom shoulder; maintain straight diagonal line from knees to head.'
  },
  // 11. Mat (Obliques, diff 3)
  {
    id: 'PIL-OBL-005',
    name: 'Corkscrew',
    muscleGroup: 'obliques',
    difficulty: 3,
    difficultyLabel: 'Advanced',
    equipment: ['mat'],
    duration: 60,
    instructions: 'Lie supine, arms pressed long by your sides. Lift straight legs up to 90 degrees, then roll over so legs are parallel to mat over head. Shift legs slightly to the right, roll down along the right side of the spine, circle legs down and around across center, then roll up the left side of the spine back into rollover. Reverse direction on subsequent rep with smooth control.',
    category: 'Obliques & Lateral Chain',
    targetMuscles: ['Obliques', 'Transverse Abdominis', 'Erector Spinae'],
    focus: 'core',
    reps: '3-4 circles per direction',
    keyCue: 'Circle legs around pelvis while keeping shoulders glued to the mat.'
  },
  // 12. Mat (Obliques, diff 3)
  {
    id: 'PIL-OBL-006',
    name: 'Side Bend (Mermaid into Plank)',
    muscleGroup: 'obliques',
    difficulty: 3,
    difficultyLabel: 'Advanced',
    equipment: ['mat'],
    duration: 60,
    instructions: 'Sit on one hip with knees bent and feet stacked, bottom hand planted on mat under shoulder. Inhale to prepare. Exhale as you press into hand and feet to lift pelvis into a high side plank arc, reaching top arm overhead into a graceful lateral rainbow curve. Inhale as you articulate hips slowly down to hover just above mat. Exhale to lift back into arc.',
    category: 'Obliques & Lateral Chain',
    targetMuscles: ['Obliques', 'Quadratus Lumborum', 'Serratus Anterior'],
    focus: 'core',
    reps: '5-6 reps per side',
    keyCue: 'Pique hips up toward ceiling while arching the top arm like a rainbow.'
  },
  // 13. None / Bodyweight (Posterior Chain, diff 1)
  {
    id: 'PIL-POST-001',
    name: 'Swan Prep',
    muscleGroup: 'posterior_chain',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['none'],
    duration: 50,
    instructions: 'Lie prone (belly down) on the floor with legs extended hip-distance apart. Place palms flat next to shoulders, elbows tucked near ribs. Inhale, gently draw the navel away from the floor, and lengthen the crown of the head forward and up to lift the upper chest slightly off the surface without compressing the lumbar spine. Exhale to lower back down smoothly.',
    category: 'Posterior Chain & Spine Extensors',
    targetMuscles: ['Erector Spinae', 'Thoracic Extensors', 'Rhomboids'],
    focus: 'stretch',
    reps: '6-8 slow reps',
    keyCue: 'Lengthen the crown of the head forward before lifting; avoid dumping into lumbar spine.'
  },
  // 14. Mat (Posterior Chain, diff 1)
  {
    id: 'PIL-POST-002',
    name: 'Single Leg Kick',
    muscleGroup: 'posterior_chain',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['mat'],
    duration: 60,
    instructions: 'Prop yourself up on your forearms in a prone sphinx position with elbows beneath shoulders and hands in fists. Pull belly in to lift pubic bone lightly off mat. Inhale as you kick your right heel toward your glute twice in rapid pulses (point, flex). Exhale to extend right leg straight and immediately pulse left heel to glute twice. Maintain proud open chest throughout.',
    category: 'Posterior Chain & Spine Extensors',
    targetMuscles: ['Hamstrings', 'Gluteus Maximus', 'Thoracic Extensors'],
    focus: 'stretch',
    reps: '10 sets (alternating sides)',
    keyCue: 'Push floor away through forearms; keep hips anchored during the double kick.'
  },
  // 15. None / Bodyweight (Posterior Chain, diff 2)
  {
    id: 'PIL-POST-003',
    name: 'Swimming',
    muscleGroup: 'posterior_chain',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['none'],
    duration: 60,
    instructions: 'Lie prone with arms extended straight forward overhead and legs extended hip-width behind you. Draw your belly button away from the floor to support the lumbar spine. Hover chest, arms, and legs off the surface. Flutter opposite arm and leg up and down in a rhythmic swimming cadence while maintaining smooth, deep breathing. Keep head aligned with the spine.',
    category: 'Posterior Chain & Spine Extensors',
    targetMuscles: ['Erector Spinae', 'Gluteus Maximus', 'Deltoids', 'Hamstrings'],
    focus: 'full_body',
    reps: '10 breath cycles',
    keyCue: 'Move limbs in vigorous opposition while stabilizing the torso in stillness.'
  },
  // 16. Mat (Posterior Chain, diff 2)
  {
    id: 'PIL-POST-004',
    name: 'Double Leg Kick',
    muscleGroup: 'posterior_chain',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['mat'],
    duration: 60,
    instructions: 'Lie prone with head turned to one side, hands clasped behind small of back with elbows falling toward mat. Keep legs glued together. Exhale as you kick both heels to glutes in three sharp pulses. Inhale as you extend legs straight back, clasp hands long past hips, and peel chest off mat into thoracic extension looking center. Turn head to opposite side and repeat sequence.',
    category: 'Posterior Chain & Spine Extensors',
    targetMuscles: ['Hamstrings', 'Erector Spinae', 'Infraspinatus', 'Rhomboids'],
    focus: 'stretch',
    reps: '4-5 reps per side',
    keyCue: 'Kick heels to glutes 3 times, then soar into extension reaching knuckles toward heels.'
  },
  // 17. Mat (Posterior Chain, diff 3)
  {
    id: 'PIL-POST-006',
    name: 'Rocking',
    muscleGroup: 'posterior_chain',
    difficulty: 3,
    difficultyLabel: 'Advanced',
    equipment: ['mat'],
    duration: 50,
    instructions: 'Lie prone on the mat. Bend both knees and reach back with hands to grasp the tops of ankles or feet. Inhale as you kick your feet back into your hands, lifting knees and chest off the mat into full spinal extension (bow shape). Maintain the arch and use the breath to rock the body smoothly forward and backward along the abdomen.',
    category: 'Posterior Chain & Spine Extensors',
    targetMuscles: ['Erector Spinae', 'Quadriceps', 'Pectoralis Major', 'Glutes'],
    focus: 'stretch',
    reps: '5 smooth rocking cycles',
    keyCue: 'Kick feet vigorously into hands to hold the arch; rock rhythmically with the breath.'
  },
  // 18. None / Bodyweight (Lower Body, diff 1)
  {
    id: 'PIL-LOW-001',
    name: 'Bridging (Pelvic Curl)',
    muscleGroup: 'lower_body',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['none'],
    duration: 60,
    instructions: 'Lie supine on your back with knees bent and feet flat on the floor, hip-width apart, arms resting by your sides. Inhale to prepare. Exhale as you tuck your pelvis into an imprint, then peel the spine off the floor vertebra by vertebra until your body forms a straight line from shoulders to knees. Inhale at the top while squeezing the glutes. Exhale to articulate down one bone at a time.',
    category: 'Glutes, Hips & Lower Body',
    targetMuscles: ['Gluteus Maximus', 'Hamstrings', 'Spinal Articulators'],
    focus: 'full_body',
    reps: '8-10 reps',
    keyCue: 'Scoop lower belly and peel spine off mat bone by bone; press evenly through heels.'
  },
  // 19. Mat (Lower Body, diff 2)
  {
    id: 'PIL-LOW-004',
    name: 'Single Leg Bridge',
    muscleGroup: 'lower_body',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['mat'],
    duration: 60,
    instructions: 'Lie supine with knees bent and feet flat on mat, hip-width apart. Lift pelvis into a bridge. Extend one leg straight up toward the ceiling with pointed toe. Inhale as you lower the straight leg to knee height with flexed foot, keeping pelvis level. Exhale to point toe and kick straight leg back toward ceiling. Complete repetitions, then articulate down and switch sides.',
    category: 'Glutes, Hips & Lower Body',
    targetMuscles: ['Gluteus Maximus', 'Hamstrings', 'Core Stabilizers'],
    focus: 'full_body',
    reps: '8 reps per side',
    keyCue: 'Keep hips square and level; avoid dropping supporting glute as leg moves.'
  },
  // 20. Mat (Lower Body, diff 3)
  {
    id: 'PIL-LOW-007',
    name: 'Shoulder Bridge (High Kick)',
    muscleGroup: 'lower_body',
    difficulty: 3,
    difficultyLabel: 'Advanced',
    equipment: ['mat'],
    duration: 60,
    instructions: 'Lie supine, lift hips into bridge, and prop the pelvis up with elbows bent on mat and hands supporting the sacrum. Extend one leg straight toward the ceiling. Inhale to flex foot and kick leg toward nose twice. Exhale to point toe and lower leg to floor height without moving supported pelvis. Perform 5 kicks per leg with precision and control.',
    category: 'Glutes, Hips & Lower Body',
    targetMuscles: ['Gluteus Maximus', 'Hamstrings', 'Triceps', 'Iliopsoas'],
    focus: 'full_body',
    reps: '5 kicks per leg',
    keyCue: 'Support pelvis with hands under hips; kick high without shifting pelvic alignment.'
  },
  // 21. Mat (Upper Body, diff 1)
  {
    id: 'PIL-UPP-001',
    name: 'Prone Scapular Retraction & Arm Lifts',
    muscleGroup: 'upper_body',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['mat'],
    duration: 50,
    instructions: 'Lie prone with forehead resting on the mat, legs together, and arms extended along your sides with palms facing hips. Inhale to draw belly inward. Exhale as you roll shoulder heads back, squeeze shoulder blades together, and float straight arms and chest 2 inches off the mat. Inhale to lengthen and lower with control. Keeps neck long and gaze on mat.',
    category: 'Upper Body, Chest & Arms',
    targetMuscles: ['Rhomboids', 'Middle Trapezius', 'Posterior Deltoids', 'Triceps'],
    focus: 'full_body',
    reps: '10-12 reps',
    keyCue: 'Squeeze shoulder blades together and reach fingertips toward heels; keep neck relaxed.'
  },
  // 22. Mat (Upper Body, diff 2)
  {
    id: 'PIL-UPP-002',
    name: 'Quadruped Bird Dog & Tricep Reach',
    muscleGroup: 'upper_body',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['mat'],
    duration: 60,
    instructions: 'Position on all fours with hands under shoulders and knees under hips. Find neutral spine with core drawn in. Exhale as you reach right arm straight forward by ear and left leg straight back at hip height. Hold for a 2-second isometric pause, pulsing the arm and leg up 1 inch. Inhale to return with control, then alternate to left arm and right leg.',
    category: 'Upper Body, Chest & Arms',
    targetMuscles: ['Anterior Deltoids', 'Triceps', 'Erector Spinae', 'Gluteus Maximus'],
    focus: 'full_body',
    reps: '8-10 reps per side',
    keyCue: 'Maintain level hips and shoulders like a tabletop; reach through opposing fingertips and heel.'
  },
  // 23. None / Bodyweight (Upper Body, diff 3)
  {
    id: 'PIL-UPP-005',
    name: 'Pilates Push-Up',
    muscleGroup: 'upper_body',
    difficulty: 3,
    difficultyLabel: 'Advanced',
    equipment: ['none'],
    duration: 75,
    instructions: 'Begin standing tall at the back of your workout space. Inhale to reach tall, exhale to roll down through the spine until hands reach the floor. Walk hands out in 3-4 deliberate paces into a strong straight-arm plank. Inhale as you lower your body in one solid piece by bending elbows narrow toward ribs. Exhale to press straight back up, then walk hands back and articulate up to stand.',
    category: 'Upper Body, Chest & Arms',
    targetMuscles: ['Triceps Brachii', 'Pectoralis Major', 'Anterior Deltoids', 'Core'],
    focus: 'full_body',
    reps: '3 push-up sets',
    keyCue: 'Brush triceps against ribcage during push-up; articulate spine on the walk-in.'
  },
  // 24. None / Bodyweight (Full Body, diff 1)
  {
    id: 'PIL-FULL-001',
    name: 'Spine Stretch Forward',
    muscleGroup: 'full_body',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['none'],
    duration: 60,
    instructions: 'Sit upright with legs extended straight forward, slightly wider than hip-width, feet flexed. Extend arms forward at shoulder height, palms facing down. Inhale to grow tall through the spine. Exhale to nod chin to chest and round forward in a C-curve, reaching past toes while pulling abdominal wall deeply backward. Inhale to stack vertebra by vertebra back up to tall seated.',
    category: 'Full-Body Integration & Spinal Articulation',
    targetMuscles: ['Hamstrings', 'Erector Spinae', 'Transverse Abdominis'],
    focus: 'stretch',
    reps: '5-6 slow reps',
    keyCue: 'Round over an imaginary beach ball; draw navel back as arms reach forward.'
  },
  // 25. Mat (Full Body, diff 1)
  {
    id: 'PIL-FULL-002',
    name: 'Rolling Like a Ball',
    muscleGroup: 'full_body',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['mat'],
    duration: 50,
    instructions: 'Balance on sit bones with knees bent, feet hovering off mat, heels together and toes apart. Clasp hands around ankles or shins, elbows wide. Tuck head between knees in a tight round ball. Inhale to roll backward onto shoulder blades (never onto neck). Exhale as you use deep abdominal contraction to roll back up and balance on sit bones without touching feet to mat.',
    category: 'Full-Body Integration & Spinal Articulation',
    targetMuscles: ['Transverse Abdominis', 'Spinal Articulators'],
    focus: 'core',
    reps: '6-8 smooth rolls',
    keyCue: 'Keep head tucked into knees; roll only to shoulder blades and balance on sit bones.'
  },
  // 26. Mat (Full Body, diff 2)
  {
    id: 'PIL-FULL-003',
    name: 'Saw',
    muscleGroup: 'full_body',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['mat'],
    duration: 60,
    instructions: 'Sit tall with legs straight and open wider than mat, feet flexed, arms extended wide to sides at shoulder height. Inhale to grow tall and rotate torso to right. Exhale to round forward, sawing little toe with opposite pinky finger in 3 forward reaching pulses while back arm reaches back. Inhale to unroll and rotate through center, then repeat to opposite side.',
    category: 'Full-Body Integration & Spinal Articulation',
    targetMuscles: ['Hamstrings', 'Internal Obliques', 'External Obliques', 'Thoracic Spine'],
    focus: 'stretch',
    reps: '4-5 reps per side',
    keyCue: 'Anchor both sit bones firmly into mat; reach pinky past little toe in three pulses.'
  },
  // 27. Mat (Full Body, diff 3)
  {
    id: 'PIL-FULL-006',
    name: 'The Control Balance',
    muscleGroup: 'full_body',
    difficulty: 3,
    difficultyLabel: 'Advanced',
    equipment: ['mat'],
    duration: 60,
    instructions: 'Begin in rollover position with legs overhead, toes on floor behind head. Grasp right ankle with both hands. Inhale to release left leg straight up toward ceiling in a vertical split. Exhale as you pulse the overhead right foot twice. Inhale to switch legs in mid-air with control, catching the left ankle with both hands. Continue alternating legs while maintaining shoulder stand balance.',
    category: 'Full-Body Integration & Spinal Articulation',
    targetMuscles: ['Hamstrings', 'Glutes', 'Core Stabilizers', 'Triceps'],
    focus: 'full_body',
    reps: '4-5 switches per side',
    keyCue: 'Balance firmly on shoulder girdle; switch legs overhead with poise and stillness in pelvis.'
  },
  // 28. Mat (Full Body, diff 3)
  {
    id: 'PIL-FULL-007',
    name: 'Boomerang',
    muscleGroup: 'full_body',
    difficulty: 3,
    difficultyLabel: 'Advanced',
    equipment: ['mat'],
    duration: 75,
    instructions: 'Sit tall with legs crossed right over left. Roll back onto shoulder blades, switch leg crossing (left over right). Roll forward to teaser balance with arms reaching back and hands interlaced. Fold forward over legs sweeping arms overhead into forward stretch. Sweep arms around to return to start position in one fluid continuous movement cycle.',
    category: 'Full-Body Integration & Spinal Articulation',
    targetMuscles: ['Abdominals', 'Hip Flexors', 'Deltoids', 'Pectorals', 'Spinal Articulators'],
    focus: 'full_body',
    reps: '4-6 cycles',
    keyCue: 'Seamlessly flow from rollover to teaser balance to forward stretch in one fluid motion.'
  },

  // --- 8 BANDS (Resistance Band Exercises) ---
  // 29. Bands (Core, diff 1)
  {
    id: 'PIL-BND-001',
    name: 'Resistance Band Roll-Up Assist',
    muscleGroup: 'core',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['bands'],
    duration: 60,
    instructions: 'Sit tall with legs straight and loop a resistance band around the arches of your feet, holding one end in each hand. Inhale to grow tall, then exhale as you slowly roll backward vertebra by vertebra onto the mat. Inhale to begin curling chin to chest, then exhale as the band provides progressive assistance to peel your spine up and over your thighs in a smooth C-curve.',
    category: 'Anterior Core & Abdominals',
    targetMuscles: ['Rectus Abdominis', 'Transverse Abdominis'],
    focus: 'core',
    reps: '6-8 slow reps',
    keyCue: 'Use steady band tension to guide smooth spinal articulation off the mat.'
  },
  // 30. Bands (Obliques, diff 2)
  {
    id: 'PIL-BND-002',
    name: 'Banded Russian Twist & Oblique Pull',
    muscleGroup: 'obliques',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['bands'],
    duration: 50,
    instructions: 'Sit in a half-rollback position with knees bent and feet flat or looped with a band. Grasp the band handles with both hands. Rotate your torso 45 degrees to the right, pulling the band taut toward your hip while maintaining a scooped C-curve. Return through center and rotate to the left with continuous resistance.',
    category: 'Obliques & Lateral Chain',
    targetMuscles: ['Internal Obliques', 'External Obliques', 'Transverse Abdominis'],
    focus: 'core',
    reps: '10 reps per side',
    keyCue: 'Keep pelvis grounded; rotate through the thoracic spine against band resistance.'
  },
  // 31. Bands (Core, diff 3)
  {
    id: 'PIL-BND-003',
    name: 'Band-Resisted Teaser Prep',
    muscleGroup: 'core',
    difficulty: 3,
    difficultyLabel: 'Advanced',
    equipment: ['bands'],
    duration: 60,
    instructions: 'Lie supine with the center of the band looped around both feet, legs in tabletop, and band ends gripped firmly in each hand. Inhale to nod head, exhale as you extend legs to 45 degrees and simultaneously roll your upper body up into a V-position teaser. Hold for a full breath at the peak, then articulate down with control.',
    category: 'Anterior Core & Abdominals',
    targetMuscles: ['Rectus Abdominis', 'Iliopsoas', 'Transverse Abdominis'],
    focus: 'core',
    reps: '5-6 controlled reps',
    keyCue: 'Balance on the sit bones while lifting chest toward legs against the band tension.'
  },
  // 32. Bands (Lower Body, diff 1)
  {
    id: 'PIL-BND-004',
    name: 'Banded Clamshell & Hip Abduction',
    muscleGroup: 'lower_body',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['bands'],
    duration: 60,
    instructions: 'Loop a resistance band just above your knees. Lie on your side with knees bent at a 90-degree angle and feet aligned with your spine. Keep feet glued together, inhale to prepare, and exhale to lift your top knee as high as possible against the resistance band while keeping your pelvis perfectly stable. Inhale to lower slowly.',
    category: 'Glutes, Hips & Lower Body',
    targetMuscles: ['Gluteus Medius', 'Hip External Rotators'],
    focus: 'full_body',
    reps: '12-15 reps per side',
    keyCue: 'Keep pelvis stacked vertically; rotate top knee open against the band without rocking hips backward.'
  },
  // 33. Bands (Upper Body, diff 1)
  {
    id: 'PIL-BND-005',
    name: 'Standing Band Bicep Curls & Chest Expansion',
    muscleGroup: 'upper_body',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['bands'],
    duration: 60,
    instructions: 'Stand hip-width apart on the center of the resistance band, holding one end in each hand with neutral wrists. Inhale to draw belly inward and curl forearms up toward shoulders. Exhale to lower with resistance. Transition into chest expansion by pressing straight arms back past hips, engaging the posterior deltoids and triceps.',
    category: 'Upper Body, Chest & Arms',
    targetMuscles: ['Biceps Brachii', 'Pectoralis Major', 'Rhomboids'],
    focus: 'full_body',
    reps: '12 reps',
    keyCue: 'Stand tall with core engaged; squeeze shoulder blades as arms press back against the band.'
  },
  // 34. Bands (Upper Body, diff 2)
  {
    id: 'PIL-BND-006',
    name: 'Banded Lat Pulldown & Spine Extension',
    muscleGroup: 'upper_body',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['bands'],
    duration: 50,
    instructions: 'Kneel or sit tall holding the resistance band overhead with hands shoulder-width apart. Inhale to prepare. Exhale as you pull the band apart while bending elbows down toward ribs, drawing shoulder blades down and gently lifting through the thoracic spine. Inhale to return overhead with smooth control.',
    category: 'Upper Body, Chest & Arms',
    targetMuscles: ['Latissimus Dorsi', 'Erector Spinae', 'Lower Trapezius'],
    focus: 'full_body',
    reps: '10-12 reps',
    keyCue: 'Pull band wide across chest while extending the upper back, keeping neck long.'
  },
  // 35. Bands (Lower Body, diff 2)
  {
    id: 'PIL-BND-007',
    name: 'Banded Side-Lying Leg Lifts',
    muscleGroup: 'lower_body',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['bands'],
    duration: 50,
    instructions: 'Lie on your side with a loop band around ankles or calves. Support your head on your bottom arm. Keep body in a straight line with hips stacked vertically. Exhale to raise the top leg straight up against the resistance of the band, pause briefly at the top, and inhale to lower with control.',
    category: 'Glutes, Hips & Lower Body',
    targetMuscles: ['Gluteus Medius', 'Tensor Fasciae Latae', 'Obliques'],
    focus: 'full_body',
    reps: '10-12 reps per side',
    keyCue: 'Keep toes pointed slightly forward; lift leg against band resistance without tilting pelvis.'
  },
  // 36. Bands (Posterior Chain, diff 1)
  {
    id: 'PIL-BND-008',
    name: 'Band-Assisted Hamstring & Calf Stretch',
    muscleGroup: 'posterior_chain',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['bands'],
    duration: 60,
    instructions: 'Lie supine with one leg straight on the mat and loop the resistance band around the arch of the opposite foot. Hold the band ends with both hands and gently draw the straight leg upward toward the ceiling until a comfortable stretch is felt along the hamstring and calf. Breathe deeply into the back of the leg.',
    category: 'Posterior Chain & Spine Extensors',
    targetMuscles: ['Hamstrings', 'Gastrocnemius', 'Soleus'],
    focus: 'stretch',
    reps: '30s hold per side',
    keyCue: 'Anchor tailbone to the floor while gently drawing the leg overhead using the band.'
  },

  // --- 7 BALL (Pilates Mini Ball Exercises) ---
  // 37. Ball (Core, diff 1)
  {
    id: 'PIL-BAL-001',
    name: 'Mini Ball Chest Lift (Ab Prep)',
    muscleGroup: 'core',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['ball'],
    duration: 60,
    instructions: 'Place a mini stability ball behind your mid-back (lower thoracic spine) while seated with knees bent and feet flat. Interlace fingers lightly behind the head. Inhale to drape slightly back over the ball into extension. Exhale as you curl head and chest forward into flexion, deepening the abdominal connection over the ball.',
    category: 'Anterior Core & Abdominals',
    targetMuscles: ['Rectus Abdominis', 'Transverse Abdominis'],
    focus: 'core',
    reps: '10-12 reps',
    keyCue: 'Rest thoracic spine against the mini ball; curl up from the ribcage without pulling the neck.'
  },
  // 38. Ball (Core, diff 2)
  {
    id: 'PIL-BAL-002',
    name: 'Mini Ball Behind Sacrum C-Curve Pulses',
    muscleGroup: 'core',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['ball'],
    duration: 50,
    instructions: 'Sit upright with knees bent, feet flat, and place the mini ball directly behind your sacrum/low back. Roll back until your sacrum touches the ball in a deep C-curve scoop. Extend arms forward. Inhale to prepare, exhale to perform small, controlled pulses backward into the ball, emphasizing the lowest portion of the abdominals.',
    category: 'Anterior Core & Abdominals',
    targetMuscles: ['Transverse Abdominis', 'Rectus Abdominis', 'Internal Obliques'],
    focus: 'core',
    reps: '15 small pulses',
    keyCue: 'Tuck pelvis and lean lightly into the ball; pulse backward from the deep low belly.'
  },
  // 39. Ball (Obliques, diff 2)
  {
    id: 'PIL-BAL-003',
    name: 'Mini Ball Oblique Criss-Cross',
    muscleGroup: 'obliques',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['ball'],
    duration: 50,
    instructions: 'Place the mini ball behind your thoracic spine, hands supporting the head, knees in tabletop. Inhale to center. Exhale as you rotate your right shoulder toward your left knee while extending the right leg long. Inhale through center and exhale to rotate across to the opposite side, using the ball to maintain height and stability.',
    category: 'Obliques & Lateral Chain',
    targetMuscles: ['External Obliques', 'Internal Obliques', 'Rectus Abdominis'],
    focus: 'core',
    reps: '10 reps per side',
    keyCue: 'Rotate the ribcage across the supported mini ball; maintain level hips.'
  },
  // 40. Ball (Lower Body, diff 1)
  {
    id: 'PIL-BAL-004',
    name: 'Mini Ball Inner Thigh Squeeze Bridge',
    muscleGroup: 'lower_body',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['ball'],
    duration: 60,
    instructions: 'Lie supine with knees bent and feet flat on the floor, placing the mini ball securely between your inner thighs just above the knees. Inhale to prepare. Exhale as you gently squeeze the ball with your adductors and lift your hips into a bridge. Hold at the top for 3 small pulses into the ball, then articulate down vertebra by vertebra.',
    category: 'Glutes, Hips & Lower Body',
    targetMuscles: ['Adductors', 'Gluteus Maximus', 'Hamstrings', 'Pelvic Floor'],
    focus: 'full_body',
    reps: '12-15 reps with pulses',
    keyCue: 'Maintain steady adductor squeeze on the ball while lifting and articulating the pelvis.'
  },
  // 41. Ball (Posterior Chain, diff 2)
  {
    id: 'PIL-BAL-005',
    name: 'Mini Ball Hamstring Curl & Pelvic Lift',
    muscleGroup: 'posterior_chain',
    difficulty: 2,
    difficultyLabel: 'Intermediate',
    equipment: ['ball'],
    duration: 50,
    instructions: 'Lie supine with arms anchored at your sides and both heels resting on top of the mini ball. Inhale to engage core. Exhale to lift hips into a straight-leg bridge. Keeping hips lifted, bend knees to roll the ball toward your seat by contracting the hamstrings. Inhale to extend legs long, then lower hips with control.',
    category: 'Posterior Chain & Spine Extensors',
    targetMuscles: ['Hamstrings', 'Gluteus Maximus', 'Erector Spinae'],
    focus: 'full_body',
    reps: '10-12 reps',
    keyCue: 'Press heels firmly into the ball; pull knees toward chest while keeping hips elevated.'
  },
  // 42. Ball (Upper Body, diff 3)
  {
    id: 'PIL-BAL-006',
    name: 'Mini Ball Push-Up & Balance Integration',
    muscleGroup: 'upper_body',
    difficulty: 3,
    difficultyLabel: 'Advanced',
    equipment: ['ball'],
    duration: 60,
    instructions: 'Set up in a high plank or kneeling plank position with one palm resting directly centered on the mini ball and the other hand flat on the floor. Engage core and glutes. Inhale to lower chest into a push-up, keeping elbows tracking 45 degrees back. Exhale to press firmly back up to plank. Switch sides halfway through.',
    category: 'Upper Body, Chest & Arms',
    targetMuscles: ['Pectoralis Major', 'Triceps Brachii', 'Anterior Deltoids', 'Core Stabilizers'],
    focus: 'full_body',
    reps: '8-10 reps',
    keyCue: 'Stabilize one hand on the mini ball; resist twisting as you lower and press.'
  },
  // 43. Ball (Posterior Chain, diff 1)
  {
    id: 'PIL-BAL-007',
    name: 'Mini Ball Thoracic Extension Opener',
    muscleGroup: 'posterior_chain',
    difficulty: 1,
    difficultyLabel: 'Beginner',
    equipment: ['ball'],
    duration: 60,
    instructions: 'Place the mini ball under your upper back between your shoulder blades and lie back with knees bent and feet flat. Open arms wide into a cactus or T-shape. Allow your head to rest gently back onto the mat or a small pillow. Inhale deeply into the front of the ribcage, feeling the chest expand. Exhale to release tension.',
    category: 'Posterior Chain & Spine Extensors',
    targetMuscles: ['Pectoralis Minor', 'Thoracic Spine Extensors', 'Intercostals'],
    focus: 'stretch',
    reps: '5 deep breath cycles',
    keyCue: 'Surrender upper back into the ball; open arms in a goalpost to stretch chest and shoulders.'
  },

  // --- 2 REFORMER (Classical Studio Apparatus Staples) ---
  // 44. Reformer (Core, diff 2)
  {
    ...existingMap.get('PIL-CORE-006'),
    instructions: 'Sit tall on the short box with feet hooked securely under the footstrap, knees slightly soft. Cross arms over waist in a genie wrap. Inhale to grow tall through the spine. Exhale to tuck pelvis and roll back into a deep lumbar C-curve, stopping where abdominals stay engaged without straining the neck. Inhale to pause. Exhale to roll forward, scooping the belly and restacking to tall seated.'
  },
  // 45. Reformer (Full Body / Stretch, diff 2)
  {
    ...existingMap.get('PIL-FULL-005'),
    instructions: 'Lie supine on the reformer carriage with long straps secured around the arches of your feet, hands holding the carriage handles. Inhale to press feet forward and up, then exhale to articulate the spine off the carriage into a rollover position parallel to the floor. Inhale to bend knees wide into frogs. Exhale as you roll down vertebra by vertebra through the spine, extending legs back to 45 degrees.'
  }
];

fs.writeFileSync(path.join(ROOT_DIR, 'data', 'exercises.json'), JSON.stringify(exercises, null, 2));
console.log('Successfully wrote 45 curated exercises to data/exercises.json!');
