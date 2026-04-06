import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    LineChart, Line
} from 'recharts'
import {
    ClipboardList, ShieldCheck, BarChart3, MessageSquare, Scale, ShoppingCart,
    ChevronDown, UserCheck, Circle, CheckCircle2, AlertTriangle, Clock
} from 'lucide-react'

// ── MOCK DATA ──────────────────────────────────────────────
const RESIDENTS_LIST = [
    { id: 1, name: 'Elena Rodriguez', room: '101' },
    { id: 2, name: 'Carlos Mendez', room: '102' },
    { id: 3, name: 'Maria Silva', room: '103' },
    { id: 4, name: 'Jorge Navarro', room: '104' },
]

const MENU_MATRIX = [
    { resident: 'Elena Rodriguez', breakfast: 'validated', lunch: 'validated', dinner: 'pending', snacks: 'validated' },
    { resident: 'Carlos Mendez', breakfast: 'validated', lunch: 'conflict', dinner: 'validated', snacks: 'validated' },
    { resident: 'Maria Silva', breakfast: 'validated', lunch: 'validated', dinner: 'validated', snacks: 'pending' },
    { resident: 'Jorge Navarro', breakfast: 'validated', lunch: 'validated', dinner: 'validated', snacks: 'validated' },
    { resident: 'Ana Torres', breakfast: 'pending', lunch: 'validated', dinner: 'validated', snacks: 'validated' },
    { resident: 'Roberto Diaz', breakfast: 'validated', lunch: 'validated', dinner: 'conflict', snacks: 'validated' },
]

const RESTRICTIONS = [
    { resident: 'Carlos Mendez', item: 'Lunch: Pasta Carbonara', allergen: 'Dairy (Lactose intolerant)', severity: 'critical', status: 'flagged' },
    { resident: 'Roberto Diaz', item: 'Dinner: Shrimp Stir-fry', allergen: 'Shellfish allergy', severity: 'critical', status: 'flagged' },
    { resident: 'Ana Torres', item: 'Breakfast: Granola w/ Nuts', allergen: 'Tree nut allergy', severity: 'critical', status: 'resolved' },
]

const ADHERENCE_DATA = [
    { resident: 'Elena Rodriguez', adherence: 92 },
    { resident: 'Carlos Mendez', adherence: 78 },
    { resident: 'Maria Silva', adherence: 88 },
    { resident: 'Jorge Navarro', adherence: 95 },
    { resident: 'Ana Torres', adherence: 72 },
    { resident: 'Roberto Diaz', adherence: 85 },
]

const FEEDBACK_LOG = [
    { date: 'Apr 5', meal: 'Lunch', dish: 'Chicken & Rice', feedback: 'Well received. All plates returned clean.', type: 'positive' },
    { date: 'Apr 5', meal: 'Dinner', dish: 'Vegetable Soup', feedback: 'Two residents found it too salty. Adjust seasoning.', type: 'negative' },
    { date: 'Apr 4', meal: 'Lunch', dish: 'Fish Tacos', feedback: 'Maria loved the new recipe. Others indifferent.', type: 'neutral' },
    { date: 'Apr 4', meal: 'Breakfast', dish: 'Oatmeal', feedback: 'Jorge requested fruit topping option.', type: 'request' },
    { date: 'Apr 3', meal: 'Dinner', dish: 'Beef Stew', feedback: 'Widely enjoyed. Third time requested.', type: 'positive' },
]

const WEIGHT_DATA = [
    { week: 'W1', weight: 68.2, bmi: 24.1, appetite: 7 },
    { week: 'W4', weight: 68.0, bmi: 24.0, appetite: 7 },
    { week: 'W8', weight: 67.8, bmi: 23.9, appetite: 8 },
    { week: 'W12', weight: 68.1, bmi: 24.0, appetite: 8 },
    { week: 'W16', weight: 68.3, bmi: 24.1, appetite: 9 },
]

const SHOPPING_LIST = [
    { item: 'Chicken breast', qty: '12 kg', category: 'Protein', status: 'needed' },
    { item: 'Brown rice', qty: '8 kg', category: 'Grain', status: 'needed' },
    { item: 'Fresh vegetables (assorted)', qty: '15 kg', category: 'Produce', status: 'needed' },
    { item: 'Olive oil', qty: '3 L', category: 'Pantry', status: 'stocked' },
    { item: 'Lactose-free milk', qty: '6 L', category: 'Dairy alt.', status: 'needed' },
    { item: 'Fresh fruit', qty: '10 kg', category: 'Produce', status: 'needed' },
    { item: 'Whole wheat bread', qty: '20 loaves', category: 'Bakery', status: 'stocked' },
]

const CELL_STATUS = {
    validated: { color: 'bg-emerald-100 text-emerald-700', label: 'OK' },
    pending: { color: 'bg-amber-100 text-amber-700', label: 'Pending' },
    conflict: { color: 'bg-red-100 text-red-700', label: 'Conflict' },
}

export default function NutritionistDashboard() {
    const [selectedResident, setSelectedResident] = useState(RESIDENTS_LIST[0])

    return (
        <DashboardShell
            roleId="nutritionist"
            roleTag="Nutritionist -- Daily Monitoring"
            title="Smart Nutrition Control Panel"
            tagline="Complete control over dietary plans with automated cross-validation, real-time feedback, and trend data."
            badges={['Daily input', 'Weekly review', 'Module 7']}
        >
            {/* Active Menu Matrix */}
            <SectionCard title="Active Menu Matrix" icon={ClipboardList} subtitle="Current week -- per resident, per meal">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-3 font-semibold text-brand-muted">Resident</th>
                                <th className="text-center py-2 px-3 font-semibold text-brand-muted">Breakfast</th>
                                <th className="text-center py-2 px-3 font-semibold text-brand-muted">Lunch</th>
                                <th className="text-center py-2 px-3 font-semibold text-brand-muted">Dinner</th>
                                <th className="text-center py-2 px-3 font-semibold text-brand-muted">Snacks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MENU_MATRIX.map((row, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                                    <td className="py-2 px-3 font-medium text-brand-dark">{row.resident}</td>
                                    {['breakfast', 'lunch', 'dinner', 'snacks'].map(meal => {
                                        const st = CELL_STATUS[row[meal]]
                                        return (
                                            <td key={meal} className="py-2 px-3 text-center">
                                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${st.color}`}>{st.label}</span>
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SectionCard>

            {/* Restriction Cross-Validator */}
            <div className="mt-6">
                <SectionCard title="Restriction Cross-Validator" icon={ShieldCheck} subtitle="Zero-tolerance allergen and restriction check">
                    {RESTRICTIONS.length === 0 ? (
                        <div className="text-center py-6">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                            <p className="text-sm text-brand-muted">No restriction conflicts detected</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {RESTRICTIONS.map((r, i) => (
                                <div key={i} className={`p-3 rounded-xl border flex items-start gap-3 ${r.status === 'flagged' ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                                    }`}>
                                    {r.status === 'flagged' ? (
                                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-sm font-semibold text-brand-dark">{r.resident}</span>
                                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${r.status === 'flagged' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                                                }`}>{r.status}</span>
                                        </div>
                                        <p className="text-xs text-brand-muted">{r.item}</p>
                                        <p className="text-xs text-red-600 font-medium mt-0.5">Allergen: {r.allergen}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </SectionCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Meal Adherence */}
                <SectionCard title="Meal Adherence Tracker" icon={BarChart3} subtitle="% of prescribed menu consumed">
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ADHERENCE_DATA} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <YAxis type="category" dataKey="resident" tick={{ fontSize: 10 }} stroke="#9ca3af" width={100} />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`${v}%`, 'Adherence']} />
                                <Bar dataKey="adherence" fill="#4C4673" radius={[0, 6, 6, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-[10px] text-red-500 mt-2">Residents below 80% flagged for follow-up.</p>
                </SectionCard>

                {/* Post-Meal Feedback */}
                <SectionCard title="Post-Meal Feedback Log" icon={MessageSquare} subtitle="Daily qualitative notes from nursing and chef">
                    <div className="space-y-2 max-h-56 overflow-y-auto">
                        {FEEDBACK_LOG.map((f, i) => (
                            <div key={i} className={`p-2.5 rounded-lg border ${f.type === 'positive' ? 'border-emerald-100 bg-emerald-50/50' :
                                    f.type === 'negative' ? 'border-red-100 bg-red-50/50' :
                                        'border-gray-100 bg-gray-50'
                                }`}>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-[10px] font-semibold text-brand-muted">{f.date} -- {f.meal}</span>
                                    <span className="text-[10px] font-semibold text-brand-dark">{f.dish}</span>
                                </div>
                                <p className="text-xs text-brand-muted">{f.feedback}</p>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Nutritional Evolution */}
                <SectionCard title="Nutritional Evolution Charts" icon={Scale} subtitle="Weight, BMI, and appetite over cycle">
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={WEIGHT_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                <Legend wrapperStyle={{ fontSize: 11 }} />
                                <Line type="monotone" dataKey="weight" stroke="#4C4673" strokeWidth={2} name="Weight (kg)" dot={{ r: 3 }} />
                                <Line type="monotone" dataKey="bmi" stroke="#6D8C8C" strokeWidth={2} name="BMI" dot={{ r: 3 }} />
                                <Line type="monotone" dataKey="appetite" stroke="#E8A84A" strokeWidth={2} name="Appetite (/10)" dot={{ r: 3 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </SectionCard>

                {/* MRP Shopping List */}
                <SectionCard title="MRP Shopping List Generator" icon={ShoppingCart} subtitle="Optimized weekly list for kitchen">
                    <div className="space-y-1.5 max-h-48 overflow-y-auto">
                        {SHOPPING_LIST.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                <Circle className={`w-2.5 h-2.5 fill-current flex-shrink-0 ${item.status === 'stocked' ? 'text-emerald-500' : 'text-amber-500'
                                    }`} />
                                <span className="text-sm font-medium text-brand-dark flex-1">{item.item}</span>
                                <span className="text-xs text-brand-muted">{item.qty}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-brand-muted">{item.category}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-3 gap-2">
                        <button className="text-xs font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors px-3 py-1.5 border border-brand-primary/20 rounded-lg">
                            Export CSV
                        </button>
                        <button className="text-xs font-semibold text-white bg-brand-primary hover:bg-brand-primary-dark transition-colors px-3 py-1.5 rounded-lg">
                            Generate List
                        </button>
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
