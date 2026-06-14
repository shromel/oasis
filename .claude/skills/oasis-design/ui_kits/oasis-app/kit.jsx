// Shared kit chrome: a Lucide icon helper, the iOS phone frame, and the
// floating glass bottom nav.

function Icon({ n, size = 18, color, stroke = 2, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', n);
      ref.current.appendChild(el);
      window.lucide.createIcons({ attrs: { width: size, height: size, 'stroke-width': stroke }, nameAttr: 'data-lucide' });
    }
  }, [n, size, stroke]);
  return <span ref={ref} style={{ display: 'inline-flex', color: color || 'currentColor', lineHeight: 0, ...style }} />;
}

const NAV = [
  { id: 'home', label: 'Home', icon: 'house' },
  { id: 'train', label: 'Train', icon: 'dumbbell' },
  { id: 'nourish', label: 'Nourish', icon: 'apple' },
  { id: 'progress', label: 'Progress', icon: 'trending-up' },
  { id: 'you', label: 'You', icon: 'user' },
];

function BottomNav({ active, onNav }) {
  return (
    <nav style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 50, padding: '8px 12px 14px' }}>
      <div className="glass" style={{ borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 8px' }}>
        {NAV.map((item) => {
          const on = item.id === active;
          return (
            <button key={item.id} onClick={() => onNav(item.id)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '6px 0',
                background: 'none', border: 'none', cursor: 'pointer', color: on ? 'var(--text-gold)' : 'var(--text-muted)' }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 40, height: 34, borderRadius: 16,
                background: on ? 'rgba(231,178,76,0.15)' : 'transparent', boxShadow: on ? 'var(--shadow-glow)' : 'none' }}>
                <Icon n={item.icon} size={20} stroke={on ? 2.4 : 2} />
              </span>
              <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.02em' }}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function StatusBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 26px 2px',
      fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', fontSize: 14, fontWeight: 600 }}>
      <span>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon n="signal" size={15} />
        <Icon n="wifi" size={15} />
        <Icon n="battery-full" size={18} />
      </div>
    </div>
  );
}

function PhoneFrame({ children }) {
  return (
    <div style={{ width: 390, height: 'min(844px, 96vh)', maxHeight: 860, borderRadius: 52, padding: 5,
      background: 'linear-gradient(155deg,#3a3026,#15100a)', boxShadow: '0 40px 100px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(247,239,223,0.05)' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 47, overflow: 'hidden',
        background: 'var(--bg-base)' }}>
        {/* atmosphere */}
        <div style={{ position: 'absolute', inset: 0, background: 'var(--grad-atmosphere)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        {/* dynamic island */}
        <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 108, height: 30, borderRadius: 16, background: '#000', zIndex: 60 }} />
        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, BottomNav, StatusBar, PhoneFrame, NAV });
