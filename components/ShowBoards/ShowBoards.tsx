"use client"
import { useState } from "react"
import { useBoards } from "@/hooks/useBoards"
import { Plus, Layout, Trello, Trash2, Check, MoreVertical } from "lucide-react"

interface ShowBoardsProps {
	selectedBoardId: string | null
	onSelectBoard: (id: string) => void
}

export default function ShowBoards({ selectedBoardId, onSelectBoard }: ShowBoardsProps) {
	const { boards, addBoard, deleteBoard } = useBoards()
	const [title, setTitle] = useState("")
	const [isAdding, setIsAdding] = useState(false)

	const handleAdd = async () => {
		if (!title.trim()) return
		await addBoard(title)
		setTitle("")
		setIsAdding(false)
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between px-1">
				<h2 className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
					<Trello className="w-3 h-3" />
					Your Boards
				</h2>
				<button
					onClick={() => setIsAdding(!isAdding)}
					className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/60 hover:text-white"
				>
					<Plus className={`w-4 h-4 transition-transform duration-300 ${isAdding ? 'rotate-45' : ''}`} />
				</button>
			</div>

			{/* ➕ Add Board Input */}
			{isAdding && (
				<div className="px-1 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
						placeholder="Board title..."
						autoFocus
						className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 placeholder:text-white/20 transition-all"
					/>
					<div className="flex gap-2">
						<button
							onClick={handleAdd}
							className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-1.5 rounded-md transition-all active:scale-95"
						>
							Create
						</button>
						<button
							onClick={() => setIsAdding(false)}
							className="flex-1 bg-white/5 hover:bg-white/10 text-white/60 text-xs font-medium py-1.5 rounded-md transition-all"
						>
							Cancel
						</button>
					</div>
				</div>
			)}

			{/* 📋 Board List */}
			<div className="space-y-1">
				{boards.length === 0 ? (
					<div className="px-4 py-8 text-center border border-dashed border-white/5 rounded-xl">
						<p className="text-xs text-white/30">No boards yet</p>
					</div>
				) : (
					boards.map((board) => {
						const isActive = selectedBoardId === board.id
						return (
							<div
								key={board.id}
								className={`
									group flex items-center gap-1 px-1 rounded-lg transition-all
									${isActive ? "bg-indigo-500/20 ring-1 ring-indigo-500/30" : "hover:bg-white/5"}
								`}
							>
								<button
									onClick={() => onSelectBoard(board.id)}
									className={`
										flex-1 text-left px-2 py-2.5 rounded-lg transition-all flex items-center justify-between
										${isActive ? "text-white" : "text-white/60 hover:text-white"}
									`}
								>
									<div className="flex items-center gap-3 truncate">
										<Layout className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-white/30'}`} />
										<span className="text-sm font-medium truncate">{board.title}</span>
									</div>
									
									{isActive && (
										<Check className="w-3.5 h-3.5 text-indigo-400 animate-in zoom-in duration-300 mr-2" />
									)}
								</button>

								<button
									onClick={() => {
										if (confirm(`Are you sure you want to delete "${board.title}"?`)) {
											deleteBoard(board.id)
										}
									}}
									className="opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-500/20 rounded-lg text-rose-400 transition-all shrink-0"
									title="Delete Board"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}