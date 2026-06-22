/**
 * Wielkie napisy w tle hero. Czysty CSS marquee — animacja tylko na desktopie (lg+),
 * na mobile statyczne (zero ciągłej pracy). Bez biblioteki animacji.
 */
const rows = [
  { words: ['EVENTY', 'GALE', 'KONFERENCJE'], rev: false, fill: false },
  { words: ['PREMIERY', 'INTEGRACJE', 'TARGI'], rev: true, fill: true },
  { words: ['KONGRESY', 'PIKNIKI', 'POKAZY'], rev: false, fill: false },
  { words: ['EMOCJE', 'ENERGIA', 'PASJA'], rev: true, fill: true },
  { words: ['WE CREATE MEMORIES'], rev: false, fill: false }
]

export default function HeroMarquee() {
  return (
    <div className="absolute inset-0 -z-10 flex flex-col justify-center gap-[0.5vw] overflow-hidden pointer-events-none select-none" aria-hidden>
      {rows.map((r, i) => {
        const base = [...r.words, ...r.words, ...r.words, ...r.words]
        return (
          <div key={i} className="flex overflow-hidden">
            <div
              className={`flex shrink-0 gap-10 pr-10 ${r.rev ? 'lg:animate-marquee-reverse' : 'lg:animate-marquee'}`}
              style={{ width: 'max-content' }}
            >
              {[...base, ...base].map((wd, j) => (
                <span
                  key={j}
                  className={`text-[8.5vw] font-black font-display leading-[1.04] tracking-tight ${r.fill ? 'text-brand/[0.16]' : 'text-transparent'}`}
                  style={r.fill ? undefined : { WebkitTextStroke: '2.5px rgba(70,144,31,0.32)' }}
                >
                  {wd} <span className="text-brand/40">✦</span>
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
