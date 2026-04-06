import { useState } from 'react'
import { Plus, Clock, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, MoreHorizontal, Calendar, User } from 'lucide-react'

const INITIAL_TASKS = {
  pending: [
    { id: 1, title: 'TUG Assessment — Jorge H.', meta: '9 days overdue · Physiotherapy', assignee: 'PT', priority: 'critical', gradient: 'from-orange-500 to-amber-600' },
    { id: 2, title: 'Menu redesign — Elena M.', meta: 'Plant protein protocol · Nutrition', assignee: 'LC', priority: 'watch', gradient: 'from-violet-500 to-purple-600' },
    { id: 3, title: 'GDS Follow-up — Rosa J.', meta: 'Weekly assessment · Psychology', assignee: 'RV', priority: 'scheduled', gradient: 'from-blue-500 to-blue-600' },
    { id: 4, title: 'Glucose alert response', meta: 'Elena M. 142mg/dL · Medicine', assignee: 'AF', priority: 'critical', gradient: 'from-teal-500 to-cyan-600' },
  ],
  inprogress: [
    { id: 5, title: 'Individual psych session', meta: 'Elena M. · Room 12 · 45min', assignee: 'RV', priority: 'scheduled', gradient: 'from-blue-500 to-blue-600' },
    { id: 6, title: 'Medication round prep', meta: '1 PM round · 24 residents', assignee: 'AM', priority: 'scheduled', gradient: 'from-pink-500 to-rose-600' },
    { id: 7, title: 'Kitchen supply order', meta: 'Weekly restock · Urgent items', assignee: 'JR', priority: 'logistics', gradient: 'from-yellow-500 to-orange-500' },
  ],
  completed: [
    { id: 8, title: 'Morning vital signs', meta: 'All 24 residents checked', assignee: 'AM', priority: 'done', gradient: 'from-pink-500 to-rose-600' },
    { id: 9, title: 'Meal plan validation', meta: '3 special diets approved', assignee: 'LC', priority: 'done', gradient: 'from-violet-500 to-purple-600' },
    { id: 10, title: 'Interdisciplinary briefing', meta: 'Week 16 alignment complete', assignee: 'DG', priority: 'done', gradient: 'from-green-500 to-emerald-600' },
  ],
}

const PRIORITY_STYLES = {
  critical: 'border-l-rose-500 bg-rose-50/30',
  watch: 'border-l-amber-500 bg-amber-50/30',
  scheduled: 'border-l-indigo-500 bg-indigo-50/20',
  logistics: 'border-l-sky-500 bg-sky-50/20',
  done: 'border-l-green-500 bg-green-50/30',
}

const COLUMN_CONFIG = {
  pending: { label: 'Pending', icon: Clock, color: 'bg-amber-500', headerBg: 'bg-amber-50 border-b-amber-400' },
  inprogress: { label: 'In Progress', icon: AlertCircle, color: 'bg-indigo-500', headerBg: 'bg-indigo-50 border-b-indigo-400' },
  completed: { label: 'Completed', icon: CheckCircle2, color: 'bg-green-500', headerBg: 'bg-green-50 border-b-green-400' },
}

export default function Operations() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [showModal, setShowModal] = useState(false)

  const moveTask = (taskId, from, to) => {
    setTasks(prev => {
      const task = prev[from].find(t => t.id === taskId)
      if (!task) return prev
      return {
        ...prev,
        [from]: prev[from].filter(t => t.id !== taskId),
        [to]: [...prev[to], { ...task, priority: to === 'completed' ? 'done' : task.priority }],
      }
    })
  }

  const totalTasks = Object.values(tasks).flat().length
  const completedCount = tasks.completed.length
  const completionPct = Math.round((completedCount / totalTasks) * 100)

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">
      {/* Summary Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 flex items-center gap-8 text-white">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold">{totalTasks}</span>
          <span className="text-[12px] text-white/60">Total Tasks</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-amber-400">{tasks.pending.length}</span>
          <span className="text-[12px] text-white/60">Pending</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-indigo-400">{tasks.inprogress.length}</span>
          <span className="text-[12px] text-white/60">In Progress</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-green-400">{completedCount}</span>
          <span className="text-[12px] text-white/60">Completed</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-white/50">Completion</span>
            <span className="text-[11px] font-bold text-white/80">{completionPct}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-400 to-green-400 rounded-full transition-all duration-500" style={{ width: `${completionPct}%` }} />
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-[12px] font-semibold transition-colors shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {(['pending', 'inprogress', 'completed']).map(colKey => {
          const col = COLUMN_CONFIG[colKey]
          const Icon = col.icon
          const colTasks = tasks[colKey]

          return (
            <div key={colKey} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 min-h-[400px] flex flex-col">
              {/* Column Header */}
              <div className={`flex items-center justify-between px-4 py-3 border-b-2 ${col.headerBg}`}>
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-slate-600" />
                  <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-700">{col.label}</h3>
                </div>
                <span className={`text-[11px] font-bold text-white px-2.5 py-0.5 rounded-full ${col.color}`}>
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="p-3 space-y-2.5 flex-1 overflow-y-auto">
                {colTasks.map(task => (
                  <div
                    key={task.id}
                    className={`bg-white rounded-xl p-4 border-l-4 shadow-sm hover:shadow-md transition-all group ${PRIORITY_STYLES[task.priority]}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[12px] font-semibold text-slate-700 leading-snug">{task.title}</h4>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{task.meta}</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${task.gradient} flex items-center justify-center text-[8px] font-bold text-white`}>
                          {task.assignee}
                        </div>
                        <span className="text-[10px] text-slate-400">{task.assignee}</span>
                      </div>

                      {/* Move buttons */}
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {colKey !== 'pending' && (
                          <button
                            onClick={() => moveTask(task.id, colKey, colKey === 'completed' ? 'inprogress' : 'pending')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-400 hover:text-amber-600 transition-colors"
                            title="Move back"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                        {colKey !== 'completed' && (
                          <button
                            onClick={() => moveTask(task.id, colKey, colKey === 'pending' ? 'inprogress' : 'completed')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-green-100 text-slate-400 hover:text-green-600 transition-colors"
                            title="Move forward"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-300">
                    <CheckCircle2 className="w-10 h-10 mb-2" />
                    <p className="text-[12px]">No tasks here</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[300] flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[440px] max-w-[90vw]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold text-slate-800 mb-5">New Task</h3>

            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Title</label>
            <input className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[13px] text-slate-700 outline-none focus:border-indigo-400 mb-3" placeholder="Task title..." />

            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1 mt-3">Description</label>
            <textarea className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[13px] text-slate-700 outline-none focus:border-indigo-400 resize-vertical min-h-[60px] mb-3" placeholder="Details..." />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Priority</label>
                <select className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[13px] text-slate-700 outline-none">
                  <option>Critical</option>
                  <option>Watch</option>
                  <option>Scheduled</option>
                  <option>Logistics</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Assignee</label>
                <select className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[13px] text-slate-700 outline-none">
                  <option>Dr. M. García</option>
                  <option>Dr. R. Vargas</option>
                  <option>Lic. L. Castillo</option>
                  <option>Lic. P. Torres</option>
                  <option>Enf. A. Méndez</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-[12px] font-semibold text-slate-500 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-[12px] font-semibold text-white transition-colors shadow-lg shadow-indigo-500/20">
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
