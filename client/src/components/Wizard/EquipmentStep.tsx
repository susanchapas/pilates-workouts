import { ArrowRight, Check, Info } from 'lucide-react';
import type { Exercise } from '../../../../shared/types/exercise';
import stillLife from '../../assets/figma/equipment-still-life.png';
import ribbonAction from '../../assets/figma/ribbon-action.svg';
import ribbonBowRight from '../../assets/figma/ribbon-bow-right.svg';
import ribbonCard from '../../assets/figma/ribbon-card.svg';
import ribbonEyebrow from '../../assets/figma/ribbon-eyebrow.svg';
import ribbonSidebar from '../../assets/figma/ribbon-sidebar.svg';
import ribbonTopLeft from '../../assets/figma/ribbon-topleft.svg';
import ribbonWaves from '../../assets/figma/ribbon-waves.svg';
import { EQUIPMENT_OPTIONS, equipmentLabel } from '../../lib/wizardOptions';
import type { Equipment } from '../../types/wizard';
import { ActionBar, StepLayout } from './StepLayout';

interface Props {
  equipment: Equipment[];
  counts: Record<Equipment, number>;
  eligible: Exercise[];
  total: number;
  onChange: (equipment: Equipment[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const listFormat = new Intl.ListFormat('en', { type: 'conjunction' });

export function EquipmentStep({ equipment, counts, eligible, total, onChange, onNext, onBack }: Props) {
  const toggle = (item: Equipment) => {
    if (item === 'none') return onChange(['none']);
    const rest = equipment.filter((e) => e !== 'none');
    const next = rest.includes(item) ? rest.filter((e) => e !== item) : [...rest, item];
    onChange(next.length ? next : ['none']);
  };

  const label = equipmentLabel(equipment);
  const groups = [...new Set(eligible.map((e) => e.muscleGroup.replace('_', ' ')))];

  return (
    <StepLayout
      className="bg-[#f0f5fb]"
      eyebrow={
        <span className="flex items-center gap-2">
          <img src={ribbonEyebrow} alt="" width={14} height={10} />
          Step 3 · Equipment
        </span>
      }
      title="What do you have nearby?"
      description="Select all that apply. We will only use movements that match your setup."
      aside={
        <aside className="relative flex shrink-0 flex-col overflow-hidden rounded-panel border border-blue-100 bg-white shadow-[-6px_-6px_14px_0_white,6px_6px_14px_0_rgb(59_130_246/0.06)] lg:w-[310px]">
          <img src={stillLife} alt="Pilates mat and resistance bands on a wooden floor" className="h-[265px] w-full object-cover" />
          <img src={ribbonSidebar} alt="" width={56} height={34} className="absolute top-[237px] left-1/2 -translate-x-1/2 opacity-70" />
          <div className="flex flex-1 flex-col justify-between gap-8 p-6">
            <div className="flex flex-col gap-3.5">
              <span className="badge border-blue-300 bg-linear-to-r from-blue-100 to-blue-200 font-bold text-blue-700">
                {equipment.length} {equipment.length === 1 ? 'item' : 'items'} selected
              </span>
              <p className="font-display text-[26px] leading-[1.15] font-bold">A simple, versatile setup.</p>
              {total > 0 && (
                <p className="text-sm leading-normal text-slate-500">
                  {label} {equipment.length === 1 ? 'unlocks' : 'unlock'} {eligible.length} movements
                  {groups.length > 0 && ` across ${listFormat.format(groups)}`}.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              {total > 0 && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-500">Eligible from library</span>
                    <span className="text-[13px] font-bold">{eligible.length} / {total}</span>
                  </div>
                  <div className="h-[7px] overflow-hidden rounded-full bg-linear-to-r from-blue-100 to-blue-200">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-blue-500 to-blue-400 transition-[width]"
                      style={{ width: `${(eligible.length / total) * 100}%` }}
                    />
                  </div>
                </>
              )}
              <p className="flex items-center gap-[9px] text-[10px] leading-[1.4] text-slate-500">
                <Info className="size-3.5 shrink-0 text-blue-500" />
                Choose "None" only if you prefer a fully equipment-free flow.
              </p>
            </div>
          </div>
        </aside>
      }
      actions={
        <ActionBar
          onBack={onBack}
          onNext={onNext}
          status={
            <>
              <img src={ribbonAction} alt="" width={16} height={11} />
              <span className="text-xs text-slate-500">{label} selected</span>
            </>
          }
          nextIcon={<ArrowRight className="size-4" />}
          nextClassName="btn-primary border border-blue-300 bg-linear-to-r from-brand to-blue-500 shadow-[-8px_-8px_18px_0_white,8px_8px_18px_0_rgb(59_130_246/0.19)]"
        />
      }
    >
      <img src={ribbonTopLeft} alt="" width={120} height={120} className="pointer-events-none absolute -top-[76px] left-0 hidden lg:block" />
      <img src={ribbonBowRight} alt="" width={60} height={40} className="pointer-events-none absolute top-0.5 right-24 hidden opacity-45 lg:block" />
      <img src={ribbonWaves} alt="" width={80} height={28} className="pointer-events-none absolute top-11 left-[600px] hidden opacity-40 lg:block" />

      <div className="grid gap-4 sm:grid-cols-2">
        {(Object.keys(EQUIPMENT_OPTIONS) as Equipment[]).map((id) => {
          const { label, desc, icon: Icon } = EQUIPMENT_OPTIONS[id];
          const isSelected = equipment.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              aria-pressed={isSelected}
              className={`relative flex h-[170px] flex-col justify-between rounded-panel border p-5 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                isSelected
                  ? 'border-blue-300 bg-linear-to-r from-[#f8fbff] to-blue-50 shadow-[-8px_-8px_18px_0_white,8px_8px_18px_0_rgb(59_130_246/0.09)]'
                  : 'border-slate-200 bg-slate-50 shadow-[-6px_-6px_14px_0_white,6px_6px_14px_0_rgb(15_23_42/0.03)] hover:border-blue-300'
              }`}
            >
              {isSelected && <img src={ribbonCard} alt="" width={44} height={30} className="absolute -top-px -left-px" />}
              <div className="flex w-full items-center justify-between">
                <span
                  className={`flex size-[38px] items-center justify-center rounded-[14px] border ${
                    isSelected ? 'border-blue-300 bg-linear-to-r from-blue-100 to-blue-200 text-blue-700' : 'border-slate-200 bg-slate-100 text-slate-400'
                  }`}
                >
                  <Icon className="size-[19px]" />
                </span>
                {isSelected && (
                  <span className="flex size-6 items-center justify-center rounded-full border border-blue-300 bg-linear-to-r from-blue-100 to-blue-200 text-blue-700">
                    <Check className="size-3.5" />
                  </span>
                )}
              </div>
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[17px] font-bold">{label}</span>
                  {total > 0 && (
                    <span className={`text-[11px] font-medium ${isSelected ? 'text-slate-500' : 'text-slate-400'}`}>{counts[id]} exercises</span>
                  )}
                </div>
                <span className={`text-[13px] leading-[1.45] ${isSelected ? 'text-slate-500' : 'text-slate-400'}`}>{desc}</span>
              </div>
            </button>
          );
        })}
      </div>
    </StepLayout>
  );
}
