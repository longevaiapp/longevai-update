import { useState, useEffect } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, PieChart, Pie, Legend
} from 'recharts'
import {
    Clipboard, FileText, UserCheck, AlertTriangle, Users, Stethoscope,
    Clock, CheckCircle2, Circle, ChevronDown, ChevronRight, X,
    Send, Plus, Sunrise, Activity, Heart, Thermometer, Droplets,
    Wind, Shield, ArrowRight, Timer, Bell, Eye, MapPin,
    CalendarDays, CircleAlert, CircleDot, TriangleAlert, Phone,
    ClipboardCheck, CircleCheck, Gauge, ListChecks, BadgeCheck,
    ArrowUpRight, ArrowDownRight, Minus, Info,
    UserCircle, Briefcase, GraduationCap, Mail,
    Building2, Globe, Pencil, Save
} from 'lucide-react'

/* ================================================================
   SHIFT CONFIGURATION
   ================================================================ */
const SHIFTS = [
    { id: 'morning', label: 'Morning', start: 6, end: 14, color: 'amber' },
    { id: 'afternoon', label: 'Afternoon', start: 14, end: 22, color: 'sky' },
    { id: 'night', label: 'Night', start: 22, end: 6, color: 'indigo' },
]

function getCurrentShift() {
    const h = new Date().getHours()
    if (h >= 6 && h < 14) return SHIFTS[0]
    if (h >= 14 && h < 22) return SHIFTS[1]
    return SHIFTS[2]
}

function useShiftClock() {
    const [now, setNow] = useState(new Date())
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(t)
    }, [])

    const shift = getCurrentShift()
    const h = now.getHours()
    const m = now.getMinutes()
    const currentMin = h * 60 + m

    let shiftStartMin = shift.start * 60
    let shiftEndMin = shift.end * 60
    if (shift.id === 'night') {
        // Night shift wraps around midnight
        if (h >= 22) {
            shiftStartMin = 22 * 60
            shiftEndMin = 30 * 60 // 6:00 next day = 30h
            const elapsed = currentMin - shiftStartMin
            const total = shiftEndMin - shiftStartMin
            const remaining = total - elapsed
            return { now, shift, progress: Math.round((elapsed / total) * 100), remainingMin: remaining }
        } else {
            shiftStartMin = -2 * 60 // 22:00 prev day
            shiftEndMin = 6 * 60
            const elapsed = currentMin - 0 + 2 * 60
            const total = 8 * 60
            const remaining = shiftEndMin - currentMin
            return { now, shift, progress: Math.round((elapsed / total) * 100), remainingMin: remaining }
        }
    }

    const elapsed = currentMin - shiftStartMin
    const total = shiftEndMin - shiftStartMin
    const remaining = total - elapsed

    return { now, shift, progress: Math.min(Math.round((elapsed / total) * 100), 100), remainingMin: remaining }
}

/* ================================================================
   RESIDENTS - ALL FACILITY
   ================================================================ */
const ALL_RESIDENTS = [
    { id: 1, name: 'Elena Rodriguez', room: '101', age: 78, conditions: ['Hypertension', 'Diabetes T2'], status: 'stable', nurse: 'Nurse Garcia' },
    { id: 2, name: 'Carlos Mendez', room: '102', age: 82, conditions: ['Osteoarthritis', 'Mild cognitive impairment'], status: 'attention', nurse: 'Nurse Garcia' },
    { id: 3, name: 'Maria Silva', room: '103', age: 85, conditions: ['Depression', 'Chronic pain'], status: 'critical', nurse: 'Nurse Garcia' },
    { id: 4, name: 'Jorge Navarro', room: '104', age: 79, conditions: ['COPD', 'Hypertension'], status: 'stable', nurse: 'Nurse Garcia' },
    { id: 5, name: 'Ana Torres', room: '105', age: 74, conditions: ['Diabetes T1', 'Osteoporosis'], status: 'stable', nurse: 'Nurse Martinez' },
    { id: 6, name: 'Roberto Diaz', room: '106', age: 77, conditions: ['Hypertension', 'Obesity'], status: 'attention', nurse: 'Nurse Martinez' },
    { id: 7, name: 'Isabel Moreno', room: '107', age: 81, conditions: ['Parkinson (early)', 'Anxiety'], status: 'stable', nurse: 'Nurse Martinez' },
    { id: 8, name: 'Fernando Castro', room: '108', age: 88, conditions: ['Heart failure (stable)', 'Anemia'], status: 'attention', nurse: 'Nurse Martinez' },
    { id: 9, name: 'Carmen Ruiz', room: '109', age: 76, conditions: ['Arthritis', 'Insomnia'], status: 'stable', nurse: 'Nurse Lopez' },
    { id: 10, name: 'Luis Herrera', room: '110', age: 83, conditions: ['Dementia (moderate)', 'Diabetes T2'], status: 'critical', nurse: 'Nurse Lopez' },
]

const STATUS_CONFIG = {
    stable: { label: 'Stable', bg: 'bg-emerald-100 text-emerald-700', dot: 'text-emerald-500' },
    attention: { label: 'Needs Attention', bg: 'bg-amber-100 text-amber-700', dot: 'text-amber-500' },
    critical: { label: 'Critical Watch', bg: 'bg-red-100 text-red-700', dot: 'text-red-500' },
}

/* ================================================================
   SHIFT BRIEFING DATA
   ================================================================ */
const BRIEFING_ITEMS = [
    { id: 1, category: 'overnight', icon: Clock, label: 'Overnight Event', text: 'Carmen Ruiz (Rm 109) -- Minor fall at 22:15. Examined by night nurse, no injury. Ice applied to knee. See incident #INC-041.', severity: 'warning' },
    { id: 2, category: 'overnight', icon: Clock, label: 'Overnight Event', text: 'Roberto Diaz (Rm 106) -- Restless sleep, called bell 3x between 01:00-03:00. Complained of heartburn. Antacid given. Settled by 03:30.', severity: 'info' },
    { id: 3, category: 'overnight', icon: Clock, label: 'Overnight Event', text: 'Luis Herrera (Rm 110) -- Wandering episode at 04:15. Found in hallway, redirected to room. Calm but confused. Door alarm activated.', severity: 'warning' },
    { id: 4, category: 'priority', icon: AlertTriangle, label: 'Priority Resident', text: 'Maria Silva (Rm 103) -- Depression worsening. Refused dinner last night. Psychologist increased sessions to 3x/week. Daily mood monitoring required.', severity: 'critical' },
    { id: 5, category: 'priority', icon: AlertTriangle, label: 'Priority Resident', text: 'Roberto Diaz (Rm 106) -- BP monitoring every 4 hours per Dr. Gomez. Last reading 148/94 (borderline). Report if >150/95.', severity: 'warning' },
    { id: 6, category: 'priority', icon: AlertTriangle, label: 'Priority Resident', text: 'Fernando Castro (Rm 108) -- New anemia labs came back. Hemoglobin 10.2 g/dL. Iron supplement started today. Watch for GI side effects.', severity: 'warning' },
    { id: 7, category: 'priority', icon: AlertTriangle, label: 'Priority Resident', text: 'Luis Herrera (Rm 110) -- Sundowning expected. Extra supervision 16:00-20:00. Family visiting at 15:00 -- may help with evening anxiety.', severity: 'info' },
    { id: 8, category: 'staff', icon: Users, label: 'Staff Note', text: 'Full staffing today. Nurse Garcia covering Rooms 101-104 (Nurse Sanchez on leave). Student nurse Maria Reyes observing on morning shift.', severity: 'info' },
    { id: 9, category: 'staff', icon: Users, label: 'Staff Note', text: 'Fire drill scheduled for 11:00. All staff to review evacuation routes. Estimated 15-minute disruption.', severity: 'info' },
    { id: 10, category: 'task', icon: ListChecks, label: 'Shift Task', text: 'Medication cart inventory due before end of morning shift. Check controlled substances count with outgoing night nurse.', severity: 'info' },
]

/* ================================================================
   VITALS DATA (per-resident latest + history)
   ================================================================ */
const VITALS_DATA = {
    1: { bp: '132/82', glucose: 128, temp: 36.4, spo2: 97, hr: 72, pain: 2, bpTrend: 'stable', glucoseTrend: 'down', prevBp: '135/85', prevGlucose: 134, notes: 'Stable. Glucose trending down with dietary changes.', lastUpdated: 'Apr 7, 18:00' },
    2: { bp: '128/78', glucose: 98, temp: 36.6, spo2: 96, hr: 68, pain: 5, bpTrend: 'stable', glucoseTrend: 'stable', prevBp: '130/80', prevGlucose: 100, notes: 'Pain level elevated -- arthritis flare. Aquatherapy day.', lastUpdated: 'Apr 7, 18:00' },
    3: { bp: '118/72', glucose: 92, temp: 36.2, spo2: 98, hr: 64, pain: 6, bpTrend: 'stable', glucoseTrend: 'stable', prevBp: '120/74', prevGlucose: 90, notes: 'Low appetite. Mood monitoring in progress. Refused evening meds.', lastUpdated: 'Apr 7, 18:00' },
    4: { bp: '140/88', glucose: 105, temp: 36.5, spo2: 94, hr: 78, pain: 1, bpTrend: 'up', glucoseTrend: 'stable', prevBp: '136/84', prevGlucose: 102, notes: 'SpO2 at lower limit. COPD -- monitor closely. Using supplemental O2 at night.', lastUpdated: 'Apr 7, 18:00' },
    5: { bp: '122/76', glucose: 145, temp: 36.3, spo2: 98, hr: 70, pain: 0, bpTrend: 'stable', glucoseTrend: 'up', prevBp: '120/74', prevGlucose: 132, notes: 'Glucose slightly elevated. Insulin dose may need adjustment. Endocrinologist consulted.', lastUpdated: 'Apr 7, 18:00' },
    6: { bp: '148/94', glucose: 118, temp: 36.7, spo2: 97, hr: 82, pain: 1, bpTrend: 'up', glucoseTrend: 'stable', prevBp: '142/90', prevGlucose: 120, notes: 'BP borderline high. Dr. Gomez orders: monitor every 4h. Report if >150/95.', lastUpdated: 'Apr 7, 22:00' },
    7: { bp: '126/80', glucose: 95, temp: 36.4, spo2: 97, hr: 66, pain: 2, bpTrend: 'stable', glucoseTrend: 'stable', prevBp: '128/82', prevGlucose: 96, notes: 'Tremor slightly more pronounced in mornings. Neuro follow-up in 2 weeks.', lastUpdated: 'Apr 7, 18:00' },
    8: { bp: '135/85', glucose: 102, temp: 36.8, spo2: 95, hr: 88, pain: 3, bpTrend: 'stable', glucoseTrend: 'stable', prevBp: '138/86', prevGlucose: 104, notes: 'Heart rate slightly elevated but within expected range for heart failure. Weight stable at 78kg.', lastUpdated: 'Apr 7, 18:00' },
    9: { bp: '130/82', glucose: 100, temp: 36.5, spo2: 98, hr: 74, pain: 3, bpTrend: 'stable', glucoseTrend: 'stable', prevBp: '132/84', prevGlucose: 98, notes: 'Fall last night -- see incident report. No new pain. Knee checked -- no swelling.', lastUpdated: 'Apr 8, 06:30' },
    10: { bp: '142/88', glucose: 156, temp: 36.6, spo2: 96, hr: 76, pain: 0, bpTrend: 'up', glucoseTrend: 'up', prevBp: '138/86', prevGlucose: 148, notes: 'Glucose trending up -- dietary compliance difficult due to dementia. Wandering episode overnight.', lastUpdated: 'Apr 8, 04:30' },
}

const VITAL_RANGES = {
    glucose: { low: 70, normalLow: 80, normalHigh: 130, high: 160, unit: 'mg/dL' },
    temp: { low: 35.5, normalLow: 36.0, normalHigh: 37.2, high: 38.0, unit: 'C' },
    spo2: { low: 90, normalLow: 95, normalHigh: 100, high: 100, unit: '%' },
    hr: { low: 50, normalLow: 60, normalHigh: 100, high: 120, unit: 'bpm' },
    pain: { low: 0, normalLow: 0, normalHigh: 3, high: 7, unit: '/10' },
}

function vitalStatus(key, value) {
    const r = VITAL_RANGES[key]
    if (!r) return 'normal'
    if (value <= r.low || value >= r.high) return 'critical'
    if (value < r.normalLow || value > r.normalHigh) return 'warning'
    return 'normal'
}

/* ================================================================
   MEAL VALIDATION DATA
   ================================================================ */
const MEALS_TODAY = [
    { residentId: 1, resident: 'Elena Rodriguez', room: '101', meal: 'Breakfast', dish: 'Oatmeal with berries', served: true, eaten: 'full', calories: 420, notes: '' },
    { residentId: 2, resident: 'Carlos Mendez', room: '102', meal: 'Breakfast', dish: 'Scrambled eggs, toast', served: true, eaten: 'partial', calories: 280, notes: 'Left toast uneaten. Jaw pain from arthritis.' },
    { residentId: 3, resident: 'Maria Silva', room: '103', meal: 'Breakfast', dish: 'Yogurt parfait', served: true, eaten: 'refused', calories: 0, notes: 'Refused to come to dining room. Mood very low.' },
    { residentId: 4, resident: 'Jorge Navarro', room: '104', meal: 'Breakfast', dish: 'Toast with jam, tea', served: true, eaten: 'full', calories: 350, notes: '' },
    { residentId: 5, resident: 'Ana Torres', room: '105', meal: 'Breakfast', dish: 'Diabetic pancakes', served: true, eaten: 'full', calories: 380, notes: '' },
    { residentId: 6, resident: 'Roberto Diaz', room: '106', meal: 'Breakfast', dish: 'Fasting', served: false, eaten: 'n/a', calories: 0, notes: 'Fasting for blood test at 09:00' },
    { residentId: 7, resident: 'Isabel Moreno', room: '107', meal: 'Breakfast', dish: 'Soft scrambled eggs', served: true, eaten: 'full', calories: 390, notes: '' },
    { residentId: 8, resident: 'Fernando Castro', room: '108', meal: 'Breakfast', dish: 'Iron-rich porridge', served: true, eaten: 'partial', calories: 260, notes: 'Ate 60%. Complained of mild nausea -- possible iron supplement side effect.' },
    { residentId: 9, resident: 'Carmen Ruiz', room: '109', meal: 'Breakfast', dish: 'Fruit salad, yogurt', served: true, eaten: 'full', calories: 310, notes: '' },
    { residentId: 10, resident: 'Luis Herrera', room: '110', meal: 'Breakfast', dish: 'Soft bread, butter, tea', served: true, eaten: 'partial', calories: 200, notes: 'Needed assistance. Ate about half. Confused about meal time.' },
]

const EATEN_CONFIG = {
    full: { label: 'Full', bg: 'bg-emerald-100 text-emerald-700', pct: 100 },
    partial: { label: 'Partial', bg: 'bg-amber-100 text-amber-700', pct: 60 },
    refused: { label: 'Refused', bg: 'bg-red-100 text-red-700', pct: 0 },
    'n/a': { label: 'N/A', bg: 'bg-slate-100 text-gray-500', pct: 0 },
}

/* ================================================================
   INCIDENTS DATA
   ================================================================ */
const INCIDENTS_LOG = [
    {
        id: 'INC-041', date: 'Apr 7, 2026', time: '22:15', type: 'Fall', severity: 'minor',
        resident: 'Carmen Ruiz', room: '109', reportedBy: 'Night Nurse Rivera',
        description: 'Resident found on floor next to bed. Reports she was trying to reach the bathroom. No loss of consciousness. Alert and oriented.',
        injury: 'Small bruise on right knee. No head injury. No fracture suspected.',
        immediateResponse: 'Helped back to bed. Vital signs checked -- all normal. Ice applied to knee. Incident documented.',
        escalation: 'resolved',
        notified: ['Family Doctor (Apr 8 AM)', 'Gerontologist', 'Family (daughter called)'],
        followUp: 'Non-slip mat repositioned. Night light brightness increased. Physiotherapist to reassess fall risk. Consider bedside commode trial.',
        witnesses: ['Night Nurse Rivera'],
        environmentFactors: ['Nighttime', 'Reaching for bathroom', 'No grab bar at bedside'],
    },
    {
        id: 'INC-042', date: 'Apr 8, 2026', time: '07:30', type: 'Behavioral change', severity: 'moderate',
        resident: 'Maria Silva', room: '103', reportedBy: 'Nurse Garcia',
        description: 'Resident refused to get out of bed. Crying when approached. Stated she "doesn\'t want to be here anymore." No suicidal ideation expressed when directly assessed.',
        injury: 'None (behavioral/psychological)',
        immediateResponse: 'Sat with resident for 15 minutes. Offered comfort. Ensured safety. Documented statements verbatim. Psychologist notified for urgent consult.',
        escalation: 'reported',
        notified: ['Psychologist Vega (urgent)', 'Gerontologist'],
        followUp: 'Psychologist session scheduled for today 10:00. Continue 1:1 check-ins every 2 hours. Document mood and statements. Ensure meals offered in room if refuses dining room.',
        witnesses: ['Nurse Garcia', 'Student Nurse Reyes'],
        environmentFactors: ['Morning routine disruption', 'Depression worsening', 'Social isolation'],
    },
    {
        id: 'INC-043', date: 'Apr 8, 2026', time: '04:15', type: 'Wandering', severity: 'minor',
        resident: 'Luis Herrera', room: '110', reportedBy: 'Night Nurse Rivera',
        description: 'Resident found wandering in corridor near dining room. Wearing pajamas and slippers. Calm but disoriented. Could not state his name or room number when asked.',
        injury: 'None',
        immediateResponse: 'Gently redirected to room. Offered water. Stayed until settled. Door alarm was not activated -- checked and reset.',
        escalation: 'reported',
        notified: ['Gerontologist', 'Family (son, morning call)'],
        followUp: 'Door alarm system verified and tested. Night-time supervision protocol updated. Consider wearable GPS tracker. Discuss with family.',
        witnesses: ['Night Nurse Rivera'],
        environmentFactors: ['Nighttime', 'Dementia', 'Door alarm malfunction'],
    },
]

const ESCALATION_PIPELINE = {
    detected: { label: 'Detected', color: 'bg-red-100 text-red-700 border-red-200' },
    assessed: { label: 'Assessed', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    reported: { label: 'Reported', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    resolved: { label: 'Resolved', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
}
const ESCALATION_ORDER = ['detected', 'assessed', 'reported', 'resolved']

/* ================================================================
   STAFF ROSTER DATA
   ================================================================ */
const STAFF_DATA = [
    { id: 1, name: 'Nurse Garcia', role: 'RN', shift: 'morning', rooms: ['101', '102', '103', '104'], status: 'on-duty', phone: 'Ext. 201', tasksCompleted: 4, tasksTotal: 8, specialNote: 'Covering for Nurse Sanchez (leave)' },
    { id: 2, name: 'Nurse Martinez', role: 'RN', shift: 'morning', rooms: ['105', '106', '107', '108'], status: 'on-duty', phone: 'Ext. 202', tasksCompleted: 5, tasksTotal: 7, specialNote: '' },
    { id: 3, name: 'Nurse Lopez', role: 'RN', shift: 'morning', rooms: ['109', '110'], status: 'on-duty', phone: 'Ext. 203', tasksCompleted: 3, tasksTotal: 5, specialNote: '' },
    { id: 4, name: 'Student Nurse Reyes', role: 'Student', shift: 'morning', rooms: [], status: 'on-duty', phone: 'Ext. 209', tasksCompleted: 0, tasksTotal: 0, specialNote: 'Observing -- assigned to Nurse Garcia' },
    { id: 5, name: 'Nurse Torres', role: 'RN', shift: 'afternoon', rooms: ['101', '102', '103', '104', '105'], status: 'scheduled', phone: 'Ext. 204', tasksCompleted: 0, tasksTotal: 0, specialNote: '' },
    { id: 6, name: 'Nurse Diaz', role: 'RN', shift: 'afternoon', rooms: ['106', '107', '108', '109', '110'], status: 'scheduled', phone: 'Ext. 205', tasksCompleted: 0, tasksTotal: 0, specialNote: '' },
    { id: 7, name: 'Nurse Rivera', role: 'RN', shift: 'night', rooms: ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110'], status: 'off-duty', phone: 'Ext. 206', tasksCompleted: 0, tasksTotal: 0, specialNote: 'Completed night shift 06:00' },
]

const SHIFT_TIMELINE = [
    { shift: 'Night', nurse: 'Rivera', start: 0, end: 6, rooms: 10, color: '#818cf8' },
    { shift: 'Morning', nurse: 'Garcia', start: 6, end: 14, rooms: 4, color: '#f59e0b' },
    { shift: 'Morning', nurse: 'Martinez', start: 6, end: 14, rooms: 4, color: '#f59e0b' },
    { shift: 'Morning', nurse: 'Lopez', start: 6, end: 14, rooms: 2, color: '#f59e0b' },
    { shift: 'Afternoon', nurse: 'Torres', start: 14, end: 22, rooms: 5, color: '#38bdf8' },
    { shift: 'Afternoon', nurse: 'Diaz', start: 14, end: 22, rooms: 5, color: '#38bdf8' },
    { shift: 'Night', nurse: 'Rivera', start: 22, end: 24, rooms: 10, color: '#818cf8' },
]

/* ================================================================
   SPECIALIST INSTRUCTIONS
   ================================================================ */
const SPECIALIST_ORDERS = [
    { id: 1, specialist: 'Dr. Gomez', role: 'Family Doctor', resident: 'Roberto Diaz', room: '106', instruction: 'Monitor BP every 4 hours. Report immediately if systolic >150 or diastolic >95.', date: 'Apr 5', deadline: '2026-04-08T14:00', priority: 'high', category: 'vitals' },
    { id: 2, specialist: 'Psychologist Vega', role: 'Psychologist', resident: 'Maria Silva', room: '103', instruction: 'Extra check-ins every 2 hours during waking hours. Document mood, appetite, and any statements about not wanting to continue. Report verbatim concerning statements.', date: 'Apr 7', deadline: '2026-04-08T22:00', priority: 'critical', category: 'monitoring' },
    { id: 3, specialist: 'Nutritionist Reyes', role: 'Nutritionist', resident: 'Carlos Mendez', room: '102', instruction: 'Switch ALL dairy to lactose-free alternatives starting today. Check kitchen has confirmed the change for lunch and dinner.', date: 'Apr 4', deadline: '2026-04-08T12:00', priority: 'medium', category: 'dietary' },
    { id: 4, specialist: 'Physiotherapist Luna', role: 'Physiotherapist', resident: 'Elena Rodriguez', room: '101', instruction: 'Ensure seated balance exercises completed 3x this week (Mon, Wed, Fri). Walking program 20 min daily. Document any refusals.', date: 'Apr 2', deadline: '2026-04-11T18:00', priority: 'medium', category: 'exercise' },
    { id: 5, specialist: 'Dr. Gomez', role: 'Family Doctor', resident: 'Fernando Castro', room: '108', instruction: 'Start Ferrous Sulfate 325mg once daily with breakfast. Monitor for GI side effects (nausea, constipation, dark stools). Report if unable to tolerate.', date: 'Apr 7', deadline: '2026-04-08T09:00', priority: 'high', category: 'medication' },
    { id: 6, specialist: 'Gerontologist Torres', role: 'Gerontologist', resident: 'Luis Herrera', room: '110', instruction: 'Implement sundowning protocol 16:00-20:00: dim lights, calming music, limit stimulation. 1:1 supervision if agitation increases. Log episodes.', date: 'Apr 6', deadline: '2026-04-08T16:00', priority: 'high', category: 'protocol' },
    { id: 7, specialist: 'Dr. Gomez', role: 'Family Doctor', resident: 'Carmen Ruiz', room: '109', instruction: 'Post-fall monitoring: check for delayed symptoms (dizziness, swelling, new pain) every 4 hours for 48h. Next check due by 10:15 today.', date: 'Apr 8', deadline: '2026-04-08T10:15', priority: 'high', category: 'monitoring' },
    { id: 8, specialist: 'Physiotherapist Luna', role: 'Physiotherapist', resident: 'Carmen Ruiz', room: '109', instruction: 'Post-fall assessment scheduled for tomorrow. Today: observe gait if ambulating. Do not encourage independent walking until reassessed.', date: 'Apr 8', deadline: '2026-04-09T10:00', priority: 'medium', category: 'safety' },
]

/* ================================================================
   NURSING ALERTS
   ================================================================ */
const NURSING_ALERTS = [
    { id: 1, severity: 'critical', area: 'Behavioral', message: 'Maria Silva (103): Stated she "doesn\'t want to be here anymore." Psychologist notified urgently.', time: '1h ago' },
    { id: 2, severity: 'critical', area: 'Vitals', message: 'Luis Herrera (110): Glucose 156 mg/dL -- trending up. Dementia complicating dietary compliance.', time: '3h ago' },
    { id: 3, severity: 'warning', area: 'Fall', message: 'Carmen Ruiz (109): Fall at 22:15 last night. No injury but post-fall monitoring active.', time: '8h ago' },
    { id: 4, severity: 'warning', area: 'Vitals', message: 'Roberto Diaz (106): BP 148/94 -- borderline. Next check due in 2 hours.', time: '4h ago' },
    { id: 5, severity: 'warning', area: 'Wandering', message: 'Luis Herrera (110): Wandering episode at 04:15. Door alarm malfunction -- fixed.', time: '4h ago' },
    { id: 6, severity: 'warning', area: 'Medication', message: 'Fernando Castro (108): New iron supplement started -- watch for GI side effects.', time: '6h ago' },
    { id: 7, severity: 'info', area: 'Dietary', message: 'Carlos Mendez (102): Lactose-free switch confirmed by kitchen for today.', time: '12h ago' },
    { id: 8, severity: 'info', area: 'Admin', message: 'Fire drill scheduled 11:00 today. 15-minute disruption expected.', time: '1d ago' },
]

/* ================================================================
   PROFILE
   ================================================================ */
const PROFILE_STORAGE_KEY = 'longevai-nursing-profile'
const DEFAULT_PROFILE = {
    name: 'Isabel Moreno, RN',
    title: 'Nursing Shift Supervisor',
    license: 'RN-6413-SUP',
    specialization: 'Geriatric Nursing, Shift Operations & Clinical Supervision',
    email: 'i.moreno@amatistalife.com',
    phone: '+34 611 789 012',
    office: 'Building A, Nursing Station',
    institution: 'Amatista Life -- LongevAI Center',
    education: 'BSN, Geriatric Nursing (Universidad de Sevilla)',
    certifications: 'Registered Nurse, Geriatric Care Supervisor, Medication Safety Certified',
    bio: 'Over 16 years of hands-on geriatric nursing experience. Dedicated to shift accountability, resident safety, and seamless interdisciplinary communication across all care teams.',
    shiftStart: '06:00',
    shiftEnd: '14:00',
    yearsExperience: 16,
    residentsManaged: 10,
}
function loadProfile() {
    try { const d = localStorage.getItem(PROFILE_STORAGE_KEY); return d ? { ...DEFAULT_PROFILE, ...JSON.parse(d) } : DEFAULT_PROFILE } catch { return DEFAULT_PROFILE }
}
function saveProfile(p) { localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(p)) }

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function NursingDashboard() {
    const [activeSection, setActiveSection] = useState('briefing')
    const { now, shift, progress, remainingMin } = useShiftClock()

    /* Profile */
    const [profile, setProfile] = useState(() => loadProfile())
    const [editingProfile, setEditingProfile] = useState(false)

    /* Briefing checklist -- localStorage persisted */
    const [briefingChecked, setBriefingChecked] = useState(() => {
        try { return JSON.parse(localStorage.getItem('nursing_briefing_checks') || '{}') } catch { return {} }
    })
    const toggleBriefing = (id) => {
        const next = { ...briefingChecked, [id]: briefingChecked[id] ? null : new Date().toLocaleString() }
        setBriefingChecked(next)
        localStorage.setItem('nursing_briefing_checks', JSON.stringify(next))
    }

    /* Shift log -- localStorage persisted */
    const [shiftLogs, setShiftLogs] = useState(() => {
        try { return JSON.parse(localStorage.getItem('nursing_shift_logs') || '{}') } catch { return {} }
    })
    const [logResident, setLogResident] = useState(ALL_RESIDENTS[0])
    const [logStatus, setLogStatus] = useState('stable')
    const [logFields, setLogFields] = useState({ vitals: '', medications: '', observations: '', mood: '' })
    const [logSaved, setLogSaved] = useState(false)
    const saveShiftLog = () => {
        const key = logResident.id + ':' + shift.id
        const next = { ...shiftLogs, [key]: { ...logFields, status: logStatus, timestamp: new Date().toLocaleString() } }
        setShiftLogs(next)
        localStorage.setItem('nursing_shift_logs', JSON.stringify(next))
        setLogSaved(true)
        setTimeout(() => setLogSaved(false), 3000)
    }

    /* Meal validation -- localStorage persisted */
    const [mealOverrides, setMealOverrides] = useState(() => {
        try { return JSON.parse(localStorage.getItem('nursing_meal_overrides') || '{}') } catch { return {} }
    })
    const toggleMealStatus = (residentId, newStatus) => {
        const next = { ...mealOverrides, [residentId]: newStatus }
        setMealOverrides(next)
        localStorage.setItem('nursing_meal_overrides', JSON.stringify(next))
    }

    /* Incident modals */
    const [selectedIncident, setSelectedIncident] = useState(null)
    const [incidentNotes, setIncidentNotes] = useState(() => {
        try { return JSON.parse(localStorage.getItem('nursing_incident_notes') || '{}') } catch { return {} }
    })
    const addIncidentNote = (incId, text) => {
        const key = incId
        const existing = incidentNotes[key] || []
        const next = { ...incidentNotes, [key]: [...existing, { text, timestamp: new Date().toLocaleString() }] }
        setIncidentNotes(next)
        localStorage.setItem('nursing_incident_notes', JSON.stringify(next))
    }

    /* Staff modal */
    const [selectedStaff, setSelectedStaff] = useState(null)

    /* Specialist instruction confirmations */
    const [orderConfirms, setOrderConfirms] = useState(() => {
        try { return JSON.parse(localStorage.getItem('nursing_order_confirms') || '{}') } catch { return {} }
    })
    const [instructionFilter, setInstructionFilter] = useState('all')
    const confirmOrder = (id) => {
        const next = { ...orderConfirms, [id]: new Date().toLocaleString() }
        setOrderConfirms(next)
        localStorage.setItem('nursing_order_confirms', JSON.stringify(next))
    }

    /* Selected resident for vitals modal */
    const [selectedVitalsResident, setSelectedVitalsResident] = useState(null)

    /* Computed */
    const briefingTotal = BRIEFING_ITEMS.length
    const briefingDone = BRIEFING_ITEMS.filter(b => briefingChecked[b.id]).length
    const briefingPct = Math.round((briefingDone / briefingTotal) * 100)

    const remainH = Math.floor(remainingMin / 60)
    const remainM = remainingMin % 60

    const ordersConfirmedCount = SPECIALIST_ORDERS.filter(o => orderConfirms[o.id]).length
    const ordersPending = SPECIALIST_ORDERS.filter(o => !orderConfirms[o.id])

    // Shift completeness score
    const logsCompleted = ALL_RESIDENTS.filter(r => shiftLogs[r.id + ':' + shift.id]).length
    const mealsValidated = MEALS_TODAY.filter(m => mealOverrides[m.residentId] || m.eaten).length
    const shiftCompleteness = Math.round(((briefingDone + logsCompleted + mealsValidated + ordersConfirmedCount) / (briefingTotal + ALL_RESIDENTS.length + MEALS_TODAY.length + SPECIALIST_ORDERS.length)) * 100)

    return (
        <DashboardShell
            roleId="nursing"
            roleTag="Nursing Supervisor -- 3 Shifts Daily"
            title="Shift Operations Command Center"
            badges={[]}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            notifications={NURSING_ALERTS}
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

            {/* ── LIVE SHIFT BAR ── */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${shift.id === 'morning' ? 'bg-amber-100' : shift.id === 'afternoon' ? 'bg-sky-100' : 'bg-indigo-100'}`}>
                            <Sunrise className={`w-5 h-5 ${shift.id === 'morning' ? 'text-amber-600' : shift.id === 'afternoon' ? 'text-sky-600' : 'text-indigo-600'}`} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-800">{shift.label} Shift</span>
                                <span className="text-xs text-slate-500">({String(shift.start).padStart(2, '0')}:00 -- {String(shift.end).padStart(2, '0')}:00)</span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <Clock className="w-3 h-3 text-slate-500" />
                                <span className="text-xs font-mono text-slate-800">{now.toLocaleTimeString()}</span>
                                <span className="text-[10px] text-slate-500">|</span>
                                <span className={`text-[10px] font-semibold ${remainingMin <= 60 ? 'text-amber-600' : 'text-slate-500'}`}>
                                    {remainH}h {remainM}m remaining
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-semibold text-slate-500 uppercase">Shift Progress</span>
                            <span className="text-[10px] font-bold text-slate-800">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`h-2.5 rounded-full transition-all duration-1000 ${progress >= 90 ? 'bg-red-500' : progress >= 75 ? 'bg-amber-500' : 'bg-indigo-600'}`}
                                style={{ width: progress + '%' }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-center px-3 py-1.5 bg-indigo-600/5 rounded-lg border border-indigo-600/10">
                            <p className="text-lg font-bold text-slate-800">{shiftCompleteness}%</p>
                            <p className="text-[9px] font-semibold text-slate-500 uppercase">Documented</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                            {SHIFTS.map(s => (
                                <div key={s.id} className={`px-2 py-1 rounded text-[10px] font-semibold border ${s.id === shift.id ? (s.id === 'morning' ? 'bg-amber-100 text-amber-700 border-amber-200' : s.id === 'afternoon' ? 'bg-sky-100 text-sky-700 border-sky-200' : 'bg-indigo-100 text-indigo-700 border-indigo-200') : 'bg-slate-50 text-gray-400 border-slate-100'}`}>
                                    {s.label.charAt(0)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SECTION: SHIFT BRIEFING ── */}
            {activeSection === 'briefing' && (
                <div className="space-y-6">
                    <SectionCard title="Shift Briefing Checklist" icon={Clipboard} subtitle={`${briefingDone}/${briefingTotal} items reviewed -- ${briefingPct}% complete`}
                        headerRight={<span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${briefingPct === 100 ? 'bg-emerald-100 text-emerald-700' : briefingPct >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{briefingPct === 100 ? 'Complete' : 'In Progress'}</span>}>
                        {['overnight', 'priority', 'staff', 'task'].map(cat => {
                            const items = BRIEFING_ITEMS.filter(b => b.category === cat)
                            if (items.length === 0) return null
                            const catLabels = { overnight: 'Overnight Events', priority: 'Priority Residents', staff: 'Staffing & Admin', task: 'Shift Tasks' }
                            return (
                                <div key={cat} className="mb-4 last:mb-0">
                                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">{catLabels[cat]}</p>
                                    <div className="space-y-2">
                                        {items.map(item => {
                                            const checked = !!briefingChecked[item.id]
                                            const Icon = item.icon
                                            return (
                                                <div
                                                    key={item.id}
                                                    onClick={() => toggleBriefing(item.id)}
                                                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${checked ? 'border-emerald-200 bg-emerald-50/50 opacity-75' : item.severity === 'critical' ? 'border-red-200 bg-red-50/30' : item.severity === 'warning' ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100 bg-slate-50'}`}
                                                >
                                                    <div className="flex-shrink-0 mt-0.5">
                                                        {checked ? (
                                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                        ) : (
                                                            <Circle className={`w-5 h-5 ${item.severity === 'critical' ? 'text-red-300' : item.severity === 'warning' ? 'text-amber-300' : 'text-gray-300'}`} />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <Icon className={`w-3.5 h-3.5 ${item.severity === 'critical' ? 'text-red-500' : item.severity === 'warning' ? 'text-amber-500' : 'text-slate-500'}`} />
                                                            <span className={`text-[10px] font-bold uppercase ${item.severity === 'critical' ? 'text-red-600' : item.severity === 'warning' ? 'text-amber-600' : 'text-slate-500'}`}>{item.label}</span>
                                                        </div>
                                                        <p className={`text-xs mt-1 leading-relaxed ${checked ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{item.text}</p>
                                                        {checked && briefingChecked[item.id] && (
                                                            <p className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Reviewed at {briefingChecked[item.id]}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </SectionCard>

                    {/* Resident Status Overview */}
                    <SectionCard title="Resident Status Overview" icon={Activity} subtitle="Quick status of all 10 residents">
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {ALL_RESIDENTS.map(r => {
                                const st = STATUS_CONFIG[r.status]
                                return (
                                    <div key={r.id} className={`p-2.5 rounded-xl border text-center cursor-default ${r.status === 'critical' ? 'border-red-200 bg-red-50/40' : r.status === 'attention' ? 'border-amber-200 bg-amber-50/40' : 'border-slate-100 bg-slate-50'}`}>
                                        <Circle className={`w-2.5 h-2.5 fill-current mx-auto mb-1 ${st.dot}`} />
                                        <p className="text-xs font-semibold text-slate-800 truncate">{r.name.split(' ')[0]}</p>
                                        <p className="text-[10px] text-slate-500">Rm {r.room}</p>
                                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mt-1 inline-block ${st.bg}`}>{st.label}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ── SECTION: SHIFT LOG ── */}
            {activeSection === 'log' && (
                <div className="space-y-6">
                    <SectionCard title="Per-Resident Shift Log" icon={FileText} subtitle="Structured vitals entry with range indicators">
                        {/* Resident selector */}
                        <div className="bg-slate-50 rounded-xl p-3 mb-4 flex items-center gap-3 flex-wrap">
                            <UserCheck className="w-4 h-4 text-indigo-500" />
                            <span className="text-xs font-semibold text-slate-800">Resident:</span>
                            <div className="relative">
                                <select
                                    value={logResident.id}
                                    onChange={e => { setLogResident(ALL_RESIDENTS.find(r => r.id === Number(e.target.value))); setLogFields({ vitals: '', medications: '', observations: '', mood: '' }); setLogStatus('stable') }}
                                    className="appearance-none bg-white border border-slate-200/80 rounded-lg px-3 py-1.5 pr-7 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                                >
                                    {ALL_RESIDENTS.map(r => (
                                        <option key={r.id} value={r.id}>{r.name} (Rm {r.room})</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                {shiftLogs[logResident.id + ':' + shift.id] && (
                                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Logged</span>
                                )}
                                <select
                                    value={logStatus}
                                    onChange={e => setLogStatus(e.target.value)}
                                    className={`appearance-none text-[10px] font-bold uppercase px-2 py-1 rounded-lg border ${STATUS_CONFIG[logStatus].bg}`}
                                >
                                    <option value="stable">Stable</option>
                                    <option value="attention">Needs Attention</option>
                                    <option value="critical">Critical Watch</option>
                                </select>
                            </div>
                        </div>

                        {/* Current vitals display */}
                        {VITALS_DATA[logResident.id] && (
                            <div className="mb-4">
                                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Latest Vitals (click for detail)</p>
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                    {[
                                        { key: 'bp', label: 'BP', value: VITALS_DATA[logResident.id].bp, icon: Heart, unit: 'mmHg', status: VITALS_DATA[logResident.id].bpTrend },
                                        { key: 'glucose', label: 'Glucose', value: VITALS_DATA[logResident.id].glucose, icon: Droplets, unit: 'mg/dL', status: vitalStatus('glucose', VITALS_DATA[logResident.id].glucose) },
                                        { key: 'temp', label: 'Temp', value: VITALS_DATA[logResident.id].temp, icon: Thermometer, unit: 'C', status: vitalStatus('temp', VITALS_DATA[logResident.id].temp) },
                                        { key: 'spo2', label: 'SpO2', value: VITALS_DATA[logResident.id].spo2, icon: Wind, unit: '%', status: vitalStatus('spo2', VITALS_DATA[logResident.id].spo2) },
                                        { key: 'hr', label: 'HR', value: VITALS_DATA[logResident.id].hr, icon: Activity, unit: 'bpm', status: vitalStatus('hr', VITALS_DATA[logResident.id].hr) },
                                        { key: 'pain', label: 'Pain', value: VITALS_DATA[logResident.id].pain, icon: CircleAlert, unit: '/10', status: vitalStatus('pain', VITALS_DATA[logResident.id].pain) },
                                    ].map(v => {
                                        const Icon = v.icon
                                        const colors = { normal: 'border-emerald-200 bg-emerald-50', warning: 'border-amber-200 bg-amber-50', critical: 'border-red-200 bg-red-50', stable: 'border-emerald-200 bg-emerald-50', up: 'border-amber-200 bg-amber-50', down: 'border-sky-200 bg-sky-50' }
                                        const textColors = { normal: 'text-emerald-700', warning: 'text-amber-700', critical: 'text-red-700', stable: 'text-emerald-700', up: 'text-amber-700', down: 'text-sky-700' }
                                        return (
                                            <div
                                                key={v.key}
                                                onClick={() => setSelectedVitalsResident(logResident)}
                                                className={`p-2.5 rounded-xl border text-center cursor-pointer hover:shadow-sm transition-all ${colors[v.status] || colors.normal}`}
                                            >
                                                <Icon className={`w-3.5 h-3.5 mx-auto mb-1 ${textColors[v.status] || textColors.normal}`} />
                                                <p className="text-[9px] font-semibold text-slate-500 uppercase">{v.label}</p>
                                                <p className={`text-sm font-bold ${textColors[v.status] || textColors.normal}`}>{v.value}</p>
                                                <p className="text-[9px] text-slate-500">{v.unit}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                {VITALS_DATA[logResident.id].notes && (
                                    <p className="text-[11px] text-slate-500 mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                                        <Info className="w-3 h-3 inline mr-1 text-slate-500" />{VITALS_DATA[logResident.id].notes}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Previous shift log if exists */}
                        {shiftLogs[logResident.id + ':' + shift.id] && (
                            <div className="p-3 rounded-xl bg-indigo-600/5 border border-indigo-600/10 mb-4">
                                <p className="text-[10px] font-semibold text-indigo-600 uppercase mb-1">Previously Logged This Shift</p>
                                <p className="text-[10px] text-slate-500">Logged at {shiftLogs[logResident.id + ':' + shift.id].timestamp}</p>
                            </div>
                        )}

                        {/* Log fields */}
                        <div className="space-y-3">
                            {[
                                { key: 'vitals', label: 'Vital Signs Update', placeholder: 'BP, glucose, temp, SpO2, HR, pain level...', icon: Heart },
                                { key: 'medications', label: 'Medications Administered', placeholder: 'Confirm medications given, time, any issues...', icon: Shield },
                                { key: 'observations', label: 'Clinical Observations', placeholder: 'Notable observations, changes, concerns...', icon: Eye },
                                { key: 'mood', label: 'Mood & Behavior', placeholder: 'Emotional state, engagement, social interaction...', icon: Activity },
                            ].map(f => {
                                const Icon = f.icon
                                return (
                                    <div key={f.key}>
                                        <label className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                            <Icon className="w-3 h-3" /> {f.label}
                                        </label>
                                        <textarea
                                            rows={2} value={logFields[f.key]}
                                            onChange={e => setLogFields({ ...logFields, [f.key]: e.target.value })}
                                            className="w-full px-3 py-2 text-xs border border-slate-200/80 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none text-slate-800 placeholder-slate-500/50"
                                            placeholder={f.placeholder}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                            <button onClick={saveShiftLog} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                                <Send className="w-3.5 h-3.5" /> Submit Shift Log
                            </button>
                            {logSaved && (
                                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1" style={{ animation: 'modalIn 0.2s ease-out' }}>
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved successfully
                                </span>
                            )}
                        </div>
                    </SectionCard>

                    {/* Log completion tracker */}
                    <SectionCard title="Shift Log Completion" icon={ClipboardCheck} subtitle={`${logsCompleted}/${ALL_RESIDENTS.length} residents logged this shift`}>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {ALL_RESIDENTS.map(r => {
                                const logged = !!shiftLogs[r.id + ':' + shift.id]
                                return (
                                    <div key={r.id} className={`p-2.5 rounded-xl border text-center ${logged ? 'border-emerald-200 bg-emerald-50' : 'border-slate-100 bg-slate-50'}`}>
                                        {logged ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto mb-1" /> : <Circle className="w-4 h-4 text-gray-300 mx-auto mb-1" />}
                                        <p className="text-[11px] font-semibold text-slate-800 truncate">{r.name.split(' ')[0]}</p>
                                        <p className="text-[10px] text-slate-500">Rm {r.room}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ── SECTION: MEAL VALIDATION ── */}
            {activeSection === 'meals' && (
                <SectionCard title="Meal Validation Checklist" icon={UserCheck} subtitle="Toggle status -- track intake across all residents">
                    {(() => {
                        const mealData = MEALS_TODAY.map(m => {
                            const override = mealOverrides[m.residentId]
                            const eaten = override || m.eaten
                            return { ...m, eaten }
                        })
                        const fullCount = mealData.filter(m => m.eaten === 'full').length
                        const partialCount = mealData.filter(m => m.eaten === 'partial').length
                        const refusedCount = mealData.filter(m => m.eaten === 'refused').length
                        const naCount = mealData.filter(m => m.eaten === 'n/a').length
                        const avgCalories = Math.round(mealData.reduce((sum, m) => sum + (EATEN_CONFIG[m.eaten]?.pct || 0) * m.calories / 100, 0) / mealData.filter(m => m.eaten !== 'n/a').length)

                        return (
                            <div>
                                {/* Summary bar */}
                                <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                                    <span className="text-xs font-semibold text-slate-800">Summary:</span>
                                    <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded font-semibold">{fullCount} Full</span>
                                    <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded font-semibold">{partialCount} Partial</span>
                                    <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 rounded font-semibold">{refusedCount} Refused</span>
                                    <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-gray-500 rounded font-semibold">{naCount} N/A</span>
                                    <span className="ml-auto text-[10px] font-semibold text-slate-500">Avg Est. Intake: <strong className="text-slate-800">{avgCalories} kcal</strong></span>
                                </div>

                                {/* Meal cards */}
                                <div className="space-y-2">
                                    {mealData.map((m, i) => {
                                        const config = EATEN_CONFIG[m.eaten]
                                        const statusOptions = ['full', 'partial', 'refused', 'n/a']
                                        return (
                                            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${m.eaten === 'refused' ? 'border-red-200 bg-red-50/30' : m.eaten === 'partial' ? 'border-amber-200 bg-amber-50/20' : 'border-slate-100 bg-slate-50'}`}>
                                                <div className="flex-shrink-0">
                                                    {m.served ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4 text-gray-300" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-semibold text-slate-800">{m.resident}</span>
                                                        <span className="text-[10px] text-slate-500">Rm {m.room}</span>
                                                    </div>
                                                    <p className="text-[11px] text-slate-500">{m.dish}</p>
                                                    {m.notes && <p className="text-[10px] text-amber-600 mt-0.5">{m.notes}</p>}
                                                </div>
                                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                                    {statusOptions.map(s => (
                                                        <button
                                                            key={s}
                                                            onClick={() => toggleMealStatus(m.residentId, s)}
                                                            className={`text-[9px] font-bold uppercase px-2 py-1 rounded-lg border transition-all ${m.eaten === s ? EATEN_CONFIG[s].bg + ' border-current' : 'bg-white text-gray-400 border-slate-200/80 hover:border-gray-300'}`}
                                                        >
                                                            {EATEN_CONFIG[s].label}
                                                        </button>
                                                    ))}
                                                </div>
                                                <span className="text-[10px] font-semibold text-slate-500 flex-shrink-0 w-12 text-right">
                                                    {Math.round(m.calories * (EATEN_CONFIG[m.eaten]?.pct || 0) / 100)} cal
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Intake distribution chart */}
                                <div className="mt-6">
                                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Intake Distribution</p>
                                    <div className="h-48">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={[
                                                        { name: 'Full', value: fullCount, fill: '#059669' },
                                                        { name: 'Partial', value: partialCount, fill: '#d97706' },
                                                        { name: 'Refused', value: refusedCount, fill: '#dc2626' },
                                                        { name: 'N/A', value: naCount, fill: '#9ca3af' },
                                                    ].filter(d => d.value > 0)}
                                                    cx="50%" cy="50%" outerRadius={60} innerRadius={30}
                                                    dataKey="value" label={({ name, value }) => name + ': ' + value}
                                                    labelLine={false}
                                                >
                                                </Pie>
                                                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                                                <Legend wrapperStyle={{ fontSize: 10 }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )
                    })()}
                </SectionCard>
            )}

            {/* ── SECTION: INCIDENTS ── */}
            {activeSection === 'incidents' && (
                <SectionCard title="Incident Log & Escalation" icon={AlertTriangle} subtitle={INCIDENTS_LOG.length + ' incidents in current cycle'}>
                    <div className="space-y-3">
                        {INCIDENTS_LOG.map(inc => {
                            const escConfig = ESCALATION_PIPELINE[inc.escalation]
                            return (
                                <div
                                    key={inc.id}
                                    onClick={() => setSelectedIncident(inc)}
                                    className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ${inc.severity === 'moderate' ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200/80 bg-slate-50'}`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono text-slate-500">{inc.id}</span>
                                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${inc.severity === 'moderate' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-gray-600'}`}>{inc.severity}</span>
                                            <span className="text-xs font-semibold text-slate-800">{inc.type}</span>
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${escConfig.color}`}>{escConfig.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs text-slate-800 font-medium">{inc.resident}</span>
                                        <span className="text-[10px] text-slate-500">Rm {inc.room}</span>
                                        <span className="text-[10px] text-slate-500 ml-auto">{inc.date} at {inc.time}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2">{inc.description}</p>

                                    {/* Mini escalation pipeline */}
                                    <div className="flex items-center gap-1 mt-3">
                                        {ESCALATION_ORDER.map((stage, i) => {
                                            const reached = ESCALATION_ORDER.indexOf(inc.escalation) >= i
                                            return (
                                                <div key={stage} className="flex items-center gap-1">
                                                    <div className={`w-2 h-2 rounded-full ${reached ? (stage === 'resolved' ? 'bg-emerald-500' : 'bg-indigo-600') : 'bg-gray-300'}`} />
                                                    <span className={`text-[9px] ${reached ? 'text-slate-800 font-semibold' : 'text-gray-400'}`}>{ESCALATION_PIPELINE[stage].label}</span>
                                                    {i < ESCALATION_ORDER.length - 1 && <ArrowRight className={`w-3 h-3 ${reached ? 'text-indigo-600' : 'text-gray-300'}`} />}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </SectionCard>
            )}

            {/* ── SECTION: STAFF ROSTER ── */}
            {activeSection === 'roster' && (
                <div className="space-y-6">
                    <SectionCard title="Staff Roster & Coverage" icon={Users} subtitle="Shift assignments and task progress">
                        <div className="space-y-2">
                            {STAFF_DATA.map(s => {
                                const isCurrentShift = s.shift === shift.id
                                const taskPct = s.tasksTotal > 0 ? Math.round((s.tasksCompleted / s.tasksTotal) * 100) : null
                                return (
                                    <div
                                        key={s.id}
                                        onClick={() => setSelectedStaff(s)}
                                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:shadow-md transition-all ${isCurrentShift ? 'border-emerald-200 bg-emerald-50/40' : 'border-slate-100 bg-slate-50'}`}
                                    >
                                        <Circle className={`w-3 h-3 fill-current flex-shrink-0 ${s.status === 'on-duty' ? 'text-emerald-500' : s.status === 'scheduled' ? 'text-sky-400' : 'text-gray-300'}`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-sm font-semibold text-slate-800">{s.name}</span>
                                                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${s.status === 'on-duty' ? 'bg-emerald-100 text-emerald-700' : s.status === 'scheduled' ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-gray-500'}`}>{s.status === 'on-duty' ? s.shift : s.shift}</span>
                                                <span className="text-[10px] text-slate-500">{s.role}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] text-slate-500">Rooms: {s.rooms.length > 0 ? s.rooms.join(', ') : 'N/A'}</span>
                                                {s.specialNote && <span className="text-[10px] text-amber-600 font-medium">-- {s.specialNote}</span>}
                                            </div>
                                        </div>
                                        {taskPct !== null && (
                                            <div className="flex flex-col items-end flex-shrink-0">
                                                <span className={`text-sm font-bold ${taskPct >= 80 ? 'text-emerald-600' : taskPct >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{taskPct}%</span>
                                                <span className="text-[9px] text-slate-500">{s.tasksCompleted}/{s.tasksTotal} tasks</span>
                                            </div>
                                        )}
                                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>

                    {/* Shift Coverage Timeline */}
                    <SectionCard title="24-Hour Coverage Timeline" icon={CalendarDays} subtitle="Nurse coverage across all shifts">
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={SHIFT_TIMELINE} layout="vertical" margin={{ top: 5, right: 10, left: 60, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis type="number" domain={[0, 24]} tick={{ fontSize: 10 }} stroke="#9ca3af" tickCount={9} />
                                    <YAxis type="category" dataKey="nurse" tick={{ fontSize: 10 }} stroke="#9ca3af" width={55} />
                                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v, name) => {
                                        if (name === 'start') return [v + ':00', 'Start']
                                        return [v + ':00', 'End']
                                    }} />
                                    <Bar dataKey="end" radius={[0, 4, 4, 0]} name="Coverage">
                                        {SHIFT_TIMELINE.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center gap-4 mt-2 justify-center">
                            <span className="flex items-center gap-1.5 text-[10px] text-slate-500"><div className="w-3 h-3 rounded bg-amber-400" /> Morning</span>
                            <span className="flex items-center gap-1.5 text-[10px] text-slate-500"><div className="w-3 h-3 rounded bg-sky-400" /> Afternoon</span>
                            <span className="flex items-center gap-1.5 text-[10px] text-slate-500"><div className="w-3 h-3 rounded bg-indigo-400" /> Night</span>
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ── SECTION: SPECIALIST INSTRUCTIONS ── */}
            {activeSection === 'instructions' && (
                <SectionCard title="Specialist Instructions Feed" icon={Stethoscope} subtitle={`${ordersConfirmedCount}/${SPECIALIST_ORDERS.length} confirmed`}
                    headerRight={
                        <div className="flex items-center gap-1">
                            {['all', 'pending', 'confirmed', 'overdue'].map(f => (
                                <button key={f} onClick={() => setInstructionFilter(f)} className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border transition-all ${instructionFilter === f ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200/80 hover:border-gray-300'}`}>{f}</button>
                            ))}
                        </div>
                    }
                >
                    <div className="space-y-2">
                        {SPECIALIST_ORDERS.filter(o => {
                            if (instructionFilter === 'all') return true
                            if (instructionFilter === 'confirmed') return !!orderConfirms[o.id]
                            if (instructionFilter === 'pending') return !orderConfirms[o.id]
                            if (instructionFilter === 'overdue') return !orderConfirms[o.id] && new Date(o.deadline) < new Date()
                            return true
                        }).map(order => {
                            const confirmed = orderConfirms[order.id]
                            const isOverdue = !confirmed && new Date(order.deadline) < new Date()
                            const deadlineDate = new Date(order.deadline)
                            const diffMs = deadlineDate - new Date()
                            const diffH = Math.floor(diffMs / 3600000)
                            const diffM = Math.floor((diffMs % 3600000) / 60000)
                            const countdown = diffMs > 0 ? (diffH > 0 ? diffH + 'h ' + diffM + 'm' : diffM + 'm') : 'Overdue'

                            const priorityColors = {
                                critical: 'border-red-200 bg-red-50/40',
                                high: 'border-amber-200 bg-amber-50/30',
                                medium: 'border-slate-200/80 bg-slate-50',
                            }
                            const priorityBadge = {
                                critical: 'bg-red-100 text-red-700',
                                high: 'bg-amber-100 text-amber-700',
                                medium: 'bg-slate-100 text-gray-600',
                            }

                            return (
                                <div key={order.id} className={`p-3 rounded-xl border transition-all ${confirmed ? 'border-emerald-200 bg-emerald-50/40 opacity-75' : isOverdue ? 'border-red-300 bg-red-50/50 animate-pulse' : priorityColors[order.priority]}`}>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                <span className="text-xs font-semibold text-slate-800">{order.resident}</span>
                                                <span className="text-[10px] text-slate-500">Rm {order.room}</span>
                                                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${priorityBadge[order.priority]}`}>{order.priority}</span>
                                                {!confirmed && (
                                                    <span className={`text-[9px] font-semibold ml-auto flex items-center gap-1 ${isOverdue ? 'text-red-600' : diffH < 2 ? 'text-amber-600' : 'text-slate-500'}`}>
                                                        <Timer className="w-3 h-3" /> {countdown}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-800 leading-relaxed">{order.instruction}</p>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <span className="text-[10px] text-slate-500">{order.specialist} ({order.role})</span>
                                                <span className="text-[10px] text-slate-500">-- {order.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            {confirmed ? (
                                                <div className="flex flex-col items-center">
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                    <span className="text-[9px] text-emerald-600 mt-0.5">Confirmed</span>
                                                </div>
                                            ) : (
                                                <button onClick={(e) => { e.stopPropagation(); confirmOrder(order.id) }} className={`text-[10px] font-semibold px-3 py-1.5 rounded-lg border transition-all ${isOverdue ? 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200' : 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200'}`}>
                                                    Confirm
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {confirmed && (
                                        <p className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Confirmed at {confirmed}</p>
                                    )}
                                </div>
                            )
                        })}
                        {SPECIALIST_ORDERS.filter(o => {
                            if (instructionFilter === 'pending') return !orderConfirms[o.id]
                            if (instructionFilter === 'confirmed') return !!orderConfirms[o.id]
                            if (instructionFilter === 'overdue') return !orderConfirms[o.id] && new Date(o.deadline) < new Date()
                            return false
                        }).length === 0 && instructionFilter !== 'all' && (
                            <div className="text-center py-6">
                                <BadgeCheck className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                                <p className="text-xs text-slate-500">No {instructionFilter} instructions</p>
                            </div>
                        )}
                    </div>
                </SectionCard>
            )}

            {/* ── MODALS ── */}
            {selectedIncident && (
                <Modal onClose={() => setSelectedIncident(null)}>
                    <IncidentDetailModal
                        incident={selectedIncident}
                        notes={incidentNotes[selectedIncident.id] || []}
                        onAddNote={(text) => addIncidentNote(selectedIncident.id, text)}
                        onClose={() => setSelectedIncident(null)}
                    />
                </Modal>
            )}

            {selectedStaff && (
                <Modal onClose={() => setSelectedStaff(null)}>
                    <StaffDetailModal staff={selectedStaff} residents={ALL_RESIDENTS} onClose={() => setSelectedStaff(null)} />
                </Modal>
            )}

            {selectedVitalsResident && (
                <Modal onClose={() => setSelectedVitalsResident(null)}>
                    <VitalsDetailModal resident={selectedVitalsResident} vitals={VITALS_DATA[selectedVitalsResident.id]} onClose={() => setSelectedVitalsResident(null)} />
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

function SectionCard({ title, icon: Icon, subtitle, headerRight, children }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
                <Icon className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
                    {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
                </div>
                {headerRight}
            </div>
            <div className="p-5">{children}</div>
        </div>
    )
}

function Modal({ onClose, children }) {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()} style={{ animation: 'modalIn 0.2s ease-out' }}>
                {children}
            </div>
        </div>
    )
}

function NoteSection({ notes, onAddNote }) {
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
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Nursing Notes {notes.length > 0 && <span className="text-indigo-600">({notes.length})</span>}
            </p>
            {notes.length > 0 && (
                <div className="space-y-2 mb-3">
                    {notes.map((note, i) => (
                        <div key={i} className="p-3 rounded-lg bg-blue-50/60 border border-blue-200/60">
                            <div className="flex items-start gap-2">
                                <FileText className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
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
                    <p className="text-xs text-slate-500">No nursing notes added yet</p>
                </div>
            )}
            {showForm && (
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2 mb-3" style={{ animation: 'modalIn 0.2s ease-out' }}>
                    <textarea autoFocus rows={3} value={text} onChange={e => setText(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200/80 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none text-slate-800 placeholder-slate-500/50"
                        placeholder="Enter nursing observation, follow-up action, or care note..." />
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
                    <p className="text-xs font-medium text-emerald-700">Nursing note saved successfully</p>
                </div>
            )}
            <button onClick={() => setShowForm(true)} disabled={showForm} className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${showForm ? 'bg-slate-100 text-gray-400 border-slate-200/80 cursor-default' : 'bg-white text-slate-800 border-slate-200/80 hover:bg-slate-50'}`}>
                <Plus className="w-3.5 h-3.5" /> Add Nursing Note
            </button>
        </div>
    )
}

/* ================================================================
   MODAL CONTENTS
   ================================================================ */

function IncidentDetailModal({ incident, notes, onAddNote, onClose }) {
    return (
        <div>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${incident.severity === 'moderate' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200/80'}`}>
                <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-5 h-5 ${incident.severity === 'moderate' ? 'text-amber-600' : 'text-gray-500'}`} />
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">Incident {incident.id} -- {incident.type}</h3>
                        <p className="text-[11px] text-slate-500">{incident.resident} (Rm {incident.room}) -- {incident.date} at {incident.time}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                {/* Escalation pipeline */}
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Escalation Status</p>
                    <div className="flex items-center gap-1">
                        {ESCALATION_ORDER.map((stage, i) => {
                            const reached = ESCALATION_ORDER.indexOf(incident.escalation) >= i
                            return (
                                <div key={stage} className="flex items-center gap-1 flex-1">
                                    <div className={`flex-1 p-2 rounded-lg border text-center ${reached ? ESCALATION_PIPELINE[stage].color : 'bg-slate-50 border-slate-200/80 text-gray-400'}`}>
                                        <span className="text-[10px] font-bold uppercase">{ESCALATION_PIPELINE[stage].label}</span>
                                    </div>
                                    {i < ESCALATION_ORDER.length - 1 && <ArrowRight className={`w-3 h-3 flex-shrink-0 ${reached ? 'text-indigo-600' : 'text-gray-300'}`} />}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</p>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <p className="text-sm text-slate-800 leading-relaxed">{incident.description}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Injury Assessment</p>
                        <div className={`p-3 rounded-lg border ${incident.injury === 'None' || incident.injury.includes('None') ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                            <p className={`text-xs font-medium ${incident.injury === 'None' || incident.injury.includes('None') ? 'text-emerald-700' : 'text-amber-700'}`}>{incident.injury}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Reported By</p>
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <p className="text-xs font-medium text-slate-800">{incident.reportedBy}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Immediate Response</p>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <p className="text-sm text-slate-800 leading-relaxed">{incident.immediateResponse}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Follow-Up Actions</p>
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-sm text-blue-800 leading-relaxed">{incident.followUp}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Environment Factors</p>
                    <div className="flex flex-wrap gap-1.5">
                        {incident.environmentFactors.map((f, i) => (
                            <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-red-50 border border-red-200 text-red-700">{f}</span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] text-slate-500 mr-1">Notified:</span>
                    {incident.notified.map((n, j) => (
                        <span key={j} className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">{n}</span>
                    ))}
                </div>

                <NoteSection notes={notes} onAddNote={onAddNote} />
            </div>
        </div>
    )
}

function StaffDetailModal({ staff, residents, onClose }) {
    const assignedResidents = residents.filter(r => staff.rooms.includes(r.room))
    return (
        <div>
            <div className="px-6 py-4 border-b bg-slate-50 border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-indigo-500" />
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">{staff.name}</h3>
                        <p className="text-[11px] text-slate-500">{staff.role} -- {staff.shift} shift -- {staff.phone}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                    <div className={`p-3 rounded-xl border text-center ${staff.status === 'on-duty' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200/80'}`}>
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">Status</p>
                        <p className={`text-sm font-bold mt-0.5 ${staff.status === 'on-duty' ? 'text-emerald-700' : 'text-gray-600'}`}>{staff.status}</p>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-200/80 bg-slate-50 text-center">
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">Rooms</p>
                        <p className="text-sm font-bold mt-0.5 text-slate-800">{staff.rooms.length || '--'}</p>
                    </div>
                    {staff.tasksTotal > 0 && (
                        <div className="p-3 rounded-xl border border-slate-200/80 bg-slate-50 text-center">
                            <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">Tasks</p>
                            <p className="text-sm font-bold mt-0.5 text-slate-800">{staff.tasksCompleted}/{staff.tasksTotal}</p>
                        </div>
                    )}
                </div>

                {staff.specialNote && (
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <p className="text-xs text-amber-700 font-medium">{staff.specialNote}</p>
                    </div>
                )}

                {assignedResidents.length > 0 && (
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Assigned Residents</p>
                        <div className="space-y-1.5">
                            {assignedResidents.map(r => {
                                const st = STATUS_CONFIG[r.status]
                                return (
                                    <div key={r.id} className={`flex items-center gap-3 p-2.5 rounded-lg border ${r.status === 'critical' ? 'border-red-200 bg-red-50/40' : r.status === 'attention' ? 'border-amber-200 bg-amber-50/40' : 'border-slate-100 bg-slate-50'}`}>
                                        <Circle className={`w-2.5 h-2.5 fill-current ${st.dot}`} />
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs font-semibold text-slate-800">{r.name}</span>
                                            <p className="text-[10px] text-slate-500">Rm {r.room} -- {r.conditions.join(', ')}</p>
                                        </div>
                                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${st.bg}`}>{st.label}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function VitalsDetailModal({ resident, vitals, onClose }) {
    const vitalsList = [
        { key: 'bp', label: 'Blood Pressure', value: vitals.bp, prev: vitals.prevBp, icon: Heart, unit: 'mmHg', trend: vitals.bpTrend },
        { key: 'glucose', label: 'Blood Glucose', value: vitals.glucose, prev: vitals.prevGlucose, icon: Droplets, unit: 'mg/dL', trend: vitals.glucoseTrend, status: vitalStatus('glucose', vitals.glucose) },
        { key: 'temp', label: 'Temperature', value: vitals.temp, icon: Thermometer, unit: 'C', status: vitalStatus('temp', vitals.temp) },
        { key: 'spo2', label: 'Oxygen Saturation', value: vitals.spo2, icon: Wind, unit: '%', status: vitalStatus('spo2', vitals.spo2) },
        { key: 'hr', label: 'Heart Rate', value: vitals.hr, icon: Activity, unit: 'bpm', status: vitalStatus('hr', vitals.hr) },
        { key: 'pain', label: 'Pain Level', value: vitals.pain, icon: CircleAlert, unit: '/10', status: vitalStatus('pain', vitals.pain) },
    ]

    return (
        <div>
            <div className="px-6 py-4 border-b bg-slate-50 border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-indigo-500" />
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">Vitals -- {resident.name}</h3>
                        <p className="text-[11px] text-slate-500">Rm {resident.room} -- Last updated: {vitals.lastUpdated}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-3">
                {vitalsList.map(v => {
                    const Icon = v.icon
                    const statusColors = { normal: 'border-emerald-200 bg-emerald-50', warning: 'border-amber-200 bg-amber-50', critical: 'border-red-200 bg-red-50' }
                    const textColors = { normal: 'text-emerald-700', warning: 'text-amber-700', critical: 'text-red-700' }
                    const st = v.status || (v.trend === 'up' ? 'warning' : 'normal')
                    return (
                        <div key={v.key} className={`flex items-center gap-3 p-3 rounded-xl border ${statusColors[st] || statusColors.normal}`}>
                            <Icon className={`w-5 h-5 flex-shrink-0 ${textColors[st] || textColors.normal}`} />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-slate-800">{v.label}</p>
                                {v.prev && <p className="text-[10px] text-slate-500">Previous: {v.prev}</p>}
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className={`text-lg font-bold ${textColors[st] || textColors.normal}`}>{v.value}</p>
                                <p className="text-[10px] text-slate-500">{v.unit}</p>
                            </div>
                            {v.trend && (
                                <div className="flex-shrink-0">
                                    {v.trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-amber-500" /> : v.trend === 'down' ? <ArrowDownRight className="w-4 h-4 text-sky-500" /> : <Minus className="w-4 h-4 text-gray-400" />}
                                </div>
                            )}
                        </div>
                    )
                })}
                {vitals.notes && (
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Clinical Notes</p>
                        <p className="text-sm text-slate-800 leading-relaxed">{vitals.notes}</p>
                    </div>
                )}
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
