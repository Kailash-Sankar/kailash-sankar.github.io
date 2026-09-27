/**
 * Luna's easter egg: pet the dog.
 *
 * Clicking the invisible .luna-pet button (aligned over her) makes her hop,
 * wag faster and send a few petals tumbling up. Kept deliberately small and
 * side-effect free: it never touches the scroll logic in garden.ts. The button
 * exists because main (z-index 1) covers the fixed scene, and it is hidden on
 * coarse pointers, where the right margin can sit over body copy.
 */

const HAPPY_MS = 700;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

export const initLuna = () => {
  const luna = document.querySelector<HTMLElement>(".luna");
  const target = document.querySelector<HTMLElement>(".luna-pet");
  if (!luna || !target) return;

  const petals = Array.from(luna.querySelectorAll<HTMLElement>(".luna-petal"));
  let happyTimer: number | undefined;

  const restart = (el: HTMLElement) => {
    // Per-petal shape, path and timing live in CSS; this only restarts them.
    el.classList.remove("is-animating");
    void el.offsetWidth;
    el.classList.add("is-animating");
  };

  const pet = () => {
    luna.classList.remove("is-happy");
    void luna.offsetWidth;
    luna.classList.add("is-happy");

    window.clearTimeout(happyTimer);
    happyTimer = window.setTimeout(() => luna.classList.remove("is-happy"), HAPPY_MS);

    petals.forEach((petal) => {
      // The global reduced-motion reset collapses every animation to ~0ms, so
      // hold a static, pre-spread burst rather than animating nothing.
      if (prefersReducedMotion.matches) {
        petal.classList.add("is-shown");
        window.setTimeout(() => petal.classList.remove("is-shown"), 1000);
        return;
      }

      restart(petal);
    });
  };

  target.addEventListener("click", pet);
};
