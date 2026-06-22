/**
 * Animowane tło całej strony — dryfujące zielone „orby" + siatka + drobne punkty.
 * Fixed, za treścią, nieinteraktywne.
 *
 * WYDAJNOŚĆ (kluczowe dla mobile): na telefonie tło jest CAŁKOWICIE STATYCZNE
 * (2 rozmyte orby, raz wyrasteryzowane) — bez animacji, bez will-change, bez kropek.
 * Pełna animacja (orby + siatka + punkty) włącza się dopiero od `lg` (desktop),
 * gdzie jest moc GPU. Dzięki temu główny wątek/GPU telefonu są wolne → UI reaguje od razu.
 */
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none animate-fade-in" aria-hidden>
      <div className="absolute -top-32 -left-24 h-[26rem] w-[26rem] lg:h-[44rem] lg:w-[44rem] rounded-full bg-brand/30 blur-[70px] lg:blur-[110px] lg:animate-aurora" />
      <div className="absolute top-1/4 -right-28 h-[24rem] w-[24rem] lg:h-[40rem] lg:w-[40rem] rounded-full bg-brand-light/30 blur-[70px] lg:blur-[110px] lg:animate-aurora" style={{ animationDelay: '-6s', animationDuration: '20s' }} />

      {/* poniżej — tylko desktop (lg+) */}
      <div className="hidden lg:block absolute bottom-0 left-1/4 h-[36rem] w-[36rem] rounded-full bg-brand/24 blur-[110px] animate-aurora" style={{ animationDelay: '-12s', animationDuration: '24s' }} />
      <div className="hidden lg:block absolute top-1/2 left-1/2 h-[30rem] w-[30rem] rounded-full bg-brand-dark/20 blur-[120px] animate-aurora" style={{ animationDelay: '-3s', animationDuration: '28s' }} />
      <div className="hidden lg:block absolute inset-0 opacity-90 grid-bg animate-drift" />
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="hidden lg:block absolute rounded-full bg-brand-dark/40 animate-float"
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
