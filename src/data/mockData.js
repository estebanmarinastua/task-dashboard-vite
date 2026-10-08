export const initialTasks = [
  {
    id: 1,
    title: 'Implementar autenticación OAuth',
    description:
      'Configurar el flujo de autenticación para usuarios externos y reforzar la seguridad del acceso a la API.',
    priority: 'Crítica',
    state: 'En progreso',
    labels: ['Backend', 'Seguridad', 'API'],
    assignee: 'María López',
    dueDate: '2026-10-12',
    effort: '8h',
    project: 'Plataforma API',
  },
  {
    id: 2,
    title: 'Rediseñar dashboard de métricas',
    description:
      'Actualizar la vista principal de reportes para mejorar legibilidad, carga y jerarquía visual.',
    priority: 'Alta',
    state: 'Pendiente',
    labels: ['Frontend', 'UX'],
    assignee: 'Sofía Varela',
    dueDate: '2026-10-16',
    effort: '6h',
    project: 'Analytics',
  },
  {
    id: 3,
    title: 'Corregir bug en pagos recurrentes',
    description:
      'Resolver la inconsistencia al procesar suscripciones con renovaciones automáticas y pagos fallidos.',
    priority: 'Crítica',
    state: 'Bloqueada',
    labels: ['Bug', 'Pagos', 'Producción'],
    assignee: 'Carlos Ruiz',
    dueDate: '2026-10-09',
    effort: '10h',
    project: 'Finanzas',
  },
  {
    id: 4,
    title: 'Optimizar consultas de base de datos',
    description:
      'Reducir tiempos de respuesta en los módulos de reportes críticos usando índices y consultas más eficientes.',
    priority: 'Alta',
    state: 'Completada',
    labels: ['Backend', 'Performance'],
    assignee: 'Lucas Torres',
    dueDate: '2026-10-07',
    effort: '7h',
    project: 'Infraestructura',
  },
  {
    id: 5,
    title: 'Preparar despliegue para QA',
    description:
      'Validar build final, variables de entorno y checklist de despliegue para el entorno de pruebas.',
    priority: 'Media',
    state: 'En progreso',
    labels: ['DevOps', 'QA'],
    assignee: 'Nora Flores',
    dueDate: '2026-10-14',
    effort: '5h',
    project: 'Release',
  },
  {
    id: 6,
    title: 'Documentar API de integración',
    description:
      'Actualizar ejemplos, autenticación y errores comunes en la documentación pública de integración.',
    priority: 'Baja',
    state: 'Pendiente',
    labels: ['Documentación', 'API'],
    assignee: 'Diana Salas',
    dueDate: '2026-10-18',
    effort: '4h',
    project: 'Developer Experience',
  },
]

export const priorityRank = {
  Crítica: 5,
  Alta: 4,
  Media: 3,
  Baja: 2,
}

export const stateRank = {
  Pendiente: 1,
  'En progreso': 2,
  Bloqueada: 3,
  Completada: 4,
}
