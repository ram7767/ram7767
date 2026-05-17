import { motion } from "framer-motion";
import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";

const STATS_CARD_URL =
  "https://github-readme-stats-eight-theta.vercel.app/api?username=ram7767&show_icons=true&theme=transparent&hide_border=true&title_color=6C63FF&icon_color=6C63FF&text_color=C9D1D9&count_private=true";

const STREAK_CARD_URL =
  "https://streak-stats.demolab.com?user=ram7767&theme=transparent&hide_border=true&ring=6C63FF&fire=6C63FF&currStreakLabel=6C63FF";

const ACTIVITY_GRAPH_URL =
  "https://github-readme-activity-graph.vercel.app/graph?username=ram7767&theme=react-dark&hide_border=true&bg_color=00000000&color=6C63FF&line=6C63FF&point=FFFFFF";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Stats() {
  return (
    <section
      id="stats"
      className="py-20 md:py-28"
      style={{ contentVisibility: "auto", containIntrinsicSize: "420px" }}
    >
      <Container>
        <SectionTitle
          eyebrow="GitHub"
          title={
            <>
              <span className="gradient-text">Numbers</span> &amp; activity
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div {...fadeUp}>
            <GlassCard hoverable padded className="h-full">
              <img
                src={STATS_CARD_URL}
                alt="GitHub statistics for ram7767 including total commits, pull requests, and stars"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="w-full h-auto"
              />
            </GlassCard>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
            <GlassCard hoverable padded className="h-full">
              <img
                src={STREAK_CARD_URL}
                alt="GitHub contribution streak statistics for ram7767"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="w-full h-auto"
              />
            </GlassCard>
          </motion.div>
        </div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.16 }} className="mt-6">
          <GlassCard hoverable padded>
            <img
              src={ACTIVITY_GRAPH_URL}
              alt="GitHub contribution activity graph for ram7767 over the past year"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="w-full h-auto"
            />
          </GlassCard>
        </motion.div>
      </Container>
    </section>
  );
}
