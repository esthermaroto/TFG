interface ToastProps {
  message: string
  type: 'success' | 'error'
}

export function Toast({ message, type }: ToastProps) {
  const style = type === 'success' ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-100'
  return <div className={`rounded-lg px-4 py-3 text-sm ${style}`}>{message}</div>
}
