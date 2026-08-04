import { lazy, Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./components/NavBar/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { applyRouteMeta } from "./utils/routeMeta.js";

const Footer = lazy(() => import("./components/Footer/Footer.jsx"));
const ImageModal = lazy(() => import("./components/ImageModal.jsx"));
const Jeanne = lazy(() => import("./components/Jeanne.jsx"));

function useIdleReady(delay = 1200) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const schedule =
      window.requestIdleCallback ||
      ((callback) => window.setTimeout(callback, delay));
    const cancel =
      window.cancelIdleCallback ||
      ((id) => window.clearTimeout(id));

    const id = schedule(() => setReady(true), { timeout: delay });
    return () => cancel(id);
  }, [delay]);

  return ready;
}

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/inicio";
  const nonCriticalReady = useIdleReady();

  useEffect(() => {
    applyRouteMeta(location.pathname);
  }, [location.pathname]);

  const isNotFoundPage =
    location.pathname !== "/" &&
    location.pathname !== "/inicio" &&
    !location.pathname.startsWith("/niveles") &&
    !location.pathname.startsWith("/inscripciones") &&
    !location.pathname.startsWith("/contacto") &&
    !location.pathname.startsWith("/calendario") &&
    !location.pathname.startsWith("/vida-colonial") &&
    !location.pathname.startsWith("/conocenos");

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main className={`app-main ${isNotFoundPage ? "app-main--auto" : ""}`}>
        <div
          key={location.key}
          className={`route-page ${isNotFoundPage ? "route-page--auto" : ""}`}
        >
          <Outlet />
        </div>
      </main>

      {nonCriticalReady && (
        <Suspense fallback={null}>
          <ImageModal />
          {isHome && <Jeanne />}
          <Footer />
        </Suspense>
      )}
    </>
  );
}
