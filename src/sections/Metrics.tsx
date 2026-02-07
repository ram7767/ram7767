import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlassCard } from '@/components/glass/GlassCard';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Code2, GitBranch, Rocket, Users, Trophy, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Metric {
    id: string;
    icon: React.ElementType;
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    description: string;
    color: string;
    gradient: string;
}

const metrics: Metric[] = [
    {
        id: 'experience',
        icon: Trophy,
        value: 3,
        suffix: '+',
        label: 'Years Experience',
        description: 'Building production mobile apps',
        color: 'oklch(60% 0.2 250)',
        gradient: 'from-blue-600 to-blue-500',
    },
    {
        id: 'projects',
        icon: Rocket,
        value: 20,
        suffix: '+',
        label: 'Apps Launched',
        description: 'From concept to production',
        color: 'oklch(65% 0.2 40)',
        gradient: 'from-orange-600 to-orange-500',
    },
    {
        id: 'code',
        icon: Code2,
        value: 100,
        suffix: 'K+',
        label: 'Lines of Code',
        description: 'Written & reviewed',
        color: 'oklch(70% 0.15 180)',
        gradient: 'from-teal-600 to-teal-500',
    },
    {
        id: 'github',
        icon: Users,
        value: 50,
        suffix: '+',
        label: 'GitHub Followers',
        description: 'Open source community',
        color: 'oklch(60% 0.2 250)',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        id: 'technologies',
        icon: Zap,
        value: 15,
        suffix: '+',
        label: 'Technologies',
        description: 'Mastered & deployed',
        color: 'oklch(65% 0.2 40)',
        gradient: 'from-orange-500 to-yellow-500',
    },
    {
        id: 'impact',
        icon: Trophy,
        value: 500,
        suffix: 'K+',
        label: 'Users Impacted',
        description: 'Across all projects',
        color: 'oklch(70% 0.15 180)',
        gradient: 'from-teal-500 to-green-500',
    },
];

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
    const Icon = metric.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <GlassCard
                className="p-6 h-full hover:shadow-[0_0_40px_var(--tw-shadow-color)] transition-all duration-300 group"
                elevation="medium"
            >
                {/* Icon */}
                <div className="mb-4">
                    <div
                        className={cn(
                            'w-14 h-14 rounded-2xl flex items-center justify-center',
                            'bg-gradient-to-br',
                            metric.gradient,
                            'group-hover:scale-110 transition-transform duration-300'
                        )}
                    >
                        <Icon className="w-7 h-7 text-white" />
                    </div>
                </div>

                {/* Value */}
                <div className="mb-2">
                    <h3 className="text-4xl md:text-5xl font-bold text-white">
                        <AnimatedCounter
                            value={metric.value}
                            suffix={metric.suffix}
                            prefix={metric.prefix}
                            duration={2000}
                        />
                    </h3>
                </div>

                {/* Label */}
                <h4 className="text-lg font-semibold text-white mb-1">
                    {metric.label}
                </h4>

                {/* Description */}
                <p className="text-sm text-white/60">
                    {metric.description}
                </p>

                {/* Accent Line */}
                <div
                    className="h-1 w-16 mt-4 rounded-full"
                    style={{ backgroundColor: metric.color }}
                />
            </GlassCard>
        </motion.div>
    );
}

export default function Metrics() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            id="metrics"
            className="relative min-h-screen w-full flex items-center justify-center py-24"
        >
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Impact by <span className="gradient-text">Numbers</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Quantifiable achievements from building production-grade mobile applications
                    </p>
                    <div className="h-1 w-24 mx-auto mt-4 bg-gradient-to-r from-blue-600 via-orange-500 to-teal-500 rounded-full" />
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {metrics.map((metric, index) => (
                        <MetricCard key={metric.id} metric={metric} index={index} />
                    ))}
                </div>

                {/* GitHub Contribution Graph */}
                <motion.div
                    className="mt-16 max-w-6xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <GlassCard className="p-8" elevation="medium">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                GitHub <span className="gradient-text">Activity</span>
                            </h3>
                            <p className="text-white/60 text-sm">
                                Consistent contributions and open source engagement
                            </p>
                        </div>

                        <div className="flex justify-center items-center overflow-x-auto py-4">
                            <img
                                src="https://ghchart.rshah.org/4CAF50/ram7767"
                                alt="GitHub Contribution Graph"
                                className="rounded-lg"
                                style={{
                                    filter: 'brightness(1.1) contrast(1.1)',
                                    width: '100%',
                                    maxWidth: '900px',
                                    height: 'auto',
                                    transform: 'scale(1.3)',
                                    transformOrigin: 'center',
                                }}
                            />
                        </div>

                        <div className="mt-6 text-center">
                            <a
                                href="https://github.com/ram7767"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-600 rounded-xl transition-all text-white/80 hover:text-white"
                            >
                                <GitBranch className="w-4 h-4" />
                                <span>View GitHub Profile</span>
                            </a>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="text-white/40 text-sm">
                        These metrics represent real impact on real products used by thousands
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
