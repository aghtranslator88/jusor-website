// Generates branded 1200x630 cover images (OG-ratio) for each Knowledge Base
// article, in both en/ar, from src/content/blog.ts. No external image-gen
// tool is available, so covers are on-brand title cards: gradient background,
// the bridge-arc motif, a simple category icon glyph, and the article title
// set in Plus Jakarta Sans (LTR) / a system Arabic font (RTL).
//
// Note: the downloaded Cairo-Bold.ttf fails to shape Arabic glyphs under
// @napi-rs/canvas's bundled text engine (renders tofu boxes) despite loading
// without error — root cause not worth chasing for a build-time asset
// script. "Dubai" (a built-in Windows font with full Arabic coverage) is
// used instead and confirmed to render correctly. This script is a local
// content-pipeline tool run on demand, not part of the app's runtime, so a
// Windows-font dependency here is acceptable.
import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { blogPosts } from "../src/content/blog.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "blog");
const FONTS_DIR = path.join(ROOT, ".tmp-brand", "fonts");
const ARABIC_FONT = "Dubai";

GlobalFonts.registerFromPath(path.join(FONTS_DIR, "PlusJakartaSans-Bold.ttf"), "Jakarta");

const W = 1200;
const H = 630;

const PRIMARY_600 = "#0F3D6C";
const PRIMARY_700 = "#0C3159";
const ACCENT_500 = "#E65A28";
const ACCENT_400 = "#EA7A47";
const WHITE = "#FFFFFF";

function drawBridgeMotif(ctx) {
  // Two arcs echoing the JUSOR logo, as a subtle decorative motif top-right.
  ctx.save();
  ctx.translate(W - 60, 40);
  ctx.globalAlpha = 0.16;

  ctx.strokeStyle = ACCENT_500;
  ctx.lineWidth = 22;
  ctx.beginPath();
  ctx.arc(0, 140, 170, Math.PI * 1.05, Math.PI * 1.55);
  ctx.stroke();

  ctx.strokeStyle = WHITE;
  ctx.lineWidth = 22;
  ctx.beginPath();
  ctx.arc(-60, 160, 150, Math.PI * 1.5, Math.PI * 1.9);
  ctx.stroke();

  ctx.restore();
}

function drawIconBadge(ctx, iconKey) {
  const cx = 110;
  const cy = 110;
  const r = 62;

  ctx.save();
  ctx.fillStyle = ACCENT_500;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = WHITE;
  ctx.fillStyle = WHITE;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.translate(cx, cy);

  const s = 30; // icon half-size

  switch (iconKey) {
    case "Gavel": {
      ctx.save();
      ctx.rotate(-Math.PI / 4);
      ctx.fillRect(-s * 0.9, -s * 0.35, s * 0.9, s * 0.5);
      ctx.strokeRect(-s * 0.9, -s * 0.35, s * 0.9, s * 0.5);
      ctx.beginPath();
      ctx.moveTo(-s * 0.1, s * 0.15);
      ctx.lineTo(-s * 0.1, s * 1.1);
      ctx.stroke();
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(-s, s * 1.15);
      ctx.lineTo(s, s * 1.15);
      ctx.stroke();
      break;
    }
    case "Landmark": {
      ctx.beginPath();
      ctx.moveTo(-s, -s * 0.2);
      ctx.lineTo(0, -s * 0.9);
      ctx.lineTo(s, -s * 0.2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 0.9, -s * 0.2);
      ctx.lineTo(-s * 0.9, s * 0.7);
      ctx.moveTo(-s * 0.3, -s * 0.2);
      ctx.lineTo(-s * 0.3, s * 0.7);
      ctx.moveTo(s * 0.3, -s * 0.2);
      ctx.lineTo(s * 0.3, s * 0.7);
      ctx.moveTo(s * 0.9, -s * 0.2);
      ctx.lineTo(s * 0.9, s * 0.7);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 1.05, s * 0.7);
      ctx.lineTo(s * 1.05, s * 0.7);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 1.1, s * 1.0);
      ctx.lineTo(s * 1.1, s * 1.0);
      ctx.stroke();
      break;
    }
    case "Stamp": {
      ctx.beginPath();
      ctx.roundRect(-s * 0.6, -s * 0.9, s * 1.2, s * 0.7, 8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 0.35, -s * 0.2);
      ctx.lineTo(-s * 0.15, s * 0.3);
      ctx.lineTo(s * 0.15, -s * 0.05);
      ctx.lineTo(s * 0.35, s * 0.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 1.05, s * 0.9);
      ctx.lineTo(s * 1.05, s * 0.9);
      ctx.stroke();
      break;
    }
    case "Plane": {
      ctx.save();
      ctx.rotate(-Math.PI / 5);
      ctx.beginPath();
      ctx.moveTo(-s * 1.1, s * 0.15);
      ctx.lineTo(s * 1.1, 0);
      ctx.lineTo(-s * 1.1, -s * 0.15);
      ctx.lineTo(-s * 0.55, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      break;
    }
    case "Shield": {
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.1);
      ctx.lineTo(s * 0.95, -s * 0.7);
      ctx.lineTo(s * 0.95, s * 0.15);
      ctx.quadraticCurveTo(s * 0.95, s * 0.9, 0, s * 1.15);
      ctx.quadraticCurveTo(-s * 0.95, s * 0.9, -s * 0.95, s * 0.15);
      ctx.lineTo(-s * 0.95, -s * 0.7);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 0.4, 0);
      ctx.lineTo(-s * 0.1, s * 0.35);
      ctx.lineTo(s * 0.45, -s * 0.35);
      ctx.stroke();
      break;
    }
    case "Anchor": {
      ctx.beginPath();
      ctx.arc(0, -s * 0.75, s * 0.28, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.47);
      ctx.lineTo(0, s * 1.0);
      ctx.moveTo(-s * 0.85, s * 0.15);
      ctx.lineTo(s * 0.85, s * 0.15);
      ctx.moveTo(-s * 0.7, -s * 0.15);
      ctx.lineTo(s * 0.7, -s * 0.15);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 0.85, s * 0.15);
      ctx.quadraticCurveTo(-s * 0.85, s * 1.05, 0, s * 1.05);
      ctx.moveTo(s * 0.85, s * 0.15);
      ctx.quadraticCurveTo(s * 0.85, s * 1.05, 0, s * 1.05);
      ctx.stroke();
      break;
    }
    case "Lightbulb": {
      ctx.beginPath();
      ctx.arc(0, -s * 0.25, s * 0.65, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 0.3, s * 0.35);
      ctx.lineTo(-s * 0.3, s * 0.75);
      ctx.lineTo(s * 0.3, s * 0.75);
      ctx.lineTo(s * 0.3, s * 0.35);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 0.22, s * 1.0);
      ctx.lineTo(s * 0.22, s * 1.0);
      ctx.stroke();
      break;
    }
    case "Leaf": {
      ctx.beginPath();
      ctx.moveTo(-s * 0.9, s * 1.0);
      ctx.quadraticCurveTo(-s * 1.1, -s * 0.6, s * 0.9, -s * 1.0);
      ctx.quadraticCurveTo(s * 1.1, s * 0.6, -s * 0.9, s * 1.0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 0.75, s * 0.85);
      ctx.lineTo(s * 0.7, -s * 0.75);
      ctx.stroke();
      break;
    }
    case "Flame": {
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.15);
      ctx.quadraticCurveTo(s * 0.9, -s * 0.2, s * 0.4, s * 0.5);
      ctx.quadraticCurveTo(s * 0.55, s * 0.05, 0, -s * 0.2);
      ctx.quadraticCurveTo(s * 0.1, s * 0.35, -s * 0.05, s * 0.6);
      ctx.quadraticCurveTo(-s * 0.7, s * 0.4, -s * 0.5, -s * 0.35);
      ctx.quadraticCurveTo(-s * 0.3, -s * 0.7, 0, -s * 1.15);
      ctx.closePath();
      ctx.stroke();
      break;
    }
    case "HardHat": {
      ctx.beginPath();
      ctx.arc(0, s * 0.05, s * 0.85, Math.PI, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 1.05, s * 0.15);
      ctx.lineTo(s * 1.05, s * 0.15);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.85);
      ctx.lineTo(0, s * 0.05);
      ctx.moveTo(-s * 0.5, -s * 0.05);
      ctx.lineTo(-s * 0.5, s * 0.05);
      ctx.moveTo(s * 0.5, -s * 0.05);
      ctx.lineTo(s * 0.5, s * 0.05);
      ctx.stroke();
      break;
    }
    case "Cross": {
      ctx.beginPath();
      ctx.roundRect(-s * 0.28, -s * 0.9, s * 0.56, s * 1.8, 6);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(-s * 0.9, -s * 0.28, s * 1.8, s * 0.56, 6);
      ctx.fill();
      break;
    }
    case "GraduationCap": {
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.6);
      ctx.lineTo(s * 1.05, -s * 0.1);
      ctx.lineTo(0, s * 0.4);
      ctx.lineTo(-s * 1.05, -s * 0.1);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-s * 0.55, s * 0.15);
      ctx.lineTo(-s * 0.55, s * 0.55);
      ctx.quadraticCurveTo(-s * 0.55, s * 0.85, 0, s * 0.85);
      ctx.quadraticCurveTo(s * 0.55, s * 0.85, s * 0.55, s * 0.55);
      ctx.lineTo(s * 0.55, s * 0.15);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(s * 1.05, -s * 0.1);
      ctx.lineTo(s * 1.05, s * 0.55);
      ctx.stroke();
      break;
    }
    case "Users": {
      ctx.beginPath();
      ctx.arc(-s * 0.35, -s * 0.45, s * 0.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(s * 0.4, -s * 0.35, s * 0.24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 0.85, s * 0.85);
      ctx.quadraticCurveTo(-s * 0.85, s * 0.05, -s * 0.35, s * 0.05);
      ctx.quadraticCurveTo(s * 0.15, s * 0.05, s * 0.15, s * 0.7);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(s * 0.05, s * 0.85);
      ctx.quadraticCurveTo(s * 0.05, s * 0.2, s * 0.4, s * 0.2);
      ctx.quadraticCurveTo(s * 0.85, s * 0.2, s * 0.85, s * 0.85);
      ctx.stroke();
      break;
    }
    case "Building2":
    default: {
      ctx.beginPath();
      ctx.roundRect(-s * 0.9, -s, s * 1.1, s * 2, 4);
      ctx.stroke();
      ctx.roundRect(s * 0.25, -s * 0.5, s * 0.65, s * 1.5, 4);
      ctx.stroke();
      for (const [dx, dy] of [[-s * 0.6, -s * 0.6], [-s * 0.2, -s * 0.6], [-s * 0.6, -s * 0.1], [-s * 0.2, -s * 0.1], [-s * 0.6, s * 0.4], [-s * 0.2, s * 0.4]]) {
        ctx.fillRect(dx, dy, s * 0.15, s * 0.15);
      }
      break;
    }
  }
  ctx.restore();
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function renderCover(post, locale) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, W, H);
  gradient.addColorStop(0, PRIMARY_600);
  gradient.addColorStop(1, PRIMARY_700);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);

  drawBridgeMotif(ctx);
  drawIconBadge(ctx, post.iconKey);

  const isAr = locale === "ar";
  const font = isAr ? ARABIC_FONT : "Jakarta";
  const title = post.title[locale] ?? post.title.en ?? "";

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = WHITE;
  ctx.font = `700 54px "${font}"`;
  ctx.textAlign = isAr ? "right" : "left";

  const marginX = 210;
  const maxWidth = W - marginX - 80;
  const lines = wrapText(ctx, title, maxWidth).slice(0, 4);
  const lineHeight = 66;
  const startX = isAr ? W - 80 : marginX;
  const startY = 250 - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, i) => {
    ctx.fillText(line, startX, startY + i * lineHeight);
  });

  // Footer wordmark
  ctx.font = `700 28px "${isAr ? ARABIC_FONT : "Jakarta"}"`;
  ctx.fillStyle = ACCENT_400;
  ctx.textAlign = "left";
  ctx.fillText("JUSOR", marginX, H - 56);
  ctx.font = `700 20px ${ARABIC_FONT}`;
  ctx.fillStyle = "#D3E4F3";
  ctx.fillText("جسور", marginX + 110, H - 56);
  ctx.font = `400 20px "${isAr ? ARABIC_FONT : "Jakarta"}"`;
  ctx.fillText("· www.jusortrans.com", marginX + 175, H - 56);

  const buffer = canvas.toBuffer("image/png");
  const filename = `${post.slug}-${locale}.png`;
  await writeFile(path.join(OUT_DIR, filename), buffer);
  console.log(`Generated ${filename}`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  for (const post of blogPosts) {
    await renderCover(post, "en");
    await renderCover(post, "ar");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
