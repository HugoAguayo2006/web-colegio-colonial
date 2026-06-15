// src/pages/Campus.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { CAMPUSES, FEATURED_CAMPUS_IDS } from "../../data/c-2";
import "./Campus.css";
import { GoogleMap, Marker, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import { Helmet } from "react-helmet-async";

const MAP_DEFAULT_CENTER = { lat: 20.63, lng: -103.42 };
const MAP_DEFAULT_ZOOM = 4;

function mapsLink(lat, lng) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
function waLink(whatsapp, text = "Hola, me gustaría recibir información sobre ustedes.") {
  const msg = encodeURIComponent(text);
  return `https://wa.me/${whatsapp}?text=${msg}`;
}

// ✅ Reporte de error del mapa (WhatsApp)
const MAP_REPORT_WA = "523310392675"; // +52 3310392675
const MAP_REPORT_TEXT = "Hay un error en el mapa de la pagina web del Colegio Colonial";

// ✅ helpers para coords
function toNum(v) {
  const n = typeof v === "string" ? parseFloat(v) : Number(v);
  return Number.isFinite(n) ? n : null;
}
function hasCoords(c) {
  const lat = toNum(c.lat);
  const lng = toNum(c.lng);
  return lat !== null && lng !== null;
}

/* =======================
   ✅ helpers para ocultar botones
======================= */
const PLACEHOLDER = "hugo aguayo";

function isBadValue(v) {
  if (v == null) return true;
  const s = String(v).trim();
  if (!s) return true;
  return s.toLowerCase().includes(PLACEHOLDER);
}

function firstValidSocialLink(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const found = arr.find((x) => !isBadValue(x));
  return found ? String(found).trim() : null;
}

function CampusActionButtons({ campus, onViewMap }) {
  const canWa = !isBadValue(campus.whatsapp);
  const canWeb = !isBadValue(campus.website);
  const canMaps = hasCoords(campus);
  const socialHref = firstValidSocialLink(campus.social_links);

  return (
    <div className="camp_actions">
      {canWa && (
        <a className="camp_btnMini camp_btnWhatsapp" href={waLink(campus.whatsapp)} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      )}

      {canMaps && (
        <a className="camp_btnMini" href={mapsLink(campus.lat, campus.lng)} target="_blank" rel="noreferrer">
          Google Maps
        </a>
      )}

      {canWeb && (
        <a className="camp_btnMini camp_btnWeb" href={campus.website} target="_blank" rel="noreferrer">
          Página web
        </a>
      )}

      {socialHref && (
        <a className="camp_btnMini" href={socialHref} target="_blank" rel="noreferrer">
          Redes sociales
        </a>
      )}

      {canMaps && (
        <button className="camp_btnMini camp_btnMap" type="button" onClick={() => onViewMap(campus)}>
          Ver en el mapa
        </button>
      )}
    </div>
  );
}

export default function Campus() {
  const { isLoaded } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapListenersRef = useRef([]);
  const mapRef = useRef(null);

  const [selected, setSelected] = useState(null);
  const [focusMode, setFocusMode] = useState(false);

  // ✅ Touch devices = móviles + iPads (coarse pointer) => tarjeta debajo del mapa
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 544px)");
    const onChange = () => setIsTouchDevice(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // filtros
  const [country, setCountry] = useState("Todos");
  const [stateFilter, setStateFilter] = useState("Todos"); // ✅ ahora aplica a TODOS los países

  // destacados (2)
  const featuredList = useMemo(() => {
    const ids = Array.isArray(FEATURED_CAMPUS_IDS) ? FEATURED_CAMPUS_IDS.slice(0, 2) : [];
    return ids.map((id) => CAMPUSES.find((c) => c.id === id)).filter(Boolean);
  }, []);

  // opciones de país
  const countries = useMemo(() => {
    const set = new Set(CAMPUSES.map((c) => c.country).filter(Boolean));
    return ["Todos", ...Array.from(set).sort((a, b) => a.localeCompare(b, "es"))];
  }, []);

  // ✅ estados / regiones según país seleccionado (o todos si país = Todos)
  const states = useMemo(() => {
    const base = country === "Todos" ? CAMPUSES : CAMPUSES.filter((c) => c.country === country);
    const set = new Set(base.map((c) => c.state).filter(Boolean));
    return ["Todos", ...Array.from(set).sort((a, b) => a.localeCompare(b, "es"))];
  }, [country]);

  // campus filtrados
  const filtered = useMemo(() => {
    return CAMPUSES.filter((c) => {
      if (country !== "Todos" && c.country !== country) return false;
      if (stateFilter !== "Todos" && c.state !== stateFilter) return false; // ✅ ahora siempre aplica
      return true;
    });
  }, [country, stateFilter]);

  // ✅ SOLO coords válidas
  const filteredWithCoords = useMemo(() => {
    return filtered
      .filter(hasCoords)
      .map((c) => ({
        ...c,
        lat: toNum(c.lat),
        lng: toNum(c.lng),
      }));
  }, [filtered]);

  const allWithCoords = useMemo(() => {
    return CAMPUSES.filter(hasCoords).map((c) => ({
      ...c,
      lat: toNum(c.lat),
      lng: toNum(c.lng),
    }));
  }, []);

  const fitTo = (list) => {
    if (!mapRef.current || !list?.length || !window.google?.maps) return;

    if (list.length === 1) {
      mapRef.current.panTo({ lat: list[0].lat, lng: list[0].lng });
      mapRef.current.setZoom(15);
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    list.forEach((c) => bounds.extend({ lat: c.lat, lng: c.lng }));
    mapRef.current.fitBounds(bounds);
  };

  const isOneColumnLayout = () => {
    const listEl = document.querySelector(".camp_list");
    const mapEl = document.querySelector(".camp_mapCard");
    if (!listEl || !mapEl) return false;

    const listRect = listEl.getBoundingClientRect();
    const mapRect = mapEl.getBoundingClientRect();

    // ✅ 1 columna = el mapa está claramente debajo de la lista
    return mapRect.top > listRect.top + 80;
  };

  const scrollToMapIfOneColumn = () => {
    if (!isOneColumnLayout()) return;

    const mapEl = document.querySelector(".camp_mapCard");
    if (!mapEl) return;

    const top = mapEl.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: top - 300, behavior: "smooth" });
  };

const resetMapView = () => {
  if (mapRef.current) {
    const streetView = mapRef.current.getStreetView?.();
    if (streetView?.getVisible()) {
      streetView.setVisible(false);
    }
  }

  setSelected(null);
  setFocusMode(false);

  const list = filteredWithCoords.length ? filteredWithCoords : allWithCoords;
  setTimeout(() => fitTo(list), 0);
};

  // ✅ Ver en el mapa
  const goTo = (campus) => {
    if (!mapRef.current) return;

    const lat = toNum(campus.lat);
    const lng = toNum(campus.lng);
    if (lat === null || lng === null) return;

    const fixed = { ...campus, lat, lng };
    setSelected(fixed);
    setFocusMode(true);

    mapRef.current.setZoom(15);
    mapRef.current.panTo({ lat, lng });

    scrollToMapIfOneColumn();
  };

  // ✅ si cambia país y el state seleccionado ya no existe en ese país => resetea state
  useEffect(() => {
    const base = country === "Todos" ? CAMPUSES : CAMPUSES.filter((c) => c.country === country);
    const set = new Set(base.map((c) => c.state).filter(Boolean));
    if (stateFilter !== "Todos" && !set.has(stateFilter)) setStateFilter("Todos");
  }, [country, stateFilter]);

  // al cambiar filtros: encuadra
useEffect(() => {
  if (!isLoaded) return;

  if (mapRef.current) {
    const streetView = mapRef.current.getStreetView?.();
    if (streetView?.getVisible()) {
      streetView.setVisible(false);
    }
  }

  setSelected(null);
  setFocusMode(false);

  if (filteredWithCoords.length) fitTo(filteredWithCoords);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [country, stateFilter, isLoaded, filteredWithCoords.length]);

  // al cargar: encuadra todos
  useEffect(() => {
    if (!isLoaded) return;
    const t = setTimeout(() => fitTo(allWithCoords), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, allWithCoords.length]);

  if (!isLoaded) return <div className="camp_skeleton">Cargando mapa…</div>;

  return (
    <main className="camp_page camp_pagePad">
      <Helmet>
        <html lang="es-MX" />
        <title>Otros Campus | Colegio Colonial Querétaro</title>
        <meta
          name="description"
          content="Conoce otros campus y colegios de la Orden del Verbo Encarnado y del Santísimo Sacramento: mapa interactivo, filtros por país y estado, datos de contacto y ubicación."
        />
        <link
          rel="canonical"
          href="https://www.colegiocolonial.edu.mx/conocenos/otros-campus"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Colegio Colonial" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:title" content="Otros Campus | Colegio Colonial Querétaro" />
        <meta
          property="og:description"
          content="Mapa interactivo de colegios en México y el mundo, con filtros por país y estado/región, ubicaciones, WhatsApp, web y redes sociales."
        />
        <meta
          property="og:url"
          content="https://www.colegiocolonial.edu.mx/conocenos/otros-campus"
        />
        <meta
          property="og:image"
          content="https://www.colegiocolonial.edu.mx/images/conocenos/img3.webp"
        />
        <meta
          property="og:image:alt"
          content="Otros campus y colegios vinculados al Colegio Colonial"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Otros Campus | Colegio Colonial Querétaro" />
        <meta
          name="twitter:description"
          content="Explora otros campus con mapa interactivo, filtros por país y estado/región, ubicación y contacto."
        />
        <meta
          name="twitter:image"
          content="https://www.colegiocolonial.edu.mx/images/conocenos/img3.webp"
        />
        <meta name="geo.region" content="MX-QUE" />
        <meta name="geo.placename" content="Querétaro, México" />
      </Helmet>
      <div className="camp_container">
        <header className="camp_head">
          <div className="camp_headInner">
            <h1 className="camp_title">Nuestros colegios en México y el mundo</h1>
            <p className="camp_subtitle">Filtra por país y por estado/región (para cualquier país).</p>
          </div>

          <div className="camp_filters camp_filtersWide">
            <label className="camp_label">
              País
              <select className="camp_select" value={country} onChange={(e) => setCountry(e.target.value)}>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="camp_label">
              Estado / Región
              <select className="camp_select" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <button
              className="camp_btn"
              type="button"
              onClick={() => {
                setCountry("Todos");
                setStateFilter("Todos");
                resetMapView();
              }}
            >
              Ver todos
            </button>
          </div>
        </header>

        {/* ===== 2 CAMPUS DESTACADOS ===== */}
        {featuredList.length > 0 && (
          <section className="camp_featured">
            <div className="camp_badge">Campus destacados</div>

            <div className="camp_featuredTwo">
              {featuredList.map((campus, idx) => (
                <article key={campus.id} className={`camp_featureCard ${idx === 0 ? "isPrimary" : ""}`}>
                  <div className="camp_featureTop">
                    <div className="camp_featureTag">{idx === 0 ? "Principal" : "Destacado"}</div>

                    <div className="camp_featuredName">{campus.name}</div>
                    <div className="camp_featuredMeta">
                      {campus.country}
                      {campus.state ? ` · ${campus.state}` : ""}
                      {campus.city ? ` · ${campus.city}` : ""}
                    </div>
                    <div className="camp_featuredAddr">{campus.address}</div>
                  </div>

                  <CampusActionButtons campus={campus} onViewMap={goTo} />
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ===== Lista + Mapa ===== */}
        <section className="camp_grid">
          <aside className="camp_list">
            <div className="camp_listHead">
              <div className="camp_listTitle">Resultados</div>
              <div className="camp_listCount">{filtered.length} resultados</div>
            </div>

            <div className="camp_cards">
              {filtered.map((c) => {
                const canWa = !isBadValue(c.whatsapp);
                const canWeb = !isBadValue(c.website);
                const canMaps = hasCoords(c);
                const socialHref = firstValidSocialLink(c.social_links);

                return (
                  <article key={c.id} className={`camp_card ${FEATURED_CAMPUS_IDS?.includes?.(c.id) ? "isFeatured" : ""}`}>
                    <div className="camp_cardName">{c.name}</div>
                    <div className="camp_cardMeta">
                      {c.country}
                      {c.state ? ` · ${c.state}` : ""}
                      {c.city ? ` · ${c.city}` : ""}
                    </div>
                    <div className="camp_cardAddr">{c.address}</div>

                    {Array.isArray(c.niveles) && c.niveles.length > 0 && (
                      <div className="camp_cardNiveles">
                        {c.niveles.map((nivel, index) => (
                          <span key={index} className="camp_nivelTag">
                            {nivel}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="camp_cardBtns">
                      {canWa && (
                        <a className="camp_btnMini camp_btnWhatsapp" href={waLink(c.whatsapp)} target="_blank" rel="noreferrer">
                          WhatsApp
                        </a>
                      )}
                      {canMaps && (
                        <a className="camp_btnMini" href={mapsLink(c.lat, c.lng)} target="_blank" rel="noreferrer">
                          Maps
                        </a>
                      )}
                      {canWeb && (
                        <a className="camp_btnMini camp_btnWeb" href={c.website} target="_blank" rel="noreferrer">
                          Web
                        </a>
                      )}
                      {socialHref && (
                        <a className="camp_btnMini" href={socialHref} target="_blank" rel="noreferrer">
                          Redes sociales
                        </a>
                      )}
                      {canMaps && (
                        <button className="camp_btnMini camp_btnMap" type="button" onClick={() => goTo(c)}>
                          Ver en el mapa
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </aside>

          {/* ✅ Mapa */}
          <div className="camp_mapCard" data-nozoom>
            <button
              type="button"
              className={`camp_mapResetBtn ${selected || focusMode ? "isVisible" : ""}`}
              onClick={resetMapView}
              aria-label="Regresar al mapa original"
            >
              Ver todos
            </button>

            <GoogleMap
              mapContainerClassName="camp_map"
              center={MAP_DEFAULT_CENTER}
              zoom={MAP_DEFAULT_ZOOM}
onLoad={(map) => {
  mapRef.current = map;

  const streetView = map.getStreetView?.();
  if (streetView?.getVisible()) {
    streetView.setVisible(false);
  }

  mapListenersRef.current.forEach((l) => l.remove?.());
  mapListenersRef.current = [];

  const lockNorth = () => {
    if (map.getHeading?.() !== 0) map.setHeading?.(0);
    if (map.getTilt?.() !== 0) map.setTilt?.(0);
  };

  map.setOptions({ heading: 0, tilt: 0, rotateControl: false });
  lockNorth();

  mapListenersRef.current.push(map.addListener("heading_changed", lockNorth));
  mapListenersRef.current.push(map.addListener("tilt_changed", lockNorth));
  mapListenersRef.current.push(map.addListener("idle", lockNorth));

  setTimeout(() => (filteredWithCoords.length ? fitTo(filteredWithCoords) : fitTo(allWithCoords)), 250);
}}
              onUnmount={(map) => {
                mapListenersRef.current.forEach((l) => l.remove?.());
                mapListenersRef.current = [];

                if (window.google?.maps?.event) {
                  window.google.maps.event.clearInstanceListeners(map);
                }

                mapRef.current = null;

                const el = document.querySelector(".camp_map");
                if (el) el.innerHTML = "";
              }}
              options={{
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: true,
                fullscreenControl: true,
                rotateControl: true,
                keyboardShortcuts: true,
                gestureHandling: "cooperative",
                tilt: 0,
                heading: 0,
              }}
            >
              {filteredWithCoords.map((c) => (
                <Marker
                  key={c.id}
                  position={{ lat: c.lat, lng: c.lng }}
                  onClick={() => {
                    setSelected(c);
                    setFocusMode(false);
                    scrollToMapIfOneColumn();
                  }}
                />
              ))}

              {/* ✅ SOLO DESKTOP: tarjeta en el mapa */}
              {selected && !isTouchDevice && (
                <OverlayView
                  position={{ lat: selected.lat, lng: selected.lng }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  getPixelPositionOffset={(width, height) => ({
                    x: -(width / 2),
                    y: -(height + (focusMode ? 18 : 10)),
                  })}
                >
                  <div className={`camp_iwShift ${focusMode ? "isFocus" : ""}`}>
                    <div className={`camp_iwCard ${focusMode ? "isFocus" : ""}`}>
                      <div className="camp_iwHeader">
                        <h4 className="camp_iwTitle">{selected.name}</h4>
                        <button
                          className="camp_iwClose"
                          type="button"
                          onClick={() => {
                            setSelected(null);
                            setFocusMode(false);
                          }}
                          aria-label="Cerrar"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="camp_iwMeta">
                        {selected.country}
                        {selected.state ? ` · ${selected.state}` : ""}
                        {selected.city ? ` · ${selected.city}` : ""}
                      </div>

                      <div className="camp_iwAddress">{selected.address}</div>

                      {Array.isArray(selected.niveles) && selected.niveles.length > 0 && (
                        <div className="camp_iwNiveles">
                          {selected.niveles.map((nivel, i) => (
                            <span key={i} className="camp_nivelTag">
                              {nivel}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="camp_iwButtons">
                        {!isBadValue(selected.whatsapp) && (
                          <a href={waLink(selected.whatsapp)} target="_blank" rel="noreferrer">
                            WhatsApp
                          </a>
                        )}
                        {hasCoords(selected) && (
                          <a href={mapsLink(selected.lat, selected.lng)} target="_blank" rel="noreferrer">
                            Maps
                          </a>
                        )}
                        {!isBadValue(selected.website) && (
                          <a href={selected.website} target="_blank" rel="noreferrer">
                            Web
                          </a>
                        )}
                        </div>
                      <div className="camp_iwButtons-1">
                        {firstValidSocialLink(selected.social_links) && (
                          <a href={firstValidSocialLink(selected.social_links)} target="_blank" rel="noreferrer">
                            Redes sociales
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </OverlayView>
              )}
            </GoogleMap>

          </div>

{/* ✅ Botón de reporte debajo del mapa */}
<a
  className="camp_mapReportBtn-1"
  href={waLink(MAP_REPORT_WA, MAP_REPORT_TEXT)}
  target="_blank"
  rel="noreferrer"
>
¿Hay algún problema con la información mostrada en el mapa? Presiona aquí.
</a>


          {/* ✅ MÓVIL + iPad: tarjeta DEBAJO del mapa */}
          {selected && isTouchDevice && (
            <div className="camp_belowCard">
              <div className="camp_iwCard isFocus">
                <div className="camp_iwHeader">
                  <h4 className="camp_iwTitle">{selected.name}</h4>
                  <button
                    className="camp_iwClose"
                    type="button"
                    onClick={() => {
                      setSelected(null);
                      setFocusMode(false);
                    }}
                    aria-label="Cerrar"
                  >
                    ✕
                  </button>
                </div>

                <div className="camp_iwMeta">
                  {selected.country}
                  {selected.state ? ` · ${selected.state}` : ""}
                  {selected.city ? ` · ${selected.city}` : ""}
                </div>

                <div className="camp_iwAddress">{selected.address}</div>

                {Array.isArray(selected.niveles) && selected.niveles.length > 0 && (
                  <div className="camp_iwNiveles">
                    {selected.niveles.map((nivel, i) => (
                      <span key={i} className="camp_nivelTag">
                        {nivel}
                      </span>
                    ))}
                  </div>
                )}

                <div className="camp_iwButtons">
                  {!isBadValue(selected.whatsapp) && (
                    <a href={waLink(selected.whatsapp)} target="_blank" rel="noreferrer">
                      WhatsApp
                    </a>
                  )}
                  {hasCoords(selected) && (
                    <a href={mapsLink(selected.lat, selected.lng)} target="_blank" rel="noreferrer">
                      Maps
                    </a>
                  )}
                  {!isBadValue(selected.website) && (
                    <a href={selected.website} target="_blank" rel="noreferrer">
                      Web
                    </a>
                  )}
                  {firstValidSocialLink(selected.social_links) && (
                    <a href={firstValidSocialLink(selected.social_links)} target="_blank" rel="noreferrer">
                      Redes sociales
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ✅ Botón de reporte SOLO móvil y debajo de la tarjeta */}
{isTouchDevice && (
  <div className="camp_mobileReportWrap">
    <a
      className="camp_mapReportBtn"
      href={waLink(MAP_REPORT_WA, MAP_REPORT_TEXT)}
      target="_blank"
      rel="noreferrer"
    >
      Hay un problema con la información mostrada en el mapa, presiona aquí

    </a>
  </div>
)}
        </section>
      </div>
    </main>
  );
}
