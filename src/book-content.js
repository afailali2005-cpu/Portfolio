// Everything the book says. Empty strings ('') show on the page as a dashed "pendiente" note, so nothing invented
// ever looks like a real result: fill them in and the note disappears.

export const ME = {
  name: 'ADAM',
  kicker: 'Estudiante de Marketing y Publicidad · Desarrollo web',
  coverLine: 'Estudiante de Marketing y Publicidad', // foot of the front cover
  title: 'Aprendo construyendo proyectos reales.',
  sub: 'Busco prácticas para seguir aprendiendo al lado de un equipo. Traigo ganas, curiosidad y lo que he ido construyendo por mi cuenta.',
  availableFrom: '', // e.g. 'marzo 2027' → "Disponible para prácticas · marzo 2027"
  email: 'afailali2005@gmail.com',
  phone: '685 374 527', // shown like this; copied and dialled without the spaces
};

// First spread: the portrait on the left, this on the right. An empty fact shows as "pendiente".
export const BIO = {
  hello: 'Hola, soy Adam',
  text: [
    'Estudio Marketing y Publicidad y llevo años construyendo proyectos propios. No son un pasatiempo: son lo que quiero sacar adelante.',
    'Me gusta tanto la parte creativa como la técnica: campañas, contenido, webs y automatizaciones con IA.',
    'Busco prácticas en un equipo del que aprender y al que poder echar una mano desde el primer día.',
  ],
  facts: [
    ['Estudios', 'CFGS de Marketing y Publicidad, en curso'],
    ['Idiomas', 'Catalán, español, inglés, árabe y francés'],
    ['Dónde', 'Girona'],
  ],
};

// Set to true to bring the "Cómo puedo ayudar" spread back (it sits after the projects).
export const SHOW_HELP = false;

// "Cómo puedo ayudar": everyday tasks I can lend a hand with while I learn.
export const HELP = [
  { t: 'Ganas de aprender', d: 'Pregunto, tomo nota y aplico. Prefiero que me corrijan pronto a equivocarme en silencio.' },
  { t: 'Manos a la obra', d: 'Maqueto landings, preparo contenido y ayudo a configurar la medición de las campañas.' },
  { t: 'Marketing y técnica', d: 'Entiendo un poco de las dos partes y puedo echar una mano entre equipos.' },
];

// One spread each. `role` is the gap it shows you can fill; `origin` is 'Proyecto propio' or 'Cliente real'.
// Left page: `visual` picks what goes under the title: 'habitour' (drawing, or your own picture if `image` is set),
// 'carousel' (the structure of an example carousel, from CAROUSEL below), 'countdown' (to `launch`), or nothing for
// the 60-second tour slot (`video` takes an .mp4 path or an embed URL).
// Right page: `blocks` are the titled paragraphs. Without them the page shows reto / ejecución / resultado.
// `url` is the live link and `urlLabel` what it reads.
export const PROJECTS = [
  {
    name: 'Habitour',
    role: 'Automatización & IA',
    origin: 'Proyecto propio',
    status: 'En construcción',
    line: 'Vídeos de cine y tours 3D de una vivienda a partir de fotos.',
    visual: 'habitour',
    image: '/pieces/habitour.jpg', // any project can set `image` (a file in public/pieces): it shows framed beside the number
    blocks: [
      { t: 'Qué es', d: 'Una herramienta para inmobiliarias. El agente sube las fotos de un piso y recibe un vídeo de presentación con acabado de cine, listo para publicar.' },
      { t: 'Tours 3D', d: 'Con un escaneo hecho desde el móvil, la vivienda se convierte en un recorrido 3D que el comprador mueve a su ritmo.' },
      { t: 'Qué estoy aprendiendo', d: 'A conectar servicios de IA entre sí y a calcular lo que cuesta cada vídeo antes de ponerle precio.' },
    ],
    // Pictures inside the two result cards of the drawing; leave one empty to keep its icon.
    cards: { video: '/pieces/habitour-video.jpg', tour: '/pieces/habitour-tour3d.jpg' },
    // Closes the right page in large red type. Any project can set `problem`.
    problem: 'Una inmobiliaria no puede pagar a un profesional 3D por cada vivienda que entra en su cartera.',
    stack: [],
    url: '',
  },
  {
    name: 'StorySeller',
    role: 'Producto & IA',
    origin: 'Proyecto propio',
    line: 'Convierte una idea en carruseles e historias que venden contando algo.',
    visual: 'carousel',
    blocks: [
      { t: 'Qué es', d: 'Una web para freelancers y agencias pequeñas. Cuentas de qué va tu negocio y te devuelve el carrusel o la historia con el texto y las imágenes ya montados.' },
      { t: 'El ejemplo', d: 'Cada carrusel sigue el mismo camino: engancha, cuenta una historia y termina pidiendo un paso concreto.' },
    ],
    image: '/pieces/storyseller-logo.svg', // the official mark, built from the paths in StorySeller's own logo.tsx
    caseImage: '/pieces/storyseller-carrusel.jpg', // opens the right page; any project can set it
    goal: 'Optimizar historias y carruseles para convertir leads en clientes a base de interacción.', // large red type, like `problem`
    caseAlt: 'Carrusel de ejemplo en cinco pasos: antes, gancho, dolor, alivio y siguiente paso',
    stack: [],
    url: 'https://story-seller.life',
    urlLabel: 'story-seller.life',
  },
  {
    name: 'MyLook',
    role: 'App de moda',
    origin: 'Proyecto en equipo',
    status: 'Próximo lanzamiento',
    line: 'Tu armario y la ropa de muchas tiendas en una sola app.',
    visual: 'countdown',
    goal: 'La gran mayoría de modelos no puede vivir del modelaje. Queremos darles la oportunidad de monetizar sus creaciones y estilos.',
    arrow: true, // a pencil arrow from the framed picture down to what sits under the title
    goalFirst: true, // opens the right page instead of closing it
    problem: 'El estilo no se sabe describir: solo lo reconoces cuando lo ves con tus propios ojos.',
    image: '/pieces/incognita.svg', // a question mark until the app is out; swap for a real capture then
    launch: '2027-01-22T00:00:00+01:00', // two months from 22 Nov 2026; the countdown runs to this date
    blocks: [
      { t: 'Qué es', d: 'Una app de moda que te recomienda ropa de muchas tiendas según tu estilo y te deja guardar tu armario y compartir tus looks.' },
      { t: 'Qué queremos conseguir', d: 'Que sea la app de referencia para modelos. Vamos paso a paso: primero lanzar, después escuchar a quien la use.' },
    ],
    stack: [],
    url: '',
  },
  {
    // A job, not a product: the blocks with an empty `d` show as "pendiente" (with `hint`) until they are written.
    name: 'Inmobiliaria',
    role: 'Experiencia',
    origin: '',
    line: 'Mi experiencia en el sector inmobiliario.',
    visual: 'videos', // a row of vertical clips under the title; each plays on click
    videos: [1, 2, 3].map(n => ({ src: `/videos/inmobiliaria-${n}.mp4`, poster: `/videos/inmobiliaria-${n}.jpg` })),
    image: '/pieces/inmobiliaria.jpg', // the two other people's faces are blurred in the file itself
    // The right page: the strategies we ran. `variants` draws the one-video-to-many-reels diagram; an empty
    // `text` shows as "pendiente".
    strategies: [
      {
        name: 'Contenido',
        text: 'De cada vídeo que grabábamos salían varios reels: mismo contenido y mismo cierre, con un gancho distinto en cada uno.',
        source: '1 vídeo grabado',
        variants: ['Gancho 1', 'Gancho 2', 'Gancho 3'],
        same: 'Mismo vídeo · mismo cierre',
      },
      {
        name: 'Marketing aspiracional',
        // `points` are labelled lines; `arrow` draws a pencil arrow towards the facing page with this note.
        points: [
          ['Objetivo', 'Que quien ve el vídeo se imagine viviendo allí. No enseñamos metros: enseñamos cómo sería despertarse en esa casa.'],
          ['A dónde queremos llegar', 'Que la gente pida la visita por ganas de vivir ahí, no por la ficha técnica.'],
        ],
        arrow: 'Lo ves en los vídeos',
      },
    ],
    stack: [],
    url: '',
  },
  {
    name: 'Agencia',
    hidden: true, // kept here but left out of the book; delete this line to show it again
    role: 'Campañas & Social',
    origin: 'Cliente real',
    line: 'Ads, SEO y contenido para negocios reales.',
    reto: 'Negocios que invertían en anuncios sin medir bien qué funcionaba.',
    ejecucion: 'Auditorías de medición en Meta Ads, tests de creatividades, SEO y calendario de contenido con informes.',
    resultado: '',
    stack: ['Meta Ads', 'Analytics', 'Mailchimp', 'n8n'],
    url: '',
    video: '',
  },
];

// The slides of the example carousel on the StorySeller page: [label, what the slide does].
export const CAROUSEL = [
  ['Gancho', 'Para el scroll'],
  ['Historia', 'Alguien como tú'],
  ['Giro', 'Lo que cambió'],
  ['Solución', 'Cómo lo hizo'],
  ['Acción', 'Tu siguiente paso'],
];

// Short quotes from people you have worked with: { quote, who }.
export const TESTIMONIALS = [];

// Anything that can be clicked, tried or inspected. `icon` is 'instagram', 'linkedin' or 'storyseller'.
export const LINKS = [
  { label: 'Instagram', handle: '@aaddam._f', url: 'https://www.instagram.com/aaddam._f/', icon: 'instagram' },
  { label: 'LinkedIn', handle: 'adamfailali', url: 'https://www.linkedin.com/in/adamfailali/', icon: 'linkedin' },
  { label: 'StorySeller', handle: 'story-seller.life', url: 'https://story-seller.life', icon: 'storyseller' },
];

// [name, simple-icons export]; tools without an icon show their initial.
export const TOOLS = [
  ['Meta Ads', 'siMeta'], ['Instagram', 'siInstagram'], ['TikTok', 'siTiktok'], ['Shopify', 'siShopify'],
  ['Mailchimp', 'siMailchimp'], ['Google Ads', 'siGoogleads'], ['Analytics', 'siGoogleanalytics'], ['Figma', 'siFigma'],
  ['Canva'], ['Lovable'], ['React', 'siReact'], ['Supabase', 'siSupabase'],
  ['Stripe', 'siStripe'], ['Flutter', 'siFlutter'], ['Claude', 'siClaude'], ['Gemini', 'siGooglegemini'],
  ['ElevenLabs', 'siElevenlabs'], ['n8n', 'siN8n'], ['GitHub', 'siGithub'], ['Python', 'siPython'],
];
