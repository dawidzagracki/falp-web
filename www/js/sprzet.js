// Katalog wypożyczalni — ładowany z serwera (/api/sprzet).
// Pozycje edytuje się w panelu admina (/admin.html, sekcja „Wypożyczalnia — sprzęt").
// Dane startowe (pierwsze uruchomienie serwera): www/sprzet-startowy.json.
let SPRZET = [];
const SPRZET_GOTOWY = fetch('/api/sprzet', {cache: 'no-cache'})
  .then(r => r.json())
  .then(d => {
    SPRZET = Array.isArray(d) ? d : [];
    document.dispatchEvent(new CustomEvent('sprzet-zaladowany'));
    return SPRZET;
  })
  .catch(() => { document.dispatchEvent(new CustomEvent('sprzet-zaladowany')); return SPRZET; });
