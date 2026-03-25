import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Github, Twitter, Linkedin,
  ChevronLeft, ChevronRight,
  Dna, Code2, BarChart3,
} from "lucide-react";

interface JuryMember {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  domain: "biotech" | "tech" | "business";
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

const domainConfig = {
  biotech:  { icon: Dna,       label: "Biotech",  color: "#9FC13B", border: "rgba(159,193,59,0.30)",  bg: "rgba(159,193,59,0.08)"  },
  tech:     { icon: Code2,     label: "Tech",     color: "#005D53", border: "rgba(0,93,83,0.40)",     bg: "rgba(0,93,83,0.10)"     },
  business: { icon: BarChart3, label: "Business", color: "#D8E02F", border: "rgba(216,224,47,0.30)",  bg: "rgba(216,224,47,0.08)"  },
};

const JurySection = () => {
  const [juryMembers, setJuryMembers] = useState<JuryMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    const fetchJury = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/jury");
        const data = await res.json();

        console.log("Jury API:", data);

        if (res.ok) {
          setJuryMembers(data.data || data);
        } else {
          console.error("API error:", data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJury();
  }, []);

  // 🛑 Loading states
  if (loading) return <div className="text-white text-center py-20">Loading jury...</div>;
  if (juryMembers.length === 0) return <div className="text-white text-center py-20">No jury members found</div>;

  const handleNext = () => { setDirection(1); setCurrentIndex((i) => (i + 1) % juryMembers.length); };
  const handlePrevious = () => { setDirection(-1); setCurrentIndex((i) => (i - 1 + juryMembers.length) % juryMembers.length); };
  const goTo = (i: number) => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); };

  const member = juryMembers[currentIndex];
  const domain = domainConfig[member.domain];
  const DomainIcon = domain.icon;

  const socials = [
    { icon: Github,   url: member.githubUrl,   label: "GitHub"   },
    { icon: Twitter,  url: member.twitterUrl,  label: "Twitter"  },
    { icon: Linkedin, url: member.linkedinUrl, label: "LinkedIn" },
  ].filter((s) => s.url);

  const fadeVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const textVariants = {
    enter: (d: number) => ({ opacity: 0, y: d * 12 }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d * -12 }),
  };

  const Badge = () => (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: domain.color, borderColor: domain.border, background: domain.bg }}
    >
      <DomainIcon className="w-3 h-3" />
      {domain.label}
    </div>
  );

  return (
    <section id="jury" className="py-24 relative overflow-hidden" style={{ background: "#000" }} ref={sectionRef}>
      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.span
            className="text-sm mb-4 block tracking-widest uppercase"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#9FC13B" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            // JURY
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#fff" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Meet the <span style={{ color: "#D8E02F" }}>Experts</span>
          </motion.h2>
        </div>

        {/* CAROUSEL */}
        <div className="flex justify-center items-center gap-6 mt-8 flex-col md:flex-row">
          <button onClick={handlePrevious} className="text-white p-2"><ChevronLeft /></button>

          <div className="text-center max-w-sm md:max-w-md">
            {/* IMAGE */}
            <div className="w-64 h-64 mx-auto rounded-xl overflow-hidden mb-4 border border-gray-700">
              <AnimatePresence mode="wait">
                <motion.img
                  key={member.imageUrl}
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  variants={fadeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/500"; }}
                  draggable={false}
                />
              </AnimatePresence>
            </div>

            <Badge />
            <h2 className="text-xl font-bold mt-2">{member.name}</h2>
            <p className="text-sm opacity-60">{member.title}</p>
            <p className="text-sm mt-2 max-w-md mx-auto">{member.description}</p>

            {socials.length > 0 && (
              <div className="flex justify-center gap-3 mt-3">
                {socials.map(({ icon: Icon, url, label }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer">
                    <Icon className="w-5 h-5 text-white/70" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleNext} className="text-white p-2"><ChevronRight /></button>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {juryMembers.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-green-400 w-6" : "bg-white/30 w-2"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JurySection;