import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const RegisterSection = () => {
  return (
    <section id="register" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="relative max-w-4xl mx-auto rounded-3xl border border-primary/20 bg-card p-12 sm:p-16 text-center overflow-hidden glow-green">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

          <div className="relative z-10">
            <Rocket className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold font-mono-display mb-4">
              Ready to <span className="text-primary text-glow">Hack</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Spots are limited. Secure yours now and join the most exciting hackathon of the year.
            </p>
            <Button size="lg" className="font-mono-display text-lg px-10 py-6 glow-green">
              <Rocket className="w-5 h-5 mr-2" />
              Register Now — It's Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
