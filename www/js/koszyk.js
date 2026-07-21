// Koszyk zapytania o wynajem — wspólny dla /wypozyczalnia/ i formularza na stronie głównej.
// Przechowywanie: localStorage 'falp_koszyk' = [{id, ilosc}]. Wymaga wcześniej sprzet.js (SPRZET).
const KOSZYK_KLUCZ = 'falp_koszyk';

function koszykPobierz() {
  try {
    const k = JSON.parse(localStorage.getItem(KOSZYK_KLUCZ) || '[]');
    return Array.isArray(k) ? k.filter(p => p && p.id && p.ilosc > 0) : [];
  } catch { return []; }
}

function koszykZapisz(lista) {
  try { localStorage.setItem(KOSZYK_KLUCZ, JSON.stringify(lista)); } catch {}
  document.dispatchEvent(new CustomEvent('koszyk-zmiana'));
}

function koszykDodaj(id, ilosc) {
  const k = koszykPobierz();
  const poz = k.find(p => p.id === id);
  if (poz) poz.ilosc = Math.min(999, poz.ilosc + ilosc);
  else k.push({id, ilosc: Math.min(999, ilosc)});
  koszykZapisz(k);
}

function koszykUstaw(id, ilosc) {
  let k = koszykPobierz();
  if (ilosc <= 0) k = k.filter(p => p.id !== id);
  else { const poz = k.find(p => p.id === id); if (poz) poz.ilosc = Math.min(999, ilosc); }
  koszykZapisz(k);
}

function koszykUsun(id) { koszykUstaw(id, 0); }
function koszykWyczysc() { koszykZapisz([]); }
function koszykLicznik() { return koszykPobierz().reduce((s, p) => s + p.ilosc, 0); }

// Pozycje połączone z katalogiem (pomija id, których już nie ma w SPRZET)
function koszykPozycje() {
  const kat = typeof SPRZET !== 'undefined' ? SPRZET : [];
  return koszykPobierz()
    .map(p => { const s = kat.find(x => x.id === p.id); return s ? {...s, ilosc: p.ilosc} : null; })
    .filter(Boolean);
}

function koszykSuma() { return koszykPozycje().reduce((s, p) => s + p.cena * p.ilosc, 0); }
const cenaPln = n => (+n).toLocaleString('pl-PL');
