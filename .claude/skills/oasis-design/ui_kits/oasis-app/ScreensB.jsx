// Oasis screens — Progress · You · Nourish + the Session Logger overlay.

const DS_B = window.OasisDesignSystem_2f48a5;
const { GlassCard: GC, ProgressRing: PR, CriterionBar: CB, Button: Btn, Chip: Cp, IconTile: IT } = DS_B;

/* ───────────────────────── PROGRESS ───────────────────────── */
function ProgressScreen() {
  const D = window.OASIS_DATA;
  const series = [
    { key: 'pullups', color: 'var(--gold)', label: 'Pullups' },
    { key: 'dips', color: 'var(--oasis-palm)', label: 'Dips' },
    { key: 'pushups', color: 'var(--oasis-water)', label: 'Pushups' },
  ];
  return (
    <Scroll>
      <PageHead eyebrow="Level 1" title="Progress" />

      <GC style={{ marginBottom: 12, padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span className="eyebrow">Strength curve</span>
          <Cp tone="info">retest</Cp>
        </div>
        <StrengthCurve data={D.CURVE} series={series} />
        <div style={{ display: 'flex', gap: 16, marginTop: 8, justifyContent: 'center' }}>
          {series.map((s) => (
            <span key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: s.color }} />{s.label}
            </span>
          ))}
        </div>
      </GC>

      <GC style={{ marginBottom: 12, padding: '16px 18px' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Current bests vs L2</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <CB label="Max strict pullups" current={D.BESTS.pullups} goal={8} />
          <CB label="Max dips" current={D.BESTS.dips} goal={10} />
          <CB label="Max pushups" current={D.BESTS.pushups} goal={35} />
          <CB label="Plank hold" current={D.BESTS.plank} goal={90} unit="s" />
          <CB label="Max leg raises" current={D.BESTS.legraise} goal={15} />
        </div>
      </GC>

      <GC style={{ marginBottom: 12, padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span className="eyebrow">4-week retest due</span>
          <Cp tone="gold" active icon={<Icon n="timer" size={12} />}>in 6 days</Cp>
        </div>
        <Btn variant="ghost" fullWidth icon={<Icon n="clipboard-check" size={15} />}>Log a retest</Btn>
      </GC>

      <div className="eyebrow" style={{ margin: '18px 2px 10px' }}>Session history</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {D.HISTORY.map((h) => (
          <GC key={h.id} soft interactive style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>{h.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-body)' }}>{h.label}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{h.date} · {h.sets} sets · {h.total} reps</div>
            </div>
            <Icon n="chevron-right" size={16} color="var(--text-faint)" />
          </GC>
        ))}
      </div>
    </Scroll>
  );
}

/* ───────────────────────── NOURISH (scaffold) ───────────────────────── */
function NourishScreen() {
  return (
    <Scroll>
      <PageHead eyebrow="Fuel the bloom" title="Nourish" right={<Cp tone="gold" active>soon</Cp>} />
      <GC style={{ marginBottom: 12, padding: '18px' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <PR value={72} label="72" sublabel="score" size={92} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CB label="Protein" current={132} goal={170} unit="g" />
            <CB label="Carbs" current={180} goal={220} unit="g" />
            <CB label="Fat" current={54} goal={60} unit="g" />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border-hairline)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Calories</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            <span className="gold-text">2,040</span> <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ 2,400</span>
          </span>
        </div>
      </GC>
      <Btn variant="gold" fullWidth icon={<Icon n="scan-barcode" size={16} />}>Scan a food</Btn>
      <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-faint)', marginTop: 16 }}>
        Diary, micros &amp; calorie balance — coming in v0.2.
      </div>
    </Scroll>
  );
}

/* ───────────────────────── YOU ───────────────────────── */
function YouScreen() {
  const rows = [
    { icon: 'user', label: 'Profile', value: 'Sam · 28 · ♂' },
    { icon: 'ruler', label: 'Height · Weight', value: '180 cm · 78 kg' },
    { icon: 'target', label: 'Goal', value: 'Maintain' },
    { icon: 'layers', label: 'Level', value: 'L1 · Foundation' },
  ];
  const actions = [
    { icon: 'download', label: 'Export data', tone: 'neutral' },
    { icon: 'upload', label: 'Import backup', tone: 'neutral' },
    { icon: 'rotate-ccw', label: 'Reset progress', tone: 'danger' },
  ];
  return (
    <Scroll>
      <PageHead eyebrow="Your account" title="You" />
      <GC style={{ marginBottom: 12, padding: '18px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, overflow: 'hidden', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-glow)' }}>
          <img src="../../assets/app-icon.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-primary)' }}>Sam Rivera</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Climbing since Mar 2026 · 64 sessions</div>
        </div>
      </GC>

      <GC style={{ marginBottom: 12, padding: '6px 6px' }}>
        {rows.map((r, i) => (
          <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px', borderBottom: i < rows.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
            <IT size={36} tone="sunken"><Icon n={r.icon} size={16} color="var(--text-secondary)" /></IT>
            <span style={{ flex: 1, fontSize: '0.86rem', color: 'var(--text-body)' }}>{r.label}</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{r.value}</span>
            <Icon n="chevron-right" size={15} color="var(--text-faint)" />
          </div>
        ))}
      </GC>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {actions.map((a) => (
          <GC key={a.label} soft interactive style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon n={a.icon} size={17} color={a.tone === 'danger' ? 'var(--status-danger)' : 'var(--text-secondary)'} />
            <span style={{ flex: 1, fontSize: '0.86rem', color: a.tone === 'danger' ? 'var(--status-danger)' : 'var(--text-body)' }}>{a.label}</span>
          </GC>
        ))}
      </div>
      <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-faint)', marginTop: 18 }}>
        Oasis v0.1 · made for the long climb · everything lives on this device
      </div>
    </Scroll>
  );
}

/* ───────────────────────── SESSION LOGGER (overlay) ───────────────────────── */
function SessionLogger({ onClose }) {
  const D = window.OASIS_DATA;
  const { Stepper: Stp } = DS_B;
  const block = D.getLevel(1).blocks[0];
  const [done, setDone] = React.useState({});
  const [reps, setReps] = React.useState(() => {
    const m = {};
    block.exercises.forEach((ex) => { m[ex.id] = [ex.repsHigh, ex.repsHigh - 1, ex.repsHigh - 2]; });
    return m;
  });
  const [saved, setSaved] = React.useState(false);
  const total = Object.values(reps).flat().reduce((a, b) => a + b, 0);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 80, display: 'flex', flexDirection: 'column',
      background: 'var(--bg-base)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--grad-atmosphere)' }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ paddingTop: 52 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 18px 10px' }}>
          <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.86rem' }}>
            <Icon n="chevron-left" size={18} /> Train
          </button>
          <Cp>{block.emoji} {block.label}</Cp>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 120px' }}>
          <div className="eyebrow" style={{ margin: '2px 2px 4px' }}>Logging · L1</div>
          <h1 className="heading" style={{ fontSize: '1.7rem', margin: '0 0 16px' }}>{block.label} session</h1>

          {block.exercises.map((ex) => (
            <GC key={ex.id} style={{ marginBottom: 12, padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-primary)' }}>{ex.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{ex.scheme}{ex.notes ? ` · ${ex.notes}` : ''}</div>
                </div>
                <button onClick={() => setDone((d) => ({ ...d, [ex.id]: !d[ex.id] }))}
                  style={{ display: 'grid', placeItems: 'center', width: 34, height: 34, borderRadius: 999, cursor: 'pointer',
                    border: `1px solid ${done[ex.id] ? 'rgba(90,164,105,0.6)' : 'var(--border-hairline)'}`,
                    background: done[ex.id] ? 'rgba(90,164,105,0.2)' : 'var(--surface-sunken)' }}>
                  <Icon n="check" size={16} color={done[ex.id] ? 'var(--oasis-palm)' : 'var(--text-faint)'} stroke={done[ex.id] ? 2.6 : 2} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {reps[ex.id].map((v, i) => (
                  <Stp key={i} index={i + 1} value={v} unit={ex.unit === 'sec' ? 's' : ''}
                    onChange={(nv) => setReps((r) => ({ ...r, [ex.id]: r[ex.id].map((x, j) => j === i ? nv : x) }))} />
                ))}
              </div>
            </GC>
          ))}

          <GC soft style={{ padding: '12px 14px', marginBottom: 8 }}>
            <input className="input" placeholder="Session notes — how did it feel?" style={{ background: 'transparent', border: 'none', padding: 0 }} />
          </GC>
        </div>

        {/* Save bar */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 16px 22px',
          background: 'linear-gradient(180deg, transparent, rgba(10,19,15,0.92) 40%)' }}>
          {saved ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', borderRadius: 20, background: 'rgba(90,164,105,0.18)', border: '1px solid rgba(90,164,105,0.5)', color: 'var(--oasis-palm)', fontWeight: 600 }}>
              <Icon n="check" size={18} /> Session saved · {total} reps logged
            </div>
          ) : (
            <Btn variant="gold" fullWidth size="lg" icon={<Icon n="check" size={17} />} onClick={() => setSaved(true)}>
              Save session · {total} reps
            </Btn>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProgressScreen, NourishScreen, YouScreen, SessionLogger });
