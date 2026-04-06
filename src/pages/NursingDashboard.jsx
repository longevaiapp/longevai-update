import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    ClipboardList, UtensilsCrossed, AlertTriangle, Users, Pin, Sunrise,
    Clock, CheckCircle2, Circle, ChevronDown, UserCheck, Send
} from 'lucide-react'

// ── MOCK DATA ──────────────────────────────────────────────
const RESIDENTS_LIST = [
    { id: 1, name: 'Elena Rodriguez', room: '101' },
    { id: 2, name: 'Carlos Mendez', room: '102' },
    { id: 3, name: 'Maria Silva', room: '103' },
]

const CURRENT_SHIFT = 'Morning (06:00 - 14:00)'

const SHIFT_LOG_FIELDS = [
    { key: 'vitals', label: 'Vital Signs', placeholder: 'BP, glucose, temp, SpO2...' },
    { key: 'medications', label: 'Medications Administered', placeholder: 'Confirm medications given...' },
    { key: 'observations', label: 'Observations', placeholder: 'Notable observations...' },
    { key: 'mood', label: 'Mood / Behavior', placeholder: 'Emotional state, engagement...' },
]

const MEAL_VALIDATION = [
    { resident: 'Elena Rodriguez', meal: 'Breakfast', served: true, eaten: 'full', notes: '' },
    { resident: 'Carlos Mendez', meal: 'Breakfast', served: true, eaten: 'partial', notes: 'Left toast uneaten' },
    { resident: 'Maria Silva', meal: 'Breakfast', served: true, eaten: 'full', notes: '' },
    { resident: 'Jorge Navarro', meal: 'Breakfast', served: true, eaten: 'refused', notes: 'Nausea reported' },
    { resident: 'Ana Torres', meal: 'Breakfast', served: true, eaten: 'full', notes: '' },
    { resident: 'Roberto Diaz', meal: 'Breakfast', served: false, eaten: 'n/a', notes: 'Fasting for blood test' },
]

const INCIDENTS = [
    { id: 1, type: 'Fall', severity: 'minor', resident: 'Carmen Ruiz', room: '109', time: '22:15', response: 'Examined, no injury. Doctor notified.', notified: ['Family Doctor', 'Gerontologist'], status: 'reported' },
    { id: 2, type: 'Behavioral change', severity: 'moderate', resident: 'Maria Silva', room: '103', time: '07:30', response: 'Agitated during morning routine. Psych consult requested.', notified: ['Psychologist'], status: 'pending' },
]

const STAFF_ROSTER = [
    { name: 'Nurse Garcia', shift: 'Morning', covering: 'Rooms 101-104', status: 'on-duty' },
    { name: 'Nurse Martinez', shift: 'Morning', covering: 'Rooms 105-108', status: 'on-duty' },
    { name: 'Nurse Lopez', shift: 'Morning', covering: 'Rooms 109-110', status: 'on-duty' },
    { name: 'Nurse Torres', shift: 'Afternoon', covering: 'Rooms 101-105', status: 'scheduled' },
    { name: 'Nurse Diaz', shift: 'Afternoon', covering: 'Rooms 106-110', status: 'scheduled' },
    { name: 'Nurse Rivera', shift: 'Night', covering: 'All rooms', status: 'scheduled' },
]

const SPECIALIST_INSTRUCTIONS = [
    { specialist: 'Dr. Gomez (Family Doctor)', resident: 'Roberto Diaz', instruction: 'Monitor BP every 4 hours. Report if >150/95.', date: 'Apr 5', confirmed: true },
    { specialist: 'Nutritionist Reyes', resident: 'Carlos Mendez', instruction: 'Switch to lactose-free alternatives for all dairy.', date: 'Apr 4', confirmed: true },
    { specialist: 'Psychologist Vega', resident: 'Maria Silva', instruction: 'Extra check-ins during evening. Report mood changes.', date: 'Apr 3', confirmed: false },
    { specialist: 'Physiotherapist Luna', resident: 'Elena Rodriguez', instruction: 'Ensure balance exercises completed 3x this week.', date: 'Apr 2', confirmed: false },
]

const MORNING_BRIEFING = {
    overnightEvents: 'Carmen Ruiz had a minor fall at 22:15. No injury. Roberto Diaz had restless sleep.',
    priorityResidents: 'Maria Silva (mood monitoring), Roberto Diaz (BP checks), Jorge Navarro (nausea)',
    staffNotes: 'Full staffing today. Nurse Garcia covering for Nurse Sanchez (room reassignment).',
}

const EATEN_STATUS = {
    full: { label: 'Full', color: 'bg-emerald-100 text-emerald-700' },
    partial: { label: 'Partial', color: 'bg-amber-100 text-amber-700' },
    refused: { label: 'Refused', color: 'bg-red-100 text-red-700' },
    'n/a': { label: 'N/A', color: 'bg-gray-100 text-gray-500' },
}

export default function NursingDashboard() {
    const [shiftNotes, setShiftNotes] = useState({ vitals: '', medications: '', observations: '', mood: '' })

    return (
        <DashboardShell
            roleId="nursing"
            roleTag="Nursing Supervisor -- 3 Shifts Daily"
            title="Shift Operations & Daily Care Dashboard"
            tagline="Operational, fast, built for accountability. Log shifts, validate meals, report incidents, relay instructions."
            badges={['Every shift (3x daily)', 'Modules 3, 5, 7']}
        >
            {/* Current shift indicator */}
            <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-primary" />
                <span className="text-sm font-semibold text-brand-dark">Current Shift: {CURRENT_SHIFT}</span>
                <span className="text-[10px] text-brand-muted ml-auto">Coverage: 3 nurses on duty</span>
            </div>

            {/* Morning Briefing Summary */}
            <SectionCard title="Morning Briefing Summary" icon={Sunrise} subtitle="Pre-filled summary of overnight events">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">Overnight Events</p>
                        <p className="text-xs text-brand-dark">{MORNING_BRIEFING.overnightEvents}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                        <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider mb-1">Priority Residents</p>
                        <p className="text-xs text-brand-dark">{MORNING_BRIEFING.priorityResidents}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">Staff Notes</p>
                        <p className="text-xs text-brand-dark">{MORNING_BRIEFING.staffNotes}</p>
                    </div>
                </div>
            </SectionCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Shift Log Form */}
                <SectionCard title="Per-Resident Shift Log" icon={ClipboardList} subtitle="Structured form -- under 3 min per resident">
                    <div className="bg-gray-50 rounded-lg p-3 mb-3 flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-brand-accent" />
                        <span className="text-xs font-semibold text-brand-dark">Resident:</span>
                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-200 rounded px-3 py-1 pr-7 text-xs font-medium text-brand-dark focus:outline-none">
                                {RESIDENTS_LIST.map(r => (
                                    <option key={r.id} value={r.id}>{r.name} (Rm {r.room})</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-brand-muted pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        {SHIFT_LOG_FIELDS.map(f => (
                            <div key={f.key}>
                                <label className="block text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">{f.label}</label>
                                <textarea
                                    rows={2}
                                    value={shiftNotes[f.key]}
                                    onChange={e => setShiftNotes({ ...shiftNotes, [f.key]: e.target.value })}
                                    className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-brand-accent/30 resize-none text-brand-dark placeholder-brand-muted/50"
                                    placeholder={f.placeholder}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white text-xs font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors">
                            <Send className="w-3.5 h-3.5" /> Submit Log
                        </button>
                    </div>
                </SectionCard>

                {/* Meal Validation */}
                <SectionCard title="Meal Validation Checklist" icon={UtensilsCrossed} subtitle="Confirm what was served and consumed">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 px-2 font-semibold text-brand-muted">Resident</th>
                                    <th className="text-center py-2 px-2 font-semibold text-brand-muted">Served</th>
                                    <th className="text-center py-2 px-2 font-semibold text-brand-muted">Eaten</th>
                                    <th className="text-left py-2 px-2 font-semibold text-brand-muted">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MEAL_VALIDATION.map((m, i) => {
                                    const eaten = EATEN_STATUS[m.eaten]
                                    return (
                                        <tr key={i} className="border-b border-gray-50">
                                            <td className="py-2 px-2 font-medium text-brand-dark">{m.resident}</td>
                                            <td className="py-2 px-2 text-center">
                                                {m.served ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-brand-muted">--</span>}
                                            </td>
                                            <td className="py-2 px-2 text-center">
                                                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold ${eaten.color}`}>{eaten.label}</span>
                                            </td>
                                            <td className="py-2 px-2 text-brand-muted">{m.notes || '--'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </SectionCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Incident Reporter */}
                <SectionCard title="Incident Reporter" icon={AlertTriangle} subtitle="One-tap incident logging">
                    {INCIDENTS.length === 0 ? (
                        <div className="text-center py-6">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                            <p className="text-sm text-brand-muted">No incidents this shift</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {INCIDENTS.map(inc => (
                                <div key={inc.id} className={`p-3 rounded-xl border ${inc.severity === 'critical' ? 'border-red-200 bg-red-50' :
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
                                        <span className={`text-[10px] font-semibold ${inc.status === 'reported' ? 'text-emerald-600' : 'text-amber-600'}`}>{inc.status}</span>
                                    </div>
                                    <p className="text-xs text-brand-dark mb-1">{inc.resident} (Rm {inc.room}) at {inc.time}</p>
                                    <p className="text-xs text-brand-muted">{inc.response}</p>
                                    <div className="flex gap-1 mt-1.5">
                                        {inc.notified.map((n, j) => (
                                            <span key={j} className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">{n}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-2 text-xs font-semibold text-brand-primary border border-brand-primary/20 rounded-lg hover:bg-brand-primary/5 transition-colors">
                                + Log New Incident
                            </button>
                        </div>
                    )}
                </SectionCard>

                {/* Staff Roster */}
                <SectionCard title="Staff Roster & Shift View" icon={Users} subtitle="Coverage and assignments">
                    <div className="space-y-1.5">
                        {STAFF_ROSTER.map((s, i) => (
                            <div key={i} className={`flex items-center gap-3 p-2 rounded-lg border ${s.status === 'on-duty' ? 'border-emerald-100 bg-emerald-50/50' : 'border-gray-100 bg-gray-50'
                                }`}>
                                <Circle className={`w-2.5 h-2.5 fill-current flex-shrink-0 ${s.status === 'on-duty' ? 'text-emerald-500' : 'text-gray-400'
                                    }`} />
                                <div className="flex-1 min-w-0">
                                    <span className="text-sm font-medium text-brand-dark">{s.name}</span>
                                    <p className="text-[10px] text-brand-muted">{s.covering}</p>
                                </div>
                                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.status === 'on-duty' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                                    }`}>{s.shift}</span>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>

            {/* Specialist Instructions */}
            <div className="mt-6">
                <SectionCard title="Specialist Instructions Feed" icon={Pin} subtitle="Active care instructions -- confirm execution">
                    <div className="space-y-2">
                        {SPECIALIST_INSTRUCTIONS.map((inst, i) => (
                            <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${inst.confirmed ? 'border-gray-100 bg-gray-50' : 'border-amber-200 bg-amber-50/50'
                                }`}>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-xs font-semibold text-brand-dark">{inst.resident}</span>
                                        <span className="text-[10px] text-brand-muted">{inst.specialist}</span>
                                        <span className="text-[10px] text-brand-muted ml-auto">{inst.date}</span>
                                    </div>
                                    <p className="text-xs text-brand-muted">{inst.instruction}</p>
                                </div>
                                {inst.confirmed ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                ) : (
                                    <button className="text-[10px] font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded hover:bg-amber-200 transition-colors flex-shrink-0">
                                        Confirm
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </DashboardShell>
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
            <div className="p-5">{children}</div>
        </div>
    )
}
