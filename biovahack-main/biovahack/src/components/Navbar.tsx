import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const links = [
  { label: "About",    href: "/#about" },
  { label: "FAQ",      href: "/#faq" },
  { label: "Location", href: "/#location" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - (scrollYProgress.getPrevious() ?? 0);
      if (scrollYProgress.get() < 0.04) {
        setVisible(true);
      } else if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
        style={{
          background: "rgba(0,0,0,0.85)",
          borderColor: "rgba(159,193,59,0.08)",
        }}
      >
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">

          {/* ── Logo ── */}
          <a href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="BIOVATECH"
              style={{ height: "32px", width: "auto", objectFit: "contain" }}
            />
          </a>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-sm relative group transition-colors duration-200"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.40)" }}
                whileHover={{ y: -1, color: "#fff" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px transition-all duration-300"
                  style={{ background: "rgba(159,193,59,0.5)" }}
                />
              </motion.a>
            ))}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:block">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a href="/register">
                <button
                  className="text-sm px-5 py-2 rounded-xl transition-all duration-200"
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontWeight: 600,
                    border: "1px solid rgba(159,193,59,0.35)",
                    background: "transparent",
                    color: "#fff",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(159,193,59,0.10)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(159,193,59,0.6)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(159,193,59,0.35)";
                  }}
                >
                  Register Now
                </button>
              </a>
            </motion.div>
          </div>

          {/* ── Mobile hamburger ── */}
          <div className="md:hidden">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <button
                  aria-expanded={isOpen}
                  className="group flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
                  style={{
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  <svg
                    className="pointer-events-none"
                    width={16} height={16}
                    viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                sideOffset={12}
                className="w-52 p-0 rounded-xl overflow-hidden md:hidden"
                style={{
                  background: "rgba(5,5,5,0.97)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(159,193,59,0.12)",
                }}
              >
                <div className="flex flex-col py-2">
                  {links.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.05 }}
                      className="text-sm px-5 py-3 transition-colors duration-150"
                      style={{
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        color: "rgba(255,255,255,0.40)",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
                    >
                      {link.label}
                    </motion.a>
                  ))}

                  <div className="mx-4 my-2 h-px" style={{ background: "rgba(159,193,59,0.10)" }} />

                  <motion.div
                    className="px-3 pb-1"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <a href="/register" onClick={() => setIsOpen(false)}>
                      <button
                        className="w-full py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                        style={{
                          fontFamily: "'IBM Plex Sans', sans-serif",
                          border: "1px solid rgba(159,193,59,0.35)",
                          background: "transparent",
                          color: "#fff",
                        }}
                      >
                        Register Now
                      </button>
                    </a>
                  </motion.div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

        </div>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;