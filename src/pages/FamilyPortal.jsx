import DashboardShell from '../components/DashboardShell'
import {
    Heart, Smile, Apple, Compass, Shield,
    Camera, Calendar, MessageCircle, Star, Clock, Bell,
    ChevronRight, Send
} from 'lucide-react'
import { useState } from 'react'

// ── MOCK DATA ──────────────────────────────────────────────
const RESIDENT = { name: 'Eleanor', week: 12, photo: null }

const WELLBEING_DIMENSIONS = [
    { name: 'Physical Vitality', icon: Heart, status: 'thriving', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', desc: 'She has been walking more this week and her energy levels are wonderful.' },
    { name: 'Emotional Joy', icon: Smile, status: 'growing', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', desc: 'Eleanor has been in great spirits, especially enjoying the music sessions.' },
    { name: 'Nourishment & Taste', icon: Apple, status: 'thriving', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', desc: 'She loved the new fish recipe this week and has been eating well.' },
    { name: 'Engagement & Purpose', icon: Compass, status: 'growing', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', desc: 'She joined the garden club and helped plant new flowers yesterday.' },
    { name: 'Safety & Peace', icon: Shield, status: 'thriving', color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200', desc: 'Everything is stable and consistent. She is comfortable and well cared for.' },
]

const STATUS_LABELS = {
    thriving: { label: 'Thriving', bg: 'bg-emerald-100 text-emerald-700' },
    growing: { label: 'Growing', bg: 'bg-blue-100 text-blue-700' },
    'needs-support': { label: 'Needs Support', bg: 'bg-amber-100 text-amber-700' },
}

const WEEKLY_HIGHLIGHTS = [
    'Eleanor participated in the music therapy session on Tuesday and was singing along to her favorite songs.',
    'She tried the new Mediterranean lunch menu and asked for the recipe!',
    'During physiotherapy, she walked 20 meters more than last session -- a wonderful improvement.',
]

const ACTIVITY_GALLERY = [
    { title: 'Garden Club', date: 'Apr 4', desc: 'Planting new spring flowers with the activity group.' },
    { title: 'Music Therapy', date: 'Apr 2', desc: 'Singing familiar songs from her youth. Beautiful engagement.' },
    { title: 'Art Workshop', date: 'Mar 28', desc: 'Painting watercolors with fellow residents.' },
    { title: 'Birthday Celebration', date: 'Mar 25', desc: 'Fernando\'s birthday party. Eleanor baked cards for him.' },
]

const NOTIFICATIONS_LIST = [
    { type: 'milestone', message: 'Eleanor completed Week 12! Her progress report is available.', date: 'Apr 5', read: false },
    { type: 'positive', message: 'Your mother tried a new activity today and really enjoyed it.', date: 'Apr 4', read: true },
    { type: 'reminder', message: 'Your scheduled visit is tomorrow at 11:00 AM.', date: 'Apr 3', read: true },
    { type: 'update', message: 'We noticed a small change in appetite this week. Here is what we are monitoring and doing.', date: 'Apr 1', read: true },
]

const VISIT_SLOTS = [
    { date: 'Apr 8 (Tue)', time: '10:00 - 11:00', available: true },
    { date: 'Apr 8 (Tue)', time: '15:00 - 16:00', available: true },
    { date: 'Apr 9 (Wed)', time: '10:00 - 11:00', available: false },
    { date: 'Apr 10 (Thu)', time: '14:00 - 15:00', available: true },
    { date: 'Apr 11 (Fri)', time: '10:00 - 11:00', available: true },
]

const NOTIF_ICONS = {
    milestone: { color: 'text-emerald-600', bg: 'bg-emerald-50' },
    positive: { color: 'text-blue-600', bg: 'bg-blue-50' },
    reminder: { color: 'text-amber-600', bg: 'bg-amber-50' },
    update: { color: 'text-purple-600', bg: 'bg-purple-50' },
    important: { color: 'text-red-600', bg: 'bg-red-50' },
}

export default function FamilyPortal() {
    const [message, setMessage] = useState('')

    return (
        <DashboardShell
            roleId="family"
            roleTag="Family Member -- Monthly access + notifications"
            title="Your Loved One's Wellbeing Portal"
            tagline=""
            badges={['Mobile-first design', 'Tone: Empathic, Warm, Honest']}
        >
            {/* Welcome Card */}
            <div className="bg-gradient-to-br from-brand-dark to-brand-dark-deeper rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 rounded-full blur-[80px]" />
                <div className="relative z-10">
                    <p className="text-brand-accent-light text-sm font-medium mb-1">Week {RESIDENT.week} of 16</p>
                    <h2 className="text-2xl font-bold mb-2">{RESIDENT.name} is doing well this week.</h2>
                    <p className="text-white/60 text-sm max-w-lg">
                        She has been active, social, and enjoying her meals. The care team has noticed steady improvement in her energy and mood. Here is everything you need to know.
                    </p>
                </div>
            </div>

            {/* 5 Wellbeing Dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                {WELLBEING_DIMENSIONS.map((dim, i) => {
                    const Icon = dim.icon
                    const st = STATUS_LABELS[dim.status]
                    return (
                        <div key={i} className={`rounded-2xl border p-4 ${dim.border} ${dim.bg}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white`}>
                                    <Icon className={`w-4 h-4 ${dim.color}`} />
                                </div>
                                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${st.bg}`}>{st.label}</span>
                            </div>
                            <h4 className="text-xs font-semibold text-brand-dark mb-1">{dim.name}</h4>
                            <p className="text-[11px] text-brand-muted leading-relaxed">{dim.desc}</p>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Weekly Highlights */}
                <SectionCard title="This Week's Highlights" icon={Star}>
                    <div className="space-y-3">
                        {WEEKLY_HIGHLIGHTS.map((h, i) => (
                            <div key={i} className="flex gap-3 p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-bold text-amber-600">{i + 1}</span>
                                </div>
                                <p className="text-sm text-brand-dark leading-relaxed">{h}</p>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* Monthly Report */}
                <SectionCard title="Monthly Narrative Report" icon={Heart}>
                    <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 mb-4">
                        <p className="text-sm text-brand-dark leading-relaxed italic">
                            "This month has been a wonderful chapter for {RESIDENT.name}. Her physical vitality continues to improve --
                            she is walking further each week and has even started attending the garden club with genuine enthusiasm.
                            Emotionally, we see a woman who is rediscovering small joys: a song, a meal, a conversation with a new friend.
                            Her nutritional care has been smooth, and she is trying new dishes with curiosity. The team is proud of her
                            progress and looks forward to the coming weeks."
                        </p>
                        <p className="text-xs text-brand-muted mt-3">-- Care Team, Amatista Life</p>
                    </div>
                    <button className="w-full py-2.5 text-sm font-semibold text-brand-primary border border-brand-primary/20 rounded-xl hover:bg-brand-primary/5 transition-colors">
                        Download Full Report (PDF)
                    </button>
                </SectionCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Moments Gallery */}
                <SectionCard title="Moments Gallery" icon={Camera}>
                    <div className="grid grid-cols-2 gap-3">
                        {ACTIVITY_GALLERY.map((a, i) => (
                            <div key={i} className="rounded-xl overflow-hidden border border-gray-200">
                                <div className="h-24 bg-gradient-to-br from-brand-light to-brand-accent/10 flex items-center justify-center">
                                    <Camera className="w-8 h-8 text-brand-muted/30" />
                                </div>
                                <div className="p-2.5">
                                    <p className="text-xs font-semibold text-brand-dark">{a.title}</p>
                                    <p className="text-[10px] text-brand-muted">{a.date}</p>
                                    <p className="text-[11px] text-brand-muted mt-0.5 line-clamp-2">{a.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* Notifications */}
                <SectionCard title="Care Team Notifications" icon={Bell}>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {NOTIFICATIONS_LIST.map((n, i) => {
                            const cfg = NOTIF_ICONS[n.type]
                            return (
                                <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${n.read ? 'border-gray-100 bg-white' : 'border-brand-primary/20 bg-brand-primary/5'}`}>
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                                        <Bell className={`w-3.5 h-3.5 ${cfg.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs ${n.read ? 'text-brand-muted' : 'text-brand-dark font-medium'}`}>{n.message}</p>
                                        <p className="text-[10px] text-brand-muted mt-0.5">{n.date}</p>
                                    </div>
                                    {!n.read && <div className="w-2 h-2 rounded-full bg-brand-primary flex-shrink-0 mt-1" />}
                                </div>
                            )
                        })}
                    </div>
                </SectionCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Visit Scheduler */}
                <SectionCard title="Visit Scheduler" icon={Calendar}>
                    <p className="text-xs text-brand-muted mb-3">Select an available time slot to request a visit.</p>
                    <div className="space-y-1.5">
                        {VISIT_SLOTS.map((slot, i) => (
                            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg border ${slot.available ? 'border-gray-200 bg-white hover:border-brand-accent cursor-pointer' : 'border-gray-100 bg-gray-50 opacity-50'
                                } transition-colors`}>
                                <Calendar className={`w-4 h-4 flex-shrink-0 ${slot.available ? 'text-brand-accent' : 'text-gray-400'}`} />
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-brand-dark">{slot.date}</span>
                                    <span className="text-xs text-brand-muted ml-2">{slot.time}</span>
                                </div>
                                {slot.available ? (
                                    <button className="text-[10px] font-semibold text-brand-primary bg-brand-primary/10 px-2 py-1 rounded hover:bg-brand-primary/20 transition-colors">
                                        Request
                                    </button>
                                ) : (
                                    <span className="text-[10px] text-brand-muted">Unavailable</span>
                                )}
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* Message the Care Team */}
                <SectionCard title="Message the Care Team" icon={MessageCircle}>
                    <p className="text-xs text-brand-muted mb-3">Send a message to the gerontologist or nursing team. Response within 48 hours.</p>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">Category</label>
                            <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-brand-accent/30 text-brand-dark">
                                <option>Question</option>
                                <option>Concern</option>
                                <option>Gratitude</option>
                                <option>Request</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">Your Message</label>
                            <textarea
                                rows={4}
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-brand-accent/30 resize-none text-brand-dark placeholder-brand-muted/50"
                                placeholder="Write your message here..."
                            />
                        </div>
                        <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors">
                            <Send className="w-4 h-4" /> Send Message
                        </button>
                    </div>
                </SectionCard>
            </div>

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
                            style={{ width: `${(RESIDENT.week / 16) * 100}%` }}
                        />
                    </div>
                    <span className="text-sm font-bold text-brand-primary">Week {RESIDENT.week}/16</span>
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
        </DashboardShell>
    )
}

function SectionCard({ title, icon: Icon, children }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                <Icon className="w-5 h-5 text-brand-accent" />
                <h3 className="text-sm font-semibold text-brand-dark">{title}</h3>
            </div>
            <div className="p-5">{children}</div>
        </div>
    )
}
