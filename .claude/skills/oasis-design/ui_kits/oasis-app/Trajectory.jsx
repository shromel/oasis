// Trajectory — the gold-foil area chart hero (recreated from
// src/components/LevelTrajectory.tsx) + a small multi-series strength curve.

const TRAJ_W = 320, TRAJ_H = 132, PAD_T = 34, PAD_B = 6;

function smoothPath(pts) {
  if (!pts.length) return '';
  if (pts.length === 1) return `M0 ${pts[0].y} L${TRAJ_W} ${pts[0].y}`;
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

function Trajectory({ data }) {
  const yFor = (p) => PAD_T + (1 - p / 100) * (TRAJ_H - PAD_T - PAD_B);
  const targetY = yFor(100);
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * TRAJ_W, y: yFor(v) }));
  const line = smoothPath(pts);
  const area = `${line} L ${TRAJ_W} ${TRAJ_H} L 0 ${TRAJ_H} Z`;
  const last = pts[pts.length - 1];

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox={`0 0 ${TRAJ_W} ${TRAJ_H}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
        <defs>
          <linearGradient id="trajArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f6d488" stopOpacity="0.42" />
            <stop offset="55%" stopColor="#e7b24c" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#e7b24c" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trajLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c8902f" />
            <stop offset="50%" stopColor="#f6d488" />
            <stop offset="100%" stopColor="#fff0c4" />
          </linearGradient>
        </defs>
        <line x1="0" y1={targetY} x2={TRAJ_W} y2={targetY} stroke="#f6d488" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
        <path d={area} fill="url(#trajArea)" />
        <path d={line} fill="none" stroke="url(#trajLine)" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <span style={{ position: 'absolute', left: `${(last.x / TRAJ_W) * 100}%`, top: `${(last.y / TRAJ_H) * 100}%`,
        width: 10, height: 10, transform: 'translate(-50%,-50%)', borderRadius: 999,
        background: 'var(--gold-light)', boxShadow: 'var(--shadow-glow)', border: '2px solid rgba(200,144,47,0.6)' }} />
    </div>
  );
}

// Lightweight multi-series strength curve (replaces Recharts in the kit).
function StrengthCurve({ data, series, width = 300, height = 150 }) {
  const pad = { t: 12, r: 10, b: 22, l: 24 };
  const max = Math.max(...data.flatMap((d) => series.map((s) => d[s.key]))) * 1.15;
  const x = (i) => pad.l + (i / (data.length - 1)) * (width - pad.l - pad.r);
  const y = (v) => pad.t + (1 - v / max) * (height - pad.t - pad.b);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }}>
      {[0, 0.5, 1].map((g) => (
        <line key={g} x1={pad.l} x2={width - pad.r} y1={pad.t + g * (height - pad.t - pad.b)} y2={pad.t + g * (height - pad.t - pad.b)}
          stroke="rgba(116,80,43,0.18)" strokeWidth="1" />
      ))}
      {data.map((d, i) => (
        <text key={i} x={x(i)} y={height - 6} fill="#b3854b" fontSize="9" textAnchor="middle" fontFamily="Inter">{d.label}</text>
      ))}
      {series.map((s) => {
        const dd = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d[s.key])}`).join(' ');
        return (
          <g key={s.key}>
            <path d={dd} fill="none" stroke={s.color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            {data.map((d, i) => <circle key={i} cx={x(i)} cy={y(d[s.key])} r="2.6" fill={s.color} />)}
          </g>
        );
      })}
    </svg>
  );
}

Object.assign(window, { Trajectory, StrengthCurve });
