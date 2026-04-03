import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Task } from "../types/task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  //  Fetch tasks
  const fetchTasks = async () => {

    const { data, error } = await supabase
      .from("user_tasks")
      .select("*")

    if (!error && data) {
      setTasks(data)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])


  const addTask = async (task: string, column_id: string) => {
    const { data, error } = await supabase
      .from("user_tasks")
      .insert([{ task, column_id }])
      .select()

    if (error) {
      console.log("Error:", error)
    } else if (data) {
      setTasks((prev) => [...prev, data[0]])
    }
  }
  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from("user_tasks")
      .delete()
      .eq("id", id)

    if (!error) {
      //  UI update
      setTasks((prev) => prev.filter((t) => t.id !== id))
    }
  }

  //  Toggle Task (complete / undo)
  const toggleTask = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("user_tasks")
      .update({ is_completed: !currentStatus })
      .eq("id", id)

    if (!error) {
      //  UI update
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, is_completed: !currentStatus } : t
        )
      )
    }
  }


  console.log(tasks)
  return { tasks, addTask, deleteTask, toggleTask };
};
