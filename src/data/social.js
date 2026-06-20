// Konfiguracja feedu social media (Instagram + Facebook).
//
// Bez backendu używamy zewnętrznego agregatora (Curator.io lub Behold.so),
// który łączy posty z IG i FB w jeden „social wall".
//
// JAK URUCHOMIĆ ŻYWY FEED:
// 1. Załóż darmowe konto na https://curator.io (albo https://behold.so).
// 2. Podłącz profil Instagram i/lub stronę Facebook.
// 3. Skopiuj „Feed ID" i wpisz poniżej w `feedId`.
// 4. Ustaw `provider` na 'curator' lub 'behold'.
// Dopóki `feedId` jest puste — strona pokazuje stylowy placeholder (poniżej).

export const social = {
  provider: 'curator',          // 'curator' | 'behold'
  feedId: '',                   // <-- WPISZ swoje Feed ID, np. 'a1b2c3d4...'

  instagram: 'https://www.instagram.com/falp.event/',  // <-- podmień na realny profil
  facebook: 'https://www.facebook.com/falpevent',      // <-- podmień na realny profil
  instagramHandle: '@falp.event',

  // Placeholder — pokazywany dopóki nie ma feedId / zgody marketingowej.
  // Po podaniu prawdziwego feedu te kafelki znikają.
  fallbackPosts: [
    { id: 1, caption: 'Gala BMW — scena LED 60m²', color: 'from-blue-500 to-blue-800', tag: 'PR Event' },
    { id: 2, caption: 'Piknik rodzinny Leroy Merlin', color: 'from-emerald-500 to-emerald-800', tag: 'Impreza firmowa' },
    { id: 3, caption: 'Otwarcie salonu Porsche', color: 'from-zinc-500 to-zinc-800', tag: 'Premiera' },
    { id: 4, caption: 'Konferencja Amazon Tech', color: 'from-orange-500 to-amber-700', tag: 'Konferencja' },
    { id: 5, caption: 'Festiwal kultury — Katowice', color: 'from-purple-500 to-purple-800', tag: 'Technika' },
    { id: 6, caption: 'Backstage naszej ekipy 💚', color: 'from-brand to-brand-dark', tag: 'Zespół' }
  ]
}
