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

  // 📥 Fetch and Subscribe to Tasks
  useEffect(() => {
    fetchTasks()

    // Realtime subscription for user_tasks
    const channel = supabase
      .channel('realtime_tasks')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'user_tasks' 
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setTasks((prev) => [...prev, payload.new as Task])
        } else if (payload.eventType === 'UPDATE') {
          setTasks((prev) => prev.map(t => t.id === payload.new.id ? payload.new as Task : t))
        } else if (payload.eventType === 'DELETE') {
          setTasks((prev) => prev.filter(t => t.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const addTask = async (task: string, column_id: string) => {
    const { data, error } = await supabase
      .from("user_tasks")
      .insert([{ 
        task, 
        column_id
      }])
      .select()

    if (error) {
      console.error("Error adding task:", error)
    }
    // Note: Local state update is handled by Realtime subscription
  }
  
  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from("user_tasks")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting task:", error)
    }
  }

  //  Toggle Task (complete / undo)
  const toggleTask = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("user_tasks")
      .update({ is_completed: !currentStatus })
      .eq("id", id)

    if (error) {
      console.error("Error toggling task:", error)
    }
  }


  console.log(tasks)
  return { tasks, addTask, deleteTask, toggleTask };
};
