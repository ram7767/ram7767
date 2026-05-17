import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";
import { services } from "../../data/services";

/* ---------- Icon library (code, not content) ---------- */

/**
 * Swift / Native iOS — stylised bird/swift silhouette.
 * Two sweeping curves suggest a bird in flight without copying the trademark.
 */
function SwiftIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Wing / body sweep */}
      <path d="M4 17c4 .8 8-.4 11-3.4 2-2 3.2-4.6 3.6-7.4-2 2.6-4.8 4.4-8 5.4" />
      {/* Lower wing */}
      <path d="M6.5 19c3 .4 6-.2 8.4-1.8 1.6-1.1 2.7-2.5 3.4-4.2" />
      {/* Eye dot */}
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Flutter — two stacked tilted parallelograms evoking the Flutter mark.
 */
function FlutterIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Upper tilted slab */}
      <path d="M15 3 5 13l3.2 3.2L21.4 3H15z" />
      {/* Lower tilted slab */}
      <path d="M15 13 9.4 18.6 13 22l5.6-5.6L15 13z" />
    </svg>
  );
}

/**
 * Firebase & Backend — flame on top of a small cloud arch.
 */
function CloudIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Cloud arch behind */}
      <path d="M5 19a3 3 0 0 1-.4-5.97A4.5 4.5 0 0 1 13 12.5" opacity="0.55" />
      {/* Flame on top */}
      <path d="M12 3c1.6 2.2 3.6 4.2 3.6 7.2A3.6 3.6 0 0 1 12 14a3.6 3.6 0 0 1-3.6-3.8c0-1.6.8-2.9 2-4.2.5 1 1.2 1.5 2 1.7C12.2 6 11.6 4.5 12 3z" />
      {/* Inner flicker */}
      <path d="M12 9.5c.5.6 1 1.2 1 2A1.2 1.2 0 0 1 11.8 12.7" />
    </svg>
  );
}

/**
 * Architecture — three stacked layer cards each with a small dot.
 */
function ArchitectureIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="5" width="16" height="3.5" rx="1" />
      <rect x="4" y="10.25" width="16" height="3.5" rx="1" />
      <rect x="4" y="15.5" width="16" height="3.5" rx="1" />
      <circle cx="7" cy="6.75" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="7" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17.25" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * CI/CD — circular arrow loop with a check mark inside.
 */
function CicdIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Loop arc (open at top-right with arrowhead) */}
      <path d="M20 12a8 8 0 1 1-3-6.25" />
      <path d="M20 5v4h-4" />
      {/* Check inside */}
      <path d="m9 12.5 2 2 4-4.5" />
    </svg>
  );
}

/**
 * Polish — big four-pointed sparkle + small twinkle pair.
 */
function PolishIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Big 4-point sparkle */}
      <path d="M10 3v4.5M10 12.5V17M3 10h4.5M12.5 10H17" />
      <path d="m6.5 6.5 1.5 1.5M12 12l1.5 1.5M6.5 13.5 8 12M12 8l1.5-1.5" />
      {/* Small twinkle */}
      <path d="M18 16v2.5M18 20.5V23M16.5 19.5H19M20 19.5h1.5" />
    </svg>
  );
}

function DefaultIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

const ICONS: Record<string, () => ReactNode> = {
  swift: SwiftIcon,
  flutter: FlutterIcon,
  cloud: CloudIcon,
  architecture: ArchitectureIcon,
  cicd: CicdIcon,
  polish: PolishIcon,
};

function ServiceIcon({ iconKey }: { iconKey: string }) {
  const Cmp = ICONS[iconKey] ?? DefaultIcon;
  return <Cmp />;
}

/* ---------- Section ---------- */

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-20 md:py-28"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}
    >
      <Container>
        <SectionTitle
          eyebrow="Services"
          title={
            <>
              How I can <span className="gradient-text">help</span>
            </>
          }
          subtitle="From greenfield iOS apps to release-engineering pipelines."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.06,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="group"
            >
              <GlassCard hoverable padded className="h-full flex flex-col">
                {/* Icon tile */}
                <div
                  className="
                    glass inline-flex h-10 w-10 items-center justify-center rounded-xl
                    transition-all duration-[250ms] ease-out
                    group-hover:scale-[1.08] group-hover:bg-white/[0.08] group-hover:shadow-glow
                  "
                >
                  <span className="inline-flex text-brand-400 group-hover:text-accent-orange transition-colors duration-300">
                    <ServiceIcon iconKey={service.icon} />
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-lg font-bold text-ink-50">
                  {service.title}
                </h3>

                {/* BIG METRIC */}
                <div className="my-3 flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text leading-none break-words">
                    {service.metric.value}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-ink-400 font-mono">
                    {service.metric.label}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-ink-300 leading-relaxed">
                  {service.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
