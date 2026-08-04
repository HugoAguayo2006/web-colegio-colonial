const SITE_URL = "https://www.colegiocolonial.edu.mx";

const DEFAULT_META = {
  title: "Colegio Colonial Querétaro | Primaria y Secundaria",
  description:
    "El Colegio Colonial ofrece escuela primaria y secundaria en Querétaro, con valores, calidad académica y colegiaturas accesibles. Somos una institución católica de la Orden del Verbo Encarnado y del Santísimo Sacramento.",
  canonical: `${SITE_URL}/`,
  robots: "index, follow, max-image-preview:large",
};

const ROUTE_META = {
  "/": DEFAULT_META,
  "/inicio": DEFAULT_META,
  "/niveles": {
    title: "Niveles Educativos | Primaria y Secundaria en Querétaro",
    description:
      "Conoce los niveles educativos del Colegio Colonial en Querétaro: escuela primaria y escuela secundaria con formación académica, fe, valores y acompañamiento cercano.",
    canonical: `${SITE_URL}/niveles`,
  },
  "/niveles/primaria": {
    title: "Escuela Primaria en Querétaro | Colegio Colonial",
    description:
      "Primaria en Querétaro con formación integral, valores, acompañamiento cercano y calidad académica en el Colegio Colonial.",
    canonical: `${SITE_URL}/niveles/primaria`,
  },
  "/niveles/secundaria": {
    title: "Escuela Secundaria en Querétaro | Colegio Colonial",
    description:
      "Secundaria en Querétaro con formación académica, valores, actividades y acompañamiento para adolescentes en el Colegio Colonial.",
    canonical: `${SITE_URL}/niveles/secundaria`,
  },
  "/inscripciones": {
    title: "Inscripciones | Colegio Colonial Querétaro",
    description:
      "Consulta el proceso de inscripciones del Colegio Colonial en Querétaro para primaria y secundaria, requisitos, pasos y formas de contacto.",
    canonical: `${SITE_URL}/inscripciones`,
  },
  "/inscripciones/primaria": {
    title: "Inscripciones Primaria en Querétaro | Colegio Colonial",
    description:
      "Información de inscripción a primaria en Colegio Colonial Querétaro: proceso de admisión, costos, pagos y contacto para iniciar.",
    canonical: `${SITE_URL}/inscripciones/primaria`,
  },
  "/inscripciones/secundaria": {
    title: "Inscripciones Secundaria en Querétaro | Colegio Colonial",
    description:
      "Información de inscripción a secundaria en Colegio Colonial Querétaro: proceso de admisión, costos, pagos y contacto para iniciar.",
    canonical: `${SITE_URL}/inscripciones/secundaria`,
  },
  "/contacto": {
    title: "Contacto Colegio Colonial Querétaro | Teléfono y Dirección",
    description:
      "Contacta a Colegio Colonial en Querétaro. Teléfono +52 1 442 431 7022, WhatsApp, horario y ubicación. Solicita informes e inscripciones hoy.",
    canonical: `${SITE_URL}/contacto`,
  },
  "/calendario": {
    title: "Calendario Escolar Interactivo | Colegio Colonial Querétaro",
    description:
      "Consulta el calendario escolar del Colegio Colonial en Querétaro con eventos, actividades, fechas importantes y avisos para la comunidad educativa.",
    canonical: `${SITE_URL}/calendario`,
  },
  "/vida-colonial": {
    title: "Vida Colonial Querétaro | Actividades y Eventos",
    description:
      "Conoce la vida escolar del Colegio Colonial en Querétaro: eventos, actividades, galería, talleres, servicios y experiencias para alumnos.",
    canonical: `${SITE_URL}/vida-colonial`,
  },
  "/vida-colonial/eventos": {
    title: "Eventos Escolares en Querétaro | Colegio Colonial",
    description:
      "Consulta eventos escolares del Colegio Colonial en Querétaro: celebraciones, actividades culturales, deportivas y momentos de convivencia.",
    canonical: `${SITE_URL}/vida-colonial/eventos`,
  },
  "/vida-colonial/galeria": {
    title: "Galería del Colegio Colonial | Fotos y Eventos Escolares",
    description:
      "Explora la galería del Colegio Colonial en Querétaro: fotos del día a día, eventos escolares, celebraciones, Intercolegiales y actividades.",
    canonical: `${SITE_URL}/vida-colonial/galeria`,
  },
  "/vida-colonial/extracurriculares": {
    title: "Actividades Extracurriculares en Querétaro | Colegio Colonial",
    description:
      "Conoce las actividades extracurriculares del Colegio Colonial en Querétaro: deportes, talleres y espacios de formación integral.",
    canonical: `${SITE_URL}/vida-colonial/extracurriculares`,
  },
  "/vida-colonial/otros-servicios": {
    title: "Otros Servicios Escolares | Colegio Colonial Querétaro",
    description:
      "Conoce otros servicios del Colegio Colonial en Querétaro, como cafetería, excursiones escolares y apoyos para la comunidad educativa.",
    canonical: `${SITE_URL}/vida-colonial/otros-servicios`,
  },
  "/conocenos": {
    title: "Conócenos | Colegio Colonial Querétaro",
    description:
      "Conoce el Colegio Colonial en Querétaro: modelo educativo, misión, visión, valores, campus y datos institucionales.",
    canonical: `${SITE_URL}/conocenos`,
  },
  "/conocenos/mision-vision": {
    title: "Misión y Visión | Colegio Colonial Querétaro",
    description:
      "Conoce la misión y visión del Colegio Colonial en Querétaro y su compromiso con la formación académica, humana y espiritual.",
    canonical: `${SITE_URL}/conocenos/mision-vision`,
  },
  "/conocenos/valores": {
    title: "Valores del Colegio Colonial en Querétaro",
    description:
      "Conoce los valores institucionales del Colegio Colonial en Querétaro: fe, amor, servicio, responsabilidad y formación integral.",
    canonical: `${SITE_URL}/conocenos/valores`,
  },
  "/conocenos/otros-campus": {
    title: "Otros Campus | Colegio Colonial Querétaro",
    description:
      "Conoce otros campus y colegios de la Orden del Verbo Encarnado y del Santísimo Sacramento en México y el mundo.",
    canonical: `${SITE_URL}/conocenos/otros-campus`,
  },
  "/conocenos/modelo-educativo": {
    title: "Modelo Educativo en Querétaro | Colegio Colonial",
    description:
      "Conoce el modelo educativo del Colegio Colonial en Querétaro, basado en excelencia académica, formación en valores y visión integral.",
    canonical: `${SITE_URL}/conocenos/modelo-educativo`,
  },
  "/conocenos/clave-de-centro-de-trabajo": {
    title: "Clave del Centro de Trabajo | Colegio Colonial",
    description:
      "Consulta las claves del centro de trabajo del Colegio Colonial en Querétaro para primaria y secundaria.",
    canonical: `${SITE_URL}/conocenos/clave-de-centro-de-trabajo`,
  },
};

function setMetaTag(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href) {
  let tag = document.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

export function applyRouteMeta(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const routeMeta = ROUTE_META[normalizedPath] || {
    title: "Página no encontrada | Colegio Colonial",
    description:
      "La página que buscas no existe o cambió de ubicación. Regresa al inicio del Colegio Colonial para continuar navegando.",
    canonical: `${SITE_URL}${normalizedPath}`,
    robots: "noindex, follow",
  };

  const meta = {
    ...DEFAULT_META,
    ...routeMeta,
  };

  document.documentElement.lang = "es-MX";
  document.title = meta.title;
  setMetaTag("description", meta.description);
  setMetaTag("robots", meta.robots);
  setCanonical(meta.canonical);
}
