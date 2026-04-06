import { useState } from 'react'
import { Bell, AlertTriangle, CheckCircle2, Clock, ChevronDown, ChevronUp, Zap, Shield, Thermometer, Pill, Activity } from 'lucide-react'

const ALERTS_DATA = [
  {
    id: 1, type: 'critical', title: 'Glucose level critical — Elena Morales',
    desc: 'Fasting glucose 142 mg/dL, above 130 threshold. Third elevated reading in 5 days. Trend: upward.',
    time: '8:45 AM · Today', resident: 'Elena Morales', room: 12,
    assignee: 'Dr. A. Fuentes', icon: Activity,
    actions: ['Adjust medication', 'Schedule lab work', 'Notify family'],
  },
  {
    id: 2, type: 'critical', title: 'Fall risk detected — Enrique Salazar',
    desc: 'Mobility score dropped 15pts in 72hrs. TUG test: 18s (was 12s). Balance assessment needed immediately.',
    time: '9:00 AM · Today', resident: 'Enrique Salazar', room: 20,
    assignee: 'Lic. P. Torres', icon: AlertTriangle,
    actions: ['Emergency assessment', 'Activate fall protocol', 'Room safety check'],
  },
  {
    id: 3, type: 'warning', title: 'Assessment overdue — Jorge Hernández',
    desc: 'TUG functional assessment pending for 9 days. Protocol requires weekly assessment for monitor-risk residents.',
    time: '9:10 AM · Today', resident: 'Jorge Hernández', room: 5,
    assignee: 'Lic. P. Torres', icon: Clock,
    actions: ['Schedule now', 'Reassign specialist'],
  },
  {
    id: 4, type: 'warning', title: 'WHOQOL social domain decline — Rosa Jiménez',
    desc: 'Social domain score dropped from 68 to 52 (-16pts). Correlates with reduced group activity participation.',
    time: '9:30 AM · Today', resident: 'Rosa Jiménez', room: 8,
    assignee: 'Dr. R. Vargas', icon: Activity,
    actions: ['Group intervention', 'Individual session', 'Family meeting'],
  },
  {
    id: 5, type: 'warning', title: 'Dietary adherence below threshold',
    desc: '6 residents below 70% adherence this week: Elena M., Dolores A., Enrique S., Isabel P., Teresa F., Raúl C.',
    time: '10:00 AM · Today', resident: 'Multiple', room: null,
    assignee: 'Lic. L. Castillo', icon: Pill,
    actions: ['Review menu plans', 'Individual consultations'],
  },
  {
    id: 6, type: 'info', title: 'Medication interaction potential',
    desc: 'Elena Morales: New supplement may interact with Metformin. Review recommended before next dose.',
    time: '10:15 AM · Today', resident: 'Elena Morales', room: 12,
    assignee: 'Dr. A. Fuentes', icon: Shield,
    actions: ['Review prescription', 'Consult pharmacist'],
  },
  {
    id: 7, type: 'info', title: 'Protocol review due — Week 16',
    desc: 'Quarterly protocol compliance review scheduled. Current adherence: 91%. Target: 95%.',
    time: '11:00 AM · Today', resident: null, room: null,
    assignee: 'Dra. García', icon: Shield,
    actions: ['Generate report', 'Schedule meeting'],
  },
]

const TYPE_CONFIG = {
  critical: {
    label: 'Critical', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600',
    badgeBg: 'bg-rose-500', iconBg: 'bg-rose-100', iconColor: 'text-rose-600',
    ringColor: 'ring-rose-500/20'
  },
  warning: {
    label: 'Warning', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600',
    badgeBg: 'bg-amber-500', iconBg: 'bg-amber-100', iconColor: 'text-amber-600',
    ringColor: 'ring-amber-500/20'
  },
  info: {
    label: 'Info', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600',
    badgeBg: 'bg-blue-500', iconBg: 'bg-blue-100', iconColor: 'text-blue-600',
    ringColor: 'ring-blue-500/20'
  },
}

export default function Alerts() {
  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = ALERTS_DATA.filter(a => filter === 'all' || a.type === filter)

  const counts = {
    all: ALERTS_DATA.length,
    critical: ALERTS_DATA.filter(a => a.type === 'critical').length,
    warning: ALERTS_DATA.filter(a => a.type === 'warning').length,
    info: ALERTS_DATA.filter(a => a.type === 'info').length,
  }

  return (
    <div className="space-y-5 max-w-[1000px] mx-auto">
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { key: 'all', label: 'All Alerts', color: 'from-slate-500 to-slate-600', count: counts.all },
          { key: 'critical', label: 'Critical', color: 'from-rose-500 to-rose-600', count: counts.critical },
          { key: 'warning', label: 'Warning', color: 'from-amber-500 to-amber-600', count: counts.warning },
          { key: 'info', label: 'Info', color: 'from-blue-500 to-blue-600', count: counts.info },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`relative bg-white rounded-2xl p-4 border shadow-sm text-left transition-all hover:shadow-md
              ${filter === item.key ? 'border-indigo-300 ring-2 ring-indigo-100' : 'border-slate-200/80'}`}
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} rounded-t-2xl`} />
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">{item.label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-0.5">{item.count}</p>
          </button>
        ))}
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {filtered.map(alert => {
          const config = TYPE_CONFIG[alert.type]
          const Icon = alert.icon
          const isExpanded = expandedId === alert.id

          return (
            <div
              key={alert.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${config.border}`}
            >
              <div
                className="flex items-center gap-4 p-4 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : alert.id)}
              >
                <div className={`w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${config.iconColor}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[13px] font-semibold text-slate-800 truncate">{alert.title}</h3>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0 ${config.badgeBg}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{alert.time} · {alert.assignee}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-[11px] font-semibold hover:bg-indigo-500 transition-colors">
                    Resolve
                  </button>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {isExpanded && (
                <div className={`px-4 pb-4 pt-0 border-t ${config.border}`}>
                  <div className="pt-3">
                    <p className="text-[12px] text-slate-600 leading-relaxed">{alert.desc}</p>

                    {alert.resident && (
                      <div className="flex items-center gap-4 mt-3 text-[11px] text-slate-500">
                        {alert.resident && <span>Resident: <strong className="text-slate-700">{alert.resident}</strong></span>}
                        {alert.room && <span>Room: <strong className="text-slate-700">{alert.room}</strong></span>}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-3">
                      {alert.actions.map(action => (
                        <button
                          key={action}
                          className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium transition-all
                            ${config.bg} ${config.border} ${config.text} hover:shadow-sm`}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
