import React from 'react';
import { Code2, Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const currentYear = new Date().getFullYear();

  if (!data) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative py-12 border-t border-[#8b5cf6]/20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#8b5cf6]/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 mb-4">
              <Code2 className="w-8 h-8 text-system-blue" />
              <span className="text-xl font-bold text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-system-blue to-system-orange">RamRaju</span>
              </span>
            </a>
            <p className="text-[#8892b0] mb-4">
              Mobile Application Developer specializing in iOS and Flutter development.
              Creating exceptional digital experiences.
            </p>
            <div className="flex gap-3">
              <a
                href={data.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#112240] border border-[#8b5cf6]/20 rounded-lg flex items-center justify-center text-[#8892b0] hover:text-white hover:bg-[#8b5cf6] hover:border-[#8b5cf6] transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={data.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#112240] border border-[#8b5cf6]/20 rounded-lg flex items-center justify-center text-[#8892b0] hover:text-white hover:bg-[#8b5cf6] hover:border-[#8b5cf6] transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${data.email}`}
                className="w-10 h-10 bg-[#112240] border border-[#8b5cf6]/20 rounded-lg flex items-center justify-center text-[#8892b0] hover:text-white hover:bg-[#8b5cf6] hover:border-[#8b5cf6] transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#8892b0] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-system-blue hover:to-system-orange transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-[#8892b0]">
              <li>{data.location}</li>
              <li>
                <a href={`mailto:${data.email}`} className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-system-blue hover:to-system-orange transition-colors">
                  {data.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#8b5cf6]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8892b0] text-sm flex items-center gap-1">
            © {currentYear} {data.shortName} Raju. Made with
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            and lots of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-system-blue to-system-orange">code</span>
          </p>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-[#8b5cf6] rounded-lg flex items-center justify-center text-white hover:bg-[#7c3aed] transition-all hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
