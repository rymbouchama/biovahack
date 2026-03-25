import { motion } from "framer-motion";
import { Navigation } from "lucide-react";
import { LocationMap } from "@/components/ui/expand-map";

const details = [
  {
    label: "Venue",
    value: "ENSB — École Nationale Supérieure de Biotechnologie",
    sub: "Constantine, Algeria",
  },
  {
    label: "Date",
    value: "April 27, 2025",
    sub: "72 hours non-stop",
  },
  {
    label: "Duration",
    value: "72 Hours",
    sub: "Kick-off · Hack · Pitch",
  },
  {
    label: "Format",
    value: "On-site only",
    sub: "Teams of 2 – 4 participants",
  },
];

const LocationSection = () => {
  return (
    <section id="location" className="py-24 relative overflow-hidden" style={{ background: "#000" }}>

      <div className="container mx-auto px-6 relative z-10">
        {/* header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-sm mb-4 block tracking-widest uppercase"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#9FC13B" }}
          >
            // LOCATION
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#fff" }}
          >
            Where the{" "}
            <span style={{ color: "#D8E02F" }}>Hack</span>{" "}
            Happens
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.45)" }}
          >
            Join us on-site at ENSB for 72 hours of biotechnology innovation,
            mentorship, and collaboration.
          </p>
        </motion.div>

        {/* main grid */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-14 justify-center">

          {/* map */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-2"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.25)" }}
            >
              // Interactive Map
            </p>
            <LocationMap
              location="ENSB — Constantine, DZ"
              coordinates="36.3650° N, 6.6147° E"
            />
          </motion.div>

          {/* detail cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {details.map(({ label, value, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-xl p-5 group overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {/* corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#9FC13B]/20 rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#9FC13B]/20 rounded-br-xl" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  style={{ background: "rgba(159,193,59,0.03)" }}
                />

                <div className="relative z-10 flex flex-col gap-2">
                  <span
                    className="text-[10px] uppercase tracking-widest"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#9FC13B" }}
                  >
                    {label}
                  </span>
                  <p
                    className="text-sm font-bold leading-snug"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "#fff" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.35)" }}
                  >
                    {sub}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* directions CTA */}
            <motion.a
              href="https://maps.google.com/?q=Ecole+Nationale+Superieure+de+Biotechnologie+Constantine+Algeria"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="sm:col-span-2 flex items-center justify-between rounded-xl px-5 py-4 group transition-all duration-200"
              style={{
                border: "1px solid rgba(159,193,59,0.20)",
                background: "rgba(159,193,59,0.05)",
              }}
            >
              <div className="flex items-center gap-3">
                <Navigation className="w-4 h-4" style={{ color: "#9FC13B" }} />
                <span
                  className="text-sm font-medium"
                  style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#fff" }}
                >
                  Get Directions
                </span>
              </div>
              <span
                className="text-xs transition-colors duration-200 group-hover:text-[#9FC13B]"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.25)" }}
              >
                Google Maps →
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;