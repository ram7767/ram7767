import React from 'react';
import { Smartphone, Layers, Tablet, ArrowRight } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Service } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  smartphone: Smartphone,
  layers: Layers,
  tablet: Tablet,
};

const Services: React.FC = () => {
  const { data } = usePortfolio();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  if (!data) return null;

  return (
    <section id="services" ref={ref} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8b5cf6]/5 via-transparent to-[#8b5cf6]/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-[#8b5cf6] font-medium mb-2">What I Do</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">My Services</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#64ffda] mx-auto rounded-full mb-6" />
          <p className="text-[#8892b0] max-w-2xl mx-auto">
            I offer comprehensive mobile development services to help businesses create
            exceptional digital experiences across platforms.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {data.services.map((service: Service, index: number) => {
            const Icon = iconMap[service.icon] || Smartphone;

            return (
              <div
                key={service.title}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-full p-8 bg-[#112240] border border-[#8b5cf6]/20 rounded-2xl overflow-hidden transition-all hover:border-[#8b5cf6]/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#8b5cf6]/10">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#8b5cf6] to-[#64ffda] rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -inset-2 bg-[#8b5cf6]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-xl font-bold text-white mb-4 group-hover:text-[#8b5cf6] transition-colors">
                    {service.title}
                  </h3>
                  <p className="relative text-[#8892b0] mb-6">{service.description}</p>

                  {/* Learn More Link */}
                  <a
                    href="#contact"
                    className="relative inline-flex items-center gap-2 text-[#8b5cf6] font-medium group/link"
                  >
                    <span className="group-hover/link:underline">Get Started</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </a>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#8b5cf6]/10 to-transparent rounded-bl-full" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-[#8892b0] mb-4">Have a project in mind?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#8b5cf6] text-white rounded-lg font-medium hover:bg-[#7c3aed] transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#8b5cf6]/30"
          >
            Let's Discuss Your Project
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
