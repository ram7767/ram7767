import type { ReactNode, ElementType, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

type GlassCardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  hoverable?: boolean;
  padded?: boolean;
  strong?: boolean;
};

export default function GlassCard({
  children,
  className,
  as,
  hoverable = false,
  padded = true,
  strong = false,
  ...rest
}: GlassCardProps) {
  const Tag = (as ?? "div") as ElementType;
  const MotionTag = motion(Tag);

  const base = cn(
    strong ? "glass-strong" : "glass",
    "rounded-2xl",
    padded && "p-6 sm:p-8",
    "transition-all duration-300 will-change-transform",
    hoverable &&
      "hover:-translate-y-1 hover:shadow-glow hover:border-brand-500/40 cursor-pointer",
    className
  );

  if (hoverable) {
    return (
      <MotionTag
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={base}
        {...(rest as Record<string, unknown>)}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <Tag className={base} {...rest}>
      {children}
    </Tag>
  );
}
