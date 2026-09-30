import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Focus } from '../../types/wizard';

interface Props {
  focus: Focus;
  onChange: (focus: Focus) => void;
  onNext: () => void;
  onBack: () => void;
}

const focusOptions = [
  { id: 'Core', title: 'Core', desc: 'Deep abdominal control, posture and stability.' },
  { id: 'Full Body', title: 'Full body', desc: 'Balanced strength and mobility from head to toe.' },
  { id: 'Stretch', title: 'Stretch', desc: 'Release tension and restore comfortable range.' },
] as const;

export function FocusStep({ focus, onChange, onNext, onBack }: Props) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <p className="eyebrow mb-3">Step 1 · Focus</p>
      <h2 className="mb-3 text-[42px] leading-[1.08]">Where should we focus?</h2>
      <p className="mb-8 text-[15px] leading-[1.55] text-muted">
        Choose the intention that best supports your goal today.
      </p>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {focusOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            aria-pressed={focus === opt.id}
            className="card-option p-[18px]"
          >
            <h3 className="mb-2.5 text-[23px]">{opt.title}</h3>
            <p className="text-sm leading-[1.5] text-muted">{opt.desc}</p>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-secondary">
          <ArrowLeft className="size-4" />
          Back
        </button>
        <button onClick={onNext} disabled={!focus} className="btn-primary">
          Continue
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
