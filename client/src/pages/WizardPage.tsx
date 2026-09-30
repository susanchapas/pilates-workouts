import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterExercises } from '../../../api/src/lib/routine';
import { WelcomeStep } from '../components/Wizard/WelcomeStep';
import { FocusStep } from '../components/Wizard/FocusStep';
import { EquipmentStep } from '../components/Wizard/EquipmentStep';
import { DurationStep } from '../components/Wizard/DurationStep';
import { ReviewStep } from '../components/Wizard/ReviewStep';
import { useExercises } from '../hooks/useExercises';
import { EQUIPMENT_OPTIONS, FOCUS_OPTIONS, RECOMMENDED_DURATION } from '../lib/wizardOptions';
import type { Equipment, Focus, WizardState } from '../types/wizard';

const steps = ['welcome', 'focus', 'equipment', 'duration', 'review'] as const;
type Step = (typeof steps)[number];

const allFocus = Object.keys(FOCUS_OPTIONS) as Focus[];
const allEquipment = Object.keys(EQUIPMENT_OPTIONS) as Equipment[];

const countBy = <K extends string>(keys: K[], count: (key: K) => number) =>
  Object.fromEntries(keys.map((key) => [key, count(key)])) as Record<K, number>;

export function WizardPage() {
  const [step, setStep] = useState<Step>('welcome');
  const [state, setState] = useState<WizardState>({
    goal: '',
    focus: null,
    equipment: ['mat'],
    duration: RECOMMENDED_DURATION,
  });

  const exercises = useExercises();
  const focusCounts = countBy(allFocus, (f) => filterExercises(exercises, f, allEquipment).length);
  const equipmentCounts = countBy(allEquipment, (e) => (state.focus ? filterExercises(exercises, state.focus, [e]).length : 0));
  const eligible = state.focus ? filterExercises(exercises, state.focus, state.equipment) : [];

  const stepIndex = steps.indexOf(step);
  const go = (offset: number) => setStep(steps[stepIndex + offset]);
  const update = (patch: Partial<WizardState>) => setState({ ...state, ...patch });

  const navigate = useNavigate();

  const handleGenerate = () => {
    // Navigate to loader page
    console.log('Generating routine with state:', state);
    navigate('/loading');
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <header className="relative z-10 flex h-[76px] shrink-0 items-center justify-between gap-4 border-b sm:grid sm:grid-cols-[1fr_auto_1fr] border-line bg-surface px-4 shadow-[0_1px_2px_0_rgb(15_23_42/0.03)] sm:px-11">
        <div className="flex items-center gap-[11px]">
          <span className="flex size-[30px] items-center justify-center rounded-full bg-brand-soft font-display text-lg font-bold shadow-card">m</span>
          <span className="font-display text-[22px] font-bold">morrow</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold tracking-[1px] whitespace-nowrap text-muted uppercase">
            Plan · {stepIndex + 1} of {steps.length}
          </span>
          <div className="h-2 w-20 overflow-hidden rounded-full bg-line sm:w-[150px]">
            <div
              className="h-full rounded-full bg-brand transition-[width]"
              style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col">
        {step === 'welcome' && (
          <WelcomeStep goal={state.goal} total={exercises.length} onChangeGoal={(goal) => update({ goal })} onNext={() => go(1)} />
        )}

        {step === 'focus' && (
          <FocusStep
            goal={state.goal}
            focus={state.focus}
            counts={focusCounts}
            total={exercises.length}
            onChange={(focus) => update({ focus })}
            onNext={() => go(1)}
            onBack={() => go(-1)}
          />
        )}

        {step === 'equipment' && (
          <EquipmentStep
            equipment={state.equipment}
            counts={equipmentCounts}
            eligible={eligible}
            total={exercises.length}
            onChange={(equipment) => update({ equipment })}
            onNext={() => go(1)}
            onBack={() => go(-1)}
          />
        )}

        {step === 'duration' && (
          <DurationStep
            duration={state.duration}
            onChange={(duration) => update({ duration })}
            onNext={() => go(1)}
            onBack={() => go(-1)}
          />
        )}

        {step === 'review' && (
          <ReviewStep
            state={state}
            eligible={eligible.length}
            total={exercises.length}
            onGenerate={handleGenerate}
            onBack={() => go(-1)}
            onEdit={setStep}
          />
        )}
      </main>
    </div>
  );
}
