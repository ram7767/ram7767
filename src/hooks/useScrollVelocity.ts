import { useState, useEffect, useRef } from 'react';

interface ScrollVelocity {
    velocity: number;
    direction: 'up' | 'down' | 'none';
    isScrolling: boolean;
}

export function useScrollVelocity() {
    const [scrollVelocity, setScrollVelocity] = useState<ScrollVelocity>({
        velocity: 0,
        direction: 'none',
        isScrolling: false,
    });

    const lastScrollY = useRef(0);
    const lastTime = useRef(Date.now());
    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const currentTime = Date.now();
            const timeDelta = currentTime - lastTime.current;

            if (timeDelta > 0) {
                const scrollDelta = currentScrollY - lastScrollY.current;
                const velocity = Math.abs(scrollDelta / timeDelta) * 100;
                const direction = scrollDelta > 0 ? 'down' : scrollDelta < 0 ? 'up' : 'none';

                setScrollVelocity({
                    velocity,
                    direction,
                    isScrolling: true,
                });

                lastScrollY.current = currentScrollY;
                lastTime.current = currentTime;
            }

            // Clear existing timeout
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            // Set new timeout to detect scroll end
            scrollTimeout.current = setTimeout(() => {
                setScrollVelocity(prev => ({
                    ...prev,
                    velocity: 0,
                    isScrolling: false,
                }));
            }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, []);

    return scrollVelocity;
}

// Hook for scroll direction detection (for nav hide/show)
export function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
    const [isAtTop, setIsAtTop] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setIsAtTop(currentScrollY < 50);

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setScrollDirection('down');
            } else if (currentScrollY < lastScrollY.current) {
                setScrollDirection('up');
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { scrollDirection, isAtTop };
}

// Hook for scroll progress (0 to 1)
export function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
            setProgress(Math.min(1, Math.max(0, scrollProgress)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return progress;
}

// Hook for section visibility
export function useSectionVisibility(ref: React.RefObject<HTMLElement | null>, threshold: number = 0.2) {
    const [isVisible, setIsVisible] = useState(false);
    const [visibilityRatio, setVisibilityRatio] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                setVisibilityRatio(entry.intersectionRatio);
            },
            {
                threshold: [0, 0.25, 0.5, 0.75, 1],
                rootMargin: '0px',
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [ref, threshold]);

    return { isVisible, visibilityRatio };
}

// Hook for parallax effect
export function useParallax(speed: number = 0.5) {
    const [offset, setOffset] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = elementCenter - viewportCenter;

            setOffset(distance * speed);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return { ref, offset };
}
