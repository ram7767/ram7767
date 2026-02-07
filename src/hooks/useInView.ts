import { useState, useEffect, useRef, type RefObject } from 'react';

interface UseInViewOptions {
    threshold?: number | number[];
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
    options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
    const { threshold = 0.2, rootMargin = '0px', triggerOnce = false } = options;
    const ref = useRef<T | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsInView(false);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isInView];
}

// Hook for staggered children animation
export function useStaggeredAnimation(
    itemCount: number,
    baseDelay: number = 100
) {
    const [visibleItems, setVisibleItems] = useState<boolean[]>(
        new Array(itemCount).fill(false)
    );
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Stagger the animations
                    for (let i = 0; i < itemCount; i++) {
                        setTimeout(() => {
                            setVisibleItems(prev => {
                                const next = [...prev];
                                next[i] = true;
                                return next;
                            });
                        }, i * baseDelay);
                    }
                    observer.unobserve(container);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, [itemCount, baseDelay]);

    return { containerRef, visibleItems };
}

// Hook for counting animation
export function useCountUp(
    end: number,
    duration: number = 2000,
    start: number = 0
) {
    const [count, setCount] = useState(start);
    const [isAnimating, setIsAnimating] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isAnimating) {
                    setIsAnimating(true);

                    const startTime = Date.now();
                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Easing function (ease-out cubic)
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const currentCount = Math.floor(start + (end - start) * easeOut);

                        setCount(currentCount);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    requestAnimationFrame(animate);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [end, duration, start, isAnimating]);

    return { ref, count };
}
