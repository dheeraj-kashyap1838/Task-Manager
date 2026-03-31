"use client"
import { useTasks } from "@/hooks/useTask";
import { useState } from "react"

export default function TaskInput() {
  const { addTask, } = useTasks();

  const [task, setTask] = useState("")
  const handleSubmit = async () => {
    if (!task) return

    await addTask(task)
    setTask("")
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        autoFocus
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
        placeholder="What needs to be done?"
      />

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors shadow-lg active:scale-95"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}