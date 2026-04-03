import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import CTASection from "@/components/CTASection/CTASection";
import Footer from "@/components/Footer/Footer";

export default async function Page() {
  const supabase = await createClient();

  // const { data: tasks, error } = await supabase.from("user_tasks").select("*");

  // if (error) {
  //   console.error("Tasks fetch error:", error.message);
  // }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
