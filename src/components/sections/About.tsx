import { motion } from "framer-motion";
import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";
import Tag from "../ui/Tag";
import { profile } from "../../data/profile";
import { skillGroups } from "../../data/skills";

const allSkills = skillGroups.flatMap((g) => g.items.map((i) => i.name));

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* Left column: monogram + highlights */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="md:col-span-5"
          >
            <div className="relative rounded-3xl bg-brand-gradient p-[1.5px] shadow-glow">
              <GlassCard
                strong
                padded={false}
                className="rounded-[calc(theme(borderRadius.3xl)-1.5px)] overflow-hidden"
              >
                <div className="relative flex aspect-square items-center justify-center">
                  <div className="absolute inset-0 bg-hero-radial opacity-60" />
                  <span
                    aria-hidden="true"
                    className="relative select-none font-extrabold text-[14rem] sm:text-[16rem] leading-none gradient-text animate-float"
                  >
                    R
                  </span>
                  <div className="pointer-events-none absolute inset-x-6 bottom-6 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.25em] text-ink-300">
                    <span>{profile.shortName}</span>
                    <span>{profile.location}</span>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {profile.highlights.map((h) => (
                <GlassCard
                  key={h.label}
                  padded={false}
                  className="p-5"
                >
                  <div className="text-2xl font-bold gradient-text">
                    {h.value}
                  </div>
                  <div className="mt-1 text-xs font-mono uppercase tracking-[0.2em] text-ink-300">
                    {h.label}
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Right column: title + bio + tags */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="md:col-span-7"
          >
            <SectionTitle
              eyebrow="About"
              title={
                <>
                  A bit <span className="gradient-text">about me</span>
                </>
              }
            />

            <div className="mt-6 space-y-5 text-ink-200 text-base sm:text-lg leading-relaxed">
              {profile.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-xs font-mono uppercase tracking-widest text-ink-400">
                Ask me about
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.askMeAbout.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      delay: i * 0.025,
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                  >
                    <Tag>{item}</Tag>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-mono uppercase tracking-widest text-ink-400">
                My toolkit
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs opacity-80">
                {allSkills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: Math.min(i * 0.012, 0.6),
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                  >
                    <Tag>{skill}</Tag>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
