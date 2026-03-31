import { Task } from "@/types/task"
import TaskItem from "./taskItem"

interface Props {
  tasks: Task[]
  toggleTask: (id: string, completed: boolean) => void
  deleteTask: (id: string) => void
}

export default function TaskList({
  tasks,
  toggleTask,
  deleteTask
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  )
}