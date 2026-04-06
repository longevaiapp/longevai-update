import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar
} from 'recharts'
import {
    Dumbbell, TrendingUp, AlertTriangle, CalendarDays, Target,
    ChevronDown, UserCheck, Clock, CheckCircle2, XCircle
} from 'lucide-react'

// ── MOCK DATA ──────────────────────────────────────────────
const RESIDENTS_LIST = [
    { id: 1, name: 'Elena Rodriguez', room: '101' },
    { id: 2, name: 'Carlos Mendez', room: '102' },
    { id: 3, name: 'Maria Silva', room: '103' },
    { id: 4, name: 'Ana Torres', room: '105' },
]

const MOBILITY_DATA = [
    { visit: 'Intake', tug: 18, sppb: 5, barthel: 60 },
    { visit: 'M1', tug: 17, sppb: 5, barthel: 62 },
    { visit: 'M2', tug: 16, sppb: 6, barthel: 65 },
    { visit: 'M3', tug: 15, sppb: 7, barthel: 68 },
    { visit: 'M4', tug: 14, sppb: 8, barthel: 72 },
]

const FALLS_LOG = [
    { date: 'Mar 22, 2026', time: '22:15', location: 'Bathroom', circumstances: 'Getting up at night, lost balance on wet floor', injury: 'None', response: 'Examined by nursing, ice applied to knee. No swelling observed.', notified: ['Family Doctor', 'Gerontologist'] },
    { date: 'Feb 3, 2026', time: '10:40', location: 'Hallway', circumstances: 'Tripped on carpet edge during walk to dining room', injury: 'Minor bruise (left hand)', response: 'Wound cleaned. No medical intervention needed.', notified: ['Family Doctor'] },
]

const EXERCISE_PLAN = [
    { exercise: 'Seated Balance Exercises', frequency: '3x/week', duration: '15 min', difficulty: 'Moderate', adherence: 85 },
    { exercise: 'Resistance Band Upper Body', frequency: '2x/week', duration: '10 min', difficulty: 'Low', adherence: 92 },
    { exercise: 'Walking Program', frequency: 'Daily', duration: '20 min', difficulty: 'Low', adherence: 78 },
    { exercise: 'Stair Practice', frequency: '2x/week', duration: '10 min', difficulty: 'High', adherence: 60 },
    { exercise: 'Ankle Circles & Foot Flex', frequency: 'Daily', duration: '5 min', difficulty: 'Low', adherence: 95 },
]

const IMPROVEMENT_TARGETS = [
    { metric: 'TUG (Timed Up & Go)', current: 14, target: 12, unit: 'seconds', baseline: 18, direction: 'lower' },
    { metric: 'SPPB Score', current: 8, target: 10, unit: '/12', baseline: 5, direction: 'higher' },
    { metric: 'Barthel Index', current: 72, target: 80, unit: '/100', baseline: 60, direction: 'higher' },
    { metric: 'Grip Strength', current: 18, target: 22, unit: 'kg', baseline: 14, direction: 'higher' },
    { metric: 'Walking Distance', current: 280, target: 350, unit: 'm', baseline: 180, direction: 'higher' },
    { metric: 'Balance Score', current: 12, target: 14, unit: '/16', baseline: 8, direction: 'higher' },
]

const ADHERENCE_BY_WEEK = [
    { week: 'W1-2', adherence: 65 },
    { week: 'W3-4', adherence: 72 },
    { week: 'W5-6', adherence: 78 },
    { week: 'W7-8', adherence: 80 },
    { week: 'W9-10', adherence: 82 },
    { week: 'W11-12', adherence: 85 },
]

export default function PhysiotherapistDashboard() {
    const [selectedResident, setSelectedResident] = useState(RESIDENTS_LIST[0])

    const fallsPerMonth = (FALLS_LOG.length / 4).toFixed(1)

    return (
        <DashboardShell
            roleId="physiotherapist"
            roleTag="Physiotherapist -- Monthly Visit"
            title="Functional Progress & Mobility Panel"
            tagline="Movement is dignity. Measurable story of residents regaining or preserving physical independence."
            badges={['Updated: Monthly', 'Module 3']}
        >
            {/* Resident Selector */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center gap-4">
                <UserCheck className="w-5 h-5 text-brand-accent" />
                <span className="text-sm font-semibold text-brand-dark">Resident:</span>
                <div className="relative">
                    <select
                        value={selectedResident.id}
                        onChange={e => setSelectedResident(RESIDENTS_LIST.find(r => r.id === Number(e.target.value)))}
                        className="appearance-none bg-brand-light border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
                    >
                        {RESIDENTS_LIST.map(r => (
                            <option key={r.id} value={r.id}>{r.name} (Rm {r.room})</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
                </div>
                <div className="flex items-center gap-2 ml-auto text-xs text-brand-muted">
                    <span>Falls/month: <strong className={`${Number(fallsPerMonth) > 1 ? 'text-red-600' : 'text-emerald-600'}`}>{fallsPerMonth}</strong></span>
                </div>
            </div>

            {/* Mobility Score Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <SectionCard title="Mobility Score Timeline" icon={TrendingUp}>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={MOBILITY_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="visit" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                                <Line type="monotone" dataKey="tug" stroke="#4A7FA8" strokeWidth={2} name="TUG (s)" dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="sppb" stroke="#4C4673" strokeWidth={2} name="SPPB (/12)" dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="barthel" stroke="#6D8C8C" strokeWidth={2} name="Barthel (/100)" dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex gap-3 mt-2 text-[10px] text-brand-muted">
                        <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 rounded">TUG: lower is better</span>
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded">SPPB: target 10+</span>
                    </div>
                </SectionCard>

                {/* Routine Adherence Chart */}
                <SectionCard title="Therapeutic Routine Adherence" icon={Dumbbell}>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ADHERENCE_BY_WEEK} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" domain={[0, 100]} />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`${v}%`, 'Adherence']} />
                                <Bar dataKey="adherence" fill="#4C4673" radius={[6, 6, 0, 0]} name="Adherence %" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-[11px] text-brand-muted mt-2">Adherence measured by nursing confirmation of assigned exercises between visits.</p>
                </SectionCard>
            </div>

            {/* Improvement Indicator Panel */}
            <SectionCard title="Improvement Indicator Panel" icon={Target}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {IMPROVEMENT_TARGETS.map((t, i) => {
                        const progress = t.direction === 'lower'
                            ? ((t.baseline - t.current) / (t.baseline - t.target)) * 100
                            : ((t.current - t.baseline) / (t.target - t.baseline)) * 100
                        const pct = Math.min(Math.max(progress, 0), 100)
                        const onTrack = pct >= 70

                        return (
                            <div key={i} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-semibold text-brand-dark">{t.metric}</span>
                                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${onTrack ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {onTrack ? 'On Track' : 'Behind'}
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-xl font-bold text-brand-dark">{t.current}</span>
                                    <span className="text-xs text-brand-muted">{t.unit}</span>
                                    <span className="text-[10px] text-brand-muted ml-auto">Target: {t.target}{t.unit}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all ${onTrack ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                <div className="flex justify-between mt-1 text-[10px] text-brand-muted">
                                    <span>Baseline: {t.baseline}</span>
                                    <span>{Math.round(pct)}% to goal</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </SectionCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Therapeutic Routine Manager */}
                <SectionCard title="Therapeutic Routine Manager" icon={CalendarDays}>
                    <div className="space-y-2">
                        {EXERCISE_PLAN.map((ex, i) => (
                            <div key={i} className="p-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-brand-dark">{ex.exercise}</span>
                                        <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${ex.difficulty === 'High' ? 'bg-red-100 text-red-700' :
                                                ex.difficulty === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-emerald-100 text-emerald-700'
                                            }`}>{ex.difficulty}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 text-[11px] text-brand-muted">
                                        <span>{ex.frequency}</span>
                                        <span>{ex.duration}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className={`text-sm font-bold ${ex.adherence >= 80 ? 'text-emerald-600' : ex.adherence >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                                        {ex.adherence}%
                                    </span>
                                    <span className="text-[10px] text-brand-muted">adherence</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-3">
                        <button className="text-xs font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors">
                            Update Routine
                        </button>
                    </div>
                </SectionCard>

                {/* Falls Incident Log */}
                <SectionCard title="Falls Incident Log" icon={AlertTriangle}>
                    {FALLS_LOG.length === 0 ? (
                        <div className="text-center py-6">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                            <p className="text-sm text-brand-muted">No falls recorded</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {FALLS_LOG.map((fall, i) => (
                                <div key={i} className={`p-4 rounded-xl border ${fall.injury !== 'None' ? 'border-amber-200 bg-amber-50/50' : 'border-gray-200 bg-gray-50'
                                    }`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className={`w-4 h-4 ${fall.injury !== 'None' ? 'text-amber-500' : 'text-gray-400'}`} />
                                            <span className="text-sm font-semibold text-brand-dark">{fall.date}</span>
                                            <span className="text-[11px] text-brand-muted">at {fall.time}</span>
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${fall.injury === 'None' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                            }`}>{fall.injury === 'None' ? 'No Injury' : fall.injury}</span>
                                    </div>
                                    <p className="text-xs text-brand-muted mb-1"><strong>Location:</strong> {fall.location}</p>
                                    <p className="text-xs text-brand-muted mb-1"><strong>Circumstances:</strong> {fall.circumstances}</p>
                                    <p className="text-xs text-brand-dark"><strong>Response:</strong> {fall.response}</p>
                                    <div className="flex items-center gap-1 mt-2 text-[10px] text-brand-muted">
                                        <span>Notified:</span>
                                        {fall.notified.map((n, j) => (
                                            <span key={j} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">{n}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="p-3 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-center">
                                <p className="text-xs text-brand-primary font-medium">
                                    Total Falls (cycle): {FALLS_LOG.length} | Falls/Month: {fallsPerMonth}
                                </p>
                            </div>
                        </div>
                    )}
                </SectionCard>
            </div>
        </DashboardShell>
    )
}

function SectionCard({ title, icon: Icon, children }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                <Icon className="w-5 h-5 text-brand-accent" />
                <h3 className="text-sm font-semibold text-brand-dark">{title}</h3>
            </div>
            <div className="p-5">{children}</div>
        </div>
    )
}
