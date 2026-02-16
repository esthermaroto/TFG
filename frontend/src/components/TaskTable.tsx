import { FiEdit2, FiTrash2 } from 'react-icons/fi'

import type { Task } from '../types/task'
import { StatusBadge } from './StatusBadge'

interface TaskTableProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
      <table className="w-full text-left text-sm text-slate-200">
        <thead className="bg-slate-900 text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-4 py-3">Tarea</th>
            <th className="px-4 py-3">Owner</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Prioridad</th>
            <th className="px-4 py-3">Tags</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t border-slate-800">
              <td className="px-4 py-3">
                <p className="font-medium text-white">{task.title}</p>
                <p className="text-xs text-slate-400">{task.description}</p>
              </td>
              <td className="px-4 py-3">{task.owner}</td>
              <td className="px-4 py-3"><StatusBadge status={task.status} /></td>
              <td className="px-4 py-3 capitalize">{task.priority}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {task.tags.map((tag) => (
                    <span key={tag} className="rounded bg-slate-800 px-2 py-0.5 text-xs">#{tag}</span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(task)} className="rounded p-2 text-slate-300 hover:bg-slate-800">
                    <FiEdit2 />
                  </button>
                  <button onClick={() => onDelete(task)} className="rounded p-2 text-rose-300 hover:bg-slate-800">
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
