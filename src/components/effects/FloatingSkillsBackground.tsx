import { useEffect, useMemo, useRef } from "react";
import { ALL_SKILL_NAMES, SkillIcons, type SkillName } from "./skillIcons";

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

type ChipSpec = {
  name: SkillName;
  /** base position as % of viewport (0..1) */
  bx: number;
  by: number;
  /** chip size px */
  size: number;
  /** drift period in seconds */
  period: number;
  /** drift amplitudes px */
  ampX: number;
  ampY: number;
  /** phase offset (radians) */
  phase: number;
  /** depth 0.4 (far) .. 1.0 (near) — controls parallax + opacity */
  depth: number;
};

/** Build a stable set of chip specs with a min-spacing heuristic. */
function buildChips(): ChipSpec[] {
  const rand = mulberry32(0xc0ffee);
  const names = ALL_SKILL_NAMES.slice(0, 14);
  const chips: ChipSpec[] = [];
  const minDistSq = 0.16 * 0.16; // ~16% of viewport between centers

  // Encourage spread by sampling quadrants in rotation
  const quadrants = [
    [0.05, 0.05, 0.45, 0.45],
    [0.55, 0.05, 0.95, 0.45],
    [0.05, 0.55, 0.45, 0.95],
    [0.55, 0.55, 0.95, 0.95],
  ] as const;

  for (let i = 0; i < names.length; i++) {
    const [x0, y0, x1, y1] = quadrants[i % quadrants.length];
    let bx = 0;
    let by = 0;
    let attempt = 0;
    do {
      bx = x0 + rand() * (x1 - x0);
      by = y0 + rand() * (y1 - y0);
      attempt++;
      const clash = chips.some((c) => {
        const dx = c.bx - bx;
        const dy = c.by - by;
        return dx * dx + dy * dy < minDistSq;
      });
      if (!clash) break;
    } while (attempt < 20);

    const depth = 0.4 + rand() * 0.6; // 0.4..1.0
    chips.push({
      name: names[i],
      bx,
      by,
      size: 32 + Math.round(rand() * 16), // 32..48
      period: 14 + rand() * 12, // 14..26 s
      ampX: 20 + rand() * 40, // 20..60 px
      ampY: 20 + rand() * 40,
      phase: rand() * Math.PI * 2,
      depth,
    });
  }
  return chips;
}

/* ─── component ──────────────────────────────────────────────────────────── */

const REPULSION_RADIUS = 160; // px
const REPULSION_MAX = 36; // px push at zero distance
const PARALLAX_GAIN = 0.02; // multiplier on (mouse - center)

export default function FloatingSkillsBackground() {
  const chips = useMemo(buildChips, []);

  // Refs: one container per chip, no state writes during animation.
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const sizeRef = useRef<{ w: number; h: number }>({
    w: typeof window !== "undefined" ? window.innerWidth : 1440,
    h: typeof window !== "undefined" ? window.innerHeight : 900,
  });
  const reducedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mql.matches;

    const onResize = () => {
      sizeRef.current = { w: window.innerWidth, h: window.innerHeight };
    };
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    const onMqlChange = (e: MediaQueryListEvent) => {
      reducedRef.current = e.matches;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    if (mql.addEventListener) mql.addEventListener("change", onMqlChange);
    else mql.addListener(onMqlChange);

    // Static positioning fast-path for reduced motion
    if (reducedRef.current) {
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        const c = chips[i];
        const { w, h } = sizeRef.current;
        const px = c.bx * w;
        const py = c.by * h;
        node.style.transform = `translate3d(${px}px, ${py}px, 0)`;
        node.style.opacity = String(0.55 + c.depth * 0.25);
      });
      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseout", onLeave);
        if (mql.removeEventListener) mql.removeEventListener("change", onMqlChange);
        else mql.removeListener(onMqlChange);
      };
    }

    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      if (document.hidden) return;

      const t = (now - start) / 1000;
      const { w, h } = sizeRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const mActive = mouseRef.current.active;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < chips.length; i++) {
        const node = nodeRefs.current[i];
        if (!node) continue;
        const c = chips[i];

        const base_x = c.bx * w;
        const base_y = c.by * h;

        // Orbital drift
        const w0 = (2 * Math.PI) / c.period;
        let dx = Math.cos(w0 * t + c.phase) * c.ampX;
        let dy = Math.sin(w0 * t + c.phase * 1.3) * c.ampY;

        // Parallax from viewport center
        if (mActive) {
          dx += (mx - cx) * PARALLAX_GAIN * c.depth;
          dy += (my - cy) * PARALLAX_GAIN * c.depth;
        }

        // Repulsion from cursor
        if (mActive) {
          const rx = base_x + dx - mx;
          const ry = base_y + dy - my;
          const dist = Math.hypot(rx, ry);
          if (dist > 0 && dist < REPULSION_RADIUS) {
            const falloff = 1 - dist / REPULSION_RADIUS;
            const push = REPULSION_MAX * falloff * falloff;
            dx += (rx / dist) * push;
            dy += (ry / dist) * push;
          }
        }

        const x = base_x + dx;
        const y = base_y + dy;
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      if (mql.removeEventListener) mql.removeEventListener("change", onMqlChange);
      else mql.removeListener(onMqlChange);
    };
  }, [chips]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {chips.map((c, i) => {
        const Icon = SkillIcons[c.name];
        const iconSize = Math.round(c.size * 0.5);
        // depth -> opacity (near brighter, far dimmer)
        const opacity = 0.28 + c.depth * 0.2;
        return (
          <div
            key={`${c.name}-${i}`}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            style={{
              width: c.size,
              height: c.size,
              opacity,
              willChange: "transform",
              // Center the chip on its (x,y) coordinate via negative offset.
              marginLeft: -c.size / 2,
              marginTop: -c.size / 2,
            }}
            className="absolute top-0 left-0 inline-flex items-center justify-center rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-white/40"
          >
            {Icon({ size: iconSize })}
          </div>
        );
      })}
    </div>
  );
}
