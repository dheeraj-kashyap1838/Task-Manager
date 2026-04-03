import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export type Column = {
	id: string
	title: string
}

export const useColumns = () => {
	const [columns, setColumns] = useState<Column[]>([])

	const fetchColumns = async () => {
		const { data, error } = await supabase
			.from("columns")
			.select("*")
		
		if (!error && data) {
			setColumns(data)
		}
	}

	useEffect(() => {
		fetchColumns()
	}, [])

	const addColumn = async (title: string) => {
		const { data, error } = await supabase
			.from("columns")
			.insert([{ title }])
			.select()

		if (!error && data) {
			setColumns((prev) => [...prev, data[0]])
		}
	}


	const deleteColumn = async (id: string) => {
		const { error } = await supabase
			.from("columns")
			.delete()
			.eq("id", id)

		if (!error) {
			setColumns((prev) => prev.filter((c) => c.id !== id))
		}
	}

	return { columns, addColumn, deleteColumn }
}