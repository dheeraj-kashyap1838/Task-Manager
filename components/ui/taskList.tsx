"use client"
import TaskItem from "./taskItem"
import { useTasks } from "@/hooks/useTask"


export default function TaskList() {
  const { tasks, toggleTask, deleteTask } = useTasks();
  console.log(tasks)
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-xs text-slate-400 p-4 rounded-xl border border-dashed border-white/10 text-center">
        No tasks yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}
