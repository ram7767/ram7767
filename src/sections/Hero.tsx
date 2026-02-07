import React from 'react';
import { MapPin, Download, Github, Linkedin, ChevronDown, Star, Users, Zap, Bug } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PhoneMockup } from '@/components/PhoneMockup';

const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  if (!data) return null;

  const stats = [
    { icon: Zap, label: 'Apps Launched', value: data.stats.appLaunches },
    { icon: Star, label: 'User Rating', value: data.stats.userSatisfaction },
    { icon: Bug, label: 'Bug Reduction', value: data.stats.bugReduction },
    { icon: Users, label: 'Active Users', value: '500K+' },
  ];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen sm:min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-16 pb-16 sm:pb-0"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-system-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-system-orange/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-system-teal/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(60% 0.2 250) 1px, transparent 1px), linear-gradient(90deg, oklch(60% 0.2 250) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div
            className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            {/* Greeting */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-system-blue/10 border border-system-blue/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-system-teal rounded-full animate-pulse" />
              <span className="text-sm text-system-teal">Available for hire</span>
            </div>

            <p className="text-[#8892b0] text-base sm:text-lg mb-2">{data.greeting}</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-system-blue to-system-orange">
                {data.shortName} Raju
              </span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-system-blue mb-6">{data.title}</h2>
            <p className="text-[#8892b0] text-base sm:text-lg max-w-md sm:max-w-xl mx-auto lg:mx-0 mb-8">
              {data.tagline}
            </p>

            {/* Location */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#8892b0] mb-6 sm:mb-8">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-system-blue" />
              <span className="text-sm sm:text-base">{data.location}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8">
              <a
                href="#contact"
                className="px-6 py-2.5 sm:px-8 sm:py-3 bg-system-blue text-white rounded-lg font-medium hover:bg-system-blue-light transition-all hover:scale-105 hover:shadow-lg hover:shadow-system-blue/30 text-sm sm:text-base min-w-[140px]"
              >
                Get In Touch
              </a>
              <a
                href={data.resumeFile}
                download="Ram_Raju_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 sm:px-8 sm:py-3 border border-system-blue text-system-blue rounded-lg font-medium hover:bg-system-blue/10 transition-all flex items-center justify-center gap-2 text-sm sm:text-base min-w-[140px]"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
              <a
                href={data.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 bg-[#112240] rounded-lg text-[#8892b0] hover:text-white hover:bg-system-blue transition-all"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href={data.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 bg-[#112240] rounded-lg text-[#8892b0] hover:text-white hover:bg-system-blue transition-all"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - iOS Device Mockup */}
          <div
            className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-300 mt-8 sm:mt-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <PhoneMockup />
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 lg:mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative p-4 sm:p-6 bg-[#112240]/50 backdrop-blur-sm border border-system-blue/20 rounded-xl hover:border-system-blue/50 transition-all group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-system-blue/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-system-blue mb-2 sm:mb-3" />
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm text-[#8892b0]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-[#8892b0] hover:text-system-blue transition-colors">
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
