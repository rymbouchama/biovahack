import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Check, Loader2,
  User, Users, GraduationCap, Linkedin, Phone,
  Instagram, Facebook, Link2, Plus, Trash2, Terminal, Mail,
} from "lucide-react";

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

interface Teammate { 
  name: string; 
  email: string; 
  role: string; 

}
interface FormData {
  fullName: string; email: string; university: string; major: string;
  portfolioUrl: string; linkedin: string; phone: string;
  socialPlatform: "facebook" | "instagram"; socialHandle: string;
  hasTeammates: boolean; teammates: Teammate[];
}

const steps = [
  { id: "identity", label: "Identity" },
  { id: "academic", label: "Academic" },
  { id: "links",    label: "Links"    },
  { id: "team",     label: "Team"     },
];

const ibm = "'IBM Plex Sans', sans-serif";

const Field = ({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-2 text-xs uppercase tracking-widest" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.35)" }}>
      {icon && <span className="opacity-60">{icon}</span>}
      {label}
    </label>
    {children}
  </div>
);

const inputCls = "w-full border rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none transition-all duration-200 [&>option]:bg-[#0a0a0a] [&>option]:text-white";
const inputStyle = {
  fontFamily: ibm,
  background: "rgba(255,255,255,0.03)",
  borderColor: "rgba(255,255,255,0.09)",
};
const inputFocusStyle = { borderColor: "rgba(159,193,59,0.5)" };

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const [form, setForm] = useState<FormData>({
    fullName: "", email: "", university: "", major: "",
    portfolioUrl: "", linkedin: "", phone: "",
    socialPlatform: "instagram", socialHandle: "",
    hasTeammates: false, teammates: [{ name: "", email:"" , role: "" }],
  });

  const update = (field: keyof FormData, value: unknown) => setForm((p) => ({ ...p, [field]: value }));
  const addTeammate    = () => setForm((p) => ({ ...p, teammates: [...p.teammates, { name: "", email:"" , role: "" }] }));
  const removeTeammate = (i: number) => setForm((p) => ({ ...p, teammates: p.teammates.filter((_, idx) => idx !== i) }));
  const updateTeammate = (i: number, field: keyof Teammate, val: string) =>
    setForm((p) => { const t = [...p.teammates]; t[i] = { ...t[i], [field]: val }; return { ...p, teammates: t }; });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const valid = [
    form.fullName.trim() !== "" && form.phone.trim() !== "" && emailValid,
    form.university.trim() !== "" && form.major.trim() !== "",
    true, true,
  ];

  const go = (dir: 1 | -1) => { setDirection(dir); setStep((s) => s + dir); };
  // ...existing code...
const handleSubmit = async () => {
  setSubmitting(true);
  try {
    // Clean the form data
    const cleanedForm = { ...form };
    
    // Remove empty optional strings
    if (!cleanedForm.portfolioUrl.trim()) delete cleanedForm.portfolioUrl;
    if (!cleanedForm.linkedin.trim()) delete cleanedForm.linkedin;
    if (!cleanedForm.socialHandle.trim()) delete cleanedForm.socialHandle;
    
    // Handle teammates: empty array if solo, or filter out incomplete entries
    if (!cleanedForm.hasTeammates) {
      cleanedForm.teammates = [];
    } else {
      cleanedForm.teammates = cleanedForm.teammates.filter(t => t.name.trim() && t.role);
    }
    
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanedForm),
    });
    const data = await response.json();
    if (response.ok) {
      setSubmitted(true);
    } else {
      alert(data.error || 'Registration failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Network error');
  } finally {
    setSubmitting(false);
  }
};

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d * -60 }),
  };

  // ── Success screen ──
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#000" }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }} className="text-center max-w-md">
          <div className="relative w-28 h-28 mx-auto mb-8">
            <motion.div className="absolute inset-0 rounded-full border-2" style={{ borderColor: "rgba(159,193,59,0.30)" }} animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
            <motion.div className="absolute inset-3 rounded-full border" style={{ borderColor: "rgba(159,193,59,0.15)" }} animate={{ rotate: -360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(159,193,59,0.10)", border: "1px solid rgba(159,193,59,0.35)" }}>
                <Check className="w-6 h-6" style={{ color: "#9FC13B" }} />
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: ibm }}>Registered.</h2>
          <p className="text-sm leading-relaxed" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.40)" }}>
            Your sequence has been injected into the system.<br />
            A confirmation will be sent to{" "}
            <span style={{ color: "#9FC13B" }}>{form.email}</span><br />
            Get ready for <span style={{ color: "#D8E02F" }}>72 hours of innovation.</span>
          </p>
          <div className="mt-8 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />
          <p className="mt-4 text-xs" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.18)" }}>BIOVATECH HACKATHON // CONFIRMATION SENT</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white overflow-hidden relative" style={{ background: "#000" }}>
      {/* grid */}
      <div className="fixed inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <main className="relative z-10 max-w-2xl mx-auto px-6 py-12">

        {/* title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <p className="text-xs tracking-widest mb-3" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.25)" }}>// INITIALIZING PARTICIPANT SEQUENCE</p>
          <h1 className="text-4xl font-bold" style={{ fontFamily: ibm }}>
            <span style={{ color: "#9FC13B" }}>REGISTER</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>_</span>
          </h1>
          <p className="text-sm mt-2" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.28)" }}>72H · GREEN TECH · HEALTH TECH · PHARMA TECH</p>
        </motion.div>

        {/* stepper */}
        <div className="mb-8 relative">
          <div className="absolute top-[18px] left-0 right-0 mx-5 h-px" style={{ background: "rgba(255,255,255,0.07)" }}>
            <motion.div className="h-full" style={{ background: "#9FC13B", opacity: 0.6 }} animate={{ width: `${(step / (steps.length - 1)) * 100}%` }} transition={{ duration: 0.4 }} />
          </div>
          <div className="flex items-start justify-between relative">
            {steps.map((s, i) => (
              <div key={s.id} className="flex flex-col items-center gap-2 flex-1 z-10">
                <motion.button
                  onClick={() => i < step && setStep(i)}
                  className="w-9 h-9 rounded-full border-2 text-xs font-bold flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "#000",
                    borderColor: i <= step ? "#9FC13B" : "rgba(255,255,255,0.10)",
                    color: i < step ? "#9FC13B" : i === step ? "#fff" : "rgba(255,255,255,0.20)",
                    cursor: i < step ? "pointer" : "default",
                    fontFamily: ibm,
                  }}
                  whileHover={i < step ? { scale: 1.1 } : {}}
                >
                  {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </motion.button>
                <span className="text-[10px] tracking-widest uppercase hidden sm:block" style={{ fontFamily: ibm, color: i === step ? "rgba(255,255,255,0.60)" : "rgba(255,255,255,0.18)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* form card */}
        <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
          {/* corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l rounded-tl-2xl" style={{ borderColor: "rgba(159,193,59,0.18)" }} />
          <div className="absolute top-0 right-0 w-6 h-6 border-t border-r rounded-tr-2xl" style={{ borderColor: "rgba(159,193,59,0.18)" }} />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l rounded-bl-2xl" style={{ borderColor: "rgba(159,193,59,0.18)" }} />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r rounded-br-2xl" style={{ borderColor: "rgba(159,193,59,0.18)" }} />

          {/* step label */}
          <div className="px-8 pt-6 pb-0">
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="w-3.5 h-3.5" style={{ color: "rgba(159,193,59,0.55)" }} />
              <span className="text-xs tracking-wider" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.28)" }}>
                STEP_{step + 1}_OF_{steps.length} // {steps[step].label.toUpperCase()}
              </span>
            </div>
            <div className="h-px mt-4" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>

          {/* step content */}
          <div className="px-8 py-6 min-h-[340px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={step} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25, ease: "easeInOut" }} className="space-y-5">

                {/* STEP 0 — Identity */}
                {step === 0 && (<>
                  <Field label="Full Name" icon={<User className="w-3.5 h-3.5" />}>
                    <input className={inputCls} style={inputStyle} placeholder="e.g. Amina Boukhalfa" value={form.fullName} onChange={(e) => update("fullName", e.target.value)}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                  </Field>
                  <Field label="Email Address" icon={<Mail className="w-3.5 h-3.5" />}>
                    <div className="relative">
                      <input className={inputCls} style={{ ...inputStyle, ...(form.email.length > 0 && !emailValid ? { borderColor: "rgba(248,113,113,0.40)" } : {}) }}
                        type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyle)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                      {form.email.length > 0 && (
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                          {emailValid ? <Check className="w-3.5 h-3.5" style={{ color: "rgba(159,193,59,0.70)" }} /> : <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(248,113,113,0.60)" }} />}
                        </div>
                      )}
                    </div>
                  </Field>
                  <Field label="Phone Number" icon={<Phone className="w-3.5 h-3.5" />}>
                    <input className={inputCls} style={inputStyle} type="tel" placeholder="+213 XXX XXX XXX" value={form.phone} onChange={(e) => update("phone", e.target.value)}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                  </Field>
                  <Field label="Social Media" icon={<Instagram className="w-3.5 h-3.5" />}>
                    <div className="flex gap-3">
                      <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.09)" }}>
                        {(["facebook", "instagram"] as const).map((p) => (
                          <button key={p} type="button" onClick={() => update("socialPlatform", p)}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs transition-all duration-200"
                            style={{ fontFamily: ibm, background: form.socialPlatform === p ? "rgba(159,193,59,0.12)" : "transparent", color: form.socialPlatform === p ? "#fff" : "rgba(255,255,255,0.25)" }}
                          >
                            {p === "facebook" ? <Facebook className="w-3.5 h-3.5" /> : <Instagram className="w-3.5 h-3.5" />}
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </button>
                        ))}
                      </div>
                      <input className={cn(inputCls, "flex-1")} style={inputStyle} placeholder="@username" value={form.socialHandle} onChange={(e) => update("socialHandle", e.target.value)} />
                    </div>
                  </Field>
                </>)}

                {/* STEP 1 — Academic */}
                {step === 1 && (<>
                  <Field label="University" icon={<GraduationCap className="w-3.5 h-3.5" />}>
                    <input className={inputCls} style={inputStyle} placeholder="e.g. Université Constantine 2" value={form.university} onChange={(e) => update("university", e.target.value)}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                  </Field>
                  <Field label="Major / Specialization" icon={<Terminal className="w-3.5 h-3.5" />}>
                    <input className={inputCls} style={inputStyle} placeholder="e.g. Bioinformatics, Computer Science, Pharmacy…" value={form.major} onChange={(e) => update("major", e.target.value)}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                  </Field>
                </>)}

                {/* STEP 2 — Links */}
                {step === 2 && (<>
                  <Field label="Portfolio / CV (URL)" icon={<Link2 className="w-3.5 h-3.5" />}>
                    <input className={inputCls} style={inputStyle} type="url" placeholder="https://yourportfolio.com or drive link" value={form.portfolioUrl} onChange={(e) => update("portfolioUrl", e.target.value)}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                  </Field>
                  <Field label="LinkedIn Profile" icon={<Linkedin className="w-3.5 h-3.5" />}>
                    <input className={inputCls} style={inputStyle} type="url" placeholder="https://linkedin.com/in/yourprofile" value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)} onBlur={e => Object.assign(e.target.style, inputStyle)} />
                  </Field>
                  <p className="text-xs" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.20)" }}>// Both fields are optional but help the jury evaluate your background.</p>
                </>)}

                {/* STEP 3 — Team */}
                {step === 3 && (<>
                  <Field label="Do you have teammates?" icon={<Users className="w-3.5 h-3.5" />}>
                    <div className="flex gap-3">
                      {[{ val: false, label: "Solo" }, { val: true, label: "Yes, I have teammates" }].map(({ val, label }) => (
                        <button key={label} type="button" onClick={() => update("hasTeammates", val)}
                          className="flex-1 py-2.5 px-4 rounded-lg border text-xs transition-all duration-200"
                          style={{
                            fontFamily: ibm,
                            borderColor: form.hasTeammates === val ? "rgba(159,193,59,0.40)" : "rgba(255,255,255,0.09)",
                            background:  form.hasTeammates === val ? "rgba(159,193,59,0.08)" : "transparent",
                            color:       form.hasTeammates === val ? "#fff" : "rgba(255,255,255,0.30)",
                          }}
                        >{label}</button>
                      ))}
                    </div>
                  </Field>
                  <AnimatePresence>
                    {form.hasTeammates && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-3 overflow-hidden">
                        <p className="text-xs" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.22)" }}>// Add teammates (max 3, teams of 4 total)</p>
                        {form.teammates.map((t, i) => (
                          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-xl p-4 space-y-3" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: ibm, color: "rgba(159,193,59,0.45)" }}>// Teammate_{i + 1}</span>
                              {form.teammates.length > 1 && (
                                <button onClick={() => removeTeammate(i)} className="transition-colors" style={{ color: "rgba(255,255,255,0.20)" }}
                                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(248,113,113,0.80)")}
                                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.20)")}
                                ><Trash2 className="w-3.5 h-3.5" /></button>
                              )}
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] uppercase tracking-widest" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.28)" }}>Full Name</label>
                              <input className={inputCls} style={inputStyle} placeholder="e.g. Yacine Hamidi" value={t.name} onChange={(e) => updateTeammate(i, "name", e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
  <label className="text-[10px] uppercase tracking-widest" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.28)" }}>Email</label>
  <input 
    className={inputCls} 
    style={inputStyle} 
    type="email" 
    placeholder="e.g. yacine@test.com" 
    value={t.email} 
    onChange={(e) => updateTeammate(i, "email", e.target.value)} 
  />
</div>
  <div className="space-y-1.5">
                              <label className="text-[10px] uppercase tracking-widest" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.28)" }}>Role</label>
                              <div className="relative">
                                <select value={t.role} onChange={(e) => updateTeammate(i, "role", e.target.value)}
                                  className={cn(inputCls, "appearance-none cursor-pointer pr-8")}
                                  style={{ ...inputStyle, color: t.role === "" ? "rgba(255,255,255,0.20)" : "#fff" }}>
                                  <option value="" disabled>Select a role…</option>
                                  <option value="programmer">Programmer</option>
                                  <option value="graphic_designer">Graphic Designer</option>
                                  <option value="business_analyst">Business Analyst</option>
                                  <option value="bio_engineer">Bio Engineer</option>
                                  <option value="other">Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                  <svg className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.25)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        {form.teammates.length < 3 && (
                          <button onClick={addTeammate} className="flex items-center gap-2 text-xs w-full justify-center py-2.5 rounded-xl border border-dashed transition-all duration-200"
                            style={{ fontFamily: ibm, borderColor: "rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.28)" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(255,255,255,0.28)"; }}
                          >
                            <Plus className="w-3.5 h-3.5" /> Add another teammate
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>)}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* footer nav */}
          <div className="px-8 pb-7 pt-2">
            <div className="h-px mb-5" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="flex items-center justify-between">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => go(-1)} disabled={step === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm transition-all duration-200"
                style={{ fontFamily: ibm, borderColor: step === 0 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)", color: step === 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.45)", cursor: step === 0 ? "not-allowed" : "pointer" }}
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </motion.button>

              <span className="text-xs" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.18)" }}>{step + 1}/{steps.length}</span>

              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={step === steps.length - 1 ? handleSubmit : () => go(1)}
                disabled={!valid[step] || submitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  fontFamily: ibm,
                  background:  valid[step] && !submitting ? "#9FC13B" : "transparent",
                  color:       valid[step] && !submitting ? "#0d0d0d" : "rgba(255,255,255,0.15)",
                  border:      valid[step] && !submitting ? "none" : "1px solid rgba(255,255,255,0.07)",
                  cursor:      !valid[step] || submitting ? "not-allowed" : "pointer",
                  boxShadow:   valid[step] && !submitting ? "0 4px 20px rgba(159,193,59,0.25)" : "none",
                }}
              >
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                  : step === steps.length - 1 ? <>Submit <Check className="w-4 h-4" /></>
                  : <>Next <ChevronRight className="w-4 h-4" /></>}
              </motion.button>
            </div>
          </div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-center text-xs mt-6" style={{ fontFamily: ibm, color: "rgba(255,255,255,0.12)" }}>
          BIOVATECH_HACKATHON // ENSB // 72H // {new Date().getFullYear()}
        </motion.p>
      </main>
    </div>
  );
}