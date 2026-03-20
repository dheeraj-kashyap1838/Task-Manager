"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface IUser {
  name: string;
}
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      router.push("/dashboard");
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center py-14 px-4">
      <div className="w-full max-w-6xl grid gap-10 md:grid-cols-2 items-center">
        <div className="rounded-3xl border border-border bg-card p-10 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Capture, organize, and tackle your to-dos from anywhere.
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Escape the clutter and chaos—unleash productivity with Taskflow. Keep your work in sync across teams and devices.
          </p>

          <div className="mt-8 flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-3 py-1">Fast login</span>
            <span className="rounded-full bg-primary/10 px-3 py-1">Secure auth</span>
            <span className="rounded-full bg-primary/10 px-3 py-1">Team-ready</span>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Sign in to your account</h2>

          <label className="block text-sm font-medium text-muted-foreground mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 mb-4"
          />

          <label className="block text-sm font-medium text-muted-foreground mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 mb-6"
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-lg bg-accent px-4 py-3 text-base font-semibold text-white hover:bg-accent/90 transition"
          >
            Sign in
          </button>

          <p className="mt-4 text-sm text-muted-foreground">
            Don’t have an account? <a href="/signup" className="text-accent hover:underline">Create one</a>
          </p>
        </div>
      </div>
    </div>
  );
}
