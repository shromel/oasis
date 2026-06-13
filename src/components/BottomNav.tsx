import { NavLink } from 'react-router-dom'
import { Home as HomeIcon, Dumbbell, Apple, TrendingUp, User } from 'lucide-react'

const items = [
  { to: '/', label: 'Home', icon: HomeIcon, end: true },
  { to: '/train', label: 'Train', icon: Dumbbell },
  { to: '/nourish', label: 'Nourish', icon: Apple },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
  { to: '/you', label: 'You', icon: User },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50">
      <div className="mx-auto max-w-md px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2">
        <div className="glass !rounded-[28px] flex items-center justify-between px-2 py-2">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-2 rounded-2xl transition ${
                  isActive ? 'text-gold' : 'text-sand-200/55'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`grid place-items-center w-10 h-9 rounded-2xl transition ${
                      isActive ? 'bg-gold/15 shadow-glow' : ''
                    }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
                  </div>
                  <span className="text-[10px] font-medium tracking-wide">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
