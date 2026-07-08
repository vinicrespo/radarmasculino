// ========================================
// CULINA - DATA LAYER
// ========================================

// Recipe Modules
const MODULES = [
    {
        id: 'breakfast',
        title: 'Healthy Breakfast',
        description: 'Start your day with energizing, nutrient-packed breakfast recipes designed for a healthier lifestyle.',
        icon: 'sunrise',
        color: 'amber',
        emoji: '🌅',
        totalLessons: 6,
        lessons: [
            { id: 1, title: 'Avocado Toast with Poached Egg', duration: '12 min', completed: true },
            { id: 2, title: 'Acai Smoothie Bowl', duration: '8 min', completed: true },
            { id: 3, title: 'Greek Yogurt Parfait', duration: '6 min', completed: true },
            { id: 4, title: 'Overnight Oats with Berries', duration: '10 min', completed: false },
            { id: 5, title: 'Spinach & Feta Omelette', duration: '14 min', completed: false },
            { id: 6, title: 'Banana Protein Pancakes', duration: '15 min', completed: false }
        ]
    },
    {
        id: 'main-courses',
        title: 'Gourmet Main Courses',
        description: 'Master the art of creating restaurant-quality main dishes right in your own kitchen.',
        icon: 'utensils',
        color: 'blue',
        emoji: '🍽️',
        totalLessons: 6,
        lessons: [
            { id: 1, title: 'Grilled Salmon with Herb Butter', duration: '22 min', completed: true },
            { id: 2, title: 'Chicken Tikka Masala', duration: '28 min', completed: true },
            { id: 3, title: 'Beef Stroganoff', duration: '25 min', completed: false },
            { id: 4, title: 'Pan-Seared Duck Breast', duration: '20 min', completed: false },
            { id: 5, title: 'Shrimp Scampi Linguine', duration: '18 min', completed: false },
            { id: 6, title: 'Lamb Rack with Rosemary', duration: '30 min', completed: false }
        ]
    },
    {
        id: 'desserts',
        title: 'Decadent Desserts',
        description: 'Indulge in luxurious desserts ranging from classic French pastries to modern molecular creations.',
        icon: 'cake-slice',
        color: 'purple',
        emoji: '🍰',
        totalLessons: 5,
        lessons: [
            { id: 1, title: 'Dark Chocolate Mousse', duration: '18 min', completed: true },
            { id: 2, title: 'Crème Brûlée', duration: '20 min', completed: false },
            { id: 3, title: 'Tiramisu Classic', duration: '15 min', completed: false },
            { id: 4, title: 'Lemon Tart with Meringue', duration: '25 min', completed: false },
            { id: 5, title: 'Panna Cotta with Berry Coulis', duration: '12 min', completed: false }
        ]
    },
    {
        id: 'vegan',
        title: 'Plant-Based Kitchen',
        description: 'Discover vibrant, flavorful plant-based recipes that prove vegan food can be extraordinary.',
        icon: 'leaf',
        color: 'green',
        emoji: '🌿',
        totalLessons: 5,
        lessons: [
            { id: 1, title: 'Quinoa Buddha Bowl', duration: '14 min', completed: true },
            { id: 2, title: 'Cauliflower Steak', duration: '16 min', completed: true },
            { id: 3, title: 'Thai Coconut Curry', duration: '20 min', completed: false },
            { id: 4, title: 'Stuffed Bell Peppers', duration: '22 min', completed: false },
            { id: 5, title: 'Mushroom Risotto', duration: '25 min', completed: false }
        ]
    },
    {
        id: 'keto',
        title: 'Keto & Low-Carb',
        description: 'High-fat, low-carb recipes to keep you in ketosis while enjoying delicious meals.',
        icon: 'flame',
        color: 'red',
        emoji: '🔥',
        totalLessons: 5,
        lessons: [
            { id: 1, title: 'Keto Bacon Cheeseburger Bowl', duration: '15 min', completed: false },
            { id: 2, title: 'Zucchini Noodles Alfredo', duration: '12 min', completed: false },
            { id: 3, title: 'Fathead Pizza', duration: '20 min', completed: false },
            { id: 4, title: 'Butter Chicken (Keto)', duration: '25 min', completed: false },
            { id: 5, title: 'Avocado Egg Cups', duration: '10 min', completed: false }
        ]
    },
    {
        id: 'baking',
        title: 'Artisan Baking',
        description: 'From sourdough to croissants, learn professional baking techniques at home.',
        icon: 'croissant',
        color: 'amber',
        emoji: '🥐',
        totalLessons: 5,
        lessons: [
            { id: 1, title: 'Sourdough Bread from Scratch', duration: '35 min', completed: false },
            { id: 2, title: 'French Croissants', duration: '40 min', completed: false },
            { id: 3, title: 'Cinnamon Rolls', duration: '28 min', completed: false },
            { id: 4, title: 'Focaccia with Herbs', duration: '22 min', completed: false },
            { id: 5, title: 'Brioche Bread', duration: '30 min', completed: false }
        ]
    }
];

// Kitchen Tools
const TOOLS = [
    { id: 'macro-calc', name: 'Macro Calculator', desc: 'Calculate your daily macronutrients based on your fitness goals, weight, and activity level.', icon: 'calculator', color: 'amber' },
    { id: 'portion-scaler', name: 'Portion Scaler', desc: 'Scale any recipe up or down. Perfect for cooking for crowds or meal prepping for one.', icon: 'scale', color: 'blue' },
    { id: 'meal-planner', name: 'Meal Planner', desc: 'Plan your weekly meals and automatically generate a grocery shopping list.', icon: 'calendar', color: 'green' },
    { id: 'unit-converter', name: 'Unit Converter', desc: 'Convert between metric and imperial units. Cups to grams, Fahrenheit to Celsius, and more.', icon: 'arrow-left-right', color: 'purple' }
];

// Client data (mutable, admin can update this)
const clientData = {
    name: '',
    email: '',
    purchaseDate: '',
    country: ''
};

// Tracking data — dynamically generated from purchase date
let trackingData = [];

// Template of activity (day offset from purchase, hour, minute, second, action, type, details)
const ACTIVITY_TEMPLATE = [
    // Day 1 (1 day after purchase) — first login, explores breakfast
    { dayOffset: 1, h: 9, m: 15, s: 22, action: 'Login', type: 'login', details: 'First login after purchase' },
    { dayOffset: 1, h: 9, m: 20, s: 10, action: 'Accessed Module', type: 'module', details: 'Healthy Breakfast — Avocado Toast with Poached Egg' },
    { dayOffset: 1, h: 9, m: 35, s: 45, action: 'Accessed Module', type: 'module', details: 'Healthy Breakfast — Acai Smoothie Bowl' },
    { dayOffset: 1, h: 10, m: 2, s: 33, action: 'Accessed Module', type: 'module', details: 'Healthy Breakfast — Greek Yogurt Parfait' },
    // Day 2 — main courses + tool
    { dayOffset: 2, h: 14, m: 10, s: 8, action: 'Login', type: 'login', details: 'User logged into the platform' },
    { dayOffset: 2, h: 14, m: 15, s: 30, action: 'Accessed Module', type: 'module', details: 'Gourmet Main Courses — Grilled Salmon with Herb Butter' },
    { dayOffset: 2, h: 14, m: 40, s: 12, action: 'Accessed Module', type: 'module', details: 'Gourmet Main Courses — Chicken Tikka Masala' },
    { dayOffset: 2, h: 15, m: 5, s: 0, action: 'Used Tool', type: 'tool', details: 'Macro Calculator — Calculated daily macros' },
    // Day 3 — vegan module + tool + favorite
    { dayOffset: 3, h: 8, m: 30, s: 0, action: 'Login', type: 'login', details: 'User logged into the platform' },
    { dayOffset: 3, h: 8, m: 35, s: 22, action: 'Accessed Module', type: 'module', details: 'Plant-Based Kitchen — Quinoa Buddha Bowl' },
    { dayOffset: 3, h: 9, m: 0, s: 44, action: 'Accessed Module', type: 'module', details: 'Plant-Based Kitchen — Cauliflower Steak' },
    { dayOffset: 3, h: 9, m: 20, s: 15, action: 'Used Tool', type: 'tool', details: 'Portion Scaler — Scaled Quinoa Bowl to 4 servings' },
    { dayOffset: 3, h: 9, m: 35, s: 0, action: 'Added Favorite', type: 'favorite', details: 'Saved "Quinoa Buddha Bowl" to favorites' },
    // Day 4 — desserts + converter + progress
    { dayOffset: 4, h: 19, m: 0, s: 0, action: 'Login', type: 'login', details: 'User logged into the platform' },
    { dayOffset: 4, h: 19, m: 8, s: 33, action: 'Accessed Module', type: 'module', details: 'Decadent Desserts — Dark Chocolate Mousse' },
    { dayOffset: 4, h: 19, m: 30, s: 10, action: 'Used Tool', type: 'tool', details: 'Unit Converter — Converted grams to cups' },
    { dayOffset: 4, h: 19, m: 45, s: 0, action: 'Viewed Progress', type: 'progress', details: 'Checked completion stats on My Progress page' },
    // Day 5 — meal planner + favorite
    { dayOffset: 5, h: 10, m: 0, s: 0, action: 'Login', type: 'login', details: 'User logged into the platform' },
    { dayOffset: 5, h: 10, m: 10, s: 22, action: 'Used Tool', type: 'tool', details: 'Meal Planner — Created a weekly meal plan' },
    { dayOffset: 5, h: 10, m: 30, s: 0, action: 'Added Favorite', type: 'favorite', details: 'Saved "Dark Chocolate Mousse" to favorites' }
];

function pad(n) { return String(n).padStart(2, '0'); }

function generateTrackingData(purchaseDateStr) {
    if (!purchaseDateStr) return [];
    const base = new Date(purchaseDateStr + 'T00:00:00');
    const fmtDate = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());

    // Early activity (days 1-5 after purchase)
    const early = ACTIVITY_TEMPLATE.map(t => {
        const d = new Date(base);
        d.setDate(d.getDate() + t.dayOffset);
        d.setHours(t.h, t.m, t.s, 0);
        const dateStr = fmtDate(d) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
        return { date: dateStr, action: t.action, type: t.type, details: t.details };
    });

    // Recent activity (yesterday and today) — only if today is at least 6 days after purchase
    const today = new Date();
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
    const daysSincePurchase = Math.floor((today - base) / (1000 * 60 * 60 * 24));

    const recent = [];
    if (daysSincePurchase >= 6) {
        // Yesterday
        recent.push({ date: fmtDate(yesterday) + ' 20:15:00', action: 'Login', type: 'login', details: 'User logged into the platform' });
        recent.push({ date: fmtDate(yesterday) + ' 20:22:18', action: 'Accessed Module', type: 'module', details: 'Keto & Low-Carb — Keto Bacon Cheeseburger Bowl' });
        recent.push({ date: fmtDate(yesterday) + ' 20:45:33', action: 'Used Tool', type: 'tool', details: 'Unit Converter — Converted ounces to grams' });
        // Today
        recent.push({ date: fmtDate(today) + ' 09:30:00', action: 'Login', type: 'login', details: 'User logged into the platform' });
        recent.push({ date: fmtDate(today) + ' 09:38:14', action: 'Accessed Module', type: 'module', details: 'Artisan Baking — Sourdough Bread from Scratch' });
        recent.push({ date: fmtDate(today) + ' 10:05:42', action: 'Viewed Progress', type: 'progress', details: 'Checked completion stats on My Progress page' });
    }

    return [...early, ...recent];
}

// Generate favorites dynamically too
let favorites = [];

function generateFavorites(purchaseDateStr) {
    if (!purchaseDateStr) return [];
    const base = new Date(purchaseDateStr + 'T00:00:00');
    const d1 = new Date(base); d1.setDate(d1.getDate() + 1);
    const d3 = new Date(base); d3.setDate(d3.getDate() + 3);
    const d4 = new Date(base); d4.setDate(d4.getDate() + 4);
    const fmt = (dt) => dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate());
    return [
        { module: 'Healthy Breakfast', recipe: 'Avocado Toast with Poached Egg', addedOn: fmt(d1) },
        { module: 'Plant-Based Kitchen', recipe: 'Quinoa Buddha Bowl', addedOn: fmt(d3) },
        { module: 'Decadent Desserts', recipe: 'Dark Chocolate Mousse', addedOn: fmt(d4) }
    ];
}
