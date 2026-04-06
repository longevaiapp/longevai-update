import DashboardShell from '../components/DashboardShell'
import {
    UtensilsCrossed, Package, AlertTriangle, MessageSquare, Receipt,
    Circle, CheckCircle2, Clock
} from 'lucide-react'

// ── MOCK DATA ──────────────────────────────────────────────
const SERVICE_LIST = [
    { resident: 'Elena Rodriguez', room: '101', meal: 'Grilled chicken with quinoa', allergens: [], texture: 'Normal', portion: 'Standard' },
    { resident: 'Carlos Mendez', room: '102', meal: 'Pasta primavera (dairy-free)', allergens: ['Dairy'], texture: 'Normal', portion: 'Standard' },
    { resident: 'Maria Silva', room: '103', meal: 'Baked salmon with vegetables', allergens: [], texture: 'Soft', portion: 'Small' },
    { resident: 'Jorge Navarro', room: '104', meal: 'Lentil stew', allergens: [], texture: 'Normal', portion: 'Large' },
    { resident: 'Ana Torres', room: '105', meal: 'Turkey wrap (nut-free)', allergens: ['Nuts'], texture: 'Normal', portion: 'Standard' },
    { resident: 'Roberto Diaz', room: '106', meal: 'Vegetable risotto (no shellfish)', allergens: ['Shellfish'], texture: 'Normal', portion: 'Standard' },
    { resident: 'Isabel Moreno', room: '107', meal: 'Chicken soup', allergens: [], texture: 'Pureed', portion: 'Standard' },
    { resident: 'Fernando Lopez', room: '108', meal: 'Beef stew with potatoes', allergens: [], texture: 'Normal', portion: 'Standard' },
]

const INVENTORY = [
    { item: 'Chicken breast', stock: 8, unit: 'kg', threshold: 5, status: 'adequate' },
    { item: 'Salmon fillet', stock: 3, unit: 'kg', threshold: 4, status: 'low' },
    { item: 'Brown rice', stock: 12, unit: 'kg', threshold: 5, status: 'adequate' },
    { item: 'Fresh vegetables', stock: 6, unit: 'kg', threshold: 10, status: 'low' },
    { item: 'Olive oil', stock: 4, unit: 'L', threshold: 2, status: 'adequate' },
    { item: 'Pasta', stock: 8, unit: 'kg', threshold: 3, status: 'adequate' },
    { item: 'Lactose-free milk', stock: 1, unit: 'L', threshold: 4, status: 'critical' },
    { item: 'Eggs', stock: 36, unit: 'pcs', threshold: 24, status: 'adequate' },
    { item: 'Bread', stock: 5, unit: 'loaves', threshold: 10, status: 'low' },
]

const ALLERGEN_ALERTS = [
    { resident: 'Carlos Mendez', room: '102', allergen: 'Dairy', dish: 'Pasta primavera -- Uses dairy-free sauce', confirmed: false },
    { resident: 'Ana Torres', room: '105', allergen: 'Tree nuts', dish: 'Turkey wrap -- Verified nut-free', confirmed: true },
    { resident: 'Roberto Diaz', room: '106', allergen: 'Shellfish', dish: 'Vegetable risotto -- No shellfish ingredients', confirmed: true },
]

const YESTERDAY_FEEDBACK = [
    { dish: 'Chicken & Rice', service: 'Lunch', rejection: 5, feedback: 'Well received. Clean plates.', sentiment: 'positive' },
    { dish: 'Vegetable Soup', service: 'Dinner', rejection: 22, feedback: 'Two complaints about salt level. Consider reducing.', sentiment: 'negative' },
    { dish: 'Oatmeal', service: 'Breakfast', rejection: 8, feedback: 'Standard reception. One request for honey option.', sentiment: 'neutral' },
]

const PURCHASE_LOG = [
    { date: 'Apr 5', supplier: 'Fresh Farms Co.', items: 'Vegetables, Fruits', qty: '25 kg', cost: '$148.50', match: true },
    { date: 'Apr 4', supplier: 'Pacific Seafood', items: 'Salmon, Shrimp', qty: '8 kg', cost: '$96.00', match: false },
    { date: 'Apr 3', supplier: 'Valley Dairy', items: 'Milk, Eggs, Cheese', qty: 'Assorted', cost: '$72.30', match: true },
    { date: 'Apr 2', supplier: 'Baker Bros', items: 'Bread, Rolls', qty: '30 loaves', cost: '$45.00', match: true },
]

const STOCK_COLORS = {
    adequate: 'text-emerald-600',
    low: 'text-amber-600',
    critical: 'text-red-600',
}

export default function ChefDashboard() {
    return (
        <DashboardShell
            roleId="chef"
            roleTag="Chef -- Daily Kitchen Operations"
            title="Kitchen Execution & Inventory Dashboard"
            tagline="Fast, visual, action-oriented. What to prepare, for whom, with allergen flags, and stock status."
            badges={['Updated: Real-time / Daily', 'Module 7']}
        >
            {/* Allergen Alert Panel -- top priority */}
            <div className={`rounded-2xl border-2 p-4 mb-6 ${ALLERGEN_ALERTS.some(a => !a.confirmed) ? 'border-red-300 bg-red-50' : 'border-emerald-300 bg-emerald-50'
                }`}>
                <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className={`w-5 h-5 ${ALLERGEN_ALERTS.some(a => !a.confirmed) ? 'text-red-600' : 'text-emerald-600'}`} />
                    <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider">Allergen Alert Panel</h3>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ml-auto ${ALLERGEN_ALERTS.some(a => !a.confirmed) ? 'bg-red-200 text-red-700' : 'bg-emerald-200 text-emerald-700'
                        }`}>{ALLERGEN_ALERTS.some(a => !a.confirmed) ? 'Action Required' : 'All Confirmed'}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {ALLERGEN_ALERTS.map((a, i) => (
                        <div key={i} className={`p-3 rounded-xl border ${a.confirmed ? 'border-emerald-200 bg-white' : 'border-red-200 bg-white'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-bold text-brand-dark">{a.resident}</span>
                                <span className="text-[10px] text-brand-muted">Rm {a.room}</span>
                            </div>
                            <p className="text-xs text-red-600 font-semibold mb-1">Allergen: {a.allergen}</p>
                            <p className="text-xs text-brand-muted">{a.dish}</p>
                            <div className="mt-2">
                                {a.confirmed ? (
                                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Chef confirmed
                                    </span>
                                ) : (
                                    <button className="flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-100 px-2 py-1 rounded hover:bg-red-200 transition-colors">
                                        <Clock className="w-3 h-3" /> Confirm before service
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Today's Service List */}
            <SectionCard title="Today's Service List -- Lunch" icon={UtensilsCrossed} subtitle="Per-resident meal assignments with flags">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-3 font-semibold text-brand-muted">Resident</th>
                                <th className="text-left py-2 px-3 font-semibold text-brand-muted">Room</th>
                                <th className="text-left py-2 px-3 font-semibold text-brand-muted">Meal</th>
                                <th className="text-center py-2 px-3 font-semibold text-brand-muted">Allergens</th>
                                <th className="text-center py-2 px-3 font-semibold text-brand-muted">Texture</th>
                                <th className="text-center py-2 px-3 font-semibold text-brand-muted">Portion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SERVICE_LIST.map((r, i) => (
                                <tr key={i} className={`border-b border-gray-50 ${r.allergens.length > 0 ? 'bg-red-50/30' : 'hover:bg-gray-50'}`}>
                                    <td className="py-2 px-3 font-medium text-brand-dark">{r.resident}</td>
                                    <td className="py-2 px-3 text-brand-muted">{r.room}</td>
                                    <td className="py-2 px-3 text-brand-dark">{r.meal}</td>
                                    <td className="py-2 px-3 text-center">
                                        {r.allergens.length > 0 ? (
                                            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
                                                {r.allergens.join(', ')}
                                            </span>
                                        ) : <span className="text-brand-muted">--</span>}
                                    </td>
                                    <td className="py-2 px-3 text-center">
                                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${r.texture === 'Pureed' ? 'bg-purple-100 text-purple-700' :
                                                r.texture === 'Soft' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-600'
                                            }`}>{r.texture}</span>
                                    </td>
                                    <td className="py-2 px-3 text-center text-brand-muted">{r.portion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SectionCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Inventory */}
                <SectionCard title="Real-Time Inventory Panel" icon={Package} subtitle="Stock levels for key ingredients">
                    <div className="space-y-1.5">
                        {INVENTORY.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                <Circle className={`w-2.5 h-2.5 fill-current flex-shrink-0 ${item.status === 'adequate' ? 'text-emerald-500' :
                                        item.status === 'low' ? 'text-amber-500' : 'text-red-500'
                                    }`} />
                                <span className="text-sm font-medium text-brand-dark flex-1">{item.item}</span>
                                <span className={`text-sm font-bold ${STOCK_COLORS[item.status]}`}>{item.stock} {item.unit}</span>
                                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${item.status === 'adequate' ? 'bg-emerald-100 text-emerald-700' :
                                        item.status === 'low' ? 'bg-amber-100 text-amber-700' :
                                            'bg-red-100 text-red-700'
                                    }`}>{item.status}</span>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* Feedback from Yesterday */}
                <SectionCard title="Feedback from Yesterday" icon={MessageSquare} subtitle="Plate returns, complaints, positive reactions">
                    <div className="space-y-2">
                        {YESTERDAY_FEEDBACK.map((f, i) => (
                            <div key={i} className={`p-3 rounded-xl border ${f.sentiment === 'positive' ? 'border-emerald-100 bg-emerald-50/50' :
                                    f.sentiment === 'negative' ? 'border-red-100 bg-red-50/50' :
                                        'border-gray-100 bg-gray-50'
                                }`}>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-semibold text-brand-dark">{f.dish}</span>
                                    <span className="text-[10px] text-brand-muted">{f.service}</span>
                                    <span className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded ${f.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-700' :
                                            f.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                                                'bg-gray-100 text-gray-600'
                                        }`}>Rejection: {f.rejection}%</span>
                                </div>
                                <p className="text-xs text-brand-muted">{f.feedback}</p>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>

            {/* Purchase Tickets */}
            <div className="mt-6">
                <SectionCard title="Purchase Tickets Log" icon={Receipt} subtitle="Supplier deliveries and cost tracking">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 px-3 font-semibold text-brand-muted">Date</th>
                                    <th className="text-left py-2 px-3 font-semibold text-brand-muted">Supplier</th>
                                    <th className="text-left py-2 px-3 font-semibold text-brand-muted">Items</th>
                                    <th className="text-center py-2 px-3 font-semibold text-brand-muted">Qty</th>
                                    <th className="text-right py-2 px-3 font-semibold text-brand-muted">Cost</th>
                                    <th className="text-center py-2 px-3 font-semibold text-brand-muted">Order Match</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PURCHASE_LOG.map((p, i) => (
                                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="py-2 px-3 text-brand-muted">{p.date}</td>
                                        <td className="py-2 px-3 font-medium text-brand-dark">{p.supplier}</td>
                                        <td className="py-2 px-3 text-brand-muted">{p.items}</td>
                                        <td className="py-2 px-3 text-center text-brand-muted">{p.qty}</td>
                                        <td className="py-2 px-3 text-right font-semibold text-brand-dark">{p.cost}</td>
                                        <td className="py-2 px-3 text-center">
                                            {p.match ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                                            ) : (
                                                <AlertTriangle className="w-4 h-4 text-amber-500 mx-auto" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
