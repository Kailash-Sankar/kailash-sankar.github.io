/**
 * Luna silhouette generator.
 *
 * The hard part of drawing this by hand is the bezier control points: they
 * are not something you can reason about anatomically. So instead we describe
 * the outline as a sequence of anatomical keypoints and let Catmull-Rom
 * interpolation derive a smooth closed cubic path. Tuning the shape then
 * means moving points, which is something you can reason about.
 *
 *   node luna.mjs        # writes /tmp/doglab/luna.svg
 */

const W = 152;
const H = 118;
const GROUND = 104;

/**
 * Clockwise outline of a standing Labrador in profile, facing right.
 * Head length is held to roughly half the body length, which is what stops
 * the head reading as oversized.
 */
const POINTS = [
  // Tail: thick at the base, tapering as it sweeps up and back.
  [5, 48],
  [12, 58],
  [24, 65], // tail base meets the rump

  // Rump, back and withers.
  [30, 60],
  [46, 55],
  [64, 53],
  [80, 47], // neck, back side

  // Skull.
  [98, 36],
  [108, 29], // crown
  [118, 30], // brow / stop
  [127, 34],

  // Muzzle: short and blunt.
  [133, 38],
  [136, 41], // nose
  [132, 45], // muzzle bottom
  [122, 45],

  // Throat, neck front, chest.
  [110, 48],
  [100, 52],
  [96, 62], // chest
  [95, 74],

  // Front leg, straight to the ground.
  [95, GROUND],
  [84, GROUND],

  // Belly. Kept high so the legs read long, rather than dachshund-short.
  [84, 70],
  [70, 75],
  [58, 80],

  // Rear leg, straight to the ground.
  [56, GROUND],
  [44, GROUND],

  // Up the back of the rear leg to the rump.
  [44, 68],
  [32, 66],
  [24, 65],
];

/** Catmull-Rom to cubic bezier, closed loop. */
function toPath(pts) {
  const n = pts.length;
  const at = (i) => pts[(i + n) % n];
  let d = `M ${pts[0][0]} ${pts[0][1]}`;

  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);

    // Tension 0.5 gives the standard centripetal-ish Catmull-Rom curve.
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0]} ${p2[1]}`;
  }

  return `${d} Z`;
}

const COAT = "var(--dog-coat)";
const SHADE = "var(--dog-shade)";
const DARK = "var(--dog-dark)";

const body = toPath(POINTS);

export const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" focusable="false">
  <!-- Tail: own element so it can wag. Base is tucked well inside the rump. -->
  <path class="luna-tail" d="M33 68 C23 63 13 54 7 46 C6 42 10 40 12 43 C17 50 24 56 34 60 Z" fill="${COAT}" />

  <path class="luna-body" d="${body}" fill="${COAT}" />

  <!-- head group: skull, muzzle, ear and eye, so it can breathe as a unit -->
  <g class="luna-head">
    <!-- ear: narrow teardrop hanging off the back of the skull -->
    <path class="luna-ear" d="M100 35 C96 37 94 43 95 48 C96 53 100 55 103 52 C105 49 105 44 104 40 C103 36 102 35 100 35 Z" fill="${SHADE}" />
    <path d="M132 40 C136 40 138 42 136 44 C134 46 130 45 129 43 Z" fill="${DARK}" />
    <circle cx="119" cy="37" r="1.9" fill="${DARK}" />
  </g>
</svg>
`;
