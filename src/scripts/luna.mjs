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
 *
 * This outline deliberately does NOT include the tail. The tail is a separate
 * animated element, so including it here left a static tail behind whenever
 * the animated one wagged away from it. The outline therefore closes on the
 * rump, and the tail is tucked far enough inside the body to stay hidden
 * through the full wag arc.
 */
const POINTS = [
  // Rump, back and withers.
  [33, 54], // top of the croup, where the tail sits
  [48, 54],
  [64, 53], // withers
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

  // Belly.
  [84, 70],
  [68, 78],
  [58, 86],

  // Hind leg, straight to the ground.
  [58, GROUND],
  [46, GROUND],

  // Up the back of the hind leg and around a full haunch. The run back to
  // the first point is what closes the body without a tail.
  [46, 72],
  [38, 70],
  [32, 67],
  // Rounded rear of the haunch, deliberately as thick as the tail base. If the
  // rump tapers to a point the tail cannot join it without leaving a step.
  [27, 60],
  [30, 55],
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

/** Tail: a separate animated element, so the body outline above excludes it.
 *
 *  The base is kept strictly inside the body outline. A corner sitting `d`
 *  units from the pivot moves by up to d*sin(wag) as the tail swings, so the
 *  base has to be buried by more than that at both extremes of the animation
 *  or the join opens a notch. Narrowing the base and deepening the haunch buys
 *  that margin without a visible step. */
const TAIL_D = "M33 64 C20 64 8 58 2 50 C1 46 4 43 7 46 C12 54 22 57 33 57 Z";

/** The wagging pivot, in SVG user units. It must sit inside the haunch:
 *  rotating about a point on the topline swings the tail's base out of the
 *  body and opens a notch at the join. */
const TAIL_PIVOT = [31, 60];

/** Axis-aligned bounds of a path built only from M/C commands. */
const boundsOf = (d) => {
  const n = d.match(/-?\d*\.?\d+/g).map(Number);
  const xs = n.filter((_, i) => i % 2 === 0);
  const ys = n.filter((_, i) => i % 2 === 1);
  return { x: Math.min(...xs), y: Math.min(...ys) };
};

/* transform-box: fill-box resolves transform-origin against the element's own
 * box, so the pivot has to be converted into fill-box-relative lengths.
 * Deriving it here means the geometry and the origin cannot drift apart. */
const box = boundsOf(TAIL_D);
const originX = TAIL_PIVOT[0] - box.x;
const originY = TAIL_PIVOT[1] - box.y;

export const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" focusable="false">
  <!-- tail: own element so it can wag, base buried inside the haunch -->
  <path class="luna-tail" style="transform-origin: ${originX}px ${originY}px" d="${TAIL_D}" fill="${COAT}" />

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
