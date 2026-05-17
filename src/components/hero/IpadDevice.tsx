import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

type IpadDeviceProps = {
  children: ReactNode;
  className?: string;
};

// Landscape iPad-Pro-style frame. Pure HTML/CSS shell. Fluid sizing so it
// reads well from ~280px wide phones up to ~560px desktop.
//
// Cursor parallax: on hover-capable, motion-allowed devices the device tilts
// gently toward/away from the mouse. All motion is applied via direct
// transform writes from a single rAF loop — no React state per frame.

// Idle base orientation (visible even without cursor movement).
const BASE_RY = -6; // deg
const BASE_RX = 4; // deg

// Maximum extra rotation introduced by cursor distance from center.
const MAX_DELTA_RY = 10; // deg horizontal
const MAX_DELTA_RX = 6; // deg vertical

// Lerp factor toward target per frame. 0.18 = responsive but still smooth.
const LERP = 0.18;

export default function IpadDevice({ children, className }: IpadDeviceProps) {
  // The element we transform. Wrapping the bezel (NOT the outer root) lets
  // the floor glow stay underneath without being tilted with the device.
  const tiltRef = useRef<HTMLDivElement | null>(null);
  // Reflection layers that subtly shift opposite to tilt for parallax depth.
  const sheenRef = useRef<HTMLDivElement | null>(null);
  const streakRef = useRef<HTMLDivElement | null>(null);

  // Live cursor (viewport coords) and cached device bounds.
  const cursor = useRef<{ x: number; y: number } | null>(null);
  const rectRef = useRef<DOMRect | null>(null);

  // Target vs current rotation. Both refs — no per-frame state.
  const target = useRef({ ry: BASE_RY, rx: BASE_RX });
  const current = useRef({ ry: BASE_RY, rx: BASE_RX });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const tiltEl = tiltRef.current;
    if (!tiltEl) return;

    const hoverNone = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Apply base/idle tilt once regardless of capability so it always looks
    // dimensional on desktop, flat-ish on mobile (no transform applied).
    if (hoverNone || reduced) {
      if (!hoverNone) {
        tiltEl.style.transform = `perspective(1400px) rotateY(${BASE_RY}deg) rotateX(${BASE_RX}deg) translate3d(0,0,0)`;
      }
      // On touch we leave transform unset for a flat presentation.
      return;
    }

    // Hover-capable + motion-allowed: attach listeners and rAF loop.
    const refreshRect = () => {
      rectRef.current = tiltEl.getBoundingClientRect();
    };
    refreshRect();

    const onMove = (e: MouseEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY };
      const rect = rectRef.current;
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalize against half the viewport so a cursor at the screen edge
      // hits ±1 regardless of where the device is on the page.
      const halfW = window.innerWidth / 2 || 1;
      const halfH = window.innerHeight / 2 || 1;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / halfW));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / halfH));
      target.current.ry = BASE_RY + nx * MAX_DELTA_RY;
      // Cursor down -> tilt top toward viewer -> reduce rotateX.
      target.current.rx = BASE_RX - ny * MAX_DELTA_RX;
    };

    // Smoothed sheen opacity (matches tilt lerp for lockstep parallax).
    const sheenState = { value: 0.5, target: 0.5 };

    const tick = () => {
      const t = target.current;
      const c = current.current;
      c.ry += (t.ry - c.ry) * LERP;
      c.rx += (t.rx - c.rx) * LERP;
      // translate3d(0,0,0) appended to keep the matrix on the GPU compositor.
      tiltEl.style.transform = `perspective(1400px) rotateY(${c.ry.toFixed(3)}deg) rotateX(${c.rx.toFixed(3)}deg) translate3d(0,0,0)`;

      // Parallax sheen: opacity shifts opposite to tilt direction, eased with
      // the same lerp factor so it stays in lockstep with the tilt.
      const deltaRy = c.ry - BASE_RY; // [-MAX_DELTA_RY, +MAX_DELTA_RY]
      const norm = (deltaRy + MAX_DELTA_RY) / (2 * MAX_DELTA_RY); // [0, 1]
      sheenState.target = norm;
      sheenState.value += (sheenState.target - sheenState.value) * LERP;
      const sheenOpacity = 0.05 + (1 - sheenState.value) * 0.13;
      const streakOpacity = 0.05 + sheenState.value * 0.13;
      if (sheenRef.current) sheenRef.current.style.opacity = sheenOpacity.toFixed(3);
      if (streakRef.current) streakRef.current.style.opacity = streakOpacity.toFixed(3);

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", refreshRect, { passive: true });
    window.addEventListener("scroll", refreshRect, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", refreshRect);
      window.removeEventListener("scroll", refreshRect);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative w-full max-w-[560px] mx-auto",
        className
      )}
      style={{ perspective: "1400px" }}
    >
      {/* Floor glow — sits UNDER the device and stays flat (not tilted). */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 -bottom-6 md:-bottom-10 w-[85%] h-10 md:h-14 rounded-[50%] bg-brand-500/30 blur-2xl opacity-70 pointer-events-none"
      />

      {/* Tilted device wrapper — transform mutated directly via rAF.
          GPU-promoted: will-change + preserve-3d + backface-visibility hidden
          keep this on its own compositor layer for smooth frames. */}
      <div
        ref={tiltRef}
        className="relative will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* Outer aluminum frame. Gradient border simulates brushed metal. */}
        <div
          className={cn(
            "relative rounded-[1.75rem] md:rounded-[2.25rem]",
            "bg-gradient-to-br from-ink-600 via-ink-700 to-ink-800",
            "border border-ink-500/60",
            "shadow-[0_30px_80px_-20px_rgba(8,8,24,0.7),inset_0_1px_0_0_rgba(255,255,255,0.08),inset_0_-1px_0_0_rgba(0,0,0,0.4)]",
            "p-1.5 md:p-2.5"
          )}
        >
          {/* Inner aluminum ring for a more layered bezel look. */}
          <div
            className={cn(
              "relative rounded-[1.4rem] md:rounded-[1.85rem]",
              "ring-1 ring-inset ring-ink-500/40",
              "bg-ink-900",
              "p-0.5 md:p-1"
            )}
          >
            {/* Top-edge camera notch (centered on the long top bezel). */}
            <div
              aria-hidden="true"
              className="absolute top-0.5 md:top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-ink-900 ring-1 ring-ink-500/60"
            />

            {/* Screen */}
            <div
              className={cn(
                "relative w-full aspect-[4/3] rounded-2xl md:rounded-[1.55rem]",
                "bg-black overflow-hidden"
              )}
            >
              {children}

              {/* Glass sheen — opacity shifts with tilt (parallax). */}
              <div
                ref={sheenRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white to-transparent"
                style={{ opacity: 0.06 }}
              />
              {/* Second softer specular streak across the top edge. */}
              <div
                ref={streakRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white to-transparent"
                style={{ opacity: 0.06 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
