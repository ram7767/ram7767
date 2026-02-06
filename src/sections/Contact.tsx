import React, { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, Loader2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Contact: React.FC = () => {
  const { data } = usePortfolio();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!data) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real implementation, you would send the email here
    // For example, using EmailJS, Formspree, or a backend API
    // Example with mailto:
    const mailtoLink = `mailto:${data.email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.open(mailtoLink, '_blank');

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" ref={ref} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8b5cf6]/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-[#8b5cf6] font-medium mb-2">Get In Touch</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Contact Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#64ffda] mx-auto rounded-full mb-6" />
          <p className="text-[#8892b0] max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Let's Talk</h3>
            <p className="text-[#8892b0] mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be
              part of your vision. Feel free to reach out!
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="text-[#8892b0] text-sm">Email</p>
                  <a
                    href={`mailto:${data.email}`}
                    className="text-white hover:text-[#8b5cf6] transition-colors"
                  >
                    {data.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#64ffda]/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#64ffda]" />
                </div>
                <div>
                  <p className="text-[#8892b0] text-sm">Location</p>
                  <p className="text-white">{data.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-[#8892b0] mb-4">Follow me on</p>
              <div className="flex gap-4">
                <a
                  href={data.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#112240] border border-[#8b5cf6]/20 rounded-lg flex items-center justify-center text-[#8892b0] hover:text-white hover:bg-[#8b5cf6] hover:border-[#8b5cf6] transition-all"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href={data.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#112240] border border-[#8b5cf6]/20 rounded-lg flex items-center justify-center text-[#8892b0] hover:text-white hover:bg-[#8b5cf6] hover:border-[#8b5cf6] transition-all"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="p-8 bg-[#112240] border border-[#8b5cf6]/20 rounded-2xl">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-[#64ffda] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-[#8892b0]">Thank you for reaching out. I'll get back to you soon!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-[#8892b0] text-sm mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#0a192f] border border-[#8b5cf6]/30 rounded-lg text-white placeholder-[#8892b0] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[#8892b0] text-sm mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#0a192f] border border-[#8b5cf6]/30 rounded-lg text-white placeholder-[#8892b0] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-[#8892b0] text-sm mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0a192f] border border-[#8b5cf6]/30 rounded-lg text-white placeholder-[#8892b0] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 outline-none transition-all"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[#8892b0] text-sm mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-[#0a192f] border border-[#8b5cf6]/30 rounded-lg text-white placeholder-[#8892b0] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 outline-none transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-[#8b5cf6] text-white rounded-lg font-medium hover:bg-[#7c3aed] transition-all hover:shadow-lg hover:shadow-[#8b5cf6]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-[#8892b0] text-sm">
                    Or email me directly at{' '}
                    <a
                      href={`mailto:${data.email}`}
                      className="text-[#8b5cf6] hover:underline"
                    >
                      {data.email}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
