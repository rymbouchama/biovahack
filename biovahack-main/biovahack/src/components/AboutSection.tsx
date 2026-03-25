import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const features = [
  {
    step: "Axis 1",
    title: "Green & Bio Innovation",
    content:
      "Transform natural resources and waste into sustainable solutions. IoT sensors, digital bio-refining and blockchain to certify the carbon footprint of bio-materials.",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "Axis 2",
    title: "Health Tech",
    content:
      "Improve patient monitoring and diagnosis through digital tools. Real-time patient monitoring, predictive AI diagnostics and secure management of health bio-data across laboratories.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "Axis 3",
    title: "Pharma Tech",
    content:
      "Optimize drug production and access. Digital twins for bioreactors, connected cold-chain supply management, and personalized medication dosing based on individual biological data.",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop",
  },
];

const ibm  = "'IBM Plex Sans', sans-serif";
const mono = "'JetBrains Mono', monospace";

/* reusable fade-up wrapper */
const FadeUp = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

const AboutSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  const tracksRef = useRef(null);
  const tracksInView = useInView(tracksRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (4000 / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [progress]);

  return (
    <section id="about" className="py-24 relative" style={{ background: "#000" }}>
      <div className="container mx-auto px-6">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <FadeUp>
            <span
              className="text-sm mb-4 block tracking-widest uppercase"
              style={{ fontFamily: ibm, color: "#9FC13B" }}
            >
              // ABOUT
            </span>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6"
              style={{ fontFamily: mono, color: "#fff" }}
            >
              What is{" "}
              <span style={{ color: "#9FC13B" }}>BIOVATECH</span>?
            </h2>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p
              className="text-lg max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: ibm, color: "rgba(255,255,255,0.45)" }}
            >
              BIOVATECH is a 72-hour hackathon organized by Techwaves Club where students come
              together to build innovative solutions at the intersection of biology and technology.
              Whether you're a developer, designer, or scientist — there's a track for you.
            </p>
          </FadeUp>
        </div>

        {/* ── Three Tracks ── */}
        <div className="mb-20" ref={tracksRef}>
          <FadeUp delay={0.05}>
            <h3
              className="text-2xl md:text-3xl font-bold text-center mb-10"
              style={{ fontFamily: mono, color: "#fff" }}
            >
              The 3 Competition{" "}
              <span style={{ color: "#D8E02F" }}>Tracks</span>
            </h3>
          </FadeUp>

          <div className="flex flex-col md:grid md:grid-cols-[1fr_0.65fr] gap-6 md:gap-10 md:px-10">

            {/* Steps */}
            <div className="order-2 md:order-1 space-y-8 max-w-2xl">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-6 md:gap-8 cursor-pointer"
                  /* scroll reveal — staggered */
                  initial={{ opacity: 0, x: -28 }}
                  animate={tracksInView ? { opacity: index === currentFeature ? 1 : 0.3, x: 0 } : {}}
                  transition={{
                    duration: 0.80,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.20 + index * 0.15,
                  }}
                  onClick={() => { setCurrentFeature(index); setProgress(0); }}
                >
                  {/* circle */}
                  <motion.div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    animate={{
                      borderColor: index === currentFeature ? "#9FC13B" : "rgba(255,255,255,0.15)",
                      background:  index === currentFeature ? "rgba(159,193,59,0.12)" : "rgba(255,255,255,0.04)",
                      scale:       index === currentFeature ? 1.1 : 1,
                    }}
                    style={{ border: "2px solid", transition: "all 0.3s ease" }}
                  >
                    {index <= currentFeature ? (
                      <span style={{ color: "#9FC13B", fontWeight: 700, fontSize: "1rem" }}>✓</span>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>{index + 1}</span>
                    )}
                  </motion.div>

                  <div className="flex-1">
                    <h4
                      className="text-xl md:text-2xl font-semibold"
                      style={{
                        fontFamily: mono,
                        color: index === currentFeature ? "#fff" : "rgba(255,255,255,0.5)",
                        transition: "color 0.3s",
                      }}
                    >
                      {feature.title}
                    </h4>
                    <p
                      className="text-sm md:text-base mt-1 leading-relaxed"
                      style={{ fontFamily: ibm, color: "rgba(255,255,255,0.38)" }}
                    >
                      {feature.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Image panel */}
            <motion.div
              className="order-1 md:order-2 relative h-[200px] md:h-[350px] lg:h-[420px] overflow-hidden rounded-xl -ml-10 hidden md:block"
              initial={{ opacity: 0, x: 40 }}
              animate={tracksInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.90, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            >
              <AnimatePresence mode="wait">
                {features.map(
                  (feature, index) =>
                    index === currentFeature && (
                      <motion.div
                        key={index}
                        className="absolute inset-0 rounded-xl overflow-hidden"
                        initial={{ y: 100, opacity: 0, rotateX: -20 }}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        exit={{ y: -100, opacity: 0, rotateX: 20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-full object-cover"
                          style={{ filter: "brightness(0.75) saturate(0.9)" }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: "rgba(0,93,83,0.18)", mixBlendMode: "multiply" }}
                        />
                        <div
                          className="absolute bottom-0 left-0 right-0 h-2/3"
                          style={{ background: "linear-gradient(to top, #000 0%, transparent 100%)" }}
                        />
                        <div className="absolute bottom-4 left-4">
                          <span
                            className="text-xs tracking-widest uppercase block mb-1"
                            style={{ fontFamily: ibm, color: "#9FC13B" }}
                          >
                            {feature.step}
                          </span>
                          <p
                            className="text-xl font-bold"
                            style={{ fontFamily: mono, color: "#fff" }}
                          >
                            {feature.title}
                          </p>
                        </div>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;