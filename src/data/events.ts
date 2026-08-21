export type Category = 'Música' | 'Infantil' | 'Deportes' | 'Tradición' | 'Cultura' | 'Gastronomía';

export type Event = {
  id: string;
  day: string;
  weekday: string;
  date: string;
  time: string;
  title: string;
  category: Category;
  place: string;
  detail?: string;
};

export const events: Event[] = [
  { id: 'dardos', day: '29', weekday: 'Sábado', date: 'Agosto', time: '17:00', title: 'Torneo de dardos', category: 'Deportes', place: 'Carpa de la Peña Los Payones' },
  { id: 'disco', day: '29', weekday: 'Sábado', date: 'Agosto', time: '20:00', title: 'Discoteca móvil', category: 'Música', place: 'Carpa de DJ IRIA' },
  { id: 'pregón', day: '29', weekday: 'Sábado', date: 'Agosto', time: '21:00', title: 'Pregón de Fiestas', category: 'Tradición', place: 'Plaza del Padre Cipriano' },
  { id: 'orquesta', day: '29', weekday: 'Sábado', date: 'Agosto', time: '22:00', title: 'Orquesta Tierra', category: 'Música', place: 'Plaza del Padre Cipriano' },
  { id: 'carrera', day: '30', weekday: 'Domingo', date: 'Agosto', time: '09:00', title: 'Carrera popular', category: 'Deportes', place: 'Salida desde el Parque de la Mar Océana' },
  { id: 'chocolate', day: '30', weekday: 'Domingo', date: 'Agosto', time: '10:30', title: 'Chocolatada popular', category: 'Gastronomía', place: 'Plaza del Padre Cipriano' },
  { id: 'visita', day: '30', weekday: 'Domingo', date: 'Agosto', time: '12:00', title: 'Visita guiada: Emilio Carrère', category: 'Cultura', place: 'Centro Sociocultural Alfonso XII' },
  { id: 'chapas', day: '30', weekday: 'Domingo', date: 'Agosto', time: '12:30', title: 'Torneo de chapas infantil', category: 'Infantil', place: 'Peña Berriyandos' },
  { id: 'procesión', day: '30', weekday: 'Domingo', date: 'Agosto', time: '21:00', title: 'Solemne procesión', category: 'Tradición', place: 'Calles de El Pardo' },
  { id: 'gincana', day: '31', weekday: 'Lunes', date: 'Agosto', time: '19:00', title: 'Gincana con juegos tradicionales', category: 'Infantil', place: 'Plaza del Padre Cipriano' },
  { id: 'chinchon', day: '31', weekday: 'Lunes', date: 'Agosto', time: '20:00', title: 'Torneo de chinchón', category: 'Tradición', place: 'Peña Los Coquitos' },
  { id: 'roxell', day: '31', weekday: 'Lunes', date: 'Agosto', time: '21:00', title: 'Animación musical con DJ ROXELL', category: 'Música', place: 'Plaza del Padre Cipriano' },
];

export const featuredEvents = [
  {
    title: 'Fuegos artificiales',
    category: 'Tradición',
    date: 'Domingo 6 · 24:00 h',
    image: '/images/FuegosArtificales.jpg',
  },
  {
    title: 'Día de la familia',
    category: 'Infantil',
    date: 'Sábado 5 · 12:00 h',
    image: '/images/DiaDeLaInfancia.jpeg',
  },
  {
    title: 'Carrera popular',
    category: 'Deportes',
    date: 'Domingo 6 · 09:00 h',
    image: '/images/CarreraPopular.jpeg',
  },
  {
    title: 'Concierto Guardia Real',
    category: 'Música',
    date: 'Domingo 6 · 20:00 h',
    image: '/images/GuardiaReal.jpeg',
  },
  {
    title: 'Caldereta de gamo',
    category: 'Gastronomía',
    date: 'Domingo 6 · 14:00 h',
    image: '/images/CalderetaGamo.jpeg',
  },
];
