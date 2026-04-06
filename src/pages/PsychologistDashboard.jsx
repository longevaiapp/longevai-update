import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
    Brain, TrendingDown, Flower2, ShieldCheck, BookOpen, Flame, Calendar,
    ChevronDown, UserCheck, Circle, Clock, AlertTriangle
} from 'lucide-react'

// ── MOCK DATA ──────────────────────────────────────────────
const RESIDENTS_LIST = [
    { id: 1, name: 'Elena Rodriguez', room: '101' },
    { id: 2, name: 'Carlos Mendez', room: '102' },
    { id: 3, name: 'Maria Silva', room: '103' },
]

const GDS_DATA = [
    { visit: 'Intake', score: 12, event: '' },
    { visit: 'V2 (W3)', score: 11, event: '' },
    { visit: 'V3 (W6)', score: 10, event: 'Family visit' },
    { visit: 'V4 (W9)', score: 9, event: '' },
    { visit: 'V5 (W12)', score: 8, event: 'Hospitalization (UTI)' },
    { visit: 'V6 (W15)', score: 7, event: 'Music therapy started' },
]

const WHOQOL_DATA = [
    { domain: 'Physical', baseline: 45, current: 62, ideal: 75 },
    { domain: 'Psychological', baseline: 35, current: 55, ideal: 70 },
    { domain: 'Social', baseline: 40, current: 60, ideal: 70 },
    { domain: 'Environmental', baseline: 55, current: 70, ideal: 80 },
]

const RISK_STATUS = {
    level: 'monitor',
    gds: 7,
    whoqol: 62,
    observation: 'Improving trend, but GDS still above clinical cutoff (>=5). Social engagement increasing.',
    consecutiveRed: 0,
}

const THERAPY_LOG = [
    {
        date: 'Mar 25, 2026',
        session: 6,
        observations: 'Elena showed increased engagement during session. Discussed recent family visit and its positive emotional impact. Expressed interest in group activities.',
        interventions: 'Cognitive behavioral techniques for managing evening anxiety. Encouraged participation in music therapy.',
        response: 'Positive. Open to new suggestions. Made eye contact throughout.',
        flagged: false,
    },
    {
        date: 'Mar 4, 2026',
        session: 5,
        observations: 'Some withdrawal noted after hospitalization. Less verbal than usual. Sleep quality reported as poor.',
        interventions: 'Supportive listening. Relaxation breathing exercise. Recommended sleep hygiene adjustments to nursing.',
        response: 'Initially guarded but opened up in last 15 minutes. Agreed to try relaxation technique.',
        flagged: true,
    },
    {
        date: 'Feb 11, 2026',
        session: 4,
        observations: 'Stable mood. Talked about garden visits. Expressed gratitude for physiotherapy progress.',
        interventions: 'Reinforced positive experiences. Explored sense of purpose and daily routine satisfaction.',
        response: 'Good engagement. Smiled frequently. Requested photos from garden visits.',
        flagged: false,
    },
]

const THANATOLOGICAL = [
    { resident: 'Maria Silva', protocol: 'Active', type: 'Grief (spouse loss)', sessions: 4, notes: 'Processing loss of husband 6 months ago. Progressing through acceptance phase.' },
    { resident: 'Carlos Mendez', protocol: 'Monitoring', type: 'Existential reflection', sessions: 2, notes: 'Expressing concerns about meaning and legacy. Gentle exploration in progress.' },
]

const SESSION_CALENDAR = [
    { date: 'Apr 8, 2026', resident: 'Elena Rodriguez', time: '10:00', status: 'scheduled' },
    { date: 'Apr 8, 2026', resident: 'Carlos Mendez', time: '11:30', status: 'scheduled' },
    { date: 'Apr 9, 2026', resident: 'Maria Silva', time: '10:00', status: 'scheduled' },
    { date: 'Mar 25, 2026', resident: 'Elena Rodriguez', time: '10:00', status: 'completed' },
    { date: 'Mar 25, 2026', resident: 'Maria Silva', time: '11:30', status: 'completed' },
    { date: 'Mar 11, 2026', resident: 'Carlos Mendez', time: '10:00', status: 'missed' },
]

const RISK_LEVELS = {
    stable: { label: 'Stable', color: 'bg-emerald-500', textColor: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
    monitor: { label: 'Monitor', color: 'bg-amber-500', textColor: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
    'at-risk': { label: 'At Risk', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
}

export default function PsychologistDashboard() {
    const [selectedResident, setSelectedResident] = useState(RESIDENTS_LIST[0])
    const riskCfg = RISK_LEVELS[RISK_STATUS.level]

    return (
        <DashboardShell
            roleId="psychologist"
            roleTag="Psychologist -- Thanatology Specialist"
            title="Emotional Monitoring & Therapeutic Progress"
            tagline="GDS trajectories, WHOQOL scores, risk levels, and session logs -- honoring the emotional dimension of care."
            badges={['Updated: Every 3 weeks', 'Modules 2, 3']}
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
            </div>

            {/* Emotional Risk Traffic Light + Summary */}
            <div className={`rounded-2xl border ${riskCfg.borderColor} ${riskCfg.bgColor} p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4`}>
                <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${riskCfg.bgColor}`}>
                        <Circle className={`w-8 h-8 fill-current ${riskCfg.color} ${riskCfg.textColor}`} />
                    </div>
                    <div>
                        <span className={`text-lg font-bold ${riskCfg.textColor}`}>{riskCfg.label}</span>
                        <div className="flex items-center gap-3 text-xs text-brand-muted mt-0.5">
                            <span>GDS: <strong className="text-brand-dark">{RISK_STATUS.gds}</strong></span>
                            <span>WHOQOL: <strong className="text-brand-dark">{RISK_STATUS.whoqol}</strong></span>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-brand-muted flex-1">{RISK_STATUS.observation}</p>
                <ShieldCheck className={`w-6 h-6 flex-shrink-0 ${riskCfg.textColor}`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* GDS Score Trajectory */}
                <SectionCard title="GDS Score Trajectory" icon={TrendingDown}>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={GDS_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="visit" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" domain={[0, 15]} reversed />
                                <Tooltip
                                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                                    formatter={(value, name) => [value, 'GDS Score']}
                                    labelFormatter={(label, payload) => {
                                        const item = payload?.[0]?.payload
                                        return item?.event ? `${label} | Event: ${item.event}` : label
                                    }}
                                />
                                <Line type="monotone" dataKey="score" stroke="#6A5CA8" strokeWidth={2.5} name="GDS Score" dot={{ r: 5, fill: '#6A5CA8' }} activeDot={{ r: 7 }} />
                                {/* Clinical threshold line indicator */}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex gap-3 mt-2 text-[10px] text-brand-muted">
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded">Normal: 0-4</span>
                        <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded">Mild: 5-8</span>
                        <span className="px-2 py-0.5 bg-red-50 border border-red-200 rounded">Moderate: 9-11</span>
                        <span className="px-2 py-0.5 bg-red-100 border border-red-300 rounded">Severe: 12-15</span>
                    </div>
                </SectionCard>

                {/* WHOQOL Radar */}
                <SectionCard title="WHOQOL Wellbeing Score" icon={Flower2}>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={WHOQOL_DATA}>
                                <PolarGrid gridType="polygon" stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="domain" tick={{ fontSize: 11, fill: '#7A778C' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                                <Radar name="Baseline" dataKey="baseline" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.12} strokeWidth={1.5} />
                                <Radar name="Current" dataKey="current" stroke="#6A5CA8" fill="#6A5CA8" fillOpacity={0.25} strokeWidth={2} />
                                <Radar name="Ideal Range" dataKey="ideal" stroke="#6D8C8C" fill="#6D8C8C" fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 4" />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </SectionCard>
            </div>

            {/* Therapeutic Evolution Log */}
            <SectionCard title="Therapeutic Evolution Log" icon={BookOpen}>
                <div className="space-y-4">
                    {THERAPY_LOG.map((entry, i) => (
                        <div key={i} className={`p-4 rounded-xl border ${entry.flagged ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100 bg-gray-50'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-brand-dark">Session {entry.session}</span>
                                    {entry.flagged && (
                                        <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                                            <AlertTriangle className="w-3 h-3" /> Flagged
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-brand-muted">
                                    <Clock className="w-3 h-3" /> {entry.date}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                <div>
                                    <p className="font-semibold text-brand-muted uppercase text-[10px] tracking-wider mb-1">Observations</p>
                                    <p className="text-brand-dark leading-relaxed">{entry.observations}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-brand-muted uppercase text-[10px] tracking-wider mb-1">Interventions</p>
                                    <p className="text-brand-dark leading-relaxed">{entry.interventions}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-brand-muted uppercase text-[10px] tracking-wider mb-1">Resident Response</p>
                                    <p className="text-brand-dark leading-relaxed">{entry.response}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Thanatological Support */}
                <SectionCard title="Thanatological Support Tracker" icon={Flame}>
                    {THANATOLOGICAL.length === 0 ? (
                        <p className="text-sm text-brand-muted text-center py-4">No active protocols</p>
                    ) : (
                        <div className="space-y-3">
                            {THANATOLOGICAL.map((t, i) => (
                                <div key={i} className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-brand-dark">{t.resident}</span>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${t.protocol === 'Active' ? 'bg-purple-100 text-purple-700' :
                                                t.protocol === 'Monitoring' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-gray-100 text-gray-600'
                                            }`}>{t.protocol}</span>
                                    </div>
                                    <p className="text-xs text-brand-muted mb-1"><strong>Type:</strong> {t.type}</p>
                                    <p className="text-xs text-brand-muted mb-1"><strong>Sessions:</strong> {t.sessions}</p>
                                    <p className="text-xs text-brand-dark">{t.notes}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </SectionCard>

                {/* Session Calendar */}
                <SectionCard title="Session Calendar (Coordinated)" icon={Calendar}>
                    <div className="space-y-2">
                        {SESSION_CALENDAR.map((s, i) => (
                            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg border ${s.status === 'missed' ? 'border-red-200 bg-red-50/50' :
                                    s.status === 'completed' ? 'border-gray-100 bg-gray-50' :
                                        'border-brand-primary/20 bg-brand-primary/5'
                                }`}>
                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.status === 'scheduled' ? 'bg-brand-primary' :
                                        s.status === 'completed' ? 'bg-emerald-500' :
                                            'bg-red-500'
                                    }`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-brand-dark">{s.resident}</p>
                                    <p className="text-[11px] text-brand-muted">{s.date} at {s.time}</p>
                                </div>
                                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${s.status === 'scheduled' ? 'bg-brand-primary/10 text-brand-primary' :
                                        s.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                                            'bg-red-50 text-red-600'
                                    }`}>{s.status}</span>
                            </div>
                        ))}
                    </div>
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
