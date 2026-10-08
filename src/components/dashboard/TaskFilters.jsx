const stateOptions = ['Todos', 'Pendiente', 'En progreso', 'Completada', 'Bloqueada']
const priorityOptions = ['Todas', 'Baja', 'Media', 'Alta', 'Crítica']

export default function TaskFilters({
  selectedState,
  selectedPriority,
  onStateChange,
  onPriorityChange,
}) {
  return (
    <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-sm">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Estado
        </p>
        <div className="flex flex-wrap gap-2">
          {stateOptions.map((state) => {
            const active = selectedState === state
            return (
              <button
                key={state}
                type="button"
                onClick={() => onStateChange(state)}
                className={`rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-lg shadow-cyan-900/30'
                    : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
              >
                {state}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
          Prioridad
        </p>
        <div className="flex flex-wrap gap-2">
          {priorityOptions.map((priority) => {
            const active = selectedPriority === priority
            return (
              <button
                key={priority}
                type="button"
                onClick={() => onPriorityChange(priority)}
                className={`rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'border-violet-400 bg-violet-500/20 text-violet-200 shadow-lg shadow-violet-900/30'
                    : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
              >
                {priority}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
