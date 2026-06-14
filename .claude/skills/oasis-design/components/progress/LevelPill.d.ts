export interface LevelPillProps {
  /** Numeric level, rendered as "L{level}". */
  level: number;
  /** Level name, e.g. "Foundation" (optional — pass "" to show just "L1"). */
  name: string;
  /** Selected/viewing state — gold wash. */
  active?: boolean;
  /** Marks the user's actual current level with a palm-green dot. */
  current?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/** A pill in the Train level selector (horizontal scroller). */
export function LevelPill(props: LevelPillProps): JSX.Element;
