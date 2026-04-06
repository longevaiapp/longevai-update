import DashboardShell from '../components/DashboardShell'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    LineChart, Line, PieChart, Pie, Cell
} from 'recharts'
import {
    TrendingUp, Users2, Scale, RefreshCcw, DollarSign, AlertTriangle
} from 'lucide-react'

// ── MOCK DATA ──────────────────────────────────────────────
const PNL_DATA = [
    { month: 'Oct', revenue: 185000, costs: 162000 },
    { month: 'Nov', revenue: 188000, costs: 165000 },
    { month: 'Dec', revenue: 192000, costs: 170000 },
    { month: 'Jan', revenue: 195000, costs: 168000 },
    { month: 'Feb', revenue: 198000, costs: 172000 },
    { month: 'Mar', revenue: 202000, costs: 175000 },
]

const COST_BREAKDOWN = [
    { category: 'Clinical Staff', daily: 42.50, percent: 35 },
    { category: 'Nutrition / Kitchen', daily: 18.20, percent: 15 },
    { category: 'Therapy Services', daily: 14.50, percent: 12 },
    { category: 'Administrative', daily: 21.80, percent: 18 },
    { category: 'Facilities', daily: 24.30, percent: 20 },
]

const PIE_COLORS = ['#4C4673', '#6D8C8C', '#7A778C', '#8FAEAE', '#313D40']

const BUDGET_VS_ACTUAL = [
    { dept: 'Kitchen', budget: 18500, actual: 19200, variance: 3.8 },
    { dept: 'Clinical', budget: 45000, actual: 43800, variance: -2.7 },
    { dept: 'Therapy', budget: 15000, actual: 14800, variance: -1.3 },
    { dept: 'Admin', budget: 22000, actual: 23100, variance: 5.0 },
    { dept: 'Facilities', budget: 25000, actual: 24500, variance: -2.0 },
]

const CYCLE_ROI = [
    { cycle: 'Cycle 1 (Oct-Jan)', investment: 68000, wellbeingGain: 18, incidentsAvoided: 4, familySat: 88, roi: 12.4 },
    { cycle: 'Cycle 2 (Nov-Feb)', investment: 72000, wellbeingGain: 22, incidentsAvoided: 6, familySat: 91, roi: 15.2 },
    { cycle: 'Cycle 3 (Dec-Mar)', investment: 70000, wellbeingGain: 20, incidentsAvoided: 5, familySat: 89, roi: 13.8 },
]

const MARGIN_DATA = PNL_DATA.map(d => ({
    month: d.month,
    margin: ((d.revenue - d.costs) / d.revenue * 100).toFixed(1),
}))

const KPI_CARDS = [
    { label: 'Monthly Revenue', value: '$202,000', change: '+2.0%', positive: true },
    { label: 'Cost per Resident/Day', value: '$121.30', change: '-1.2%', positive: true },
    { label: 'Operating Margin', value: '13.4%', change: '+0.6%', positive: true },
    { label: 'Budget Variance', value: '+1.8%', change: 'Within tolerance', positive: true },
]

export default function FinanceDashboard() {
    return (
        <DashboardShell
            roleId="finance"
            roleTag="Finance & Accounting -- Monthly Closing"
            title="Financial Control & Efficiency Dashboard"
            tagline="Cost per resident, budget control, and ROI connecting financial efficiency to wellbeing outcomes."
            badges={['Monthly closing', 'Module 9 + all area costs']}
        >
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {KPI_CARDS.map((kpi, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                        <p className="text-[11px] text-brand-muted uppercase font-semibold tracking-wider">{kpi.label}</p>
                        <p className="text-2xl font-bold text-brand-dark mt-1">{kpi.value}</p>
                        <p className={`text-xs mt-0.5 ${kpi.positive ? 'text-emerald-600' : 'text-red-600'}`}>{kpi.change}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Monthly P&L */}
                <SectionCard title="Monthly P&L Dashboard" icon={TrendingUp}>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={PNL_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={v => [`$${v.toLocaleString()}`, '']} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                                <Bar dataKey="revenue" fill="#4C4673" radius={[4, 4, 0, 0]} name="Revenue" />
                                <Bar dataKey="costs" fill="#6D8C8C" radius={[4, 4, 0, 0]} name="Costs" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </SectionCard>

                {/* Cost per Resident */}
                <SectionCard title="Cost per Resident per Day" icon={Users2}>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={COST_BREAKDOWN}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    innerRadius={45}
                                    dataKey="daily"
                                    nameKey="category"
                                    label={({ category, percent }) => `${category} ${percent}%`}
                                    labelLine={false}
                                >
                                    {COST_BREAKDOWN.map((_, i) => (
                                        <Cell key={i} fill={PIE_COLORS[i]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`$${v.toFixed(2)}/day`, '']} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center">
                        {COST_BREAKDOWN.map((c, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[10px] text-brand-muted">
                                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: PIE_COLORS[i] }} />
                                {c.category}: ${c.daily}
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>

            {/* Budget vs Actual */}
            <SectionCard title="Budget vs. Actual by Department" icon={Scale}>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-3 font-semibold text-brand-muted">Department</th>
                                <th className="text-right py-2 px-3 font-semibold text-brand-muted">Budget</th>
                                <th className="text-right py-2 px-3 font-semibold text-brand-muted">Actual</th>
                                <th className="text-right py-2 px-3 font-semibold text-brand-muted">Variance</th>
                                <th className="text-center py-2 px-3 font-semibold text-brand-muted">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BUDGET_VS_ACTUAL.map((row, i) => (
                                <tr key={i} className={`border-b border-gray-50 ${row.variance > 5 ? 'bg-red-50/50' : ''}`}>
                                    <td className="py-2.5 px-3 font-medium text-brand-dark">{row.dept}</td>
                                    <td className="py-2.5 px-3 text-right text-brand-muted">${row.budget.toLocaleString()}</td>
                                    <td className="py-2.5 px-3 text-right font-semibold text-brand-dark">${row.actual.toLocaleString()}</td>
                                    <td className={`py-2.5 px-3 text-right font-semibold ${row.variance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                        {row.variance > 0 ? '+' : ''}{row.variance}%
                                    </td>
                                    <td className="py-2.5 px-3 text-center">
                                        <span className={`inline-block text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${Math.abs(row.variance) <= 5 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                            }`}>{Math.abs(row.variance) <= 5 ? 'OK' : 'Over'}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SectionCard>

            {/* 16-Week Cycle ROI */}
            <div className="mt-6">
                <SectionCard title="16-Week Cycle ROI Calculator" icon={RefreshCcw}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {CYCLE_ROI.map((c, i) => (
                            <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <h4 className="text-sm font-semibold text-brand-dark mb-3">{c.cycle}</h4>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-brand-muted">Investment</span>
                                        <span className="font-semibold text-brand-dark">${c.investment.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-brand-muted">Wellbeing Improvement</span>
                                        <span className="font-semibold text-emerald-600">+{c.wellbeingGain}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-brand-muted">Incidents Avoided</span>
                                        <span className="font-semibold text-brand-dark">{c.incidentsAvoided}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-brand-muted">Family Satisfaction</span>
                                        <span className="font-semibold text-brand-dark">{c.familySat}%</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                                        <span className="font-semibold text-brand-muted">ROI</span>
                                        <span className="text-lg font-bold text-brand-primary">{c.roi}%</span>
                                    </div>
                                </div>
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
