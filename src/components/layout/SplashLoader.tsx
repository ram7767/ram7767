import { useEffect, useState } from "react";

/**
 * Full-screen splash overlay. Shows on EVERY page load (no session cache).
 *
 * Lifecycle:
 *   - Mounts visible (covers everything with bg-ink-900, z-100).
 *   - Min visible: 1200ms (user always perceives the splash).
 *   - Max visible: 2400ms (hard cap for slow loads).
 *   - Fade starts at max(MIN, window.load), capped at MAX.
 *   - Fade duration: 400ms. Unmounts 50ms after fade completes.
 *   - prefers-reduced-motion: clamped to ~600ms total, animations disabled.
 */

const MIN_VISIBLE_MS = 1200;
const MAX_VISIBLE_MS = 2400;
const FADE_MS = 400;
const REDUCED_TOTAL_MS = 600;

const STYLE = `
@keyframes sl-tile-in {
  0%   { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1);   opacity: 1; }
}
@keyframes sl-bar-grow {
  0%   { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}
@keyframes sl-fade-out {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes sl-ring-pulse {
  0%, 100% { transform: scale(1);    opacity: 0.7; }
  50%      { transform: scale(1.08); opacity: 0.35; }
}
.sl-tile { animation: sl-tile-in 400ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.sl-bar  { animation: sl-bar-grow 1200ms cubic-bezier(0.4, 0.0, 0.2, 1) both;
           transform-origin: left center; }
.sl-fade { animation: sl-fade-out 400ms ease-out forwards; }
.sl-ring { animation: sl-ring-pulse 1.8s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .sl-tile, .sl-bar, .sl-ring { animation: none !important; }
  .sl-bar { transform: scaleX(1); }
  .sl-fade { animation: none !important; opacity: 0 !important; }
}
`;

function readReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SplashLoader() {
  const [fading, setFading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    const reduced = readReducedMotion();

    // Reduced-motion: short visible window, instant fade (no animation).
    if (reduced) {
      const visibleTimer = window.setTimeout(() => setFading(true), REDUCED_TOTAL_MS);
      const unmountTimer = window.setTimeout(() => setDone(true), REDUCED_TOTAL_MS + 50);
      return () => {
        window.clearTimeout(visibleTimer);
        window.clearTimeout(unmountTimer);
      };
    }

    const mountTime = performance.now();
    let minReached = false;
    let loadFired = false;
    let triggered = false;
    let unmountTimer: number | undefined;

    const startFade = () => {
      if (triggered) return;
      triggered = true;
      window.removeEventListener("load", onLoad);
      setFading(true);
      unmountTimer = window.setTimeout(() => setDone(true), FADE_MS + 50);
    };

    const maybeStart = () => {
      if (minReached && loadFired) startFade();
    };

    // Min-visible timer — guarantees the user perceives the splash.
    const minTimer = window.setTimeout(() => {
      minReached = true;
      maybeStart();
    }, MIN_VISIBLE_MS);

    // Hard cap — never sit on the splash forever.
    const maxTimer = window.setTimeout(() => {
      const elapsed = performance.now() - mountTime;
      // Force fade at MAX even if window.load hasn't fired yet.
      void elapsed;
      startFade();
    }, MAX_VISIBLE_MS);

    const onLoad = () => {
      loadFired = true;
      maybeStart();
    };

    if (document.readyState === "complete") {
      // Already loaded before we attached the listener — treat as fired now.
      loadFired = true;
      // Don't start fade yet; min timer must still elapse.
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
      if (unmountTimer !== undefined) window.clearTimeout(unmountTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (done) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink-900 ${
        fading ? "sl-fade" : ""
      }`}
    >
      <style>{STYLE}</style>

      <div className="flex flex-col items-center gap-6">
        {/* Brand circle with pulsing ring */}
        <div className="relative flex items-center justify-center">
          <span
            aria-hidden="true"
            className="sl-ring absolute h-24 w-24 rounded-full ring-1 ring-brand-500/30"
          />
          <div className="sl-tile relative h-20 w-20 rounded-full bg-brand-gradient shadow-glow flex items-center justify-center">
            <span className="text-white font-extrabold text-4xl leading-none tracking-tight select-none">
              R
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-px w-20 overflow-hidden rounded-full bg-white/10">
          <div className="sl-bar h-full w-full bg-brand-gradient" />
        </div>

        {/* Label */}
        <span className="text-xs font-mono uppercase tracking-widest text-ink-400">
          loading
        </span>
      </div>
    </div>
  );
}
