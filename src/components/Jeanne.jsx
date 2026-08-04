import { useEffect, useState } from "react";
import "./Jeanne.css";

const WHATSAPP_URL =
  "https://wa.me/5214424317022?text=Hola%20Colegio%20Colonial%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n.";

export default function JeanneFloat() {
  const [isApple] = useState(() => {
    const ua = navigator.userAgent.toLowerCase();
    return (
      ua.includes("iphone") ||
      ua.includes("ipad") ||
      (ua.includes("macintosh") && "ontouchend" in document)
    );
  });
  const [showSpeech, setShowSpeech] = useState(false);

  useEffect(() => {
    /* ⏳ Speech SIEMPRE después de 5s */
    const timer = setTimeout(() => {
      setShowSpeech(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const rootClass = [
    "jeanne-float",
    isApple ? "jeanne-apple" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const jeanneSrc = "/jeanne.webp";

  return (
    <div className={rootClass}>
      {/* Speech (aparece después de 5s) */}
      {showSpeech && (
        <div className="jeanne-speech">
          <div className="jeanne-float-bubble">
            Presiona el escudo para ir a{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-inline"
              aria-label="Ir a WhatsApp"
            >
              WhatsApp
              <img
                src="/icons/WhatsApp.webp"
                alt="WhatsApp"
                className="wa-icon"
                width="2044"
                height="2048"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </a>
          </div>
        </div>
      )}

      {/* Jeanne (siempre visible) */}
      <div className="jeanne-float-figure">
        <img
          src={jeanneSrc}
          alt="Madre Jeanne Chézard de Matel"
          className="jeanne-float-img"
          width="1365"
          height="2048"
          loading="lazy"
          decoding="async"
          draggable="false"
        />

        {/* Hitbox: toda la monita */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="jeanne-float-shield"
          aria-label="Ir a WhatsApp"
        />
      </div>
    </div>
  );
}
