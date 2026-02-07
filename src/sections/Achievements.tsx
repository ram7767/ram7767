import React from 'react';
import { Trophy, Apple, GitBranch, Users, Award, Star, Medal, Target } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Achievement } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  trophy: Trophy,
  apple: Apple,
  'git-branch': GitBranch,
  users: Users,
  award: Award,
  star: Star,
  medal: Medal,
  target: Target,
};

const Achievements: React.FC = () => {
  const { data } = usePortfolio();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  if (!data) return null;

  return (
    <section id="achievements" ref={ref} className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-system-blue to-system-orange font-medium mb-2">Recognition</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Achievements & Awards</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-system-blue to-system-orange mx-auto rounded-full mb-6" />
          <p className="text-[#8892b0] max-w-2xl mx-auto">
            Celebrating milestones and recognition for excellence in mobile development.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {data.achievements.map((achievement: Achievement, index: number) => {
            const Icon = iconMap[achievement.icon] || Trophy;

            return (
              <div
                key={achievement.title}
                className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-full p-6 bg-[#112240] border border-[#8b5cf6]/20 rounded-2xl overflow-hidden transition-all hover:border-[#8b5cf6]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8b5cf6]/10">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative flex gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-system-orange to-system-blue rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-system-blue group-hover:to-system-orange transition-colors">
                          {achievement.title}
                        </h3>
                      </div>
                      <p className="text-transparent bg-clip-text bg-gradient-to-r from-system-orange to-system-blue text-sm font-medium mb-3">{achievement.date}</p>
                      <p className="text-[#8892b0]">{achievement.description}</p>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#8b5cf6]/10 to-transparent rounded-bl-full" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Stats */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {[
            { icon: Trophy, label: 'Awards Won', value: '4+' },
            { icon: Star, label: 'Recognitions', value: '10+' },
            { icon: Medal, label: 'Certifications', value: '5+' },
            { icon: Target, label: 'Goals Achieved', value: '100%' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-[#112240]/50 rounded-xl border border-[#8b5cf6]/10 hover:border-[#8b5cf6]/30 transition-all"
            >
              <stat.icon className="w-8 h-8 text-system-blue mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-[#8892b0] text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
