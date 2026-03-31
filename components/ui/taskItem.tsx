"use client"
import { Task } from "@/types/task"


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
    <div className="group flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-3 rounded-xl transition-all duration-200 shadow-sm">
      <div className="flex items-center gap-3 flex-1 overflow-hidden">
        <button
          onClick={() => toggleTask(task.id, task.is_completed)}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${task.is_completed
            ? "bg-green-500 border-green-500"
            : "border-white/30 hover:border-white/50"
            }`}
        >
          {task.is_completed && (
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
        <span
          className={`text-sm transition-all  pr-2 ${task.is_completed ? "text-slate-500 line-through" : "text-slate-100"
            }`}
        >
          {task.task}
        </span>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
        title="Delete task"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
