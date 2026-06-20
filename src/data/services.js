export const services = [
  {
    slug: 'agencja-artystyczna',
    title: 'Agencja artystyczna',
    short: 'Muzycy, konferansjerzy, kabarety, pokazy artystyczne.',
    icon: 'Music',
    color: 'from-pink-500/20 to-brand/20',
    bullets: [
      'Zespoły muzyczne i DJ-e na każdą okazję',
      'Konferansjerzy, prowadzący, mistrzowie ceremonii',
      'Kabarety, stand-up i występy komediowe',
      'Pokazy taneczne, akrobatyczne, iluzjonistyczne',
      'Artystyczne oprawy gali i imprez firmowych'
    ],
    description: 'Tworzymy artystyczną oprawę Twojego wydarzenia. Współpracujemy z najlepszymi muzykami, prowadzącymi i artystami w Polsce — dobieramy ich indywidualnie do charakteru imprezy.'
  },
  {
    slug: 'imprezy-firmowe',
    title: 'Imprezy firmowe',
    short: 'Integracje, team building, wyjazdy, pikniki rodzinne.',
    icon: 'PartyPopper',
    color: 'from-brand/20 to-emerald-500/20',
    bullets: [
      'Integracje i wyjazdy team buildingowe',
      'Pikniki rodzinne i imprezy plenerowe',
      'Wigilie firmowe, bale, gale jubileuszowe',
      'Konferencje połączone z eventem wieczornym',
      'Pełna logistyka, catering, scenografia'
    ],
    description: 'Organizujemy imprezy firmowe, które integrują zespół i budują kulturę organizacji. Od kameralnych spotkań po wielkie gale dla tysięcy gości.'
  },
  {
    slug: 'pr-events',
    title: 'PR Events',
    short: 'Premiery, otwarcia, targi, konferencje, kongresy.',
    icon: 'Megaphone',
    color: 'from-amber-500/20 to-brand/20',
    bullets: [
      'Premiery produktów i otwarcia salonów',
      'Konferencje prasowe i prezentacje',
      'Targi, kongresy, sympozja branżowe',
      'Inauguracje, wernisaże, eventy launchowe',
      'Pełna obsługa medialna i fotograficzna'
    ],
    description: 'Realizujemy wydarzenia PR z dbałością o każdy szczegół — Twoja marka zasługuje na premierę, o której będzie się mówić.'
  },
  {
    slug: 'technika-sceniczna',
    title: 'Technika sceniczna',
    short: 'Scena, oświetlenie, nagłośnienie, multimedia, LED.',
    icon: 'Lightbulb',
    color: 'from-blue-500/20 to-brand/20',
    bullets: [
      'Sceny modułowe, zadaszenia, konstrukcje',
      'Profesjonalne oświetlenie sceniczne i efekty',
      'Nagłośnienie line array, mikrofony, miksery',
      'Ekrany LED — ponad 100 m² w naszym parku',
      'Realizacja multimedialna, streaming, VR'
    ],
    description: 'Nasz park technologiczny to ponad 100 ekranów LED, profesjonalne nagłośnienie i oświetlenie. Realizujemy techniczną oprawę największych eventów na Śląsku.'
  },
  {
    slug: 'agencja-reklamowa',
    title: 'Agencja reklamowa',
    short: 'Kampanie, grafika, fotografia, wideo, produkcja.',
    icon: 'Camera',
    color: 'from-purple-500/20 to-brand/20',
    bullets: [
      'Kampanie reklamowe — koncepcja i realizacja',
      'Identyfikacja wizualna i projektowanie graficzne',
      'Fotografia eventowa, produktowa, reportażowa',
      'Produkcja filmowa, aftermovie, spoty reklamowe',
      'Social media i materiały marketingowe'
    ],
    description: 'Łączymy event z komunikacją marki. Tworzymy materiały, które żyją długo po zakończeniu wydarzenia.'
  },
  {
    slug: 'hostessy-hosci',
    title: 'Hostessy i hości',
    short: 'Promotorki, animatorki, modelki, obsługa eventów.',
    icon: 'Users',
    color: 'from-rose-500/20 to-brand/20',
    bullets: [
      'Hostessy targowe i konferencyjne',
      'Promotorki produktów i akcji marketingowych',
      'Animatorzy dla dzieci i dorosłych',
      'Modelki i modele do sesji fotograficznych',
      'Pełna obsługa recepcyjna eventów'
    ],
    description: 'Zespół przeszkolonych hostess i hostów, którzy zadbają o pierwsze wrażenie i komfort Twoich gości.'
  }
]

export const getService = (slug) => services.find(s => s.slug === slug)
