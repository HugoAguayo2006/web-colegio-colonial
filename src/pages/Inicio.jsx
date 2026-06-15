// src/pages/Inicio.jsx
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Inicio.css";

const IntercolegialesVideoHero = lazy(() =>
  import("../components/IntercolegialesVideoHero"),
);

function DeferUntilVisible({ children, fallback = null }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return undefined;

    if (!("IntersectionObserver" in window)) {
      const t = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px 120px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return <div ref={ref}>{visible ? children : fallback}</div>;
}

export default function Inicio() {
  // ✅ Carrusel SOLO en el Hero detrás del título
  const slides = useMemo(
    () => [
      {
        src: "/images/inicio/hero-3.webp",
        mobileSrc: "/images/inicio/hero-3-mobile.webp",
        width: 1536,
        height: 1152,
      },
      {
        src: "/images/inicio/hero-1.webp",
        width: 1600,
        height: 1200,
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [carouselReady, setCarouselReady] = useState(false);

  useEffect(() => {
    if (!slides.length) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    const t = setTimeout(() => setCarouselReady(true), 2400);
    return () => clearTimeout(t);
  }, []);

  const quick = [
    { label: "Primaria", to: "/niveles/primaria" },
    { label: "Secundaria", to: "/niveles/secundaria" },
    { label: "Calendario", to: "/calendario" },
    { label: "Otros campus", to: "/conocenos/otros-campus" },
  ];

  const explore = [
    { label: "Modelo educativo", to: "/conocenos/modelo-educativo" },
    { label: "Eventos", to: "/vida-colonial/eventos" },
    { label: "Galería", to: "/vida-colonial/galeria" },
  ];

  return (
    <main className="cc-home">
      {/* =========================
          SEO: Helmet
      ========================== */}
      <Helmet>
        <html lang="es-MX" />
        <title>Colegio Colonial Querétaro | Primaria y Secundaria</title>
        <meta
          name="description"
          content="El Colegio Colonial ofrece escuela primaria y secundaria en Querétaro, con valores, calidad académica y colegiaturas accesibles. Somos una institución católica de la Orden del Verbo Encarnado y del Santísimo Sacramento."
        />
        <link rel="canonical" href="https://www.colegiocolonial.edu.mx/" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Colegio Colonial" />
        <meta
          property="og:title"
          content="Colegio Colonial Querétaro | Escuela Primaria y Secundaria"
        />
        <meta
          property="og:description"
          content="Colegio Colonial en Querétaro: escuela primaria y escuela secundaria con valores, calidad académica, formación católica y colegiaturas accesibles."
        />
        <meta property="og:url" content="https://www.colegiocolonial.edu.mx/" />
        <meta
          property="og:image"
          content="https://www.colegiocolonial.edu.mx/images/inicio/hero-3.webp"
        />
        <meta
          property="og:image:alt"
          content="Colegio Colonial en Querétaro, escuela primaria y secundaria"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Colegio Colonial Querétaro | Primaria y Secundaria"
        />
        <meta
          name="twitter:description"
          content="Escuela primaria y secundaria en Querétaro con valores, formación integral, calidad académica y colegiaturas accesibles."
        />
        <meta
          name="twitter:image"
          content="https://www.colegiocolonial.edu.mx/images/inicio/hero-3.webp"
        />
        <meta name="geo.region" content="MX-QUE" />
        <meta name="geo.placename" content="Querétaro, México" />
      </Helmet>

      {/* =========================
          HERO (solo aquí carrusel)
      ========================== */}
      <header className="cc-hero" aria-label="Inicio Colegio Colonial">
        <div className="cc-hero-bg" aria-hidden="true">
          {(carouselReady ? slides : slides.slice(0, 1)).map((slide, i) => (
            <picture
              key={slide.src}
              className={`cc-hero-slide ${i === idx ? "is-active" : ""}`}
            >
              {slide.mobileSrc && (
                <source
                  srcSet={slide.mobileSrc}
                  media="(max-width: 768px)"
                  type="image/webp"
                />
              )}
              <img
                src={slide.src}
                alt=""
                width={slide.width}
                height={slide.height}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding={i === 0 ? "sync" : "async"}
              />
            </picture>
          ))}
          <div className="cc-hero-overlay" />
        </div>

        <div className="cc-hero-inner cc-hero-left">
          <div className="cc-hero-titleWrap">
            <h1 className="cc-hero-title">Colegio Colonial</h1>
            <p className="cc-hero-tag-1">
              Formación integral • Comunidad • Excelencia académica
            </p>

            <div
              className="cc-hero-actions"
              role="navigation"
              aria-label="Acciones principales"
            >
              {quick.map((b) => (
                <NavLink key={b.to} className="cc-btn cc-btnPrimary" to={b.to}>
                  {b.label}
                </NavLink>
              ))}
            </div>

            <div
              className="cc-hero-actions cc-hero-actions--secondary"
              role="navigation"
              aria-label="Explorar"
            >
              {explore.map((b) => (
                <NavLink key={b.to} className="cc-btn cc-btnGhost" to={b.to}>
                  {b.label}
                </NavLink>
              ))}
            </div>

           {/* <div className="cc-dots" aria-label="Cambiar imagen del carrusel">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`cc-dot ${i === idx ? "is-active" : ""}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>*/}
          </div>
        </div>
      </header>

      <div className="separator-blue" />

      <div>
        <DeferUntilVisible fallback={<div className="cc-intercolegiales-fallback" />}>
          <Suspense fallback={<div className="cc-intercolegiales-fallback" />}>
            <IntercolegialesVideoHero
              title="Intercolegiales 2026"
              subtitle="Invitamos a los colegios de la Orden del Verbo Encarnado y del Santísimo Sacramento a disputar torneos deportivos y vivir una experiencia de unidad, respeto y convivencia."
              youtubeId="VNn2FhvNGTI"
              start={44}
              ctaHref="/intercolegiales/inscripcion"
              logoSrc="/images/logo-escudo.webp"
              logoAlt="Escudo ING"
            />
          </Suspense>
        </DeferUntilVisible>
      </div>

      {/* =========================
          SECCIÓN: “Manifiesto”
      ========================== */}
      <section className="cc-band cc-bandRed" aria-label="Manifiesto">
        <div className="cc-wrap">
          <div className="cc-bandGrid">
            <div>
              <h2 className="cc-h2">Nuestro compromiso</h2>
              <p className="cc-p">
                Educación con estructura, corazón y propósito. Un ambiente
                seguro, exigente y humano.
              </p>
            </div>

            <div className="cc-metrics">
              <div className="cc-metric">
                <span className="cc-metricNum">01</span>
                <span className="cc-metricTxt">Acompañamiento</span>
              </div>
              <div className="cc-metric">
                <span className="cc-metricNum">02</span>
                <span className="cc-metricTxt">Excelencia</span>
              </div>
              <div className="cc-metric">
                <span className="cc-metricNum">03</span>
                <span className="cc-metricTxt">Comunidad</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="separator-blue" />

      {/* =========================
          SECCIÓN: Cards creativas
      ========================== */}
      <section className="cc-section" aria-label="Secciones principales">
        <div className="cc-wrap">
          <div className="cc-cardGrid">
            <article className="cc-feature">
              <div className="cc-featureText">
                <div className="cc-featureHead">
                  <span className="cc-kicker">Oferta educativa</span>
                  <h3>Primaria</h3>
                </div>
                <p>
                  Bases académicas sólidas, hábitos de estudio y formación en
                  valores.
                </p>
                <NavLink className="cc-link" to="/niveles/primaria">
                  Ver Primaria →
                </NavLink>
              </div>

              <div className="cc-featureMedia" aria-hidden="true">
                <img
                  src="/images/inicio/primaria-card.webp"
                  alt=""
                  width="2048"
                  height="1536"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>

            <article className="cc-feature">
              <div className="cc-featureText">
                <div className="cc-featureHead">
                  <span className="cc-kicker">Oferta educativa</span>
                  <h3>Secundaria</h3>
                </div>
                <p>
                  Disciplina, pensamiento crítico y crecimiento integral con
                  acompañamiento.
                </p>
                <NavLink className="cc-link" to="/niveles/secundaria">
                  Ver Secundaria →
                </NavLink>
              </div>

              <div className="cc-featureMedia" aria-hidden="true">
                <img
                  src="/images/inicio/secundaria-card.webp"
                  alt=""
                  width="1536"
                  height="2048"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>

            <article className="cc-feature">
              <div className="cc-featureText">
                <div className="cc-featureHead">
                  <span className="cc-kicker">Vida escolar</span>
                  <h3>Calendario</h3>
                </div>
                <p>Fechas importantes, eventos y actividades. Todo en un solo lugar.</p>
                <NavLink className="cc-link" to="/calendario">
                  Abrir Calendario →
                </NavLink>

                <div className="cc-miniGrid">
                  <div className="cc-mini">
                    <span className="cc-miniDate">13 ABRIL</span>
                    <span className="cc-miniText">
                    Celebración de Pascua
                    </span>
                  </div>

                  <div className="cc-mini">
                    <span className="cc-miniDate">13 ABRIL</span>
                    <span className="cc-miniText">Regreso a clases</span>
                  </div>

                  <div className="cc-mini">
                    <span className="cc-miniDate">24 ABRIL</span>
                    <span className="cc-miniText">Honores al V.E. (1° Secundaria y 2° Primaria)</span>
                  </div>

                  <div className="cc-mini">
                    <span className="cc-miniDate">30 ABRIL</span>
                    <span className="cc-miniText">Día del Niño</span>
                  </div>
                </div>
              </div>
            </article>

            <article className="cc-feature">
              <div className="cc-featureText">
                <div className="cc-featureHead">
                  <span className="cc-kicker">Comunidad</span>
                  <h3>Otros campus</h3>
                </div>
                <p>
                  Conoce nuestras sedes y encuentra la mejor opción para tu
                  familia.
                </p>
                <NavLink className="cc-link" to="/conocenos/otros-campus">
                  Ver otros campus →
                </NavLink>

                <div className="cc-campusStats" aria-label="Presencia internacional">
                  <div className="cc-stat">
                    <span className="cc-statNum">87</span>
                    <span className="cc-statLabel">Presencias</span>
                    <span className="cc-statHint">de la Orden</span>
                  </div>

                  <div className="cc-stat">
                    <span className="cc-statNum">12</span>
                    <span className="cc-statLabel">Países</span>
                    <span className="cc-statHint">presencia educativa</span>
                  </div>

                  <div className="cc-stat cc-stat--map">
                    <span className="cc-mapTitle">Alcance</span>
                    <div className="cc-mapDots" aria-hidden="true">
                      <span className="cc-dotMap" />
                      <span className="cc-dotMap" />
                      <span className="cc-dotMap" />
                      <span className="cc-dotMap" />
                      <span className="cc-dotMap" />
                    </div>
                    <span className="cc-mapHint">Comunidad internacional</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================
          SECCIÓN: Citas + Video
      ========================== */}
      <section className="cc-split" aria-label="Citas y video">
        <div className="cc-wrap cc-splitGrid">
          <article className="cc-panel cc-panelQuotes">
            <h3 className="cc-panelTitle">Jeanne Chézard de Matel</h3>
            <p className="cc-panelSub">
              Tres frases que inspiran nuestro modo de formar.
            </p>

            <div className="cc-quoteList">
              <figure className="cc-quote">
                <blockquote>
                  "Alabado sea el Verbo Encarnado en el Santísimo Sacramento"
                </blockquote>
                <figcaption>— Jeanne Chézard de Matel</figcaption>
              </figure>

              <figure className="cc-quote">
                <blockquote>
                  “Mi único deseo es pertenecer totalmente al Verbo Encarnado."
                </blockquote>
                <figcaption>— Jeanne Chézard de Matel</figcaption>
              </figure>

              <figure className="cc-quote">
                <blockquote>
                  "Deseo que mi vida entera sea un acto de amor al Verbo Encarnado."
                </blockquote>
                <figcaption>— Jeanne Chézard de Matel</figcaption>
              </figure>

              <figure className="cc-quote">
                <blockquote>
                  "No puedo desear otra cosa que cumplir en todo la voluntad de Dios."
                </blockquote>
                <figcaption>— Jeanne Chézard de Matel</figcaption>
              </figure>
            </div>
          </article>

          <article className="cc-panel cc-panelVideo">
            <h3 className="cc-panelTitle-1">Nuestras Instalaciones.</h3>
            <p className="cc-panelSub">Una vista de nuestras maravillosas instalaciones.</p>

            <div className="cc-videoFrame" aria-label="Video de YouTube">
              <iframe
                src="https://www.youtube.com/embed/Eg_MtjuNGtM"
                title="Video Colegio Colonial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="cc-videoActions">
              <NavLink className="cc-btn cc-btnBlue" to="/conocenos/modelo-educativo">
                Modelo educativo
              </NavLink>
              <NavLink className="cc-btn cc-btnOutline" to="/vida-colonial/galeria">
                Galería
              </NavLink>
            </div>
          </article>
        </div>
      </section>

      <div className="separator-red" />

      {/* =========================
          BANDA FINAL
      ========================== */}
      <section className="cc-band cc-bandBlue" aria-label="Explorar más">
        <div className="cc-wrap">
          <div className="cc-footerCTA">
            <div>
              <h3>Explora el Colegio Colonial</h3>
              <p>Accesos directos a secciones clave.</p>
            </div>

            <div className="cc-footerLinks">
              <NavLink className="cc-chip" to="/vida-colonial/galeria">
                Galería
              </NavLink>
              <NavLink className="cc-chip" to="/vida-colonial/eventos">
                Eventos
              </NavLink>
              <NavLink className="cc-chip" to="/contacto">
                Contacto
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
