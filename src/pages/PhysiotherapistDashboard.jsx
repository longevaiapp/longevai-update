import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar, Cell, ReferenceLine
} from 'recharts'
import {
    Dumbbell, TrendingUp, AlertTriangle, CalendarDays, Target,
    ChevronDown, UserCheck, Clock, CheckCircle2, XCircle, X, ChevronRight,
    Circle, Activity, FileText, Send, Plus, Info, AlertCircle,
    ArrowUpRight, ArrowDownRight, Minus, Heart, Footprints, Hand,
    ShieldCheck, BarChart3,
    UserCircle, Briefcase, Users, GraduationCap, Mail, Phone,
    Building2, Globe, Pencil, Save
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
        mobilityScores: [
            { visit: 'Intake', tug: 18, sppb: 5, barthel: 60, date: 'Dec 18, 2025', notes: 'Initial assessment. Gait unsteady, uses no assistive device. Balance impaired on tandem stand. Grip strength 14 kg.' },
            { visit: 'M1', tug: 17, sppb: 5, barthel: 62, date: 'Jan 18, 2026', notes: 'Minor improvement in gait speed. Still requires supervision on stairs. Started seated balance program.' },
            { visit: 'M2', tug: 16, sppb: 6, barthel: 65, date: 'Feb 18, 2026', notes: 'SPPB improved by 1 point (chair stand component). Walking distance increased to 220m. Balance exercises showing effect.' },
            { visit: 'M3', tug: 15, sppb: 7, barthel: 68, date: 'Mar 18, 2026', notes: 'Consistent improvement. Tandem stand now held for 8 seconds (was 3). Stair practice initiated. Grip strength 18 kg.' },
            { visit: 'M4', tug: 14, sppb: 8, barthel: 72, date: 'Apr 5, 2026', notes: 'Best scores yet. TUG under 15s threshold. Walking program expanded to 20 min daily. Very motivated.' },
        ],
        targets: [
            { metric: 'TUG (Timed Up & Go)', current: 14, target: 12, unit: 'seconds', baseline: 18, direction: 'lower', history: [18, 17, 16, 15, 14], notes: 'Steady improvement. 4-second reduction from baseline. Target of 12s achievable by W16.' },
            { metric: 'SPPB Score', current: 8, target: 10, unit: '/12', baseline: 5, direction: 'higher', history: [5, 5, 6, 7, 8], notes: 'Chair stand and gait speed components driving improvement. Balance component lagging.' },
            { metric: 'Barthel Index', current: 72, target: 80, unit: '/100', baseline: 60, direction: 'higher', history: [60, 62, 65, 68, 72], notes: 'Functional independence improving. Transfers and mobility subscores highest gains.' },
            { metric: 'Grip Strength', current: 18, target: 22, unit: 'kg', baseline: 14, direction: 'higher', history: [14, 15, 16, 17, 18], notes: 'Consistent 1 kg/month gain. Resistance band exercises effective.' },
            { metric: 'Walking Distance', current: 280, target: 350, unit: 'm', baseline: 180, direction: 'higher', history: [180, 200, 220, 250, 280], notes: 'Endurance improving. Walking program adherence 78%. Target achievable with sustained effort.' },
            { metric: 'Balance Score', current: 12, target: 14, unit: '/16', baseline: 8, direction: 'higher', history: [8, 9, 10, 11, 12], notes: 'Tandem stand and single-leg stand both improved. Near-falls have decreased.' },
        ],
        falls: [
            { id: 1, date: 'Mar 22, 2026', time: '22:15', location: 'Bathroom', circumstances: 'Getting up at night, lost balance on wet floor', injury: 'None', response: 'Examined by nursing, ice applied to knee. No swelling observed.', notified: ['Family Doctor', 'Gerontologist'], followUp: 'Non-slip mat installed. Night light added. Bathroom grab bar check completed.', riskFactors: ['Nighttime mobility', 'Wet floor', 'No grab bar use'] },
            { id: 2, date: 'Feb 3, 2026', time: '10:40', location: 'Hallway', circumstances: 'Tripped on carpet edge during walk to dining room', injury: 'Minor bruise (left hand)', response: 'Wound cleaned. No medical intervention needed.', notified: ['Family Doctor'], followUp: 'Carpet edge secured. Walking route reviewed with resident.', riskFactors: ['Environmental hazard', 'Gait instability'] },
        ],
        exercises: [
            { id: 1, name: 'Seated Balance Exercises', frequency: '3x/week', duration: '15 min', difficulty: 'Moderate', adherence: 85, description: 'Weight shifts, seated marching, and reaching exercises to improve core stability and sitting balance.', progression: 'Started with supported reaches. Now doing unsupported lateral reaches and seated marching with arm swings.', weeklyAdherence: [70, 75, 80, 85, 85, 90] },
            { id: 2, name: 'Resistance Band Upper Body', frequency: '2x/week', duration: '10 min', difficulty: 'Low', adherence: 92, description: 'Light resistance band exercises for shoulder, bicep, and grip strength maintenance.', progression: 'Progressed from yellow (lightest) to green (medium) band at W8. Grip strength improving.', weeklyAdherence: [80, 85, 90, 92, 95, 92] },
            { id: 3, name: 'Walking Program', frequency: 'Daily', duration: '20 min', difficulty: 'Low', adherence: 78, description: 'Supervised walking in facility corridors and garden. Focus on gait quality and endurance.', progression: 'Started at 10 min, progressed to 20 min by W8. Distance increased from 180m to 280m.', weeklyAdherence: [60, 65, 72, 78, 80, 78] },
            { id: 4, name: 'Stair Practice', frequency: '2x/week', duration: '10 min', difficulty: 'High', adherence: 60, description: 'Supervised stair climbing (4 steps) with railing. Focus on safe technique and confidence.', progression: 'Initiated at W9. Uses railing. Can now do 4 steps up and down independently with standby assist.', weeklyAdherence: [0, 0, 0, 0, 55, 60] },
            { id: 5, name: 'Ankle Circles & Foot Flex', frequency: 'Daily', duration: '5 min', difficulty: 'Low', adherence: 95, description: 'Simple ankle ROM exercises done seated. Helps with circulation and ankle mobility.', progression: 'Consistent throughout. Good compliance. Added toe raises at W6.', weeklyAdherence: [90, 92, 95, 95, 95, 95] },
        ],
        adherenceByWeek: [
            { week: 'W1-2', adherence: 65, exercises: 5, completed: 3.25 },
            { week: 'W3-4', adherence: 72, exercises: 5, completed: 3.6 },
            { week: 'W5-6', adherence: 78, exercises: 5, completed: 3.9 },
            { week: 'W7-8', adherence: 80, exercises: 5, completed: 4.0 },
            { week: 'W9-10', adherence: 82, exercises: 5, completed: 4.1 },
            { week: 'W11-12', adherence: 85, exercises: 5, completed: 4.25 },
        ],
    },
    2: {
        mobilityScores: [
            { visit: 'Intake', tug: 22, sppb: 4, barthel: 55, date: 'Jan 8, 2026', notes: 'Severe mobility limitations. Uses walker. Significant pain with weight bearing. Arthritis in both knees and right hip.' },
            { visit: 'M1', tug: 21, sppb: 4, barthel: 56, date: 'Feb 8, 2026', notes: 'Minimal change. Pain management being adjusted. Started aquatherapy which he tolerates well.' },
            { visit: 'M2', tug: 20, sppb: 5, barthel: 58, date: 'Mar 8, 2026', notes: 'SPPB improved 1 point after aquatherapy. TUG still slow due to pain. Near-fall incident caused anxiety setback.' },
            { visit: 'M3', tug: 19, sppb: 5, barthel: 60, date: 'Apr 5, 2026', notes: 'Gradual improvement. More confident with walker. Aquatherapy is his preferred modality. Grip strength stable at 16 kg.' },
        ],
        targets: [
            { metric: 'TUG (Timed Up & Go)', current: 19, target: 16, unit: 'seconds', baseline: 22, direction: 'lower', history: [22, 21, 20, 19], notes: 'Slow but steady. Pain is limiting factor. Aquatherapy helping more than land-based exercises.' },
            { metric: 'SPPB Score', current: 5, target: 8, unit: '/12', baseline: 4, direction: 'higher', history: [4, 4, 5, 5], notes: 'Limited by arthritis pain. Chair stand component most affected.' },
            { metric: 'Barthel Index', current: 60, target: 70, unit: '/100', baseline: 55, direction: 'higher', history: [55, 56, 58, 60], notes: 'Transfers improving with walker confidence. Dressing independence improving.' },
            { metric: 'Grip Strength', current: 16, target: 20, unit: 'kg', baseline: 15, direction: 'higher', history: [15, 15, 16, 16], notes: 'Limited improvement. Hand arthritis may be factor. Occupational therapy referral considered.' },
            { metric: 'Walking Distance', current: 150, target: 250, unit: 'm', baseline: 100, direction: 'higher', history: [100, 120, 135, 150], notes: 'Endurance limited by pain. Uses walker for all distances. Rest breaks needed.' },
            { metric: 'Balance Score', current: 7, target: 10, unit: '/16', baseline: 5, direction: 'higher', history: [5, 6, 6, 7], notes: 'Fear of falling is significant barrier. Aquatherapy balance exercises more effective.' },
        ],
        falls: [
            { id: 1, date: 'Feb 28, 2026', time: '14:30', location: 'Therapy Room', circumstances: 'Near-fall during transfer from chair to walker. Caught by physiotherapist.', injury: 'None (caught)', response: 'Transfer technique reviewed. Extra caution during transitions.', notified: ['Gerontologist'], followUp: 'Transfer training intensified. Walker brakes checked and adjusted.', riskFactors: ['Arthritis pain', 'Transfer instability', 'Walker use'] },
        ],
        exercises: [
            { id: 1, name: 'Aquatherapy', frequency: '3x/week', duration: '30 min', difficulty: 'Low', adherence: 90, description: 'Pool-based exercises for joint mobility, balance, and pain relief. Warm water therapy.', progression: 'Started with simple walking in pool. Added balance challenges and resistance at W4.', weeklyAdherence: [85, 88, 90, 92] },
            { id: 2, name: 'Seated Knee Extensions', frequency: '2x/week', duration: '10 min', difficulty: 'Moderate', adherence: 72, description: 'Gentle knee strengthening exercises done seated. Focus on quadriceps with pain monitoring.', progression: 'Low weight. Progressing slowly due to knee pain. Added ankle weights at W6.', weeklyAdherence: [60, 65, 72, 75] },
            { id: 3, name: 'Walker Gait Training', frequency: 'Daily', duration: '15 min', difficulty: 'Moderate', adherence: 68, description: 'Supervised walking with walker focusing on posture, stride length, and safe technique.', progression: 'Improving confidence. Distance increased from 100m to 150m. Still needs supervision.', weeklyAdherence: [55, 60, 68, 70] },
            { id: 4, name: 'Gentle Hand Exercises', frequency: 'Daily', duration: '5 min', difficulty: 'Low', adherence: 82, description: 'Hand and finger exercises for arthritis management. Squeeze ball and finger extensions.', progression: 'Consistent. Reports less morning stiffness. Grip improving marginally.', weeklyAdherence: [75, 78, 82, 85] },
        ],
        adherenceByWeek: [
            { week: 'W1-2', adherence: 58, exercises: 4, completed: 2.32 },
            { week: 'W3-4', adherence: 65, exercises: 4, completed: 2.6 },
            { week: 'W5-6', adherence: 72, exercises: 4, completed: 2.88 },
            { week: 'W7-8', adherence: 78, exercises: 4, completed: 3.12 },
        ],
    },
    3: {
        mobilityScores: [
            { visit: 'Intake', tug: 20, sppb: 4, barthel: 52, date: 'Nov 25, 2025', notes: 'Low motivation due to depression. Chronic pain limiting activity. Deconditioned from inactivity prior to admission.' },
            { visit: 'M1', tug: 20, sppb: 4, barthel: 53, date: 'Dec 25, 2025', notes: 'No improvement. Maria is resistant to exercise. Pain complaints high. Mood affecting participation.' },
            { visit: 'M2', tug: 19, sppb: 5, barthel: 55, date: 'Jan 25, 2026', notes: 'Slight improvement after music therapy motivation. Agreed to walking program with 1:1 support.' },
            { visit: 'M3', tug: 19, sppb: 5, barthel: 56, date: 'Feb 25, 2026', notes: 'Plateau. Maintaining gains but not progressing. Grief episode affecting participation in W14.' },
            { visit: 'M4', tug: 20, sppb: 4, barthel: 54, date: 'Mar 25, 2026', notes: 'REGRESSION. Withdrew from exercise program. Depression worsened. Social isolation increased. Urgent psych referral made.' },
        ],
        targets: [
            { metric: 'TUG (Timed Up & Go)', current: 20, target: 16, unit: 'seconds', baseline: 20, direction: 'lower', history: [20, 20, 19, 19, 20], notes: 'No net improvement. Depression and pain are primary barriers. Regressed to baseline at last assessment.' },
            { metric: 'SPPB Score', current: 4, target: 7, unit: '/12', baseline: 4, direction: 'higher', history: [4, 4, 5, 5, 4], notes: 'Briefly improved to 5 but regressed. Needs coordinated psych + physio approach.' },
            { metric: 'Barthel Index', current: 54, target: 65, unit: '/100', baseline: 52, direction: 'higher', history: [52, 53, 55, 56, 54], notes: 'Minimal change. Regression in self-care activities correlating with depression worsening.' },
            { metric: 'Grip Strength', current: 11, target: 16, unit: 'kg', baseline: 12, direction: 'higher', history: [12, 12, 12, 11, 11], notes: 'Declining. Nutrition and activity level both factors. Sarcopenia screening recommended.' },
            { metric: 'Walking Distance', current: 100, target: 200, unit: 'm', baseline: 120, direction: 'higher', history: [120, 110, 130, 120, 100], notes: 'Variable. Best at W6 during motivated period. Currently below baseline.' },
            { metric: 'Balance Score', current: 6, target: 10, unit: '/16', baseline: 6, direction: 'higher', history: [6, 6, 7, 7, 6], notes: 'No net improvement. Fear of falling persists. Needs more confidence-building approach.' },
        ],
        falls: [],
        exercises: [
            { id: 1, name: 'Gentle Chair Yoga', frequency: '2x/week', duration: '15 min', difficulty: 'Low', adherence: 42, description: 'Modified yoga poses done seated. Focus on flexibility, breathing, and relaxation.', progression: 'Participated initially but attendance dropped significantly in W14-15 due to depression.', weeklyAdherence: [55, 50, 48, 45, 40, 30, 35, 42] },
            { id: 2, name: 'Assisted Walking', frequency: 'Daily', duration: '10 min', difficulty: 'Low', adherence: 35, description: '1:1 supervised walking with nursing assistant. Short distance focus.', progression: 'Requires significant encouragement. Often refuses. Best on days with family visits.', weeklyAdherence: [40, 38, 42, 40, 35, 28, 30, 35] },
            { id: 3, name: 'Pain-Adapted Stretching', frequency: '3x/week', duration: '10 min', difficulty: 'Low', adherence: 50, description: 'Gentle stretching routine adapted for chronic pain. Done in room or therapy area.', progression: 'Most accepted exercise. Reports pain relief after sessions. Compliance better than other exercises.', weeklyAdherence: [55, 52, 55, 52, 48, 42, 45, 50] },
        ],
        adherenceByWeek: [
            { week: 'W1-2', adherence: 50, exercises: 3, completed: 1.5 },
            { week: 'W3-4', adherence: 48, exercises: 3, completed: 1.44 },
            { week: 'W5-6', adherence: 52, exercises: 3, completed: 1.56 },
            { week: 'W7-8', adherence: 50, exercises: 3, completed: 1.5 },
            { week: 'W9-10', adherence: 45, exercises: 3, completed: 1.35 },
            { week: 'W11-12', adherence: 38, exercises: 3, completed: 1.14 },
            { week: 'W13-14', adherence: 35, exercises: 3, completed: 1.05 },
            { week: 'W15', adherence: 42, exercises: 3, completed: 1.26 },
        ],
    },
    4: {
        mobilityScores: [
            { visit: 'Intake', tug: 15, sppb: 7, barthel: 68, date: 'Mar 4, 2026', notes: 'Good baseline for age. Obesity impacting endurance and joint stress. Motivated for improvement. No assistive device needed.' },
            { visit: 'M1', tug: 14, sppb: 8, barthel: 70, date: 'Apr 4, 2026', notes: 'Rapid improvement. Weight loss program supporting mobility gains. Very engaged in exercise program. Grip strength 22 kg.' },
        ],
        targets: [
            { metric: 'TUG (Timed Up & Go)', current: 14, target: 11, unit: 'seconds', baseline: 15, direction: 'lower', history: [15, 14], notes: 'Good start. Weight loss will accelerate improvement. Already below fall-risk threshold.' },
            { metric: 'SPPB Score', current: 8, target: 11, unit: '/12', baseline: 7, direction: 'higher', history: [7, 8], notes: 'Strong baseline. Chair stand and gait speed both improved. Balance component good.' },
            { metric: 'Barthel Index', current: 70, target: 85, unit: '/100', baseline: 68, direction: 'higher', history: [68, 70], notes: 'Functionally independent in most ADLs. Endurance and stairs are main limitations.' },
            { metric: 'Grip Strength', current: 22, target: 26, unit: 'kg', baseline: 20, direction: 'higher', history: [20, 22], notes: 'Strong grip. Resistance training showing results quickly.' },
            { metric: 'Walking Distance', current: 350, target: 500, unit: 'm', baseline: 280, direction: 'higher', history: [280, 350], notes: 'Excellent improvement. 70m gain in first month. Endurance building rapidly with weight loss.' },
            { metric: 'Balance Score', current: 11, target: 14, unit: '/16', baseline: 10, direction: 'higher', history: [10, 11], notes: 'Good balance for age. Single-leg stand improving.' },
        ],
        falls: [],
        exercises: [
            { id: 1, name: 'Cardio Walking Program', frequency: 'Daily', duration: '30 min', difficulty: 'Moderate', adherence: 92, description: 'Brisk walking program with gradually increasing pace and distance. Garden and corridor circuit.', progression: 'Started at 20 min, now 30 min. Distance from 280m to 350m. Pace increasing.', weeklyAdherence: [88, 92] },
            { id: 2, name: 'Resistance Circuit', frequency: '3x/week', duration: '20 min', difficulty: 'Moderate', adherence: 88, description: 'Full body resistance training with bands and light weights. Focus on functional movements.', progression: 'Progressed to medium resistance bands. Added weighted squats at W3.', weeklyAdherence: [82, 88] },
            { id: 3, name: 'Balance & Agility', frequency: '2x/week', duration: '15 min', difficulty: 'Moderate', adherence: 85, description: 'Dynamic balance exercises including tandem walking, single-leg stands, and obstacle navigation.', progression: 'Good engagement. Tandem walk improved. Adding more dynamic challenges.', weeklyAdherence: [80, 85] },
            { id: 4, name: 'Flexibility & Stretching', frequency: 'Daily', duration: '10 min', difficulty: 'Low', adherence: 95, description: 'Post-exercise stretching routine focusing on lower body and back flexibility.', progression: 'Consistent. Range of motion improving. Reports less back stiffness.', weeklyAdherence: [92, 95] },
        ],
        adherenceByWeek: [
            { week: 'W1-2', adherence: 85, exercises: 4, completed: 3.4 },
            { week: 'W3', adherence: 90, exercises: 4, completed: 3.6 },
        ],
    },
}

/* ================================================================
   PHYSIO ALERTS
   ================================================================ */

const PHYSIO_ALERTS = [
    { id: 1, severity: 'critical', area: 'Regression', message: 'Maria Silva: SPPB regressed to 4 -- all gains lost. Depression affecting mobility.', time: '2d ago', resident: 'Maria Silva' },
    { id: 2, severity: 'critical', area: 'Adherence', message: 'Maria Silva: Exercise adherence dropped to 35% -- intervention needed', time: '3d ago', resident: 'Maria Silva' },
    { id: 3, severity: 'warning', area: 'Falls', message: 'Elena Rodriguez: Fall incident Mar 22 -- bathroom, no injury. Environment modified.', time: '2w ago', resident: 'Elena Rodriguez' },
    { id: 4, severity: 'warning', area: 'Progress', message: 'Carlos Mendez: TUG still above 18s threshold -- pain limiting progress', time: '3d ago', resident: 'Carlos Mendez' },
    { id: 5, severity: 'info', area: 'Milestone', message: 'Elena Rodriguez: TUG dropped below 15s -- significant milestone achieved', time: '3d ago', resident: 'Elena Rodriguez' },
    { id: 6, severity: 'info', area: 'Progress', message: 'Roberto Diaz: Walking distance increased 70m in first month -- excellent progress', time: '4d ago', resident: 'Roberto Diaz' },
]

/* ================================================================
   STYLE CONFIGS
   ================================================================ */

const DIFFICULTY_STYLE = {
    Low: 'bg-emerald-100 text-emerald-700',
    Moderate: 'bg-amber-100 text-amber-700',
    High: 'bg-red-100 text-red-700',
}

/* ================================================================
   PROFILE
   ================================================================ */
const PROFILE_STORAGE_KEY = 'longevai-physiotherapist-profile'
const DEFAULT_PROFILE = {
    name: 'Dr. Patricia Reeves',
    title: 'Lead Physiotherapist',
    license: 'PT-5821-REH',
    specialization: 'Geriatric Rehabilitation, Mobility & Falls Prevention',
    email: 'p.reeves@amatistalife.com',
    phone: '+34 611 345 678',
    office: 'Building B, Rehab Unit 1',
    institution: 'Amatista Life -- LongevAI Center',
    education: 'DPT, Geriatric Physical Therapy (Universidad de Valencia)',
    certifications: 'Board Certified Geriatric Physiotherapist, Falls Prevention Specialist',
    bio: 'Over 12 years of experience in geriatric rehabilitation. Specializing in mobility restoration, balance training, and individualized exercise programs for older adults.',
    shiftStart: '08:00',
    shiftEnd: '16:00',
    yearsExperience: 12,
    residentsManaged: 4,
}
function loadProfile() {
    try { const d = localStorage.getItem(PROFILE_STORAGE_KEY); return d ? { ...DEFAULT_PROFILE, ...JSON.parse(d) } : DEFAULT_PROFILE } catch { return DEFAULT_PROFILE }
}
function saveProfile(p) { localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(p)) }

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function PhysiotherapistDashboard() {
    const [activeSection, setActiveSection] = useState('scores')
    const [selectedResident, setSelectedResident] = useState(RESIDENTS_LIST[0])
    const [selectedAssessment, setSelectedAssessment] = useState(null)
    const [selectedTarget, setSelectedTarget] = useState(null)
    const [selectedFall, setSelectedFall] = useState(null)
    const [selectedExercise, setSelectedExercise] = useState(null)

    /* Profile */
    const [profile, setProfile] = useState(() => loadProfile())
    const [editingProfile, setEditingProfile] = useState(false)

    /* Clinical notes -- persisted in localStorage */
    const [clinicalNotes, setClinicalNotes] = useState(() => {
        try { return JSON.parse(localStorage.getItem('physio_clinical_notes') || '{}') } catch { return {} }
    })
    const [acknowledgedItems, setAcknowledgedItems] = useState(() => {
        try { return JSON.parse(localStorage.getItem('physio_ack_items') || '{}') } catch { return {} }
    })

    const persistNotes = (next) => { setClinicalNotes(next); localStorage.setItem('physio_clinical_notes', JSON.stringify(next)) }
    const persistAck = (next) => { setAcknowledgedItems(next); localStorage.setItem('physio_ack_items', JSON.stringify(next)) }

    const handleAddNote = (key, text) => {
        const existing = clinicalNotes[key] || []
        const next = { ...clinicalNotes, [key]: [...existing, { text, timestamp: new Date().toLocaleString() }] }
        persistNotes(next)
    }
    const handleAcknowledge = (key) => {
        const next = { ...acknowledgedItems, [key]: new Date().toLocaleString() }
        persistAck(next)
    }

    const data = RESIDENT_DATA[selectedResident.id]
    const overallAdherence = data.adherenceByWeek.length > 0 ? data.adherenceByWeek[data.adherenceByWeek.length - 1].adherence : 0
    const totalFalls = data.falls.length
    const fallsPerMonth = data.mobilityScores.length > 1 ? (totalFalls / ((data.mobilityScores.length - 1) || 1)).toFixed(1) : '0.0'

    return (
        <DashboardShell
            roleId="physiotherapist"
            roleTag="Physiotherapist -- Monthly Visit"
            title="Functional Progress & Mobility Panel"
            badges={[]}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            notifications={PHYSIO_ALERTS}
        >
            {/* Date Bar + Profile Button */}
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-semibold text-slate-800">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <button onClick={() => setActiveSection('profile')} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 hover:border-indigo-500/30 hover:shadow-sm transition-all">
                    <div className="w-5 h-5 rounded-full bg-indigo-600/10 flex items-center justify-center">
                        <UserCircle className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-800 hidden sm:inline">{profile.name.split(' ').slice(0, 2).join(' ')}</span>
                </button>
            </div>

            {/* Resident Selector */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-indigo-500" />
                        <span className="text-sm font-semibold text-slate-800">Patient:</span>
                    </div>
                    <div className="relative">
                        <select
                            value={selectedResident.id}
                            onChange={e => setSelectedResident(RESIDENTS_LIST.find(r => r.id === Number(e.target.value)))}
                            className="appearance-none bg-slate-100 border border-slate-200/80 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                        >
                            {RESIDENTS_LIST.map(r => (
                                <option key={r.id} value={r.id}>{r.name} (Rm {r.room})</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                        <span>Age: <strong className="text-slate-800">{selectedResident.age}</strong></span>
                        <span>Week: <strong className="text-slate-800">{selectedResident.week}/16</strong></span>
                        <span>Falls: <strong className={totalFalls > 0 ? 'text-amber-600' : 'text-emerald-600'}>{totalFalls}</strong></span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${overallAdherence >= 70 ? 'bg-emerald-50 border-emerald-200' : overallAdherence >= 50 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                            <Activity className={`w-3.5 h-3.5 ${overallAdherence >= 70 ? 'text-emerald-600' : overallAdherence >= 50 ? 'text-amber-600' : 'text-red-600'}`} />
                            <span className={`text-[10px] font-bold uppercase ${overallAdherence >= 70 ? 'text-emerald-700' : overallAdherence >= 50 ? 'text-amber-700' : 'text-red-700'}`}>{overallAdherence}% Adherence</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SECTION: MOBILITY SCORES ── */}
            {activeSection === 'scores' && (
                <div className="space-y-6">
                    <SectionCard title="Mobility Score Timeline" icon={TrendingUp} subtitle={selectedResident.name + ' -- ' + data.mobilityScores.length + ' assessments'}>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.mobilityScores} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="visit" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} labelFormatter={(label, payload) => {
                                        const item = payload?.[0]?.payload
                                        return item?.date ? label + ' | ' + item.date : label
                                    }} />
                                    <Legend wrapperStyle={{ fontSize: 11 }} />
                                    <Line type="monotone" dataKey="tug" stroke="#4A7FA8" strokeWidth={2} name="TUG (s)" dot={{ r: 4, cursor: 'pointer' }} />
                                    <Line type="monotone" dataKey="sppb" stroke="#4C4673" strokeWidth={2} name="SPPB (/12)" dot={{ r: 4, cursor: 'pointer' }} />
                                    <Line type="monotone" dataKey="barthel" stroke="#6D8C8C" strokeWidth={2} name="Barthel (/100)" dot={{ r: 4, cursor: 'pointer' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex gap-3 mt-3 flex-wrap text-[10px] text-slate-500">
                            <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 rounded">TUG: lower is better (&lt;15s = low risk)</span>
                            <span className="px-2 py-0.5 bg-purple-50 border border-purple-200 rounded">SPPB: target 10+ (/12)</span>
                            <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded">Barthel: higher = more independent</span>
                        </div>
                    </SectionCard>

                    {/* Assessment detail cards */}
                    <SectionCard title="Assessment History" icon={FileText} subtitle="Click any assessment to view details">
                        <div className="space-y-2">
                            {data.mobilityScores.map((a, i) => {
                                const prevTug = i > 0 ? data.mobilityScores[i - 1].tug : a.tug
                                const tugChange = a.tug - prevTug
                                return (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedAssessment(a)}
                                        className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white hover:shadow-md cursor-pointer transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center text-indigo-600 font-bold text-xs flex-shrink-0">
                                            {a.visit}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-slate-800">{a.date}</span>
                                                <span className="text-[10px] text-slate-500">TUG: {a.tug}s | SPPB: {a.sppb} | Barthel: {a.barthel}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{a.notes}</p>
                                        </div>
                                        {i > 0 && (
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                {tugChange < 0 ? <ArrowDownRight className="w-3.5 h-3.5 text-emerald-500" /> : tugChange > 0 ? <ArrowUpRight className="w-3.5 h-3.5 text-red-500" /> : <Minus className="w-3.5 h-3.5 text-gray-400" />}
                                                <span className={`text-[10px] font-semibold ${tugChange < 0 ? 'text-emerald-600' : tugChange > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                                                    {tugChange < 0 ? tugChange : tugChange > 0 ? '+' + tugChange : '0'}s
                                                </span>
                                            </div>
                                        )}
                                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ── SECTION: IMPROVEMENT TARGETS ── */}
            {activeSection === 'targets' && (
                <SectionCard title="Improvement Indicator Panel" icon={Target} subtitle={selectedResident.name + ' -- 6 metrics tracked'}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.targets.map((t, i) => {
                            const progress = t.direction === 'lower'
                                ? ((t.baseline - t.current) / (t.baseline - t.target)) * 100
                                : ((t.current - t.baseline) / (t.target - t.baseline)) * 100
                            const pct = Math.min(Math.max(progress, 0), 100)
                            const regressed = t.direction === 'lower' ? t.current >= t.baseline : t.current <= t.baseline
                            const onTrack = pct >= 70

                            return (
                                <div
                                    key={i}
                                    onClick={() => setSelectedTarget(t)}
                                    className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ${regressed ? 'border-red-200 bg-red-50/30' : 'border-slate-100 bg-slate-50'}`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-slate-800">{t.metric}</span>
                                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${regressed ? 'bg-red-100 text-red-700' : onTrack ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {regressed ? 'Regressed' : onTrack ? 'On Track' : 'Behind'}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-xl font-bold text-slate-800">{t.current}</span>
                                        <span className="text-xs text-slate-500">{t.unit}</span>
                                        <span className="text-[10px] text-slate-500 ml-auto">Target: {t.target}{t.unit}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all ${regressed ? 'bg-red-500' : onTrack ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                            style={{ width: pct + '%' }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-1 text-[10px] text-slate-500">
                                        <span>Baseline: {t.baseline}</span>
                                        <span>{Math.round(pct)}% to goal</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </SectionCard>
            )}

            {/* ── SECTION: FALLS LOG ── */}
            {activeSection === 'falls' && (
                <SectionCard title="Falls Incident Log" icon={AlertTriangle} subtitle={selectedResident.name + ' -- ' + totalFalls + ' incident' + (totalFalls !== 1 ? 's' : '') + ' recorded'}>
                    {data.falls.length === 0 ? (
                        <div className="text-center py-8">
                            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                            <p className="text-sm font-medium text-slate-800">No falls recorded</p>
                            <p className="text-xs text-slate-500 mt-1">This resident has had no fall incidents during this care cycle</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {data.falls.map(fall => (
                                <div
                                    key={fall.id}
                                    onClick={() => setSelectedFall(fall)}
                                    className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ${fall.injury !== 'None' && !fall.injury.includes('caught') ? 'border-amber-200 bg-amber-50/50' : 'border-slate-200/80 bg-slate-50'}`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className={`w-4 h-4 ${fall.injury !== 'None' && !fall.injury.includes('caught') ? 'text-amber-500' : 'text-gray-400'}`} />
                                            <span className="text-sm font-semibold text-slate-800">{fall.date}</span>
                                            <span className="text-[11px] text-slate-500">at {fall.time}</span>
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${fall.injury === 'None' || fall.injury.includes('caught') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {fall.injury === 'None' || fall.injury.includes('caught') ? 'No Injury' : fall.injury}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500"><strong>Location:</strong> {fall.location} -- {fall.circumstances}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                            <span>Notified:</span>
                                            {fall.notified.map((n, j) => (
                                                <span key={j} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">{n}</span>
                                            ))}
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300" />
                                    </div>
                                </div>
                            ))}
                            <div className="p-3 rounded-lg bg-indigo-600/5 border border-indigo-600/10 text-center">
                                <p className="text-xs text-indigo-600 font-medium">
                                    Total Falls (cycle): {totalFalls} | Falls/Month: {fallsPerMonth}
                                </p>
                            </div>
                        </div>
                    )}
                </SectionCard>
            )}

            {/* ── SECTION: EXERCISE ROUTINE ── */}
            {activeSection === 'routine' && (
                <SectionCard title="Therapeutic Routine Manager" icon={Dumbbell} subtitle={selectedResident.name + ' -- ' + data.exercises.length + ' exercises prescribed'}>
                    <div className="space-y-3">
                        {data.exercises.map(ex => (
                            <div
                                key={ex.id}
                                onClick={() => setSelectedExercise(ex)}
                                className="p-4 rounded-xl border border-slate-100 bg-slate-50 shadow-sm hover:shadow-md cursor-pointer transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-sm font-semibold text-slate-800">{ex.name}</span>
                                            <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${DIFFICULTY_STYLE[ex.difficulty]}`}>{ex.difficulty}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                                            <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {ex.frequency}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {ex.duration}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end flex-shrink-0">
                                        <span className={`text-lg font-bold ${ex.adherence >= 80 ? 'text-emerald-600' : ex.adherence >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                                            {ex.adherence}%
                                        </span>
                                        <span className="text-[10px] text-slate-500">adherence</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                </div>
                                <div className="mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full transition-all ${ex.adherence >= 80 ? 'bg-emerald-500' : ex.adherence >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                                            style={{ width: ex.adherence + '%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            )}

            {/* ── SECTION: ADHERENCE ── */}
            {activeSection === 'adherence' && (
                <div className="space-y-6">
                    <SectionCard title="Therapeutic Routine Adherence" icon={BarChart3} subtitle={selectedResident.name + ' -- adherence over time'}>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.adherenceByWeek} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" domain={[0, 100]} />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [v + '%', 'Adherence']} />
                                    <ReferenceLine y={70} stroke="#d97706" strokeDasharray="4 4" label={{ value: 'Min Target 70%', fontSize: 10, fill: '#d97706', position: 'right' }} />
                                    <Bar dataKey="adherence" radius={[6, 6, 0, 0]} name="Adherence %">
                                        {data.adherenceByWeek.map((entry, i) => (
                                            <Cell key={i} fill={entry.adherence >= 70 ? '#059669' : entry.adherence >= 50 ? '#d97706' : '#dc2626'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-2">Adherence measured by nursing confirmation of assigned exercises between visits.</p>
                    </SectionCard>

                    {/* Per-exercise adherence breakdown */}
                    <SectionCard title="Per-Exercise Adherence" icon={Dumbbell} subtitle="Current adherence by exercise">
                        <div className="space-y-3">
                            {data.exercises.map(ex => (
                                <div key={ex.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-slate-800">{ex.name}</span>
                                            <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${DIFFICULTY_STYLE[ex.difficulty]}`}>{ex.difficulty}</span>
                                        </div>
                                        <span className={`text-sm font-bold ${ex.adherence >= 80 ? 'text-emerald-600' : ex.adherence >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                                            {ex.adherence}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all ${ex.adherence >= 80 ? 'bg-emerald-500' : ex.adherence >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                                            style={{ width: ex.adherence + '%' }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-1 text-[10px] text-slate-500">
                                        <span>{ex.frequency} -- {ex.duration}</span>
                                        <span>{ex.adherence >= 80 ? 'Good compliance' : ex.adherence >= 60 ? 'Needs encouragement' : 'Low compliance -- review needed'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ── MODALS ── */}
            {selectedAssessment && (
                <Modal onClose={() => setSelectedAssessment(null)}>
                    <AssessmentDetailModal
                        assessment={selectedAssessment}
                        resident={selectedResident.name}
                        residentId={selectedResident.id}
                        notes={clinicalNotes['assess:' + selectedResident.id + ':' + selectedAssessment.visit] || []}
                        acknowledgedAt={acknowledgedItems['assess:' + selectedResident.id + ':' + selectedAssessment.visit] || null}
                        onAddNote={(text) => handleAddNote('assess:' + selectedResident.id + ':' + selectedAssessment.visit, text)}
                        onAcknowledge={() => handleAcknowledge('assess:' + selectedResident.id + ':' + selectedAssessment.visit)}
                        onClose={() => setSelectedAssessment(null)}
                    />
                </Modal>
            )}
            {selectedTarget && (
                <Modal onClose={() => setSelectedTarget(null)}>
                    <TargetDetailModal
                        target={selectedTarget}
                        resident={selectedResident.name}
                        mobilityScores={data.mobilityScores}
                        onClose={() => setSelectedTarget(null)}
                    />
                </Modal>
            )}
            {selectedFall && (
                <Modal onClose={() => setSelectedFall(null)}>
                    <FallDetailModal
                        fall={selectedFall}
                        resident={selectedResident.name}
                        residentId={selectedResident.id}
                        notes={clinicalNotes['fall:' + selectedResident.id + ':' + selectedFall.id] || []}
                        acknowledgedAt={acknowledgedItems['fall:' + selectedResident.id + ':' + selectedFall.id] || null}
                        onAddNote={(text) => handleAddNote('fall:' + selectedResident.id + ':' + selectedFall.id, text)}
                        onAcknowledge={() => handleAcknowledge('fall:' + selectedResident.id + ':' + selectedFall.id)}
                        onClose={() => setSelectedFall(null)}
                    />
                </Modal>
            )}
            {selectedExercise && (
                <Modal onClose={() => setSelectedExercise(null)}>
                    <ExerciseDetailModal
                        exercise={selectedExercise}
                        resident={selectedResident.name}
                        onClose={() => setSelectedExercise(null)}
                    />
                </Modal>
            )}

            {/* SECTION: My Profile */}
            {activeSection === 'profile' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600/10 via-indigo-500/5 to-transparent px-6 py-5 border-b border-slate-100">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border-2 border-indigo-600/20 flex items-center justify-center flex-shrink-0">
                                    <UserCircle className="w-8 h-8 text-indigo-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold text-slate-800">{profile.name}</h3>
                                    <p className="text-sm text-indigo-500 font-medium">{profile.title}</p>
                                    <p className="text-xs text-slate-500 mt-1">{profile.institution}</p>
                                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-indigo-600/10 text-indigo-600 border border-indigo-600/20">{profile.license}</span>
                                        <span className="text-[10px] text-slate-500 flex items-center gap-1"><Briefcase className="w-3 h-3" /> {profile.yearsExperience} years experience</span>
                                        <span className="text-[10px] text-slate-500 flex items-center gap-1"><Users className="w-3 h-3" /> {profile.residentsManaged} residents</span>
                                    </div>
                                </div>
                                <button onClick={() => setEditingProfile(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-slate-200/80 text-slate-800 hover:border-indigo-500 hover:shadow-sm transition-all">
                                    <Pencil className="w-3.5 h-3.5 text-indigo-500" /> Edit Profile
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-800 leading-relaxed mb-5">{profile.bio}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <ProfileField icon={GraduationCap} label="Education" value={profile.education} />
                                <ProfileField icon={FileText} label="Certifications" value={profile.certifications} />
                                <ProfileField icon={Mail} label="Email" value={profile.email} />
                                <ProfileField icon={Phone} label="Phone" value={profile.phone} />
                                <ProfileField icon={Building2} label="Office" value={profile.office} />
                                <ProfileField icon={Globe} label="Specialization" value={profile.specialization} />
                                <ProfileField icon={Clock} label="Shift" value={profile.shiftStart + ' -- ' + profile.shiftEnd} />
                                <ProfileField icon={Activity} label="Status" value="On Shift" valueColor="text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Edit Profile */}
            {editingProfile && (
                <Modal onClose={() => setEditingProfile(false)}>
                    <ProfileEditModal profile={profile} onClose={() => setEditingProfile(false)} onSave={(updated) => { setProfile(updated); saveProfile(updated); setEditingProfile(false) }} />
                </Modal>
            )}
        </DashboardShell>
    )
}

/* ================================================================
   SUB-COMPONENTS
   ================================================================ */

function SectionCard({ title, icon: Icon, subtitle, children }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
                <Icon className="w-5 h-5 text-indigo-500" />
                <div>
                    <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
                    {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
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

function NoteSection({ notes, noteKey, onAddNote }) {
    const [showForm, setShowForm] = useState(false)
    const [text, setText] = useState('')
    const [justSaved, setJustSaved] = useState(false)

    const handleSave = () => {
        if (!text.trim()) return
        onAddNote(text.trim())
        setText('')
        setShowForm(false)
        setJustSaved(true)
        setTimeout(() => setJustSaved(false), 2500)
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Clinical Notes {notes.length > 0 && <span className="text-indigo-600">({notes.length})</span>}
                </p>
            </div>
            {notes.length > 0 && (
                <div className="space-y-2 mb-3">
                    {notes.map((note, i) => (
                        <div key={i} className="p-3 rounded-lg bg-purple-50/60 border border-purple-200/60" style={{ animation: 'modalIn 0.2s ease-out' }}>
                            <div className="flex items-start gap-2">
                                <FileText className="w-3.5 h-3.5 text-purple-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-slate-800 leading-relaxed">{note.text}</p>
                                    <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {note.timestamp}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {notes.length === 0 && !showForm && (
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center mb-3">
                    <p className="text-xs text-slate-500">No clinical notes added yet</p>
                </div>
            )}
            {showForm && (
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2 mb-3" style={{ animation: 'modalIn 0.2s ease-out' }}>
                    <textarea
                        autoFocus rows={3} value={text} onChange={e => setText(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200/80 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none text-slate-800 placeholder-slate-500/50"
                        placeholder="Enter clinical observation, follow-up action, or treatment note..."
                    />
                    <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => { setShowForm(false); setText('') }} className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors rounded-lg">Cancel</button>
                        <button onClick={handleSave} disabled={!text.trim()} className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${text.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
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
            <button onClick={() => setShowForm(true)} disabled={showForm} className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${showForm ? 'bg-slate-100 text-gray-400 border-slate-200/80 cursor-default' : 'bg-white text-slate-800 border-slate-200/80 hover:bg-slate-50'}`}>
                <Plus className="w-3.5 h-3.5" /> Add Clinical Note
            </button>
        </div>
    )
}

/* ================================================================
   MODAL CONTENTS
   ================================================================ */

function AssessmentDetailModal({ assessment, resident, residentId, notes, acknowledgedAt, onAddNote, onAcknowledge, onClose }) {
    return (
        <div>
            <div className="px-6 py-4 border-b bg-slate-50 border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center text-indigo-600 font-bold text-xs">{assessment.visit}</div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">Mobility Assessment -- {assessment.visit}</h3>
                        <p className="text-[11px] text-slate-500">{resident} -- {assessment.date}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                    <MetricBox label="TUG" value={assessment.tug + 's'} color={assessment.tug <= 15 ? 'emerald' : 'amber'} />
                    <MetricBox label="SPPB" value={assessment.sppb + '/12'} color={assessment.sppb >= 8 ? 'emerald' : 'amber'} />
                    <MetricBox label="Barthel" value={assessment.barthel + '/100'} color={assessment.barthel >= 70 ? 'emerald' : 'amber'} />
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Assessment Notes</p>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <p className="text-sm text-slate-800 leading-relaxed">{assessment.notes}</p>
                    </div>
                </div>

                <NoteSection notes={notes} onAddNote={onAddNote} />

                {acknowledgedAt && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2" style={{ animation: 'modalIn 0.2s ease-out' }}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-emerald-700">Assessment reviewed and acknowledged</p>
                            <p className="text-[10px] text-emerald-600 mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3" /> {acknowledgedAt}{notes.length > 0 && <span className="ml-2">-- {notes.length} clinical note{notes.length > 1 ? 's' : ''} attached</span>}</p>
                        </div>
                    </div>
                )}

                <button onClick={onAcknowledge} disabled={!!acknowledgedAt} className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${acknowledgedAt ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                    <CheckCircle2 className="w-4 h-4" /> {acknowledgedAt ? 'Acknowledged' : 'Acknowledge Assessment'}
                </button>
            </div>
        </div>
    )
}

function TargetDetailModal({ target, resident, mobilityScores, onClose }) {
    const progress = target.direction === 'lower'
        ? ((target.baseline - target.current) / (target.baseline - target.target)) * 100
        : ((target.current - target.baseline) / (target.target - target.baseline)) * 100
    const pct = Math.min(Math.max(progress, 0), 100)
    const regressed = target.direction === 'lower' ? target.current >= target.baseline : target.current <= target.baseline

    const chartData = target.history.map((val, i) => ({
        visit: i === 0 ? 'Intake' : 'M' + i,
        value: val,
    }))

    return (
        <div>
            <div className="px-6 py-4 border-b bg-slate-50 border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-indigo-500" />
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">{target.metric}</h3>
                        <p className="text-[11px] text-slate-500">{resident} -- target tracking</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="text-center py-2">
                    <p className="text-4xl font-bold text-slate-800">{target.current}<span className="text-lg text-slate-500">{target.unit}</span></p>
                    <p className={`text-xs font-semibold mt-1 ${regressed ? 'text-red-600' : pct >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {regressed ? 'Regressed to baseline' : pct >= 70 ? 'On Track' : 'Behind target'} -- {Math.round(pct)}% progress
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <MetricBox label="Baseline" value={target.baseline + (target.unit.startsWith('/') ? '' : ' ' + target.unit)} color="gray" />
                    <MetricBox label="Current" value={target.current + (target.unit.startsWith('/') ? '' : ' ' + target.unit)} color={regressed ? 'red' : 'brand'} />
                    <MetricBox label="Target" value={target.target + (target.unit.startsWith('/') ? '' : ' ' + target.unit)} color="emerald" />
                </div>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="visit" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                            <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" />
                            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [v, target.metric]} />
                            <ReferenceLine y={target.target} stroke="#059669" strokeDasharray="4 4" label={{ value: 'Target', fontSize: 10, fill: '#059669' }} />
                            <Line type="monotone" dataKey="value" stroke="#4C4673" strokeWidth={2} dot={{ r: 5, fill: '#4C4673' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Clinical Notes</p>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <p className="text-sm text-slate-800 leading-relaxed">{target.notes}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FallDetailModal({ fall, resident, residentId, notes, acknowledgedAt, onAddNote, onAcknowledge, onClose }) {
    return (
        <div>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${fall.injury !== 'None' && !fall.injury.includes('caught') ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200/80'}`}>
                <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-5 h-5 ${fall.injury !== 'None' && !fall.injury.includes('caught') ? 'text-amber-600' : 'text-gray-500'}`} />
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">Fall Incident -- {fall.date}</h3>
                        <p className="text-[11px] text-slate-500">{resident} -- {fall.time} -- {fall.location}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <InfoRow icon={Clock} label="Time" value={fall.time} />
                    <InfoRow icon={Footprints} label="Location" value={fall.location} />
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Circumstances</p>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <p className="text-sm text-slate-800 leading-relaxed">{fall.circumstances}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Injury</p>
                    <div className={`p-3 rounded-lg border ${fall.injury === 'None' || fall.injury.includes('caught') ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                        <p className={`text-sm font-medium ${fall.injury === 'None' || fall.injury.includes('caught') ? 'text-emerald-700' : 'text-amber-700'}`}>{fall.injury}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Response</p>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <p className="text-sm text-slate-800 leading-relaxed">{fall.response}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Follow-Up Actions</p>
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-sm text-blue-800 leading-relaxed">{fall.followUp}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Risk Factors Identified</p>
                    <div className="flex flex-wrap gap-1.5">
                        {fall.riskFactors.map((rf, i) => (
                            <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-red-50 border border-red-200 text-red-700">{rf}</span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] text-slate-500 mr-1">Notified:</span>
                    {fall.notified.map((n, j) => (
                        <span key={j} className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">{n}</span>
                    ))}
                </div>

                <NoteSection notes={notes} onAddNote={onAddNote} />

                {acknowledgedAt && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2" style={{ animation: 'modalIn 0.2s ease-out' }}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-emerald-700">Incident reviewed and acknowledged</p>
                            <p className="text-[10px] text-emerald-600 mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3" /> {acknowledgedAt}{notes.length > 0 && <span className="ml-2">-- {notes.length} clinical note{notes.length > 1 ? 's' : ''} attached</span>}</p>
                        </div>
                    </div>
                )}

                <button onClick={onAcknowledge} disabled={!!acknowledgedAt} className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${acknowledgedAt ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                    <CheckCircle2 className="w-4 h-4" /> {acknowledgedAt ? 'Acknowledged' : 'Acknowledge Incident'}
                </button>
            </div>
        </div>
    )
}

function ExerciseDetailModal({ exercise, resident, onClose }) {
    return (
        <div>
            <div className="px-6 py-4 border-b bg-slate-50 border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Dumbbell className="w-5 h-5 text-indigo-500" />
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">{exercise.name}</h3>
                        <p className="text-[11px] text-slate-500">{resident} -- {exercise.frequency}, {exercise.duration}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${DIFFICULTY_STYLE[exercise.difficulty]}`}>{exercise.difficulty}</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {exercise.frequency}</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {exercise.duration}</span>
                </div>

                <div className="text-center py-2">
                    <p className={`text-4xl font-bold ${exercise.adherence >= 80 ? 'text-emerald-600' : exercise.adherence >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{exercise.adherence}%</p>
                    <p className="text-xs text-slate-500 mt-1">Current Adherence</p>
                </div>

                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</p>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <p className="text-sm text-slate-800 leading-relaxed">{exercise.description}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Progression Notes</p>
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-sm text-blue-800 leading-relaxed">{exercise.progression}</p>
                    </div>
                </div>

                {exercise.weeklyAdherence && exercise.weeklyAdherence.length > 1 && (
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Adherence Trend</p>
                        <div className="h-36">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={exercise.weeklyAdherence.map((v, i) => ({ period: 'P' + (i + 1), adherence: v }))} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="period" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" domain={[0, 100]} />
                                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v) => [v + '%', 'Adherence']} />
                                    <Bar dataKey="adherence" radius={[4, 4, 0, 0]}>
                                        {exercise.weeklyAdherence.map((v, i) => (
                                            <Cell key={i} fill={v >= 80 ? '#059669' : v >= 60 ? '#d97706' : '#dc2626'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function MetricBox({ label, value, color }) {
    const colors = {
        emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        amber: 'bg-amber-50 border-amber-200 text-amber-700',
        red: 'bg-red-50 border-red-200 text-red-700',
        gray: 'bg-slate-50 border-slate-200/80 text-gray-700',
        brand: 'bg-indigo-600/10 border-indigo-600/20 text-indigo-600',
    }
    return (
        <div className={`p-3 rounded-xl border text-center ${colors[color] || colors.gray}`}>
            <p className="text-[10px] uppercase font-semibold tracking-wider opacity-70">{label}</p>
            <p className="text-lg font-bold mt-0.5">{value}</p>
        </div>
    )
}

function InfoRow({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <Icon className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
            <div className="min-w-0">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
                <p className="text-xs font-medium text-slate-800 truncate">{value}</p>
            </div>
        </div>
    )
}

function ProfileField({ icon: Icon, label, value, valueColor }) {
    return (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <Icon className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
                <p className={'text-xs font-medium mt-0.5 ' + (valueColor || 'text-slate-800')}>{value}</p>
            </div>
        </div>
    )
}

function ProfileEditModal({ profile, onClose, onSave }) {
    const [form, setForm] = useState({ ...profile })
    const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }))
    const fields = [
        { key: 'name', label: 'Full Name', type: 'text' }, { key: 'title', label: 'Title / Role', type: 'text' },
        { key: 'license', label: 'License Number', type: 'text' }, { key: 'specialization', label: 'Specialization', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' }, { key: 'phone', label: 'Phone', type: 'tel' },
        { key: 'office', label: 'Office Location', type: 'text' }, { key: 'institution', label: 'Institution', type: 'text' },
        { key: 'education', label: 'Education', type: 'text' }, { key: 'certifications', label: 'Certifications', type: 'text' },
        { key: 'shiftStart', label: 'Shift Start', type: 'time' }, { key: 'shiftEnd', label: 'Shift End', type: 'time' },
    ]
    return (
        <div>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-100">
                <div className="flex items-center gap-3">
                    <Pencil className="w-5 h-5 text-indigo-500" />
                    <div><h3 className="text-sm font-bold text-slate-800">Edit Profile</h3><p className="text-[11px] text-slate-500">Update your personal and professional information</p></div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fields.map(f => (
                        <div key={f.key}>
                            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{f.label}</label>
                            <input type={f.type} value={form[f.key] || ''} onChange={e => update(f.key, e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200/80 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-800" />
                        </div>
                    ))}
                </div>
                <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Bio</label>
                    <textarea rows={3} value={form.bio || ''} onChange={e => update('bio', e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200/80 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none text-slate-800" />
                </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-xl border border-slate-200/80 text-slate-800 hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={() => onSave(form)} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"><Save className="w-4 h-4" /> Save Changes</button>
            </div>
        </div>
    )
}
