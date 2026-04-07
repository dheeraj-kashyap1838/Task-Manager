"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export type Board = {
	id: string
	title: string
	user_id: string
}

export const useBoards = () => {
	const [boards, setBoards] = useState<Board[]>([])

	// 📥 Fetch Boards
	const fetchBoards = async () => {
		const { data: { session } } = await supabase.auth.getSession()
		const user = session?.user

		if (!user) return 

		const { data, error } = await supabase
			.from("boards")
			.select("*")

		if (error) {
			console.error("Fetch Error:", error)
		} else if (data) {
			setBoards(data)
		}
	}

	useEffect(() => {
		fetchBoards()

		// Realtime subscription for boards
		const channel = supabase
			.channel('realtime_boards')
			.on('postgres_changes', { 
				event: '*', 
				schema: 'public', 
				table: 'boards' 
			}, (payload) => {
				if (payload.eventType === 'INSERT') {
					setBoards((prev) => [...prev, payload.new as Board])
				} else if (payload.eventType === 'UPDATE') {
					setBoards((prev) => prev.map(b => b.id === payload.new.id ? payload.new as Board : b))
				} else if (payload.eventType === 'DELETE') {
					setBoards((prev) => prev.filter(b => b.id !== payload.old.id))
				}
			})
			.subscribe()

		// Re-fetch when auth state changes (e.g. login)
		const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
			fetchBoards()
		})

		return () => {
			subscription.unsubscribe()
			supabase.removeChannel(channel)
		}
	}, [])

	// ➕ Add Board
	const addBoard = async (title: string) => {
		const { data: { session } } = await supabase.auth.getSession()
		const user = session?.user

		if (!user) return

		const { error } = await supabase
			.from("boards")
			.insert([{ 
				title,
				user_id: user.id 
			}])

		if (error) {
			console.error("Error adding board:", error)
		}
	}

	const deleteBoard = async (id: string) => {
		const { error } = await supabase
			.from("boards")
			.delete()
			.eq("id", id)

		if (error) {
			console.error("Error deleting board:", error)
		}
	}

	return { boards, addBoard, deleteBoard }
}