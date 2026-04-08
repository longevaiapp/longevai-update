import { useState } from 'react'
import DashboardShell from '../components/DashboardShell'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    LineChart, Line, Cell, ReferenceLine
} from 'recharts'
import {
    ClipboardList, ShieldCheck, BarChart3, MessageSquare, Scale, ShoppingCart,
    ChevronDown, UserCheck, Circle, CheckCircle2, AlertTriangle, Clock,
    X, ChevronRight, FileText, Send, Plus, Activity, TrendingUp, TrendingDown,
    Apple, Beef, Wheat, Droplets, Flame, Info, AlertCircle, Leaf,
    ThumbsUp, ThumbsDown, MessageCircle, Utensils, Coffee, Sun, Moon, Cookie,
    CalendarDays, UserCircle, Briefcase, Users, GraduationCap, Mail, Phone,
    Building2, Globe, Pencil, Save
} from 'lucide-react'

/* ================================================================
   PER-RESIDENT DATA
   ================================================================ */

const RESIDENTS_LIST = [
    { id: 1, name: 'Elena Rodriguez', room: '101', age: 78, week: 12, conditions: ['Hypertension', 'Diabetes T2'], dietType: 'Glucose-Controlled', caloricTarget: 1650, referredBy: 'Dr. Gomez' },
    { id: 2, name: 'Carlos Mendez', room: '102', age: 82, week: 8, conditions: ['Osteoarthritis', 'Lactose intolerance'], dietType: 'Anti-Inflammatory / Lactose-Free', caloricTarget: 1800, referredBy: 'Dr. Gomez' },
    { id: 3, name: 'Maria Silva', room: '103', age: 85, week: 15, conditions: ['Depression', 'Chronic pain', 'Appetite loss'], dietType: 'High-Calorie Fortified', caloricTarget: 1500, referredBy: 'Dr. Torres' },
    { id: 4, name: 'Roberto Diaz', room: '106', age: 77, week: 3, conditions: ['Hypertension', 'Obesity'], dietType: 'Mediterranean / Calorie-Restricted', caloricTarget: 1800, referredBy: 'Dr. Gomez' },
]

const RESIDENT_DATA = {
    1: {
        menuMatrix: [
            { day: 'Monday', breakfast: { meal: 'Oatmeal with berries', status: 'validated', calories: 320, protein: 12, carbs: 48, fat: 8, fiber: 6, tags: ['Low GI', 'Diabetes-safe'], notes: 'Steel-cut oats, no added sugar. Fresh blueberries and strawberries.' }, lunch: { meal: 'Grilled chicken salad', status: 'validated', calories: 420, protein: 35, carbs: 18, fat: 22, fiber: 5, tags: ['High protein', 'Low carb'], notes: 'Mixed greens, cherry tomatoes, cucumber. Olive oil dressing.' }, dinner: { meal: 'Baked salmon with quinoa', status: 'validated', calories: 480, protein: 38, carbs: 32, fat: 20, fiber: 4, tags: ['Omega-3', 'Heart-healthy'], notes: 'Wild salmon fillet. Lemon herb quinoa. Steamed broccoli.' }, snacks: { meal: 'Apple slices + almonds', status: 'validated', calories: 180, protein: 5, carbs: 22, fat: 9, fiber: 4, tags: ['Low GI'], notes: '1 medium apple, 10 almonds.' } },
            { day: 'Tuesday', breakfast: { meal: 'Whole grain toast + eggs', status: 'validated', calories: 350, protein: 18, carbs: 30, fat: 16, fiber: 4, tags: ['High protein'], notes: '2 scrambled eggs, whole wheat toast. No butter.' }, lunch: { meal: 'Lentil soup + bread', status: 'validated', calories: 380, protein: 18, carbs: 52, fat: 8, fiber: 12, tags: ['High fiber', 'Low GI'], notes: 'Red lentil soup with cumin. Whole grain roll.' }, dinner: { meal: 'Turkey meatballs + vegetables', status: 'pending', calories: 440, protein: 32, carbs: 28, fat: 22, fiber: 6, tags: ['High protein'], notes: 'Lean turkey. Tomato sauce. Roasted zucchini and peppers.' }, snacks: { meal: 'Greek yogurt + walnuts', status: 'validated', calories: 200, protein: 14, carbs: 12, fat: 12, fiber: 1, tags: ['Probiotic', 'Low GI'], notes: 'Plain unsweetened Greek yogurt. 5 walnut halves.' } },
            { day: 'Wednesday', breakfast: { meal: 'Vegetable omelet', status: 'validated', calories: 310, protein: 22, carbs: 8, fat: 20, fiber: 3, tags: ['Low carb', 'Keto-friendly'], notes: '3-egg omelet with spinach, mushrooms, tomato.' }, lunch: { meal: 'Chicken & vegetable stir-fry', status: 'validated', calories: 400, protein: 30, carbs: 35, fat: 14, fiber: 5, tags: ['Balanced'], notes: 'Brown rice. Light soy sauce. Mixed vegetables.' }, dinner: { meal: 'White fish with sweet potato', status: 'validated', calories: 420, protein: 34, carbs: 38, fat: 12, fiber: 5, tags: ['Low fat', 'Heart-healthy'], notes: 'Tilapia. Roasted sweet potato. Green beans.' }, snacks: { meal: 'Celery + hummus', status: 'validated', calories: 150, protein: 5, carbs: 14, fat: 8, fiber: 4, tags: ['Low GI', 'Diabetes-safe'], notes: 'Celery sticks with 3 tbsp hummus.' } },
            { day: 'Thursday', breakfast: { meal: 'Chia seed pudding', status: 'validated', calories: 280, protein: 10, carbs: 32, fat: 14, fiber: 10, tags: ['High fiber', 'Omega-3'], notes: 'Chia seeds in almond milk. Topped with berries.' }, lunch: { meal: 'Tuna wrap + side salad', status: 'validated', calories: 410, protein: 28, carbs: 38, fat: 16, fiber: 4, tags: ['High protein'], notes: 'Whole wheat wrap. Tuna with light mayo. Side greens.' }, dinner: { meal: 'Beef stew with root vegetables', status: 'validated', calories: 460, protein: 30, carbs: 40, fat: 18, fiber: 6, tags: ['Iron-rich', 'Comfort food'], notes: 'Lean beef chunks. Carrots, potatoes, celery. Low sodium broth.' }, snacks: { meal: 'Mixed berries', status: 'validated', calories: 120, protein: 2, carbs: 28, fat: 1, fiber: 6, tags: ['Antioxidant', 'Low GI'], notes: 'Blueberries, raspberries, strawberries.' } },
            { day: 'Friday', breakfast: { meal: 'Smoothie bowl', status: 'validated', calories: 330, protein: 14, carbs: 48, fat: 10, fiber: 7, tags: ['Antioxidant'], notes: 'Banana, spinach, protein powder, almond milk. Granola topping.' }, lunch: { meal: 'Mediterranean grain bowl', status: 'validated', calories: 430, protein: 16, carbs: 52, fat: 18, fiber: 8, tags: ['Mediterranean', 'Heart-healthy'], notes: 'Farro, chickpeas, roasted vegetables, feta, lemon dressing.' }, dinner: { meal: 'Herb-crusted pork tenderloin', status: 'validated', calories: 450, protein: 36, carbs: 30, fat: 20, fiber: 4, tags: ['High protein'], notes: 'Lean pork. Mashed cauliflower. Steamed asparagus.' }, snacks: { meal: 'Cottage cheese + pear', status: 'validated', calories: 170, protein: 12, carbs: 20, fat: 4, fiber: 3, tags: ['High protein', 'Low GI'], notes: 'Low-fat cottage cheese. 1 small pear.' } },
        ],
        restrictions: [
            { id: 1, allergen: 'Added sugars', severity: 'high', items: ['Desserts', 'Sweetened beverages', 'Flavored yogurt'], status: 'active', notes: 'Diabetes T2 -- strict glucose control required. Only natural sugars from fruit allowed. Stevia permitted as sweetener.', lastReviewed: 'Apr 3, 2026' },
            { id: 2, allergen: 'High-GI carbohydrates', severity: 'moderate', items: ['White bread', 'White rice', 'Instant oatmeal'], status: 'active', notes: 'Replace with whole grain alternatives. Monitor post-meal glucose. Current HbA1c: 6.8%.', lastReviewed: 'Apr 3, 2026' },
        ],
        mealAdherence: [
            { week: 'W1-2', breakfast: 85, lunch: 90, dinner: 88, snacks: 92, overall: 89 },
            { week: 'W3-4', breakfast: 88, lunch: 92, dinner: 90, snacks: 95, overall: 91 },
            { week: 'W5-6', breakfast: 90, lunch: 88, dinner: 92, snacks: 90, overall: 90 },
            { week: 'W7-8', breakfast: 92, lunch: 90, dinner: 88, snacks: 92, overall: 90 },
            { week: 'W9-10', breakfast: 90, lunch: 92, dinner: 90, snacks: 95, overall: 92 },
            { week: 'W11-12', breakfast: 92, lunch: 94, dinner: 90, snacks: 95, overall: 93 },
        ],
        feedback: [
            { id: 1, date: 'Apr 6, 2026', meal: 'Lunch', dish: 'Grilled chicken salad', type: 'positive', feedback: 'Elena said this is her favorite lunch. Requested it twice weekly.', reporter: 'Nurse Garcia', response: 'Added to rotation on Mon and Thu.' },
            { id: 2, date: 'Apr 5, 2026', meal: 'Dinner', dish: 'Baked salmon with quinoa', type: 'positive', feedback: 'Finished entire plate. Enjoyed the lemon herb seasoning.', reporter: 'Kitchen staff', response: null },
            { id: 3, date: 'Apr 4, 2026', meal: 'Breakfast', dish: 'Smoothie bowl', type: 'request', feedback: 'Asked if we can add cinnamon to the oatmeal on other days. Says it helps with taste without sugar.', reporter: 'Elena', response: 'Approved. Cinnamon added to oatmeal recipe. Also beneficial for glucose control.' },
            { id: 4, date: 'Apr 2, 2026', meal: 'Snacks', dish: 'Apple slices + almonds', type: 'positive', feedback: 'Reports this snack keeps her satisfied until dinner. No blood sugar spikes.', reporter: 'Nurse Martinez', response: null },
            { id: 5, date: 'Mar 30, 2026', meal: 'Dinner', dish: 'Pasta primavera', type: 'negative', feedback: 'Found the whole wheat pasta texture too heavy. Left 40% on plate.', reporter: 'Kitchen staff', response: 'Switched to brown rice pasta which has softer texture. Will monitor acceptance.' },
        ],
        evolution: [
            { period: 'Intake', weight: 64.5, bmi: 24.1, appetite: 7, calories: 1580, protein: 58, date: 'Dec 18, 2025', notes: 'Baseline assessment. Slightly underweight protein intake. Appetite moderate. Blood glucose fasting: 142 mg/dL.' },
            { period: 'M1', weight: 64.2, bmi: 24.0, appetite: 7, calories: 1600, protein: 62, date: 'Jan 18, 2026', notes: 'Weight stable. Protein intake improved with dietary counseling. Glucose fasting: 132 mg/dL. HbA1c: 7.1%.' },
            { period: 'M2', weight: 64.0, bmi: 23.9, appetite: 8, calories: 1630, protein: 68, date: 'Feb 18, 2026', notes: 'Appetite improving. Meal adherence increasing. Glucose control improving. Fasting: 125 mg/dL.' },
            { period: 'M3', weight: 64.1, bmi: 24.0, appetite: 8, calories: 1640, protein: 72, date: 'Mar 18, 2026', notes: 'Excellent compliance. Weight very stable. Protein target nearly met. HbA1c: 6.8%. Fasting glucose: 118 mg/dL.' },
            { period: 'M4', weight: 64.2, bmi: 24.1, appetite: 9, calories: 1650, protein: 75, date: 'Apr 5, 2026', notes: 'Best metrics yet. Appetite score 9/10. Protein target met. Glucose well-controlled. Diet modifications working excellently.' },
        ],
    },
    2: {
        menuMatrix: [
            { day: 'Monday', breakfast: { meal: 'Oat milk porridge + banana', status: 'validated', calories: 340, protein: 10, carbs: 55, fat: 8, fiber: 6, tags: ['Lactose-free', 'Anti-inflammatory'], notes: 'Oat milk base. Banana and cinnamon topping.' }, lunch: { meal: 'Grilled fish tacos (corn)', status: 'validated', calories: 430, protein: 30, carbs: 40, fat: 16, fiber: 5, tags: ['Lactose-free', 'Omega-3'], notes: 'Cod fish. Corn tortillas. Avocado, cabbage slaw.' }, dinner: { meal: 'Chicken curry with rice', status: 'validated', calories: 460, protein: 32, carbs: 48, fat: 14, fiber: 4, tags: ['Lactose-free', 'Anti-inflammatory'], notes: 'Coconut milk curry. Turmeric, ginger. Brown rice.' }, snacks: { meal: 'Trail mix + orange', status: 'validated', calories: 200, protein: 6, carbs: 30, fat: 8, fiber: 4, tags: ['Lactose-free'], notes: 'Dried fruit and nut mix (no dairy). 1 orange.' } },
            { day: 'Tuesday', breakfast: { meal: 'Toast + avocado + egg', status: 'validated', calories: 380, protein: 16, carbs: 32, fat: 22, fiber: 8, tags: ['Lactose-free', 'Anti-inflammatory'], notes: 'Sourdough toast. Half avocado. Poached egg.' }, lunch: { meal: 'Pasta Carbonara', status: 'conflict', calories: 520, protein: 22, carbs: 58, fat: 22, fiber: 3, tags: [], notes: 'CONFLICT: Contains parmesan and cream. Needs lactose-free substitution.', conflictDetail: 'Traditional recipe contains heavy cream and parmesan cheese. Carlos is lactose intolerant. Must substitute with lactose-free cream and nutritional yeast or aged parmesan (very low lactose).' }, dinner: { meal: 'Herb roasted chicken + potatoes', status: 'validated', calories: 450, protein: 34, carbs: 38, fat: 16, fiber: 4, tags: ['Lactose-free'], notes: 'Roasted chicken thigh. Herb potatoes with olive oil (no butter).' }, snacks: { meal: 'Rice cakes + almond butter', status: 'validated', calories: 180, protein: 6, carbs: 22, fat: 10, fiber: 2, tags: ['Lactose-free'], notes: '2 rice cakes with 1 tbsp almond butter.' } },
            { day: 'Wednesday', breakfast: { meal: 'Fruit smoothie (coconut yogurt)', status: 'validated', calories: 300, protein: 8, carbs: 45, fat: 10, fiber: 4, tags: ['Lactose-free', 'Probiotic'], notes: 'Coconut yogurt, banana, mango, spinach.' }, lunch: { meal: 'Minestrone soup + crusty bread', status: 'validated', calories: 390, protein: 14, carbs: 55, fat: 12, fiber: 10, tags: ['Lactose-free', 'Anti-inflammatory'], notes: 'Bean and vegetable soup. No cheese garnish. Sourdough bread.' }, dinner: { meal: 'Salmon teriyaki + stir-fry veg', status: 'validated', calories: 440, protein: 36, carbs: 32, fat: 18, fiber: 5, tags: ['Lactose-free', 'Omega-3', 'Anti-inflammatory'], notes: 'Wild salmon. Light teriyaki. Mixed stir-fry vegetables.' }, snacks: { meal: 'Dark chocolate + banana', status: 'validated', calories: 190, protein: 3, carbs: 32, fat: 8, fiber: 3, tags: ['Lactose-free'], notes: '2 squares 85% dark chocolate. 1 banana.' } },
            { day: 'Thursday', breakfast: { meal: 'Scrambled tofu + mushrooms', status: 'validated', calories: 320, protein: 20, carbs: 18, fat: 18, fiber: 4, tags: ['Lactose-free', 'Anti-inflammatory', 'Plant-based'], notes: 'Tofu scramble with turmeric. Sauteed mushrooms and spinach.' }, lunch: { meal: 'Chicken & avocado wrap', status: 'validated', calories: 420, protein: 28, carbs: 38, fat: 18, fiber: 6, tags: ['Lactose-free'], notes: 'Whole wheat wrap. Grilled chicken, avocado, lettuce, tomato.' }, dinner: { meal: 'Beef stir-fry + noodles', status: 'validated', calories: 470, protein: 30, carbs: 50, fat: 16, fiber: 4, tags: ['Lactose-free', 'Iron-rich'], notes: 'Lean beef strips. Rice noodles. Vegetables. Soy-ginger sauce.' }, snacks: { meal: 'Coconut yogurt + berries', status: 'validated', calories: 170, protein: 4, carbs: 28, fat: 6, fiber: 3, tags: ['Lactose-free', 'Probiotic'], notes: 'Plain coconut yogurt. Mixed berries.' } },
            { day: 'Friday', breakfast: { meal: 'Buckwheat pancakes + maple', status: 'validated', calories: 360, protein: 10, carbs: 58, fat: 10, fiber: 4, tags: ['Lactose-free'], notes: 'Buckwheat flour pancakes (no milk). Real maple syrup.' }, lunch: { meal: 'Shrimp & quinoa bowl', status: 'validated', calories: 410, protein: 30, carbs: 42, fat: 14, fiber: 6, tags: ['Lactose-free', 'Anti-inflammatory'], notes: 'Grilled shrimp. Quinoa. Roasted vegetables. Lemon tahini dressing.' }, dinner: { meal: 'Lamb chops + roasted veg', status: 'validated', calories: 480, protein: 36, carbs: 28, fat: 24, fiber: 5, tags: ['Lactose-free', 'Iron-rich'], notes: 'Herb-crusted lamb. Roasted root vegetables. Olive oil.' }, snacks: { meal: 'Apple + sunflower seeds', status: 'validated', calories: 180, protein: 5, carbs: 28, fat: 8, fiber: 5, tags: ['Lactose-free'], notes: '1 apple. 2 tbsp sunflower seeds.' } },
        ],
        restrictions: [
            { id: 1, allergen: 'Dairy / Lactose', severity: 'critical', items: ['Milk', 'Cheese', 'Cream', 'Butter', 'Ice cream', 'Whey protein'], status: 'active', notes: 'Diagnosed lactose intolerance. GI symptoms within 30 min of dairy ingestion. Use oat milk, coconut yogurt, lactose-free alternatives. Aged hard cheeses in very small amounts may be tolerated.', lastReviewed: 'Apr 2, 2026' },
            { id: 2, allergen: 'High-sodium foods', severity: 'moderate', items: ['Canned soups', 'Processed meats', 'Soy sauce (regular)'], status: 'active', notes: 'Arthritis management -- reduce inflammatory triggers. Use low-sodium soy sauce, fresh ingredients where possible. Daily sodium target: <1500mg.', lastReviewed: 'Apr 2, 2026' },
        ],
        mealAdherence: [
            { week: 'W1-2', breakfast: 80, lunch: 72, dinner: 78, snacks: 82, overall: 78 },
            { week: 'W3-4', breakfast: 82, lunch: 75, dinner: 80, snacks: 85, overall: 80 },
            { week: 'W5-6', breakfast: 85, lunch: 78, dinner: 82, snacks: 88, overall: 83 },
            { week: 'W7-8', breakfast: 85, lunch: 82, dinner: 85, snacks: 88, overall: 85 },
        ],
        feedback: [
            { id: 1, date: 'Apr 5, 2026', meal: 'Lunch', dish: 'Pasta Carbonara', type: 'negative', feedback: 'Stomach discomfort after eating. Suspects dairy in the carbonara sauce despite being told it was modified.', reporter: 'Carlos', response: 'URGENT: Kitchen confirmed regular cream was used by mistake. Substitution protocol reinforced with kitchen staff. Apology delivered.' },
            { id: 2, date: 'Apr 4, 2026', meal: 'Dinner', dish: 'Salmon teriyaki', type: 'positive', feedback: 'Really enjoyed the teriyaki sauce. Said it is one of the best dinners he has had here.', reporter: 'Nurse Garcia', response: null },
            { id: 3, date: 'Apr 3, 2026', meal: 'Breakfast', dish: 'Scrambled tofu', type: 'neutral', feedback: 'Ate about 70% of it. Said the texture is OK but he misses scrambled eggs. Asked if eggs are lactose-free.', reporter: 'Kitchen staff', response: 'Eggs are naturally lactose-free. Switching Thu breakfast to real scrambled eggs with vegetables. Tofu option remains available.' },
            { id: 4, date: 'Apr 1, 2026', meal: 'Snacks', dish: 'Coconut yogurt + berries', type: 'positive', feedback: 'Likes the coconut yogurt alternative. Prefers it over soy yogurt tried previously.', reporter: 'Carlos', response: 'Coconut yogurt set as default probiotic snack option.' },
        ],
        evolution: [
            { period: 'Intake', weight: 78.5, bmi: 25.2, appetite: 6, calories: 1680, protein: 60, date: 'Jan 8, 2026', notes: 'Mild overweight. Appetite moderate -- GI discomfort from unmanaged lactose intolerance was suppressing intake. Joint pain affecting meal enjoyment.' },
            { period: 'M1', weight: 78.2, bmi: 25.1, appetite: 7, calories: 1750, protein: 65, date: 'Feb 8, 2026', notes: 'Weight stable. Appetite improved after lactose elimination. GI symptoms resolved. Starting anti-inflammatory diet modifications.' },
            { period: 'M2', weight: 78.0, bmi: 25.0, appetite: 7, calories: 1780, protein: 68, date: 'Mar 8, 2026', notes: 'Slight weight loss. Anti-inflammatory diet well-accepted. Reports less joint stiffness in mornings. Omega-3 supplementation started.' },
            { period: 'M3', weight: 77.8, bmi: 24.9, appetite: 8, calories: 1800, protein: 72, date: 'Apr 5, 2026', notes: 'Good trajectory. Appetite improving steadily. Protein target nearly met. Anti-inflammatory markers improved per lab work. One dairy incident (kitchen error) caused GI setback.' },
        ],
    },
    3: {
        menuMatrix: [
            { day: 'Monday', breakfast: { meal: 'Fortified porridge + cream', status: 'pending', calories: 420, protein: 16, carbs: 52, fat: 18, fiber: 4, tags: ['High calorie', 'Fortified'], notes: 'Calorie-boosted porridge with full-fat milk and cream. Honey topping. PENDING: Maria refused breakfast 3 days last week.' }, lunch: { meal: 'Chicken pot pie', status: 'validated', calories: 520, protein: 24, carbs: 48, fat: 26, fiber: 4, tags: ['High calorie', 'Comfort food'], notes: 'Single-serve pot pie. Comfort food approach to encourage intake.' }, dinner: { meal: 'Mashed potato + gravy + beef', status: 'validated', calories: 480, protein: 28, carbs: 42, fat: 22, fiber: 3, tags: ['High calorie', 'Easy to eat'], notes: 'Soft textures preferred. Extra butter in mash for calories.' }, snacks: { meal: 'Nutritional supplement shake', status: 'validated', calories: 350, protein: 20, carbs: 40, fat: 12, fiber: 2, tags: ['Fortified', 'Supplement'], notes: 'Ensure Plus or equivalent. Chocolate flavor preferred. Critical for calorie goals.' } },
            { day: 'Tuesday', breakfast: { meal: 'French toast + fruit compote', status: 'pending', calories: 400, protein: 12, carbs: 55, fat: 16, fiber: 3, tags: ['High calorie'], notes: 'PENDING: Breakfast refusal pattern continues. Nurse to offer at 9:30 AM instead of 7:30 AM as Maria sleeps late.' }, lunch: { meal: 'Cream of mushroom soup + bread', status: 'validated', calories: 380, protein: 12, carbs: 42, fat: 20, fiber: 4, tags: ['Easy to eat', 'Comfort food'], notes: 'Cream-based soup for extra calories. Warm crusty bread.' }, dinner: { meal: 'Pasta alfredo with chicken', status: 'validated', calories: 540, protein: 28, carbs: 52, fat: 24, fiber: 3, tags: ['High calorie', 'Comfort food'], notes: 'Full cream alfredo. Shredded chicken for ease of eating.' }, snacks: { meal: 'Ice cream + cookies', status: 'validated', calories: 320, protein: 6, carbs: 45, fat: 14, fiber: 1, tags: ['High calorie', 'Morale food'], notes: 'Comfort/pleasure food to boost intake and mood. Vanilla ice cream preferred.' } },
            { day: 'Wednesday', breakfast: { meal: 'Scrambled eggs + cheese toast', status: 'validated', calories: 450, protein: 24, carbs: 30, fat: 26, fiber: 2, tags: ['High protein', 'High calorie'], notes: 'Extra cheese for calories. Butter on toast. This is her best-accepted breakfast.' }, lunch: { meal: 'Beef stew (extra broth)', status: 'validated', calories: 440, protein: 26, carbs: 38, fat: 20, fiber: 5, tags: ['Iron-rich', 'Easy to eat'], notes: 'Extra broth for easier consumption. Soft vegetables.' }, dinner: { meal: 'Shepherd pie', status: 'validated', calories: 500, protein: 24, carbs: 48, fat: 24, fiber: 4, tags: ['High calorie', 'Comfort food'], notes: 'Traditional recipe. Buttery mashed potato topping.' }, snacks: { meal: 'Banana + peanut butter', status: 'validated', calories: 280, protein: 8, carbs: 35, fat: 14, fiber: 4, tags: ['High calorie', 'Energy-dense'], notes: '1 banana with 2 tbsp peanut butter. Good acceptance.' } },
            { day: 'Thursday', breakfast: { meal: 'Pancakes + maple syrup', status: 'pending', calories: 440, protein: 10, carbs: 68, fat: 14, fiber: 2, tags: ['High calorie'], notes: 'PENDING: Breakfast time adjustment trial. Offered at 9:30 AM.' }, lunch: { meal: 'Grilled cheese + tomato soup', status: 'validated', calories: 460, protein: 18, carbs: 42, fat: 26, fiber: 4, tags: ['Comfort food', 'High calorie'], notes: 'Double cheese sandwich. Creamy tomato soup. Well-accepted combination.' }, dinner: { meal: 'Fish & chips', status: 'validated', calories: 520, protein: 28, carbs: 50, fat: 24, fiber: 3, tags: ['High calorie', 'Comfort food'], notes: 'Battered cod. Oven chips. Tartar sauce. Peas.' }, snacks: { meal: 'Hot chocolate + biscuits', status: 'validated', calories: 300, protein: 8, carbs: 42, fat: 12, fiber: 1, tags: ['High calorie', 'Morale food'], notes: 'Full-fat milk hot chocolate. 3 digestive biscuits. Served warm at 3 PM.' } },
            { day: 'Friday', breakfast: { meal: 'Croissant + jam + juice', status: 'pending', calories: 380, protein: 6, carbs: 52, fat: 18, fiber: 1, tags: ['High calorie'], notes: 'PENDING: Breakfast attendance inconsistent. 4th pending breakfast this week.' }, lunch: { meal: 'Chicken noodle soup + roll', status: 'validated', calories: 360, protein: 20, carbs: 40, fat: 12, fiber: 3, tags: ['Easy to eat', 'Comfort food'], notes: 'Classic comfort soup. Easy to consume even with low appetite.' }, dinner: { meal: 'Lasagna', status: 'validated', calories: 540, protein: 26, carbs: 48, fat: 28, fiber: 3, tags: ['High calorie', 'Comfort food'], notes: 'Meat and bechamel lasagna. High calorie density.' }, snacks: { meal: 'Yogurt parfait + granola', status: 'validated', calories: 280, protein: 10, carbs: 38, fat: 10, fiber: 3, tags: ['High calorie', 'Probiotic'], notes: 'Full-fat vanilla yogurt. Granola. Honey drizzle.' } },
        ],
        restrictions: [
            { id: 1, allergen: 'None identified', severity: 'none', items: [], status: 'clear', notes: 'No food allergies or intolerances identified. Primary nutritional concern is insufficient caloric intake due to depression-related appetite loss. Current intake averaging 55-65% of prescribed meals.', lastReviewed: 'Apr 1, 2026' },
        ],
        mealAdherence: [
            { week: 'W1-2', breakfast: 55, lunch: 70, dinner: 68, snacks: 72, overall: 66 },
            { week: 'W3-4', breakfast: 52, lunch: 68, dinner: 65, snacks: 70, overall: 64 },
            { week: 'W5-6', breakfast: 58, lunch: 72, dinner: 70, snacks: 75, overall: 69 },
            { week: 'W7-8', breakfast: 55, lunch: 70, dinner: 68, snacks: 72, overall: 66 },
            { week: 'W9-10', breakfast: 50, lunch: 65, dinner: 62, snacks: 68, overall: 61 },
            { week: 'W11-12', breakfast: 45, lunch: 62, dinner: 58, snacks: 65, overall: 57 },
            { week: 'W13-14', breakfast: 40, lunch: 58, dinner: 55, snacks: 60, overall: 53 },
            { week: 'W15', breakfast: 35, lunch: 60, dinner: 55, snacks: 62, overall: 53 },
        ],
        feedback: [
            { id: 1, date: 'Apr 6, 2026', meal: 'Breakfast', dish: 'French toast', type: 'negative', feedback: 'Refused breakfast again. Stayed in bed. Nurse reported Maria said she is not hungry and wants to be left alone.', reporter: 'Nurse Martinez', response: 'Escalated to psychology team. Breakfast time shifted to 9:30 AM trial. Small portions offered first.' },
            { id: 2, date: 'Apr 5, 2026', meal: 'Lunch', dish: 'Grilled cheese + tomato soup', type: 'positive', feedback: 'Ate about 80% of lunch. Said the soup was warming and comforting. Best intake this week.', reporter: 'Kitchen staff', response: 'Soup-based lunches seem most accepted. Increasing soup options.' },
            { id: 3, date: 'Apr 4, 2026', meal: 'Snacks', dish: 'Hot chocolate + biscuits', type: 'positive', feedback: 'Drank all the hot chocolate. Ate 2 of 3 biscuits. This is consistently her best-consumed snack.', reporter: 'Nurse Garcia', response: 'Hot chocolate added daily at 3 PM. Reliable calorie source.' },
            { id: 4, date: 'Apr 3, 2026', meal: 'Dinner', dish: 'Lasagna', type: 'neutral', feedback: 'Ate about 50% of the lasagna. Said it was tasty but she just could not eat more.', reporter: 'Kitchen staff', response: 'Portion sizes reduced to avoid food waste and psychological pressure of large plates.' },
            { id: 5, date: 'Apr 1, 2026', meal: 'Breakfast', dish: 'Porridge', type: 'negative', feedback: 'Third consecutive breakfast refusal. Weight has dropped 0.8 kg this month.', reporter: 'Nurse Martinez', response: 'CRITICAL: Nutritional supplement shake now mandatory if breakfast refused. Doctor and psychologist notified.' },
        ],
        evolution: [
            { period: 'Intake', weight: 52.8, bmi: 21.2, appetite: 5, calories: 1200, protein: 42, date: 'Nov 25, 2025', notes: 'Underweight risk. Low appetite due to depression. Protein intake significantly below target (goal: 1.2g/kg/day = 63g). BMI borderline.' },
            { period: 'M1', weight: 52.5, bmi: 21.1, appetite: 5, calories: 1180, protein: 40, date: 'Dec 25, 2025', notes: 'Weight declining. Appetite unchanged. Caloric intake below 1200 target. Supplement shakes introduced.' },
            { period: 'M2', weight: 52.8, bmi: 21.2, appetite: 6, calories: 1280, protein: 48, date: 'Jan 25, 2026', notes: 'Brief improvement. Music therapy and social dining helped. Weight recovered slightly. Protein improved with shakes.' },
            { period: 'M3', weight: 52.4, bmi: 21.0, appetite: 5, calories: 1220, protein: 44, date: 'Feb 25, 2026', notes: 'Plateau broken negatively. Grief episode at W14 caused appetite crash. Weight dropped below intake level.' },
            { period: 'M4', weight: 51.6, bmi: 20.7, appetite: 4, calories: 1100, protein: 38, date: 'Mar 25, 2026', notes: 'CRITICAL: Weight loss 1.2 kg from baseline. BMI approaching underweight (20.0). Appetite score 4/10. Caloric intake 73% of target. Protein dangerously low. Fortified meals and supplements mandatory. Psych consult urgent.' },
        ],
    },
    4: {
        menuMatrix: [
            { day: 'Monday', breakfast: { meal: 'Egg white omelet + spinach', status: 'validated', calories: 280, protein: 24, carbs: 12, fat: 14, fiber: 3, tags: ['Low calorie', 'High protein', 'Mediterranean'], notes: 'Egg whites with fresh spinach and tomato. Whole grain toast.' }, lunch: { meal: 'Mediterranean salad + grilled chicken', status: 'validated', calories: 420, protein: 36, carbs: 22, fat: 22, fiber: 6, tags: ['Mediterranean', 'High protein'], notes: 'Large salad. Grilled chicken breast. Olive oil and lemon dressing. Olives, sun-dried tomatoes.' }, dinner: { meal: 'Baked cod + roasted vegetables', status: 'validated', calories: 380, protein: 34, carbs: 28, fat: 14, fiber: 6, tags: ['Low calorie', 'Mediterranean', 'Omega-3'], notes: 'Cod fillet with herbs. Roasted Mediterranean vegetables (eggplant, zucchini, peppers).' }, snacks: { meal: 'Carrot sticks + tzatziki', status: 'validated', calories: 120, protein: 4, carbs: 14, fat: 5, fiber: 3, tags: ['Low calorie'], notes: 'Raw carrot and cucumber sticks. Light tzatziki.' } },
            { day: 'Tuesday', breakfast: { meal: 'Greek yogurt + chia seeds', status: 'validated', calories: 250, protein: 18, carbs: 22, fat: 10, fiber: 8, tags: ['High protein', 'Mediterranean'], notes: 'Plain Greek yogurt. Chia seeds. Small handful of berries.' }, lunch: { meal: 'Lentil and vegetable soup', status: 'validated', calories: 350, protein: 18, carbs: 48, fat: 8, fiber: 14, tags: ['High fiber', 'Mediterranean', 'Plant-based'], notes: 'Green lentil soup with carrots, celery, onion. Whole grain bread.' }, dinner: { meal: 'Grilled turkey breast + sweet potato', status: 'validated', calories: 400, protein: 36, carbs: 35, fat: 12, fiber: 5, tags: ['High protein', 'Low fat'], notes: 'Lean turkey breast. Baked sweet potato. Steamed green beans.' }, snacks: { meal: 'Apple + 5 almonds', status: 'validated', calories: 130, protein: 3, carbs: 22, fat: 5, fiber: 4, tags: ['Low calorie'], notes: '1 small apple. 5 raw almonds. Portion-controlled.' } },
            { day: 'Wednesday', breakfast: { meal: 'Avocado toast (half)', status: 'validated', calories: 260, protein: 8, carbs: 28, fat: 14, fiber: 7, tags: ['Mediterranean', 'Heart-healthy'], notes: 'Half avocado on whole grain toast. Lemon juice. Cherry tomatoes.' }, lunch: { meal: 'Grilled sardines + salad', status: 'validated', calories: 380, protein: 28, carbs: 18, fat: 22, fiber: 4, tags: ['Mediterranean', 'Omega-3', 'Heart-healthy'], notes: 'Fresh sardines grilled with herbs. Large green salad.' }, dinner: { meal: 'Vegetable ratatouille + couscous', status: 'validated', calories: 360, protein: 12, carbs: 52, fat: 12, fiber: 8, tags: ['Mediterranean', 'Plant-based', 'Low calorie'], notes: 'Traditional ratatouille. Whole wheat couscous. Light olive oil.' }, snacks: { meal: 'Handful of walnuts', status: 'validated', calories: 140, protein: 4, carbs: 4, fat: 14, fiber: 2, tags: ['Omega-3', 'Heart-healthy'], notes: '7 walnut halves. Heart-healthy fats.' } },
            { day: 'Thursday', breakfast: { meal: 'Smoothie (spinach + banana)', status: 'validated', calories: 240, protein: 12, carbs: 38, fat: 6, fiber: 5, tags: ['Low calorie', 'Nutrient-dense'], notes: 'Spinach, banana, protein powder, almond milk. No added sugar.' }, lunch: { meal: 'Chickpea & feta salad', status: 'validated', calories: 390, protein: 16, carbs: 42, fat: 18, fiber: 10, tags: ['Mediterranean', 'High fiber'], notes: 'Chickpeas, feta, cucumber, tomato, red onion. Lemon-herb dressing.' }, dinner: { meal: 'Grilled chicken souvlaki + salad', status: 'conflict', calories: 560, protein: 38, carbs: 42, fat: 24, fiber: 4, tags: [], notes: 'CONFLICT: Pita bread and tzatziki pushing calories above daily target. Need portion adjustment.', conflictDetail: 'Original recipe with 2 pita breads and generous tzatziki exceeds caloric target for dinner by 160 kcal. Reduce to 1 pita and use light tzatziki to bring within range.' }, snacks: { meal: 'Cherry tomatoes + olives', status: 'validated', calories: 100, protein: 2, carbs: 8, fat: 7, fiber: 2, tags: ['Mediterranean', 'Low calorie'], notes: '8 cherry tomatoes. 6 black olives.' } },
            { day: 'Friday', breakfast: { meal: 'Poached eggs + grilled tomato', status: 'validated', calories: 220, protein: 16, carbs: 8, fat: 14, fiber: 2, tags: ['Low calorie', 'High protein'], notes: '2 poached eggs. Grilled tomato halves. Fresh herbs.' }, lunch: { meal: 'Tabbouleh + grilled halloumi', status: 'validated', calories: 400, protein: 18, carbs: 38, fat: 20, fiber: 6, tags: ['Mediterranean'], notes: 'Bulgur wheat tabbouleh. Grilled halloumi (portion controlled). Fresh mint.' }, dinner: { meal: 'Sea bass + asparagus', status: 'validated', calories: 370, protein: 36, carbs: 16, fat: 18, fiber: 4, tags: ['Mediterranean', 'Low calorie', 'Omega-3'], notes: 'Pan-seared sea bass. Grilled asparagus. Lemon butter sauce (light).' }, snacks: { meal: 'Orange + dark chocolate (1 sq)', status: 'validated', calories: 120, protein: 2, carbs: 24, fat: 4, fiber: 4, tags: ['Low calorie', 'Antioxidant'], notes: '1 orange. 1 square 85% dark chocolate. Treats within plan.' } },
        ],
        restrictions: [
            { id: 1, allergen: 'Excess calories / portion sizes', severity: 'high', items: ['Fried foods', 'Sugary desserts', 'Sugary drinks', 'Large bread portions', 'Butter/cream sauces'], status: 'active', notes: 'Obesity management. Caloric target 1800 kcal/day. Weight loss goal: 5 kg over 16 weeks. Portion control critical. Mediterranean diet framework with caloric restriction.', lastReviewed: 'Apr 4, 2026' },
            { id: 2, allergen: 'High sodium', severity: 'moderate', items: ['Cured meats', 'Pickled foods', 'Processed snacks', 'Added salt'], status: 'active', notes: 'Hypertension management. Daily sodium target: <1500 mg. Herbs and spices for flavoring instead of salt. DASH-compatible selections.', lastReviewed: 'Apr 4, 2026' },
        ],
        mealAdherence: [
            { week: 'W1-2', breakfast: 78, lunch: 72, dinner: 70, snacks: 65, overall: 71 },
            { week: 'W3', breakfast: 82, lunch: 78, dinner: 75, snacks: 72, overall: 77 },
        ],
        feedback: [
            { id: 1, date: 'Apr 6, 2026', meal: 'Dinner', dish: 'Grilled chicken souvlaki', type: 'request', feedback: 'Roberto asked for a larger portion. Explained that portion control is part of his plan. He understood but was disappointed.', reporter: 'Nurse Garcia', response: 'Added extra salad as a free side to increase volume without calories. Roberto seemed satisfied with this compromise.' },
            { id: 2, date: 'Apr 5, 2026', meal: 'Snacks', dish: 'Between-meal snacking', type: 'negative', feedback: 'Roberto was seen eating cookies brought by a family member during afternoon visit. Estimated 300 extra kcal.', reporter: 'Nurse Martinez', response: 'Family counseling session scheduled to discuss diet plan importance. Approved snack list provided to family.' },
            { id: 3, date: 'Apr 3, 2026', meal: 'Lunch', dish: 'Mediterranean salad', type: 'positive', feedback: 'Said the Mediterranean flavors remind him of his mothers cooking. Very happy with this meal.', reporter: 'Roberto', response: 'Emotional connection to food noted. Mediterranean meals prioritized in his rotation.' },
        ],
        evolution: [
            { period: 'Intake', weight: 95.8, bmi: 32.4, appetite: 8, calories: 2200, protein: 70, date: 'Mar 4, 2026', notes: 'Obese (BMI 32.4). High appetite. Caloric intake estimated 2200 kcal/day at admission (exceeding 1800 target by 22%). Weight loss program initiated. BP: 148/92.' },
            { period: 'M1', weight: 94.5, bmi: 32.0, appetite: 7, calories: 1900, protein: 75, date: 'Apr 4, 2026', notes: '1.3 kg lost in first month. Caloric intake reduced to ~1900 (target: 1800). Appetite adjusting. Protein intake improved. BP: 142/88. Snacking from family visits remains challenge.' },
        ],
    },
}

/* ================================================================
   NUTRITION ALERTS
   ================================================================ */

const NUTRITION_ALERTS = [
    { id: 1, severity: 'critical', area: 'Weight Loss', message: 'Maria Silva: Weight dropped to 51.6 kg (BMI 20.7) -- approaching underweight threshold. Caloric intake only 73% of target.', time: '2d ago', resident: 'Maria Silva' },
    { id: 2, severity: 'critical', area: 'Appetite', message: 'Maria Silva: Breakfast refusal pattern -- 4 of 5 breakfasts refused this week. Appetite score 4/10.', time: '1d ago', resident: 'Maria Silva' },
    { id: 3, severity: 'critical', area: 'Allergen', message: 'Carlos Mendez: Dairy exposure incident -- kitchen used regular cream in carbonara. GI symptoms reported.', time: '3d ago', resident: 'Carlos Mendez' },
    { id: 4, severity: 'warning', area: 'Portion Control', message: 'Roberto Diaz: Family brought cookies during visit -- estimated 300 extra kcal. Family counseling needed.', time: '3d ago', resident: 'Roberto Diaz' },
    { id: 5, severity: 'warning', area: 'Menu Conflict', message: 'Roberto Diaz: Thu dinner souvlaki exceeds caloric target by 160 kcal. Portion adjustment needed.', time: '4d ago', resident: 'Roberto Diaz' },
    { id: 6, severity: 'info', area: 'Progress', message: 'Elena Rodriguez: HbA1c improved to 6.8%. Dietary glucose control working well.', time: '3d ago', resident: 'Elena Rodriguez' },
    { id: 7, severity: 'info', area: 'Milestone', message: 'Roberto Diaz: Lost 1.3 kg in first month on Mediterranean diet -- on track for 5 kg target.', time: '4d ago', resident: 'Roberto Diaz' },
]

/* ================================================================
   SHOPPING LIST (facility-wide)
   ================================================================ */

const SHOPPING_LIST = [
    { item: 'Chicken breast', qty: '12 kg', category: 'Protein', status: 'needed', priority: 'high' },
    { item: 'Wild salmon fillets', qty: '6 kg', category: 'Protein', status: 'needed', priority: 'high' },
    { item: 'Cod fillets', qty: '4 kg', category: 'Protein', status: 'needed', priority: 'medium' },
    { item: 'Lean ground turkey', qty: '3 kg', category: 'Protein', status: 'needed', priority: 'medium' },
    { item: 'Eggs (free-range)', qty: '5 dozen', category: 'Protein', status: 'stocked', priority: 'low' },
    { item: 'Fresh vegetables (assorted)', qty: '20 kg', category: 'Produce', status: 'needed', priority: 'high' },
    { item: 'Fresh fruit (seasonal)', qty: '15 kg', category: 'Produce', status: 'needed', priority: 'high' },
    { item: 'Leafy greens (spinach, kale)', qty: '5 kg', category: 'Produce', status: 'needed', priority: 'high' },
    { item: 'Brown rice', qty: '8 kg', category: 'Grains', status: 'stocked', priority: 'low' },
    { item: 'Quinoa', qty: '3 kg', category: 'Grains', status: 'needed', priority: 'medium' },
    { item: 'Whole wheat pasta', qty: '4 kg', category: 'Grains', status: 'stocked', priority: 'low' },
    { item: 'Oat milk', qty: '12 L', category: 'Dairy Alt.', status: 'needed', priority: 'high' },
    { item: 'Coconut yogurt', qty: '6 kg', category: 'Dairy Alt.', status: 'needed', priority: 'high' },
    { item: 'Lactose-free milk', qty: '6 L', category: 'Dairy Alt.', status: 'needed', priority: 'medium' },
    { item: 'Olive oil (extra virgin)', qty: '5 L', category: 'Pantry', status: 'stocked', priority: 'low' },
    { item: 'Ensure Plus (chocolate)', qty: '24 units', category: 'Supplements', status: 'needed', priority: 'critical' },
    { item: 'Ensure Plus (vanilla)', qty: '12 units', category: 'Supplements', status: 'needed', priority: 'high' },
    { item: 'Protein powder (unflavored)', qty: '2 kg', category: 'Supplements', status: 'stocked', priority: 'low' },
    { item: 'Almonds (raw)', qty: '2 kg', category: 'Pantry', status: 'needed', priority: 'medium' },
    { item: 'Chia seeds', qty: '1 kg', category: 'Pantry', status: 'stocked', priority: 'low' },
]

/* ================================================================
   HELPERS
   ================================================================ */

const MEAL_ICONS = { Breakfast: Sun, Lunch: Utensils, Dinner: Moon, Snacks: Cookie }
const MEAL_STATUS = {
    validated: { bg: 'bg-emerald-100 text-emerald-700', label: 'OK' },
    pending: { bg: 'bg-amber-100 text-amber-700', label: 'Pending' },
    conflict: { bg: 'bg-red-100 text-red-700', label: 'Conflict' },
}
const FEEDBACK_STYLE = {
    positive: { bg: 'border-emerald-100 bg-emerald-50/50', icon: ThumbsUp, iconColor: 'text-emerald-500' },
    negative: { bg: 'border-red-100 bg-red-50/50', icon: ThumbsDown, iconColor: 'text-red-500' },
    neutral: { bg: 'border-gray-100 bg-gray-50', icon: MessageCircle, iconColor: 'text-gray-400' },
    request: { bg: 'border-blue-100 bg-blue-50/50', icon: MessageSquare, iconColor: 'text-blue-500' },
}

/* ================================================================
   PROFILE
   ================================================================ */
const PROFILE_STORAGE_KEY = 'longevai-nutritionist-profile'
const DEFAULT_PROFILE = {
    name: 'Dr. Carmen Delgado',
    title: 'Chief Clinical Nutritionist',
    license: 'RD-7314-NUT',
    specialization: 'Geriatric Nutrition, Therapeutic Diets & Nutritional Monitoring',
    email: 'c.delgado@amatistalife.com',
    phone: '+34 611 567 890',
    office: 'Building A, Nutrition Office 102',
    institution: 'Amatista Life -- LongevAI Center',
    education: 'PhD, Clinical Nutrition (Universidad Autonoma de Madrid)',
    certifications: 'Registered Dietitian, Geriatric Nutrition Specialist',
    bio: 'Over 14 years of experience in clinical nutrition for older adults. Expert in therapeutic diet design, nutritional evolution tracking, and cross-validated meal planning for complex multi-morbidity profiles.',
    shiftStart: '07:00',
    shiftEnd: '15:00',
    yearsExperience: 14,
    residentsManaged: 4,
}
function loadProfile() {
    try { const d = localStorage.getItem(PROFILE_STORAGE_KEY); return d ? { ...DEFAULT_PROFILE, ...JSON.parse(d) } : DEFAULT_PROFILE } catch { return DEFAULT_PROFILE }
}
function saveProfile(p) { localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(p)) }

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function NutritionistDashboard() {
    const [activeSection, setActiveSection] = useState('menu')
    const [selectedResident, setSelectedResident] = useState(RESIDENTS_LIST[0])
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [selectedRestriction, setSelectedRestriction] = useState(null)
    const [selectedFeedback, setSelectedFeedback] = useState(null)
    const [selectedEvolution, setSelectedEvolution] = useState(null)

    /* Profile */
    const [profile, setProfile] = useState(() => loadProfile())
    const [editingProfile, setEditingProfile] = useState(false)

    const [clinicalNotes, setClinicalNotes] = useState(() => {
        try { return JSON.parse(localStorage.getItem('nutri_clinical_notes') || '{}') } catch { return {} }
    })
    const [acknowledgedItems, setAcknowledgedItems] = useState(() => {
        try { return JSON.parse(localStorage.getItem('nutri_ack_items') || '{}') } catch { return {} }
    })

    const persistNotes = (next) => { setClinicalNotes(next); localStorage.setItem('nutri_clinical_notes', JSON.stringify(next)) }
    const persistAck = (next) => { setAcknowledgedItems(next); localStorage.setItem('nutri_ack_items', JSON.stringify(next)) }
    const handleAddNote = (key, text) => {
        const existing = clinicalNotes[key] || []
        persistNotes({ ...clinicalNotes, [key]: [...existing, { text, timestamp: new Date().toLocaleString() }] })
    }
    const handleAcknowledge = (key) => { persistAck({ ...acknowledgedItems, [key]: new Date().toLocaleString() }) }

    const data = RESIDENT_DATA[selectedResident.id]
    const latestAdherence = data.mealAdherence.length > 0 ? data.mealAdherence[data.mealAdherence.length - 1].overall : 0
    const latestEvolution = data.evolution.length > 0 ? data.evolution[data.evolution.length - 1] : null
    const pendingCount = data.menuMatrix.reduce((sum, day) => sum + ['breakfast', 'lunch', 'dinner', 'snacks'].filter(m => day[m].status === 'pending').length, 0)
    const conflictCount = data.menuMatrix.reduce((sum, day) => sum + ['breakfast', 'lunch', 'dinner', 'snacks'].filter(m => day[m].status === 'conflict').length, 0)

    return (
        <DashboardShell
            roleId="nutritionist"
            roleTag="Nutritionist -- Daily Monitoring"
            title="Smart Nutrition Control Panel"
            badges={[]}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            notifications={NUTRITION_ALERTS}
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
                        <span>Diet: <strong className="text-brand-dark">{selectedResident.dietType}</strong></span>
                        <span>Target: <strong className="text-brand-dark">{selectedResident.caloricTarget} kcal</strong></span>
                        <span>Week: <strong className="text-brand-dark">{selectedResident.week}/16</strong></span>
                    </div>
                    <div className="ml-auto flex items-center gap-2 flex-wrap">
                        {conflictCount > 0 && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border bg-red-50 border-red-200">
                                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                                <span className="text-[10px] font-bold uppercase text-red-700">{conflictCount} Conflict{conflictCount > 1 ? 's' : ''}</span>
                            </div>
                        )}
                        {pendingCount > 0 && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border bg-amber-50 border-amber-200">
                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                                <span className="text-[10px] font-bold uppercase text-amber-700">{pendingCount} Pending</span>
                            </div>
                        )}
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${latestAdherence >= 80 ? 'bg-emerald-50 border-emerald-200' : latestAdherence >= 60 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                            <Activity className={`w-3.5 h-3.5 ${latestAdherence >= 80 ? 'text-emerald-600' : latestAdherence >= 60 ? 'text-amber-600' : 'text-red-600'}`} />
                            <span className={`text-[10px] font-bold uppercase ${latestAdherence >= 80 ? 'text-emerald-700' : latestAdherence >= 60 ? 'text-amber-700' : 'text-red-700'}`}>{latestAdherence}% Adherence</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SECTION: MENU MATRIX ── */}
            {activeSection === 'menu' && (
                <SectionCard title="Weekly Menu Matrix" icon={ClipboardList} subtitle={selectedResident.name + ' -- ' + selectedResident.dietType + ' diet'}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 px-3 font-semibold text-brand-muted">Day</th>
                                    {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map(meal => (
                                        <th key={meal} className="text-center py-2 px-3 font-semibold text-brand-muted">
                                            <div className="flex items-center justify-center gap-1">{meal}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.menuMatrix.map((row, i) => (
                                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                                        <td className="py-2 px-3 font-semibold text-brand-dark text-[11px]">{row.day}</td>
                                        {['breakfast', 'lunch', 'dinner', 'snacks'].map(mealKey => {
                                            const meal = row[mealKey]
                                            const st = MEAL_STATUS[meal.status]
                                            return (
                                                <td key={mealKey} className="py-1.5 px-2 text-center">
                                                    <button
                                                        onClick={() => setSelectedMeal({ ...meal, day: row.day, mealType: mealKey })}
                                                        className="w-full p-2 rounded-lg border border-gray-100 bg-white hover:shadow-md transition-all cursor-pointer text-left"
                                                    >
                                                        <p className="text-[11px] font-medium text-brand-dark line-clamp-1">{meal.meal}</p>
                                                        <div className="flex items-center justify-between mt-1">
                                                            <span className="text-[9px] text-brand-muted">{meal.calories} kcal</span>
                                                            <span className={`text-[9px] font-bold uppercase px-1 py-0.5 rounded ${st.bg}`}>{st.label}</span>
                                                        </div>
                                                    </button>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex gap-3 mt-3 flex-wrap text-[10px] text-brand-muted">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Validated</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Pending review</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Restriction conflict</span>
                        <span className="ml-auto">Click any meal for full nutritional detail</span>
                    </div>
                </SectionCard>
            )}

            {/* ── SECTION: RESTRICTIONS ── */}
            {activeSection === 'restrictions' && (
                <SectionCard title="Restriction Cross-Validator" icon={ShieldCheck} subtitle={selectedResident.name + ' -- dietary restrictions and allergen checks'}>
                    {data.restrictions.length === 0 || data.restrictions[0].severity === 'none' ? (
                        <div className="text-center py-8">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                            <p className="text-sm font-medium text-brand-dark">No dietary restrictions identified</p>
                            <p className="text-xs text-brand-muted mt-1">{data.restrictions[0]?.notes || 'This resident has no known allergies or restrictions.'}</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {data.restrictions.map(r => {
                                const ackKey = 'restr:' + selectedResident.id + ':' + r.id
                                return (
                                    <div
                                        key={r.id}
                                        onClick={() => setSelectedRestriction(r)}
                                        className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ${r.severity === 'critical' ? 'border-red-200 bg-red-50/50' : r.severity === 'high' ? 'border-amber-200 bg-amber-50/50' : 'border-gray-200 bg-gray-50'}`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <AlertTriangle className={`w-4 h-4 ${r.severity === 'critical' ? 'text-red-500' : r.severity === 'high' ? 'text-amber-500' : 'text-gray-400'}`} />
                                                <span className="text-sm font-semibold text-brand-dark">{r.allergen}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {acknowledgedItems[ackKey] && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                                                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${r.severity === 'critical' ? 'bg-red-100 text-red-700' : r.severity === 'high' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {r.severity}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {r.items.map((item, j) => (
                                                <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-brand-muted">{item}</span>
                                            ))}
                                        </div>
                                        <p className="text-xs text-brand-muted line-clamp-2">{r.notes}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-[10px] text-brand-muted">Last reviewed: {r.lastReviewed}</span>
                                            <ChevronRight className="w-4 h-4 text-gray-300" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </SectionCard>
            )}

            {/* ── SECTION: MEAL ADHERENCE ── */}
            {activeSection === 'adherence' && (
                <div className="space-y-6">
                    <SectionCard title="Meal Adherence Tracker" icon={BarChart3} subtitle={selectedResident.name + ' -- % of prescribed meals consumed'}>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.mealAdherence} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" domain={[0, 100]} />
                                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v) => [v + '%']} />
                                    <Legend wrapperStyle={{ fontSize: 10 }} />
                                    <ReferenceLine y={80} stroke="#d97706" strokeDasharray="4 4" label={{ value: 'Min Target 80%', fontSize: 9, fill: '#d97706', position: 'right' }} />
                                    <Bar dataKey="breakfast" fill="#F59E0B" name="Breakfast" radius={[3, 3, 0, 0]} />
                                    <Bar dataKey="lunch" fill="#4C4673" name="Lunch" radius={[3, 3, 0, 0]} />
                                    <Bar dataKey="dinner" fill="#6D8C8C" name="Dinner" radius={[3, 3, 0, 0]} />
                                    <Bar dataKey="snacks" fill="#7C3AED" name="Snacks" radius={[3, 3, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </SectionCard>

                    <SectionCard title="Overall Adherence Trend" icon={TrendingUp} subtitle="Combined meal adherence over time">
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.mealAdherence} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" domain={[0, 100]} />
                                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v) => [v + '%', 'Overall']} />
                                    <ReferenceLine y={80} stroke="#d97706" strokeDasharray="4 4" />
                                    <Line type="monotone" dataKey="overall" stroke="#4C4673" strokeWidth={2} dot={{ r: 4, fill: '#4C4673' }} name="Overall %" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-[11px] text-brand-muted mt-2">Adherence based on nursing-confirmed meal consumption rates. Below 80% triggers follow-up.</p>
                    </SectionCard>
                </div>
            )}

            {/* ── SECTION: FEEDBACK ── */}
            {activeSection === 'feedback' && (
                <SectionCard title="Post-Meal Feedback Log" icon={MessageSquare} subtitle={selectedResident.name + ' -- ' + data.feedback.length + ' entries'}>
                    <div className="space-y-2">
                        {data.feedback.map(f => {
                            const style = FEEDBACK_STYLE[f.type] || FEEDBACK_STYLE.neutral
                            const FIcon = style.icon
                            return (
                                <div
                                    key={f.id}
                                    onClick={() => setSelectedFeedback(f)}
                                    className={`p-3 rounded-xl border cursor-pointer hover:shadow-md transition-all ${style.bg}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <FIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${style.iconColor}`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-[10px] font-semibold text-brand-muted">{f.date} -- {f.meal}</span>
                                                <span className="text-[10px] font-semibold text-brand-dark">{f.dish}</span>
                                                <span className={`text-[9px] font-bold uppercase px-1 py-0.5 rounded ${f.type === 'positive' ? 'bg-emerald-100 text-emerald-700' : f.type === 'negative' ? 'bg-red-100 text-red-700' : f.type === 'request' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{f.type}</span>
                                            </div>
                                            <p className="text-xs text-brand-muted mt-1 line-clamp-2">{f.feedback}</p>
                                            {f.response && <p className="text-[10px] text-blue-600 mt-1 line-clamp-1">Response: {f.response}</p>}
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </SectionCard>
            )}

            {/* ── SECTION: EVOLUTION ── */}
            {activeSection === 'evolution' && (
                <div className="space-y-6">
                    <SectionCard title="Nutritional Evolution" icon={Scale} subtitle={selectedResident.name + ' -- weight, BMI, appetite, and caloric tracking'}>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.evolution} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="period" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" />
                                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} labelFormatter={(label, payload) => {
                                        const item = payload?.[0]?.payload
                                        return item?.date ? label + ' | ' + item.date : label
                                    }} />
                                    <Legend wrapperStyle={{ fontSize: 10 }} />
                                    <Line type="monotone" dataKey="weight" stroke="#4C4673" strokeWidth={2} name="Weight (kg)" dot={{ r: 4 }} />
                                    <Line type="monotone" dataKey="bmi" stroke="#6D8C8C" strokeWidth={2} name="BMI" dot={{ r: 4 }} />
                                    <Line type="monotone" dataKey="appetite" stroke="#E8A84A" strokeWidth={2} name="Appetite (/10)" dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </SectionCard>

                    <SectionCard title="Assessment Timeline" icon={FileText} subtitle="Click any assessment for full nutritional snapshot">
                        <div className="space-y-2">
                            {data.evolution.map((ev, i) => {
                                const prevWeight = i > 0 ? data.evolution[i - 1].weight : ev.weight
                                const wChange = ev.weight - prevWeight
                                return (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedEvolution(ev)}
                                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:shadow-md cursor-pointer transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs flex-shrink-0">
                                            {ev.period}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-brand-dark">{ev.date}</span>
                                                <span className="text-[10px] text-brand-muted">{ev.weight}kg | BMI {ev.bmi} | {ev.calories} kcal | {ev.protein}g protein</span>
                                            </div>
                                            <p className="text-xs text-brand-muted line-clamp-1 mt-0.5">{ev.notes}</p>
                                        </div>
                                        {i > 0 && (
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                {wChange < 0 ? <TrendingDown className="w-3.5 h-3.5 text-amber-500" /> : wChange > 0 ? <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> : <Activity className="w-3.5 h-3.5 text-gray-400" />}
                                                <span className={`text-[10px] font-semibold ${wChange < 0 ? 'text-amber-600' : wChange > 0 ? 'text-emerald-600' : 'text-gray-400'}`}>
                                                    {wChange > 0 ? '+' : ''}{wChange.toFixed(1)}kg
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

            {/* ── SECTION: SHOPPING LIST ── */}
            {activeSection === 'shopping' && (
                <SectionCard title="Facility Shopping List" icon={ShoppingCart} subtitle="Weekly optimized list -- all residents combined">
                    {(() => {
                        const categories = [...new Set(SHOPPING_LIST.map(i => i.category))]
                        return (
                            <div className="space-y-4">
                                {categories.map(cat => (
                                    <div key={cat}>
                                        <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">{cat}</p>
                                        <div className="space-y-1.5">
                                            {SHOPPING_LIST.filter(i => i.category === cat).map((item, j) => (
                                                <div key={j} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                                                    <Circle className={`w-2.5 h-2.5 fill-current flex-shrink-0 ${item.status === 'stocked' ? 'text-emerald-500' : item.priority === 'critical' ? 'text-red-500' : item.priority === 'high' ? 'text-amber-500' : 'text-blue-400'}`} />
                                                    <span className="text-sm font-medium text-brand-dark flex-1">{item.item}</span>
                                                    <span className="text-xs text-brand-muted">{item.qty}</span>
                                                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${item.status === 'stocked' ? 'bg-emerald-100 text-emerald-700' : item.priority === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {item.status === 'stocked' ? 'In Stock' : item.priority}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                    <p className="text-[10px] text-brand-muted">
                                        {SHOPPING_LIST.filter(i => i.status === 'needed').length} items needed -- {SHOPPING_LIST.filter(i => i.status === 'stocked').length} in stock
                                    </p>
                                    <div className="flex gap-2">
                                        <button className="text-xs font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors px-3 py-1.5 border border-brand-primary/20 rounded-lg">Export CSV</button>
                                        <button className="text-xs font-semibold text-white bg-brand-primary hover:bg-brand-primary-dark transition-colors px-3 py-1.5 rounded-lg">Generate Order</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })()}
                </SectionCard>
            )}

            {/* ── MODALS ── */}
            {selectedMeal && (
                <Modal onClose={() => setSelectedMeal(null)}>
                    <MealDetailModal
                        meal={selectedMeal}
                        resident={selectedResident.name}
                        residentId={selectedResident.id}
                        notes={clinicalNotes['meal:' + selectedResident.id + ':' + selectedMeal.day + ':' + selectedMeal.mealType] || []}
                        onAddNote={(text) => handleAddNote('meal:' + selectedResident.id + ':' + selectedMeal.day + ':' + selectedMeal.mealType, text)}
                        onClose={() => setSelectedMeal(null)}
                    />
                </Modal>
            )}
            {selectedRestriction && (
                <Modal onClose={() => setSelectedRestriction(null)}>
                    <RestrictionDetailModal
                        restriction={selectedRestriction}
                        resident={selectedResident.name}
                        residentId={selectedResident.id}
                        notes={clinicalNotes['restr:' + selectedResident.id + ':' + selectedRestriction.id] || []}
                        acknowledgedAt={acknowledgedItems['restr:' + selectedResident.id + ':' + selectedRestriction.id] || null}
                        onAddNote={(text) => handleAddNote('restr:' + selectedResident.id + ':' + selectedRestriction.id, text)}
                        onAcknowledge={() => handleAcknowledge('restr:' + selectedResident.id + ':' + selectedRestriction.id)}
                        onClose={() => setSelectedRestriction(null)}
                    />
                </Modal>
            )}
            {selectedFeedback && (
                <Modal onClose={() => setSelectedFeedback(null)}>
                    <FeedbackDetailModal
                        entry={selectedFeedback}
                        resident={selectedResident.name}
                        residentId={selectedResident.id}
                        notes={clinicalNotes['fb:' + selectedResident.id + ':' + selectedFeedback.id] || []}
                        onAddNote={(text) => handleAddNote('fb:' + selectedResident.id + ':' + selectedFeedback.id, text)}
                        onClose={() => setSelectedFeedback(null)}
                    />
                </Modal>
            )}
            {selectedEvolution && (
                <Modal onClose={() => setSelectedEvolution(null)}>
                    <EvolutionDetailModal
                        entry={selectedEvolution}
                        resident={selectedResident.name}
                        caloricTarget={selectedResident.caloricTarget}
                        onClose={() => setSelectedEvolution(null)}
                    />
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
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20">{profile.license}</span>
                                        <span className="text-[10px] text-brand-muted flex items-center gap-1"><Briefcase className="w-3 h-3" /> {profile.yearsExperience} years experience</span>
                                        <span className="text-[10px] text-brand-muted flex items-center gap-1"><Users className="w-3 h-3" /> {profile.residentsManaged} residents</span>
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
        setText(''); setShowForm(false); setJustSaved(true)
        setTimeout(() => setJustSaved(false), 2500)
    }
    return (
        <div>
            <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">
                Clinical Notes {notes.length > 0 && <span className="text-brand-primary">({notes.length})</span>}
            </p>
            {notes.length > 0 && (
                <div className="space-y-2 mb-3">
                    {notes.map((note, i) => (
                        <div key={i} className="p-3 rounded-lg bg-purple-50/60 border border-purple-200/60" style={{ animation: 'modalIn 0.2s ease-out' }}>
                            <div className="flex items-start gap-2">
                                <FileText className="w-3.5 h-3.5 text-purple-500 mt-0.5 flex-shrink-0" />
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
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center mb-3"><p className="text-xs text-brand-muted">No clinical notes added yet</p></div>
            )}
            {showForm && (
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-2 mb-3" style={{ animation: 'modalIn 0.2s ease-out' }}>
                    <textarea autoFocus rows={3} value={text} onChange={e => setText(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent resize-none text-brand-dark placeholder-brand-muted/50"
                        placeholder="Enter dietary observation, meal modification, or follow-up note..." />
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
                    <p className="text-xs font-medium text-emerald-700">Clinical note saved successfully</p>
                </div>
            )}
            <button onClick={() => setShowForm(true)} disabled={showForm} className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${showForm ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-default' : 'bg-white text-brand-dark border-gray-200 hover:bg-gray-50'}`}>
                <Plus className="w-3.5 h-3.5" /> Add Clinical Note
            </button>
        </div>
    )
}

function MetricBox({ label, value, color }) {
    const colors = {
        emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        amber: 'bg-amber-50 border-amber-200 text-amber-700',
        red: 'bg-red-50 border-red-200 text-red-700',
        gray: 'bg-gray-50 border-gray-200 text-gray-700',
        brand: 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary',
        blue: 'bg-blue-50 border-blue-200 text-blue-700',
    }
    return (
        <div className={`p-3 rounded-xl border text-center ${colors[color] || colors.gray}`}>
            <p className="text-[10px] uppercase font-semibold tracking-wider opacity-70">{label}</p>
            <p className="text-lg font-bold mt-0.5">{value}</p>
        </div>
    )
}

/* ================================================================
   MODAL CONTENTS
   ================================================================ */

function MealDetailModal({ meal, resident, residentId, notes, onAddNote, onClose }) {
    const mealLabel = meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)
    const MealIcon = MEAL_ICONS[mealLabel] || Utensils
    const st = MEAL_STATUS[meal.status]
    const totalMacros = meal.protein + meal.carbs + meal.fat
    const proteinPct = totalMacros > 0 ? Math.round((meal.protein / totalMacros) * 100) : 0
    const carbsPct = totalMacros > 0 ? Math.round((meal.carbs / totalMacros) * 100) : 0
    const fatPct = totalMacros > 0 ? Math.round((meal.fat / totalMacros) * 100) : 0

    return (
        <div>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${meal.status === 'conflict' ? 'bg-red-50 border-red-200' : meal.status === 'pending' ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-3">
                    <MealIcon className={`w-5 h-5 ${meal.status === 'conflict' ? 'text-red-500' : 'text-brand-accent'}`} />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{meal.meal}</h3>
                        <p className="text-[11px] text-brand-muted">{resident} -- {meal.day} {mealLabel}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${st.bg}`}>{st.label}</span>
                    {meal.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">{tag}</span>
                    ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <MetricBox label="Calories" value={meal.calories + ' kcal'} color="brand" />
                    <MetricBox label="Protein" value={meal.protein + 'g'} color="emerald" />
                    <MetricBox label="Carbs" value={meal.carbs + 'g'} color="amber" />
                    <MetricBox label="Fat" value={meal.fat + 'g'} color="red" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <MetricBox label="Fiber" value={meal.fiber + 'g'} color="blue" />
                    <MetricBox label="Macro Split" value={proteinPct + '/' + carbsPct + '/' + fatPct} color="gray" />
                </div>

                {/* Macro bar */}
                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Macro Distribution</p>
                    <div className="w-full h-4 rounded-full overflow-hidden flex">
                        <div className="bg-emerald-500 h-full" style={{ width: proteinPct + '%' }} title={'Protein ' + proteinPct + '%'} />
                        <div className="bg-amber-400 h-full" style={{ width: carbsPct + '%' }} title={'Carbs ' + carbsPct + '%'} />
                        <div className="bg-red-400 h-full" style={{ width: fatPct + '%' }} title={'Fat ' + fatPct + '%'} />
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] text-brand-muted">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Protein {proteinPct}%</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Carbs {carbsPct}%</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" /> Fat {fatPct}%</span>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Meal Notes</p>
                    <div className={`p-3 rounded-lg border ${meal.status === 'conflict' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>
                        <p className={`text-sm leading-relaxed ${meal.status === 'conflict' ? 'text-red-800' : 'text-brand-dark'}`}>{meal.notes}</p>
                    </div>
                </div>

                {meal.conflictDetail && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                        <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-red-700 uppercase tracking-wider">Conflict Detail</p>
                                <p className="text-sm text-red-800 leading-relaxed mt-1">{meal.conflictDetail}</p>
                            </div>
                        </div>
                    </div>
                )}

                <NoteSection notes={notes} onAddNote={onAddNote} />
            </div>
        </div>
    )
}

function RestrictionDetailModal({ restriction, resident, residentId, notes, acknowledgedAt, onAddNote, onAcknowledge, onClose }) {
    return (
        <div>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${restriction.severity === 'critical' ? 'bg-red-50 border-red-200' : restriction.severity === 'high' ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-3">
                    <ShieldCheck className={`w-5 h-5 ${restriction.severity === 'critical' ? 'text-red-500' : restriction.severity === 'high' ? 'text-amber-500' : 'text-brand-accent'}`} />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{restriction.allergen}</h3>
                        <p className="text-[11px] text-brand-muted">{resident} -- dietary restriction</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${restriction.severity === 'critical' ? 'bg-red-100 text-red-700' : restriction.severity === 'high' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{restriction.severity} severity</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${restriction.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>{restriction.status}</span>
                </div>

                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Restricted Items</p>
                    <div className="flex flex-wrap gap-1.5">
                        {restriction.items.map((item, i) => (
                            <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-red-50 border border-red-200 text-red-700">{item}</span>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Clinical Notes</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{restriction.notes}</p>
                    </div>
                </div>

                <p className="text-[10px] text-brand-muted">Last reviewed: {restriction.lastReviewed}</p>

                <NoteSection notes={notes} onAddNote={onAddNote} />

                {acknowledgedAt && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2" style={{ animation: 'modalIn 0.2s ease-out' }}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-emerald-700">Restriction reviewed and acknowledged</p>
                            <p className="text-[10px] text-emerald-600 mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3" /> {acknowledgedAt}</p>
                        </div>
                    </div>
                )}

                <button onClick={onAcknowledge} disabled={!!acknowledgedAt} className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${acknowledgedAt ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-brand-primary text-white hover:bg-brand-primary-dark'}`}>
                    <CheckCircle2 className="w-4 h-4" /> {acknowledgedAt ? 'Acknowledged' : 'Acknowledge Restriction'}
                </button>
            </div>
        </div>
    )
}

function FeedbackDetailModal({ entry, resident, residentId, notes, onAddNote, onClose }) {
    const style = FEEDBACK_STYLE[entry.type] || FEEDBACK_STYLE.neutral
    const FIcon = style.icon

    return (
        <div>
            <div className="px-6 py-4 border-b bg-gray-50 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FIcon className={`w-5 h-5 ${style.iconColor}`} />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">{entry.dish}</h3>
                        <p className="text-[11px] text-brand-muted">{resident} -- {entry.date} -- {entry.meal}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${entry.type === 'positive' ? 'bg-emerald-100 text-emerald-700' : entry.type === 'negative' ? 'bg-red-100 text-red-700' : entry.type === 'request' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{entry.type}</span>
                    <span className="text-[10px] text-brand-muted">Reported by: {entry.reporter}</span>
                </div>

                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Feedback</p>
                    <div className={`p-3 rounded-lg border ${style.bg}`}>
                        <p className="text-sm text-brand-dark leading-relaxed">{entry.feedback}</p>
                    </div>
                </div>

                {entry.response && (
                    <div>
                        <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Response / Action Taken</p>
                        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                            <p className="text-sm text-blue-800 leading-relaxed">{entry.response}</p>
                        </div>
                    </div>
                )}

                {!entry.response && (
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800">No response recorded yet. Add a clinical note with your follow-up action.</p>
                    </div>
                )}

                <NoteSection notes={notes} onAddNote={onAddNote} />
            </div>
        </div>
    )
}

function EvolutionDetailModal({ entry, resident, caloricTarget, onClose }) {
    const caloriesPct = caloricTarget > 0 ? Math.round((entry.calories / caloricTarget) * 100) : 0

    return (
        <div>
            <div className="px-6 py-4 border-b bg-gray-50 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Scale className="w-5 h-5 text-brand-accent" />
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">Nutritional Assessment -- {entry.period}</h3>
                        <p className="text-[11px] text-brand-muted">{resident} -- {entry.date}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/50 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <MetricBox label="Weight" value={entry.weight + ' kg'} color="brand" />
                    <MetricBox label="BMI" value={entry.bmi.toString()} color={entry.bmi < 20 ? 'red' : entry.bmi < 25 ? 'emerald' : entry.bmi < 30 ? 'amber' : 'red'} />
                    <MetricBox label="Appetite" value={entry.appetite + '/10'} color={entry.appetite >= 7 ? 'emerald' : entry.appetite >= 5 ? 'amber' : 'red'} />
                    <MetricBox label="Calories" value={entry.calories + ' kcal'} color={caloriesPct >= 90 ? 'emerald' : caloriesPct >= 70 ? 'amber' : 'red'} />
                    <MetricBox label="Protein" value={entry.protein + 'g'} color="blue" />
                    <MetricBox label="Cal. Target" value={caloriesPct + '%'} color={caloriesPct >= 90 ? 'emerald' : caloriesPct >= 70 ? 'amber' : 'red'} />
                </div>

                <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Assessment Notes</p>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <p className="text-sm text-brand-dark leading-relaxed">{entry.notes}</p>
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
        { key: 'name', label: 'Full Name', type: 'text' }, { key: 'title', label: 'Title / Role', type: 'text' },
        { key: 'license', label: 'License Number', type: 'text' }, { key: 'specialization', label: 'Specialization', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' }, { key: 'phone', label: 'Phone', type: 'tel' },
        { key: 'office', label: 'Office Location', type: 'text' }, { key: 'institution', label: 'Institution', type: 'text' },
        { key: 'education', label: 'Education', type: 'text' }, { key: 'certifications', label: 'Certifications', type: 'text' },
        { key: 'shiftStart', label: 'Shift Start', type: 'time' }, { key: 'shiftEnd', label: 'Shift End', type: 'time' },
    ]
    return (
        <div>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-brand-light">
                <div className="flex items-center gap-3">
                    <Pencil className="w-5 h-5 text-brand-accent" />
                    <div><h3 className="text-sm font-bold text-brand-dark">Edit Profile</h3><p className="text-[11px] text-brand-muted">Update your personal and professional information</p></div>
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
                    <label className="block text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-1">Bio</label>
                    <textarea rows={3} value={form.bio || ''} onChange={e => update('bio', e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent resize-none text-brand-dark" />
                </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 text-brand-dark hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={() => onSave(form)} className="flex items-center gap-2 px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors"><Save className="w-4 h-4" /> Save Changes</button>
            </div>
        </div>
    )
}
