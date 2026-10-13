// Run against `npm run dev` or `npm run preview`. Playwright is an optional audit tool.
// See docs/auditoria-responsividad.md for installation and environment options.
import fs from "node:fs/promises";
import path from "node:path";

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.AUDIT_BASE_URL || "http://127.0.0.1:4173";
const output = process.env.AUDIT_OUTPUT_DIR || "/tmp/colonial-responsive-audit";
const source = await fs.readFile(new URL("../src/main.jsx", import.meta.url), "utf8");
const routes = ["/", ...Array.from(source.matchAll(/path: "([^"*]+)"/g), (m) => `/${m[1]}`)
  .filter((route) => route !== "//"), "/auditoria-404"];
const viewports = [
  [320, 700], [360, 800], [375, 812], [390, 844], [412, 915], [430, 932],
  [600, 960], [768, 1024], [820, 1180], [834, 1194], [1024, 1366],
  [1280, 800], [1366, 768], [1440, 900], [1920, 1080], [2560, 1440],
  [667, 375], [740, 360], [844, 390], [932, 430],
  [1024, 768], [1180, 820], [1194, 834], [1366, 1024],
  [767, 900], [769, 900], [981, 900], [1228, 800],
];
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
const resources = [];
let nextRoute = 0;

async function worker() {
  while (nextRoute < routes.length) {
    const route = routes[nextRoute++];
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${baseURL}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".route-page > *");
    await page.waitForSelector(".ingf");
    await page.evaluate(() => document.fonts.ready);
    // Offscreen content-visibility:auto subtrees can retain geometry from an
    // earlier viewport. Render them for the audit without changing site CSS.
    await page.evaluate(() => {
      for (const element of document.querySelectorAll(".route-page *")) {
        if (getComputedStyle(element).contentVisibility === "auto") {
          element.style.contentVisibility = "visible";
        }
      }
    });
    // Exercise lazy-loaded sections and images before measuring them.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    for (const [width, height] of viewports) {
      await page.setViewportSize({ width, height });
      // Wait for ResizeObserver to synchronize the fixed header and page offset.
      await page.waitForFunction(() => Math.abs(
        parseFloat(getComputedStyle(document.querySelector(".app-main")).paddingTop) -
        document.querySelector(".ing-nav").getBoundingClientRect().height,
      ) < 1);
      // Resizing can preserve an anchored scroll position from the previous size.
      await page.evaluate(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
      await page.waitForTimeout(200);
      const measurements = await page.evaluate(() => {
        const viewport = document.documentElement.clientWidth;
        const issues = [];
        const excluded = '[aria-hidden="true"], .ing-dropdown:not(.open), .ing-mobilePanel:not(.open), .cc-hero-bg, .prim-hero__bg, .icc-track, .inter-carousel__track, .prim-feTrack, .gm-style';
        for (const element of document.querySelectorAll("body *")) {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          if (!rect.width || !rect.height || style.visibility === "hidden" ||
              style.display === "none" || style.opacity === "0" || element.closest(excluded)) continue;
          if (["svg", "path"].includes(element.tagName) ||
              (!element.textContent.trim() && !["IMG", "INPUT", "TEXTAREA", "IFRAME", "VIDEO"].includes(element.tagName))) continue;
          const node = `${element.tagName.toLowerCase()}.${String(element.className).trim().replaceAll(" ", ".")}`;
          if (rect.left < -1 || rect.right > viewport + 1) {
            issues.push({ kind: "bounds", node, left: rect.left, right: rect.right });
          }
          // Submenus and speech-bubble tails intentionally extend their local parent.
          if (!element.matches(".ing-item, .jeanne-float, .jeanne-speech, body, html") &&
              element.clientWidth && element.scrollWidth > element.clientWidth + 2 && style.overflowX === "visible") {
            issues.push({ kind: "internal", node, client: element.clientWidth, scroll: element.scrollWidth });
          }
        }
        const title = document.querySelector(".route-page h1");
        const navHeight = document.querySelector(".ing-nav").getBoundingClientRect().height;
        const titleTop = title?.getBoundingClientRect().top;
        if (document.documentElement.scrollWidth > viewport + 1) issues.push({ kind: "document-overflow" });
        if (title && titleTop < navHeight - 1) issues.push({ kind: "title-under-navbar", titleTop, navHeight });
        return { viewport, scrollWidth: document.documentElement.scrollWidth, navHeight, titleTop, issues };
      });
      results.push({ route, width, height, ...measurements, errors: [...errors] });
      if (process.env.AUDIT_SCREENSHOTS === "1" && [320, 768, 1440].includes(width)) {
        await page.screenshot({ path: path.join(output, `${route.replaceAll("/", "_")}-${width}.png`) });
      }
    }
    resources.push({ route, brokenImages: await page.locator("img").evaluateAll((images) => images
      .filter((img) => img.complete && !img.naturalWidth)
      .map((img) => new URL(img.currentSrc || img.src).pathname)) });
    await context.close();
  }
}

try {
  await Promise.all([worker(), worker(), worker()]);
  await fs.writeFile(path.join(output, "matrix.json"), JSON.stringify(results, null, 2));
  await fs.writeFile(path.join(output, "resources.json"), JSON.stringify(resources, null, 2));
  const failed = results.filter((result) => result.issues.length || result.errors.length);
  console.log(`${routes.length} routes, ${viewports.length} viewports, ${results.length} cases; ${failed.length} failures.`);
  console.log(`Evidence: ${output}`);
  if (failed.length) {
    console.log(JSON.stringify(failed, null, 2));
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
