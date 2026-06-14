import React from 'react';

export interface ChipProps {
  /** Colour tint. Ignored when `active` is set (which forces gold). */
  tone?: 'neutral' | 'gold' | 'success' | 'info' | 'danger';
  /** Selected gold-wash state (e.g. the chosen level pill). */
  active?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Small pill for metadata, tags and inline status — e.g. "L1 · Outdoor",
 * "Done today", a rep scheme, or an editing badge.
 */
export function Chip(props: ChipProps): JSX.Element;
