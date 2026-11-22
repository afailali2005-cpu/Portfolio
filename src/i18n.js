// The book is written in Spanish (src/book-content.js and the labels in src/book.js). This file holds the other
// three languages: every entry is `'texto en español': [català, English, français]`. A text with no entry here
// simply stays in Spanish, so a new sentence never breaks the page: it just waits for its translation.

export const LANGS = [['es', 'Español'], ['ca', 'Català'], ['en', 'English'], ['fr', 'Français']];
const COLUMN = { ca: 0, en: 1, fr: 2 };

const DICT = {
  // ── Interface ────────────────────────────────────────────────────────────
  'Contacto': ['Contacte', 'Contact', 'Contact'],
  'Scroll para abrir ↓': ['Fes scroll per obrir ↓', 'Scroll to open ↓', 'Faites défiler pour ouvrir ↓'],
  'Capítulos': ['Capítols', 'Chapters', 'Chapitres'],
  'Idioma': ['Idioma', 'Language', 'Langue'],
  'Portada': ['Portada', 'Cover', 'Couverture'],
  'Sobre mí': ['Sobre mi', 'About me', 'À propos'],
  'Herramientas': ['Eines', 'Tools', 'Outils'],
  'Copiar': ['Copia', 'Copy', 'Copier'],
  'Copiado ✓': ['Copiat ✓', 'Copied ✓', 'Copié ✓'],
  'Teléfono': ['Telèfon', 'Phone', 'Téléphone'],
  'Correo': ['Correu', 'Email', 'E-mail'],
  '¿Hablamos?': ['Parlem?', "Let's talk", 'On en parle ?'],
  'Pendiente': ['Pendent', 'Pending', 'À venir'],
  'Foto de': ['Foto de', 'Photo of', 'Photo de'],
  'Captura de': ['Captura de', 'Screenshot of', 'Capture de'],
  'Reproducir el vídeo': ['Reprodueix el vídeo', 'Play video', 'Lire la vidéo'],
  'Adam trabajando con su portátil': ["L'Adam treballant amb el seu portàtil", 'Adam working on his laptop', 'Adam travaillant sur son ordinateur portable'],
  'Estudiante de Marketing y Publicidad. Busco prácticas para seguir aprendiendo y enseño aquí los proyectos que voy construyendo.': [
    'Estudiant de Màrqueting i Publicitat. Busco pràctiques per continuar aprenent i ensenyo aquí els projectes que vaig construint.',
    "Marketing and Advertising student. I'm looking for an internship to keep learning, and this is where I show the projects I'm building.",
    "Étudiant en Marketing et Publicité. Je cherche un stage pour continuer à apprendre et je présente ici les projets que je construis.",
  ],

  // ── Cover, headline and contact ──────────────────────────────────────────
  'Estudiante de Marketing y Publicidad': ['Estudiant de Màrqueting i Publicitat', 'Marketing & Advertising student', 'Étudiant en Marketing et Publicité'],
  'Estudiante de Marketing y Publicidad · Desarrollo web': ['Estudiant de Màrqueting i Publicitat · Desenvolupament web', 'Marketing & Advertising student · Web development', 'Étudiant en Marketing et Publicité · Développement web'],
  'Aprendo construyendo proyectos reales.': ['Aprenc construint projectes reals.', 'I learn by building real projects.', "J'apprends en construisant de vrais projets."],
  'Busco prácticas para seguir aprendiendo al lado de un equipo. Traigo ganas, curiosidad y lo que he ido construyendo por mi cuenta.': [
    "Busco pràctiques per continuar aprenent al costat d'un equip. Porto ganes, curiositat i tot el que he anat construint pel meu compte.",
    "I'm looking for an internship to keep learning alongside a team. I bring drive, curiosity and everything I've been building on my own.",
    "Je cherche un stage pour continuer à apprendre au sein d'une équipe. J'apporte de l'envie, de la curiosité et tout ce que j'ai construit par moi-même.",
  ],

  // ── About me ─────────────────────────────────────────────────────────────
  'Hola, soy Adam': ["Hola, soc l'Adam", "Hi, I'm Adam", 'Bonjour, je suis Adam'],
  'Estudio Marketing y Publicidad y llevo años construyendo proyectos propios. No son un pasatiempo: son lo que quiero sacar adelante.': [
    'Estudio Màrqueting i Publicitat i fa anys que construeixo projectes propis. No són un passatemps: són el que vull tirar endavant.',
    "I study Marketing and Advertising and I've spent years building my own projects. They're not a hobby: they're what I want to make happen.",
    "J'étudie le Marketing et la Publicité et je construis mes propres projets depuis des années. Ce n'est pas un passe-temps : c'est ce que je veux mener à bien.",
  ],
  'Me gusta tanto la parte creativa como la técnica: campañas, contenido, webs y automatizaciones con IA.': [
    "M'agrada tant la part creativa com la tècnica: campanyes, contingut, webs i automatitzacions amb IA.",
    'I enjoy the creative side as much as the technical one: campaigns, content, websites and AI automations.',
    "J'aime autant le côté créatif que le côté technique : campagnes, contenu, sites web et automatisations avec l'IA.",
  ],
  'Busco prácticas en un equipo del que aprender y al que poder echar una mano desde el primer día.': [
    'Busco pràctiques en un equip del qual aprendre i al qual poder donar un cop de mà des del primer dia.',
    "I'm looking for an internship in a team I can learn from and lend a hand to from day one.",
    "Je cherche un stage dans une équipe auprès de laquelle apprendre et à qui donner un coup de main dès le premier jour.",
  ],
  'Estudios': ['Estudis', 'Studies', 'Études'],
  'CFGS de Marketing y Publicidad, en curso': ['CFGS de Màrqueting i Publicitat, en curs', 'Higher vocational diploma (CFGS) in Marketing and Advertising, in progress', 'CFGS (diplôme supérieur espagnol) en Marketing et Publicité, en cours'],
  'Idiomas': ['Idiomes', 'Languages', 'Langues'],
  'Catalán, español, inglés, árabe y francés': ['Català, castellà, anglès, àrab i francès', 'Catalan, Spanish, English, Arabic and French', 'Catalan, espagnol, anglais, arabe et français'],
  'Dónde': ['On', 'Where', 'Où'],

  // ── Shared project labels ────────────────────────────────────────────────
  'Qué es': ['Què és', 'What it is', "Ce que c'est"],
  'El problema': ['El problema', 'The problem', 'Le problème'],
  'El objetivo': ["L'objectiu", 'The goal', "L'objectif"],
  'Objetivo': ['Objectiu', 'Goal', 'Objectif'],
  'Estrategia': ['Estratègia', 'Strategy', 'Stratégie'],

  // ── Habitour ─────────────────────────────────────────────────────────────
  'Vídeos de cine y tours 3D de una vivienda a partir de fotos.': ["Vídeos de cinema i tours 3D d'un habitatge a partir de fotos.", 'Cinematic videos and 3D tours of a home, made from photos.', "Vidéos cinématographiques et visites 3D d'un logement à partir de photos."],
  'Una herramienta para inmobiliarias. El agente sube las fotos de un piso y recibe un vídeo de presentación con acabado de cine, listo para publicar.': [
    "Una eina per a immobiliàries. L'agent puja les fotos d'un pis i rep un vídeo de presentació amb acabat de cinema, llest per publicar.",
    'A tool for real estate agencies. The agent uploads the photos of a flat and gets back a presentation video with a cinematic finish, ready to publish.',
    "Un outil pour les agences immobilières. L'agent envoie les photos d'un appartement et reçoit une vidéo de présentation au rendu cinématographique, prête à publier.",
  ],
  'Tours 3D': ['Tours 3D', '3D tours', 'Visites 3D'],
  'Con un escaneo hecho desde el móvil, la vivienda se convierte en un recorrido 3D que el comprador mueve a su ritmo.': [
    "Amb un escaneig fet des del mòbil, l'habitatge es converteix en un recorregut 3D que el comprador mou al seu ritme.",
    'With a scan made on a phone, the home becomes a 3D walkthrough the buyer explores at their own pace.',
    "Avec un scan réalisé depuis un téléphone, le logement devient un parcours 3D que l'acheteur explore à son rythme.",
  ],
  'Qué estoy aprendiendo': ['Què estic aprenent', "What I'm learning", "Ce que j'apprends"],
  'A conectar servicios de IA entre sí y a calcular lo que cuesta cada vídeo antes de ponerle precio.': [
    "A connectar serveis d'IA entre si i a calcular què costa cada vídeo abans de posar-li preu.",
    'To connect AI services with each other and to work out what each video costs before pricing it.',
    "À connecter des services d'IA entre eux et à calculer le coût de chaque vidéo avant d'en fixer le prix.",
  ],
  'Una inmobiliaria no puede pagar a un profesional 3D por cada vivienda que entra en su cartera.': [
    'Una immobiliària no pot pagar un professional 3D per cada habitatge que entra a la seva cartera.',
    "A real estate agency can't pay a 3D professional for every home that enters its portfolio.",
    'Une agence immobilière ne peut pas payer un professionnel de la 3D pour chaque bien qui entre dans son portefeuille.',
  ],
  'Tus fotos': ['Les teves fotos', 'Your photos', 'Vos photos'],
  'Vídeo de cine': ['Vídeo de cinema', 'Cinematic video', 'Vidéo ciné'],
  'Tour 3D': ['Tour 3D', '3D tour', 'Visite 3D'],
  'Tres fotos de un piso se convierten en un vídeo y en un tour 3D': ["Tres fotos d'un pis es converteixen en un vídeo i en un tour 3D", 'Three photos of a flat become a video and a 3D tour', "Trois photos d'un appartement deviennent une vidéo et une visite 3D"],

  // ── StorySeller ──────────────────────────────────────────────────────────
  'Convierte una idea en carruseles e historias que venden contando algo.': ['Converteix una idea en carrusels i històries que venen explicant alguna cosa.', 'Turns an idea into carousels and stories that sell by telling something.', 'Transforme une idée en carrousels et en stories qui vendent en racontant quelque chose.'],
  'Una web para freelancers y agencias pequeñas. Cuentas de qué va tu negocio y te devuelve el carrusel o la historia con el texto y las imágenes ya montados.': [
    'Una web per a freelancers i agències petites. Expliques de què va el teu negoci i et torna el carrusel o la història amb el text i les imatges ja muntats.',
    'A web app for freelancers and small agencies. You explain what your business is about and it returns the carousel or story with the text and images already laid out.',
    'Un site pour les freelances et les petites agences. Vous expliquez votre activité et il vous renvoie le carrousel ou la story avec le texte et les images déjà montés.',
  ],
  'El ejemplo': ["L'exemple", 'The example', "L'exemple"],
  'Cada carrusel sigue el mismo camino: engancha, cuenta una historia y termina pidiendo un paso concreto.': [
    'Cada carrusel segueix el mateix camí: enganxa, explica una història i acaba demanant un pas concret.',
    'Every carousel follows the same path: it hooks, tells a story and ends by asking for one specific step.',
    'Chaque carrousel suit le même chemin : il accroche, raconte une histoire et se termine en demandant une action précise.',
  ],
  'Optimizar historias y carruseles para convertir leads en clientes a base de interacción.': [
    "Optimitzar històries i carrusels per convertir leads en clients a base d'interacció.",
    'Optimise stories and carousels to turn leads into customers through interaction.',
    "Optimiser les stories et les carrousels pour convertir les leads en clients grâce à l'interaction.",
  ],
  'Carrusel de ejemplo en cinco pasos: antes, gancho, dolor, alivio y siguiente paso': ["Carrusel d'exemple en cinc passos: abans, ganxo, dolor, alleujament i pas següent", 'Example carousel in five steps: before, hook, pain, relief and next step', "Carrousel d'exemple en cinq étapes : avant, accroche, douleur, soulagement et étape suivante"],
  'Estructura de un carrusel de ejemplo: inmobiliaria': ["Estructura d'un carrusel d'exemple: immobiliària", 'Structure of an example carousel: real estate', "Structure d'un carrousel d'exemple : immobilier"],
  'Gancho': ['Ganxo', 'Hook', 'Accroche'],
  'Para el scroll': ["Atura l'scroll", 'Stops the scroll', 'Arrête le scroll'],
  'Historia': ['Història', 'Story', 'Histoire'],
  'Alguien como tú': ['Algú com tu', 'Someone like you', "Quelqu'un comme vous"],
  'Giro': ['Gir', 'Twist', 'Tournant'],
  'Lo que cambió': ['El que va canviar', 'What changed', 'Ce qui a changé'],
  'Solución': ['Solució', 'Solution', 'Solution'],
  'Cómo lo hizo': ['Com ho va fer', 'How they did it', "Comment il l'a fait"],
  'Acción': ['Acció', 'Action', 'Action'],
  'Tu siguiente paso': ['El teu pas següent', 'Your next step', 'Votre prochaine étape'],

  // ── MyLook ───────────────────────────────────────────────────────────────
  'Tu armario y la ropa de muchas tiendas en una sola app.': ['El teu armari i la roba de moltes botigues en una sola app.', 'Your wardrobe and clothes from many shops in a single app.', 'Votre garde-robe et les vêtements de nombreuses boutiques dans une seule app.'],
  'La gran mayoría de modelos no puede vivir del modelaje. Queremos darles la oportunidad de monetizar sus creaciones y estilos.': [
    "La gran majoria de models no pot viure del modelatge. Volem donar-los l'oportunitat de monetitzar les seves creacions i estils.",
    "The vast majority of models can't make a living from modelling. We want to give them the chance to monetise their creations and styles.",
    'La grande majorité des mannequins ne peut pas vivre du mannequinat. Nous voulons leur donner la possibilité de monétiser leurs créations et leurs styles.',
  ],
  'El estilo no se sabe describir: solo lo reconoces cuando lo ves con tus propios ojos.': [
    "L'estil no se sap descriure: només el reconeixes quan el veus amb els teus propis ulls.",
    "Style can't be described: you only recognise it when you see it with your own eyes.",
    "Le style ne se décrit pas : on ne le reconnaît qu'en le voyant de ses propres yeux.",
  ],
  'Una app de moda que te recomienda ropa de muchas tiendas según tu estilo y te deja guardar tu armario y compartir tus looks.': [
    'Una app de moda que et recomana roba de moltes botigues segons el teu estil i et deixa guardar el teu armari i compartir els teus looks.',
    'A fashion app that recommends clothes from many shops based on your style and lets you save your wardrobe and share your looks.',
    "Une app de mode qui vous recommande des vêtements de nombreuses boutiques selon votre style et vous permet d'enregistrer votre garde-robe et de partager vos looks.",
  ],
  'Qué queremos conseguir': ['Què volem aconseguir', 'What we want to achieve', 'Ce que nous voulons atteindre'],
  'Que sea la app de referencia para modelos. Vamos paso a paso: primero lanzar, después escuchar a quien la use.': [
    "Que sigui l'app de referència per a models. Anem pas a pas: primer llançar, després escoltar qui la faci servir.",
    "To become the go-to app for models. We're taking it step by step: launch first, then listen to the people who use it.",
    "Qu'elle devienne l'app de référence pour les mannequins. Nous avançons pas à pas : d'abord lancer, puis écouter ceux qui l'utilisent.",
  ],
  'Lanzamiento en': ['Llançament en', 'Launching in', 'Lancement dans'],
  'días': ['dies', 'days', 'jours'],
  'horas': ['hores', 'hours', 'heures'],
  'seg': ['seg', 'sec', 'sec'],
  'Ya disponible': ['Ja disponible', 'Out now', 'Déjà disponible'],

  // ── Real estate ──────────────────────────────────────────────────────────
  'Inmobiliaria': ['Immobiliària', 'Real estate', 'Immobilier'],
  'Mi experiencia en el sector inmobiliario.': ['La meva experiència en el sector immobiliari.', 'My experience in the real estate sector.', 'Mon expérience dans le secteur immobilier.'],
  'Contenido': ['Contingut', 'Content', 'Contenu'],
  'De cada vídeo que grabábamos salían varios reels: mismo contenido y mismo cierre, con un gancho distinto en cada uno.': [
    'De cada vídeo que gravàvem en sortien diversos reels: mateix contingut i mateix tancament, amb un ganxo diferent a cadascun.',
    'Every video we shot became several reels: same content and same ending, with a different hook on each one.',
    'De chaque vidéo que nous tournions sortaient plusieurs reels : même contenu et même conclusion, avec une accroche différente pour chacun.',
  ],
  '1 vídeo grabado': ['1 vídeo gravat', '1 video shot', '1 vidéo tournée'],
  'Gancho 1': ['Ganxo 1', 'Hook 1', 'Accroche 1'],
  'Gancho 2': ['Ganxo 2', 'Hook 2', 'Accroche 2'],
  'Gancho 3': ['Ganxo 3', 'Hook 3', 'Accroche 3'],
  'Mismo vídeo · mismo cierre': ['Mateix vídeo · mateix tancament', 'Same video · same ending', 'Même vidéo · même conclusion'],
  'Un vídeo se convierte en varios reels, cada uno con un gancho distinto': ['Un vídeo es converteix en diversos reels, cadascun amb un ganxo diferent', 'One video becomes several reels, each with a different hook', 'Une vidéo devient plusieurs reels, chacun avec une accroche différente'],
  'Marketing aspiracional': ['Màrqueting aspiracional', 'Aspirational marketing', 'Marketing aspirationnel'],
  'Que quien ve el vídeo se imagine viviendo allí. No enseñamos metros: enseñamos cómo sería despertarse en esa casa.': [
    "Que qui veu el vídeo s'imagini vivint-hi. No ensenyem metres: ensenyem com seria despertar-se en aquella casa.",
    "For whoever watches the video to picture themselves living there. We don't show square metres: we show what waking up in that house would be like.",
    "Que celui qui regarde la vidéo s'imagine y vivre. Nous ne montrons pas des mètres carrés : nous montrons ce que serait un réveil dans cette maison.",
  ],
  'A dónde queremos llegar': ['On volem arribar', 'Where we want to get', 'Où nous voulons arriver'],
  'Que la gente pida la visita por ganas de vivir ahí, no por la ficha técnica.': [
    'Que la gent demani la visita per ganes de viure-hi, no per la fitxa tècnica.',
    'For people to book a viewing because they want to live there, not because of the spec sheet.',
    "Que les gens demandent la visite par envie d'y vivre, pas à cause de la fiche technique.",
  ],
  'Lo ves en los vídeos': ['Ho veus als vídeos', 'See it in the videos', 'À voir dans les vidéos'],

  // ── Tools and links ──────────────────────────────────────────────────────
  'Mi stack': ['El meu stack', 'My stack', 'Mon stack'],
  'Con qué trabajo': ['Amb què treballo', 'What I work with', 'Mes outils de travail'],
  'Mis redes': ['Les meves xarxes', 'My socials', 'Mes réseaux'],
  'Compruébalo': ['Comprova-ho', 'See for yourself', 'Voyez par vous-même'],
};

/** The saved choice, else the browser's language if the book speaks it, else Spanish. */
function initial() {
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch { /* private mode: no storage, no saved choice */ }
  const known = LANGS.map(([code]) => code);
  if (known.includes(saved)) return saved;
  const mine = (navigator.language || '').slice(0, 2).toLowerCase();
  return known.includes(mine) ? mine : 'es';
}

export let lang = initial();
export function setLang(code) {
  lang = code;
  try { localStorage.setItem('lang', code); } catch { /* the choice just lasts for this visit */ }
}

/** `text` in the current language; unchanged when it is Spanish or has no translation yet. */
export function t(text) {
  const out = lang === 'es' ? null : DICT[text]?.[COLUMN[lang]];
  if (!out) return text;
  // French puts a space before ? ! : ; — keep it from ever wrapping onto its own line.
  return lang === 'fr' ? out.replace(/ ([?!:;])/g, ' $1') : out;
}
