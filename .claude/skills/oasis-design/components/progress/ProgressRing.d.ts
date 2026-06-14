import React from 'react';

/**
 * @startingPoint section="Progress" subtitle="Gold→green progress ring" viewport="700x200"
 */
export interface ProgressRingProps {
  /** Fill percentage, 0–100. */
  value: number;
  /** Outer diameter in px. */
  size?: number;
  /** Stroke width in px. */
  stroke?: number;
  /** Centre label, e.g. "68%". */
  label?: React.ReactNode;
  /** Small uppercase caption under the label, e.g. "exit". */
  sublabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * The gold→green achievement ring used for level-exit progress.
 */
export function ProgressRing(props: ProgressRingProps): JSX.Element;
