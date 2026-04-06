import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
    Users, AlertTriangle, Calendar, Mail, TrendingUp, ClipboardList,
    Circle, Clock, ChevronRight, Send, CheckCircle2, AlertCircle, Info
} from 'lucide-react'

// ── MOCK DATA ──────────────────────────────────────────────
const RESIDENTS = [
    { id: 1, name: 'Elena Rodriguez', room: '101', week: 12, status: 'stable', lastNote: 'Morning vitals normal. Good appetite.' },
    { id: 2, name: 'Carlos Mendez', room: '102', week: 8, status: 'monitor', lastNote: 'Slight drop in mobility score. Physio notified.' },
    { id: 3, name: 'Maria Silva', room: '103', week: 15, status: 'urgent', lastNote: 'GDS worsened by 4 points. Psych session requested.' },
    { id: 4, name: 'Jorge Navarro', room: '104', week: 5, status: 'stable', lastNote: 'Adjusting well to new diet plan.' },
    { id: 5, name: 'Ana Torres', room: '105', week: 10, status: 'stable', lastNote: 'Participated in group music therapy.' },
    { id: 6, name: 'Roberto Diaz', room: '106', week: 3, status: 'monitor', lastNote: 'Blood pressure elevated. Monitoring closely.' },
    { id: 7, name: 'Isabel Moreno', room: '107', week: 16, status: 'stable', lastNote: 'Cycle completion evaluation scheduled.' },
    { id: 8, name: 'Fernando Lopez', room: '108', week: 7, status: 'stable', lastNote: 'Weight stable. Good social engagement.' },
    { id: 9, name: 'Carmen Ruiz', room: '109', week: 11, status: 'urgent', lastNote: 'Fall incident last night. No injury. Doctor notified.' },
    { id: 10, name: 'Miguel Herrera', room: '110', week: 1, status: 'stable', lastNote: 'Intake assessment completed. Baseline recorded.' },
]

const ALERTS = [
    { id: 1, severity: 'critical', area: 'Clinical', message: 'Maria Silva: GDS worsened 4+ points since last eval', time: '2h ago', resident: 'Maria Silva' },
    { id: 2, severity: 'critical', area: 'Operational', message: 'Carmen Ruiz: Fall incident not yet reviewed by doctor', time: '8h ago', resident: 'Carmen Ruiz' },
    { id: 3, severity: 'warning', area: 'Nutrition', message: 'Roberto Diaz: Meal adherence below 70% this week', time: '1d ago', resident: 'Roberto Diaz' },
    { id: 4, severity: 'warning', area: 'Clinical', message: 'Carlos Mendez: Barthel score declined since last measurement', time: '2d ago', resident: 'Carlos Mendez' },
    { id: 5, severity: 'info', area: 'Milestone', message: 'Isabel Moreno: Week 16 cycle complete -- evaluation due', time: '3d ago', resident: 'Isabel Moreno' },
    { id: 6, severity: 'info', area: 'Admin', message: 'Miguel Herrera: Intake form 100% complete', time: '3d ago', resident: 'Miguel Herrera' },
]

const AGENDA = [
    { time: '08:00', event: 'Morning Briefing', type: 'team', participants: 'All specialists' },
    { time: '09:00', event: 'Physiotherapy Session', type: 'therapy', participants: 'Elena Rodriguez, Carlos Mendez' },
    { time: '10:30', event: 'Psychologist Visit', type: 'therapy', participants: 'Maria Silva' },
    { time: '11:00', event: 'Family Doctor Review', type: 'review', participants: 'Roberto Diaz, Ana Torres' },
    { time: '14:00', event: 'Nutritionist Consultation', type: 'therapy', participants: 'Jorge Navarro' },
    { time: '15:30', event: 'Geriatrician W8 Eval', type: 'review', participants: 'Carlos Mendez' },
]

const FAMILY_REPORTS = [
    { resident: 'Elena Rodriguez', status: 'delivered', dueDate: 'Mar 28' },
    { resident: 'Carlos Mendez', status: 'in-draft', dueDate: 'Apr 5' },
    { resident: 'Maria Silva', status: 'due', dueDate: 'Apr 2' },
    { resident: 'Jorge Navarro', status: 'delivered', dueDate: 'Mar 30' },
    { resident: 'Ana Torres', status: 'due', dueDate: 'Apr 3' },
    { resident: 'Isabel Moreno', status: 'in-draft', dueDate: 'Apr 6' },
]

const TREND_DATA = [
    { week: 'W1', barthel: 62, gds: 12 },
    { week: 'W2', barthel: 63, gds: 12 },
    { week: 'W4', barthel: 65, gds: 11 },
    { week: 'W6', barthel: 66, gds: 10 },
    { week: 'W8', barthel: 68, gds: 9 },
    { week: 'W10', barthel: 70, gds: 9 },
    { week: 'W12', barthel: 71, gds: 8 },
    { week: 'W14', barthel: 73, gds: 7 },
    { week: 'W16', barthel: 74, gds: 7 },
]

// ── HELPERS ──────────────────────────────────────────────
const STATUS_CONFIG = {
    stable: { label: 'Stable', color: 'bg-emerald-500', textColor: 'text-emerald-700', bgColor: 'bg-emerald-50' },
    monitor: { label: 'Monitor', color: 'bg-amber-500', textColor: 'text-amber-700', bgColor: 'bg-amber-50' },
    urgent: { label: 'Urgent', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' },
}

const SEVERITY_CONFIG = {
    critical: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
}

const REPORT_STATUS = {
    delivered: { label: 'Delivered', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    'in-draft': { label: 'In Draft', icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50' },
    due: { label: 'Due', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
}

export default function GerontologistDashboard() {
    const [briefingNotes, setBriefingNotes] = useState({
        clinical: '', nutrition: '', emotional: '', operational: ''
    })

    const todayStats = {
        totalResidents: RESIDENTS.length,
        activeAlerts: ALERTS.filter(a => a.severity === 'critical').length,
        agendaItems: AGENDA.length,
        reportsDue: FAMILY_REPORTS.filter(r => r.status === 'due').length,
    }

    return (
        <DashboardShell
            roleId="gerontologist"
            roleTag="Gerontologist -- Lead Clinician"
            title="Master Resident Overview"
            tagline="Bird's-eye view of every resident's status, today's agenda, active alerts, and communication queue."
            badges={['Updated: Real-time alerts', 'All modules (1-9)', `${RESIDENTS.length} residents`]}
        >
            {/* Summary Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <SummaryCard icon={Users} label="Active Residents" value={todayStats.totalResidents} color="text-brand-accent" />
                <SummaryCard icon={AlertTriangle} label="Critical Alerts" value={todayStats.activeAlerts} color="text-red-500" />
                <SummaryCard icon={Calendar} label="Today's Agenda" value={`${todayStats.agendaItems} items`} color="text-brand-primary" />
                <SummaryCard icon={Mail} label="Reports Due" value={todayStats.reportsDue} color="text-amber-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Resident Grid — 2 cols on lg */}
                <div className="lg:col-span-2">
                    <SectionCard title="Resident Grid" icon={Users} subtitle="Traffic light status for all residents">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {RESIDENTS.map(r => {
                                const st = STATUS_CONFIG[r.status]
                                return (
                                    <div key={r.id} className={`flex items-start gap-3 p-3 rounded-xl border ${r.status === 'urgent' ? 'border-red-200 bg-red-50/50' : 'border-gray-100 bg-white'} hover:shadow-md transition-shadow cursor-pointer`}>
                                        <div className="flex-shrink-0 mt-1">
                                            <Circle className={`w-3 h-3 fill-current ${st.color} ${st.textColor}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-sm text-brand-dark">{r.name}</span>
                                                <span className="text-[10px] text-brand-muted">Rm {r.room}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${st.bgColor} ${st.textColor}`}>{st.label}</span>
                                                <span className="text-[10px] text-brand-muted">Week {r.week}/16</span>
                                            </div>
                                            <p className="text-xs text-brand-muted mt-1 line-clamp-1">{r.lastNote}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>
                </div>

                {/* Alert Feed */}
                <div>
                    <SectionCard title="Cross-Area Alert Feed" icon={AlertTriangle} subtitle="Sorted by severity">
                        <div className="space-y-2">
                            {ALERTS.map(a => {
                                const cfg = SEVERITY_CONFIG[a.severity]
                                const Icon = cfg.icon
                                return (
                                    <div key={a.id} className={`flex items-start gap-2.5 p-3 rounded-lg border ${cfg.border} ${cfg.bg}`}>
                                        <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${cfg.color}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-brand-dark">{a.message}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] text-brand-muted">{a.area}</span>
                                                <span className="text-[10px] text-brand-muted">{a.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Daily Agenda */}
                <SectionCard title="Today's Agenda" icon={Calendar} subtitle="Staff + resident schedule">
                    <div className="space-y-2">
                        {AGENDA.map((a, i) => (
                            <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                <span className="text-xs font-mono font-semibold text-brand-primary w-12 flex-shrink-0">{a.time}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-brand-dark">{a.event}</p>
                                    <p className="text-[11px] text-brand-muted truncate">{a.participants}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* Family Report Queue */}
                <SectionCard title="Family Report Queue" icon={Mail} subtitle="Monthly reports status">
                    <div className="space-y-2">
                        {FAMILY_REPORTS.map((r, i) => {
                            const st = REPORT_STATUS[r.status]
                            const StIcon = st.icon
                            return (
                                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100">
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${st.bg}`}>
                                        <StIcon className={`w-3.5 h-3.5 ${st.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-brand-dark truncate">{r.resident}</p>
                                        <p className="text-[11px] text-brand-muted">Due: {r.dueDate}</p>
                                    </div>
                                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${st.bg} ${st.color}`}>{st.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </SectionCard>

                {/* Cohort Trend Charts */}
                <SectionCard title="Cohort Trend Charts" icon={TrendingUp} subtitle="Barthel & GDS averages across cohort">
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={TREND_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                                <Line type="monotone" dataKey="barthel" stroke="#4C4673" strokeWidth={2} dot={{ r: 3 }} name="Barthel Avg" />
                                <Line type="monotone" dataKey="gds" stroke="#6D8C8C" strokeWidth={2} dot={{ r: 3 }} name="GDS Avg" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </SectionCard>
            </div>

            {/* Morning Briefing Form */}
            <SectionCard title="Morning Briefing Entry Form" icon={ClipboardList} subtitle="Daily team sync -- each area enters key updates">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { key: 'clinical', label: 'Clinical Update' },
                        { key: 'nutrition', label: 'Nutrition Update' },
                        { key: 'emotional', label: 'Emotional / Psychological' },
                        { key: 'operational', label: 'Operational / Nursing' },
                    ].map(f => (
                        <div key={f.key}>
                            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">{f.label}</label>
                            <textarea
                                rows={3}
                                value={briefingNotes[f.key]}
                                onChange={e => setBriefingNotes({ ...briefingNotes, [f.key]: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent resize-none text-brand-dark placeholder-brand-muted/50"
                                placeholder={`Enter ${f.label.toLowerCase()} notes...`}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors">
                        <Send className="w-4 h-4" /> Submit Briefing
                    </button>
                </div>
            </SectionCard>
        </DashboardShell>
    )
}

// ── SUB-COMPONENTS ──────────────────────────────────────
function SummaryCard({ icon: Icon, label, value, color }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center">
                <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
                <p className="text-2xl font-bold text-brand-dark">{value}</p>
                <p className="text-xs text-brand-muted">{label}</p>
            </div>
        </div>
    )
}

function SectionCard({ title, icon: Icon, subtitle, children }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                <Icon className="w-5 h-5 text-brand-accent" />
                <div>
                    <h3 className="text-sm font-semibold text-brand-dark">{title}</h3>
                    {subtitle && <p className="text-[11px] text-brand-muted">{subtitle}</p>}
                </div>
            </div>
            <div className="p-5">
                {children}
            </div>
        </div>
    )
}
