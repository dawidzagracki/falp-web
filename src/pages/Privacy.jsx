import SEO from '../components/SEO.jsx'
import PageHeader from '../components/PageHeader.jsx'

const sections = [
  {
    h: '1. Administrator danych',
    body: [
      'Administratorem Twoich danych osobowych jest FALP Event z siedzibą w Będzinie (42-500), NIP: 0000000000.',
      'Kontakt w sprawach związanych z ochroną danych: biuro@falp.pl, tel. 790 880 421.'
    ]
  },
  {
    h: '2. Cel i podstawa prawna przetwarzania',
    body: [
      'Twoje dane przetwarzamy w następujących celach:',
      '• odpowiedź na zapytanie wysłane przez formularz kontaktowy (art. 6 ust. 1 lit. b i f RODO),',
      '• realizacja zawartej umowy (art. 6 ust. 1 lit. b RODO),',
      '• marketing bezpośredni — tylko za Twoją zgodą (art. 6 ust. 1 lit. a RODO),',
      '• cele analityczne i statystyczne (uzasadniony interes administratora — art. 6 ust. 1 lit. f RODO).'
    ]
  },
  {
    h: '3. Okres przechowywania danych',
    body: [
      'Dane z formularza kontaktowego przechowujemy przez okres niezbędny do udzielenia odpowiedzi, nie dłużej niż 24 miesiące.',
      'Dane związane z realizacją umowy przechowujemy zgodnie z obowiązującymi przepisami (m.in. podatkowymi — 5 lat).'
    ]
  },
  {
    h: '4. Twoje prawa',
    body: [
      'Masz prawo do:',
      '• dostępu do swoich danych i otrzymania ich kopii,',
      '• sprostowania danych,',
      '• usunięcia danych ("prawo do bycia zapomnianym"),',
      '• ograniczenia przetwarzania,',
      '• przenoszenia danych,',
      '• sprzeciwu wobec przetwarzania,',
      '• cofnięcia zgody w dowolnym momencie,',
      '• wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (uodo.gov.pl).'
    ]
  },
  {
    h: '5. Odbiorcy danych',
    body: [
      'Odbiorcami Twoich danych mogą być:',
      '• podmioty świadczące usługi hostingowe i IT,',
      '• dostawcy poczty elektronicznej,',
      '• biuro rachunkowe,',
      '• organy państwowe, gdy wynika to z przepisów prawa.',
      'Nie przekazujemy danych poza Europejski Obszar Gospodarczy.'
    ]
  },
  {
    h: '6. Pliki cookies',
    body: [
      'Strona używa plików cookies w celu zapewnienia poprawnego działania oraz w celach analitycznych i marketingowych.',
      'Wyróżniamy trzy kategorie cookies:',
      '• Niezbędne — wymagane do działania strony.',
      '• Analityczne — pomagają nam zrozumieć, jak użytkownicy korzystają ze strony (m.in. Google Analytics).',
      '• Marketingowe — używane do wyświetlania spersonalizowanych treści oraz osadzania feedów social media (Instagram, Facebook).',
      'Możesz zarządzać preferencjami cookies w każdej chwili — odpowiedni banner pojawi się przy pierwszej wizycie. Możesz też wyłączyć cookies w ustawieniach przeglądarki.'
    ]
  },
  {
    h: '7. Bezpieczeństwo',
    body: [
      'Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane osobowe przed nieuprawnionym dostępem, utratą czy zniszczeniem.',
      'Połączenie ze stroną jest szyfrowane protokołem SSL/HTTPS.'
    ]
  },
  {
    h: '8. Zmiany w polityce prywatności',
    body: [
      'Niniejsza polityka może być aktualizowana. O istotnych zmianach poinformujemy poprzez stronę internetową.',
      'Data ostatniej aktualizacji: 1 maja 2026 r.'
    ]
  }
]

export default function Privacy() {
  const breadcrumbs = [
    { name: 'Strona główna', path: '/' },
    { name: 'Polityka prywatności', path: '/polityka-prywatnosci' }
  ]
  return (
    <>
      <SEO title="Polityka prywatności" description="Polityka prywatności FALP Event — informacje o przetwarzaniu danych osobowych zgodnie z RODO." path="/polityka-prywatnosci" breadcrumbs={breadcrumbs} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        chip="Dokumenty"
        title="Polityka"
        highlight="prywatności"
        subtitle="Informacje o tym, jak przetwarzamy Twoje dane osobowe — zgodnie z RODO."
      />

      <section className="pb-16 sm:pb-20">
        <div className="container-x max-w-4xl">
          <div className="card p-6 sm:p-10 space-y-8">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 text-brand-text">{s.h}</h2>
                <div className="space-y-2 text-ink-700 leading-relaxed text-pretty">
                  {s.body.map((p, j) => <p key={j} className="whitespace-pre-line">{p}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
