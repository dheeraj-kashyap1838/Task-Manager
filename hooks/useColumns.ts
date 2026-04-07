import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export type Column = {
	id: string
	title: string
}

export const useColumns = (boardId?: string) => {
	const [columns, setColumns] = useState<Column[]>([])

	const fetchColumns = async () => {
		if (!boardId) {
			setColumns([])
			return
		}

		console.log("Fetching columns for board:", boardId)
		const { data, error } = await supabase
			.from("columns")
			.select("*")
			.eq("board_id", boardId)

		if (error) {
			console.error("Error fetching columns:", error)
		} else {
			setColumns(data || [])
		}
	}

	useEffect(() => {
		fetchColumns()

		if (!boardId) return

		// Realtime subscription for columns
		const channel = supabase
			.channel(`realtime_columns_${boardId}`)
			.on('postgres_changes', { 
				event: '*', 
				schema: 'public', 
				table: 'columns',
				filter: `board_id=eq.${boardId}`
			}, (payload) => {
				if (payload.eventType === 'INSERT') {
					setColumns((prev) => [...prev, payload.new as Column])
				} else if (payload.eventType === 'DELETE') {
					setColumns((prev) => prev.filter(c => c.id !== payload.old.id))
				} else if (payload.eventType === 'UPDATE') {
					setColumns((prev) => prev.map(c => c.id === payload.new.id ? payload.new as Column : c))
				}
			})
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [boardId])

	const addColumn = async (title: string) => {
		if (!boardId) return

		const { error } = await supabase
			.from("columns")
			.insert([{ 
				title, 
				board_id: boardId
			}])

		if (error) {
			console.error("Error adding column:", error)
		}
	}

	const deleteColumn = async (id: string) => {
		const { error } = await supabase
			.from("columns")
			.delete()
			.eq("id", id)

		if (error) {
			console.error("Error deleting column:", error)
		}
	}

	return { columns, addColumn, deleteColumn }
}