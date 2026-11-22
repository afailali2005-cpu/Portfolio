import * as THREE from 'three';
import { siInstagram, siTiktok, siYoutube, siMeta, siGoogleads, siWhatsapp, siFacebook, siX, siPinterest, siShopify, siGoogleanalytics, siMailchimp } from 'simple-icons';

// Artwork spread over the endless puzzle: the generated illustration plus brand marks drawn on top, so the logos
// stay sharp and can be swapped here without regenerating the image. Coordinates are in the 1024×1024 space of the art.
const SIZE = 1024;

/**
 * Draws a brand mark centred on x, y in its own colour, on a white app-icon tile so it stands out on any part of
 * the artwork. `size` is the glyph; the tile is half as big again. simple-icons paths are 24 units wide.
 */
function mark(ctx, icon, x, y, size) {
  const tile = size * 1.5, look = LOOKS.get(icon) ?? {};
  ctx.save();
  ctx.translate(x, y);
  ctx.shadowColor = 'rgba(1, 3, 10, .55)';
  ctx.shadowBlur = tile * 0.22;
  ctx.shadowOffsetY = tile * 0.06;
  ctx.fillStyle = look.tile ?? '#ffffff';
  ctx.beginPath();
  ctx.roundRect(-tile / 2, -tile / 2, tile, tile, tile * 0.24);
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.translate(-size / 2, -size / 2);
  ctx.scale(size / 24, size / 24);
  ctx.fillStyle = look.glyph ? look.glyph(ctx) : `#${icon.hex}`;
  ctx.fill(new Path2D(icon.path));
  ctx.restore();
}
// Marks whose real look is more than one flat colour on white.
const LOOKS = new Map([
  [siInstagram, { glyph: ctx => { const g = ctx.createLinearGradient(0, 24, 24, 0); [[0, '#feda75'], [0.3, '#fa7e1e'], [0.55, '#d62976'], [0.8, '#962fbf'], [1, '#4f5bd5']].forEach(([t, col]) => g.addColorStop(t, col)); return g; } }],
  [siMailchimp, { tile: '#ffe01b', glyph: () => '#241c15' }],
]);

const load = src => new Promise((ok, fail) => { const im = new Image(); im.onload = () => ok(im); im.onerror = fail; im.src = src; });

function toTexture(canvas) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  // Past its edges the mural repeats mirrored, so the joins are seamless.
  tex.wrapS = tex.wrapT = THREE.MirroredRepeatWrapping;
  return tex;
}

/** Strategy mural: channels on the funnel levels, tools on the sticky note. */
export async function muralTexture() {
  const art = await load('/pieces/estrategia.jpg');
  const c = document.createElement('canvas');
  c.width = c.height = SIZE;
  const ctx = c.getContext('2d');
  ctx.drawImage(art, 0, 0, SIZE, SIZE);

  // The art is chalk on a navy blueprint; the puzzle is white paper. Turn it into ink on paper: the navy sheet and
  // its grid go white, the white chalk becomes navy ink, and anything already blue (funnel, arrow) keeps its colour.
  const img = ctx.getImageData(0, 0, SIZE, SIZE), d = img.data;
  const INK = [3, 25, 91];
  for (let i = 0; i < d.length; i += 4) {
    const max = Math.max(d[i], d[i + 1], d[i + 2]), min = Math.min(d[i], d[i + 1], d[i + 2]);
    const t = Math.min(1, Math.max(0, (max / 255 - 0.3) / 0.25));
    const ink = t * t * (3 - 2 * t);                                   // 0 on the paper, 1 on a drawing
    const own = Math.min(1, Math.max(0, ((max - min) / max - 0.1) / 0.3)); // how blue the drawing itself is
    for (let ch = 0; ch < 3; ch++) {
      const colour = INK[ch] + (d[i + ch] - INK[ch]) * own;
      d[i + ch] = 255 + (colour - 255) * ink;
    }
  }
  ctx.putImageData(img, 0, 0);

  // The generator misspelt the timeline label: paint it out with the paper colour next to it.
  const [r, g, b] = ctx.getImageData(462, 896, 1, 1).data;
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(482, 878, 122, 36);

  // Funnel, top to bottom: where people find you, where you pay to reach them, where they write to you.
  [[siInstagram, 112], [siTiktok, 196], [siYoutube, 280]].forEach(([icon, x]) => mark(ctx, icon, x, 80, 40));
  [[siMeta, 160], [siGoogleads, 232]].forEach(([icon, x]) => mark(ctx, icon, x, 168, 32));
  mark(ctx, siWhatsapp, 196, 238, 28);

  // Sticky note: a 3×2 grid of tools, tilted like the note itself.
  ctx.save();
  ctx.translate(838, 182);
  ctx.rotate(0.07);
  [siFacebook, siX, siPinterest, siShopify, siGoogleanalytics, siMailchimp].forEach((icon, i) =>
    mark(ctx, icon, ((i % 3) - 1) * 70, (Math.floor(i / 3) - 0.5) * 74, 38));
  ctx.restore();

  return toTexture(c);
}
