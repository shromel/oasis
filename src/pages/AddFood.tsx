import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Search, Star, Bookmark, Pencil, ScanBarcode, Plus, Loader2 } from 'lucide-react'
import BarcodeScanner from '../components/BarcodeScanner'
import { useStore, isSavedFood } from '../store/useStore'
import {
  searchOpenFoodFacts,
  fetchOpenFoodFacts,
  foodFromServing,
  scaleNutrients,
  type Food,
  type Meal,
} from '../lib/nutrition'

type Tab = 'search' | 'saved' | 'manual' | 'scan'

export default function AddFood() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const meal = (params.get('meal') as Meal) || 'snack'
  const { savedFoods, savedMeals, addFoodLog, logSavedMeal, toggleSavedFood } = useStore()

  const [tab, setTab] = useState<Tab>('search')
  const [selected, setSelected] = useState<Food | null>(null)

  const done = () => navigate('/nourish')

  return (
    <div className="pt-1 pb-4">
      <header className="flex items-center gap-3 mb-3">
        <button onClick={done} className="grid place-items-center w-10 h-10 rounded-2xl bg-sand-800/40">
          <ArrowLeft size={18} />
        </button>
        <div>
          <p className="eyebrow">Add to {meal}</p>
          <h1 className="heading text-xl leading-tight capitalize">{meal}</h1>
        </div>
      </header>

      {/* tabs */}
      <div className="flex gap-2 mb-4">
        <TabBtn icon={<Search size={15} />} label="Search" on={tab === 'search'} onClick={() => setTab('search')} />
        <TabBtn icon={<Star size={15} />} label="Saved" on={tab === 'saved'} onClick={() => setTab('saved')} />
        <TabBtn icon={<Pencil size={15} />} label="Manual" on={tab === 'manual'} onClick={() => setTab('manual')} />
        <TabBtn icon={<ScanBarcode size={15} />} label="Scan" on={tab === 'scan'} onClick={() => setTab('scan')} />
      </div>

      {tab === 'search' && <SearchTab onPick={setSelected} />}
      {tab === 'saved' && (
        <SavedTab
          savedFoods={savedFoods}
          savedMeals={savedMeals}
          onPick={setSelected}
          onLogMeal={(id) => { logSavedMeal(id, meal); done() }}
        />
      )}
      {tab === 'manual' && <ManualTab onCreate={setSelected} />}
      {tab === 'scan' && <ScanTab onFound={setSelected} onManual={() => setTab('manual')} />}

      {selected && (
        <ServingSheet
          food={selected}
          saved={isSavedFood(savedFoods, selected)}
          onSave={() => toggleSavedFood(selected)}
          onCancel={() => setSelected(null)}
          onAdd={(grams) => { addFoodLog(meal, selected, grams); done() }}
        />
      )}
    </div>
  )
}

function TabBtn({ icon, label, on, onClick }: { icon: React.ReactNode; label: string; on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl border text-[11px] transition ${on ? 'bg-gold/15 border-gold/50 text-gold' : 'border-sand-600/40 text-sand-200/60'}`}>
      {icon}
      {label}
    </button>
  )
}

function FoodRow({ food, onClick }: { food: Food; onClick: () => void }) {
  const kcal = Math.round(food.per100g.kcal ?? 0)
  return (
    <button onClick={onClick} className="w-full glass-soft p-3 flex items-center gap-3 text-left active:scale-[0.99] transition">
      <div className="flex-1 min-w-0">
        <p className="text-sand-50 text-sm truncate">{food.name}</p>
        <p className="text-sand-200/50 text-xs mt-0.5 truncate">
          {food.brand ? `${food.brand} · ` : ''}{kcal} kcal / 100 g
        </p>
      </div>
      <Plus size={16} className="text-gold shrink-0" />
    </button>
  )
}

function SearchTab({ onPick }: { onPick: (f: Food) => void }) {
  const [q, setQ] = useState('')
  const [results, setResults] = useState<Food[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [nonce, setNonce] = useState(0)
  const abort = useRef<AbortController | null>(null)

  useEffect(() => {
    if (q.trim().length < 2) { setResults([]); setError(false); setLoading(false); return }
    setLoading(true)
    setError(false)
    const t = setTimeout(async () => {
      abort.current?.abort()
      abort.current = new AbortController()
      try {
        setResults(await searchOpenFoodFacts(q, abort.current.signal))
        setLoading(false)
      } catch (e) {
        if ((e as Error)?.name !== 'AbortError') {
          setError(true)
          setResults([])
          setLoading(false)
        }
      }
    }, 450)
    return () => clearTimeout(t)
  }, [q, nonce])

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sand-200/50" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search foods (Open Food Facts)…" className="input !pl-9" />
      </div>
      {loading && <p className="text-sand-200/50 text-xs flex items-center gap-2 px-1 py-2"><Loader2 size={13} className="animate-spin" /> searching…</p>}
      {error && (
        <div className="text-center py-6">
          <p className="text-sand-200/60 text-sm">Search is busy (Open Food Facts rate limit).</p>
          <button onClick={() => setNonce((n) => n + 1)} className="btn-ghost mt-3 text-sm">Retry</button>
          <p className="text-sand-200/40 text-xs mt-2">Or scan the barcode / add it manually.</p>
        </div>
      )}
      {!loading && !error && q.trim().length >= 2 && results.length === 0 && (
        <p className="text-sand-200/50 text-sm text-center py-6">No matches — try Scan or the Manual tab.</p>
      )}
      {results.map((f) => <FoodRow key={f.id} food={f} onClick={() => onPick(f)} />)}
    </div>
  )
}

function SavedTab({ savedFoods, savedMeals, onPick, onLogMeal }: { savedFoods: Food[]; savedMeals: { id: string; name: string; items: { food: Food; grams: number }[] }[]; onPick: (f: Food) => void; onLogMeal: (id: string) => void }) {
  if (savedFoods.length === 0 && savedMeals.length === 0) {
    return <p className="text-sand-200/50 text-sm text-center py-8">No saved foods or meals yet.<br />Star a food when adding it, or save a logged meal from the diary.</p>
  }
  return (
    <div className="space-y-4">
      {savedMeals.length > 0 && (
        <div className="space-y-2">
          <p className="eyebrow px-0.5">Saved meals</p>
          {savedMeals.map((m) => {
            const kcal = Math.round(m.items.reduce((a, it) => a + (scaleNutrients(it.food.per100g, it.grams).kcal ?? 0), 0))
            return (
              <button key={m.id} onClick={() => onLogMeal(m.id)} className="w-full glass-soft p-3 flex items-center gap-3 text-left active:scale-[0.99] transition">
                <Bookmark size={16} className="text-gold shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sand-50 text-sm truncate">{m.name}</p>
                  <p className="text-sand-200/50 text-xs mt-0.5">{m.items.length} items · {kcal} kcal</p>
                </div>
                <span className="text-gold text-xs font-medium">log</span>
              </button>
            )
          })}
        </div>
      )}
      {savedFoods.length > 0 && (
        <div className="space-y-2">
          <p className="eyebrow px-0.5">Saved foods</p>
          {savedFoods.map((f) => <FoodRow key={f.barcode ?? f.id} food={f} onClick={() => onPick(f)} />)}
        </div>
      )}
    </div>
  )
}

function ManualTab({ onCreate }: { onCreate: (f: Food) => void }) {
  const [name, setName] = useState('')
  const [grams, setGrams] = useState('100')
  const [kcal, setKcal] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')

  const g = Number(grams) || 0
  const ok = name.trim() && g > 0 && Number(kcal) > 0

  const create = () => {
    const f = foodFromServing(name.trim(), g, { kcal: Number(kcal) || 0, protein: Number(protein) || 0, carbs: Number(carbs) || 0, fat: Number(fat) || 0 })
    onCreate(f)
  }

  return (
    <div className="space-y-3">
      <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Food name" />
      <div className="grid grid-cols-2 gap-3">
        <Num label="Serving (g)" v={grams} set={setGrams} />
        <Num label="Calories" v={kcal} set={setKcal} />
        <Num label="Protein (g)" v={protein} set={setProtein} />
        <Num label="Carbs (g)" v={carbs} set={setCarbs} />
        <Num label="Fat (g)" v={fat} set={setFat} />
      </div>
      <p className="text-sand-200/40 text-xs px-1">Enter the values for one serving — the app scales from there.</p>
      <button onClick={create} disabled={!ok} className="btn-gold w-full disabled:opacity-40">Continue</button>
    </div>
  )
}

function Num({ label, v, set }: { label: string; v: string; set: (s: string) => void }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wider text-sand-200/50 mb-1.5">{label}</label>
      <input className="input" inputMode="decimal" value={v} onChange={(e) => set(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="0" />
    </div>
  )
}

function ScanTab({ onFound, onManual }: { onFound: (f: Food) => void; onManual: () => void }) {
  const [status, setStatus] = useState<'scan' | 'looking' | 'notfound'>('scan')

  const handle = async (code: string) => {
    setStatus('looking')
    const food = await fetchOpenFoodFacts(code)
    if (food) onFound(food)
    else setStatus('notfound')
  }

  if (status === 'looking') return <p className="text-center text-sand-200/60 py-10 flex items-center justify-center gap-2"><Loader2 size={16} className="animate-spin" /> Looking up barcode…</p>
  if (status === 'notfound') {
    return (
      <div className="text-center py-8">
        <p className="text-sand-200/70 text-sm">Not found in Open Food Facts.</p>
        <button onClick={onManual} className="btn-ghost mt-4">Add it manually</button>
        <button onClick={() => setStatus('scan')} className="block mx-auto mt-3 text-gold text-sm">Scan again</button>
      </div>
    )
  }
  return <BarcodeScanner onDetect={handle} onClose={onManual} />
}

function ServingSheet({ food, saved, onSave, onCancel, onAdd }: { food: Food; saved: boolean; onSave: () => void; onCancel: () => void; onAdd: (grams: number) => void }) {
  const [grams, setGrams] = useState(String(food.servingG ?? 100))
  const g = Number(grams) || 0
  const n = scaleNutrients(food.per100g, g)
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative w-full max-w-md glass !rounded-t-3xl !rounded-b-none p-5 pb-8 animate-floatUp" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <p className="text-sand-50 font-medium leading-tight">{food.name}</p>
            {food.brand && <p className="text-sand-200/50 text-xs mt-0.5">{food.brand}</p>}
          </div>
          <button onClick={onSave} className={`grid place-items-center w-9 h-9 rounded-xl border shrink-0 ${saved ? 'bg-gold/15 border-gold/50 text-gold' : 'border-sand-600/40 text-sand-200/60'}`} title="Save food">
            <Star size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        <label className="block text-[10px] uppercase tracking-wider text-sand-200/50 mb-1.5">Amount (grams)</label>
        <input autoFocus className="input mb-4" inputMode="decimal" value={grams} onChange={(e) => setGrams(e.target.value.replace(/[^0-9.]/g, ''))} />

        <div className="grid grid-cols-4 gap-2 text-center mb-5">
          <Macro v={Math.round(n.kcal ?? 0)} l="kcal" c="gold-text" />
          <Macro v={Math.round(n.protein ?? 0)} l="protein" c="text-oasis-palm" />
          <Macro v={Math.round(n.carbs ?? 0)} l="carbs" c="text-oasis-water" />
          <Macro v={Math.round(n.fat ?? 0)} l="fat" c="text-gold" />
        </div>

        <button onClick={() => g > 0 && onAdd(g)} disabled={g <= 0} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-40">
          <Plus size={18} /> Add to diary
        </button>
      </div>
    </div>
  )
}

function Macro({ v, l, c }: { v: number; l: string; c: string }) {
  return (
    <div className="glass-soft py-2.5">
      <p className={`font-display text-lg leading-none ${c}`}>{v}</p>
      <p className="text-sand-200/45 text-[10px] mt-1">{l}</p>
    </div>
  )
}
