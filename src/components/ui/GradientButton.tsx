import type { ReactNode, MouseEvent, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

type Variant = "solid" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

type AsAnchor = CommonProps & {
  href: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "className">;

type AsButton = CommonProps & {
  href?: undefined;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type" | "className">;

export type GradientButtonProps = AsAnchor | AsButton;

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export default function GradientButton(props: GradientButtonProps) {
  const {
    children,
    className,
    variant = "solid",
    size = "md",
    leadingIcon,
    trailingIcon,
  } = props;

  const base = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight",
    "select-none whitespace-nowrap cursor-pointer",
    "transition-all duration-300",
    "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:outline-none",
    sizeClasses[size]
  );

  const solid = cn(
    "text-white shadow-glow",
    "bg-brand-gradient",
    "[background-size:200%_200%] [background-position:0%_50%]",
    "hover:[background-position:100%_50%]",
    "hover:shadow-[0_12px_40px_-10px_rgba(108,99,255,0.75)]"
  );

  const ghost = cn(
    "glass text-ink-50",
    "hover:border-brand-500/40 hover:text-white"
  );

  const classes = cn(base, variant === "solid" ? solid : ghost, className);

  const inner = (
    <>
      {leadingIcon && (
        <span className="inline-flex items-center" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      <span className="relative z-10">{children}</span>
      {trailingIcon && (
        <span className="inline-flex items-center" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </>
  );

  const motionProps = {
    whileHover: { y: -1 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 320, damping: 22 },
  };

  if ("href" in props && props.href !== undefined) {
    const { href, onClick, leadingIcon: _li, trailingIcon: _ti, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props as AsAnchor & { leadingIcon?: ReactNode; trailingIcon?: ReactNode };
    void _li; void _ti; void _v; void _s; void _c; void _ch;
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={classes}
        {...motionProps}
        {...(rest as Record<string, unknown>)}
      >
        {inner}
      </motion.a>
    );
  }

  const { onClick, type = "button", leadingIcon: _li, trailingIcon: _ti, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as AsButton & { leadingIcon?: ReactNode; trailingIcon?: ReactNode };
  void _li; void _ti; void _v; void _s; void _c; void _ch;
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      {...motionProps}
      {...(rest as Record<string, unknown>)}
    >
      {inner}
    </motion.button>
  );
}
