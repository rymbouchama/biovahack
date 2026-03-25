import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { User } from "lucide-react";

const mentors = [
  { id: 1, name: "Rahma Zendaoui",  role: "Software & AI Expert", track: "software" },
  { id: 2, name: "Rym Bouchama",    role: "Software & AI Expert", track: "software" },
  { id: 3, name: "Ahmed Mansori",   role: "Software & AI Expert", track: "software" },
  { id: 4, name: "Dorsane Zertit",  role: "Biotechnology Expert", track: "biotech"  },
  { id: 5, name: "Mahinar Zertit",  role: "Biotechnology Expert", track: "biotech"  },
  { id: 6, name: "Mouad Boucharb",  role: "Graphic Designer",     track: "design"   },
];

const trackConfig: Record<string, { label: string; color: string; bg: string }> = {
  software: { label: "Software & AI", color: "#9FC13B", bg: "#1a2200" },
  biotech:  { label: "Biotechnology", color: "#D8E02F", bg: "#1f2100" },
  design:   { label: "Design",        color: "#7dd3c8", bg: "#001a18" },
};

const ibm  = "'IBM Plex Sans', sans-serif";
const mono = "'JetBrains Mono', monospace";
const AVATAR_SIZE = 56;
const OVERLAP     = 18;

const MentorsSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const sectionRef  = useRef(null);
  const avatarsRef  = useRef(null);
  const headerInView  = useInView(sectionRef,  { once: true, margin: "-60px" });
  const avatarsInView = useInView(avatarsRef,  { once: true, margin: "-40px" });

  return (
    <section id="mentors" className="py-24 relative" style={{ background: "#000" }} ref={sectionRef}>
      <div className="container mx-auto px-6">

        {/* header */}
        <div className="text-center mb-16">
          <motion.span
            className="text-sm mb-4 block tracking-widest uppercase"
            style={{ fontFamily: ibm, color: "#9FC13B" }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            // MENTORS
          </motion.span>

          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ fontFamily: mono, color: "#fff" }}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Meet Your <span style={{ color: "#D8E02F" }}>Guides</span>
          </motion.h2>

          <motion.p
            className="text-base max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: ibm, color: "rgba(255,255,255,0.45)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            Industry experts and researchers ready to support your team
            throughout the 72 hours — from ideation to final pitch.
          </motion.p>
        </div>

        {/* stacked avatar group */}
        <div className="flex flex-col items-center gap-10" ref={avatarsRef}>
          <div className="flex items-center justify-center" style={{ paddingTop: 16 }}>
            {mentors.map((mentor, index) => {
              const track   = trackConfig[mentor.track];
              const isHover = hoveredId === mentor.id;
              const total   = mentors.length;

              return (
                <motion.div
                  key={mentor.id}
                  className="relative"
                  style={{
                    marginLeft: index === 0 ? 0 : -OVERLAP,
                    zIndex: isHover ? 50 : total - index,
                  }}
                  /* scroll reveal — stagger each avatar */
                  initial={{ opacity: 0, y: 30, scale: 0.85 }}
                  animate={avatarsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.80,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.20 + index * 0.07,
                  }}
                  onMouseEnter={() => setHoveredId(mentor.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* tooltip */}
                  <AnimatePresence>
                    {isHover && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="absolute left-1/2 -translate-x-1/2 pointer-events-none rounded-xl shadow-lg px-4 py-2 border"
                        style={{
                          bottom: "calc(100% + 10px)",
                          background: "#fff",
                          borderColor: "rgba(0,0,0,0.08)",
                          minWidth: 148,
                          whiteSpace: "nowrap",
                        }}
                      >
                        <p className="font-bold text-center text-sm"
                          style={{ fontFamily: mono, color: "#0d0d0d" }}>
                          {mentor.name}
                        </p>
                        <p className="text-xs text-center mt-0.5"
                          style={{ fontFamily: ibm, color: "#666" }}>
                          {mentor.role}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* avatar */}
                  <motion.div
                    animate={{ y: isHover ? -8 : 0, scale: isHover ? 1.08 : 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    className="rounded-full"
                    style={{
                      width: AVATAR_SIZE,
                      height: AVATAR_SIZE,
                      padding: 2,
                      background: isHover
                        ? `linear-gradient(135deg, ${track.color}, #222)`
                        : "#1a1a1a",
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center"
                      style={{ background: track.bg, border: "2px solid #000" }}
                    >
                      <User
                        strokeWidth={1.5}
                        style={{
                          width: AVATAR_SIZE * 0.44,
                          height: AVATAR_SIZE * 0.44,
                          color: track.color,
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* legend */}
          <motion.div
            className="flex justify-center gap-6 flex-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={avatarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.20 + mentors.length * 0.07 }}
          >
            {Object.entries(trackConfig).map(([key, t]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                <span className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: ibm, color: "rgba(255,255,255,0.35)" }}>
                  {t.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default MentorsSection;