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
    <div className="flex justify-between border p-2 mb-2">
      <span
        onClick={() => toggleTask(task.id, task.completed)}
        className={
          task.completed
            ? "line-through cursor-pointer"
            : "cursor-pointer"
        }
      >
        {task.title}
      </span>

      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500"
      >
        Delete
      </button>
    </div>
  )
}
