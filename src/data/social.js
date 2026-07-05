// Konfiguracja feedu social media (Instagram + Facebook).
//
// Bez backendu używamy zewnętrznego agregatora (Curator.io — łączy IG + FB w jeden „social wall").
// Meta (Instagram/Facebook) nie udostępnia już publicznego API do pobierania postów bez logowania,
// więc ŻYWY feed wymaga jednorazowego podłączenia kont przez providera:
//
// JAK URUCHOMIĆ ŻYWY FEED (ok. 5 min):
// 1. Wejdź na https://curator.io i załóż darmowe konto.
// 2. „Create a Feed" → jako źródło dodaj Instagram (@falpevent) ORAZ stronę Facebook (zaloguj się do Meta i autoryzuj).
// 3. Skopiuj „Feed ID" (Settings → Feed ID, np. 'aa11bb22-...').
// 4. Wklej go poniżej w `feedId` i zostaw `provider: 'curator'`.
// Do czasu podania feedId strona pokazuje stylowy podgląd (zdjęcia z realizacji) + linki do profili.

export const social = {
  provider: 'curator',          // 'curator' | 'behold'
  feedId: '',                   // <-- WKLEJ tu Feed ID z Curator.io

  instagram: 'https://www.instagram.com/falpevent/',
  facebook: 'https://www.facebook.com/falpevent',   // <-- podmień, jeśli strona FB ma inny adres
  instagramHandle: '@falpevent',

  // Podgląd (zdjęcia z realizacji) — pokazywany do czasu podłączenia żywego feedu.
  fallbackPosts: [
    { id: 1, caption: 'Sosnowiecka Gala Sportowa', image: '/realizacje/sosnowiecka-gala-sportowa/thumb-01.webp' },
    { id: 2, caption: 'The Syde', image: '/realizacje/the-syde/thumb-01.webp' },
    { id: 3, caption: 'Nocny maraton Zagłębiowski', image: '/realizacje/nocny-maraton-zaglebiowski/thumb-01.webp' },
    { id: 4, caption: 'Katowice na talerzu', image: '/realizacje/katowice-na-talerzu/thumb-01.webp' },
    { id: 5, caption: 'Bal Charytatywny', image: '/realizacje/zaglebiowska-izba-gospodarcza-bal-charytatywny/thumb-01.webp' },
    { id: 6, caption: 'Koszykówka', image: '/realizacje/koszykowka/thumb-01.webp' }
  ]
}
