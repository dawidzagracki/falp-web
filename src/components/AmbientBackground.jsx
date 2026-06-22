/**
 * Animowane tło całej strony — dryfujące zielone „orby" + siatka + drobne punkty.
 * Fixed, za treścią, nieinteraktywne.
 *
 * WYDAJNOŚĆ: animacje są wyłącznie translacją (transform) + will-change, więc warstwy
 * są kompozytowane na GPU bez re-rasteryzacji — płynne także na telefonie.
 * Respektują prefers-reduced-motion (index.css zatrzymuje animacje).
 */
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none animate-fade-in" aria-hidden>
      <div className="absolute -top-32 -left-24 h-[30rem] w-[30rem] lg:h-[44rem] lg:w-[44rem] rounded-full bg-brand/30 blur-[80px] lg:blur-[110px] animate-aurora [will-change:transform] [transform:translateZ(0)]" />
      <div className="absolute top-1/4 -right-28 h-[26rem] w-[26rem] lg:h-[40rem] lg:w-[40rem] rounded-full bg-brand-light/30 blur-[80px] lg:blur-[110px] animate-aurora [will-change:transform] [transform:translateZ(0)]" style={{ animationDelay: '-6s', animationDuration: '20s' }} />
      <div className="absolute bottom-0 left-1/4 h-[24rem] w-[24rem] lg:h-[36rem] lg:w-[36rem] rounded-full bg-brand/24 blur-[80px] lg:blur-[110px] animate-aurora [will-change:transform] [transform:translateZ(0)]" style={{ animationDelay: '-12s', animationDuration: '24s' }} />
      <div className="hidden lg:block absolute top-1/2 left-1/2 h-[30rem] w-[30rem] rounded-full bg-brand-dark/20 blur-[120px] animate-aurora [will-change:transform]" style={{ animationDelay: '-3s', animationDuration: '28s' }} />

      {/* siatka — dryf (translacja) */}
      <div className="absolute inset-0 opacity-90 grid-bg animate-drift [will-change:transform]" />

      {/* drobne unoszące się punkty (transform translateY) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-brand-dark/40 animate-float [will-change:transform]"
          style={{
            left: `${(i * 79) % 96}%`,
            top: `${(i * 43 + 8) % 92}%`,
            width: `${4 + (i % 3) * 2}px`,
            height: `${4 + (i % 3) * 2}px`,
            animationDelay: `${(i % 6) * 0.7}s`,
            animationDuration: `${5 + (i % 5)}s`
          }}
        />
      ))}
    </div>
  )
}
