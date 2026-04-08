import { useState, useEffect } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts'
import {
    UserCheck, FileText, Pill, ShieldAlert, BarChart3, Users2, Download,
    ChevronDown, Clock, CheckCircle2, AlertTriangle, X, ChevronRight,
    Activity, Calendar, AlertCircle, Info, TrendingUp, Stethoscope,
    Clipboard, Plus, Send, Eye, FlaskConical,
    CalendarDays, UserCircle, Pencil, GraduationCap, Briefcase, Building2, Globe, Phone, Mail, Save, FileDown
} from 'lucide-react'

// -- PER-RESIDENT DATA --

const RESIDENTS_LIST = [
    { id: 1, name: 'Elena Rodriguez', room: '101', age: 78, admission: 'Dec 15, 2025', currentWeek: 12, lastEval: 'Mar 12, 2026', doctor: 'Dr. Gomez', conditions: ['Hypertension', 'Diabetes T2'] },
    { id: 2, name: 'Carlos Mendez', room: '102', age: 82, admission: 'Jan 5, 2026', currentWeek: 8, lastEval: 'Mar 20, 2026', doctor: 'Dr. Gomez', conditions: ['Osteoarthritis', 'Mild cognitive impairment'] },
    { id: 3, name: 'Maria Silva', room: '103', age: 85, admission: 'Nov 20, 2025', currentWeek: 15, lastEval: 'Mar 25, 2026', doctor: 'Dr. Torres', conditions: ['Depression', 'Chronic pain'] },
    { id: 4, name: 'Jorge Navarro', room: '104', age: 74, admission: 'Feb 10, 2026', currentWeek: 5, lastEval: 'Mar 18, 2026', doctor: 'Dr. Gomez', conditions: ['Dyslipidemia'] },
]

const RESIDENT_DATA = {
    1: {
        quadrant: [
            { dimension: 'Physical', baseline: 45, current: 68, target: 75 },
            { dimension: 'Nutritional', baseline: 55, current: 72, target: 80 },
            { dimension: 'Emotional', baseline: 40, current: 62, target: 70 },
            { dimension: 'Clinical', baseline: 60, current: 78, target: 85 },
        ],
        evolution: [
            { week: 'W1', physical: 45, nutritional: 55, emotional: 40, clinical: 60 },
            { week: 'W2', physical: 47, nutritional: 56, emotional: 42, clinical: 62 },
            { week: 'W4', physical: 52, nutritional: 60, emotional: 45, clinical: 65 },
            { week: 'W6', physical: 56, nutritional: 63, emotional: 50, clinical: 68 },
            { week: 'W8', physical: 60, nutritional: 66, emotional: 55, clinical: 72 },
            { week: 'W10', physical: 63, nutritional: 68, emotional: 58, clinical: 74 },
            { week: 'W12', physical: 68, nutritional: 72, emotional: 62, clinical: 78 },
        ],
        history: [
            { id: 1, date: 'Dec 15, 2025', event: 'Admission -- Baseline assessment recorded', type: 'intake', detail: 'Initial intake completed by Dr. Gomez. Barthel 62, GDS 10, BMI 24.8. Hypertension controlled with Amlodipine 5mg. Diabetes managed with Metformin 500mg.' },
            { id: 2, date: 'Jan 10, 2026', event: 'Hypertension medication adjusted (Amlodipine 5mg to 10mg)', type: 'medication', detail: 'BP readings consistently above 150/90 during weeks 2-4. Dose increased to 10mg. Follow-up in 2 weeks. Patient tolerating well, no side effects reported.' },
            { id: 3, date: 'Feb 01, 2026', event: 'Week 4 physiotherapy evaluation -- TUG improved 2s', type: 'evaluation', detail: 'TUG time decreased from 18s to 16s. SPPB score improved from 6 to 7. Balance exercises showing effect. Recommend continuation of current routine.' },
            { id: 4, date: 'Mar 12, 2026', event: 'Week 8 midpoint -- Integral clinical report generated', type: 'report', detail: 'All 4 quadrants showing improvement. Physical +23pts, Nutritional +17pts, Emotional +22pts, Clinical +18pts. Overall positive trajectory. Family report sent.' },
            { id: 5, date: 'Mar 20, 2026', event: 'Mild UTI -- antibiotics prescribed (Ciprofloxacin 3d)', type: 'incident', detail: 'Patient reported urinary discomfort. Urinalysis confirmed bacterial infection. Ciprofloxacin 500mg BID for 3 days prescribed. Symptoms resolved by Mar 23.' },
        ],
        medications: [
            { id: 1, name: 'Amlodipine', dose: '10mg', frequency: 'Daily', purpose: 'Hypertension', since: 'Jan 2026', status: 'active', interactions: 'None detected', notes: 'Dose increased from 5mg on Jan 10. BP now well controlled.' },
            { id: 2, name: 'Metformin', dose: '500mg', frequency: '2x daily', purpose: 'Diabetes T2', since: 'Dec 2025', status: 'active', interactions: 'None detected', notes: 'Glucose levels within range. HbA1c 6.8% at last check.' },
            { id: 3, name: 'Omeprazole', dose: '20mg', frequency: 'Morning', purpose: 'Gastric protection', since: 'Dec 2025', status: 'active', interactions: 'None detected', notes: 'Prophylactic. No GI complaints.' },
            { id: 4, name: 'Vitamin D3', dose: '2000 IU', frequency: 'Daily', purpose: 'Bone health', since: 'Dec 2025', status: 'active', interactions: 'None detected', notes: 'Vitamin D was low at admission (18 ng/mL). Recheck at W16.' },
            { id: 5, name: 'Paracetamol', dose: '500mg', frequency: 'As needed', purpose: 'Pain management', since: 'Jan 2026', status: 'active', interactions: 'None detected', notes: 'Average use: 1-2 tablets/week. No hepatic concerns.' },
        ],
        risks: [
            { id: 1, risk: 'Fall Risk', level: 'moderate', detail: 'History of 1 fall. TUG improving but still >12s. Bathroom grab bars installed.', interventions: ['Physiotherapy 3x/week', 'Non-slip footwear provided', 'Night light in room'] },
            { id: 2, risk: 'Malnutrition', level: 'low', detail: 'BMI stable at 24.1. Intake adequate. No weight loss in last 4 weeks.', interventions: ['Weekly weight monitoring', 'Nutritionist review monthly'] },
            { id: 3, risk: 'Depression', level: 'moderate', detail: 'GDS 8 at last eval. Improved from 10 at intake but still above clinical threshold.', interventions: ['Psychology sessions weekly', 'Group music therapy', 'Social activities encouraged'] },
            { id: 4, risk: 'Polypharmacy', level: 'low', detail: '5 active medications. No interactions detected. All within appropriate dosing.', interventions: ['Quarterly medication review', 'Drug interaction screening'] },
        ],
        specialists: [
            { id: 1, specialist: 'Physiotherapist', lastUpdate: 'Mar 28, 2026', status: 'current', summary: 'TUG improved from 18s to 14s. SPPB score 8/12. Good progress on balance exercises.', fullReport: 'Elena has made excellent progress in her mobility program. TUG time decreased from 18s at intake to 14s at W12. SPPB score improved from 6 to 8/12. She is now able to perform tandem stance for 8 seconds (up from 3s). Balance exercises are showing consistent improvement. Recommend continuing current routine with gradual intensity increase. Fall risk remains moderate due to age but trending downward.' },
            { id: 2, specialist: 'Nutritionist', lastUpdate: 'Mar 25, 2026', status: 'current', summary: 'BMI stable at 24.1. Appetite improved. Meal adherence 88%. No dietary conflicts.', fullReport: 'Weight: 64.2kg (stable). BMI: 24.1. Meal adherence at 88%, up from 75% at intake. Elena now eats breakfast consistently. Protein intake adequate at 1.2g/kg/day. Vitamin D supplementation continues. Blood glucose well controlled with current diet and Metformin. No food allergies or intolerances noted. Recommend maintaining current meal plan.' },
            { id: 3, specialist: 'Psychologist', lastUpdate: 'Mar 15, 2026', status: 'overdue', summary: 'GDS 8 (improved from 10 at intake). WHOQOL shows improvement in social domain.', fullReport: 'GDS decreased from 10 to 8 over 12 weeks. While improved, score remains above the clinical threshold of 5. Elena reports improved mood since starting group music therapy. WHOQOL-BREF social domain score improved from 45 to 62. She has formed friendships with 3 other residents. Sleep quality improved but occasional insomnia persists. Recommend continued weekly sessions and evaluation of antidepressant if GDS does not improve further by W16.' },
            { id: 4, specialist: 'Family Doctor', lastUpdate: 'Mar 30, 2026', status: 'current', summary: 'BP well controlled post dose adjustment. Glucose within range. UTI resolved.', fullReport: 'Blood pressure: 132/82 (well controlled post Amlodipine dose increase). Fasting glucose: 112 mg/dL. HbA1c: 6.8%. UTI from Mar 20 fully resolved after 3-day Ciprofloxacin course. Urinalysis clear on follow-up. No new complaints. Next review scheduled for W14. Consider BP medication reduction if readings remain below 130/80 for 4 consecutive weeks.' },
        ],
    },
    2: {
        quadrant: [
            { dimension: 'Physical', baseline: 50, current: 55, target: 70 },
            { dimension: 'Nutritional', baseline: 60, current: 68, target: 75 },
            { dimension: 'Emotional', baseline: 55, current: 60, target: 72 },
            { dimension: 'Clinical', baseline: 58, current: 65, target: 78 },
        ],
        evolution: [
            { week: 'W1', physical: 50, nutritional: 60, emotional: 55, clinical: 58 },
            { week: 'W2', physical: 51, nutritional: 61, emotional: 55, clinical: 59 },
            { week: 'W4', physical: 52, nutritional: 63, emotional: 56, clinical: 61 },
            { week: 'W6', physical: 53, nutritional: 65, emotional: 58, clinical: 63 },
            { week: 'W8', physical: 55, nutritional: 68, emotional: 60, clinical: 65 },
        ],
        history: [
            { id: 1, date: 'Jan 5, 2026', event: 'Admission -- Baseline assessment recorded', type: 'intake', detail: 'Barthel 66, GDS 8, BMI 25.2. Osteoarthritis in both knees. Mild cognitive impairment (MMSE 24/30).' },
            { id: 2, date: 'Feb 5, 2026', event: 'Week 4 eval -- Mobility slightly declined', type: 'evaluation', detail: 'Barthel dropped to 64. Knee pain increased. Physiotherapist adjusted exercise routine.' },
            { id: 3, date: 'Mar 20, 2026', event: 'Week 8 midpoint -- Mixed results', type: 'report', detail: 'Physical domain lagging. Nutritional and clinical stable. Barthel recovered to 66. Cognitive screening stable.' },
        ],
        medications: [
            { id: 1, name: 'Ibuprofen', dose: '400mg', frequency: 'As needed', purpose: 'Osteoarthritis pain', since: 'Jan 2026', status: 'active', interactions: 'Monitor with gastric meds', notes: 'Max 3x/day. Average use 1-2x.' },
            { id: 2, name: 'Omeprazole', dose: '20mg', frequency: 'Morning', purpose: 'Gastric protection', since: 'Jan 2026', status: 'active', interactions: 'None detected', notes: 'Required due to NSAID use.' },
            { id: 3, name: 'Donepezil', dose: '5mg', frequency: 'Evening', purpose: 'Cognitive support', since: 'Jan 2026', status: 'active', interactions: 'None detected', notes: 'For mild cognitive impairment. MMSE stable at 24.' },
        ],
        risks: [
            { id: 1, risk: 'Fall Risk', level: 'high', detail: 'Osteoarthritis limits mobility. Barthel declined then recovered. Requires close monitoring.', interventions: ['Physiotherapy 4x/week', 'Walking aid provided', 'Room hazard assessment'] },
            { id: 2, risk: 'Cognitive Decline', level: 'moderate', detail: 'MMSE 24/30. Stable but at risk. Donepezil started.', interventions: ['Cognitive exercises daily', 'Neuropsych reassessment at W12', 'Family education'] },
            { id: 3, risk: 'Malnutrition', level: 'low', detail: 'BMI 25.2. Eating well. No weight loss.', interventions: ['Monthly weight check'] },
        ],
        specialists: [
            { id: 1, specialist: 'Physiotherapist', lastUpdate: 'Mar 28, 2026', status: 'current', summary: 'TUG 16s. SPPB 6/12. Knee pain limiting progress. Routine adapted.', fullReport: 'Carlos has difficulty with standard lower-limb exercises due to bilateral knee osteoarthritis. TUG time: 16s (no improvement from baseline). SPPB: 6/12. Adapted routine focusing on seated strengthening and aquatherapy. Pain management essential for mobility gains.' },
            { id: 2, specialist: 'Nutritionist', lastUpdate: 'Mar 26, 2026', status: 'current', summary: 'BMI 25.2. Adherence 85%. Anti-inflammatory diet introduced.', fullReport: 'Weight stable. Anti-inflammatory dietary modifications introduced to support arthritis management. Omega-3 supplementation recommended. Adherence at 85%.' },
            { id: 3, specialist: 'Psychologist', lastUpdate: 'Mar 22, 2026', status: 'current', summary: 'GDS 8. Mood stable. Frustration about mobility noted.', fullReport: 'Carlos expresses frustration about limited mobility and dependence on walking aid. GDS 8, stable. Coping strategies discussed. Recommend continued bi-weekly sessions.' },
            { id: 4, specialist: 'Family Doctor', lastUpdate: 'Mar 30, 2026', status: 'current', summary: 'MMSE 24 stable. Joint inflammation managed. No acute issues.', fullReport: 'MMSE 24/30 stable since admission. No acute medical issues. Ibuprofen use within acceptable limits. Recommend continued Donepezil. Next cognitive screen at W12.' },
        ],
    },
    3: {
        quadrant: [
            { dimension: 'Physical', baseline: 42, current: 50, target: 65 },
            { dimension: 'Nutritional', baseline: 48, current: 55, target: 70 },
            { dimension: 'Emotional', baseline: 30, current: 35, target: 60 },
            { dimension: 'Clinical', baseline: 50, current: 58, target: 72 },
        ],
        evolution: [
            { week: 'W1', physical: 42, nutritional: 48, emotional: 30, clinical: 50 },
            { week: 'W4', physical: 44, nutritional: 50, emotional: 32, clinical: 52 },
            { week: 'W8', physical: 46, nutritional: 52, emotional: 33, clinical: 54 },
            { week: 'W12', physical: 48, nutritional: 54, emotional: 34, clinical: 56 },
            { week: 'W15', physical: 50, nutritional: 55, emotional: 35, clinical: 58 },
        ],
        history: [
            { id: 1, date: 'Nov 20, 2025', event: 'Admission -- High-risk psychological profile', type: 'intake', detail: 'GDS 14 (severe depression). Chronic pain. Barthel 58. Referred from hospital post hip fracture recovery.' },
            { id: 2, date: 'Dec 10, 2025', event: 'Antidepressant started (Sertraline 50mg)', type: 'medication', detail: 'GDS remained at 13 after 3 weeks. Sertraline initiated. Psychology sessions increased to 2x/week.' },
            { id: 3, date: 'Feb 15, 2026', event: 'GDS improved to 10 -- still above threshold', type: 'evaluation', detail: 'Slow but steady improvement. Pain management adjusted. Social engagement minimal.' },
            { id: 4, date: 'Mar 25, 2026', event: 'GDS worsened to 12 -- urgent psych referral', type: 'incident', detail: 'After a period of improvement, GDS has risen again. Patient reports feeling isolated. Sleep disrupted. Appetite decreased. Urgent psychology session scheduled.' },
        ],
        medications: [
            { id: 1, name: 'Sertraline', dose: '50mg', frequency: 'Morning', purpose: 'Depression', since: 'Dec 2025', status: 'active', interactions: 'Monitor with Tramadol', notes: 'GDS improved from 14 to 10, then worsened to 12. Dose increase under consideration.' },
            { id: 2, name: 'Tramadol', dose: '50mg', frequency: 'As needed', purpose: 'Chronic pain', since: 'Nov 2025', status: 'active', interactions: 'Serotonin risk with Sertraline', notes: 'Max 2x daily. Average use 1x. Monitor for serotonin syndrome.' },
            { id: 3, name: 'Calcium + Vit D', dose: '600mg/800IU', frequency: 'Daily', purpose: 'Bone health', since: 'Nov 2025', status: 'active', interactions: 'None detected', notes: 'Post hip fracture supplementation.' },
        ],
        risks: [
            { id: 1, risk: 'Depression', level: 'high', detail: 'GDS worsened from 10 to 12. Sertraline may need dose increase. Urgent psych review.', interventions: ['Urgent psychology session', 'Medication review', 'Daily mood monitoring'] },
            { id: 2, risk: 'Fall Risk', level: 'high', detail: 'History of hip fracture. Barthel 58. Limited mobility.', interventions: ['Physiotherapy 3x/week', 'Supervised ambulation', 'Hip protector'] },
            { id: 3, risk: 'Drug Interaction', level: 'moderate', detail: 'Sertraline + Tramadol -- serotonin syndrome risk. Close monitoring required.', interventions: ['Weekly serotonin symptom check', 'Alternative pain management review'] },
        ],
        specialists: [
            { id: 1, specialist: 'Psychologist', lastUpdate: 'Mar 25, 2026', status: 'current', summary: 'GDS worsened to 12. Urgent review needed. Isolation concerns.', fullReport: 'Maria GDS has increased from 10 to 12 over the past 3 weeks. She reports feeling increasingly isolated and has withdrawn from group activities. Sleep disrupted (averaging 4-5 hours). Appetite decreased. Recommend urgent medication review and increased session frequency.' },
            { id: 2, specialist: 'Physiotherapist', lastUpdate: 'Mar 20, 2026', status: 'current', summary: 'Limited progress due to pain and low motivation. TUG 22s.', fullReport: 'Maria mobility progress is hampered by chronic pain and depression. TUG 22s, minimal improvement. She frequently declines physio sessions. Pain management review essential before mobility can improve.' },
            { id: 3, specialist: 'Family Doctor', lastUpdate: 'Mar 28, 2026', status: 'current', summary: 'Tramadol + Sertraline interaction monitored. Considering dose adjustment.', fullReport: 'No serotonin syndrome symptoms observed. Pain remains a significant issue. Considering Sertraline dose increase to 75mg. Will coordinate with psychologist. Blood work normal.' },
        ],
    },
    4: {
        quadrant: [
            { dimension: 'Physical', baseline: 60, current: 66, target: 78 },
            { dimension: 'Nutritional', baseline: 50, current: 62, target: 75 },
            { dimension: 'Emotional', baseline: 65, current: 70, target: 80 },
            { dimension: 'Clinical', baseline: 62, current: 68, target: 82 },
        ],
        evolution: [
            { week: 'W1', physical: 60, nutritional: 50, emotional: 65, clinical: 62 },
            { week: 'W2', physical: 61, nutritional: 53, emotional: 66, clinical: 63 },
            { week: 'W4', physical: 64, nutritional: 58, emotional: 68, clinical: 66 },
            { week: 'W5', physical: 66, nutritional: 62, emotional: 70, clinical: 68 },
        ],
        history: [
            { id: 1, date: 'Feb 10, 2026', event: 'Admission -- Good baseline, dietary focus', type: 'intake', detail: 'Barthel 72. GDS 5. BMI 28.4 (overweight). Primary goal: weight management and cardiovascular risk reduction.' },
            { id: 2, date: 'Mar 1, 2026', event: 'Diet plan initiated -- 1800 kcal target', type: 'evaluation', detail: 'Nutritionist designed a heart-healthy Mediterranean-style diet. Caloric target: 1800 kcal/day. Jorge is cooperative and motivated.' },
            { id: 3, date: 'Mar 18, 2026', event: 'Week 5 -- Weight down 1.2kg, lipids improving', type: 'report', detail: 'Weight from 86.2kg to 85.0kg. Total cholesterol decreased from 242 to 218. LDL from 156 to 138. Excellent dietary adherence at 92%.' },
        ],
        medications: [
            { id: 1, name: 'Atorvastatin', dose: '20mg', frequency: 'Evening', purpose: 'Dyslipidemia', since: 'Feb 2026', status: 'active', interactions: 'None detected', notes: 'Cholesterol trending down. Recheck at W8.' },
            { id: 2, name: 'Aspirin', dose: '100mg', frequency: 'Morning', purpose: 'Cardiovascular prevention', since: 'Feb 2026', status: 'active', interactions: 'None detected', notes: 'Low-dose prophylactic.' },
        ],
        risks: [
            { id: 1, risk: 'Cardiovascular', level: 'moderate', detail: 'Dyslipidemia. BMI 28.4. Family history of CVD.', interventions: ['Diet management', 'Regular lipid panels', 'Exercise program'] },
            { id: 2, risk: 'Malnutrition', level: 'low', detail: 'Overweight but well-nourished. Caloric restriction in place.', interventions: ['Nutritionist oversight', 'Calorie tracking'] },
        ],
        specialists: [
            { id: 1, specialist: 'Nutritionist', lastUpdate: 'Mar 28, 2026', status: 'current', summary: 'Excellent adherence 92%. Weight trending down. Diet plan working.', fullReport: 'Jorge has been the most compliant resident with dietary recommendations. Weight down 1.2kg in 5 weeks. Caloric intake averaging 1820 kcal/day. Mediterranean diet well accepted. Cholesterol improving. Plan to continue and reassess at W8.' },
            { id: 2, specialist: 'Physiotherapist', lastUpdate: 'Mar 25, 2026', status: 'current', summary: 'Good mobility. Cardiovascular exercise program in place.', fullReport: 'Jorge participates actively in exercise sessions. 30-min walking program 5x/week. TUG 11s (good). SPPB 10/12. Focus is on cardiovascular fitness rather than rehabilitation.' },
            { id: 3, specialist: 'Family Doctor', lastUpdate: 'Mar 18, 2026', status: 'current', summary: 'Lipids improving. No acute issues. Next blood work at W8.', fullReport: 'Total cholesterol down from 242 to 218. LDL from 156 to 138. HDL stable at 48. Atorvastatin well tolerated, no muscle complaints. BP 128/78. Next lipid panel scheduled at W8.' },
        ],
    },
}

// -- PROFILE DATA --
const PROFILE_STORAGE_KEY = 'longevai-geriatrician-profile'

const DEFAULT_PROFILE = {
    name: 'Dr. Sofia Navarro',
    title: 'Geriatrician -- Clinical Specialist',
    license: 'MED-3291-GER',
    specialization: 'Geriatric Medicine, Integral Clinical Assessments & Cycle Reporting',
    email: 's.navarro@amatistalife.com',
    phone: '+34 611 456 789',
    office: 'Building A, Office 305',
    institution: 'Amatista Life -- LongevAI Center',
    education: 'MD, Internal Medicine & Geriatrics (Universidad de Barcelona)',
    certifications: 'Board Certified Geriatrician, Polypharmacy Risk Specialist',
    bio: 'Specialist in comprehensive geriatric assessment and 16-week cycle-based clinical evaluation. Over 15 years synthesizing multi-specialist data into actionable clinical portraits that drive care decisions and family communication.',
    shiftStart: '08:00',
    shiftEnd: '16:00',
    yearsExperience: 15,
    residentsManaged: 4,
}

function loadProfile() {
    try {
        const data = localStorage.getItem(PROFILE_STORAGE_KEY)
        return data ? { ...DEFAULT_PROFILE, ...JSON.parse(data) } : DEFAULT_PROFILE
    } catch { return DEFAULT_PROFILE }
}

function saveProfile(profile) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
}

// -- GERIATRICIAN-SPECIFIC ALERTS --
const GERI_ALERTS = [
    { id: 1, severity: 'critical', area: 'Psychological', message: 'Maria Silva: GDS worsened to 12 -- urgent medication review needed', time: '2h ago', resident: 'Maria Silva' },
    { id: 2, severity: 'warning', area: 'Clinical', message: 'Carlos Mendez: Barthel Index stagnant at W8 -- physio plan adjustment recommended', time: '1d ago', resident: 'Carlos Mendez' },
    { id: 3, severity: 'warning', area: 'Pharmacological', message: 'Maria Silva: Sertraline + Tramadol interaction -- serotonin monitoring active', time: '2d ago', resident: 'Maria Silva' },
    { id: 4, severity: 'info', area: 'Milestone', message: 'Elena Rodriguez: Week 12 eval complete -- on track for W16 graduation', time: '3d ago', resident: 'Elena Rodriguez' },
    { id: 5, severity: 'info', area: 'Milestone', message: 'Jorge Navarro: Cholesterol improved 10% -- diet plan effective', time: '3d ago', resident: 'Jorge Navarro' },
]

// -- STYLE CONFIG --
const RISK_LEVEL = {
    high: { label: 'High', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700' },
    moderate: { label: 'Moderate', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
    low: { label: 'Low', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' },
}

const HISTORY_TYPE_STYLE = {
    intake: { dot: 'border-brand-primary bg-brand-primary/20' },
    medication: { dot: 'border-blue-400 bg-blue-100' },
    evaluation: { dot: 'border-emerald-400 bg-emerald-100' },
    report: { dot: 'border-brand-accent bg-brand-accent/20' },
    incident: { dot: 'border-red-400 bg-red-100' },
}

// -- MAIN COMPONENT --
export default function GeriatricianDashboard() {
    const [activeSection, setActiveSection] = useState('overview')
    const [selectedResident, setSelectedResident] = useState(RESIDENTS_LIST[0])
    const [selectedHistoryItem, setSelectedHistoryItem] = useState(null)
    const [selectedMedication, setSelectedMedication] = useState(null)
    const [selectedRisk, setSelectedRisk] = useState(null)
    const [selectedSpecialist, setSelectedSpecialist] = useState(null)
    const [reportModal, setReportModal] = useState(null)
    const [profile, setProfile] = useState(() => loadProfile())
    const [editingProfile, setEditingProfile] = useState(false)
    const [recommendations, setRecommendations] = useState('')

    const data = RESIDENT_DATA[selectedResident.id]
    const highRisks = data.risks.filter(r => r.level === 'high').length
    const overdueSpecialists = data.specialists.filter(s => s.status === 'overdue').length

    return (
        <DashboardShell
            roleId="geriatrician"
            roleTag="Geriatrician -- Clinical Specialist"
            title="16-Week Integral Clinical Report"
            badges={[]}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            notifications={GERI_ALERTS}
        >
            {/* Date Bar */}
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-brand-accent" />
                    <span className="text-sm font-semibold text-brand-dark">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <button
                    onClick={() => setActiveSection('profile')}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-brand-accent/30 hover:shadow-sm transition-all"
                >
                    <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <UserCircle className="w-3.5 h-3.5 text-brand-primary" />
                    </div>
                    <span className="text-[11px] font-medium text-brand-dark hidden sm:inline">{profile.name.split(' ').slice(0, 2).join(' ')}</span>
                </button>
            </div>

            {/* Resident Selector -- always visible */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-brand-accent" />
                        <span className="text-sm font-semibold text-brand-dark">Resident:</span>
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
                        <span>Week: <strong className="text-brand-dark">{selectedResident.currentWeek}/16</strong></span>
                        <span>Last Eval: <strong className="text-brand-dark">{selectedResident.lastEval}</strong></span>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                        <div className="bg-gray-200 rounded-full h-2 w-32">
                            <div className="bg-brand-primary h-2 rounded-full transition-all" style={{ width: (selectedResident.currentWeek / 16 * 100) + '%' }} />
                        </div>
                        <span className="text-[11px] font-semibold text-brand-primary">{Math.round(selectedResident.currentWeek / 16 * 100)}%</span>
                    </div>
                </div>
            </div>

            {/* SECTION: OVERVIEW */}
            {activeSection === 'overview' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <KpiCard icon={Activity} label="Cycle Progress" value={'W' + selectedResident.currentWeek + '/16'} color="text-brand-primary" onClick={() => setActiveSection('evolution')} />
                        <KpiCard icon={ShieldAlert} label="High Risks" value={highRisks} color={highRisks > 0 ? 'text-red-500' : 'text-emerald-500'} onClick={() => setActiveSection('risk')} />
                        <KpiCard icon={Users2} label="Specialist Inputs" value={data.specialists.length + ' filed'} sub={overdueSpecialists > 0 ? overdueSpecialists + ' overdue' : 'All current'} subColor={overdueSpecialists > 0 ? 'text-amber-500' : 'text-emerald-500'} color="text-brand-accent" onClick={() => setActiveSection('specialists')} />
                        <KpiCard icon={Pill} label="Active Medications" value={data.medications.length} color="text-blue-500" onClick={() => setActiveSection('medications')} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SectionCard title="4-Quadrant Snapshot" icon={BarChart3}>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={data.quadrant}>
                                        <PolarGrid gridType="polygon" stroke="#e5e7eb" />
                                        <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: '#7A778C' }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                                        <Radar name="Baseline" dataKey="baseline" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.12} strokeWidth={1.5} />
                                        <Radar name="Current" dataKey="current" stroke="#4C4673" fill="#4C4673" fillOpacity={0.22} strokeWidth={2} />
                                        <Radar name="Target" dataKey="target" stroke="#6D8C8C" fill="#6D8C8C" fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 4" />
                                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                        <Legend wrapperStyle={{ fontSize: 11 }} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </SectionCard>

                        <SectionCard title="Clinical Summary" icon={Stethoscope}>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-2">Conditions</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedResident.conditions.map((c, i) => (
                                            <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-brand-light border border-gray-200 text-brand-dark">{c}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-2">Active Risks</p>
                                    <div className="space-y-1.5">
                                        {data.risks.map(r => {
                                            const rl = RISK_LEVEL[r.level]
                                            return (
                                                <div key={r.id} onClick={() => { setActiveSection('risk') }} className={'flex items-center gap-2 p-2 rounded-lg border cursor-pointer hover:shadow-sm transition-all ' + rl.bg + ' ' + rl.border}>
                                                    <span className={'text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ' + rl.badge}>{r.level}</span>
                                                    <span className="text-xs text-brand-dark">{r.risk}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-2">Care Team</p>
                                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                        <Stethoscope className="w-3.5 h-3.5 text-brand-muted" />
                                        <span className="text-xs font-medium text-brand-dark">{selectedResident.doctor}</span>
                                    </div>
                                </div>
                            </div>
                        </SectionCard>
                    </div>
                </div>
            )}

            {/* SECTION: CLINICAL HISTORY */}
            {activeSection === 'history' && (
                <SectionCard title="Clinical History Timeline" icon={FileText} subtitle={selectedResident.name + ' -- chronological events'}>
                    <div className="space-y-1">
                        {data.history.map((item, i) => {
                            const style = HISTORY_TYPE_STYLE[item.type] || HISTORY_TYPE_STYLE.intake
                            return (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedHistoryItem(item)}
                                    className="flex gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow-sm transition-all relative group"
                                >
                                    {i < data.history.length - 1 && (
                                        <div className="absolute left-[22px] top-10 bottom-0 w-px bg-gray-200" />
                                    )}
                                    <div className={'w-4 h-4 rounded-full flex-shrink-0 mt-0.5 border-2 ' + style.dot} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[11px] text-brand-muted">{item.date}</p>
                                        <p className="text-xs font-medium text-brand-dark">{item.event}</p>
                                        <span className="text-[10px] font-semibold uppercase text-brand-muted/60 mt-0.5">{item.type}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )
                        })}
                    </div>
                </SectionCard>
            )}

            {/* SECTION: MEDICATIONS */}
            {activeSection === 'medications' && (
                <SectionCard title="Active Medications" icon={Pill} subtitle={selectedResident.name + ' -- ' + data.medications.length + ' active'}>
                    <div className="space-y-2">
                        {data.medications.map(m => (
                            <div
                                key={m.id}
                                onClick={() => setSelectedMedication(m)}
                                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:shadow-md cursor-pointer transition-all"
                            >
                                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                    <Pill className="w-4 h-4 text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-brand-dark">{m.name}</span>
                                        <span className="text-[10px] text-brand-muted">{m.dose}</span>
                                    </div>
                                    <p className="text-xs text-brand-muted">{m.frequency} -- {m.purpose}</p>
                                </div>
                                {m.interactions !== 'None detected' && (
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Interaction</span>
                                )}
                                <span className="text-[10px] text-brand-muted">{m.since}</span>
                                <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                            </div>
                        ))}
                    </div>
                </SectionCard>
            )}

            {/* SECTION: RISK PROFILE */}
            {activeSection === 'risk' && (
                <SectionCard title="Risk Profile (Triage)" icon={ShieldAlert} subtitle={selectedResident.name + ' -- assessed risks'}>
                    <div className="space-y-3">
                        {data.risks.map(r => {
                            const rl = RISK_LEVEL[r.level]
                            return (
                                <div
                                    key={r.id}
                                    onClick={() => setSelectedRisk(r)}
                                    className={'p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ' + rl.bg + ' ' + rl.border}
                                >
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <ShieldAlert className={'w-4 h-4 ' + rl.color} />
                                        <span className="text-sm font-semibold text-brand-dark">{r.risk}</span>
                                        <span className={'text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ml-auto ' + rl.badge}>{r.level}</span>
                                    </div>
                                    <p className="text-xs text-brand-muted">{r.detail}</p>
                                    <div className="flex items-center gap-1 mt-2 text-[10px] text-brand-muted">
                                        <CheckCircle2 className="w-3 h-3" /> {r.interventions.length} active interventions
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </SectionCard>
            )}

            {/* SECTION: EVOLUTION CHARTS */}
            {activeSection === 'evolution' && (
                <div className="space-y-6">
                    <SectionCard title="4-Quadrant Radar" icon={BarChart3} subtitle={'Baseline vs Current vs Target -- ' + selectedResident.name}>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={data.quadrant}>
                                    <PolarGrid gridType="polygon" stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: '#7A778C' }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                                    <Radar name="Baseline" dataKey="baseline" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.15} strokeWidth={1.5} />
                                    <Radar name="Current" dataKey="current" stroke="#4C4673" fill="#4C4673" fillOpacity={0.25} strokeWidth={2} />
                                    <Radar name="Target" dataKey="target" stroke="#6D8C8C" fill="#6D8C8C" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                    <Legend wrapperStyle={{ fontSize: 11 }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                            {data.quadrant.map(q => {
                                const delta = q.current - q.baseline
                                const gap = q.target - q.current
                                return (
                                    <div key={q.dimension} className="p-3 rounded-xl bg-brand-light border border-gray-200 text-center">
                                        <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider">{q.dimension}</p>
                                        <p className="text-xl font-bold text-brand-dark mt-1">{q.current}</p>
                                        <p className="text-[10px] text-emerald-600 font-medium flex items-center justify-center gap-0.5 mt-0.5">
                                            <TrendingUp className="w-3 h-3" /> +{delta} from baseline
                                        </p>
                                        <p className="text-[10px] text-brand-muted mt-0.5">{gap} pts to target</p>
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>

                    <SectionCard title="16-Week Evolution Timeline" icon={BarChart3} subtitle={'All domains over time -- ' + selectedResident.name}>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.evolution} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" domain={[0, 100]} />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                    <Legend wrapperStyle={{ fontSize: 11 }} />
                                    <Line type="monotone" dataKey="physical" stroke="#4C4673" strokeWidth={2} name="Physical" dot={{ r: 3 }} />
                                    <Line type="monotone" dataKey="nutritional" stroke="#6D8C8C" strokeWidth={2} name="Nutritional" dot={{ r: 3 }} />
                                    <Line type="monotone" dataKey="emotional" stroke="#7A778C" strokeWidth={2} name="Emotional" dot={{ r: 3 }} />
                                    <Line type="monotone" dataKey="clinical" stroke="#313D40" strokeWidth={2} name="Clinical" dot={{ r: 3 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* SECTION: SPECIALIST INPUTS */}
            {activeSection === 'specialists' && (
                <SectionCard title="Specialist Input Aggregator" icon={Users2} subtitle={selectedResident.name + ' -- all specialist reports'}>
                    <div className="space-y-3">
                        {data.specialists.map(s => (
                            <div
                                key={s.id}
                                onClick={() => setSelectedSpecialist(s)}
                                className={'p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ' + (s.status === 'overdue' ? 'border-amber-200 bg-amber-50/50' : 'border-gray-100 bg-gray-50')}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Stethoscope className="w-4 h-4 text-brand-accent" />
                                        <span className="text-sm font-semibold text-brand-dark">{s.specialist}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        {s.status === 'overdue' ? (
                                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                                        ) : (
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        )}
                                        <span className={'text-[10px] font-semibold uppercase ' + (s.status === 'overdue' ? 'text-amber-600' : 'text-emerald-600')}>{s.status}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-brand-muted mb-2">{s.summary}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-[10px] text-brand-muted">
                                        <Clock className="w-3 h-3" /> Last updated: {s.lastUpdate}
                                    </div>
                                    <span className="text-[10px] font-semibold text-brand-primary flex items-center gap-1">
                                        View full report <ChevronRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            )}

            {/* SECTION: CYCLE REPORT */}
            {activeSection === 'reports' && (
                <SectionCard title="Integral Cycle Report Generator" icon={Download} subtitle="Generate definitive clinical portrait">
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-brand-light border border-gray-200">
                            <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Report for</p>
                            <p className="text-lg font-bold text-brand-dark">{selectedResident.name}</p>
                            <p className="text-xs text-brand-muted">Week {selectedResident.currentWeek}/16 -- Admitted {selectedResident.admission}</p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Specialist Input Status</p>
                            <div className="space-y-1.5">
                                {data.specialists.map(s => (
                                    <div key={s.id} className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                        {s.status === 'current' ? (
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                        ) : (
                                            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                        )}
                                        <span className="text-xs font-medium text-brand-dark flex-1">{s.specialist}</span>
                                        <span className="text-[10px] text-brand-muted">{s.lastUpdate}</span>
                                        <span className={'text-[10px] font-semibold uppercase ' + (s.status === 'current' ? 'text-emerald-600' : 'text-amber-600')}>{s.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Included Sections</p>
                            <div className="grid grid-cols-2 gap-2">
                                {['Clinical History', 'Medication Review', '4-Quadrant Analysis', 'Risk Assessment', 'Specialist Reports', 'Recommendations'].map(section => (
                                    <div key={section} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        <span className="text-xs text-brand-dark">{section}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Geriatrician Recommendations</p>
                            <textarea
                                rows={4}
                                value={recommendations}
                                onChange={e => setRecommendations(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent resize-none text-brand-dark placeholder-brand-muted/50"
                                placeholder="Enter clinical recommendations, observations, and next steps to include in the report..."
                            />
                            <p className="text-[10px] text-brand-muted mt-1">This narrative will be included in the final report as the geriatrician's signed assessment.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            {selectedResident.currentWeek >= 8 && (
                                <button
                                    onClick={() => setReportModal('w8')}
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors"
                                >
                                    <Download className="w-4 h-4" /> Generate Week 8 Report
                                </button>
                            )}
                            {selectedResident.currentWeek >= 16 && (
                                <button
                                    onClick={() => setReportModal('w16')}
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-brand-accent text-white text-sm font-semibold rounded-xl hover:bg-brand-accent/90 transition-colors"
                                >
                                    <Download className="w-4 h-4" /> Generate Week 16 Report
                                </button>
                            )}
                            {selectedResident.currentWeek < 8 && (
                                <div className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 text-brand-muted text-sm font-medium rounded-xl border border-gray-200">
                                    <Clock className="w-4 h-4" /> Week 8 report available at W8 ({8 - selectedResident.currentWeek} weeks remaining)
                                </div>
                            )}
                        </div>
                    </div>
                </SectionCard>
            )}

            {/* SECTION: MY PROFILE */}
            {activeSection === 'profile' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-primary/10 via-brand-accent/5 to-transparent px-6 py-5 border-b border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border-2 border-brand-primary/20 flex items-center justify-center flex-shrink-0">
                                    <UserCircle className="w-8 h-8 text-brand-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold text-brand-dark">{profile.name}</h3>
                                    <p className="text-sm text-brand-accent font-medium">{profile.title}</p>
                                    <p className="text-xs text-brand-muted mt-1">{profile.institution}</p>
                                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20">{profile.license}</span>
                                        <span className="text-[10px] text-brand-muted flex items-center gap-1"><Briefcase className="w-3 h-3" /> {profile.yearsExperience} years experience</span>
                                        <span className="text-[10px] text-brand-muted flex items-center gap-1"><Users2 className="w-3 h-3" /> {profile.residentsManaged} residents</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setEditingProfile(true)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 text-brand-dark hover:border-brand-accent hover:shadow-sm transition-all"
                                >
                                    <Pencil className="w-3.5 h-3.5 text-brand-accent" /> Edit Profile
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-brand-dark leading-relaxed mb-5">{profile.bio}</p>
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
                    <ProfileEditModal profile={profile} onClose={() => setEditingProfile(false)} onSave={(updated) => {
                        setProfile(updated)
                        saveProfile(updated)
                        setEditingProfile(false)
                    }} />
                </Modal>
            )}

            {/* MODALS */}
            {selectedHistoryItem && (
                <Modal onClose={() => setSelectedHistoryItem(null)}>
                    <HistoryDetailModal item={selectedHistoryItem} onClose={() => setSelectedHistoryItem(null)} />
                </Modal>
            )}
            {selectedMedication && (
                <Modal onClose={() => setSelectedMedication(null)}>
                    <MedicationDetailModal med={selectedMedication} onClose={() => setSelectedMedication(null)} />
                </Modal>
            )}
            {selectedRisk && (
                <Modal onClose={() => setSelectedRisk(null)}>
                    <RiskDetailModal risk={selectedRisk} onClose={() => setSelectedRisk(null)} />
                </Modal>
            )}
            {selectedSpecialist && (
                <Modal onClose={() => setSelectedSpecialist(null)}>
                    <SpecialistDetailModal specialist={selectedSpecialist} resident={selectedResident.name} onClose={() => setSelectedSpecialist(null)} />
                </Modal>
            )}
            {reportModal && (
                <Modal onClose={() => setReportModal(null)}>
                    <ReportGeneratedModal type={reportModal} resident={selectedResident} onClose={() => setReportModal(null)} />
                </Modal>
            )}
        </DashboardShell>
    )
}

// -- SUB-COMPONENTS --

function KpiCard({ icon: Icon, label, value, color, sub, subColor, onClick }) {
    return (
        <div onClick={onClick} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 cursor-pointer hover:shadow-md hover:border-brand-accent/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center flex-shrink-0">
                <Icon className={'w-5 h-5 ' + color} />
            </div>
            <div>
                <p className="text-2xl font-bold text-brand-dark">{value}</p>
                <p className="text-xs text-brand-muted">{label}</p>
                {sub && <p className={'text-[10px] font-medium ' + (subColor || 'text-brand-muted')}>{sub}</p>}
            </div>
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

// -- MODAL CONTENTS --

function HistoryDetailModal({ item, onClose }) {
    const style = HISTORY_TYPE_STYLE[item.type] || HISTORY_TYPE_STYLE.intake
    const typeLabel = { intake: 'Intake', medication: 'Medication Change', evaluation: 'Evaluation', report: 'Report', incident: 'Incident' }
    return (
        <div>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={'w-8 h-8 rounded-full flex items-center justify-center border-2 ' + style.dot}>
                        <FileText className="w-4 h-4 text-brand-dark" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{typeLabel[item.type] || 'Event'}</h3>
                        <p className="text-[11px] text-brand-muted">{item.date}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Summary</p>
                    <p className="text-sm font-medium text-brand-dark">{item.event}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Clinical Detail</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{item.detail}</p>
                    </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors">
                    <Plus className="w-4 h-4" /> Add Follow-up Note
                </button>
            </div>
        </div>
    )
}

function MedicationDetailModal({ med, onClose }) {
    return (
        <div>
            <div className="px-6 py-4 border-b border-gray-100 bg-blue-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Pill className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{med.name}</h3>
                        <p className="text-[11px] text-brand-muted">{med.dose} -- {med.frequency}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <InfoRow icon={Activity} label="Purpose" value={med.purpose} />
                    <InfoRow icon={Calendar} label="Since" value={med.since} />
                    <InfoRow icon={FlaskConical} label="Interactions" value={med.interactions} />
                    <InfoRow icon={CheckCircle2} label="Status" value={med.status} />
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Clinical Notes</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{med.notes}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors">
                        <Clipboard className="w-4 h-4" /> Add Observation
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-brand-dark text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                        <AlertTriangle className="w-4 h-4" /> Flag Issue
                    </button>
                </div>
            </div>
        </div>
    )
}

function RiskDetailModal({ risk, onClose }) {
    const rl = RISK_LEVEL[risk.level]
    return (
        <div>
            <div className={'px-6 py-4 border-b flex items-center justify-between ' + rl.bg + ' ' + rl.border}>
                <div className="flex items-center gap-3">
                    <ShieldAlert className={'w-5 h-5 ' + rl.color} />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{risk.risk}</h3>
                        <span className={'text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ' + rl.badge}>{risk.level} risk</span>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Assessment</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{risk.detail}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Active Interventions</p>
                    <div className="space-y-1.5">
                        {risk.interventions.map((intv, i) => (
                            <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                <span className="text-xs text-brand-dark">{intv}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors">
                    <Plus className="w-4 h-4" /> Add Intervention
                </button>
            </div>
        </div>
    )
}

function SpecialistDetailModal({ specialist, resident, onClose }) {
    const isOverdue = specialist.status === 'overdue'
    return (
        <div>
            <div className={'px-6 py-4 border-b flex items-center justify-between ' + (isOverdue ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200')}>
                <div className="flex items-center gap-3">
                    <Stethoscope className={'w-5 h-5 ' + (isOverdue ? 'text-amber-600' : 'text-brand-accent')} />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{specialist.specialist}</h3>
                        <p className="text-[11px] text-brand-muted">Report for {resident}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        {isOverdue ? (
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                        ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                        <span className={'text-xs font-semibold uppercase ' + (isOverdue ? 'text-amber-600' : 'text-emerald-600')}>{specialist.status}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-brand-muted">
                        <Clock className="w-3 h-3" /> {specialist.lastUpdate}
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Summary</p>
                    <p className="text-sm font-medium text-brand-dark">{specialist.summary}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Full Report</p>
                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{specialist.fullReport}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {isOverdue && (
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-colors">
                            <Send className="w-4 h-4" /> Request Update
                        </button>
                    )}
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-brand-dark text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                        <Eye className="w-4 h-4" /> Print Report
                    </button>
                </div>
            </div>
        </div>
    )
}

function ReportGeneratedModal({ type, resident, onClose }) {
    const [generating, setGenerating] = useState(true)
    const [done, setDone] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setGenerating(false)
            setDone(true)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    const weekLabel = type === 'w8' ? 'Week 8 Midpoint' : 'Week 16 Final'

    return (
        <div>
            <div className="px-6 py-4 border-b border-gray-100 bg-brand-light flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-brand-primary" />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{weekLabel} Report</h3>
                        <p className="text-[11px] text-brand-muted">{resident.name}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                {generating && (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin mx-auto mb-4" />
                        <p className="text-sm font-semibold text-brand-dark">Generating report...</p>
                        <p className="text-xs text-brand-muted mt-1">Aggregating data from all specialist modules</p>
                    </div>
                )}
                {done && (
                    <>
                        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-emerald-700">Report generated successfully</p>
                                <p className="text-xs text-emerald-600 mt-0.5">Integral {weekLabel} clinical portrait is ready</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Report Contents</p>
                            <div className="space-y-1.5">
                                {['Executive Summary', 'Clinical History & Timeline', 'Medication Review', '4-Quadrant Analysis & Charts', 'Risk Assessment', 'Specialist Reports (All)', 'Recommendations & Next Steps'].map(section => (
                                    <div key={section} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        <span className="text-xs text-brand-dark">{section}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors">
                                <Download className="w-4 h-4" /> Download PDF
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                                <FileDown className="w-4 h-4" /> Download Word
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-brand-dark text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                                <Eye className="w-4 h-4" /> Preview
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

function ProfileField({ icon: Icon, label, value, valueColor }) {
    return (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
            <Icon className="w-4 h-4 text-brand-muted flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
                <p className="text-[10px] text-brand-muted uppercase tracking-wider">{label}</p>
                <p className={'text-xs font-medium mt-0.5 ' + (valueColor || 'text-brand-dark')}>{value}</p>
            </div>
        </div>
    )
}

function ProfileEditModal({ profile, onClose, onSave }) {
    const [form, setForm] = useState({ ...profile })
    const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

    const fields = [
        { key: 'name', label: 'Full Name', type: 'text' },
        { key: 'title', label: 'Title / Role', type: 'text' },
        { key: 'license', label: 'License Number', type: 'text' },
        { key: 'specialization', label: 'Specialization', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'phone', label: 'Phone', type: 'tel' },
        { key: 'office', label: 'Office Location', type: 'text' },
        { key: 'institution', label: 'Institution', type: 'text' },
        { key: 'education', label: 'Education', type: 'text' },
        { key: 'certifications', label: 'Certifications', type: 'text' },
        { key: 'shiftStart', label: 'Shift Start', type: 'time' },
        { key: 'shiftEnd', label: 'Shift End', type: 'time' },
    ]

    return (
        <div>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-brand-light">
                <div className="flex items-center gap-3">
                    <Pencil className="w-5 h-5 text-brand-accent" />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">Edit Profile</h3>
                        <p className="text-[11px] text-brand-muted">Update your personal and professional information</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fields.map(f => (
                        <div key={f.key}>
                            <label className="block text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">{f.label}</label>
                            <input
                                type={f.type}
                                value={form[f.key] || ''}
                                onChange={e => update(f.key, e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent text-brand-dark"
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <label className="block text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">Bio</label>
                    <textarea
                        rows={3}
                        value={form.bio || ''}
                        onChange={e => update('bio', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent resize-none text-brand-dark"
                    />
                </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 text-brand-dark hover:bg-gray-50 transition-colors">
                    Cancel
                </button>
                <button
                    onClick={() => onSave(form)}
                    className="flex items-center gap-2 px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors"
                >
                    <Save className="w-4 h-4" /> Save Changes
                </button>
            </div>
        </div>
    )
}
