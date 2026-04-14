import { Search, Menu, Sparkles, Bell, LogOut } from 'lucide-react'

const SEGMENT_LABELS = {
  geri: 'Geriatric Residence',
  clinic: 'Outpatient Clinic',
  wellness: 'Wellness Center',
}

export default function Header({ title, subtitle, segment, onToggleSidebar, onOpenCopilot, onLogout }) {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-700/50 flex items-center px-6 gap-4 flex-shrink-0 shadow-lg shadow-slate-900/20">
      <button onClick={onToggleSidebar} className="lg:hidden text-white/60 hover:text-white">
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1 min-w-0">
        <h1 className="text-[17px] font-bold text-white truncate">{title}</h1>
        <p className="text-[11px] text-white/40 truncate">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.07] border border-white/10 
          focus-within:border-indigo-500/50 focus-within:bg-white/10 transition-all w-56">
          <Search className="w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search resident, module…"
            className="bg-transparent text-[12px] text-white outline-none flex-1 placeholder:text-white/30"
          />
          <kbd className="text-[9px] text-white/20 bg-white/[0.08] px-1.5 py-0.5 rounded border border-white/10">⌘K</kbd>
        </div>

        {/* Segment label */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/10">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 pulse-dot" />
          <span className="text-[11px] text-white/60 font-medium">{SEGMENT_LABELS[segment]}</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg bg-white/[0.07] border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center">
            7
          </span>
        </button>

        {/* AI Copilot */}
        <button
          onClick={onOpenCopilot}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 
            text-white text-[12px] font-semibold hover:from-indigo-500 hover:to-indigo-400 
            transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        {/* Logout */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="p-2 rounded-lg bg-white/[0.07] border border-white/10 text-white/50 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  )
}
