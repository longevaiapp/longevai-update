import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar, Cell
} from 'recharts'
import {
    Brain, TrendingDown, Flower2, ShieldCheck, BookOpen, Flame, Calendar,
    ChevronDown, UserCheck, Circle, Clock, AlertTriangle, X, ChevronRight,
    CheckCircle2, AlertCircle, Info, Send, Plus, Eye, FileText,
    Heart, MessageCircle, Activity, TrendingUp, Minus, ShieldAlert
} from 'lucide-react'

/* ================================================================
   PER-RESIDENT DATA
   ================================================================ */

const RESIDENTS_LIST = [
    { id: 1, name: 'Elena Rodriguez', room: '101', age: 78, week: 12, conditions: ['Hypertension', 'Diabetes T2'], referredBy: 'Dr. Gomez', intakeDate: 'Dec 15, 2025' },
    { id: 2, name: 'Carlos Mendez', room: '102', age: 82, week: 8, conditions: ['Osteoarthritis', 'Mild cognitive impairment'], referredBy: 'Dr. Gomez', intakeDate: 'Jan 5, 2026' },
    { id: 3, name: 'Maria Silva', room: '103', age: 85, week: 15, conditions: ['Depression', 'Chronic pain'], referredBy: 'Dr. Torres', intakeDate: 'Nov 20, 2025' },
    { id: 4, name: 'Roberto Diaz', room: '106', age: 77, week: 3, conditions: ['Hypertension', 'Obesity'], referredBy: 'Dr. Gomez', intakeDate: 'Mar 1, 2026' },
]

const RESIDENT_DATA = {
    1: {
        risk: {
            level: 'monitor',
            gds: 7,
            whoqol: 62,
            sleepQuality: 'Fair',
            socialEngagement: 'Increasing',
            appetiteStatus: 'Good',
            observation: 'Improving trend, but GDS still above clinical cutoff (>=5). Social engagement increasing. Evening anxiety noted but manageable with relaxation techniques.',
            consecutiveRed: 0,
            lastAssessment: 'Mar 25, 2026',
            recommendations: ['Continue bi-weekly CBT sessions', 'Monitor evening anxiety patterns', 'Encourage group activity participation', 'Coordinate with physiotherapist on mood-mobility link'],
        },
        gdsHistory: [
            { visit: 'Intake', score: 12, event: '', date: 'Dec 15, 2025', notes: 'Initial screening. Elevated score consistent with adjustment disorder.' },
            { visit: 'V2 (W3)', score: 11, event: '', date: 'Jan 5, 2026', notes: 'Slight improvement. Beginning to adjust to facility.' },
            { visit: 'V3 (W6)', score: 10, event: 'Family visit', date: 'Jan 26, 2026', notes: 'Positive response to daughter visit. Mood briefly elevated.' },
            { visit: 'V4 (W9)', score: 9, event: '', date: 'Feb 16, 2026', notes: 'Gradual improvement continuing. Started participating in garden activities.' },
            { visit: 'V5 (W12)', score: 8, event: 'UTI hospitalization', date: 'Mar 8, 2026', notes: 'Brief setback due to hospitalization. Recovered mood within days of return.' },
            { visit: 'V6 (W12)', score: 7, event: 'Music therapy started', date: 'Mar 25, 2026', notes: 'Music therapy having noticeable positive impact. Best score yet.' },
        ],
        whoqol: [
            { domain: 'Physical', baseline: 45, current: 62, ideal: 75 },
            { domain: 'Psychological', baseline: 35, current: 55, ideal: 70 },
            { domain: 'Social', baseline: 40, current: 60, ideal: 70 },
            { domain: 'Environmental', baseline: 55, current: 70, ideal: 80 },
        ],
        sessions: [
            { id: 1, date: 'Mar 25, 2026', session: 6, type: 'CBT', duration: '45 min', observations: 'Elena showed increased engagement during session. Discussed recent family visit and its positive emotional impact. Expressed interest in group activities.', interventions: 'Cognitive behavioral techniques for managing evening anxiety. Encouraged participation in music therapy.', response: 'Positive. Open to new suggestions. Made eye contact throughout.', flagged: false, mood: 'Stable-Improving', nextSteps: 'Continue CBT focus on evening routines. Assess group activity engagement at next session.' },
            { id: 2, date: 'Mar 4, 2026', session: 5, type: 'Supportive', duration: '40 min', observations: 'Some withdrawal noted after hospitalization. Less verbal than usual. Sleep quality reported as poor.', interventions: 'Supportive listening. Relaxation breathing exercise. Recommended sleep hygiene adjustments to nursing.', response: 'Initially guarded but opened up in last 15 minutes. Agreed to try relaxation technique.', flagged: true, mood: 'Low', nextSteps: 'Follow up on sleep quality. Monitor for post-hospitalization depression. Coordinate with nursing on sleep hygiene protocol.' },
            { id: 3, date: 'Feb 11, 2026', session: 4, type: 'CBT', duration: '45 min', observations: 'Stable mood. Talked about garden visits. Expressed gratitude for physiotherapy progress.', interventions: 'Reinforced positive experiences. Explored sense of purpose and daily routine satisfaction.', response: 'Good engagement. Smiled frequently. Requested photos from garden visits.', flagged: false, mood: 'Stable', nextSteps: 'Continue positive reinforcement approach. Explore creative activities interest.' },
            { id: 4, date: 'Jan 21, 2026', session: 3, type: 'CBT', duration: '45 min', observations: 'Discussing adjustment difficulties. Missing home environment. Some tearfulness.', interventions: 'Validation of feelings. Cognitive restructuring around "loss vs. gain" framing. Family photo placement in room.', response: 'Tearful initially but calmer by end. Agreed that new friendships are forming.', flagged: false, mood: 'Moderate', nextSteps: 'Continue adjustment support. Facilitate social connections with compatible residents.' },
            { id: 5, date: 'Jan 7, 2026', session: 2, type: 'Assessment', duration: '50 min', observations: 'Comprehensive psychological assessment. Elevated anxiety about new environment. Sleep disruption.', interventions: 'Full GDS and WHOQOL administration. Established therapeutic rapport. Psychoeducation about adjustment process.', response: 'Cooperative but reserved. Answered all assessment questions. Expressed hope for improvement.', flagged: false, mood: 'Low-Moderate', nextSteps: 'Begin structured CBT program. Bi-weekly sessions recommended.' },
            { id: 6, date: 'Dec 18, 2025', session: 1, type: 'Intake', duration: '60 min', observations: 'Initial intake session. History of mild depression, managed with Sertraline previously. Currently not on antidepressants. Adjustment to residential care causing distress.', interventions: 'Intake assessment, rapport building, treatment planning. Baseline GDS 12 (moderate depression). WHOQOL administered.', response: 'Willing to engage in therapy. Some reluctance about group activities. Prefers individual sessions initially.', flagged: false, mood: 'Low', nextSteps: 'Establish bi-weekly individual CBT sessions. Gradually introduce to group activities.' },
        ],
        thanatology: null,
        calendar: [
            { date: 'Apr 8, 2026', time: '10:00', type: 'Individual CBT', status: 'scheduled', notes: 'Focus on evening anxiety management' },
            { date: 'Apr 22, 2026', time: '10:00', type: 'Individual CBT', status: 'scheduled', notes: 'W14 assessment -- GDS + WHOQOL readministration' },
            { date: 'Mar 25, 2026', time: '10:00', type: 'Individual CBT', status: 'completed', notes: 'Session 6 -- positive engagement' },
            { date: 'Mar 4, 2026', time: '10:00', type: 'Individual Supportive', status: 'completed', notes: 'Post-hospitalization follow-up' },
            { date: 'Feb 11, 2026', time: '10:00', type: 'Individual CBT', status: 'completed', notes: 'Session 4 -- stable mood' },
        ],
    },
    2: {
        risk: {
            level: 'monitor',
            gds: 8,
            whoqol: 55,
            sleepQuality: 'Good',
            socialEngagement: 'Limited',
            appetiteStatus: 'Good',
            observation: 'GDS stable at 8 (mild depression). Frustration about mobility limitations affecting mood. Expressing existential concerns about dependency and legacy. Cognitive status monitored alongside emotional state.',
            consecutiveRed: 0,
            lastAssessment: 'Mar 22, 2026',
            recommendations: ['Continue bi-weekly supportive sessions', 'Address mobility frustration through cognitive reframing', 'Monitor for depression secondary to functional decline', 'Coordinate with physiotherapist on achievable goals'],
        },
        gdsHistory: [
            { visit: 'Intake', score: 10, event: '', date: 'Jan 5, 2026', notes: 'Moderate depressive symptoms at intake. Related to recent mobility decline and loss of independence.' },
            { visit: 'V2 (W3)', score: 9, event: '', date: 'Jan 26, 2026', notes: 'Slight improvement as he adjusts to care routine.' },
            { visit: 'V3 (W5)', score: 9, event: 'Near-fall incident', date: 'Feb 9, 2026', notes: 'Near-fall caused anxiety spike. GDS stable but mood fragile.' },
            { visit: 'V4 (W8)', score: 8, event: '', date: 'Mar 22, 2026', notes: 'Gradual improvement. Engaging in aquatherapy which he enjoys.' },
        ],
        whoqol: [
            { domain: 'Physical', baseline: 38, current: 42, ideal: 65 },
            { domain: 'Psychological', baseline: 42, current: 50, ideal: 70 },
            { domain: 'Social', baseline: 45, current: 48, ideal: 65 },
            { domain: 'Environmental', baseline: 60, current: 65, ideal: 80 },
        ],
        sessions: [
            { id: 1, date: 'Mar 22, 2026', session: 4, type: 'Supportive', duration: '45 min', observations: 'Carlos expressed frustration about limited mobility and dependence on walking aid. Discussed feelings about aging and legacy.', interventions: 'Supportive listening. Cognitive reframing around "what I can still do." Existential exploration -- meaning-making through family relationships and life experiences.', response: 'Engaged deeply. Shared stories about his career as an architect. Mood lifted when discussing legacy projects.', flagged: false, mood: 'Moderate', nextSteps: 'Continue life review approach. Consider legacy project (e.g., memoir, photo album). Explore frustration management techniques.' },
            { id: 2, date: 'Mar 8, 2026', session: 3, type: 'Supportive', duration: '40 min', observations: 'Anxious after near-fall incident. Expressed fear of losing more independence. Sleep initially disrupted but normalized.', interventions: 'Anxiety management techniques. Normalized fear response. Coordinated with physiotherapy on confidence-building exercises.', response: 'Initially agitated but calmed with breathing exercises. Appreciated practical approach.', flagged: true, mood: 'Low-Moderate', nextSteps: 'Monitor anxiety levels. Follow up on sleep quality. Reinforce fall prevention reassurance.' },
            { id: 3, date: 'Feb 15, 2026', session: 2, type: 'CBT', duration: '45 min', observations: 'Discussed adjustment to residential care. Misses his home workshop. Intellectual engagement is important to him.', interventions: 'Cognitive restructuring around loss. Explored activities that could replace workshop engagement. Suggested puzzle and design activities.', response: 'Receptive to suggestions. Asked about architecture magazines and drawing materials.', flagged: false, mood: 'Moderate', nextSteps: 'Facilitate access to design/architecture activities. Assess MMSE trends with geriatrician.' },
        ],
        thanatology: { protocol: 'Monitoring', type: 'Existential reflection', sessions: 2, notes: 'Expressing concerns about meaning and legacy. Gentle exploration in progress. No acute distress. Integrating life review approach into regular sessions.', startDate: 'Feb 15, 2026', lastSession: 'Mar 22, 2026', keyThemes: ['Dependency and autonomy loss', 'Legacy and being remembered', 'Relationship with adult children'] },
        calendar: [
            { date: 'Apr 8, 2026', time: '11:30', type: 'Individual Supportive', status: 'scheduled', notes: 'Focus on legacy project planning' },
            { date: 'Apr 22, 2026', time: '11:30', type: 'Individual CBT', status: 'scheduled', notes: 'Routine follow-up' },
            { date: 'Mar 22, 2026', time: '11:30', type: 'Individual Supportive', status: 'completed', notes: 'Session 4 -- existential themes' },
            { date: 'Mar 11, 2026', time: '10:00', type: 'Individual Supportive', status: 'missed', notes: 'Carlos unwell -- rescheduled' },
            { date: 'Mar 8, 2026', time: '11:30', type: 'Individual Supportive', status: 'completed', notes: 'Post-near-fall anxiety' },
        ],
    },
    3: {
        risk: {
            level: 'at-risk',
            gds: 12,
            whoqol: 42,
            sleepQuality: 'Poor',
            socialEngagement: 'Withdrawn',
            appetiteStatus: 'Declining',
            observation: 'GDS worsened from 10 to 12 over past 3 weeks. Maria has withdrawn from group activities, reports feeling isolated. Sleep averaging 4-5 hours. Appetite decreased -- 3 consecutive breakfast refusals. Active grief processing for spouse loss. Requires urgent medication review and increased session frequency.',
            consecutiveRed: 2,
            lastAssessment: 'Mar 25, 2026',
            recommendations: ['URGENT: Increase sessions to 3x/week', 'Coordinate with family doctor on Sertraline dose increase', 'Daily mood monitoring by nursing staff', 'Reintroduce gentle social activities with 1:1 support', 'Monitor suicidal ideation -- no current indicators but vigilance needed', 'Nutritionist coordination for appetite support'],
        },
        gdsHistory: [
            { visit: 'Intake', score: 14, event: '', date: 'Nov 20, 2025', notes: 'Severe depression at intake. Recent spouse loss (4 months prior). Grief compounded by chronic pain.' },
            { visit: 'V2 (W3)', score: 13, event: '', date: 'Dec 11, 2025', notes: 'Minimal improvement. Grief dominant. Reluctant to engage.' },
            { visit: 'V3 (W6)', score: 12, event: 'Daughter visit', date: 'Jan 1, 2026', notes: 'Slight improvement after daughter visit. Brief emotional relief.' },
            { visit: 'V4 (W9)', score: 11, event: '', date: 'Jan 22, 2026', notes: 'Slow but steady improvement. Engaging in individual therapy.' },
            { visit: 'V5 (W12)', score: 10, event: 'Started music therapy', date: 'Feb 12, 2026', notes: 'Music therapy had initial positive effect. GDS crossed into mild range.' },
            { visit: 'V6 (W14)', score: 11, event: 'Anniversary of spouse death', date: 'Mar 5, 2026', notes: 'Anniversary triggered regression. Increased tearfulness and withdrawal.' },
            { visit: 'V7 (W15)', score: 12, event: '', date: 'Mar 25, 2026', notes: 'Worsening continues. Appetite loss and social withdrawal. URGENT review needed.' },
        ],
        whoqol: [
            { domain: 'Physical', baseline: 32, current: 35, ideal: 60 },
            { domain: 'Psychological', baseline: 22, current: 28, ideal: 65 },
            { domain: 'Social', baseline: 25, current: 30, ideal: 60 },
            { domain: 'Environmental', baseline: 50, current: 55, ideal: 75 },
        ],
        sessions: [
            { id: 1, date: 'Mar 25, 2026', session: 8, type: 'Grief Therapy', duration: '50 min', observations: 'Maria reported feeling increasingly isolated. Has withdrawn from group activities she previously attended. Sleep 4-5 hours. Appetite significantly decreased. Expressed feeling that "nothing helps."', interventions: 'Active listening. Validated grief regression as normal around anniversaries. Gentle reality testing on hopelessness cognitions. Safety assessment completed -- no suicidal ideation.', response: 'Tearful throughout. Minimal eye contact. Did acknowledge that daughter visit helped briefly. Reluctant to commit to group activities.', flagged: true, mood: 'Low', nextSteps: 'URGENT: Recommend Sertraline dose increase to family doctor. Increase session frequency to 3x/week. Daily nursing mood check. Gentle 1:1 social reintroduction.' },
            { id: 2, date: 'Mar 15, 2026', session: 7, type: 'Grief Therapy', duration: '45 min', observations: 'Anniversary of husband death (Mar 10) triggered significant regression. Crying frequently. Not sleeping well. Missing meals.', interventions: 'Grief processing. Memory work -- looking at photos of husband. Explored meaning of relationship. Provided psychoeducation about anniversary reactions.', response: 'Deeply emotional. Shared memories of husband. Said she feels "left behind." Accepted comfort but remains very sad.', flagged: true, mood: 'Very Low', nextSteps: 'Monitor closely for further decline. Consider medication adjustment. Plan anniversary support strategies for future dates.' },
            { id: 3, date: 'Feb 25, 2026', session: 6, type: 'CBT + Grief', duration: '45 min', observations: 'Mixed session. Some positive moments when discussing music therapy. But underlying sadness persistent.', interventions: 'Combined CBT thought challenging with grief work. Used music as emotional bridge. Introduced gratitude journaling as daily practice.', response: 'Engaged with music discussion. Tried gratitude exercise reluctantly. Said she would "try to find one thing."', flagged: false, mood: 'Low-Moderate', nextSteps: 'Follow up on gratitude journaling adherence. Continue music therapy coordination. Monitor for regression.' },
        ],
        thanatology: { protocol: 'Active', type: 'Grief (spouse loss)', sessions: 6, notes: 'Processing loss of husband Eduardo (died Sep 2025). Married 58 years. Currently in complicated grief pattern -- anniversary triggered significant regression. Moving between anger, bargaining, and depression phases. Acceptance work ongoing but fragile.', startDate: 'Nov 25, 2025', lastSession: 'Mar 25, 2026', keyThemes: ['Loneliness and feeling "left behind"', 'Loss of identity as wife/partner', 'Fear of dying alone', 'Guilt about moments of happiness'] },
        calendar: [
            { date: 'Apr 7, 2026', time: '10:00', type: 'Grief Therapy', status: 'scheduled', notes: 'URGENT -- increased frequency session' },
            { date: 'Apr 9, 2026', time: '10:00', type: 'Grief Therapy', status: 'scheduled', notes: 'Follow-up on medication adjustment' },
            { date: 'Apr 11, 2026', time: '10:00', type: 'Supportive', status: 'scheduled', notes: '3x/week schedule -- check-in' },
            { date: 'Mar 25, 2026', time: '10:00', type: 'Grief Therapy', status: 'completed', notes: 'Session 8 -- worsening noted' },
            { date: 'Mar 15, 2026', time: '10:00', type: 'Grief Therapy', status: 'completed', notes: 'Anniversary processing' },
        ],
    },
    4: {
        risk: {
            level: 'stable',
            gds: 5,
            whoqol: 68,
            sleepQuality: 'Good',
            socialEngagement: 'Active',
            appetiteStatus: 'Good (monitoring portions)',
            observation: 'Roberto is adjusting well to residential care. GDS 5 (borderline normal). Motivated for lifestyle change. Good social engagement with other residents. Main psychological focus: adjustment support and motivation maintenance for weight management program.',
            consecutiveRed: 0,
            lastAssessment: 'Mar 20, 2026',
            recommendations: ['Monthly check-in sessions sufficient', 'Support motivation for dietary and exercise program', 'Monitor for adjustment difficulties', 'Positive reinforcement approach'],
        },
        gdsHistory: [
            { visit: 'Intake', score: 6, event: '', date: 'Mar 1, 2026', notes: 'Mild depressive symptoms at intake. Related to lifestyle change concerns and being away from home.' },
            { visit: 'V2 (W2)', score: 5, event: '', date: 'Mar 15, 2026', notes: 'Quick adjustment. Engaging socially. Motivated by health improvement goals.' },
            { visit: 'V3 (W3)', score: 5, event: '', date: 'Mar 20, 2026', notes: 'Stable. Enjoying activities. Positive about weight management progress.' },
        ],
        whoqol: [
            { domain: 'Physical', baseline: 55, current: 60, ideal: 75 },
            { domain: 'Psychological', baseline: 62, current: 68, ideal: 80 },
            { domain: 'Social', baseline: 65, current: 72, ideal: 80 },
            { domain: 'Environmental', baseline: 60, current: 68, ideal: 80 },
        ],
        sessions: [
            { id: 1, date: 'Mar 20, 2026', session: 2, type: 'Supportive', duration: '30 min', observations: 'Roberto is adjusting well. Active in social activities. Enthusiastic about exercise program. Main concern is missing his wife at home.', interventions: 'Supportive listening. Motivational interviewing for health behavior change. Discussed communication strategies with wife for daily check-ins.', response: 'Very engaged. Talkative and positive. Has clear health goals. Appreciates structured environment.', flagged: false, mood: 'Stable-Good', nextSteps: 'Monthly check-ins. Focus on sustaining motivation. No intensive intervention needed.' },
            { id: 2, date: 'Mar 5, 2026', session: 1, type: 'Intake', duration: '45 min', observations: 'Initial assessment. Roberto presents as motivated and goal-oriented. Mild anxiety about being away from wife. No significant depressive features beyond adjustment.', interventions: 'Intake assessment. GDS 6, WHOQOL administered. Treatment plan: supportive monthly sessions. Psychoeducation about adjustment process.', response: 'Cooperative and open. Asked questions about the program. Already making social connections.', flagged: false, mood: 'Moderate-Good', nextSteps: 'Monthly supportive sessions. Monitor adjustment. Reinforce social engagement.' },
        ],
        thanatology: null,
        calendar: [
            { date: 'Apr 15, 2026', time: '14:00', type: 'Individual Supportive', status: 'scheduled', notes: 'Monthly check-in' },
            { date: 'Mar 20, 2026', time: '14:00', type: 'Individual Supportive', status: 'completed', notes: 'Session 2 -- positive adjustment' },
            { date: 'Mar 5, 2026', time: '14:00', type: 'Intake Assessment', status: 'completed', notes: 'Initial intake' },
        ],
    },
}

/* ================================================================
   PSYCHOLOGIST ALERTS
   ================================================================ */

const PSY_ALERTS = [
    { id: 1, severity: 'critical', area: 'Clinical', message: 'Maria Silva: GDS worsened to 12 -- urgent medication review needed', time: '2h ago', resident: 'Maria Silva' },
    { id: 2, severity: 'critical', area: 'Behavioral', message: 'Maria Silva: Social withdrawal increasing -- missed 3 group activities', time: '1d ago', resident: 'Maria Silva' },
    { id: 3, severity: 'warning', area: 'Nutrition', message: 'Maria Silva: Appetite decline -- 3 consecutive breakfast refusals', time: '1d ago', resident: 'Maria Silva' },
    { id: 4, severity: 'warning', area: 'Clinical', message: 'Carlos Mendez: Missed session Mar 11 -- needs rescheduling', time: '3d ago', resident: 'Carlos Mendez' },
    { id: 5, severity: 'info', area: 'Progress', message: 'Elena Rodriguez: GDS improved to 7 -- best score since intake', time: '2d ago', resident: 'Elena Rodriguez' },
    { id: 6, severity: 'info', area: 'Milestone', message: 'Roberto Diaz: Adjustment proceeding well -- GDS stable at 5', time: '3d ago', resident: 'Roberto Diaz' },
]

/* ================================================================
   STYLE CONFIGS
   ================================================================ */

const RISK_LEVELS = {
    stable: { label: 'Stable', color: 'bg-emerald-500', textColor: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', dotColor: '#059669' },
    monitor: { label: 'Monitor', color: 'bg-amber-500', textColor: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', dotColor: '#d97706' },
    'at-risk': { label: 'At Risk', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200', dotColor: '#dc2626' },
}

const GDS_BANDS = [
    { label: 'Normal (0-4)', color: '#059669', min: 0, max: 4 },
    { label: 'Mild (5-8)', color: '#d97706', min: 5, max: 8 },
    { label: 'Moderate (9-11)', color: '#ea580c', min: 9, max: 11 },
    { label: 'Severe (12-15)', color: '#dc2626', min: 12, max: 15 },
]

const SESSION_STATUS_STYLE = {
    scheduled: { dot: 'bg-brand-primary', bg: 'bg-brand-primary/5', border: 'border-brand-primary/20', text: 'text-brand-primary' },
    completed: { dot: 'bg-emerald-500', bg: 'bg-gray-50', border: 'border-gray-100', text: 'text-emerald-600' },
    missed: { dot: 'bg-red-500', bg: 'bg-red-50/50', border: 'border-red-200', text: 'text-red-600' },
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function PsychologistDashboard() {
    const [activeSection, setActiveSection] = useState('risk')
    const [selectedResident, setSelectedResident] = useState(RESIDENTS_LIST[0])
    const [selectedSession, setSelectedSession] = useState(null)
    const [selectedGdsPoint, setSelectedGdsPoint] = useState(null)

    /* Clinical notes — persisted in localStorage, keyed by residentId:sessionId */
    const [clinicalNotes, setClinicalNotes] = useState(() => {
        try { return JSON.parse(localStorage.getItem('psy_clinical_notes') || '{}') } catch { return {} }
    })
    const [acknowledgedSessions, setAcknowledgedSessions] = useState(() => {
        try { return JSON.parse(localStorage.getItem('psy_ack_sessions') || '{}') } catch { return {} }
    })

    const persistNotes = (next) => { setClinicalNotes(next); localStorage.setItem('psy_clinical_notes', JSON.stringify(next)) }
    const persistAck = (next) => { setAcknowledgedSessions(next); localStorage.setItem('psy_ack_sessions', JSON.stringify(next)) }

    const handleAddNote = (residentId, sessionId, text) => {
        const key = residentId + ':' + sessionId
        const existing = clinicalNotes[key] || []
        const next = { ...clinicalNotes, [key]: [...existing, { text, timestamp: new Date().toLocaleString() }] }
        persistNotes(next)
    }
    const handleAcknowledge = (residentId, sessionId) => {
        const key = residentId + ':' + sessionId
        const next = { ...acknowledgedSessions, [key]: new Date().toLocaleString() }
        persistAck(next)
    }

    const data = RESIDENT_DATA[selectedResident.id]
    const riskCfg = RISK_LEVELS[data.risk.level]

    return (
        <DashboardShell
            roleId="psychologist"
            roleTag="Psychologist -- Thanatology Specialist"
            title="Emotional Monitoring & Therapeutic Progress"
            tagline="GDS trajectories, WHOQOL scores, risk levels, and session logs -- honoring the emotional dimension of care."
            badges={['Per-patient view', 'Modules 2, 3', selectedResident.name]}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            notifications={PSY_ALERTS}
        >
            {/* Resident Selector */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-brand-accent" />
                        <span className="text-sm font-semibold text-brand-dark">Patient:</span>
                    </div>
                    <div className="relative">
                        <select
                            value={selectedResident.id}
                            onChange={e => setSelectedResident(RESIDENTS_LIST.find(r => r.id === Number(e.target.value)))}
                            className="appearance-none bg-brand-light border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
                        >
                            {RESIDENTS_LIST.map(r => (
                                <option key={r.id} value={r.id}>{r.name} (Rm {r.room})</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-brand-muted">
                        <span>Age: <strong className="text-brand-dark">{selectedResident.age}</strong></span>
                        <span>Week: <strong className="text-brand-dark">{selectedResident.week}/16</strong></span>
                        <span>Referred by: <strong className="text-brand-dark">{selectedResident.referredBy}</strong></span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${riskCfg.bgColor} ${riskCfg.borderColor} border`}>
                            <Circle className={`w-2.5 h-2.5 fill-current ${riskCfg.color} ${riskCfg.textColor}`} />
                            <span className={`text-[10px] font-bold uppercase ${riskCfg.textColor}`}>{riskCfg.label}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SECTION: RISK STATUS ── */}
            {activeSection === 'risk' && (
                <div className="space-y-6">
                    {/* Risk traffic light card */}
                    <div className={`rounded-2xl border ${riskCfg.borderColor} ${riskCfg.bgColor} p-5`}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${riskCfg.bgColor}`}>
                                    <ShieldAlert className={`w-8 h-8 ${riskCfg.textColor}`} />
                                </div>
                                <div>
                                    <span className={`text-lg font-bold ${riskCfg.textColor}`}>{riskCfg.label}</span>
                                    <div className="flex items-center gap-3 text-xs text-brand-muted mt-0.5">
                                        <span>GDS: <strong className="text-brand-dark">{data.risk.gds}</strong></span>
                                        <span>WHOQOL: <strong className="text-brand-dark">{data.risk.whoqol}</strong></span>
                                        <span>Assessed: <strong className="text-brand-dark">{data.risk.lastAssessment}</strong></span>
                                    </div>
                                </div>
                            </div>
                            {data.risk.consecutiveRed > 0 && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 border border-red-300 rounded-lg">
                                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                                    <span className="text-[10px] font-bold text-red-700">{data.risk.consecutiveRed} consecutive at-risk assessments</span>
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-brand-dark leading-relaxed mb-4">{data.risk.observation}</p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                            <RiskMetric icon={TrendingDown} label="GDS Score" value={data.risk.gds + '/15'} status={data.risk.gds <= 4 ? 'good' : data.risk.gds <= 8 ? 'warn' : 'bad'} />
                            <RiskMetric icon={Flower2} label="WHOQOL" value={data.risk.whoqol + '/100'} status={data.risk.whoqol >= 60 ? 'good' : data.risk.whoqol >= 45 ? 'warn' : 'bad'} />
                            <RiskMetric icon={Heart} label="Sleep" value={data.risk.sleepQuality} status={data.risk.sleepQuality === 'Good' ? 'good' : data.risk.sleepQuality === 'Fair' ? 'warn' : 'bad'} />
                            <RiskMetric icon={MessageCircle} label="Social" value={data.risk.socialEngagement} status={data.risk.socialEngagement === 'Active' || data.risk.socialEngagement === 'Increasing' ? 'good' : data.risk.socialEngagement === 'Limited' ? 'warn' : 'bad'} />
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Clinical Recommendations</p>
                            <div className="space-y-1">
                                {data.risk.recommendations.map((rec, i) => (
                                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/60">
                                        <ChevronRight className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${rec.startsWith('URGENT') ? 'text-red-500' : 'text-brand-accent'}`} />
                                        <p className={`text-xs ${rec.startsWith('URGENT') ? 'text-red-700 font-semibold' : 'text-brand-dark'}`}>{rec}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── SECTION: GDS TRAJECTORY ── */}
            {activeSection === 'gds' && (
                <div className="space-y-6">
                    <SectionCard title="GDS Score Trajectory" icon={TrendingDown} subtitle={selectedResident.name + ' -- ' + data.gdsHistory.length + ' assessments'}>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.gdsHistory} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="visit" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" domain={[0, 15]} reversed />
                                    <Tooltip
                                        contentStyle={{ fontSize: 12, borderRadius: 8 }}
                                        formatter={(value) => [value, 'GDS Score']}
                                        labelFormatter={(label, payload) => {
                                            const item = payload?.[0]?.payload
                                            let result = label
                                            if (item?.date) result += ' | ' + item.date
                                            if (item?.event) result += ' | ' + item.event
                                            return result
                                        }}
                                    />
                                    <Line type="monotone" dataKey="score" stroke="#6A5CA8" strokeWidth={2.5} name="GDS Score" dot={{ r: 5, fill: '#6A5CA8', cursor: 'pointer' }} activeDot={{ r: 7 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex gap-3 mt-3 flex-wrap text-[10px] text-brand-muted">
                            {GDS_BANDS.map(b => (
                                <span key={b.label} className="px-2 py-0.5 rounded border" style={{ backgroundColor: b.color + '10', borderColor: b.color + '30', color: b.color }}>{b.label}</span>
                            ))}
                        </div>
                    </SectionCard>

                    {/* GDS assessment details */}
                    <SectionCard title="Assessment Details" icon={FileText} subtitle="Click any assessment to view notes">
                        <div className="space-y-2">
                            {data.gdsHistory.map((g, i) => {
                                const band = GDS_BANDS.find(b => g.score >= b.min && g.score <= b.max)
                                return (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedGdsPoint(g)}
                                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:shadow-md cursor-pointer transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: band?.color || '#6A5CA8' }}>
                                            {g.score}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-brand-dark">{g.visit}</span>
                                                <span className="text-[10px] text-brand-muted">{g.date}</span>
                                            </div>
                                            {g.event && (
                                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-brand-primary/10 text-brand-primary">{g.event}</span>
                                            )}
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ── SECTION: WHOQOL SCORE ── */}
            {activeSection === 'whoqol' && (
                <div className="space-y-6">
                    <SectionCard title="WHOQOL Wellbeing Score" icon={Flower2} subtitle={selectedResident.name + ' -- 4-domain assessment'}>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={data.whoqol}>
                                    <PolarGrid gridType="polygon" stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="domain" tick={{ fontSize: 11, fill: '#7A778C' }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                                    <Radar name="Baseline" dataKey="baseline" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.12} strokeWidth={1.5} />
                                    <Radar name="Current" dataKey="current" stroke="#6A5CA8" fill="#6A5CA8" fillOpacity={0.25} strokeWidth={2} />
                                    <Radar name="Ideal Range" dataKey="ideal" stroke="#6D8C8C" fill="#6D8C8C" fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 4" />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                    <Legend wrapperStyle={{ fontSize: 11 }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </SectionCard>

                    {/* Domain breakdown cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data.whoqol.map((d, i) => {
                            const change = d.current - d.baseline
                            const gap = d.ideal - d.current
                            const pct = Math.round((d.current / d.ideal) * 100)
                            return (
                                <div key={i} className="p-4 rounded-xl border border-gray-200 bg-white">
                                    <p className="text-[11px] text-brand-muted uppercase font-semibold tracking-wider">{d.domain}</p>
                                    <div className="flex items-end gap-2 mt-1">
                                        <span className="text-3xl font-bold text-brand-dark">{d.current}</span>
                                        <span className="text-xs text-brand-muted mb-1">/ {d.ideal} ideal</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-200 rounded-full mt-2">
                                        <div className="h-1.5 rounded-full bg-brand-primary transition-all" style={{ width: pct + '%' }} />
                                    </div>
                                    <div className="flex items-center justify-between mt-2 text-[10px]">
                                        <span className={change > 0 ? 'text-emerald-600' : change < 0 ? 'text-red-600' : 'text-brand-muted'}>
                                            {change > 0 ? '+' : ''}{change} from baseline ({d.baseline})
                                        </span>
                                        <span className="text-brand-muted">{gap} pts to ideal</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* ── SECTION: SESSION LOG ── */}
            {activeSection === 'sessions' && (
                <SectionCard title="Therapeutic Evolution Log" icon={BookOpen} subtitle={selectedResident.name + ' -- ' + data.sessions.length + ' sessions recorded'}>
                    <div className="space-y-3">
                        {data.sessions.map(entry => (
                            <div
                                key={entry.id}
                                onClick={() => setSelectedSession(entry)}
                                className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ${entry.flagged ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100 bg-gray-50'}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-brand-dark">Session {entry.session}</span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-medium">{entry.type}</span>
                                        {entry.flagged && (
                                            <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                                                <AlertTriangle className="w-3 h-3" /> Flagged
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-brand-muted">{entry.duration}</span>
                                        <div className="flex items-center gap-1 text-[11px] text-brand-muted">
                                            <Clock className="w-3 h-3" /> {entry.date}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-brand-muted line-clamp-2">{entry.observations}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-[10px] text-brand-muted">Mood: <strong className="text-brand-dark">{entry.mood}</strong></span>
                                    <span className="text-[10px] font-semibold text-brand-primary flex items-center gap-1 opacity-0 group-hover:opacity-100">
                                        View details <ChevronRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            )}

            {/* ── SECTION: THANATOLOGICAL ── */}
            {activeSection === 'thanatology' && (
                <SectionCard title="Thanatological Support Tracker" icon={Flame} subtitle={selectedResident.name}>
                    {!data.thanatology ? (
                        <div className="text-center py-8">
                            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                            <p className="text-sm font-medium text-brand-dark">No active thanatological protocol</p>
                            <p className="text-xs text-brand-muted mt-1">This patient does not currently require end-of-life or grief support</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className={`p-5 rounded-xl border ${data.thanatology.protocol === 'Active' ? 'border-purple-200 bg-purple-50/50' : 'border-amber-200 bg-amber-50/50'}`}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Flame className={`w-5 h-5 ${data.thanatology.protocol === 'Active' ? 'text-purple-600' : 'text-amber-600'}`} />
                                        <span className="text-sm font-bold text-brand-dark">{data.thanatology.type}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${data.thanatology.protocol === 'Active' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {data.thanatology.protocol}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                                    <InfoRow icon={BookOpen} label="Sessions" value={data.thanatology.sessions + ' completed'} />
                                    <InfoRow icon={Calendar} label="Started" value={data.thanatology.startDate} />
                                    <InfoRow icon={Clock} label="Last Session" value={data.thanatology.lastSession} />
                                </div>

                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Clinical Notes</p>
                                    <div className="p-3 rounded-lg bg-white/80 border border-gray-100">
                                        <p className="text-sm text-brand-dark leading-relaxed">{data.thanatology.notes}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Key Themes</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {data.thanatology.keyThemes.map((theme, i) => (
                                            <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-brand-dark">{theme}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </SectionCard>
            )}

            {/* ── SECTION: CALENDAR ── */}
            {activeSection === 'calendar' && (
                <SectionCard title="Session Calendar" icon={Calendar} subtitle={selectedResident.name + ' -- upcoming & past sessions'}>
                    <div className="space-y-2">
                        {data.calendar.map((s, i) => {
                            const st = SESSION_STATUS_STYLE[s.status] || SESSION_STATUS_STYLE.scheduled
                            return (
                                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${st.border} ${st.bg}`}>
                                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${st.dot}`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-brand-dark">{s.type}</p>
                                            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${st.bg} ${st.text}`}>{s.status}</span>
                                        </div>
                                        <p className="text-[11px] text-brand-muted">{s.date} at {s.time}</p>
                                        {s.notes && <p className="text-[10px] text-brand-muted mt-0.5">{s.notes}</p>}
                                    </div>
                                    {s.status === 'scheduled' && (
                                        <span className="text-[10px] font-medium text-brand-primary flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> Upcoming
                                        </span>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </SectionCard>
            )}

            {/* ── MODALS ── */}
            {selectedSession && (
                <Modal onClose={() => setSelectedSession(null)}>
                    <SessionDetailModal
                        session={selectedSession}
                        resident={selectedResident.name}
                        residentId={selectedResident.id}
                        notes={clinicalNotes[selectedResident.id + ':' + selectedSession.id] || []}
                        acknowledgedAt={acknowledgedSessions[selectedResident.id + ':' + selectedSession.id] || null}
                        onAddNote={(text) => handleAddNote(selectedResident.id, selectedSession.id, text)}
                        onAcknowledge={() => handleAcknowledge(selectedResident.id, selectedSession.id)}
                        onClose={() => setSelectedSession(null)}
                    />
                </Modal>
            )}
            {selectedGdsPoint && (
                <Modal onClose={() => setSelectedGdsPoint(null)}>
                    <GdsDetailModal point={selectedGdsPoint} resident={selectedResident.name} onClose={() => setSelectedGdsPoint(null)} />
                </Modal>
            )}
        </DashboardShell>
    )
}

/* ================================================================
   SUB-COMPONENTS
   ================================================================ */

function RiskMetric({ icon: Icon, label, value, status }) {
    const statusColors = { good: 'text-emerald-600 bg-emerald-50 border-emerald-200', warn: 'text-amber-600 bg-amber-50 border-amber-200', bad: 'text-red-600 bg-red-50 border-red-200' }
    const sc = statusColors[status] || statusColors.warn
    return (
        <div className={`p-3 rounded-xl border text-center ${sc}`}>
            <Icon className="w-4 h-4 mx-auto mb-1" />
            <p className="text-[10px] uppercase font-semibold tracking-wider opacity-70">{label}</p>
            <p className="text-sm font-bold mt-0.5">{value}</p>
        </div>
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

function Modal({ onClose, children }) {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
                style={{ animation: 'modalIn 0.2s ease-out' }}
            >
                {children}
            </div>
        </div>
    )
}

function InfoRow({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <Icon className="w-3.5 h-3.5 text-brand-muted flex-shrink-0" />
            <div className="min-w-0">
                <p className="text-[10px] text-brand-muted uppercase tracking-wider">{label}</p>
                <p className="text-xs font-medium text-brand-dark truncate">{value}</p>
            </div>
        </div>
    )
}

/* ================================================================
   MODAL CONTENTS
   ================================================================ */

function SessionDetailModal({ session, resident, residentId, notes, acknowledgedAt, onAddNote, onAcknowledge, onClose }) {
    const [showNoteForm, setShowNoteForm] = useState(false)
    const [noteText, setNoteText] = useState('')
    const [justSaved, setJustSaved] = useState(false)

    const handleSaveNote = () => {
        if (!noteText.trim()) return
        onAddNote(noteText.trim())
        setNoteText('')
        setShowNoteForm(false)
        setJustSaved(true)
        setTimeout(() => setJustSaved(false), 2500)
    }

    const handleAcknowledge = () => {
        onAcknowledge()
    }

    return (
        <div>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${session.flagged ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-3">
                    <BookOpen className={`w-5 h-5 ${session.flagged ? 'text-amber-600' : 'text-brand-accent'}`} />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">Session {session.session} -- {session.type}</h3>
                        <p className="text-[11px] text-brand-muted">{resident} -- {session.date} ({session.duration})</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary">{session.type}</span>
                    <span className="text-[10px] text-brand-muted">Mood: <strong className="text-brand-dark">{session.mood}</strong></span>
                    {session.flagged && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                            <AlertTriangle className="w-3 h-3" /> Flagged for Review
                        </span>
                    )}
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Observations</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{session.observations}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Interventions Applied</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{session.interventions}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Resident Response</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{session.response}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Next Steps</p>
                    <div className={`p-3 rounded-lg border ${session.flagged ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
                        <p className={`text-sm leading-relaxed ${session.flagged ? 'text-amber-800' : 'text-blue-800'}`}>{session.nextSteps}</p>
                    </div>
                </div>

                {/* ── CLINICAL NOTES SECTION ── */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                            Clinical Notes {notes.length > 0 && <span className="text-brand-primary">({notes.length})</span>}
                        </p>
                    </div>

                    {notes.length > 0 && (
                        <div className="space-y-2 mb-3">
                            {notes.map((note, i) => (
                                <div key={i} className="p-3 rounded-lg bg-purple-50/60 border border-purple-200/60" style={{ animation: 'modalIn 0.2s ease-out' }}>
                                    <div className="flex items-start gap-2">
                                        <FileText className="w-3.5 h-3.5 text-purple-500 mt-0.5 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-brand-dark leading-relaxed">{note.text}</p>
                                            <p className="text-[10px] text-brand-muted mt-1 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {note.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {notes.length === 0 && !showNoteForm && (
                        <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center mb-3">
                            <p className="text-xs text-brand-muted">No clinical notes added yet</p>
                        </div>
                    )}

                    {/* Note form */}
                    {showNoteForm && (
                        <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-2 mb-3" style={{ animation: 'modalIn 0.2s ease-out' }}>
                            <textarea
                                autoFocus
                                rows={3}
                                value={noteText}
                                onChange={e => setNoteText(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent resize-none text-brand-dark placeholder-brand-muted/50"
                                placeholder="Enter clinical observation, follow-up action, or treatment note..."
                            />
                            <div className="flex items-center gap-2 justify-end">
                                <button
                                    onClick={() => { setShowNoteForm(false); setNoteText('') }}
                                    className="px-3 py-1.5 text-xs font-medium text-brand-muted hover:text-brand-dark transition-colors rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveNote}
                                    disabled={!noteText.trim()}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${noteText.trim() ? 'bg-brand-primary text-white hover:bg-brand-primary-dark' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                >
                                    <Send className="w-3 h-3" /> Save Note
                                </button>
                            </div>
                        </div>
                    )}

                    {justSaved && (
                        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 mb-3" style={{ animation: 'modalIn 0.2s ease-out' }}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <p className="text-xs font-medium text-emerald-700">Clinical note saved successfully</p>
                        </div>
                    )}
                </div>

                {/* ── ACKNOWLEDGE BANNER ── */}
                {acknowledgedAt && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2" style={{ animation: 'modalIn 0.2s ease-out' }}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-emerald-700">Session reviewed and acknowledged</p>
                            <p className="text-[10px] text-emerald-600 mt-0.5 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {acknowledgedAt}
                                {notes.length > 0 && <span className="ml-2">-- {notes.length} clinical note{notes.length > 1 ? 's' : ''} attached</span>}
                            </p>
                        </div>
                    </div>
                )}

                {/* ── ACTION BUTTONS ── */}
                <div className="flex gap-2">
                    <button
                        onClick={handleAcknowledge}
                        disabled={!!acknowledgedAt}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${acknowledgedAt ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-brand-primary text-white hover:bg-brand-primary-dark'}`}
                    >
                        <CheckCircle2 className="w-4 h-4" /> {acknowledgedAt ? 'Acknowledged' : 'Acknowledge'}
                    </button>
                    <button
                        onClick={() => setShowNoteForm(true)}
                        disabled={showNoteForm}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-colors ${showNoteForm ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-default' : 'bg-white text-brand-dark border-gray-200 hover:bg-gray-50'}`}
                    >
                        <Plus className="w-4 h-4" /> Add Clinical Note
                    </button>
                </div>
            </div>
        </div>
    )
}

function GdsDetailModal({ point, resident, onClose }) {
    const band = GDS_BANDS.find(b => point.score >= b.min && point.score <= b.max)
    return (
        <div>
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ backgroundColor: band?.color + '10', borderColor: band?.color + '30' }}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: band?.color || '#6A5CA8' }}>
                        {point.score}
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{point.visit}</h3>
                        <p className="text-[11px] text-brand-muted">{resident} -- {point.date}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div className="text-center py-3">
                    <p className="text-4xl font-bold text-brand-dark">{point.score}<span className="text-lg text-brand-muted">/15</span></p>
                    <p className="text-xs font-semibold mt-1" style={{ color: band?.color }}>{band?.label || 'Unknown'}</p>
                </div>
                {point.event && (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-brand-primary/5 border border-brand-primary/10">
                        <Activity className="w-4 h-4 text-brand-primary flex-shrink-0" />
                        <div>
                            <p className="text-[10px] text-brand-muted uppercase tracking-wider">Clinical Event</p>
                            <p className="text-xs font-medium text-brand-primary">{point.event}</p>
                        </div>
                    </div>
                )}
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Assessment Notes</p>
                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{point.notes}</p>
                    </div>
                </div>
                <div className="flex gap-3 text-[10px] text-brand-muted justify-center flex-wrap">
                    {GDS_BANDS.map(b => (
                        <span key={b.label} className={`px-2 py-0.5 rounded border ${point.score >= b.min && point.score <= b.max ? 'font-bold' : ''}`} style={{ backgroundColor: b.color + '10', borderColor: b.color + '30', color: b.color }}>
                            {b.label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
