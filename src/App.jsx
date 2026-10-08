import { useMemo, useState } from 'react'
import TaskFilters from './components/dashboard/TaskFilters'
import TaskCard from './components/dashboard/TaskCard'
import { initialTasks, priorityRank, stateRank } from './data/mockData'

const sortOptions = {
  priority: (a, b) => (priorityRank[b.priority] || 0) - (priorityRank[a.priority] || 0),
  state: (a, b) => (stateRank[b.state] || 0) - (stateRank[a.state] || 0),
  dueDate: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
  title: (a, b) => a.title.localeCompare(b.title),
}

export default function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedState, setSelectedState] = useState('Todos')
  const [selectedPriority, setSelectedPriority] = useState('Todas')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('priority')
  const [selectedTask, setSelectedTask] = useState(null)

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return [...tasks]
      .filter((task) => {
        const matchesState =
          selectedState === 'Todos' || task.state === selectedState

        const matchesPriority =
          selectedPriority === 'Todas' || task.priority === selectedPriority

        const haystack = `${task.title} ${task.description} ${task.labels.join(' ')}`.toLowerCase()
        const matchesSearch =
          normalizedSearch === '' || haystack.includes(normalizedSearch)

        return matchesState && matchesPriority && matchesSearch
      })
      .sort(sortOptions[sortBy] || sortOptions.priority)
  }, [tasks, selectedState, selectedPriority, searchTerm, sortBy])

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((task) => task.state === 'Pendiente').length,
      inProgress: tasks.filter((task) => task.state === 'En progreso').length,
      completed: tasks.filter((task) => task.state === 'Completada').length,
      blocked: tasks.filter((task) => task.state === 'Bloqueada').length,
      critical: tasks.filter((task) => task.priority === 'Crítica').length,
    }
  }, [tasks])

  const handleToggleComplete = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) return task

        const nextState =
          task.state === 'Completada' ? 'Pendiente' : 'Completada'

        return { ...task, state: nextState }
      }),
    )
  }

  const handleExportTasks = () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'tareas-dashboard.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleClearFilters = () => {
    setSelectedState('Todos')
    setSelectedPriority('Todas')
    setSearchTerm('')
    setSortBy('priority')
  }

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
                {filteredTasks.length} visibles
              </div>
              <div className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300">
                Tiempo real
              </div>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
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

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-sm text-slate-400">Críticas</p>
            <p className="mt-2 text-3xl font-bold text-red-300">{stats.critical}</p>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[350px_minmax(0,1fr)]">
          <TaskFilters
            selectedState={selectedState}
            selectedPriority={selectedPriority}
            onStateChange={setSelectedState}
            onPriorityChange={setSelectedPriority}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
            onExport={handleExportTasks}
            visibleCount={filteredTasks.length}
            totalCount={tasks.length}
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
                  {searchTerm && (
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-200">
                      Búsqueda: {searchTerm}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleClearFilters}
                className="rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
              >
                Limpiar filtros
              </button>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center">
                <p className="text-lg font-semibold text-white">
                  No hay tareas que coincidan con tu búsqueda.
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Prueba con otros filtros o limpia la búsqueda para volver a ver todas.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onOpen={setSelectedTask}
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/50">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Detalles de tarea
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">{selectedTask.title}</h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-200 hover:border-slate-500"
              >
                Cerrar
              </button>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-200">
                {selectedTask.state}
              </span>
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-xs text-violet-200">
                {selectedTask.priority}
              </span>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-200">
                {selectedTask.project}
              </span>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <p>{selectedTask.description}</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">Asignado</p>
                  <p className="mt-1 font-medium text-white">{selectedTask.assignee}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">Esfuerzo</p>
                  <p className="mt-1 font-medium text-white">{selectedTask.effort}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">Fecha límite</p>
                  <p className="mt-1 font-medium text-white">{selectedTask.dueDate}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">Etiquetas</p>
                  <p className="mt-1 font-medium text-white">{selectedTask.labels.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => handleToggleComplete(selectedTask.id)}
                className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20"
              >
                {selectedTask.state === 'Completada' ? 'Marcar como pendiente' : 'Marcar como completada'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
