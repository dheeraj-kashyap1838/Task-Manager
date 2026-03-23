"use client";
import { LayoutGrid, Zap, Users, BarChart3, Clock, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: LayoutGrid,
    title: "Kanban boards",
    description:
      "Drag-and-drop cards across columns. Visualize your workflow at a glance.",
  },
  {
    icon: Zap,
    title: "Smart priorities",
    description:
      "Auto-prioritize tasks based on deadlines, dependencies, and team load.",
  },
  {
    icon: Users,
    title: "Team collaboration",
    description:
      "Assign tasks, leave comments, and keep everyone aligned in real time.",
  },
  {
    icon: BarChart3,
    title: "Progress analytics",
    description:
      "Track velocity, completion rates, and bottlenecks with built-in charts.",
  },
  {
    icon: Clock,
    title: "Time tracking",
    description:
      "Log hours directly on tasks. Generate timesheets for clients or payroll.",
  },
  {
    icon: Shield,
    title: "Secure & private",
    description:
      "End-to-end encryption. Your data stays yours — no third-party access.",
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-accent/30"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        filter: visible ? "blur(0)" : "blur(4px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms`,
      }}
    >
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 text-accent mb-5">
        <feature.icon className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
            Everything you need to stay on track
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
