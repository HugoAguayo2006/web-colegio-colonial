// /src/pages/Calendario.jsx
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Calendario.css";
import { EVENTS } from "../data/events";

const LEVELS = [
  { key: "primaria", label: "Primaria" },
  { key: "secundaria", label: "Secundaria" },
];

const LEVEL_COLOR_VAR = {
  all: "var(--cc-green)",
  preescolar: "var(--cc-blueSoft)",
  primaria: "var(--cc-blue)",
  secundaria: "var(--cc-red)",
  preparatoria: "var(--cc-redSoft)",
};

/* ============================
   HELPERS (ISO + Grid)
============================ */
function pad2(n) {
  return String(n).padStart(2, "0");
}
function toISODate(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function parseISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setHours(0, 0, 0, 0);
  return dt;
}
function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function startOfMonth(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), 1);
  x.setHours(0, 0, 0, 0);
  return x;
}
function endOfMonth(d) {
  const x = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addMonths(d, delta) {
  const x = new Date(d.getFullYear(), d.getMonth() + delta, 1);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(d, delta) {
  const x = new Date(d);
  x.setDate(x.getDate() + delta);
  return x;
}
function monthLabel(d) {
  const text = d.toLocaleString("es-MX", { month: "long", year: "numeric" });
  return text.charAt(0).toUpperCase() + text.slice(1);
}
function dayLabelShort(i) {
  return ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"][i];
}

// Construye matriz (semanas) del mes visible (inicia domingo) + preview mes anterior/siguiente
function buildMonthGrid(visibleMonth) {
  const first = startOfMonth(visibleMonth);
  const last = endOfMonth(visibleMonth);

  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - first.getDay());
  gridStart.setHours(0, 0, 0, 0);

  const gridEnd = new Date(last);
  gridEnd.setDate(last.getDate() + (6 - last.getDay()));
  gridEnd.setHours(0, 0, 0, 0);

  const weeks = [];
  let cursor = new Date(gridStart);

  while (cursor <= gridEnd) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

// Normaliza level para evitar bugs (Primaria vs primaria, espacios, etc.)
function normalizeLevel(v) {
  return String(v ?? "").trim().toLowerCase();
}

// Fecha bonita para panel derecho
function formatDayLong(dateObj) {
  return dateObj.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatDateRange(start, end) {
  const startLabel = start.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
  });
  if (isSameDay(start, end)) return startLabel;

  const endLabel = end.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
  });
  return `${startLabel}–${endLabel}`;
}

function getLevelLabel(levelKey, fallback = "") {
  if (levelKey === "all") return "Todos";
  return LEVELS.find((x) => x.key === levelKey)?.label || fallback;
}

export default function Calendario() {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  // Filtros
  const [levelFilter, setLevelFilter] = useState("all"); // "all" | LEVELS.key
  const [when, setWhen] = useState("upcoming"); // "upcoming" | "past" | "all"
  const [query, setQuery] = useState("");

  // Calendar state
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));
  const [selectedDay, setSelectedDay] = useState(() => today);
  const selectedISO = toISODate(selectedDay);

  // Grid mensual con preview
  const monthGrid = useMemo(() => buildMonthGrid(visibleMonth), [visibleMonth]);

  // Normaliza eventos a ISO (SIEMPRE YYYY-MM-DD), level normalizado, etc.
  const normalizedEvents = useMemo(() => {
    return (EVENTS || [])
      .map((e) => {
        const d = parseISO(e.date);
        const endDate = parseISO(e.endDate || e.date);
        const isoFixed = toISODate(d);

        return {
          ...e,
          _iso: isoFixed,
          _dateObj: d,
          _endDateObj: endDate,
          _endISO: toISODate(endDate),
          _timeLabel: e.start ? `${e.start}${e.end ? `–${e.end}` : ""}` : "",
          _levelKey: normalizeLevel(e.level),
        };
      })
      .sort((a, b) => a._dateObj - b._dateObj);
  }, []);

  // Filtrado + búsqueda
  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    const todayISO = toISODate(today);

    return normalizedEvents.filter((ev) => {
      // ✅ CORREGIDO: si el filtro no es "all", solo pasa el nivel exacto
      if (levelFilter !== "all" && ev._levelKey !== levelFilter) {
        return false;
      }

      if (when !== "all") {
        const hasUpcomingDays = ev._endISO >= todayISO;
        const hasPastDays = ev._iso < todayISO;
        if (when === "upcoming" && !hasUpcomingDays) return false;
        if (when === "past" && !hasPastDays) return false;
      }

      if (!q) return true;

      const hay = `${ev.title} ${ev.location || ""} ${ev.description || ""} ${
        ev.level || ""
      }`.toLowerCase();

      return hay.includes(q);
    });
  }, [normalizedEvents, levelFilter, when, query, today]);

  // dayISO -> eventos
  const eventsByISO = useMemo(() => {
    const map = new Map();
    for (const week of monthGrid) {
      for (const d of week) map.set(toISODate(d), []);
    }
    for (const ev of filteredEvents) {
      for (let day = ev._dateObj; day <= ev._endDateObj; day = addDays(day, 1)) {
        if (ev.weekdaysOnly && [0, 6].includes(day.getDay())) continue;
        const iso = toISODate(day);
        const todayISO = toISODate(today);
        if (when === "upcoming" && iso < todayISO) continue;
        if (when === "past" && iso >= todayISO) continue;
        if (!map.has(iso)) map.set(iso, []);
        map.get(iso).push(ev);
      }
    }
    for (const [k, arr] of map) {
      arr.sort((a, b) => (a.start || "").localeCompare(b.start || ""));
      map.set(k, arr);
    }
    return map;
  }, [filteredEvents, monthGrid, when, today]);

  // Dots: dayISO => tiene eventos
  const dayHasEvents = useMemo(() => {
    const map = new Map();
    for (const [iso, arr] of eventsByISO) map.set(iso, (arr || []).length > 0);
    return map;
  }, [eventsByISO]);

  // Eventos del día seleccionado
  const eventsForSelectedDay = useMemo(() => {
    return eventsByISO.get(selectedISO) || [];
  }, [eventsByISO, selectedISO]);

  const panelTitle =
    when === "upcoming"
      ? "Próximos eventos"
      : when === "past"
      ? "Eventos pasados"
      : "Todos los eventos";

  function jumpToday() {
    setVisibleMonth(startOfMonth(today));
    setSelectedDay(today);
  }

  const monthMeta = useMemo(() => {
    const monthISO = `${visibleMonth.getFullYear()}-${pad2(
      visibleMonth.getMonth() + 1
    )}`;
    const total = filteredEvents.filter(
      (e) => e._iso <= `${monthISO}-31` && e._endISO >= `${monthISO}-01`
    ).length;
    return total;
  }, [visibleMonth, filteredEvents]);

  return (
    <main className="cccal">
      <Helmet>
        <html lang="es-MX" />
        <title>Calendario Escolar Interactivo | Colegio Colonial Querétaro</title>
        <meta
          name="description"
          content="Consulta el calendario escolar interactivo del Colegio Colonial en Querétaro: fechas importantes, días festivos, reuniones, evaluaciones, eventos, actividades pastorales y filtros por niveles escolares."
        />
        <link rel="canonical" href="https://www.colegiocolonial.edu.mx/calendario" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Colegio Colonial" />
        <meta property="og:locale" content="es_MX" />
        <meta
          property="og:title"
          content="Calendario Escolar Interactivo | Colegio Colonial Querétaro"
        />
        <meta
          property="og:description"
          content="Mantente informado con fechas importantes, evaluaciones, eventos especiales y actividades pastorales; filtra por primaria y secundaria."
        />
        <meta
          property="og:url"
          content="https://www.colegiocolonial.edu.mx/calendario"
        />
        <meta
          property="og:image"
          content="https://www.colegiocolonial.edu.mx/images/galeria/navidad-04.webp"
        />
        <meta
          property="og:image:alt"
          content="Calendario escolar interactivo del Colegio Colonial en Querétaro"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Calendario Escolar Interactivo | Colegio Colonial Querétaro"
        />
        <meta
          name="twitter:description"
          content="Consulta fechas escolares, eventos y actividades pastorales del Colegio Colonial, con filtros interactivos por niveles escolares."
        />
        <meta
          name="twitter:image"
          content="https://www.colegiocolonial.edu.mx/images/galeria/navidad-04.webp"
        />
        <meta name="geo.region" content="MX-QUE" />
        <meta name="geo.placename" content="Querétaro, México" />
      </Helmet>

      <header className="cccal__header">
        <div className="cccal__titleWrap">
          <div className="cccal__kickerRow">
            <span className="cccal__badge">Calendario</span>
            <span className="cccal__miniStat" title="Día actual">
              <span className="cccal__miniDot" />
              Hoy:{" "}
              {today.toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
              })}
            </span>
          </div>

          <a
            href="../calendar/calendario.ics"
            className="calendar-btn"
            aria-label="Agregar evento al calendario"
          >
            Agregar al calendario de tu celular <span>(Solo Apple)</span>
          </a>

          <h1 className="cccal__title">Calendario Escolar</h1>
          <p className="cccal__subtitle">
            Filtra por nivel educativo, busca eventos y revisa próximos o pasados.
          </p>
        </div>

        <div className="cccal__topActions">
          <button className="cccal__today" onClick={jumpToday} type="button">
            Hoy
          </button>
        </div>
      </header>

      <section className="cccal__filters">
        <div className="cccal__search">
          <label className="cccal__label">Buscar</label>
          <input
            className="cccal__input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej. junta, feria, robótica, auditorio…"
          />
        </div>

        <div className="cccal__when">
          <label className="cccal__label">Mostrar</label>
          <div className="cccal__chips">
            <button
              className={`ccchip ${when === "upcoming" ? "is-on" : ""}`}
              onClick={() => setWhen("upcoming")}
              type="button"
            >
              Próximos
            </button>
            <button
              className={`ccchip ${when === "past" ? "is-on" : ""}`}
              onClick={() => setWhen("past")}
              type="button"
            >
              Pasados
            </button>
            <button
              className={`ccchip ${when === "all" ? "is-on" : ""}`}
              onClick={() => setWhen("all")}
              type="button"
            >
              Todos
            </button>
          </div>
        </div>

        <div className="cccal__levels">
          <label className="cccal__label">Nivel</label>
          <div className="cccal__chips">
            <button
              className={`ccchip ccchip--level ${
                levelFilter === "all" ? "is-on" : ""
              }`}
              onClick={() => setLevelFilter("all")}
              type="button"
            >
              <span
                className="ccdot"
                style={{ background: "var(--cc-green)" }}
              />
              Todos
            </button>

            {LEVELS.map((l) => (
              <button
                key={l.key}
                className={`ccchip ccchip--level ${
                  levelFilter === l.key ? "is-on" : ""
                }`}
                onClick={() => setLevelFilter(l.key)}
                type="button"
              >
                <span
                  className="ccdot"
                  style={{ background: LEVEL_COLOR_VAR[l.key] }}
                />
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="cccal__legend">
          <div className="legend__row">
            <span className="legend__item">
              <span
                className="ccdot ccdot--lg"
                style={{ background: LEVEL_COLOR_VAR.all }}
              />
              Todos
            </span>

            {LEVELS.map((l) => (
              <span key={l.key} className="legend__item">
                <span
                  className="ccdot ccdot--lg"
                  style={{ background: LEVEL_COLOR_VAR[l.key] }}
                />
                {l.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="cccal__layout">
        <div className="cccal__cal">
          <div className="cccal__calTop">
            <div className="monthNav">
              <button
                className="iconBtn"
                onClick={() => setVisibleMonth((m) => addMonths(m, -1))}
                type="button"
                aria-label="Mes anterior"
              >
                ‹
              </button>

              <div className="monthNav__label">{monthLabel(visibleMonth)}</div>

              <button
                className="iconBtn"
                onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
                type="button"
                aria-label="Mes siguiente"
              >
                ›
              </button>
            </div>

            <div className="cccal__hint">
              Selecciona un día para ver detalles · {monthMeta} evento(s) este mes
            </div>
          </div>

          <div className="dow">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="dow__cell">
                {dayLabelShort(i)}
              </div>
            ))}
          </div>

          <div className="grid" role="grid" aria-label="Calendario mensual">
            {monthGrid.map((week, wi) =>
              week.map((d) => {
                const iso = toISODate(d);
                const inMonth = d.getMonth() === visibleMonth.getMonth();
                const isToday = isSameDay(d, today);
                const isSelected = isSameDay(d, selectedDay);

                const isPast = d < today;
                const dimPast = when === "upcoming" && isPast;

                const has = dayHasEvents.get(iso);
                const dayEvents = eventsByISO.get(iso) || [];

                return (
                  <button
                    key={`${wi}-${iso}`}
                    className={[
                      "cell",
                      inMonth ? "in-month" : "out-month",
                      isToday ? "is-today" : "",
                      isSelected ? "is-active" : "",
                      dimPast ? "is-past" : "",
                      has ? "has-events" : "",
                    ].join(" ")}
                    type="button"
                    onClick={() => {
                      if (dimPast) return;
                      setSelectedDay(d);
                    }}
                    role="gridcell"
                    aria-label={`Día ${d.getDate()}${has ? ", con eventos" : ""}`}
                    title={
                      has
                        ? dayEvents.map((e) => e.title).slice(0, 3).join(" · ")
                        : "Sin eventos"
                    }
                  >
                    <div className="cell__top">
                      <span className="cell__num">{d.getDate()}</span>
                      {has ? (
                        <span className="cell__count">{dayEvents.length}</span>
                      ) : null}
                    </div>

                    <div className="cell__dots">
                      {dayEvents.slice(0, 4).map((e) => (
                        <span
                          key={e.id}
                          className="miniDot"
                          title={`${e.title} (${getLevelLabel(e._levelKey, e.level)})`}
                          style={{
                            background:
                              LEVEL_COLOR_VAR[normalizeLevel(e.level)] ||
                              "var(--cc-blueDeep)",
                          }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <aside className="cccal__side">
          <div className="side__top">
            <div className="side__date">{formatDayLong(selectedDay)}</div>
            <div className="side__meta">
              {eventsForSelectedDay.length === 0
                ? "Sin eventos con los filtros actuales"
                : `${eventsForSelectedDay.length} evento(s)`}
            </div>
          </div>

          <div className="side__list" style={{ marginTop: 12 }}>
            {eventsForSelectedDay.length ? (
              eventsForSelectedDay.map((e) => (
                <article key={e.id} className="eventCard">
                  <div
                    className="eventCard__bar"
                    style={{
                      background:
                        LEVEL_COLOR_VAR[e._levelKey] || "var(--cc-blueDeep)",
                    }}
                  />
                  <div className="eventCard__body">
                    <div className="eventCard__top">
                      <h3 className="eventCard__title">{e.title}</h3>
                      {e._timeLabel ? (
                        <span className="eventCard__time">{e._timeLabel}</span>
                      ) : null}
                    </div>

                    <div className="eventCard__tags">
                      <span className="tag">
                        {getLevelLabel(e._levelKey, e.level)}
                      </span>
                      {e.location ? (
                        <span className="tag tag--ghost">{e.location}</span>
                      ) : null}
                    </div>

                    {e.description ? (
                      <p className="eventCard__desc">{e.description}</p>
                    ) : null}
                  </div>
                </article>
              ))
            ) : (
              <div className="empty">
                No hay eventos este día. Cambia el día o ajusta filtros.
              </div>
            )}
          </div>

          <div style={{ marginTop: 14 }}>
            <div className="side__meta" style={{ marginTop: 0 }}>
              {panelTitle} ({filteredEvents.length})
            </div>

            <div className="side__list side__list--rows">
              {filteredEvents.length === 0 ? (
                <div className="empty">No hay eventos con estos filtros.</div>
              ) : (
                filteredEvents.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    className="listRow listRow--btn"
                    onClick={() => {
                      const dd = e._dateObj;
                      setVisibleMonth(startOfMonth(dd));
                      setSelectedDay(dd);
                    }}
                    title="Ver en el calendario"
                  >
                    <div
                      className="listRow__left"
                      style={{
                        borderColor:
                          LEVEL_COLOR_VAR[e._levelKey] || "var(--cc-blueDeep)",
                      }}
                    >
                      <div className="listRow__date">
                        <span className="d1">
                          {formatDateRange(e._dateObj, e._endDateObj)}
                        </span>
                        <span className="d2">
                          {isSameDay(e._dateObj, e._endDateObj)
                            ? e._dateObj.toLocaleDateString("es-MX", {
                                weekday: "short",
                              })
                            : e.weekdaysOnly
                            ? "Lun–Vie"
                            : "Varios días"}
                        </span>
                      </div>
                    </div>

                    <div className="listRow__main">
                      <div className="listRow__top">
                        <h3 className="listRow__title">{e.title}</h3>
                        {e._timeLabel ? (
                          <span className="listRow__time">{e._timeLabel}</span>
                        ) : null}
                      </div>

                      <div className="listRow__meta">
                        <span
                          className="pill"
                          style={{
                            background:
                              LEVEL_COLOR_VAR[e._levelKey] || "var(--cc-blueDeep)",
                          }}
                        >
                          {getLevelLabel(e._levelKey, e.level)}
                        </span>
                        {e.location ? (
                          <span className="pill pill--ghost">{e.location}</span>
                        ) : null}
                      </div>

                      {e.description ? (
                        <p className="listRow__desc">{e.description}</p>
                      ) : null}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
