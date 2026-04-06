import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts'
import {
    UserCheck, FileText, Pill, ShieldAlert, BarChart3, Users2, Download,
    ChevronDown, Clock, CheckCircle2, AlertTriangle
} from 'lucide-react'

// ── MOCK DATA ──────────────────────────────────────────────
const RESIDENTS_LIST = [
    { id: 1, name: 'Elena Rodriguez', admission: '2025-12-15', currentWeek: 12, lastEval: 'Mar 12, 2026' },
    { id: 2, name: 'Carlos Mendez', admission: '2026-01-05', currentWeek: 8, lastEval: 'Mar 20, 2026' },
    { id: 3, name: 'Maria Silva', admission: '2025-11-20', currentWeek: 15, lastEval: 'Mar 25, 2026' },
    { id: 4, name: 'Jorge Navarro', admission: '2026-02-10', currentWeek: 5, lastEval: 'Mar 18, 2026' },
]

const QUADRANT_DATA = [
    { dimension: 'Physical Function', baseline: 45, current: 68, target: 75 },
    { dimension: 'Nutritional Status', baseline: 55, current: 72, target: 80 },
    { dimension: 'Emotional Wellbeing', baseline: 40, current: 62, target: 70 },
    { dimension: 'Clinical Stability', baseline: 60, current: 78, target: 85 },
]

const EVOLUTION_DATA = [
    { week: 'W1', physical: 45, nutritional: 55, emotional: 40, clinical: 60 },
    { week: 'W2', physical: 47, nutritional: 56, emotional: 42, clinical: 62 },
    { week: 'W4', physical: 52, nutritional: 60, emotional: 45, clinical: 65 },
    { week: 'W6', physical: 56, nutritional: 63, emotional: 50, clinical: 68 },
    { week: 'W8', physical: 60, nutritional: 66, emotional: 55, clinical: 72 },
    { week: 'W10', physical: 63, nutritional: 68, emotional: 58, clinical: 74 },
    { week: 'W12', physical: 68, nutritional: 72, emotional: 62, clinical: 78 },
]

const CLINICAL_HISTORY = [
    { date: 'Dec 15, 2025', event: 'Admission — Baseline assessment recorded', type: 'intake' },
    { date: 'Jan 10, 2026', event: 'Hypertension medication adjusted (Amlodipine 5mg -> 10mg)', type: 'medication' },
    { date: 'Feb 01, 2026', event: 'Week 4 physiotherapy evaluation — TUG improved 2s', type: 'evaluation' },
    { date: 'Mar 12, 2026', event: 'Week 8 midpoint — Integral clinical report generated', type: 'report' },
    { date: 'Mar 20, 2026', event: 'Mild UTI — antibiotics prescribed (Ciprofloxacin 3d)', type: 'incident' },
]

const MEDICATIONS = [
    { name: 'Amlodipine', dose: '10mg', frequency: 'Daily', purpose: 'Hypertension', since: 'Jan 2026' },
    { name: 'Metformin', dose: '500mg', frequency: '2x daily', purpose: 'Diabetes T2', since: 'Dec 2025' },
    { name: 'Omeprazole', dose: '20mg', frequency: 'Morning', purpose: 'Gastric protection', since: 'Dec 2025' },
    { name: 'Vitamin D3', dose: '2000 IU', frequency: 'Daily', purpose: 'Bone health', since: 'Dec 2025' },
    { name: 'Paracetamol', dose: '500mg', frequency: 'As needed', purpose: 'Pain management', since: 'Jan 2026' },
]

const SPECIALIST_INPUTS = [
    { specialist: 'Physiotherapist', lastUpdate: 'Mar 28, 2026', status: 'current', summary: 'TUG improved from 18s to 14s. SPPB score 8/12. Good progress on balance exercises.' },
    { specialist: 'Nutritionist', lastUpdate: 'Mar 25, 2026', status: 'current', summary: 'BMI stable at 24.1. Appetite improved. Meal adherence 88%. No dietary conflicts.' },
    { specialist: 'Psychologist', lastUpdate: 'Mar 15, 2026', status: 'overdue', summary: 'GDS 8 (improved from 12 at intake). WHOQOL shows improvement in social domain.' },
    { specialist: 'Family Doctor', lastUpdate: 'Mar 30, 2026', status: 'current', summary: 'BP well controlled post dose adjustment. Glucose within range. UTI resolved.' },
]

const RISK_PROFILE = [
    { risk: 'Fall Risk', level: 'moderate', detail: 'History of 1 fall. TUG improving but still >12s.' },
    { risk: 'Malnutrition', level: 'low', detail: 'BMI stable. Intake adequate. No weight loss.' },
    { risk: 'Depression', level: 'moderate', detail: 'GDS 8. Improved but still above clinical threshold.' },
    { risk: 'Polypharmacy', level: 'low', detail: '5 active medications. No interactions detected.' },
]

export default function GeriatricianDashboard() {
    const [selectedResident, setSelectedResident] = useState(RESIDENTS_LIST[0])

    return (
        <DashboardShell
            roleId="geriatrician"
            roleTag="Geriatrician -- Clinical Specialist"
            title="16-Week Integral Clinical Report"
            tagline="Cycle-based clinical reporting with all specialist inputs aggregated into the definitive clinical portrait."
            badges={['Per cycle milestone', 'Modules 1, 2, 3, 4']}
        >
            {/* Resident Selector + Cycle Status */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-brand-accent" />
                    <span className="text-sm font-semibold text-brand-dark">Resident:</span>
                </div>
                <div className="relative">
                    <select
                        value={selectedResident.id}
                        onChange={e => setSelectedResident(RESIDENTS_LIST.find(r => r.id === Number(e.target.value)))}
                        className="appearance-none bg-brand-light border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
                    >
                        {RESIDENTS_LIST.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-brand-muted">
                    <span>Admitted: <strong className="text-brand-dark">{selectedResident.admission}</strong></span>
                    <span>Week: <strong className="text-brand-dark">{selectedResident.currentWeek}/16</strong></span>
                    <span>Last Eval: <strong className="text-brand-dark">{selectedResident.lastEval}</strong></span>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                    <div className="w-full bg-gray-200 rounded-full h-2 w-32">
                        <div
                            className="bg-brand-primary h-2 rounded-full transition-all"
                            style={{ width: `${(selectedResident.currentWeek / 16) * 100}%` }}
                        />
                    </div>
                    <span className="text-[11px] font-semibold text-brand-primary">{Math.round((selectedResident.currentWeek / 16) * 100)}%</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Clinical History */}
                <SectionCard title="Clinical History Summary" icon={FileText}>
                    <div className="space-y-3">
                        {CLINICAL_HISTORY.map((item, i) => (
                            <div key={i} className="flex gap-3 relative">
                                {i < CLINICAL_HISTORY.length - 1 && (
                                    <div className="absolute left-[7px] top-5 bottom-0 w-px bg-gray-200" />
                                )}
                                <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 mt-0.5 border-2 ${item.type === 'incident' ? 'border-red-400 bg-red-100' :
                                        item.type === 'report' ? 'border-brand-primary bg-brand-primary/20' :
                                            'border-gray-300 bg-white'
                                    }`} />
                                <div>
                                    <p className="text-[11px] text-brand-muted">{item.date}</p>
                                    <p className="text-xs text-brand-dark">{item.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* Active Medications */}
                <SectionCard title="Active Medications" icon={Pill}>
                    <div className="space-y-2">
                        {MEDICATIONS.map((m, i) => (
                            <div key={i} className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-brand-dark">{m.name}</span>
                                    <span className="text-[10px] text-brand-muted">{m.since}</span>
                                </div>
                                <p className="text-xs text-brand-muted mt-0.5">{m.dose} -- {m.frequency} -- {m.purpose}</p>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* Risk Profile */}
                <SectionCard title="Risk Profile (Triage)" icon={ShieldAlert}>
                    <div className="space-y-2">
                        {RISK_PROFILE.map((r, i) => (
                            <div key={i} className={`p-3 rounded-lg border ${r.level === 'high' ? 'border-red-200 bg-red-50' :
                                    r.level === 'moderate' ? 'border-amber-200 bg-amber-50' :
                                        'border-emerald-200 bg-emerald-50'
                                }`}>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-semibold text-brand-dark">{r.risk}</span>
                                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${r.level === 'high' ? 'bg-red-100 text-red-700' :
                                            r.level === 'moderate' ? 'bg-amber-100 text-amber-700' :
                                                'bg-emerald-100 text-emerald-700'
                                        }`}>{r.level}</span>
                                </div>
                                <p className="text-[11px] text-brand-muted">{r.detail}</p>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* 4-Quadrant Radar */}
                <SectionCard title="4-Quadrant Evolution Chart" icon={BarChart3}>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={QUADRANT_DATA}>
                                <PolarGrid gridType="polygon" stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: '#7A778C' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                                <Radar name="Baseline" dataKey="baseline" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.15} strokeWidth={1.5} />
                                <Radar name="Current" dataKey="current" stroke="#4C4673" fill="#4C4673" fillOpacity={0.25} strokeWidth={2} />
                                <Radar name="Target" dataKey="target" stroke="#6D8C8C" fill="#6D8C8C" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </SectionCard>

                {/* Evolution Line Chart */}
                <SectionCard title="16-Week Evolution Timeline" icon={BarChart3}>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={EVOLUTION_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" domain={[0, 100]} />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                                <Line type="monotone" dataKey="physical" stroke="#4C4673" strokeWidth={2} name="Physical" dot={{ r: 3 }} />
                                <Line type="monotone" dataKey="nutritional" stroke="#6D8C8C" strokeWidth={2} name="Nutritional" dot={{ r: 3 }} />
                                <Line type="monotone" dataKey="emotional" stroke="#7A778C" strokeWidth={2} name="Emotional" dot={{ r: 3 }} />
                                <Line type="monotone" dataKey="clinical" stroke="#313D40" strokeWidth={2} name="Clinical" dot={{ r: 3 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </SectionCard>
            </div>

            {/* Specialist Input Aggregator */}
            <SectionCard title="Specialist Input Aggregator" icon={Users2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {SPECIALIST_INPUTS.map((s, i) => (
                        <div key={i} className={`p-4 rounded-xl border ${s.status === 'overdue' ? 'border-amber-200 bg-amber-50/50' : 'border-gray-100 bg-gray-50'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-brand-dark">{s.specialist}</span>
                                <div className="flex items-center gap-1">
                                    {s.status === 'overdue' ? (
                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                                    ) : (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                    )}
                                    <span className={`text-[10px] font-semibold uppercase ${s.status === 'overdue' ? 'text-amber-600' : 'text-emerald-600'}`}>{s.status}</span>
                                </div>
                            </div>
                            <p className="text-xs text-brand-muted mb-1.5">{s.summary}</p>
                            <div className="flex items-center gap-1 text-[10px] text-brand-muted">
                                <Clock className="w-3 h-3" /> Last updated: {s.lastUpdate}
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>

            {/* Report Generator */}
            <div className="mt-6 bg-brand-primary/5 rounded-2xl border border-brand-primary/20 p-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-brand-dark">One-Click Cycle Report</h3>
                    <p className="text-sm text-brand-muted mt-1">Generate the complete integral PDF report from all module data. Includes narrative, charts, and recommendations.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors">
                        <Download className="w-4 h-4" /> Week 8 Report
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-white text-sm font-semibold rounded-xl hover:bg-brand-accent-dark transition-colors">
                        <Download className="w-4 h-4" /> Week 16 Report
                    </button>
                </div>
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
