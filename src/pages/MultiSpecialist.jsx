import { Sparkles, Brain, Stethoscope, Pill, Apple, Dumbbell } from 'lucide-react'

const SPECIALISTS = [
  { name: 'Dr. M. García', role: 'Gerontologist', initials: 'DG', gradient: 'from-green-500 to-emerald-600', patients: 6, compliance: 94, nextAction: 'Cycle review — Elena M. (S16 prep)', icon: Stethoscope },
  { name: 'Dr. R. Vargas', role: 'Psychologist', initials: 'RV', gradient: 'from-blue-500 to-blue-600', patients: 5, compliance: 88, nextAction: 'GDS follow-up — Rosa J.', icon: Brain },
  { name: 'Lic. L. Castillo', role: 'Nutritionist', initials: 'LC', gradient: 'from-violet-500 to-purple-600', patients: 8, compliance: 82, nextAction: 'Menu redesign — Elena M.', icon: Apple },
  { name: 'Lic. P. Torres', role: 'Physiotherapist', initials: 'PT', gradient: 'from-orange-500 to-amber-600', patients: 8, compliance: 76, nextAction: 'TUG session — Elena M. (overdue!)', icon: Dumbbell },
  { name: 'Dr. A. Fuentes', role: 'Family Medicine', initials: 'AF', gradient: 'from-teal-500 to-cyan-600', patients: 12, compliance: 91, nextAction: 'Metformin review — Elena M.', icon: Pill },
]

const AI_RECOMMENDATIONS = [
  {
    title: 'Cross-specialist intervention needed',
    desc: 'Elena Morales shows correlated decline in GDS + dietary adherence + functional mobility. Recommend joint session: Psychology + Nutrition + Physiotherapy within 48 hours.',
    priority: 'high',
    specialists: ['RV', 'LC', 'PT'],
  },
  {
    title: 'Group therapy opportunity detected',
    desc: 'Rosa Jiménez, Teresa Flores, and Josefina Ruiz share similar WHOQOL social domain decline. Group intervention could optimize Dr. Vargas capacity.',
    priority: 'medium',
    specialists: ['RV'],
  },
  {
    title: 'Protocol adherence gap — Physiotherapy',
    desc: 'Current TUG assessment completion rate: 76%. 3 assessments overdue (>7 days). Suggest redistributing 2 patients to Dr. Reyes visit schedule.',
    priority: 'medium',
    specialists: ['PT'],
  },
  {
    title: 'Medication interaction alert',
    desc: 'Elena Morales: Metformin + new supplement interaction potential detected. Dr. Fuentes should review before next dose adjustment.',
    priority: 'high',
    specialists: ['AF'],
  },
]

const PRIORITY_CONFIG = {
  high: { label: 'High Priority', bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', dot: 'bg-rose-500' },
  medium: { label: 'Medium', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', dot: 'bg-amber-500' },
  low: { label: 'Low', bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', dot: 'bg-green-500' },
}

export default function MultiSpecialist() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Specialist Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-1">Active Specialists</h2>
        <p className="text-[12px] text-slate-400 mb-4">Interdisciplinary team performance and coordination</p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {SPECIALISTS.map(spec => {
            const Icon = spec.icon
            return (
              <div key={spec.name} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${spec.gradient} flex items-center justify-center text-[14px] font-bold text-white shadow-md`}>
                    {spec.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[13px] font-semibold text-slate-800">{spec.name}</h3>
                    <p className="text-[11px] text-slate-400">{spec.role}</p>
                  </div>
                  <Icon className="w-5 h-5 text-slate-300" />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Patients</p>
                    <p className="text-xl font-bold text-slate-800 mt-0.5">{spec.patients}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Compliance</p>
                    <p className={`text-xl font-bold mt-0.5 ${spec.compliance >= 90 ? 'text-green-600' : spec.compliance >= 80 ? 'text-amber-600' : 'text-rose-600'}`}>
                      {spec.compliance}%
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-1">Next Action</p>
                  <p className="text-[12px] text-slate-600">{spec.nextAction}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* AI Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold text-slate-800">AI Coordination Recommendations</h2>
        </div>

        <div className="space-y-3">
          {AI_RECOMMENDATIONS.map((rec, i) => {
            const priority = PRIORITY_CONFIG[rec.priority]
            return (
              <div key={i} className={`bg-white rounded-2xl border shadow-sm p-5 ${priority.border} hover:shadow-md transition-all`}>
                <div className="flex items-start gap-4">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${priority.dot} flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[13px] font-semibold text-slate-800">{rec.title}</h3>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${priority.bg} ${priority.text}`}>
                        {priority.label}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-500 leading-relaxed">{rec.desc}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[10px] text-slate-400 mr-1">Involves:</span>
                      {rec.specialists.map(s => {
                        const spec = SPECIALISTS.find(sp => sp.initials === s)
                        return spec ? (
                          <div key={s} className={`w-7 h-7 rounded-full bg-gradient-to-br ${spec.gradient} flex items-center justify-center text-[9px] font-bold text-white`}>
                            {s}
                          </div>
                        ) : null
                      })}
                      <button className="ml-auto text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 px-3 py-1 rounded-lg hover:bg-indigo-50 transition-colors">
                        Take Action →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
