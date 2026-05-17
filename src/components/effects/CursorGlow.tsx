import { useEffect, useRef, useState } from "react";

// A soft brand-gradient radial glow that follows the cursor. Touch devices
// (no hover) skip the effect; reduced-motion users get a static centered glow.
export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const glowRef = useRef<HTMLDivElement | null>(null);
  // Target = where the cursor is right now. Current = where the glow has
  // eased to. Both live in refs so we never re-render per frame.
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
    setSupportsHover(!window.matchMedia("(hover: none)").matches);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!mounted || !supportsHover) return;

    // Start centered so the first frame doesn't snap from (0,0).
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    target.current = { x: cx, y: cy };
    current.current = { x: cx, y: cy };

    if (reducedMotion) {
      // Static centered glow — just place it once, no rAF loop.
      const el = glowRef.current;
      if (el) {
        el.style.transform = `translate3d(${cx - 260}px, ${cy - 260}px, 0)`;
      }
      return;
    }

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const tick = () => {
      const el = glowRef.current;
      if (el) {
        // Lerp toward target. 0.12 ≈ ~7-frame catch-up at 60fps.
        current.current.x += (target.current.x - current.current.x) * 0.12;
        current.current.y += (target.current.y - current.current.y) * 0.12;
        // Offset by half the glow size (520/2 = 260) so the glow centers on cursor.
        el.style.transform = `translate3d(${current.current.x - 260}px, ${current.current.y - 260}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [mounted, supportsHover, reducedMotion]);

  if (!mounted || !supportsHover) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[520px] h-[520px] rounded-full blur-3xl opacity-30 bg-brand-gradient will-change-transform"
      />
    </div>
  );
}
