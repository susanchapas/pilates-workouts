import { Circle, CircleDot, MoveHorizontal, PersonStanding, RectangleHorizontal, Sparkles, Waves } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Duration, Equipment, Focus } from '../types/wizard';
import core from '../assets/figma/focus-core.png';
import fullBody from '../assets/figma/focus-full-body.png';
import stretch from '../assets/figma/focus-stretch.png';

export const DEFAULT_GOAL = 'Build core strength and move with ease';

export const GOAL_SUGGESTIONS = ['Strengthen my core', 'Full-body reset', 'Release tension', 'Morning mobility'];

export const FOCUS_OPTIONS: Record<Focus, { label: string; desc: string; approach: string; image: string; icon: LucideIcon }> = {
  core: { label: 'Core', desc: 'Deep abdominal control, posture and stability.', approach: 'Control + stability', image: core, icon: CircleDot },
  full_body: { label: 'Full body', desc: 'Balanced strength and mobility from head to toe.', approach: 'Strength + mobility', image: fullBody, icon: Sparkles },
  stretch: { label: 'Stretch', desc: 'Release tension and restore comfortable range.', approach: 'Mobility + release', image: stretch, icon: Waves },
};

export const EQUIPMENT_OPTIONS: Record<Equipment, { label: string; desc: string; icon: LucideIcon }> = {
  mat: { label: 'Mat', desc: 'Floor-based control, stability and mobility.', icon: RectangleHorizontal },
  bands: { label: 'Bands', desc: 'Light resistance for strength and alignment.', icon: MoveHorizontal },
  ball: { label: 'Ball', desc: 'Support, balance and added instability.', icon: Circle },
  none: { label: 'None', desc: 'Bodyweight movements, no setup needed.', icon: PersonStanding },
};

export const DURATION_OPTIONS: Record<Duration, { label: string; exercises: string }> = {
  15: { label: 'Quick reset', exercises: '4–5 exercises' },
  30: { label: 'Daily practice', exercises: '7–8 exercises' },
  45: { label: 'Complete flow', exercises: '12 exercises' },
  60: { label: 'Deep practice', exercises: '15–16 exercises' },
};

export const RECOMMENDED_DURATION: Duration = 45;

export const equipmentLabel = (equipment: Equipment[]) => equipment.map((e) => EQUIPMENT_OPTIONS[e].label).join(' + ');
