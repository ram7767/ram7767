import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type TagProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export default function Tag({ children, icon, className }: TagProps) {
  return (
    <span
      className={cn(
        "glass inline-flex items-center gap-1.5 rounded-full px-3 py-1",
        "text-xs font-medium text-ink-100",
        "border-white/10 hover:border-brand-500/40 transition-colors",
        className
      )}
    >
      {icon && (
        <span className="inline-flex h-3.5 w-3.5 items-center text-brand-300" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
