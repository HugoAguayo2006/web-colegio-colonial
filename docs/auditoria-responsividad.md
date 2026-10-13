# Auditoría de responsividad

Fecha: 12 de octubre de 2026. Entorno: React + Vite, build local de producción, Google Chrome mediante Playwright.

## Alcance

Se inventariaron las 20 rutas existentes y la página 404, las 22 páginas JSX y los 30 archivos CSS. Se revisaron Navbar, Footer, ImageModal, Jeanne, Reveal, ScrollToTop, Talleres, IntercolegialesVideoHero, Intercolegiales y WhatsAppFloat. Historia-1, Intercolegiales y WhatsAppFloat también se montaron de forma aislada para comprobar sus dimensiones; no se añadieron rutas.

Rutas comprobadas:

- `/`
- `/niveles`, `/niveles/primaria`, `/niveles/secundaria`
- `/inscripciones`, `/inscripciones/primaria`, `/inscripciones/secundaria`
- `/contacto`, `/calendario`
- `/vida-colonial`, `/vida-colonial/eventos`, `/vida-colonial/galeria`, `/vida-colonial/extracurriculares`, `/vida-colonial/otros-servicios`
- `/conocenos`, `/conocenos/mision-vision`, `/conocenos/valores`, `/conocenos/otros-campus`, `/conocenos/modelo-educativo`, `/conocenos/clave-de-centro-de-trabajo`
- Ruta inexistente `/auditoria-404` para comprobar el fallback.

## Problemas y correcciones

| Área | Causa observada | Corrección |
| --- | --- | --- |
| Layout y cabecera | Alturas y márgenes rígidos, parches para anchos exactos y menús demasiado altos en horizontal | Offset calculado con ResizeObserver; cabecera compacta en poca altura; menús con desplazamiento interno y altura disponible en dvh |
| Navegación táctil | Submenús de tablet dependientes de hover | Botones de apertura con estado accesible, toque y controles de al menos 44 px en puntero táctil |
| Estilos compartidos | Clases de Conócenos colisionaban con Inicio; variables globales y estilos de talleres cambiaban otras páginas según navegación | Prefijo propio de Conócenos y variables/selectores limitados a sus componentes |
| Inicio y niveles | Títulos posicionados fuera del flujo, márgenes negativos, columnas y estadísticas que no encogían | Títulos en flujo en móvil, tamaños fluidos, min-width:0 y columnas adaptables; se mantiene la composición de escritorio |
| Inscripciones | Secundaria no importaba los estilos comunes en carga directa; rejillas e información sticky demasiado rígidas | Importación de CSS compartido, wrap y sticky condicionado al espacio disponible |
| Formularios y contacto | Campos, correo y columnas excedían 320 px | Box sizing, límites fluidos, ruptura de textos largos y campos de 16 px en móvil |
| Calendario | Filtros y siete columnas con mínimos/paddings excesivos | Siete columnas minmax(0,1fr), filtros flexibles y días/indicadores adaptados |
| Galería y modal global | Imagen, cabecera, pie y cierre competían por altura; apertura de dos modales | Grid acotado al viewport, imagen contenida, cierre visible y exclusión de la galería del modal global |
| Campus | Tarjeta seleccionada rígida de 460 px y overlay poco usable en tablet | Tarjeta debajo del mapa en pantallas pequeñas, poca altura o entrada táctil; ancho fluido y scroll con offset real |
| Carruseles, servicios y footer | 100vw, mínimos fijos y padding sumado al ancho causaban desbordamientos | Ancho del contenedor, box sizing, columnas fluidas y wrap |
| Elementos flotantes | Botones con z-index excesivo y mascota grande en horizontal | Apilado corregido y mascota/bocadillo ajustados a poca altura |

No se modificaron rutas, textos, datos, URLs, Helmet, metadatos, calendario ICS, dependencias ni configuración de integraciones. Se mantuvieron colores, fuentes y animaciones. La comparación visual de escritorio se realizó con capturas anteriores y posteriores; las correcciones de aislamiento de CSS eliminan variaciones que antes dependían de la ruta visitada.

## Validación

La matriz de producción comprende 21 rutas × 28 viewports = **588 casos, 0 fallos detectados en la ejecución final**. Comprueba ancho del documento, límites de elementos, desbordamiento interno visible, posición del título respecto a la cabecera y errores JavaScript. Las imágenes ausentes se registran por separado. Las zonas de scroll intencional, decoraciones y el contenido interno de Google Maps no se consideran desbordamientos del documento.

Viewports (ancho × alto, píxeles CSS):

- Móvil: 320×700, 360×800, 375×812, 390×844, 412×915, 430×932.
- Tablet vertical: 600×960, 768×1024, 820×1180, 834×1194, 1024×1366.
- Laptop y escritorio: 1280×800, 1366×768, 1440×900, 1920×1080, 2560×1440.
- Móvil horizontal: 667×375, 740×360, 844×390, 932×430.
- Tablet horizontal: 1024×768, 1180×820, 1194×834, 1366×1024.
- Tamaños intermedios: 767×900, 769×900, 981×900, 1228×800.

También se realizaron:

- Revisión visual de capturas de todas las páginas en móvil, muestras de tablet y comparaciones de escritorio; revisión específica de calendario, mapa/tarjeta, menús y modales en horizontal.
- 39 comprobaciones de interacción: navegación y último enlace accesible en menús, cierre al navegar, formulario y validación nativa, acordeones, calendario, filtros, carrusel, galería, Escape, rotación del modal y estabilidad de Inicio después de visitar Conócenos. Incluye menú a 1280×360.
- 9 comprobaciones adicionales: tarjetas de campus en cuatro tamaños, filtro de país, etiqueta larga de galería, avance automático del hero y submenú de tablet.
- 10 casos de toque en Chromium con perfiles iPhone/iPad y cinco tamaños cada uno. Son emulaciones, no pruebas de Safari/WebKit.
- 12 montajes aislados de componentes sin ruta, sin desbordamiento del documento.
- Revisión de recorte de texto en las 21 rutas a 320, 600, 981 y 1440 px, sin recortes detectados después de cargar las secciones diferidas.
- `npm run build`: correcto. `npm run lint`: correcto. `git diff --check`: correcto. El proyecto no define un script `test`.

La matriz espera que ResizeObserver sincronice cabecera y contenido y restablece scroll al inicio tras cada cambio de viewport. Esto evita confundir el anclaje de scroll del navegador con un título inicialmente oculto. Para medir contenido fuera de pantalla, el navegador de auditoría fuerza temporalmente el renderizado de los elementos con content-visibility:auto; el CSS del sitio conserva esa optimización.

## Límites y recursos pendientes

- Google Maps muestra un error de carga en el entorno local. Se comprobaron el contenedor, filtros y tarjeta seleccionada; no se pudo validar el mapa real ni sus overlays externos.
- Se comprobaron dimensiones de vídeos/iframes, no la disponibilidad o reproducción completa de proveedores externos.
- El formulario se rellenó y validó sin enviar correos. No se realizaron envíos de WhatsApp.
- No se probaron dispositivos físicos, Safari ni el teclado/barras dinámicas de un navegador móvil real. Los viewports no equivalen a todas las combinaciones posibles de navegador y dispositivo.
- Hay referencias preexistentes a imágenes ausentes. Se conservaron sus URLs conforme al requisito del proyecto; sus imágenes reales no pueden evaluarse visualmente:
  - Niveles: `/images/extras/pintura-1.webp`, `pintura-2.webp`, `manualidades-1.webp`, `danza-1.webp`, `danza-2.webp`.
  - Extracurriculares: `/extras/pintura_1.webp`, `manualidades_1.webp`, `danza_1.webp`, `musica_1.webp`.
  - Galería: `/images/intercolegiales/premiacion-01.webp`.

## Archivos modificados

31 archivos de implementación:

- `src/components/Footer/Footer.css`
- `src/components/ImageModal.css`
- `src/components/ImageModal.jsx`
- `src/components/Intercolegiales.css`
- `src/components/IntercolegialesVideoHero.css`
- `src/components/Jeanne.css`
- `src/components/NavBar/Navbar.css`
- `src/components/NavBar/Navbar.jsx`
- `src/components/talleres.css`
- `src/pages/Calendario.css`
- `src/pages/Contacto.css`
- `src/pages/Inicio.css`
- `src/pages/NotFound.css`
- `src/pages/conocenos/Campus.css`
- `src/pages/conocenos/Campus.jsx`
- `src/pages/conocenos/Conocenos.css`
- `src/pages/conocenos/Conocenos.jsx`
- `src/pages/conocenos/MisionVision.css`
- `src/pages/conocenos/Modelo.css`
- `src/pages/conocenos/Valores.css`
- `src/pages/inscripciones/Ins-primaria.css`
- `src/pages/inscripciones/Ins-secundaria.jsx`
- `src/pages/inscripciones/Inscripciones.css`
- `src/pages/niveles-educativos/NivelesEscolares.css`
- `src/pages/niveles-educativos/Primaria.css`
- `src/pages/vida-colonial/Eventos.css`
- `src/pages/vida-colonial/Extracurriculares.css`
- `src/pages/vida-colonial/Galeria.css`
- `src/pages/vida-colonial/VidaCol.css`
- `src/pages/vida-colonial/otros-servicios.css`
- `src/styles.css`

Archivos añadidos: este informe y `scripts/audit-responsive.mjs`.

## Reproducir la matriz

Se requiere Google Chrome instalado. Playwright puede instalarse fuera del repositorio para mantener intactas las dependencias de la aplicación:

```sh
npm install --prefix /tmp/colonial-responsive-tools playwright
npm run build
npm run preview -- --host 127.0.0.1
```

En otra terminal, desde la raíz del proyecto:

```sh
PLAYWRIGHT_MODULE=/tmp/colonial-responsive-tools/node_modules/playwright/index.mjs AUDIT_SCREENSHOTS=1 node scripts/audit-responsive.mjs
```

Variables opcionales: `AUDIT_BASE_URL` (por defecto `http://127.0.0.1:4173`), `AUDIT_OUTPUT_DIR` (por defecto `/tmp/colonial-responsive-audit`) y `AUDIT_SCREENSHOTS=1` para capturas a 320, 768 y 1440 px. Los resultados se guardan en `matrix.json` y las referencias de imágenes rotas en `resources.json`. El script termina con código distinto de cero si detecta problemas de layout o errores JavaScript. Las pruebas de interacción y la revisión visual descritas arriba se realizaron adicionalmente; no forman parte de este script.

## Ajuste posterior: menú hamburguesa en pantallas medianas

Por revisión visual del usuario, la navegación ahora se colapsa por debajo de 1400 px, incluyendo tablets y laptops pequeñas. Desde 1400 px se conserva el menú completo; el modo horizontal con altura máxima de 480 px sigue usando hamburguesa a cualquier ancho. CSS y matchMedia de React utilizan el mismo umbral. Se mantienen la cabecera móvil y el panel desplazable con todos los enlaces.

Validación específica del ajuste: 320×700, 768×1024, 1024×768, 1280×800, 1366×768, 1399×900, 1400×900, 1440×900, 1920×1080 y 1440×360. Apertura, submenús, navegación a Contacto, cierre al navegar y cambio de breakpoint correctos; sin desbordamiento horizontal detectado. Captura revisada a 1024×768. Build y lint correctos. La matriz de 588 casos anterior corresponde a la auditoría inicial; este ajuste se verificó con las pruebas específicas indicadas.
