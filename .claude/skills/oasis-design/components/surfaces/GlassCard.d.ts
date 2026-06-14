import React from 'react';

/**
 * @startingPoint section="Surfaces" subtitle="Frosted glass card over the landscape" viewport="700x200"
 */
export interface GlassCardProps {
  /** Use the lighter nested grade (.glass-soft, radius 24, blur-md). */
  soft?: boolean;
  /** Add the press-shrink for tappable cards. */
  interactive?: boolean;
  /** Element tag to render. */
  as?: keyof JSX.IntrinsicElements;
  /** CSS padding value. */
  padding?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * The frosted glass panel — the primary surface of every Oasis screen.
 */
export function GlassCard(props: GlassCardProps): JSX.Element;
