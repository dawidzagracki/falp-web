import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] grid place-items-center pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg -z-10" />
      <div className="container-x text-center">
        <div className="text-[10rem] font-black grad-text leading-none">404</div>
        <h1 className="text-3xl lg:text-4xl font-black mb-4 text-ink-900">Nie znaleziono strony</h1>
        <p className="text-ink-muted max-w-md mx-auto mb-8">Strona, której szukasz, mogła zostać przeniesiona lub usunięta.</p>
        <Link to="/" className="btn-primary"><ArrowLeft size={18} /> Wróć na stronę główną</Link>
      </div>
    </section>
  )
}
