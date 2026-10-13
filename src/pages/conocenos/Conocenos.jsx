import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Conocenos.css";

const SECTIONS = [
  {
    title: "Modelo Educativo",
    desc:
      "Aprender haciendo: pensamiento crítico, acompañamiento docente y formación integral para la vida.",
    to: "/conocenos/modelo-educativo",
    icon: "📚",
    tone: "red",
  },
  {
    title: "Misión y Visión",
    desc:
      "Guiamos con propósito: formar alumnos responsables, preparados y con valores que trascienden el aula.",
    to: "/conocenos/mision-vision",
    icon: "🎯",
    tone: "blue",
  },
  {
    title: "Valores",
    desc:
      "Respeto, responsabilidad y compromiso: lo que vivimos todos los días dentro y fuera del salón.",
    to: "/conocenos/valores",
    icon: "🤝",
    tone: "red",
  },
  {
    title: "Otros Campus",
    desc:
      "Conoce nuestras sedes y descubre espacios diseñados para impulsar el desarrollo académico y personal.",
    to: "/conocenos/otros-campus",
    icon: "🏫",
    tone: "blue",
  },
  {
    title: "Clave de Centro de Trabajo",
    desc:
      "Información institucional oficial que respalda nuestra operación y el reconocimiento educativo.",
    to: "/conocenos/clave-de-centro-de-trabajo",
    icon: "✅",
    tone: "red",
  },
];

export default function Conocenos() {
  return (
    <main className="cn-page">
      <Helmet>
        <html lang="es-MX" />
        <title>Conócenos | Colegio Colonial Querétaro</title>
        <meta
          name="description"
          content="Conoce el Colegio Colonial en Querétaro: modelo educativo, misión, visión, valores, campus y datos institucionales de nuestra comunidad escolar."
        />

        <link
          rel="canonical"
          href="https://www.colegiocolonial.edu.mx/conocenos"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Colegio Colonial" />
        <meta property="og:locale" content="es_MX" />
        <meta
          property="og:title"
          content="Conócenos | Colegio Colonial Querétaro"
        />
        <meta
          property="og:description"
          content="Modelo educativo, misión, visión, valores, otros campus y datos institucionales del Colegio Colonial en Querétaro."
        />
        <meta
          property="og:url"
          content="https://www.colegiocolonial.edu.mx/conocenos"
        />
        <meta
          property="og:image"
          content="https://www.colegiocolonial.edu.mx/images/conocenos/img1.webp"
        />
        <meta
          property="og:image:alt"
          content="Conócenos - Colegio Colonial en Querétaro"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Conócenos | Colegio Colonial Querétaro"
        />
        <meta
          name="twitter:description"
          content="Conoce modelo educativo, misión, visión, valores y comunidad escolar del Colegio Colonial en Querétaro."
        />
        <meta
          name="twitter:image"
          content="https://www.colegiocolonial.edu.mx/images/conocenos/img1.webp"
        />
        <meta name="geo.region" content="MX-QUE" />
        <meta name="geo.placename" content="Querétaro, México" />
      </Helmet>

      {/* HERO */}
      <section className="cn-hero">
        <div className="cn-hero-bg" aria-hidden="true" />

        <div className="cn-hero-wrap">
          {/* IZQUIERDA: TARJETA GLASS */}
          <aside
            className="cn-hero-mock"
            aria-label="Colegio Colonial - vista general"
          >
            <div className="cn-mock-top">
              <div className="cn-mock-brand">Colegio Colonial</div>
              <div className="cn-mock-chip">Conócenos</div>
            </div>

            {/* Collage */}
            <div className="cn-mock-collage">
              <div className="cn-mock-img cn-mock-img-1" />
              <div className="cn-mock-img cn-mock-img-2" />
              <div className="cn-mock-img cn-mock-img-3" />
            </div>

            {/* Pills */}
            <div className="cn-mock-pills">
              <div className="cn-mock-pill">
                <div className="cn-pill-title">Historia</div>
                <div className="cn-pill-sub">Identidad + tradición</div>
              </div>

              <div className="cn-mock-pill">
                <div className="cn-pill-title">Modelo</div>
                <div className="cn-pill-sub">Aprendizaje integral</div>
              </div>

              <div className="cn-mock-pill">
                <div className="cn-pill-title">Valores</div>
                <div className="cn-pill-sub">Respeto y compromiso</div>
              </div>
            </div>
          </aside>

          {/* DERECHA: COPY */}
          <div className="cn-hero-copy">
            <h1>Conócenos: tradición que forma, innovación que impulsa.</h1>

            <p>
              Aquí la educación es acompañamiento, carácter y futuro. Explora
              nuestras secciones clave y descubre lo que nos distingue.
            </p>

            <div className="cn-hero-actions">
              <NavLink to="/inscripciones" className="cn-btn cn-btn-primary">
                Iniciar Inscripción
              </NavLink>
              <NavLink to="/contacto" className="cn-btn cn-btn-ghost">
                Agendar visita
              </NavLink>
            </div>

            <div className="cn-hero-stats">
              <div className="cn-stat">
                <div className="cn-stat-num">+6</div>
                <div className="cn-stat-label">Secciones clave</div>
              </div>
              <div className="cn-stat">
                <div className="cn-stat-num">100%</div>
                <div className="cn-stat-label">Enfoque integral</div>
              </div>
                            <div className="cn-stat">
                <div className="cn-stat-num">100%</div>
                <div className="cn-stat-label">Educación católica</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="separator-blue"></div>

      {/* CARDS */}
      <section className="cn-section">
        <div className="cn-wrap">
          <header className="cn-head">
            <h2>Explora nuestras secciones</h2>
            <p>
              Un vistazo rápido a lo más importante. Entra a cada apartado para
              ver la información completa.
            </p>
          </header>

          <div className="cn-grid">
            {SECTIONS.map((s) => (
              <article key={s.title} className={`cn-card cn-${s.tone}`}>
                <div className="cn-card-top">
                  <div className="cn-icon" aria-hidden="true">
                    {s.icon}
                  </div>
                  <div className="cn-pill">{s.title}</div>
                </div>

                <p className="cn-card-desc">{s.desc}</p>

                <NavLink to={s.to} className="cn-card-link">
                  Ver más <span aria-hidden="true">→</span>
                </NavLink>

                <div className="cn-card-glow" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE / ROUTE */}
      <section className="cn-route">
        <div className="cn-wrap">
          <header className="cn-head cn-head-light">
            <h2>Tu ruta rápida para conocer el Colegio</h2>
            <p>
              Si vienes por primera vez, este recorrido te lleva por lo esencial
              en orden.
            </p>
          </header>

          <ol className="cn-timeline">


            <li className="cn-step">
              <div className="cn-step-dot" />
              <div className="cn-step-card">
                <h3>1) Cómo enseñamos</h3>
                <p>
                  Modelo educativo: lo académico + lo humano + habilidades para
                  la vida.
                </p>
                <NavLink to="/conocenos/modelo-educativo" className="cn-mini-link">
                  Ir a Modelo →
                </NavLink>
              </div>
            </li>

            <li className="cn-step">
              <div className="cn-step-dot" />
              <div className="cn-step-card">
                <h3>2) Propósito y dirección</h3>
                <p>Misión y visión que guían cada proyecto y decisión.</p>
                <NavLink to="/conocenos/mision-vision" className="cn-mini-link">
                  Ir a Misión y Visión →
                </NavLink>
              </div>
            </li>

            <li className="cn-step">
              <div className="cn-step-dot" />
              <div className="cn-step-card">
                <h3>3) Lo que vivimos</h3>
                <p>Valores que se reflejan en la convivencia y el crecimiento.</p>
                <NavLink to="/conocenos/valores" className="cn-mini-link">
                  Ir a Valores →
                </NavLink>
              </div>
            </li>

            <li className="cn-step">
              <div className="cn-step-dot" />
              <div className="cn-step-card">
                <h3>4) Nuestras sedes</h3>
                <p>
                  Otros campus y espacios para aprender, crear y convivir.
                </p>
                <NavLink to="/conocenos/otros-campus" className="cn-mini-link">
                  Ir a Otros Campus →
                </NavLink>
              </div>
            </li>

            <li className="cn-step">
              <div className="cn-step-dot" />
              <div className="cn-step-card">
                <h3>5) Información institucional</h3>
                <p>Consulta la Clave de Centro de Trabajo (CCT).</p>
                <NavLink to="/conocenos/clave-de-centro-de-trabajo" className="cn-mini-link">
                  Ir a CCT →
                </NavLink>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="cn-cta">
        <div className="cn-wrap">
          <div className="cn-cta-box">
            <div className="cn-cta-left">
              <h2>¿Listo para dar el siguiente paso?</h2>
              <p>
                Inicia tu proceso o agenda una visita. Te acompañamos en todo el
                camino.
              </p>
            </div>
            <div className="cn-cta-actions">
              <NavLink to="/inscripciones" className="cn-btn cn-btn-primary">
                Inscripciones
              </NavLink>
              <NavLink to="/contacto" className="cn-btn cn-btn-primary">
                Contáctanos
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
