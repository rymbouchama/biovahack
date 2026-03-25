import { useEffect, useState, useMemo, useRef } from "react";
import { ArrowRight, Code2 } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [titleNumber, setTitleNumber] = useState(0);

  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true, margin: "-40px" });

  const titles = useMemo(() => [
    "Innovate", "Create", "Build", "Disrupt", "Design", "Solve", "Launch",
  ], []);

  useEffect(() => {
    const id = setTimeout(() => {
      setTitleNumber((n) => (n === titles.length - 1 ? 0 : n + 1));
    }, 3000);
    return () => clearTimeout(id);
  }, [titleNumber, titles]);

  useEffect(() => {
    const calc = () => {
      const target = new Date("2026-04-27T00:00:00").getTime();
      const dist = target - Date.now();
      if (dist <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days:    Math.floor(dist / 86400000),
        hours:   Math.floor((dist % 86400000) / 3600000),
        minutes: Math.floor((dist % 3600000) / 60000),
        seconds: Math.floor((dist % 60000) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);

  const timeUnits = [
    { label: "Days",  value: timeLeft.days    },
    { label: "Hours", value: timeLeft.hours   },
    { label: "Mins",  value: timeLeft.minutes },
    { label: "Secs",  value: timeLeft.seconds },
  ];

  // shared ease
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative overflow-hidden" style={{ background: "#000" }}>
      <div className="absolute inset-0" style={{ background: "#000" }} />

      {/* ════════════════════════════════
          MOBILE layout (< sm)
      ════════════════════════════════ */}
      <div className="sm:hidden relative z-10 flex flex-col pt-20 pb-10" ref={contentRef}>

        {/* row: logo left | heading right */}
        <div className="flex items-center gap-0 px-4">

          {/* logo */}
          <motion.div
            className="relative flex-shrink-0"
            style={{ width: "62%", aspectRatio: "1/1" }}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.90, ease }}
          >
            <video
              autoPlay loop muted playsInline
              style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
              src="/logovid.MOV"
            />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to right, transparent 50%, #000 100%)" }} />
          </motion.div>

          {/* heading right */}
          <div className="flex flex-col items-end text-right" style={{ flex: 1, marginLeft: "-6%" }}>
            <motion.p
              className="text-[9px] tracking-[0.20em] uppercase mb-3"
              style={{ color: "#9FC13B", fontFamily: "'IBM Plex Sans', sans-serif" }}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.80, ease, delay: 0.10 }}
            >
              Techwaves · ENSB
            </motion.p>
            <motion.h1
              className="uppercase"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 11vw, 3.2rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease, delay: 0.16 }}
            >
              <span style={{ color: "#fff" }}>BIO.</span>
              <br />
              <span style={{ color: "#9FC13B" }}>HACK.</span>
              <br />
              <span className="relative flex justify-end overflow-hidden" style={{ height: "1.15em", marginTop: "0.05em" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleNumber}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.55, ease }}
                    style={{ color: "#D8E02F", position: "absolute" }}
                  >
                    {titles[titleNumber]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>
          </div>
        </div>

        {/* countdown */}
        <motion.div
          className="flex justify-center gap-6 mt-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease, delay: 0.28 }}
        >
          {timeUnits.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: "1.4rem",
                color: "#fff",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}>
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[9px] tracking-[0.18em] uppercase"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.25)" }}>
                {unit.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* date */}
        <motion.p
          className="text-center text-[10px] mt-3 tracking-[0.2em] uppercase"
          style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.22)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.80, ease, delay: 0.36 }}
        >
          April 27, 2026
        </motion.p>
      </div>

      {/* ════════════════════════════════
          DESKTOP layout (sm+)
      ════════════════════════════════ */}
      <div className="hidden sm:flex items-center py-24 pt-32">

        {/* video left — slides in from left */}
        <motion.div
          className="absolute top-0 left-0 h-full z-[1]"
          style={{ width: "50%" }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease }}
        >
          <video
            autoPlay loop muted playsInline
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: "-2%", height: "58%", aspectRatio: "1/1", objectFit: "cover" }}
            src="/logovid.MOV"
          />
          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent 30%, #000 90%)" }} />
          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #000 0%, transparent 20%, transparent 80%, #000 100%)" }} />
        </motion.div>

        {/* content right */}
        <div
          className="relative z-20 ml-auto w-full lg:w-[60%] px-12 lg:pr-20 lg:pl-0 py-24 pt-32 flex flex-col"
          ref={contentRef}
        >
          {/* eyebrow */}
          <motion.p
            className="text-xs tracking-[0.25em] uppercase mb-8"
            style={{ color: "#9FC13B", fontFamily: "'IBM Plex Sans', sans-serif" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.20 }}
          >
            Techwaves Club &nbsp;·&nbsp; ENSB Constantine
          </motion.p>

          {/* heading */}
          <motion.h1
            className="uppercase mb-6"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.90, ease, delay: 0.30 }}
          >
            <span style={{ color: "#fff" }}>BIO.</span>
            <br />
            <span style={{ color: "#9FC13B" }}>HACK.</span>
            <br />
            <span className="relative flex overflow-hidden" style={{ height: "1.15em", marginTop: "0.05em" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleNumber}
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  exit={{ opacity: 0, y: "-100%" }}
                  transition={{ duration: 0.55, ease }}
                  style={{ color: "#D8E02F", position: "absolute" }}
                >
                  {titles[titleNumber]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* body */}
          <motion.p
            className="text-sm sm:text-base max-w-md mb-2 leading-relaxed"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.45)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.40 }}
          >
            72 hours to turn biotechnology into real digital solutions.
            Green Tech · Health Tech · Pharma Tech.
          </motion.p>

          <motion.p
            className="text-xs mb-10 tracking-[0.2em] uppercase"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.25)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.80, ease, delay: 0.46 }}
          >
            April 27, 2026
          </motion.p>

          {/* countdown */}
          <motion.div
            className="flex gap-6 sm:gap-8 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.50 }}
          >
            {timeUnits.map((unit) => (
              <div key={unit.label} className="flex flex-col">
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  color: "#fff",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[10px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.25)" }}>
                  {unit.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* shadow line */}
          <motion.div
            className="w-56 mb-10 mt-3"
            style={{
              transformOrigin: "left",
              height: "1px",
              background: "linear-gradient(to right, rgba(255,255,255,0.10), transparent)",
              marginBottom: "2.5rem",
              marginTop: "0.75rem",
              width: "14rem",
              boxShadow: "0 4px 16px 0 rgba(0,0,0,0.8)",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.80, ease, delay: 0.58 }}
          />

          {/* CTAs */}
          <motion.div
            className="flex items-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.62 }}
          >
            <a href="/register">
              <button
                className="flex items-center gap-2 px-7 py-3 text-sm font-semibold transition-all duration-200 hover:opacity-85 hover:scale-[1.02]"
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  background: "#9FC13B",
                  color: "#0d0d0d",
                  borderRadius: "10px",
                  boxShadow: "0 8px 32px rgba(159,193,59,0.25), 0 2px 8px rgba(0,0,0,0.6)",
                }}
              >
                <Code2 className="w-4 h-4" />
                Register Now
              </button>
            </a>
            <a href="/#about"
              className="flex items-center gap-1.5 text-sm transition-opacity duration-200 hover:opacity-70"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.35)" }}>
              Learn More
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 z-30 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #000)" }} />
    </section>
  );
};

export default HeroSection;