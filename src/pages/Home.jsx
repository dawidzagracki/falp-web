import { lazy, Suspense, useEffect } from 'react'
import SEO from '../components/SEO.jsx'
import Hero from '../components/Hero.jsx'
import Stats from '../components/Stats.jsx'

// Reszta strony (z framer-motion) w osobnym chunku — nie obciąża pierwszego wczytania
const HomeBelowFold = lazy(() => import('../components/HomeBelowFold.jsx'))

export default function Home() {
  // wstępne pobranie reszty po pierwszym renderze (gotowe zanim doscrollujesz)
  useEffect(() => {
    const t = setTimeout(() => { import('../components/HomeBelowFold.jsx') }, 800)
    return () => clearTimeout(t)
  }, [])

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FALP Event',
    url: 'https://falp.pl/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://falp.pl/realizacje?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <SEO schema={schema} />
      <Hero />
      <Stats />
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <HomeBelowFold />
      </Suspense>
    </>
  )
}
