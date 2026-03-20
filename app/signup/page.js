"use client";

import { Field, FieldError, FieldGroup, FieldLabel } from "../../components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import supabase from "../../lib/supabase";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Name must be at least 5 characters.")
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

function page() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    const { name, email, password } = values;

    const { data, error } = await supabase.auth.signUp({
      name,
      email,
      password,
    });

    if (error) {
      console.error("Signup error:", error.message);
      return;
    }
    if (!error){
      alert("sign up succesfully")
    }

    console.log("User created:", data.user);
    form.reset();
  }

  return (
    <section className="max-w-5xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
    </section>
  );
}

export default page;
