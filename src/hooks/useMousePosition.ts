import { useState, useEffect, type RefObject } from 'react';

interface MousePosition {
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
}

export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: 0,
        y: 0,
        normalizedX: 0,
        normalizedY: 0,
    });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const normalizedX = (clientX / window.innerWidth) * 2 - 1;
            const normalizedY = (clientY / window.innerHeight) * 2 - 1;

            setMousePosition({
                x: clientX,
                y: clientY,
                normalizedX,
                normalizedY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return mousePosition;
}

// Hook for magnetic button effect
export function useMagneticEffect(ref: RefObject<HTMLElement | null>, strength: number = 0.3) {
    const [transform, setTransform] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            // Only apply effect within 100px radius
            if (distance < 100) {
                const factor = (1 - distance / 100) * strength;
                setTransform({
                    x: distanceX * factor,
                    y: distanceY * factor,
                });
            } else {
                setTransform({ x: 0, y: 0 });
            }
        };

        const handleMouseLeave = () => {
            setTransform({ x: 0, y: 0 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref, strength]);

    return transform;
}

// Hook for 3D tilt effect
export function useTiltEffect(ref: RefObject<HTMLElement | null>, maxRotation: number = 5) {
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const percentX = (e.clientX - centerX) / (rect.width / 2);
            const percentY = (e.clientY - centerY) / (rect.height / 2);

            setTilt({
                rotateX: -percentY * maxRotation,
                rotateY: percentX * maxRotation,
            });
        };

        const handleMouseLeave = () => {
            setTilt({ rotateX: 0, rotateY: 0 });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref, maxRotation]);

    return tilt;
}

// Hook for element position relative to viewport
export function useElementPosition(ref: RefObject<HTMLElement | null>) {
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const updatePosition = () => {
            const rect = element.getBoundingClientRect();
            setPosition({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                height: rect.height,
            });
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [ref]);

    return position;
}
