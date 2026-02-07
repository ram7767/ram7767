import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlassCard } from '@/components/glass/GlassCard';
import { useCountUp } from '@/hooks/useInView';
import { MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';

// Stat Card Component
function StatCard({ value, label, suffix = '', icon: Icon, delay = 0 }: {
  value: number;
  label: string;
  suffix?: string;
  icon: React.ElementType;
  delay?: number;
}) {
  const { ref, count } = useCountUp(value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.05] transition-colors">
        <Icon className="w-5 h-5 mx-auto mb-2 text-system-blue" />
        <div className="text-2xl font-bold font-mono text-white">
          {count}{suffix}
        </div>
        <div className="text-xs text-white/50 mt-1">{label}</div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center py-24"
    >
      <div className="container mx-auto px-6">
        <GlassCard
          className="max-w-5xl mx-auto p-8 md:p-12 lg:p-16"
          elevation="high"
        >
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left: Profile */}
            <motion.div
              className="lg:col-span-2 flex flex-col items-center"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Avatar with gradient border */}
              <div className="relative">
                <div
                  className="w-48 h-48 rounded-full p-1"
                  style={{
                    background: 'linear-gradient(135deg, oklch(60% 0.2 250) 0%, oklch(65% 0.2 40) 50%, oklch(70% 0.15 180) 100%)',
                  }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center overflow-hidden">
                    <span
                      className="text-7xl font-bold"
                      style={{
                        background: 'linear-gradient(135deg, oklch(60% 0.2 250) 0%, oklch(65% 0.2 40) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      RR
                    </span>
                  </div>
                </div>

                {/* Experience badge */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-bold text-sm"
                  style={{
                    background: 'linear-gradient(135deg, oklch(70% 0.15 180) 0%, oklch(60% 0.2 250) 100%)',
                    color: 'black',
                  }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.5 }}
                >
                  3+ Years
                </motion.div>

                {/* Glow effect */}
                <div
                  className="absolute -inset-4 rounded-full blur-2xl opacity-20 -z-10"
                  style={{
                    background: 'linear-gradient(135deg, oklch(60% 0.2 250) 0%, oklch(65% 0.2 40) 100%)',
                  }}
                />
              </div>

              {/* Location */}
              <div className="mt-6 flex items-center gap-2 text-white/50">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Bengaluru, India</span>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              className="lg:col-span-3 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-2">
                  About <span className="gradient-text">Me</span>
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-system-blue to-system-orange rounded-full" />
              </div>

              <p className="text-lg text-white/70 leading-relaxed">
                I'm a Mobile Developer with{' '}
                <span className="text-system-teal font-medium">3+ years</span> of experience
                crafting scalable mobile applications. I specialize in{' '}
                <span className="text-system-blue font-medium">iOS (Swift & SwiftUI)</span>,{' '}
                <span className="text-system-orange font-medium">Flutter</span>, and{' '}
                <span className="text-system-teal font-medium">Cross-platform development</span>.
                I bridge the gap between design and implementation, ensuring seamless user experiences.
              </p>

              <p className="text-white/60 leading-relaxed">
                Currently at <span className="text-white font-medium">SoftSuave Technology</span> as{' '}
                <span className="text-system-blue font-medium">Team Lead</span>, I lead
                cross-functional teams and architect robust applications. I'm passionate about
                clean code, performance optimization, and building apps that users love.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <StatCard
                  value={3}
                  label="Years Exp"
                  suffix="+"
                  icon={Briefcase}
                  delay={0.4}
                />
                <StatCard
                  value={20}
                  label="Projects"
                  suffix="+"
                  icon={Award}
                  delay={0.5}
                />
                <StatCard
                  value={15}
                  label="Technologies"
                  suffix="+"
                  icon={GraduationCap}
                  delay={0.6}
                />
                <StatCard
                  value={500}
                  label="K+ Users"
                  icon={Award}
                  delay={0.7}
                />
              </div>
            </motion.div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
