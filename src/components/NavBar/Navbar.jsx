 // src/components/Navbar/Navbar.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

// === Logo webp ===
const LOGO_SRC = "/images/logo-escudo.webp";

// === Links de redes (externos) ===
const SOCIAL = {
  facebook: "https://www.facebook.com/ColegioColonialOficial/",
  instagram: "https://www.instagram.com/",
  whatsapp:
    "https://wa.me/5214424317022?text=Hola%20Colegio%20Colonial%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n.",
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  const menu = useMemo(
    () => [
      { label: "Inicio", href: "/" },
      {
        label: "Conócenos",
        href: "/conocenos",
        children: [
          { label: "Modelo Educativo", href: "/conocenos/modelo-educativo" },
          { label: "Misión y visión", href: "/conocenos/mision-vision" },
          { label: "Valores", href: "/conocenos/valores" },
          { label: "Otros Campus", href: "/conocenos/otros-campus" },
          { label: "Clave de Centro de Trabajo", href: "/conocenos/clave-de-centro-de-trabajo" },
        ],
      },
      {
        label: "Niveles",
        href: "/niveles",
        children: [
          { label: "Primaria", href: "/niveles/primaria" },
          { label: "Secundaria", href: "/niveles/secundaria" },
        ],
      },
      {
        label: "Inscripciones",
        href: "/inscripciones",
        children: [
          {
            label: "Inscripciones Primaria",
            href: "/inscripciones/primaria",
          },
          {
            label: "Inscripciones Secundaria",
            href: "/inscripciones/secundaria",
          },
        ],
      },
      {
        label: "Vida Colonial",
        href: "/vida-colonial",
        children: [
          { label: "Extracurriculares", href: "/vida-colonial/extracurriculares" },
          { label: "Eventos", href: "/vida-colonial/eventos" },
          { label: "Galería", href: "/vida-colonial/galeria" },
          { label: "Otros Servicios", href: "/vida-colonial/otros-servicios" },
        ],
      },
      { label: "Calendario", href: "/calendario" },
      { label: "Contacto", href: "/contacto" },
    ],
    []
  );

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    }

    function onClickOutside(e) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const closeAll = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  // ====== NUEVO: abrir dropdown con hover/focus (desktop) ======
  const openOnHover = (id, hasChildren) => {
    if (!hasChildren) return;
    setOpenDropdown(id);
  };

  const closeOnLeave = (hasChildren) => {
    if (!hasChildren) return;
    setOpenDropdown(null);
  };

  const closeOnBlur = (e, hasChildren) => {
    if (!hasChildren) return;
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpenDropdown(null);
    }
  };

  // clases activas
  const navLinkClass = ({ isActive }) =>
    `ing-link${isActive ? " is-active" : ""}`;

  const mobileLinkClass = ({ isActive }) =>
    `ing-mobileLink${isActive ? " is-active" : ""}`;

  const ddLinkClass = ({ isActive }) =>
    `ing-ddLink${isActive ? " is-active" : ""}`;

  const mobileSubLinkClass = ({ isActive }) =>
    `ing-mobileSublink${isActive ? " is-active" : ""}`;

  return (
    <header className="ing-nav" ref={navRef}>
      {/* ====== FRANJA / BLOQUE AZUL ====== */}
      <div className="ing-topbar">
        <NavLink
          className="ing-brand"
          to="/"
          aria-label="Ir a Inicio"
          onClick={closeAll}
          end
        >
          <img
            className="ing-logo"
            src={LOGO_SRC}
            alt="Escudo Colegio Colonial"
            width="1920"
            height="1080"
            loading="eager"
            fetchPriority="high"
          />

          <h1 className="ing-title">
            <span className="ing-titleLines">
              Colegio <span className="ing-titleBreak" />
              Colonial <span className="ing-titleBreak" />
            </span>

            <span className="ing-titleInline">Colegio Colonial</span>
          </h1>
        </NavLink>

        {/* Redes (externo) + Hamburguesa */}
        <div className="ing-top-actions">
          <nav className="ing-social" aria-label="Redes sociales">
            <a
              className="ing-iconBtn"
              href={SOCIAL.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              title="Facebook"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/icons/facebook.webp"
                alt="Facebook Colegio Colonial"
                className="ing-iconImg"
                width="2047"
                height="2048"
                loading="lazy"
              />
            </a>

            {/*<a
              className="ing-iconBtn"
              href={SOCIAL.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/icons/instagram.webp"
                alt="Instagram Colegio Colonial"
                className="ing-iconImg"
                width="250"
                height="250"
                loading="lazy"
              />
            </a>*/}

            <a
              className="ing-iconBtn"
              href={SOCIAL.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/icons/WhatsApp.webp"
                alt="WhatsApp Colegio Colonial"
                className="ing-iconImg"
                width="2044"
                height="2048"
                loading="lazy"
              />
            </a>
          </nav>

          <button
            className="ing-burger"
            type="button"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((v) => !v);
              setOpenDropdown(null);
            }}
          >
            <BurgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* ====== FRANJA ROJA (DESKTOP) ====== */}
      <div className="ing-menubar" aria-label="Navegación principal">
        <nav className="ing-menu">
          <ul className="ing-menuList">
            {menu.map((item) => {
              const hasChildren = !!item.children?.length;
              const id = `dd-${item.label.replace(/\s+/g, "-").toLowerCase()}`;
              const isOpen = openDropdown === id;

              return (
                <li
                  key={item.label}
                  className={`ing-item ${hasChildren ? "has-children" : ""}`}
                  onMouseEnter={() => openOnHover(id, hasChildren)}
                  onMouseLeave={() => closeOnLeave(hasChildren)}
                  onFocusCapture={() => openOnHover(id, hasChildren)}
                  onBlurCapture={(e) => closeOnBlur(e, hasChildren)}
                >
                  <div className="ing-itemRow">
                    <NavLink
                      className={navLinkClass}
                      to={item.href}
                      onClick={closeAll}
                      end={item.href === "/"}
                    >
                      {item.label}
                    </NavLink>

                    {hasChildren && (
                      <button
                        type="button"
                        className="ing-ddBtn"
                        aria-label={`Abrir submenú de ${item.label}`}
                        aria-expanded={isOpen}
                        onClick={() => toggleDropdown(id)}
                      >
                        <ChevronDownIcon />
                      </button>
                    )}
                  </div>

                  {hasChildren && (
                    <ul className={`ing-dropdown ${isOpen ? "open" : ""}`}>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <NavLink
                            className={ddLinkClass}
                            to={c.href}
                            onClick={closeAll}
                          >
                            {c.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* ====== PANEL MÓVIL ====== */}
      <div className={`ing-mobilePanel ${mobileOpen ? "open" : ""}`}>
        <nav className="ing-mobileNav" aria-label="Menú móvil">
          <ul className="ing-mobileList">
            {menu.map((item) => {
              const hasChildren = !!item.children?.length;
              const id = `mdd-${item.label.replace(/\s+/g, "-").toLowerCase()}`;
              const isOpen = openDropdown === id;

              return (
                <li key={item.label} className="ing-mobileItem">
                  <div className="ing-mobileRow">
                    <NavLink
                      className={mobileLinkClass}
                      to={item.href}
                      onClick={closeAll}
                      end={item.href === "/"}
                    >
                      {item.label}
                    </NavLink>

                    {hasChildren && (
                      <button
                        type="button"
                        className="ing-mobileDdBtn"
                        aria-label={`Abrir submenú de ${item.label}`}
                        aria-expanded={isOpen}
                        onClick={() => toggleDropdown(id)}
                      >
                        <ChevronDownIcon />
                      </button>
                    )}
                  </div>

                  {hasChildren && (
                    <ul className={`ing-mobileDropdown ${isOpen ? "open" : ""}`}>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <NavLink
                            className={mobileSubLinkClass}
                            to={c.href}
                            onClick={closeAll}
                          >
                            {c.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
        <div className="separator-blue-1"></div>
    </header>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BurgerIcon({ open }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 6h16M4 12h16M4 18h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ opacity: open ? 0 : 1 }}
      />
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ opacity: open ? 1 : 0 }}
      />
    </svg>
  );
}
 
