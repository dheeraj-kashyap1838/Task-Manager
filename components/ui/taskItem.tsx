"use client"
import { Task } from "@/types/task"
import { Check, Trash2 } from "lucide-react";

interface Props {
  task: Task
  toggleTask: (id: string, completed: boolean) => void
  deleteTask: (id: string) => void
}

export default function TaskItem({
  task,
  toggleTask,
  deleteTask
}: Props) {
  return (
    <div 
      onClick={() => toggleTask(task.id, task.is_completed)}
      className="group flex items-start justify-between bg-[#22272b] hover:bg-[#2c333a] border border-transparent hover:border-indigo-500/30 p-2.5 rounded-lg transition-all duration-200 shadow-md cursor-pointer active:scale-[0.98]"
    >
      <div className="flex items-start gap-2.5 flex-1 overflow-hidden">
        <div
          className={`shrink-0 mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center transition-all ${task.is_completed
            ? "bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-500/20"
            : "border-white/10 group-hover:border-white/30"
            }`}
        >
          {task.is_completed && <Check className="w-3 h-3 text-white stroke-[4px]" />}
        </div>
        <span
          className={`text-[13px] font-medium leading-tight transition-all pr-1 select-none ${task.is_completed ? "text-white/30 line-through" : "text-white/90"
            }`}
        >
          {task.task}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
        className="opacity-0 group-hover:opacity-100 p-1.5 text-white/30 hover:text-rose-400 hover:bg-rose-400/10 rounded-md transition-all h-7 w-7 flex items-center justify-center shrink-0"
        title="Delete card"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
