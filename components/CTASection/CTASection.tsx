"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className="relative rounded-3xl bg-primary text-primary-foreground px-8 py-16 md:px-16 md:py-24 text-center overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            filter: visible ? "blur(0)" : "blur(4px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Subtle decorative circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent/5 blur-2xl" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance mb-4">
              Ready to get things done?
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-lg mx-auto mb-10" style={{ textWrap: "pretty" }}>
              Join thousands of teams who ship faster with Taskflow. Free to start, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Create free account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
