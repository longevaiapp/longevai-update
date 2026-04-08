import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ReferenceLine
} from 'recharts'
import {
    TrendingUp, TrendingDown, Users2, Scale, RefreshCcw, DollarSign,
    ChevronRight, X, Clock, CheckCircle2, Circle,
    ArrowUpRight, ArrowDownRight, Minus, FileText, Send, Plus,
    Calculator, PieChart as PieChartIcon, BarChart3, Wallet,
    Utensils, Stethoscope, Wrench, Briefcase,
    ShieldCheck, Info,
    ClipboardCheck, CircleDollarSign, Banknote,
    Activity, HeartPulse, Eye,
    CalendarDays, UserCircle, Users, GraduationCap, Mail, Phone,
    Building2, Globe, Pencil, Save
} from 'lucide-react'

/* ================================================================
   FISCAL PERIOD CONTEXT
   ================================================================ */

const CURRENT_PERIOD = {
    month: 'March 2026',
    fiscalYear: 'FY2026',
    closingStatus: 'Open',
}

/* ================================================================
   KPI DATA WITH SPARKLINES
   ================================================================ */

const KPI_DATA = [
    {
        id: 'revenue', label: 'Monthly Revenue', value: 202000, previousValue: 198000,
        format: 'currency', sparkline: [185000, 188000, 192000, 195000, 198000, 202000],
        target: 200000, benchmark: 195000,
        detail: 'Resident fees ($168,400), Government subsidies ($22,600), Activity programs ($6,200), Other ($4,800)',
        trend: 'Revenue has grown steadily at ~2% MoM. Q1 FY2026 revenue exceeded forecast by 1.8%. Government subsidy renewal confirmed through Dec 2026.',
    },
    {
        id: 'costPerResident', label: 'Cost per Resident/Day', value: 121.30, previousValue: 122.80,
        format: 'currency-decimal', sparkline: [128.50, 126.20, 124.80, 123.50, 122.80, 121.30],
        target: 118.00, benchmark: 125.00,
        detail: 'Clinical ($42.50), Nutrition ($18.20), Therapy ($14.50), Admin ($21.80), Facilities ($24.30)',
        trend: 'Cost optimization program reducing spend by ~$1.50/resident/day per month. Kitchen efficiency gains and therapy scheduling improvements driving reduction.',
    },
    {
        id: 'margin', label: 'Operating Margin', value: 13.4, previousValue: 13.1,
        format: 'percent', sparkline: [12.4, 12.2, 11.5, 13.8, 13.1, 13.4],
        target: 15.0, benchmark: 12.0,
        detail: 'Revenue: $202,000 | Costs: $175,000 | Operating profit: $27,000',
        trend: 'Margin recovering after Dec dip (holiday staffing costs). On track for 15% target by Q3 if cost reduction continues.',
    },
    {
        id: 'occupancy', label: 'Bed Occupancy Rate', value: 92.5, previousValue: 90.0,
        format: 'percent', sparkline: [85.0, 87.5, 87.5, 90.0, 90.0, 92.5],
        target: 95.0, benchmark: 88.0,
        detail: '37 of 40 beds occupied. 2 admissions pending (est. Apr 15 & Apr 22). 1 discharge planned (Apr 30).',
        trend: 'Occupancy trending up from 85% in Oct. Two new admissions will push to 97.5% if confirmed. Waitlist has 4 applicants.',
    },
    {
        id: 'cashflow', label: 'Net Cash Position', value: 84500, previousValue: 78200,
        format: 'currency', sparkline: [62000, 68000, 71500, 75000, 78200, 84500],
        target: 90000, benchmark: 60000,
        detail: 'Operating cash: $84,500 | Receivables: $18,200 | Payables: $12,400 | Reserve fund: $45,000',
        trend: 'Cash position improving. All receivables current (<30 days). Reserve fund at 3.2 months of operating expenses -- target is 4 months.',
    },
    {
        id: 'collections', label: 'Collection Rate', value: 97.2, previousValue: 96.8,
        format: 'percent', sparkline: [94.5, 95.2, 96.0, 96.5, 96.8, 97.2],
        target: 98.0, benchmark: 95.0,
        detail: 'Total billed: $207,800 | Collected: $202,000 | Outstanding: $5,800 (2 families >30 days)',
        trend: 'Collection rate improving. Two outstanding accounts being followed up. Payment plan offered to Familia Rodriguez ($3,200 outstanding).',
    },
]

/* ================================================================
   P&L STATEMENT DATA
   ================================================================ */

const PNL_MONTHLY = [
    { month: 'Oct', revenue: 185000, clinicalStaff: 64750, nutrition: 27750, therapy: 22200, admin: 33300, facilities: 14000, profit: 23000 },
    { month: 'Nov', revenue: 188000, clinicalStaff: 65800, nutrition: 28200, therapy: 22560, admin: 33840, facilities: 14600, profit: 23000 },
    { month: 'Dec', revenue: 192000, clinicalStaff: 67200, nutrition: 28800, therapy: 23040, admin: 34560, facilities: 16400, profit: 22000 },
    { month: 'Jan', revenue: 195000, clinicalStaff: 66300, nutrition: 29250, therapy: 23400, admin: 33150, facilities: 15600, profit: 27300 },
    { month: 'Feb', revenue: 198000, clinicalStaff: 67320, nutrition: 29700, therapy: 23760, admin: 33660, facilities: 17560, profit: 26000 },
    { month: 'Mar', revenue: 202000, clinicalStaff: 68680, nutrition: 30300, therapy: 24240, admin: 32320, facilities: 19460, profit: 27000 },
]

const PNL_CATEGORIES = [
    { key: 'clinicalStaff', label: 'Clinical Staff', icon: Stethoscope, color: '#4C4673' },
    { key: 'nutrition', label: 'Nutrition & Kitchen', icon: Utensils, color: '#6D8C8C' },
    { key: 'therapy', label: 'Therapy Services', icon: HeartPulse, color: '#7A778C' },
    { key: 'admin', label: 'Administrative', icon: Briefcase, color: '#8FAEAE' },
    { key: 'facilities', label: 'Facilities & Maintenance', icon: Wrench, color: '#313D40' },
]

const REVENUE_BREAKDOWN = [
    { source: 'Resident Fees', amount: 168400, percent: 83.4, color: '#4C4673' },
    { source: 'Government Subsidies', amount: 22600, percent: 11.2, color: '#6D8C8C' },
    { source: 'Activity Programs', amount: 6200, percent: 3.1, color: '#7A778C' },
    { source: 'Other Income', amount: 4800, percent: 2.3, color: '#8FAEAE' },
]

/* ================================================================
   COST PER RESIDENT DATA
   ================================================================ */

const COST_BREAKDOWN = [
    { category: 'Clinical Staff', daily: 42.50, percent: 35.0, monthly: 56100, icon: Stethoscope, color: '#4C4673', detail: 'Nursing ($28,400), Doctors ($15,200), Specialists ($12,500)' },
    { category: 'Nutrition / Kitchen', daily: 18.20, percent: 15.0, monthly: 24024, icon: Utensils, color: '#6D8C8C', detail: 'Raw food ($14,200), Kitchen staff ($7,800), Supplements ($2,024)' },
    { category: 'Therapy Services', daily: 14.50, percent: 12.0, monthly: 19140, icon: HeartPulse, color: '#7A778C', detail: 'Physiotherapy ($8,400), Psychology ($5,600), Activities ($5,140)' },
    { category: 'Administrative', daily: 21.80, percent: 18.0, monthly: 28776, icon: Briefcase, color: '#8FAEAE', detail: 'Management ($12,000), HR ($5,200), IT ($4,800), Insurance ($6,776)' },
    { category: 'Facilities', daily: 24.30, percent: 20.0, monthly: 32076, icon: Wrench, color: '#313D40', detail: 'Utilities ($11,200), Maintenance ($8,400), Equipment ($5,600), Cleaning ($6,876)' },
]

const COST_TREND = [
    { month: 'Oct', total: 128.50 },
    { month: 'Nov', total: 126.20 },
    { month: 'Dec', total: 124.80 },
    { month: 'Jan', total: 123.50 },
    { month: 'Feb', total: 122.80 },
    { month: 'Mar', total: 121.30 },
]

const RESIDENT_COST_COMPARISON = [
    { name: 'Elena Rodriguez', room: '101', dailyCost: 138.50, complexity: 'High', factors: 'Diabetes management, specialized diet, daily physio', trend: 'down' },
    { name: 'Carlos Mendez', room: '102', dailyCost: 142.80, complexity: 'High', factors: 'Aquatherapy 3x/week, arthritis medications, walker maintenance', trend: 'stable' },
    { name: 'Maria Silva', room: '103', dailyCost: 155.20, complexity: 'Very High', factors: 'Depression treatment, 1:1 support needs, pain management', trend: 'up' },
    { name: 'Jorge Gutierrez', room: '104', dailyCost: 108.40, complexity: 'Low', factors: 'Stable condition, minimal therapy needs', trend: 'stable' },
    { name: 'Ana Morales', room: '105', dailyCost: 112.60, complexity: 'Low', factors: 'Independent in most ADLs, social programs only', trend: 'down' },
    { name: 'Roberto Diaz', room: '106', dailyCost: 128.90, complexity: 'Medium', factors: 'Weight management program, dietary monitoring', trend: 'down' },
    { name: 'Isabel Fernandez', room: '107', dailyCost: 118.30, complexity: 'Medium', factors: 'Moderate therapy needs, stable medications', trend: 'stable' },
    { name: 'Fernando Lopez', room: '108', dailyCost: 105.80, complexity: 'Low', factors: 'Independent, minimal clinical intervention', trend: 'stable' },
]

/* ================================================================
   BUDGET VS ACTUAL DATA
   ================================================================ */

const BUDGET_VS_ACTUAL = [
    { dept: 'Clinical Staff', budget: 67000, actual: 68680, variance: 2.5, icon: Stethoscope, notes: 'Overtime for night shift coverage (+$1,200). One sick leave replacement (+$480).', items: [
        { line: 'Nursing Salaries', budget: 28000, actual: 28400 },
        { line: 'Doctor Fees', budget: 14800, actual: 15200 },
        { line: 'Specialist Contracts', budget: 12200, actual: 12580 },
        { line: 'Benefits & Insurance', budget: 8000, actual: 8200 },
        { line: 'Training', budget: 4000, actual: 4300 },
    ]},
    { dept: 'Nutrition & Kitchen', budget: 29000, actual: 30300, variance: 4.5, icon: Utensils, notes: 'Food price increases (+$800). Special dietary requirements for new admissions (+$500).', items: [
        { line: 'Raw Food & Supplies', budget: 13800, actual: 14200 },
        { line: 'Kitchen Staff', budget: 7600, actual: 7800 },
        { line: 'Dietary Supplements', budget: 1800, actual: 2024 },
        { line: 'Equipment Maintenance', budget: 2400, actual: 2476 },
        { line: 'Special Diets', budget: 3400, actual: 3800 },
    ]},
    { dept: 'Therapy Services', budget: 24000, actual: 23760, variance: -1.0, icon: HeartPulse, notes: 'Under budget. One therapy session block cancelled due to resident illness.', items: [
        { line: 'Physiotherapy', budget: 8800, actual: 8400 },
        { line: 'Psychology', budget: 5800, actual: 5600 },
        { line: 'Activity Programs', budget: 5200, actual: 5140 },
        { line: 'Equipment & Supplies', budget: 2200, actual: 2320 },
        { line: 'External Specialists', budget: 2000, actual: 2300 },
    ]},
    { dept: 'Administrative', budget: 33000, actual: 32320, variance: -2.1, icon: Briefcase, notes: 'Under budget. IT contract renegotiated saving $400/month. Legal fees lower than expected.', items: [
        { line: 'Management Salaries', budget: 12200, actual: 12000 },
        { line: 'HR & Recruitment', budget: 5400, actual: 5200 },
        { line: 'IT & Software', budget: 5200, actual: 4800 },
        { line: 'Insurance Premiums', budget: 6800, actual: 6776 },
        { line: 'Legal & Compliance', budget: 3400, actual: 3544 },
    ]},
    { dept: 'Facilities', budget: 19000, actual: 19460, variance: 2.4, icon: Wrench, notes: 'Emergency plumbing repair ($800). Scheduled elevator maintenance ($400 over estimate).', items: [
        { line: 'Utilities', budget: 10800, actual: 11200 },
        { line: 'Maintenance & Repairs', budget: 7600, actual: 8400 },
        { line: 'Equipment Depreciation', budget: 5400, actual: 5600 },
        { line: 'Cleaning Services', budget: 6400, actual: 6876 },
        { line: 'Safety & Compliance', budget: 1800, actual: 1884 },
    ]},
]

/* ================================================================
   ROI DATA
   ================================================================ */

const CYCLE_ROI = [
    {
        cycle: 'Cycle 1', period: 'Oct 2025 - Jan 2026', status: 'Completed',
        investment: 68000, wellbeingGain: 18, incidentsAvoided: 4, familySat: 88, roi: 12.4, costSavings: 8432,
        details: 'First cycle established baselines. 4 fall incidents avoided through environment modifications saved an estimated $8,432 in hospital transfers and liability.',
        breakdown: [
            { item: 'Falls Prevention', saving: 4200, description: '4 incidents avoided at $1,050 avg cost' },
            { item: 'Reduced Readmissions', saving: 2800, description: '1 hospitalization prevented' },
            { item: 'Staff Efficiency', saving: 1432, description: 'Optimized scheduling saved 86 hours' },
        ]
    },
    {
        cycle: 'Cycle 2', period: 'Nov 2025 - Feb 2026', status: 'Completed',
        investment: 72000, wellbeingGain: 22, incidentsAvoided: 6, familySat: 91, roi: 15.2, costSavings: 10944,
        details: 'Best performing cycle. Integrated care coordination reduced incidents by 33%. Family satisfaction reached 91%.',
        breakdown: [
            { item: 'Falls Prevention', saving: 5250, description: '5 incidents avoided at $1,050 avg cost' },
            { item: 'Medication Optimization', saving: 2400, description: 'Formulary review saved $600/quarter' },
            { item: 'Reduced Readmissions', saving: 2100, description: '1 hospitalization prevented' },
            { item: 'Staff Efficiency', saving: 1194, description: 'Process improvements saved 72 hours' },
        ]
    },
    {
        cycle: 'Cycle 3', period: 'Dec 2025 - Mar 2026', status: 'Current',
        investment: 70000, wellbeingGain: 20, incidentsAvoided: 5, familySat: 89, roi: 13.8, costSavings: 9660,
        details: 'Current cycle showing solid returns. Maria Silva regression is the main concern -- increased 1:1 support costs. Roberto Diaz rapid improvement offsetting.',
        breakdown: [
            { item: 'Falls Prevention', saving: 4200, description: '4 incidents avoided at $1,050 avg cost' },
            { item: 'Nutrition Efficiency', saving: 1800, description: 'Waste reduction program savings' },
            { item: 'Reduced Readmissions', saving: 2100, description: '1 hospitalization prevented' },
            { item: 'Staff Efficiency', saving: 1560, description: 'Scheduling optimization saved 94 hours' },
        ]
    },
]

const CASH_FLOW_DATA = [
    { month: 'Oct', inflow: 185000, outflow: 162000, net: 23000, balance: 62000 },
    { month: 'Nov', inflow: 188000, outflow: 165000, net: 23000, balance: 68000 },
    { month: 'Dec', inflow: 192000, outflow: 170000, net: 22000, balance: 71500 },
    { month: 'Jan', inflow: 195000, outflow: 168000, net: 27000, balance: 75000 },
    { month: 'Feb', inflow: 198000, outflow: 172000, net: 26000, balance: 78200 },
    { month: 'Mar', inflow: 202000, outflow: 175000, net: 27000, balance: 84500 },
    { month: 'Apr*', inflow: 205000, outflow: 178000, net: 27000, balance: 88500 },
    { month: 'May*', inflow: 208000, outflow: 180000, net: 28000, balance: 92500 },
    { month: 'Jun*', inflow: 210000, outflow: 182000, net: 28000, balance: 96500 },
]

const CASH_SAFETY_THRESHOLD = 60000

/* ================================================================
   MONTH-END CHECKLIST
   ================================================================ */

const CLOSING_CHECKLIST = [
    { id: 'rec-bank', label: 'Bank Reconciliation', category: 'Reconciliation', description: 'Match all bank transactions against ledger entries' },
    { id: 'rec-ar', label: 'Accounts Receivable Review', category: 'Reconciliation', description: 'Verify all resident fees billed and payments received' },
    { id: 'rec-ap', label: 'Accounts Payable Reconciliation', category: 'Reconciliation', description: 'Confirm all supplier invoices processed and scheduled' },
    { id: 'rev-payroll', label: 'Payroll Verification', category: 'Verification', description: 'Verify all staff hours, overtime, and deductions' },
    { id: 'rev-budget', label: 'Budget Variance Analysis', category: 'Verification', description: 'Document and explain all variances over 3%' },
    { id: 'rev-cash', label: 'Cash Position Update', category: 'Verification', description: 'Update cash flow forecast with actuals' },
    { id: 'rep-pnl', label: 'P&L Report Generation', category: 'Reporting', description: 'Generate monthly P&L statement for management' },
    { id: 'rep-kpi', label: 'KPI Dashboard Update', category: 'Reporting', description: 'Update all financial KPIs with March actuals' },
    { id: 'rep-board', label: 'Board Summary Preparation', category: 'Reporting', description: 'Prepare executive summary for quarterly board review' },
    { id: 'file-tax', label: 'Tax Filing Check', category: 'Compliance', description: 'Verify quarterly tax obligations and filing deadlines' },
    { id: 'file-audit', label: 'Audit Trail Verification', category: 'Compliance', description: 'Ensure all transactions have proper documentation' },
    { id: 'file-reg', label: 'Regulatory Compliance Report', category: 'Compliance', description: 'Submit required financial reports to regulatory bodies' },
]

/* ================================================================
   FINANCE ALERTS
   ================================================================ */

const FINANCE_ALERTS = [
    { id: 1, severity: 'warning', area: 'Budget', message: 'Nutrition & Kitchen over budget by 4.5% -- food price increases and special dietary needs', time: '2d ago' },
    { id: 2, severity: 'warning', area: 'Collections', message: '2 families with outstanding balances >30 days totaling $5,800', time: '5d ago' },
    { id: 3, severity: 'info', area: 'Revenue', message: 'March revenue exceeded $200K target -- facility record', time: '1w ago' },
    { id: 4, severity: 'info', area: 'Occupancy', message: 'Bed occupancy reached 92.5% -- 2 pending admissions will push to 97.5%', time: '3d ago' },
    { id: 5, severity: 'info', area: 'Cost', message: 'Cost per resident/day dropped below $122 -- cost optimization program working', time: '1w ago' },
    { id: 6, severity: 'critical', area: 'Cash Flow', message: 'Reserve fund at 3.2 months -- below 4-month target. Plan to replenish by Q3.', time: '1w ago' },
]

/* ================================================================
   HELPERS
   ================================================================ */

const fmt = (val, format) => {
    if (format === 'currency') return '$' + val.toLocaleString()
    if (format === 'currency-decimal') return '$' + val.toFixed(2)
    if (format === 'percent') return val.toFixed(1) + '%'
    return val
}

const varianceStatus = (pct) => {
    const abs = Math.abs(pct)
    if (abs <= 3) return { label: 'Normal', color: 'emerald', bg: 'bg-emerald-100 text-emerald-700' }
    if (abs <= 5) return { label: 'Watch', color: 'amber', bg: 'bg-amber-100 text-amber-700' }
    return { label: 'Alert', color: 'red', bg: 'bg-red-100 text-red-700' }
}

const avgResidentCost = (RESIDENT_COST_COMPARISON.reduce((s, r) => s + r.dailyCost, 0) / RESIDENT_COST_COMPARISON.length).toFixed(2)

/* ================================================================
   PROFILE
   ================================================================ */
const PROFILE_STORAGE_KEY = 'longevai-finance-profile'
const DEFAULT_PROFILE = {
    name: 'Andrea Fuentes, CPA',
    title: 'Finance Director',
    license: 'CPA-8472-FIN',
    specialization: 'Healthcare Financial Management, Cost Analytics & Budget Control',
    email: 'a.fuentes@amatistalife.com',
    phone: '+34 611 890 123',
    office: 'Building A, Finance Office 401',
    institution: 'Amatista Life -- LongevAI Center',
    education: 'MBA, Healthcare Finance (IE Business School, Madrid)',
    certifications: 'Certified Public Accountant, Healthcare Financial Management Association',
    bio: 'Over 10 years managing financial operations in healthcare settings. Expert in cost-per-resident analytics, budget forecasting, and ROI measurement connecting financial efficiency to clinical wellbeing outcomes.',
    shiftStart: '09:00',
    shiftEnd: '17:00',
    yearsExperience: 10,
    residentsManaged: 10,
}
function loadProfile() {
    try { const d = localStorage.getItem(PROFILE_STORAGE_KEY); return d ? { ...DEFAULT_PROFILE, ...JSON.parse(d) } : DEFAULT_PROFILE } catch { return DEFAULT_PROFILE }
}
function saveProfile(p) { localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(p)) }

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function FinanceDashboard() {
    const [activeSection, setActiveSection] = useState('kpis')
    const [selectedKpi, setSelectedKpi] = useState(null)
    const [selectedDept, setSelectedDept] = useState(null)
    const [selectedCycle, setSelectedCycle] = useState(null)
    const [selectedCostResident, setSelectedCostResident] = useState(null)

    /* Profile */
    const [profile, setProfile] = useState(() => loadProfile())
    const [editingProfile, setEditingProfile] = useState(false)

    const [checklist, setChecklist] = useState(() => {
        try { return JSON.parse(localStorage.getItem('finance_checklist') || '{}') } catch { return {} }
    })
    const [finNotes, setFinNotes] = useState(() => {
        try { return JSON.parse(localStorage.getItem('finance_notes') || '[]') } catch { return [] }
    })

    const persistChecklist = (next) => { setChecklist(next); localStorage.setItem('finance_checklist', JSON.stringify(next)) }
    const persistNotes = (next) => { setFinNotes(next); localStorage.setItem('finance_notes', JSON.stringify(next)) }

    const toggleCheck = (id) => {
        const next = { ...checklist }
        if (next[id]) { delete next[id] } else { next[id] = new Date().toLocaleString() }
        persistChecklist(next)
    }

    const addNote = (text) => {
        persistNotes([...finNotes, { text, timestamp: new Date().toLocaleString() }])
    }

    const checklistCompleted = CLOSING_CHECKLIST.filter(c => checklist[c.id]).length
    const checklistTotal = CLOSING_CHECKLIST.length
    const checklistPct = Math.round((checklistCompleted / checklistTotal) * 100)

    const totalBudget = BUDGET_VS_ACTUAL.reduce((s, d) => s + d.budget, 0)
    const totalActual = BUDGET_VS_ACTUAL.reduce((s, d) => s + d.actual, 0)
    const totalVariancePct = ((totalActual - totalBudget) / totalBudget * 100).toFixed(1)

    return (
        <DashboardShell
            roleId="finance"
            roleTag="Finance & Accounting -- Monthly Closing"
            title="Financial Control & Efficiency Dashboard"
            badges={[]}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            notifications={FINANCE_ALERTS}
        >
            {/* Date Bar + Profile Button */}
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-brand-accent" />
                    <span className="text-sm font-semibold text-brand-dark">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <button onClick={() => setActiveSection('profile')} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-brand-accent/30 hover:shadow-sm transition-all">
                    <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <UserCircle className="w-3.5 h-3.5 text-brand-primary" />
                    </div>
                    <span className="text-[11px] font-medium text-brand-dark hidden sm:inline">{profile.name.split(' ').slice(0, 2).join(' ')}</span>
                </button>
            </div>

            {/* Financial Pulse Bar */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-brand-accent" />
                    <span className="text-xs font-semibold text-brand-dark uppercase tracking-wider">Financial Pulse -- {CURRENT_PERIOD.month}</span>
                    <span className="ml-auto text-[10px] text-brand-muted">Closing: {checklistCompleted}/{checklistTotal} ({checklistPct}%)</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {KPI_DATA.map(kpi => {
                        const change = kpi.format === 'percent' ? (kpi.value - kpi.previousValue).toFixed(1) : kpi.format === 'currency-decimal' ? (kpi.value - kpi.previousValue).toFixed(2) : (kpi.value - kpi.previousValue)
                        const isPositive = kpi.id === 'costPerResident' ? Number(change) < 0 : Number(change) > 0
                        return (
                            <div key={kpi.id} className="text-center">
                                <p className="text-[10px] text-brand-muted uppercase font-semibold tracking-wider truncate">{kpi.label}</p>
                                <p className="text-lg font-bold text-brand-dark mt-0.5">{fmt(kpi.value, kpi.format)}</p>
                                <div className="flex items-center justify-center gap-1 mt-0.5">
                                    {isPositive ? <ArrowUpRight className="w-3 h-3 text-emerald-500" /> : <ArrowDownRight className="w-3 h-3 text-red-500" />}
                                    <span className={`text-[10px] font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>vs prev</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] text-brand-muted font-medium">Closing Progress</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div className={`h-2 rounded-full transition-all ${checklistPct === 100 ? 'bg-emerald-500' : checklistPct >= 50 ? 'bg-brand-primary' : 'bg-amber-500'}`} style={{ width: checklistPct + '%' }} />
                        </div>
                        <span className="text-[10px] font-bold text-brand-dark">{checklistPct}%</span>
                    </div>
                </div>
            </div>

            {/* SECTION: KPI OVERVIEW */}
            {activeSection === 'kpis' && (
                <div className="space-y-6">
                    <SectionCard title="Key Performance Indicators" icon={DollarSign} subtitle={CURRENT_PERIOD.month + ' -- 6 metrics with 6-month trends'}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {KPI_DATA.map(kpi => {
                                const isPositive = kpi.id === 'costPerResident' ? kpi.value < kpi.previousValue : kpi.value > kpi.previousValue
                                const atTarget = kpi.id === 'costPerResident' ? kpi.value <= kpi.target : kpi.value >= kpi.target
                                const aboveBenchmark = kpi.id === 'costPerResident' ? kpi.value <= kpi.benchmark : kpi.value >= kpi.benchmark
                                const sparkMax = Math.max(...kpi.sparkline)
                                const sparkMin = Math.min(...kpi.sparkline)
                                const sparkRange = sparkMax - sparkMin || 1
                                return (
                                    <div key={kpi.id} onClick={() => setSelectedKpi(kpi)} className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:shadow-md cursor-pointer transition-all">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[11px] text-brand-muted uppercase font-semibold tracking-wider">{kpi.label}</span>
                                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${atTarget ? 'bg-emerald-100 text-emerald-700' : aboveBenchmark ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                                {atTarget ? 'At Target' : aboveBenchmark ? 'Above Avg' : 'Below Avg'}
                                            </span>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-brand-dark">{fmt(kpi.value, kpi.format)}</span>
                                            <div className="flex items-center gap-0.5">
                                                {isPositive ? <ArrowUpRight className="w-3 h-3 text-emerald-500" /> : <ArrowDownRight className="w-3 h-3 text-red-500" />}
                                                <span className={`text-[10px] font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>vs prev</span>
                                            </div>
                                        </div>
                                        <div className="flex items-end gap-0.5 mt-2 h-8">
                                            {kpi.sparkline.map((v, i) => (
                                                <div key={i} className="flex-1 rounded-sm" style={{ height: Math.max(4, ((v - sparkMin) / sparkRange) * 100) + '%', backgroundColor: i === kpi.sparkline.length - 1 ? '#4C4673' : '#4C467340' }} />
                                            ))}
                                        </div>
                                        <div className="flex justify-between mt-1 text-[10px] text-brand-muted">
                                            <span>Target: {fmt(kpi.target, kpi.format)}</span>
                                            <span>Benchmark: {fmt(kpi.benchmark, kpi.format)}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>

                    <SectionCard title="Month-End Closing Checklist" icon={ClipboardCheck} subtitle={checklistCompleted + ' of ' + checklistTotal + ' tasks completed'}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {CLOSING_CHECKLIST.map(item => (
                                <div key={item.id} onClick={() => toggleCheck(item.id)} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${checklist[item.id] ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-gray-100 hover:bg-gray-50'}`}>
                                    {checklist[item.id] ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> : <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />}
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-medium ${checklist[item.id] ? 'text-emerald-700 line-through' : 'text-brand-dark'}`}>{item.label}</p>
                                        <p className="text-[10px] text-brand-muted truncate">{item.category}</p>
                                    </div>
                                    {checklist[item.id] && <span className="text-[9px] text-emerald-600 flex-shrink-0">{checklist[item.id]}</span>}
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* SECTION: P&L STATEMENT */}
            {activeSection === 'pl' && (
                <div className="space-y-6">
                    <SectionCard title="Monthly P&L Statement" icon={BarChart3} subtitle="Revenue vs. cost breakdown -- 6-month trend">
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={PNL_MONTHLY} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={v => '$' + (v / 1000).toFixed(0) + 'k'} />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => ['$' + v.toLocaleString(), '']} />
                                    <Legend wrapperStyle={{ fontSize: 11 }} />
                                    {PNL_CATEGORIES.map(cat => (
                                        <Bar key={cat.key} dataKey={cat.key} stackId="costs" fill={cat.color} name={cat.label} />
                                    ))}
                                    <Bar dataKey="revenue" fill="none" stroke="#059669" strokeWidth={2} name="Revenue" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {PNL_CATEGORIES.map(cat => (
                                <div key={cat.key} className="flex items-center gap-1.5 text-[10px] text-brand-muted">
                                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: cat.color }} />
                                    {cat.label}
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard title="Revenue Composition" icon={CircleDollarSign} subtitle={'Total: $' + PNL_MONTHLY[PNL_MONTHLY.length - 1].revenue.toLocaleString()}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="h-56">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={REVENUE_BREAKDOWN} cx="50%" cy="50%" outerRadius={80} innerRadius={50} dataKey="amount" nameKey="source" label={({ source, percent }) => source.split(' ')[0] + ' ' + percent + '%'} labelLine={false}>
                                            {REVENUE_BREAKDOWN.map((r, i) => <Cell key={i} fill={r.color} />)}
                                        </Pie>
                                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => ['$' + v.toLocaleString(), '']} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2">
                                {REVENUE_BREAKDOWN.map((src, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                                        <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: src.color }} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-brand-dark">{src.source}</p>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                <div className="h-1.5 rounded-full" style={{ width: src.percent + '%', backgroundColor: src.color }} />
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-sm font-bold text-brand-dark">${src.amount.toLocaleString()}</p>
                                            <p className="text-[10px] text-brand-muted">{src.percent}%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="Operating Margin Trend" icon={TrendingUp} subtitle="Monthly margin with 15% target">
                        <div className="h-56">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={PNL_MONTHLY.map(d => ({ month: d.month, margin: Number(((d.revenue - (d.clinicalStaff + d.nutrition + d.therapy + d.admin + d.facilities)) / d.revenue * 100).toFixed(1)) }))} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" domain={[0, 20]} tickFormatter={v => v + '%'} />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => [v + '%', 'Margin']} />
                                    <ReferenceLine y={15} stroke="#059669" strokeDasharray="4 4" label={{ value: 'Target 15%', fontSize: 10, fill: '#059669', position: 'right' }} />
                                    <Area type="monotone" dataKey="margin" stroke="#4C4673" fill="#4C4673" fillOpacity={0.15} strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* SECTION: COST PER RESIDENT */}
            {activeSection === 'cost' && (
                <div className="space-y-6">
                    <SectionCard title="Cost per Resident per Day" icon={PieChartIcon} subtitle={'Average: $' + COST_BREAKDOWN.reduce((s, c) => s + c.daily, 0).toFixed(2) + '/day'}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={COST_BREAKDOWN} cx="50%" cy="50%" outerRadius={90} innerRadius={55} dataKey="daily" nameKey="category" label={({ category, percent }) => category.split('/')[0].trim().split(' ')[0] + ' ' + percent + '%'} labelLine={false}>
                                            {COST_BREAKDOWN.map((c, i) => <Cell key={i} fill={c.color} />)}
                                        </Pie>
                                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => ['$' + v.toFixed(2) + '/day', '']} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2">
                                {COST_BREAKDOWN.map((c, i) => {
                                    const CatIcon = c.icon
                                    return (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                                            <CatIcon className="w-4 h-4 flex-shrink-0" style={{ color: c.color }} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-brand-dark">{c.category}</p>
                                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                    <div className="h-1.5 rounded-full" style={{ width: c.percent + '%', backgroundColor: c.color }} />
                                                </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-sm font-bold text-brand-dark">${c.daily}</p>
                                                <p className="text-[10px] text-brand-muted">{c.percent}%</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="Cost per Resident Trend" icon={TrendingDown} subtitle="6-month trend -- target $118/day">
                        <div className="h-56">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={COST_TREND} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" domain={[100, 140]} tickFormatter={v => '$' + v} />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => ['$' + v.toFixed(2), '']} />
                                    <ReferenceLine y={118} stroke="#059669" strokeDasharray="4 4" label={{ value: 'Target $118', fontSize: 10, fill: '#059669', position: 'right' }} />
                                    <Line type="monotone" dataKey="total" stroke="#4C4673" strokeWidth={2} name="Total $/day" dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </SectionCard>

                    <SectionCard title="Per-Resident Cost Comparison" icon={Users2} subtitle="Daily cost by resident -- sorted by complexity">
                        <div className="space-y-2">
                            {[...RESIDENT_COST_COMPARISON].sort((a, b) => b.dailyCost - a.dailyCost).map((r, i) => (
                                <div key={i} onClick={() => setSelectedCostResident(r)} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:shadow-md cursor-pointer transition-all">
                                    <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-[10px] flex-shrink-0">{r.room}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-brand-dark">{r.name}</span>
                                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${r.complexity === 'Very High' ? 'bg-red-100 text-red-700' : r.complexity === 'High' ? 'bg-amber-100 text-amber-700' : r.complexity === 'Medium' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>{r.complexity}</span>
                                        </div>
                                        <p className="text-[10px] text-brand-muted line-clamp-1 mt-0.5">{r.factors}</p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className="text-lg font-bold text-brand-dark">${r.dailyCost}</span>
                                        {r.trend === 'down' ? <ArrowDownRight className="w-3.5 h-3.5 text-emerald-500" /> : r.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5 text-red-500" /> : <Minus className="w-3.5 h-3.5 text-gray-400" />}
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 p-3 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-center">
                            <p className="text-xs text-brand-primary font-medium">Facility Average: ${avgResidentCost}/day | Range: ${Math.min(...RESIDENT_COST_COMPARISON.map(r => r.dailyCost))} - ${Math.max(...RESIDENT_COST_COMPARISON.map(r => r.dailyCost))}</p>
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* SECTION: BUDGET VS ACTUAL */}
            {activeSection === 'budget' && (
                <div className="space-y-6">
                    <SectionCard title="Budget vs. Actual by Department" icon={Calculator} subtitle={CURRENT_PERIOD.month + ' -- Total variance: ' + (Number(totalVariancePct) > 0 ? '+' : '') + totalVariancePct + '%'}>
                        <div className="grid grid-cols-3 gap-3 mb-5">
                            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
                                <p className="text-[10px] text-brand-muted uppercase font-semibold tracking-wider">Total Budget</p>
                                <p className="text-lg font-bold text-brand-dark">${totalBudget.toLocaleString()}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
                                <p className="text-[10px] text-brand-muted uppercase font-semibold tracking-wider">Total Actual</p>
                                <p className="text-lg font-bold text-brand-dark">${totalActual.toLocaleString()}</p>
                            </div>
                            <div className={`p-3 rounded-xl border text-center ${Number(totalVariancePct) > 3 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
                                <p className="text-[10px] text-brand-muted uppercase font-semibold tracking-wider">Net Variance</p>
                                <p className={`text-lg font-bold ${Number(totalVariancePct) > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{Number(totalVariancePct) > 0 ? '+' : ''}{totalVariancePct}%</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {BUDGET_VS_ACTUAL.map((dept, i) => {
                                const status = varianceStatus(dept.variance)
                                const DeptIcon = dept.icon
                                return (
                                    <div key={i} onClick={() => setSelectedDept(dept)} className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ${Math.abs(dept.variance) > 5 ? 'border-red-200 bg-red-50/30' : Math.abs(dept.variance) > 3 ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100 bg-gray-50'}`}>
                                        <div className="flex items-center gap-3">
                                            <DeptIcon className="w-5 h-5 text-brand-muted flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-sm font-semibold text-brand-dark">{dept.dept}</span>
                                                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${status.bg}`}>{status.label}</span>
                                                </div>
                                                <p className="text-[10px] text-brand-muted line-clamp-1 mt-0.5">{dept.notes}</p>
                                            </div>
                                            <div className="flex items-center gap-4 flex-shrink-0">
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-[10px] text-brand-muted">Budget</p>
                                                    <p className="text-xs font-semibold text-brand-dark">${dept.budget.toLocaleString()}</p>
                                                </div>
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-[10px] text-brand-muted">Actual</p>
                                                    <p className="text-xs font-semibold text-brand-dark">${dept.actual.toLocaleString()}</p>
                                                </div>
                                                <div className="text-right w-12">
                                                    <p className={`text-sm font-bold ${dept.variance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{dept.variance > 0 ? '+' : ''}{dept.variance}%</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex gap-3 mt-4 flex-wrap text-[10px] text-brand-muted">
                            <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded">0-3%: Normal</span>
                            <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded">3-5%: Watch</span>
                            <span className="px-2 py-0.5 bg-red-50 border border-red-200 rounded">5%+: Alert</span>
                        </div>
                    </SectionCard>

                    <SectionCard title="Department Budget Comparison" icon={BarChart3} subtitle="Budget vs Actual side by side">
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={BUDGET_VS_ACTUAL} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="dept" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={v => '$' + (v / 1000).toFixed(0) + 'k'} />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => ['$' + v.toLocaleString(), '']} />
                                    <Legend wrapperStyle={{ fontSize: 11 }} />
                                    <Bar dataKey="budget" fill="#4C4673" radius={[4, 4, 0, 0]} name="Budget" />
                                    <Bar dataKey="actual" fill="#6D8C8C" radius={[4, 4, 0, 0]} name="Actual" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* SECTION: CYCLE ROI */}
            {activeSection === 'roi' && (
                <div className="space-y-6">
                    <SectionCard title="16-Week Cycle ROI Analysis" icon={RefreshCcw} subtitle="Investment returns through care quality outcomes">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {CYCLE_ROI.map((c, i) => (
                                <div key={i} onClick={() => setSelectedCycle(c)} className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ${c.status === 'Current' ? 'border-brand-primary/30 bg-brand-primary/5' : 'border-gray-100 bg-gray-50'}`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-sm font-semibold text-brand-dark">{c.cycle}</h4>
                                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${c.status === 'Current' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>{c.status}</span>
                                    </div>
                                    <p className="text-[10px] text-brand-muted mb-3">{c.period}</p>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between"><span className="text-brand-muted flex items-center gap-1"><DollarSign className="w-3 h-3" /> Investment</span><span className="font-semibold text-brand-dark">${c.investment.toLocaleString()}</span></div>
                                        <div className="flex justify-between"><span className="text-brand-muted flex items-center gap-1"><Banknote className="w-3 h-3" /> Cost Savings</span><span className="font-semibold text-emerald-600">${c.costSavings.toLocaleString()}</span></div>
                                        <div className="flex justify-between"><span className="text-brand-muted flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Wellbeing Gain</span><span className="font-semibold text-emerald-600">+{c.wellbeingGain}%</span></div>
                                        <div className="flex justify-between"><span className="text-brand-muted flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Incidents Avoided</span><span className="font-semibold text-brand-dark">{c.incidentsAvoided}</span></div>
                                        <div className="flex justify-between"><span className="text-brand-muted flex items-center gap-1"><Users2 className="w-3 h-3" /> Family Satisfaction</span><span className="font-semibold text-brand-dark">{c.familySat}%</span></div>
                                        <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                                            <span className="font-semibold text-brand-muted">ROI</span>
                                            <span className="text-xl font-bold text-brand-primary">{c.roi}%</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-brand-muted"><Eye className="w-3 h-3" /> Click for breakdown</div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard title="Cash Flow Forecast" icon={Wallet} subtitle="6-month history + 3-month projection (starred months are forecasts)">
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={CASH_FLOW_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={v => '$' + (v / 1000).toFixed(0) + 'k'} />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => ['$' + v.toLocaleString(), '']} />
                                    <Legend wrapperStyle={{ fontSize: 11 }} />
                                    <ReferenceLine y={CASH_SAFETY_THRESHOLD} stroke="#dc2626" strokeDasharray="4 4" label={{ value: 'Safety Threshold', fontSize: 10, fill: '#dc2626', position: 'right' }} />
                                    <Area type="monotone" dataKey="balance" stroke="#4C4673" fill="#4C4673" fillOpacity={0.12} strokeWidth={2} name="Cash Balance" />
                                    <Line type="monotone" dataKey="inflow" stroke="#059669" strokeWidth={1.5} strokeDasharray="4 4" name="Inflow" dot={false} />
                                    <Line type="monotone" dataKey="outflow" stroke="#dc2626" strokeWidth={1.5} strokeDasharray="4 4" name="Outflow" dot={false} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-3">
                            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
                                <p className="text-[10px] text-emerald-700 uppercase font-semibold">Avg Monthly Net</p>
                                <p className="text-sm font-bold text-emerald-700">${Math.round(CASH_FLOW_DATA.filter(d => !d.month.includes('*')).reduce((s, d) => s + d.net, 0) / CASH_FLOW_DATA.filter(d => !d.month.includes('*')).length).toLocaleString()}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center">
                                <p className="text-[10px] text-blue-700 uppercase font-semibold">Current Balance</p>
                                <p className="text-sm font-bold text-blue-700">$84,500</p>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-center">
                                <p className="text-[10px] text-purple-700 uppercase font-semibold">Projected Jun</p>
                                <p className="text-sm font-bold text-purple-700">$96,500</p>
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="Financial Notes & Observations" icon={FileText} subtitle="Persistent notes for audit trail and month-end review">
                        <NoteSection notes={finNotes} onAddNote={addNote} />
                    </SectionCard>
                </div>
            )}

            {/* MODALS */}
            {selectedKpi && <Modal onClose={() => setSelectedKpi(null)}><KpiDetailModal kpi={selectedKpi} onClose={() => setSelectedKpi(null)} /></Modal>}
            {selectedDept && <Modal onClose={() => setSelectedDept(null)}><DeptDetailModal dept={selectedDept} onClose={() => setSelectedDept(null)} /></Modal>}
            {selectedCycle && <Modal onClose={() => setSelectedCycle(null)}><CycleDetailModal cycle={selectedCycle} onClose={() => setSelectedCycle(null)} /></Modal>}
            {selectedCostResident && <Modal onClose={() => setSelectedCostResident(null)}><ResidentCostModal resident={selectedCostResident} onClose={() => setSelectedCostResident(null)} /></Modal>}

            {/* SECTION: My Profile */}
            {activeSection === 'profile' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-primary/10 via-brand-accent/5 to-transparent px-6 py-5 border-b border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border-2 border-brand-primary/20 flex items-center justify-center flex-shrink-0">
                                    <UserCircle className="w-8 h-8 text-brand-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold text-brand-dark">{profile.name}</h3>
                                    <p className="text-sm text-brand-accent font-medium">{profile.title}</p>
                                    <p className="text-xs text-brand-muted mt-1">{profile.institution}</p>
                                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20">{profile.license}</span>
                                        <span className="text-[10px] text-brand-muted flex items-center gap-1"><Briefcase className="w-3 h-3" /> {profile.yearsExperience} years experience</span>
                                        <span className="text-[10px] text-brand-muted flex items-center gap-1"><Users className="w-3 h-3" /> {profile.residentsManaged} residents</span>
                                    </div>
                                </div>
                                <button onClick={() => setEditingProfile(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 text-brand-dark hover:border-brand-accent hover:shadow-sm transition-all">
                                    <Pencil className="w-3.5 h-3.5 text-brand-accent" /> Edit Profile
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-brand-dark leading-relaxed mb-5">{profile.bio}</p>
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
                    <ProfileEditModal profile={profile} onClose={() => setEditingProfile(false)} onSave={(updated) => { setProfile(updated); saveProfile(updated); setEditingProfile(false) }} />
                </Modal>
            )}
        </DashboardShell>
    )
}

/* ================================================================
   SUB-COMPONENTS
   ================================================================ */

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

function Modal({ onClose, children }) {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()} style={{ animation: 'modalIn 0.2s ease-out' }}>
                {children}
            </div>
        </div>
    )
}

function NoteSection({ notes, onAddNote }) {
    const [showForm, setShowForm] = useState(false)
    const [text, setText] = useState('')
    const [justSaved, setJustSaved] = useState(false)
    const handleSave = () => {
        if (!text.trim()) return
        onAddNote(text.trim())
        setText('')
        setShowForm(false)
        setJustSaved(true)
        setTimeout(() => setJustSaved(false), 2500)
    }
    return (
        <div>
            {notes.length > 0 && (
                <div className="space-y-2 mb-3">
                    {notes.map((note, i) => (
                        <div key={i} className="p-3 rounded-lg bg-purple-50/60 border border-purple-200/60">
                            <div className="flex items-start gap-2">
                                <FileText className="w-3.5 h-3.5 text-purple-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-brand-dark leading-relaxed">{note.text}</p>
                                    <p className="text-[10px] text-brand-muted mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {note.timestamp}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {notes.length === 0 && !showForm && <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center mb-3"><p className="text-xs text-brand-muted">No financial notes added yet</p></div>}
            {showForm && (
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-2 mb-3">
                    <textarea autoFocus rows={3} value={text} onChange={e => setText(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/30 resize-none text-brand-dark placeholder-brand-muted/50" placeholder="Enter financial observation, variance explanation, or audit note..." />
                    <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => { setShowForm(false); setText('') }} className="px-3 py-1.5 text-xs font-medium text-brand-muted hover:text-brand-dark transition-colors rounded-lg">Cancel</button>
                        <button onClick={handleSave} disabled={!text.trim()} className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${text.trim() ? 'bg-brand-primary text-white hover:bg-brand-primary-dark' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}><Send className="w-3 h-3" /> Save Note</button>
                    </div>
                </div>
            )}
            {justSaved && <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 mb-3"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /><p className="text-xs font-medium text-emerald-700">Financial note saved</p></div>}
            <button onClick={() => setShowForm(true)} disabled={showForm} className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${showForm ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-default' : 'bg-white text-brand-dark border-gray-200 hover:bg-gray-50'}`}><Plus className="w-3.5 h-3.5" /> Add Financial Note</button>
        </div>
    )
}

/* ================================================================
   MODAL CONTENTS
   ================================================================ */

function KpiDetailModal({ kpi, onClose }) {
    const change = kpi.format === 'percent' ? (kpi.value - kpi.previousValue).toFixed(1) : kpi.format === 'currency-decimal' ? (kpi.value - kpi.previousValue).toFixed(2) : (kpi.value - kpi.previousValue)
    const isPositive = kpi.id === 'costPerResident' ? Number(change) < 0 : Number(change) > 0
    const atTarget = kpi.id === 'costPerResident' ? kpi.value <= kpi.target : kpi.value >= kpi.target
    const chartData = kpi.sparkline.map((v, i) => ({ period: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'][i] || 'P' + (i + 1), value: v }))
    return (
        <div>
            <div className="px-6 py-4 border-b bg-gray-50 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3"><DollarSign className="w-5 h-5 text-brand-accent" /><div><h3 className="text-sm font-bold text-brand-dark">{kpi.label}</h3><p className="text-[11px] text-brand-muted">6-month trend analysis</p></div></div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="text-center py-2">
                    <p className="text-4xl font-bold text-brand-dark">{fmt(kpi.value, kpi.format)}</p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                        {isPositive ? <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                        <span className={`text-sm font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>{kpi.format === 'currency' ? '$' + Math.abs(Number(change)).toLocaleString() : kpi.format === 'currency-decimal' ? '$' + Math.abs(Number(change)).toFixed(2) : Math.abs(Number(change)).toFixed(1) + '%'} vs previous</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <MetricBox label="Current" value={fmt(kpi.value, kpi.format)} color={atTarget ? 'emerald' : 'amber'} />
                    <MetricBox label="Target" value={fmt(kpi.target, kpi.format)} color="gray" />
                    <MetricBox label="Benchmark" value={fmt(kpi.benchmark, kpi.format)} color="brand" />
                </div>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="period" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                            <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" />
                            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => [fmt(v, kpi.format), kpi.label]} />
                            <ReferenceLine y={kpi.target} stroke="#059669" strokeDasharray="4 4" label={{ value: 'Target', fontSize: 10, fill: '#059669' }} />
                            <Line type="monotone" dataKey="value" stroke="#4C4673" strokeWidth={2} dot={{ r: 5, fill: '#4C4673' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div><p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Breakdown</p><div className="p-3 rounded-lg bg-gray-50 border border-gray-100"><p className="text-sm text-brand-dark leading-relaxed">{kpi.detail}</p></div></div>
                <div><p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Trend Analysis</p><div className="p-3 rounded-lg bg-blue-50 border border-blue-200"><p className="text-sm text-blue-800 leading-relaxed">{kpi.trend}</p></div></div>
            </div>
        </div>
    )
}

function DeptDetailModal({ dept, onClose }) {
    const status = varianceStatus(dept.variance)
    const DeptIcon = dept.icon
    return (
        <div>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${Math.abs(dept.variance) > 5 ? 'bg-red-50 border-red-200' : Math.abs(dept.variance) > 3 ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-3"><DeptIcon className="w-5 h-5 text-brand-muted" /><div><h3 className="text-sm font-bold text-brand-dark">{dept.dept} -- Budget Detail</h3><p className="text-[11px] text-brand-muted">{CURRENT_PERIOD.month} | Variance: {dept.variance > 0 ? '+' : ''}{dept.variance}%</p></div></div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                    <MetricBox label="Budget" value={'$' + dept.budget.toLocaleString()} color="gray" />
                    <MetricBox label="Actual" value={'$' + dept.actual.toLocaleString()} color={dept.variance > 3 ? 'red' : dept.variance > 0 ? 'amber' : 'emerald'} />
                    <MetricBox label="Variance" value={(dept.variance > 0 ? '+' : '') + dept.variance + '%'} color={status.color} />
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Line Item Detail</p>
                    <div className="space-y-1">
                        {dept.items.map((item, i) => {
                            const itemVar = ((item.actual - item.budget) / item.budget * 100).toFixed(1)
                            return (
                                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                    <span className="text-xs text-brand-dark flex-1">{item.line}</span>
                                    <span className="text-[10px] text-brand-muted">${item.budget.toLocaleString()}</span>
                                    <span className="text-xs font-semibold text-brand-dark">${item.actual.toLocaleString()}</span>
                                    <span className={`text-[10px] font-bold w-10 text-right ${Number(itemVar) > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{Number(itemVar) > 0 ? '+' : ''}{itemVar}%</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Variance Explanation</p>
                    <div className={`p-3 rounded-lg border ${Math.abs(dept.variance) > 3 ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100'}`}>
                        <p className={`text-sm leading-relaxed ${Math.abs(dept.variance) > 3 ? 'text-amber-800' : 'text-brand-dark'}`}>{dept.notes}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CycleDetailModal({ cycle, onClose }) {
    return (
        <div>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${cycle.status === 'Current' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-3"><RefreshCcw className="w-5 h-5 text-brand-accent" /><div><h3 className="text-sm font-bold text-brand-dark">{cycle.cycle} -- ROI Breakdown</h3><p className="text-[11px] text-brand-muted">{cycle.period}</p></div></div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="text-center py-2"><p className="text-4xl font-bold text-brand-primary">{cycle.roi}%</p><p className="text-xs text-brand-muted mt-1">Return on Investment</p></div>
                <div className="grid grid-cols-2 gap-3">
                    <MetricBox label="Investment" value={'$' + cycle.investment.toLocaleString()} color="gray" />
                    <MetricBox label="Cost Savings" value={'$' + cycle.costSavings.toLocaleString()} color="emerald" />
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Savings Breakdown</p>
                    <div className="space-y-2">
                        {cycle.breakdown.map((b, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-200/50">
                                <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-brand-dark">{b.item}</p><p className="text-[10px] text-brand-muted">{b.description}</p></div>
                                <span className="text-sm font-bold text-emerald-600 flex-shrink-0">${b.saving.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <MetricBox label="Wellbeing" value={'+' + cycle.wellbeingGain + '%'} color="emerald" />
                    <MetricBox label="Incidents Avoided" value={String(cycle.incidentsAvoided)} color="brand" />
                    <MetricBox label="Family Sat." value={cycle.familySat + '%'} color="emerald" />
                </div>
                <div><p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Analysis</p><div className="p-3 rounded-lg bg-blue-50 border border-blue-200"><p className="text-sm text-blue-800 leading-relaxed">{cycle.details}</p></div></div>
            </div>
        </div>
    )
}

function ResidentCostModal({ resident, onClose }) {
    const diff = resident.dailyCost - Number(avgResidentCost)
    return (
        <div>
            <div className="px-6 py-4 border-b bg-gray-50 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3"><Users2 className="w-5 h-5 text-brand-accent" /><div><h3 className="text-sm font-bold text-brand-dark">{resident.name} -- Cost Detail</h3><p className="text-[11px] text-brand-muted">Room {resident.room} | Complexity: {resident.complexity}</p></div></div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="text-center py-2">
                    <p className="text-4xl font-bold text-brand-dark">${resident.dailyCost}</p>
                    <p className="text-xs text-brand-muted mt-1">per day</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                        {resident.trend === 'down' ? <ArrowDownRight className="w-4 h-4 text-emerald-500" /> : resident.trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-red-500" /> : <Minus className="w-4 h-4 text-gray-400" />}
                        <span className={`text-xs font-semibold ${resident.trend === 'down' ? 'text-emerald-600' : resident.trend === 'up' ? 'text-red-600' : 'text-gray-500'}`}>{resident.trend === 'down' ? 'Decreasing' : resident.trend === 'up' ? 'Increasing' : 'Stable'}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <MetricBox label="Monthly Est." value={'$' + (resident.dailyCost * 30).toLocaleString()} color="gray" />
                    <MetricBox label="Complexity" value={resident.complexity} color={resident.complexity === 'Very High' ? 'red' : resident.complexity === 'High' ? 'amber' : 'emerald'} />
                </div>
                <div><p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Cost Drivers</p><div className="p-3 rounded-lg bg-gray-50 border border-gray-100"><p className="text-sm text-brand-dark leading-relaxed">{resident.factors}</p></div></div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-blue-800 leading-relaxed">Facility average is ${avgResidentCost}/day. This resident is {diff > 0 ? '$' + diff.toFixed(2) + ' above' : '$' + Math.abs(diff).toFixed(2) + ' below'} average. Higher costs correlate with clinical complexity and specialized care needs.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MetricBox({ label, value, color }) {
    const colors = { emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700', amber: 'bg-amber-50 border-amber-200 text-amber-700', red: 'bg-red-50 border-red-200 text-red-700', gray: 'bg-gray-50 border-gray-200 text-gray-700', brand: 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary' }
    return (
        <div className={`p-3 rounded-xl border text-center ${colors[color] || colors.gray}`}>
            <p className="text-[10px] uppercase font-semibold tracking-wider opacity-70">{label}</p>
            <p className="text-lg font-bold mt-0.5">{value}</p>
        </div>
    )
}

function ProfileField({ icon: Icon, label, value, valueColor }) {
    return (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
            <Icon className="w-4 h-4 text-brand-muted flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
                <p className="text-[10px] text-brand-muted uppercase tracking-wider">{label}</p>
                <p className={'text-xs font-medium mt-0.5 ' + (valueColor || 'text-brand-dark')}>{value}</p>
            </div>
        </div>
    )
}

function ProfileEditModal({ profile, onClose, onSave }) {
    const [form, setForm] = useState({ ...profile })
    const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }))
    const fields = [
        { key: 'name', label: 'Full Name', type: 'text' }, { key: 'title', label: 'Title / Role', type: 'text' },
        { key: 'license', label: 'License Number', type: 'text' }, { key: 'specialization', label: 'Specialization', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' }, { key: 'phone', label: 'Phone', type: 'tel' },
        { key: 'office', label: 'Office Location', type: 'text' }, { key: 'institution', label: 'Institution', type: 'text' },
        { key: 'education', label: 'Education', type: 'text' }, { key: 'certifications', label: 'Certifications', type: 'text' },
        { key: 'shiftStart', label: 'Shift Start', type: 'time' }, { key: 'shiftEnd', label: 'Shift End', type: 'time' },
    ]
    return (
        <div>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-brand-light">
                <div className="flex items-center gap-3">
                    <Pencil className="w-5 h-5 text-brand-accent" />
                    <div><h3 className="text-sm font-bold text-brand-dark">Edit Profile</h3><p className="text-[11px] text-brand-muted">Update your personal and professional information</p></div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fields.map(f => (
                        <div key={f.key}>
                            <label className="block text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">{f.label}</label>
                            <input type={f.type} value={form[f.key] || ''} onChange={e => update(f.key, e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent text-brand-dark" />
                        </div>
                    ))}
                </div>
                <div>
                    <label className="block text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">Bio</label>
                    <textarea rows={3} value={form.bio || ''} onChange={e => update('bio', e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent resize-none text-brand-dark" />
                </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 text-brand-dark hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={() => onSave(form)} className="flex items-center gap-2 px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors"><Save className="w-4 h-4" /> Save Changes</button>
            </div>
        </div>
    )
}
