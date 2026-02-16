import type { TaskStatus } from '../types/task'

const statusStyles: Record<TaskStatus, string> = {
  pending: 'bg-amber-500/20 text-amber-300',
  in_progress: 'bg-sky-500/20 text-sky-300',
  completed: 'bg-emerald-500/20 text-emerald-300',
  cancelled: 'bg-rose-500/20 text-rose-300',
}

const labels: Record<TaskStatus, string> = {
  pending: 'Pendiente',
  in_progress: 'En progreso',
  completed: 'Completada',
  cancelled: 'Cancelada',
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>{labels[status]}</span>
}
