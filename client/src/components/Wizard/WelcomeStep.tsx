import { ArrowRight } from 'lucide-react';

interface Props {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: Props) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-6 px-4 sm:px-8">
      <span className="badge">PERSONAL PILATES ROUTINES</span>
      <h1 className="text-5xl leading-[1.02] font-semibold tracking-[-0.6px] sm:text-[54px]">
        Move with intention, every day.
      </h1>
      <p className="max-w-xl text-base leading-[1.55] text-muted">
        Tell us what your body needs today. Morrow builds a thoughtful, balanced routine from 40 studio-approved movements.
      </p>
      <button onClick={onNext} className="btn-primary">
        Find my flow
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}
