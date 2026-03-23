"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import supabase from "../../lib/supabase";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(32, "Name must be at most 32 characters."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(5, "Email must be at least 5 characters.")
    .max(100, "Email must be at most 100 characters."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password cannot exceed 32 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const { name, email, password } = values;
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (error) {
        console.error("Signup error:", error.message);
        alert(`Signup error: ${error.message}`);
        return;
      }

      if (!data) {
        throw new Error("Signup returned no data; check network or Supabase config.");
      }

      alert("Signup successful. Check your email to confirm your account.");
      reset();
      router.push("/dashboard");
    } catch (fetchError) {
      const msg = fetchError instanceof Error ? fetchError.message : String(fetchError);
      console.error("Signup exception:", msg);
      alert(`Signup failed: ${msg}. Verify network + Supabase URL/key`);
    }
  };

  return (
    <section className="min-h-screen bg-background text-foreground flex items-center justify-center py-14 px-4">
      <div className="w-full max-w-6xl grid gap-8 md:grid-cols-2 items-center">
        <div className="rounded-3xl border border-border bg-card p-10 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Capture, organize, and tackle your to-dos from anywhere.
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Escape the clutter and chaos—unleash your productivity with Taskflow.
            Keep your team in sync and track progress effortlessly.
          </p>

          <div className="mt-8 flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-3 py-1">Team-ready</span>
            <span className="rounded-full bg-primary/10 px-3 py-1">Secure auth</span>
            <span className="rounded-full bg-primary/10 px-3 py-1">Responsive UI</span>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-foreground mb-5">Create your account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="Jane Doe"
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-accent px-4 py-3 text-base font-semibold text-white hover:bg-accent/90 transition"
            >
              {isSubmitting ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            Already have an account? <a href="/login" className="text-accent hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </section>
  );
}

