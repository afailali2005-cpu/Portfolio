import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import fontData from 'three/examples/fonts/helvetiker_bold.typeface.json';
import { PIECES } from './content.js';
import { muralTexture } from './textures.js';

// The whole page is one scene driven by scroll progress `p`:
//   0 → 1          hero, the chrome pieces float
//   1+i → 2+i      piece i flies to the centre, shows its text inside, then locks into its slot in the row
//   6 → 7.5        the row tilts back and the puzzle fills in around it as far as the eye can see
//   7.5 → 8.5      the camera travels over that endless puzzle
// Every pose is a pure function of `p`, so scrolling back plays it in reverse and the pieces leave their slots.
const N = PIECES.length;
const HALF = (N - 1) / 2;
const END = N + 3.5;
const BG = 0x01030a, PAPER = 0xe3efff; // the page is black until the puzzle fills in, then the horizon is paper too
// Palette, dark to light: one blue per piece, and the endless puzzle runs through all of them.
const BLUES = [0x0b2cb1, 0x1340d6, 0x1951fc, 0x3781fc, 0x5aa9fd, 0x93cbfd, 0xcbe9fd];
const GLOW = [0.18, 0.18, 0.18, 0.15, 0.08, 0.04, 0.02]; // lighter blues glow less, or they burn out
const NAVY = 0x03195b, ICE = 0xe6f4ff;
const FIELD = [0xffffff, 0xd4e2ff, 0x8aa6f2, 0x3f5ac0]; // tint over the mural, near to far: full colour by the row, fading with distance
const MURAL = 8; // the artwork spans this many pieces each way, then repeats mirrored
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => t * t * (3 - 2 * t);

// ── Renderer, camera, light ────────────────────────────────────────────────
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
const scene = new THREE.Scene();
scene.background = new THREE.Color(BG);
scene.fog = new THREE.Fog(BG, 9, 19);
const CAM_Z = 8;
const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
camera.position.set(0, 0, CAM_Z);

// Chrome needs something to reflect: a hand-painted black-and-white studio, hard bands and soft boxes.
function studio() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 512);
  [[0, '#ffffff'], [0.3, '#d8d8d8'], [0.46, '#3a3a3a'], [0.56, '#000000'], [0.75, '#2b2b2b'], [1, '#9a9a9a']].forEach(([s, col]) => g.addColorStop(s, col));
  x.fillStyle = g; x.fillRect(0, 0, 1024, 512);
  x.fillStyle = '#ffffff';
  [[40, 190, 90, 150], [300, 170, 40, 190], [520, 200, 130, 120], [790, 180, 50, 170], [930, 210, 70, 110]].forEach(r => x.fillRect(...r));
  x.fillStyle = '#000000';
  [[170, 40, 70, 90], [640, 30, 110, 70], [420, 330, 60, 120]].forEach(r => x.fillRect(...r));
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(tex).texture;
  tex.dispose(); pmrem.dispose();
  return env;
}
scene.environment = studio();
const key = new THREE.DirectionalLight(0xffffff, 0.9);
key.position.set(-3, 5, 6);
scene.add(key);

// ── Jigsaw geometry ────────────────────────────────────────────────────────
// One side of a 100×100 piece drawn left to right along its top edge; d = 1 knob, -1 socket.
const side = d => [
  ['l', 35, 0],
  ['c', 5, 0, 6, -4 * d, 4, -9 * d],
  ['c', -4, -10 * d, 3, -18 * d, 11, -18 * d],
  ['c', 8, 0, 15, 8 * d, 11, 18 * d],
  ['c', -2, 5 * d, -1, 9 * d, 4, 9 * d],
  ['l', 35, 0],
];
/** Outline of a unit piece centred on the origin, tabs given as [top, right, bottom, left]. */
function pieceShape(tabs) {
  const s = new THREE.Shape();
  const P = (px, py) => [(px - 50) / 100, (50 - py) / 100];
  let x = 0, y = 0;
  s.moveTo(...P(0, 0));
  tabs.forEach((d, k) => {
    for (const [cmd, ...n] of side(d)) {
      const a = [];
      for (let i = 0; i < n.length; i += 2) {
        let dx = n[i], dy = n[i + 1];
        for (let q = 0; q < k; q++) [dx, dy] = [-dy, dx];
        a.push(x + dx, y + dy);
      }
      if (cmd === 'l') s.lineTo(...P(a[0], a[1]));
      else s.bezierCurveTo(...P(a[0], a[1]), ...P(a[2], a[3]), ...P(a[4], a[5]));
      x = a[a.length - 2]; y = a[a.length - 1];
    }
  });
  return s;
}
// A grid of identical pieces tiles perfectly when every other one is turned 90°: knobs left/right, sockets top/bottom.
const SHAPE = pieceShape([-1, 1, -1, 1]);
const DEPTH = 0.16, BEVEL = 0.03;
const solid = (curveSegments, bevelSegments) => {
  const g = new THREE.ExtrudeGeometry(SHAPE, { depth: DEPTH, bevelEnabled: true, bevelThickness: BEVEL, bevelSize: BEVEL, bevelOffset: -BEVEL, bevelSegments, curveSegments });
  g.translate(0, 0, -DEPTH / 2);
  return g;
};
const FACE_Z = DEPTH / 2 + BEVEL;
const pieceGeo = solid(14, 5);
const fieldGeo = solid(4, 1);
// Glossy glass-like blue: a satin face that glows a little and a mirror-bright rim.
const faceOf = (color, glow = 0.18) => new THREE.MeshPhysicalMaterial({ color, metalness: 0.35, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.12, emissive: color, emissiveIntensity: glow, envMapIntensity: 0.9 });
const rimOf = color => new THREE.MeshPhysicalMaterial({ color, metalness: 0.9, roughness: 0.08, clearcoat: 1, emissive: color, emissiveIntensity: 0.06, envMapIntensity: 1.1 });
const wordMat = dark => new THREE.MeshStandardMaterial({ color: dark ? NAVY : ICE, metalness: 0.3, roughness: 0.3, emissive: dark ? 0x000000 : ICE, emissiveIntensity: dark ? 0 : 0.18 });
const faceMat = faceOf(0xffffff, 0), chromeMat = rimOf(0xffffff); // white base for the field, tinted per instance
chromeMat.emissiveIntensity = 0; // the field does not glow: only the five named pieces do
/** Whether the piece at grid cell (r, c) keeps the base orientation (knobs left/right). */
// The parity is set so the first named piece is always upright, whatever the (odd) number of pieces.
const upright = (r, c) => (((r + c + HALF) % 2) + 2) % 2 === 0;

// ── The five named pieces ──────────────────────────────────────────────────
const font = new FontLoader().parse(fontData);
// Where each one drifts before its turn: x/y as a fraction of the half-screen, depth, size and resting tilt.
const DRIFT = [
  { x: -0.5, y: 0.48, z: 0.2, s: 0.95, rx: -0.5, ry: 0.6, rz: 0.2 },
  { x: 0.52, y: 0.5, z: -1.2, s: 0.8, rx: 0.4, ry: -0.7, rz: -0.3 },
  { x: 0.1, y: 0.02, z: 0.4, s: 1.25, rx: -0.35, ry: 0.5, rz: 0.25 },
  { x: -0.62, y: -0.2, z: -0.8, s: 0.7, rx: 0.5, ry: 0.8, rz: -0.2 },
  { x: 0.6, y: -0.42, z: 0.3, s: 0.9, rx: -0.6, ry: -0.5, rz: 0.35 },
  { x: -0.12, y: 0.62, z: -1.6, s: 0.6, rx: 0.3, ry: 0.4, rz: -0.35 },
  { x: 0.08, y: -0.6, z: -1, s: 0.65, rx: -0.4, ry: -0.6, rz: 0.15 },
];
const pieces = PIECES.map((data, i) => {
  const col = i - HALF;
  const landscape = upright(0, col); // free band across the face runs left-right; otherwise top-bottom
  const group = new THREE.Group();
  const color = BLUES[i % BLUES.length];
  const darkText = i % BLUES.length >= 4; // the lightest pieces carry navy lettering
  const body = new THREE.Mesh(pieceGeo, [faceOf(color, GLOW[i % BLUES.length]), rimOf(color)]);
  if (!landscape) body.rotation.z = Math.PI / 2;
  group.add(body);
  const tg = new TextGeometry(data.word, { font, size: 0.2, depth: 0.035, curveSegments: 6, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.004, bevelSegments: 2 });
  tg.computeBoundingBox();
  const bb = tg.boundingBox;
  const w = bb.max.x - bb.min.x, h = bb.max.y - bb.min.y;
  tg.translate(-(bb.min.x + w / 2), -(bb.min.y + h / 2), 0);
  const fit = Math.min((landscape ? 0.8 : 0.44) / w, 0.2 / h);
  const word = new THREE.Mesh(tg, wordMat(darkText));
  word.position.z = FACE_Z;
  group.add(word);
  scene.add(group);
  // In focus the word moves up to make room for the copy underneath it.
  const focusWord = landscape ? { y: 0.16, s: Math.min(fit * 0.62, 0.42 / w) } : { y: 0.335, s: Math.min(fit, 0.4 / w) };
  return { data, col, landscape, darkText, group, word, fit, focusWord, drift: DRIFT[i % DRIFT.length] };
});

// ── The row they lock into, and the endless puzzle around it ───────────────
const board = new THREE.Group();   // placed and tilted as a whole
const travel = new THREE.Group();  // slides under the camera at the very end
board.add(travel);
scene.add(board);
const R = 22, AHEAD = 38; // extra rows towards the horizon, so the travel at the end never reaches an edge
const cells = [];
for (let r = -R + 6; r <= AHEAD; r++) for (let c = -R; c <= R; c++) if (!(r === 0 && Math.abs(c) <= HALF)) cells.push([r, c]);
const fieldMat = chromeMat.clone();
fieldMat.transparent = true;
// Matte, so the flat puzzle shows the artwork instead of mirroring the lights.
Object.assign(fieldMat, { clearcoat: 0, roughness: 0.35, envMapIntensity: 0.45 });
const fieldFace = faceMat.clone();
fieldFace.transparent = true;
const field = new THREE.InstancedMesh(fieldGeo, [fieldFace, fieldMat], cells.length);
{
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), turn = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
  const one = new THREE.Vector3(1, 1, 1);
  const tint = new THREE.Color(), a = new THREE.Color(), b = new THREE.Color();
  cells.forEach(([r, c], i) => {
    m.compose(new THREE.Vector3(c, r, 0), upright(r, c) ? q : turn, one);
    field.setMatrixAt(i, m);
    // Mid blue near the row, sinking into navy with distance, with a little per-piece variation.
    const k = clamp(Math.hypot(r, c * 0.8) / 13 + (((r * 7 + c * 13) % 5) - 2) * 0.04) * (FIELD.length - 1);
    const lo = Math.min(FIELD.length - 2, Math.floor(k));
    field.setColorAt(i, tint.lerpColors(a.set(FIELD[lo]), b.set(FIELD[lo + 1]), k - lo));
  });
}
field.frustumCulled = false;
travel.add(field);
// The artwork is one mural spread over the whole endless puzzle: every piece shows the fragment that falls on it.
// The face is textured by where the piece sits in the grid, not by its own outline.
fieldFace.onBeforeCompile = shader => {
  shader.vertexShader = shader.vertexShader.replace('#include <uv_vertex>', `#include <uv_vertex>
    vec2 muralUv = (instanceMatrix * vec4(position, 1.0)).xy / ${MURAL.toFixed(1)} + 0.5;
    #ifdef USE_MAP
      vMapUv = muralUv;
    #endif
    #ifdef USE_EMISSIVEMAP
      vEmissiveMapUv = muralUv;
    #endif`);
};
muralTexture().then(tex => {
  fieldFace.map = fieldFace.emissiveMap = tex;
  fieldFace.emissive.set(0xffffff);
  fieldFace.emissiveIntensity = 0.55;
  fieldFace.metalness = 0;
  fieldFace.roughness = 0.75;
  fieldFace.clearcoat = 0;
  fieldFace.envMapIntensity = 0.25;
  fieldFace.needsUpdate = true;
}).catch(() => {}); // without the image the puzzle stays plain

// ── Small flat pieces drifting in the background, as in the reference ──────
const FLAKES = 70;
const flakeMat = new THREE.MeshBasicMaterial({ color: 0x3781fc, side: THREE.DoubleSide, transparent: true });
const flakes = new THREE.InstancedMesh(new THREE.ShapeGeometry(SHAPE, 4), flakeMat, FLAKES);
flakes.frustumCulled = false;
scene.add(flakes);
const rnd = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
const flakeSeeds = Array.from({ length: FLAKES }, () => ({ x: rnd() * 2 - 1, y: rnd() * 2 - 1, z: -1.5 - rnd() * 7, s: 0.08 + rnd() * 0.22, a: rnd() * 6.28, b: rnd() * 6.28, v: 0.15 + rnd() * 0.4 }));

// ── Overlays ───────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const heroEl = $('hero'), finalEl = $('final'), infoEl = $('info'), moreEl = document.querySelector('.more');
const bgDark = new THREE.Color(BG), bgPaper = new THREE.Color(PAPER);
let shown = -1;
function fillInfo(i) {
  if (i === shown) return;
  shown = i;
  const d = PIECES[i];
  $('info-count').textContent = `${String(i + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')}`;
  $('info-q').textContent = d.q ?? '';
  $('info-word').textContent = d.word;
  $('info-text').textContent = d.text;
  $('info-tags').replaceChildren(...d.tags.map(t => Object.assign(document.createElement('li'), { textContent: t })));
}

// ── Layout and input ───────────────────────────────────────────────────────
// Soft glow around the bright blues.
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.14, 0.5, 0.94));
composer.addPass(new OutputPass());
let W = 1, H = 1;
const UNIT = 1.15; // screens of scroll per unit of progress
function resize() {
  W = innerWidth; H = innerHeight;
  renderer.setSize(W, H, false);
  composer.setSize(W, H);
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  $('track').style.height = `${(END * UNIT + 1) * H}px`;
}
addEventListener('resize', resize);
resize();
// `|| 0`: a page loaded with no height yet (a background tab) would otherwise start at NaN and never recover.
const target = () => clamp(scrollY / (END * UNIT * H) || 0, 0, 1) * END;
let p = target();
const mouse = { x: 0, y: 0 };
addEventListener('pointermove', e => { mouse.x = (e.clientX / W) * 2 - 1; mouse.y = (e.clientY / H) * 2 - 1; });
const viewH = z => 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (CAM_Z - z);

// ── Frame ──────────────────────────────────────────────────────────────────
const v = new THREE.Vector3(), slotPos = new THREE.Vector3(), q = new THREE.Quaternion(), boardQ = new THREE.Quaternion();
const eul = new THREE.Euler(), mat = new THREE.Matrix4(), sc = new THREE.Vector3();
const FOCUS_Z = 2; // in front of everything that is still drifting
let last = performance.now();
function step(now, jump = false) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  const t = reduced ? 0 : now / 1000;
  p += (target() - p) * (reduced || jump ? 1 : 1 - Math.exp(-dt * 6));

  const H0 = viewH(0), W0 = H0 * camera.aspect;
  const fill = ease(clamp((p - (N + 1)) / 1.5));   // the endless puzzle appears
  const fly = clamp(p - (N + 2.5));                // the camera travels over it

  // The row waits along the bottom edge; at the end it grows, tilts back and becomes the horizon.
  const rowScale = Math.min(0.62, (W0 * 0.9) / (N + 0.6));
  board.position.set(0, lerp(-H0 / 2 + rowScale * 0.95, -0.35, fill), 0);
  board.scale.setScalar(lerp(rowScale, 0.85, fill));
  board.rotation.x = lerp(0, -1.08, fill);
  travel.position.y = -fly * 7;
  field.position.z = -(1 - fill) * 2.5;
  field.visible = fill > 0.001;
  scene.background.lerpColors(bgDark, bgPaper, fill);
  scene.fog.color.copy(scene.background);
  // Over the white puzzle the header turns navy, until the dark section that follows slides under it.
  document.body.classList.toggle('on-paper', fill > 0.5 && moreEl.getBoundingClientRect().top > 60);
  fieldMat.opacity = fieldFace.opacity = clamp((p - (N + 1)) / 0.9);
  board.updateMatrixWorld(true);
  board.getWorldQuaternion(boardQ);

  // Size of the focused piece: as large as the screen allows, knobs included.
  const focusScale = Math.min(viewH(FOCUS_Z) * 0.78, viewH(FOCUS_Z) * camera.aspect * 0.6);
  const bodyPx = (focusScale / viewH(FOCUS_Z)) * H;

  let active = -1, activeAlpha = 0;
  pieces.forEach((pc, i) => {
    const lt = clamp(p - (1 + i));
    const a = ease(clamp(lt / 0.35));            // drift → centre
    const b = ease(clamp((lt - 0.68) / 0.32));   // centre → slot
    const d = pc.drift;
    // Drifting pose.
    pc.group.position.set(d.x * W0 / 2, d.y * H0 / 2 + Math.sin(t * 0.7 + i * 1.7) * 0.14, d.z);
    eul.set(d.rx + Math.sin(t * 0.5 + i) * 0.3, d.ry + Math.sin(t * 0.33 + i * 2) * 0.55, d.rz + Math.sin(t * 0.4 + i * 3) * 0.15);
    pc.group.quaternion.setFromEuler(eul);
    let s = d.s * Math.min(1, W0 / 4);
    // Towards the centre, facing the visitor (leaning a little with the pointer).
    eul.set(mouse.y * 0.07, mouse.x * 0.1, 0);
    pc.group.position.lerp(v.set(0, 0, FOCUS_Z), a);
    pc.group.quaternion.slerp(q.setFromEuler(eul), a);
    s = lerp(s, focusScale, a);
    // Into its slot.
    slotPos.set(pc.col, 0, 0).applyMatrix4(travel.matrixWorld);
    pc.group.position.lerp(slotPos, b);
    pc.group.quaternion.slerp(boardQ, b);
    s = lerp(s, board.scale.x, b);
    pc.group.scale.setScalar(s);
    const w = a * (1 - b);
    pc.word.position.y = lerp(0, pc.focusWord.y, w);
    pc.word.scale.setScalar(lerp(pc.fit, pc.focusWord.s, w));
    const alpha = clamp((lt - 0.27) / 0.12) * (1 - clamp((lt - 0.6) / 0.1));
    if (alpha > activeAlpha) { active = i; activeAlpha = alpha; }
  });

  // Copy inside the focused piece.
  infoEl.style.opacity = activeAlpha;
  if (active >= 0) {
    fillInfo(active);
    const pc = pieces[active];
    const card = bodyPx < 480;
    infoEl.classList.toggle('is-card', card);
    infoEl.classList.toggle('is-centred', !card && pc.landscape);
    infoEl.style.textShadow = pc.darkText ? 'none' : '';
    infoEl.style.color = card || !pc.darkText ? '' : 'var(--navy)';
    // Flat area of the face left free by the sockets, in piece units: centre offset (y down) and size.
    const area = card ? null : pc.landscape ? { cy: 0.09, w: 0.44, h: 0.3 } : { cy: 0.07, w: 0.4, h: 0.6 };
    const wPx = card ? Math.min(W * 0.88, 380) : area.w * bodyPx;
    const hPx = card ? null : area.h * bodyPx;
    infoEl.style.width = `${wPx}px`;
    infoEl.style.height = card ? 'auto' : `${hPx}px`;
    infoEl.style.fontSize = card ? '' : `${clamp(bodyPx * 0.024, 13, 19)}px`;
    const top = card ? H / 2 - infoEl.offsetHeight / 2 : H / 2 + area.cy * bodyPx - hPx / 2;
    infoEl.style.transform = `translate(${(W - wPx) / 2}px, ${top}px)`;
    // On small screens the card covers the word, so the 3D one steps back.
    pc.word.visible = !card || activeAlpha < 0.5;
  }
  pieces.forEach((pc, i) => { if (i !== active) pc.word.visible = true; });

  heroEl.style.opacity = 1 - clamp(p / 0.6);
  finalEl.style.opacity = clamp((p - (N + 1.9)) / 0.6);

  // Background flakes.
  flakeSeeds.forEach((f, i) => {
    const spread = viewH(f.z) * 0.62;
    v.set(f.x * spread * camera.aspect, f.y * spread + Math.sin(t * f.v + f.a) * 0.2 + p * 0.25, f.z);
    eul.set(f.a + t * f.v * 0.6, f.b + t * f.v * 0.4, f.a);
    mat.compose(v, q.setFromEuler(eul), sc.setScalar(f.s));
    flakes.setMatrixAt(i, mat);
  });
  flakes.instanceMatrix.needsUpdate = true;

  camera.position.x = lerp(camera.position.x, mouse.x * 0.25, 0.05);
  camera.position.y = lerp(camera.position.y, -mouse.y * 0.18, 0.05);
  camera.lookAt(0, 0, 0);
  composer.render();
}
const loop = now => { step(now); requestAnimationFrame(loop); };
requestAnimationFrame(loop);

// Lets the console or a test jump straight to a point of the journey and draw it: __go(3.5).
window.__go = x => { scrollTo({ top: x * UNIT * H, behavior: 'instant' }); step(performance.now(), true); };
