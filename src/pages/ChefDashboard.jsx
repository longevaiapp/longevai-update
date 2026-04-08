import { useState, useEffect } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, Legend, LineChart, Line, ReferenceLine
} from 'recharts'
import {
    UtensilsCrossed, Package, AlertTriangle, Star, Receipt,
    Circle, CheckCircle2, Clock, X, ChevronRight, ChevronDown,
    FileText, Send, Plus, ShieldCheck, Flame, Thermometer,
    TrendingUp, TrendingDown, DollarSign, Truck, Scale,
    Timer, ArrowRight, Eye, Clipboard, ShoppingCart, Trash2,
    ThumbsUp, ThumbsDown, Minus as MinusIcon, Info,
    ClipboardList, BarChart3,
    Milk, Fish, Nut, Egg, Leaf, Heart, Users,
    Layers, Percent
} from 'lucide-react'

/* ================================================================
   SERVICE COUNTDOWN TIMER HOOK
   ================================================================ */
function useCountdown(targetHour, targetMin) {
    const [timeLeft, setTimeLeft] = useState('')
    const [urgency, setUrgency] = useState('normal')
    useEffect(() => {
        const calc = () => {
            const now = new Date()
            const target = new Date()
            target.setHours(targetHour, targetMin, 0, 0)
            const diff = target - now
            if (diff <= 0) {
                setTimeLeft('SERVICE NOW')
                setUrgency('past')
                return
            }
            const h = Math.floor(diff / 3600000)
            const m = Math.floor((diff % 3600000) / 60000)
            const s = Math.floor((diff % 60000) / 1000)
            setTimeLeft(h + 'h ' + String(m).padStart(2, '0') + 'm ' + String(s).padStart(2, '0') + 's')
            if (diff < 1800000) setUrgency('critical')
            else if (diff < 3600000) setUrgency('warning')
            else setUrgency('normal')
        }
        calc()
        const id = setInterval(calc, 1000)
        return () => clearInterval(id)
    }, [targetHour, targetMin])
    return { timeLeft, urgency }
}

/* ================================================================
   ALLERGEN ICON MAP
   ================================================================ */
const ALLERGEN_ICONS = {
    Dairy: Milk,
    Nuts: Nut,
    'Tree nuts': Nut,
    Shellfish: Fish,
    Gluten: Leaf,
    Eggs: Egg,
    Soy: Leaf,
}

/* ================================================================
   MEAL SERVICE DATA (Kanban-style)
   ================================================================ */
const MEAL_SERVICES = [
    { id: 'breakfast', label: 'Breakfast', time: '08:00', targetHour: 8, targetMin: 0 },
    { id: 'lunch', label: 'Lunch', time: '12:30', targetHour: 12, targetMin: 30 },
    { id: 'snack', label: 'Afternoon Snack', time: '16:00', targetHour: 16, targetMin: 0 },
    { id: 'dinner', label: 'Dinner', time: '19:00', targetHour: 19, targetMin: 0 },
]

/* ================================================================
   PER-RESIDENT SERVICE DATA
   ================================================================ */
const RESIDENTS = [
    { id: 1, name: 'Elena Rodriguez', room: '101', age: 78, conditions: ['Hypertension', 'Diabetes T2'], allergens: [], dietType: 'Diabetic-Friendly', texture: 'Normal', portionSize: 'Standard' },
    { id: 2, name: 'Carlos Mendez', room: '102', age: 82, conditions: ['Osteoarthritis'], allergens: ['Dairy'], dietType: 'Anti-Inflammatory', texture: 'Normal', portionSize: 'Standard' },
    { id: 3, name: 'Maria Silva', room: '103', age: 85, conditions: ['Depression', 'Chronic pain'], allergens: [], dietType: 'High-Calorie Enriched', texture: 'Soft', portionSize: 'Small' },
    { id: 4, name: 'Roberto Diaz', room: '106', age: 77, conditions: ['Hypertension', 'Obesity'], allergens: ['Shellfish'], dietType: 'Calorie-Controlled', texture: 'Normal', portionSize: 'Standard' },
    { id: 5, name: 'Jorge Navarro', room: '104', age: 80, conditions: ['Heart failure'], allergens: [], dietType: 'Low-Sodium', texture: 'Normal', portionSize: 'Large' },
    { id: 6, name: 'Ana Torres', room: '105', age: 74, conditions: ['Celiac disease'], allergens: ['Gluten', 'Nuts'], dietType: 'Gluten-Free', texture: 'Normal', portionSize: 'Standard' },
    { id: 7, name: 'Isabel Moreno', room: '107', age: 88, conditions: ['Dysphagia'], allergens: [], dietType: 'Pureed-Fortified', texture: 'Pureed', portionSize: 'Standard' },
    { id: 8, name: 'Fernando Lopez', room: '108', age: 76, conditions: ['Diabetes T2'], allergens: ['Eggs'], dietType: 'Diabetic-Friendly', texture: 'Normal', portionSize: 'Standard' },
]

/* ================================================================
   TODAY'S MEAL PLANS (Kanban Cards)
   ================================================================ */
const TODAYS_MEALS = {
    breakfast: [
        { residentId: 1, dish: 'Oatmeal with cinnamon & walnuts', calories: 320, protein: 12, notes: 'No added sugar. Sweetened with stevia.', status: 'served' },
        { residentId: 2, dish: 'Avocado toast (dairy-free bread)', calories: 350, protein: 10, notes: 'Dairy-free margarine. Extra avocado.', status: 'served' },
        { residentId: 3, dish: 'Fortified smoothie bowl', calories: 420, protein: 18, notes: 'Add protein powder. Soft fruits only.', status: 'served' },
        { residentId: 4, dish: 'Egg white omelette with vegetables', calories: 280, protein: 22, notes: 'No oil. Steam-cooked vegetables.', status: 'served' },
        { residentId: 5, dish: 'Low-sodium granola with fruit', calories: 310, protein: 8, notes: 'No added salt. Fresh berries.', status: 'served' },
        { residentId: 6, dish: 'Gluten-free pancakes with berries', calories: 340, protein: 9, notes: 'Rice flour base. No nut toppings.', status: 'served' },
        { residentId: 7, dish: 'Pureed fruit compote with yogurt', calories: 290, protein: 14, notes: 'Smooth consistency. Thickened.', status: 'served' },
        { residentId: 8, dish: 'Whole grain toast with turkey', calories: 300, protein: 16, notes: 'Egg-free bread. Turkey slices.', status: 'served' },
    ],
    lunch: [
        { residentId: 1, dish: 'Grilled chicken with quinoa & steamed broccoli', calories: 480, protein: 38, notes: 'Low glycemic. No starchy sides.', status: 'plating' },
        { residentId: 2, dish: 'Pasta primavera (dairy-free sauce)', calories: 420, protein: 14, notes: 'Olive oil base. No parmesan.', status: 'cooking' },
        { residentId: 3, dish: 'Baked salmon with mashed sweet potato', calories: 520, protein: 32, notes: 'Soft-cooked salmon. Extra butter in mash.', status: 'cooking' },
        { residentId: 4, dish: 'Vegetable risotto (no shellfish)', calories: 380, protein: 12, notes: 'Portion controlled. Extra vegetables.', status: 'prep' },
        { residentId: 5, dish: 'Herb-crusted chicken with roasted vegetables', calories: 450, protein: 35, notes: 'No salt in seasoning. Herbs only.', status: 'prep' },
        { residentId: 6, dish: 'Gluten-free turkey wrap with salad', calories: 390, protein: 28, notes: 'Corn tortilla. No croutons.', status: 'prep' },
        { residentId: 7, dish: 'Pureed chicken & vegetable stew', calories: 400, protein: 30, notes: 'Blended smooth. Fortified with cream.', status: 'cooking' },
        { residentId: 8, dish: 'Lentil stew with brown rice', calories: 440, protein: 20, notes: 'Egg-free. No egg noodles.', status: 'prep' },
    ],
    snack: [
        { residentId: 1, dish: 'Sugar-free fruit gelatin', calories: 80, protein: 2, notes: 'Stevia-sweetened.', status: 'queued' },
        { residentId: 2, dish: 'Rice crackers with hummus', calories: 150, protein: 5, notes: 'Dairy-free.', status: 'queued' },
        { residentId: 3, dish: 'Fortified milkshake', calories: 280, protein: 15, notes: 'High-calorie supplement.', status: 'queued' },
        { residentId: 4, dish: 'Celery sticks with almond butter', calories: 120, protein: 4, notes: 'Controlled portion.', status: 'queued' },
        { residentId: 5, dish: 'Fresh fruit plate', calories: 100, protein: 1, notes: 'No canned fruits.', status: 'queued' },
        { residentId: 6, dish: 'Gluten-free oat cookies', calories: 160, protein: 3, notes: 'Certified GF oats. Nut-free.', status: 'queued' },
        { residentId: 7, dish: 'Pureed fruit mousse', calories: 180, protein: 6, notes: 'Smooth texture.', status: 'queued' },
        { residentId: 8, dish: 'Yogurt with granola', calories: 200, protein: 8, notes: 'Egg-free granola.', status: 'queued' },
    ],
    dinner: [
        { residentId: 1, dish: 'Baked cod with steamed vegetables', calories: 380, protein: 32, notes: 'Light preparation. Low carb.', status: 'queued' },
        { residentId: 2, dish: 'Chicken stir-fry (soy sauce, no dairy)', calories: 400, protein: 30, notes: 'Coconut aminos option.', status: 'queued' },
        { residentId: 3, dish: 'Cream of mushroom soup with bread', calories: 450, protein: 12, notes: 'Soft bread. Enriched soup.', status: 'queued' },
        { residentId: 4, dish: 'Turkey meatballs with zucchini noodles', calories: 360, protein: 28, notes: 'No shellfish broth.', status: 'queued' },
        { residentId: 5, dish: 'Grilled fish with herb salad', calories: 350, protein: 30, notes: 'Lemon dressing, no salt.', status: 'queued' },
        { residentId: 6, dish: 'GF pasta with tomato basil sauce', calories: 380, protein: 14, notes: 'Rice pasta. No nuts.', status: 'queued' },
        { residentId: 7, dish: 'Pureed beef with root vegetables', calories: 420, protein: 28, notes: 'Blended smooth. Gravy added.', status: 'queued' },
        { residentId: 8, dish: 'Grilled chicken breast with salad', calories: 370, protein: 34, notes: 'Simple preparation. No eggs.', status: 'queued' },
    ],
}

/* ================================================================
   ALLERGEN CONFIRMATIONS
   ================================================================ */
const ALLERGEN_CHECKS = [
    { id: 1, residentId: 2, resident: 'Carlos Mendez', room: '102', allergen: 'Dairy', meal: 'lunch', dish: 'Pasta primavera (dairy-free sauce)', verification: 'Olive oil base used. No parmesan, no butter, no cream. Dairy-free margarine available.', crossContamRisk: 'Medium -- same prep area as cheese dishes', mitigation: 'Separate cutting board designated. Utensils washed between prep.' },
    { id: 2, residentId: 6, resident: 'Ana Torres', room: '105', allergen: 'Gluten', meal: 'lunch', dish: 'Gluten-free turkey wrap', verification: 'Corn tortilla verified GF. No flour contact. Salad dressing checked.', crossContamRisk: 'High -- bread prep station nearby', mitigation: 'Dedicated GF prep zone. Separate toaster. Staff glove change protocol.' },
    { id: 3, residentId: 6, resident: 'Ana Torres', room: '105', allergen: 'Nuts', meal: 'lunch', dish: 'Gluten-free turkey wrap', verification: 'No nut ingredients. Dressing is seed-based.', crossContamRisk: 'Low', mitigation: 'Nut-free zone confirmed.' },
    { id: 4, residentId: 4, resident: 'Roberto Diaz', room: '106', allergen: 'Shellfish', meal: 'lunch', dish: 'Vegetable risotto (no shellfish)', verification: 'Vegetable broth used. No fish sauce. No oyster sauce.', crossContamRisk: 'Low', mitigation: 'Separate stockpot. No shared ladles with seafood dishes.' },
    { id: 5, residentId: 8, resident: 'Fernando Lopez', room: '108', allergen: 'Eggs', meal: 'lunch', dish: 'Lentil stew with brown rice', verification: 'No egg in recipe. Egg-free bread confirmed.', crossContamRisk: 'Low', mitigation: 'Standard protocol.' },
]

/* ================================================================
   INVENTORY DATA
   ================================================================ */
const INVENTORY_ITEMS = [
    { id: 1, item: 'Chicken breast', stock: 8, unit: 'kg', threshold: 5, maxCapacity: 15, status: 'adequate', category: 'Protein', supplier: 'Valley Farms', lastDelivery: 'Apr 6', nextDelivery: 'Apr 9', costPerUnit: 8.50 },
    { id: 2, item: 'Salmon fillet', stock: 3, unit: 'kg', threshold: 4, maxCapacity: 10, status: 'low', category: 'Protein', supplier: 'Pacific Seafood', lastDelivery: 'Apr 5', nextDelivery: 'Apr 8', costPerUnit: 14.00 },
    { id: 3, item: 'Brown rice', stock: 12, unit: 'kg', threshold: 5, maxCapacity: 20, status: 'adequate', category: 'Grains', supplier: 'Grain Mills Co.', lastDelivery: 'Apr 3', nextDelivery: 'Apr 10', costPerUnit: 2.80 },
    { id: 4, item: 'Fresh vegetables (mixed)', stock: 6, unit: 'kg', threshold: 10, maxCapacity: 25, status: 'low', category: 'Produce', supplier: 'Fresh Farms Co.', lastDelivery: 'Apr 6', nextDelivery: 'Apr 8', costPerUnit: 4.20 },
    { id: 5, item: 'Olive oil', stock: 4, unit: 'L', threshold: 2, maxCapacity: 8, status: 'adequate', category: 'Oils', supplier: 'Mediterranean Imports', lastDelivery: 'Apr 1', nextDelivery: 'Apr 15', costPerUnit: 12.00 },
    { id: 6, item: 'Gluten-free pasta', stock: 5, unit: 'kg', threshold: 3, maxCapacity: 10, status: 'adequate', category: 'Grains', supplier: 'Specialty Foods', lastDelivery: 'Apr 4', nextDelivery: 'Apr 11', costPerUnit: 6.50 },
    { id: 7, item: 'Lactose-free milk', stock: 1, unit: 'L', threshold: 4, maxCapacity: 12, status: 'critical', category: 'Dairy Alt.', supplier: 'Valley Dairy', lastDelivery: 'Apr 4', nextDelivery: 'Apr 8', costPerUnit: 3.80 },
    { id: 8, item: 'Eggs', stock: 36, unit: 'pcs', threshold: 24, maxCapacity: 60, status: 'adequate', category: 'Protein', supplier: 'Valley Farms', lastDelivery: 'Apr 6', nextDelivery: 'Apr 9', costPerUnit: 0.35 },
    { id: 9, item: 'Bread (wheat)', stock: 5, unit: 'loaves', threshold: 10, maxCapacity: 20, status: 'low', category: 'Bakery', supplier: 'Baker Bros', lastDelivery: 'Apr 7', nextDelivery: 'Apr 8', costPerUnit: 3.50 },
    { id: 10, item: 'Protein powder', stock: 2, unit: 'kg', threshold: 1, maxCapacity: 5, status: 'adequate', category: 'Supplements', supplier: 'Nutrition Plus', lastDelivery: 'Mar 28', nextDelivery: 'Apr 14', costPerUnit: 22.00 },
    { id: 11, item: 'Sweet potatoes', stock: 4, unit: 'kg', threshold: 5, maxCapacity: 15, status: 'low', category: 'Produce', supplier: 'Fresh Farms Co.', lastDelivery: 'Apr 5', nextDelivery: 'Apr 8', costPerUnit: 3.00 },
    { id: 12, item: 'Turkey breast', stock: 6, unit: 'kg', threshold: 4, maxCapacity: 12, status: 'adequate', category: 'Protein', supplier: 'Valley Farms', lastDelivery: 'Apr 6', nextDelivery: 'Apr 9', costPerUnit: 9.20 },
]

/* ================================================================
   MEAL FEEDBACK DATA
   ================================================================ */
const FEEDBACK_DATA = {
    weeklyWaste: [
        { day: 'Mon', wasteKg: 2.1, mealsServed: 24 },
        { day: 'Tue', wasteKg: 1.8, mealsServed: 24 },
        { day: 'Wed', wasteKg: 3.2, mealsServed: 24 },
        { day: 'Thu', wasteKg: 1.5, mealsServed: 24 },
        { day: 'Fri', wasteKg: 2.4, mealsServed: 24 },
        { day: 'Sat', wasteKg: 1.9, mealsServed: 24 },
        { day: 'Sun', wasteKg: 2.0, mealsServed: 24 },
    ],
    dishRatings: [
        { dish: 'Grilled chicken with quinoa', avgRating: 4.2, totalRatings: 12, trend: 'up', category: 'Lunch', rejection: 5 },
        { dish: 'Baked salmon with vegetables', avgRating: 4.5, totalRatings: 10, trend: 'up', category: 'Lunch', rejection: 3 },
        { dish: 'Vegetable risotto', avgRating: 3.8, totalRatings: 8, trend: 'stable', category: 'Lunch', rejection: 12 },
        { dish: 'Pureed chicken stew', avgRating: 3.2, totalRatings: 6, trend: 'down', category: 'Lunch', rejection: 18 },
        { dish: 'Oatmeal with cinnamon', avgRating: 3.9, totalRatings: 14, trend: 'stable', category: 'Breakfast', rejection: 8 },
        { dish: 'Cream of mushroom soup', avgRating: 4.0, totalRatings: 9, trend: 'up', category: 'Dinner', rejection: 6 },
        { dish: 'Turkey meatballs', avgRating: 4.3, totalRatings: 11, trend: 'up', category: 'Dinner', rejection: 4 },
        { dish: 'Lentil stew', avgRating: 3.5, totalRatings: 7, trend: 'down', category: 'Dinner', rejection: 15 },
    ],
    residentFeedback: [
        { residentId: 1, resident: 'Elena Rodriguez', comment: 'Enjoyed the grilled chicken. Quinoa was well-seasoned.', meal: 'Lunch', date: 'Apr 7', sentiment: 'positive' },
        { residentId: 3, resident: 'Maria Silva', comment: 'Salmon was too dry. Preferred yesterday\'s preparation.', meal: 'Lunch', date: 'Apr 7', sentiment: 'negative' },
        { residentId: 5, resident: 'Jorge Navarro', comment: 'Appreciates the low-sodium options. Flavors still good.', meal: 'Dinner', date: 'Apr 7', sentiment: 'positive' },
        { residentId: 7, resident: 'Isabel Moreno', comment: 'Pureed stew was grainy. Needs finer blending.', meal: 'Lunch', date: 'Apr 7', sentiment: 'negative' },
        { residentId: 2, resident: 'Carlos Mendez', comment: 'Pasta was fine but would like more variety in sauces.', meal: 'Lunch', date: 'Apr 6', sentiment: 'neutral' },
        { residentId: 4, resident: 'Roberto Diaz', comment: 'Really liked the turkey meatballs. Great seasoning.', meal: 'Dinner', date: 'Apr 6', sentiment: 'positive' },
    ],
}

/* ================================================================
   PURCHASE LOG DATA
   ================================================================ */
const PURCHASE_LOG = [
    { id: 1, date: 'Apr 7', supplier: 'Fresh Farms Co.', items: [{ name: 'Mixed vegetables', qty: '12 kg', cost: 50.40 }, { name: 'Sweet potatoes', qty: '5 kg', cost: 15.00 }, { name: 'Berries', qty: '3 kg', cost: 24.00 }], totalCost: 89.40, orderMatch: true, qualityScore: 4, deliveryOnTime: true, invoiceRef: 'FF-2026-0407' },
    { id: 2, date: 'Apr 6', supplier: 'Valley Farms', items: [{ name: 'Chicken breast', qty: '10 kg', cost: 85.00 }, { name: 'Turkey breast', qty: '6 kg', cost: 55.20 }, { name: 'Eggs', qty: '60 pcs', cost: 21.00 }], totalCost: 161.20, orderMatch: true, qualityScore: 5, deliveryOnTime: true, invoiceRef: 'VF-2026-0406' },
    { id: 3, date: 'Apr 5', supplier: 'Pacific Seafood', items: [{ name: 'Salmon fillet', qty: '5 kg', cost: 70.00 }, { name: 'Cod fillet', qty: '3 kg', cost: 36.00 }], totalCost: 106.00, orderMatch: false, qualityScore: 3, deliveryOnTime: false, invoiceRef: 'PS-2026-0405' },
    { id: 4, date: 'Apr 4', supplier: 'Valley Dairy', items: [{ name: 'Lactose-free milk', qty: '6 L', cost: 22.80 }, { name: 'Yogurt', qty: '12 pcs', cost: 18.00 }], totalCost: 40.80, orderMatch: true, qualityScore: 4, deliveryOnTime: true, invoiceRef: 'VD-2026-0404' },
    { id: 5, date: 'Apr 4', supplier: 'Specialty Foods', items: [{ name: 'GF pasta', qty: '5 kg', cost: 32.50 }, { name: 'GF bread', qty: '8 loaves', cost: 28.00 }], totalCost: 60.50, orderMatch: true, qualityScore: 4, deliveryOnTime: true, invoiceRef: 'SF-2026-0404' },
    { id: 6, date: 'Apr 3', supplier: 'Baker Bros', items: [{ name: 'Wheat bread', qty: '15 loaves', cost: 52.50 }, { name: 'Dinner rolls', qty: '40 pcs', cost: 20.00 }], totalCost: 72.50, orderMatch: true, qualityScore: 5, deliveryOnTime: true, invoiceRef: 'BB-2026-0403' },
]

const WEEKLY_COST_DATA = [
    { week: 'W1', food: 820, supplies: 120, waste: 45, total: 985 },
    { week: 'W2', food: 780, supplies: 95, waste: 38, total: 913 },
    { week: 'W3', food: 850, supplies: 110, waste: 52, total: 1012 },
    { week: 'W4', food: 790, supplies: 105, waste: 40, total: 935 },
    { week: 'W5', food: 810, supplies: 130, waste: 35, total: 975 },
]

/* ================================================================
   CHEF ALERTS
   ================================================================ */
const CHEF_ALERTS = [
    { id: 1, severity: 'critical', area: 'Inventory', message: 'Lactose-free milk critically low -- only 1L remaining, threshold is 4L', time: '1h ago' },
    { id: 2, severity: 'critical', area: 'Allergen', message: 'Carlos Mendez (Dairy) -- lunch allergen check UNCONFIRMED', time: '30m ago' },
    { id: 3, severity: 'warning', area: 'Inventory', message: 'Salmon fillet below threshold -- 3kg remaining (need 4kg)', time: '2h ago' },
    { id: 4, severity: 'warning', area: 'Delivery', message: 'Pacific Seafood delivery was late & order mismatch on Apr 5', time: '2d ago' },
    { id: 5, severity: 'warning', area: 'Feedback', message: 'Pureed chicken stew rejection rate at 18% -- review recipe', time: '1d ago' },
    { id: 6, severity: 'info', area: 'Feedback', message: 'Turkey meatballs rated 4.3/5 -- consider adding to weekly rotation', time: '1d ago' },
    { id: 7, severity: 'info', area: 'Cost', message: 'Weekly food cost down 3.2% vs last month average', time: '1d ago' },
]

/* ================================================================
   STATUS STYLING
   ================================================================ */
const STATUS_CONFIG = {
    queued: { label: 'Queued', color: 'bg-gray-100 text-gray-600 border-gray-200', dot: 'text-gray-400' },
    prep: { label: 'Prep', color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'text-blue-500' },
    cooking: { label: 'Cooking', color: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'text-amber-500' },
    plating: { label: 'Plating', color: 'bg-purple-100 text-purple-700 border-purple-200', dot: 'text-purple-500' },
    served: { label: 'Served', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'text-emerald-500' },
}

const STOCK_STATUS_CONFIG = {
    adequate: { label: 'In Stock', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'text-emerald-500', barColor: '#059669' },
    low: { label: 'Low', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'text-amber-500', barColor: '#d97706' },
    critical: { label: 'Critical', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'text-red-500', barColor: '#dc2626' },
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function ChefDashboard() {
    const [activeSection, setActiveSection] = useState('allergens')
    const [selectedMealService, setSelectedMealService] = useState('lunch')
    const [selectedMealCard, setSelectedMealCard] = useState(null)
    const [selectedInventoryItem, setSelectedInventoryItem] = useState(null)
    const [selectedPurchase, setSelectedPurchase] = useState(null)
    const [selectedFeedbackDish, setSelectedFeedbackDish] = useState(null)
    const [filterStatus, setFilterStatus] = useState('all')

    /* Allergen confirmations -- persisted */
    const [allergenConfirms, setAllergenConfirms] = useState(() => {
        try { return JSON.parse(localStorage.getItem('chef_allergen_confirms') || '{}') } catch { return {} }
    })
    /* Meal status overrides -- persisted */
    const [mealStatuses, setMealStatuses] = useState(() => {
        try { return JSON.parse(localStorage.getItem('chef_meal_statuses') || '{}') } catch { return {} }
    })
    /* Kitchen notes */
    const [kitchenNotes, setKitchenNotes] = useState(() => {
        try { return JSON.parse(localStorage.getItem('chef_kitchen_notes') || '{}') } catch { return {} }
    })

    const persistAllergenConfirms = (next) => { setAllergenConfirms(next); localStorage.setItem('chef_allergen_confirms', JSON.stringify(next)) }
    const persistMealStatuses = (next) => { setMealStatuses(next); localStorage.setItem('chef_meal_statuses', JSON.stringify(next)) }
    const persistNotes = (next) => { setKitchenNotes(next); localStorage.setItem('chef_kitchen_notes', JSON.stringify(next)) }

    const handleConfirmAllergen = (checkId) => {
        const next = { ...allergenConfirms, [checkId]: new Date().toLocaleString() }
        persistAllergenConfirms(next)
    }

    const handleUpdateMealStatus = (service, residentId, newStatus) => {
        const key = service + ':' + residentId
        const next = { ...mealStatuses, [key]: newStatus }
        persistMealStatuses(next)
    }

    const handleAddNote = (key, text) => {
        const existing = kitchenNotes[key] || []
        const next = { ...kitchenNotes, [key]: [...existing, { text, timestamp: new Date().toLocaleString() }] }
        persistNotes(next)
    }

    const getMealStatus = (service, residentId, defaultStatus) => {
        const key = service + ':' + residentId
        return mealStatuses[key] || defaultStatus
    }

    /* Derived stats */
    const unconfirmedAllergens = ALLERGEN_CHECKS.filter(c => !allergenConfirms[c.id]).length
    const lowStockCount = INVENTORY_ITEMS.filter(i => i.status !== 'adequate').length
    const currentMeals = TODAYS_MEALS[selectedMealService] || []
    const avgWaste = FEEDBACK_DATA.weeklyWaste.reduce((s, d) => s + d.wasteKg, 0) / FEEDBACK_DATA.weeklyWaste.length

    return (
        <DashboardShell
            roleId="chef"
            roleTag="Chef -- Daily Kitchen Operations"
            title="Kitchen Command Center"
            tagline="Orchestrate every meal service with precision. Allergen safety, live workflow tracking, inventory control, and cost analytics."
            badges={['Live kitchen view', 'Module 7', unconfirmedAllergens > 0 ? unconfirmedAllergens + ' allergen checks pending' : 'All allergens confirmed']}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            notifications={CHEF_ALERTS}
        >
            {/* Service Countdown Bar */}
            <ServiceCountdownBar />

            {/* ---- SECTION: ALLERGEN ALERTS ---- */}
            {activeSection === 'allergens' && (
                <div className="space-y-6">
                    {/* Allergen Status Overview */}
                    <div className={`rounded-2xl border-2 p-4 ${unconfirmedAllergens > 0 ? 'border-red-300 bg-red-50/60' : 'border-emerald-300 bg-emerald-50/60'}`}>
                        <div className="flex items-center gap-2 mb-1">
                            {unconfirmedAllergens > 0 ? (
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                            ) : (
                                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                            )}
                            <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider">
                                Pre-Service Allergen Verification
                            </h3>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ml-auto ${unconfirmedAllergens > 0 ? 'bg-red-200 text-red-700' : 'bg-emerald-200 text-emerald-700'}`}>
                                {unconfirmedAllergens > 0 ? unconfirmedAllergens + ' Pending' : 'All Verified'}
                            </span>
                        </div>
                        <p className="text-xs text-brand-muted mb-4">
                            Each allergen-sensitive meal must be individually confirmed before service. Verify ingredients, cross-contamination protocols, and preparation notes.
                        </p>

                        <div className="space-y-3">
                            {ALLERGEN_CHECKS.map(check => {
                                const confirmed = allergenConfirms[check.id]
                                const AllergenIcon = ALLERGEN_ICONS[check.allergen] || AlertTriangle
                                const riskLevel = check.crossContamRisk.startsWith('High') ? 'high' : check.crossContamRisk.startsWith('Medium') ? 'medium' : 'low'
                                const riskStyles = { high: 'bg-red-50 border-red-200 text-red-700', medium: 'bg-amber-50 border-amber-200 text-amber-700', low: 'bg-emerald-50 border-emerald-200 text-emerald-700' }

                                return (
                                    <div key={check.id} className={`p-4 rounded-xl border ${confirmed ? 'border-emerald-200 bg-white' : 'border-red-200 bg-white shadow-sm'}`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${confirmed ? 'bg-emerald-100' : 'bg-red-100'}`}>
                                                <AllergenIcon className={`w-5 h-5 ${confirmed ? 'text-emerald-600' : 'text-red-600'}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-sm font-bold text-brand-dark">{check.resident}</span>
                                                    <span className="text-[10px] text-brand-muted">Rm {check.room}</span>
                                                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                                                        {check.allergen}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-brand-dark mt-1 font-medium">{check.dish}</p>
                                                <p className="text-[11px] text-brand-muted mt-1">{check.verification}</p>

                                                <div className="flex items-center gap-4 mt-2 text-[10px]">
                                                    <span className={`font-semibold px-1.5 py-0.5 rounded border ${riskStyles[riskLevel]}`}>
                                                        Cross-contam: {check.crossContamRisk}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-brand-muted mt-1">
                                                    <strong>Mitigation:</strong> {check.mitigation}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                {confirmed ? (
                                                    <div className="text-center">
                                                        <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                                                        <p className="text-[9px] text-emerald-600 font-semibold mt-1">Confirmed</p>
                                                        <p className="text-[8px] text-brand-muted">{confirmed}</p>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleConfirmAllergen(check.id)}
                                                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
                                                    >
                                                        <ShieldCheck className="w-3.5 h-3.5" />
                                                        Confirm Safe
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Allergen Summary by Resident */}
                    <SectionCard title="Resident Allergen Registry" icon={Users} subtitle="All residents with dietary allergens">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {RESIDENTS.filter(r => r.allergens.length > 0).map(r => (
                                <div key={r.id} className="p-3 rounded-xl border border-gray-100 bg-gray-50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-semibold text-brand-dark">{r.name}</span>
                                        <span className="text-[10px] text-brand-muted">Rm {r.room}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        {r.allergens.map((a, i) => {
                                            const AIcon = ALLERGEN_ICONS[a] || AlertTriangle
                                            return (
                                                <span key={i} className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-red-50 border border-red-200 text-red-700">
                                                    <AIcon className="w-3 h-3" /> {a}
                                                </span>
                                            )
                                        })}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-brand-muted">
                                        <span>Diet: <strong className="text-brand-dark">{r.dietType}</strong></span>
                                        <span>Texture: <strong className="text-brand-dark">{r.texture}</strong></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ---- SECTION: TODAY'S SERVICE (Kanban) ---- */}
            {activeSection === 'service' && (
                <div className="space-y-6">
                    {/* Meal Service Selector */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-4">
                        <div className="flex items-center gap-3 flex-wrap">
                            <UtensilsCrossed className="w-5 h-5 text-brand-accent" />
                            <span className="text-sm font-semibold text-brand-dark">Service:</span>
                            <div className="flex gap-2 flex-wrap">
                                {MEAL_SERVICES.map(ms => (
                                    <button
                                        key={ms.id}
                                        onClick={() => setSelectedMealService(ms.id)}
                                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${selectedMealService === ms.id
                                            ? 'bg-brand-primary text-white border-brand-primary'
                                            : 'bg-white text-brand-dark border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        {ms.label} ({ms.time})
                                    </button>
                                ))}
                            </div>
                            <div className="ml-auto flex gap-2">
                                <span className="text-[10px] text-brand-muted flex items-center gap-1">
                                    <Users className="w-3 h-3" /> {currentMeals.length} plates
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setFilterStatus('all')}
                            className={`px-2.5 py-1 text-[10px] font-semibold rounded-lg border transition-colors ${filterStatus === 'all' ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-brand-muted border-gray-200 hover:bg-gray-50'}`}
                        >All</button>
                        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                            <button
                                key={key}
                                onClick={() => setFilterStatus(key)}
                                className={`px-2.5 py-1 text-[10px] font-semibold rounded-lg border transition-colors ${filterStatus === key ? cfg.color + ' border-current' : 'bg-white text-brand-muted border-gray-200 hover:bg-gray-50'}`}
                            >
                                {cfg.label}
                            </button>
                        ))}
                    </div>

                    {/* Kanban Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {currentMeals
                            .filter(m => filterStatus === 'all' || getMealStatus(selectedMealService, m.residentId, m.status) === filterStatus)
                            .map(meal => {
                                const resident = RESIDENTS.find(r => r.id === meal.residentId)
                                const currentStatus = getMealStatus(selectedMealService, meal.residentId, meal.status)
                                const statusCfg = STATUS_CONFIG[currentStatus]
                                const hasAllergens = resident && resident.allergens.length > 0
                                const statusOrder = ['queued', 'prep', 'cooking', 'plating', 'served']
                                const nextStatus = statusOrder[statusOrder.indexOf(currentStatus) + 1]

                                return (
                                    <div
                                        key={meal.residentId}
                                        className={`p-3 rounded-xl border bg-white hover:shadow-md transition-all cursor-pointer ${hasAllergens ? 'border-red-200 ring-1 ring-red-100' : 'border-gray-200'}`}
                                        onClick={() => setSelectedMealCard({ ...meal, resident, currentStatus })}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-xs font-bold text-brand-dark">{resident && resident.name}</span>
                                            </div>
                                            <span className="text-[9px] text-brand-muted">Rm {resident && resident.room}</span>
                                        </div>
                                        <p className="text-[11px] text-brand-dark font-medium mb-2 line-clamp-2">{meal.dish}</p>

                                        {hasAllergens && (
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {resident.allergens.map((a, i) => (
                                                    <span key={i} className="text-[8px] font-bold uppercase px-1 py-0.5 rounded bg-red-100 text-red-700">{a}</span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 mb-2 text-[10px] text-brand-muted">
                                            <span>{meal.calories} kcal</span>
                                            <span>{meal.protein}g protein</span>
                                        </div>

                                        {resident && resident.texture !== 'Normal' && (
                                            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded mb-2 inline-block ${resident.texture === 'Pureed' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {resident.texture}
                                            </span>
                                        )}

                                        <div className="flex items-center justify-between mt-1">
                                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border ${statusCfg.color}`}>
                                                {statusCfg.label}
                                            </span>
                                            {nextStatus && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleUpdateMealStatus(selectedMealService, meal.residentId, nextStatus) }}
                                                    className="flex items-center gap-0.5 text-[9px] font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
                                                >
                                                    <ArrowRight className="w-3 h-3" /> {STATUS_CONFIG[nextStatus].label}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                    </div>

                    {/* Service Summary */}
                    <SectionCard title="Service Progress" icon={BarChart3} subtitle={(MEAL_SERVICES.find(m => m.id === selectedMealService) || {}).label + ' -- status breakdown'}>
                        <div className="flex gap-4 flex-wrap">
                            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                                const count = currentMeals.filter(m => getMealStatus(selectedMealService, m.residentId, m.status) === key).length
                                return (
                                    <div key={key} className="flex items-center gap-2">
                                        <Circle className={`w-3 h-3 fill-current ${cfg.dot}`} />
                                        <span className="text-xs text-brand-dark font-medium">{cfg.label}</span>
                                        <span className="text-sm font-bold text-brand-dark">{count}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-3 flex overflow-hidden">
                            {Object.entries(STATUS_CONFIG).map(([key]) => {
                                const count = currentMeals.filter(m => getMealStatus(selectedMealService, m.residentId, m.status) === key).length
                                const pct = (count / currentMeals.length) * 100
                                if (pct === 0) return null
                                const barColors = { queued: '#d1d5db', prep: '#93c5fd', cooking: '#fcd34d', plating: '#c4b5fd', served: '#6ee7b7' }
                                return <div key={key} style={{ width: pct + '%', backgroundColor: barColors[key] }} className="h-full transition-all" />
                            })}
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ---- SECTION: INVENTORY ---- */}
            {activeSection === 'inventory' && (
                <div className="space-y-6">
                    {/* Inventory Overview Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <StatCard icon={Package} label="Total Items" value={INVENTORY_ITEMS.length} color="brand" />
                        <StatCard icon={AlertTriangle} label="Low / Critical" value={lowStockCount} color={lowStockCount > 0 ? 'red' : 'emerald'} />
                        <StatCard icon={Truck} label="Next Delivery" value="Apr 8" color="blue" />
                        <StatCard icon={DollarSign} label="Avg Daily Cost" value="$127" color="emerald" />
                    </div>

                    {/* Inventory Table */}
                    <SectionCard title="Real-Time Stock Levels" icon={ClipboardList} subtitle={INVENTORY_ITEMS.length + ' items tracked -- click for details'}>
                        <div className="space-y-2">
                            {INVENTORY_ITEMS.map(item => {
                                const cfg = STOCK_STATUS_CONFIG[item.status]
                                const fillPct = Math.min((item.stock / item.maxCapacity) * 100, 100)

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedInventoryItem(item)}
                                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:shadow-md transition-all ${cfg.border} ${cfg.bg}`}
                                    >
                                        <Circle className={`w-3 h-3 fill-current flex-shrink-0 ${cfg.dot}`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-brand-dark">{item.item}</span>
                                                <span className="text-[10px] text-brand-muted">{item.category}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                <div className="h-1.5 rounded-full transition-all" style={{ width: fillPct + '%', backgroundColor: cfg.barColor }} />
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <span className={`text-sm font-bold ${cfg.text}`}>{item.stock} {item.unit}</span>
                                            <p className="text-[9px] text-brand-muted">of {item.maxCapacity} {item.unit}</p>
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.text} border ${cfg.border}`}>{cfg.label}</span>
                                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                    </div>
                                )
                            })}
                        </div>
                    </SectionCard>

                    {/* Inventory by Category Chart */}
                    <SectionCard title="Stock Distribution by Category" icon={Layers} subtitle="Percentage of capacity filled per category">
                        <div className="h-56">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={(() => {
                                        const cats = {}
                                        INVENTORY_ITEMS.forEach(i => {
                                            if (!cats[i.category]) cats[i.category] = { category: i.category, stock: 0, capacity: 0 }
                                            cats[i.category].stock += i.stock
                                            cats[i.category].capacity += i.maxCapacity
                                        })
                                        return Object.values(cats).map(c => ({ ...c, pct: Math.round((c.stock / c.capacity) * 100) }))
                                    })()}
                                    margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="category" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" domain={[0, 100]} />
                                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v) => [v + '%', 'Stock Level']} />
                                    <ReferenceLine y={30} stroke="#dc2626" strokeDasharray="4 4" label={{ value: 'Reorder', fontSize: 9, fill: '#dc2626' }} />
                                    <Bar dataKey="pct" radius={[6, 6, 0, 0]} name="Stock %">
                                        {(() => {
                                            const cats = {}
                                            INVENTORY_ITEMS.forEach(i => {
                                                if (!cats[i.category]) cats[i.category] = { stock: 0, capacity: 0 }
                                                cats[i.category].stock += i.stock
                                                cats[i.category].capacity += i.maxCapacity
                                            })
                                            return Object.values(cats).map((c, i) => {
                                                const pct = (c.stock / c.capacity) * 100
                                                return <Cell key={i} fill={pct >= 60 ? '#059669' : pct >= 30 ? '#d97706' : '#dc2626'} />
                                            })
                                        })()}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ---- SECTION: MEAL FEEDBACK ---- */}
            {activeSection === 'feedback' && (
                <div className="space-y-6">
                    {/* Waste Tracking Chart */}
                    <SectionCard title="Weekly Food Waste Tracker" icon={Trash2} subtitle={'Avg: ' + avgWaste.toFixed(1) + ' kg/day -- Target: < 2.0 kg/day'}>
                        <div className="h-56">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={FEEDBACK_DATA.weeklyWaste} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v) => [v + ' kg', 'Food Waste']} />
                                    <ReferenceLine y={2.0} stroke="#d97706" strokeDasharray="4 4" label={{ value: 'Target', fontSize: 9, fill: '#d97706' }} />
                                    <Bar dataKey="wasteKg" radius={[6, 6, 0, 0]} name="Waste (kg)">
                                        {FEEDBACK_DATA.weeklyWaste.map((d, i) => (
                                            <Cell key={i} fill={d.wasteKg <= 2.0 ? '#059669' : d.wasteKg <= 2.5 ? '#d97706' : '#dc2626'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </SectionCard>

                    {/* Dish Ratings Table */}
                    <SectionCard title="Dish Performance Scoreboard" icon={Star} subtitle="Click a dish for detailed feedback">
                        <div className="space-y-2">
                            {FEEDBACK_DATA.dishRatings.map((dish, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedFeedbackDish(dish)}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:shadow-md cursor-pointer transition-all"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-brand-dark">{dish.dish}</span>
                                            <span className="text-[10px] text-brand-muted">{dish.category}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        {dish.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />}
                                        {dish.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-500" />}
                                        {dish.trend === 'stable' && <MinusIcon className="w-3.5 h-3.5 text-gray-400" />}
                                    </div>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        <Star className={`w-3.5 h-3.5 ${dish.avgRating >= 4.0 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                                        <span className="text-sm font-bold text-brand-dark">{dish.avgRating}</span>
                                    </div>
                                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ${dish.rejection <= 5 ? 'bg-emerald-100 text-emerald-700' : dish.rejection <= 12 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                        {dish.rejection}% reject
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    {/* Recent Resident Comments */}
                    <SectionCard title="Recent Resident Feedback" icon={FileText} subtitle="Direct comments from residents">
                        <div className="space-y-2">
                            {FEEDBACK_DATA.residentFeedback.map((fb, i) => (
                                <div key={i} className={`p-3 rounded-xl border ${fb.sentiment === 'positive' ? 'border-emerald-100 bg-emerald-50/50' : fb.sentiment === 'negative' ? 'border-red-100 bg-red-50/50' : 'border-gray-100 bg-gray-50'}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        {fb.sentiment === 'positive' && <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" />}
                                        {fb.sentiment === 'negative' && <ThumbsDown className="w-3.5 h-3.5 text-red-500" />}
                                        {fb.sentiment === 'neutral' && <MinusIcon className="w-3.5 h-3.5 text-gray-400" />}
                                        <span className="text-sm font-semibold text-brand-dark">{fb.resident}</span>
                                        <span className="text-[10px] text-brand-muted">{fb.meal} -- {fb.date}</span>
                                    </div>
                                    <p className="text-xs text-brand-dark leading-relaxed pl-6">"{fb.comment}"</p>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ---- SECTION: PURCHASE LOG ---- */}
            {activeSection === 'purchases' && (
                <div className="space-y-6">
                    {/* Weekly Cost Analytics */}
                    <SectionCard title="Weekly Cost Trend" icon={DollarSign} subtitle="Food, supplies, and waste cost breakdown">
                        <div className="h-56">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={WEEKLY_COST_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v) => ['$' + v, '']} />
                                    <Legend wrapperStyle={{ fontSize: 11 }} />
                                    <Bar dataKey="food" stackId="a" fill="#4A7FA8" name="Food" radius={[0, 0, 0, 0]} />
                                    <Bar dataKey="supplies" stackId="a" fill="#6D8C8C" name="Supplies" radius={[0, 0, 0, 0]} />
                                    <Bar dataKey="waste" stackId="a" fill="#dc2626" name="Waste" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mt-3">
                            <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-center">
                                <p className="text-[10px] text-blue-600 font-semibold uppercase">Avg Food/Week</p>
                                <p className="text-lg font-bold text-blue-800">${Math.round(WEEKLY_COST_DATA.reduce((s, w) => s + w.food, 0) / WEEKLY_COST_DATA.length)}</p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-center">
                                <p className="text-[10px] text-gray-600 font-semibold uppercase">Avg Supplies/Week</p>
                                <p className="text-lg font-bold text-gray-800">${Math.round(WEEKLY_COST_DATA.reduce((s, w) => s + w.supplies, 0) / WEEKLY_COST_DATA.length)}</p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-center">
                                <p className="text-[10px] text-red-600 font-semibold uppercase">Avg Waste Cost/Week</p>
                                <p className="text-lg font-bold text-red-800">${Math.round(WEEKLY_COST_DATA.reduce((s, w) => s + w.waste, 0) / WEEKLY_COST_DATA.length)}</p>
                            </div>
                        </div>
                    </SectionCard>

                    {/* Purchase Log Entries */}
                    <SectionCard title="Purchase & Delivery Log" icon={Receipt} subtitle={PURCHASE_LOG.length + ' recent orders -- click for details'}>
                        <div className="space-y-2">
                            {PURCHASE_LOG.map(p => (
                                <div
                                    key={p.id}
                                    onClick={() => setSelectedPurchase(p)}
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:shadow-md transition-all ${!p.orderMatch || !p.deliveryOnTime ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100 bg-gray-50'}`}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary flex-shrink-0">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-brand-dark">{p.supplier}</span>
                                            <span className="text-[10px] text-brand-muted">{p.date}</span>
                                        </div>
                                        <p className="text-[11px] text-brand-muted mt-0.5">
                                            {p.items.map(it => it.name).join(', ')}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className="text-sm font-bold text-brand-dark">${p.totalCost.toFixed(2)}</span>
                                        <div className="flex gap-1">
                                            {p.orderMatch ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            ) : (
                                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                            )}
                                            {p.deliveryOnTime ? (
                                                <Clock className="w-4 h-4 text-emerald-500" />
                                            ) : (
                                                <Clock className="w-4 h-4 text-red-500" />
                                            )}
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    {/* Cost per Plate */}
                    <SectionCard title="Cost Analytics" icon={Percent} subtitle="Cost efficiency metrics">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="p-3 rounded-xl border border-gray-100 bg-gray-50 text-center">
                                <p className="text-[10px] text-brand-muted font-semibold uppercase">Cost/Plate (Avg)</p>
                                <p className="text-xl font-bold text-brand-dark mt-1">$5.80</p>
                                <p className="text-[9px] text-emerald-600 font-semibold flex items-center justify-center gap-0.5 mt-0.5"><TrendingDown className="w-3 h-3" /> -3.2% vs last month</p>
                            </div>
                            <div className="p-3 rounded-xl border border-gray-100 bg-gray-50 text-center">
                                <p className="text-[10px] text-brand-muted font-semibold uppercase">Cost/Resident/Day</p>
                                <p className="text-xl font-bold text-brand-dark mt-1">$15.90</p>
                                <p className="text-[9px] text-brand-muted mt-0.5">Target: $16.50</p>
                            </div>
                            <div className="p-3 rounded-xl border border-gray-100 bg-gray-50 text-center">
                                <p className="text-[10px] text-brand-muted font-semibold uppercase">Waste % of Budget</p>
                                <p className="text-xl font-bold text-amber-600 mt-1">4.1%</p>
                                <p className="text-[9px] text-brand-muted mt-0.5">Target: &lt; 5%</p>
                            </div>
                            <div className="p-3 rounded-xl border border-gray-100 bg-gray-50 text-center">
                                <p className="text-[10px] text-brand-muted font-semibold uppercase">Supplier Score</p>
                                <p className="text-xl font-bold text-brand-dark mt-1">4.2/5</p>
                                <p className="text-[9px] text-emerald-600 font-semibold flex items-center justify-center gap-0.5 mt-0.5"><TrendingUp className="w-3 h-3" /> Stable</p>
                            </div>
                        </div>
                    </SectionCard>
                </div>
            )}

            {/* ---- MODALS ---- */}
            {selectedMealCard && (
                <Modal onClose={() => setSelectedMealCard(null)}>
                    <MealCardModal
                        meal={selectedMealCard}
                        onStatusChange={(newStatus) => { handleUpdateMealStatus(selectedMealService, selectedMealCard.residentId, newStatus); setSelectedMealCard({ ...selectedMealCard, currentStatus: newStatus }) }}
                        notes={kitchenNotes['meal:' + selectedMealService + ':' + selectedMealCard.residentId] || []}
                        onAddNote={(text) => handleAddNote('meal:' + selectedMealService + ':' + selectedMealCard.residentId, text)}
                        onClose={() => setSelectedMealCard(null)}
                    />
                </Modal>
            )}
            {selectedInventoryItem && (
                <Modal onClose={() => setSelectedInventoryItem(null)}>
                    <InventoryDetailModal
                        item={selectedInventoryItem}
                        onClose={() => setSelectedInventoryItem(null)}
                    />
                </Modal>
            )}
            {selectedPurchase && (
                <Modal onClose={() => setSelectedPurchase(null)}>
                    <PurchaseDetailModal
                        purchase={selectedPurchase}
                        notes={kitchenNotes['purchase:' + selectedPurchase.id] || []}
                        onAddNote={(text) => handleAddNote('purchase:' + selectedPurchase.id, text)}
                        onClose={() => setSelectedPurchase(null)}
                    />
                </Modal>
            )}
            {selectedFeedbackDish && (
                <Modal onClose={() => setSelectedFeedbackDish(null)}>
                    <DishFeedbackModal
                        dish={selectedFeedbackDish}
                        residentFeedback={FEEDBACK_DATA.residentFeedback}
                        onClose={() => setSelectedFeedbackDish(null)}
                    />
                </Modal>
            )}
        </DashboardShell>
    )
}

/* ================================================================
   SERVICE COUNTDOWN BAR
   ================================================================ */
function ServiceCountdownBar() {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
                <Timer className="w-4 h-4 text-brand-accent" />
                <span className="text-xs font-semibold text-brand-dark uppercase tracking-wider">Service Countdown</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MEAL_SERVICES.map(ms => (
                    <CountdownChip key={ms.id} label={ms.label} time={ms.time} targetHour={ms.targetHour} targetMin={ms.targetMin} />
                ))}
            </div>
        </div>
    )
}

function CountdownChip({ label, time, targetHour, targetMin }) {
    const { timeLeft, urgency } = useCountdown(targetHour, targetMin)
    const urgencyStyles = {
        normal: 'border-gray-200 bg-gray-50',
        warning: 'border-amber-200 bg-amber-50',
        critical: 'border-red-200 bg-red-50 animate-pulse',
        past: 'border-emerald-200 bg-emerald-50',
    }
    const textStyles = {
        normal: 'text-brand-dark',
        warning: 'text-amber-700',
        critical: 'text-red-700',
        past: 'text-emerald-700',
    }
    return (
        <div className={`p-3 rounded-xl border text-center ${urgencyStyles[urgency]}`}>
            <p className="text-[10px] font-semibold text-brand-muted uppercase">{label} ({time})</p>
            <p className={`text-sm font-bold mt-1 ${textStyles[urgency]}`}>{timeLeft}</p>
        </div>
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

function StatCard({ icon: Icon, label, value, color }) {
    const colors = {
        brand: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
        red: 'bg-red-50 text-red-600 border-red-200',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        amber: 'bg-amber-50 text-amber-600 border-amber-200',
    }
    return (
        <div className={`p-3 rounded-xl border text-center ${colors[color]}`}>
            <Icon className="w-5 h-5 mx-auto mb-1 opacity-70" />
            <p className="text-[10px] font-semibold uppercase opacity-70">{label}</p>
            <p className="text-lg font-bold mt-0.5">{value}</p>
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
            <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                    Kitchen Notes {notes.length > 0 && <span className="text-brand-primary">({notes.length})</span>}
                </p>
            </div>
            {notes.length > 0 && (
                <div className="space-y-2 mb-3">
                    {notes.map((note, i) => (
                        <div key={i} className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/60" style={{ animation: 'modalIn 0.2s ease-out' }}>
                            <div className="flex items-start gap-2">
                                <FileText className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-brand-dark leading-relaxed">{note.text}</p>
                                    <p className="text-[10px] text-brand-muted mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {note.timestamp}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {notes.length === 0 && !showForm && (
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center mb-3">
                    <p className="text-xs text-brand-muted">No kitchen notes added yet</p>
                </div>
            )}
            {showForm && (
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-2 mb-3" style={{ animation: 'modalIn 0.2s ease-out' }}>
                    <textarea
                        autoFocus rows={3} value={text} onChange={e => setText(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent resize-none text-brand-dark placeholder-brand-muted/50"
                        placeholder="Enter kitchen note, preparation instruction, or issue..."
                    />
                    <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => { setShowForm(false); setText('') }} className="px-3 py-1.5 text-xs font-medium text-brand-muted hover:text-brand-dark transition-colors rounded-lg">Cancel</button>
                        <button onClick={handleSave} disabled={!text.trim()} className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${text.trim() ? 'bg-brand-primary text-white hover:bg-brand-primary-dark' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                            <Send className="w-3 h-3" /> Save Note
                        </button>
                    </div>
                </div>
            )}
            {justSaved && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 mb-3" style={{ animation: 'modalIn 0.2s ease-out' }}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <p className="text-xs font-medium text-emerald-700">Kitchen note saved successfully</p>
                </div>
            )}
            <button onClick={() => setShowForm(true)} disabled={showForm} className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${showForm ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-default' : 'bg-white text-brand-dark border-gray-200 hover:bg-gray-50'}`}>
                <Plus className="w-3.5 h-3.5" /> Add Kitchen Note
            </button>
        </div>
    )
}

/* ================================================================
   MODAL CONTENTS
   ================================================================ */

function MealCardModal({ meal, onStatusChange, notes, onAddNote, onClose }) {
    const resident = meal.resident
    const statusOrder = ['queued', 'prep', 'cooking', 'plating', 'served']

    return (
        <div>
            <div className="px-6 py-4 border-b bg-gray-50 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <UtensilsCrossed className="w-5 h-5 text-brand-accent" />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{resident && resident.name} -- Meal Card</h3>
                        <p className="text-[11px] text-brand-muted">Rm {resident && resident.room} -- {resident && resident.dietType}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                {/* Dish info */}
                <div className="p-3 rounded-lg bg-brand-primary/5 border border-brand-primary/10">
                    <p className="text-sm font-semibold text-brand-dark">{meal.dish}</p>
                    <div className="flex gap-4 mt-1 text-[11px] text-brand-muted">
                        <span>{meal.calories} kcal</span>
                        <span>{meal.protein}g protein</span>
                    </div>
                </div>

                {/* Resident profile */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-[10px] text-brand-muted uppercase">Diet Type</p>
                        <p className="text-xs font-medium text-brand-dark">{resident && resident.dietType}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-[10px] text-brand-muted uppercase">Texture</p>
                        <p className="text-xs font-medium text-brand-dark">{resident && resident.texture}</p>
                    </div>
                </div>

                {/* Allergens */}
                {resident && resident.allergens.length > 0 && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                        <p className="text-[10px] text-red-600 font-semibold uppercase mb-1">Allergen Warning</p>
                        <div className="flex flex-wrap gap-1.5">
                            {resident.allergens.map((a, i) => {
                                const AIcon = ALLERGEN_ICONS[a] || AlertTriangle
                                return (
                                    <span key={i} className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-white border border-red-200 text-red-700">
                                        <AIcon className="w-3 h-3" /> {a}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Preparation notes */}
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Preparation Notes</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{meal.notes}</p>
                    </div>
                </div>

                {/* Status workflow */}
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Workflow Status</p>
                    <div className="flex gap-1 items-center flex-wrap">
                        {statusOrder.map((s, i) => {
                            const cfg = STATUS_CONFIG[s]
                            const isActive = s === meal.currentStatus
                            const isPast = statusOrder.indexOf(s) < statusOrder.indexOf(meal.currentStatus)
                            return (
                                <div key={s} className="flex items-center gap-1">
                                    <button
                                        onClick={() => onStatusChange(s)}
                                        className={`px-2 py-1 text-[10px] font-semibold rounded-lg border transition-all ${isActive ? cfg.color + ' ring-2 ring-offset-1 ring-brand-primary/30' : isPast ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'}`}
                                    >
                                        {cfg.label}
                                    </button>
                                    {i < statusOrder.length - 1 && <ArrowRight className="w-3 h-3 text-gray-300" />}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Conditions */}
                {resident && resident.conditions.length > 0 && (
                    <div>
                        <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Medical Conditions</p>
                        <div className="flex flex-wrap gap-1.5">
                            {resident.conditions.map((c, i) => (
                                <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">{c}</span>
                            ))}
                        </div>
                    </div>
                )}

                <NoteSection notes={notes} onAddNote={onAddNote} />
            </div>
        </div>
    )
}

function InventoryDetailModal({ item, onClose }) {
    const cfg = STOCK_STATUS_CONFIG[item.status]
    const fillPct = Math.min((item.stock / item.maxCapacity) * 100, 100)

    return (
        <div>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${cfg.bg} ${cfg.border}`}>
                <div className="flex items-center gap-3">
                    <Package className={`w-5 h-5 ${cfg.text}`} />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{item.item}</h3>
                        <p className="text-[11px] text-brand-muted">{item.category} -- {item.supplier}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="text-center py-2">
                    <p className={`text-4xl font-bold ${cfg.text}`}>{item.stock}<span className="text-lg text-brand-muted"> {item.unit}</span></p>
                    <p className="text-xs text-brand-muted mt-1">of {item.maxCapacity} {item.unit} capacity</p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-3 mx-auto max-w-xs">
                        <div className="h-3 rounded-full transition-all" style={{ width: fillPct + '%', backgroundColor: cfg.barColor }} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-[10px] text-brand-muted uppercase">Reorder Threshold</p>
                        <p className="text-xs font-medium text-brand-dark">{item.threshold} {item.unit}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-[10px] text-brand-muted uppercase">Cost per {item.unit}</p>
                        <p className="text-xs font-medium text-brand-dark">${item.costPerUnit.toFixed(2)}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-[10px] text-brand-muted uppercase">Last Delivery</p>
                        <p className="text-xs font-medium text-brand-dark">{item.lastDelivery}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-[10px] text-brand-muted uppercase">Next Delivery</p>
                        <p className="text-xs font-medium text-brand-dark">{item.nextDelivery}</p>
                    </div>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <p className="text-[10px] text-brand-muted uppercase mb-1">Supplier</p>
                    <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-brand-muted" />
                        <span className="text-sm font-medium text-brand-dark">{item.supplier}</span>
                    </div>
                </div>

                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-[10px] text-blue-600 font-semibold uppercase mb-1">Stock Value</p>
                    <p className="text-lg font-bold text-blue-800">${(item.stock * item.costPerUnit).toFixed(2)}</p>
                    <p className="text-[10px] text-blue-600 mt-0.5">Full capacity value: ${(item.maxCapacity * item.costPerUnit).toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

function PurchaseDetailModal({ purchase, notes, onAddNote, onClose }) {
    return (
        <div>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${!purchase.orderMatch || !purchase.deliveryOnTime ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-3">
                    <Receipt className="w-5 h-5 text-brand-accent" />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{purchase.supplier}</h3>
                        <p className="text-[11px] text-brand-muted">{purchase.date} -- Ref: {purchase.invoiceRef}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                {/* Order items */}
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Items Delivered</p>
                    <div className="space-y-1.5">
                        {purchase.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                <span className="text-sm text-brand-dark">{item.name}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-brand-muted">{item.qty}</span>
                                    <span className="text-sm font-semibold text-brand-dark">${item.cost.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total */}
                <div className="p-3 rounded-lg bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-between">
                    <span className="text-sm font-semibold text-brand-dark">Total Cost</span>
                    <span className="text-lg font-bold text-brand-primary">${purchase.totalCost.toFixed(2)}</span>
                </div>

                {/* Status indicators */}
                <div className="grid grid-cols-2 gap-3">
                    <div className={`p-2.5 rounded-lg border ${purchase.orderMatch ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                        <div className="flex items-center gap-2">
                            {purchase.orderMatch ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                            <div>
                                <p className="text-[10px] uppercase font-semibold text-brand-muted">Order Match</p>
                                <p className={`text-xs font-medium ${purchase.orderMatch ? 'text-emerald-700' : 'text-amber-700'}`}>
                                    {purchase.orderMatch ? 'Matched' : 'Discrepancy'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={`p-2.5 rounded-lg border ${purchase.deliveryOnTime ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-center gap-2">
                            {purchase.deliveryOnTime ? <Clock className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-red-600" />}
                            <div>
                                <p className="text-[10px] uppercase font-semibold text-brand-muted">Delivery</p>
                                <p className={`text-xs font-medium ${purchase.deliveryOnTime ? 'text-emerald-700' : 'text-red-700'}`}>
                                    {purchase.deliveryOnTime ? 'On Time' : 'Late'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quality score */}
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <p className="text-[10px] text-brand-muted uppercase mb-1">Quality Score</p>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className={`w-4 h-4 ${s <= purchase.qualityScore ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                        ))}
                        <span className="text-sm font-bold text-brand-dark ml-2">{purchase.qualityScore}/5</span>
                    </div>
                </div>

                <NoteSection notes={notes} onAddNote={onAddNote} />
            </div>
        </div>
    )
}

function DishFeedbackModal({ dish, residentFeedback, onClose }) {
    return (
        <div>
            <div className="px-6 py-4 border-b bg-gray-50 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-brand-accent" />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{dish.dish}</h3>
                        <p className="text-[11px] text-brand-muted">{dish.category} -- {dish.totalRatings} ratings</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                {/* Rating summary */}
                <div className="text-center py-2">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className={`w-5 h-5 ${s <= Math.round(dish.avgRating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                        ))}
                    </div>
                    <p className="text-3xl font-bold text-brand-dark">{dish.avgRating}<span className="text-lg text-brand-muted">/5</span></p>
                    <p className="text-xs text-brand-muted mt-1">{dish.totalRatings} total ratings</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-xl border text-center ${dish.rejection <= 5 ? 'bg-emerald-50 border-emerald-200' : dish.rejection <= 12 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                        <p className="text-[10px] font-semibold uppercase opacity-70">Rejection Rate</p>
                        <p className={`text-xl font-bold ${dish.rejection <= 5 ? 'text-emerald-700' : dish.rejection <= 12 ? 'text-amber-700' : 'text-red-700'}`}>{dish.rejection}%</p>
                    </div>
                    <div className="p-3 rounded-xl border border-gray-200 bg-gray-50 text-center">
                        <p className="text-[10px] font-semibold uppercase text-brand-muted">Trend</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                            {dish.trend === 'up' && <TrendingUp className="w-5 h-5 text-emerald-500" />}
                            {dish.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-500" />}
                            {dish.trend === 'stable' && <MinusIcon className="w-5 h-5 text-gray-400" />}
                            <span className={`text-sm font-bold ${dish.trend === 'up' ? 'text-emerald-600' : dish.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                                {dish.trend === 'up' ? 'Improving' : dish.trend === 'down' ? 'Declining' : 'Stable'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Related feedback */}
                {residentFeedback.length > 0 && (
                    <div>
                        <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Recent Resident Comments</p>
                        <div className="space-y-2">
                            {residentFeedback.slice(0, 4).map((fb, i) => (
                                <div key={i} className={`p-3 rounded-lg border ${fb.sentiment === 'positive' ? 'bg-emerald-50/50 border-emerald-100' : fb.sentiment === 'negative' ? 'bg-red-50/50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        {fb.sentiment === 'positive' && <ThumbsUp className="w-3 h-3 text-emerald-500" />}
                                        {fb.sentiment === 'negative' && <ThumbsDown className="w-3 h-3 text-red-500" />}
                                        {fb.sentiment === 'neutral' && <MinusIcon className="w-3 h-3 text-gray-400" />}
                                        <span className="text-xs font-semibold text-brand-dark">{fb.resident}</span>
                                        <span className="text-[10px] text-brand-muted">{fb.date}</span>
                                    </div>
                                    <p className="text-xs text-brand-dark pl-5">"{fb.comment}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
