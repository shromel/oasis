import React from 'react';

export interface StatTileProps {
  /** Leading icon node (Lucide), usually tinted via `accent`. */
  icon?: React.ReactNode;
  /** The metric — a big Fraunces numeral. */
  value: React.ReactNode;
  /** Small lowercase caption beneath. */
  label: string;
  /** Icon colour, e.g. var(--dusk-rose) for streak. */
  accent?: string;
  style?: React.CSSProperties;
}

/** One metric in the dashboard's 3-up stat row (streak / this week / momentum). */
export function StatTile(props: StatTileProps): JSX.Element;
