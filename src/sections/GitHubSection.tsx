import React from 'react';
import { Github, GitCommit, GitBranch, Star, Calendar, TrendingUp } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useGitHubContributions } from '@/hooks/useGitHubContributions';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const GitHubSection: React.FC = () => {
  const { data } = usePortfolio();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { contributions, loading, totalContributions, streak } = useGitHubContributions(
    data?.githubUsername
  );

  if (!data) return null;

  // Group contributions by week for the grid
  const weeks: typeof contributions[] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const getLevelColor = (level: number) => {
    const colors = {
      0: 'bg-[#112240]',
      1: 'bg-[#8b5cf6]/30',
      2: 'bg-[#8b5cf6]/50',
      3: 'bg-[#8b5cf6]/70',
      4: 'bg-[#8b5cf6]',
    };
    return colors[level as keyof typeof colors] || colors[0];
  };

  return (
    <section id="github" ref={ref} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8b5cf6]/5 via-transparent to-[#8b5cf6]/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-[#8b5cf6] font-medium mb-2">Open Source</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">GitHub Contributions</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#64ffda] mx-auto rounded-full mb-6" />
          <p className="text-[#8892b0] max-w-2xl mx-auto">
            My coding activity and contributions to the open-source community.
          </p>
        </div>

        {/* GitHub Stats Cards */}
        <div
          className={`grid md:grid-cols-4 gap-6 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="p-6 bg-[#112240] border border-[#8b5cf6]/20 rounded-xl">
            <GitCommit className="w-8 h-8 text-[#8b5cf6] mb-3" />
            <p className="text-3xl font-bold text-white mb-1">
              {loading ? '...' : totalContributions.toLocaleString()}
            </p>
            <p className="text-[#8892b0] text-sm">Contributions</p>
          </div>
          <div className="p-6 bg-[#112240] border border-[#8b5cf6]/20 rounded-xl">
            <Calendar className="w-8 h-8 text-[#64ffda] mb-3" />
            <p className="text-3xl font-bold text-white mb-1">{loading ? '...' : streak}</p>
            <p className="text-[#8892b0] text-sm">Day Streak</p>
          </div>
          <div className="p-6 bg-[#112240] border border-[#8b5cf6]/20 rounded-xl">
            <GitBranch className="w-8 h-8 text-[#8b5cf6] mb-3" />
            <p className="text-3xl font-bold text-white mb-1">50+</p>
            <p className="text-[#8892b0] text-sm">Repositories</p>
          </div>
          <div className="p-6 bg-[#112240] border border-[#8b5cf6]/20 rounded-xl">
            <Star className="w-8 h-8 text-[#64ffda] mb-3" />
            <p className="text-3xl font-bold text-white mb-1">100+</p>
            <p className="text-[#8892b0] text-sm">Stars Earned</p>
          </div>
        </div>

        {/* Contribution Graph */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="p-6 bg-[#112240] border border-[#8b5cf6]/20 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Github className="w-5 h-5" />
                Contribution Graph
              </h3>
              <a
                href={data.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#8b5cf6] hover:underline flex items-center gap-1"
              >
                View Profile
                <TrendingUp className="w-4 h-4" />
              </a>
            </div>

            {loading ? (
              <div className="h-32 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#8b5cf6] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {/* Contribution Grid */}
                <div className="overflow-x-auto pb-4">
                  <div className="flex gap-1 min-w-max">
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day, dayIndex) => (
                          <div
                            key={`${weekIndex}-${dayIndex}`}
                            className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} transition-all hover:scale-125 hover:ring-2 hover:ring-[#8b5cf6]`}
                            title={`${day.date}: ${day.count} contributions`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 mt-4 text-sm text-[#8892b0]">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
                    />
                  ))}
                  <span>More</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <a
            href={data.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#8b5cf6] text-white rounded-lg font-medium hover:bg-[#7c3aed] transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#8b5cf6]/30"
          >
            <Github className="w-5 h-5" />
            Follow Me on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
