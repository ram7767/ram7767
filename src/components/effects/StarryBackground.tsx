import { useMemo } from "react";

/* ─── tiny seeded PRNG (mulberry32) ─────────────────────────────────────── */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = {
  /** position as % of viewport */
  x: number;
  y: number;
  /** size in px: 1 / 1.5 / 2 */
  size: number;
  /** opacity band */
  opacity: number;
  /** which twinkle keyframe (0,1,2) */
  twinkle: 0 | 1 | 2;
  /** negative animation-delay in seconds */
  delay: number;
};

type BrightStar = {
  x: number;
  y: number;
  size: number;
  delay: number;
};

const STAR_COUNT = 140;
const BRIGHT_COUNT = 6;

function buildStars() {
  const rand = mulberry32(0x5a17a8);
  const stars: Star[] = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    // weight toward 1px: 60% / 30% / 10%
    const r = rand();
    let size = 1;
    let opacity = 0.45;
    if (r > 0.9) {
      size = 2;
      opacity = 0.85;
    } else if (r > 0.6) {
      size = 1.5;
      opacity = 0.65;
    }
    const twinkleR = rand();
    const twinkle = (twinkleR < 0.34 ? 0 : twinkleR < 0.67 ? 1 : 2) as 0 | 1 | 2;
    const periods = [3.5, 5, 7];
    const delay = -(rand() * periods[twinkle]);
    stars.push({
      x: rand() * 100,
      y: rand() * 100,
      size,
      opacity,
      twinkle,
      delay,
    });
  }

  const bright: BrightStar[] = [];
  for (let i = 0; i < BRIGHT_COUNT; i++) {
    bright.push({
      x: rand() * 100,
      y: rand() * 100,
      size: 2.5 + rand() * 0.5, // 2.5..3
      delay: -(rand() * 6),
    });
  }

  return { stars, bright };
}

const STYLE = `
@keyframes sb-twinkle-a {
  0%, 100% { opacity: var(--sb-min, 0.2); }
  50%      { opacity: var(--sb-max, 1); }
}
@keyframes sb-twinkle-b {
  0%, 100% { opacity: var(--sb-min, 0.25); }
  50%      { opacity: var(--sb-max, 0.95); }
}
@keyframes sb-twinkle-c {
  0%, 100% { opacity: var(--sb-min, 0.3); }
  50%      { opacity: var(--sb-max, 0.9); }
}
@keyframes sb-bright {
  0%, 100% { opacity: 0.6; box-shadow: 0 0 4px rgba(255,255,255,0.5); }
  50%      { opacity: 1;   box-shadow: 0 0 8px rgba(255,255,255,0.85); }
}
@keyframes sb-shoot {
  0%   { transform: translate3d(-10vw, -10vh, 0) rotate(20deg); opacity: 0; }
  5%   { opacity: 0.55; }
  20%  { transform: translate3d(60vw, 40vh, 0) rotate(20deg); opacity: 0; }
  100% { transform: translate3d(60vw, 40vh, 0) rotate(20deg); opacity: 0; }
}
.sb-twinkle-0 { animation: sb-twinkle-a 3.5s ease-in-out infinite; }
.sb-twinkle-1 { animation: sb-twinkle-b 5s   ease-in-out infinite; }
.sb-twinkle-2 { animation: sb-twinkle-c 7s   ease-in-out infinite; }
.sb-bright    { animation: sb-bright    4.5s ease-in-out infinite; }
.sb-shoot     { animation: sb-shoot     12s  ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .sb-twinkle-0,
  .sb-twinkle-1,
  .sb-twinkle-2,
  .sb-bright,
  .sb-shoot { animation: none !important; }
  .sb-shoot { display: none !important; }
}
`;

export default function StarryBackground() {
  const { stars, bright } = useMemo(buildStars, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <style>{STYLE}</style>

      {/* Faint base wash to add depth without a 3-color blob spread */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 700px at 50% -10%, rgba(108,99,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Twinkling stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className={`sb-twinkle-${s.twinkle} absolute rounded-full bg-white`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            // Use CSS custom props so the keyframes can reach for the band's max.
            ["--sb-max" as never]: s.opacity,
            ["--sb-min" as never]: Math.max(0.15, s.opacity * 0.3),
          }}
        />
      ))}

      {/* Bright glowing stars */}
      {bright.map((b, i) => (
        <span
          key={`b-${i}`}
          className="sb-bright absolute rounded-full bg-white"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* Occasional shooting star */}
      <span
        className="sb-shoot absolute top-0 left-0 block"
        style={{
          width: "120px",
          height: "1px",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0) 100%)",
          opacity: 0,
          filter: "blur(0.3px)",
        }}
      />
    </div>
  );
}
