// The pieces, in the order they lock in. `word` is modelled in 3D on the piece (capitals, no accents: the 3D font
// has none); `q` is the client's question the piece answers; the rest is shown inside the piece while it is in focus.
// Keep the count odd, so the row is centred on a whole piece.
export const PIECES = [
  {
    word: 'ESTRATEGIA',
    q: '¿Por dónde empiezo?',
    text: 'Antes de publicar nada: a quién le hablas, qué le duele y qué tiene que pasar para que te compre.',
    tags: ['Público', 'Posicionamiento', 'Plan'],
  },
  {
    word: 'MARCA',
    q: '¿Cómo me reconocen?',
    text: 'Una voz y una imagen que se reconocen sin ver el logo, en cada pieza y en cada canal.',
    tags: ['Identidad', 'Tono', 'Mensaje'],
  },
  {
    word: 'CONTENIDO',
    q: '¿Qué publico?',
    text: 'Carruseles, historias y vídeo pensados para que te escriban, no solo para que te den like.',
    tags: ['Reels', 'Carruseles', 'Copy'],
  },
  {
    word: 'ADS',
    q: '¿Cómo llego a más gente?',
    text: 'Campañas que ponen ese contenido delante de quien ya está buscando lo que vendes.',
    tags: ['Meta Ads', 'SEO y SEM', 'Email'],
  },
  {
    word: 'WEB',
    q: '¿Y dónde me compran?',
    text: 'Webs, tiendas online y apps completas, con registro, pagos y suscripciones.',
    tags: ['Landing', 'Tienda online', 'SaaS'],
  },
  {
    word: 'IA',
    q: '¿Se puede hacer solo?',
    text: 'Automatizaciones e IA para que lo repetitivo se haga solo: vídeo, imágenes, voz y flujos.',
    tags: ['n8n', 'Vídeo con IA', 'Agentes de voz'],
  },
  {
    word: 'RESULTADOS',
    q: '¿Cómo sé que funciona?',
    text: 'Leads, ventas y coste por cliente medidos cada semana, para repetir lo que funciona.',
    tags: ['Analítica', 'Informes', 'Mejora'],
  },
];

// ── The section after the puzzle: proof, in as few words as possible ─────────

export const PROJECTS = [
  { name: 'StorySeller', kind: 'SaaS propio', text: 'De una idea a carruseles y vídeos listos para publicar.', tags: ['IA', 'Pagos', 'Vídeo'] },
  { name: 'Habitour', kind: 'SaaS · en construcción', text: 'Vídeos de cine y tours 3D de una vivienda a partir de fotos.', tags: ['Vídeo con IA', '3D', 'Inmobiliarias'] },
  { name: 'Vandala Studio', kind: 'Marca', text: 'Identidad de marca creada desde cero.', tags: ['Logo', 'Tono', 'Manual'] },
  { name: 'Agencia', kind: 'Cofundador', text: 'Ads, SEO y contenido para clientes, con informes de campaña.', tags: ['Meta Ads', 'SEO', 'Contenido'] },
];
export const ALSO = ['App móvil LOCKD', 'Contador de repeticiones con visión por ordenador', 'Flujos n8n para clientes', 'Tiendas online', 'Bot de trading'];

export const STATS = [
  { n: '2', label: 'empresas cofundadas' },
  { n: '2', label: 'productos SaaS' },
  { n: '300', label: 'tests automáticos en un solo producto' },
  { n: '3', label: 'idiomas: catalán, español e inglés' },
];

// Tools by what they are for. `icon` is the simple-icons export name; tools without one show as a text tile.
export const TOOLS = [
  { group: 'Vender', items: [['Meta Ads', 'siMeta'], ['Instagram', 'siInstagram'], ['TikTok Shop', 'siTiktok'], ['Shopify', 'siShopify'], ['Mailchimp', 'siMailchimp'], ['Google Ads', 'siGoogleads'], ['Analytics', 'siGoogleanalytics'], ['Search Console', 'siGooglesearchconsole'], ['LinkedIn']] },
  { group: 'Diseñar', items: [['Figma', 'siFigma'], ['Canva'], ['Three.js', 'siThreedotjs'], ['Tailwind', 'siTailwindcss']] },
  { group: 'Construir', items: [['Lovable'], ['React', 'siReact'], ['TypeScript', 'siTypescript'], ['Supabase', 'siSupabase'], ['Stripe', 'siStripe'], ['Flutter', 'siFlutter'], ['Python', 'siPython'], ['GitHub', 'siGithub']] },
  { group: 'Automatizar', items: [['Claude', 'siClaude'], ['Gemini', 'siGooglegemini'], ['ElevenLabs', 'siElevenlabs'], ['Higgsfield'], ['n8n', 'siN8n'], ['Cloudflare', 'siCloudflare']] },
];
