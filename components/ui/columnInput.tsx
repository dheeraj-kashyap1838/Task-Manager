"use client"
import { useColumns } from "@/hooks/useColumns";
import { useState } from "react"
import { X } from "lucide-react";

interface ColumnInputProps {
  boardId: string | null
  onCancel?: () => void
}

export default function ColumnInput({ boardId, onCancel }: ColumnInputProps) {
  const { addColumn } = useColumns(boardId || undefined);
  const [title, setTitle] = useState("")

  const handleSubmit = async () => {
    if (!title.trim() || !boardId) return

    await addColumn(title.trim())
    setTitle("")
    if (onCancel) onCancel();
  }
// ... (rest of the file remains same, but I'll replace the whole thing to be safe)
  return (
    <div className="flex flex-col gap-2 w-full animate-in fade-in slide-in-from-top-1 duration-200">
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape" && onCancel) onCancel();
        }}
        className="w-full bg-[#101204]/60 border-2 border-[#1a5d42] rounded-lg p-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none transition-all font-medium"
        placeholder="Enter list title..."
      />

      <div className="flex flex-row items-center gap-2 px-0.5">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-3 py-1.5 rounded-[4px] transition-all shadow-lg active:scale-95 whitespace-nowrap"
        >
          Add list
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
