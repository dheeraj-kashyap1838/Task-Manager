import TaskItem from "./taskItem"
import { useTasks } from "@/hooks/useTask"
import { Task } from "@/types/task"


export default function TaskList({ tasks: propTasks }: { tasks?: Task[] }) {
  const { tasks: allTasks, toggleTask, deleteTask } = useTasks();
  
  const tasks = propTasks || allTasks;

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
