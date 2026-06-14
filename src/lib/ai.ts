// On-device AI food-photo analysis via the user's own Anthropic key.
// Cost safeguards: the image is downscaled to <=1024px and the response is
// capped at 700 tokens, so a scan is well under 1¢ on Haiku and a few ¢ on Opus.
import { foodFromServing, type Food } from './nutrition'

const KEY_STORAGE = 'oasis-ai-key'

export type AiModel = 'haiku' | 'sonnet' | 'opus'
export const AI_MODEL_IDS: Record<AiModel, string> = {
  haiku: 'claude-haiku-4-5',
  sonnet: 'claude-sonnet-4-6',
  opus: 'claude-opus-4-8',
}
export const AI_MODEL_LABELS: Record<AiModel, string> = {
  haiku: 'Haiku · cheapest (~0.5¢)',
  sonnet: 'Sonnet · balanced (~2¢)',
  opus: 'Opus · most accurate (~3¢)',
}

// The API key lives in its own localStorage entry — never in the exportable
// store, so a shared backup can't leak it.
export const getApiKey = (): string => localStorage.getItem(KEY_STORAGE) ?? ''
export const setApiKey = (k: string) => (k ? localStorage.setItem(KEY_STORAGE, k.trim()) : localStorage.removeItem(KEY_STORAGE))
export const hasApiKey = (): boolean => getApiKey().length > 10

export interface DetectedItem {
  food: Food
  grams: number
}

/** Downscale an image File to a JPEG base64 string (long edge <= maxDim). */
export function downscaleImage(file: File, maxDim = 1024): Promise<{ base64: string; mediaType: 'image/jpeg' }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
      const w = Math.round(img.width * scale)
      const h = Math.round(img.height * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas unavailable'))
      ctx.drawImage(img, 0, 0, w, h)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82)
      resolve({ base64: dataUrl.split(',')[1], mediaType: 'image/jpeg' })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read image'))
    }
    img.src = url
  })
}

const PROMPT = `You are a nutrition estimator. Look at this food photo and estimate its nutrition.
Return ONLY a JSON object (no prose, no markdown) in exactly this shape:
{"items":[{"name":"string","grams":number,"kcal":number,"protein":number,"carbs":number,"fat":number}],"note":"short caveat"}
Rules:
- Break the meal into its main components (e.g. flatbread, kebab meat, garlic sauce, salad), or a single item if it's simple.
- "grams" = your best estimate of the edible weight of that component shown.
- kcal/protein/carbs/fat are the TOTALS for that component at that weight (NOT per 100g).
- Judge portion size from visual cues (the hand, packaging, plate, bread size).
- Always give your single best estimate. Never refuse or ask questions.`

/** Analyze a food photo and return detected items as editable Foods. */
export async function analyzeFoodPhoto(base64: string, mediaType: 'image/jpeg', model: AiModel): Promise<DetectedItem[]> {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error('NO_KEY')

  const Anthropic = (await import('@anthropic-ai/sdk')).default
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })

  const res = await client.messages.create({
    model: AI_MODEL_IDS[model],
    max_tokens: 700, // hard cap on output cost
    messages: [
      {
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text', text: PROMPT },
        ],
      },
    ],
  })

  const text = res.content.map((b) => (b.type === 'text' ? b.text : '')).join('')

  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start < 0 || end < 0) throw new Error('Could not read the estimate — try again.')
  const data = JSON.parse(text.slice(start, end + 1))
  const items: any[] = Array.isArray(data?.items) ? data.items : []

  return items
    .filter((it) => it && it.name && Number(it.grams) > 0)
    .map((it) => ({
      grams: Math.round(Number(it.grams)),
      food: foodFromServing(String(it.name), Math.round(Number(it.grams)) || 100, {
        kcal: Number(it.kcal) || 0,
        protein: Number(it.protein) || 0,
        carbs: Number(it.carbs) || 0,
        fat: Number(it.fat) || 0,
      }),
    }))
}
