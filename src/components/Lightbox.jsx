import { useEffect, useRef, useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'

/**
 * Pełnoekranowa galeria (lightbox) — mobile-first.
 * Props: event { title, media:[{type,src,thumb?}] }, startIndex, onClose
 * - swipe na telefonie, strzałki + klawiatura na desktopie, licznik, obsługa wideo
 */
export default function Lightbox({ event, startIndex = 0, onClose }) {
  const media = event?.media || []
  const [index, setIndex] = useState(startIndex)
  const touch = useRef({ x: 0, y: 0 })

  const clamp = useCallback((i) => (i + media.length) % media.length, [media.length])
  const next = useCallback(() => setIndex(i => clamp(i + 1)), [clamp])
  const prev = useCallback(() => setIndex(i => clamp(i - 1)), [clamp])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose, next, prev])

  if (!event || media.length === 0) return null
  const current = media[index]

  const onTouchStart = (e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : prev() }
  }

  return (
    <div className="fixed inset-0 z-[70] bg-ink-950/95 backdrop-blur-sm flex flex-col animate-fade-in" role="dialog" aria-label={`Galeria: ${event.title}`}>
      {/* Górny pasek */}
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 h-16 shrink-0 text-white">
        <div className="min-w-0">
          <h3 className="font-bold text-sm sm:text-base truncate">{event.title}</h3>
          <p className="text-xs text-white/60">{index + 1} / {media.length}</p>
        </div>
        <button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition shrink-0" aria-label="Zamknij galerię">
          <X size={20} />
        </button>
      </div>

      {/* Scena */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-4 select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        {current.type === 'video' ? (
          <video
            key={current.src}
            src={current.src}
            controls
            playsInline
            preload="none"
            poster={event.cover || undefined}
            className="max-h-full max-w-full rounded-lg bg-black"
          />
        ) : (
          <img
            key={current.src}
            src={current.src}
            alt={`${event.title} — zdjęcie ${index + 1}`}
            className="max-h-full max-w-full object-contain rounded-lg"
            draggable={false}
          />
        )}

        {media.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full bg-white/10 hover:bg-brand hover:text-ink-900 text-white transition" aria-label="Poprzednie">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full bg-white/10 hover:bg-brand hover:text-ink-900 text-white transition" aria-label="Następne">
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Miniatury (desktop) */}
      {media.length > 1 && (
        <div className="hidden sm:flex gap-2 overflow-x-auto scrollbar-hide px-6 py-4 shrink-0 justify-center">
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`relative h-16 w-16 shrink-0 rounded-lg overflow-hidden ring-2 transition ${i === index ? 'ring-brand' : 'ring-transparent opacity-60 hover:opacity-100'}`}
              aria-label={`Przejdź do ${i + 1}`}
            >
              {m.type === 'video'
                ? <span className="absolute inset-0 grid place-items-center bg-ink-800 text-white"><Play size={18} fill="currentColor" /></span>
                : <img src={m.thumb || m.src} alt="" className="h-full w-full object-cover" loading="lazy" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
