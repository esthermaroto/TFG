import type { TaskFilters } from '../types/task'

interface TaskFiltersProps {
  value: TaskFilters
  onChange: (filters: TaskFilters) => void
}

export function TaskFiltersBar({ value, onChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 md:flex-row md:items-center md:justify-between">
      <input
        value={value.search}
        onChange={(event) => onChange({ ...value, search: event.target.value })}
        placeholder="Buscar por título, descripción o etiqueta..."
        className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-brand-500 md:max-w-md"
      />

      <select
        value={value.status}
        onChange={(event) => onChange({ ...value, status: event.target.value as TaskFilters['status'] })}
        className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
      >
        <option value="all">Todos los estados</option>
        <option value="pending">Pendiente</option>
        <option value="in_progress">En progreso</option>
        <option value="completed">Completada</option>
        <option value="cancelled">Cancelada</option>
      </select>
    </div>
  )
}
