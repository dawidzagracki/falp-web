import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, path = '', image, schema, breadcrumbs }) {
  const full = title ? `${title} — FALP Event` : 'FALP Event — Agencja eventowa Śląsk | Organizacja imprez firmowych'
  const desc = description || 'Agencja eventowa z 15-letnim doświadczeniem. Imprezy firmowe, eventy, konferencje i gale na najwyższym poziomie.'
  const url = `https://falp.pl${path}`
  const og = image || 'https://falp.pl/og-image.jpg'

  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={full} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={og} />

      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={og} />

      {breadcrumbs && (
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((b, i) => ({
            '@type': 'ListItem', position: i + 1, name: b.name, item: `https://falp.pl${b.path}`
          }))
        })}</script>
      )}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  )
}
