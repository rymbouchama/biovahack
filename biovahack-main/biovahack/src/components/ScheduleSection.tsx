const schedule = [
  { time: "09:00 AM", event: "Registration & Check-in", desc: "Get your badge, swag, and settle in" },
  { time: "10:00 AM", event: "Opening Ceremony", desc: "Keynote speakers and theme reveal" },
  { time: "11:00 AM", event: "Hacking Begins!", desc: "Form teams and start building" },
  { time: "01:00 PM", event: "Lunch Break", desc: "Fuel up with free food" },
  { time: "03:00 PM", event: "Workshop: AI/ML 101", desc: "Hands-on intro to machine learning" },
  { time: "06:00 PM", event: "Dinner", desc: "More free food!" },
  { time: "09:00 PM", event: "Midnight Snacks", desc: "Late night coding fuel" },
  { time: "09:00 AM", event: "Submissions Due", desc: "Final push to polish your project" },
  { time: "10:00 AM", event: "Demo & Judging", desc: "Present your hack to judges" },
  { time: "12:00 PM", event: "Awards Ceremony", desc: "Prizes and closing remarks" },
];

const ScheduleSection = () => {
  return (
    <section id="schedule" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-mono-display text-sm text-primary mb-4 block">// SCHEDULE</span>
          <h2 className="text-4xl sm:text-5xl font-bold font-mono-display mb-6">
            Event <span className="text-primary text-glow">Timeline</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          <div className="space-y-6">
            {schedule.map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="relative flex-shrink-0">
                  <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:glow-green transition-all duration-300">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="flex-1 pb-6">
                  <span className="font-mono-display text-xs text-primary">{item.time}</span>
                  <h3 className="font-mono-display text-lg font-semibold text-foreground mt-1">{item.event}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
