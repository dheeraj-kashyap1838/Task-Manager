export interface Task {
  id: string;
  title: string;
  completed: boolean;
  user_id?: string;
  created_at?: string;
}
