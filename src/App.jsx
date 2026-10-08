import { useMemo, useState } from 'react'
import TaskFilters from './components/dashboard/TaskFilters'
import TaskCard from './components/dashboard/TaskCard'
import { tasks } from './data/mockData'

export default function App() {
  const [selectedState, setSelectedState] = useState('Todos')
  const [selectedPriority, setSelectedPriority] = useState('Todas')

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesState =
        selectedState === 'Todos' || task.state === selectedState

      const matchesPriority =
        selectedPriority === 'Todas' || task.priority === selectedPriority

      return matchesState && matchesPriority
    })
  }, [selectedState, selectedPriority])

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((task) => task.state === 'Pendiente').length,
      inProgress: tasks.filter((task) => task.state === 'En progreso').length,
      completed: tasks.filter((task) => task.state === 'Completada').length,
      blocked: tasks.filter((task) => task.state === 'Bloqueada').length,
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/60 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
                Workspace
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Dashboard de Gestión de Tareas
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-300">
                {filteredTasks.length} tareas visibles
              </div>
              <div className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300">
                Actualización en tiempo real
              </div>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-sm text-slate-400">Total</p>
            <p className="mt-2 text-3xl font-bold text-white">{stats.total}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-sm text-slate-400">Pendientes</p>
            <p className="mt-2 text-3xl font-bold text-slate-200">{stats.pending}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-sm text-slate-400">En progreso</p>
            <p className="mt-2 text-3xl font-bold text-cyan-300">{stats.inProgress}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-sm text-slate-400">Completadas</p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">{stats.completed}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-sm text-slate-400">Bloqueadas</p>
            <p className="mt-2 text-3xl font-bold text-rose-300">{stats.blocked}</p>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[340px_minmax(0,1fr)]">
          <TaskFilters
            selectedState={selectedState}
            selectedPriority={selectedPriority}
            onStateChange={setSelectedState}
            onPriorityChange={setSelectedPriority}
          />

          <main className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div>
                <p className="text-sm text-slate-400">Filtros activos</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-200">
                    Estado: {selectedState}
                  </span>
                  <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-200">
                    Prioridad: {selectedPriority}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedState('Todos')
                  setSelectedPriority('Todas')
                }}
                className="rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
              >
                Limpiar filtros
              </button>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center">
                <p className="text-lg font-semibold text-white">
                  No hay tareas que coincidan con los filtros.
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Prueba cambiando el estado o la prioridad para ver más resultados.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
