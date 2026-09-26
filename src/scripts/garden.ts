/**
 * Scroll-linked garden scene.
 *
 * Publishes scroll progress as CSS custom properties on <html>. Everything
 * here is expressed in px (not %) because these values drive `transform`,
 * where a percentage would resolve against the element's own box rather than
 * the viewport — and because animating transform stays on the compositor,
 * while animating `top`/`right` would trigger layout on every frame.
 *
 * The terrain (hills, grass, Luna) is the only part of the scene dark enough
 * to threaten text contrast, so it is the only part that recedes as you start
 * reading. The sky, sun, clouds and breeze stay at full strength throughout.
 *
 * Crucially, everything here is a pure function of scroll position, so the
 * scene comes back when you scroll up. An earlier version latched itself off
 * once fully faded and never restored the scene for the rest of the session.
 *
 * Styling for these properties lives in GardenScene.astro.
 */

const root = document.documentElement;

/** Total scroll progress over which the terrain fades from full to nothing. */
const FADE_START = 0.05;
const FADE_END = 0.3;

let frame: number | undefined;

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const update = () => {
  frame = undefined;

  const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollMax > 0 ? clamp(window.scrollY / scrollMax, 0, 1) : 0;

  // Remap so the terrain holds at full strength through the hero, then eases
  // away over the reading zone. Purely positional, hence reversible.
  const fade = 1 - clamp((progress - FADE_START) / (FADE_END - FADE_START), 0, 1);
  root.style.setProperty("--scene-fade", fade.toFixed(3));

  // No need to drive the parallax offsets once the terrain is invisible.
  if (fade <= 0) return;

  const vh = window.innerHeight;
  const vw = window.innerWidth;

  root.style.setProperty("--scene-sun-y", `${progress * vh * 0.42}px`);
  root.style.setProperty("--scene-sun-x", `${progress * vw * -0.02}px`);
  root.style.setProperty("--scene-cloud-shift", `${progress * 100}px`);
  root.style.setProperty("--scene-ground-shift", `${progress * 34}px`);
};

export const initGarden = () => {
  update();

  window.addEventListener(
    "scroll",
    () => {
      frame ??= window.requestAnimationFrame(update);
    },
    { passive: true },
  );

  // The scene is sized in viewport units, so recompute on resize.
  window.addEventListener("resize", update, { passive: true });
};
