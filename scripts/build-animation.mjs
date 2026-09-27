#!/usr/bin/env node
/**
 * Converts the raw design frames in `assste/animation/*.png` into the WebP
 * sequence the site actually ships in `public/anim/`.
 *
 * Why not a video? The frames are RGBA and the alpha matters — the artwork has a
 * transparent background and is layered over the page gradient. WebM/MP4 alpha
 * is unreliable (Safari has no WebM alpha at all), so we keep a frame sequence
 * and drive it from a <canvas> on scroll.
 *
 * Why not just copy the PNGs? 69MB. This is typically a ~3x-20x reduction.
 *
 * Usage:
 *   node scripts/build-animation.mjs                 # defaults (see CONFIG)
 *   node scripts/build-animation.mjs --stride 2      # every 2nd frame
 *   node scripts/build-animation.mjs --width 960     # smaller frames
 *   node scripts/build-animation.mjs --quality 70
 *   node scripts/build-animation.mjs --dry-run
 *
 * Re-runnable: wipes and regenerates public/anim/.
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, symlinkSync, readdirSync, writeFileSync, existsSync, statSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(ROOT, "assste", "animation");
const OUT_DIR = join(ROOT, "public", "anim");

/** Output frame naming. Zero-padded so the browser's numeric sort is stable. */
const NAME_WIDTH = 4;

const DEFAULTS = {
  /** Keep every Nth source frame. The sequence is scroll-scrubbed rather than
   *  played at a fixed rate, so frame count is nearly free to cut — the bytes
   *  are better spent on resolution. 3 halves the payload and stays smooth when
   *  frames are spread across a whole page of scrolling. */
  stride: 3,
  /** Target width in px. Height follows the source aspect. The source export is
   *  1280x720, so this is the ceiling — going wider would only upscale. Below it
   *  the art is visibly soft on retina, and worst on a phone where a portrait
   *  canvas cover-fits landscape frames. */
  width: 1280,
  /** WebP quality (0-100). Lower = smaller; the art is soft so 72 is plenty. */
  quality: 72,
};

function parseArgs(argv) {
  const opts = { ...DEFAULTS, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--stride") opts.stride = Number(argv[++i]);
    else if (a === "--width") opts.width = Number(argv[++i]);
    else if (a === "--quality") opts.quality = Number(argv[++i]);
    else if (a === "--help" || a === "-h") {
      console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("*/")[0]);
      process.exit(0);
    } else throw new Error(`Unknown argument: ${a}`);
  }
  for (const k of ["stride", "width", "quality"]) {
    if (!Number.isFinite(opts[k]) || opts[k] <= 0) throw new Error(`--${k} must be a positive number`);
  }
  return opts;
}

function ffmpeg(args) {
  return execFileSync("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"] });
}

function ffprobeVersion() {
  return execFileSync("ffmpeg", ["-version"], { encoding: "utf8" }).split("\n")[0];
}

/** ffmpeg's glob input sorts lexicographically (1, 10, 100, 101...), which
 *  scrambles the animation. Stage zero-padded symlinks so sorting is numeric. */
function stageFrames(files) {
  const stage = join(tmpdir(), `anim-stage-${process.pid}`);
  rmSync(stage, { recursive: true, force: true });
  mkdirSync(stage, { recursive: true });
  const sorted = [...files].sort((a, b) => a.n - b.n);
  sorted.forEach((f, i) => {
    symlinkSync(f.path, join(stage, `${String(i + 1).padStart(NAME_WIDTH, "0")}.png`));
  });
  return { stage, count: sorted.length };
}

function dirSizeMb(dir) {
  let bytes = 0;
  for (const name of readdirSync(dir)) bytes += statSync(join(dir, name)).size;
  return bytes / (1024 * 1024);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (!existsSync(SRC_DIR)) {
    console.error(`\n  Source frames not found: ${SRC_DIR}\n`);
    console.error(`  These are the raw design export and are not committed to git (see .gitignore).`);
    console.error(`  Restore them, then re-run this script.\n`);
    process.exit(1);
  }
  if (!existsSync(join(ROOT, "assste"))) {
    console.error("\n  assste/ is missing entirely. Restore the raw frames first.\n");
    process.exit(1);
  }

  const files = readdirSync(SRC_DIR)
    .filter((f) => f.toLowerCase().endsWith(".png"))
    .map((f) => ({ name: f, n: Number(f.replace(/\.png$/i, "")), path: join(SRC_DIR, f) }))
    .filter((f) => Number.isFinite(f.n))
    .sort((a, b) => a.n - b.n);

  if (files.length === 0) {
    console.error(`\n  No PNG frames in ${SRC_DIR}\n`);
    process.exit(1);
  }

  const keep = files.filter((_, i) => i % opts.stride === 0);
  const srcMb = files.reduce((s, f) => s + statSync(f.path).size, 0) / (1024 * 1024);

  console.log(`\n  frames   ${files.length} source PNGs (${srcMb.toFixed(1)} MB) -> ${keep.length} kept`);
  console.log(`  options  stride ${opts.stride}, width ${opts.width}, quality ${opts.quality}`);
  if (opts.dryRun) {
    console.log("  dry run — nothing written\n");
    return;
  }

  console.log(`  encoder  ${ffprobeVersion()}`);
  const { stage } = stageFrames(files);

  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  try {
    // -fps_mode passthrough is required: the image2 muxer defaults to CFR and
    // would duplicate frames back up to the input rate, undoing `select`.
    ffmpeg([
      "-y", "-v", "error",
      "-framerate", "30",
      "-pattern_type", "glob",
      "-i", join(stage, "*.png"),
      "-vf", `select='not(mod(n\\,${opts.stride}))',scale=${opts.width}:-2:flags=lanczos`,
      "-fps_mode", "passthrough",
      "-c:v", "libwebp",
      "-q:v", String(opts.quality),
      "-pix_fmt", "bgra",          // keep the alpha channel
      "-compression_level", "4",
      join(OUT_DIR, `%0${NAME_WIDTH}d.webp`),
    ]);
  } catch (err) {
    console.error("\n  ffmpeg failed:\n" + (err.stderr?.toString() ?? err.message) + "\n");
    process.exit(1);
  } finally {
    rmSync(stage, { recursive: true, force: true });
  }

  const written = readdirSync(OUT_DIR).filter((f) => f.endsWith(".webp")).sort();
  if (written.length === 0) {
    console.error("\n  ffmpeg produced no frames — nothing written.\n");
    process.exit(1);
  }

  // Read real dimensions back off the first output frame rather than assuming.
  const probe = execFileSync(
    "ffprobe",
    ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", join(OUT_DIR, written[0])],
    { encoding: "utf8" }
  ).trim();
  const [width, height] = probe.split(",").map(Number);

  // Verify alpha actually survived the encode. If a future toolchain silently
  // drops it (this happened with libvpx-vp9) the site shows an opaque grey box.
  const alphaOk = hasAlpha(join(OUT_DIR, written[0]));

  const manifest = {
    frameCount: written.length,
    width,
    height,
    pattern: join("/anim", `%0${NAME_WIDTH}d.webp`),
    // The component needs the first index, since files are 1-based on disk.
    firstIndex: 1,
    sourceFrameCount: files.length,
    stride: opts.stride,
    quality: opts.quality,
  };
  writeFileSync(join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

  const outMb = dirSizeMb(OUT_DIR);
  console.log(`  output   ${written.length} WebP frames, ${width}x${height}, alpha ${alphaOk ? "preserved" : "*** LOST ***"}`);
  console.log(`  size     ${outMb.toFixed(2)} MB  (${(srcMb / outMb).toFixed(1)}x smaller than source)`);
  console.log(`  manifest public/anim/manifest.json\n`);
}

/** Decode one frame to raw RGBA and check whether any pixel is translucent. */
function hasAlpha(path) {
  let raw;
  try {
    raw = execFileSync(
      "ffmpeg",
      ["-v", "error", "-i", path, "-vf", "format=rgba", "-frames:v", "1", "-f", "rawvideo", "-"],
      { maxBuffer: 64 * 1024 * 1024 }
    );
  } catch {
    return false;
  }
  for (let i = 3; i < raw.length; i += 4) if (raw[i] < 250) return true;
  return false;
}

main();
