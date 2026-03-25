import { Instagram, Facebook, Twitter, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";

const ibm  = "'IBM Plex Sans', sans-serif";
const mono = "'JetBrains Mono', monospace";

const navLinks = [
  { label: "About",    href: "/#about"    },
  { label: "Schedule", href: "/#schedule" },
  { label: "FAQ",      href: "/#faq"      },
  { label: "Location", href: "/#location" },
  { label: "Mentors",  href: "/#mentors"  },
  { label: "Jury",     href: "/#jury"     },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook,  href: "#", label: "Facebook"  },
  { icon: Twitter,   href: "#", label: "Twitter"   },
  { icon: Linkedin,  href: "#", label: "LinkedIn"  },
];

const Footer = () => {
  return (
    <footer
      className="relative"
      style={{
        background: "#000",
        borderTop: "1px solid rgba(159,193,59,0.10)",
      }}
    >
      <div className="container mx-auto px-6 pt-16 pb-8">

        {/* top grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12 mb-12">

          {/* brand column */}
          <div className="flex flex-col gap-5">
            <a href="/" className="flex items-center gap-3 w-fit">
              <img
                src="/logo.png"
                alt="BIOVATECH"
                style={{ height: 36, width: "auto", objectFit: "contain" }}
              />
            </a>

            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: ibm, color: "rgba(255,255,255,0.40)" }}
            >
              BIOVATECH is a 72-hour hackathon organized by Techwaves Club
              at ENSB Constantine — where biology meets technology.
            </p>

            {/* social icons */}
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    width: 36,
                    height: 36,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.40)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(159,193,59,0.10)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(159,193,59,0.30)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#9FC13B";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.40)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* nav links */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ fontFamily: ibm, color: "#9FC13B" }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm transition-colors duration-200"
                    style={{ fontFamily: ibm, color: "rgba(255,255,255,0.40)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact + info */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ fontFamily: ibm, color: "#9FC13B" }}
            >
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#9FC13B" }} />
                <span
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: ibm, color: "rgba(255,255,255,0.40)" }}
                >
                  ENSB Constantine<br />
                  Nouvelle Ville Ali Mendjeli
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#9FC13B" }} />
                <a
                  href="mailto:contact@techwaves.dz"
                  className="text-sm transition-colors duration-200"
                  style={{ fontFamily: ibm, color: "rgba(255,255,255,0.40)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#9FC13B")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
                >
                  contact@techwaves.dz
                </a>
              </li>
              <li className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 flex-shrink-0" style={{ color: "#9FC13B" }} />
                <a
                  href="#"
                  className="text-sm transition-colors duration-200"
                  style={{ fontFamily: ibm, color: "rgba(255,255,255,0.40)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#9FC13B")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
                >
                  techwaves.dz
                </a>
              </li>
            </ul>

            {/* CTA */}
            <a href="/register" className="inline-block mt-6">
              <button
                className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:opacity-85"
                style={{
                  fontFamily: ibm,
                  background: "#9FC13B",
                  color: "#0d0d0d",
                  boxShadow: "0 4px 20px rgba(159,193,59,0.20)",
                }}
              >
                Register Now →
              </button>
            </a>
          </div>

        </div>

        {/* divider */}
        <div
          className="w-full mb-6"
          style={{ height: 1, background: "rgba(255,255,255,0.06)" }}
        />

        {/* bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs"
            style={{ fontFamily: mono, color: "rgba(255,255,255,0.20)" }}
          >
            © 2025 BIOVATECH · Organized by{" "}
            <span style={{ color: "rgba(159,193,59,0.55)" }}>Techwaves Club</span>
          </p>

          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ fontFamily: ibm, color: "rgba(255,255,255,0.22)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;