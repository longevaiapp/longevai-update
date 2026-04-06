import { useNavigate } from 'react-router-dom'
import { Leaf, LogOut } from 'lucide-react'
import { RoleIcon } from '../components/RoleIcons'

const DASHBOARDS = [
    { id: 'gerontologist', label: 'Gerontologist', desc: 'Master Resident Overview', color: 'from-[#4A8C62] to-[#2D5A3D]', border: 'border-[#4A8C62]/30' },
    { id: 'geriatrician', label: 'Geriatrician', desc: '16-Week Integral Clinical Report', color: 'from-[#1A3A2A] to-[#2D5A3D]', border: 'border-[#1A3A2A]/30' },
    { id: 'family-doctor', label: 'Family Doctor', desc: 'Clinical Evolution Panel', color: 'from-[#C4545E] to-[#8E2030]', border: 'border-[#C4545E]/30' },
    { id: 'psychologist', label: 'Psychologist', desc: 'Emotional Monitoring & Therapeutic Progress', color: 'from-[#6A5CA8] to-[#4A3C88]', border: 'border-[#6A5CA8]/30' },
    { id: 'physiotherapist', label: 'Physiotherapist', desc: 'Functional Progress & Mobility Panel', color: 'from-[#4A7FA8] to-[#2A5F88]', border: 'border-[#4A7FA8]/30' },
    { id: 'nutritionist', label: 'Nutritionist', desc: 'Smart Nutrition Control Panel', color: 'from-[#3A8048] to-[#2A6038]', border: 'border-[#3A8048]/30' },
    { id: 'chef', label: 'Chef', desc: 'Kitchen Execution & Inventory Dashboard', color: 'from-[#B86848] to-[#8A4828]', border: 'border-[#B86848]/30' },
    { id: 'nursing', label: 'Nursing Supervisor', desc: 'Shift Operations & Daily Care Dashboard', color: 'from-[#4A7FA8] to-[#2A5F88]', border: 'border-[#4A7FA8]/30' },
    { id: 'ceo', label: 'CEO Executive', desc: 'Unified Executive Dashboard', color: 'from-[#C8923A] to-[#A8721A]', border: 'border-[#C8923A]/30' },
    { id: 'finance', label: 'Finance & Admin', desc: 'Financial Control & Efficiency Dashboard', color: 'from-[#3A6E4A] to-[#2A4E3A]', border: 'border-[#3A6E4A]/30' },
    { id: 'family', label: 'Family Portal', desc: "Your Loved One's Wellbeing Portal", color: 'from-[#E8A84A] to-[#C8882A]', border: 'border-[#E8A84A]/30' },
]

export default function DashboardHub() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('longevai-auth')
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-brand-light">
            {/* Header */}
            <header className="bg-brand-dark border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-xl">
                            <Leaf className="w-5 h-5 text-brand-accent-light" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight">
                                Longev<span className="text-brand-primary-light">AI</span>
                            </h1>
                            <p className="text-white/40 text-xs">Amatista Life · Care Intelligence Platform</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 rounded-xl text-white/60 hover:text-white text-sm transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-brand-dark">Dashboard Hub</h2>
                    <p className="text-brand-muted mt-1">Select a dashboard to view. Each role has a specialized view of the LongevAI system.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {DASHBOARDS.map((db) => (
                        <button
                            key={db.id}
                            onClick={() => navigate(`/dashboard/${db.id}`)}
                            className={`group relative bg-white rounded-2xl border ${db.border} p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden`}
                        >
                            {/* Gradient accent top bar */}
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${db.color}`} />

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50">
                                    <RoleIcon roleId={db.id} size={22} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">{db.label}</h3>
                                    <p className="text-sm text-brand-muted mt-1 line-clamp-2">{db.desc}</p>
                                </div>
                                <svg className="w-5 h-5 text-brand-muted/50 group-hover:text-brand-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
