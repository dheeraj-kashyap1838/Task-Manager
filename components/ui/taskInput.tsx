"use client"
import { useState } from "react"

export default function TaskInput({ addTask }: { addTask: (task: string) => void }) {
  const [task, setTask] = useState("")

  const handleAdd = () => {
    if (!task) return
    addTask(task)
    setTask("")
  }

  return (
    <div className="flex gap-2 mb-4">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border p-2 flex-1"
        placeholder="Enter task..."
      />

      <button
        onClick={handleAdd}
        className="bg-green-500 text-white px-4"
      >
        Add
      </button>
    </div>
  )
}