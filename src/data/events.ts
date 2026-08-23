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
  { id: 'dardos', day: '29', weekday: 'Sábado', date: 'Agosto', time: '17:00', title: 'Torneo de dardos', category: 'Deportes', place: 'Carpa de la Peña Los Rayones' },
  { id: 'disco', day: '29', weekday: 'Sábado', date: 'Agosto', time: '20:00', title: 'Discoteca móvil con DJ IRIA', category: 'Música', place: 'Recinto ferial' },
  { id: 'premios-pregon', day: '29', weekday: 'Sábado', date: 'Agosto', time: '21:00', title: 'Entrega de premios y Pregón de Fiestas', category: 'Tradición', place: 'Recinto ferial', detail: 'Incluye el homenaje a Nuestros Mayores y el premio del cartel ganador.' },
  { id: 'pincho-sabado', day: '29', weekday: 'Sábado', date: 'Agosto', time: '21:30', title: 'Pincho popular', category: 'Gastronomía', place: 'Recinto ferial' },
  { id: 'orquesta', day: '29', weekday: 'Sábado', date: 'Agosto', time: '22:00', title: 'Baile con la Orquesta Tierra', category: 'Música', place: 'Recinto ferial' },
  { id: 'carrera', day: '30', weekday: 'Domingo', date: 'Agosto', time: '09:00', title: 'Carrera popular', category: 'Deportes', place: 'El Pardo' },
  { id: 'taller-rcp', day: '30', weekday: 'Domingo', date: 'Agosto', time: '09:00', title: 'Taller de formación a la ciudadanía en RCP', category: 'Cultura', place: 'El Pardo', detail: 'Impartido por SAMUR-Protección Civil.' },
  { id: 'chocolate', day: '30', weekday: 'Domingo', date: 'Agosto', time: '10:30', title: 'Chocolatada popular con churros', category: 'Gastronomía', place: 'Recinto ferial' },
  { id: 'visita', day: '30', weekday: 'Domingo', date: 'Agosto', time: '12:00', title: 'Visita guiada: Emilio Carrère', category: 'Cultura', place: 'Centro Sociocultural Alfonso XII' },
  { id: 'chapas', day: '30', weekday: 'Domingo', date: 'Agosto', time: '12:30', title: 'Torneo de chapas infantil', category: 'Infantil', place: 'Junto a la carpa de la Peña Berryondos' },
  { id: 'murdoku', day: '30', weekday: 'Domingo', date: 'Agosto', time: '19:00', title: 'Torneo de Murdoku', category: 'Cultura', place: 'Recinto ferial' },
  { id: 'misa-rosario', day: '30', weekday: 'Domingo', date: 'Agosto', time: '20:00', title: 'Misa solemne', category: 'Tradición', place: 'Iglesia Virgen del Carmen' },
  { id: 'procesión', day: '30', weekday: 'Domingo', date: 'Agosto', time: '21:00', title: 'Solemne procesión', category: 'Tradición', place: 'Calles de El Pardo' },
  { id: 'lady-cherry', day: '30', weekday: 'Domingo', date: 'Agosto', time: '21:30', title: 'Animación musical con DJ Lady Cherry', category: 'Música', place: 'Recinto ferial' },
  { id: 'chapas-adultos', day: '31', weekday: 'Lunes', date: 'Agosto', time: '18:00', title: 'Torneo de chapas adultos', category: 'Deportes', place: 'Junto a la carpa de la Peña Berryondos' },
  { id: 'gincana', day: '31', weekday: 'Lunes', date: 'Agosto', time: '19:00', title: 'Gincana con juegos tradicionales gigantes', category: 'Infantil', place: 'Recinto ferial' },
  { id: 'chinchon', day: '31', weekday: 'Lunes', date: 'Agosto', time: '20:00', title: 'Torneo de chinchón', category: 'Tradición', place: 'Peña Los Coquitos' },
  { id: 'roxell', day: '31', weekday: 'Lunes', date: 'Agosto', time: '21:00', title: 'Animación musical con DJ ROXELL', category: 'Música', place: 'Plaza del Padre Cipriano' },
  { id: 'uno', day: '1', weekday: 'Martes', date: 'Septiembre', time: '17:30', title: 'Torneo de UNO', category: 'Infantil', place: 'Carpa de la Peña La Parroquia del Berreo' },
  { id: 'musica-divertida', day: '1', weekday: 'Martes', date: 'Septiembre', time: '19:00', title: 'Espectáculo infantil: Música Divertida', category: 'Infantil', place: 'Recinto ferial' },
  { id: 'bingo', day: '1', weekday: 'Martes', date: 'Septiembre', time: '20:00', title: 'Bingo popular', category: 'Tradición', place: 'Carpa de la Asociación Vecinal de El Pardo' },
  { id: 'poker', day: '1', weekday: 'Martes', date: 'Septiembre', time: '21:00', title: 'Torneo de póker', category: 'Tradición', place: 'Carpa de la Peña Ceda el Vaso' },
  { id: 'duo-madelon', day: '1', weekday: 'Martes', date: 'Septiembre', time: '22:00', title: 'Animación musical para los mayores con Dúo Mádelon', category: 'Música', place: 'Recinto ferial' },
  { id: 'aperitivo-mayores', day: '2', weekday: 'Miércoles', date: 'Septiembre', time: '11:00', title: 'Aperitivo para los mayores del Centro de Día', category: 'Tradición', place: 'Centro de Día' },
  { id: 'rana-infantil', day: '2', weekday: 'Miércoles', date: 'Septiembre', time: '19:00', title: 'Tiro de la rana infantil y cadete', category: 'Infantil', place: 'Recinto ferial' },
  { id: 'juegos-infantiles', day: '2', weekday: 'Miércoles', date: 'Septiembre', time: '19:00', title: 'Juegos infantiles (3 a 5 años)', category: 'Infantil', place: 'Recinto ferial' },
  { id: 'gincana-infantil', day: '2', weekday: 'Miércoles', date: 'Septiembre', time: '20:00', title: 'Gincana infantil (6 a 10 años)', category: 'Infantil', place: 'Recinto ferial' },
  { id: 'mus', day: '2', weekday: 'Miércoles', date: 'Septiembre', time: '21:00', title: 'Torneo de mus', category: 'Tradición', place: 'Carpa de la Peña Ceda el Vaso' },
  { id: 'flamenco', day: '2', weekday: 'Miércoles', date: 'Septiembre', time: '21:30', title: 'Espectáculo de flamenco de la Compañía Belén Heredia', category: 'Música', place: 'Recinto ferial' },
  { id: 'aperitivo-mayores-jueves', day: '3', weekday: 'Jueves', date: 'Septiembre', time: '11:00', title: 'Aperitivo para los mayores del Centro de Día', category: 'Tradición', place: 'Centro de Día' },
  { id: 'sudokus', day: '3', weekday: 'Jueves', date: 'Septiembre', time: '18:00', title: 'III Torneo de sudokus', category: 'Cultura', place: 'Carpa de la Asociación Amigos de Mingorrubio' },
  { id: 'tenis-mesa', day: '3', weekday: 'Jueves', date: 'Septiembre', time: '18:00', title: 'Torneo de tenis de mesa', category: 'Deportes', place: 'Recinto ferial' },
  { id: 'dibujo-infantil', day: '3', weekday: 'Jueves', date: 'Septiembre', time: '18:30', title: 'Concurso de dibujo infantil', category: 'Infantil', place: 'Carpa de la Peña Las que Faltaban' },
  { id: 'perros-guardia', day: '3', weekday: 'Jueves', date: 'Septiembre', time: '19:30', title: 'Exhibición de adiestramiento de perros de la Guardia Civil', category: 'Cultura', place: 'Calle Manuel Alonso, junto al palacio' },
  { id: 'grupos-barrio', day: '3', weekday: 'Jueves', date: 'Septiembre', time: '20:30', title: 'Certamen de grupos del barrio', category: 'Música', place: 'Recinto ferial' },
  { id: 'lady-cherry-jueves', day: '3', weekday: 'Jueves', date: 'Septiembre', time: '21:30', title: 'Animación musical con DJ Lady Cherry', category: 'Música', place: 'Recinto ferial' },
  { id: 'pasacalles', day: '4', weekday: 'Viernes', date: 'Septiembre', time: '18:30', title: 'Pasacalles con Alquimia Circus y la Charanga El Ramillete', category: 'Cultura', place: 'Salida por las calles de El Pardo' },
  { id: 'disfraces', day: '4', weekday: 'Viernes', date: 'Septiembre', time: '19:00', title: 'Concurso infantil de disfraces', category: 'Infantil', place: 'Templete del Parque de la Mar Océana' },
  { id: 'paola-pulido', day: '4', weekday: 'Viernes', date: 'Septiembre', time: '22:00', title: 'Sesión musical con DJ Paola Hi y DJ Carlos Pulido', category: 'Música', place: 'Recinto ferial' },
  { id: 'dia-infancia-manana', day: '5', weekday: 'Sábado', date: 'Septiembre', time: '12:00', title: 'Día de la Infancia', category: 'Infantil', place: 'Parque Concejal Miguel Martín Vela' },
  { id: 'dia-infancia-tarde', day: '5', weekday: 'Sábado', date: 'Septiembre', time: '17:00', title: 'Día de la Infancia', category: 'Infantil', place: 'Parque Concejal Miguel Martín Vela' },
  { id: 'certamen-literario', day: '5', weekday: 'Sábado', date: 'Septiembre', time: '12:00', title: 'XV Certamen Literario Emilio Carrère', category: 'Cultura', place: 'Centro Sociocultural Alfonso XII' },
  { id: 'vehiculos-historicos', day: '5', weekday: 'Sábado', date: 'Septiembre', time: '18:00', title: 'Exposición de vehículos históricos', category: 'Cultura', place: 'Calle Manuel Alonso' },
  { id: 'pincho-popular', day: '5', weekday: 'Sábado', date: 'Septiembre', time: '21:30', title: 'Pincho popular', category: 'Gastronomía', place: 'Recinto ferial' },
  { id: 'music-show', day: '5', weekday: 'Sábado', date: 'Septiembre', time: '22:30', title: 'Baile con la Orquesta The Music Show', category: 'Música', place: 'Recinto ferial' },
  { id: 'senda-manzanares', day: '6', weekday: 'Domingo', date: 'Septiembre', time: '10:30', title: 'Senda guiada por la orilla del Manzanares', category: 'Deportes', place: 'Del Puente de los Capuchinos a la Presa de El Pardo' },
  { id: 'guardia-real', day: '6', weekday: 'Domingo', date: 'Septiembre', time: '12:00', title: 'Concierto de la Unidad de Música de la Guardia Real', category: 'Música', place: 'Plaza de El Pardo' },
  { id: 'caldereta', day: '6', weekday: 'Domingo', date: 'Septiembre', time: '14:00', title: 'Degustación de caldereta de gamo', category: 'Gastronomía', place: 'Parque Concejal Miguel Martín Vela' },
  { id: 'trofeos', day: '6', weekday: 'Domingo', date: 'Septiembre', time: '18:00', title: 'Entrega de trofeos de las actividades', category: 'Tradición', place: 'Recinto ferial' },
  { id: 'baile-maria-sanz', day: '6', weekday: 'Domingo', date: 'Septiembre', time: '19:00', title: 'Actuación de baile del alumnado de María Sanz Peña', category: 'Cultura', place: 'Recinto ferial' },
  { id: 'misa-solemne', day: '6', weekday: 'Domingo', date: 'Septiembre', time: '20:00', title: 'Misa solemne', category: 'Tradición', place: 'Iglesia Virgen del Carmen' },
  { id: 'fuegos-artificiales', day: '6', weekday: 'Domingo', date: 'Septiembre', time: '24:00', title: 'Fuegos artificiales', category: 'Tradición', place: 'Solar de Boyerizas' },
];

export const featuredEvents = [
  {
    id: 'fireworks',
    title: 'Fuegos artificiales',
    category: 'Tradición',
    date: 'Domingo 6 · 24:00 h',
    image: '/images/FuegosArtificales.jpg',
  },
  {
    id: 'family',
    title: 'Día de la Infancia',
    category: 'Infantil',
    date: 'Sábado 5 · 12:00 h',
    image: '/images/DiaDeLaInfancia.jpeg',
  },
  {
    id: 'race',
    title: 'Carrera popular',
    category: 'Deportes',
    date: 'Domingo 30 · 09:00 h',
    image: '/images/CarreraPopular.jpeg',
  },
  {
    id: 'guard',
    title: 'Concierto Guardia Real',
    category: 'Música',
    date: 'Domingo 6 · 12:00 h',
    image: '/images/GuardiaReal.jpeg',
  },
  {
    id: 'stew',
    title: 'Caldereta de gamo',
    category: 'Gastronomía',
    date: 'Domingo 6 · 14:00 h',
    image: '/images/CalderetaGamo.jpeg',
  },
];
