"use client"
import { useTasks } from "@/hooks/useTask";
import { useState } from "react"
import { X } from "lucide-react";

export default function TaskInput({ columnId, onCancel }: { columnId: string, onCancel?: () => void }) {
  const { addTask } = useTasks();

  const [task, setTask] = useState("")
  const handleSubmit = async () => {
    if (!task.trim()) return

    await addTask(task.trim(), columnId)
    setTask("")
    if (onCancel) onCancel();
  }

  return (
    <div className="flex flex-col gap-2 w-full animate-in fade-in slide-in-from-top-1">
      <textarea
        autoFocus
        rows={3}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
          if (e.key === "Escape" && onCancel) onCancel();
        }}
        className="w-full bg-[#22272b] border-none rounded-lg p-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none shadow-xl resize-none font-medium"
        placeholder="Enter a title for this card..."
      />

      <div className="flex flex-row items-center gap-2">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-[4px] transition-all shadow-lg active:scale-95 whitespace-nowrap"
        >
          Add card
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-white/60 hover:text-white p-1 rounded-md transition-all h-8 w-8 flex items-center justify-center hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}