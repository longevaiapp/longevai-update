import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend
} from 'recharts'
import {
    Heart, Smile, Apple, Compass, Shield, Star, Camera, Calendar,
    Send, Clock, Bell, ChevronRight, X, MessageCircle, FileText,
    CheckCircle2, ChevronDown, User, Download, Filter, ArrowUpRight,
    ArrowDownRight, Minus, Eye, BookOpen, Activity, Sun, Moon,
    Utensils, Music, Palette, Flower2, Footprints, Phone, Mail,
    MapPin, Info, AlertCircle, ThumbsUp, Sparkles, CalendarDays,
    ClipboardList, Users, Stethoscope, Plus, Search,
    UserCircle, Briefcase, GraduationCap,
    Building2, Globe, Pencil, Save
} from 'lucide-react'

/* ================================================================
   RESIDENT DATA -- families with multiple loved ones
   ================================================================ */

const RESIDENTS = [
    { id: 1, name: 'Eleanor', room: '104', age: 81, week: 12, conditions: ['Mild cognitive decline', 'Hypertension'], careTeam: 'Team A', startDate: 'Jan 13, 2026' },
    { id: 2, name: 'Fernando', room: '108', age: 76, week: 8, conditions: ['Diabetes T2', 'Depression'], careTeam: 'Team B', startDate: 'Feb 10, 2026' },
]

/* ================================================================
   PER-RESIDENT DATA
   ================================================================ */

const RESIDENT_DATA = {
    1: {
        welcomeMessage: 'Eleanor is doing well this week. She has been active, social, and enjoying her meals. The care team has noticed steady improvement in her energy and mood.',
        wellbeingRadar: [
            { dimension: 'Physical', score: 82, prev: 75 },
            { dimension: 'Emotional', score: 88, prev: 80 },
            { dimension: 'Nutrition', score: 90, prev: 85 },
            { dimension: 'Engagement', score: 78, prev: 70 },
            { dimension: 'Safety', score: 95, prev: 92 },
        ],
        wellbeingDimensions: [
            { name: 'Physical Vitality', icon: 'Heart', status: 'thriving', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', score: 82, desc: 'She has been walking more this week and her energy levels are wonderful. Her physiotherapist noted 20 meters more walking distance than the last session.', details: 'Eleanor completed 4 out of 5 scheduled walking sessions this week. Her grip strength improved to 18 kg (up from 14 kg at intake). Balance exercises are showing positive effects -- she can now hold a tandem stand for 8 seconds.' },
            { name: 'Emotional Joy', icon: 'Smile', status: 'thriving', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', score: 88, desc: 'Eleanor has been in great spirits, especially enjoying the music sessions and making new friends.', details: 'Her mood has been consistently positive this week. She initiated conversations with 3 new residents and participated in the sing-along on Tuesday with visible enthusiasm. The psychologist noted improved social confidence.' },
            { name: 'Nourishment & Taste', icon: 'Apple', status: 'thriving', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', score: 90, desc: 'She loved the new fish recipe this week and has been eating well at every meal.', details: 'Caloric intake has been consistent at 1,800-2,000 kcal/day. She tried 3 new dishes this week and finished all of them. The nutritionist is pleased with her protein intake (72g/day average). Hydration has improved to 6-7 glasses per day.' },
            { name: 'Engagement & Purpose', icon: 'Compass', status: 'growing', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', score: 78, desc: 'She joined the garden club and helped plant new flowers yesterday. Her involvement in group activities is increasing.', details: 'Eleanor attended 6 out of 8 scheduled activities this week. She showed particular interest in the garden club (attended both sessions) and the art workshop. She declined the board game evening but participated in all other offerings.' },
            { name: 'Safety & Peace', icon: 'Shield', status: 'thriving', color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200', score: 95, desc: 'Everything is stable and consistent. She is comfortable, sleeping well, and her environment has been optimized for safety.', details: 'No incidents this week. Sleep quality has been good (6-7 hours per night). Her room environment was adjusted with better lighting and non-slip mats were confirmed in place. She reports feeling safe and comfortable.' },
        ],
        careTeamStatus: [
            { role: 'Gerontologist', name: 'Dr. Gomez', lastVisit: 'Apr 3', nextVisit: 'Apr 17', status: 'On schedule' },
            { role: 'Psychologist', name: 'Dra. Rivera', lastVisit: 'Apr 1', nextVisit: 'Apr 8', status: 'Visit tomorrow' },
            { role: 'Nutritionist', name: 'Lic. Morales', lastVisit: 'Mar 28', nextVisit: 'Apr 11', status: 'On schedule' },
            { role: 'Physiotherapist', name: 'Lic. Vargas', lastVisit: 'Apr 5', nextVisit: 'May 5', status: 'Monthly cycle' },
            { role: 'Nursing Lead', name: 'Enf. Castillo', lastVisit: 'Daily', nextVisit: 'Daily', status: 'Active' },
        ],
        dailySnapshot: {
            sleep: '6.5 hrs (good)', meals: '3/3 completed', mood: 'Happy & social', activity: '4 activities today', vitals: 'All normal', medication: 'All administered',
        },
        weeklyHighlights: [
            { text: 'Eleanor participated in the music therapy session on Tuesday and was singing along to her favorite songs.', category: 'Engagement', icon: 'Music', date: 'Apr 2' },
            { text: 'She tried the new Mediterranean lunch menu and asked for the recipe! The chef was delighted.', category: 'Nutrition', icon: 'Utensils', date: 'Apr 3' },
            { text: 'During physiotherapy, she walked 20 meters more than last session -- a wonderful improvement.', category: 'Physical', icon: 'Footprints', date: 'Apr 5' },
            { text: 'She made a new friend in the art workshop and they have been having tea together.', category: 'Social', icon: 'Users', date: 'Apr 4' },
            { text: 'Her sleep quality improved this week -- averaging 6.5 hours with fewer interruptions.', category: 'Wellbeing', icon: 'Moon', date: 'Apr 6' },
        ],
        joyMoments: [
            { text: 'Laughed out loud during the comedy movie screening on Wednesday evening.', date: 'Apr 2' },
            { text: 'Received a handmade card from a fellow resident and kept it on her nightstand.', date: 'Apr 4' },
            { text: 'Hummed her favorite song while watering plants in the garden.', date: 'Apr 5' },
        ],
        comparisonToLastWeek: { physical: 7, emotional: 8, nutrition: 5, engagement: 8, safety: 3 },
        monthlyReport: {
            narrative: 'This month has been a wonderful chapter for Eleanor. Her physical vitality continues to improve -- she is walking further each week and has even started attending the garden club with genuine enthusiasm. Emotionally, we see a woman who is rediscovering small joys: a song, a meal, a conversation with a new friend. Her nutritional care has been smooth, and she is trying new dishes with curiosity. The care team notes consistent improvement across all five wellbeing dimensions, with particular progress in engagement and emotional resilience. We are optimistic about the coming weeks.',
            author: 'Dr. Gomez & Care Team, Amatista Life',
            date: 'April 1, 2026',
            keyMetrics: [
                { label: 'Overall Wellbeing', value: '87%', change: '+6%', trend: 'up' },
                { label: 'Activity Participation', value: '75%', change: '+12%', trend: 'up' },
                { label: 'Meal Completion', value: '95%', change: '+3%', trend: 'up' },
                { label: 'Sleep Quality', value: 'Good', change: 'Improved', trend: 'up' },
                { label: 'Social Interactions', value: '12/week', change: '+4', trend: 'up' },
                { label: 'Exercise Adherence', value: '85%', change: '+8%', trend: 'up' },
            ],
            recommendations: [
                'Continue current exercise program with physiotherapist -- showing excellent progress.',
                'Encourage garden club participation -- Eleanor finds it very rewarding.',
                'Consider scheduling a family video call mid-week to maintain emotional connection.',
                'The nutritionist suggests introducing more Mediterranean-style dishes which Eleanor enjoys.',
            ],
        },
        wellbeingTrend: [
            { month: 'Jan', physical: 60, emotional: 62, nutrition: 70, engagement: 48, safety: 88 },
            { month: 'Feb', physical: 68, emotional: 70, nutrition: 78, engagement: 58, safety: 90 },
            { month: 'Mar', physical: 75, emotional: 80, nutrition: 85, engagement: 70, safety: 92 },
            { month: 'Apr', physical: 82, emotional: 88, nutrition: 90, engagement: 78, safety: 95 },
        ],
        activityGallery: [
            { id: 1, title: 'Garden Club', date: 'Apr 4', category: 'Nature', desc: 'Planting new spring flowers with the activity group. Eleanor planted marigolds and sunflowers.' },
            { id: 2, title: 'Music Therapy', date: 'Apr 2', category: 'Music', desc: 'Singing familiar songs from her youth. Beautiful engagement and visible joy throughout the session.' },
            { id: 3, title: 'Art Workshop', date: 'Mar 28', category: 'Art', desc: 'Painting watercolors with fellow residents. Eleanor created a beautiful landscape.' },
            { id: 4, title: 'Birthday Celebration', date: 'Mar 25', category: 'Social', desc: 'Fernando birthday party. Eleanor helped organize decorations and made a card.' },
            { id: 5, title: 'Cooking Class', date: 'Mar 22', category: 'Nutrition', desc: 'Made empanadas with the chef. Eleanor rolled the dough and chose the filling.' },
            { id: 6, title: 'Movie Night', date: 'Mar 20', category: 'Entertainment', desc: 'Watched a classic film with popcorn. Laughed and chatted with neighbors.' },
            { id: 7, title: 'Chair Yoga', date: 'Mar 18', category: 'Exercise', desc: 'Gentle stretching and breathing exercises. Eleanor reported feeling relaxed afterward.' },
            { id: 8, title: 'Story Circle', date: 'Mar 15', category: 'Social', desc: 'Shared memories from her childhood. Other residents were fascinated by her stories.' },
        ],
        activityCalendar: [
            { day: 'Mon', activities: ['Walking Program', 'Garden Club'] },
            { day: 'Tue', activities: ['Music Therapy', 'Art Workshop'] },
            { day: 'Wed', activities: ['Chair Yoga', 'Movie Night'] },
            { day: 'Thu', activities: ['Walking Program', 'Cooking Class'] },
            { day: 'Fri', activities: ['Garden Club', 'Story Circle'] },
            { day: 'Sat', activities: ['Free Time', 'Social Hour'] },
            { day: 'Sun', activities: ['Family Visit', 'Rest'] },
        ],
        visitSlots: [
            { id: 1, date: 'Apr 8 (Tue)', time: '10:00 - 11:00', available: true },
            { id: 2, date: 'Apr 8 (Tue)', time: '15:00 - 16:00', available: true },
            { id: 3, date: 'Apr 9 (Wed)', time: '10:00 - 11:00', available: false },
            { id: 4, date: 'Apr 10 (Thu)', time: '14:00 - 15:00', available: true },
            { id: 5, date: 'Apr 11 (Fri)', time: '10:00 - 11:00', available: true },
            { id: 6, date: 'Apr 12 (Sat)', time: '10:00 - 12:00', available: true },
        ],
        visitHistory: [
            { date: 'Apr 1', time: '10:00 - 11:30', visitors: 'Maria & Carlos (daughter & son-in-law)', notes: 'Brought photos from Easter. Eleanor was very happy.' },
            { date: 'Mar 25', time: '14:00 - 15:00', visitors: 'Maria (daughter)', notes: 'Celebrated Fernando birthday together. Shared cake.' },
            { date: 'Mar 18', time: '10:00 - 11:00', visitors: 'Lucia (granddaughter)', notes: 'Video call from abroad. Eleanor showed her garden work.' },
        ],
        visitGuidelines: [
            'Visits are available daily between 9:00 AM and 5:00 PM.',
            'Please arrive at reception 10 minutes before your scheduled time.',
            'Outdoor garden visits are encouraged when weather permits.',
            'If your loved one is resting, our staff will gently check if she would like to visit.',
            'Small gifts and personal items are welcome -- please check with nursing first for food items.',
        ],
        conversationHistory: [
            { id: 1, from: 'family', text: 'How has Mom been sleeping this week? She mentioned some trouble last time we visited.', date: 'Apr 3, 10:15 AM', category: 'Question' },
            { id: 2, from: 'team', text: 'Hello Maria! Eleanor sleep has actually improved this week. She is averaging 6.5 hours with fewer wake-ups. We adjusted her evening routine -- a warm herbal tea and soft music before bed -- and it seems to be helping.', date: 'Apr 3, 2:30 PM', respondedBy: 'Enf. Castillo' },
            { id: 3, from: 'family', text: 'That is wonderful to hear! Thank you so much for the care. We noticed she seemed happier during our last visit too.', date: 'Apr 4, 9:00 AM', category: 'Gratitude' },
            { id: 4, from: 'team', text: 'We are so glad to hear that! She has indeed been in great spirits. The music therapy sessions are a highlight for her. We will keep you updated on her progress.', date: 'Apr 4, 11:45 AM', respondedBy: 'Dr. Gomez' },
        ],
        quickActions: [
            { label: 'Ask about her week', template: 'Hello, could you share how my mother has been doing this week? Any highlights or concerns?' },
            { label: 'Request a photo update', template: 'Hi, would it be possible to send me a recent photo of my mother during one of her activities? Thank you!' },
            { label: 'Share family news', template: 'Hello, I wanted to share some family news with the team so you can tell my mother: ' },
            { label: 'Schedule a video call', template: 'Hi, I would like to schedule a video call with my mother. What times work best this week?' },
        ],
    },
    2: {
        welcomeMessage: 'Fernando has had a mixed week. His diabetes management is going well, but we noticed lower energy and some withdrawal from activities. The team is paying close attention and adjusting his care plan.',
        wellbeingRadar: [
            { dimension: 'Physical', score: 68, prev: 70 },
            { dimension: 'Emotional', score: 55, prev: 60 },
            { dimension: 'Nutrition', score: 82, prev: 78 },
            { dimension: 'Engagement', score: 50, prev: 55 },
            { dimension: 'Safety', score: 90, prev: 90 },
        ],
        wellbeingDimensions: [
            { name: 'Physical Vitality', icon: 'Heart', status: 'growing', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', score: 68, desc: 'His diabetes is well-managed but energy levels dipped this week. Gentle exercise continues.', details: 'Blood sugar levels have been stable (fasting 110-125 mg/dL). He completed 3 of 5 walking sessions but with less enthusiasm. The physiotherapist adjusted intensity to match his energy.' },
            { name: 'Emotional Joy', icon: 'Smile', status: 'needs-support', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', score: 55, desc: 'Fernando has been quieter than usual. The psychologist had an extra session with him this week.', details: 'He expressed missing his late wife during the psychology session. The team is providing extra emotional support and companionship. He did brighten up during the chess club on Thursday.' },
            { name: 'Nourishment & Taste', icon: 'Apple', status: 'thriving', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', score: 82, desc: 'His diabetic-friendly meals are going well. He particularly enjoyed the grilled chicken this week.', details: 'Caloric intake stable at 1,700 kcal/day. Blood sugar response to meals is well-controlled. He enjoyed trying the new diabetic-friendly dessert options.' },
            { name: 'Engagement & Purpose', icon: 'Compass', status: 'needs-support', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', score: 50, desc: 'He declined several activities this week but did attend chess club. We are gently encouraging participation.', details: 'Attended only 3 of 7 scheduled activities. However, he showed genuine interest in chess and asked to play more often. The activities team is looking for more cognitive engagement options.' },
            { name: 'Safety & Peace', icon: 'Shield', status: 'thriving', color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200', score: 90, desc: 'No safety concerns. Sleep has been adequate and his environment is comfortable.', details: 'No incidents. Sleep averages 7 hours. Medication adherence is 100%. Room environment is comfortable and he reports feeling safe.' },
        ],
        careTeamStatus: [
            { role: 'Gerontologist', name: 'Dr. Gomez', lastVisit: 'Apr 2', nextVisit: 'Apr 16', status: 'On schedule' },
            { role: 'Psychologist', name: 'Dra. Rivera', lastVisit: 'Apr 5', nextVisit: 'Apr 8', status: 'Extra session added' },
            { role: 'Nutritionist', name: 'Lic. Morales', lastVisit: 'Mar 30', nextVisit: 'Apr 13', status: 'On schedule' },
            { role: 'Physiotherapist', name: 'Lic. Vargas', lastVisit: 'Apr 4', nextVisit: 'May 4', status: 'Monthly cycle' },
            { role: 'Nursing Lead', name: 'Enf. Delgado', lastVisit: 'Daily', nextVisit: 'Daily', status: 'Active' },
        ],
        dailySnapshot: {
            sleep: '7 hrs (adequate)', meals: '3/3 completed', mood: 'Quiet, reflective', activity: '2 activities today', vitals: 'All normal', medication: 'All administered',
        },
        weeklyHighlights: [
            { text: 'Fernando won two chess matches on Thursday and seemed genuinely proud of himself.', category: 'Engagement', icon: 'Sparkles', date: 'Apr 3' },
            { text: 'His blood sugar levels have been the most stable they have been since admission.', category: 'Health', icon: 'Activity', date: 'Apr 5' },
            { text: 'He had a meaningful conversation with Dr. Rivera about coping with loss.', category: 'Emotional', icon: 'Heart', date: 'Apr 5' },
        ],
        joyMoments: [
            { text: 'Smiled broadly when he won his second chess match.', date: 'Apr 3' },
            { text: 'Asked the chef for the grilled chicken recipe to share with his son.', date: 'Apr 4' },
        ],
        comparisonToLastWeek: { physical: -2, emotional: -5, nutrition: 4, engagement: -5, safety: 0 },
        monthlyReport: {
            narrative: 'Fernando first two months at Amatista have been a journey of adjustment. His physical health, particularly diabetes management, has been a success story -- blood sugar levels are more stable than they have been in years. Nutritionally, he is eating well and enjoying the diabetic-friendly menu. The area that needs our attention is his emotional wellbeing. The loss of his wife six months ago continues to weigh on him, and this manifests as withdrawal from activities. However, we see glimmers of his former self -- his love of chess, his pride in small victories, his curiosity about food. The psychologist has increased sessions, and we are focusing on finding activities that give him purpose.',
            author: 'Dr. Gomez & Care Team, Amatista Life',
            date: 'April 1, 2026',
            keyMetrics: [
                { label: 'Overall Wellbeing', value: '69%', change: '-3%', trend: 'down' },
                { label: 'Activity Participation', value: '43%', change: '-12%', trend: 'down' },
                { label: 'Meal Completion', value: '92%', change: '+5%', trend: 'up' },
                { label: 'Sleep Quality', value: 'Adequate', change: 'Stable', trend: 'neutral' },
                { label: 'Social Interactions', value: '5/week', change: '-2', trend: 'down' },
                { label: 'Blood Sugar Stability', value: 'Excellent', change: 'Improved', trend: 'up' },
            ],
            recommendations: [
                'Continue chess club -- Fernando finds genuine enjoyment and purpose in it.',
                'Consider introducing a reading or puzzle group -- cognitive engagement may appeal to him.',
                'Schedule a family visit or video call soon -- social connection helps his mood.',
                'The psychologist will continue twice-weekly sessions for the next month.',
            ],
        },
        wellbeingTrend: [
            { month: 'Feb', physical: 55, emotional: 45, nutrition: 65, engagement: 40, safety: 88 },
            { month: 'Mar', physical: 70, emotional: 60, nutrition: 78, engagement: 55, safety: 90 },
            { month: 'Apr', physical: 68, emotional: 55, nutrition: 82, engagement: 50, safety: 90 },
        ],
        activityGallery: [
            { id: 1, title: 'Chess Club', date: 'Apr 3', category: 'Cognitive', desc: 'Won two matches against fellow residents. Showed great strategic thinking.' },
            { id: 2, title: 'Garden Walk', date: 'Apr 1', category: 'Nature', desc: 'Quiet walk through the garden. Stopped to admire the new flowers.' },
            { id: 3, title: 'Birthday Party', date: 'Mar 25', category: 'Social', desc: 'His own birthday celebration! The team baked a special diabetic-friendly cake.' },
            { id: 4, title: 'Reading Hour', date: 'Mar 20', category: 'Cognitive', desc: 'Read a chapter of his favorite book in the library corner.' },
        ],
        activityCalendar: [
            { day: 'Mon', activities: ['Walking Program', 'Free Time'] },
            { day: 'Tue', activities: ['Psychology Session', 'Chess Club'] },
            { day: 'Wed', activities: ['Walking Program', 'Reading Hour'] },
            { day: 'Thu', activities: ['Chess Club', 'Social Hour'] },
            { day: 'Fri', activities: ['Psychology Session', 'Garden Walk'] },
            { day: 'Sat', activities: ['Free Time', 'Movie Night'] },
            { day: 'Sun', activities: ['Family Visit', 'Rest'] },
        ],
        visitSlots: [
            { id: 1, date: 'Apr 8 (Tue)', time: '10:00 - 11:00', available: true },
            { id: 2, date: 'Apr 9 (Wed)', time: '14:00 - 15:00', available: true },
            { id: 3, date: 'Apr 10 (Thu)', time: '10:00 - 11:00', available: true },
            { id: 4, date: 'Apr 11 (Fri)', time: '15:00 - 16:00', available: false },
        ],
        visitHistory: [
            { date: 'Mar 25', time: '14:00 - 16:00', visitors: 'Carlos (son) & Ana (daughter-in-law)', notes: 'Birthday celebration. Fernando was emotional but happy. They brought his favorite book.' },
            { date: 'Mar 15', time: '10:00 - 11:00', visitors: 'Carlos (son)', notes: 'Regular visit. Played chess together. Fernando seemed in good spirits.' },
        ],
        visitGuidelines: [
            'Visits are available daily between 9:00 AM and 5:00 PM.',
            'Please arrive at reception 10 minutes before your scheduled time.',
            'Outdoor garden visits are encouraged when weather permits.',
            'Fernando sometimes prefers quiet company -- sitting together is perfectly okay.',
            'Please avoid bringing sugary snacks. Diabetic-friendly treats are welcome.',
        ],
        conversationHistory: [
            { id: 1, from: 'family', text: 'Hi, how has Dad been feeling emotionally this week? He seemed a bit down during our last call.', date: 'Apr 2, 11:00 AM', category: 'Concern' },
            { id: 2, from: 'team', text: 'Hello Carlos. Thank you for reaching out. Fernando has had some quieter days this week. Dr. Rivera had an extra session with him and he opened up about missing your mother. He did brighten up during chess club. We are keeping a close eye and providing extra companionship.', date: 'Apr 2, 3:15 PM', respondedBy: 'Enf. Delgado' },
            { id: 3, from: 'family', text: 'Thank you for the extra attention. Would it help if we visited more often?', date: 'Apr 3, 9:30 AM', category: 'Question' },
            { id: 4, from: 'team', text: 'Absolutely, Carlos. More frequent visits would be very beneficial. Even short visits make a difference. We also suggest a mid-week video call. Dr. Rivera can share more specific suggestions during your next visit.', date: 'Apr 3, 1:00 PM', respondedBy: 'Dr. Gomez' },
        ],
        quickActions: [
            { label: 'Ask about his mood', template: 'Hello, could you share how my father has been feeling emotionally this week? Any concerns?' },
            { label: 'Request activity update', template: 'Hi, could you let me know which activities my father participated in this week? Thank you!' },
            { label: 'Share encouraging news', template: 'Hello, I wanted to share some good news with the team to brighten my father day: ' },
            { label: 'Schedule extra visit', template: 'Hi, I would like to schedule an additional visit this week. What times are available?' },
        ],
    },
}

/* ================================================================
   FAMILY PORTAL ALERTS (for notification dropdown)
   ================================================================ */

const FAMILY_ALERTS = [
    { id: 1, severity: 'info', area: 'Milestone', message: 'Eleanor completed Week 12! Her progress report is now available.', time: '2d ago' },
    { id: 2, severity: 'info', area: 'Activity', message: 'Eleanor tried a new activity -- Garden Club -- and loved it!', time: '4d ago' },
    { id: 3, severity: 'warning', area: 'Wellbeing', message: 'Fernando: Emotional wellbeing score decreased this week. Extra support in place.', time: '3d ago' },
    { id: 4, severity: 'info', area: 'Visit', message: 'Your next scheduled visit is Apr 8 at 10:00 AM.', time: '1d ago' },
    { id: 5, severity: 'info', area: 'Message', message: 'New response from Dr. Gomez regarding your recent inquiry.', time: '5d ago' },
]

/* ================================================================
   STATUS + ICON CONFIG
   ================================================================ */

const STATUS_LABELS = {
    thriving: { label: 'Thriving', bg: 'bg-emerald-100 text-emerald-700' },
    growing: { label: 'Growing', bg: 'bg-blue-100 text-blue-700' },
    'needs-support': { label: 'Needs Support', bg: 'bg-amber-100 text-amber-700' },
}

const ICON_MAP = {
    Heart, Smile, Apple, Compass, Shield, Music, Utensils, Footprints,
    Users, Moon, Activity, Sparkles,
}

const CATEGORY_COLORS = {
    Nature: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Music: 'bg-purple-50 text-purple-700 border-purple-200',
    Art: 'bg-pink-50 text-pink-700 border-pink-200',
    Social: 'bg-blue-50 text-blue-700 border-blue-200',
    Nutrition: 'bg-amber-50 text-amber-700 border-amber-200',
    Entertainment: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Exercise: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Cognitive: 'bg-cyan-50 text-cyan-700 border-cyan-200',
}

/* ================================================================
   PROFILE
   ================================================================ */
const PROFILE_STORAGE_KEY = 'longevai-family-profile'
const DEFAULT_PROFILE = {
    name: 'Maria Elena Rodriguez',
    title: 'Family Member -- Primary Contact',
    license: '',
    specialization: '',
    email: 'm.rodriguez@email.com',
    phone: '+34 611 234 987',
    office: '',
    institution: 'Amatista Life -- Family Portal',
    education: '',
    certifications: '',
    bio: 'Primary family contact for Eleanor Rodriguez (Room 104). Engaged in care decisions, monthly reviews, and regular communication with the care team.',
    shiftStart: '',
    shiftEnd: '',
    yearsExperience: 0,
    residentsManaged: 1,
    relationship: 'Daughter',
    emergencyContact: true,
    preferredContact: 'Email & Phone',
}
function loadProfile() {
    try { const d = localStorage.getItem(PROFILE_STORAGE_KEY); return d ? { ...DEFAULT_PROFILE, ...JSON.parse(d) } : DEFAULT_PROFILE } catch { return DEFAULT_PROFILE }
}
function saveProfile(p) { localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(p)) }

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function FamilyPortal() {
    const [activeSection, setActiveSection] = useState('overview')
    const [selectedResident, setSelectedResident] = useState(RESIDENTS[0])

    /* Modals */
    const [selectedDimension, setSelectedDimension] = useState(null)
    const [selectedActivity, setSelectedActivity] = useState(null)
    const [selectedVisitDetail, setSelectedVisitDetail] = useState(null)

    /* Profile */
    const [profile, setProfile] = useState(() => loadProfile())
    const [editingProfile, setEditingProfile] = useState(false)

    /* Visit booking -- localStorage */
    const [bookedSlots, setBookedSlots] = useState(() => {
        try { return JSON.parse(localStorage.getItem('family_booked_slots') || '[]') } catch { return [] }
    })

    /* Favorites -- localStorage */
    const [favorites, setFavorites] = useState(() => {
        try { return JSON.parse(localStorage.getItem('family_favorites') || '{}') } catch { return {} }
    })

    /* Messages */
    const [message, setMessage] = useState('')
    const [messageCategory, setMessageCategory] = useState('Question')
    const [sentMessages, setSentMessages] = useState(() => {
        try { return JSON.parse(localStorage.getItem('family_sent_messages') || '[]') } catch { return [] }
    })

    /* Gallery filter */
    const [galleryFilter, setGalleryFilter] = useState('All')

    const data = RESIDENT_DATA[selectedResident.id]

    const persistBookedSlots = (next) => { setBookedSlots(next); localStorage.setItem('family_booked_slots', JSON.stringify(next)) }
    const persistFavorites = (next) => { setFavorites(next); localStorage.setItem('family_favorites', JSON.stringify(next)) }
    const persistSentMessages = (next) => { setSentMessages(next); localStorage.setItem('family_sent_messages', JSON.stringify(next)) }

    const handleBookSlot = (slotId) => {
        const key = selectedResident.id + ':' + slotId
        if (!bookedSlots.includes(key)) {
            persistBookedSlots([...bookedSlots, key])
        }
    }

    const handleToggleFavorite = (actId) => {
        const key = selectedResident.id + ':' + actId
        const next = { ...favorites, [key]: !favorites[key] }
        persistFavorites(next)
    }

    const handleSendMessage = () => {
        if (!message.trim()) return
        const msg = {
            id: Date.now(),
            from: 'family',
            text: message.trim(),
            date: new Date().toLocaleString(),
            category: messageCategory,
        }
        persistSentMessages([...sentMessages, msg])
        setMessage('')
    }

    const isFavorited = (actId) => favorites[selectedResident.id + ':' + actId] || false
    const isBooked = (slotId) => bookedSlots.includes(selectedResident.id + ':' + slotId)

    /* Filtered gallery */
    const galleryCategories = ['All', ...new Set(data.activityGallery.map(a => a.category))]
    const filteredGallery = galleryFilter === 'All' ? data.activityGallery : data.activityGallery.filter(a => a.category === galleryFilter)

    /* Overall wellbeing average */
    const avgWellbeing = Math.round(data.wellbeingRadar.reduce((s, d) => s + d.score, 0) / data.wellbeingRadar.length)

    return (
        <DashboardShell
            roleId="family"
            roleTag="Family Member -- Monthly access + notifications"
            title="Your Loved One's Wellbeing Portal"
            badges={[]}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            notifications={FAMILY_ALERTS}
        >
            {/* Date Bar + Profile Button */}
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-brand-accent" />
                    <span className="text-sm font-semibold text-brand-dark">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <button onClick={() => setActiveSection('profile')} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-brand-accent/30 hover:shadow-sm transition-all">
                    <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <UserCircle className="w-3.5 h-3.5 text-brand-primary" />
                    </div>
                    <span className="text-[11px] font-medium text-brand-dark hidden sm:inline">{profile.name.split(' ').slice(0, 2).join(' ')}</span>
                </button>
            </div>

            {/* Resident Selector */}
            {RESIDENTS.length > 1 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-brand-accent" />
                            <span className="text-sm font-semibold text-brand-dark">Your loved one:</span>
                        </div>
                        <div className="relative">
                            <select
                                value={selectedResident.id}
                                onChange={e => setSelectedResident(RESIDENTS.find(r => r.id === Number(e.target.value)))}
                                className="appearance-none bg-brand-light border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
                            >
                                {RESIDENTS.map(r => (
                                    <option key={r.id} value={r.id}>{r.name} (Room {r.room})</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-brand-muted">
                            <span>Age: <strong className="text-brand-dark">{selectedResident.age}</strong></span>
                            <span>Week: <strong className="text-brand-dark">{selectedResident.week}/16</strong></span>
                            <span>Team: <strong className="text-brand-dark">{selectedResident.careTeam}</strong></span>
                        </div>
                        <div className="ml-auto">
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${avgWellbeing >= 75 ? 'bg-emerald-50 border-emerald-200' : avgWellbeing >= 60 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                                <Heart className={`w-3.5 h-3.5 ${avgWellbeing >= 75 ? 'text-emerald-600' : avgWellbeing >= 60 ? 'text-amber-600' : 'text-red-600'}`} />
                                <span className={`text-[10px] font-bold uppercase ${avgWellbeing >= 75 ? 'text-emerald-700' : avgWellbeing >= 60 ? 'text-amber-700' : 'text-red-700'}`}>{avgWellbeing}% Wellbeing</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ======== SECTION: WELLBEING OVERVIEW ======== */}
            {activeSection === 'overview' && (
                <div className="space-y-6">
                    {/* Welcome Card */}
                    <div className="bg-gradient-to-br from-brand-dark to-brand-dark-deeper rounded-2xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 rounded-full blur-[80px]" />
                        <div className="relative z-10">
                            <p className="text-brand-accent-light text-sm font-medium mb-1">Week {selectedResident.week} of 16</p>
                            <h2 className="text-2xl font-bold mb-2">{selectedResident.name} -- Week {selectedResident.week} Update</h2>
                            <p className="text-white/60 text-sm max-w-lg leading-relaxed">{data.welcomeMessage}</p>
                        </div>
                    </div>

                    {/* Radar + Daily Snapshot */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SectionCard title="Wellbeing Radar" icon={Heart} subtitle="Five dimensions of care">
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={data.wellbeingRadar}>
                                        <PolarGrid stroke="#e5e7eb" />
                                        <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: '#6b7280' }} />
                                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9 }} />
                                        <Radar name="This Week" dataKey="score" stroke="#4C4673" fill="#4C4673" fillOpacity={0.25} strokeWidth={2} />
                                        <Radar name="Last Week" dataKey="prev" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.1} strokeWidth={1} strokeDasharray="4 4" />
                                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                        <Legend wrapperStyle={{ fontSize: 11 }} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </SectionCard>

                        <div className="space-y-6">
                            <SectionCard title="Today's Snapshot" icon={Sun} subtitle={new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {Object.entries(data.dailySnapshot).map(([key, val]) => {
                                        const icons = { sleep: Moon, meals: Utensils, mood: Smile, activity: Activity, vitals: Heart, medication: ClipboardList }
                                        const Ic = icons[key] || Info
                                        return (
                                            <div key={key} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                                <Ic className="w-4 h-4 text-brand-accent flex-shrink-0" />
                                                <div className="min-w-0">
                                                    <p className="text-[10px] text-brand-muted uppercase tracking-wider capitalize">{key}</p>
                                                    <p className="text-xs font-medium text-brand-dark truncate">{val}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </SectionCard>

                            <SectionCard title="Care Team Status" icon={Stethoscope} subtitle="Specialist schedule">
                                <div className="space-y-1.5">
                                    {data.careTeamStatus.map((ct, i) => (
                                        <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Stethoscope className="w-3.5 h-3.5 text-brand-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-brand-dark">{ct.name}</p>
                                                <p className="text-[10px] text-brand-muted">{ct.role}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-[10px] text-brand-muted">Next: {ct.nextVisit}</p>
                                                <p className="text-[10px] text-brand-accent font-medium">{ct.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        </div>
                    </div>

                    {/* 5 Wellbeing Dimension Cards */}
                    <SectionCard title="Wellbeing Dimensions" icon={Sparkles} subtitle="Click any dimension for details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                            {data.wellbeingDimensions.map((dim, i) => {
                                const DimIcon = ICON_MAP[dim.icon] || Heart
                                const st = STATUS_LABELS[dim.status]
                                return (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedDimension(dim)}
                                        className={`rounded-2xl border p-4 cursor-pointer hover:shadow-md transition-all ${dim.border} ${dim.bg}`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white">
                                                <DimIcon className={`w-4 h-4 ${dim.color}`} />
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${st.bg}`}>{st.label}</span>
                                        </div>
                                        <h4 className="text-xs font-semibold text-brand-dark mb-1">{dim.name}</h4>
                                        <p className="text-[11px] text-brand-muted leading-relaxed line-clamp-3">{dim.desc}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-lg font-bold text-brand-dark">{dim.score}%</span>
                                            <ChevronRight className="w-4 h-4 text-gray-300" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>

                    {/* 16-Week Journey Progress */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-5 h-5 text-brand-accent" />
                            <h3 className="text-sm font-semibold text-brand-dark">16-Week Journey Progress</h3>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-brand-primary to-brand-accent h-3 rounded-full transition-all"
                                    style={{ width: ((selectedResident.week / 16) * 100) + '%' }}
                                />
                            </div>
                            <span className="text-sm font-bold text-brand-primary">Week {selectedResident.week}/16</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { label: 'Next specialist visit', value: 'Apr 8 -- Psychologist' },
                                { label: 'Next evaluation', value: 'Apr 15 -- Week 14 check' },
                                { label: 'Next report', value: 'Apr 22 -- Monthly report' },
                                { label: 'Cycle completion', value: 'May 6 -- Week 16' },
                            ].map((m, i) => (
                                <div key={i} className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                    <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-0.5">{m.label}</p>
                                    <p className="text-xs font-medium text-brand-dark">{m.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ======== SECTION: WEEKLY HIGHLIGHTS ======== */}
            {activeSection === 'highlights' && (
                <div className="space-y-6">
                    <SectionCard title="This Week's Highlights" icon={Star} subtitle={selectedResident.name + ' -- Week ' + selectedResident.week}>
                        <div className="space-y-3">
                            {data.weeklyHighlights.map((h, i) => {
                                const HIcon = ICON_MAP[h.icon] || Star
                                return (
                                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-100 hover:shadow-sm transition-all">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                            <HIcon className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold uppercase text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">{h.category}</span>
                                                <span className="text-[10px] text-brand-muted">{h.date}</span>
                                            </div>
                                            <p className="text-sm text-brand-dark leading-relaxed">{h.text}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>

                    <SectionCard title="Joy Moments" icon={Sparkles} subtitle="Small moments of happiness this week">
                        <div className="space-y-2">
                            {data.joyMoments.map((j, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-purple-50/50 border border-purple-100">
                                    <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm text-brand-dark leading-relaxed">{j.text}</p>
                                        <p className="text-[10px] text-brand-muted mt-1">{j.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard title="Compared to Last Week" icon={Activity} subtitle="Change in wellbeing dimensions">
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {Object.entries(data.comparisonToLastWeek).map(([key, val]) => {
                                const labels = { physical: 'Physical', emotional: 'Emotional', nutrition: 'Nutrition', engagement: 'Engagement', safety: 'Safety' }
                                return (
                                    <div key={key} className="p-3 rounded-xl border border-gray-100 bg-gray-50 text-center">
                                        <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">{labels[key]}</p>
                                        <div className="flex items-center justify-center gap-1">
                                            {val > 0 ? <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : val < 0 ? <ArrowDownRight className="w-4 h-4 text-amber-500" /> : <Minus className="w-4 h-4 text-gray-400" />}
                                            <span className={`text-lg font-bold ${val > 0 ? 'text-emerald-600' : val < 0 ? 'text-amber-600' : 'text-gray-500'}`}>
                                                {val > 0 ? '+' : ''}{val}%
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>

                    <SectionCard title="Weekly Activity Schedule" icon={CalendarDays} subtitle={selectedResident.name + ' regular schedule'}>
                        <div className="grid grid-cols-7 gap-2">
                            {data.activityCalendar.map((day, i) => (
                                <div key={i} className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 text-center">
                                    <p className="text-xs font-bold text-brand-dark mb-2">{day.day}</p>
                                    <div className="space-y-1">
                                        {day.activities.map((act, j) => (
                                            <p key={j} className="text-[10px] text-brand-muted bg-white rounded px-1.5 py-1 border border-gray-100">{act}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ======== SECTION: MONTHLY REPORT ======== */}
            {activeSection === 'report' && (
                <div className="space-y-6">
                    <SectionCard title="Monthly Narrative Report" icon={BookOpen} subtitle={'Prepared ' + data.monthlyReport.date}>
                        <div className="p-5 rounded-xl bg-purple-50/50 border border-purple-100 mb-4">
                            <p className="text-sm text-brand-dark leading-relaxed italic">
                                "{data.monthlyReport.narrative}"
                            </p>
                            <p className="text-xs text-brand-muted mt-4">-- {data.monthlyReport.author}</p>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-brand-primary border border-brand-primary/20 rounded-xl hover:bg-brand-primary/5 transition-colors">
                            <Download className="w-4 h-4" /> Download Full Report (PDF)
                        </button>
                    </SectionCard>

                    <SectionCard title="Key Metrics This Month" icon={Activity} subtitle="Simplified view of progress">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {data.monthlyReport.keyMetrics.map((m, i) => (
                                <div key={i} className="p-4 rounded-xl border border-gray-100 bg-gray-50 text-center">
                                    <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">{m.label}</p>
                                    <p className="text-xl font-bold text-brand-dark">{m.value}</p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        {m.trend === 'up' ? <ArrowUpRight className="w-3 h-3 text-emerald-500" /> : m.trend === 'down' ? <ArrowDownRight className="w-3 h-3 text-amber-500" /> : <Minus className="w-3 h-3 text-gray-400" />}
                                        <span className={`text-[11px] font-medium ${m.trend === 'up' ? 'text-emerald-600' : m.trend === 'down' ? 'text-amber-600' : 'text-gray-500'}`}>{m.change}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard title="Wellbeing Trend" icon={Heart} subtitle="Progress across months">
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.wellbeingTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" domain={[0, 100]} />
                                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                                    <Legend wrapperStyle={{ fontSize: 11 }} />
                                    <Line type="monotone" dataKey="physical" stroke="#059669" strokeWidth={2} name="Physical" dot={{ r: 3 }} />
                                    <Line type="monotone" dataKey="emotional" stroke="#7c3aed" strokeWidth={2} name="Emotional" dot={{ r: 3 }} />
                                    <Line type="monotone" dataKey="nutrition" stroke="#d97706" strokeWidth={2} name="Nutrition" dot={{ r: 3 }} />
                                    <Line type="monotone" dataKey="engagement" stroke="#2563eb" strokeWidth={2} name="Engagement" dot={{ r: 3 }} />
                                    <Line type="monotone" dataKey="safety" stroke="#e11d48" strokeWidth={2} name="Safety" dot={{ r: 3 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </SectionCard>

                    <SectionCard title="Care Team Recommendations" icon={Stethoscope} subtitle="Suggestions for the coming weeks">
                        <div className="space-y-2">
                            {data.monthlyReport.recommendations.map((rec, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-blue-600">{i + 1}</span>
                                    </div>
                                    <p className="text-sm text-brand-dark leading-relaxed">{rec}</p>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ======== SECTION: MOMENTS GALLERY ======== */}
            {activeSection === 'gallery' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-4">
                        <div className="flex items-center gap-3 flex-wrap">
                            <Filter className="w-4 h-4 text-brand-accent" />
                            <span className="text-xs font-semibold text-brand-dark">Filter by:</span>
                            {galleryCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setGalleryFilter(cat)}
                                    className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-colors ${galleryFilter === cat ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-brand-muted border-gray-200 hover:border-brand-accent'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <SectionCard title="Moments Gallery" icon={Camera} subtitle={selectedResident.name + ' activities and experiences'}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredGallery.map(act => {
                                const fav = isFavorited(act.id)
                                const catStyle = CATEGORY_COLORS[act.category] || 'bg-gray-50 text-gray-700 border-gray-200'
                                return (
                                    <div
                                        key={act.id}
                                        className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all cursor-pointer group"
                                        onClick={() => setSelectedActivity(act)}
                                    >
                                        <div className="h-32 bg-gradient-to-br from-brand-light to-brand-accent/10 flex items-center justify-center relative">
                                            <Camera className="w-10 h-10 text-brand-muted/20" />
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleToggleFavorite(act.id) }}
                                                className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${fav ? 'bg-red-100 text-red-500' : 'bg-white/80 text-gray-400 hover:text-red-400'}`}
                                            >
                                                <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
                                            </button>
                                        </div>
                                        <div className="p-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-sm font-semibold text-brand-dark">{act.title}</p>
                                                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${catStyle}`}>{act.category}</span>
                                            </div>
                                            <p className="text-[10px] text-brand-muted mb-1">{act.date}</p>
                                            <p className="text-[11px] text-brand-muted line-clamp-2">{act.desc}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {filteredGallery.length === 0 && (
                            <div className="text-center py-8">
                                <Camera className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                <p className="text-sm text-brand-muted">No activities found in this category.</p>
                            </div>
                        )}
                    </SectionCard>

                    <SectionCard title="Weekly Activity Schedule" icon={CalendarDays} subtitle="Regular activities for the week">
                        <div className="grid grid-cols-7 gap-2">
                            {data.activityCalendar.map((day, i) => (
                                <div key={i} className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 text-center">
                                    <p className="text-xs font-bold text-brand-dark mb-2">{day.day}</p>
                                    <div className="space-y-1">
                                        {day.activities.map((act, j) => (
                                            <p key={j} className="text-[10px] text-brand-muted bg-white rounded px-1.5 py-1 border border-gray-100">{act}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ======== SECTION: VISIT SCHEDULER ======== */}
            {activeSection === 'visits' && (
                <div className="space-y-6">
                    <SectionCard title="Book a Visit" icon={Calendar} subtitle="Select an available time slot to request a visit">
                        <div className="space-y-2">
                            {data.visitSlots.map(slot => {
                                const booked = isBooked(slot.id)
                                return (
                                    <div
                                        key={slot.id}
                                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${booked ? 'border-emerald-200 bg-emerald-50' : slot.available ? 'border-gray-200 bg-white hover:border-brand-accent hover:shadow-sm cursor-pointer' : 'border-gray-100 bg-gray-50 opacity-50'}`}
                                    >
                                        <Calendar className={`w-5 h-5 flex-shrink-0 ${booked ? 'text-emerald-600' : slot.available ? 'text-brand-accent' : 'text-gray-400'}`} />
                                        <div className="flex-1">
                                            <span className="text-sm font-medium text-brand-dark">{slot.date}</span>
                                            <span className="text-xs text-brand-muted ml-2">{slot.time}</span>
                                        </div>
                                        {booked ? (
                                            <div className="flex items-center gap-1.5 text-emerald-700">
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span className="text-[11px] font-semibold">Requested</span>
                                            </div>
                                        ) : slot.available ? (
                                            <button
                                                onClick={() => handleBookSlot(slot.id)}
                                                className="text-[11px] font-semibold text-brand-primary bg-brand-primary/10 px-3 py-1.5 rounded-lg hover:bg-brand-primary/20 transition-colors"
                                            >
                                                Request Visit
                                            </button>
                                        ) : (
                                            <span className="text-[10px] text-brand-muted">Unavailable</span>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SectionCard title="Visit History" icon={Clock} subtitle="Previous visits">
                            <div className="space-y-2">
                                {data.visitHistory.map((visit, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedVisitDetail(visit)}
                                        className="p-3 rounded-xl border border-gray-100 bg-gray-50 hover:shadow-sm cursor-pointer transition-all"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-semibold text-brand-dark">{visit.date}</span>
                                            <span className="text-[10px] text-brand-muted">{visit.time}</span>
                                        </div>
                                        <p className="text-xs text-brand-muted">{visit.visitors}</p>
                                        <p className="text-[11px] text-brand-dark mt-1 line-clamp-2">{visit.notes}</p>
                                    </div>
                                ))}
                            </div>
                        </SectionCard>

                        <SectionCard title="Visit Guidelines" icon={Info} subtitle="Important information for visitors">
                            <div className="space-y-2">
                                {data.visitGuidelines.map((g, i) => (
                                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-[10px] font-bold text-blue-600">{i + 1}</span>
                                        </div>
                                        <p className="text-sm text-brand-dark leading-relaxed">{g}</p>
                                    </div>
                                ))}
                            </div>
                        </SectionCard>
                    </div>
                </div>
            )}

            {/* ======== SECTION: MESSAGE TEAM ======== */}
            {activeSection === 'message' && (
                <div className="space-y-6">
                    <SectionCard title="Conversation History" icon={MessageCircle} subtitle="Your messages with the care team">
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {data.conversationHistory.map((msg, i) => (
                                <div
                                    key={msg.id || i}
                                    className={`flex gap-3 ${msg.from === 'family' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.from === 'family' ? 'bg-brand-primary/10' : 'bg-emerald-50'}`}>
                                        {msg.from === 'family' ? <User className="w-4 h-4 text-brand-primary" /> : <Stethoscope className="w-4 h-4 text-emerald-600" />}
                                    </div>
                                    <div className={`max-w-[75%] p-3 rounded-xl ${msg.from === 'family' ? 'bg-brand-primary/5 border border-brand-primary/10' : 'bg-gray-50 border border-gray-100'}`}>
                                        {msg.category && (
                                            <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mb-1 inline-block ${msg.category === 'Concern' ? 'bg-amber-100 text-amber-700' : msg.category === 'Gratitude' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {msg.category}
                                            </span>
                                        )}
                                        <p className="text-sm text-brand-dark leading-relaxed">{msg.text}</p>
                                        <div className="flex items-center justify-between mt-1.5">
                                            <p className="text-[10px] text-brand-muted">{msg.date}</p>
                                            {msg.respondedBy && (
                                                <p className="text-[10px] text-emerald-600 font-medium">{msg.respondedBy}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {sentMessages.map((msg, i) => (
                                <div
                                    key={'sent-' + i}
                                    className="flex gap-3 flex-row-reverse"
                                >
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-brand-primary/10">
                                        <User className="w-4 h-4 text-brand-primary" />
                                    </div>
                                    <div className="max-w-[75%] p-3 rounded-xl bg-brand-primary/5 border border-brand-primary/10">
                                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mb-1 inline-block bg-blue-100 text-blue-700">
                                            {msg.category}
                                        </span>
                                        <p className="text-sm text-brand-dark leading-relaxed">{msg.text}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <p className="text-[10px] text-brand-muted">{msg.date}</p>
                                            <span className="text-[10px] text-amber-600 font-medium">Awaiting response</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SectionCard title="Send a Message" icon={Send} subtitle="Response within 48 hours">
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">Category</label>
                                    <div className="relative">
                                        <select
                                            value={messageCategory}
                                            onChange={e => setMessageCategory(e.target.value)}
                                            className="w-full appearance-none px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/30 text-brand-dark pr-8"
                                        >
                                            <option>Question</option>
                                            <option>Concern</option>
                                            <option>Gratitude</option>
                                            <option>Request</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">Your Message</label>
                                    <textarea
                                        rows={4}
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/30 resize-none text-brand-dark placeholder-brand-muted/50"
                                        placeholder="Write your message here..."
                                    />
                                </div>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                    className={`flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-xl transition-colors ${message.trim() ? 'bg-brand-primary text-white hover:bg-brand-primary-dark' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                >
                                    <Send className="w-4 h-4" /> Send Message
                                </button>
                            </div>
                        </SectionCard>

                        <SectionCard title="Quick Messages" icon={Sparkles} subtitle="Pre-written message templates">
                            <div className="space-y-2">
                                {data.quickActions.map((qa, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setMessage(qa.template); setMessageCategory('Question') }}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:border-brand-accent hover:shadow-sm transition-all text-left"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Send className="w-3.5 h-3.5 text-brand-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-brand-dark">{qa.label}</p>
                                            <p className="text-[10px] text-brand-muted line-clamp-1">{qa.template}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                    </button>
                                ))}
                            </div>
                        </SectionCard>
                    </div>
                </div>
            )}

            {/* ======== MODALS ======== */}
            {selectedDimension && (
                <Modal onClose={() => setSelectedDimension(null)}>
                    <DimensionDetailModal dimension={selectedDimension} resident={selectedResident.name} onClose={() => setSelectedDimension(null)} />
                </Modal>
            )}

            {selectedActivity && (
                <Modal onClose={() => setSelectedActivity(null)}>
                    <ActivityDetailModal
                        activity={selectedActivity}
                        resident={selectedResident.name}
                        isFavorited={isFavorited(selectedActivity.id)}
                        onToggleFavorite={() => handleToggleFavorite(selectedActivity.id)}
                        onClose={() => setSelectedActivity(null)}
                    />
                </Modal>
            )}

            {selectedVisitDetail && (
                <Modal onClose={() => setSelectedVisitDetail(null)}>
                    <VisitDetailModal visit={selectedVisitDetail} resident={selectedResident.name} onClose={() => setSelectedVisitDetail(null)} />
                </Modal>
            )}

            {/* SECTION: My Profile */}
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
                                        {profile.relationship && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20">{profile.relationship}</span>}
                                        {profile.emergencyContact && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-red-50 text-red-600 border border-red-200">Emergency Contact</span>}
                                        <span className="text-[10px] text-brand-muted flex items-center gap-1"><Users className="w-3 h-3" /> {profile.residentsManaged} loved one{profile.residentsManaged > 1 ? 's' : ''}</span>
                                    </div>
                                </div>
                                <button onClick={() => setEditingProfile(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 text-brand-dark hover:border-brand-accent hover:shadow-sm transition-all">
                                    <Pencil className="w-3.5 h-3.5 text-brand-accent" /> Edit Profile
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-brand-dark leading-relaxed mb-5">{profile.bio}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <ProfileField icon={Mail} label="Email" value={profile.email} />
                                <ProfileField icon={Phone} label="Phone" value={profile.phone} />
                                <ProfileField icon={Heart} label="Relationship" value={profile.relationship || 'Not specified'} />
                                <ProfileField icon={Bell} label="Preferred Contact" value={profile.preferredContact || 'Not specified'} />
                                <ProfileField icon={Shield} label="Emergency Contact" value={profile.emergencyContact ? 'Yes' : 'No'} valueColor={profile.emergencyContact ? 'text-emerald-600' : 'text-brand-dark'} />
                                <ProfileField icon={Activity} label="Portal Status" value="Active" valueColor="text-emerald-600" />
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

/* ================================================================
   MODAL CONTENTS
   ================================================================ */

function DimensionDetailModal({ dimension, resident, onClose }) {
    const DimIcon = ICON_MAP[dimension.icon] || Heart
    const st = STATUS_LABELS[dimension.status]

    return (
        <div>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${dimension.bg} ${dimension.border}`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <DimIcon className={`w-5 h-5 ${dimension.color}`} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{dimension.name}</h3>
                        <p className="text-[11px] text-brand-muted">{resident} -- Wellbeing Dimension</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${st.bg}`}>{st.label}</span>
                    <span className="text-2xl font-bold text-brand-dark">{dimension.score}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className={`h-3 rounded-full transition-all ${dimension.score >= 80 ? 'bg-emerald-500' : dimension.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: dimension.score + '%' }}
                    />
                </div>

                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Summary</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{dimension.desc}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Detailed Notes</p>
                    <div className={`p-3 rounded-lg border ${dimension.bg} ${dimension.border}`}>
                        <p className="text-sm text-brand-dark leading-relaxed">{dimension.details}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ActivityDetailModal({ activity, resident, isFavorited: fav, onToggleFavorite, onClose }) {
    const catStyle = CATEGORY_COLORS[activity.category] || 'bg-gray-50 text-gray-700 border-gray-200'

    return (
        <div>
            <div className="px-6 py-4 border-b bg-gray-50 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5 text-brand-accent" />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{activity.title}</h3>
                        <p className="text-[11px] text-brand-muted">{resident} -- {activity.date}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="h-48 bg-gradient-to-br from-brand-light to-brand-accent/10 rounded-xl flex items-center justify-center">
                    <Camera className="w-12 h-12 text-brand-muted/20" />
                </div>

                <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded border ${catStyle}`}>{activity.category}</span>
                    <button
                        onClick={onToggleFavorite}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${fav ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:text-red-500'}`}
                    >
                        <Heart className={`w-3.5 h-3.5 ${fav ? 'fill-current' : ''}`} />
                        {fav ? 'Favorited' : 'Add to Favorites'}
                    </button>
                </div>

                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">About this moment</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{activity.desc}</p>
                    </div>
                </div>

                <div className="p-3 rounded-lg bg-purple-50/50 border border-purple-100 text-center">
                    <p className="text-xs text-purple-700">
                        Photos and videos from activities are available upon request.
                        Contact the activities team for more media from this event.
                    </p>
                </div>
            </div>
        </div>
    )
}

function VisitDetailModal({ visit, resident, onClose }) {
    return (
        <div>
            <div className="px-6 py-4 border-b bg-gray-50 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-brand-accent" />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">Visit -- {visit.date}</h3>
                        <p className="text-[11px] text-brand-muted">{resident} -- {visit.time}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <Calendar className="w-3.5 h-3.5 text-brand-muted flex-shrink-0" />
                        <div className="min-w-0">
                            <p className="text-[10px] text-brand-muted uppercase tracking-wider">Date</p>
                            <p className="text-xs font-medium text-brand-dark">{visit.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <Clock className="w-3.5 h-3.5 text-brand-muted flex-shrink-0" />
                        <div className="min-w-0">
                            <p className="text-[10px] text-brand-muted uppercase tracking-wider">Time</p>
                            <p className="text-xs font-medium text-brand-dark">{visit.time}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Visitors</p>
                    <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <p className="text-sm text-brand-dark">{visit.visitors}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Visit Notes</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{visit.notes}</p>
                    </div>
                </div>
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
        { key: 'name', label: 'Full Name', type: 'text' }, { key: 'relationship', label: 'Relationship', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' }, { key: 'phone', label: 'Phone', type: 'tel' },
        { key: 'preferredContact', label: 'Preferred Contact Method', type: 'text' },
    ]
    return (
        <div>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-brand-light">
                <div className="flex items-center gap-3">
                    <Pencil className="w-5 h-5 text-brand-accent" />
                    <div><h3 className="text-sm font-bold text-brand-dark">Edit Profile</h3><p className="text-[11px] text-brand-muted">Update your contact and personal information</p></div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fields.map(f => (
                        <div key={f.key}>
                            <label className="block text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">{f.label}</label>
                            <input type={f.type} value={form[f.key] || ''} onChange={e => update(f.key, e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent text-brand-dark" />
                        </div>
                    ))}
                </div>
                <div>
                    <label className="block text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">About</label>
                    <textarea rows={3} value={form.bio || ''} onChange={e => update('bio', e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent resize-none text-brand-dark" />
                </div>
                <div className="flex items-center gap-3">
                    <label className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider">Emergency Contact</label>
                    <button onClick={() => update('emergencyContact', !form.emergencyContact)} className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors ${form.emergencyContact ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                        {form.emergencyContact ? 'Yes' : 'No'}
                    </button>
                </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 text-brand-dark hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={() => onSave(form)} className="flex items-center gap-2 px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors"><Save className="w-4 h-4" /> Save Changes</button>
            </div>
        </div>
    )
}
