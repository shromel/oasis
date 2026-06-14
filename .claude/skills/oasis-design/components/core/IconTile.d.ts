import React from 'react';

export interface IconTileProps {
  /** Surface tint. `gold` for emphasis/active, `success` for done states. */
  tone?: 'sunken' | 'gold' | 'success';
  /** Square side in px. */
  size?: number;
  /** Add the warm gold halo (active nav, empty-state medallions). */
  glow?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Rounded medallion holding an icon — nav, list rows, empty states. */
export function IconTile(props: IconTileProps): JSX.Element;
