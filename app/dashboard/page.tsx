"use client";

import TaskInput from "../../components/ui/taskInput";
import TaskList from "../../components/ui/taskList";
import { useTasks } from "../../hooks/useTask";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import TaskItem from "@/components/ui/taskItem";

export default function Dashboard() {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const router = useRouter();
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  // console.log('tasks', TaskList)
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

  const todayTasks = tasks.filter((_, index) => index % 3 === 0);
  const thisWeekTasks = tasks.filter((_, index) => index % 3 === 1);
  const laterTasks = tasks.filter((_, index) => index % 3 === 2);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-violet-800 text-gray-100">
      {/* HEADER */}
      <div className="bg-black/20 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">Task Manager</h1>
          <button
            onClick={handleLogout}
            className="text-sm bg-rose-500 hover:bg-rose-600 transition text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* LEFT PANEL */}
          <aside className="rounded-2xl bg-slate-900/70 border border-white/20 p-5 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Inbox</h2>
            <p className="text-sm text-slate-300 mb-6">Consolidate your to-dos. Email it, say it, forward it — however it comes, get it into Task Manager fast.</p>

            <div className="space-y-3">
              <button className="w-full text-left bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg">Today</button>
              <button className="w-full text-left bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg">This Week</button>
              <button className="w-full text-left bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg">Later</button>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-300">
              Inbox is only visible to you
            </div>
          </aside>

          {/* BOARD AREA */}
          <main>
            <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md p-5">
              <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
                <h2 className="text-lg font-semibold">Your Board</h2>
              </div>

              <div className="overflow-x-auto">
                <div className="flex gap-4 min-w-225">
                  {[
                    { title: "Today", tasks: todayTasks },
                    { title: "This Week", tasks: thisWeekTasks },
                    { title: "Later", tasks: laterTasks },
                  ].map((column) => (
                    <section
                      key={column.title}
                      className="w-[320px] min-w-70 bg-white/10 border border-white/20 rounded-2xl p-4"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{column.title}</h3>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{column.tasks.length}</span>
                      </div>

                      <div className="mb-4">
                        {activeColumn === column.title ? (
                          <div className="bg-white/10 p-2 rounded-lg">
                            <TaskInput />
                            <button
                              className="mt-2 text-xs text-slate-400 hover:text-white"
                              onClick={() => setActiveColumn(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            className="w-full text-left text-sm text-white/90 bg-white/10 hover:bg-white/20 py-2 px-3 rounded-lg"
                            onClick={() => setActiveColumn(column.title)}
                          >
                            + Add a card
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        {column.tasks.length > 0 ? (
                          <>
                            {tasks.map((task) => (
                              <TaskItem
                                key={task.id}
                                task={task}
                                toggleTask={toggleTask}
                                deleteTask={deleteTask}
                              />
                            ))}
                          </>
                        ) : (
                          <div className="text-xs text-slate-300 p-3 rounded-lg border border-dashed border-white/15">No tasks yet.</div>
                        )}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}