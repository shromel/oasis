import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader, type IScannerControls } from '@zxing/browser'
import { X } from 'lucide-react'

/** Live camera barcode scanner (zxing). Calls onDetect with the first code. */
export default function BarcodeScanner({ onDetect, onClose }: { onDetect: (code: string) => void; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const reader = new BrowserMultiFormatReader()
    let controls: IScannerControls | undefined
    let active = true

    reader
      .decodeFromVideoDevice(undefined, videoRef.current!, (result) => {
        if (result && active) {
          active = false
          controls?.stop()
          onDetect(result.getText())
        }
      })
      .then((c) => {
        controls = c
        if (!active) c.stop()
      })
      .catch((e) => setError(e?.message || 'Camera unavailable — allow camera access or add the food manually.'))

    return () => {
      active = false
      try {
        controls?.stop()
      } catch {
        /* noop */
      }
    }
  }, [onDetect])

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black aspect-[3/4]">
      <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
      {/* aiming frame */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="w-3/4 h-28 border-2 border-gold/80 rounded-xl shadow-glow" />
      </div>
      <button onClick={onClose} className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-black/50 text-sand-50">
        <X size={18} />
      </button>
      {error ? (
        <div className="absolute inset-x-0 bottom-0 p-4 bg-black/70 text-sand-100 text-sm text-center">{error}</div>
      ) : (
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-sand-200/80 text-xs text-center">
          Point at a barcode
        </div>
      )}
    </div>
  )
}
