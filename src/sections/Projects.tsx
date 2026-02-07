import React from 'react';
import { ExternalLink, Star, Download, Users, Quote } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Testimonial } from '@/types';

const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  if (!data) return null;

  return (
    <section id="projects" ref={ref} className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-system-blue to-system-orange font-medium mb-2">My Work</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-system-blue to-system-orange mx-auto rounded-full mb-6" />
          <p className="text-[#8892b0] max-w-2xl mx-auto">
            Here are some of the mobile applications I've developed, delivering exceptional
            user experiences across iOS and cross-platform solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.testimonials.map((project: Testimonial, index: number) => (
            <div
              key={project.name}
              className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-full bg-[#112240] border border-[#8b5cf6]/20 rounded-2xl overflow-hidden transition-all hover:border-[#8b5cf6]/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#8b5cf6]/10">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-transparent to-transparent" />

                  {/* Role Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#8b5cf6]/90 text-white text-xs font-medium rounded-full">
                    {project.role}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-system-blue group-hover:to-system-orange transition-colors">
                    {project.name}
                  </h3>

                  {/* Review Quote */}
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-[#8b5cf6]/30" />
                    <p className="text-[#8892b0] text-sm pl-4 line-clamp-3">{project.review}</p>
                  </div>

                  {/* View Project Link */}
                  <a
                    href={project.appLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-system-blue to-system-orange font-medium hover:underline"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#8b5cf6]/10 to-transparent rounded-tl-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Featured App Stats */}
        <div
          className={`mt-16 p-8 bg-gradient-to-r from-system-blue/20 to-system-orange/20 rounded-2xl border border-system-blue/30 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-6 h-6 text-system-orange" />
                <span className="text-3xl font-bold text-white">4.9</span>
              </div>
              <p className="text-[#8892b0]">Average Rating</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Download className="w-6 h-6 text-system-blue" />
                <span className="text-3xl font-bold text-white">500K+</span>
              </div>
              <p className="text-[#8892b0]">Total Downloads</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-system-blue" />
                <span className="text-3xl font-bold text-white">200K+</span>
              </div>
              <p className="text-[#8892b0]">Active Users</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl font-bold text-white">20+</span>
              </div>
              <p className="text-[#8892b0]">Apps Delivered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
