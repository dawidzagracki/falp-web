export const blogPosts = [
  {
    slug: 'jak-zorganizowac-event-firmowy',
    title: 'Jak zorganizować event firmowy w 7 krokach',
    excerpt: 'Praktyczny przewodnik po organizacji udanego wydarzenia firmowego — od pierwszego pomysłu po podsumowanie po evencie.',
    category: 'Poradniki',
    date: '2026-05-10',
    readTime: 8,
    color: 'from-brand/30 to-emerald-900',
    image: '/realizacje/zaglebiowska-izba-gospodarcza-bal-charytatywny/img-01.webp',
    content: [
      { type: 'p', text: 'Organizacja eventu firmowego to wyzwanie, które wymaga dobrego planowania i zespołu specjalistów. W tym artykule pokazujemy 7 kluczowych kroków, które pomogą Ci stworzyć wydarzenie, o którym będzie się mówić.' },
      { type: 'h', text: '1. Określ cel wydarzenia' },
      { type: 'p', text: 'Integracja zespołu? Premiera produktu? Jubileusz firmy? Cel decyduje o formacie, budżecie i komunikacji. Im jaśniej go zdefiniujesz, tym łatwiej dobrać resztę elementów.' },
      { type: 'h', text: '2. Ustal budżet' },
      { type: 'p', text: 'Standardowo budżet eventu firmowego dzieli się na: lokalizacja (20-30%), catering (25-35%), technika (15-20%), atrakcje i artyści (15-20%), pozostałe (5-10%).' },
      { type: 'h', text: '3. Wybierz lokalizację' },
      { type: 'p', text: 'Sale konferencyjne, hotele, plenery, hale industrialne — każda lokalizacja ma swój charakter. Dopasuj ją do liczby gości, formatu wydarzenia i sezonu.' },
      { type: 'h', text: '4. Zaplanuj timeline' },
      { type: 'p', text: 'Co do minuty: powitanie, część oficjalna, atrakcje, catering, zakończenie. Goście doceniają płynność — nikt nie lubi czekać w kolejce do bufetu.' },
      { type: 'h', text: '5. Zadbaj o oprawę' },
      { type: 'p', text: 'Scenografia, oświetlenie, nagłośnienie, ekrany LED — to elementy, które tworzą atmosferę. Warto zainwestować w profesjonalną technikę.' },
      { type: 'h', text: '6. Zorganizuj artystów' },
      { type: 'p', text: 'DJ, zespół, prowadzący, pokazy — wybór zależy od charakteru eventu. Dobierz artystów do grupy docelowej i wieku gości.' },
      { type: 'h', text: '7. Pomyśl o komunikacji' },
      { type: 'p', text: 'Zaproszenia, agenda, materiały na miejscu, fotografia i wideo. Materiały z eventu żyją długo po jego zakończeniu — w social mediach, na stronie i w prezentacjach.' }
    ]
  },
  {
    slug: 'trendy-eventowe-2026',
    title: 'Trendy eventowe 2026 — co warto wiedzieć',
    excerpt: 'Hybrydowe formaty, eko-eventy, immersyjne instalacje i sztuczna inteligencja w organizacji wydarzeń. Co zdominuje rok 2026?',
    category: 'Trendy',
    date: '2026-04-22',
    readTime: 6,
    color: 'from-purple-600 to-purple-900',
    image: '/realizacje/the-syde/img-01.webp',
    content: [
      { type: 'p', text: 'Branża eventowa w 2026 roku stawia na personalizację, technologię i zrównoważony rozwój. Oto najważniejsze trendy, które warto włączyć do strategii.' },
      { type: 'h', text: 'Eko-eventy i zero waste' },
      { type: 'p', text: 'Coraz więcej firm wymaga od organizatorów certyfikatu zielonego eventu — od cateringu po materiały promocyjne. To już nie nice-to-have, tylko standard.' },
      { type: 'h', text: 'Immersyjne instalacje LED' },
      { type: 'p', text: 'Ekrany LED 360°, projection mapping, podłogi LED — goście chcą doświadczenia, nie tylko sceny. Inwestycja w technikę zwraca się w viralowych nagraniach z eventu.' },
      { type: 'h', text: 'AI w organizacji' },
      { type: 'p', text: 'Chatboty obsługujące gości, automatyczna selekcja zdjęć z eventu, personalizowane agendy w aplikacji — sztuczna inteligencja wchodzi do branży na dobre.' },
      { type: 'h', text: 'Mikro-eventy' },
      { type: 'p', text: 'Zamiast jednego dużego eventu — kilka mniejszych, dla mniejszych grup. Wyższa jakość interakcji, lepsze targetowanie, niższe ryzyko.' }
    ]
  },
  {
    slug: 'technika-sceniczna-co-warto-wiedziec',
    title: 'Technika sceniczna — co warto wiedzieć',
    excerpt: 'Ekrany LED, nagłośnienie line array, oświetlenie ruchome — przewodnik po kluczowych elementach techniki na evencie.',
    category: 'Technika',
    date: '2026-03-15',
    readTime: 7,
    color: 'from-blue-600 to-blue-900',
    image: '/realizacje/tauron-blizej-energetyki/img-01.webp',
    content: [
      { type: 'p', text: 'Dobra technika jest niewidoczna — działa tak, że goście nie zwracają na nią uwagi. Ale gdy zawodzi, psuje cały event. Sprawdź, na co zwrócić uwagę.' },
      { type: 'h', text: 'Ekrany LED — pitch ma znaczenie' },
      { type: 'p', text: 'Pitch (gęstość pikseli) to kluczowy parametr. Im niższy, tym ostrzejszy obraz — ale i wyższa cena. Dla scen plenerowych P3.9 to standard, dla indoor — P2.5 lub niżej.' },
      { type: 'h', text: 'Nagłośnienie line array' },
      { type: 'p', text: 'Systemy line array zapewniają równomierne pokrycie nawet w dużych salach. Ważna jest praca akustyka — dobre nagłośnienie to nie tylko sprzęt, ale przede wszystkim ustawienia.' },
      { type: 'h', text: 'Oświetlenie ruchome' },
      { type: 'p', text: 'Movinghead-y i washe pozwalają na dynamiczne efekty. Programowanie świateł pod scenariusz wydarzenia to osobna sztuka — warto zlecić profesjonalistom.' }
    ]
  }
]

export const getPost = (slug) => blogPosts.find(p => p.slug === slug)
