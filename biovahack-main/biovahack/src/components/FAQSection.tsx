import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Who can participate?",  a: "Anyone! Whether you're a student or just curious about biotech and tech, you're welcome to join. No prior hackathon experience needed." },
  { q: "Do I need a team?",     a: "Nope! You can come solo and we'll help you find teammates during the event. Teams can be 1–4 people." },
  { q: "What should I bring?",  a: "Your laptop, charger, and enthusiasm! We'll provide food, drinks, snacks, and a comfortable hacking space." },
  { q: "Is it free?",           a: "Yes! BIOVATECH is completely free. We provide meals, snacks, swag, and access to all workshops and mentors." },
  { q: "What can I build?",     a: "Solutions across Green & Bio Innovation, Health Tech, or Pharma Tech. Web apps, mobile apps, hardware, AI tools — the only limit is your imagination." },
  { q: "Will there be prizes?", a: "Absolutely! We have prizes across multiple categories including Best Overall, Best Design, Most Innovative, and track-specific awards." },
];

const ibm  = "'IBM Plex Sans', sans-serif";
const mono = "'JetBrains Mono', monospace";

const FAQSection = () => {
  const headerRef = useRef(null);
  const listRef   = useRef(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const listInView   = useInView(listRef,   { once: true, margin: "-60px" });

  return (
    <section id="faq" className="py-24 relative" style={{ background: "#000" }}>
      <div className="container mx-auto px-6">

        {/* header */}
        <div className="text-center mb-16" ref={headerRef}>
          <motion.span
            className="text-sm mb-4 block tracking-widest uppercase"
            style={{ fontFamily: ibm, color: "#9FC13B" }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            // FAQ
          </motion.span>

          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ fontFamily: mono, color: "#fff" }}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Got <span style={{ color: "#D8E02F" }}>Questions</span>?
          </motion.h2>
        </div>

        {/* accordion list */}
        <div className="max-w-3xl mx-auto" ref={listRef}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={listInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.80,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.10 + i * 0.08,
                }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="rounded-xl px-6 transition-all duration-300 data-[state=open]:border-[#9FC13B]/25"
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <AccordionTrigger
                    className="text-left hover:no-underline py-5 hover:opacity-80"
                    style={{
                      fontFamily: mono,
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: "#fff",
                    }}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="pb-5 leading-relaxed"
                    style={{
                      fontFamily: ibm,
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;