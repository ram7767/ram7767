import { useEffect, useRef, useState, type ReactNode } from "react";
import GradientButton from "./GradientButton";
import { cn } from "../../lib/cn";
import { downloadResume } from "../../lib/resume";

type Size = "sm" | "md" | "lg";
type Variant = "solid" | "ghost";

type ResumeButtonProps = {
  size?: Size;
  variant?: Variant;
  children?: ReactNode;
  leadingIcon?: ReactNode;
  className?: string;
};

const DefaultDownloadIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
);

export default function ResumeButton({
  size = "md",
  variant = "solid",
  children = "Download Resume",
  leadingIcon,
  className,
}: ResumeButtonProps) {
  const [toastVisible, setToastVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    downloadResume();
    setToastVisible(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToastVisible(false);
      timerRef.current = null;
    }, 2500);
  };

  return (
    <>
      <GradientButton
        size={size}
        variant={variant}
        onClick={handleClick}
        leadingIcon={leadingIcon ?? <DefaultDownloadIcon />}
        className={className}
      >
        {children}
      </GradientButton>

      <div
        aria-live="polite"
        role="status"
        className={cn(
          "fixed top-6 right-6 z-[60] pointer-events-none",
          "transition-all duration-300 ease-out",
          toastVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2"
        )}
      >
        <div className="glass-strong rounded-full px-4 py-2 text-sm text-ink-50 shadow-glow inline-flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          Resume downloading&hellip;
        </div>
      </div>
    </>
  );
}
