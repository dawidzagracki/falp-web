# FALP Event — strona internetowa

Nowoczesna strona w React (Vite) zastępująca falp.pl.

## Stack
- **React 18** + **Vite** — szybki dev/build
- **React Router** — routing SPA
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — animacje
- **Lucide React** — ikony
- **React Helmet Async** — SEO meta tagi

## Instalacja
```bash
npm install
npm run dev
```

Otworzy się `http://localhost:5173`.

## Build produkcyjny
```bash
npm run build
npm run preview
```

## Struktura
- `src/pages/` — strony (Home, Oferta, ServiceDetail, Realizacje, O nas, Kontakt)
- `src/components/` — komponenty UI (Hero, Stats, Services, Gallery, Clients, ContactForm, ChatWidget)
- `src/data/` — dane statyczne (oferta, realizacje, klienci)

## Co zostało zrobione (zgodnie z ofertą)
- ✅ Hero z miejscem na video w tle
- ✅ Animowane liczniki statystyk
- ✅ 6 kategorii usług + dedykowane podstrony
- ✅ Galeria realizacji z filtrowaniem
- ✅ Sekcja "Zaufali nam"
- ✅ Formularz kontaktowy z walidacją real-time
- ✅ Asystent (chat widget) z FAQ
- ✅ Pełna responsywność (mobile-first)
- ✅ SEO (meta tagi, sitemap, robots.txt)
- ✅ Animacje on scroll (Framer Motion)
- ✅ Mapa Google na stronie kontaktu

## TODO przed produkcją
- Podmienić placeholder dane kontaktowe (telefon, adres)
- Wgrać prawdziwe video do hero
- Wgrać zdjęcia realizacji (zamiast gradientów)
- Dodać prawdziwe logotypy klientów (zamiast tekstów)
- Skonfigurować wysyłkę formularza (EmailJS / Formspree — alternatywa dla backendu)
- Dodać politykę prywatności + cookies banner
