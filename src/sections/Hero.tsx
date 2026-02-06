import React from 'react';
import { MapPin, Download, Github, Linkedin, ChevronDown, Star, Users, Zap, Bug } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#64ffda]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b5cf6]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`text-center lg:text-left transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Greeting */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#64ffda] rounded-full animate-pulse" />
              <span className="text-sm text-[#64ffda]">Available for hire</span>
            </div>

            <p className="text-[#8892b0] text-lg mb-2">{data.greeting}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              {data.shortName}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#64ffda]">
                Raju
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-[#8b5cf6] mb-6">{data.title}</h2>
            <p className="text-[#8892b0] text-lg max-w-xl mx-auto lg:mx-0 mb-8">
              {data.tagline}
            </p>

            {/* Location */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#8892b0] mb-8">
              <MapPin className="w-5 h-5 text-[#8b5cf6]" />
              <span>{data.location}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <a
                href="#contact"
                className="px-8 py-3 bg-[#8b5cf6] text-white rounded-lg font-medium hover:bg-[#7c3aed] transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#8b5cf6]/30"
              >
                Get In Touch
              </a>
              <a
                href={data.resumeFile}
                download
                className="px-8 py-3 border border-[#8b5cf6] text-[#8b5cf6] rounded-lg font-medium hover:bg-[#8b5cf6]/10 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download CV
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href={data.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#112240] rounded-lg text-[#8892b0] hover:text-white hover:bg-[#8b5cf6] transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={data.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#112240] rounded-lg text-[#8892b0] hover:text-white hover:bg-[#8b5cf6] transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative mx-auto w-72 h-72 md:w-96 md:h-96">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#64ffda] rounded-full blur-2xl opacity-30 animate-pulse" />
              
              {/* Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#8b5cf6]/30">
                <img
                  src={data.profilePic}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-[#112240] border border-[#8b5cf6]/30 rounded-full animate-bounce">
                <span className="text-[#64ffda] font-bold">3+ Years</span>
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-[#112240] border border-[#8b5cf6]/30 rounded-full animate-bounce delay-500">
                <span className="text-[#8b5cf6] font-bold">iOS Expert</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative p-6 bg-[#112240]/50 backdrop-blur-sm border border-[#8b5cf6]/20 rounded-xl hover:border-[#8b5cf6]/50 transition-all group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <stat.icon className="w-8 h-8 text-[#8b5cf6] mb-3" />
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-[#8892b0]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-[#8892b0] hover:text-[#8b5cf6] transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
