import {
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Contacto.css";
import emailjs from "@emailjs/browser";
import { useState } from "react";

// ✅ Helmet (SEO)
import { Helmet } from "react-helmet-async";

export default function ContactoPage() {

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await emailjs.sendForm(
        "service_394osy1",
        "template_01r406p",
        e.target,
        "K6KC06w8GnCGE6cU0"
      );

      setStatus("success");
      e.target.reset();
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ct_page">
      <Helmet>
        <html lang="es-MX" />
        {/* Title (≤ ~60 chars) */}
        <title>Contacto Colegio Colonial Querétaro | Teléfono y Dirección</title>

        {/* Meta Description (155–160 chars aprox) */}
        <meta
          name="description"
          content="Contacta a Colegio Colonial en Querétaro. Teléfono +52 1 442 431 7022, WhatsApp, horario y ubicación. Solicita informes e inscripciones hoy."
        />

        {/* Canonical */}
        <link rel="canonical" href="https://www.colegiocolonial.edu.mx/contacto" />

        {/* Robots */}
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Colegio Colonial" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:title" content="Contacto Colegio Colonial en Querétaro" />
        <meta
          property="og:description"
          content="Teléfono +52 1 442 431 7022, WhatsApp, horario y ubicación. Solicita informes e inscripciones en Colegio Colonial, Querétaro."
        />
        <meta property="og:url" content="https://www.colegiocolonial.edu.mx/contacto" />

        <meta
          property="og:image"
          content="https://www.colegiocolonial.edu.mx/images/logo-escudo.webp"
        />
        <meta property="og:image:alt" content="Contacto Colegio Colonial Querétaro" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contacto Colegio Colonial Querétaro" />
        <meta
          name="twitter:description"
          content="Teléfono +52 1 442 431 7022, WhatsApp, horario y ubicación. Informes e inscripciones en Colegio Colonial, Querétaro."
        />
        <meta
          name="twitter:image"
          content="https://www.colegiocolonial.edu.mx/images/logo-escudo.webp"
        />
        <meta name="geo.region" content="MX-QUE" />
        <meta name="geo.placename" content="Querétaro, México" />
      </Helmet>

      {/* HERO ROJO INSTITUCIONAL */}
      <header className="ct_hero">
        <div className="ct_heroGlow" />
        <div className="ct_heroGrid" />

        <div className="ct_heroInner">
          <h1 className="ct_title">Contáctanos</h1>
          <p className="ct_subtitle">
            Estamos listos para acompañarte en el proceso educativo de tu hijo.
          </p>

          <div className="ct_actions">
            <a
              className="ct_btn ct_btnPrimary"
              href="https://wa.me/5214424317022?text=Hola%20Colegio%20Colonial,%20me%20gustaría%20recibir%20información."
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> WhatsApp
            </a>

            <a
              className="ct_btn ct_btnGhost"
              href="mailto:colonial.a.c.qro@gmail.com"
            >
              <FaEnvelope /> Enviar correo
            </a>
          </div>

          <div className="ct_quick">
            <div className="ct_quickItem">
              <FaClock />
              <span>Lunes a Viernes · 8:00 a.m. – 3:00 p.m.</span>
            </div>

            <div className="ct_quickItem">
              <FaPhoneAlt />
              <span>(442) 123 4567 · (442) 765 4321</span>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="ct_main">
        <div className="ct_container">
          {/* PANEL IZQUIERDO */}
          <aside className="ct_panel">
            <h2 className="ct_h2">Información de contacto</h2>
            <p className="ct_p">
              Si deseas informes, costos o agendar una visita, escríbenos.
              Respondemos lo antes posible.
            </p>

            <div className="ct_cards">
              <div className="ct_card">
                <div className="ct_icon">
                  <FaEnvelope />
                </div>
                <div className="ct_cardBody">
                  <h3>Correo</h3>
                  <a href="mailto:colonial.a.c.qro@gmail.com">
                    colonial.a.c.qro@gmail.com
                  </a>
                </div>
              </div>

              <div className="ct_card">
                <div className="ct_icon">
                  <FaPhoneAlt />
                </div>
                <div className="ct_cardBody">
                  <h3>Teléfonos</h3>
                  <a href="tel:+52442 431 7022">(442) 431 7022</a>
                </div>
              </div>

              <div className="ct_card ct_cardHighlight">
                <div className="ct_icon ct_iconGreen">
                  <FaWhatsapp />
                </div>
                <div className="ct_cardBody">
                  <h3>WhatsApp</h3>
                  <a
                    href="https://wa.me/5214424317022?text=Hola%20Colegio%20Colonial,%20me%20gustaría%20recibir%20información."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enviar mensaje
                  </a>
                </div>
              </div>

              <div className="ct_card">
                <div className="ct_icon">
                  <FaClock />
                </div>
                <div className="ct_cardBody">
                  <h3>Horario</h3>
                  <p>Lunes a Viernes</p>
                  <p>7:00 a.m. – 3:00 p.m.</p>
                </div>
              </div>

              <div className="ct_card">
                <div className="ct_icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="ct_cardBody">
                  <h3>Ubicación</h3>
                  <p>Querétaro, Querétaro</p>
                  <a
                    href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDggBEEUYJxg7GIAEGIoFMgYIABBFGDkyDggBEEUYJxg7GIAEGIoFMgYIAhAjGCcyBwgDEAAYgAQyBggEEEUYPDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYQdIBCDIxNTNqMGo3qAIAsAIA&um=1&ie=UTF-8&fb=1&gl=mx&sa=X&geocode=KX_3_JguW9OFMQskUHkltkGI&daddr=C.+16+de+Septiembre+84,+La+Santa+Cruz,+Centro,+76020+Santiago+de+Quer%C3%A9taro,+Qro."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* FORMULARIO */}
          <section className="ct_formWrap">
            <div className="ct_formHeader">
              <h2 className="ct_h2">Envíanos un mensaje</h2>
              <p className="ct_p">Completa el formulario y te contactamos.</p>
            </div>

            <form className="ct_form" onSubmit={handleSubmit}>
              <div className="ct_row">
                <label>
                  Nombre
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Tu nombre completo"
                    required
                  />
                </label>

                <label>
                  Teléfono
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(###) ### ####"
                  />
                </label>
              </div>

              <label>
                Correo
                <input
                  type="email"
                  name="from_email"
                  placeholder="tucorreo@email.com"
                  required
                />
              </label>

              <label>
                Mensaje
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Cuéntanos qué necesitas..."
                  required
                />
              </label>

              <button className="ct_submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </button>

{status === "success" && (
  <p className="ct_msg ct_msgSuccess">
    ✅ Mensaje enviado correctamente
  </p>
)}

{status === "error" && (
  <p className="ct_msg ct_msgError">
    ❌ Error al enviar. Intenta de nuevo.
  </p>
)}
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
