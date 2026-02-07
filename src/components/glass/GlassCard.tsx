import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    elevation?: 'low' | 'medium' | 'high';
    tilt?: boolean;
    onClick?: () => void;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className, elevation = 'low', tilt = false, onClick }, ref) => {
        const elevationClasses = {
            low: 'bg-white/[0.03] border-white/10',
            medium: 'bg-white/[0.05] border-white/15 shadow-glass',
            high: 'bg-white/[0.08] border-white/20 shadow-glass-colored',
        };

        return (
            <div
                ref={ref}
                onClick={onClick}
                className={cn(
                    'glass-card',
                    elevationClasses[elevation],
                    tilt && 'tilt-card',
                    className
                )}
            >
                {children}
            </div>
        );
    }
);

GlassCard.displayName = 'GlassCard';

interface GlassButtonProps {
    children: ReactNode;
    variant?: 'default' | 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    onClick?: () => void;
    className?: string;
}

export function GlassButton({
    children,
    variant = 'default',
    size = 'md',
    href,
    onClick,
    className,
}: GlassButtonProps) {
    const baseClasses = 'glass-button inline-flex items-center justify-center font-medium transition-all';

    const variantClasses = {
        default: '',
        primary: 'btn-primary',
        secondary: 'bg-white/10 hover:bg-white/20',
    };

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const Component = href ? 'a' : 'button';

    return (
        <Component
            href={href}
            onClick={onClick}
            className={cn(
                baseClasses,
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
        >
            {children}
        </Component>
    );
}
