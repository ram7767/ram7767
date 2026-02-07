import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, oklch(12% 0.01 270) 0%, oklch(18% 0.02 260) 100%)',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Android-style loader with R initial */}
      <div className="relative">
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-system-blue/30 border-t-system-blue"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-system-blue font-bold text-lg">R</span>
        </div>
      </div>

      <motion.p
        className="mt-6 text-white/60 font-mono text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Initializing...
      </motion.p>

      {/* Progress bar */}
      <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-system-blue to-system-orange rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <p className="mt-2 text-white/40 font-mono text-xs">
        {Math.min(Math.round(progress), 100)}%
      </p>
    </motion.div>
  );
}

export default LoadingScreen;
