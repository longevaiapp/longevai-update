import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import CopilotPanel from '../components/CopilotPanel'
import ExecutiveDashboard from './ExecutiveDashboard'
import Residents from './Residents'
import MultiSpecialist from './MultiSpecialist'
import Operations from './Operations'
import Alerts from './Alerts'
import Programs from './Programs'
import Insights from './Insights'
import Reports from './Reports'

const PAGE_TITLES = {
    executive: { title: 'Executive Dashboard', subtitle: 'Amatista Life · Geriatric Residence San Angel · Q1 2025' },
    residents: { title: 'Residents 360°', subtitle: 'Comprehensive resident profiles and clinical tracking' },
    multispec: { title: 'Multi-Specialist Hub', subtitle: 'Interdisciplinary coordination and AI recommendations' },
    operations: { title: 'Operations Center', subtitle: 'Task management, scheduling and workflows' },
    alerts: { title: 'Alert Center', subtitle: 'Active alerts and clinical notifications' },
    programs: { title: 'Care Plans & Programs', subtitle: 'Structured intervention programs' },
    insights: { title: 'Clinical Insights', subtitle: 'AI-powered analytics and pattern detection' },
    reports: { title: 'Reports', subtitle: 'Comprehensive reporting and export' },
}

export default function CEODashboard() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [currentPage, setCurrentPage] = useState('executive')
    const [copilotOpen, setCopilotOpen] = useState(false)
    const [segment, setSegment] = useState('geri')
    const navigate = useNavigate()

    const pageInfo = PAGE_TITLES[currentPage] || PAGE_TITLES.executive

    const renderPage = () => {
        switch (currentPage) {
            case 'executive': return <ExecutiveDashboard onOpenCopilot={() => setCopilotOpen(true)} />
            case 'residents': return <Residents />
            case 'multispec': return <MultiSpecialist />
            case 'operations': return <Operations />
            case 'alerts': return <Alerts />
            case 'programs': return <Programs />
            case 'insights': return <Insights />
            case 'reports': return <Reports />
            default: return <ExecutiveDashboard onOpenCopilot={() => setCopilotOpen(true)} />
        }
    }

    return (
        <div className="flex h-screen overflow-hidden bg-slate-100">
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                segment={segment}
                onSegmentChange={setSegment}
                onOpenCopilot={() => setCopilotOpen(true)}
                onBackToHub={() => navigate('/hub')}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Header
                    title={pageInfo.title}
                    subtitle={pageInfo.subtitle}
                    segment={segment}
                    onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
                    onOpenCopilot={() => setCopilotOpen(true)}
                    onLogout={() => {
                        localStorage.removeItem('longevai-auth')
                        navigate('/login')
                    }}
                />

                <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/30">
                    <div className="animate-in" key={currentPage}>
                        {renderPage()}
                    </div>
                </main>
            </div>

            <CopilotPanel open={copilotOpen} onClose={() => setCopilotOpen(false)} />
        </div>
    )
}
