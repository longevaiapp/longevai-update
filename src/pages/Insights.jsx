import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, Brain, Target, Lightbulb, ArrowRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'

const TREND_DATA = [
  { month: 'Oct', wellbeing: 68, adherence: 74, falls: 3 },
  { month: 'Nov', wellbeing: 70, adherence: 76, falls: 2 },
  { month: 'Dec', wellbeing: 69, adherence: 73, falls: 4 },
  { month: 'Jan', wellbeing: 72, adherence: 78, falls: 2 },
  { month: 'Feb', wellbeing: 74, adherence: 80, falls: 1 },
  { month: 'Mar', wellbeing: 76, adherence: 82, falls: 2 },
]

const DIMENSION_DATA = [
  { dimension: 'Physical', score: 72 },
  { dimension: 'Psychological', score: 65 },
  { dimension: 'Social', score: 58 },
  { dimension: 'Environmental', score: 80 },
  { dimension: 'Functional', score: 70 },
  { dimension: 'Nutritional', score: 68 },
]

const ADHERENCE_DATA = [
  { name: 'Medication', value: 94, color: 'bg-indigo-500' },
  { name: 'Dietary', value: 78, color: 'bg-amber-500' },
  { name: 'Exercise', value: 72, color: 'bg-teal-500' },
  { name: 'Social Activities', value: 65, color: 'bg-violet-500' },
  { name: 'Sleep Hygiene', value: 84, color: 'bg-blue-500' },
]

const AI_INSIGHTS = [
  {
    icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50',
    title: 'Positive trend in functional independence',
    text: 'Average Barthel index improved +8pts over last quarter. Fall Prevention Protocol shows strong correlation with improved mobility scores (r=0.82).',
    source: 'Analyzed from 24 resident records · 16 weeks',
  },
  {
    icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50',
    title: 'Social isolation pattern detected',
    text: 'WHOQOL social sub-domain declining in 5 residents (avg -12pts). Common factors: recent family visits decreased, reduced group activity participation.',
    source: 'Pattern detected across Psychology + Activities data',
  },
  {
    icon: TrendingDown, color: 'text-rose-600', bg: 'bg-rose-50',
    title: 'Nutritional adherence declining in specific cohort',
    text: '6 residents below 70% dietary adherence. AI correlation suggests menu fatigue — same rotation for 8 weeks. Recommend variety introduction.',
    source: 'Kitchen logs + Nutrition assessments · 8 weeks',
  },
  {
    icon: Lightbulb, color: 'text-indigo-600', bg: 'bg-indigo-50',
    title: 'Optimal staffing pattern identified',
    text: 'Alert response time is 40% faster when both nurse + specialist are on simultaneous shift (mornings). Consider adjusting Wednesday coverage.',
    source: 'Operations data · 12 weeks analysis',
  },
]

const PREDICTIONS = [
  { label: 'Elena M. glucose stabilization', confidence: 72, risk: 'If intervention starts this week, 72% probability of stabilization within 14 days', color: 'from-amber-500 to-orange-500' },
  { label: 'General wellbeing trajectory', confidence: 88, risk: 'Current trajectory projects 78/100 index by end of Q2 (maintaining current protocols)', color: 'from-green-500 to-teal-500' },
  { label: 'Fall incident prediction', confidence: 65, risk: '2 moderate-risk events predicted in next 30 days without protocol adjustment', color: 'from-rose-500 to-pink-500' },
]

export default function Insights() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">AI-Powered Clinical Insights</h2>
          <p className="text-[12px] text-slate-400">Pattern detection, predictions, and actionable intelligence</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <h3 className="text-[14px] font-semibold text-slate-800 mb-1">6-Month Trend Analysis</h3>
          <p className="text-[11px] text-slate-400 mb-4">Wellbeing index and adherence tracking</p>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Line type="monotone" dataKey="wellbeing" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366f1' }} name="Wellbeing" />
                <Line type="monotone" dataKey="adherence" stroke="#0d9488" strokeWidth={2.5} dot={{ r: 4, fill: '#0d9488' }} name="Adherence" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar - Wellness Dimensions */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <h3 className="text-[14px] font-semibold text-slate-800 mb-1">Wellness Dimensions</h3>
          <p className="text-[11px] text-slate-400 mb-4">Cohort average across 6 domains</p>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={DIMENSION_DATA} outerRadius="75%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10, fill: '#64748b' }} />
                <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Adherence Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <h3 className="text-[14px] font-semibold text-slate-800 mb-1">Protocol Adherence Breakdown</h3>
        <p className="text-[11px] text-slate-400 mb-5">Average compliance across all residents</p>
        <div className="space-y-4">
          {ADHERENCE_DATA.map(item => (
            <div key={item.name} className="flex items-center gap-4">
              <span className="text-[12px] text-slate-600 w-32 flex-shrink-0">{item.name}</span>
              <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{ width: `${item.value}%` }} />
              </div>
              <span className={`text-[13px] font-bold w-12 text-right ${item.value >= 85 ? 'text-green-600' : item.value >= 70 ? 'text-amber-600' : 'text-rose-600'}`}>
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Cards */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <h2 className="text-[16px] font-bold text-slate-800">Detected Patterns & Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_INSIGHTS.map((insight, i) => {
            const Icon = insight.icon
            return (
              <div key={i} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-all">
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl ${insight.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${insight.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[13px] font-semibold text-slate-800 mb-1">{insight.title}</h4>
                    <p className="text-[12px] text-slate-500 leading-relaxed">{insight.text}</p>
                    <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                      <Target className="w-3 h-3" /> {insight.source}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Predictive Analytics */}
      <div>
        <h2 className="text-[16px] font-bold text-slate-800 mb-4">Predictive Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PREDICTIONS.map((pred, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[12px] font-semibold text-slate-800">{pred.label}</h4>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-800">{pred.confidence}</span>
                <span className="text-[12px] text-slate-400 pb-1">% confidence</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                <div className={`h-full rounded-full bg-gradient-to-r ${pred.color}`} style={{ width: `${pred.confidence}%` }} />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{pred.risk}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
