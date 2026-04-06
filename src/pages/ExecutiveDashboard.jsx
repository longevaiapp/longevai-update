import { TrendingUp, TrendingDown, Minus, Users, Activity, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const KPI_DATA = [
  { label: 'Occupancy', value: '87%', delta: '+3.2%', trend: 'up', icon: Users, color: 'from-indigo-500 to-indigo-600' },
  { label: 'Wellbeing Index', value: '76/100', delta: '+4 pts', trend: 'up', icon: Activity, color: 'from-teal-500 to-teal-600' },
  { label: 'Active Alerts', value: '7', delta: '2 critical', trend: 'down', icon: AlertTriangle, color: 'from-rose-500 to-rose-600' },
  { label: 'Protocol Adherence', value: '91%', delta: '+2.1%', trend: 'up', icon: ShieldCheck, color: 'from-amber-500 to-amber-600' },
]

const WELLBEING_DATA = [
  { week: 'W1', value: 68 }, { week: 'W2', value: 70 }, { week: 'W3', value: 69 },
  { week: 'W4', value: 71 }, { week: 'W5', value: 72 }, { week: 'W6', value: 71 },
  { week: 'W7', value: 73 }, { week: 'W8', value: 72 }, { week: 'W9', value: 74 },
  { week: 'W10', value: 73 }, { week: 'W11', value: 75 }, { week: 'W12', value: 74 },
  { week: 'W13', value: 75 }, { week: 'W14', value: 74 }, { week: 'W15', value: 76 },
  { week: 'W16', value: 76 },
]

const RISK_DATA = [
  { name: 'Stable', value: 14, color: '#22c55e' },
  { name: 'Monitor', value: 7, color: '#f59e0b' },
  { name: 'Critical', value: 3, color: '#ef4444' },
]

const COMPONENT_SCORES = [
  { name: 'Barthel', value: '72/100', delta: '+8pts', up: true, color: 'border-l-indigo-500' },
  { name: 'GDS Risk', value: '8/15', delta: '-3pts', up: false, color: 'border-l-amber-500' },
  { name: 'WHOQOL', value: '61/100', delta: 'stable', up: null, color: 'border-l-slate-400' },
  { name: 'Meal Adh.', value: '82%', delta: '+4pts', up: true, color: 'border-l-violet-500' },
  { name: 'Activity', value: '78%', delta: '+2pts', up: true, color: 'border-l-rose-500' },
]

const SATISFACTION = [
  { label: 'Family Satisfaction', value: 4.4, max: 5, pct: 88, delta: '↑ 0.2 pts', color: 'bg-indigo-500' },
  { label: 'Resident Wellbeing', value: 3.9, max: 5, pct: 78, delta: '↑ 0.1 pts', color: 'bg-teal-500' },
  { label: 'Staff Climate', value: 3.7, max: 5, pct: 74, delta: '= unchanged', color: 'bg-slate-400' },
]

const STAFF = [
  { initials: 'DG', name: 'Dr. M. García', role: 'Gerontologist · 6 residents', status: 'Available', statusColor: 'bg-green-100 text-green-700', tasks: '5/6', gradient: 'from-green-500 to-emerald-600' },
  { initials: 'RV', name: 'Dr. R. Vargas', role: 'Psychologist · 5 residents', status: 'In session', statusColor: 'bg-amber-100 text-amber-700', tasks: '3/5', gradient: 'from-blue-500 to-blue-600' },
  { initials: 'LC', name: 'Lic. L. Castillo', role: 'Nutritionist · 8 residents', status: 'Available', statusColor: 'bg-green-100 text-green-700', tasks: '4/7', gradient: 'from-violet-500 to-purple-600' },
  { initials: 'PT', name: 'Lic. P. Torres', role: 'Physiotherapist · 8 residents', status: 'On visit', statusColor: 'bg-amber-100 text-amber-700', tasks: '2/6', gradient: 'from-orange-500 to-amber-600' },
  { initials: 'AM', name: 'Enf. A. Méndez', role: 'Head Nurse · 24 residents', status: 'Available', statusColor: 'bg-green-100 text-green-700', tasks: '8/10', gradient: 'from-pink-500 to-rose-600' },
  { initials: 'JR', name: 'Chef J. Ríos', role: 'Head Chef · Kitchen', status: 'Cooking', statusColor: 'bg-amber-100 text-amber-700', tasks: '3/5', gradient: 'from-yellow-500 to-orange-500' },
]

const TIMELINE = [
  { time: '8:45 AM', title: 'Glucose alert — Elena Morales', desc: 'Fasting glucose 142 mg/dL — above threshold', type: 'critical' },
  { time: '9:10 AM', title: 'TUG assessment overdue', desc: 'Jorge Hernández — 9 days pending', type: 'warning' },
  { time: '9:30 AM', title: 'Meal plan approved', desc: 'Lic. Castillo validated 3 special diets', type: 'success' },
  { time: '10:00 AM', title: 'Interdisciplinary briefing', desc: 'All specialists aligned for week 16', type: 'info' },
  { time: '10:30 AM', title: 'WHOQOL assessment complete', desc: 'Rosa Jiménez — social domain flagged', type: 'warning' },
]

const TIMELINE_COLORS = {
  critical: 'bg-rose-500 border-rose-500',
  warning: 'bg-amber-500 border-amber-500',
  success: 'bg-green-500 border-green-500',
  info: 'bg-blue-500 border-blue-500',
}

export default function ExecutiveDashboard({ onOpenCopilot }) {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI_DATA.map(kpi => {
          const Icon = kpi.icon
          return (
            <div key={kpi.label} className="relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${kpi.color}`} />
              <div className="absolute top-4 right-4 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity">
                <Icon className="w-12 h-12" />
              </div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{kpi.label}</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{kpi.value}</p>
              <div className={`inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                kpi.trend === 'up' ? 'bg-indigo-50 text-indigo-600' : kpi.trend === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : kpi.trend === 'down' ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                {kpi.delta}
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Wellbeing Chart */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-semibold text-slate-800">Wellbeing Index — 16 Weeks</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Barthel · GDS · WHOQOL · Adherence · Activity</p>
            </div>
            <div className="flex bg-slate-100 rounded-lg p-0.5">
              <button className="px-3 py-1.5 text-[11px] font-medium bg-white rounded-md shadow-sm text-slate-700">Cycle</button>
              <button className="px-3 py-1.5 text-[11px] font-medium text-slate-400 hover:text-slate-600">Monthly</button>
            </div>
          </div>

          {/* Component Scores */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {COMPONENT_SCORES.map(score => (
              <div key={score.name} className={`bg-slate-50 rounded-lg p-3 border-l-[3px] ${score.color}`}>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{score.name}</p>
                <p className="text-[16px] font-bold text-slate-800 mt-1">{score.value}</p>
                <span className={`inline-block text-[9px] font-semibold mt-1 px-1.5 py-0.5 rounded-full ${
                  score.up === true ? 'bg-indigo-100 text-indigo-600' : score.up === false ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {score.delta}
                </span>
              </div>
            ))}
          </div>

          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WELLBEING_DATA}>
                <defs>
                  <linearGradient id="wellbeingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 85]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(v) => [v, 'Index']}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fill="url(#wellbeingGradient)" dot={false} activeDot={{ r: 5, fill: '#6366f1' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <h3 className="text-[14px] font-semibold text-slate-800">Risk Distribution</h3>
          <p className="text-[11px] text-slate-400">24 active residents</p>

          <div className="flex items-center gap-6 mt-4">
            <div className="w-[140px] h-[140px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={RISK_DATA} innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                    {RISK_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {RISK_DATA.map(r => (
                <div key={r.name} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: r.color }} />
                  <span className="text-[12px] text-slate-500 flex-1">{r.name}</span>
                  <span className="text-[14px] font-bold text-slate-800">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Week-over-Week</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-[11px] font-semibold">↑ 2 worsened</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[11px] font-semibold">↓ 1 improved</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[11px] font-semibold">= 21 stable</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights + Satisfaction */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* AI Insights */}
        <div className="lg:col-span-3 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/4" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400">AI Insights — Morning Synthesis</span>
            </div>
            <p className="text-[13px] leading-relaxed text-white/85">
              <strong className="text-white">3 residents require priority attention this week.</strong>{' '}
              Elena Morales (Rm. 12) shows low dietary adherence correlated with GDS deterioration.
              Jorge Hernández (Rm. 5) has a pending functional assessment for 9 days.
              Rosa Jiménez (Rm. 8) shows a drop in WHOQOL social domain.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['View at-risk residents', 'Intervention plan', 'General summary'].map(label => (
                <button
                  key={label}
                  onClick={onOpenCopilot}
                  className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.07] text-[11px] text-white/70
                    hover:bg-white/[0.15] hover:text-white hover:border-white/30 transition-all"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="border-t border-white/10 mt-5 pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400 mb-2">Detected Opportunities</p>
              <div className="space-y-1.5 text-[12px] text-white/70">
                <p>• Occupancy: 3 beds available — potential +$45,000 MXN/month</p>
                <p>• Nutritional adherence: 6 residents below 70% — menu adjustment recommended</p>
              </div>
            </div>
          </div>
        </div>

        {/* Satisfaction */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <h3 className="text-[14px] font-semibold text-slate-800">Satisfaction Scores</h3>
          <p className="text-[11px] text-slate-400 mb-5">Per cycle survey · Q1 2025</p>

          <div className="space-y-5">
            {SATISFACTION.map(s => (
              <div key={s.label}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[12px] font-semibold text-slate-700">{s.label}</span>
                  <span className="text-xl font-bold text-slate-800">{s.value}<span className="text-sm text-slate-400">/{s.max}</span></span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color} transition-all duration-1000`} style={{ width: `${s.pct}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{s.delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-indigo-50 rounded-xl p-3 flex items-center justify-between">
            <span className="text-[12px] font-semibold text-slate-700">Overall: 4.0 / 5.0 · Target ≥ 4.2</span>
            <span className="text-[11px] font-semibold text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full">= 4.0</span>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staff */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold text-slate-800">Staff on Duty</h3>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">8 active</span>
            </div>
          </div>
          <div className="space-y-1 max-h-[360px] overflow-y-auto">
            {STAFF.map(s => (
              <div key={s.initials} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${s.gradient} flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0`}>
                  {s.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-slate-700 truncate">{s.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{s.role}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.statusColor}`}>{s.status}</span>
                  <p className="text-[9px] text-slate-400 mt-0.5">{s.tasks} tasks</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <h3 className="text-[14px] font-semibold text-slate-800 mb-4">Activity Timeline</h3>
          <div className="space-y-0 max-h-[360px] overflow-y-auto">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-3 group">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${TIMELINE_COLORS[item.type].split(' ')[0]}`} />
                  {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-slate-200 my-1" />}
                </div>
                <div className="pb-5 flex-1">
                  <p className="text-[10px] text-slate-400">{item.time}</p>
                  <p className="text-[12px] font-medium text-slate-700 mt-0.5">{item.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <h3 className="text-[14px] font-semibold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'New Assessment', icon: '📋', color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200' },
              { label: 'Schedule Visit', icon: '📅', color: 'bg-teal-50 hover:bg-teal-100 border-teal-200' },
              { label: 'Report Alert', icon: '🚨', color: 'bg-rose-50 hover:bg-rose-100 border-rose-200' },
              { label: 'Request Lab', icon: '🔬', color: 'bg-amber-50 hover:bg-amber-100 border-amber-200' },
              { label: 'Team Message', icon: '💬', color: 'bg-blue-50 hover:bg-blue-100 border-blue-200' },
              { label: 'AI Analysis', icon: '🤖', color: 'bg-violet-50 hover:bg-violet-100 border-violet-200' },
            ].map(action => (
              <button key={action.label} className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${action.color} transition-all cursor-pointer`}>
                <span className="text-2xl">{action.icon}</span>
                <span className="text-[11px] font-medium text-slate-600">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
