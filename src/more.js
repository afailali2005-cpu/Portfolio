// Named imports, so only these marks end up in the bundle. A tool whose `icon` is not listed here shows its initial.
import { siMeta, siInstagram, siTiktok, siShopify, siMailchimp, siGoogleads, siGoogleanalytics, siGooglesearchconsole, siFigma, siThreedotjs, siTailwindcss, siReact, siTypescript, siSupabase, siStripe, siFlutter, siPython, siGithub, siClaude, siGooglegemini, siElevenlabs, siN8n, siCloudflare } from 'simple-icons';
import { PROJECTS, ALSO, STATS, TOOLS } from './content.js';

const icons = { siMeta, siInstagram, siTiktok, siShopify, siMailchimp, siGoogleads, siGoogleanalytics, siGooglesearchconsole, siFigma, siThreedotjs, siTailwindcss, siReact, siTypescript, siSupabase, siStripe, siFlutter, siPython, siGithub, siClaude, siGooglegemini, siElevenlabs, siN8n, siCloudflare };

// Fills the section that follows the puzzle from src/content.js and reveals its blocks as they scroll into view.
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};
const tags = list => {
  const ul = el('ul', 'chips');
  ul.append(...list.map(t => el('li', '', t)));
  return ul;
};

document.getElementById('projects').append(...PROJECTS.map((p, i) => {
  const card = el('article', 'card');
  card.append(el('span', 'card-n', String(i + 1).padStart(2, '0')), el('p', 'card-kind', p.kind), el('h3', '', p.name), el('p', 'card-text', p.text), tags(p.tags));
  return card;
}));
document.getElementById('also').append(...ALSO.map(t => el('li', '', t)));

document.getElementById('stats').append(...STATS.map(s => {
  const li = el('li', 'stat');
  li.append(el('strong', '', s.n), el('span', '', s.label));
  return li;
}));

const SVG = 'http://www.w3.org/2000/svg';
document.getElementById('tools').append(...TOOLS.map(g => {
  const row = el('div', 'tool-row');
  const list = el('ul', 'tool-list');
  list.append(...g.items.map(([name, key]) => {
    const li = el('li', 'tool');
    const icon = key && icons[key];
    if (icon) {
      const svg = document.createElementNS(SVG, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');
      const path = document.createElementNS(SVG, 'path');
      path.setAttribute('d', icon.path);
      svg.append(path);
      li.append(svg);
    } else {
      li.append(el('span', 'tool-initial', name[0]));
    }
    li.append(el('span', 'tool-name', name));
    return li;
  }));
  row.append(el('h3', 'tool-group', g.group), list);
  return row;
}));

const blocks = document.querySelectorAll('.more .block');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  blocks.forEach(b => { b.classList.add('will-reveal'); io.observe(b); });
}
