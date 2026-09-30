import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Equipment, Duration } from '../../types/wizard';

interface Props {
  equipment: Equipment[];
  duration: Duration;
  onChangeEquipment: (equipment: Equipment[]) => void;
  onChangeDuration: (duration: Duration) => void;
  onNext: () => void;
  onBack: () => void;
}

const equipmentOptions: Equipment[] = ['Mat', 'Bands', 'Ball', 'None'];
const durationOptions: Duration[] = [15, 30, 45, 60];

export function EquipmentDurationStep({
  equipment,
  duration,
  onChangeEquipment,
  onChangeDuration,
  onNext,
  onBack,
}: Props) {
  
  const toggleEquipment = (item: Equipment) => {
    if (item === 'None') {
      onChangeEquipment(['None']);
      return;
    }
    
    let newEquipment: Equipment[] = equipment.filter(e => e !== 'None');
    if (newEquipment.includes(item)) {
      newEquipment = newEquipment.filter(e => e !== item);
    } else {
      newEquipment = [...newEquipment, item];
    }
    
    if (newEquipment.length === 0) {
      newEquipment = ['None'];
    }
    
    onChangeEquipment(newEquipment);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
      <p className="eyebrow mb-3">Step 2 · Equipment & duration</p>
      <h2 className="mb-8 text-[42px] leading-[1.08]">Fine-tune your session</h2>

      <section className="mb-10">
        <h3 className="mb-4 text-[25px]">Available equipment</h3>
        <div className="flex flex-wrap gap-2.5">
          {equipmentOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => toggleEquipment(opt)}
              aria-pressed={equipment.includes(opt)}
              className="chip"
            >
              {opt}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="mb-4 text-[25px]">Duration</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {durationOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => onChangeDuration(opt)}
              aria-pressed={duration === opt}
              className="card-option rounded-[18px] p-4"
            >
              <span className="block font-display text-[25px] font-bold">{opt}</span>
              <span className="text-[11px] font-semibold text-muted">minutes</span>
            </button>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-secondary">
          <ArrowLeft className="size-4" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!duration || equipment.length === 0}
          className="btn-primary"
        >
          Review
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
