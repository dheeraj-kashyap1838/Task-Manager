export interface Task {
  id: string;
  task: string;
  is_completed: boolean;
  user_id?: string;
  created_at?: string;
  column_id?: string;
}
