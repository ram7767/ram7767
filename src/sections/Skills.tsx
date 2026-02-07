import React, { useState } from 'react';
import { ChevronDown, Code2, Layers, Database, Cloud, GitBranch, Smartphone, TestTube, Rocket, FolderGit, Briefcase, CreditCard } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { SkillCategory } from '@/types';

const categoryIcons: Record<string, React.ElementType> = {
  'Languages & Frameworks': Code2,
  'Architectures': Layers,
  'Concurrency': Rocket,
  'Databases & Cloud': Database,
  'Backend Integration': Cloud,
  'APIs & Networking': GitBranch,
  'Mobile UI/UX': Smartphone,
  'Testing': TestTube,
  'DevOps': Rocket,
  'Version Control': FolderGit,
  'Project Management': Briefcase,
  'Payments': CreditCard,
};

const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (!data) return null;

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <section id="skills" ref={ref} className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-system-blue to-system-orange font-medium mb-2">My Expertise</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-system-blue to-system-orange mx-auto rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.skills.map((category: SkillCategory, categoryIndex: number) => {
            const Icon = categoryIcons[category.category] || Code2;
            const isExpanded = expandedCategory === category.category;

            return (
              <div
                key={category.category}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${categoryIndex * 100}ms` }}
              >
                <div
                  className={`bg-[#112240] border border-[#8b5cf6]/20 rounded-xl overflow-hidden transition-all hover:border-[#8b5cf6]/50 ${isExpanded ? 'ring-2 ring-[#8b5cf6]/30' : ''
                    }`}
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.category)}
                    className="w-full p-5 flex items-center justify-between hover:bg-[#8b5cf6]/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#8b5cf6]/20 rounded-lg">
                        <Icon className="w-5 h-5 text-system-blue" />
                      </div>
                      <h3 className="text-lg font-semibold text-white text-left">
                        {category.category}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#8892b0] transition-transform ${isExpanded ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {/* Skills List */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[800px]' : 'max-h-0'
                      }`}
                  >
                    <div className="p-5 pt-0 space-y-4">
                      {category.items.map((skill, skillIndex) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-white font-medium">{skill.name}</span>
                              <span className="text-[#8892b0] text-xs ml-2">{skill.tagline}</span>
                            </div>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-system-blue to-system-orange font-mono text-sm">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-[#0a192f] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-system-blue to-system-orange rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: isExpanded ? `${skill.level}%` : '0%',
                                transitionDelay: `${skillIndex * 100}ms`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preview (when collapsed) */}
                  {!isExpanded && (
                    <div className="px-5 pb-5">
                      <div className="flex flex-wrap gap-2">
                        {category.items.slice(0, 4).map((skill) => (
                          <span
                            key={skill.name}
                            className="px-2 py-1 text-xs bg-system-blue/10 text-system-blue rounded"
                          >
                            {skill.name}
                          </span>
                        ))}
                        {category.items.length > 4 && (
                          <span className="px-2 py-1 text-xs bg-[#8b5cf6]/10 text-[#8892b0] rounded">
                            +{category.items.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div
          className={`mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {[
            { label: 'Technologies', value: '50+' },
            { label: 'Skill Categories', value: '12' },
            { label: 'Years Experience', value: '3+' },
            { label: 'Projects Completed', value: '20+' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 bg-[#112240]/50 rounded-lg border border-[#8b5cf6]/10"
            >
              <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-system-blue to-system-orange mb-1">{stat.value}</p>
              <p className="text-[#8892b0] text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
