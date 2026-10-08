const priorityStyles = {
  Baja: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Media: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Alta: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  Crítica: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
}

const stateStyles = {
  Pendiente: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  'En progreso': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  Completada: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Bloqueada: 'bg-red-500/15 text-red-300 border-red-500/30',
}

export default function TaskCard({ task }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/25 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-cyan-950/20">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-white">{task.title}</h3>
        </div>

        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
            priorityStyles[task.priority] || priorityStyles.Media
          }`}
        >
          {task.priority}
        </span>
      </div>

      <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-300">
        {task.description}
      </p>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
            stateStyles[task.state] || stateStyles.Pendiente
          }`}
        >
          {task.state}
        </span>

        {task.labels.map((label) => (
          <span
            key={label}
            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300"
          >
            #{label}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
          ID #{task.id}
        </div>

        <button
          type="button"
          className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-200 transition-colors hover:bg-cyan-500/20"
        >
          Ver detalles
        </button>
      </div>
    </article>
  )
}
