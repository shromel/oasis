export interface CriterionBarProps {
  /** Metric name, e.g. "Max strict pullups". */
  label: string;
  /** Current best. */
  current: number;
  /** Target to reach. */
  goal: number;
  /** Unit suffix, e.g. "s" for seconds; "" for reps. */
  unit?: string;
  style?: React.CSSProperties;
}

/** A "current / goal" progress bar; fill flips gold→palm-green when the goal is met. */
export function CriterionBar(props: CriterionBarProps): JSX.Element;
