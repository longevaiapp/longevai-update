import { useState, useEffect } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine
} from 'recharts'
import {
    Users, AlertTriangle, Calendar, Mail, TrendingUp, ClipboardList,
    Circle, Clock, ChevronRight, Send, CheckCircle2, AlertCircle, Info,
    X, Activity, FileText, MapPin, Phone, User, Trash2, Edit3, Eye, Save,
    Zap, CalendarDays, UserPlus, FilePlus, ExternalLink,
    UserCircle, GraduationCap, Briefcase, Building2, Globe, Pencil
} from 'lucide-react'

// -- MOCK DATA --
const PROFILE_STORAGE_KEY = 'longevai-gerontologist-profile'

const DEFAULT_PROFILE = {
    name: 'Dr. Laura Castellanos',
    title: 'Lead Gerontologist',
    license: 'MED-4827-GER',
    specialization: 'Geriatric Care Coordination & Longevity Programs',
    email: 'l.castellanos@amatistalife.com',
    phone: '+34 611 234 567',
    office: 'Building A, Office 201',
    institution: 'Amatista Life -- LongevAI Center',
    education: 'MD, Gerontology (Universidad Complutense de Madrid)',
    certifications: 'Board Certified Gerontologist, Dementia Care Specialist',
    bio: 'Over 18 years of experience in geriatric care coordination. Specializing in multi-specialist longevity programs for older adults, with a focus on holistic wellbeing and family-centered communication.',
    shiftStart: '07:30',
    shiftEnd: '15:30',
    yearsExperience: 18,
    residentsManaged: 10,
}

function loadProfile() {
    try {
        const data = localStorage.getItem(PROFILE_STORAGE_KEY)
        return data ? { ...DEFAULT_PROFILE, ...JSON.parse(data) } : DEFAULT_PROFILE
    } catch { return DEFAULT_PROFILE }
}

function saveProfile(profile) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
}

const RESIDENTS = [
    { id: 1, name: 'Elena Rodriguez', room: '101', week: 12, status: 'stable', lastNote: 'Morning vitals normal. Good appetite.', age: 78, admission: 'Dec 15, 2025', doctor: 'Dr. Gomez', conditions: ['Hypertension', 'Diabetes T2'], contact: 'Sofia Rodriguez (daughter)', phone: '+34 612 345 678' },
    { id: 2, name: 'Carlos Mendez', room: '102', week: 8, status: 'monitor', lastNote: 'Slight drop in mobility score. Physio notified.', age: 82, admission: 'Jan 5, 2026', doctor: 'Dr. Gomez', conditions: ['Osteoarthritis', 'Mild cognitive impairment'], contact: 'Luis Mendez (son)', phone: '+34 612 456 789' },
    { id: 3, name: 'Maria Silva', room: '103', week: 15, status: 'urgent', lastNote: 'GDS worsened by 4 points. Psych session requested.', age: 85, admission: 'Nov 20, 2025', doctor: 'Dr. Torres', conditions: ['Depression', 'Chronic pain'], contact: 'Ana Silva (daughter)', phone: '+34 612 567 890' },
    { id: 4, name: 'Jorge Navarro', room: '104', week: 5, status: 'stable', lastNote: 'Adjusting well to new diet plan.', age: 74, admission: 'Feb 10, 2026', doctor: 'Dr. Gomez', conditions: ['Dyslipidemia'], contact: 'Marta Navarro (wife)', phone: '+34 612 678 901' },
    { id: 5, name: 'Ana Torres', room: '105', week: 10, status: 'stable', lastNote: 'Participated in group music therapy.', age: 80, admission: 'Jan 15, 2026', doctor: 'Dr. Torres', conditions: ['Anxiety', 'Insomnia'], contact: 'Pedro Torres (son)', phone: '+34 612 789 012' },
    { id: 6, name: 'Roberto Diaz', room: '106', week: 3, status: 'monitor', lastNote: 'Blood pressure elevated. Monitoring closely.', age: 77, admission: 'Mar 1, 2026', doctor: 'Dr. Gomez', conditions: ['Hypertension', 'Obesity'], contact: 'Carmen Diaz (wife)', phone: '+34 612 890 123' },
    { id: 7, name: 'Isabel Moreno', room: '107', week: 16, status: 'stable', lastNote: 'Cycle completion evaluation scheduled.', age: 83, admission: 'Nov 1, 2025', doctor: 'Dr. Torres', conditions: ['COPD'], contact: 'Juan Moreno (son)', phone: '+34 612 901 234' },
    { id: 8, name: 'Fernando Lopez', room: '108', week: 7, status: 'stable', lastNote: 'Weight stable. Good social engagement.', age: 79, admission: 'Jan 20, 2026', doctor: 'Dr. Gomez', conditions: ['Diabetes T2'], contact: 'Rosa Lopez (daughter)', phone: '+34 612 012 345' },
    { id: 9, name: 'Carmen Ruiz', room: '109', week: 11, status: 'urgent', lastNote: 'Fall incident last night. No injury. Doctor notified.', age: 88, admission: 'Dec 28, 2025', doctor: 'Dr. Torres', conditions: ['Osteoporosis', 'Fall risk'], contact: 'Miguel Ruiz (son)', phone: '+34 612 123 456' },
    { id: 10, name: 'Miguel Herrera', room: '110', week: 1, status: 'stable', lastNote: 'Intake assessment completed. Baseline recorded.', age: 72, admission: 'Mar 28, 2026', doctor: 'Dr. Gomez', conditions: ['Hypertension'], contact: 'Laura Herrera (wife)', phone: '+34 612 234 567' },
]

const ALERTS = [
    { id: 1, severity: 'critical', area: 'Clinical', message: 'Maria Silva: GDS worsened 4+ points since last eval', time: '2h ago', resident: 'Maria Silva', detail: 'GDS score increased from 8 to 12 since last evaluation on Mar 15. Psych session has been requested. Recommend immediate follow-up by psychologist and possible medication review by geriatrician.' },
    { id: 2, severity: 'critical', area: 'Operational', message: 'Carmen Ruiz: Fall incident not yet reviewed by doctor', time: '8h ago', resident: 'Carmen Ruiz', detail: 'Fall occurred at 22:15 in the bathroom. Night nurse Garcia responded. No visible injury detected, ice applied to right hip. Patient was alert and oriented. Awaiting doctor examination and incident report completion.' },
    { id: 3, severity: 'warning', area: 'Nutrition', message: 'Roberto Diaz: Meal adherence below 70% this week', time: '1d ago', resident: 'Roberto Diaz', detail: 'Meal adherence has dropped to 65% this week (previous week: 82%). Roberto has been skipping breakfast on 3 of 5 days. Nutritionist has been notified for diet review. Possible appetite loss related to new medication.' },
    { id: 4, severity: 'warning', area: 'Clinical', message: 'Carlos Mendez: Barthel score declined since last measurement', time: '2d ago', resident: 'Carlos Mendez', detail: 'Barthel Index dropped from 72 to 66 over the past 2 weeks. Main decline in mobility and transfers. Physiotherapy session frequency should be reviewed. No new incidents reported.' },
    { id: 5, severity: 'info', area: 'Milestone', message: 'Isabel Moreno: Week 16 cycle complete -- evaluation due', time: '3d ago', resident: 'Isabel Moreno', detail: 'Isabel has completed the full 16-week care cycle. All specialist evaluations should be submitted for the final integral report. Geriatrician to schedule closing evaluation. Family report needs to be generated.' },
    { id: 6, severity: 'info', area: 'Admin', message: 'Miguel Herrera: Intake form 100% complete', time: '3d ago', resident: 'Miguel Herrera', detail: 'All baseline assessments have been completed: medical history, functional assessment (Barthel 68), psychological screening (GDS 10), nutritional evaluation (BMI 26.2), and physiotherapy intake. Care plan can now be generated.' },
    { id: 7, severity: 'warning', area: 'Admin', message: 'Ana Torres: Family report overdue by 5 days', time: '5d ago', resident: 'Ana Torres', detail: 'Monthly family report for Ana Torres was due on Apr 3 and has not been sent. Recipient: Pedro Torres (son). Last report was sent on Mar 3, 2026. Please generate and review the report as soon as possible.' },
]

const AGENDA = [
    { time: '08:00', event: 'Morning Briefing', type: 'team', participants: 'All specialists', location: 'Conference Room A', notes: 'Review overnight incidents, daily priorities, and staffing.' },
    { time: '09:00', event: 'Physiotherapy Session', type: 'therapy', participants: 'Elena Rodriguez, Carlos Mendez', location: 'Therapy Room 1', notes: 'Focus on balance exercises for Elena. Carlos: TUG reassessment.' },
    { time: '10:30', event: 'Psychologist Visit', type: 'therapy', participants: 'Maria Silva', location: 'Room 103', notes: 'Emergency session due to GDS worsening. Assess mood and suicidal ideation.' },
    { time: '11:00', event: 'Family Doctor Review', type: 'review', participants: 'Roberto Diaz, Ana Torres', location: 'Medical Office', notes: 'Roberto: BP follow-up. Ana: insomnia medication review.' },
    { time: '14:00', event: 'Nutritionist Consultation', type: 'therapy', participants: 'Jorge Navarro', location: 'Nutrition Office', notes: 'Review diet plan adherence and adjust caloric intake.' },
    { time: '15:30', event: 'Geriatrician W8 Eval', type: 'review', participants: 'Carlos Mendez', location: 'Medical Office', notes: 'Week 8 midpoint integral evaluation. All specialist reports needed.' },
]

const INITIAL_FAMILY_REPORTS = [
    { resident: 'Elena Rodriguez', status: 'delivered', dueDate: 'Mar 28', sentTo: 'Sofia Rodriguez', lastSent: 'Mar 28, 2026' },
    { resident: 'Carlos Mendez', status: 'in-draft', dueDate: 'Apr 5', sentTo: 'Luis Mendez', lastSent: 'Feb 28, 2026' },
    { resident: 'Maria Silva', status: 'due', dueDate: 'Apr 2', sentTo: 'Ana Silva', lastSent: 'Feb 25, 2026' },
    { resident: 'Jorge Navarro', status: 'delivered', dueDate: 'Mar 30', sentTo: 'Marta Navarro', lastSent: 'Mar 30, 2026' },
    { resident: 'Ana Torres', status: 'due', dueDate: 'Apr 3', sentTo: 'Pedro Torres', lastSent: 'Mar 3, 2026' },
    { resident: 'Isabel Moreno', status: 'in-draft', dueDate: 'Apr 6', sentTo: 'Juan Moreno', lastSent: 'Mar 6, 2026' },
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

// -- HELPERS --
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

const AGENDA_TYPE_CONFIG = {
    team: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' },
    therapy: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
    review: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
}

// -- MAIN COMPONENT --
const BRIEFING_STORAGE_KEY = 'longevai-briefing-history'

function loadBriefingHistory() {
    try {
        const data = localStorage.getItem(BRIEFING_STORAGE_KEY)
        return data ? JSON.parse(data) : []
    } catch { return [] }
}

const BRIEFING_DRAFT_KEY = 'longevai-briefing-draft'

function saveBriefingHistory(history) {
    localStorage.setItem(BRIEFING_STORAGE_KEY, JSON.stringify(history))
}

function saveBriefingDraft(notes) {
    localStorage.setItem(BRIEFING_DRAFT_KEY, JSON.stringify(notes))
}

function loadBriefingDraft() {
    try {
        const data = localStorage.getItem(BRIEFING_DRAFT_KEY)
        return data ? JSON.parse(data) : { clinical: '', nutrition: '', emotional: '', operational: '' }
    } catch { return { clinical: '', nutrition: '', emotional: '', operational: '' } }
}

export default function GerontologistDashboard() {
    const [activeSection, setActiveSection] = useState('residents')
    const [briefingNotes, setBriefingNotes] = useState(() => loadBriefingDraft())
    const [briefingSubmitted, setBriefingSubmitted] = useState(false)
    const [briefingHistory, setBriefingHistory] = useState(() => loadBriefingHistory())
    const [selectedResident, setSelectedResident] = useState(null)
    const [selectedAlert, setSelectedAlert] = useState(null)
    const [selectedAgendaItem, setSelectedAgendaItem] = useState(null)
    const [selectedReport, setSelectedReport] = useState(null)
    const [familyReports, setFamilyReports] = useState(INITIAL_FAMILY_REPORTS)
    const [filterStatus, setFilterStatus] = useState('all')
    const [profile, setProfile] = useState(() => loadProfile())
    const [editingProfile, setEditingProfile] = useState(false)

    // Auto-save briefing draft on every keystroke
    useEffect(() => {
        saveBriefingDraft(briefingNotes)
    }, [briefingNotes])

    const todayStats = {
        totalResidents: RESIDENTS.length,
        activeAlerts: ALERTS.filter(a => a.severity === 'critical').length,
        agendaItems: AGENDA.length,
        reportsDue: familyReports.filter(r => r.status === 'due').length,
    }

    const filteredResidents = filterStatus === 'all'
        ? RESIDENTS
        : RESIDENTS.filter(r => r.status === filterStatus)

    const handleBriefingSubmit = () => {
        const hasContent = Object.values(briefingNotes).some(v => v.trim() !== '')
        if (!hasContent) return

        const entry = {
            id: Date.now(),
            date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            notes: { ...briefingNotes }
        }
        const updated = [entry, ...briefingHistory].slice(0, 20)
        setBriefingHistory(updated)
        saveBriefingHistory(updated)
        const emptyNotes = { clinical: '', nutrition: '', emotional: '', operational: '' }
        setBriefingNotes(emptyNotes)
        saveBriefingDraft(emptyNotes)
        setBriefingSubmitted(true)
        setTimeout(() => setBriefingSubmitted(false), 3000)
    }

    const handleDeleteBriefing = (id) => {
        const updated = briefingHistory.filter(b => b.id !== id)
        setBriefingHistory(updated)
        saveBriefingHistory(updated)
    }

    const handleReportSent = (residentName) => {
        const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        setFamilyReports(prev => prev.map(r =>
            r.resident === residentName
                ? { ...r, status: 'delivered', lastSent: today }
                : r
        ))
        setSelectedReport(null)
    }

    return (
        <DashboardShell
            roleId="gerontologist"
            roleTag="Gerontologist -- Lead Clinician"
            title="Master Resident Overview"
            badges={[]}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            notifications={ALERTS}
        >
            {/* Date Bar + Briefing Status */}
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-semibold text-slate-800">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Briefing:</span>
                        {briefingHistory.length > 0 && briefingHistory[0].date === new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
                            ? <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Submitted</span>
                            : <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>
                        }
                    </div>
                    <button
                        onClick={() => setActiveSection('profile')}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 hover:border-indigo-500/30 hover:shadow-sm transition-all"
                    >
                        <div className="w-5 h-5 rounded-full bg-indigo-600/10 flex items-center justify-center">
                            <UserCircle className="w-3.5 h-3.5 text-indigo-600" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-800 hidden sm:inline">{profile.name.split(' ').slice(0, 2).join(' ')}</span>
                    </button>
                </div>
            </div>

            {/* Summary Bar -- always visible */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <SummaryCard icon={Users} label="Active Residents" value={todayStats.totalResidents} color="text-indigo-500" onClick={() => setActiveSection('residents')} />
                <SummaryCard icon={AlertTriangle} label="Critical Alerts" value={todayStats.activeAlerts} color="text-red-500" onClick={() => setActiveSection('alerts')} />
                <SummaryCard icon={Calendar} label="Today's Agenda" value={todayStats.agendaItems + ' items'} color="text-indigo-600" onClick={() => setActiveSection('agenda')} />
                <SummaryCard icon={Mail} label="Reports Due" value={todayStats.reportsDue} color="text-amber-500" onClick={() => setActiveSection('family-reports')} />
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 flex-wrap mb-6">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mr-1">Quick Actions:</span>
                <button onClick={() => setActiveSection('briefing')} className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/80 text-slate-800 hover:border-indigo-500 hover:shadow-sm transition-all">
                    <ClipboardList className="w-3.5 h-3.5 text-indigo-500" /> Morning Briefing
                </button>
                <button onClick={() => { setFilterStatus('urgent'); setActiveSection('residents') }} className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 hover:shadow-sm transition-all">
                    <AlertTriangle className="w-3.5 h-3.5" /> View Urgent Residents
                </button>
                <button onClick={() => setActiveSection('family-reports')} className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 hover:shadow-sm transition-all">
                    <FilePlus className="w-3.5 h-3.5" /> Generate Report
                </button>
                <button onClick={() => setActiveSection('trends')} className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/80 text-slate-800 hover:border-indigo-500 hover:shadow-sm transition-all">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-500" /> Cohort Trends
                </button>
            </div>

            {/* SECTION: Resident Grid */}
            {activeSection === 'residents' && (
                <div className="space-y-6">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filter:</span>
                        {['all', 'stable', 'monitor', 'urgent'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={'text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ' + (filterStatus === status
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-white text-slate-500 border-slate-200/80 hover:border-indigo-500'
                                )}
                            >
                                {status === 'all' ? 'All' : STATUS_CONFIG[status].label}
                                {status !== 'all' && (
                                    <span className="ml-1.5 text-[10px] opacity-70">
                                        ({RESIDENTS.filter(r => r.status === status).length})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <SectionCard title="Resident Grid" icon={Users} subtitle={'Traffic light status -- ' + filteredResidents.length + ' residents'}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {filteredResidents.map(r => {
                                const st = STATUS_CONFIG[r.status]
                                return (
                                    <div
                                        key={r.id}
                                        onClick={() => setSelectedResident(r)}
                                        className={'flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all hover:shadow-md ' + (r.status === 'urgent' ? 'border-red-200 bg-red-50/50' : 'border-slate-100 bg-white')}
                                    >
                                        <div className="flex-shrink-0 mt-1">
                                            <Circle className={'w-3 h-3 fill-current ' + st.color + ' ' + st.textColor} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-sm text-slate-800">{r.name}</span>
                                                <span className="text-[10px] text-slate-500">Rm {r.room}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className={'text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ' + st.bgColor + ' ' + st.textColor}>{st.label}</span>
                                                <span className="text-[10px] text-slate-500">Week {r.week}/16</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-1">{r.lastNote}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* SECTION: Alert Feed */}
            {activeSection === 'alerts' && (
                <SectionCard title="Cross-Area Alert Feed" icon={AlertTriangle} subtitle="Sorted by severity">
                    <div className="space-y-2">
                        {ALERTS.map(a => {
                            const cfg = SEVERITY_CONFIG[a.severity]
                            const Icon = cfg.icon
                            return (
                                <div
                                    key={a.id}
                                    onClick={() => setSelectedAlert(a)}
                                    className={'flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ' + cfg.border + ' ' + cfg.bg}
                                >
                                    <Icon className={'w-4 h-4 mt-0.5 flex-shrink-0 ' + cfg.color} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-slate-800">{a.message}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] text-slate-500">{a.area}</span>
                                            <span className="text-[10px] text-slate-500">{a.time}</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                </div>
                            )
                        })}
                    </div>
                </SectionCard>
            )}

            {/* SECTION: Today's Agenda */}
            {activeSection === 'agenda' && (
                <SectionCard title="Today's Agenda" icon={Calendar} subtitle="Staff + resident schedule">
                    <div className="space-y-2">
                        {AGENDA.map((a, i) => {
                            const typeCfg = AGENDA_TYPE_CONFIG[a.type] || AGENDA_TYPE_CONFIG.team
                            return (
                                <div
                                    key={i}
                                    onClick={() => setSelectedAgendaItem(a)}
                                    className={'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ' + typeCfg.bg + ' ' + typeCfg.border}
                                >
                                    <span className="text-xs font-mono font-semibold text-indigo-600 w-12 flex-shrink-0">{a.time}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-800">{a.event}</p>
                                        <p className="text-[11px] text-slate-500 truncate">{a.participants}</p>
                                    </div>
                                    <span className={'text-[10px] font-semibold uppercase px-2 py-0.5 rounded ' + typeCfg.text}>{a.type}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                </div>
                            )
                        })}
                    </div>
                </SectionCard>
            )}

            {/* SECTION: Family Reports */}
            {activeSection === 'family-reports' && (
                <SectionCard title="Family Report Queue" icon={Mail} subtitle="Monthly reports status">
                    <div className="space-y-2">
                        {familyReports.map((r, i) => {
                            const st = REPORT_STATUS[r.status]
                            const StIcon = st.icon
                            return (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white hover:shadow-md transition-all">
                                    <div className={'w-8 h-8 rounded-lg flex items-center justify-center ' + st.bg}>
                                        <StIcon className={'w-4 h-4 ' + st.color} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-800 truncate">{r.resident}</p>
                                        <p className="text-[11px] text-slate-500">Due: {r.dueDate} -- Sent to: {r.sentTo}</p>
                                    </div>
                                    <span className={'text-[10px] font-semibold uppercase px-2 py-0.5 rounded ' + st.bg + ' ' + st.color}>{st.label}</span>
                                    {r.status === 'due' && (
                                        <button
                                            onClick={() => setSelectedReport({ ...r, mode: 'generate' })}
                                            className="ml-2 text-[10px] font-semibold px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                                        >
                                            Generate
                                        </button>
                                    )}
                                    {r.status === 'in-draft' && (
                                        <button
                                            onClick={() => setSelectedReport({ ...r, mode: 'edit' })}
                                            className="ml-2 text-[10px] font-semibold px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                        >
                                            Edit Draft
                                        </button>
                                    )}
                                    {r.status === 'delivered' && (
                                        <button
                                            onClick={() => setSelectedReport({ ...r, mode: 'view' })}
                                            className="ml-2 text-[10px] font-semibold px-3 py-1 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                                        >
                                            View
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </SectionCard>
            )}

            {/* SECTION: Cohort Trends */}
            {activeSection === 'trends' && (
                <SectionCard title="Cohort Trend Charts" icon={TrendingUp} subtitle="Barthel & GDS averages across cohort">
                    <div className="flex gap-2 mb-3 flex-wrap">
                        <span className="text-[10px] font-medium px-2 py-1 rounded bg-red-50 border border-red-200 text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Below expected: W1-W4 Barthel</span>
                        <span className="text-[10px] font-medium px-2 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Above expected: W14-W16 Barthel</span>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={TREND_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                                <ReferenceLine y={65} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Barthel Min Expected', position: 'insideTopLeft', fontSize: 10, fill: '#ef4444' }} />
                                <ReferenceLine y={10} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'GDS Risk Threshold', position: 'insideBottomLeft', fontSize: 10, fill: '#f59e0b' }} />
                                <Line type="monotone" dataKey="barthel" stroke="#4C4673" strokeWidth={2} dot={({ cx, cy, payload }) => {
                                    const isOutlier = payload.barthel < 65 || payload.barthel > 73
                                    return <circle cx={cx} cy={cy} r={isOutlier ? 5 : 3} fill={isOutlier ? (payload.barthel < 65 ? '#ef4444' : '#10b981') : '#4C4673'} stroke={isOutlier ? '#fff' : 'none'} strokeWidth={isOutlier ? 2 : 0} />
                                }} name="Barthel Avg" />
                                <Line type="monotone" dataKey="gds" stroke="#6D8C8C" strokeWidth={2} dot={({ cx, cy, payload }) => {
                                    const isOutlier = payload.gds >= 10
                                    return <circle cx={cx} cy={cy} r={isOutlier ? 5 : 3} fill={isOutlier ? '#f59e0b' : '#6D8C8C'} stroke={isOutlier ? '#fff' : 'none'} strokeWidth={isOutlier ? 2 : 0} />
                                }} name="GDS Avg" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200/80">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Barthel Index (Avg)</p>
                            <p className="text-2xl font-bold text-slate-800">74</p>
                            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> +12 pts from baseline
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200/80">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">GDS Score (Avg)</p>
                            <p className="text-2xl font-bold text-slate-800">7</p>
                            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> -5 pts (improved)
                            </p>
                        </div>
                    </div>
                </SectionCard>
            )}

            {/* SECTION: Morning Briefing */}
            {activeSection === 'briefing' && (
                <div className="space-y-6">
                    <SectionCard title="Morning Briefing Entry Form" icon={ClipboardList} subtitle="Daily team sync -- each area enters key updates">
                        {briefingSubmitted && (
                            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span className="text-sm font-medium text-emerald-700">Briefing saved and submitted successfully</span>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { key: 'clinical', label: 'Clinical Update' },
                                { key: 'nutrition', label: 'Nutrition Update' },
                                { key: 'emotional', label: 'Emotional / Psychological' },
                                { key: 'operational', label: 'Operational / Nursing' },
                            ].map(f => (
                                <div key={f.key}>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{f.label}</label>
                                    <textarea
                                        rows={4}
                                        value={briefingNotes[f.key]}
                                        onChange={e => setBriefingNotes({ ...briefingNotes, [f.key]: e.target.value })}
                                        className="w-full px-3 py-2 text-sm border border-slate-200/80 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none text-slate-800 placeholder-slate-500/50"
                                        placeholder={'Enter ' + f.label.toLowerCase() + ' notes...'}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleBriefingSubmit}
                                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                            >
                                <Send className="w-4 h-4" /> Submit Briefing
                            </button>
                        </div>
                    </SectionCard>

                    {/* Briefing History */}
                    {briefingHistory.length > 0 && (
                        <SectionCard title="Briefing History" icon={FileText} subtitle={'Last ' + briefingHistory.length + ' submissions stored locally'}>
                            <div className="space-y-3">
                                {briefingHistory.map(entry => (
                                    <div key={entry.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 shadow-sm/50">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5 text-slate-500" />
                                                <span className="text-xs font-semibold text-slate-800">{entry.date}</span>
                                                <span className="text-[10px] text-slate-500">{entry.time}</span>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteBriefing(entry.id)}
                                                className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                title="Delete this briefing"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {[
                                                { key: 'clinical', label: 'Clinical' },
                                                { key: 'nutrition', label: 'Nutrition' },
                                                { key: 'emotional', label: 'Emotional' },
                                                { key: 'operational', label: 'Operational' },
                                            ].map(f => entry.notes[f.key] ? (
                                                <div key={f.key} className="p-2.5 rounded-lg bg-white border border-slate-100">
                                                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{f.label}</p>
                                                    <p className="text-xs text-slate-800 line-clamp-2">{entry.notes[f.key]}</p>
                                                </div>
                                            ) : null)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SectionCard>
                    )}
                </div>
            )}

            {/* SECTION: My Profile */}
            {activeSection === 'profile' && (
                <div className="space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600/10 via-indigo-500/5 to-transparent px-6 py-5 border-b border-slate-100">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border-2 border-indigo-600/20 flex items-center justify-center flex-shrink-0">
                                    <UserCircle className="w-8 h-8 text-indigo-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold text-slate-800">{profile.name}</h3>
                                    <p className="text-sm text-indigo-500 font-medium">{profile.title}</p>
                                    <p className="text-xs text-slate-500 mt-1">{profile.institution}</p>
                                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-indigo-600/10 text-indigo-600 border border-indigo-600/20">{profile.license}</span>
                                        <span className="text-[10px] text-slate-500 flex items-center gap-1"><Briefcase className="w-3 h-3" /> {profile.yearsExperience} years experience</span>
                                        <span className="text-[10px] text-slate-500 flex items-center gap-1"><Users className="w-3 h-3" /> {profile.residentsManaged} residents</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setEditingProfile(true)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-slate-200/80 text-slate-800 hover:border-indigo-500 hover:shadow-sm transition-all"
                                >
                                    <Pencil className="w-3.5 h-3.5 text-indigo-500" /> Edit Profile
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-800 leading-relaxed mb-5">{profile.bio}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <ProfileField icon={GraduationCap} label="Education" value={profile.education} />
                                <ProfileField icon={FileText} label="Certifications" value={profile.certifications} />
                                <ProfileField icon={Mail} label="Email" value={profile.email} />
                                <ProfileField icon={Phone} label="Phone" value={profile.phone} />
                                <ProfileField icon={Building2} label="Office" value={profile.office} />
                                <ProfileField icon={Globe} label="Specialization" value={profile.specialization} />
                                <ProfileField icon={Clock} label="Shift" value={profile.shiftStart + ' -- ' + profile.shiftEnd} />
                                <ProfileField icon={Activity} label="Status" value="On Shift" valueColor="text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Edit Profile */}
            {editingProfile && (
                <Modal onClose={() => setEditingProfile(false)}>
                    <ProfileEditModal profile={profile} onClose={() => setEditingProfile(false)} onSave={(updated) => {
                        setProfile(updated)
                        saveProfile(updated)
                        setEditingProfile(false)
                    }} />
                </Modal>
            )}

            {/* MODAL: Resident Detail */}
            {selectedResident && (
                <Modal onClose={() => setSelectedResident(null)}>
                    <ResidentDetailModal resident={selectedResident} onClose={() => setSelectedResident(null)} />
                </Modal>
            )}

            {/* MODAL: Alert Detail */}
            {selectedAlert && (
                <Modal onClose={() => setSelectedAlert(null)}>
                    <AlertDetailModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} onViewResident={(name) => {
                        const resident = RESIDENTS.find(r => r.name === name)
                        if (resident) {
                            setSelectedAlert(null)
                            setSelectedResident(resident)
                        }
                    }} />
                </Modal>
            )}

            {/* MODAL: Agenda Item Detail */}
            {selectedAgendaItem && (
                <Modal onClose={() => setSelectedAgendaItem(null)}>
                    <AgendaDetailModal item={selectedAgendaItem} onClose={() => setSelectedAgendaItem(null)} />
                </Modal>
            )}

            {/* MODAL: Family Report */}
            {selectedReport && (
                <Modal onClose={() => setSelectedReport(null)}>
                    <FamilyReportModal report={selectedReport} onClose={() => setSelectedReport(null)} onSend={handleReportSent} />
                </Modal>
            )}
        </DashboardShell>
    )
}

// -- SUB-COMPONENTS --
function SummaryCard({ icon: Icon, label, value, color, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 flex items-center gap-3 cursor-pointer hover:shadow-md hover:border-indigo-500/30 transition-all"
        >
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <Icon className={'w-5 h-5 ' + color} />
            </div>
            <div>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
            </div>
        </div>
    )
}

function SectionCard({ title, icon: Icon, subtitle, children }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
                <Icon className="w-5 h-5 text-indigo-500" />
                <div>
                    <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
                    {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
                </div>
            </div>
            <div className="p-5">
                {children}
            </div>
        </div>
    )
}

function Modal({ onClose, children }) {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
                style={{ animation: 'modalIn 0.2s ease-out' }}
            >
                {children}
            </div>
        </div>
    )
}

function ResidentDetailModal({ resident, onClose }) {
    const st = STATUS_CONFIG[resident.status]
    return (
        <div>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={'w-10 h-10 rounded-full flex items-center justify-center ' + st.bgColor}>
                        <User className={'w-5 h-5 ' + st.textColor} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">{resident.name}</h3>
                        <p className="text-xs text-slate-500">Room {resident.room} -- Age {resident.age}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <span className={'text-xs font-semibold uppercase px-2 py-0.5 rounded ' + st.bgColor + ' ' + st.textColor}>{st.label}</span>
                    <span className="text-xs text-slate-500">Week {resident.week}/16</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5 ml-2">
                        <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: ((resident.week / 16) * 100) + '%' }} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <InfoRow icon={Calendar} label="Admitted" value={resident.admission} />
                    <InfoRow icon={Activity} label="Doctor" value={resident.doctor} />
                    <InfoRow icon={Phone} label="Contact" value={resident.contact} />
                    <InfoRow icon={MapPin} label="Phone" value={resident.phone} />
                </div>

                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Conditions</p>
                    <div className="flex flex-wrap gap-1.5">
                        {resident.conditions.map((c, i) => (
                            <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 text-slate-800">{c}</span>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Latest Note</p>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <p className="text-sm text-slate-800">{resident.lastNote}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AlertDetailModal({ alert, onClose, onViewResident }) {
    const cfg = SEVERITY_CONFIG[alert.severity]
    const Icon = cfg.icon
    return (
        <div>
            <div className={'px-6 py-4 border-b flex items-center justify-between ' + cfg.bg + ' ' + cfg.border}>
                <div className="flex items-center gap-3">
                    <Icon className={'w-5 h-5 ' + cfg.color} />
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">{alert.area} Alert</h3>
                        <p className="text-[11px] text-slate-500">{alert.time} -- {alert.resident}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Summary</p>
                    <p className="text-sm font-medium text-slate-800">{alert.message}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Detail</p>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <p className="text-sm text-slate-800 leading-relaxed">{alert.detail}</p>
                    </div>
                </div>
                {onViewResident && alert.resident && (
                    <button
                        onClick={() => onViewResident(alert.resident)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-800 text-sm font-medium rounded-xl border border-slate-200/80 hover:bg-slate-100 transition-colors mb-2"
                    >
                        <ExternalLink className="w-4 h-4 text-indigo-500" /> View {alert.resident}'s Profile
                    </button>
                )}
                <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                        <CheckCircle2 className="w-4 h-4" /> Acknowledge
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-slate-800 text-sm font-semibold rounded-xl border border-slate-200/80 hover:bg-slate-50 transition-colors">
                        <FileText className="w-4 h-4" /> Add Note
                    </button>
                </div>
            </div>
        </div>
    )
}

function AgendaDetailModal({ item, onClose }) {
    const typeCfg = AGENDA_TYPE_CONFIG[item.type] || AGENDA_TYPE_CONFIG.team
    return (
        <div>
            <div className={'px-6 py-4 border-b flex items-center justify-between ' + typeCfg.bg + ' ' + typeCfg.border}>
                <div className="flex items-center gap-3">
                    <Calendar className={'w-5 h-5 ' + typeCfg.text} />
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">{item.event}</h3>
                        <p className="text-[11px] text-slate-500">{item.time} -- {item.type}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <InfoRow icon={Clock} label="Time" value={item.time} />
                    <InfoRow icon={MapPin} label="Location" value={item.location} />
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Participants</p>
                    <p className="text-sm text-slate-800">{item.participants}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Notes</p>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <p className="text-sm text-slate-800 leading-relaxed">{item.notes}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function InfoRow({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <Icon className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
            <div className="min-w-0">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
                <p className="text-xs font-medium text-slate-800 truncate">{value}</p>
            </div>
        </div>
    )
}

const REPORT_TEMPLATES = {
    'Elena Rodriguez': 'Elena continues to show positive progress across all domains. Her vital signs remain stable, appetite has improved, and she actively participates in group activities. Barthel Index: 72 (up from 65 at intake). GDS: 7 (improved from 10). Physiotherapy: TUG time 13s, SPPB 9/12. Nutritional status: BMI 23.8, meal adherence 92%.',
    'Carlos Mendez': 'Carlos is at his Week 8 midpoint. While physical function has improved, a recent decline in mobility scores warrants monitoring. Barthel Index: 66 (slight dip from 68). Physiotherapy is increasing session frequency. GDS stable at 8. Nutritional adherence: 85%.',
    'Maria Silva': 'Maria requires close attention. GDS has worsened from 8 to 12 over the past 3 weeks. A psychology session has been scheduled. Physical function remains stable (Barthel 70). Meal adherence: 78%. The care team recommends a psychologist evaluation and potential medication review.',
    'Jorge Navarro': 'Jorge is adjusting well to his care plan at Week 5. He has responded positively to his new diet plan. BMI: 25.4, meal adherence: 90%. Barthel Index: 68. GDS: 6. No incidents to report.',
    'Ana Torres': 'Ana is progressing steadily at Week 10. She participates regularly in music therapy and social activities. GDS improved from 9 to 6. Sleep quality has improved with medication adjustment. Barthel Index: 74.',
    'Isabel Moreno': 'Isabel is completing her 16-week cycle. Overall improvement across all domains. Barthel Index: 78 (from 62 at intake). GDS: 5 (from 11). COPD managed well with current medication. Recommending cycle renewal discussion with family.',
}

function FamilyReportModal({ report, onClose, onSend }) {
    const isEditable = report.mode === 'edit' || report.mode === 'generate'
    const modeConfig = {
        generate: { title: 'Generate Report', icon: FileText, color: 'text-indigo-600', bg: 'bg-slate-100' },
        edit: { title: 'Edit Draft Report', icon: Edit3, color: 'text-blue-600', bg: 'bg-blue-50' },
        view: { title: 'View Delivered Report', icon: Eye, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    }
    const cfg = modeConfig[report.mode]
    const Icon = cfg.icon
    const template = REPORT_TEMPLATES[report.resident] || 'No report content available for this resident.'
    const [content, setContent] = useState(template)
    const [saved, setSaved] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    const handleSend = () => {
        setSent(true)
        setTimeout(() => {
            onSend?.(report.resident)
        }, 1500)
    }

    return (
        <div>
            <div className={'px-6 py-4 border-b flex items-center justify-between ' + cfg.bg}>
                <div className="flex items-center gap-3">
                    <Icon className={'w-5 h-5 ' + cfg.color} />
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">{cfg.title}</h3>
                        <p className="text-[11px] text-slate-500">{report.resident} -- Due: {report.dueDate}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <InfoRow icon={User} label="Recipient" value={report.sentTo} />
                    <InfoRow icon={Calendar} label="Due Date" value={report.dueDate} />
                </div>

                {saved && !sent && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">Report saved successfully</span>
                    </div>
                )}

                {sent && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">Report sent to {report.sentTo}!</span>
                    </div>
                )}

                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Report Content</p>
                    {isEditable && !sent ? (
                        <textarea
                            rows={10}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-200/80 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none text-slate-800 leading-relaxed"
                        />
                    ) : (
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                            <p className="text-sm text-slate-800 leading-relaxed">{content}</p>
                        </div>
                    )}
                </div>

                {isEditable && !sent && (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            <Save className="w-4 h-4" /> Save Draft
                        </button>
                        <button
                            onClick={handleSend}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
                        >
                            <Send className="w-4 h-4" /> Send to Family
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

function ProfileField({ icon: Icon, label, value, valueColor }) {
    return (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <Icon className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
                <p className={'text-xs font-medium mt-0.5 ' + (valueColor || 'text-slate-800')}>{value}</p>
            </div>
        </div>
    )
}

function ProfileEditModal({ profile, onClose, onSave }) {
    const [form, setForm] = useState({ ...profile })
    const [saved, setSaved] = useState(false)

    const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

    const handleSave = () => {
        onSave(form)
        setSaved(true)
    }

    const fields = [
        { key: 'name', label: 'Full Name', type: 'text' },
        { key: 'title', label: 'Title / Role', type: 'text' },
        { key: 'license', label: 'License Number', type: 'text' },
        { key: 'specialization', label: 'Specialization', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'phone', label: 'Phone', type: 'tel' },
        { key: 'office', label: 'Office Location', type: 'text' },
        { key: 'institution', label: 'Institution', type: 'text' },
        { key: 'education', label: 'Education', type: 'text' },
        { key: 'certifications', label: 'Certifications', type: 'text' },
        { key: 'shiftStart', label: 'Shift Start', type: 'time' },
        { key: 'shiftEnd', label: 'Shift End', type: 'time' },
    ]

    return (
        <div>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-100">
                <div className="flex items-center gap-3">
                    <Pencil className="w-5 h-5 text-indigo-500" />
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">Edit Profile</h3>
                        <p className="text-[11px] text-slate-500">Update your personal and professional information</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fields.map(f => (
                        <div key={f.key}>
                            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{f.label}</label>
                            <input
                                type={f.type}
                                value={form[f.key] || ''}
                                onChange={e => update(f.key, e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-slate-200/80 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-800"
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Bio</label>
                    <textarea
                        rows={3}
                        value={form.bio || ''}
                        onChange={e => update('bio', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200/80 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none text-slate-800"
                    />
                </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-xl border border-slate-200/80 text-slate-800 hover:bg-slate-50 transition-colors">
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                >
                    <Save className="w-4 h-4" /> Save Changes
                </button>
            </div>
        </div>
    )
}
