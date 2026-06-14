import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Search, Star, Bookmark, Pencil, ScanBarcode, Plus, Loader2, Camera, Sparkles, X, ChevronRight, Trash2 } from 'lucide-react'
import BarcodeScanner from '../components/BarcodeScanner'
import ServingSheet from '../components/ServingSheet'
import { useStore, isSavedFood, aiScansToday, AI_DAILY_CAP } from '../store/useStore'
import { downscaleImage, analyzeFoodPhoto, hasApiKey, AI_MODEL_LABELS, type DetectedItem } from '../lib/ai'
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
      {tab === 'scan' && (
        <ScanTab
          meal={meal}
          onPick={setSelected}
          onManual={() => setTab('manual')}
          onLogAll={(items) => { items.forEach((it) => addFoodLog(meal, it.food, it.grams)); done() }}
        />
      )}

      {selected && (
        <ServingSheet
          food={selected}
          mealLabel={meal}
          saved={isSavedFood(savedFoods, selected)}
          onToggleSave={() => toggleSavedFood(selected)}
          onCancel={() => setSelected(null)}
          onConfirm={(grams) => { addFoodLog(meal, selected, grams); done() }}
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

function ScanTab({ meal, onPick, onManual, onLogAll }: { meal: Meal; onPick: (f: Food) => void; onManual: () => void; onLogAll: (items: DetectedItem[]) => void }) {
  const [mode, setMode] = useState<'choose' | 'barcode' | 'photo'>('choose')

  if (mode === 'barcode') return <BarcodeFlow onFound={onPick} onManual={onManual} onBack={() => setMode('choose')} />
  if (mode === 'photo') return <PhotoFlow meal={meal} onLogAll={onLogAll} onBack={() => setMode('choose')} />

  return (
    <div className="space-y-3">
      <BigChoice icon={<ScanBarcode size={22} className="text-gold" />} title="Scan barcode" desc="Packaged foods via Open Food Facts" onClick={() => setMode('barcode')} />
      <BigChoice icon={<Camera size={22} className="text-oasis-water" />} title="Snap a meal" desc="Estimate macros from a photo with AI" badge="AI" onClick={() => setMode('photo')} />
    </div>
  )
}

function BigChoice({ icon, title, desc, badge, onClick }: { icon: React.ReactNode; title: string; desc: string; badge?: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full glass p-4 flex items-center gap-4 text-left active:scale-[0.99] transition">
      <div className="grid place-items-center w-12 h-12 rounded-2xl bg-sand-800/50 shrink-0">{icon}</div>
      <div className="flex-1">
        <p className="text-sand-50 font-medium flex items-center gap-2">
          {title}
          {badge && <span className="chip text-oasis-water border-oasis-water/40 bg-oasis-water/5 !py-0.5">{badge}</span>}
        </p>
        <p className="text-sand-200/55 text-xs mt-0.5">{desc}</p>
      </div>
      <ChevronRight size={18} className="text-sand-300/40" />
    </button>
  )
}

function BarcodeFlow({ onFound, onManual, onBack }: { onFound: (f: Food) => void; onManual: () => void; onBack: () => void }) {
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
  return (
    <div>
      <BarcodeScanner onDetect={handle} onClose={onBack} />
      <button onClick={onBack} className="block mx-auto mt-3 text-sand-200/60 text-sm">← Back</button>
    </div>
  )
}

function PhotoFlow({ meal, onLogAll, onBack }: { meal: Meal; onLogAll: (items: DetectedItem[]) => void; onBack: () => void }) {
  const aiModel = useStore((s) => s.aiModel)
  const aiUsage = useStore((s) => s.aiUsage)
  const recordAiScan = useStore((s) => s.recordAiScan)
  const fileRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [items, setItems] = useState<DetectedItem[] | null>(null)
  const [error, setError] = useState('')

  const scansToday = aiScansToday(aiUsage)
  const capReached = scansToday >= AI_DAILY_CAP
  const keyOk = hasApiKey()

  const pick = (f: File) => {
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setItems(null)
    setError('')
  }

  const analyze = async () => {
    if (!file || busy || capReached || !keyOk) return
    setBusy(true)
    setError('')
    try {
      const { base64, mediaType } = await downscaleImage(file)
      recordAiScan() // count before the call so a failure still counts against runaway loops
      const result = await analyzeFoodPhoto(base64, mediaType, aiModel)
      if (result.length === 0) setError('No food detected — try a clearer photo or add manually.')
      else setItems(result)
    } catch (e) {
      const msg = (e as Error)?.message || ''
      setError(/401|authentication|invalid/i.test(msg) ? 'Invalid API key — check it in You → AI scanner.' : /credit|billing|quota/i.test(msg) ? 'Your Anthropic account needs credit.' : 'Could not analyze the photo. Try again.')
    }
    setBusy(false)
  }

  // ---- review state ----
  if (items) return <PhotoReview items={items} meal={meal} onLogAll={onLogAll} onRetake={() => { setItems(null); setPreview(null); setFile(null) }} />

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-sand-200/60 text-sm">← Back</button>

      {!keyOk && (
        <div className="glass p-4 text-sm text-sand-200/75">
          To estimate macros from a photo, add your AI key in{' '}
          <Link to="/you" className="text-gold underline">You → AI scanner</Link>. It's stored only on this device.
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files?.[0] && pick(e.target.files[0])} />

      {preview ? (
        <div className="glass overflow-hidden">
          <img src={preview} alt="meal" className="w-full max-h-72 object-cover" />
          <div className="p-3 flex items-center justify-between">
            <button onClick={() => fileRef.current?.click()} className="text-sand-200/60 text-sm flex items-center gap-1.5"><Camera size={15} /> Retake</button>
            <button onClick={analyze} disabled={busy || capReached || !keyOk} className="btn-gold flex items-center gap-2 text-sm disabled:opacity-40">
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} {busy ? 'Analyzing…' : 'Analyze'}
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => fileRef.current?.click()} className="w-full glass p-8 flex flex-col items-center gap-3 active:scale-[0.99] transition">
          <div className="grid place-items-center w-16 h-16 rounded-3xl bg-gold/15 shadow-glow"><Camera size={30} className="text-gold" /></div>
          <p className="text-sand-50 font-medium">Take or choose a photo</p>
          <p className="text-sand-200/50 text-xs text-center">Point at your meal — the AI estimates the macros, then you adjust.</p>
        </button>
      )}

      {error && <p className="text-dusk-rose text-sm text-center">{error}</p>}

      <p className="text-center text-sand-200/40 text-xs">
        {AI_MODEL_LABELS[aiModel]} · {scansToday}/{AI_DAILY_CAP} scans today{capReached ? ' · daily limit reached' : ''}
      </p>
    </div>
  )
}

function PhotoReview({ items, meal, onLogAll, onRetake }: { items: DetectedItem[]; meal: Meal; onLogAll: (items: DetectedItem[]) => void; onRetake: () => void }) {
  const [list, setList] = useState<DetectedItem[]>(items)
  const totalKcal = Math.round(list.reduce((a, it) => a + (scaleNutrients(it.food.per100g, it.grams).kcal ?? 0), 0))

  const setGrams = (i: number, grams: number) => setList((l) => l.map((it, j) => (j === i ? { ...it, grams } : it)))
  const remove = (i: number) => setList((l) => l.filter((_, j) => j !== i))

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="eyebrow">Estimated · adjust & add</p>
        <button onClick={onRetake} className="text-sand-200/60 text-sm flex items-center gap-1.5"><Camera size={14} /> Retake</button>
      </div>

      {list.map((it, i) => {
        const n = scaleNutrients(it.food.per100g, it.grams)
        return (
          <div key={i} className="glass-soft p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sand-50 text-sm font-medium flex-1 min-w-0 truncate">{it.food.name}</p>
              <button onClick={() => remove(i)} className="text-sand-300/40 hover:text-dusk-rose p-1"><X size={15} /></button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                inputMode="numeric"
                value={String(it.grams)}
                onChange={(e) => setGrams(i, Number(e.target.value.replace(/\D/g, '')) || 0)}
                className="w-16 text-center bg-sand-800/40 border border-sand-600/40 rounded-lg py-1.5 text-sand-50 outline-none focus:border-gold/50"
              />
              <span className="text-sand-200/50 text-xs">g</span>
              <span className="text-sand-200/55 text-xs ml-auto">{Math.round(n.kcal ?? 0)} kcal · P{Math.round(n.protein ?? 0)} C{Math.round(n.carbs ?? 0)} F{Math.round(n.fat ?? 0)}</span>
            </div>
          </div>
        )
      })}

      {list.length === 0 ? (
        <p className="text-sand-200/50 text-sm text-center py-4">No items left. <button onClick={onRetake} className="text-gold">Retake</button></p>
      ) : (
        <button onClick={() => onLogAll(list)} className="btn-gold w-full flex items-center justify-center gap-2">
          <Plus size={18} /> Add {list.length} item{list.length > 1 ? 's' : ''} to {meal} · {totalKcal} kcal
        </button>
      )}
      <p className="text-center text-sand-200/35 text-xs">AI estimate — check the amounts before logging.</p>
    </div>
  )
}
