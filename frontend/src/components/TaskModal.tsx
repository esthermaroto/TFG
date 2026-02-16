import { useEffect, useState } from 'react'

import type { Task, TaskPayload } from '../types/task'

interface TaskModalProps {
  open: boolean
  task: Task | null
  onClose: () => void
  onSubmit: (payload: TaskPayload) => Promise<void>
}

const initialState: TaskPayload = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  owner: '',
  tags: [],
  due_date: null,
}

export function TaskModal({ open, task, onClose, onSubmit }: TaskModalProps) {
  const [form, setForm] = useState<TaskPayload>(initialState)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        owner: task.owner,
        tags: task.tags,
        due_date: task.due_date,
      })
    } else {
      setForm(initialState)
    }
    setErrors([])
  }, [task, open])

  if (!open) return null

  const validate = () => {
    const newErrors: string[] = []
    if (form.title.trim().length < 5) newErrors.push('El título debe tener al menos 5 caracteres.')
    if (form.description.trim().length < 10) newErrors.push('La descripción debe tener al menos 10 caracteres.')
    if (form.owner.trim().length < 3) newErrors.push('El owner debe tener al menos 3 caracteres.')
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    await onSubmit(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl rounded-xl border border-slate-700 bg-slate-900 p-6 text-white">
        <h2 className="mb-4 text-xl font-semibold">{task ? 'Editar tarea' : 'Nueva tarea'}</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded bg-slate-950 p-2" placeholder="Título" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          <input className="rounded bg-slate-950 p-2" placeholder="Owner" value={form.owner} onChange={(event) => setForm({ ...form, owner: event.target.value })} />
          <select className="rounded bg-slate-950 p-2" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as TaskPayload['status'] })}>
            <option value="pending">Pendiente</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </select>
          <select className="rounded bg-slate-950 p-2" value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value as TaskPayload['priority'] })}>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
          <input
            className="rounded bg-slate-950 p-2 md:col-span-2"
            placeholder="Tags separadas por comas"
            value={form.tags.join(', ')}
            onChange={(event) => setForm({ ...form, tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) })}
          />
          <textarea
            className="min-h-28 rounded bg-slate-950 p-2 md:col-span-2"
            placeholder="Descripción"
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />
        </div>

        {errors.length > 0 && (
          <ul className="mt-4 rounded bg-rose-500/10 p-3 text-sm text-rose-200">
            {errors.map((error) => (
              <li key={error}>• {error}</li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded border border-slate-600 px-4 py-2">Cancelar</button>
          <button type="submit" className="rounded bg-brand-500 px-4 py-2 font-medium">Guardar</button>
        </div>
      </form>
    </div>
  )
}
