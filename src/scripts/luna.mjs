/**
 * Luna silhouette generator.
 *
 * A standing yellow Labrador in profile, facing right.
 *
 * The dog is assembled from a handful of solid shapes that share one fill
 * (`--dog-coat`): torso, head+neck, foreleg, hindleg and tail. Because the
 * shapes overlap and are the same colour, their union reads as a single
 * silhouette — the eye never sees the seams. Splitting them up matters for
 * two reasons:
 *
 *   1. The head (neck, skull, muzzle, ear and eye) can breathe as a unit.
 *      The old version animated only the ear and eye because the skull was
 *      baked into the body outline.
 *   2. The tail is its own element, so it can wag without dragging a static
 *      tail-shaped ghost out of the body behind it.
 *
 * Proportions come from a side-on reference: withers height ~62 units, body
 * length ~1.1x that, depth ~0.5x, legs ~0.5x, head height ~0.4x, and a
 * muzzle only about as long as the skull so the head stays broad and blocky.
 *
 *   node luna.mjs        # writes /tmp/doglab/luna.svg
 */

const W = 152;
const H = 118;
const GROUND = 104; // top of the paws

/* --- Torso -------------------------------------------------------------
 * Slightly sloping back (withers high, croup lower), a chest that overhangs
 * the foreleg and drops well below the tucked-up belly, and a rounded haunch.
 */
const TORSO_D = [
  "M 46 52",
  "C 56 47, 68 44, 78 44", // croup rising to the withers
  "C 86 45, 93 49, 98 55", // shoulder rolling into the chest
  "C 102 61, 100 70, 94 73", // broad chest dropping to the brisket
  "C 82 77, 64 74, 56 70", // belly, tucked up
  "C 49 67, 44 63, 42 59", // flank to the haunch
  "C 40 56, 43 53, 46 52 Z", // rump closing on the croup
].join(" ");

/* --- Head and neck -----------------------------------------------------
 * One unbroken outline: short thick neck, broad skull with a brow, a dip at
 * the stop, then a short squared muzzle. The neck runs down to y=72 so it is
 * buried inside the chest and the breathe animation cannot open a seam.
 */
const HEAD_D = [
  "M 80 70", // base of the neck, hidden in the torso
  "C 80 48, 87 30, 96 24", // up the back of the neck to the skull
  "C 101 20, 109 20, 115 24", // broad, domed crown
  "C 119 27, 121 29, 125 30", // brow dipping into the stop
  "C 129 31, 133 34, 135 38", // short muzzle out to the nose
  "C 136 41, 135 44, 133 46", // blunt, squared-off muzzle front
  "C 129 48, 125 47, 122 46", // underside of the muzzle
  "C 118 46, 115 48, 113 53", // jaw and throat
  "C 110 60, 103 66, 97 69", // front of the neck into the chest
  "C 92 71, 84 71, 80 70 Z", // neck base closing inside the torso
].join(" ");

/* --- Legs --------------------------------------------------------------
 * A straight foreleg under the overhanging chest, and a hindleg with a real
 * bend at the stifle and hock so the stance reads as a dog, not a table.
 */
const FRONT_LEG_D = [
  "M 78 50",
  "L 78 100",
  "Q 78 104 82 104", // paw
  "L 94 104",
  "Q 98 104 98 100",
  "L 98 50 Z",
].join(" ");

const HIND_LEG_D = [
  "M 48 52",
  "C 44 62, 44 72, 48 80", // back of the thigh
  "C 50 86, 50 92, 50 100", // back of the lower leg
  "Q 50 104 54 104", // paw
  "L 64 104",
  "Q 68 104 68 100",
  "L 66 70", // front of the lower leg, up to the stifle
  "C 64 62, 62 56, 60 52 Z", // front of the thigh
].join(" ");

/* --- Tail --------------------------------------------------------------
 * A thick otter tail, carried up and back. Its own animated element; the base
 * is buried to y=60 inside the haunch so the join never opens as it swings.
 */
const TAIL_D = [
  "M 46 50",
  "C 39 44, 30 40, 23 40", // upper edge, carried up
  "C 17 40, 16 47, 22 48", // rounded tip
  "C 30 51, 40 56, 44 62", // lower edge back to the rump
  "Z",
].join(" ");

/* --- Ear, eye, nose ---------------------------------------------------- */
const EAR_D = [
  "M 110 24",
  "C 103 26, 100 36, 101 46", // outside edge hanging down the skull
  "C 102 52, 106 53, 109 50", // rounded bottom of the flap
  "C 112 46, 113 34, 112 27",
  "C 111 24, 111 23, 110 24 Z",
].join(" ");

const NOSE_D = [
  "M 132 36",
  "C 136 35, 139 38, 138 42",
  "C 137 45, 133 46, 131 45",
  "C 128 43, 129 37, 132 36 Z",
].join(" ");

/**
 * Axis-aligned bounds of a path built only from M/C/L/Q commands. Used to
 * derive the tail's transform-origin in fill-box coordinates so the pivot
 * and the geometry can never drift apart.
 */
const boundsOf = (d) => {
  const n = d.match(/-?\d*\.?\d+/g).map(Number);
  const xs = n.filter((_, i) => i % 2 === 0);
  const ys = n.filter((_, i) => i % 2 === 1);
  return { x: Math.min(...xs), y: Math.min(...ys) };
};

/** The wagging pivot, in SVG user units. It sits inside the haunch, because
 *  rotating about a point on the topline would swing the tail's base out of
 *  the body and open a notch at the join. */
const TAIL_PIVOT = [46, 56];

const box = boundsOf(TAIL_D);
const originX = TAIL_PIVOT[0] - box.x;
const originY = TAIL_PIVOT[1] - box.y;

const COAT = "var(--dog-coat)";
const SHADE = "var(--dog-shade)";
const DARK = "var(--dog-dark)";

export const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" focusable="false">
  <!-- tail: own element so it can wag, base buried inside the haunch -->
  <path class="luna-tail" style="transform-origin: ${originX}px ${originY}px" d="${TAIL_D}" fill="${COAT}" />

  <!-- legs first, then the torso over their tops, so the joins stay hidden -->
  <path class="luna-hind" d="${HIND_LEG_D}" fill="${COAT}" />
  <path class="luna-fore" d="${FRONT_LEG_D}" fill="${COAT}" />
  <path class="luna-body" d="${TORSO_D}" fill="${COAT}" />

  <!-- head group: neck, skull, muzzle, ear and eye, so it can breathe as a unit -->
  <g class="luna-head">
    <path d="${HEAD_D}" fill="${COAT}" />
    <path class="luna-ear" d="${EAR_D}" fill="${SHADE}" />
    <path d="${NOSE_D}" fill="${DARK}" />
    <circle cx="114" cy="34" r="1.8" fill="${DARK}" />
  </g>
</svg>
`;
