import { motion } from "framer-motion";
import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";
import { skillGroups } from "../../data/skills";
import { cn } from "../../lib/cn";

const MAX_LEVEL = 5;

function ProficiencyDots({ level }: { level: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Proficiency ${level} out of ${MAX_LEVEL}`}
    >
      {Array.from({ length: MAX_LEVEL }, (_, i) => {
        const filled = i < level;
        return (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors",
              filled ? "bg-brand-gradient" : "bg-white/10"
            )}
          />
        );
      })}
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-20 md:py-28"
      style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}
    >
      <Container>
        <SectionTitle
          eyebrow="Tech Stack"
          title={
            <>
              Tools I <span className="gradient-text">ship with</span>
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <GlassCard
                hoverable
                className="h-full"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ink-50">
                    {group.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                    {group.items.length}
                  </span>
                </div>

                <ul className="mt-5 space-y-3">
                  {group.items.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="text-sm text-ink-100">{skill.name}</span>
                      <ProficiencyDots level={skill.level} />
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
