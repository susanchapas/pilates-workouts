import { ArrowLeft, Clock3, Database, Dumbbell, Scale, Shuffle, SlidersHorizontal, Sparkles, Target, TrendingUp } from 'lucide-react';
import { DEFAULT_GOAL, FOCUS_OPTIONS, equipmentLabel } from '../../lib/wizardOptions';
import type { WizardState } from '../../types/wizard';
import { StepLayout, SummaryRow } from './StepLayout';

type EditTarget = 'focus' | 'equipment' | 'duration';

interface Props {
  state: WizardState;
  eligible: number;
  total: number;
  onGenerate: () => void;
  onBack: () => void;
  onEdit: (step: EditTarget) => void;
}

export function ReviewStep({ state, eligible, total, onGenerate, onBack, onEdit }: Props) {
  const focusLabel = state.focus ? FOCUS_OPTIONS[state.focus].label : '—';
  const equipment = equipmentLabel(state.equipment);

  const rules = [
    { icon: SlidersHorizontal, title: 'Match your setup', desc: `${focusLabel} · ${equipment}` },
    { icon: Scale, title: 'Balance muscle groups', desc: 'Core, glutes, spine, upper body' },
    { icon: Shuffle, title: 'Vary consecutive work', desc: 'No repeated muscle groups back-to-back' },
    { icon: TrendingUp, title: 'Shape the effort', desc: 'Warm-up → ramp → peak → cool-down' },
  ];

  return (
    <StepLayout
      eyebrow="Step 5 · Review"
      title="Your practice, at a glance."
      description={`Everything looks ready. We will use these choices to compose a thoughtful ${state.duration}-minute routine.`}
      aside={
        <aside className="panel flex shrink-0 flex-col gap-[22px] p-[26px] lg:w-[356px]">
          <div className="flex flex-col gap-2.5">
            <span className="badge">The Morrow method</span>
            <p className="font-display text-[30px] leading-[1.1] font-bold">More than a random exercise list.</p>
            <p className="text-sm leading-normal text-muted">
              A transparent scoring system turns your choices into a balanced, human-feeling flow.
            </p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {rules.map(({ icon: Icon, title, desc }) => (
              <li
                key={title}
                className="flex items-center gap-3 rounded-2xl border border-line bg-slate-50 p-3.5 shadow-[6px_6px_12px_0_rgb(15_23_42/0.05),-4px_-4px_10px_0_white]"
              >
                <span className="flex size-[34px] shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand shadow-tile">
                  <Icon className="size-4" />
                </span>
                <div className="flex flex-col gap-[3px]">
                  <span className="text-[13px] font-semibold">{title}</span>
                  <span className="text-[9px] leading-[1.35] text-muted">{desc}</span>
                </div>
              </li>
            ))}
          </ul>
          {total > 0 && (
            <p className="flex items-center gap-2.5 text-[10px] leading-[1.4] text-muted">
              <Database className="size-4 shrink-0 text-brand" />
              Scoring {eligible} eligible movements from the {total}-exercise library.
            </p>
          )}
        </aside>
      }
    >
      <div className="panel flex flex-col gap-5 p-[26px]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[25px]">Today’s flow</h3>
          <span className="badge border-[#a5c9f2]">Ready to build</span>
        </div>
        <div className="grid gap-[18px] sm:grid-cols-2 sm:gap-x-[26px]">
          <SummaryRow icon={<Target className="size-4" />} label="Workout goal" value={state.goal || DEFAULT_GOAL} />
          <SummaryRow icon={<Sparkles className="size-4" />} label="Focus" value={focusLabel} />
          <SummaryRow icon={<Clock3 className="size-4" />} label="Duration" value={`${state.duration} minutes`} />
          <SummaryRow icon={<Dumbbell className="size-4" />} label="Equipment" value={equipment} />
        </div>
        <div className="flex flex-wrap gap-[18px] text-[11px] font-semibold text-brand">
          {(['focus', 'equipment', 'duration'] as const).map((target) => (
            <button key={target} onClick={() => onEdit(target)} className="underline hover:text-brand-hover">
              Edit {target}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button onClick={onBack} className="btn-secondary">
          Back
          <ArrowLeft className="size-4" />
        </button>
        <button onClick={onGenerate} className="btn-primary sm:w-[232px]">
          Generate my routine
          <Sparkles className="size-4" />
        </button>
      </div>
    </StepLayout>
  );
}
