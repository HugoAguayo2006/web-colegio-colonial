import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./Ins-primaria.css";

const AccordionItem = ({ title, children, tone = "blue" }) => {
  const [open, setOpen] = useState(false);

  return (
    <article className={`pacc pacc--${tone}`}>
      <button
        className="pacc__header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        type="button"
      >
        <span className="pacc__title">{title}</span>
        <span className={`pacc__arrow ${open ? "open" : ""}`} aria-hidden="true">
          ⌄
        </span>
      </button>

      {open && <div className="pacc__content">{children}</div>}
    </article>
  );
};

export default function InscripcionesSecundaria() {
  const costos = useMemo(
    () => [
      { label: "Inscripción", value: "$5,860", note: "Pago único" },
      { label: "Colegiatura", value: "$2,980", note: "Mensual (12 meses)" },
      {
        label: "Becas y descuentos",
        value: "Disponibles",
        note: "Rendimiento + estudio socioeconómico + hermanos",
      },
      {
        label: "Pagos",
        value: "Efectivo / Transferencia",
        note: "Para mayor comodidad",
      },
    ],
    []
  );

  const pasos = useMemo(
    () => [
      {
        t: "1) Solicitar informes",
        d: "Me acerco al colegio para recibir orientación general del nivel Secundaria y resolver dudas iniciales.",
      },
      {
        t: "2) Inicio del proceso (Febrero–Agosto)",
        d: "El proceso abre en febrero y se mantiene hasta agosto, sujeto a disponibilidad de lugares.",
      },
      {
        t: "3) Evaluación académica (Examen de conocimientos)",
        d: "Se aplica un examen de conocimientos como parte del proceso de admisión para conocer el nivel del aspirante.",
      },
      {
        t: "4) Valoración por Psicología",
        d: "Se realiza una valoración por el área de Psicología para conocer el perfil académico y emocional del estudiante.",
      },
      {
        t: "5) Entrevista con alumno y/o padres",
        d: "Se agenda una entrevista como parte del proceso de admisión para acompañar el ingreso de manera integral.",
      },
      {
        t: "6) Resultado de admisión",
        d: "Una vez concluida la evaluación y entrevista, se informa el resultado del proceso.",
      },
      {
        t: "7) Apertura de expediente y ficha descriptiva",
        d: "Al ser aceptado, se abre el expediente del alumno y se completa una ficha descriptiva.",
      },
      {
        t: "8) Diálogo con maestras",
        d: "Se realiza un diálogo con las maestras para alinear expectativas y acompañar la adaptación del estudiante.",
      },
      {
        t: "9) Documentos y pago de inscripción",
        d: "Se solicitan los documentos necesarios y se realiza el pago de la inscripción.",
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "¿Cuándo inicia el proceso de inscripción y hasta cuándo hay cupo?",
        a: (
          <p>
            El proceso inicia en <b>febrero</b> y permanece abierto hasta{" "}
            <b>agosto</b>, <b>sujeto a disponibilidad de lugares</b>.
          </p>
        ),
      },
      {
        q: "¿Aceptan traslados de otras escuelas?",
        a: (
          <p>
            Sí. El colegio acepta <b>traslados</b> de estudiantes provenientes de
            otras instituciones, siempre que se cumplan los requisitos establecidos
            para la admisión.
          </p>
        ),
      },
      {
        q: "¿Cómo es la admisión para alumnos nuevos?",
        a: (
          <div className="plist">
            <p>Para la admisión se considera:</p>
            <ul>
              <li>Examen de conocimientos.</li>
              <li>Valoración por el área de Psicología.</li>
              <li>Entrevista con el alumno y/o padres.</li>
            </ul>
          </div>
        ),
      },
      {
        q: "¿Cuánto cuesta la inscripción y la colegiatura?",
        a: (
          <div className="plist">
            <ul>
              <li>
                <b>Inscripción:</b> $5,860.
              </li>
              <li>
                <b>Colegiatura:</b> $2,980 por mes (12 meses).
              </li>
            </ul>
          </div>
        ),
      },
      {
        q: "¿Ofrecen becas o descuentos?",
        a: (
          <p>
            Sí. Se ofrecen <b>becas en Secundaria</b> basadas en el rendimiento
            académico y un <b>estudio socioeconómico</b>, así como{" "}
            <b>descuentos para familias con hermanos inscritos</b>.
          </p>
        ),
      },
      {
        q: "¿Qué métodos de pago están disponibles?",
        a: (
          <p>
            Los métodos de pago disponibles son <b>en efectivo</b> y mediante{" "}
            <b>transferencia bancaria</b>.
          </p>
        ),
      },
      {
        q: "¿Hay costos adicionales?",
        a: (
          <p>
            Algunas <b>actividades extracurriculares o servicios especiales</b> pueden
            tener cuotas adicionales, las cuales se informan previamente según la
            actividad o servicio correspondiente.
          </p>
        ),
      },
      {
        q: "¿Qué ocurre después de ser aceptado?",
        a: (
          <div className="plist">
            <ul>
              <li>Se abre el expediente del alumno.</li>
              <li>Se completa una ficha descriptiva.</li>
              <li>Se realiza un diálogo con las maestras.</li>
              <li>Se solicitan los documentos necesarios.</li>
              <li>Se efectúa el pago de la inscripción.</li>
            </ul>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Helmet>
        <html lang="es-MX" />
        <title>Inscripciones Secundaria en Querétaro | Colegio Colonial</title>
        <meta
          name="description"
          content="Encuentra información para inscribirte a la escuela secundaria en Querétaro del Colegio Colonial: requisitos, fechas importantes, proceso de admisión y datos de contacto."
        />
        <link
          rel="canonical"
          href="https://www.colegiocolonial.edu.mx/inscripciones/secundaria"
        />

        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index,follow" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Colegio Colonial" />
        <meta property="og:locale" content="es_MX" />
        <meta
          property="og:title"
          content="Inscripciones Secundaria en Querétaro | Colegio Colonial"
        />
        <meta
          property="og:description"
          content="Requisitos, fechas importantes, proceso de admisión y contacto para formar parte de la secundaria del Colegio Colonial en Querétaro."
        />
        <meta
          property="og:url"
          content="https://www.colegiocolonial.edu.mx/inscripciones/secundaria"
        />
        <meta
          property="og:image"
          content="https://www.colegiocolonial.edu.mx/images/secundaria/hero-1.webp"
        />
        <meta
          property="og:image:alt"
          content="Inscripciones a secundaria en el Colegio Colonial en Querétaro"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Inscripciones Secundaria en Querétaro | Colegio Colonial"
        />
        <meta
          name="twitter:description"
          content="Inscríbete a secundaria en el Colegio Colonial: admisión, requisitos, fechas y contacto en Querétaro."
        />
        <meta
          name="twitter:image"
          content="https://www.colegiocolonial.edu.mx/images/secundaria/hero-1.webp"
        />

        <meta name="geo.region" content="MX-QUE" />
        <meta name="geo.placename" content="Querétaro, México" />
        <meta name="ICBM" content="20.588793,-100.389888" />
      </Helmet>

      <main className="pinc">
        {/* ===== MINI HERO (CENTRADO) ===== */}
        <section className="pinc__top">
          <div className="pinc__topInner">
            <p className="pinc__kicker">SECUNDARIA</p>
            <h1 className="pinc__title">Inscripciones Secundaria</h1>
            <p className="pinc__subtitle">
              Proceso de admisión, costos, becas y preguntas frecuentes para nuevo ingreso.
            </p>

            <div className="pinc__note">
              <span className="pbadge">Febrero – Agosto</span>
              <span className="pbadge pbadge--red">Sujeto a cupo</span>
            </div>
          </div>
        </section>

        {/* ===== GRID SOLO PARA PROCESO + STICKY ===== */}
        <section className="pinc__layout">
          {/* IZQUIERDA: PROCESO */}
          <section className="pinc__section" id="proceso">
            <header className="pinc__header">
              <h2>Proceso de admisión</h2>
              <p>
                Para ingresar a Secundaria, el proceso contempla evaluación académica,
                valoración psicológica y entrevista.
              </p>
            </header>

            <div className="pinc__block">
              {pasos.map((s, i) => (
                <AccordionItem
                  key={i}
                  title={s.t}
                  tone={i % 2 === 0 ? "blue" : "red"}
                >
                  <p>{s.d}</p>
                </AccordionItem>
              ))}
            </div>

            <div className="pinc__strip">
              <div className="pstrip__item">
                <span className="pstrip__dot" aria-hidden="true" />
                <p>
                  <b>Traslados:</b> se aceptan, siempre que se cumplan requisitos de admisión.
                </p>
              </div>
              <div className="pstrip__item">
                <span className="pstrip__dot pred" aria-hidden="true" />
                <p>
                  <b>Pagos:</b> efectivo y transferencia bancaria.
                </p>
              </div>
            </div>
          </section>

          {/* DERECHA: STICKY */}
          <aside className="pinc__sidebar" aria-label="Resumen fijo de costos">
            <div className="pinc__stickyCard">
              <div className="pinc__stickyTop">
                <div>
                  <p className="pinc__stickyKicker">Secundaria</p>
                  <h3 className="pinc__stickyTitle">Costos y pagos</h3>
                </div>
                <span className="pinc__stickyPill">Feb–Ago</span>
              </div>

              <div className="pinc__grid">
                {costos.map((c) => (
                  <div key={c.label} className="pcost">
                    <div className="pcost__top">
                      <span className="pcost__label">{c.label}</span>
                      <span className="pcost__value">{c.value}</span>
                    </div>
                    <p className="pcost__note">{c.note}</p>
                  </div>
                ))}
              </div>

              <div className="pinc__small">
                <p>
                  <b>Nota:</b> Actividades extracurriculares o servicios
                  especiales pueden generar cuotas adicionales.
                </p>
              </div>

              <Link className="pbtn pbtn--secondary" to="/contacto">
                Solicitar informes
              </Link>

              <div className="pinc__mini">
                <p className="pinc__miniLine">
                  <b>Pago:</b> Efectivo o transferencia
                </p>
                <p className="pinc__miniLine">
                  <b>Becas:</b> Rendimiento + estudio socioeconómico + hermanos
                </p>
              </div>
            </div>
          </aside>
        </section>

        {/* ===== FAQ (FUERA DEL GRID) PARA QUE QUEDE CENTRADO ===== */}
        <section className="pinc__faq" id="faq">
          <header className="pinc__header">
            <h2>Preguntas frecuentes</h2>
            <p>
              Lo esencial sobre fechas, costos, becas y requisitos del proceso.
            </p>
          </header>

          <div className="pinc__block">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                title={f.q}
                tone={i % 3 === 0 ? "red" : "blue"}
              >
                {f.a}
              </AccordionItem>
            ))}
          </div>

          <div className="pinc__final">
            <div className="pfinal__card">
              <h3>¿Listo para iniciar?</h3>
              <p>
                Si quieres avanzar con el proceso, contáctanos para recibir
                información y dar el siguiente paso.
              </p>
              <div className="pfinal__actions">
                <Link className="pbtn pbtn--primary" to="/contacto">
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
