// Oasis screens — Home · Train · Progress · You · Nourish.
// Composes the design-system primitives (window.OasisDesignSystem_2f48a5)
// + kit chrome (Icon) + Trajectory chart. Cosmetic recreation.

const DS = window.OasisDesignSystem_2f48a5;
const { GlassCard, StatTile, ProgressRing, CriterionBar, LevelPill, Stepper, Button, Chip, IconTile } = DS;

function Scroll({ children }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '4px 16px 104px' }}>
      {children}
    </div>
  );
}
function PageHead({ eyebrow, title, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '10px 2px 16px' }}>
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="heading" style={{ fontSize: '1.875rem', margin: '2px 0 0', lineHeight: 1.05 }}>{title}</h1>
      </div>
      {right}
    </div>
  );
}
const divider = { borderRight: '1px solid var(--border-soft)' };

/* ───────────────────────── HOME ───────────────────────── */
function HomeScreen({ onStart }) {
  const D = window.OASIS_DATA;
  return (
    <Scroll>
      <PageHead eyebrow="Good morning, Sam" title="Your oasis" right={
        <div style={{ width: 40, height: 40, borderRadius: 999, overflow: 'hidden', border: '1px solid var(--border-gold)' }}>
          <img src="../../assets/app-icon.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      } />

      {/* Trajectory hero */}
      <GlassCard style={{ padding: 0, overflow: 'hidden', marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 18px 0' }}>
          <div>
            <div className="eyebrow">Trajectory · L2</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', lineHeight: 1, marginTop: 4 }}>
              <span className="gold-text">70%</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>toward L2</div>
          </div>
          <Chip tone="info" icon={<Icon n="trending-up" size={12} />}>+12% this month</Chip>
        </div>
        <div style={{ position: 'relative', height: 132, marginTop: 6 }}>
          <Trajectory data={D.TRAJECTORY} />
        </div>
      </GlassCard>

      {/* 3-up stat row */}
      <GlassCard style={{ padding: 0, overflow: 'hidden', marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
          <div style={divider}><StatTile icon={<Icon n="flame" size={15} />} accent="var(--dusk-rose)" value="7" label="day streak" /></div>
          <div style={divider}><StatTile icon={<Icon n="calendar-check" size={15} />} accent="var(--oasis-palm)" value="3" label="this week" /></div>
          <StatTile icon={<Icon n="dumbbell" size={15} />} accent="var(--gold)" value="64" label="sessions" />
        </div>
      </GlassCard>

      {/* Path to next level */}
      <GlassCard style={{ marginBottom: 12, padding: '16px 18px' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Path to L2</div>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <ProgressRing value={70} label="70%" sublabel="exit" size={92} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 11 }}>
            <CriterionBar label="Pullups" current={6} goal={8} />
            <CriterionBar label="Dips" current={7} goal={10} />
            <CriterionBar label="Pushups" current={30} goal={35} />
            <CriterionBar label="Plank" current={72} goal={90} unit="s" />
          </div>
        </div>
      </GlassCard>

      {/* CTA */}
      <GlassCard style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text-primary)' }}>Today · Outdoor</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>6 exercises · ~28 min</div>
        </div>
        <Button variant="gold" icon={<Icon n="play" size={16} />} onClick={onStart}>Start</Button>
      </GlassCard>
    </Scroll>
  );
}

/* ───────────────────────── TRAIN ───────────────────────── */
function TrainScreen({ onStart }) {
  const D = window.OASIS_DATA;
  const [levelId, setLevelId] = React.useState(1);
  const [warmOpen, setWarmOpen] = React.useState(false);
  const level = D.getLevel(levelId);
  return (
    <Scroll>
      <PageHead eyebrow="Your program" title="Train" />
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6, margin: '0 -16px 14px', paddingLeft: 16, paddingRight: 16 }}>
        {D.LEVELS.map((l) => (
          <LevelPill key={l.id} level={l.id} name="" active={l.id === levelId} current={l.id === 1} onClick={() => setLevelId(l.id)} />
        ))}
      </div>

      <GlassCard soft style={{ marginBottom: 12, padding: '14px 16px' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.5 }}>{level.tagline}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
          <Icon n="flag" size={13} color="var(--text-gold)" />
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Exit · {level.exitText}</span>
        </div>
      </GlassCard>

      {/* Warm-up (collapsible) */}
      <GlassCard style={{ marginBottom: 12, padding: 0, overflow: 'hidden' }}>
        <button onClick={() => setWarmOpen((o) => !o)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 18 }}>🌀</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-primary)' }}>Warm-up</span>
            <Chip>5 min</Chip>
          </span>
          <Icon n={warmOpen ? 'chevron-up' : 'chevron-down'} size={18} color="var(--text-muted)" />
        </button>
        {warmOpen && (
          <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {D.WARMUPS.map((w) => (
              <div key={w.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span className="eyebrow" style={{ fontSize: '0.6rem' }}>{w.label}</span>
                {w.exercises.map((ex) => (
                  <div key={ex.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '8px 12px', borderRadius: 12, background: 'var(--surface-sunken)' }}>
                    <span style={{ color: 'var(--text-body)' }}>{ex.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{ex.scheme}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Blocks */}
      {level.blocks.map((b) => (
        <GlassCard key={b.id} style={{ marginBottom: 12, padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>{b.emoji}</span>
              <span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text-primary)' }}>{b.label}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{b.subtitle}</div>
              </span>
            </span>
            <Button variant="gold" size="sm" icon={<Icon n="play" size={13} />} onClick={onStart}>Start</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {b.exercises.map((ex) => (
              <div key={ex.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 12, background: 'var(--surface-sunken)', border: '1px solid var(--border-soft)' }}>
                <span style={{ color: 'var(--text-body)', fontSize: '0.86rem' }}>{ex.name}</span>
                <Chip>{ex.scheme}</Chip>
              </div>
            ))}
          </div>
        </GlassCard>
      ))}
    </Scroll>
  );
}

Object.assign(window, { HomeScreen, TrainScreen, Scroll, PageHead });
