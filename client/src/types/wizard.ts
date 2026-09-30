export type Focus = 'Core' | 'Full Body' | 'Stretch' | '';
export type Equipment = 'Mat' | 'Bands' | 'Ball' | 'None';
export type Duration = 15 | 30 | 45 | 60 | 0;

export interface WizardState {
  focus: Focus;
  equipment: Equipment[];
  duration: Duration;
}
