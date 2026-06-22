/**
 * Wielkie napisy w tle hero — STATYCZNE (bez animacji).
 * Ciągłe przesuwanie ogromnych warstw tekstu tnie stronę (kompozycja wielkich tekstur),
 * więc tło jest nieruchome: rasteryzuje się raz, zero kosztu na klatkę. Lekki DOM.
 */
const rows = [
  { words: ['EVENTY', 'GALE', 'KONFERENCJE'], fill: false },
  { words: ['PREMIERY', 'INTEGRACJE', 'TARGI'], fill: true },
  { words: ['KONGRESY', 'PIKNIKI', 'POKAZY'], fill: false },
  { words: ['EMOCJE', 'ENERGIA', 'PASJA'], fill: true },
  { words: ['WE CREATE MEMORIES'], fill: false }
]

export default function HeroMarquee() {
  return (
    <div className="absolute inset-0 -z-10 flex flex-col justify-center gap-[0.5vw] overflow-hidden pointer-events-none select-none" aria-hidden>
      {rows.map((r, i) => (
        <div key={i} className="flex gap-10 whitespace-nowrap overflow-hidden" style={{ transform: i % 2 ? 'translateX(-8%)' : 'translateX(-2%)' }}>
          {[...r.words, ...r.words].map((wd, j) => (
            <span
              key={j}
              className={`shrink-0 text-[8.5vw] font-black font-display leading-[1.04] tracking-tight ${r.fill ? 'text-brand/[0.14]' : 'text-transparent'}`}
              style={r.fill ? undefined : { WebkitTextStroke: '2.5px rgba(70,144,31,0.30)' }}
            >
              {wd} <span className="text-brand/40">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
