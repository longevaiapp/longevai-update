import { FileText, Download, Calendar, Filter, BarChart3, PieChart as PieChartIcon, TrendingUp, Users, Printer } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const MONTHLY_DATA = [
  { month: 'Oct', admissions: 2, discharges: 1, incidents: 3 },
  { month: 'Nov', admissions: 3, discharges: 0, incidents: 2 },
  { month: 'Dec', admissions: 1, discharges: 2, incidents: 4 },
  { month: 'Jan', admissions: 2, discharges: 1, incidents: 2 },
  { month: 'Feb', admissions: 1, discharges: 0, incidents: 1 },
  { month: 'Mar', admissions: 2, discharges: 1, incidents: 2 },
]

const REPORTS = [
  {
    id: 1, title: 'Q1 2025 Executive Summary',
    desc: 'Comprehensive quarterly report: occupancy, wellbeing metrics, financial performance, and strategic recommendations.',
    date: 'March 31, 2025', type: 'Quarterly', pages: 24, status: 'ready',
    sections: ['Executive Overview', 'KPI Analysis', 'Resident Outcomes', 'Financial Summary', 'AI Recommendations'],
  },
  {
    id: 2, title: 'Weekly Clinical Report — Week 16',
    desc: 'Clinical status of all 24 residents, alert summary, assessment completions, and protocol compliance.',
    date: 'April 1, 2025', type: 'Weekly', pages: 12, status: 'ready',
    sections: ['Alert Summary', 'Assessment Status', 'Risk Changes', 'Staff Performance'],
  },
  {
    id: 3, title: 'Resident Outcome Report — Elena Morales',
    desc: 'Individual resident trajectory analysis: clinical scores, interventions, response tracking, and care plan evaluation.',
    date: 'April 1, 2025', type: 'Individual', pages: 8, status: 'ready',
    sections: ['Clinical Timeline', 'Score Evolution', 'Intervention Log', 'Predictive Outlook'],
  },
  {
    id: 4, title: 'Protocol Compliance Audit',
    desc: 'Detailed audit of all clinical protocols: adherence rates, gaps, specialist performance, and improvement actions.',
    date: 'March 28, 2025', type: 'Audit', pages: 16, status: 'ready',
    sections: ['Compliance Summary', 'Gap Analysis', 'Specialist Metrics', 'Action Items'],
  },
  {
    id: 5, title: 'Family Communication Report',
    desc: 'Summary designed for family members: health status updates, progress highlights, and upcoming care events.',
    date: 'March 30, 2025', type: 'Family', pages: 6, status: 'draft',
    sections: ['Health Overview', 'Progress', 'Upcoming Events', 'Photos & Activities'],
  },
]

const TYPE_COLORS = {
  Quarterly: 'bg-indigo-100 text-indigo-600',
  Weekly: 'bg-teal-100 text-teal-600',
  Individual: 'bg-violet-100 text-violet-600',
  Audit: 'bg-amber-100 text-amber-600',
  Family: 'bg-pink-100 text-pink-600',
}

const REPORT_SECTIONS = [
  { title: 'Occupancy & Census', icon: Users, value: '87%', detail: 'Avg occupancy Q1 · 21/24 beds', borderColor: 'border-l-indigo-500' },
  { title: 'Clinical Outcomes', icon: TrendingUp, value: '+4pts', detail: 'Wellbeing index improvement', borderColor: 'border-l-teal-500' },
  { title: 'Protocol Adherence', icon: BarChart3, value: '91%', detail: 'Overall compliance rate', borderColor: 'border-l-amber-500' },
  { title: 'Incident Rate', icon: PieChartIcon, value: '2.3/mo', detail: 'Average this quarter', borderColor: 'border-l-rose-500' },
]

export default function Reports() {
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {REPORT_SECTIONS.map(section => {
          const Icon = section.icon
          return (
            <div key={section.title} className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm border-l-4 ${section.borderColor}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{section.title}</p>
                  <p className="text-xl font-bold text-slate-800 mt-1">{section.value}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{section.detail}</p>
                </div>
                <Icon className="w-5 h-5 text-slate-300" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Monthly Chart */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-[14px] font-semibold text-slate-800">Monthly Operations Overview</h3>
            <p className="text-[11px] text-slate-400">Admissions, discharges, and incidents · 6 months</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-medium text-slate-500 hover:bg-slate-50 transition-colors">
              <Filter className="w-3 h-3" /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-medium text-slate-500 hover:bg-slate-50 transition-colors">
              <Download className="w-3 h-3" /> Export
            </button>
          </div>
        </div>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_DATA} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Bar dataKey="admissions" fill="#6366f1" radius={[4, 4, 0, 0]} name="Admissions" />
              <Bar dataKey="discharges" fill="#0d9488" radius={[4, 4, 0, 0]} name="Discharges" />
              <Bar dataKey="incidents" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Incidents" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reports List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-bold text-slate-800">Available Reports</h2>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-[12px] font-semibold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
            <FileText className="w-4 h-4" /> Generate New Report
          </button>
        </div>

        <div className="space-y-3">
          {REPORTS.map(report => (
            <div key={report.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5.5 h-5.5 text-slate-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[14px] font-semibold text-slate-800 truncate">{report.title}</h3>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${TYPE_COLORS[report.type]}`}>
                      {report.type}
                    </span>
                    {report.status === 'draft' && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Draft</span>
                    )}
                  </div>
                  <p className="text-[12px] text-slate-500 mb-3">{report.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {report.sections.map(section => (
                      <span key={section} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        {section}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {report.date}</span>
                    <span>{report.pages} pages</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors" title="Print">
                    <Printer className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm" title="Download">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
