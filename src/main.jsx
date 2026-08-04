// src/main.jsx
import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

import App from "./App.jsx";
import Inicio from "./pages/Inicio.jsx";

const Primaria = lazy(() => import("./pages/niveles-educativos/Primaria.jsx"));
const Secundaria = lazy(() => import("./pages/niveles-educativos/Secundaria.jsx"));
const Niveles = lazy(() => import("./pages/niveles-educativos/NivelesEscolares.jsx"));
const Inscripcion = lazy(() => import("./pages/inscripciones/Inscripciones.jsx"));
const Inscripcion_Primaria = lazy(() => import("./pages/inscripciones/Ins-primaria.jsx"));
const Inscripcion_Secundaria = lazy(() => import("./pages/inscripciones/Ins-secundaria.jsx"));
const Contacto = lazy(() => import("./pages/Contacto.jsx"));
const Calendario = lazy(() => import("./pages/Calendario.jsx"));
const Eventos = lazy(() => import("./pages/vida-colonial/Eventos.jsx"));
const Galeria = lazy(() => import("./pages/vida-colonial/Galeria.jsx"));
const Actividades = lazy(() => import("./pages/vida-colonial/Extracurriculares.jsx"));
const Otros = lazy(() => import("./pages/vida-colonial/otros-servicios.jsx"));
const COLONIAL = lazy(() => import("./pages/vida-colonial/VidaCol.jsx"));
const VM = lazy(() => import("./pages/conocenos/MisionVision.jsx"));
const Valores = lazy(() => import("./pages/conocenos/Valores.jsx"));
const Campus = lazy(() => import("./pages/conocenos/Campus.jsx"));
const Conocenos = lazy(() => import("./pages/conocenos/Conocenos.jsx"));
const Modelo = lazy(() => import("./pages/conocenos/Modelo.jsx"));
const CCT = lazy(() => import("./pages/conocenos/CCT.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

import "./styles.css";

/* =====================================================
   🍎 Detectar dispositivos Apple (iPhone / iPad)
   ===================================================== */
(function detectApple() {
  const isApple =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isApple) document.documentElement.classList.add("is-apple");
})();

/* =====================================================
   🌐 Router (mínimo)
   ===================================================== */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Inicio /> },

       { path: "niveles/primaria", element: lazyPage(<Primaria />) },
      { path: "niveles/secundaria", element: lazyPage(<Secundaria />) },
       { path: "niveles", element: lazyPage(<Niveles />) },

       { path: "inscripciones/primaria", element: lazyPage(<Inscripcion_Primaria />) },
      { path: "inscripciones/secundaria", element: lazyPage(<Inscripcion_Secundaria />) },
       { path: "inscripciones", element: lazyPage(<Inscripcion />) },

       { path: "contacto", element: lazyPage(<Contacto />) },
      { path: "calendario", element: lazyPage(<Calendario />) },

       { path: "vida-colonial", element: lazyPage(<COLONIAL />) },
        { path: "vida-colonial/eventos", element: lazyPage(<Eventos />) },
       { path: "vida-colonial/galeria", element: lazyPage(<Galeria />) },
       { path: "vida-colonial/extracurriculares", element: lazyPage(<Actividades />) },
        { path: "vida-colonial/otros-servicios", element: lazyPage(<Otros />) },

       { path: "conocenos/mision-vision", element: lazyPage(<VM />) },
     { path: "conocenos/valores", element: lazyPage(<Valores />) },
     { path: "conocenos/otros-campus", element: lazyPage(<Campus />) },
     { path: "conocenos/modelo-educativo", element: lazyPage(<Modelo />) },
      { path: "conocenos/clave-de-centro-de-trabajo", element: lazyPage(<CCT />) },
       { path: "conocenos", element: lazyPage(<Conocenos />) },

       { path: "*", element: lazyPage(<NotFound />) },
    ],
  },
]);

function lazyPage(element) {
  return <Suspense fallback={null}>{element}</Suspense>;
}

/* =====================================================
   🚀 Render
   ===================================================== */
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
