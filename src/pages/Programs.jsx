import { BookOpen, CheckCircle2, Clock, Users, ArrowRight, Sparkles } from 'lucide-react'

const PROGRAMS = [
  {
    id: 1, name: 'Cognitive Stimulation Program',
    desc: 'Structured cognitive exercises, memory workshops, and social engagement activities for mild cognitive decline residents.',
    enrolled: 8, total: 12, phase: 3, totalPhases: 4,
    phases: ['Assessment', 'Foundation', 'Intensive', 'Maintenance'],
    status: 'active', color: 'from-indigo-500 to-violet-600',
    nextMilestone: 'Phase 4 transition — April 15',
    specialist: 'Dr. R. Vargas',
  },
  {
    id: 2, name: 'Fall Prevention Protocol',
    desc: 'Balance training, environmental safety audits, and physiotherapy sessions targeting high-risk fall residents.',
    enrolled: 14, total: 24, phase: 2, totalPhases: 3,
    phases: ['Risk Assessment', 'Active Training', 'Monitoring'],
    status: 'active', color: 'from-teal-500 to-emerald-600',
    nextMilestone: 'Monthly evaluation — April 8',
    specialist: 'Lic. P. Torres',
  },
  {
    id: 3, name: 'Nutritional Recovery Plan',
    desc: 'Personalized dietary plans focusing on protein intake, micro-nutrient supplementation, and meal adherence tracking.',
    enrolled: 6, total: 6, phase: 1, totalPhases: 4,
    phases: ['Baseline', 'Diet Adjust', 'Supplement', 'Sustain'],
    status: 'active', color: 'from-amber-500 to-orange-600',
    nextMilestone: 'Week 2 adherence review — April 5',
    specialist: 'Lic. L. Castillo',
  },
  {
    id: 4, name: 'Depression Intervention (GDS)',
    desc: 'Individual and group psychotherapy, activity scheduling, and medication management for residents with GDS ≥ 8.',
    enrolled: 5, total: 5, phase: 2, totalPhases: 3,
    phases: ['Screening', 'Intervention', 'Follow-up'],
    status: 'active', color: 'from-blue-500 to-indigo-600',
    nextMilestone: 'Group session — April 3',
    specialist: 'Dr. R. Vargas',
  },
  {
    id: 5, name: 'Diabetes Management Program',
    desc: 'Comprehensive glucose monitoring, medication titration, and lifestyle modification for T2DM residents.',
    enrolled: 4, total: 4, phase: 4, totalPhases: 4,
    phases: ['Baseline', 'Titration', 'Stabilize', 'Maintain'],
    status: 'completed', color: 'from-green-500 to-teal-600',
    nextMilestone: 'Program completed — review due',
    specialist: 'Dr. A. Fuentes',
  },
]

export default function Programs() {
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active Programs', value: '4', icon: BookOpen, color: 'from-indigo-500 to-indigo-600' },
          { label: 'Enrolled Residents', value: '33', icon: Users, color: 'from-teal-500 to-teal-600' },
          { label: 'On Track', value: '87%', icon: CheckCircle2, color: 'from-green-500 to-green-600' },
          { label: 'Next Review', value: 'Apr 5', icon: Clock, color: 'from-amber-500 to-amber-600' },
        ].map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Programs List */}
      <div className="space-y-4">
        {PROGRAMS.map(program => {
          const progressPct = Math.round((program.phase / program.totalPhases) * 100)
          const isCompleted = program.status === 'completed'

          return (
            <div key={program.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 hover:shadow-md transition-all">
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                  <BookOpen className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-[15px] font-bold text-slate-800">{program.name}</h3>
                    {isCompleted ? (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-green-100 text-green-600">Completed</span>
                    ) : (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600">Active</span>
                    )}
                  </div>
                  <p className="text-[12px] text-slate-500 leading-relaxed mb-4">{program.desc}</p>

                  {/* Phase Progress */}
                  <div className="flex gap-0 rounded-lg overflow-hidden mb-3">
                    {program.phases.map((phase, i) => {
                      const isCurrent = i + 1 === program.phase
                      const isDone = i + 1 < program.phase
                      const isComplete = i + 1 <= program.phase && isCompleted

                      return (
                        <div
                          key={phase}
                          className={`flex-1 py-2.5 px-3 text-center text-[10px] font-semibold border-r border-white/50 last:border-r-0 transition-all
                            ${isDone || isComplete
                              ? 'bg-indigo-100 text-indigo-600'
                              : isCurrent
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                        >
                          {phase}
                        </div>
                      )
                    })}
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-6 text-[11px]">
                    <span className="text-slate-500">
                      <strong className="text-slate-700">{program.enrolled}</strong>/{program.total} enrolled
                    </span>
                    <span className="text-slate-500">
                      Specialist: <strong className="text-slate-700">{program.specialist}</strong>
                    </span>
                    <span className="text-slate-500">
                      Progress: <strong className="text-slate-700">{progressPct}%</strong>
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {program.nextMilestone}
                    </span>
                  </div>
                </div>

                <button className="px-3 py-2 rounded-xl border border-slate-200 text-[11px] font-semibold text-slate-500 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center gap-1 flex-shrink-0">
                  View Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Suggestion */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        <div className="relative flex items-start gap-4">
          <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400 mb-1">AI Recommendation</p>
            <p className="text-[13px] text-white/85 leading-relaxed">
              Based on current data, <strong className="text-white">3 additional residents</strong> (Teresa F., Josefina R., Manuel H.) 
              would benefit from enrollment in the Cognitive Stimulation Program. Their WHOQOL cognitive sub-scores have 
              declined 8-12% over the last cycle, matching the program's inclusion criteria.
            </p>
            <button className="mt-3 px-4 py-2 rounded-xl border border-white/20 bg-white/[0.07] text-[11px] font-semibold text-white/80 hover:bg-white/[0.15] transition-all">
              Review candidates →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
