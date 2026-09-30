import { useState } from 'react';
import { WelcomeStep } from '../components/Wizard/WelcomeStep';
import { FocusStep } from '../components/Wizard/FocusStep';
import { EquipmentDurationStep } from '../components/Wizard/EquipmentDurationStep';
import { ReviewStep } from '../components/Wizard/ReviewStep';
import type { WizardState } from '../types/wizard';

const steps = ['welcome', 'focus', 'equipment', 'review'] as const;
type Step = (typeof steps)[number];

export function WizardPage() {
  const [step, setStep] = useState<Step>('welcome');
  const [state, setState] = useState<WizardState>({
    focus: '',
    equipment: ['None'],
    duration: 0,
  });

  const stepIndex = steps.indexOf(step);

  const handleGenerate = () => {
    // In track D, we will route to a loader or results page
    console.log('Generating routine with state:', state);
    alert('Generating routine... (Next Phase)');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-[76px] items-center justify-between border-b border-line bg-surface px-4 sm:px-11">
        <div className="flex items-center gap-[11px]">
          <span className="flex size-[30px] items-center justify-center rounded-full bg-brand font-display text-lg font-bold text-white">m</span>
          <span className="font-display text-[22px] font-bold">morrow</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold tracking-[1px] text-muted uppercase">
            Plan · {stepIndex + 1} of {steps.length}
          </span>
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-line sm:w-[150px]">
            <div
              className="h-full rounded-full bg-brand transition-[width]"
              style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </header>
      <main className="flex-1 py-8 sm:py-11">
        {step === 'welcome' && (
          <WelcomeStep onNext={() => setStep('focus')} />
        )}
        
        {step === 'focus' && (
          <FocusStep
            focus={state.focus}
            onChange={(focus) => setState({ ...state, focus })}
            onNext={() => setStep('equipment')}
            onBack={() => setStep('welcome')}
          />
        )}
        
        {step === 'equipment' && (
          <EquipmentDurationStep
            equipment={state.equipment}
            duration={state.duration}
            onChangeEquipment={(equipment) => setState({ ...state, equipment })}
            onChangeDuration={(duration) => setState({ ...state, duration })}
            onNext={() => setStep('review')}
            onBack={() => setStep('focus')}
          />
        )}
        
        {step === 'review' && (
          <ReviewStep
            state={state}
            onGenerate={handleGenerate}
            onBack={() => setStep('equipment')}
          />
        )}
      </main>
    </div>
  );
}
