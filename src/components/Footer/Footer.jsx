import "./Footer.css";
import Reveal from "../Reveal"; // ✅ ajusta la ruta si tu Reveal está en otra carpeta

export default function Footer() {
  return (
    <footer className="ingf">
      {/* fondo azul */}
      <section className="ingf__main">
        {/* decor */}
        <div className="ingf__bg" aria-hidden="true">
          <span className="ingf__orb ingf__orb--1" />
          <span className="ingf__orb ingf__orb--2" />
          <span className="ingf__gridGlow" />
        </div>

        <div className="ingf__container">
          {/* Header */}
          <Reveal variant="up" className="ingf__reveal">
            <header className="ingf__header">
              <h2 className="ingf__title">Contáctanos</h2>
              <p className="ingf__subtitle">
                Estamos listos para ayudarte. Escríbenos o visítanos.
              </p>
            </header>
          </Reveal>

          {/* Cards */}
          <div className="ingf__cards">
            {/* Dirección */}
            <Reveal variant="up" delay={0.05} className="ingf__reveal">
              <article className="ingf__card">
                <div className="ingf__cardTop">
                  <span className="ingf__badge">Dirección</span>
                  <span className="ingf__icon">📍</span>
                </div>
                <p className="ingf__text">
Calle 16 de Septiembre 84, Col. Centro, Querétaro Centro, Mexico

                </p>
                <div className="ingf__miniLine" />
                <a
                  className="ingf__link"
                  href="https://www.google.com/maps/place/C.+16+de+Septiembre+84,+La+Santa+Cruz,+La+Cruz,+76090+Santiago+de+Quer%C3%A9taro,+Qro./@20.5956146,-100.3874025,17z/data=!3m1!4b1!4m6!3m5!1s0x85d35b2e994c911d:0xd0aa99b33eb9e8e0!8m2!3d20.5956146!4d-100.3874025!16s%2Fg%2F11c2k5h2f7?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver en Google Maps →
                </a>
              </article>
            </Reveal>

            {/* Contacto */}
            <Reveal variant="up" delay={0.12} className="ingf__reveal">
              <article className="ingf__card">
                <div className="ingf__cardTop">
                  <span className="ingf__badge">Contacto</span>
                  <span className="ingf__icon">☎️</span>
                </div>

                <div className="ingf__list">
                  <a
                    className="ingf__item"
                    href="https://wa.me/5214424317022?text=Hola%20Colegio%20Colonial%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n."
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="ingf__itemIcon">💬</span>
                    <span className="ingf__itemText">+52 442 431 7022</span>
                    <span className="ingf__pill">WhatsApp</span>
                  </a>

                  {/*<a className="ingf__item" href="mailto:contacto@colegiocolonial.edu.mx">
                    <span className="ingf__itemIcon">✉️</span>
                    <span className="ingf__itemText">contacto@colegiocolonial.edu.mx</span>
                    <span className="ingf__pill">Correo</span>
                  </a>

                  <a className="ingf__item" href="mailto:difusion@colegiocolonial.edu.mx">
                    <span className="ingf__itemIcon">✉️</span>
                    <span className="ingf__itemText">difusion@colegiocolonial.edu.mx</span>
                    <span className="ingf__pill">Correo</span>
                  </a>*/}

                  <a className="ingf__item" href="tel:+524422242501">
                    <span className="ingf__itemIcon">📞</span>
                    <span className="ingf__itemText">+52 442 224 2501</span>
                    <span className="ingf__pill">Tel.</span>
                  </a>


                </div>
              </article>
            </Reveal>

            {/* Horario */}
            <Reveal variant="up" delay={0.19} className="ingf__reveal">
              <article className="ingf__card">
                <div className="ingf__cardTop">
                  <span className="ingf__badge">Horario</span>
                  <span className="ingf__icon">🕒</span>
                </div>

                <div className="ingf__hours">
                  <div className="ingf__row">
                    <span>Lun - Vie</span>
                    <span className="ingf__strong">8:00 am – 3:00 pm</span>
                  </div>
                  <div className="ingf__row">
                    <span>Sábado</span>
                    <span className="ingf__muted">Cerrado</span>
                  </div>
                  <div className="ingf__row">
                    <span>Domingo</span>
                    <span className="ingf__muted">Cerrado</span>
                  </div>
                </div>

                <div className="ingf__cta">
                  <a className="ingf__btn" href="/contacto">
                    Solicitar informes
                  </a>
                  <a className="ingf__btn ingf__btn--ghost" href="tel:+524422242501">
                    Llamar
                  </a>
                </div>
              </article>
            </Reveal>
          </div>

          {/* Mapa */}
          <Reveal variant="blur" delay={0.08} className="ingf__reveal">
            <div className="ingf__mapWrap">
              <div className="ingf__mapTop">
                <span className="ingf__mapTitle">Ubicación</span>
                <span className="ingf__mapHint">Arrastra para explorar</span>
              </div>

              <iframe
                className="ingf__map"
                title="Mapa Colegio Colonial"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=C.+16+de+Septiembre+84,+La+Santa+Cruz,+La+Cruz,+76090+Santiago+de+Quer%C3%A9taro,+Quer%C3%A9taro,+M%C3%A9xico&output=embed
"
              />
            </div>
          </Reveal>

          {/* Síguenos */}
          <Reveal variant="fade" delay={0.06} className="ingf__reveal">
            <div className="ingf__follow">
              <h3 className="ingf__followTitle">Síguenos</h3>
              <div className="ingf__social">
                <a
                  className="ingf__socialItem"
                  href="https://www.youtube.com/@ColegioColonial"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="ingf__socialIcon">▶️🔴</span>
                  <span>@ColegioColonial</span>
                </a>
                <a
                  className="ingf__socialItem"
                  href="https://www.facebook.com/ColegioColonialOficial/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="ingf__socialIcon ingf__socialIcon--fb">f</span>
                  <span>Colegio Colonial A.C.</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* barra roja */}
      <div className="ingf__bar">
        <div className="ingf__container ingf__barInner">
          <p className="ingf__copy">
            © 2026 Colegio Colonial · Hecho con{" "}
            <span className="ingf__heart">♥</span> en México por{" "}
            <a
              href="https://www.nivostech.com/"
              target="_blank"
              rel="noreferrer"
              className="ingf__nivostech"
            >
              NIVOSTECH
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
