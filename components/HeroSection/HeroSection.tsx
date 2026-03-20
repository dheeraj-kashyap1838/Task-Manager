"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import heroDashboard from "../../asset/hero-dashboard.png";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-4">
              Organize your work
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[0.95] text-balance">
            Tasks done right, <span className="text-accent">every time</span>
          </h1>

          <p
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
            style={{ textWrap: "pretty" }}
          >
            A minimal, powerful task manager that helps teams ship faster.
            Prioritize what matters, track progress, and never miss a deadline.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg">
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="hero-outline" size="lg">
              <Link href={"/login"}>Sign in</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 md:mt-24 max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border">
            <Image
              width={400}
              height={410}
              src={heroDashboard}
              alt="Taskflow dashboard showing a kanban board with task cards"
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
