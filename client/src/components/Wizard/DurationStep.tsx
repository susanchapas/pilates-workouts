import { Clock3 } from 'lucide-react';
import type { CSSProperties } from 'react';
import { DURATION_OPTIONS, RECOMMENDED_DURATION } from '../../lib/wizardOptions';
import type { Duration } from '../../types/wizard';
import { ActionBar, StepLayout } from './StepLayout';

interface Props {
  duration: Duration;
  onChange: (duration: Duration) => void;
  onNext: () => void;
  onBack: () => void;
}

const durations = Object.keys(DURATION_OPTIONS).map(Number) as Duration[];

const phases = [
  { label: 'Warm-up', share: 6 / 45, height: 58 },
  { label: 'Build', share: 12 / 45, height: 116 },
  { label: 'Peak', share: 16 / 45, height: 154 },
  { label: 'Ease', share: 7 / 45, height: 92 },
  { label: 'Cool', share: 4 / 45, height: 48 },
];

const PEAK = 2;

function phaseMinutes(duration: number) {
  const minutes = phases.map((p) => Math.round(p.share * duration));
  minutes[PEAK] += duration - minutes.reduce((a, b) => a + b, 0);
  return minutes;
}

export function DurationStep({ duration, onChange, onNext, onBack }: Props) {
  const index = durations.indexOf(duration);
  const minutes = phaseMinutes(duration);

  return (
    <StepLayout
      eyebrow="Step 4 · Duration"
      title="How much time do you have?"
      description="Choose a session length. We will fill the time with a complete warm-up, progressive flow and cool-down."
      aside={
        <aside className="flex shrink-0 flex-col gap-6 self-start rounded-panel border border-brand-line bg-brand-soft p-6 shadow-[8px_8px_20px_0_rgb(37_99_235/0.07),-8px_-8px_20px_0_white] lg:w-[300px]">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold tracking-[1px] text-brand uppercase">Your {duration}-minute shape</span>
            <p className="font-display text-[26px] leading-[1.15] font-bold">Room to warm, build and restore.</p>
          </div>
          <div className="flex h-[180px] items-end gap-2">
            {phases.map((phase, i) => (
              <div
                key={phase.label}
                style={{ height: phase.height }}
                className={`flex flex-1 flex-col items-center justify-between rounded-t-lg rounded-b-[3px] py-[9px] ${
                  i === PEAK
                    ? 'bg-brand text-white shadow-[4px_4px_8px_0_rgb(37_99_235/0.15),-4px_-4px_8px_0_white]'
                    : 'border border-line bg-white text-ink shadow-[4px_4px_8px_0_rgb(15_23_42/0.04),-4px_-4px_8px_0_white]'
                }`}
              >
                <span className="text-[9px] font-bold">{minutes[i]}m</span>
                <span className={`text-[8px] ${i === PEAK ? '' : 'text-muted'}`}>{phase.label}</span>
              </div>
            ))}
          </div>
          <p className="flex items-start gap-2.5 text-[11px] leading-[1.45] text-muted">
            <Clock3 className="size-4 shrink-0 text-brand" />
            Your generated routine will total exactly {duration} minutes, including transitions.
          </p>
        </aside>
      }
      actions={<ActionBar onBack={onBack} onNext={onNext} status={`${duration} minutes selected`} />}
    >
      <div className="panel flex flex-col gap-[26px] p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-5xl font-bold">{duration}</span>
            <span className="text-sm font-semibold text-muted">minutes</span>
          </div>
          {duration === RECOMMENDED_DURATION && <span className="badge">Recommended for your goal</span>}
        </div>
        <div className="flex flex-col gap-3.5">
          <input
            type="range"
            min={0}
            max={durations.length - 1}
            step={1}
            value={index}
            onChange={(e) => onChange(durations[Number(e.target.value)])}
            aria-label="Session length"
            aria-valuetext={`${duration} minutes`}
            className="range"
            style={{ '--fill': `${(index / (durations.length - 1)) * 100}%` } as CSSProperties}
          />
          <div className="flex justify-between text-[10px]">
            {durations.map((d) => (
              <span key={d} className={d === duration ? 'font-bold text-brand' : 'font-medium text-subtle'}>
                {d} min
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {durations.map((d) => {
          const isSelected = d === duration;
          return (
            <button
              key={d}
              onClick={() => onChange(d)}
              aria-pressed={isSelected}
              className={`flex flex-col gap-2 rounded-[18px] border p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                isSelected
                  ? 'border-brand-line bg-brand-soft shadow-[6px_6px_16px_0_rgb(37_99_235/0.08),-6px_-6px_16px_0_white]'
                  : 'border-line bg-white shadow-[6px_6px_16px_0_rgb(15_23_42/0.04),-6px_-6px_16px_0_white] hover:border-brand-line'
              }`}
            >
              <span className={`font-display text-[25px] font-bold ${isSelected ? 'text-brand' : ''}`}>{d}</span>
              <span className={`text-[11px] font-semibold ${isSelected ? 'text-brand' : ''}`}>{DURATION_OPTIONS[d].label}</span>
              <span className={`text-[9px] ${isSelected ? 'text-muted' : 'text-subtle'}`}>{DURATION_OPTIONS[d].exercises}</span>
            </button>
          );
        })}
      </div>
    </StepLayout>
  );
}
