import { useEffect, useState } from "react";
import "./ImageModal.css";

export default function ImageModal() {
  const [imageSrc, setImageSrc] = useState(null);

  /* =====================================================
     📸 Detectar clic en imágenes (GLOBAL)
     ===================================================== */
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target;

      if (target.tagName !== "IMG") return;
      if (target.closest(".imgmodal")) return;
      if (target.closest("[data-nozoom], .lb")) return;
      if (target.closest("a")) return;

      setImageSrc(target.currentSrc || target.src);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  /* =====================================================
     ⌨️ Cerrar con ESC
     ===================================================== */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setImageSrc(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  /* =====================================================
     🚫 Bloquear scroll mientras el visor cubre la pantalla
     ===================================================== */
  useEffect(() => {
    if (!imageSrc) return;

    // lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [imageSrc]);

  if (!imageSrc) return null;

  return (
    <div className="imgmodal" onClick={() => setImageSrc(null)} role="dialog" aria-modal="true">
      <div className="imgmodal__stage" onClick={(e) => e.stopPropagation()}>
        <button
          className="imgmodal__close"
          onClick={() => setImageSrc(null)}
          aria-label="Cerrar imagen"
          title="Cerrar"
          type="button"
        >
          ✕
        </button>

        <img className="imgmodal__img" src={imageSrc} alt="Vista ampliada" />
      </div>
    </div>
  );
}
