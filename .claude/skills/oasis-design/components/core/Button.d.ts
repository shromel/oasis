import React from 'react';

/**
 * @startingPoint section="Core" subtitle="Gold / ghost / text action button" viewport="700x320"
 */
export interface ButtonProps {
  /** Visual style. `gold` = signature foil CTA, `ghost` = quiet secondary, `text` = bare gold link. */
  variant?: 'gold' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  /** Leading element, typically a Lucide icon node. */
  icon?: React.ReactNode;
  /** Trailing element, typically a chevron. */
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * The primary action primitive for Oasis. Gold foil for the main CTA,
 * ghost for secondary, text for inline link actions.
 */
export function Button(props: ButtonProps): JSX.Element;
