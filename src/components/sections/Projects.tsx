import { motion } from "framer-motion";
import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";
import Tag from "../ui/Tag";
import {
  projects,
  type Platform,
  type ProjectLink,
} from "../../data/projects";
import data from "../../data/data.json";
import { cn } from "../../lib/cn";

const clients: string[] = data.clients;

function PlatformPill({ platform }: { platform: Platform }) {
  const styles =
    platform === "iOS"
      ? "bg-sky-400/10 text-sky-300 border-sky-300/20"
      : platform === "Android"
        ? "bg-emerald-400/10 text-emerald-300 border-emerald-300/20"
        : "bg-brand-500/15 text-brand-200 border-brand-400/30";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] whitespace-nowrap",
        styles
      )}
    >
      {platform}
    </span>
  );
}

function AppleIcon() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.564 12.62c-.029-2.94 2.4-4.353 2.51-4.422-1.367-1.997-3.494-2.27-4.252-2.302-1.81-.183-3.534 1.063-4.453 1.063-.918 0-2.336-1.036-3.842-1.008-1.978.029-3.802 1.149-4.821 2.918-2.054 3.555-.525 8.81 1.476 11.69.978 1.41 2.143 2.99 3.673 2.933 1.473-.06 2.03-.953 3.81-.953 1.778 0 2.281.953 3.842.92 1.586-.027 2.59-1.434 3.557-2.849 1.123-1.633 1.585-3.214 1.612-3.296-.035-.014-3.092-1.186-3.112-4.694zM14.616 4.094c.813-.984 1.36-2.352 1.211-3.713-1.171.048-2.59.78-3.43 1.763-.754.872-1.413 2.262-1.235 3.6 1.305.1 2.64-.663 3.454-1.65z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M4.5 3.5v17a1 1 0 0 0 1.53.847l13.5-8.5a1 1 0 0 0 0-1.694l-13.5-8.5A1 1 0 0 0 4.5 3.5z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function LinkIcon({ kind }: { kind: ProjectLink["kind"] }) {
  if (kind === "ios") return <AppleIcon />;
  if (kind === "android") return <PlayIcon />;
  return <GlobeIcon />;
}

function LinkButton({ link }: { link: ProjectLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5",
        "text-[11px] font-medium text-ink-100",
        "hover:bg-white/[0.08] hover:text-white hover:border-brand-500/40",
        "transition-colors whitespace-nowrap"
      )}
    >
      <LinkIcon kind={link.kind} />
      {link.label}
    </a>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-20 md:py-28"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}
    >
      <Container>
        <SectionTitle
          eyebrow="Client Work"
          title={
            <>
              <span className="gradient-text">Client</span> projects shipped to
              App Store &amp; Play Store
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => {
            const primary = project.links[0];
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                <GlassCard hoverable className="relative h-full flex flex-col">
                  {/* Top row: client tag + platform pill */}
                  <div className="flex items-start justify-between gap-3">
                    <Tag>{project.client}</Tag>
                    <PlatformPill platform={project.platform} />
                  </div>

                  {/* Clickable title + description block opens primary link */}
                  {primary ? (
                    <a
                      href={primary.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block group focus:outline-none"
                      aria-label={`Open ${project.name} on ${primary.label}`}
                    >
                      <h3 className="text-xl font-bold text-ink-50 group-hover:text-white transition-colors">
                        {project.name}
                      </h3>
                      <p
                        className="mt-3 text-sm leading-relaxed text-ink-300 line-clamp-4"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {project.description}
                      </p>
                    </a>
                  ) : (
                    <div className="mt-4">
                      <h3 className="text-xl font-bold text-ink-50">
                        {project.name}
                      </h3>
                      <p
                        className="mt-3 text-sm leading-relaxed text-ink-300 line-clamp-4"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {project.description}
                      </p>
                    </div>
                  )}

                  {/* Skill tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>

                  {/* Footer: link buttons */}
                  <div className="mt-auto pt-6 flex flex-wrap gap-2">
                    {project.links.map((link) => (
                      <LinkButton key={link.url} link={link} />
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Clients strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-white/5"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-ink-400 text-center">
            Clients I&apos;ve worked with
          </p>
          <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {clients.map((client) => (
              <span
                key={client}
                className="glass rounded-full px-4 py-2 font-mono uppercase tracking-widest text-sm md:text-base text-ink-100/80"
              >
                {client}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
