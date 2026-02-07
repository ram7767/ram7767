import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

// Typewriter component for iPad code display
function TypewriterCode() {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);

    const codeLines = [
        { text: 'class Developer {', color: 'text-orange-400' },
        { text: '  let name = "Ram Raju"', color: 'text-purple-300' },
        { text: '  let role = "Mobile Team Lead"', color: 'text-purple-300' },
        { text: '  let experience = "3+ years"', color: 'text-purple-300' },
        { text: '  let expertise = ["iOS", "Flutter"]', color: 'text-purple-300' },
        { text: '', color: 'text-white' },
        { text: '  func buildAmazingApps() -> String {', color: 'text-blue-400' },
        { text: '    return "Exceptional UX"', color: 'text-green-300' },
        { text: '  }', color: 'text-blue-400' },
        { text: '}', color: 'text-orange-400' },
    ];

    useEffect(() => {
        if (currentLine >= codeLines.length) return;

        const line = codeLines[currentLine].text;

        if (currentChar < line.length) {
            const timeout = setTimeout(() => {
                setDisplayedLines(prev => {
                    const newLines = [...prev];
                    if (newLines[currentLine] === undefined) {
                        newLines[currentLine] = '';
                    }
                    newLines[currentLine] = line.substring(0, currentChar + 1);
                    return newLines;
                });
                setCurrentChar(prev => prev + 1);
            }, 50);

            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
                setCurrentChar(0);
            }, 200);

            return () => clearTimeout(timeout);
        }
    }, [currentLine, currentChar, codeLines]);

    return (
        <div className="font-mono text-base space-y-2">
            {codeLines.map((line, index) => (
                <div key={index} className={line.color}>
                    {displayedLines[index] || ''}
                    {index === currentLine && (
                        <span className="inline-block w-2 h-5 bg-system-blue ml-0.5 animate-pulse" />
                    )}
                </div>
            ))}
        </div>
    );
}

// iPad Mockup (Landscape orientation)
export function PhoneMockup() {
    const padRef = useRef<HTMLDivElement>(null);
    const { normalizedX, normalizedY } = useMousePosition();

    // Subtle rotation based on mouse position for iPad
    const rotateY = normalizedX * 12;
    const rotateX = -normalizedY * 8;

    return (
        <motion.div
            ref={padRef}
            className="relative w-[500px] h-[380px]"
            initial={{ opacity: 0, rotateY: 35, rotateX: 15, y: 100 }}
            animate={{
                opacity: 1,
                rotateY,
                rotateX,
                y: 0,
            }}
            transition={{
                opacity: { duration: 1 },
                rotateY: { type: 'spring', stiffness: 100, damping: 30 },
                rotateX: { type: 'spring', stiffness: 100, damping: 30 },
                y: { duration: 1, delay: 0.3 }
            }}
            style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
        >
            {/* iPad Frame */}
            <div
                className="absolute inset-0 rounded-[2.5rem]"
                style={{
                    background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)',
                    boxShadow: `
            0 30px 60px -15px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
                }}
            />

            {/* Screen */}
            <div className="absolute inset-3 rounded-[2rem] overflow-hidden bg-black">
                {/* Screen Content - Xcode on iPad */}
                <div className="p-6 h-full bg-gradient-to-b from-gray-900 to-black flex flex-col">
                    {/* Xcode Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <span className="ml-3 text-sm text-white/40">Developer.swift</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-system-blue animate-pulse" />
                            <span className="text-xs text-white/40">Build Succeeded</span>
                        </div>
                    </div>

                    {/* Swift Code with more room */}
                    <div className="flex-1 overflow-hidden">
                        <TypewriterCode />
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between text-xs text-white/30">
                            <span>Swift 5.9 • iOS 17.0+</span>
                            <span>RAM RAJU</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reflection overlay */}
            <div
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.04) 100%)',
                }}
            />

            {/* Glow effect */}
            <div
                className="absolute -inset-6 rounded-[3rem] blur-3xl opacity-30 -z-10"
                style={{
                    background: 'linear-gradient(135deg, oklch(60% 0.2 250) 0%, oklch(65% 0.2 40) 100%)',
                }}
            />
        </motion.div>
    );
}
