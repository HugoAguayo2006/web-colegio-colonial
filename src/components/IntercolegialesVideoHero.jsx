import { useRef, useState, useEffect } from "react";
import "./IntercolegialesVideoHero.css";

export default function IntercolegialesVideoHero({
  title = "Intercolegiales 2026",
  subtitle = "Invitamos a los colegios de la Orden del Verbo Encarnado y del Santísimo Sacramento a vivir una jornada de competencia, convivencia y espíritu deportivo.",
  youtubeId = "VNn2FhvNGTI",
  start = 0,
  logoSrc = "/logo.svg",
  logoAlt = "Escudo",
}) {
  const forcedStart = Math.max(0, Number(start) || 0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [posterSrc, setPosterSrc] = useState(
    `https://i.ytimg.com/vi/${youtubeId}/sddefault.jpg`
  );
  const [cb] = useState(0);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?start=${forcedStart}&rel=0&modestbranding=1&playsinline=1&autoplay=1&mute=1&cb=${cb}`;
  const watchUrl = forcedStart
    ? `https://www.youtube.com/watch?v=${youtubeId}&t=${forcedStart}s`
    : `https://www.youtube.com/watch?v=${youtubeId}`;

  useEffect(() => {
    setPosterSrc(`https://i.ytimg.com/vi/${youtubeId}/sddefault.jpg`);
  }, [youtubeId]);

  /* =======================
     DATA CARRUSEL
  ======================= */

  const SPORTS = [
    { key: "all", label: "Todos" },
    { key: "ajedrez", label: "Ajedrez" },
    { key: "futbol", label: "Fútbol" },
    { key: "basquetbol", label: "Básquetbol" },
    { key: "voley", label: "Vóley" },
    { key: "atletismo", label: "Atletismo" },
    { key: "premiacion", label: "Premiación" },
    { key: "bienvenida", label: "Bienvenida" },
  ];

  const ITEMS = [
  { id: "w1", sport: "bienvenida", image: "/images/intercolegiales/bienvenida-1.webp" },

  { id: "f1", sport: "futbol", image: "/images/intercolegiales/futbol-1.webp" },
  { id: "f2", sport: "futbol", image: "/images/intercolegiales/futbol-2.webp" },
  { id: "f3", sport: "futbol", image: "/images/intercolegiales/futbol-3.webp" },
  { id: "f4", sport: "futbol", image: "/images/intercolegiales/futbol-4.webp" },
  { id: "f5", sport: "futbol", image: "/images/intercolegiales/futbol-5.webp" },
  { id: "f6", sport: "futbol", image: "/images/intercolegiales/futbol-6.webp" },
  { id: "f7", sport: "futbol", image: "/images/intercolegiales/futbol-7.webp" },
  { id: "f8", sport: "futbol", image: "/images/intercolegiales/futbol-8.webp" },
  { id: "f9", sport: "futbol", image: "/images/intercolegiales/futbol-9.webp" },

  { id: "b1", sport: "basquetbol", image: "/images/intercolegiales/basquet-1.webp" },
  { id: "b2", sport: "basquetbol", image: "/images/intercolegiales/basquet-02.webp" },
  { id: "b3", sport: "basquetbol", image: "/images/intercolegiales/basquet-03.webp" },
  { id: "b4", sport: "basquetbol", image: "/images/intercolegiales/basquet-04.webp" },
  { id: "b5", sport: "basquetbol", image: "/images/intercolegiales/basquet-05.webp" },
  { id: "b6", sport: "basquetbol", image: "/images/intercolegiales/basquet-06.webp" },
  { id: "b7", sport: "basquetbol", image: "/images/intercolegiales/basquet-07.webp" },

  { id: "v1", sport: "voley", image: "/images/intercolegiales/voley-1.webp" },
  { id: "v2", sport: "voley", image: "/images/intercolegiales/voley-2.webp" },
  { id: "v3", sport: "voley", image: "/images/intercolegiales/voley-3.webp" },
  { id: "v4", sport: "voley", image: "/images/intercolegiales/voley-04.webp" },
  { id: "v5", sport: "voley", image: "/images/intercolegiales/voley-05.webp" },

  { id: "a1", sport: "ajedrez", image: "/images/intercolegiales/ajedrez-1.webp" },
  { id: "a2", sport: "ajedrez", image: "/images/intercolegiales/ajedrez-2.webp" },
  { id: "a3", sport: "ajedrez", image: "/images/intercolegiales/ajedrez-3.webp" },

  { id: "at1", sport: "atletismo", image: "/images/intercolegiales/atletismo-01.webp" },
  { id: "at2", sport: "atletismo", image: "/images/intercolegiales/atletismo-02.webp" },
  { id: "at3", sport: "atletismo", image: "/images/intercolegiales/atletismo-03.webp" },

  { id: "p1", sport: "premiacion", image: "/images/intercolegiales/premiacion-1.webp" },
  { id: "p2", sport: "premiacion", image: "/images/intercolegiales/premiacion-02.webp" },
  { id: "p3", sport: "premiacion", image: "/images/intercolegiales/premiacion-03.webp" },
  { id: "p4", sport: "premiacion", image: "/images/intercolegiales/premiacion-04.webp" },
  { id: "p5", sport: "premiacion", image: "/images/intercolegiales/premiacion-05.webp" },
  { id: "p6", sport: "premiacion", image: "/images/intercolegiales/premiacion-06.webp" },
  { id: "p7", sport: "premiacion", image: "/images/intercolegiales/premiacion-07.webp" },
  { id: "p8", sport: "premiacion", image: "/images/intercolegiales/premiacion-08.webp" },
  { id: "p9", sport: "premiacion", image: "/images/intercolegiales/premiacion-09.webp" },
  { id: "p10", sport: "premiacion", image: "/images/intercolegiales/premiacion-10.webp" },
  { id: "p11", sport: "premiacion", image: "/images/intercolegiales/premiacion-11.webp" },
  { id: "p12", sport: "premiacion", image: "/images/intercolegiales/premiacion-12.webp" },
  { id: "p13", sport: "premiacion", image: "/images/intercolegiales/premiacion-13.webp" },
  { id: "p14", sport: "premiacion", image: "/images/intercolegiales/premiacion-14.webp" },
  { id: "p15", sport: "premiacion", image: "/images/intercolegiales/premiacion-15.webp" },
  { id: "p16", sport: "premiacion", image: "/images/intercolegiales/premiacion-16.webp" },
  { id: "p17", sport: "premiacion", image: "/images/intercolegiales/premiacion-17.webp" },
  { id: "p18", sport: "premiacion", image: "/images/intercolegiales/premiacion-18.webp" },
  { id: "p19", sport: "premiacion", image: "/images/intercolegiales/premiacion-19.webp" },
  { id: "p20", sport: "premiacion", image: "/images/intercolegiales/premiacion-20.webp" },
  { id: "p21", sport: "premiacion", image: "/images/intercolegiales/premiacion-21.webp" },
  { id: "p22", sport: "premiacion", image: "/images/intercolegiales/premiacion-22.webp" },
  { id: "p23", sport: "premiacion", image: "/images/intercolegiales/premiacion-23.webp" },
  { id: "p24", sport: "premiacion", image: "/images/intercolegiales/premiacion-24.webp" },
  { id: "p25", sport: "premiacion", image: "/images/intercolegiales/premiacion-25.webp" },
];


  const [activeSport, setActiveSport] = useState("all");
  const trackRef = useRef(null);

  const filtered =
    activeSport === "all" ? ITEMS : ITEMS.filter((it) => it.sport === activeSport);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const track = trackRef.current;
    if (!track) return;

    setCanScrollLeft(track.scrollLeft > 0);
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 5);
  };

  const scrollOne = (dir) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector(".inter-carousel__card");
    if (!firstCard) return;

    const computed = window.getComputedStyle(track);
    const gap = parseFloat(computed.columnGap || computed.gap || "0") || 0;

    const step = firstCard.getBoundingClientRect().width + gap;

    track.scrollBy({ left: dir * step, behavior: "smooth" });
    setTimeout(updateScrollState, 400);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0, behavior: "smooth" });
    setTimeout(updateScrollState, 200);
  }, [activeSport]);

  useEffect(() => {
    setTimeout(updateScrollState, 0);
  }, []);

const labelSport = (k) => {
  const labels = {
    ajedrez: "Ajedrez",
    futbol: "Fútbol",
    basquetbol: "Básquetbol",
    voley: "Vóley",
    atletismo: "Atletismo",
    premiacion: "Premiación",
    bienvenida: "Bienvenida",
    all: "Todos",
  };

  return labels[k] || "";
};

  return (
    <section className="inter-video">
      {/* ================= VIDEO HERO ================= */}
      <div className="inter-video__wrap">
        <header className="inter-video__head">
          <h2 className="inter-video__title">{title}</h2>

          {subtitle && <p className="inter-video__subtitle">{subtitle}</p>}

          <div className="inter-video__actions">
            <a
              className="inter-video__secondary"
              href={watchUrl}
              target="_blank"
              rel="noreferrer"
            >
              Abrir en YouTube
            </a>
          </div>
        </header>

        <div className="inter-video__frame">
          <div className="inter-video__ratio">
            {videoLoaded ? (
              <iframe
                key={`${youtubeId}-${forcedStart}`}
                className="inter-video__iframe"
                src={embedUrl}
                title={title}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                className="inter-video__poster"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setVideoLoaded(true);
                }}
                aria-label="Reproducir video de Intercolegiales 2026"
              >
                <img
                  className="inter-video__posterImg"
                  src={posterSrc}
                  alt=""
                  aria-hidden="true"
                  data-nozoom
                  loading="lazy"
                  decoding="async"
                  onError={() => {
                    setPosterSrc(`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`);
                  }}
                />
                <span className="inter-video__play" aria-hidden="true" />
                <span className="inter-video__posterText">Reproducir video</span>
              </button>
            )}
          </div>

          {logoSrc && (
            <div className="inter-video__logo">
              <img src={logoSrc} alt={logoAlt} width="1920" height="1080" loading="lazy" />
            </div>
          )}
        </div>
      </div>

      {/* ================= MEMORIA FOTOGRÁFICA ================= */}
      <div className="inter-carousel">
        <div className="inter-carousel__intro">
          <h2 className="inter-carousel__memoryTitle">Memoria Fotográfica</h2>
          <p className="inter-carousel__memorySubtitle">
            Revivamos los mejores momentos de los Intercolegiales 2026.
          </p>
        </div>

        <div className="inter-carousel__filters">
          {SPORTS.map((s) => (
            <button
              key={s.key}
              className={`inter-carousel__filter ${activeSport === s.key ? "active" : ""}`}
              onClick={() => setActiveSport(s.key)}
              type="button"
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="inter-carousel__wrap">
          <button
            className={`inter-carousel__arrow left ${!canScrollLeft ? "disabled" : ""}`}
            onClick={() => scrollOne(-1)}
            disabled={!canScrollLeft}
            type="button"
            aria-label="Anterior"
          >
            ‹
          </button>

          <div className="inter-carousel__track" ref={trackRef} onScroll={updateScrollState}>
            {filtered.map((item) => (
              <div className="inter-carousel__card" key={item.id}>
                <div className="inter-carousel__media">
                  <img
                    src={item.image}
                    alt={`Intercolegiales ${labelSport(item.sport)}`}
                    width="1200"
                    height="1600"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={`tag-${item.sport}`}>{labelSport(item.sport)}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            className={`inter-carousel__arrow right ${!canScrollRight ? "disabled" : ""}`}
            onClick={() => scrollOne(1)}
            disabled={!canScrollRight}
            type="button"
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
