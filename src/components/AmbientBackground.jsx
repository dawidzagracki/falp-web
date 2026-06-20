/**
 * Animowane tło całej strony — dryfujące, mocniej widoczne zielone „orby"
 * + ruchoma siatka + drobne unoszące się punkty. Fixed, za treścią, nieinteraktywne.
 * Szanuje prefers-reduced-motion (CSS w index.css zatrzymuje animacje).
 */
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute -top-32 -left-24 h-[44rem] w-[44rem] rounded-full bg-brand/35 blur-[110px] animate-aurora" />
      <div className="absolute top-1/4 -right-28 h-[40rem] w-[40rem] rounded-full bg-brand-light/35 blur-[110px] animate-aurora" style={{ animationDelay: '-6s', animationDuration: '20s' }} />
      <div className="absolute bottom-0 left-1/4 h-[36rem] w-[36rem] rounded-full bg-brand/28 blur-[110px] animate-aurora" style={{ animationDelay: '-12s', animationDuration: '24s' }} />
      <div className="absolute top-1/2 left-1/2 h-[30rem] w-[30rem] rounded-full bg-brand-dark/20 blur-[120px] animate-aurora" style={{ animationDelay: '-3s', animationDuration: '28s' }} />

      {/* ruchoma siatka */}
      <div className="absolute inset-0 opacity-90 grid-bg animate-drift" />

      {/* drobne unoszące się punkty */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-brand-dark/40 animate-float"
          style={{
            left: `${(i * 53) % 97}%`,
            top: `${(i * 37 + 8) % 92}%`,
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
