import {
    Stethoscope, HeartPulse, Brain, Dumbbell, Salad, ChefHat,
    Syringe, Briefcase, DollarSign, Users, Activity, Home,
    ClipboardList, CalendarDays, AlertTriangle, Microscope,
    MessageSquare, Bot, Construction
} from 'lucide-react'

const ROLE_ICONS = {
    gerontologist: { icon: Stethoscope, color: '#4A8C62' },
    geriatrician: { icon: HeartPulse, color: '#1A3A2A' },
    'family-doctor': { icon: Activity, color: '#C4545E' },
    psychologist: { icon: Brain, color: '#6A5CA8' },
    physiotherapist: { icon: Dumbbell, color: '#4A7FA8' },
    nutritionist: { icon: Salad, color: '#3A8048' },
    chef: { icon: ChefHat, color: '#B86848' },
    nursing: { icon: Syringe, color: '#4A7FA8' },
    ceo: { icon: Briefcase, color: '#C8923A' },
    finance: { icon: DollarSign, color: '#3A6E4A' },
    family: { icon: Users, color: '#E8A84A' },
}

export function RoleIcon({ roleId, size = 24, className = '' }) {
    const config = ROLE_ICONS[roleId]
    if (!config) return null
    const Icon = config.icon
    return <Icon size={size} color={config.color} className={className} />
}

export { ROLE_ICONS }

export {
    ClipboardList, CalendarDays, AlertTriangle, Microscope,
    MessageSquare, Bot, Construction, Home
}
