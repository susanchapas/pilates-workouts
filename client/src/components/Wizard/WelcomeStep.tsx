import { ArrowRight, Search } from 'lucide-react';
import portrait from '../../assets/figma/studio-portrait.png';
import { DEFAULT_GOAL, GOAL_SUGGESTIONS } from '../../lib/wizardOptions';

interface Props {
  goal: string;
  total: number;
  onChangeGoal: (goal: string) => void;
  onNext: () => void;
}

export function WelcomeStep({ goal, total, onChangeGoal, onNext }: Props) {
  return (
    <div className="flex flex-1 flex-col gap-10 px-4 pt-8 pb-8 sm:px-8 lg:flex-row lg:gap-[62px] lg:pt-12 lg:pr-[54px] lg:pb-11 lg:pl-[76px]">
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-10">
        <div className="flex flex-col gap-[22px]">
          <span className="badge border-brand-tint-line bg-brand-tint">Personal pilates routines</span>
          <h1 className="text-[42px] leading-[1.02] font-semibold tracking-[-0.6px] sm:text-[54px]">
            Move with intention, every day.
          </h1>
          <p className="max-w-[570px] text-base leading-[1.55] text-muted">
            Tell us what your body needs today. Morrow builds a thoughtful, balanced routine from {total > 0 && `${total} `}studio-approved movements.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onNext();
            }}
            className="flex min-h-16 flex-wrap items-center gap-3.5 rounded-card border border-brand-soft bg-surface px-5 py-2 shadow-raised sm:flex-nowrap"
          >
            <Search className="size-5 shrink-0 text-muted" />
            <label className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="label-caps">Workout goal</span>
              <input
                value={goal}
                onChange={(e) => onChangeGoal(e.target.value)}
                placeholder={DEFAULT_GOAL}
                className="w-full bg-transparent text-[15px] font-medium outline-none placeholder:text-ink/60"
              />
            </label>
            <button type="submit" className="btn-primary shadow-none">
              Find my flow
              <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="flex flex-col gap-2.5">
            <span className="label-caps text-[11px]">Or choose a starting point</span>
            <div className="flex flex-wrap gap-2.5">
              {GOAL_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => onChangeGoal(suggestion)}
                  aria-pressed={goal === suggestion}
                  className="chip"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {total > 0 && (
          <div className="flex items-center gap-4">
            <span className="flex size-[46px] shrink-0 items-center justify-center rounded-full border border-brand-tint-line bg-brand-tint font-display text-xl font-bold text-brand">
              {total}
            </span>
            <div className="flex flex-col gap-[3px]">
              <span className="text-[13px] font-semibold">A considered movement library</span>
              <span className="text-[11px] leading-[1.4] text-muted">
                Each exercise is tagged by muscle group, difficulty, equipment and duration.
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="relative flex min-h-[520px] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] p-6 lg:w-[470px]">
        <img src={portrait} alt="Woman stretching beside a reformer in a sunlit studio" className="absolute inset-0 size-full object-cover" />
        <span className="relative flex w-fit items-center gap-2 rounded-full border border-brand-tint-line bg-canvas/85 px-3 py-2 text-[11px] font-semibold">
          <span className="size-[7px] rounded-full bg-success" />
          Studio method · at home
        </span>
        <figure className="relative flex flex-col gap-2 rounded-card border border-brand-soft bg-surface p-5 shadow-raised">
          <blockquote className="font-display text-xl leading-[1.2] font-bold">
            “Strength without strain. Progress without rush.”
          </blockquote>
          <figcaption className="text-[10px] font-semibold tracking-[1px] text-muted uppercase">The Morrow method</figcaption>
        </figure>
      </div>
    </div>
  );
}
