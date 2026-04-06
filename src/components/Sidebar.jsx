import {
  LayoutDashboard, Users, Stethoscope, ClipboardList, Bell,
  BookOpen, Brain, FileText, Sparkles, ChevronLeft, ChevronRight,
  Settings, Heart
} from 'lucide-react'

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { id: 'executive', label: 'Executive Dashboard', icon: LayoutDashboard },
      { id: 'operations', label: 'Operations', icon: ClipboardList, badge: '3' },
      { id: 'alerts', label: 'Alerts', icon: Bell, badge: '7', badgeColor: 'bg-rose-500' },
    ]
  },
  {
    label: 'Clinical Care',
    items: [
      { id: 'residents', label: 'Residents 360°', icon: Users },
      { id: 'multispec', label: 'Multi-Specialist', icon: Stethoscope, aiBadge: true },
      { id: 'programs', label: 'Care Plans', icon: BookOpen },
    ]
  },
  {
    label: 'Intelligence',
    items: [
      { id: 'insights', label: 'Clinical Insights', icon: Brain },
      { id: 'reports', label: 'Reports', icon: FileText },
    ]
  }
]

const SEGMENTS = [
  { id: 'geri', label: 'Geriatric' },
  { id: 'clinic', label: 'Clinic' },
  { id: 'wellness', label: 'Wellness' },
]

export default function Sidebar({ collapsed, onToggle, currentPage, onNavigate, segment, onSegmentChange, onOpenCopilot }) {
  return (
    <nav
      className={`${collapsed ? 'w-[72px]' : 'w-[260px]'} h-screen flex flex-col flex-shrink-0 
        bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 
        transition-all duration-300 ease-in-out relative z-50`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
          <Heart className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-bold text-white tracking-tight">
              Longev<span className="text-teal-300">AI</span>
            </h1>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Intelligent Care</p>
          </div>
        )}
      </div>

      {/* Segment Switcher */}
      {!collapsed && (
        <div className="mx-3 mt-3 flex bg-white/[0.07] rounded-lg p-0.5 border border-white/10">
          {SEGMENTS.map(seg => (
            <button
              key={seg.id}
              onClick={() => onSegmentChange(seg.id)}
              className={`flex-1 py-1.5 text-[11px] font-medium rounded-md transition-all duration-200
                ${segment === seg.id
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/50 hover:text-white/70'
                }`}
            >
              {seg.label}
            </button>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2 space-y-1">
        {NAV_GROUPS.map(group => (
          <div key={group.label} className="mt-4 first:mt-2">
            {!collapsed && (
              <p className="px-4 mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/30">
                {group.label}
              </p>
            )}
            {group.items.map(item => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 mx-0 transition-all duration-150 relative group
                    ${collapsed ? 'justify-center' : ''}
                    ${isActive
                      ? 'bg-white/[0.12] text-white'
                      : 'text-white/60 hover:bg-white/[0.06] hover:text-white/90'
                    }`}
                  title={collapsed ? item.label : undefined}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-teal-400 rounded-r-full" />
                  )}
                  <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-teal-300' : ''}`} />
                  {!collapsed && (
                    <>
                      <span className="text-[13px] font-medium truncate">{item.label}</span>
                      {item.badge && (
                        <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-white/20'} text-white`}>
                          {item.badge}
                        </span>
                      )}
                      {item.aiBadge && (
                        <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/40 text-indigo-200 border border-indigo-400/30">
                          AI
                        </span>
                      )}
                    </>
                  )}
                  {/* Tooltip for collapsed */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded-lg 
                      opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] shadow-xl">
                      {item.label}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        ))}

        {/* AI Copilot Button */}
        <div className="mt-4 px-3">
          <button
            onClick={onOpenCopilot}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl 
              bg-gradient-to-r from-indigo-600/30 to-teal-600/30 
              border border-indigo-400/20 hover:border-indigo-400/40
              text-white/80 hover:text-white transition-all duration-200 group
              ${collapsed ? 'justify-center' : ''}`}
          >
            <Sparkles className="w-[18px] h-[18px] text-indigo-300 group-hover:text-teal-300 transition-colors" />
            {!collapsed && <span className="text-[13px] font-medium">AI Copilot</span>}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
              DG
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-white/90 font-medium truncate">Dra. García</p>
              <p className="text-[10px] text-white/40">Chief Gerontologist</p>
            </div>
            <Settings className="w-4 h-4 text-white/30 hover:text-white/60" />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-[11px] font-bold text-white cursor-pointer">
              DG
            </div>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center
          hover:bg-slate-50 hover:shadow-lg transition-all duration-200 z-[60]"
      >
        {collapsed
          ? <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          : <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
        }
      </button>
    </nav>
  )
}
