// Datos de comunidad — reseñas y temas con sus comentarios y likes.
// Mock hasta integrar backend. Los tmdbId coinciden con funciones de data.json.

export const resenas = [
  {
    id: "1",
    tmdbId: "11906", // Suspiria
    username: "ana_cine",
    rating: 5,
    fecha: "12 de junio, 2026",
    text: "Un clásico del terror psicológico con un final muy fuerte. No es solo miedo, es tristeza y rabia acumulada. La paleta de colores de Argento convierte cada plano en una pesadilla hermosa.",
    likes: 42,
    comentarios: [
      {
        id: "c1",
        username: "pepe_films",
        fecha: "12 jun",
        text: "Totalmente de acuerdo, la fotografía es de otro planeta. La escena del pasillo me dejó sin aire.",
        likes: 8,
      },
      {
        id: "c2",
        username: "luci_k",
        fecha: "13 jun",
        text: "A mí el sonido me parece lo más logrado. Los Goblin hicieron una banda sonora que es prácticamente otro personaje.",
        likes: 5,
      },
      {
        id: "c3",
        username: "martin_b",
        fecha: "13 jun",
        text: "Buena reseña pero creo que el guion flojea en el segundo acto. ¿Nadie más lo siente?",
        likes: 2,
      },
    ],
  },
  {
    id: "2",
    tmdbId: "18079", // Nueve Reinas
    username: "tomas_r",
    rating: 4,
    fecha: "10 de junio, 2026",
    text: "Un guion relojero. Cada pieza encaja en el lugar exacto y el final te obliga a repensar toda la película. Bielinsky era un maestro de la estafa narrativa.",
    likes: 31,
    comentarios: [
      {
        id: "c1",
        username: "sofi_vhs",
        fecha: "10 jun",
        text: "La vi tres veces y siempre encuentro un detalle nuevo plantado desde el principio.",
        likes: 6,
      },
      {
        id: "c2",
        username: "vale_m",
        fecha: "11 jun",
        text: "Darín y Pauls están imbatibles. Química pura.",
        likes: 4,
      },
    ],
  },
  {
    id: "3",
    tmdbId: "58429", // La Ciénaga
    username: "juli_c",
    rating: 4,
    fecha: "8 de junio, 2026",
    text: "Martel construye el calor y la decadencia con un diseño sonoro asfixiante. No pasa nada y pasa todo. Cine puro de atmósfera.",
    likes: 27,
    comentarios: [
      {
        id: "c1",
        username: "nico_d",
        fecha: "8 jun",
        text: "El uso del fuera de campo es brillante. Te tiene en tensión sin mostrarte casi nada.",
        likes: 9,
      },
      {
        id: "c2",
        username: "ro_v",
        fecha: "9 jun",
        text: "A mí me costó entrar, pero la segunda vez le encontré la vuelta. Requiere paciencia.",
        likes: 3,
      },
      {
        id: "c3",
        username: "ana_cine",
        fecha: "9 jun",
        text: "Es de esas películas que se sienten más que se entienden. Gran elección.",
        likes: 5,
      },
    ],
  },
  {
    id: "4",
    tmdbId: "655", // París, Texas
    username: "fede_z",
    rating: 5,
    fecha: "5 de junio, 2026",
    text: "El reencuentro a través del vidrio espejado es una de las secuencias más desgarradoras de la historia del cine. Wenders y Ry Cooder en estado de gracia.",
    likes: 38,
    comentarios: [
      {
        id: "c1",
        username: "clau_p",
        fecha: "5 jun",
        text: "Ese monólogo final me rompe cada vez. Harry Dean Stanton inmenso.",
        likes: 11,
      },
      {
        id: "c2",
        username: "pepe_films",
        fecha: "6 jun",
        text: "La guitarra de Cooder es inseparable del paisaje. No se puede pensar una sin la otra.",
        likes: 4,
      },
    ],
  },
];

export const temas = [
  {
    id: "1",
    username: "martin_b",
    titulo: "¿El cine de autor está muriendo con el streaming?",
    fecha: "11 de junio, 2026",
    text: "Las plataformas premian el contenido que se consume rápido y se olvida rápido. ¿Hay lugar para directores con una voz propia o todo tiende al algoritmo? Me interesa leer posturas encontradas.",
    likes: 53,
    comentarios: [
      {
        id: "c1",
        username: "luci_k",
        fecha: "11 jun",
        text: "Yo creo que pasa lo contrario: nunca fue tan fácil acceder a cine de autor de todo el mundo. El problema es la curaduría, no la oferta.",
        likes: 14,
      },
      {
        id: "c2",
        username: "tomas_r",
        fecha: "11 jun",
        text: "Depende de la plataforma. Algunas siguen apostando fuerte por autores, otras solo quieren ruido de fondo.",
        likes: 7,
      },
      {
        id: "c3",
        username: "ana_cine",
        fecha: "12 jun",
        text: "El cine-club sigue siendo clave justamente por eso: alguien que elige y contextualiza. El algoritmo no reemplaza eso.",
        likes: 19,
      },
    ],
  },
  {
    id: "2",
    username: "sofi_vhs",
    fecha: "9 de junio, 2026",
    text: "Hay films que la primera vez te dejan frío y al revisitarlos se vuelven enormes. A mí me pasó con La Ciénaga. ¿Cuáles les pasaron a ustedes?",
    likes: 34,
    comentarios: [
      {
        id: "c1",
        username: "nico_d",
        fecha: "9 jun",
        text: "Mulholland Drive, sin dudas. La primera vez es un caos, la segunda es un rompecabezas perfecto.",
        likes: 12,
      },
      {
        id: "c2",
        username: "vale_m",
        fecha: "10 jun",
        text: "2001 Odisea del Espacio. De pibe me aburrió, hoy la considero una obra maestra.",
        likes: 8,
      },
    ],
  },
  {
    id: "3",
    username: "clau_p",
    fecha: "6 de junio, 2026",
    text: "Entiendo el argumento de la accesibilidad, pero perder la voz original de un actor es perder la mitad de la actuación. ¿Postura intransigente o tengo razón?",
    likes: 28,
    comentarios: [
      {
        id: "c1",
        username: "fede_z",
        fecha: "6 jun",
        text: "Subtítulos siempre. La voz es interpretación, no se negocia.",
        likes: 10,
      },
      {
        id: "c2",
        username: "ro_v",
        fecha: "7 jun",
        text: "Pero para mucha gente con dificultades de lectura el doblaje es la única forma de acceder. No lo descartaría tan rápido.",
        likes: 9,
      },
      {
        id: "c3",
        username: "juli_c",
        fecha: "7 jun",
        text: "El doblaje en animación es otra historia, ahí sí funciona genial.",
        likes: 4,
      },
    ],
  },
  {
    id: "4",
    username: "julianMotorizado",
    fecha: "6 de junio, 2026",
    text: "Como me encanta escuchar entrevistas y clases de Llinás, que tipo gracioso por dios.",
    likes: 28,
    comentarios: [
      {
        id: "c1",
        username: "fede_z",
        fecha: "6 jun",
        text: "jajajjas mal",
        likes: 10,
      },
      {
        id: "c2",
        username: "ro_v",
        fecha: "7 jun",
        text: "Totalmente",
        likes: 9,
      },
      {
        id: "c3",
        username: "juli_c",
        fecha: "7 jun",
        text: "Fue profesor mío en la FUC y es muy entretenido aunque a veces se torna arduo estar 2hs prestando atención y gastando tanta energía, por lo menos para mí. Los contenidos y las clases impecables.",
        likes: 4,
      },
    ],
  },
];

export const getResenaById = (id) => resenas.find((r) => r.id === id);
export const getTemaById = (id) => temas.find((t) => t.id === id);
