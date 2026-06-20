import SEO from '../components/SEO.jsx'
import PageHeader from '../components/PageHeader.jsx'
import FAQ from '../components/FAQ.jsx'
import CTA from '../components/CTA.jsx'

export default function FAQPage() {
  const breadcrumbs = [
    { name: 'Strona główna', path: '/' },
    { name: 'FAQ', path: '/faq' }
  ]
  return (
    <>
      <SEO title="FAQ — najczęstsze pytania" description="Odpowiedzi na najczęstsze pytania o organizację imprez firmowych, wycenę, terminy realizacji i zakres usług FALP Event." path="/faq" breadcrumbs={breadcrumbs} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        chip="FAQ"
        title="Pytania i"
        highlight="odpowiedzi"
        subtitle="Wszystko, co musisz wiedzieć o współpracy z agencją FALP Event."
      />
      <FAQ />
      <CTA />
    </>
  )
}
