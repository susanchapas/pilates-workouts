import { Activity, Check, Database, Target } from 'lucide-react';
import sketch from '../../assets/figma/movement-sketch.png';
import { DEFAULT_GOAL, FOCUS_OPTIONS } from '../../lib/wizardOptions';
import type { Focus } from '../../types/wizard';
import { ActionBar, StepLayout, SummaryRow } from './StepLayout';

interface Props {
  goal: string;
  focus: Focus | null;
  counts: Record<Focus, number>;
  total: number;
  onChange: (focus: Focus) => void;
  onNext: () => void;
  onBack: () => void;
}

export function FocusStep({ goal, focus, counts, total, onChange, onNext, onBack }: Props) {
  const selected = focus && FOCUS_OPTIONS[focus];

  return (
    <StepLayout
      eyebrow="Step 2 · Focus"
      title="Where should we focus?"
      description="Choose the intention that best supports your goal today. You can refine the routine later."
      aside={
        <aside className="card flex shrink-0 flex-col gap-6 p-6 lg:w-[280px]">
          <div className="flex flex-col gap-2.5">
            <span className="badge">Your intention</span>
            <p className="font-display text-[25px] leading-[1.15] font-bold">{goal || DEFAULT_GOAL}.</p>
          </div>
          <img src={sketch} alt="" className="h-[174px] w-full rounded-[14px] border border-line object-cover" />
          <div className="flex flex-col gap-4">
            <SummaryRow tileClassName="icon-tile-brand" icon={<Target className="size-4" />} label="Focus" value={selected?.label ?? '—'} />
            <SummaryRow tileClassName="icon-tile-brand" icon={<Activity className="size-4" />} label="Approach" value={selected?.approach ?? '—'} />
            {focus && total > 0 && (
              <SummaryRow tileClassName="icon-tile-brand" icon={<Database className="size-4" />} label="Eligible movements" value={`${counts[focus]} of ${total}`} />
            )}
          </div>
        </aside>
      }
      actions={
        <ActionBar onBack={onBack} onNext={onNext} nextDisabled={!focus} status={selected && `${selected.label} selected`} />
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(FOCUS_OPTIONS) as Focus[]).map((id) => {
          const { label, desc, image, icon: Icon } = FOCUS_OPTIONS[id];
          const isSelected = focus === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              aria-pressed={isSelected}
              className={`flex min-h-[330px] flex-col overflow-hidden rounded-card border bg-surface text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                isSelected ? 'border-brand-line shadow-card-selected' : 'border-line shadow-card hover:border-brand-line'
              }`}
            >
              <div className="relative flex h-40 w-full flex-col items-end justify-between p-3.5">
                <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
                <span className="relative flex size-[38px] items-center justify-center rounded-full border border-brand-line bg-white text-brand shadow-card">
                  <Icon className="size-[18px]" />
                </span>
                {isSelected && (
                  <span className="relative flex size-7 items-center justify-center rounded-full bg-brand text-white shadow-card-selected">
                    <Check className="size-[15px]" />
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-[18px]">
                <div className="flex items-center justify-between">
                  <h3 className="text-[23px]">{label}</h3>
                  <Icon className="size-[17px] text-brand" />
                </div>
                <p className="text-sm leading-[1.5] text-muted">{desc}</p>
                {total > 0 && <span className="text-[10px] font-bold tracking-[0.8px] text-muted uppercase">{counts[id]} exercises</span>}
              </div>
            </button>
          );
        })}
      </div>
    </StepLayout>
  );
}
