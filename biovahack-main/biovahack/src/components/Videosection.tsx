import * as React from "react";
import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const ibm  = "'IBM Plex Sans', sans-serif";
const mono = "'JetBrains Mono', monospace";

const VideoSection = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <section id="video" className="py-24 relative" style={{ background: "#000" }} ref={sectionRef}>
      <div className="container mx-auto px-6">

        {/* header */}
        <div className="text-center mb-12">
          <motion.span
            className="text-sm mb-4 block tracking-widest uppercase"
            style={{ fontFamily: ibm, color: "#9FC13B" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            // AFTERMOVIE
          </motion.span>

          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: mono, color: "#fff" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Feel the <span style={{ color: "#D8E02F" }}>Energy</span>
          </motion.h2>

          <motion.p
            className="text-base max-w-xl mx-auto"
            style={{ fontFamily: ibm, color: "rgba(255,255,255,0.45)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            Watch what happened last edition — 72 hours of building,
            breaking, and shipping at ENSB Constantine.
          </motion.p>
        </div>

        {/* thumbnail player */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.90, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
        >
          <div
            className="group relative cursor-pointer overflow-hidden rounded-2xl"
            style={{ aspectRatio: "16/9", border: "1px solid rgba(159,193,59,0.12)" }}
            onClick={() => setIsOpen(true)}
            onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
            tabIndex={0}
            aria-label="Play BIOVATECH aftermovie"
          >
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
              alt="BIOVATECH aftermovie thumbnail"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)" }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(159,193,59,0.06)" }} />

            {/* play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                style={{ width: 72, height: 72, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.20)" }}
              >
                <Play style={{ width: 28, height: 28, fill: "#9FC13B", color: "#9FC13B", marginLeft: 3 }} />
              </div>
            </div>

            {/* bottom label */}
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-xs tracking-widest uppercase mb-1" style={{ fontFamily: ibm, color: "#9FC13B" }}>
                BIOVATECH — Edition 01
              </p>
              <h3 className="text-2xl font-bold" style={{ fontFamily: mono, color: "#fff" }}>The Aftermovie</h3>
              <p className="text-sm mt-1" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.55)" }}>
                72 hours · ENSB Constantine · Techwaves Club
              </p>
            </div>

            {/* corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
              style={{ borderTop: "1px solid rgba(159,193,59,0.30)", borderLeft: "1px solid rgba(159,193,59,0.30)", borderRadius: "14px 0 0 0" }} />
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
              style={{ borderTop: "1px solid rgba(159,193,59,0.30)", borderRight: "1px solid rgba(159,193,59,0.30)", borderRadius: "0 14px 0 0" }} />
            <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none"
              style={{ borderBottom: "1px solid rgba(159,193,59,0.30)", borderLeft: "1px solid rgba(159,193,59,0.30)", borderRadius: "0 0 0 14px" }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
              style={{ borderBottom: "1px solid rgba(159,193,59,0.30)", borderRight: "1px solid rgba(159,193,59,0.30)", borderRadius: "0 0 14px 0" }} />
          </div>
        </motion.div>
      </div>

      {/* modal — animated too */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.90)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 z-50 flex items-center justify-center rounded-full transition-colors duration-200"
              style={{ width: 40, height: 40, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              className="w-full max-w-4xl px-4"
              style={{ aspectRatio: "16/9" }}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="BIOVATECH Aftermovie"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoSection;