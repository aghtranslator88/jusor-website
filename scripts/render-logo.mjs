// One-off asset pipeline: rasterizes public/brand/source/jusor-logo.pdf into
// PNG logo assets + favicon.ico at multiple resolutions.
import { createCanvas } from "@napi-rs/canvas";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_PDF = path.join(ROOT, "assets/brand-source/jusor-logo.pdf");
const OUT_DIR = path.join(ROOT, "public/brand");
const TMP_DIR = path.join(ROOT, ".tmp-brand");

async function renderPdfToPng(scale) {
  const data = new Uint8Array(await readFile(SRC_PDF));
  const doc = await pdfjs.getDocument({ data, isEvalSupported: false }).promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale });

  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const ctx = canvas.getContext("2d");

  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas.toBuffer("image/png");
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(TMP_DIR, { recursive: true });

  // High-res master render, kept outside public/ (intermediate only, not served)
  const masterPng = await renderPdfToPng(6);
  await writeFile(path.join(TMP_DIR, "logo-master.png"), masterPng);

  // Trim transparent/white padding, then export standard sizes
  const trimmed = sharp(masterPng).trim({ threshold: 10 });

  await trimmed.clone().resize({ height: 512 }).png().toFile(path.join(OUT_DIR, "logo-512.png"));
  await trimmed.clone().resize({ height: 256 }).png().toFile(path.join(OUT_DIR, "logo-256.png"));
  await trimmed.clone().resize({ height: 128 }).png().toFile(path.join(OUT_DIR, "logo.png"));
  await trimmed.clone().resize({ height: 64 }).png().toFile(path.join(OUT_DIR, "logo-64.png"));

  // Square, padded icon versions (for favicon / app icon / social avatar)
  const iconSizes = [16, 32, 48, 180, 192, 512];
  for (const size of iconSizes) {
    await sharp(masterPng)
      .trim({ threshold: 10 })
      .resize({
        width: Math.round(size * 0.82),
        height: Math.round(size * 0.82),
        fit: "inside",
      })
      .extend({
        top: 0, bottom: 0, left: 0, right: 0,
      })
      .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(OUT_DIR, `icon-${size}.png`));
  }

  // favicon.ico (multi-size)
  const icoBuffer = await pngToIco([
    path.join(OUT_DIR, "icon-16.png"),
    path.join(OUT_DIR, "icon-32.png"),
    path.join(OUT_DIR, "icon-48.png"),
  ]);
  await writeFile(path.join(ROOT, "src/app/favicon.ico"), icoBuffer);

  console.log("Logo assets generated in public/brand/ and favicon.ico updated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
