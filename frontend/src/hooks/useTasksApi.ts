import { useCallback, useState } from 'react'

import { apiClient } from '../api/client'
import type { Task, TaskPayload, TaskStatus } from '../types/task'

interface ApiState {
  loading: boolean
  error: string | null
}

export function useTasksApi() {
  const [apiState, setApiState] = useState<ApiState>({ loading: false, error: null })

  const request = useCallback(async <T,>(action: () => Promise<T>): Promise<T | null> => {
    setApiState({ loading: true, error: null })
    try {
      const data = await action()
      setApiState({ loading: false, error: null })
      return data
    } catch (error: any) {
      const message = error?.response?.data?.detail ?? 'Error inesperado de red'
      setApiState({ loading: false, error: message })
      return null
    }
  }, [])

  const fetchTasks = useCallback(
    async ({ search, status }: { search?: string; status?: TaskStatus | 'all' }) => {
      const params: Record<string, string> = {}
      if (search) params.search = search
      if (status && status !== 'all') params.status = status

      return request(async () => {
        const response = await apiClient.get<Task[]>('/tasks', { params })
        return response.data
      })
    },
    [request],
  )

  const createTask = useCallback(
    (payload: TaskPayload) =>
      request(async () => {
        const response = await apiClient.post<Task>('/tasks', payload)
        return response.data
      }),
    [request],
  )

  const updateTask = useCallback(
    (id: number, payload: TaskPayload) =>
      request(async () => {
        const response = await apiClient.put<Task>(`/tasks/${id}`, payload)
        return response.data
      }),
    [request],
  )

  const deleteTask = useCallback(
    (id: number) =>
      request(async () => {
        await apiClient.delete(`/tasks/${id}`)
        return true
      }),
    [request],
  )

  return {
    ...apiState,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  }
}
