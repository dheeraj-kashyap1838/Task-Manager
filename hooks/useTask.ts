import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Task } from "../types/task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const normalizeTask = (row: any): Task => {
    // The column name in Supabase might not be `completed`.
    // Map common alternatives into our UI model: `completed`.
    const completedValue =
      row?.completed ?? row?.is_completed ?? row?.done ?? row?.is_done ?? false;

    return {
      id: String(row?.id),
      title: String(row?.title ?? ""),
      completed: Boolean(completedValue),
      user_id: row?.user_id ? String(row.user_id) : undefined,
      created_at: row?.created_at ? String(row.created_at) : undefined,
    };
  };

  const isMissingColumnError = (message: string) => {
    return /Could not find the '.*' column of 'tasks' in the schema cache/i.test(
      message,
    );
  };

  const fetchTasks = async (userId: string) => {

    // Extra debug: figure out whether the table is empty or the user_id doesn't match.
    const { count: totalCount, error: totalCountError } = await supabase
      .from("tasks")
      .select("id", { count: "exact", head: true });

    if (totalCountError) {
      console.error("[useTasks] tasks total count error:", totalCountError.message);
    } else {
      console.log("[useTasks] tasks total count:", totalCount);
    }

    const { count: userCount, error: userCountError } = await supabase
      .from("tasks")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);

    if (userCountError) {
      console.error("[useTasks] tasks user count error:", userCountError.message);
    } else {
      console.log("[useTasks] tasks user count:", userCount);
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase tasks.select error:", error.message);
      setTasks([]);
      return;
    }

    console.log("[useTasks] tasks fetched rows:", (data ?? []).length);
    setTasks((data ?? []).map(normalizeTask));
  };

  const addTask = async (title: string) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        { title, is_completed: false }
      ])

    if (error) {
      console.log("Error:", error)
    } else {
      console.log("Data inserted:", data)
    }
  }

  const toggleTask = async (id: string, completed: boolean) => {
    const nextCompleted = !completed;
    const updateAttempts = [
      { completed: nextCompleted },
      { is_completed: nextCompleted },
      { done: nextCompleted },
      { is_done: nextCompleted },
    ];

    let updated = false;
    for (const payload of updateAttempts) {
      const { error: updateError } = await supabase
        .from("tasks")
        .update(payload)
        .eq("id", id);

      if (updateError) {
        if (isMissingColumnError(updateError.message)) continue;
        console.error("Supabase tasks.update error:", updateError.message);
        return;
      }

      updated = true;
      break; // update succeeded
    }

    if (!updated) {
      console.error(
        "[useTasks] toggleTask: none of the completion columns exist for update",
      );
      return;
    }

    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Supabase getSession error:", error.message);
      return;
    }
    const userId = data.session?.user.id;
    if (userId) await fetchTasks(userId);
  };

  const deleteTask = async (id: string) => {
    const { error: deleteError } = await supabase.from("tasks").delete().eq("id", id);
    if (deleteError) {
      console.error("Supabase tasks.delete error:", deleteError.message);
      return;
    }

    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Supabase getSession error:", error.message);
      return;
    }
    const userId = data.session?.user.id;
    if (userId) await fetchTasks(userId);
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Supabase getSession error:", error.message);
        return;
      }
      const userId = data.session?.user.id;
      if (!userId) return;
      if (!isMounted) return;
      await fetchTasks(userId);
    };

    init();

    const { data: authSubscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const userId = session?.user?.id;
        if (!isMounted) return;
        if (!userId) {
          setTasks([]);
          return;
        }
        await fetchTasks(userId);
      }
    );

    return () => {
      isMounted = false;
      authSubscription.subscription.unsubscribe();
    };
  }, []);

  return { tasks, addTask, toggleTask, deleteTask };
};
