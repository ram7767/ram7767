import { useState, useEffect } from 'react';
import { PortfolioProvider } from '@/context/PortfolioContext';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Metrics from '@/sections/Metrics';
import Skills from '@/sections/Skills';
import Services from '@/sections/Services';
import Projects from '@/sections/Projects';
import Clients from '@/sections/Clients';
import Achievements from '@/sections/Achievements';
import Contact from '@/sections/Contact';
import Footer from '@/components/Footer';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Preload images
    const preloadImages = () => {
      const images = [
        '/assets/images/ram_profile_pic.jpg',
        '/assets/images/hsbc.png',
        '/assets/images/smartwait.png',
        '/assets/images/playdate.png',
        '/assets/images/mrc.png',
        '/assets/images/payslate.png',
        '/assets/images/capgemini.svg',
        '/assets/images/softsuave.png',
        '/assets/images/dotmite.png',
      ];

      const promises = images.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });

      return Promise.all(promises);
    };

    preloadImages();
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <PortfolioProvider>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div
        className={`min-h-screen bg-[#0a192f] text-white transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {showContent && (
          <>
            <Navigation />
            <main>
              <Hero />
              <About />
              <Metrics />
              <Skills />
              <Services />
              <Projects />
              <Clients />
              <Achievements />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </div>
    </PortfolioProvider>
  );
}

export default App;
