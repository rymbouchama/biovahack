import { motion } from "framer-motion";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

type Logo = {
  name: string;
  logo: string;
};

const logos: Logo[] = [
  { name: "GitHub",     logo: "https://svgl.app/library/github_wordmark_light.svg" },
  { name: "Vercel",     logo: "https://svgl.app/library/vercel_wordmark.svg" },
  { name: "Supabase",   logo: "https://svgl.app/library/supabase_wordmark_light.svg" },
  { name: "OpenAI",     logo: "https://svgl.app/library/openai_wordmark_light.svg" },
  { name: "Nvidia",     logo: "https://svgl.app/library/nvidia-wordmark-light.svg" },
  { name: "Turso",      logo: "https://svgl.app/library/turso-wordmark-light.svg" },
  { name: "Clerk",      logo: "https://svgl.app/library/clerk-wordmark-light.svg" },
  { name: "Claude AI",  logo: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg" },
  { name: "Next.js",    logo: "https://svgl.app/library/nextjs_icon_dark.svg" },
  { name: "Tailwind",   logo: "https://svgl.app/library/tailwindcss.svg" },
  { name: "Figma",      logo: "https://svgl.app/library/figma_wordmark_dark.svg" },
  { name: "Stripe",     logo: "https://svgl.app/library/stripe_wordmark_dark.svg" },
];

const row1 = logos.slice(0, 6);
const row2 = logos.slice(6);

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="py-24 relative overflow-hidden" style={{ background: "#000" }}>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-sm mb-4 block tracking-widest uppercase"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#9FC13B" }}
          >
            // SPONSORS & PARTNERS
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#fff" }}
          >
            Trusted by
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.40)" }}
          >
            BIOVATECH is made possible by organizations committed to advancing
            biotechnology and innovation in Algeria.
          </p>
        </motion.div>
      </div>

      {/* top divider */}
      <div
        className="h-px w-full max-w-2xl mx-auto mb-10"
        style={{ background: "linear-gradient(to right, transparent, rgba(159,193,59,0.25), transparent)" }}
      />

      {/* Row 1 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] mb-5"
      >
        <InfiniteSlider gap={48} duration={35} durationOnHover={70} reverse={false}>
          {row1.map((s) => <LogoChip key={s.name} logo={s} />)}
        </InfiniteSlider>
      </motion.div>

      {/* Row 2 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      >
        <InfiniteSlider gap={48} duration={45} durationOnHover={70} reverse={true}>
          {row2.map((s) => <LogoChip key={s.name} logo={s} />)}
        </InfiniteSlider>
      </motion.div>

      {/* bottom divider */}
      <div
        className="h-px w-full max-w-2xl mx-auto mt-10"
        style={{ background: "linear-gradient(to right, transparent, rgba(159,193,59,0.25), transparent)" }}
      />

    </section>
  );
};

function LogoChip({ logo }: { logo: Logo }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex items-center justify-center h-12 px-6 rounded-xl cursor-default"
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <img
        src={logo.logo}
        alt={logo.name}
        className="h-5 md:h-6 select-none pointer-events-none brightness-0 invert opacity-50"
        draggable={false}
        loading="lazy"
      />
    </motion.div>
  );
}

export default SponsorsSection;