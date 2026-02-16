export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  owner: string
  tags: string[]
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface TaskPayload {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  owner: string
  tags: string[]
  due_date: string | null
}

export interface TaskFilters {
  search: string
  status: TaskStatus | 'all'
}
