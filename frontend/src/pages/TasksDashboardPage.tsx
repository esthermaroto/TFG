import { useEffect, useMemo, useState } from 'react'

import { TaskFiltersBar } from '../components/TaskFilters'
import { TaskModal } from '../components/TaskModal'
import { TaskTable } from '../components/TaskTable'
import { Toast } from '../components/Toast'
import { useTasksApi } from '../hooks/useTasksApi'
import type { Task, TaskFilters, TaskPayload } from '../types/task'

export function TasksDashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filters, setFilters] = useState<TaskFilters>({ search: '', status: 'all' })
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const { loading, error, fetchTasks, createTask, updateTask, deleteTask } = useTasksApi()

  const loadTasks = async () => {
    const data = await fetchTasks(filters)
    if (data) setTasks(data)
  }

  useEffect(() => {
    const timeoutId = setTimeout(loadTasks, 200)
    return () => clearTimeout(timeoutId)
  }, [filters])

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter((task) => task.status === 'completed').length,
      inProgress: tasks.filter((task) => task.status === 'in_progress').length,
    }
  }, [tasks])

  const openCreateModal = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  const handleModalSubmit = async (payload: TaskPayload) => {
    const result = editingTask ? await updateTask(editingTask.id, payload) : await createTask(payload)
    if (result) {
      setToast({ type: 'success', message: editingTask ? 'Tarea actualizada.' : 'Tarea creada correctamente.' })
      setModalOpen(false)
      await loadTasks()
    }
  }

  const handleDelete = async (task: Task) => {
    const accepted = window.confirm(`¿Eliminar la tarea "${task.title}"?`)
    if (!accepted) return

    const result = await deleteTask(task.id)
    if (result) {
      setToast({ type: 'success', message: 'Tarea eliminada.' })
      await loadTasks()
    }
  }

  useEffect(() => {
    if (!toast) return
    const timeoutId = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(timeoutId)
  }, [toast])

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs uppercase text-slate-400">Total tareas</p>
          <p className="mt-2 text-3xl font-semibold">{stats.total}</p>
        </article>
        <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs uppercase text-slate-400">En progreso</p>
          <p className="mt-2 text-3xl font-semibold text-sky-300">{stats.inProgress}</p>
        </article>
        <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs uppercase text-slate-400">Completadas</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-300">{stats.completed}</p>
        </article>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Panel de tareas</h2>
          <button onClick={openCreateModal} className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold hover:bg-brand-600">Nueva tarea</button>
        </div>

        <TaskFiltersBar value={filters} onChange={setFilters} />

        {toast && <Toast type={toast.type} message={toast.message} />}
        {error && <Toast type="error" message={error} />}

        {loading ? <p className="text-sm text-slate-300">Cargando tareas...</p> : <TaskTable tasks={tasks} onEdit={(task) => { setEditingTask(task); setModalOpen(true) }} onDelete={handleDelete} />}
      </section>

      <TaskModal open={modalOpen} task={editingTask} onClose={() => setModalOpen(false)} onSubmit={handleModalSubmit} />
    </div>
  )
}
