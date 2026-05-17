import { useEffect, useRef } from "react";

// Fixed top progress bar that grows from 0 -> 1 as the page scrolls. All
// updates happen via direct DOM writes inside a single rAF per scroll burst;
// no React state per frame.
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      ticking.current = false;
      const bar = barRef.current;
      const wrap = wrapRef.current;
      if (!bar || !wrap) return;

      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = (doc.scrollHeight - window.innerHeight) || 1;
      const progress = Math.min(1, Math.max(0, scrollTop / max));

      bar.style.transform = `scaleX(${progress})`;
      wrap.style.opacity = scrollTop > 8 ? "1" : "0";
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    // Prime once so first paint matches current scroll position.
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-0.5 z-50 pointer-events-none opacity-0 transition-opacity duration-300"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-brand-gradient rounded-full shadow-[0_0_12px_rgba(108,99,255,0.55)] origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
