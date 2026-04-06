import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    AreaChart, Area
} from 'recharts'
import {
    HeartPulse, Pill, AlertTriangle, Microscope, ClipboardList, BarChart3,
    ChevronDown, Clock, UserCheck, Circle, TrendingUp, TrendingDown, Minus,
    CheckCircle2, XCircle
} from 'lucide-react'

// ── MOCK DATA ──────────────────────────────────────────────
const RESIDENTS_LIST = [
    { id: 1, name: 'Elena Rodriguez', room: '101' },
    { id: 2, name: 'Carlos Mendez', room: '102' },
    { id: 3, name: 'Maria Silva', room: '103' },
    { id: 4, name: 'Roberto Diaz', room: '106' },
]

const VITAL_SIGNS = [
    { week: 'W1', systolic: 148, diastolic: 92, glucose: 145, spo2: 94, temp: 36.6 },
    { week: 'W2', systolic: 145, diastolic: 90, glucose: 140, spo2: 95, temp: 36.5 },
    { week: 'W4', systolic: 140, diastolic: 88, glucose: 135, spo2: 95, temp: 36.7 },
    { week: 'W6', systolic: 138, diastolic: 86, glucose: 130, spo2: 96, temp: 36.5 },
    { week: 'W8', systolic: 135, diastolic: 84, glucose: 125, spo2: 96, temp: 36.6 },
    { week: 'W10', systolic: 132, diastolic: 82, glucose: 120, spo2: 97, temp: 36.4 },
    { week: 'W12', systolic: 130, diastolic: 80, glucose: 118, spo2: 97, temp: 36.5 },
]

const MEDICATION_LOG = [
    { date: 'Mar 30, 2026', drug: 'Amlodipine', change: 'Dose maintained at 10mg', doctor: 'Dr. Gomez', reason: 'BP at target' },
    { date: 'Mar 15, 2026', drug: 'Ciprofloxacin', change: 'Started 500mg 2x/day (3 days)', doctor: 'Dr. Gomez', reason: 'UTI confirmed' },
    { date: 'Feb 20, 2026', drug: 'Metformin', change: 'Increased to 750mg 2x/day', doctor: 'Dr. Gomez', reason: 'Glucose above target' },
    { date: 'Jan 10, 2026', drug: 'Amlodipine', change: 'Increased 5mg to 10mg', doctor: 'Dr. Gomez', reason: 'BP consistently >140/90' },
    { date: 'Dec 15, 2025', drug: 'Initial regimen', change: 'Amlodipine 5mg, Metformin 500mg, Omeprazole 20mg', doctor: 'Dr. Gomez', reason: 'Admission baseline' },
]

const INCIDENTS = [
    { date: 'Mar 22, 2026', time: '22:15', type: 'Fall', severity: 'minor', location: 'Bathroom', reporter: 'Nurse Garcia', response: 'Examined, no injury. Ice applied. Doctor notified.', status: 'resolved' },
    { date: 'Mar 15, 2026', time: '08:30', type: 'Adverse reaction', severity: 'moderate', location: 'Room 101', reporter: 'Nurse Martinez', response: 'Nausea after new medication. Antiemetic given. Doctor reviewed.', status: 'resolved' },
    { date: 'Feb 28, 2026', time: '14:00', type: 'Blood pressure spike', severity: 'moderate', location: 'Common room', reporter: 'Nurse Lopez', response: 'BP 165/98. Rested 30 min. Rechecked at 142/88. Documented.', status: 'resolved' },
]

const SPECIALIST_REPORTS = [
    { specialist: 'Psychologist', update: 'GDS improved from 12 to 8. Social engagement increasing. Continue current approach.', date: 'Mar 15, 2026', implications: 'Reduced anxiety may allow tapering of PRN anxiolytics.' },
    { specialist: 'Physiotherapist', update: 'TUG improved 18s to 14s. Balance exercises showing results. Falls risk decreasing.', date: 'Mar 28, 2026', implications: 'Mobility improvement supports reduced sedation in medication choices.' },
    { specialist: 'Nutritionist', update: 'Meal adherence 88%. Weight stable. Glucose diet modifications working well.', date: 'Mar 25, 2026', implications: 'Dietary glucose control may allow Metformin dose stabilization.' },
]

const CLINICAL_KPIS = [
    { label: 'BP Control Rate', value: 82, target: 90, unit: '%', trend: 'up' },
    { label: 'Glucose in Range', value: 75, target: 85, unit: '%', trend: 'up' },
    { label: 'Therapeutic Adherence', value: 94, target: 95, unit: '%', trend: 'stable' },
    { label: 'Hospital Escalation', value: 0, target: 0, unit: 'cases', trend: 'stable' },
]

export default function FamilyDoctorDashboard() {
    const [selectedResident, setSelectedResident] = useState(RESIDENTS_LIST[0])
    const [weeklyNotes, setWeeklyNotes] = useState({ observations: '', medications: '', nursing: '', referrals: '', nextReview: '' })

    return (
        <DashboardShell
            roleId="family-doctor"
            roleTag="Family Doctor -- Weekly Reviewer"
            title="Clinical Evolution Panel"
            tagline="Vital sign trends, medication histories, and clinical events for informed weekly review decisions."
            badges={['Input: Daily (nursing)', 'Review: Weekly', 'Module 3']}
        >
            {/* Resident Selector */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center gap-4">
                <UserCheck className="w-5 h-5 text-brand-accent" />
                <span className="text-sm font-semibold text-brand-dark">Patient:</span>
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

            {/* Clinical KPI Scoreboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {CLINICAL_KPIS.map((kpi, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                        <p className="text-[11px] text-brand-muted uppercase font-semibold tracking-wider">{kpi.label}</p>
                        <div className="flex items-end gap-2 mt-1">
                            <span className={`text-2xl font-bold ${kpi.label === 'Hospital Escalation' ? (kpi.value === 0 ? 'text-emerald-600' : 'text-red-600') :
                                    kpi.value >= kpi.target ? 'text-emerald-600' :
                                        kpi.value >= kpi.target * 0.85 ? 'text-amber-600' : 'text-red-600'
                                }`}>{kpi.value}{kpi.unit === '%' ? '%' : ''}</span>
                            <span className="text-xs text-brand-muted mb-1">/ {kpi.target}{kpi.unit === '%' ? '%' : ` ${kpi.unit}`}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                            {kpi.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                            {kpi.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500" />}
                            {kpi.trend === 'stable' && <Minus className="w-3 h-3 text-brand-muted" />}
                            <span className="text-[10px] text-brand-muted capitalize">{kpi.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Vital Signs — BP */}
                <SectionCard title="Blood Pressure Trend" icon={HeartPulse}>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={VITAL_SIGNS} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" domain={[60, 160]} />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                                {/* Normal range band */}
                                <Area type="monotone" dataKey="systolic" stroke="#C4545E" fill="#C4545E" fillOpacity={0.1} strokeWidth={2} name="Systolic" dot={{ r: 3 }} />
                                <Area type="monotone" dataKey="diastolic" stroke="#4C4673" fill="#4C4673" fillOpacity={0.1} strokeWidth={2} name="Diastolic" dot={{ r: 3 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex gap-3 mt-2 text-[10px] text-brand-muted">
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded">Target: &lt;140/90 mmHg</span>
                    </div>
                </SectionCard>

                {/* Vital Signs — Glucose + SpO2 */}
                <SectionCard title="Glucose & Oxygen Saturation" icon={BarChart3}>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={VITAL_SIGNS} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                                <Line type="monotone" dataKey="glucose" stroke="#E8A84A" strokeWidth={2} name="Glucose (mg/dL)" dot={{ r: 3 }} />
                                <Line type="monotone" dataKey="spo2" stroke="#6D8C8C" strokeWidth={2} name="SpO2 (%)" dot={{ r: 3 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex gap-3 mt-2 text-[10px] text-brand-muted">
                        <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded">Glucose target: 80-130 mg/dL</span>
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded">SpO2 target: &gt;95%</span>
                    </div>
                </SectionCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Medication Change Log */}
                <SectionCard title="Medication Change Log" icon={Pill}>
                    <div className="space-y-3">
                        {MEDICATION_LOG.map((m, i) => (
                            <div key={i} className="flex gap-3 relative">
                                {i < MEDICATION_LOG.length - 1 && (
                                    <div className="absolute left-[7px] top-5 bottom-0 w-px bg-gray-200" />
                                )}
                                <div className="w-3.5 h-3.5 rounded-full flex-shrink-0 mt-0.5 border-2 border-brand-primary bg-brand-primary/20" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-semibold text-brand-muted">{m.date}</span>
                                        <span className="text-[10px] text-brand-muted">by {m.doctor}</span>
                                    </div>
                                    <p className="text-xs font-semibold text-brand-dark mt-0.5">{m.drug}</p>
                                    <p className="text-xs text-brand-muted">{m.change}</p>
                                    <p className="text-[11px] text-brand-accent mt-0.5">Reason: {m.reason}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* Clinical Incident Timeline */}
                <SectionCard title="Clinical Incident Timeline" icon={AlertTriangle}>
                    <div className="space-y-3">
                        {INCIDENTS.length === 0 ? (
                            <p className="text-sm text-brand-muted text-center py-4">No incidents recorded</p>
                        ) : (
                            INCIDENTS.map((inc, i) => (
                                <div key={i} className={`p-3 rounded-xl border ${inc.severity === 'critical' ? 'border-red-200 bg-red-50' :
                                        inc.severity === 'moderate' ? 'border-amber-200 bg-amber-50' :
                                            'border-gray-200 bg-gray-50'
                                    }`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${inc.severity === 'critical' ? 'bg-red-100 text-red-700' :
                                                    inc.severity === 'moderate' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-gray-100 text-gray-600'
                                                }`}>{inc.severity}</span>
                                            <span className="text-xs font-semibold text-brand-dark">{inc.type}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {inc.status === 'resolved' ? (
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                            ) : (
                                                <XCircle className="w-3.5 h-3.5 text-red-500" />
                                            )}
                                            <span className="text-[10px] text-brand-muted capitalize">{inc.status}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-brand-muted">{inc.response}</p>
                                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-brand-muted">
                                        <span>{inc.date} at {inc.time}</span>
                                        <span>{inc.location}</span>
                                        <span>By: {inc.reporter}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </SectionCard>
            </div>

            {/* Inter-Specialist Reports */}
            <SectionCard title="Inter-Specialist Reports" icon={Microscope}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {SPECIALIST_REPORTS.map((s, i) => (
                        <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-brand-dark">{s.specialist}</span>
                                <span className="text-[10px] text-brand-muted">{s.date}</span>
                            </div>
                            <p className="text-xs text-brand-muted mb-2">{s.update}</p>
                            <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10">
                                <p className="text-[11px] text-brand-primary font-medium">Clinical implication: {s.implications}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>

            {/* Weekly Review Form */}
            <div className="mt-6">
                <SectionCard title="Weekly Review Form" icon={ClipboardList}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">Clinical Observations</label>
                            <textarea rows={3} value={weeklyNotes.observations} onChange={e => setWeeklyNotes({ ...weeklyNotes, observations: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 resize-none text-brand-dark placeholder-brand-muted/50" placeholder="Enter clinical observations..." />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">Medication Adjustments</label>
                            <textarea rows={3} value={weeklyNotes.medications} onChange={e => setWeeklyNotes({ ...weeklyNotes, medications: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 resize-none text-brand-dark placeholder-brand-muted/50" placeholder="Any medication changes..." />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">Instructions to Nursing</label>
                            <textarea rows={3} value={weeklyNotes.nursing} onChange={e => setWeeklyNotes({ ...weeklyNotes, nursing: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 resize-none text-brand-dark placeholder-brand-muted/50" placeholder="Nursing care instructions..." />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">Referral Decisions & Next Review</label>
                            <textarea rows={3} value={weeklyNotes.referrals} onChange={e => setWeeklyNotes({ ...weeklyNotes, referrals: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 resize-none text-brand-dark placeholder-brand-muted/50" placeholder="Referrals and next review date..." />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors">
                            <ClipboardList className="w-4 h-4" /> Submit Weekly Review
                        </button>
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
