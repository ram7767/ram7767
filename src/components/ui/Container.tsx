import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className,
  ...rest
}: ContainerProps) {
  return (
    <div className={cn("max-w-6xl mx-auto px-5 sm:px-8", className)} {...rest}>
      {children}
    </div>
  );
}
