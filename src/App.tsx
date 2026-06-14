import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Train from './pages/Train'
import SessionLogger from './pages/SessionLogger'
import Progress from './pages/Progress'
import Nourish from './pages/Nourish'
import AddFood from './pages/AddFood'
import You from './pages/You'
import Onboarding from './pages/Onboarding'
import { useStore } from './store/useStore'

export default function App() {
  const onboarded = useStore((s) => s.profile.onboarded)

  if (!onboarded) return <Onboarding />

  return (
    <div className="min-h-full">
      <main className="mx-auto max-w-md px-4 safe-top safe-bottom">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/train" element={<Train />} />
          <Route path="/train/:levelId/:blockId" element={<SessionLogger />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/nourish" element={<Nourish />} />
          <Route path="/nourish/add" element={<AddFood />} />
          <Route path="/you" element={<You />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
