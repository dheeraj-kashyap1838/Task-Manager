import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Task } from "../types/task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Supabase getUser error:", userError.message);
      return;
    }

    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Supabase tasks.select error:", error.message);
      setTasks([]);
      return;
    }

    setTasks(data || []);
  };

  const addTask = async (title: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("tasks").insert([
      {
        title,
        completed: false,
        user_id: user.id,
      },
    ]);

    fetchTasks();
  };

  const toggleTask = async (id: string, completed: boolean) => {
    await supabase.from("tasks").update({ completed: !completed }).eq("id", id);

    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await supabase.from("tasks").delete().eq("id", id);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, addTask, toggleTask, deleteTask };
};
