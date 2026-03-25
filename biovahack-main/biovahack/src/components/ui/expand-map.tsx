import { useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

interface LocationMapProps {
  location?: string
  coordinates?: string
  className?: string
}

export function LocationMap({
  location = "ENSB — Constantine, DZ",
  coordinates = "36.3650° N, 6.6147° E",
  className,
}: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-50, 50], [6, -6])
  const rotateY = useTransform(mouseX, [-50, 50], [-6, 6])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - (rect.left + rect.width / 2))
    mouseY.set(e.clientY - (rect.top + rect.height / 2))
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // brand teal: #D8E02F
  const teal       = "rgba(216,224,47,"
  const tealSolid  = "#D8E02F"
  const tealLight  = "#D8E02F"

  return (
    <motion.div
      ref={containerRef}
      className={`relative select-none ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          width: 360,
          height: 280,
          background: "#000",
          border: `1px solid ${teal}0.35)`,
        }}
      >
        {/* map bg */}
        <div className="absolute inset-0" style={{ background: "#050500" }} />

        {/* road lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.line x1="0%" y1="35%" x2="100%" y2="35%" stroke={`${teal}0.30)`} strokeWidth="4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.1 }} />
          <motion.line x1="0%" y1="65%" x2="100%" y2="65%" stroke={`${teal}0.30)`} strokeWidth="4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
          <motion.line x1="30%" y1="0%" x2="30%" y2="100%" stroke={`${teal}0.22)`} strokeWidth="3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.3 }} />
          <motion.line x1="70%" y1="0%" x2="70%" y2="100%" stroke={`${teal}0.22)`} strokeWidth="3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
          {[20, 50, 80].map((y, i) => (
            <motion.line key={`h-${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
              stroke={`${teal}0.09)`} strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }} />
          ))}
          {[15, 45, 55, 85].map((x, i) => (
            <motion.line key={`v-${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
              stroke={`${teal}0.09)`} strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }} />
          ))}
        </svg>

        {/* buildings */}
        {[
          { top: "40%", left: "10%",  w: "15%", h: "20%" },
          { top: "15%", left: "35%",  w: "12%", h: "15%" },
          { top: "70%", left: "75%",  w: "18%", h: "18%" },
          { top: "20%", right: "10%", w: "10%", h: "25%" },
          { top: "55%", left: "5%",   w: "8%",  h: "12%" },
          { top: "8%",  left: "75%",  w: "14%", h: "10%" },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-sm"
            style={{
              ...s,
              width: s.w, height: s.h,
              background: `${teal}0.13)`,
              border: `1px solid ${teal}0.18)`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
          />
        ))}

        {/* pin */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, y: -20 }} animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            style={{ filter: `drop-shadow(0 0 10px ${tealSolid}cc)` }}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={tealLight} />
            <circle cx="12" cy="9" r="2.5" fill="#000" />
          </svg>
        </motion.div>

        {/* bottom fade */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, #000 0%, transparent 40%)" }} />

        {/* LIVE badge */}
        <div
          className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ background: `${teal}0.10)`, border: `1px solid ${teal}0.25)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: tealLight }} />
          <span className="text-[10px] font-mono font-medium tracking-widest uppercase" style={{ color: tealLight }}>
            Live
          </span>
        </div>

        {/* location label */}
        <div className="absolute bottom-4 left-5 z-10">
          <p className="font-mono text-sm font-bold text-white leading-tight">{location}</p>
          <p className="font-mono text-xs mt-0.5" style={{ color: `${teal}0.7)` }}>{coordinates}</p>
          <div className="mt-1.5 h-px w-32"
            style={{ background: `linear-gradient(to right, ${teal}0.5), transparent)` }} />
        </div>
      </motion.div>
    </motion.div>
  )
}