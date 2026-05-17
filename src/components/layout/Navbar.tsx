import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../ui/Container";
import GradientButton from "../ui/GradientButton";
import { cn } from "../../lib/cn";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Recognition", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const RESUME_URL =
  "https://drive.google.com/uc?export=download&id=1s-_-UfTo5GmwtWnjcwbDhEqcheeQ1MWU";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-ink-900/60 border-b border-white/10"
          : "backdrop-blur-md bg-ink-900/20 border-b border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          aria-label="Go to top"
          className="group inline-flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:outline-none rounded-xl"
        >
          <span
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-lg",
              "bg-brand-gradient text-white font-semibold shadow-glow",
              "transition-transform duration-300 group-hover:scale-105"
            )}
          >
            R
          </span>
          <span className="hidden sm:inline text-sm font-medium tracking-tight text-ink-100">
            Ratnakaram
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "px-3 py-2 text-sm text-ink-200 hover:text-white",
                "rounded-full transition-colors",
                "hover:bg-white/[0.04]",
                "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:outline-none"
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <GradientButton
              href={RESUME_URL}
              size="sm"
              {...({
                download: "ratnakaram_rama_narasimha_raju.pdf",
                target: "_blank",
                rel: "noopener",
              } as Record<string, string>)}
              trailingIcon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v12" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>
              }
            >
              Download Resume
            </GradientButton>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={cn(
              "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl",
              "glass text-ink-100 cursor-pointer",
              "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:outline-none"
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
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
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6l-12 12" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="md:hidden"
          >
            <Container className="pb-4">
              <div className="glass-strong rounded-2xl p-3 flex flex-col">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm text-ink-100 hover:text-white",
                      "rounded-xl hover:bg-white/[0.05] transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:outline-none"
                    )}
                  >
                    {l.label}
                  </a>
                ))}
                <div className="mt-2 pt-3 border-t border-white/10">
                  <GradientButton
                    href={RESUME_URL}
                    size="md"
                    className="w-full"
                    {...({
                      download: "ratnakaram_rama_narasimha_raju.pdf",
                      target: "_blank",
                      rel: "noopener",
                    } as Record<string, string>)}
                    onClick={() => setOpen(false)}
                  >
                    Download Resume
                  </GradientButton>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
