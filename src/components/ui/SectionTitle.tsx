import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  gradientWord?: string;
  subtitle?: ReactNode;
  center?: boolean;
  className?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  gradientWord,
  subtitle,
  center = false,
  className,
}: SectionTitleProps) {
  const renderTitle = () => {
    if (!gradientWord || typeof title !== "string") {
      if (gradientWord && typeof title === "string") {
        // fall-through (shouldn't hit)
      }
      return title;
    }
    const parts = (title as string).split(gradientWord);
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && (
          <span className="gradient-text">{gradientWord}</span>
        )}
      </span>
    ));
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        center && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-300/90">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink-50 leading-tight">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-ink-300 text-base sm:text-lg max-w-2xl",
            center && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
