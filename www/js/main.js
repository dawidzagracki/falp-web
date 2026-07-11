  // reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
  }), {threshold:.12});
  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  // count-up
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, t0 = performance.now(), dur = 1400;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1), ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * ease).toLocaleString('pl-PL');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cio.unobserve(el);
  }), {threshold:.6});
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

  // numer "slajdu" na bocznym pasku
  const sections = [...document.querySelectorAll('section')];
  const railNo = document.getElementById('railNo');
  addEventListener('scroll', () => {
    const i = sections.findIndex(s => s.getBoundingClientRect().bottom > innerHeight * .4);
    if (i >= 0) railNo.textContent = String(i + 1).padStart(2, '0');
  }, {passive:true});

  // kostka w hero: najechanie na ściankę pokazuje podgląd filmu
  const cubeWrap = document.getElementById('cubeWrap');
  if (cubeWrap) {
    const vids = [...cubeWrap.querySelectorAll('.fv')];
    const faces = [...cubeWrap.querySelectorAll('.face')];
    const tag = document.getElementById('cubeTag');
    const hint = document.getElementById('cubeHint');
    faces.forEach((f, i) => {
      const on = () => {
        if (!vids[i].src) vids[i].src = FILMY[f.dataset.film];
        hint.style.display = 'none';
        tag.textContent = f.dataset.film;
        cubeWrap.classList.add('showtag');
        f.classList.add('playing');
        vids[i].classList.add('on');
        vids[i].play().catch(() => {});
      };
      const off = () => {
        f.classList.remove('playing');
        vids[i].classList.remove('on');
        vids[i].pause();
        cubeWrap.classList.remove('showtag');
      };
      f.addEventListener('mouseenter', on);
      f.addEventListener('mouseleave', off);
    });
  }

  // chipy z logo klienta (ładowane dopiero przy najechaniu)
  document.querySelectorAll('.client-grid .cl').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      const name = el.textContent.trim();
      const chip = document.createElement('span');
      chip.className = 'chip';
      if (LOGA[name]) {
        chip.classList.add('has-img');
        const img = new Image();
        img.alt = name;
        img.src = LOGA[name];
        chip.appendChild(img);
      } else {
        const initials = name.split(/\s+/).slice(0, 3).map(w => w[0]).join('').toUpperCase();
        chip.innerHTML = '<b>' + initials + '</b>';
      }
      el.appendChild(chip);
    }, {passive: true});
  });

  // ── Falpik — asystent FALP event ──
  const aiPanel = document.getElementById('aiPanel');
  const aiBody = document.getElementById('aiBody');
  document.getElementById('aiFab').addEventListener('click', () => {
    aiPanel.classList.toggle('open');
    if (aiPanel.classList.contains('open')) document.getElementById('aiInput').focus();
  });
  document.getElementById('aiClose').addEventListener('click', () => aiPanel.classList.remove('open'));

  const norm = s => s.toLowerCase()
    .replace(/[ąćęłńóśźż]/g, c => ({ą:'a',ć:'c',ę:'e',ł:'l',ń:'n',ó:'o',ś:'s',ź:'z',ż:'z'}[c]));

  const KONTAKT = 'Zadzwoń: 790 880 421 (pn–pt 8:00–16:00) albo napisz: biuro@falp.pl. Znajdziesz nas przy ul. Zagórskiej 73 w Będzinie.';
  const INTENCJE = [
    {k: ['czesc', 'hej', 'siema', 'dzien dobry', 'witam', 'hello', 'dzieki', 'dziekuje'],
     a: 'Cześć! Miło Cię widzieć. Zapytaj o naszą ofertę, wycenę albo kontakt — chętnie pomogę.'},
    {k: ['cena', 'cenn', 'koszt', 'kosztuje', 'wycen', 'budzet', 'ile placi', 'ile za'],
     a: 'Każde wydarzenie wyceniamy indywidualnie — zależnie od liczby gości, miejsca i programu. Zostaw namiar albo zadzwoń: 790 880 421, a przygotujemy bezpłatną wycenę.'},
    {k: ['integracj', 'firmow', 'team', 'piknik'],
     a: 'Integracje to nasza specjalność — od kameralnych wyjazdów po pikniki dla 1500+ osób. Zorganizowaliśmy ponad 3780 eventów. Opowiedz nam o swoim zespole: biuro@falp.pl.'},
    {k: ['gal', 'bankiet', 'wesele', 'jubileusz', 'koncert'],
     a: 'Gale i bankiety obsługujemy kompleksowo: scena, światło, dźwięk, artyści i logistyka. Zobacz sekcję Możliwości albo napisz: biuro@falp.pl.'},
    {k: ['sport', 'bieg', 'turniej', 'mecz', 'zawody', 'memoria'],
     a: 'Imprezy sportowe to nasz żywioł — obsługiwaliśmy m.in. Silesia Memoriał Kamili Skolimowskiej i wydarzenia z Centralnym Ośrodkiem Sportu.'},
    {k: ['targ', 'wystaw', 'konferencj', 'kongres', 'premier'],
     a: 'Targi, wystawy i konferencje: zabudowa, multimedia, obsluga techniczna i promocja wydarzenia — wszystko w jednych rękach.'},
    {k: ['technik', 'naglosnien', 'oswietlen', 'scen', 'led', 'ekran', 'pirotechnik', 'sprzet'],
     a: 'Mamy własne zaplecze audiowizualne: nagłośnienie, oświetlenie (w 100% LED), ekrany i pirotechnikę, plus ponad 800 m² magazynu. Bez podwykonawców i kompromisów.'},
    {k: ['eko', 'ekolog', 'esg', 'srodowisk', 'plastik', 'odpad'],
     a: 'Działamy w duchu EKO i ESG: less waste, less plastic, a całe oświetlenie sceniczne zmodernizowaliśmy na LED. Szczegóły znajdziesz w sekcji EKO.'},
    {k: ['prac', 'rekrutacj', 'zatrudni', 'staz', 'wspolprac'],
     a: 'Rocznie pracuje z nami ponad 500 osób! Napisz na biuro@falp.pl z dopiskiem "praca" — odezwiemy się.'},
    {k: ['doswiadczen', 'od kiedy', 'ile lat', 'historia', 'kim jestes'],
     a: 'Działamy od 2008 roku — 18 lat doświadczenia i ponad 3780 zorganizowanych eventów. Zaufali nam m.in. Red Bull, Mercedes, Żabka i ING.'},
    {k: ['adres', 'gdzie', 'lokalizacj', 'dojazd', 'bedzin', 'slask'],
     a: 'Nasza baza to ul. Zagórska 73, 42-500 Będzin (Śląsk), ale eventy realizujemy w całej Polsce.'},
    {k: ['godzin', 'otwart', 'czynne'],
     a: 'Biuro pracuje od poniedziałku do piątku w godzinach 8:00–16:00. Telefon: 790 880 421.'},
    {k: ['kontakt', 'telefon', 'mail', 'e-mail', 'zadzwon', 'numer'],
     a: KONTAKT},
    {k: ['blog', 'aktualnosci', 'porad'],
     a: 'Zajrzyj na nasz blog — piszemy o organizacji eventów od kuchni. Znajdziesz go w menu albo pod adresem /blog/.'},
    {k: ['oferta', 'uslugi', 'co robicie', 'czym sie zajmujecie', 'event', 'organizujecie', 'mozliwosci'],
     a: 'Organizujemy integracje, gale i bankiety, imprezy sportowe oraz targi i wystawy. Do tego: projekty graficzne, poligrafia, gadżety, kampanie reklamowe, impresariat artystyczny i wyjazdy. Pełna lista w sekcji Możliwości.'}
  ];

  function odpowiedzFalpika(pytanie) {
    const n = norm(pytanie);
    for (const i of INTENCJE) if (i.k.some(slowo => n.includes(slowo))) return i.a;
    return 'Hmm, nie jestem pewien, jak pomóc w tym temacie. ' + KONTAKT;
  }

  function dodajWiadomosc(tekst, kto) {
    const m = document.createElement('div');
    m.className = 'msg ' + kto;
    m.textContent = tekst;
    aiBody.appendChild(m);
    aiBody.scrollTop = aiBody.scrollHeight;
    return m;
  }

  function wyslijDoFalpika(pytanie) {
    pytanie = pytanie.trim();
    if (!pytanie) return;
    dodajWiadomosc(pytanie, 'user');
    const pisze = dodajWiadomosc('', 'bot pisze');
    setTimeout(() => {
      pisze.classList.remove('pisze');
      pisze.textContent = odpowiedzFalpika(pytanie);
      aiBody.scrollTop = aiBody.scrollHeight;
    }, 500 + Math.min(pytanie.length * 8, 700));
  }

  document.getElementById('aiForm').addEventListener('submit', e => {
    e.preventDefault();
    const pole = document.getElementById('aiInput');
    wyslijDoFalpika(pole.value);
    pole.value = '';
  });
  document.querySelectorAll('#aiQuick button').forEach(b =>
    b.addEventListener('click', () => wyslijDoFalpika(b.textContent)));

  // ── formularz kontaktowy: suwaki + wysyłka ──
  const cform = document.getElementById('cform');
  if (cform) {
    const pln = n => (+n).toLocaleString('pl-PL');
    const goscie = document.getElementById('kfGoscie');
    const budzet = document.getElementById('kfBudzet');
    const gVal = document.getElementById('kfGoscieVal');
    const bVal = document.getElementById('kfBudzetVal');
    const wypelnij = el => {
      const p = (el.value - el.min) / (el.max - el.min) * 100;
      el.style.background = `linear-gradient(90deg, var(--green) ${p}%, var(--line) ${p}%)`;
    };
    const aktualizuj = () => {
      gVal.textContent = pln(goscie.value) + (goscie.value >= +goscie.max ? '+ osób' : ' osób');
      bVal.textContent = pln(budzet.value) + (budzet.value >= +budzet.max ? '+ zł' : ' zł');
      wypelnij(goscie); wypelnij(budzet);
    };
    [goscie, budzet].forEach(s => s.addEventListener('input', aktualizuj));
    aktualizuj();

    const info = document.getElementById('cformInfo');
    const pokazBlad = t => { info.className = 'f-info blad'; info.textContent = t; };

    cform.addEventListener('submit', async e => {
      e.preventDefault();
      const imie = document.getElementById('kfImie').value.trim();
      const kontakt = document.getElementById('kfKontakt').value.trim();
      if (imie.length < 2) return pokazBlad('Podaj imię i nazwisko.');
      if (kontakt.length < 5) return pokazBlad('Podaj e-mail lub numer telefonu.');
      if (!document.getElementById('kfZgoda').checked) return pokazBlad('Zaznacz zgodę na przetwarzanie danych.');

      const btn = cform.querySelector('button[type=submit]');
      btn.disabled = true; btn.textContent = 'Wysyłanie…';
      try {
        const r = await fetch('/api/kontakt', {method: 'POST', body: JSON.stringify({
          imie, kontakt,
          typ: document.getElementById('kfTyp').value,
          goscie: gVal.textContent,
          budzet: bVal.textContent,
          wiadomosc: document.getElementById('kfMsg').value.trim(),
          www: document.getElementById('kfWww').value
        })});
        const d = await r.json();
        if (d.ok) {
          cform.innerHTML = '<div class="c-sukces"><div class="znak">✓</div>' +
            '<h3>Dziękujemy za zapytanie!</h3>' +
            '<p>Odezwiemy się w ciągu 24 godzin.<br>Pilna sprawa? Zadzwoń: <a href="tel:+48790880421" style="color:var(--green-dark);font-weight:700;text-decoration:none">790 880 421</a></p></div>';
        } else {
          pokazBlad(d.blad || 'Nie udało się wysłać. Napisz na biuro@falp.pl');
          btn.disabled = false; btn.textContent = 'Wyślij zapytanie';
        }
      } catch {
        pokazBlad('Nie udało się wysłać. Napisz na biuro@falp.pl albo zadzwoń: 790 880 421.');
        btn.disabled = false; btn.textContent = 'Wyślij zapytanie';
      }
    });
  }
