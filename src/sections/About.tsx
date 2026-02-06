import React from 'react';
import { GraduationCap, Briefcase, Calendar, Building2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const About: React.FC = () => {
  const { data } = usePortfolio();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  if (!data) return null;

  return (
    <section id="about" ref={ref} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8b5cf6]/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-[#8b5cf6] font-medium mb-2">Get To Know Me</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#64ffda] mx-auto rounded-full" />
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Intro */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Who I Am</h3>
            <p className="text-[#8892b0] leading-relaxed mb-6">{data.about.intro}</p>
            <p className="text-[#8892b0] leading-relaxed">{data.about.details}</p>
          </div>

          {/* Featured App */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative p-6 md:p-8 bg-[#112240] border border-[#8b5cf6]/20 rounded-2xl overflow-hidden group hover:border-[#8b5cf6]/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img
                      src={data.testimonials[0]?.image}
                      alt={data.featuredApp.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{data.featuredApp.name}</h4>
                    <p className="text-[#64ffda]">{data.featuredApp.tagline}</p>
                  </div>
                </div>

                <p className="text-[#8892b0] mb-4">{data.featuredApp.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {data.featuredApp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-[#8b5cf6]/20 text-[#8b5cf6] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-[#8892b0]">Rating</p>
                    <p className="text-white font-bold">{data.featuredApp.rating}/5</p>
                  </div>
                  <div>
                    <p className="text-[#8892b0]">Downloads</p>
                    <p className="text-white font-bold">{data.featuredApp.downloads}</p>
                  </div>
                  <div>
                    <p className="text-[#8892b0]">Active Users</p>
                    <p className="text-white font-bold">{data.featuredApp.activeUsers}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience & Education */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Experience */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#8b5cf6]/20 rounded-lg">
                <Briefcase className="w-6 h-6 text-[#8b5cf6]" />
              </div>
              <h3 className="text-2xl font-bold text-white">Experience</h3>
            </div>

            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-8 border-l-2 border-[#8b5cf6]/30 hover:border-[#8b5cf6] transition-colors"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-[#8b5cf6] rounded-full border-4 border-[#0a192f]" />
                  <div className="pb-6">
                    <div className="flex items-center gap-2 text-[#64ffda] text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      {exp.years}
                    </div>
                    <h4 className="text-lg font-bold text-white">{exp.position}</h4>
                    <div className="flex items-center gap-2 text-[#8892b0] text-sm mb-2">
                      <Building2 className="w-4 h-4" />
                      {exp.company}
                    </div>
                    <p className="text-[#8892b0] text-sm">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#64ffda]/20 rounded-lg">
                <GraduationCap className="w-6 h-6 text-[#64ffda]" />
              </div>
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>

            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="relative pl-8 border-l-2 border-[#64ffda]/30 hover:border-[#64ffda] transition-colors"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-[#64ffda] rounded-full border-4 border-[#0a192f]" />
                  <div className="pb-6">
                    <div className="flex items-center gap-2 text-[#64ffda] text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      {edu.years}
                    </div>
                    <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                    <div className="flex items-center gap-2 text-[#8892b0] text-sm">
                      <Building2 className="w-4 h-4" />
                      {edu.institution}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
