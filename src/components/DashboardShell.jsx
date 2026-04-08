import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeft, Leaf, LogOut, Menu, X, Bell, Search, ChevronLeft, ChevronRight,
    LayoutDashboard, Users, AlertTriangle, Calendar, Mail, TrendingUp, ClipboardList,
    FileText, Pill, ShieldAlert, BarChart3, Users2, Download,
    HeartPulse, Microscope,
    Brain, TrendingDown, Flower2, BookOpen, Flame,
    Dumbbell, Target, CalendarDays,
    Home, UserCircle,
    Apple, UtensilsCrossed, ShoppingCart, MessageCircle, Star,
    Clock, Clipboard, UserCheck, Stethoscope,
    DollarSign, PieChart, Receipt, Calculator,
    Heart, Smile, Camera, Send, Shield,
    AlertCircle, Info, CheckCircle2
} from 'lucide-react'
import { RoleIcon } from './RoleIcons'

const ROLE_NAV = {
    gerontologist: {
        label: 'Gerontologist',
        groups: [
            {
                label: 'Overview', items: [
                    { id: 'residents', label: 'Resident Grid', icon: Users },
                    { id: 'alerts', label: 'Alert Feed', icon: AlertTriangle, badge: '2' },
                    { id: 'agenda', label: "Today's Agenda", icon: Calendar },
                ]
            },
            {
                label: 'Reports', items: [
                    { id: 'family-reports', label: 'Family Reports', icon: Mail },
                    { id: 'trends', label: 'Cohort Trends', icon: TrendingUp },
                    { id: 'briefing', label: 'Morning Briefing', icon: ClipboardList },
                ]
            },
            {
                label: 'Account', items: [
                    { id: 'profile', label: 'My Profile', icon: UserCircle },
                ]
            },
        ]
    },
    geriatrician: {
        label: 'Geriatrician',
        groups: [
            {
                label: 'Clinical', items: [
                    { id: 'overview', label: 'Cycle Overview', icon: LayoutDashboard },
                    { id: 'history', label: 'Clinical History', icon: FileText },
                    { id: 'medications', label: 'Medications', icon: Pill },
                ]
            },
            {
                label: 'Analysis', items: [
                    { id: 'risk', label: 'Risk Profile', icon: ShieldAlert },
                    { id: 'evolution', label: 'Evolution Charts', icon: BarChart3 },
                    { id: 'specialists', label: 'Specialist Inputs', icon: Users2 },
                    { id: 'reports', label: 'Cycle Report', icon: Download },
                ]
            },
            {
                label: 'Account', items: [
                    { id: 'profile', label: 'My Profile', icon: UserCircle },
                ]
            },
        ]
    },
    'family-doctor': {
        label: 'Family Doctor',
        groups: [
            {
                label: 'Clinical', items: [
                    { id: 'vitals', label: 'Vital Signs', icon: HeartPulse },
                    { id: 'medications', label: 'Medication Log', icon: Pill },
                    { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
                ]
            },
            {
                label: 'Review', items: [
                    { id: 'specialists', label: 'Specialist Reports', icon: Microscope },
                    { id: 'kpis', label: 'Clinical KPIs', icon: BarChart3 },
                    { id: 'weekly-review', label: 'Weekly Review', icon: ClipboardList },
                ]
            },
            {
                label: 'Account', items: [
                    { id: 'profile', label: 'My Profile', icon: UserCircle },
                ]
            },
        ]
    },
    psychologist: {
        label: 'Psychologist',
        groups: [
            {
                label: 'Assessment', items: [
                    { id: 'risk', label: 'Risk Status', icon: ShieldAlert },
                    { id: 'gds', label: 'GDS Trajectory', icon: TrendingDown },
                    { id: 'whoqol', label: 'WHOQOL Score', icon: Flower2 },
                ]
            },
            {
                label: 'Therapy', items: [
                    { id: 'sessions', label: 'Session Log', icon: BookOpen },
                    { id: 'thanatology', label: 'Thanatological', icon: Flame },
                    { id: 'calendar', label: 'Calendar', icon: Calendar },
                ]
            },
            {
                label: 'Account', items: [
                    { id: 'profile', label: 'My Profile', icon: UserCircle },
                ]
            },
        ]
    },
    physiotherapist: {
        label: 'Physiotherapist',
        groups: [
            {
                label: 'Mobility', items: [
                    { id: 'scores', label: 'Mobility Scores', icon: TrendingUp },
                    { id: 'targets', label: 'Improvement Targets', icon: Target },
                    { id: 'falls', label: 'Falls Log', icon: AlertTriangle },
                ]
            },
            {
                label: 'Routine', items: [
                    { id: 'routine', label: 'Exercise Routine', icon: Dumbbell },
                    { id: 'adherence', label: 'Adherence', icon: BarChart3 },
                ]
            },
        ]
    },
    nutritionist: {
        label: 'Nutritionist',
        groups: [
            {
                label: 'Nutrition', items: [
                    { id: 'menu', label: 'Menu Matrix', icon: Apple },
                    { id: 'restrictions', label: 'Restriction Validator', icon: ShieldAlert },
                    { id: 'adherence', label: 'Meal Adherence', icon: BarChart3 },
                ]
            },
            {
                label: 'Tracking', items: [
                    { id: 'feedback', label: 'Meal Feedback', icon: MessageCircle },
                    { id: 'evolution', label: 'Nutritional Evolution', icon: TrendingUp },
                    { id: 'shopping', label: 'Shopping List', icon: ShoppingCart },
                ]
            },
        ]
    },
    chef: {
        label: 'Chef',
        groups: [
            {
                label: 'Kitchen', items: [
                    { id: 'allergens', label: 'Allergen Alerts', icon: AlertTriangle, badge: '!' },
                    { id: 'service', label: "Today's Service", icon: UtensilsCrossed },
                    { id: 'inventory', label: 'Inventory', icon: ClipboardList },
                ]
            },
            {
                label: 'Feedback', items: [
                    { id: 'feedback', label: 'Meal Feedback', icon: Star },
                    { id: 'purchases', label: 'Purchase Log', icon: Receipt },
                ]
            },
        ]
    },
    nursing: {
        label: 'Nursing',
        groups: [
            {
                label: 'Shift', items: [
                    { id: 'briefing', label: 'Shift Briefing', icon: Clipboard },
                    { id: 'log', label: 'Shift Log', icon: FileText },
                    { id: 'meals', label: 'Meal Validation', icon: UserCheck },
                ]
            },
            {
                label: 'Operations', items: [
                    { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
                    { id: 'roster', label: 'Staff Roster', icon: Users },
                    { id: 'instructions', label: 'Specialist Orders', icon: Stethoscope },
                ]
            },
        ]
    },
    finance: {
        label: 'Finance & Admin',
        groups: [
            {
                label: 'Financial', items: [
                    { id: 'kpis', label: 'KPI Overview', icon: DollarSign },
                    { id: 'pl', label: 'P&L Statement', icon: BarChart3 },
                    { id: 'cost', label: 'Cost per Resident', icon: PieChart },
                ]
            },
            {
                label: 'Planning', items: [
                    { id: 'budget', label: 'Budget vs Actual', icon: Calculator },
                    { id: 'roi', label: 'Cycle ROI', icon: TrendingUp },
                ]
            },
        ]
    },
    family: {
        label: 'Family Portal',
        groups: [
            {
                label: 'Wellbeing', items: [
                    { id: 'overview', label: 'Wellbeing Overview', icon: Heart },
                    { id: 'highlights', label: 'Weekly Highlights', icon: Star },
                    { id: 'report', label: 'Monthly Report', icon: FileText },
                ]
            },
            {
                label: 'Connect', items: [
                    { id: 'gallery', label: 'Moments Gallery', icon: Camera },
                    { id: 'visits', label: 'Visit Scheduler', icon: Calendar },
                    { id: 'message', label: 'Message Team', icon: Send },
                ]
            },
        ]
    },
}

export default function DashboardShell({ roleId, roleTag, title, tagline, children, badges = [], activeSection, onSectionChange, notifications = [] }) {
    const navigate = useNavigate()
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [notifOpen, setNotifOpen] = useState(false)
    const [dismissedNotifs, setDismissedNotifs] = useState([])

    const activeNotifications = notifications.filter(n => !dismissedNotifs.includes(n.id))
    const notifCount = activeNotifications.length

    const roleNav = ROLE_NAV[roleId]

    // Default to the first nav item if no activeSection is provided
    const allNavIds = roleNav?.groups.flatMap(g => g.items.map(i => i.id)) || []
    const currentSection = activeSection || allNavIds[0] || ''

    const handleLogout = () => {
        localStorage.removeItem('longevai-auth')
        navigate('/login')
    }

    return (
        <div className="flex h-screen overflow-hidden bg-brand-light">
            {/* Mobile overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* Sidebar */}
            <nav className={`
                ${sidebarCollapsed ? 'w-[68px]' : 'w-[240px]'}
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
                fixed lg:relative z-50 h-screen flex flex-col flex-shrink-0
                bg-brand-dark transition-all duration-300 ease-in-out
            `}>
                {/* Sidebar header */}
                <div className={`flex items-center gap-3 px-4 py-4 border-b border-white/10 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Leaf className="w-4 h-4 text-brand-accent-light" />
                    </div>
                    {!sidebarCollapsed && (
                        <div className="overflow-hidden">
                            <h1 className="text-base font-bold text-white tracking-tight">
                                Longev<span className="text-brand-primary-light">AI</span>
                            </h1>
                            <p className="text-[9px] text-white/30 uppercase tracking-widest">Amatista Life</p>
                        </div>
                    )}
                    {/* Mobile close */}
                    <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden ml-auto text-white/50 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Role badge */}
                {!sidebarCollapsed && (
                    <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 flex items-center gap-2">
                        <RoleIcon roleId={roleId} size={16} />
                        <span className="text-[11px] font-semibold text-white/70 truncate">{roleNav?.label || roleId}</span>
                    </div>
                )}

                {/* Nav items */}
                <div className="flex-1 overflow-y-auto py-2">
                    {roleNav?.groups.map(group => (
                        <div key={group.label} className="mt-3 first:mt-1">
                            {!sidebarCollapsed && (
                                <p className="px-4 mb-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/25">
                                    {group.label}
                                </p>
                            )}
                            {group.items.map(item => {
                                const Icon = item.icon
                                const isActive = currentSection === item.id
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => onSectionChange?.(item.id)}
                                        className={`w-full flex items-center gap-2.5 px-4 py-2 transition-all group relative
                                            ${sidebarCollapsed ? 'justify-center' : ''}
                                            ${isActive
                                                ? 'bg-white/[0.12] text-white'
                                                : 'text-white/50 hover:bg-white/[0.06] hover:text-white/90'
                                            }`}
                                        title={sidebarCollapsed ? item.label : undefined}
                                    >
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-brand-accent-light rounded-r-full" />
                                        )}
                                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-brand-accent-light' : ''}`} />
                                        {!sidebarCollapsed && (
                                            <>
                                                <span className="text-[12px] font-medium truncate">{item.label}</span>
                                                {item.badge && (
                                                    <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-500/80 text-white">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                        {sidebarCollapsed && (
                                            <div className="absolute left-full ml-2 px-2 py-1 bg-brand-dark-deeper text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] shadow-xl border border-white/10">
                                                {item.label}
                                            </div>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    ))}
                </div>

                {/* Sidebar footer */}
                <div className="border-t border-white/10 p-3 space-y-2">
                    <button
                        onClick={() => navigate('/hub')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/50 hover:text-white transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}
                        title={sidebarCollapsed ? 'Dashboard Hub' : undefined}
                    >
                        <Home className="w-4 h-4 flex-shrink-0" />
                        {!sidebarCollapsed && <span className="text-[12px] font-medium">Dashboard Hub</span>}
                    </button>
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300/70 hover:text-red-300 transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}
                        title={sidebarCollapsed ? 'Sign Out' : undefined}
                    >
                        <LogOut className="w-4 h-4 flex-shrink-0" />
                        {!sidebarCollapsed && <span className="text-[12px] font-medium">Sign Out</span>}
                    </button>
                </div>

                {/* Collapse toggle */}
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="hidden lg:flex absolute -right-3 top-16 w-6 h-6 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:shadow-lg transition-all z-[60]"
                >
                    {sidebarCollapsed ? <ChevronRight className="w-3 h-3 text-gray-500" /> : <ChevronLeft className="w-3 h-3 text-gray-500" />}
                </button>
            </nav>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top navbar */}
                <header className="h-14 bg-white border-b border-gray-200 flex items-center px-5 gap-4 flex-shrink-0 sticky top-0 z-30">
                    {/* Mobile menu toggle */}
                    <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-brand-muted hover:text-brand-dark">
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Title */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center">
                            <RoleIcon roleId={roleId} size={18} />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-sm font-bold text-brand-dark truncate">{title}</h2>
                            <p className="text-[10px] text-brand-muted truncate">{roleTag}</p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-light border border-gray-200 focus-within:border-brand-accent focus-within:ring-1 focus-within:ring-brand-accent/30 transition-all w-48">
                        <Search className="w-3.5 h-3.5 text-brand-muted" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent text-xs text-brand-dark outline-none flex-1 placeholder:text-brand-muted/50"
                        />
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setNotifOpen(!notifOpen)}
                            className="relative p-2 rounded-lg bg-brand-light border border-gray-200 text-brand-muted hover:text-brand-dark hover:border-brand-accent/30 transition-all"
                        >
                            <Bell className="w-4 h-4" />
                            {notifCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">{notifCount}</span>
                            )}
                        </button>

                        {/* Notification dropdown */}
                        {notifOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden" style={{ animation: 'modalIn 0.15s ease-out' }}>
                                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Bell className="w-4 h-4 text-brand-accent" />
                                            <h3 className="text-sm font-semibold text-brand-dark">Notifications</h3>
                                        </div>
                                        {activeNotifications.length > 0 && (
                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600">{activeNotifications.length} active</span>
                                        )}
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        {activeNotifications.length === 0 ? (
                                            <div className="px-4 py-8 text-center">
                                                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                                                <p className="text-sm text-brand-muted">All caught up!</p>
                                                <p className="text-xs text-brand-muted/60 mt-1">No pending notifications</p>
                                            </div>
                                        ) : (
                                            activeNotifications.map(n => {
                                                const severityIcons = { critical: AlertCircle, warning: AlertTriangle, info: Info }
                                                const severityColors = { critical: 'text-red-600 bg-red-50', warning: 'text-amber-600 bg-amber-50', info: 'text-blue-600 bg-blue-50' }
                                                const NIcon = severityIcons[n.severity] || Info
                                                const nColor = severityColors[n.severity] || severityColors.info
                                                return (
                                                    <div
                                                        key={n.id}
                                                        className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50/80 transition-colors cursor-pointer"
                                                        onClick={() => {
                                                            onSectionChange?.('alerts')
                                                            setNotifOpen(false)
                                                        }}
                                                    >
                                                        <div className="flex items-start gap-2.5">
                                                            <div className={'w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ' + nColor.split(' ')[1]}>
                                                                <NIcon className={'w-3.5 h-3.5 ' + nColor.split(' ')[0]} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs font-medium text-brand-dark leading-snug">{n.message}</p>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <span className="text-[10px] text-brand-muted">{n.area}</span>
                                                                    <span className="text-[10px] text-brand-muted">{n.time}</span>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    setDismissedNotifs(prev => [...prev, n.id])
                                                                }}
                                                                className="p-1 rounded-md text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-colors flex-shrink-0"
                                                                title="Dismiss"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )}
                                    </div>
                                    {activeNotifications.length > 0 && (
                                        <div className="px-4 py-2.5 border-t border-gray-100">
                                            <button
                                                onClick={() => {
                                                    onSectionChange?.('alerts')
                                                    setNotifOpen(false)
                                                }}
                                                className="w-full text-center text-xs font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
                                            >
                                                View all alerts
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-brand-muted hover:text-red-600 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition-all text-xs font-medium"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Sign Out</span>
                    </button>
                </header>

                {/* Scrollable body */}
                <main className="flex-1 overflow-y-auto">
                    {/* Dashboard info bar */}
                    {(tagline || badges.length > 0) && (
                        <div className="bg-white border-b border-gray-100 px-6 py-4">
                            {tagline && <p className="text-brand-muted text-sm max-w-3xl">{tagline}</p>}
                            {badges.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {badges.map((b, i) => (
                                        <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-brand-light text-brand-muted border border-gray-200">
                                            {b}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
