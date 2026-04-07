"use client";

import TaskInput from "../../components/ui/taskInput";
import TaskList from "../../components/ui/taskList";
import ColumnInput from "../../components/ui/columnInput";
import { useTasks } from "../../hooks/useTask";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { useColumns } from "@/hooks/useColumns";
import { useBoards } from "@/hooks/useBoards";
import { Plus, MoreHorizontal, ChevronsLeftRight, SquareArrowOutUpRight, Layout, Trello } from "lucide-react";
import ShowBoards from "@/components/ShowBoards/ShowBoards";

const columnColors = [
  { bg: "bg-[#4b2a5e]/90", border: "border-[#5c3b6f]", text: "text-white" }, // Purple
  { bg: "bg-[#7d6a0a]/90", border: "border-[#8e7a1b]", text: "text-white" }, // Yellow/Bronze
  { bg: "bg-[#101204]/90", border: "border-[#212315]", text: "text-white" }, // Black
  { bg: "bg-[#094c31]/90", border: "border-[#1a5d42]", text: "text-white" }, // Green
];

export default function Dashboard() {
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const { tasks, toggleTask, deleteTask } = useTasks();
  const { boards } = useBoards();
  const { columns } = useColumns(selectedBoardId || undefined);
  const router = useRouter();

  // Set default board or reset if current board is deleted
  useEffect(() => {
    if (boards.length === 0) {
      setSelectedBoardId(null);
    } else if (!selectedBoardId || !boards.find(b => b.id === selectedBoardId)) {
      setSelectedBoardId(boards[0].id);
    }
  }, [boards, selectedBoardId]);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/login");
      }
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const selectedBoard = boards.find(b => b.id === selectedBoardId);

  return (
    <div className="flex flex-col h-screen bg-[#3a205a] text-gray-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* HEADER */}
      <header className="bg-black/40 border-b border-white/5 backdrop-blur-md shrink-0 z-10">
        <div className="flex justify-between items-center px-6 py-3">
          <div>

            <h1 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
              Asli Trelloo
              <ChevronsLeftRight className="w-4 h-4 text-slate-400 rotate-90" />
            </h1>
            <p>with extra "o"</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm bg-rose-500 hover:bg-rose-600 transition text-white px-4 py-1.5 rounded-lg shadow-lg active:scale-95 font-bold"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL */}
        <aside className="w-[280px] shrink-0 border-r border-white/5 bg-black/20 p-6 overflow-y-auto hidden lg:block custom-scrollbar">
          <div className="mb-10">
            <ShowBoards
              selectedBoardId={selectedBoardId}
              onSelectBoard={setSelectedBoardId}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 px-1">Navigation</h2>
            <div className="space-y-1">
              <button className="w-full text-left text-sm font-semibold bg-white/10 hover:bg-white/15 px-3 py-2.5 rounded-lg transition-all flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                Board View
              </button>
              <button className="w-full text-left text-sm font-medium text-white/60 hover:bg-white/5 px-3 py-2.5 rounded-lg transition-all">Today</button>
              <button className="w-full text-left text-sm font-medium text-white/60 hover:bg-white/5 px-3 py-2.5 rounded-lg transition-all">Templates</button>
            </div>
          </div>

          <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-4">
            <h3 className="text-sm font-bold mb-2 flex items-center gap-2 text-indigo-300">
              <Layout className="w-4 h-4" />
              Pro Tip
            </h3>
            <p className="text-xs text-white/60 leading-relaxed italic">Press <code className="bg-black/40 px-1.5 py-0.5 rounded text-indigo-300 border border-white/5">Enter</code> to quickly save a card, or <code className="bg-black/40 px-1.5 py-0.5 rounded text-indigo-300 border border-white/5">Esc</code> to cancel.</p>
          </div>
        </aside>

        {/* BOARD AREA */}
        <main className="flex-1 flex flex-col min-w-0 bg-black/5">
          <div className="px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-white/90">
                {selectedBoard ? selectedBoard.title : "Main Workspace"}
              </h2>
              <p className="text-xs text-white/40 font-medium">Manage your team workflow effectively</p>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="flex-1 overflow-x-auto custom-scrollbar-horizontal px-6 pb-6 mt-2">
            {!selectedBoardId ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-white/5 rounded-3xl border border-dashed border-white/10 mx-auto max-w-2xl my-10">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                  <Trello className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Welcome to Taskly</h3>
                <p className="text-white/50 mb-6 max-w-sm">Create your first board from the sidebar to start organizing your work with lists and cards.</p>
              </div>
            ) : (
              <div className="flex items-start gap-4 h-full pr-12 min-w-max">
                {columns.map((column, index) => {
                  const filteredTasks = tasks.filter((t) => t.column_id === column.id);
                  const colorSet = columnColors[index % columnColors.length];

                  return (
                    <section
                      key={column.id}
                      className={`w-[272px] shrink-0 ${colorSet.bg} ${colorSet.border} border rounded-xl p-3 shadow-2xl flex flex-col max-h-full`}
                    >
                      <div className="flex justify-between items-center px-1 py-1 shrink-0 mb-2">
                        <h3 className="text-sm font-bold text-white/90 truncate mr-2">{column.title}</h3>
                        <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                        </div>
                      </div>

                      <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-1 -mr-1">
                        <TaskList tasks={filteredTasks} />
                      </div>

                      <div className="mt-3 shrink-0">
                        {activeColumn === column.id ? (
                          <div className="bg-black/20 p-2 rounded-lg ring-1 ring-white/10">
                            <TaskInput columnId={column.id} onCancel={() => setActiveColumn(null)} />
                          </div>
                        ) : (
                          <button
                            className="w-full group flex items-center justify-between text-sm text-white/80 hover:bg-black/20 py-2 px-2 rounded-lg transition-all"
                            onClick={() => setActiveColumn(column.id)}
                          >
                            <span className="flex items-center gap-2">
                              <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              <span className="font-semibold">Add a card</span>
                            </span>
                            <SquareArrowOutUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                          </button>
                        )}
                      </div>
                    </section>
                  );
                })}

                {/* ADD COLUMN SECTION */}
                <div className="w-[272px] shrink-0">
                  {isAddingColumn ? (
                    <div className="bg-black/40 border border-white/10 rounded-xl p-3 backdrop-blur-md shadow-2xl">
                      <ColumnInput boardId={selectedBoardId} onCancel={() => setIsAddingColumn(false)} />
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddingColumn(true)}
                      className="w-full py-3 h-auto flex items-center gap-2 px-4 rounded-xl bg-white/10 border border-white/5 hover:bg-white/15 transition-all text-white/80 font-bold group shadow-lg"
                    >
                      <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                      Add another list
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
