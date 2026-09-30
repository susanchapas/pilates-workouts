import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StepLayoutProps {
  eyebrow: ReactNode;
  title: string;
  description: string;
  aside: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function StepLayout({ eyebrow, title, description, aside, children, actions, className = '' }: StepLayoutProps) {
  return (
    <div className={`relative flex flex-1 flex-col gap-[30px] px-4 pt-8 pb-8 sm:px-8 lg:px-[76px] lg:pt-11 lg:pb-[38px] ${className}`}>
      <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:gap-11">
        <div className="flex min-w-0 flex-1 flex-col gap-7">
          <div className="flex flex-col gap-3">
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="text-[42px] leading-[1.08]">{title}</h2>
            <p className="text-[15px] leading-[1.55] text-muted">{description}</p>
          </div>
          {children}
        </div>
        {aside}
      </div>
      {actions}
    </div>
  );
}

interface ActionBarProps {
  onBack: () => void;
  onNext: () => void;
  status?: ReactNode;
  nextLabel?: string;
  nextIcon?: ReactNode;
  nextDisabled?: boolean;
  nextClassName?: string;
}

export function ActionBar({
  onBack,
  onNext,
  status,
  nextLabel = 'Continue',
  nextIcon = <ArrowRight className="size-4" />,
  nextDisabled,
  nextClassName = 'btn-primary',
}: ActionBarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button onClick={onBack} className="btn-secondary">
        Back
        <ArrowLeft className="size-4" />
      </button>
      <div className="flex items-center gap-[18px]">
        {status && <span className="hidden text-[13px] font-medium text-muted sm:inline-flex sm:items-center sm:gap-1.5">{status}</span>}
        <button onClick={onNext} disabled={nextDisabled} className={nextClassName}>
          {nextLabel}
          {nextIcon}
        </button>
      </div>
    </div>
  );
}

interface SummaryRowProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  tileClassName?: string;
}

export function SummaryRow({ icon, label, value, tileClassName = 'icon-tile' }: SummaryRowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className={tileClassName}>{icon}</span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[11px] font-medium text-muted">{label}</span>
        <span className="text-sm font-semibold">{value}</span>
      </div>
    </div>
  );
}
