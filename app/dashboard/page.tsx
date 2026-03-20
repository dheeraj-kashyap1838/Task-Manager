"use client";

import TaskInput from "../../components/ui/taskInput";
import TaskList from "../../components/ui/taskList";
import { useTasks } from "../../hooks/useTask";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

export default function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/login");
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Task Manager
          </h1>

          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-medium mb-4 text-gray-700">
            Your Tasks
          </h2>

          {/* INPUT */}
          <TaskInput addTask={addTask} />

          {/* LIST */}
          <TaskList
            tasks={tasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
}