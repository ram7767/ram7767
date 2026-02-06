import React from 'react';
import { ExternalLink } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Client } from '@/types';

const Clients: React.FC = () => {
  const { data } = usePortfolio();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  if (!data) return null;

  return (
    <section id="clients" ref={ref} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8b5cf6]/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-[#8b5cf6] font-medium mb-2">Trusted By</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Companies I've Worked With</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#64ffda] mx-auto rounded-full mb-6" />
          <p className="text-[#8892b0] max-w-2xl mx-auto">
            I've had the privilege of collaborating with leading companies to deliver
            exceptional mobile solutions.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.clients.map((client: Client, index: number) => (
            <div
              key={client.company_name}
              className={`group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a
                href={client.reference}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative p-8 bg-[#112240] border border-[#8b5cf6]/20 rounded-xl overflow-hidden transition-all hover:border-[#8b5cf6]/50 hover:-translate-y-1"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Logo */}
                <div className="relative h-20 flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.company_name}
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                {/* Company Name */}
                <p className="relative text-center text-[#8892b0] group-hover:text-white transition-colors mt-4 font-medium">
                  {client.company_name}
                </p>

                {/* External Link Icon */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-[#8b5cf6]" />
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div
          className={`mt-16 flex flex-wrap justify-center gap-8 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {[
            { label: 'Enterprise Clients', value: '4+' },
            { label: 'Successful Projects', value: '20+' },
            { label: 'Client Satisfaction', value: '100%' },
            { label: 'Repeat Business', value: '90%' },
          ].map((badge) => (
            <div key={badge.label} className="text-center px-6 py-4">
              <p className="text-2xl font-bold text-[#8b5cf6] mb-1">{badge.value}</p>
              <p className="text-[#8892b0] text-sm">{badge.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
