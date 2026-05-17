import { lazy, Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SplashLoader from "./components/layout/SplashLoader";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";
import Services from "./components/sections/Services";
import Achievements from "./components/sections/Achievements";
import StarryBackground from "./components/effects/StarryBackground";
import CursorGlow from "./components/effects/CursorGlow";
import ScrollProgress from "./components/effects/ScrollProgress";

const Stats = lazy(() => import("./components/sections/Stats"));

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SplashLoader />

      {/* Minimalist starry sky */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <StarryBackground />
      </div>

      {/* Cursor-following glow sits above blobs, below content */}
      <CursorGlow />

      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Services />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Suspense fallback={<div className="h-[420px]" aria-hidden="true" />}>
          <Stats />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
