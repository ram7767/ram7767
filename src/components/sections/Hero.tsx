import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import GradientButton from "../ui/GradientButton";
import IpadDevice from "../hero/IpadDevice";
import MockIosApp from "../hero/MockIosApp";
import { profile } from "../../data/profile";

const ROTATING_TITLES = [
  "Senior iOS Developer",
  "Senior Mobile Developer",
  "SwiftUI · Flutter · Firebase",
];

const TYPING_SPEED_MS = 70;
const DELETING_SPEED_MS = 40;
const HOLD_AFTER_TYPE_MS = 1600;
const HOLD_AFTER_DELETE_MS = 350;

function useRotatingTyper(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting" | "pausing">(
    "typing"
  );

  useEffect(() => {
    const current = words[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          TYPING_SPEED_MS
        );
      } else {
        timeout = setTimeout(() => setPhase("deleting"), HOLD_AFTER_TYPE_MS);
      }
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          DELETING_SPEED_MS
        );
      } else {
        timeout = setTimeout(() => {
          setIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, HOLD_AFTER_DELETE_MS);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index, words]);

  return text;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Hero() {
  const typed = useRotatingTyper(ROTATING_TITLES);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center py-16 md:py-24 lg:py-28 pt-28 md:pt-32 overflow-x-clip"
    >
      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-14">
          {/* Left column: text block */}
          <div className="md:col-span-6 flex flex-col items-start gap-6 md:gap-8 min-w-0">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="glass inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-[11px] sm:text-xs font-medium text-ink-100"
            >
              <span className="relative inline-flex h-2.5 w-2.5 flex-none">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="whitespace-normal break-words leading-snug">
                Available for senior mobile roles
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-ink-50"
            >
              <span className="block">
                Hi, I&apos;m{" "}
                <span className="gradient-text">{profile.shortName}</span>.
              </span>
              <span className="mt-2 block min-h-[1.2em] break-words">
                <span className="gradient-text" aria-live="polite">
                  {typed}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] animate-pulse bg-brand-400 align-middle"
                />
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-xl text-base md:text-lg text-ink-200"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <GradientButton size="lg" href="#projects">
                View Projects
              </GradientButton>
              <GradientButton size="lg" variant="ghost" href="#contact">
                Get in touch
              </GradientButton>
            </motion.div>
          </div>

          {/* Right column: iPad device */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="md:col-span-6 w-full min-w-0 flex justify-center md:justify-end"
          >
            <div
              className="
                relative w-full max-w-md md:max-w-none mx-auto
                drop-shadow-[0_30px_60px_rgba(8,8,24,0.6)]
                transform-none
                md:[transform:perspective(1400px)_rotateY(-6deg)_rotateX(4deg)]
              "
            >
              <IpadDevice>
                <MockIosApp />
              </IpadDevice>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
