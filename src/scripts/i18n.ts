type Language = 'es' | 'ca' | 'eu' | 'gl' | 'en';

const translations: Record<Exclude<Language, 'es'>, Record<string, string>> = {
  ca: {
    'brand.district':'Districte', 'language.label':'Idioma', 'nav.home':'Inici', 'nav.fiestas':'Festes', 'nav.events':'Esdeveniments', 'nav.map':'Mapa', 'nav.participate':'Participa', 'nav.program':'Programa',
    'hero.dates':'29 agost — 6 setembre 2026', 'hero.title':'Nou dies de tradició, música i alegria', 'hero.copy':'Torna a trobar-te amb El Pardo: activitats per gaudir en família, amb amistats i amb tot el barri.', 'hero.events':'Veure esdeveniments', 'hero.map':'Com arribar-hi', 'countdown.copy':'Falten per a l’inici de les festes', 'countdown.days':'dies',
    'programme.label':'Agenda principal', 'programme.title':'Programa per dies', 'programme.download':'Descarregar programa', 'programme.more':'Més informació', 'featured.label':'Una cita per a cada pla', 'featured.title':'No t’ho perdis…',
    'events.label':'Consulta el programa', 'events.title':'Tots els esdeveniments', 'events.count':'12 activitats', 'events.filters':'Filtres del programa', 'events.searchLabel':'Cercar esdeveniments', 'events.searchPlaceholder':'Cercar esdeveniments…', 'events.filterByCategory':'Filtrar per categoria', 'events.empty':'No hi ha activitats que coincideixin amb la cerca.',
    'map.label':'Troba cada activitat', 'map.title':'On seran les activitats?', 'map.copy':'Consulta al mapa tots els espais on se celebraran les festes, des dels jardins fins a les places i les carpes del Real Sitio.', 'map.open':'Obrir el mapa',
    'about.label':'El Pardo és comunitat', 'about.title':'Estimats pardenys', 'about.copyOne':'Les Festes del Real Sitio ens reuneixen per gaudir de la música, la cultura, l’esport i les tradicions que donen vida al nostre districte.', 'about.copyTwo':'Gràcies a la col·laboració d’associacions, entitats i veïnat, celebrem un programa pensat per a totes les edats.',
    'participate.label':'La teva opinió compta', 'participate.title':'Participa', 'participate.copy':'Ajuda’ns a continuar millorant el districte.', 'card.survey':'Enquesta oficial', 'card.surveyCopy':'Comparteix la teva opinió sobre les festes.', 'card.idea':'Proposa la teva idea', 'card.ideaCopy':'Comparteix propostes per millorar el districte.', 'card.incident':'Incidències', 'card.incidentCopy':'Comunica incidències al teu barri fàcilment.',
    'qr.label':'Enquesta oficial', 'qr.title':'Respon des del mòbil', 'qr.copy':'Escaneja el codi QR per obrir l’enquesta oficial de les festes d’El Pardo.', 'qr.open':'Obrir enquesta de Google', 'footer.tagline':'El teu districte, la teva comunitat.', 'footer.legalLinks':'Enllaços legals', 'footer.contact':'Contacte', 'footer.legal':'Avís legal', 'footer.privacy':'Privacitat', 'footer.accessibility':'Accessibilitat',
    'category.Todos':'Tots', 'category.Música':'Música', 'category.Infantil':'Infantil', 'category.Deportes':'Esports', 'category.Tradición':'Tradició', 'category.Cultura':'Cultura', 'category.Gastronomía':'Gastronomia', 'weekday.Sábado':'Dissabte', 'weekday.Domingo':'Diumenge', 'weekday.Lunes':'Dilluns', 'month.Agosto':'Agost',
    'event.dardos.title':'Torneig de dards', 'event.disco.title':'Discoteca mòbil', 'event.pregón.title':'Pregó de festes', 'event.orquesta.title':'Orquestra Tierra', 'event.carrera.title':'Cursa popular', 'event.chocolate.title':'Xocolatada popular', 'event.visita.title':'Visita guiada: Emilio Carrère', 'event.chapas.title':'Torneig infantil de xapes', 'event.procesión.title':'Processó solemne', 'event.gincana.title':'Gimcana amb jocs tradicionals', 'event.chinchon.title':'Torneig de chinchón', 'event.roxell.title':'Animació musical amb DJ ROXELL',
    'featured.fireworks.title':'Focs artificials', 'featured.fireworks.date':'Diumenge 6 · 24:00 h', 'featured.family.title':'Dia de la família', 'featured.family.date':'Dissabte 5 · 12:00 h', 'featured.race.title':'Cursa popular', 'featured.race.date':'Diumenge 6 · 09:00 h', 'featured.guard.title':'Concert de la Guàrdia Reial', 'featured.guard.date':'Diumenge 6 · 20:00 h', 'featured.stew.title':'Caldereta de daina', 'featured.stew.date':'Diumenge 6 · 14:00 h',
  },
  eu: {
    'brand.district':'Barrutia', 'language.label':'Hizkuntza', 'nav.home':'Hasiera', 'nav.fiestas':'Jaiak', 'nav.events':'Ekitaldiak', 'nav.map':'Mapa', 'nav.participate':'Parte hartu', 'nav.program':'Programa',
    'hero.dates':'abuztuak 29 — irailak 6, 2026', 'hero.title':'Bederatzi egun tradizioz, musikaz eta alaitasunez', 'hero.copy':'El Pardo berriro ezagutu: familiarekin, lagunekin eta auzo osoarekin gozatzeko jarduerak.', 'hero.events':'Ikusi ekitaldiak', 'hero.map':'Nola iritsi', 'countdown.copy':'Falta direnak jaien hasierarako', 'countdown.days':'egun',
    'programme.label':'Agenda nagusia', 'programme.title':'Egunetako programa', 'programme.download':'Programa deskargatu', 'programme.more':'Informazio gehiago', 'featured.label':'Plan bakoitzerako hitzordua', 'featured.title':'Ez galdu…',
    'events.label':'Kontsultatu programa', 'events.title':'Ekitaldi guztiak', 'events.count':'12 jarduera', 'events.filters':'Programaren iragazkiak', 'events.searchLabel':'Ekitaldiak bilatu', 'events.searchPlaceholder':'Ekitaldiak bilatu…', 'events.filterByCategory':'Kategoriaren arabera iragazi', 'events.empty':'Ez dago bilaketarekin bat datorren jarduerarik.',
    'map.label':'Aurkitu jarduera bakoitza', 'map.title':'Non izango dira jarduerak?', 'map.copy':'Kontsultatu mapan jaiak egingo diren espazio guztiak, lorategietatik Real Sitioko plazetara eta karpetara.', 'map.open':'Mapa ireki',
    'about.label':'El Pardo komunitatea da', 'about.title':'Pardeño maiteok', 'about.copyOne':'Real Sitioko jaiek musika, kultura, kirola eta gure barrutiari bizia ematen dioten tradizioez gozatzeko elkartzen gaituzte.', 'about.copyTwo':'Elkarteen, erakundeen eta auzotarren lankidetzari esker, adin guztietarako pentsatutako programa ospatzen dugu.',
    'participate.label':'Zure iritziak balio du', 'participate.title':'Parte hartu', 'participate.copy':'Lagundu barrutia hobetzen jarraitzeko.', 'card.survey':'Inkesta ofiziala', 'card.surveyCopy':'Partekatu jaiei buruzko zure iritzia.', 'card.idea':'Proposatu zure ideia', 'card.ideaCopy':'Partekatu barrutia hobetzeko proposamenak.', 'card.incident':'Gorabeherak', 'card.incidentCopy':'Jakinarazi zure auzoko gorabeherak erraz.',
    'qr.label':'Inkesta ofiziala', 'qr.title':'Erantzun mugikorretik', 'qr.copy':'Eskaneatu QR kodea El Pardoko jaien inkesta ofiziala irekitzeko.', 'qr.open':'Google inkesta ireki', 'footer.tagline':'Zure barrutia, zure komunitatea.', 'footer.legalLinks':'Legezko estekak', 'footer.contact':'Harremana', 'footer.legal':'Lege oharra', 'footer.privacy':'Pribatutasuna', 'footer.accessibility':'Irisgarritasuna',
    'category.Todos':'Guztiak', 'category.Música':'Musika', 'category.Infantil':'Haurrentzat', 'category.Deportes':'Kirolak', 'category.Tradición':'Tradizioa', 'category.Cultura':'Kultura', 'category.Gastronomía':'Gastronomia', 'weekday.Sábado':'Larunbata', 'weekday.Domingo':'Igandea', 'weekday.Lunes':'Astelehena', 'month.Agosto':'Abuztua',
    'event.dardos.title':'Dardo txapelketa', 'event.disco.title':'Diskoteka mugikorra', 'event.pregón.title':'Jaietako pregoia', 'event.orquesta.title':'Tierra orkestra', 'event.carrera.title':'Herri lasterketa', 'event.chocolate.title':'Txokolatada herrikoia', 'event.visita.title':'Bisita gidatua: Emilio Carrère', 'event.chapas.title':'Haurrentzako txapa txapelketa', 'event.procesión.title':'Prozesio solemnea', 'event.gincana.title':'Ohiko jolasekin gymkhana', 'event.chinchon.title':'Chinchón txapelketa', 'event.roxell.title':'Musika animazioa DJ ROXELLekin',
    'featured.fireworks.title':'Su artifizialak', 'featured.fireworks.date':'Igandea 6 · 24:00 h', 'featured.family.title':'Familia eguna', 'featured.family.date':'Larunbata 5 · 12:00 h', 'featured.race.title':'Herri lasterketa', 'featured.race.date':'Igandea 6 · 09:00 h', 'featured.guard.title':'Errege Guardiaren kontzertua', 'featured.guard.date':'Igandea 6 · 20:00 h', 'featured.stew.title':'Oreinen gisatua', 'featured.stew.date':'Igandea 6 · 14:00 h',
  },
  gl: {
    'brand.district':'Distrito', 'language.label':'Idioma', 'nav.home':'Inicio', 'nav.fiestas':'Festas', 'nav.events':'Eventos', 'nav.map':'Mapa', 'nav.participate':'Participa', 'nav.program':'Programa',
    'hero.dates':'29 agosto — 6 setembro 2026', 'hero.title':'Nove días de tradición, música e alegría', 'hero.copy':'Volta atoparte con El Pardo: actividades para gozar en familia, con amizades e con todo o barrio.', 'hero.events':'Ver eventos', 'hero.map':'Como chegar', 'countdown.copy':'Faltan para o inicio das festas', 'countdown.days':'días',
    'programme.label':'Axenda principal', 'programme.title':'Programa por días', 'programme.download':'Descargar programa', 'programme.more':'Máis información', 'featured.label':'Unha cita para cada plan', 'featured.title':'Non o perdas…',
    'events.label':'Consulta o programa', 'events.title':'Todos os eventos', 'events.count':'12 actividades', 'events.filters':'Filtros do programa', 'events.searchLabel':'Buscar eventos', 'events.searchPlaceholder':'Buscar eventos…', 'events.filterByCategory':'Filtrar por categoría', 'events.empty':'Non hai actividades que coincidan coa busca.',
    'map.label':'Atopa cada actividade', 'map.title':'Onde serán as actividades?', 'map.copy':'Consulta no mapa todos os espazos onde se celebrarán as festas, desde os xardíns ata as prazas e carpas do Real Sitio.', 'map.open':'Abrir o mapa',
    'about.label':'El Pardo é comunidade', 'about.title':'Queridos pardeños', 'about.copyOne':'As Festas do Real Sitio reúnennos para gozar da música, a cultura, o deporte e as tradicións que dan vida ao noso distrito.', 'about.copyTwo':'Grazas á colaboración de asociacións, entidades e veciñanza, celebramos un programa pensado para todas as idades.',
    'participate.label':'A túa opinión conta', 'participate.title':'Participa', 'participate.copy':'Axúdanos a seguir mellorando o distrito.', 'card.survey':'Enquisa oficial', 'card.surveyCopy':'Comparte a túa opinión sobre as festas.', 'card.idea':'Propón a túa idea', 'card.ideaCopy':'Comparte propostas para mellorar o distrito.', 'card.incident':'Incidencias', 'card.incidentCopy':'Comunica incidencias no teu barrio facilmente.',
    'qr.label':'Enquisa oficial', 'qr.title':'Responde desde o móbil', 'qr.copy':'Escanea o código QR para abrir a enquisa oficial das festas de El Pardo.', 'qr.open':'Abrir enquisa de Google', 'footer.tagline':'O teu distrito, a túa comunidade.', 'footer.legalLinks':'Ligazóns legais', 'footer.contact':'Contacto', 'footer.legal':'Aviso legal', 'footer.privacy':'Privacidade', 'footer.accessibility':'Accesibilidade',
    'category.Todos':'Todos', 'category.Música':'Música', 'category.Infantil':'Infantil', 'category.Deportes':'Deportes', 'category.Tradición':'Tradición', 'category.Cultura':'Cultura', 'category.Gastronomía':'Gastronomía', 'weekday.Sábado':'Sábado', 'weekday.Domingo':'Domingo', 'weekday.Lunes':'Luns', 'month.Agosto':'Agosto',
    'event.dardos.title':'Torneo de dardos', 'event.disco.title':'Discoteca móbil', 'event.pregón.title':'Pregón das festas', 'event.orquesta.title':'Orquestra Tierra', 'event.carrera.title':'Carreira popular', 'event.chocolate.title':'Chocolatada popular', 'event.visita.title':'Visita guiada: Emilio Carrère', 'event.chapas.title':'Torneo infantil de chapas', 'event.procesión.title':'Procesión solemne', 'event.gincana.title':'Xincana con xogos tradicionais', 'event.chinchon.title':'Torneo de chinchón', 'event.roxell.title':'Animación musical con DJ ROXELL',
    'featured.fireworks.title':'Fogos artificiais', 'featured.fireworks.date':'Domingo 6 · 24:00 h', 'featured.family.title':'Día da familia', 'featured.family.date':'Sábado 5 · 12:00 h', 'featured.race.title':'Carreira popular', 'featured.race.date':'Domingo 6 · 09:00 h', 'featured.guard.title':'Concerto da Garda Real', 'featured.guard.date':'Domingo 6 · 20:00 h', 'featured.stew.title':'Caldereta de gamo', 'featured.stew.date':'Domingo 6 · 14:00 h',
  },
  en: {
    'brand.district':'District', 'language.label':'Language', 'nav.home':'Home', 'nav.fiestas':'Festival', 'nav.events':'Events', 'nav.map':'Map', 'nav.participate':'Take part', 'nav.program':'Programme',
    'hero.dates':'29 August — 6 September 2026', 'hero.title':'Nine days of tradition, music and joy', 'hero.copy':'Meet El Pardo again: activities to enjoy with family, friends and the whole neighbourhood.', 'hero.events':'View events', 'hero.map':'Getting here', 'countdown.copy':'Days until the festival begins', 'countdown.days':'days',
    'programme.label':'Main agenda', 'programme.title':'Daily programme', 'programme.download':'Download programme', 'programme.more':'More information', 'featured.label':'Something for every plan', 'featured.title':'Don’t miss…',
    'events.label':'Browse the programme', 'events.title':'All events', 'events.count':'12 activities', 'events.filters':'Programme filters', 'events.searchLabel':'Search events', 'events.searchPlaceholder':'Search events…', 'events.filterByCategory':'Filter by category', 'events.empty':'No activities match your search.',
    'map.label':'Find every activity', 'map.title':'Where will the activities take place?', 'map.copy':'Use the map to find every festival space, from gardens to the squares and marquees of the Royal Site.', 'map.open':'Open map',
    'about.label':'El Pardo is community', 'about.title':'Dear residents of El Pardo', 'about.copyOne':'The Royal Site Festival brings us together to enjoy the music, culture, sport and traditions that bring our district to life.', 'about.copyTwo':'Thanks to the collaboration of associations, organisations and residents, we celebrate a programme designed for all ages.',
    'participate.label':'Your opinion matters', 'participate.title':'Take part', 'participate.copy':'Help us keep improving the district.', 'card.survey':'Official survey', 'card.surveyCopy':'Share your opinion about the festival.', 'card.idea':'Share your idea', 'card.ideaCopy':'Share suggestions to improve the district.', 'card.incident':'Report an issue', 'card.incidentCopy':'Easily report issues in your neighbourhood.',
    'qr.label':'Official survey', 'qr.title':'Respond from your phone', 'qr.copy':'Scan the QR code to open the official El Pardo Festival survey.', 'qr.open':'Open Google survey', 'footer.tagline':'Your district, your community.', 'footer.legalLinks':'Legal links', 'footer.contact':'Contact', 'footer.legal':'Legal notice', 'footer.privacy':'Privacy', 'footer.accessibility':'Accessibility',
    'category.Todos':'All', 'category.Música':'Music', 'category.Infantil':'Children', 'category.Deportes':'Sports', 'category.Tradición':'Tradition', 'category.Cultura':'Culture', 'category.Gastronomía':'Food & drink', 'weekday.Sábado':'Saturday', 'weekday.Domingo':'Sunday', 'weekday.Lunes':'Monday', 'month.Agosto':'August',
    'event.dardos.title':'Darts tournament', 'event.disco.title':'Mobile disco', 'event.pregón.title':'Festival proclamation', 'event.orquesta.title':'Tierra Orchestra', 'event.carrera.title':'Community race', 'event.chocolate.title':'Community hot chocolate', 'event.visita.title':'Guided tour: Emilio Carrère', 'event.chapas.title':'Children’s bottle-cap tournament', 'event.procesión.title':'Solemn procession', 'event.gincana.title':'Traditional games gymkhana', 'event.chinchon.title':'Chinchón tournament', 'event.roxell.title':'Music entertainment with DJ ROXELL',
    'featured.fireworks.title':'Fireworks', 'featured.fireworks.date':'Sunday 6 · 24:00 h', 'featured.family.title':'Family day', 'featured.family.date':'Saturday 5 · 12:00 h', 'featured.race.title':'Community race', 'featured.race.date':'Sunday 6 · 09:00 h', 'featured.guard.title':'Royal Guard concert', 'featured.guard.date':'Sunday 6 · 20:00 h', 'featured.stew.title':'Fallow deer stew', 'featured.stew.date':'Sunday 6 · 14:00 h',
  },
};

function textFor(language: Language, key: string, original: string) {
  return language === 'es' ? original : translations[language][key] ?? original;
}

function translateAttribute(language: Language, selector: string, attribute: 'placeholder' | 'aria-label', dataAttribute: 'i18nPlaceholder' | 'i18nAriaLabel') {
  document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    const key = element.dataset[dataAttribute];
    if (!key) return;
    const defaultKey = `${dataAttribute}Default` as keyof DOMStringMap;
    const original = element.dataset[defaultKey] ?? element.getAttribute(attribute) ?? '';
    element.dataset[defaultKey] = original;
    element.setAttribute(attribute, textFor(language, key, original));
  });
}

export function applyLanguage(language: Language) {
  document.documentElement.lang = language;
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n!;
    const original = element.dataset.i18nDefault ?? element.textContent ?? '';
    element.dataset.i18nDefault = original;
    element.textContent = textFor(language, key, original);
  });
  translateAttribute(language, '[data-i18n-placeholder]', 'placeholder', 'i18nPlaceholder');
  translateAttribute(language, '[data-i18n-aria-label]', 'aria-label', 'i18nAriaLabel');
  window.localStorage.setItem('el-pardo-language', language);
}

export function savedLanguage(): Language {
  const value = window.localStorage.getItem('el-pardo-language');
  return value === 'ca' || value === 'eu' || value === 'gl' || value === 'en' ? value : 'es';
}
