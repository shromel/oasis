/* @ds-bundle: {"format":3,"namespace":"OasisDesignSystem_2f48a5","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"IconTile","sourcePath":"components/core/IconTile.jsx"},{"name":"CriterionBar","sourcePath":"components/progress/CriterionBar.jsx"},{"name":"LevelPill","sourcePath":"components/progress/LevelPill.jsx"},{"name":"ProgressRing","sourcePath":"components/progress/ProgressRing.jsx"},{"name":"Stepper","sourcePath":"components/progress/Stepper.jsx"},{"name":"GlassCard","sourcePath":"components/surfaces/GlassCard.jsx"},{"name":"StatTile","sourcePath":"components/surfaces/StatTile.jsx"}],"sourceHashes":{"components/core/Button.jsx":"47c9629fa4d4","components/core/Chip.jsx":"1e727776422b","components/core/IconTile.jsx":"b89aa68deb73","components/progress/CriterionBar.jsx":"807069283c3b","components/progress/LevelPill.jsx":"9fd613365de9","components/progress/ProgressRing.jsx":"27e774f4f16c","components/progress/Stepper.jsx":"a9e073548210","components/surfaces/GlassCard.jsx":"0dc2e42ead94","components/surfaces/StatTile.jsx":"e20901d1e4e9","ui_kits/oasis-app/ScreensA.jsx":"5946ab499dab","ui_kits/oasis-app/ScreensB.jsx":"e3d98e90c463","ui_kits/oasis-app/Trajectory.jsx":"99d28ae3fb33","ui_kits/oasis-app/data.js":"1b48aa05a93c","ui_kits/oasis-app/kit.jsx":"d2657c212a0b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.OasisDesignSystem_2f48a5 = window.OasisDesignSystem_2f48a5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Oasis Button — the primary action primitive.
 * `gold` is the signature foil CTA; `ghost` is the quiet secondary;
 * `text` is a bare gold link-button. Presses shrink (scale 0.97).
 */
function Button({
  variant = 'gold',
  size = 'md',
  icon = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  children,
  style,
  ...rest
}) {
  const pad = {
    sm: '0.5rem 0.875rem',
    md: '0.75rem 1.25rem',
    lg: '0.875rem 1.5rem'
  }[size];
  const fontSize = {
    sm: 'var(--text-sm)',
    md: 'var(--text-base)',
    lg: 'var(--text-lg)'
  }[size];
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-semibold)',
    fontSize,
    lineHeight: 1,
    padding: pad,
    borderRadius: 'var(--radius-xl)',
    width: fullWidth ? '100%' : 'auto',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'transform var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out)',
    WebkitTapHighlightColor: 'transparent'
  };
  const variants = {
    gold: {
      color: 'var(--text-on-gold)',
      border: 'none',
      background: 'var(--grad-gold)',
      boxShadow: 'var(--shadow-gold)'
    },
    ghost: {
      color: 'rgba(236, 220, 192, 0.9)',
      border: '1px solid var(--border-strong)',
      background: 'var(--surface-sunken)'
    },
    text: {
      color: 'var(--text-gold)',
      border: 'none',
      background: 'transparent',
      padding: '0.25rem 0.25rem',
      boxShadow: 'none'
    }
  };
  const onDown = e => {
    if (!disabled) e.currentTarget.style.transform = 'scale(var(--press-scale))';
  };
  const onUp = e => {
    e.currentTarget.style.transform = 'scale(1)';
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onPointerDown: onDown,
    onPointerUp: onUp,
    onPointerLeave: onUp,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), icon, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Chip — the small pill for metadata, tags, and status.
 * `tone` tints it: neutral (default), gold (active/selected), or
 * a status colour. Set `active` for the selected gold-wash state.
 */
function Chip({
  tone = 'neutral',
  active = false,
  icon = null,
  children,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      color: 'rgba(236,220,192,0.8)',
      border: 'var(--border-hairline)',
      background: 'var(--surface-raised)'
    },
    gold: {
      color: 'var(--text-gold)',
      border: 'var(--border-gold)',
      background: 'rgba(231,178,76,0.15)'
    },
    success: {
      color: 'var(--status-success)',
      border: 'rgba(90,164,105,0.4)',
      background: 'rgba(90,164,105,0.12)'
    },
    info: {
      color: 'var(--status-info)',
      border: 'rgba(76,196,212,0.4)',
      background: 'rgba(76,196,212,0.12)'
    },
    danger: {
      color: 'var(--status-danger)',
      border: 'rgba(217,138,106,0.4)',
      background: 'rgba(217,138,106,0.12)'
    }
  };
  const t = active ? tones.gold : tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.375rem',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 1,
      padding: '0.3rem 0.625rem',
      borderRadius: 'var(--radius-pill)',
      color: t.color,
      background: t.background,
      border: `1px solid ${t.border}`,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconTile — the rounded medallion that holds an icon throughout Oasis
 * (nav active state, empty-state badges, list-row leading icons).
 * `tone="gold"` adds the gold wash + glow used for emphasis.
 */
function IconTile({
  tone = 'sunken',
  size = 44,
  glow = false,
  children,
  style,
  ...rest
}) {
  const tones = {
    sunken: {
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-hairline)',
      color: 'var(--text-secondary)'
    },
    gold: {
      background: 'rgba(231,178,76,0.15)',
      border: '1px solid var(--border-gold)',
      color: 'var(--text-gold)'
    },
    success: {
      background: 'rgba(90,164,105,0.18)',
      border: '1px solid rgba(90,164,105,0.5)',
      color: 'var(--status-success)'
    }
  };
  const t = tones[tone] || tones.sunken;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: size,
      height: size,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-lg)',
      boxShadow: glow ? 'var(--shadow-glow)' : 'none',
      ...t,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconTile.jsx", error: String((e && e.message) || e) }); }

// components/progress/CriterionBar.jsx
try { (() => {
/**
 * CriterionBar — a labelled "current / goal" progress bar. The fill is
 * gold gradient until the goal is met, then flips to solid palm-green.
 */
function CriterionBar({
  label,
  current,
  goal,
  unit = '',
  style
}) {
  const pct = Math.min(100, Math.round(current / goal * 100));
  const done = current >= goal;
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.6875rem',
      marginBottom: '0.25rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(236,220,192,0.8)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: done ? 'var(--oasis-palm)' : 'var(--text-secondary)',
      fontWeight: done ? 'var(--weight-semibold)' : 'var(--weight-regular)'
    }
  }, current, unit, " / ", goal, unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '0.375rem',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-sunken)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${pct}%`,
      borderRadius: 'var(--radius-pill)',
      background: done ? 'var(--oasis-palm)' : 'linear-gradient(90deg,#f6d488,#e7b24c)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { CriterionBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/CriterionBar.jsx", error: String((e && e.message) || e) }); }

// components/progress/LevelPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * LevelPill — a tappable pill in the Train level selector.
 * Active = gold wash + gold border + gold text; the *current* level
 * carries a small palm-green dot.
 */
function LevelPill({
  level,
  name,
  active = false,
  current = false,
  onClick,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    style: {
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.375rem',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      padding: '0.5rem 1rem',
      borderRadius: 'var(--radius-xl)',
      cursor: 'pointer',
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
      color: active ? 'var(--text-gold)' : 'var(--text-secondary)',
      background: active ? 'rgba(231,178,76,0.15)' : 'var(--surface-card-soft)',
      border: `1px solid ${active ? 'var(--border-gold)' : 'var(--border-hairline)'}`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-semibold)'
    }
  }, "L", level), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.8
    }
  }, name), current && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--oasis-palm)',
      fontSize: '0.5rem',
      alignSelf: 'flex-start'
    }
  }, "\u25CF"));
}
Object.assign(__ds_scope, { LevelPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/LevelPill.jsx", error: String((e && e.message) || e) }); }

// components/progress/ProgressRing.jsx
try { (() => {
let _ringSeq = 0;

/**
 * ProgressRing — the gold→green achievement ring. An SVG donut with a
 * round cap that fills over 0.7s; centred label + uppercase sublabel.
 */
function ProgressRing({
  value,
  size = 120,
  stroke = 10,
  label,
  sublabel,
  className = '',
  style
}) {
  const id = React.useMemo(() => `oasisRing${_ringSeq++}`, []);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const offset = c - pct / 100 * c;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#f6d488"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "60%",
    stopColor: "#e7b24c"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#5aa469"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "rgba(116,80,43,0.35)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: `url(#${id})`,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: offset,
    style: {
      transition: 'stroke-dashoffset var(--dur-slow) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }
  }, label != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      color: 'var(--text-primary)',
      lineHeight: 1
    }
  }, label), sublabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow)',
      color: 'var(--text-secondary)',
      marginTop: '0.25rem'
    }
  }, sublabel)));
}
Object.assign(__ds_scope, { ProgressRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// components/progress/Stepper.jsx
try { (() => {
/**
 * Stepper — the per-set rep/second counter from the Session Logger.
 * A small sunken tile: "SET n" label, −/value/+ row, unit caption.
 * Minus is muted, plus is gold. Step is 1 for reps, 5 for seconds.
 */
function Stepper({
  index,
  value,
  unit = '',
  onChange,
  style
}) {
  const isSec = unit === 's' || unit === 'sec';
  const step = isSec ? 5 : 1;
  const set = v => onChange && onChange(Math.max(0, v));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 58,
      padding: '0.25rem',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-hairline)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.5625rem',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--text-faint)'
    }
  }, "Set ", index), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => set(value - step),
    "aria-label": "decrease",
    style: btn('rgba(201,163,110,0.6)')
  }, "\u2212"), /*#__PURE__*/React.createElement("input", {
    inputMode: "numeric",
    value: value,
    onChange: e => set(Number(String(e.target.value).replace(/\D/g, '')) || 0),
    style: {
      width: 28,
      background: 'transparent',
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      color: 'var(--text-primary)',
      border: 'none',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => set(value + step),
    "aria-label": "increase",
    style: btn('var(--text-gold)')
  }, "+")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.5rem',
      color: 'var(--text-faint)',
      marginTop: '-0.125rem'
    }
  }, isSec ? 'sec' : 'reps'));
}
function btn(color) {
  return {
    width: 20,
    background: 'transparent',
    border: 'none',
    color,
    fontSize: 'var(--text-lg)',
    lineHeight: 1,
    cursor: 'pointer'
  };
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlassCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * GlassCard — the frosted panel that is the core surface of Oasis.
 * `soft` switches to the lighter nested grade (.glass-soft).
 * `interactive` adds the press-shrink used on tappable cards.
 */
function GlassCard({
  soft = false,
  interactive = false,
  as = 'section',
  padding = 'var(--space-4)',
  children,
  style,
  ...rest
}) {
  const Tag = as;
  const base = soft ? {
    background: 'var(--surface-card-soft)',
    backdropFilter: 'blur(var(--blur-soft))',
    WebkitBackdropFilter: 'blur(var(--blur-soft))',
    border: '1px solid var(--border-soft)',
    borderRadius: 'var(--radius-2xl)'
  } : {
    background: 'var(--surface-card)',
    backdropFilter: 'blur(var(--blur-card))',
    WebkitBackdropFilter: 'blur(var(--blur-card))',
    border: '1px solid var(--border-hairline)',
    borderRadius: 'var(--radius-3xl)',
    boxShadow: 'var(--shadow-card)'
  };
  const onDown = e => {
    if (interactive) e.currentTarget.style.transform = 'scale(0.99)';
  };
  const onUp = e => {
    if (interactive) e.currentTarget.style.transform = 'scale(1)';
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onPointerDown: onDown,
    onPointerUp: onUp,
    onPointerLeave: onUp,
    style: {
      padding,
      transition: 'transform var(--dur-fast) var(--ease-out)',
      ...base,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlassCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/StatTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatTile — a single metric in the dashboard's 3-up stat row:
 * an icon + big Fraunces value over a small lowercase label.
 */
function StatTile({
  icon = null,
  value,
  label,
  accent,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.125rem',
      padding: '0.625rem 0',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.375rem',
      color: accent || 'var(--text-primary)'
    }
  }, icon, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      lineHeight: 1,
      color: 'var(--text-primary)'
    }
  }, value)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-muted)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/StatTile.jsx", error: String((e && e.message) || e) }); }

// ui_kits/oasis-app/ScreensA.jsx
try { (() => {
// Oasis screens — Home · Train · Progress · You · Nourish.
// Composes the design-system primitives (window.OasisDesignSystem_2f48a5)
// + kit chrome (Icon) + Trajectory chart. Cosmetic recreation.

const DS = window.OasisDesignSystem_2f48a5;
const {
  GlassCard,
  StatTile,
  ProgressRing,
  CriterionBar,
  LevelPill,
  Stepper,
  Button,
  Chip,
  IconTile
} = DS;
function Scroll({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: '4px 16px 104px'
    }
  }, children);
}
function PageHead({
  eyebrow,
  title,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      margin: '10px 2px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    className: "heading",
    style: {
      fontSize: '1.875rem',
      margin: '2px 0 0',
      lineHeight: 1.05
    }
  }, title)), right);
}
const divider = {
  borderRight: '1px solid var(--border-soft)'
};

/* ───────────────────────── HOME ───────────────────────── */
function HomeScreen({
  onStart
}) {
  const D = window.OASIS_DATA;
  return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Good morning, Sam",
    title: "Your oasis",
    right: /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 999,
        overflow: 'hidden',
        border: '1px solid var(--border-gold)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/app-icon.png",
      alt: "",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }))
  }), /*#__PURE__*/React.createElement(GlassCard, {
    style: {
      padding: 0,
      overflow: 'hidden',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: '16px 18px 0'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Trajectory \xB7 L2"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '2.4rem',
      lineHeight: 1,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gold-text"
  }, "70%")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, "toward L2")), /*#__PURE__*/React.createElement(Chip, {
    tone: "info",
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "trending-up",
      size: 12
    })
  }, "+12% this month")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 132,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Trajectory, {
    data: D.TRAJECTORY
  }))), /*#__PURE__*/React.createElement(GlassCard, {
    style: {
      padding: 0,
      overflow: 'hidden',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: divider
  }, /*#__PURE__*/React.createElement(StatTile, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "flame",
      size: 15
    }),
    accent: "var(--dusk-rose)",
    value: "7",
    label: "day streak"
  })), /*#__PURE__*/React.createElement("div", {
    style: divider
  }, /*#__PURE__*/React.createElement(StatTile, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "calendar-check",
      size: 15
    }),
    accent: "var(--oasis-palm)",
    value: "3",
    label: "this week"
  })), /*#__PURE__*/React.createElement(StatTile, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "dumbbell",
      size: 15
    }),
    accent: "var(--gold)",
    value: "64",
    label: "sessions"
  }))), /*#__PURE__*/React.createElement(GlassCard, {
    style: {
      marginBottom: 12,
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 12
    }
  }, "Path to L2"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(ProgressRing, {
    value: 70,
    label: "70%",
    sublabel: "exit",
    size: 92
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement(CriterionBar, {
    label: "Pullups",
    current: 6,
    goal: 8
  }), /*#__PURE__*/React.createElement(CriterionBar, {
    label: "Dips",
    current: 7,
    goal: 10
  }), /*#__PURE__*/React.createElement(CriterionBar, {
    label: "Pushups",
    current: 30,
    goal: 35
  }), /*#__PURE__*/React.createElement(CriterionBar, {
    label: "Plank",
    current: 72,
    goal: 90,
    unit: "s"
  })))), /*#__PURE__*/React.createElement(GlassCard, {
    style: {
      padding: '16px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.15rem',
      color: 'var(--text-primary)'
    }
  }, "Today \xB7 Outdoor"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, "6 exercises \xB7 ~28 min")), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "play",
      size: 16
    }),
    onClick: onStart
  }, "Start")));
}

/* ───────────────────────── TRAIN ───────────────────────── */
function TrainScreen({
  onStart
}) {
  const D = window.OASIS_DATA;
  const [levelId, setLevelId] = React.useState(1);
  const [warmOpen, setWarmOpen] = React.useState(false);
  const level = D.getLevel(levelId);
  return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Your program",
    title: "Train"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      paddingBottom: 6,
      margin: '0 -16px 14px',
      paddingLeft: 16,
      paddingRight: 16
    }
  }, D.LEVELS.map(l => /*#__PURE__*/React.createElement(LevelPill, {
    key: l.id,
    level: l.id,
    name: "",
    active: l.id === levelId,
    current: l.id === 1,
    onClick: () => setLevelId(l.id)
  }))), /*#__PURE__*/React.createElement(GlassCard, {
    soft: true,
    style: {
      marginBottom: 12,
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.9rem',
      color: 'var(--text-body)',
      lineHeight: 1.5
    }
  }, level.tagline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "flag",
    size: 13,
    color: "var(--text-gold)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-secondary)'
    }
  }, "Exit \xB7 ", level.exitText))), /*#__PURE__*/React.createElement(GlassCard, {
    style: {
      marginBottom: 12,
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setWarmOpen(o => !o),
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      background: 'none',
      border: 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\uD83C\uDF00"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.05rem',
      color: 'var(--text-primary)'
    }
  }, "Warm-up"), /*#__PURE__*/React.createElement(Chip, null, "5 min")), /*#__PURE__*/React.createElement(Icon, {
    n: warmOpen ? 'chevron-up' : 'chevron-down',
    size: 18,
    color: "var(--text-muted)"
  })), warmOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, D.WARMUPS.map(w => /*#__PURE__*/React.createElement("div", {
    key: w.id,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      fontSize: '0.6rem'
    }
  }, w.label), w.exercises.map(ex => /*#__PURE__*/React.createElement("div", {
    key: ex.id,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.82rem',
      padding: '8px 12px',
      borderRadius: 12,
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-body)'
    }
  }, ex.name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, ex.scheme))))))), level.blocks.map(b => /*#__PURE__*/React.createElement(GlassCard, {
    key: b.id,
    style: {
      marginBottom: 12,
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, b.emoji), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.15rem',
      color: 'var(--text-primary)'
    }
  }, b.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.7rem',
      color: 'var(--text-muted)'
    }
  }, b.subtitle))), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "play",
      size: 13
    }),
    onClick: onStart
  }, "Start")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, b.exercises.map(ex => /*#__PURE__*/React.createElement("div", {
    key: ex.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 12px',
      borderRadius: 12,
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-soft)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-body)',
      fontSize: '0.86rem'
    }
  }, ex.name), /*#__PURE__*/React.createElement(Chip, null, ex.scheme)))))));
}
Object.assign(window, {
  HomeScreen,
  TrainScreen,
  Scroll,
  PageHead
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/oasis-app/ScreensA.jsx", error: String((e && e.message) || e) }); }

// ui_kits/oasis-app/ScreensB.jsx
try { (() => {
// Oasis screens — Progress · You · Nourish + the Session Logger overlay.

const DS_B = window.OasisDesignSystem_2f48a5;
const {
  GlassCard: GC,
  ProgressRing: PR,
  CriterionBar: CB,
  Button: Btn,
  Chip: Cp,
  IconTile: IT
} = DS_B;

/* ───────────────────────── PROGRESS ───────────────────────── */
function ProgressScreen() {
  const D = window.OASIS_DATA;
  const series = [{
    key: 'pullups',
    color: 'var(--gold)',
    label: 'Pullups'
  }, {
    key: 'dips',
    color: 'var(--oasis-palm)',
    label: 'Dips'
  }, {
    key: 'pushups',
    color: 'var(--oasis-water)',
    label: 'Pushups'
  }];
  return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Level 1",
    title: "Progress"
  }), /*#__PURE__*/React.createElement(GC, {
    style: {
      marginBottom: 12,
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Strength curve"), /*#__PURE__*/React.createElement(Cp, {
    tone: "info"
  }, "retest")), /*#__PURE__*/React.createElement(StrengthCurve, {
    data: D.CURVE,
    series: series
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      marginTop: 8,
      justifyContent: 'center'
    }
  }, series.map(s => /*#__PURE__*/React.createElement("span", {
    key: s.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: '0.7rem',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: s.color
    }
  }), s.label)))), /*#__PURE__*/React.createElement(GC, {
    style: {
      marginBottom: 12,
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 12
    }
  }, "Current bests vs L2"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(CB, {
    label: "Max strict pullups",
    current: D.BESTS.pullups,
    goal: 8
  }), /*#__PURE__*/React.createElement(CB, {
    label: "Max dips",
    current: D.BESTS.dips,
    goal: 10
  }), /*#__PURE__*/React.createElement(CB, {
    label: "Max pushups",
    current: D.BESTS.pushups,
    goal: 35
  }), /*#__PURE__*/React.createElement(CB, {
    label: "Plank hold",
    current: D.BESTS.plank,
    goal: 90,
    unit: "s"
  }), /*#__PURE__*/React.createElement(CB, {
    label: "Max leg raises",
    current: D.BESTS.legraise,
    goal: 15
  }))), /*#__PURE__*/React.createElement(GC, {
    style: {
      marginBottom: 12,
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "4-week retest due"), /*#__PURE__*/React.createElement(Cp, {
    tone: "gold",
    active: true,
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "timer",
      size: 12
    })
  }, "in 6 days")), /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    fullWidth: true,
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "clipboard-check",
      size: 15
    })
  }, "Log a retest")), /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      margin: '18px 2px 10px'
    }
  }, "Session history"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, D.HISTORY.map(h => /*#__PURE__*/React.createElement(GC, {
    key: h.id,
    soft: true,
    interactive: true,
    style: {
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, h.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.86rem',
      color: 'var(--text-body)'
    }
  }, h.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      color: 'var(--text-muted)'
    }
  }, h.date, " \xB7 ", h.sets, " sets \xB7 ", h.total, " reps")), /*#__PURE__*/React.createElement(Icon, {
    n: "chevron-right",
    size: 16,
    color: "var(--text-faint)"
  })))));
}

/* ───────────────────────── NOURISH (scaffold) ───────────────────────── */
function NourishScreen() {
  return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Fuel the bloom",
    title: "Nourish",
    right: /*#__PURE__*/React.createElement(Cp, {
      tone: "gold",
      active: true
    }, "soon")
  }), /*#__PURE__*/React.createElement(GC, {
    style: {
      marginBottom: 12,
      padding: '18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(PR, {
    value: 72,
    label: "72",
    sublabel: "score",
    size: 92
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(CB, {
    label: "Protein",
    current: 132,
    goal: 170,
    unit: "g"
  }), /*#__PURE__*/React.createElement(CB, {
    label: "Carbs",
    current: 180,
    goal: 220,
    unit: "g"
  }), /*#__PURE__*/React.createElement(CB, {
    label: "Fat",
    current: 54,
    goal: 60,
    unit: "g"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 16,
      paddingTop: 14,
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)'
    }
  }, "Calories"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.1rem',
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gold-text"
  }, "2,040"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)'
    }
  }, "/ 2,400")))), /*#__PURE__*/React.createElement(Btn, {
    variant: "gold",
    fullWidth: true,
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "scan-barcode",
      size: 16
    })
  }, "Scan a food"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontSize: '0.72rem',
      color: 'var(--text-faint)',
      marginTop: 16
    }
  }, "Diary, micros & calorie balance \u2014 coming in v0.2."));
}

/* ───────────────────────── YOU ───────────────────────── */
function YouScreen() {
  const rows = [{
    icon: 'user',
    label: 'Profile',
    value: 'Sam · 28 · ♂'
  }, {
    icon: 'ruler',
    label: 'Height · Weight',
    value: '180 cm · 78 kg'
  }, {
    icon: 'target',
    label: 'Goal',
    value: 'Maintain'
  }, {
    icon: 'layers',
    label: 'Level',
    value: 'L1 · Foundation'
  }];
  const actions = [{
    icon: 'download',
    label: 'Export data',
    tone: 'neutral'
  }, {
    icon: 'upload',
    label: 'Import backup',
    tone: 'neutral'
  }, {
    icon: 'rotate-ccw',
    label: 'Reset progress',
    tone: 'danger'
  }];
  return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Your account",
    title: "You"
  }), /*#__PURE__*/React.createElement(GC, {
    style: {
      marginBottom: 12,
      padding: '18px',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 999,
      overflow: 'hidden',
      border: '1px solid var(--border-gold)',
      boxShadow: 'var(--shadow-glow)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/app-icon.png",
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.4rem',
      color: 'var(--text-primary)'
    }
  }, "Sam Rivera"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Climbing since Mar 2026 \xB7 64 sessions"))), /*#__PURE__*/React.createElement(GC, {
    style: {
      marginBottom: 12,
      padding: '6px 6px'
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 12px',
      borderBottom: i < rows.length - 1 ? '1px solid var(--border-soft)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(IT, {
    size: 36,
    tone: "sunken"
  }, /*#__PURE__*/React.createElement(Icon, {
    n: r.icon,
    size: 16,
    color: "var(--text-secondary)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: '0.86rem',
      color: 'var(--text-body)'
    }
  }, r.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--text-muted)'
    }
  }, r.value), /*#__PURE__*/React.createElement(Icon, {
    n: "chevron-right",
    size: 15,
    color: "var(--text-faint)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, actions.map(a => /*#__PURE__*/React.createElement(GC, {
    key: a.label,
    soft: true,
    interactive: true,
    style: {
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: a.icon,
    size: 17,
    color: a.tone === 'danger' ? 'var(--status-danger)' : 'var(--text-secondary)'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: '0.86rem',
      color: a.tone === 'danger' ? 'var(--status-danger)' : 'var(--text-body)'
    }
  }, a.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontSize: '0.7rem',
      color: 'var(--text-faint)',
      marginTop: 18
    }
  }, "Oasis v0.1 \xB7 made for the long climb \xB7 everything lives on this device"));
}

/* ───────────────────────── SESSION LOGGER (overlay) ───────────────────────── */
function SessionLogger({
  onClose
}) {
  const D = window.OASIS_DATA;
  const {
    Stepper: Stp
  } = DS_B;
  const block = D.getLevel(1).blocks[0];
  const [done, setDone] = React.useState({});
  const [reps, setReps] = React.useState(() => {
    const m = {};
    block.exercises.forEach(ex => {
      m[ex.id] = [ex.repsHigh, ex.repsHigh - 1, ex.repsHigh - 2];
    });
    return m;
  });
  const [saved, setSaved] = React.useState(false);
  const total = Object.values(reps).flat().reduce((a, b) => a + b, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 80,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-base)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--grad-atmosphere)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 52
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '4px 18px 10px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      background: 'none',
      border: 'none',
      color: 'var(--text-secondary)',
      cursor: 'pointer',
      fontSize: '0.86rem'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "chevron-left",
    size: 18
  }), " Train"), /*#__PURE__*/React.createElement(Cp, null, block.emoji, " ", block.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 16px 120px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      margin: '2px 2px 4px'
    }
  }, "Logging \xB7 L1"), /*#__PURE__*/React.createElement("h1", {
    className: "heading",
    style: {
      fontSize: '1.7rem',
      margin: '0 0 16px'
    }
  }, block.label, " session"), block.exercises.map(ex => /*#__PURE__*/React.createElement(GC, {
    key: ex.id,
    style: {
      marginBottom: 12,
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.05rem',
      color: 'var(--text-primary)'
    }
  }, ex.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.7rem',
      color: 'var(--text-muted)'
    }
  }, ex.scheme, ex.notes ? ` · ${ex.notes}` : '')), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDone(d => ({
      ...d,
      [ex.id]: !d[ex.id]
    })),
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 34,
      height: 34,
      borderRadius: 999,
      cursor: 'pointer',
      border: `1px solid ${done[ex.id] ? 'rgba(90,164,105,0.6)' : 'var(--border-hairline)'}`,
      background: done[ex.id] ? 'rgba(90,164,105,0.2)' : 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "check",
    size: 16,
    color: done[ex.id] ? 'var(--oasis-palm)' : 'var(--text-faint)',
    stroke: done[ex.id] ? 2.6 : 2
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, reps[ex.id].map((v, i) => /*#__PURE__*/React.createElement(Stp, {
    key: i,
    index: i + 1,
    value: v,
    unit: ex.unit === 'sec' ? 's' : '',
    onChange: nv => setReps(r => ({
      ...r,
      [ex.id]: r[ex.id].map((x, j) => j === i ? nv : x)
    }))
  }))))), /*#__PURE__*/React.createElement(GC, {
    soft: true,
    style: {
      padding: '12px 14px',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "input",
    placeholder: "Session notes \u2014 how did it feel?",
    style: {
      background: 'transparent',
      border: 'none',
      padding: 0
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '12px 16px 22px',
      background: 'linear-gradient(180deg, transparent, rgba(10,19,15,0.92) 40%)'
    }
  }, saved ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '14px',
      borderRadius: 20,
      background: 'rgba(90,164,105,0.18)',
      border: '1px solid rgba(90,164,105,0.5)',
      color: 'var(--oasis-palm)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "check",
    size: 18
  }), " Session saved \xB7 ", total, " reps logged") : /*#__PURE__*/React.createElement(Btn, {
    variant: "gold",
    fullWidth: true,
    size: "lg",
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "check",
      size: 17
    }),
    onClick: () => setSaved(true)
  }, "Save session \xB7 ", total, " reps"))));
}
Object.assign(window, {
  ProgressScreen,
  NourishScreen,
  YouScreen,
  SessionLogger
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/oasis-app/ScreensB.jsx", error: String((e && e.message) || e) }); }

// ui_kits/oasis-app/Trajectory.jsx
try { (() => {
// Trajectory — the gold-foil area chart hero (recreated from
// src/components/LevelTrajectory.tsx) + a small multi-series strength curve.

const TRAJ_W = 320,
  TRAJ_H = 132,
  PAD_T = 34,
  PAD_B = 6;
function smoothPath(pts) {
  if (!pts.length) return '';
  if (pts.length === 1) return `M0 ${pts[0].y} L${TRAJ_W} ${pts[0].y}`;
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i],
      p1 = pts[i],
      p2 = pts[i + 1],
      p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6,
      c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6,
      c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
  }
  return d;
}
function Trajectory({
  data
}) {
  const yFor = p => PAD_T + (1 - p / 100) * (TRAJ_H - PAD_T - PAD_B);
  const targetY = yFor(100);
  const pts = data.map((v, i) => ({
    x: i / (data.length - 1) * TRAJ_W,
    y: yFor(v)
  }));
  const line = smoothPath(pts);
  const area = `${line} L ${TRAJ_W} ${TRAJ_H} L 0 ${TRAJ_H} Z`;
  const last = pts[pts.length - 1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${TRAJ_W} ${TRAJ_H}`,
    preserveAspectRatio: "none",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "trajArea",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#f6d488",
    stopOpacity: "0.42"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "55%",
    stopColor: "#e7b24c",
    stopOpacity: "0.12"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#e7b24c",
    stopOpacity: "0"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "trajLine",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#c8902f"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: "#f6d488"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#fff0c4"
  }))), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: targetY,
    x2: TRAJ_W,
    y2: targetY,
    stroke: "#f6d488",
    strokeOpacity: "0.28",
    strokeWidth: "1",
    strokeDasharray: "3 4",
    vectorEffect: "non-scaling-stroke"
  }), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: "url(#trajArea)"
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: "url(#trajLine)",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    vectorEffect: "non-scaling-stroke"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: `${last.x / TRAJ_W * 100}%`,
      top: `${last.y / TRAJ_H * 100}%`,
      width: 10,
      height: 10,
      transform: 'translate(-50%,-50%)',
      borderRadius: 999,
      background: 'var(--gold-light)',
      boxShadow: 'var(--shadow-glow)',
      border: '2px solid rgba(200,144,47,0.6)'
    }
  }));
}

// Lightweight multi-series strength curve (replaces Recharts in the kit).
function StrengthCurve({
  data,
  series,
  width = 300,
  height = 150
}) {
  const pad = {
    t: 12,
    r: 10,
    b: 22,
    l: 24
  };
  const max = Math.max(...data.flatMap(d => series.map(s => d[s.key]))) * 1.15;
  const x = i => pad.l + i / (data.length - 1) * (width - pad.l - pad.r);
  const y = v => pad.t + (1 - v / max) * (height - pad.t - pad.b);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    style: {
      width: '100%',
      height: 'auto'
    }
  }, [0, 0.5, 1].map(g => /*#__PURE__*/React.createElement("line", {
    key: g,
    x1: pad.l,
    x2: width - pad.r,
    y1: pad.t + g * (height - pad.t - pad.b),
    y2: pad.t + g * (height - pad.t - pad.b),
    stroke: "rgba(116,80,43,0.18)",
    strokeWidth: "1"
  })), data.map((d, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: x(i),
    y: height - 6,
    fill: "#b3854b",
    fontSize: "9",
    textAnchor: "middle",
    fontFamily: "Inter"
  }, d.label)), series.map(s => {
    const dd = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d[s.key])}`).join(' ');
    return /*#__PURE__*/React.createElement("g", {
      key: s.key
    }, /*#__PURE__*/React.createElement("path", {
      d: dd,
      fill: "none",
      stroke: s.color,
      strokeWidth: "2.4",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), data.map((d, i) => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: x(i),
      cy: y(d[s.key]),
      r: "2.6",
      fill: s.color
    })));
  }));
}
Object.assign(window, {
  Trajectory,
  StrengthCurve
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/oasis-app/Trajectory.jsx", error: String((e && e.message) || e) }); }

// ui_kits/oasis-app/data.js
try { (() => {
// Oasis — real program & log data, from the user's workout_checklist.md.
// Levels are L1–L4. Each level splits into 🏖️ Outdoor (bar) + 🏠 Home (floor).
// Exit criteria & exercises are the user's actual plan.

window.OASIS_DATA = function () {
  const LEVELS = [{
    id: 1,
    subtitle: 'Foundation',
    tagline: 'Build the base — clean reps, honest range, no momentum.',
    exit: {
      pullups: 8,
      dips: 10,
      pushups: 35,
      plank: 90
    },
    exitText: '8 pullups · 10 dips · 35 pushups · 90s plank',
    blocks: [{
      id: 'l1-out',
      place: 'outdoor',
      emoji: '🏖️',
      label: 'Outdoor',
      subtitle: 'Bar',
      exercises: [{
        id: 'pullups',
        name: 'Pullups',
        scheme: '5 × 2',
        repsHigh: 2,
        unit: 'reps',
        notes: 'Alternate chin-ups every other session'
      }, {
        id: 'negatives',
        name: 'Negatives',
        scheme: '2 × 1',
        repsHigh: 1,
        unit: 'reps',
        notes: 'Jump to top, 5s down'
      }, {
        id: 'rows',
        name: 'Inverted rows',
        scheme: '3 × 8',
        repsHigh: 8,
        unit: 'reps',
        notes: 'Body 45°, squeeze blades'
      }, {
        id: 'dips',
        name: 'Dips',
        scheme: '3 × 3',
        repsHigh: 3,
        unit: 'reps',
        notes: 'Elbows back, slight lean'
      }, {
        id: 'knee',
        name: 'Twisting knee raises',
        scheme: '3 × 8 / side',
        repsHigh: 8,
        unit: 'reps'
      }, {
        id: 'legraise',
        name: 'Leg raises',
        scheme: 'max',
        repsHigh: 10,
        unit: 'reps',
        notes: 'After each knee-raise set'
      }]
    }, {
      id: 'l1-home',
      place: 'home',
      emoji: '🏠',
      label: 'Home',
      subtitle: 'Floor',
      exercises: [{
        id: 'pushups',
        name: 'Pushups',
        scheme: '4 × 15',
        repsHigh: 15,
        unit: 'reps',
        notes: 'Chest to floor, elbows 45°'
      }, {
        id: 'pike',
        name: 'Pike pushups',
        scheme: '3 × 8',
        repsHigh: 8,
        unit: 'reps',
        notes: 'Hips high, head toward floor'
      }, {
        id: 'squats',
        name: 'Squats deep',
        scheme: '3 × 20',
        repsHigh: 20,
        unit: 'reps'
      }, {
        id: 'sideplank',
        name: 'Side plank',
        scheme: '3 × 30s / side',
        repsHigh: 30,
        unit: 'sec'
      }, {
        id: 'plank',
        name: 'Plank (elbows)',
        scheme: '3 × 45s',
        repsHigh: 45,
        unit: 'sec'
      }, {
        id: 'calf',
        name: 'Single-leg calf raises',
        scheme: '3 × 12 / leg',
        repsHigh: 12,
        unit: 'reps'
      }]
    }]
  }, {
    id: 2,
    subtitle: 'Strength Base',
    tagline: 'Add load & control — slow eccentrics, first skills.',
    exit: {
      pullups: 12,
      dips: 15,
      pushups: 45,
      plank: 120
    },
    exitText: '12 pullups · 15 dips · 45 pushups · 2 min plank',
    blocks: [{
      id: 'l2-out',
      place: 'outdoor',
      emoji: '🏖️',
      label: 'Outdoor',
      subtitle: 'Bar',
      exercises: [{
        id: 'pullups',
        name: 'Pullups',
        scheme: '5 × max-1',
        repsHigh: 7,
        unit: 'reps',
        notes: '40–50 total reps / session'
      }, {
        id: 'rows',
        name: 'Inverted rows',
        scheme: '4 × 12',
        repsHigh: 12,
        unit: 'reps',
        notes: 'More horizontal now'
      }, {
        id: 'highpull',
        name: 'High pulls',
        scheme: '4 × 5',
        repsHigh: 5,
        unit: 'reps',
        notes: 'Explosive to sternum'
      }, {
        id: 'dips',
        name: 'Dips',
        scheme: '4 × 8–12',
        repsHigh: 12,
        unit: 'reps'
      }, {
        id: 'handstand',
        name: 'Wall handstand hold',
        scheme: '3 × 20–30s',
        repsHigh: 30,
        unit: 'sec'
      }, {
        id: 'knee',
        name: 'Twisting knee raises',
        scheme: '4 × 10 / side',
        repsHigh: 10,
        unit: 'reps'
      }]
    }, {
      id: 'l2-home',
      place: 'home',
      emoji: '🏠',
      label: 'Home',
      subtitle: 'Floor',
      exercises: [{
        id: 'decline',
        name: 'Decline pushups',
        scheme: '4 × 20–25',
        repsHigh: 25,
        unit: 'reps',
        notes: 'Feet elevated'
      }, {
        id: 'archer',
        name: 'Archer pushups',
        scheme: '3 × 6–8 / side',
        repsHigh: 8,
        unit: 'reps'
      }, {
        id: 'bulgarian',
        name: 'Bulgarian split squats',
        scheme: '3 × 8–12 / leg',
        repsHigh: 12,
        unit: 'reps'
      }, {
        id: 'jumpsquat',
        name: 'Jump squats',
        scheme: '3 × 8',
        repsHigh: 8,
        unit: 'reps'
      }, {
        id: 'plank',
        name: 'Plank',
        scheme: '3 × 90s',
        repsHigh: 90,
        unit: 'sec'
      }, {
        id: 'calf',
        name: 'Single-leg calf raises',
        scheme: '3 × 15 / leg',
        repsHigh: 15,
        unit: 'reps'
      }]
    }]
  }, {
    id: 3,
    subtitle: 'Muscle-Up Prep',
    tagline: 'Skill first — explosive pulls, transitions, weighted strength.',
    exit: {
      text: 'first clean muscle-up'
    },
    exitText: 'First clean muscle-up',
    blocks: [{
      id: 'l3-out',
      place: 'outdoor',
      emoji: '🏖️',
      label: 'Outdoor',
      subtitle: 'Bar · skill first',
      exercises: [{
        id: 'c2b',
        name: 'Explosive chest-to-bar',
        scheme: '5 × 3–5',
        repsHigh: 5,
        unit: 'reps',
        notes: 'Bar hits sternum'
      }, {
        id: 'negmu',
        name: 'Negative muscle-ups',
        scheme: '4 × 2–3',
        repsHigh: 3,
        unit: 'reps',
        notes: 'Lower through transition'
      }, {
        id: 'transition',
        name: 'Transition drills',
        scheme: '4 × 3–5',
        repsHigh: 5,
        unit: 'reps'
      }, {
        id: 'wdips',
        name: 'Weighted dips',
        scheme: '4 × 5–8',
        repsHigh: 8,
        unit: 'reps'
      }, {
        id: 't2b',
        name: 'Toes-to-bar',
        scheme: '4 × 8–10',
        repsHigh: 10,
        unit: 'reps'
      }]
    }, {
      id: 'l3-home',
      place: 'home',
      emoji: '🏠',
      label: 'Home',
      subtitle: 'Floor',
      exercises: [{
        id: 'archer',
        name: 'Archer pushups',
        scheme: '3 × 10 / side',
        repsHigh: 10,
        unit: 'reps'
      }, {
        id: 'planche',
        name: 'Pseudo planche pushups',
        scheme: '3 × 6–8',
        repsHigh: 8,
        unit: 'reps',
        notes: 'Hands turned out, lean forward'
      }, {
        id: 'pistol',
        name: 'Pistol squat progression',
        scheme: '3 × 3–5 / leg',
        repsHigh: 5,
        unit: 'reps'
      }, {
        id: 'plank',
        name: 'Plank',
        scheme: '3 × 2 min',
        repsHigh: 120,
        unit: 'sec'
      }]
    }]
  }, {
    id: 4,
    subtitle: 'Athletic Peak',
    tagline: 'Muscle-ups in sets + full aesthetic development.',
    exit: {
      text: 'muscle-ups in sets'
    },
    exitText: 'Muscle-ups in clean sets',
    blocks: [{
      id: 'l4-out',
      place: 'outdoor',
      emoji: '🏖️',
      label: 'Outdoor',
      subtitle: 'Bar',
      exercises: [{
        id: 'muclusters',
        name: 'Muscle-up clusters',
        scheme: 'build to 5+',
        repsHigh: 5,
        unit: 'reps',
        notes: '2 reps, 20s rest, repeat'
      }, {
        id: 'wpull',
        name: 'Weighted pullups',
        scheme: '4 × 4–6',
        repsHigh: 6,
        unit: 'reps',
        notes: 'Target +20–25kg'
      }, {
        id: 'frontlever',
        name: 'Front lever progression',
        scheme: '3 × 10–15s',
        repsHigh: 15,
        unit: 'sec'
      }, {
        id: 'wipers',
        name: 'Hanging windshield wipers',
        scheme: '3 × 8 / side',
        repsHigh: 8,
        unit: 'reps'
      }]
    }, {
      id: 'l4-home',
      place: 'home',
      emoji: '🏠',
      label: 'Home',
      subtitle: 'Floor',
      exercises: [{
        id: 'hspu',
        name: 'Freestanding HSPU prog.',
        scheme: '4 × 3–5',
        repsHigh: 5,
        unit: 'reps'
      }, {
        id: 'planche',
        name: 'Pseudo planche pushups',
        scheme: '4 × 8–10',
        repsHigh: 10,
        unit: 'reps'
      }, {
        id: 'fullpistol',
        name: 'Full pistol squats',
        scheme: '3 × 5–8 / leg',
        repsHigh: 8,
        unit: 'reps'
      }, {
        id: 'wcalf',
        name: 'Weighted calf raises',
        scheme: '3 × 15 / leg',
        repsHigh: 15,
        unit: 'reps'
      }]
    }]
  }];
  const WARMUPS = [{
    id: 'wout',
    place: 'outdoor',
    label: '🏖️ Before outdoor',
    exercises: [{
      id: 'scap',
      name: 'Scapular pulls on bar',
      scheme: '2 × 8'
    }, {
      id: 'circles',
      name: 'Arm + wrist circles',
      scheme: '30s each'
    }, {
      id: 'pikehold',
      name: 'Pike pushup hold',
      scheme: '20s'
    }]
  }, {
    id: 'whome',
    place: 'home',
    label: '🏠 Before home',
    exercises: [{
      id: 'sqwarm',
      name: 'Slow deep squats',
      scheme: '10'
    }, {
      id: 'puwarm',
      name: 'Slow pushups',
      scheme: '10'
    }]
  }];

  // Retest battery (every 4 weeks).
  const RETEST = [{
    id: 'pullups',
    label: 'Max strict pullups',
    unit: 'reps'
  }, {
    id: 'dips',
    label: 'Max dips',
    unit: 'reps'
  }, {
    id: 'pushups',
    label: 'Max pushups',
    unit: 'reps'
  }, {
    id: 'plank',
    label: 'Plank hold',
    unit: 'sec'
  }, {
    id: 'legraise',
    label: 'Max straight leg raises',
    unit: 'reps'
  }];

  // Current bests (baseline was 3 / 4 / 25 / 60s / 10).
  const BESTS = {
    pullups: 6,
    dips: 7,
    pushups: 30,
    plank: 72,
    legraise: 9
  };

  // Accumulated trajectory toward L2 (0–100), derived from logs.
  const TRAJECTORY = [14, 20, 26, 33, 40, 48, 55, 61, 65, 70];

  // Strength curve retests over time.
  const CURVE = [{
    label: 'Base',
    pullups: 3,
    dips: 4,
    pushups: 25
  }, {
    label: 'Apr 6',
    pullups: 4,
    dips: 5,
    pushups: 27
  }, {
    label: 'May 4',
    pullups: 5,
    dips: 6,
    pushups: 29
  }, {
    label: 'Jun 1',
    pullups: 6,
    dips: 7,
    pushups: 30
  }];
  const HISTORY = [{
    id: 'h1',
    emoji: '🏖️',
    label: 'L1 · Outdoor',
    date: 'Jun 12',
    sets: 18,
    total: 64
  }, {
    id: 'h2',
    emoji: '🏠',
    label: 'L1 · Home',
    date: 'Jun 12',
    sets: 18,
    total: 188
  }, {
    id: 'h3',
    emoji: '🏖️',
    label: 'L1 · Outdoor',
    date: 'Jun 9',
    sets: 17,
    total: 58
  }, {
    id: 'h4',
    emoji: '🏠',
    label: 'L1 · Home',
    date: 'Jun 9',
    sets: 18,
    total: 182
  }];
  return {
    LEVELS,
    WARMUPS,
    RETEST,
    BESTS,
    TRAJECTORY,
    CURVE,
    HISTORY,
    getLevel: id => LEVELS.find(l => l.id === id) || LEVELS[0]
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/oasis-app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/oasis-app/kit.jsx
try { (() => {
// Shared kit chrome: a Lucide icon helper, the iOS phone frame, and the
// floating glass bottom nav.

function Icon({
  n,
  size = 18,
  color,
  stroke = 2,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', n);
      ref.current.appendChild(el);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          'stroke-width': stroke
        },
        nameAttr: 'data-lucide'
      });
    }
  }, [n, size, stroke]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      color: color || 'currentColor',
      lineHeight: 0,
      ...style
    }
  });
}
const NAV = [{
  id: 'home',
  label: 'Home',
  icon: 'house'
}, {
  id: 'train',
  label: 'Train',
  icon: 'dumbbell'
}, {
  id: 'nourish',
  label: 'Nourish',
  icon: 'apple'
}, {
  id: 'progress',
  label: 'Progress',
  icon: 'trending-up'
}, {
  id: 'you',
  label: 'You',
  icon: 'user'
}];
function BottomNav({
  active,
  onNav
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 50,
      padding: '8px 12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass",
    style: {
      borderRadius: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 8px'
    }
  }, NAV.map(item => {
    const on = item.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      onClick: () => onNav(item.id),
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '6px 0',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: on ? 'var(--text-gold)' : 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'grid',
        placeItems: 'center',
        width: 40,
        height: 34,
        borderRadius: 16,
        background: on ? 'rgba(231,178,76,0.15)' : 'transparent',
        boxShadow: on ? 'var(--shadow-glow)' : 'none'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      n: item.icon,
      size: 20,
      stroke: on ? 2.4 : 2
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.02em'
      }
    }, item.label));
  })));
}
function StatusBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 26px 2px',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)',
      fontSize: 14,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "signal",
    size: 15
  }), /*#__PURE__*/React.createElement(Icon, {
    n: "wifi",
    size: 15
  }), /*#__PURE__*/React.createElement(Icon, {
    n: "battery-full",
    size: 18
  })));
}
function PhoneFrame({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 'min(844px, 96vh)',
      maxHeight: 860,
      borderRadius: 52,
      padding: 5,
      background: 'linear-gradient(155deg,#3a3026,#15100a)',
      boxShadow: '0 40px 100px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(247,239,223,0.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: 47,
      overflow: 'hidden',
      background: 'var(--bg-base)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--grad-atmosphere)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.05,
      pointerEvents: 'none',
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 108,
      height: 30,
      borderRadius: 16,
      background: '#000',
      zIndex: 60
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 10,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, children)));
}
Object.assign(window, {
  Icon,
  BottomNav,
  StatusBar,
  PhoneFrame,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/oasis-app/kit.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.IconTile = __ds_scope.IconTile;

__ds_ns.CriterionBar = __ds_scope.CriterionBar;

__ds_ns.LevelPill = __ds_scope.LevelPill;

__ds_ns.ProgressRing = __ds_scope.ProgressRing;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.GlassCard = __ds_scope.GlassCard;

__ds_ns.StatTile = __ds_scope.StatTile;

})();
