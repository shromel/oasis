export interface StepperProps {
  /** 1-based set number shown as "Set n". */
  index: number;
  /** Current reps (or seconds). */
  value: number;
  /** Unit — "s"/"sec" steps by 5 and captions "sec"; otherwise "reps". */
  unit?: string;
  /** Called with the new value (already clamped ≥ 0). */
  onChange?: (v: number) => void;
  style?: React.CSSProperties;
}

/** The per-set rep/second stepper from the Session Logger. */
export function Stepper(props: StepperProps): JSX.Element;
