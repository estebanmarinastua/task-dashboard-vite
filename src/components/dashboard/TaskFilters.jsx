const stateOptions = ['Todos', 'Pendiente', 'En progreso', 'Completada', 'Bloqueada']
const priorityOptions = ['Todas', 'Baja', 'Media', 'Alta', 'Crítica']

export default function TaskFilters({
  selectedState,
  selectedPriority,
  onStateChange,
  onPriorityChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  onClearFilters,
  onExport,
  visibleCount,
  totalCount,
}) {
  return (
    <aside className="space-y-5 rounded-3xl border border-slate-800 bg-slate-900/75 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-sm">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Búsqueda
        </p>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar tareas..."
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
        />
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
          Ordenar por
        </p>
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-white focus:border-violet-400 focus:outline-none"
        >
          <option value="priority">Prioridad</option>
          <option value="state">Estado</option>
          <option value="dueDate">Fecha límite</option>
          <option value="title">Título</option>
        </select>
      </div>

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

      <div className="space-y-3 border-t border-slate-800 pt-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Mostrando</span>
          <span>
            {visibleCount}/{totalCount}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClearFilters}
            className="flex-1 rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
          >
            Limpiar
          </button>
          <button
            type="button"
            onClick={onExport}
            className="flex-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-200 transition-colors hover:bg-emerald-500/20"
          >
            Exportar
          </button>
        </div>
      </div>
    </aside>
  )
}
