import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, Construction } from 'lucide-react'
import { RoleIcon } from '../components/RoleIcons'

const DASHBOARD_INFO = {
    nutritionist: { label: 'Nutritionist Dashboard', subtitle: 'Smart Nutrition Control Panel', accent: '#3A8048', bg: '#E8F5E0' },
    chef: { label: 'Chef Dashboard', subtitle: 'Kitchen Execution & Inventory Dashboard', accent: '#B86848', bg: '#F5E4D4' },
    nursing: { label: 'Nursing Supervisor Dashboard', subtitle: 'Shift Operations & Daily Care Dashboard', accent: '#4A7FA8', bg: '#E0EEF8' },
    finance: { label: 'Finance & Admin Dashboard', subtitle: 'Financial Control & Efficiency Dashboard', accent: '#3A6E4A', bg: '#E8F2E4' },
    family: { label: 'Family Wellbeing Portal', subtitle: "Your Loved One's Wellbeing Portal", accent: '#E8A84A', bg: '#FBF5E4' },
}

export default function DummyDashboard() {
    const { dashboardId } = useParams()
    const navigate = useNavigate()
    const info = DASHBOARD_INFO[dashboardId]

    if (!info) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/30">
                <div className="text-center">
                    <p className="text-2xl text-slate-500">Dashboard not found</p>
                    <button onClick={() => navigate('/hub')} className="mt-4 text-indigo-600 hover:underline">
                        ← Back to Hub
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/30">
            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-700/50 shadow-lg shadow-slate-900/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-xl shadow-lg shadow-indigo-500/20">
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight">
                                Longev<span className="text-teal-300">AI</span>
                            </h1>
                            <p className="text-white/40 text-xs">Amatista Life · Care Intelligence Platform</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/hub')}
                        className="flex items-center gap-2 px-4 py-2 bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 rounded-xl text-white/60 hover:text-white text-sm transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Hub
                    </button>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="bg-white rounded-3xl shadow-lg border border-slate-200/80 overflow-hidden">
                    {/* Accent bar */}
                    <div className="h-2" style={{ backgroundColor: info.accent }} />

                    <div className="p-12 text-center">
                        <div className="mb-6 flex justify-center">
                            <RoleIcon roleId={dashboardId} size={64} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome to the</h2>
                        <h3 className="text-2xl font-bold mb-3" style={{ color: info.accent }}>{info.label}</h3>
                        <p className="text-slate-500 text-lg mb-8">{info.subtitle}</p>

                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium" style={{ backgroundColor: info.bg, color: info.accent }}>
                            <Construction size={16} /> This dashboard is under development
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
