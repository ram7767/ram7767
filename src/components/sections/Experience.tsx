import { motion } from "framer-motion";
import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";
import Tag from "../ui/Tag";
import { experience } from "../../data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 md:py-28"
      style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}
    >
      <Container>
        <SectionTitle
          eyebrow="Experience"
          title={
            <>
              Where I&rsquo;ve <span className="gradient-text">shipped</span>
            </>
          }
        />

        <div className="relative mt-14">
          {/* Vertical accent rail */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-2 md:left-4 w-0.5 rounded-full bg-brand-gradient opacity-80"
          />

          <ol className="space-y-8 md:space-y-10">
            {experience.map((entry, idx) => (
              <motion.li
                key={`${entry.company}-${entry.period}`}
                initial={{ opacity: 0, x: 4, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="relative pl-10 md:pl-16"
              >
                {/* Rail dot */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 md:left-2 top-6 flex h-5 w-5 items-center justify-center"
                >
                  <span className="absolute inset-0 rounded-full bg-brand-gradient opacity-30 blur-sm" />
                  <span className="relative h-3 w-3 rounded-full bg-brand-gradient ring-2 ring-ink-900" />
                </span>

                <GlassCard hoverable>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-xl font-bold text-ink-50">
                      {entry.role}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300/90">
                      {entry.period}
                    </span>
                  </div>

                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-ink-300">
                    {entry.company}
                    <span className="mx-2 text-ink-500">·</span>
                    {entry.location}
                  </p>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink-200">
                    {entry.summary}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {entry.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 text-sm text-ink-200 leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-gradient"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </GlassCard>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
