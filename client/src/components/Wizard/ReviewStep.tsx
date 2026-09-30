import { ArrowLeft, Sparkles } from 'lucide-react';
import type { WizardState } from '../../types/wizard';

interface Props {
  state: WizardState;
  onGenerate: () => void;
  onBack: () => void;
}

export function ReviewStep({ state, onGenerate, onBack }: Props) {
  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-8">
      <p className="eyebrow mb-3">Step 3 · Review</p>
      <h2 className="mb-8 text-[42px] leading-[1.08]">Ready to go?</h2>

      <div className="card mb-8 rounded-panel p-6 sm:p-7">
        <h3 className="mb-6 border-b border-line pb-3 text-[25px]">Your workout summary</h3>

        <dl className="space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-[13px] font-medium text-muted">Focus</dt>
            <dd className="font-semibold">{state.focus}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-[13px] font-medium text-muted">Duration</dt>
            <dd className="font-semibold">{state.duration} minutes</dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="pt-1.5 text-[13px] font-medium text-muted">Equipment</dt>
            <dd className="flex flex-wrap justify-end gap-2">
              {state.equipment.map((eq) => (
                <span key={eq} className="badge">{eq}</span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-secondary">
          <ArrowLeft className="size-4" />
          Edit
        </button>
        <button onClick={onGenerate} className="btn-primary">
          Generate my routine
          <Sparkles className="size-4" />
        </button>
      </div>
    </div>
  );
}
