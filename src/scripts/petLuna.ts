/**
 * Luna's easter egg: pet the dog.
 *
 * Clicking the invisible .luna-pet button (aligned over her) makes her hop,
 * wag faster, kick up a few leaves and say something. Pets in quick succession
 * build a combo: the bubble grows from "woof" to "awooo!" and so does the
 * hop. Kept deliberately small and side-effect free: it never touches the
 * scroll logic in garden.ts. The button exists because main (z-index 1) covers
 * the fixed scene, and it is hidden on coarse pointers, where the right margin
 * can sit over body copy.
 */

const HAPPY_MS = 700;
const COMBO_WINDOW = 1100;
const SAY_MS = 1250;
const LADDER = ["woof", "woof woof!", "woof woof woof!", "awooo!"];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

export const initLuna = () => {
  const luna = document.querySelector<HTMLElement>(".luna");
  const target = document.querySelector<HTMLElement>(".luna-pet");
  if (!luna || !target) return;

  const petals = Array.from(luna.querySelectorAll<HTMLElement>(".luna-petal"));
  const say = target.querySelector<HTMLElement>(".luna-say");

  let happyTimer: number | undefined;
  let sayTimer: number | undefined;
  let combo = 0;
  let lastPet = 0;

  const restart = (el: HTMLElement, cls: string) => {
    // Drop and re-add the class across a reflow to restart the keyframes.
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  };

  const pet = () => {
    // Rapid pets build a combo; a pause drops back to a plain "woof".
    const now = performance.now();
    combo = now - lastPet < COMBO_WINDOW ? Math.min(combo + 1, LADDER.length) : 1;
    lastPet = now;

    luna.classList.remove("is-happy", "is-excited");
    void luna.offsetWidth;
    luna.classList.add("is-happy");
    if (combo >= 3) luna.classList.add("is-excited");

    window.clearTimeout(happyTimer);
    happyTimer = window.setTimeout(
      () => luna.classList.remove("is-happy", "is-excited"),
      HAPPY_MS,
    );

    // Leaves on every pet. The global reduced-motion reset collapses their
    // animation to ~0ms, so hold them pre-spread and static instead.
    petals.forEach((petal) => {
      if (prefersReducedMotion.matches) {
        petal.classList.add("is-shown");
        window.setTimeout(() => petal.classList.remove("is-shown"), 1000);
        return;
      }
      restart(petal, "is-animating");
    });

    if (!say) return;
    say.textContent = LADDER[combo - 1];
    say.classList.toggle("is-excited", combo >= 3);

    window.clearTimeout(sayTimer);
    if (prefersReducedMotion.matches) {
      say.classList.add("is-shown");
      sayTimer = window.setTimeout(() => say.classList.remove("is-shown"), SAY_MS);
    } else {
      restart(say, "is-talking");
      sayTimer = window.setTimeout(() => say.classList.remove("is-talking"), SAY_MS);
    }
  };

  target.addEventListener("click", pet);
};
