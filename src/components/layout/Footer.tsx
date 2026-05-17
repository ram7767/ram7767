import Container from "../ui/Container";
import { cn } from "../../lib/cn";

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

type Social = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const SOCIALS: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/ram7767",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 1 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:rramanarasimharaju@gmail.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="mt-24">
      <Container>
        <div className="glass-strong rounded-3xl p-8 sm:p-10">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                    "bg-brand-gradient text-white font-semibold shadow-glow"
                  )}
                >
                  R
                </span>
                <span className="text-base font-medium tracking-tight text-ink-50">
                  Ratnakaram Rama Narasimha Raju
                </span>
              </div>
              <p className="text-sm text-ink-300 leading-relaxed max-w-sm">
                Senior iOS &amp; Mobile Developer crafting refined,
                performance-obsessed apps for Apple platforms.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-3">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-300/90">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-2">
                {QUICK_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={cn(
                        "text-sm text-ink-200 hover:text-white transition-colors",
                        "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:outline-none rounded"
                      )}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-300/90">
                Connect
              </h3>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={cn(
                      "glass inline-flex h-11 w-11 items-center justify-center rounded-xl",
                      "text-ink-100 hover:text-white",
                      "hover:border-brand-500/40 hover:-translate-y-0.5 transition-all duration-300",
                      "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:outline-none"
                    )}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <p className="text-xs text-ink-400 mt-1">
                rramanarasimharaju@gmail.com
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-ink-400">
              © 2026 Ratnakaram Rama Narasimha Raju · Built with React + Tailwind
            </p>
            <p className="text-xs text-ink-400 font-mono">
              Crafted with restraint.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
