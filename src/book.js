// Named imports, so only these marks end up in the bundle.
import { siMeta, siInstagram, siTiktok, siShopify, siMailchimp, siGoogleads, siGoogleanalytics, siFigma, siReact, siSupabase, siStripe, siFlutter, siClaude, siGooglegemini, siElevenlabs, siN8n, siGithub, siPython } from 'simple-icons';
import { BIO, ME, SHOW_HELP, HELP, PROJECTS, CAROUSEL, LINKS, TOOLS } from './book-content.js';
import { LANGS, lang, setLang, t } from './i18n.js';

const ICONS = { siMeta, siInstagram, siTiktok, siShopify, siMailchimp, siGoogleads, siGoogleanalytics, siFigma, siReact, siSupabase, siStripe, siFlutter, siClaude, siGooglegemini, siElevenlabs, siN8n, siGithub, siPython };

// The page is one fixed stage driven by scroll progress `p`:
//   0 → 0.4        the closed book floats beside the headline, then moves to the centre
//   0.3+i → 1.3+i  leaf i turns (first 80 %) and rests a moment to be read (the rest)
// Wide screens show spreads: each leaf carries two pages, front and back. Narrow screens show one page at a time,
// so every page gets its own leaf. Every pose is a pure function of `p`: scrolling back turns the pages back.

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const narrow = matchMedia('(max-width: 820px)');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => t * t * (3 - 2 * t);
const $ = id => document.getElementById(id);
/** A file from public/ ('/adam.jpg'), wherever the site is served from: the domain root or a sub-folder such as GitHub Pages'. */
const asset = path => import.meta.env.BASE_URL + path.replace(/^\//, '');

/** Element with a class and children (nodes, or strings shown in the current language; null/false skipped). */
function h(tag, cls, ...kids) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  for (const k of kids) if (k != null && k !== false) n.append(typeof k === 'string' ? t(k) : k);
  return n;
}
const chips = (list, cls = 'chips') => h('ul', cls, ...list.map(t => h('li', '', t)));
/** Marks content that is still to be written, instead of inventing it. */
const pending = text => h('p', 'pending', `${t('Pendiente')}: ${t(text)}`);
/** The portrait on the cover, framed like an instant photo and tucked under the top-right corner plate. */
function photo() {
  const img = h('img');
  Object.assign(img, { src: asset('/adam.jpg'), alt: `${t('Foto de')} ${ME.name[0] + ME.name.slice(1).toLowerCase()}`, width: 480, height: 480 });
  return h('figure', 'polaroid', img);
}
/** Brass fittings of the cover: four corner plates, and the two clasps on the front. */
const brass = clasps => [...['tl', 'tr', 'bl', 'br'].map(c => h('span', `corner ${c}`)), ...(clasps ? [h('span', 'clasp a'), h('span', 'clasp b')] : [])];
/**
 * The emblem on the cover: two linked rings crossed by a needle, with the name above and "Portfolio" below,
 * both lettered along the needle's diagonal.
 */
function emblem() {
  const box = h('div', 'emblem');
  box.innerHTML = `<svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="brass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3e3ad"/><stop offset=".5" stop-color="#b8924a"/><stop offset="1" stop-color="#e2c986"/></linearGradient></defs><g fill="none" stroke="url(#brass)" stroke-width="5"><circle cx="45" cy="74" r="23"/><circle cx="75" cy="46" r="23"/></g><polygon points="6,114 57,57 114,6 63,63" fill="url(#brass)"/><g transform="rotate(-45 60 60)" fill="url(#brass)" text-anchor="middle"><text class="emblem-name" x="60" y="27"></text><text class="emblem-word" x="60" y="111"></text></g></svg>`;
  box.querySelector('.emblem-name').textContent = ME.name[0] + ME.name.slice(1).toLowerCase();
  box.querySelector('.emblem-word').textContent = 'Portfolio';
  return box;
}
function link(label, url, cls = 'live') {
  const a = h('a', cls, `${label} ↗`);
  a.href = url; a.target = '_blank'; a.rel = 'noopener';
  return a;
}
function logo([name, key]) {
  const li = h('li', 'tool');
  const icon = key && ICONS[key];
  if (icon) {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', icon.path);
    svg.append(path);
    li.append(svg);
  } else li.append(h('span', 'tool-initial', name[0]));
  li.append(h('span', 'tool-name', name));
  return li;
}
/** App-style tiles for the links page, drawn as vectors so they stay sharp at any size. */
const TILES = {
  instagram: () => `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><radialGradient id="ig" cx="30%" cy="107%" r="150%"><stop offset="0" stop-color="#fdf497"/><stop offset=".05" stop-color="#fdf497"/><stop offset=".45" stop-color="#fd5949"/><stop offset=".6" stop-color="#d6249f"/><stop offset=".9" stop-color="#285AEB"/></radialGradient></defs><rect width="24" height="24" rx="5.5" fill="url(#ig)"/><path transform="translate(4.4 4.4) scale(.633)" fill="#fff" d="${siInstagram.path}"/></svg>`,
  linkedin: () => `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4.5" fill="#0A66C2"/><g fill="#fff"><circle cx="7.3" cy="7.4" r="1.55"/><rect x="5.95" y="10" width="2.7" height="8.1"/><path d="M10.5 10h2.6v1.15c.45-.75 1.35-1.4 2.7-1.4 2.65 0 3.2 1.75 3.2 4V18.1h-2.7v-3.9c0-.95 0-2.15-1.3-2.15s-1.5 1.05-1.5 2.1v3.95h-2.7z"/></g></svg>`,
  storyseller: () => `<img src="${asset('/pieces/storyseller-logo.svg')}" alt="">`,
};
function social(l) {
  const a = h('a', 'social', h('b', '', l.label), h('span', '', `${l.handle} ↗`));
  a.href = l.url; a.target = '_blank'; a.rel = 'noopener';
  const tile = h('span', 'social-tile');
  tile.innerHTML = TILES[l.icon]?.() ?? '';
  a.prepend(tile);
  return a;
}
/** One way to reach me: the value as a link (call / write) and a button that copies it. */
function copyRow(label, shown, href, value) {
  const a = h('a', 'contact-value', shown);
  a.href = href;
  const btn = h('button', 'copy', 'Copiar');
  btn.type = 'button';
  btn.setAttribute('aria-label', `${t('Copiar')} ${t(label).toLowerCase()}`);
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch { // no clipboard permission (old browser, insecure origin): fall back to a hidden field
      const t = Object.assign(document.createElement('textarea'), { value });
      document.body.append(t); t.select(); document.execCommand('copy'); t.remove();
    }
    btn.textContent = t('Copiado ✓');
    btn.classList.add('is-done');
    setTimeout(() => { btn.textContent = t('Copiar'); btn.classList.remove('is-done'); }, 1600);
  });
  return h('div', 'contact-row', h('small', '', label), a, btn);
}
/** The 60-second tour: a real player once `video` is set, a marked empty slot until then. */
function tour(p) {
  if (!p.video) return h('div', 'tour is-empty', h('span', 'play', '▶'), h('span', '', 'Vídeo-tour de 60 s'), h('small', '', 'pendiente de grabar'));
  if (/\.(mp4|webm)$/i.test(p.video)) {
    const v = h('video', 'tour');
    Object.assign(v, { src: asset(p.video), controls: true, preload: 'none', playsInline: true });
    return v;
  }
  const f = h('iframe', 'tour');
  Object.assign(f, { src: p.video, loading: 'lazy', allowFullscreen: true, title: `Vídeo-tour de ${p.name}` });
  return f;
}

/** A thick arrow that looks drawn in pencil, from the framed picture down to the visual under the title. */
function pencilArrow() {
  const box = h('div', 'pencil-arrow');
  box.setAttribute('aria-hidden', 'true');
  // Two passes of the same stroke, the second slightly off, and a noise filter that roughens the edges like graphite.
  box.innerHTML = `<svg viewBox="0 0 100 134"><defs><filter id="pencil" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3.2"/></filter></defs><g fill="none" stroke="#1b1b1b" stroke-linecap="round" stroke-linejoin="round" filter="url(#pencil)"><path d="M8 6 C 42 14, 74 50, 86 120" stroke-width="6"/><path d="M10 8 C 44 18, 71 52, 85 118" stroke-width="3" opacity=".55"/><path d="M60 100 L86 122 L94 90" stroke-width="6"/><path d="M62 103 L85 120 L92 93" stroke-width="3" opacity=".55"/></g></svg>`;
  return box;
}
/** A capture of the project in an instant-photo frame, resting beside the page's big number. */
function framed(p) {
  const img = h('img');
  Object.assign(img, { src: asset(p.image), alt: `${t('Captura de')} ${p.name}`, loading: 'lazy' });
  return h('figure', 'polaroid', img);
}
/** One result card of the Habitour drawing: its picture if there is one (with the label over it), else its icon. */
function card(image, icon, label) {
  const el = h('div', 'flow-card', image ? null : icon, h('small', '', label));
  if (image) { el.classList.add('has-img'); el.style.backgroundImage = `url("${asset(image)}")`; }
  return el;
}
/** Habitour at a glance: photos go in, a film and a 3D tour come out. */
function habitour(p) {
  const box = h('figure', 'flow');
  box.setAttribute('role', 'img');
  box.setAttribute('aria-label', t('Tres fotos de un piso se convierten en un vídeo y en un tour 3D'));
  box.append(
    h('div', 'flow-in', h('span', 'ph'), h('span', 'ph'), h('span', 'ph'), h('small', '', 'Tus fotos')),
    h('span', 'flow-arrow', '→'),
    h('div', 'flow-out',
      card(p.cards?.video, h('span', 'play', '▶'), 'Vídeo de cine'),
      card(p.cards?.tour, h('span', 'cube'), 'Tour 3D')),
  );
  return box;
}
/** The skeleton of an example carousel: one numbered slide per step. */
function carousel() {
  return h('figure', 'slides',
    h('ol', '', ...CAROUSEL.map(([t, d], i) => h('li', '', h('b', '', String(i + 1)), h('strong', '', t), h('span', '', d)))),
    h('figcaption', '', 'Estructura de un carrusel de ejemplo: inmobiliaria'));
}
/** Countdown to the launch. The numbers are filled by tick(), so they survive the book being rebuilt. */
function countdown(p) {
  const box = h('div', 'count');
  box.dataset.launch = p.launch;
  box.append(h('p', 'count-label', 'Lanzamiento en'),
    h('div', 'count-row', ...['días', 'horas', 'min', 'seg'].map(u => h('div', 'count-cell', h('b', '', '--'), h('span', '', u)))));
  return box;
}
function tick() {
  for (const box of document.querySelectorAll('.count')) {
    const left = new Date(box.dataset.launch) - Date.now();
    if (!(left > 0)) { // launched (or no valid date): say so instead of counting below zero
      if (!box.classList.contains('is-out')) { box.classList.add('is-out'); box.replaceChildren(h('p', 'count-label', 'Ya disponible')); }
      continue;
    }
    const s = Math.floor(left / 1000);
    const parts = [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60];
    box.querySelectorAll('b').forEach((b, i) => { b.textContent = String(parts[i]).padStart(2, '0'); });
  }
}
/** A row of vertical clips. Each starts on click and stops the others, so two never sound at once. */
function videos(p) {
  const row = h('div', 'clips');
  row.append(...p.videos.map((v, i) => {
    const video = h('video');
    Object.assign(video, { src: asset(v.src), poster: asset(v.poster), preload: 'none', playsInline: true, loop: true });
    const btn = h('button', 'clip', video, h('span', 'play', '▶'));
    btn.type = 'button';
    btn.setAttribute('aria-label', `${t('Reproducir el vídeo')} ${i + 1} · ${t(p.name)}`);
    btn.addEventListener('click', () => {
      if (!video.paused) return video.pause();
      for (const other of document.querySelectorAll('.clip video')) if (other !== video) other.pause();
      video.play();
    });
    video.addEventListener('play', () => btn.classList.add('is-playing'));
    video.addEventListener('pause', () => btn.classList.remove('is-playing'));
    return btn;
  }));
  return row;
}
/** A pencil arrow sweeping towards the facing (left) page, with a handwritten note at its tail. */
function pointLeft(note) {
  const box = h('div', 'point-left', h('span', '', note));
  const art = h('div', '');
  art.setAttribute('aria-hidden', 'true');
  art.innerHTML = `<svg viewBox="0 0 160 70"><defs><filter id="pencil-b" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3.2"/></filter></defs><g fill="none" stroke="#1b1b1b" stroke-linecap="round" stroke-linejoin="round" filter="url(#pencil-b)"><path d="M152 12 C 118 62, 62 64, 10 38" stroke-width="6"/><path d="M150 15 C 116 60, 64 61, 12 40" stroke-width="3" opacity=".55"/><path d="M34 22 L9 38 L30 58" stroke-width="6"/><path d="M33 25 L11 39 L29 55" stroke-width="3" opacity=".55"/></g></svg>`;
  box.prepend(art);
  return box;
}
/** One numbered strategy; with `variants` it draws how a single recording fans out into reels that differ only in the hook. */
function strategy(s, i) {
  const box = h('div', 'step strategy', h('h3', '', `${t('Estrategia')} ${i + 1} · ${t(s.name)}`), s.text ? h('p', '', s.text) : s.points ? null : pending(`en qué consistía la estrategia de ${s.name.toLowerCase()}`));
  for (const [k, v] of s.points ?? []) box.append(h('p', 'point', h('strong', '', `${t(k)}: `), v));
  if (s.arrow) box.append(pointLeft(s.arrow));
  if (s.variants) {
    const fan = h('figure', 'fan');
    fan.setAttribute('role', 'img');
    fan.setAttribute('aria-label', t('Un vídeo se convierte en varios reels, cada uno con un gancho distinto'));
    const n = s.variants.length;
    // Dashed connectors from the source to each reel, in a box that stretches with the rows.
    const lines = s.variants.map((_, k) => `<path d="M0 50 C 50 50, 50 ${((k + 0.5) / n) * 100}, 100 ${((k + 0.5) / n) * 100}"/>`).join('');
    const wires = h('div', 'fan-wires');
    wires.innerHTML = `<svg viewBox="0 0 100 100" preserveAspectRatio="none">${lines}</svg>`;
    fan.append(
      h('div', 'fan-src', h('span', 'reel', h('span', 'play', '▶')), h('small', '', s.source)),
      wires,
      h('ol', 'fan-out', ...s.variants.map((v, k) => h('li', '', h('span', 'reel', h('span', 'play', '▶')), h('div', '', h('b', '', `Reel ${k + 1}`), h('strong', '', v), h('small', '', s.same))))),
    );
    box.append(fan);
  }
  return box;
}
/** What sits under a project's title. */
const visual = p => p.visual === 'none' ? null : ({ habitour, carousel, countdown, videos })[p.visual]?.(p) ?? tour(p);

const SHOWN = PROJECTS.filter(p => !p.hidden);

// ── Pages, in reading order. `kind` styles the sheet; `chapter` names the page in the chapter bar. ──────────────
const PAGES = [
  { kind: 'cover', chapter: 'Portada', make: () => [
    photo(),
    ...brass(true),
    emblem(),
    h('p', 'cover-name', ME.coverLine),
  ] },
  { kind: 'portrait', chapter: 'Sobre mí', make: () => {
    const img = h('img');
    Object.assign(img, { src: asset('/adam-trabajando.jpg'), alt: t('Adam trabajando con su portátil'), width: 900, height: 1200, loading: 'lazy' });
    return [h('span', 'big-n', '01'), h('figure', 'polaroid', img, h('figcaption', '', 'Adam · Girona'))];
  } },
  { kind: 'bio', make: () => [
    h('p', 'kicker', 'Sobre mí'),
    h('h2', '', BIO.hello),
    ...BIO.text.map(t => h('p', '', t)),
    h('dl', 'facts', ...BIO.facts.flatMap(([k, v]) => [h('dt', '', k), h('dd', '', v || pending(k === 'Dónde' ? 'tu ciudad' : k.toLowerCase()))])),
  ] },
  ...SHOWN.flatMap((p, i) => [
    { kind: 'media', chapter: p.name, make: () => [
      h('span', 'big-n', String(i + 2).padStart(2, '0')),
      p.image ? framed(p) : null,
      p.arrow ? pencilArrow() : null,
      h('h2', '', p.name),
      h('p', 'note', p.line),
      visual(p),
    ] },
    { kind: 'case', make: () => [
      p.caseImage ? Object.assign(h('img', 'case-shot'), { src: asset(p.caseImage), alt: t(p.caseAlt || p.name), loading: 'lazy' }) : null,
      p.goal && p.goalFirst ? h('p', 'problem', h('strong', '', 'El objetivo'), p.goal) : null,
      ...(p.strategies ? p.strategies.map(strategy) : []),
      ...(p.strategies ? [] : p.blocks
        ? p.blocks.map(b => h('div', 'step', h('h3', '', b.t), b.d ? h('p', '', b.d) : pending(b.hint || b.t.toLowerCase())))
        : [
          h('div', 'step', h('h3', '', 'El reto'), h('p', '', p.reto)),
          h('div', 'step', h('h3', '', 'La ejecución'), h('p', '', p.ejecucion)),
          h('div', 'step', h('h3', '', 'Resultado y qué mejoraría'), p.resultado ? h('p', '', p.resultado) : pending('tu métrica real y qué harías distinto hoy')),
        ]),
      p.problem ? h('p', 'problem', h('strong', '', 'El problema'), p.problem) : null,
      p.goal && !p.goalFirst ? h('p', 'problem', h('strong', '', 'El objetivo'), p.goal) : null,
      p.stack.length ? chips(p.stack) : null,
      p.url ? link(p.urlLabel || 'Ver en vivo', p.url) : (p.blocks || p.strategies ? null : pending('enlace en vivo')),
    ] },
  ]),
  ...(SHOW_HELP ? [{ kind: 'title', chapter: 'Cómo ayudo', make: () => [
    h('span', 'big-n', String(SHOWN.length + 2).padStart(2, '0')),
    h('p', 'kicker', 'Para vuestro equipo'),
    h('h2', '', 'Cómo puedo ayudar'),
    h('p', 'note', 'Tareas del día a día en las que puedo echar una mano.'),
  ] },
  { kind: 'list', make: () => HELP.map((x, i) => h('div', 'help', h('span', 'help-n', String(i + 1)), h('div', '', h('h3', '', x.t), h('p', '', x.d)))) }] : []),
  { kind: 'tools', chapter: 'Herramientas', make: () => [
    h('p', 'kicker', 'Mi stack'),
    h('h2', '', 'Con qué trabajo'),
    h('ul', 'tool-grid', ...TOOLS.map(logo)),
  ] },
  { kind: 'social', make: () => [
    h('p', 'kicker', 'Mis redes'),
    h('h2', '', 'Compruébalo'),
    h('ul', 'links', ...LINKS.map(l => h('li', '', social(l)))),
  ] },
  { kind: 'cover back', chapter: 'Contacto', make: () => [
    ...brass(false),
    h('h2', 'cover-title', '¿Hablamos?'),
    h('p', 'cover-sub', ME.sub),
    h('div', 'contact',
      copyRow('Teléfono', ME.phone, `tel:+34${ME.phone.replace(/\s/g, '')}`, ME.phone.replace(/\s/g, '')),
      copyRow('Correo', ME.email, `mailto:${ME.email}`, ME.email)),
  ] },
];

// ── Static copy outside the book ───────────────────────────────────────────
$('brand').textContent = ME.name[0] + ME.name.slice(1).toLowerCase(); // blackletter capitals are hard to read in a row
const DESCRIPTION = document.querySelector('meta[name="description"]').content; // the Spanish original, kept to translate from
/** Everything outside the book that is written in a language. */
function staticCopy() {
  document.documentElement.lang = lang;
  document.querySelector('meta[name="description"]').content = t(DESCRIPTION);
  $('hero-title').textContent = `${t(ME.kicker)}. ${t(ME.title)}`;
  $('hint').textContent = t('Scroll para abrir ↓');
  $('to-contact').textContent = t('Contacto');
  $('chapters').setAttribute('aria-label', t('Capítulos'));
  $('lang').setAttribute('aria-label', t('Idioma'));
}
// Language menu: the choice is remembered, and switching rewrites the book where it is open.
const picker = $('lang');
picker.append(...LANGS.map(([code, name]) => Object.assign(document.createElement('option'), { value: code, textContent: name })));
picker.value = lang;
picker.addEventListener('change', () => { setLang(picker.value); staticCopy(); build(); tick(); });

// ── Book ───────────────────────────────────────────────────────────────────
const book = $('book'), wrap = $('wrap'), hero = $('hero'), nav = $('chapters'), track = $('track');
let single = false, leaves = [], turns = 0, END = 1, UNIT = 1, W = 1, H = 1, T = 40;
const START = 0.3, TURN = 0.8; // when the cover starts to open, and the share of each step spent turning

function build() {
  single = narrow.matches;
  book.classList.toggle('single', single);
  const pages = PAGES.map((def, i) => {
    const inner = h('div', 'pg-in', ...def.make());
    const cover = def.kind.startsWith('cover');
    return h('section', `page is-${def.kind.replace(' ', ' is-')}`, inner, !cover && h('span', 'folio', String(i).padStart(2, '0')));
  });
  leaves = [];
  if (single) {
    pages.forEach(pg => { pg.classList.add('front'); leaves.push({ el: h('div', 'leaf', pg, h('div', 'page back is-blank')) }); });
    turns = leaves.length - 1; // the last page has nothing behind it: it stays
  } else {
    for (let i = 0; i < pages.length; i += 2) {
      pages[i].classList.add('front');
      pages[i + 1].classList.add('back');
      leaves.push({ el: h('div', 'leaf', pages[i], pages[i + 1]) });
    }
    turns = leaves.length;
  }
  leaves.forEach(l => { l.blank = l.el.querySelector('.is-blank'); });
  // The body of the book under the leaves: the two cover boards and the edges of the two piles of pages.
  const body = ['board r', 'board l', 'edge r out', 'edge r top', 'edge r bot', 'edge l out', 'edge l top', 'edge l bot'].map(c => h('div', c));
  book.replaceChildren(...body, ...leaves.map(l => l.el));
  END = START + turns;
  UNIT = single ? 0.55 : 0.7; // screens of scroll per unit of progress

  // Chapter bar: one dot per named page; a click scrolls to the turn that shows it.
  const turnsFor = i => (single ? i : Math.ceil(i / 2));
  nav.replaceChildren(...PAGES.map((def, i) => {
    if (!def.chapter) return null;
    const b = h('button', 'chapter', h('span', '', def.chapter));
    b.type = 'button';
    b.dataset.turns = turnsFor(i);
    b.addEventListener('click', () => go(turnsFor(i)));
    return b;
  }).filter(Boolean));
  resize();
}
/** Scrolls to the point where `n` leaves have been turned. */
function go(n) {
  const at = n ? START + (n - 1) + 0.9 : 0;
  scrollTo({ top: at * UNIT * H, behavior: reduced ? 'instant' : 'smooth' });
}
function resize() {
  W = innerWidth; H = innerHeight;
  T = book.offsetHeight * 0.085; // thickness of the whole block of pages
  book.style.setProperty('--t', `${T}px`);
  track.style.height = `${(END * UNIT + 1) * H}px`;
}
addEventListener('resize', resize);
narrow.addEventListener('change', build);
$('to-contact').addEventListener('click', e => { e.preventDefault(); go(turns); });
staticCopy();
build();
tick();
setInterval(tick, 1000);

// `|| 0`: a page loaded with no height yet (a background tab) would otherwise start at NaN and never recover.
const target = () => clamp(scrollY / (UNIT * H) || 0, 0, END);
let p = target(), last = performance.now();
const mouse = { x: 0, y: 0 };
addEventListener('pointermove', e => { if (e.pointerType === 'mouse') { mouse.x = (e.clientX / W) * 2 - 1; mouse.y = (e.clientY / H) * 2 - 1; } });

function step(now, jump = false) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  p += (target() - p) * (reduced || jump ? 1 : 1 - Math.exp(-dt * 18));
  const u = p - START, L = leaves.length, gap = T / L;
  const k = 1 - ease(clamp(p / 0.4)); // 1 at the hero, 0 once the book has reached the centre

  let done = 0;
  const t = leaves.map((leaf, i) => (i < turns ? ease(clamp((u - i) / TURN)) : 0));
  const turned = t.reduce((a, b) => a + b, 0);
  leaves.forEach((leaf, i) => {
    if (t[i] > 0.5) done++;
    // Unturned leaves pile up on the right with the first on top; turned ones pile on the left the other way round.
    const z = lerp(L - i, i + 1, t[i]) * gap;
    leaf.el.style.transform = `translateZ(${z}px) rotateY(${-180 * t[i]}deg)`;
    if (leaf.blank) leaf.blank.style.opacity = 1 - clamp((t[i] - 0.75) / 0.25); // a turned single page fades off-screen
  });

  // The piles under the leaves: the right one thins out as the left one grows.
  // (Kept a hair below the top leaf, so the edges never poke through it.)
  book.style.setProperty('--fr', Math.max(0, L - turned - 0.4) / L);
  book.style.setProperty('--fl', Math.max(0, turned - 0.4) / L);
  book.classList.toggle('no-left', turned < 0.45);
  book.classList.toggle('no-right', L - turned < 0.45);
  book.classList.toggle('is-open', t[0] > 0.98);
  book.classList.toggle('is-done', !single && t[L - 1] > 0.02);

  // Closed, a spread book only shows its right half: slide it so what is visible stays centred.
  const bw = book.offsetWidth;
  const x = single ? 0 : bw * (-0.25 * (1 - t[0]) + 0.25 * t[L - 1]);
  const y = 0;
  const s = lerp(1, 0.86, k);
  const rx = lerp(9, 18, k) - mouse.y * 3, ry = lerp(0, -9, k) + mouse.x * 4, rz = lerp(0, 3, k);
  wrap.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s}) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;

  hero.style.opacity = k;
  hero.style.visibility = k < 0.02 ? 'hidden' : '';
  let active = null;
  for (const b of nav.children) { b.classList.remove('is-on'); if (+b.dataset.turns <= done) active = b; }
  active?.classList.add('is-on');
  nav.style.opacity = 1 - k;
}
const loop = now => { step(now); requestAnimationFrame(loop); };
requestAnimationFrame(loop);

// Lets the console or a test jump straight to a point of the journey and draw it: __go(3.5).
window.__go = x => { scrollTo({ top: x * UNIT * H, behavior: 'instant' }); step(performance.now(), true); };
