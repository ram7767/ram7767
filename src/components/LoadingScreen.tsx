import React, { useEffect, useState } from 'react';
import { Code2, Smartphone, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const texts = ['Loading Portfolio...', 'Preparing Assets...', 'Initializing...'];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a192f]">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8b5cf6]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#64ffda]/5 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#8b5cf6]/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="relative w-32 h-32">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-[#8b5cf6]/30 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-2 border-4 border-[#64ffda]/20 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Smartphone className="w-12 h-12 text-[#8b5cf6] animate-bounce" />
                <Code2 className="absolute -bottom-1 -right-1 w-6 h-6 text-[#64ffda]" />
                <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-[#a78bfa] animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
          <span className="text-[#8b5cf6]">Ram</span> Raju
        </h1>
        <p className="text-[#8892b0] text-sm md:text-base mb-8">iOS & Flutter Developer</p>

        {/* Progress Bar */}
        <div className="w-64 md:w-80 h-2 bg-[#112240] rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#64ffda] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Loading Text */}
        <p className="text-[#8892b0] text-sm animate-pulse">
          {texts[currentText]}
        </p>

        {/* Percentage */}
        <p className="text-[#64ffda] text-lg font-mono mt-2">
          {Math.min(Math.round(progress), 100)}%
        </p>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#8b5cf6]/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
