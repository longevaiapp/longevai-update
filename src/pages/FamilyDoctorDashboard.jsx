import { useState, useEffect } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    AreaChart, Area
} from 'recharts'
import {
    HeartPulse, Pill, AlertTriangle, Microscope, ClipboardList, BarChart3,
    ChevronDown, Clock, UserCheck, TrendingUp, TrendingDown, Minus,
    CheckCircle2, XCircle, X, ChevronRight, Activity, Calendar, Info,
    AlertCircle, FileText, Send, Plus, Eye, Thermometer, Droplets, Wind
} from 'lucide-react'

/* ================================================================
   PER-RESIDENT DATA
   ================================================================ */

const RESIDENTS_LIST = [
    { id: 1, name: 'Elena Rodriguez', room: '101', age: 78, week: 12, conditions: ['Hypertension', 'Diabetes T2'], doctor: 'Dr. Gomez' },
    { id: 2, name: 'Carlos Mendez', room: '102', age: 82, week: 8, conditions: ['Osteoarthritis', 'Mild cognitive impairment'], doctor: 'Dr. Gomez' },
    { id: 3, name: 'Maria Silva', room: '103', age: 85, week: 15, conditions: ['Depression', 'Chronic pain'], doctor: 'Dr. Torres' },
    { id: 4, name: 'Roberto Diaz', room: '106', age: 77, week: 3, conditions: ['Hypertension', 'Obesity'], doctor: 'Dr. Gomez' },
]

const RESIDENT_DATA = {
    1: {
        vitals: [
            { week: 'W1', systolic: 148, diastolic: 92, glucose: 145, spo2: 94, temp: 36.6 },
            { week: 'W2', systolic: 145, diastolic: 90, glucose: 140, spo2: 95, temp: 36.5 },
            { week: 'W4', systolic: 140, diastolic: 88, glucose: 135, spo2: 95, temp: 36.7 },
            { week: 'W6', systolic: 138, diastolic: 86, glucose: 130, spo2: 96, temp: 36.5 },
            { week: 'W8', systolic: 135, diastolic: 84, glucose: 125, spo2: 96, temp: 36.6 },
            { week: 'W10', systolic: 132, diastolic: 82, glucose: 120, spo2: 97, temp: 36.4 },
            { week: 'W12', systolic: 130, diastolic: 80, glucose: 118, spo2: 97, temp: 36.5 },
        ],
        latestVitals: { systolic: 130, diastolic: 80, glucose: 118, spo2: 97, temp: 36.5, hr: 72, weight: 64.2 },
        medications: [
            { id: 1, date: 'Mar 30, 2026', drug: 'Amlodipine', dose: '10mg', change: 'Dose maintained at 10mg', doctor: 'Dr. Gomez', reason: 'BP at target', type: 'maintain', interactions: 'None detected', sideEffects: 'Mild ankle edema noted, monitoring', notes: 'BP consistently below 135/85 for 4 weeks. Continue current dose. Next review at W14.' },
            { id: 2, date: 'Mar 15, 2026', drug: 'Ciprofloxacin', dose: '500mg', change: 'Started 500mg 2x/day (3 days)', doctor: 'Dr. Gomez', reason: 'UTI confirmed', type: 'start', interactions: 'None detected', sideEffects: 'None reported', notes: 'Urinalysis positive for E. coli. 3-day course prescribed. Symptoms resolved by Mar 18. Follow-up urinalysis clear.' },
            { id: 3, date: 'Feb 20, 2026', drug: 'Metformin', dose: '750mg', change: 'Increased to 750mg 2x/day', doctor: 'Dr. Gomez', reason: 'Glucose above target', type: 'increase', interactions: 'None detected', sideEffects: 'Mild GI upset first 3 days, resolved', notes: 'Fasting glucose 138 mg/dL avg over 2 weeks. HbA1c 7.2%. Increased from 500mg to 750mg. Target glucose <130.' },
            { id: 4, date: 'Jan 10, 2026', drug: 'Amlodipine', dose: '10mg', change: 'Increased 5mg to 10mg', doctor: 'Dr. Gomez', reason: 'BP consistently >140/90', type: 'increase', interactions: 'None detected', sideEffects: 'None at new dose initially', notes: 'BP average 148/92 over weeks 2-4. Increased to 10mg. Response expected within 2 weeks.' },
            { id: 5, date: 'Dec 15, 2025', drug: 'Initial regimen', dose: 'Various', change: 'Amlodipine 5mg, Metformin 500mg, Omeprazole 20mg', doctor: 'Dr. Gomez', reason: 'Admission baseline', type: 'start', interactions: 'None detected', sideEffects: 'N/A', notes: 'Baseline regimen established at intake. All medications tolerated well.' },
        ],
        incidents: [
            { id: 1, date: 'Mar 22, 2026', time: '22:15', type: 'Fall', severity: 'minor', location: 'Bathroom', reporter: 'Nurse Garcia', response: 'Examined, no injury. Ice applied to right hip. Patient alert and oriented.', status: 'resolved', followUp: 'Doctor examined next morning. No fracture on palpation. X-ray not indicated. Physiotherapist notified for fall prevention reassessment. Grab bar check completed.', nursingInstructions: 'Monitor for delayed symptoms 48h. Night checks every 2h for 3 nights.' },
            { id: 2, date: 'Mar 15, 2026', time: '08:30', type: 'Adverse reaction', severity: 'moderate', location: 'Room 101', reporter: 'Nurse Martinez', response: 'Nausea after Ciprofloxacin. Antiemetic (Ondansetron 4mg) given. Doctor reviewed.', status: 'resolved', followUp: 'Nausea subsided within 2 hours. Ciprofloxacin continued with food. No further episodes. Antibiotic course completed successfully.', nursingInstructions: 'Administer Ciprofloxacin with meals. Monitor for further GI symptoms.' },
            { id: 3, date: 'Feb 28, 2026', time: '14:00', type: 'Blood pressure spike', severity: 'moderate', location: 'Common room', reporter: 'Nurse Lopez', response: 'BP 165/98. Patient rested 30 min. Rechecked at 142/88. Documented.', status: 'resolved', followUp: 'Transient spike likely related to physical activity. No medication change needed. BP stable in subsequent readings. Continue monitoring schedule.', nursingInstructions: 'Check BP before and after physical activities for 1 week. Report if >160 systolic.' },
        ],
        specialists: [
            { id: 1, specialist: 'Psychologist', update: 'GDS improved from 12 to 8. Social engagement increasing. Continue current approach.', date: 'Mar 15, 2026', implications: 'Reduced anxiety may allow tapering of PRN anxiolytics.', status: 'current', fullReport: 'Elena GDS score has steadily improved from 12 at intake to 8 at W12. She actively participates in group music therapy and has formed friendships with 3 residents. WHOQOL-BREF social domain improved from 45 to 62. Sleep quality improved but occasional insomnia persists. Recommend maintaining current psychological support. Evaluate need for sleep medication at next review.' },
            { id: 2, specialist: 'Physiotherapist', update: 'TUG improved 18s to 14s. Balance exercises showing results. Falls risk decreasing.', date: 'Mar 28, 2026', implications: 'Mobility improvement supports reduced sedation in medication choices.', status: 'current', fullReport: 'TUG decreased from 18s to 14s. SPPB 8/12 (up from 6). Tandem stance: 8s (up from 3s). Elena participates consistently in sessions 3x/week. Balance and strength showing measurable improvement. Fall risk remains moderate but trending down. Post-fall reassessment completed on Mar 23 -- no new concerns. Continue current exercise program with gradual intensity increase.' },
            { id: 3, specialist: 'Nutritionist', update: 'Meal adherence 88%. Weight stable. Glucose diet modifications working well.', date: 'Mar 25, 2026', implications: 'Dietary glucose control may allow Metformin dose stabilization.', status: 'current', fullReport: 'Weight 64.2kg (stable). BMI 24.1. Meal adherence 88% (up from 75%). Breakfast compliance improved significantly. Protein intake 1.2g/kg/day (adequate). Vitamin D supplementation continues. Blood glucose well-controlled with diet + Metformin. No food allergies. Recommend maintaining current meal plan with minor adjustments for variety.' },
        ],
        kpis: [
            { label: 'BP Control Rate', value: 82, target: 90, unit: '%', trend: 'up', detail: 'BP below 140/90 in 82% of readings this month. Improved from 60% at intake. Amlodipine dose increase in January was effective. Target: consistent <140/90.', history: [{ week: 'W1', value: 20 }, { week: 'W2', value: 35 }, { week: 'W4', value: 48 }, { week: 'W6', value: 55 }, { week: 'W8', value: 65 }, { week: 'W10', value: 74 }, { week: 'W12', value: 82 }] },
            { label: 'Glucose in Range', value: 75, target: 85, unit: '%', trend: 'up', detail: 'Fasting glucose 80-130 mg/dL in 75% of readings. Improved from 55% at intake. Metformin dose increase and dietary changes contributing. HbA1c trending down from 7.4% to 6.8%.', history: [{ week: 'W1', value: 30 }, { week: 'W2', value: 38 }, { week: 'W4', value: 45 }, { week: 'W6', value: 52 }, { week: 'W8', value: 60 }, { week: 'W10', value: 68 }, { week: 'W12', value: 75 }] },
            { label: 'Therapeutic Adherence', value: 94, target: 95, unit: '%', trend: 'stable', detail: 'Patient takes medications consistently. Occasional missed evening Metformin dose. Nursing reminder system in place. Adherence has been stable at 93-95% for 6 weeks.', history: [{ week: 'W1', value: 85 }, { week: 'W2', value: 88 }, { week: 'W4', value: 90 }, { week: 'W6', value: 92 }, { week: 'W8', value: 93 }, { week: 'W10', value: 94 }, { week: 'W12', value: 94 }] },
            { label: 'Hospital Escalation', value: 0, target: 0, unit: 'cases', trend: 'stable', detail: 'No hospital transfers required during the care cycle. All clinical events managed on-site. UTI treated successfully with oral antibiotics. Fall managed with observation.', history: [{ week: 'W1', value: 0 }, { week: 'W4', value: 0 }, { week: 'W8', value: 0 }, { week: 'W12', value: 0 }] },
        ],
        reviews: [],
    },
    2: {
        vitals: [
            { week: 'W1', systolic: 128, diastolic: 78, glucose: 105, spo2: 96, temp: 36.4 },
            { week: 'W2', systolic: 130, diastolic: 80, glucose: 108, spo2: 96, temp: 36.5 },
            { week: 'W4', systolic: 126, diastolic: 76, glucose: 102, spo2: 97, temp: 36.6 },
            { week: 'W6', systolic: 128, diastolic: 78, glucose: 100, spo2: 96, temp: 36.5 },
            { week: 'W8', systolic: 125, diastolic: 75, glucose: 98, spo2: 97, temp: 36.4 },
        ],
        latestVitals: { systolic: 125, diastolic: 75, glucose: 98, spo2: 97, temp: 36.4, hr: 68, weight: 78.5 },
        medications: [
            { id: 1, date: 'Mar 20, 2026', drug: 'Ibuprofen', dose: '400mg', change: 'PRN use reviewed -- averaging 1.5x/day', doctor: 'Dr. Gomez', reason: 'Pain management review', type: 'review', interactions: 'Monitor with Omeprazole', sideEffects: 'None reported with gastric protection', notes: 'NSAID use within acceptable limits. GI protection with Omeprazole adequate. Monitor renal function quarterly.' },
            { id: 2, date: 'Jan 5, 2026', drug: 'Donepezil', dose: '5mg', change: 'Started for mild cognitive impairment', doctor: 'Dr. Gomez', reason: 'MMSE 24/30 at intake', type: 'start', interactions: 'None detected', sideEffects: 'Mild nausea first week, resolved', notes: 'Started at intake. MMSE stable at 24/30 after 8 weeks. Continue and reassess at W12.' },
            { id: 3, date: 'Jan 5, 2026', drug: 'Omeprazole', dose: '20mg', change: 'Started for gastric protection', doctor: 'Dr. Gomez', reason: 'NSAID use', type: 'start', interactions: 'None detected', sideEffects: 'None', notes: 'Required due to regular Ibuprofen use. No GI complaints.' },
        ],
        incidents: [
            { id: 1, date: 'Mar 10, 2026', time: '10:30', type: 'Near-fall', severity: 'minor', location: 'Hallway', reporter: 'Nurse Martinez', response: 'Patient stumbled but caught by handrail. No injury. Walking aid reinforced.', status: 'resolved', followUp: 'Physiotherapist reassessed gait pattern. Walking aid use reinforced. Room furniture repositioned for clearer path.', nursingInstructions: 'Ensure walking aid is always within reach. Accompany during first hallway walk each morning.' },
        ],
        specialists: [
            { id: 1, specialist: 'Physiotherapist', update: 'TUG 16s (no improvement from baseline). Knee pain limiting progress. Routine adapted.', date: 'Mar 28, 2026', implications: 'Pain management is prerequisite for mobility gains. Consider analgesic timing.', status: 'current', fullReport: 'Carlos has bilateral knee osteoarthritis limiting standard exercises. TUG stable at 16s. SPPB 6/12. Adapted routine: seated strengthening, aquatherapy 2x/week. Pain appears to be the primary barrier. Recommend timing analgesics 30-60 min before physio sessions.' },
            { id: 2, specialist: 'Psychologist', update: 'GDS 8. Mood stable. Frustration about mobility noted.', date: 'Mar 22, 2026', implications: 'Monitor for depression secondary to functional decline. Mobility frustration may worsen mood.', status: 'current', fullReport: 'GDS stable at 8. Carlos expresses frustration about limited mobility and dependence on walking aid. Coping strategies discussed. No suicidal ideation. Recommend continued bi-weekly sessions.' },
            { id: 3, specialist: 'Nutritionist', update: 'BMI 25.2. Adherence 85%. Anti-inflammatory diet introduced.', date: 'Mar 26, 2026', implications: 'Anti-inflammatory diet may support arthritis management alongside medication.', status: 'current', fullReport: 'Weight stable at 78.5kg. Anti-inflammatory dietary modifications introduced. Omega-3 supplementation recommended but not yet started (awaiting doctor approval). Adherence at 85%.' },
        ],
        kpis: [
            { label: 'BP Control Rate', value: 95, target: 90, unit: '%', trend: 'stable', detail: 'BP consistently within normal range. No antihypertensive medication needed. Monitoring continues.', history: [{ week: 'W1', value: 90 }, { week: 'W2', value: 92 }, { week: 'W4', value: 94 }, { week: 'W6', value: 95 }, { week: 'W8', value: 95 }] },
            { label: 'Glucose in Range', value: 92, target: 85, unit: '%', trend: 'stable', detail: 'Glucose well controlled without diabetic medication. Diet management adequate.', history: [{ week: 'W1', value: 88 }, { week: 'W2', value: 89 }, { week: 'W4', value: 90 }, { week: 'W6', value: 91 }, { week: 'W8', value: 92 }] },
            { label: 'Therapeutic Adherence', value: 88, target: 95, unit: '%', trend: 'down', detail: 'Adherence dropped due to Carlos occasionally skipping Donepezil evening dose. Nursing reminder system adjusted.', history: [{ week: 'W1', value: 95 }, { week: 'W2', value: 94 }, { week: 'W4', value: 92 }, { week: 'W6', value: 90 }, { week: 'W8', value: 88 }] },
            { label: 'Hospital Escalation', value: 0, target: 0, unit: 'cases', trend: 'stable', detail: 'No hospital transfers. All issues managed on-site.', history: [{ week: 'W1', value: 0 }, { week: 'W4', value: 0 }, { week: 'W8', value: 0 }] },
        ],
        reviews: [],
    },
    3: {
        vitals: [
            { week: 'W1', systolic: 118, diastolic: 72, glucose: 95, spo2: 96, temp: 36.3 },
            { week: 'W4', systolic: 120, diastolic: 74, glucose: 92, spo2: 96, temp: 36.4 },
            { week: 'W8', systolic: 116, diastolic: 70, glucose: 90, spo2: 97, temp: 36.5 },
            { week: 'W12', systolic: 115, diastolic: 72, glucose: 88, spo2: 96, temp: 36.3 },
            { week: 'W15', systolic: 118, diastolic: 74, glucose: 92, spo2: 96, temp: 36.4 },
        ],
        latestVitals: { systolic: 118, diastolic: 74, glucose: 92, spo2: 96, temp: 36.4, hr: 78, weight: 58.1 },
        medications: [
            { id: 1, date: 'Mar 25, 2026', drug: 'Sertraline', dose: '50mg', change: 'Dose increase under consideration (to 75mg)', doctor: 'Dr. Torres', reason: 'GDS worsened from 10 to 12', type: 'review', interactions: 'Monitor with Tramadol -- serotonin risk', sideEffects: 'Mild drowsiness', notes: 'GDS improved from 14 to 10, then worsened to 12. Dose increase to 75mg being evaluated in coordination with psychologist. Serotonin monitoring with Tramadol continues.' },
            { id: 2, date: 'Nov 20, 2025', drug: 'Tramadol', dose: '50mg', change: 'PRN -- averaging 1x/day', doctor: 'Dr. Torres', reason: 'Chronic pain post hip fracture', type: 'maintain', interactions: 'Serotonin risk with Sertraline', sideEffects: 'Mild constipation', notes: 'Pain management essential for mobility and mood. Serotonin syndrome screening weekly -- no symptoms to date. Constipation managed with stool softener.' },
            { id: 3, date: 'Nov 20, 2025', drug: 'Calcium + Vit D', dose: '600mg/800IU', change: 'Daily supplementation', doctor: 'Dr. Torres', reason: 'Post hip fracture bone health', type: 'start', interactions: 'None detected', sideEffects: 'None', notes: 'Standard post-fracture supplementation. Bone density scan scheduled for 6-month follow-up.' },
        ],
        incidents: [
            { id: 1, date: 'Mar 25, 2026', time: '06:45', type: 'Appetite loss', severity: 'moderate', location: 'Dining room', reporter: 'Nurse Garcia', response: 'Maria refused breakfast for 3rd consecutive day. Nutritionist and doctor notified.', status: 'open', followUp: 'Appetite loss correlates with GDS worsening. May be depression-related. Nutritionist providing alternative meal options. Doctor to review at next weekly assessment.', nursingInstructions: 'Offer small, frequent meals. Document intake at every meal. Report if <50% intake for 2+ consecutive days.' },
            { id: 2, date: 'Feb 10, 2026', time: '23:30', type: 'Insomnia episode', severity: 'minor', location: 'Room 103', reporter: 'Night Nurse Diaz', response: 'Patient awake and distressed. Calming techniques used. Fell asleep at 01:15.', status: 'resolved', followUp: 'Sleep disruption linked to pain and mood. Sleep hygiene reviewed. No sleep medication prescribed at this time per psychologist recommendation.', nursingInstructions: 'Evening routine to include warm drink and relaxation music. Report repeated episodes.' },
        ],
        specialists: [
            { id: 1, specialist: 'Psychologist', update: 'GDS worsened to 12. Urgent review needed. Isolation increasing.', date: 'Mar 25, 2026', implications: 'Sertraline dose increase likely needed. Monitor closely for suicidal ideation.', status: 'urgent', fullReport: 'Maria GDS increased from 10 to 12 over 3 weeks. She reports feeling isolated, has withdrawn from group activities. Sleep averaging 4-5 hours. Appetite decreased. Recommend urgent medication review, increased session frequency to 3x/week, and daily mood monitoring by nursing staff.' },
            { id: 2, specialist: 'Physiotherapist', update: 'Limited progress due to pain and low motivation. TUG 22s.', date: 'Mar 20, 2026', implications: 'Pain management review essential before mobility can improve.', status: 'current', fullReport: 'TUG 22s, minimal improvement from baseline 24s. Maria frequently declines sessions citing pain and fatigue. Adapted to gentle chair exercises when she agrees. Pain management is the primary barrier. Depression also reduces motivation.' },
        ],
        kpis: [
            { label: 'BP Control Rate', value: 98, target: 90, unit: '%', trend: 'stable', detail: 'BP consistently normal. No cardiovascular concerns.', history: [{ week: 'W1', value: 96 }, { week: 'W4', value: 97 }, { week: 'W8', value: 98 }, { week: 'W12', value: 98 }, { week: 'W15', value: 98 }] },
            { label: 'Glucose in Range', value: 96, target: 85, unit: '%', trend: 'stable', detail: 'Glucose well controlled without medication.', history: [{ week: 'W1', value: 92 }, { week: 'W4', value: 94 }, { week: 'W8', value: 95 }, { week: 'W12', value: 96 }, { week: 'W15', value: 96 }] },
            { label: 'Therapeutic Adherence', value: 78, target: 95, unit: '%', trend: 'down', detail: 'Adherence declining -- Maria sometimes refuses medications when depressed. Nursing supervision increased for medication administration.', history: [{ week: 'W1', value: 92 }, { week: 'W4', value: 90 }, { week: 'W8', value: 86 }, { week: 'W12', value: 82 }, { week: 'W15', value: 78 }] },
            { label: 'Hospital Escalation', value: 0, target: 0, unit: 'cases', trend: 'stable', detail: 'No hospital transfers required. Monitoring closely due to depression severity.', history: [{ week: 'W1', value: 0 }, { week: 'W4', value: 0 }, { week: 'W8', value: 0 }, { week: 'W12', value: 0 }, { week: 'W15', value: 0 }] },
        ],
        reviews: [],
    },
    4: {
        vitals: [
            { week: 'W1', systolic: 155, diastolic: 95, glucose: 108, spo2: 95, temp: 36.7 },
            { week: 'W2', systolic: 152, diastolic: 93, glucose: 105, spo2: 95, temp: 36.6 },
            { week: 'W3', systolic: 148, diastolic: 90, glucose: 102, spo2: 96, temp: 36.5 },
        ],
        latestVitals: { systolic: 148, diastolic: 90, glucose: 102, spo2: 96, temp: 36.5, hr: 80, weight: 95.8 },
        medications: [
            { id: 1, date: 'Mar 1, 2026', drug: 'Losartan', dose: '50mg', change: 'Started for hypertension', doctor: 'Dr. Gomez', reason: 'BP 155/95 at admission', type: 'start', interactions: 'None detected', sideEffects: 'Mild dizziness first 2 days', notes: 'Initial antihypertensive. BP responding but still above target. May need dose increase at W4 if not <140/90.' },
            { id: 2, date: 'Mar 1, 2026', drug: 'Atorvastatin', dose: '20mg', change: 'Started for cardiovascular risk', doctor: 'Dr. Gomez', reason: 'BMI 32.4, family history CVD', type: 'start', interactions: 'None detected', sideEffects: 'None reported', notes: 'High cardiovascular risk profile. Cholesterol panel pending at W4. Weight management program initiated.' },
        ],
        incidents: [
            { id: 1, date: 'Mar 8, 2026', time: '11:00', type: 'Blood pressure spike', severity: 'moderate', location: 'Exercise room', reporter: 'Nurse Martinez', response: 'BP 172/102 after exercise. Rested 45 min. Rechecked at 150/92. Doctor notified.', status: 'resolved', followUp: 'Exercise intensity too high for current fitness level. Physiotherapist adjusted program. BP monitoring before and after all exercise sessions.', nursingInstructions: 'Check BP before exercise. Do not proceed if systolic >160. Post-exercise check mandatory.' },
        ],
        specialists: [
            { id: 1, specialist: 'Nutritionist', update: 'Mediterranean diet started. Caloric target 1800kcal. Adherence 72% -- improving.', date: 'Mar 28, 2026', implications: 'Dietary compliance essential for weight loss and BP reduction.', status: 'current', fullReport: 'Roberto started on Mediterranean-style diet at admission. Caloric target 1800 kcal/day. Current adherence 72%, improving weekly. Main challenge: portion sizes and between-meal snacking. Weight: 95.8kg (BMI 32.4). Target: 5kg loss over 16 weeks. Meal education sessions ongoing.' },
            { id: 2, specialist: 'Physiotherapist', update: 'Low-intensity cardiovascular program started. Monitoring BP during exercise.', date: 'Mar 25, 2026', implications: 'Exercise-induced BP spikes require careful program titration.', status: 'current', fullReport: 'Walking program started at 15 min, 3x/week. Intensity reduced after BP spike on Mar 8. Currently 20 min at comfortable pace. BP monitoring protocol: pre/post exercise. TUG 13s (baseline). SPPB 8/12. Focus on gradual cardiovascular conditioning.' },
        ],
        kpis: [
            { label: 'BP Control Rate', value: 45, target: 90, unit: '%', trend: 'up', detail: 'BP above target in most readings. Losartan started 3 weeks ago, response building. Dose increase likely at W4.', history: [{ week: 'W1', value: 10 }, { week: 'W2', value: 25 }, { week: 'W3', value: 45 }] },
            { label: 'Glucose in Range', value: 88, target: 85, unit: '%', trend: 'stable', detail: 'Glucose well controlled. No diabetic medication needed at this time.', history: [{ week: 'W1', value: 82 }, { week: 'W2', value: 85 }, { week: 'W3', value: 88 }] },
            { label: 'Therapeutic Adherence', value: 96, target: 95, unit: '%', trend: 'stable', detail: 'Roberto is highly compliant with medication. Motivated patient.', history: [{ week: 'W1', value: 95 }, { week: 'W2', value: 96 }, { week: 'W3', value: 96 }] },
            { label: 'Hospital Escalation', value: 0, target: 0, unit: 'cases', trend: 'stable', detail: 'No escalations. BP spike managed on-site.', history: [{ week: 'W1', value: 0 }, { week: 'W2', value: 0 }, { week: 'W3', value: 0 }] },
        ],
        reviews: [],
    },
}

/* ================================================================
   FAMILY DOCTOR ALERTS
   ================================================================ */
const FD_ALERTS = [
    { id: 1, severity: 'critical', area: 'Clinical', message: 'Maria Silva: GDS worsened -- Sertraline dose review needed', time: '2h ago', resident: 'Maria Silva' },
    { id: 2, severity: 'critical', area: 'Nutrition', message: 'Maria Silva: Appetite loss -- 3 consecutive breakfast refusals', time: '1d ago', resident: 'Maria Silva' },
    { id: 3, severity: 'warning', area: 'Pharmacological', message: 'Maria Silva: Sertraline + Tramadol -- serotonin monitoring active', time: '2d ago', resident: 'Maria Silva' },
    { id: 4, severity: 'warning', area: 'Clinical', message: 'Roberto Diaz: BP still above target at W3 -- dose adjustment due', time: '1d ago', resident: 'Roberto Diaz' },
    { id: 5, severity: 'warning', area: 'Clinical', message: 'Carlos Mendez: Therapeutic adherence dropped to 88%', time: '2d ago', resident: 'Carlos Mendez' },
    { id: 6, severity: 'info', area: 'Milestone', message: 'Elena Rodriguez: W12 -- all vitals within target range', time: '3d ago', resident: 'Elena Rodriguez' },
]

/* ================================================================
   STYLE CONFIGS
   ================================================================ */
const SEVERITY_STYLE = {
    critical: { dot: 'bg-red-500', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700' },
    moderate: { dot: 'bg-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
    minor: { dot: 'bg-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
}

const MED_TYPE_STYLE = {
    start: { label: 'Started', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    increase: { label: 'Increased', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
    decrease: { label: 'Decreased', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
    maintain: { label: 'Maintained', color: 'text-brand-muted', bg: 'bg-gray-50', border: 'border-gray-200' },
    review: { label: 'Reviewed', color: 'text-brand-primary', bg: 'bg-brand-light', border: 'border-brand-primary/20' },
    stop: { label: 'Stopped', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function FamilyDoctorDashboard() {
    const [activeSection, setActiveSection] = useState('vitals')
    const [selectedResident, setSelectedResident] = useState(RESIDENTS_LIST[0])
    const [selectedMedication, setSelectedMedication] = useState(null)
    const [selectedIncident, setSelectedIncident] = useState(null)
    const [selectedSpecialist, setSelectedSpecialist] = useState(null)
    const [selectedKpi, setSelectedKpi] = useState(null)
    const [reviewSubmitted, setReviewSubmitted] = useState(false)
    const [weeklyNotes, setWeeklyNotes] = useState({ observations: '', medications: '', nursing: '', referrals: '' })

    const data = RESIDENT_DATA[selectedResident.id]
    const lv = data.latestVitals
    const bpOk = lv.systolic < 140 && lv.diastolic < 90
    const glucOk = lv.glucose >= 80 && lv.glucose <= 130

    const handleReviewSubmit = () => {
        setReviewSubmitted(true)
        setTimeout(() => setReviewSubmitted(false), 3000)
        setWeeklyNotes({ observations: '', medications: '', nursing: '', referrals: '' })
    }

    return (
        <DashboardShell
            roleId="family-doctor"
            roleTag="Family Doctor -- Weekly Reviewer"
            title="Clinical Evolution Panel"
            tagline="Vital sign trends, medication histories, and clinical events for informed weekly review decisions."
            badges={['Per-patient view', 'Module 3', selectedResident.name]}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            notifications={FD_ALERTS}
        >
            {/* Resident Selector */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-brand-accent" />
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
                        <span>Doctor: <strong className="text-brand-dark">{selectedResident.doctor}</strong></span>
                    </div>
                    <div className="ml-auto flex flex-wrap gap-1.5">
                        {selectedResident.conditions.map((c, i) => (
                            <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-brand-light border border-gray-200 text-brand-dark">{c}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── SECTION: VITAL SIGNS ── */}
            {activeSection === 'vitals' && (
                <div className="space-y-6">
                    {/* Latest readings */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        <VitalCard icon={HeartPulse} label="BP" value={lv.systolic + '/' + lv.diastolic} unit="mmHg" ok={bpOk} target="<140/90" />
                        <VitalCard icon={Droplets} label="Glucose" value={lv.glucose} unit="mg/dL" ok={glucOk} target="80-130" />
                        <VitalCard icon={Wind} label="SpO2" value={lv.spo2} unit="%" ok={lv.spo2 >= 95} target=">95%" />
                        <VitalCard icon={Thermometer} label="Temp" value={lv.temp} unit="C" ok={lv.temp >= 36.0 && lv.temp <= 37.5} target="36-37.5" />
                        <VitalCard icon={Activity} label="HR" value={lv.hr} unit="bpm" ok={lv.hr >= 60 && lv.hr <= 100} target="60-100" />
                        <VitalCard icon={UserCheck} label="Weight" value={lv.weight} unit="kg" ok={true} target="" />
                        <VitalCard icon={Calendar} label="Week" value={selectedResident.week + '/16'} unit="" ok={true} target="" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SectionCard title="Blood Pressure Trend" icon={HeartPulse} subtitle={selectedResident.name}>
                            <div className="h-56">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data.vitals} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                        <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" domain={[60, 180]} />
                                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                        <Legend wrapperStyle={{ fontSize: 11 }} />
                                        <Area type="monotone" dataKey="systolic" stroke="#C4545E" fill="#C4545E" fillOpacity={0.1} strokeWidth={2} name="Systolic" dot={{ r: 3 }} />
                                        <Area type="monotone" dataKey="diastolic" stroke="#4C4673" fill="#4C4673" fillOpacity={0.1} strokeWidth={2} name="Diastolic" dot={{ r: 3 }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex gap-3 mt-2 text-[10px] text-brand-muted">
                                <span className={'px-2 py-0.5 rounded border ' + (bpOk ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700')}>
                                    {bpOk ? 'Within target (<140/90)' : 'Above target (>140/90)'}
                                </span>
                            </div>
                        </SectionCard>

                        <SectionCard title="Glucose & SpO2 Trend" icon={BarChart3} subtitle={selectedResident.name}>
                            <div className="h-56">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data.vitals} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                        <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                        <Legend wrapperStyle={{ fontSize: 11 }} />
                                        <Line type="monotone" dataKey="glucose" stroke="#E8A84A" strokeWidth={2} name="Glucose (mg/dL)" dot={{ r: 3 }} />
                                        <Line type="monotone" dataKey="spo2" stroke="#6D8C8C" strokeWidth={2} name="SpO2 (%)" dot={{ r: 3 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex gap-3 mt-2 text-[10px] text-brand-muted">
                                <span className={'px-2 py-0.5 rounded border ' + (glucOk ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700')}>
                                    Glucose {glucOk ? 'in range' : 'check'} (80-130)
                                </span>
                                <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-700">SpO2 target: &gt;95%</span>
                            </div>
                        </SectionCard>
                    </div>
                </div>
            )}

            {/* ── SECTION: MEDICATION LOG ── */}
            {activeSection === 'medications' && (
                <SectionCard title="Medication Change Log" icon={Pill} subtitle={selectedResident.name + ' -- ' + data.medications.length + ' entries'}>
                    <div className="space-y-2">
                        {data.medications.map((m, i) => {
                            const ms = MED_TYPE_STYLE[m.type] || MED_TYPE_STYLE.maintain
                            return (
                                <div
                                    key={m.id}
                                    onClick={() => setSelectedMedication(m)}
                                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:shadow-md cursor-pointer transition-all relative group"
                                >
                                    {i < data.medications.length - 1 && (
                                        <div className="absolute left-[22px] top-12 bottom-0 w-px bg-gray-200" />
                                    )}
                                    <div className={'w-3.5 h-3.5 rounded-full flex-shrink-0 border-2 ' + ms.border + ' ' + ms.bg} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-brand-dark">{m.drug}</span>
                                            <span className="text-[10px] text-brand-muted">{m.dose}</span>
                                            <span className={'text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ' + ms.bg + ' ' + ms.color}>{ms.label}</span>
                                        </div>
                                        <p className="text-xs text-brand-muted mt-0.5">{m.change}</p>
                                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-brand-muted">
                                            <span>{m.date}</span>
                                            <span>by {m.doctor}</span>
                                        </div>
                                    </div>
                                    {m.interactions !== 'None detected' && (
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Interaction</span>
                                    )}
                                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )
                        })}
                    </div>
                </SectionCard>
            )}

            {/* ── SECTION: INCIDENTS ── */}
            {activeSection === 'incidents' && (
                <SectionCard title="Clinical Incident Timeline" icon={AlertTriangle} subtitle={selectedResident.name + ' -- ' + data.incidents.length + ' recorded'}>
                    {data.incidents.length === 0 ? (
                        <div className="text-center py-8">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                            <p className="text-sm font-medium text-brand-dark">No incidents recorded</p>
                            <p className="text-xs text-brand-muted mt-1">Clean record for this patient</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {data.incidents.map(inc => {
                                const ss = SEVERITY_STYLE[inc.severity] || SEVERITY_STYLE.minor
                                return (
                                    <div
                                        key={inc.id}
                                        onClick={() => setSelectedIncident(inc)}
                                        className={'p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ' + ss.bg + ' ' + ss.border}
                                    >
                                        <div className="flex items-center justify-between mb-1.5">
                                            <div className="flex items-center gap-2">
                                                <span className={'text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ' + ss.badge}>{inc.severity}</span>
                                                <span className="text-sm font-semibold text-brand-dark">{inc.type}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                {inc.status === 'resolved' ? (
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                                ) : (
                                                    <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                                                )}
                                                <span className="text-[10px] text-brand-muted capitalize">{inc.status}</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-brand-muted">{inc.response}</p>
                                        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-brand-muted">
                                            <span>{inc.date} at {inc.time}</span>
                                            <span>{inc.location}</span>
                                            <span>By: {inc.reporter}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </SectionCard>
            )}

            {/* ── SECTION: SPECIALIST REPORTS ── */}
            {activeSection === 'specialists' && (
                <SectionCard title="Inter-Specialist Reports" icon={Microscope} subtitle={selectedResident.name + ' -- inputs from care team'}>
                    <div className="space-y-3">
                        {data.specialists.map(s => (
                            <div
                                key={s.id}
                                onClick={() => setSelectedSpecialist(s)}
                                className={'p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ' + (s.status === 'urgent' ? 'border-red-200 bg-red-50/50' : 'border-gray-100 bg-gray-50')}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Microscope className="w-4 h-4 text-brand-accent" />
                                        <span className="text-sm font-semibold text-brand-dark">{s.specialist}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        {s.status === 'urgent' ? (
                                            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                                        ) : (
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        )}
                                        <span className={'text-[10px] font-semibold uppercase ' + (s.status === 'urgent' ? 'text-red-600' : 'text-emerald-600')}>{s.status}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-brand-muted mb-2">{s.update}</p>
                                <div className="p-2 rounded-lg bg-brand-primary/5 border border-brand-primary/10 mb-2">
                                    <p className="text-[11px] text-brand-primary font-medium">Clinical implication: {s.implications}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-[10px] text-brand-muted">
                                        <Clock className="w-3 h-3" /> {s.date}
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

            {/* ── SECTION: CLINICAL KPIs ── */}
            {activeSection === 'kpis' && (
                <SectionCard title="Clinical KPI Scoreboard" icon={BarChart3} subtitle={selectedResident.name + ' -- performance metrics'}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data.kpis.map((kpi, i) => {
                            const isGood = kpi.label === 'Hospital Escalation'
                                ? kpi.value === 0
                                : kpi.value >= kpi.target
                            const isWarn = !isGood && kpi.value >= kpi.target * 0.85
                            const colorClass = isGood ? 'text-emerald-600' : isWarn ? 'text-amber-600' : 'text-red-600'
                            const bgClass = isGood ? 'bg-emerald-50 border-emerald-200' : isWarn ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'

                            return (
                                <div
                                    key={i}
                                    onClick={() => setSelectedKpi(kpi)}
                                    className={'p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ' + bgClass}
                                >
                                    <p className="text-[11px] text-brand-muted uppercase font-semibold tracking-wider">{kpi.label}</p>
                                    <div className="flex items-end gap-2 mt-1">
                                        <span className={'text-3xl font-bold ' + colorClass}>{kpi.value}{kpi.unit === '%' ? '%' : ''}</span>
                                        <span className="text-xs text-brand-muted mb-1">/ {kpi.target}{kpi.unit === '%' ? '%' : ' ' + kpi.unit}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1.5">
                                        {kpi.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />}
                                        {kpi.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-500" />}
                                        {kpi.trend === 'stable' && <Minus className="w-3.5 h-3.5 text-brand-muted" />}
                                        <span className="text-[10px] text-brand-muted capitalize">{kpi.trend}</span>
                                    </div>
                                    {!isGood && (
                                        <div className="mt-2 h-1.5 bg-gray-200 rounded-full">
                                            <div className={'h-1.5 rounded-full transition-all ' + (isWarn ? 'bg-amber-400' : 'bg-red-400')} style={{ width: Math.min(100, (kpi.value / kpi.target) * 100) + '%' }} />
                                        </div>
                                    )}
                                    <p className="text-[10px] text-brand-muted mt-1.5 flex items-center gap-1">
                                        <Info className="w-3 h-3" /> Click for details
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </SectionCard>
            )}

            {/* ── SECTION: WEEKLY REVIEW ── */}
            {activeSection === 'weekly-review' && (
                <SectionCard title="Weekly Review Form" icon={ClipboardList} subtitle={'Submit clinical review for ' + selectedResident.name}>
                    {reviewSubmitted && (
                        <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-emerald-700">Weekly review submitted successfully</span>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { key: 'observations', label: 'Clinical Observations', placeholder: 'Document clinical findings, vital sign trends, and any concerns...' },
                            { key: 'medications', label: 'Medication Adjustments', placeholder: 'Note any medication changes, dose adjustments, or new prescriptions...' },
                            { key: 'nursing', label: 'Instructions to Nursing', placeholder: 'Specific nursing care instructions, monitoring requirements...' },
                            { key: 'referrals', label: 'Referrals & Next Steps', placeholder: 'Specialist referrals, lab orders, next review date...' },
                        ].map(f => (
                            <div key={f.key}>
                                <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">{f.label}</label>
                                <textarea
                                    rows={4}
                                    value={weeklyNotes[f.key]}
                                    onChange={e => setWeeklyNotes({ ...weeklyNotes, [f.key]: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent resize-none text-brand-dark placeholder-brand-muted/50"
                                    placeholder={f.placeholder}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleReviewSubmit}
                            className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors"
                        >
                            <Send className="w-4 h-4" /> Submit Weekly Review
                        </button>
                    </div>
                </SectionCard>
            )}

            {/* ── MODALS ── */}
            {selectedMedication && (
                <Modal onClose={() => setSelectedMedication(null)}>
                    <MedicationDetailModal med={selectedMedication} onClose={() => setSelectedMedication(null)} />
                </Modal>
            )}
            {selectedIncident && (
                <Modal onClose={() => setSelectedIncident(null)}>
                    <IncidentDetailModal incident={selectedIncident} onClose={() => setSelectedIncident(null)} />
                </Modal>
            )}
            {selectedSpecialist && (
                <Modal onClose={() => setSelectedSpecialist(null)}>
                    <SpecialistDetailModal specialist={selectedSpecialist} resident={selectedResident.name} onClose={() => setSelectedSpecialist(null)} />
                </Modal>
            )}
            {selectedKpi && (
                <Modal onClose={() => setSelectedKpi(null)}>
                    <KpiDetailModal kpi={selectedKpi} resident={selectedResident.name} onClose={() => setSelectedKpi(null)} />
                </Modal>
            )}
        </DashboardShell>
    )
}

/* ================================================================
   SUB-COMPONENTS
   ================================================================ */

function VitalCard({ icon: Icon, label, value, unit, ok, target }) {
    return (
        <div className={'rounded-xl border p-3 text-center ' + (ok ? 'bg-white border-gray-200' : 'bg-red-50 border-red-200')}>
            <Icon className={'w-4 h-4 mx-auto mb-1 ' + (ok ? 'text-brand-accent' : 'text-red-500')} />
            <p className="text-[10px] text-brand-muted uppercase font-semibold tracking-wider">{label}</p>
            <p className={'text-lg font-bold mt-0.5 ' + (ok ? 'text-brand-dark' : 'text-red-600')}>{value}</p>
            {unit && <p className="text-[10px] text-brand-muted">{unit}</p>}
            {target && <p className="text-[9px] text-brand-muted mt-0.5">Target: {target}</p>}
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

function MedicationDetailModal({ med, onClose }) {
    const ms = MED_TYPE_STYLE[med.type] || MED_TYPE_STYLE.maintain
    return (
        <div>
            <div className={'px-6 py-4 border-b flex items-center justify-between ' + ms.bg + ' ' + ms.border}>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/80 flex items-center justify-center">
                        <Pill className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{med.drug}</h3>
                        <p className="text-[11px] text-brand-muted">{med.dose} -- {med.date}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <span className={'text-[10px] font-bold uppercase px-2 py-0.5 rounded ' + ms.bg + ' ' + ms.color}>{ms.label}</span>
                    <span className="text-xs text-brand-muted">by {med.doctor}</span>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1">Change</p>
                    <p className="text-sm text-brand-dark">{med.change}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1">Reason</p>
                    <p className="text-sm text-brand-dark">{med.reason}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <InfoRow icon={AlertTriangle} label="Interactions" value={med.interactions} />
                    <InfoRow icon={Activity} label="Side Effects" value={med.sideEffects} />
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Clinical Notes</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{med.notes}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors">
                        <Pill className="w-4 h-4" /> Adjust Dose
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-brand-dark text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                        <AlertTriangle className="w-4 h-4" /> Flag Interaction
                    </button>
                </div>
            </div>
        </div>
    )
}

function IncidentDetailModal({ incident, onClose }) {
    const ss = SEVERITY_STYLE[incident.severity] || SEVERITY_STYLE.minor
    return (
        <div>
            <div className={'px-6 py-4 border-b flex items-center justify-between ' + ss.bg + ' ' + ss.border}>
                <div className="flex items-center gap-3">
                    <AlertTriangle className={'w-5 h-5 ' + ss.text} />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{incident.type}</h3>
                        <p className="text-[11px] text-brand-muted">{incident.date} at {incident.time}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <span className={'text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ' + ss.badge}>{incident.severity}</span>
                    <div className="flex items-center gap-1">
                        {incident.status === 'resolved' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                        )}
                        <span className="text-[10px] text-brand-muted capitalize">{incident.status}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <InfoRow icon={Calendar} label="Location" value={incident.location} />
                    <InfoRow icon={UserCheck} label="Reporter" value={incident.reporter} />
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Initial Response</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{incident.response}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Follow-Up</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{incident.followUp}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Nursing Instructions</p>
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-sm text-blue-800 leading-relaxed">{incident.nursingInstructions}</p>
                    </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors">
                    <Plus className="w-4 h-4" /> Add Follow-up Note
                </button>
            </div>
        </div>
    )
}

function SpecialistDetailModal({ specialist, resident, onClose }) {
    const isUrgent = specialist.status === 'urgent'
    const [acknowledged, setAcknowledged] = useState(false)
    const [clarificationSent, setClarificationSent] = useState(false)
    const [showClarificationForm, setShowClarificationForm] = useState(false)
    const [clarificationText, setClarificationText] = useState('')

    const handleAcknowledge = () => {
        setAcknowledged(true)
    }

    const handleSendClarification = () => {
        if (!clarificationText.trim()) return
        setClarificationSent(true)
        setShowClarificationForm(false)
    }

    return (
        <div>
            <div className={'px-6 py-4 border-b flex items-center justify-between ' + (isUrgent ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200')}>
                <div className="flex items-center gap-3">
                    <Microscope className={'w-5 h-5 ' + (isUrgent ? 'text-red-600' : 'text-brand-accent')} />
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
                        {isUrgent ? (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                        ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                        <span className={'text-xs font-semibold uppercase ' + (isUrgent ? 'text-red-600' : 'text-emerald-600')}>{specialist.status}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-brand-muted">
                        <Clock className="w-3 h-3" /> {specialist.date}
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Summary</p>
                    <p className="text-sm font-medium text-brand-dark">{specialist.update}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Clinical Implications</p>
                    <div className="p-3 rounded-lg bg-brand-primary/5 border border-brand-primary/10">
                        <p className="text-sm text-brand-primary leading-relaxed">{specialist.implications}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Full Report</p>
                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{specialist.fullReport}</p>
                    </div>
                </div>

                {/* Acknowledged success banner */}
                {acknowledged && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2" style={{ animation: 'modalIn 0.2s ease-out' }}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-emerald-700">Report acknowledged</p>
                            <p className="text-[11px] text-emerald-600">Logged at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -- {specialist.specialist} will be notified</p>
                        </div>
                    </div>
                )}

                {/* Clarification sent success banner */}
                {clarificationSent && (
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-2" style={{ animation: 'modalIn 0.2s ease-out' }}>
                        <Send className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-blue-700">Clarification request sent</p>
                            <p className="text-[11px] text-blue-600">{specialist.specialist} will receive your message and respond in their next update</p>
                        </div>
                    </div>
                )}

                {/* Clarification form */}
                {showClarificationForm && !clarificationSent && (
                    <div className="space-y-2" style={{ animation: 'modalIn 0.2s ease-out' }}>
                        <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">Message to {specialist.specialist}</p>
                        <textarea
                            rows={3}
                            value={clarificationText}
                            onChange={e => setClarificationText(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 resize-none text-brand-dark placeholder-brand-muted/50"
                            placeholder={'Describe what you need clarified from ' + specialist.specialist + '...'}
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleSendClarification}
                                disabled={!clarificationText.trim()}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4" /> Send
                            </button>
                            <button
                                onClick={() => { setShowClarificationForm(false); setClarificationText('') }}
                                className="px-4 py-2 text-sm font-medium text-brand-muted rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Action buttons */}
                {!showClarificationForm && (
                    <div className="flex gap-2">
                        <button
                            onClick={handleAcknowledge}
                            disabled={acknowledged}
                            className={'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ' + (acknowledged ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-brand-primary text-white hover:bg-brand-primary-dark')}
                        >
                            <CheckCircle2 className="w-4 h-4" /> {acknowledged ? 'Acknowledged' : 'Acknowledge'}
                        </button>
                        <button
                            onClick={() => setShowClarificationForm(true)}
                            disabled={clarificationSent}
                            className={'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ' + (clarificationSent ? 'bg-blue-100 text-blue-700 cursor-default' : 'bg-white text-brand-dark border border-gray-200 hover:bg-gray-50')}
                        >
                            <Send className="w-4 h-4" /> {clarificationSent ? 'Sent' : 'Request Clarification'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

function KpiDetailModal({ kpi, resident, onClose }) {
    const [showChart, setShowChart] = useState(false)
    const isGood = kpi.label === 'Hospital Escalation' ? kpi.value === 0 : kpi.value >= kpi.target
    const isWarn = !isGood && kpi.value >= kpi.target * 0.85
    const colorClass = isGood ? 'text-emerald-600' : isWarn ? 'text-amber-600' : 'text-red-600'
    const strokeColor = isGood ? '#059669' : isWarn ? '#d97706' : '#dc2626'
    const bgClass = isGood ? 'bg-emerald-50 border-emerald-200' : isWarn ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'

    return (
        <div>
            <div className={'px-6 py-4 border-b flex items-center justify-between ' + bgClass}>
                <div className="flex items-center gap-3">
                    <BarChart3 className={'w-5 h-5 ' + colorClass} />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{kpi.label}</h3>
                        <p className="text-[11px] text-brand-muted">{resident}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div className="text-center py-4">
                    <p className={'text-5xl font-bold ' + colorClass}>{kpi.value}{kpi.unit === '%' ? '%' : ''}</p>
                    <p className="text-sm text-brand-muted mt-1">Target: {kpi.target}{kpi.unit === '%' ? '%' : ' ' + kpi.unit}</p>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                        {kpi.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                        {kpi.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                        {kpi.trend === 'stable' && <Minus className="w-4 h-4 text-brand-muted" />}
                        <span className="text-xs text-brand-muted capitalize">Trend: {kpi.trend}</span>
                    </div>
                </div>
                {!isGood && (
                    <div className="h-2.5 bg-gray-200 rounded-full">
                        <div className={'h-2.5 rounded-full transition-all ' + (isWarn ? 'bg-amber-400' : 'bg-red-400')} style={{ width: Math.min(100, (kpi.value / kpi.target) * 100) + '%' }} />
                    </div>
                )}
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Detail</p>
                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{kpi.detail}</p>
                    </div>
                </div>

                {/* Historical Trend Toggle */}
                <button
                    onClick={() => setShowChart(v => !v)}
                    className={'w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ' + (showChart ? 'bg-brand-primary text-white hover:bg-brand-primary-dark' : 'bg-white text-brand-dark border border-gray-200 hover:bg-gray-50')}
                >
                    <Eye className="w-4 h-4" /> {showChart ? 'Hide Historical Trend' : 'View Historical Trend'}
                </button>

                {showChart && kpi.history && kpi.history.length > 0 && (
                    <div className="pt-2 space-y-3" style={{ animation: 'modalIn 0.2s ease-out' }}>
                        <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">Historical Trend</p>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={kpi.history} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" domain={kpi.unit === '%' ? [0, 100] : ['auto', 'auto']} />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(val) => [val + (kpi.unit === '%' ? '%' : ' ' + kpi.unit), kpi.label]} />
                                    <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={2.5} dot={{ r: 4, fill: strokeColor }} activeDot={{ r: 6 }} name={kpi.label} />
                                    {kpi.target > 0 && (
                                        <Line type="monotone" dataKey={() => kpi.target} stroke="#9ca3af" strokeWidth={1} strokeDasharray="5 5" dot={false} name={'Target (' + kpi.target + (kpi.unit === '%' ? '%' : '') + ')'} />
                                    )}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center justify-center gap-4 text-[10px] text-brand-muted">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-0.5 rounded" style={{ backgroundColor: strokeColor }} />
                                <span>Actual</span>
                            </div>
                            {kpi.target > 0 && (
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-0.5 rounded bg-gray-400 border-dashed" />
                                    <span>Target ({kpi.target}{kpi.unit === '%' ? '%' : ''})</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
