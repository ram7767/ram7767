import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";
import Tag from "../ui/Tag";
import {
  achievements,
  type Achievement,
  type AchievementKind,
} from "../../data/achievements";
import { cn } from "../../lib/cn";

type FilterKey = AchievementKind | "all";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "certificate", label: "Certificates" },
  { key: "award", label: "Awards" },
];

const KIND_LABEL: Record<AchievementKind, string> = {
  achievement: "Achievement",
  certificate: "Certificate",
  award: "Award",
};

const KIND_CHIP_CLASSES: Record<AchievementKind, string> = {
  achievement: "bg-brand-500/15 text-brand-200 border-brand-400/30",
  certificate: "bg-orange-400/15 text-orange-300 border-orange-400/30",
  award: "bg-amber-400/15 text-amber-300 border-amber-400/30",
};

function TrophyIcon() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 4h8v4a4 4 0 1 1-8 0V4z" />
      <path d="M16 5h3a2 2 0 0 1 0 4 5 5 0 0 1-3 1" />
      <path d="M8 5H5a2 2 0 0 0 0 4 5 5 0 0 0 3 1" />
      <path d="M10 14h4l-.5 3h-3L10 14z" />
      <path d="M8 20h8" />
      <path d="M10 17v3" />
      <path d="M14 17v3" />
    </svg>
  );
}

function RibbonIcon() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="9" r="5.5" />
      <path d="M12 6.5v2.7l1.8 1.1" />
      <path d="M8.5 13.5 6.5 21l3-1.5L12 21l2.5-1.5 3 1.5-2-7.5" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3 2.6 5.6 6.1.6-4.6 4.2 1.3 6L12 16.8 6.6 19.4l1.3-6L3.3 9.2l6.1-.6L12 3z" />
    </svg>
  );
}

function KindIcon({ kind }: { kind: AchievementKind }) {
  if (kind === "certificate") return <RibbonIcon />;
  if (kind === "award") return <StarIcon />;
  return <TrophyIcon />;
}

export default function Achievements() {
  const [filter, setFilter] = useState<FilterKey>("all");

  const counts = useMemo(() => {
    const base = { all: achievements.length } as Record<FilterKey, number>;
    for (const f of FILTERS) {
      if (f.key === "all") continue;
      base[f.key] = achievements.filter((a) => a.kind === f.key).length;
    }
    return base;
  }, []);

  const visible: Achievement[] = useMemo(
    () =>
      filter === "all"
        ? achievements
        : achievements.filter((a) => a.kind === filter),
    [filter]
  );

  return (
    <section
      id="achievements"
      className="relative py-20 md:py-28"
      style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}
    >
      <Container>
        <SectionTitle
          eyebrow="Recognition"
          title={
            <>
              <span className="gradient-text">Certificates</span> &amp; awards
            </>
          }
          subtitle="A snapshot of certifications and recognitions along the way."
        />

        {/* Filter strip */}
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5",
                  "text-xs font-medium transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:outline-none",
                  isActive
                    ? "bg-brand-500/20 text-brand-200 border-brand-400/40"
                    : "text-ink-300 hover:text-ink-100 border-white/10 hover:border-white/20 bg-white/[0.02]"
                )}
                aria-pressed={isActive}
              >
                <span>{f.label}</span>
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-widest",
                    isActive ? "text-brand-200/80" : "text-ink-400"
                  )}
                >
                  · {counts[f.key]}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((a, idx) => (
              <motion.div
                key={a.title}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.04,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                <GlassCard hoverable className="relative h-full flex flex-col">
                  {/* Top row: icon + (kind chip + year pill) */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex text-brand-400">
                      <KindIcon kind={a.kind} />
                    </span>
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      <span
                        className={cn(
                          "rounded-full border px-2 py-1 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap",
                          KIND_CHIP_CLASSES[a.kind]
                        )}
                      >
                        {KIND_LABEL[a.kind]}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink-400 bg-white/[0.04] rounded-full px-2 py-1 border border-white/10 whitespace-nowrap">
                        {a.year}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-ink-50">
                    {a.title}
                  </h3>

                  <p
                    className="mt-2 text-sm text-ink-300 leading-relaxed"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {a.description}
                  </p>

                  <div className="mt-auto pt-5 flex flex-wrap gap-2">
                    {a.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
