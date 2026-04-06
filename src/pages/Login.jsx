import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Leaf, Home } from 'lucide-react'
import { RoleIcon } from '../components/RoleIcons'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !password) {
            setError('Please fill in all fields')
            return
        }
        // Dummy auth — accept any credentials
        localStorage.setItem('longevai-auth', 'true')
        navigate('/hub')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-dark-deeper via-brand-dark to-brand-dark-deeper relative overflow-y-auto">
            {/* Background decoration */}
            <div className="fixed inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-brand-primary rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-accent rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mb-3">
                        <Leaf className="w-7 h-7 text-brand-accent-light" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Longev<span className="text-brand-primary-light">AI</span>
                    </h1>
                    <p className="text-white/50 text-sm mt-1">Amatista Life · Care Intelligence Platform</p>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                    {/* Login Card */}
                    <div className="bg-white/[0.07] backdrop-blur-xl rounded-2xl border border-white/10 p-7 shadow-2xl">
                        <h2 className="text-xl font-semibold text-white mb-1">Welcome back</h2>
                        <p className="text-white/40 text-sm mb-5">Sign in to access your dashboards</p>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg px-4 py-3 mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1.5">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                                    className="w-full px-4 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                                    placeholder="you@amatista.life"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1.5">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setError('') }}
                                        className="w-full px-4 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors pr-12"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-white/40 cursor-pointer">
                                    <input type="checkbox" className="rounded border-white/20 bg-white/10 text-brand-accent focus:ring-brand-accent" />
                                    Remember me
                                </label>
                                <button type="button" className="text-brand-accent-light hover:text-brand-light transition-colors">
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-brand-accent to-brand-dark hover:from-brand-accent-light hover:to-brand-accent-dark text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-brand-accent/20 hover:shadow-brand-accent/30"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>

                    {/* Quick Access — Dev Mode */}
                    <div className="bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                        <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">Quick Access · Dev Mode</p>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { id: 'gerontologist', label: 'Gerontologist' },
                                { id: 'geriatrician', label: 'Geriatrician' },
                                { id: 'family-doctor', label: 'Family Doctor' },
                                { id: 'psychologist', label: 'Psychologist' },
                                { id: 'physiotherapist', label: 'Physiotherapist' },
                                { id: 'nutritionist', label: 'Nutritionist' },
                                { id: 'chef', label: 'Chef' },
                                { id: 'nursing', label: 'Nursing' },
                                { id: 'ceo', label: 'CEO Executive' },
                                { id: 'finance', label: 'Finance' },
                                { id: 'family', label: 'Family Portal' },
                            ].map((d) => (
                                <button
                                    key={d.id}
                                    onClick={() => {
                                        localStorage.setItem('longevai-auth', 'true')
                                        navigate(`/dashboard/${d.id}`)
                                    }}
                                    className="flex items-center gap-2 px-3 py-2 bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/20 rounded-lg text-left text-sm text-white/60 hover:text-white transition-all"
                                >
                                    <RoleIcon roleId={d.id} size={16} className="flex-shrink-0" />
                                    <span className="truncate">{d.label}</span>
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    localStorage.setItem('longevai-auth', 'true')
                                    navigate('/hub')
                                }}
                                className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 bg-brand-accent/20 hover:bg-brand-accent/30 border border-brand-accent/30 rounded-lg text-sm text-brand-accent-light hover:text-white transition-all"
                            >
                                <Home className="w-4 h-4" /> Dashboard Hub
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-center text-white/20 text-xs mt-6">
                    LongevAI v2.0 · © 2025 Amatista Life
                </p>
            </div>
        </div>
    )
}
