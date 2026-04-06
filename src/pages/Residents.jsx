import { useState } from 'react'
import { Search, Filter, ChevronRight, MapPin, Calendar, Heart, AlertTriangle } from 'lucide-react'

const RESIDENTS = [
  { id: 1, name: 'Elena Morales', room: 12, age: 78, risk: 'critical', barthel: 65, gds: 10, whoqol: 58, adherence: 62, photo: 'EM', gradient: 'from-rose-400 to-pink-500', conditions: ['Diabetes T2', 'Depression', 'Hypertension'], lastVisit: '2 hours ago' },
  { id: 2, name: 'Jorge Hernández', room: 5, age: 82, risk: 'monitor', barthel: 70, gds: 7, whoqol: 65, adherence: 75, photo: 'JH', gradient: 'from-amber-400 to-orange-500', conditions: ['Arthritis', 'COPD'], lastVisit: '1 day ago' },
  { id: 3, name: 'Rosa Jiménez', room: 8, age: 75, risk: 'monitor', barthel: 80, gds: 9, whoqol: 52, adherence: 85, photo: 'RJ', gradient: 'from-purple-400 to-violet-500', conditions: ['Mild cognitive decline', 'Anxiety'], lastVisit: '3 hours ago' },
  { id: 4, name: 'Carlos Medina', room: 3, age: 81, risk: 'stable', barthel: 85, gds: 4, whoqol: 72, adherence: 90, photo: 'CM', gradient: 'from-blue-400 to-cyan-500', conditions: ['Hypertension controlled'], lastVisit: '5 hours ago' },
  { id: 5, name: 'Martha López', room: 15, age: 77, risk: 'stable', barthel: 88, gds: 3, whoqol: 78, adherence: 92, photo: 'ML', gradient: 'from-green-400 to-emerald-500', conditions: ['Osteoporosis'], lastVisit: '1 day ago' },
  { id: 6, name: 'Dolores Aguilar', room: 10, age: 84, risk: 'critical', barthel: 55, gds: 12, whoqol: 45, adherence: 58, photo: 'DA', gradient: 'from-red-400 to-rose-500', conditions: ['Parkinson', 'Depression severe'], lastVisit: '4 hours ago' },
  { id: 7, name: 'Héctor Navarro', room: 7, age: 79, risk: 'stable', barthel: 90, gds: 3, whoqol: 74, adherence: 88, photo: 'HN', gradient: 'from-teal-400 to-cyan-500', conditions: ['Diabetes T2 controlled'], lastVisit: '6 hours ago' },
  { id: 8, name: 'Enrique Salazar', room: 20, age: 85, risk: 'critical', barthel: 50, gds: 11, whoqol: 48, adherence: 55, photo: 'ES', gradient: 'from-orange-400 to-red-500', conditions: ['Dementia early', 'Falls risk'], lastVisit: '2 hours ago' },
]

const RISK_CONFIG = {
  critical: { label: 'Critical', bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', dot: 'bg-rose-500' },
  monitor: { label: 'Monitor', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', dot: 'bg-amber-500' },
  stable: { label: 'Stable', bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', dot: 'bg-green-500' },
}

function ScoreBar({ label, value, max, color }) {
  const pct = (value / max) * 100
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline">
        <span className="text-[11px] text-slate-500">{label}</span>
        <span className="text-[12px] font-bold text-slate-700">{value}<span className="text-slate-400 font-normal">/{max}</span></span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function Residents() {
  const [selected, setSelected] = useState(RESIDENTS[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')

  const filtered = RESIDENTS.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === 'all' || r.risk === riskFilter
    return matchesSearch && matchesRisk
  })

  const risk = RISK_CONFIG[selected.risk]

  return (
    <div className="flex gap-6 max-w-[1400px] mx-auto h-[calc(100vh-130px)]">
      {/* Resident List */}
      <div className="w-[340px] flex-shrink-0 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 space-y-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search residents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-[12px] text-slate-700 outline-none flex-1 placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-1.5">
            {['all', 'critical', 'monitor', 'stable'].map(f => (
              <button
                key={f}
                onClick={() => setRiskFilter(f)}
                className={`flex-1 py-1.5 text-[10px] font-semibold rounded-lg capitalize transition-all ${
                  riskFilter === f
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.map(r => {
            const riskConf = RISK_CONFIG[r.risk]
            return (
              <button
                key={r.id}
                onClick={() => setSelected(r)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  selected.id === r.id
                    ? 'bg-indigo-50 border border-indigo-200'
                    : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0`}>
                  {r.photo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-slate-700 truncate">{r.name}</p>
                  <p className="text-[10px] text-slate-400">Rm. {r.room} · {r.age} yrs</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${riskConf.bg} ${riskConf.text}`}>
                    {riskConf.label}
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Resident Detail */}
      <div className="flex-1 space-y-5 overflow-y-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <div className="flex items-start gap-5">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selected.gradient} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
              {selected.photo}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-slate-800">{selected.name}</h2>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${risk.bg} ${risk.text} border ${risk.border}`}>
                  {risk.label}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Room {selected.room}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {selected.age} years</span>
                <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> Last visit: {selected.lastVisit}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {selected.conditions.map(c => (
                  <span key={c} className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Scores */}
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
            <h3 className="text-[13px] font-semibold text-slate-800">Clinical Scores</h3>
            <ScoreBar label="Barthel Index (Functional)" value={selected.barthel} max={100} color="bg-indigo-500" />
            <ScoreBar label="GDS (Depression Risk)" value={selected.gds} max={15} color="bg-amber-500" />
            <ScoreBar label="WHOQOL (Quality of Life)" value={selected.whoqol} max={100} color="bg-teal-500" />
            <ScoreBar label="Dietary Adherence" value={selected.adherence} max={100} color="bg-violet-500" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
            <h3 className="text-[13px] font-semibold text-slate-800 mb-4">Care Team</h3>
            <div className="space-y-3">
              {[
                { name: 'Dr. M. García', role: 'Gerontologist', initials: 'DG', gradient: 'from-green-500 to-emerald-600' },
                { name: 'Dr. R. Vargas', role: 'Psychologist', initials: 'RV', gradient: 'from-blue-500 to-blue-600' },
                { name: 'Lic. L. Castillo', role: 'Nutritionist', initials: 'LC', gradient: 'from-violet-500 to-purple-600' },
                { name: 'Lic. P. Torres', role: 'Physiotherapist', initials: 'PT', gradient: 'from-orange-500 to-amber-600' },
              ].map(member => (
                <div key={member.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-[10px] font-bold text-white`}>
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-slate-700">{member.name}</p>
                    <p className="text-[10px] text-slate-400">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts for this resident */}
        {selected.risk !== 'stable' && (
          <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl border border-rose-200/80 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <h3 className="text-[13px] font-semibold text-rose-700">Active Alerts</h3>
            </div>
            <div className="space-y-2">
              <div className="bg-white/80 rounded-xl p-3 border border-rose-200/50">
                <p className="text-[12px] font-medium text-slate-700">Glucose level above threshold — 142 mg/dL</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Reported 2 hours ago · Assigned to Dr. Fuentes</p>
              </div>
              <div className="bg-white/80 rounded-xl p-3 border border-amber-200/50">
                <p className="text-[12px] font-medium text-slate-700">Dietary adherence below 70% for 5 consecutive days</p>
                <p className="text-[10px] text-slate-400 mt-0.5">AI detected · Assigned to Lic. Castillo</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
