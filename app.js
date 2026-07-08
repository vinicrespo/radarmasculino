// ========================================
// CULINA APP - MAIN APPLICATION LOGIC
// ========================================

let currentAdminTab = 'report';

function navigate(route, params) {
    const content = document.getElementById('main-content');
    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`[data-route="${route}"]`);
    if (activeLink) activeLink.classList.add('active');

    if (route === 'home') content.innerHTML = renderHome();
    else if (route === 'modules') content.innerHTML = renderModules();
    else if (route === 'module-detail') content.innerHTML = renderModuleDetail(params);
    else if (route === 'lesson') content.innerHTML = renderLesson(params);
    else if (route === 'tools') content.innerHTML = renderTools();
    else if (route === 'tool-detail') content.innerHTML = renderToolDetail(params);
    else if (route === 'favorites') content.innerHTML = renderFavorites();
    else if (route === 'progress') content.innerHTML = renderProgress();
    else if (route === 'admin') content.innerHTML = renderAdmin();
    else content.innerHTML = renderHome();

    lucide.createIcons();
    window.scrollTo(0, 0);
}

// NAV EVENTS
document.querySelectorAll('a[data-route]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        navigate(link.dataset.route);
    });
});

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// ===================== HOME =====================
function renderHome() {
    const totalLessons = MODULES.reduce((a, m) => a + m.totalLessons, 0);
    const completed = MODULES.reduce((a, m) => a + m.lessons.filter(l => l.completed).length, 0);
    return `<div class="fade-in">
        <h1 class="page-title">Welcome to Culina</h1>
        <p class="page-subtitle">Your premium destination for exquisite culinary experiences. Explore modules, master recipes, and track your progress.</p>
        <div class="grid-4" style="margin-bottom:32px">
            <div class="stat-card"><div class="stat-icon" style="background:var(--accent-glow);color:var(--accent)"><i data-lucide="book-open"></i></div><div><div class="stat-value">${MODULES.length}</div><div class="stat-label">Recipe Modules</div></div></div>
            <div class="stat-card"><div class="stat-icon" style="background:var(--success-bg);color:var(--success)"><i data-lucide="check-circle"></i></div><div><div class="stat-value">${completed}/${totalLessons}</div><div class="stat-label">Lessons Done</div></div></div>
            <div class="stat-card"><div class="stat-icon" style="background:var(--info-bg);color:var(--info)"><i data-lucide="wrench"></i></div><div><div class="stat-value">${TOOLS.length}</div><div class="stat-label">Kitchen Tools</div></div></div>
            <div class="stat-card"><div class="stat-icon" style="background:var(--danger-bg);color:var(--danger)"><i data-lucide="heart"></i></div><div><div class="stat-value">${favorites.length}</div><div class="stat-label">Favorites</div></div></div>
        </div>
        <h2 class="section-title"><i data-lucide="sparkles"></i> Featured Modules</h2>
        <div class="grid-3">${MODULES.slice(0, 3).map(m => moduleCard(m)).join('')}</div>
    </div>`;
}

function moduleCard(m) {
    const done = m.lessons.filter(l => l.completed).length;
    const pct = Math.round((done / m.totalLessons) * 100);
    return `<div class="card" onclick="navigate('module-detail','${m.id}')">
        <div class="card-icon ${m.color}"><i data-lucide="${m.icon}"></i></div>
        <h3>${m.title}</h3><p>${m.description}</p>
        <div class="card-meta"><span><i data-lucide="play-circle" style="width:14px;height:14px"></i> ${m.totalLessons} lessons</span><span><i data-lucide="check" style="width:14px;height:14px"></i> ${pct}%</span></div>
        <div class="progress-bar-container"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
    </div>`;
}

// ===================== MODULES =====================
function renderModules() {
    return `<div class="fade-in">
        <h1 class="page-title">Recipe Modules</h1>
        <p class="page-subtitle">Choose a module below to start learning delicious recipes step by step.</p>
        <div class="grid-3">${MODULES.map(m => moduleCard(m)).join('')}</div>
    </div>`;
}

// ===================== MODULE DETAIL =====================
function renderModuleDetail(moduleId) {
    const m = MODULES.find(x => x.id === moduleId);
    if (!m) return '<p>Module not found.</p>';
    const done = m.lessons.filter(l => l.completed).length;
    return `<div class="fade-in">
        <div class="module-header"><button class="back-btn" onclick="navigate('modules')"><i data-lucide="arrow-left"></i></button><div><h1 class="page-title" style="font-size:2rem;margin-bottom:0">${m.title}</h1><p class="page-subtitle" style="margin-bottom:0">${done} of ${m.totalLessons} lessons completed</p></div></div>
        <div class="module-banner">${m.emoji}</div>
        <h2 class="section-title">Lessons</h2>
        <div class="lesson-list">${m.lessons.map((l, i) => `
            <div class="lesson-item ${l.completed ? 'completed' : ''}" onclick="navigate('lesson','${m.id}|${l.id}')">
                <div class="lesson-number">${l.completed ? '✓' : i + 1}</div>
                <div class="lesson-info"><h4>${l.title}</h4><span>${l.duration}</span></div>
                <div class="lesson-status ${l.completed ? 'done' : ''}"><i data-lucide="${l.completed ? 'check-circle' : 'play-circle'}" style="width:16px;height:16px"></i> ${l.completed ? 'Completed' : 'Start'}</div>
            </div>`).join('')}
        </div>
    </div>`;
}

// ===================== LESSON =====================
function renderLesson(params) {
    const [moduleId, lessonId] = params.split('|');
    const m = MODULES.find(x => x.id === moduleId);
    if (!m) return '<p>Not found.</p>';
    const lesson = m.lessons.find(l => l.id == lessonId);
    if (!lesson) return '<p>Lesson not found.</p>';
    return `<div class="fade-in">
        <div class="module-header"><button class="back-btn" onclick="navigate('module-detail','${moduleId}')"><i data-lucide="arrow-left"></i></button><div><p class="page-subtitle" style="margin-bottom:0">${m.title}</p><h1 class="page-title" style="font-size:2rem;margin-bottom:0">${lesson.title}</h1></div></div>
        <div class="video-player"><button class="play-btn" onclick="this.innerHTML='Playing...';this.style.background='var(--success)'"><i data-lucide="play" style="width:28px;height:28px"></i></button><span>Duration: ${lesson.duration}</span></div>
        <div style="display:flex;gap:12px;margin-top:16px">
            <button class="btn btn-primary" onclick="markComplete('${moduleId}',${lesson.id})"><i data-lucide="check"></i> Mark as Complete</button>
            <button class="btn btn-secondary" onclick="navigate('module-detail','${moduleId}')"><i data-lucide="arrow-left"></i> Back to Module</button>
        </div>
    </div>`;
}

function markComplete(moduleId, lessonId) {
    const m = MODULES.find(x => x.id === moduleId);
    const l = m.lessons.find(x => x.id === lessonId);
    l.completed = true;
    navigate('module-detail', moduleId);
}

// ===================== TOOLS =====================
function renderTools() {
    return `<div class="fade-in">
        <h1 class="page-title">Kitchen Tools</h1>
        <p class="page-subtitle">Professional-grade tools to elevate your cooking game.</p>
        <div class="grid-2">${TOOLS.map(t => `
            <div class="card" onclick="navigate('tool-detail','${t.id}')">
                <div class="card-icon ${t.color}"><i data-lucide="${t.icon}"></i></div>
                <h3>${t.name}</h3><p>${t.desc}</p>
            </div>`).join('')}
        </div>
    </div>`;
}

// ===================== TOOL DETAIL =====================
function renderToolDetail(toolId) {
    const t = TOOLS.find(x => x.id === toolId);
    if (!t) return '<p>Tool not found.</p>';
    let body = '';
    if (toolId === 'macro-calc') body = macroCalcHTML();
    else if (toolId === 'portion-scaler') body = portionScalerHTML();
    else if (toolId === 'meal-planner') body = mealPlannerHTML();
    else if (toolId === 'unit-converter') body = unitConverterHTML();
    return `<div class="fade-in">
        <div class="module-header"><button class="back-btn" onclick="navigate('tools')"><i data-lucide="arrow-left"></i></button><h1 class="page-title" style="font-size:2rem;margin-bottom:0">${t.name}</h1></div>
        <div class="tool-container">${body}</div>
    </div>`;
}

function macroCalcHTML() {
    return `<div class="form-group"><label>Weight (kg)</label><input type="number" id="mc-weight" value="70"></div>
    <div class="form-group"><label>Goal</label><select id="mc-goal"><option>Lose Weight</option><option selected>Maintain</option><option>Build Muscle</option></select></div>
    <div class="form-group"><label>Activity Level</label><select id="mc-activity"><option>Sedentary</option><option selected>Moderate</option><option>Active</option></select></div>
    <button class="btn btn-primary" onclick="calcMacros()">Calculate</button>
    <div id="mc-result"></div>`;
}

function calcMacros() {
    const w = parseFloat(document.getElementById('mc-weight').value) || 70;
    const goal = document.getElementById('mc-goal').value;
    const act = document.getElementById('mc-activity').value;
    let mult = act === 'Sedentary' ? 28 : act === 'Moderate' ? 32 : 36;
    let cal = Math.round(w * mult);
    if (goal === 'Lose Weight') cal -= 400;
    if (goal === 'Build Muscle') cal += 300;
    const p = Math.round(w * 2); const f = Math.round(cal * 0.25 / 9); const c = Math.round((cal - p * 4 - f * 9) / 4);
    document.getElementById('mc-result').innerHTML = `<div class="result-box"><h4>Your Daily Macros</h4>
        <div class="result-row"><span>Calories</span><strong>${cal} kcal</strong></div>
        <div class="result-row"><span>Protein</span><strong>${p}g</strong></div>
        <div class="result-row"><span>Fat</span><strong>${f}g</strong></div>
        <div class="result-row"><span>Carbs</span><strong>${c}g</strong></div></div>`;
}

function portionScalerHTML() {
    return `<div class="form-group"><label>Original Servings</label><input type="number" id="ps-orig" value="4"></div>
    <div class="form-group"><label>Desired Servings</label><input type="number" id="ps-new" value="2"></div>
    <div class="form-group"><label>Ingredients (one per line, e.g. "200g flour")</label><textarea id="ps-ingredients" rows="5">200g flour\n100ml milk\n3 eggs\n50g sugar</textarea></div>
    <button class="btn btn-primary" onclick="scalePortion()">Scale</button>
    <div id="ps-result"></div>`;
}

function scalePortion() {
    const orig = parseFloat(document.getElementById('ps-orig').value) || 1;
    const newS = parseFloat(document.getElementById('ps-new').value) || 1;
    const ratio = newS / orig;
    const lines = document.getElementById('ps-ingredients').value.split('\n');
    const scaled = lines.map(line => {
        return line.replace(/[\d.]+/g, match => Math.round(parseFloat(match) * ratio * 10) / 10);
    });
    document.getElementById('ps-result').innerHTML = `<div class="result-box"><h4>Scaled to ${newS} servings</h4>${scaled.map(s => `<div class="result-row"><span>${s}</span></div>`).join('')}</div>`;
}

function mealPlannerHTML() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return `<p style="color:var(--text-secondary);margin-bottom:16px">Plan your meals for the week:</p>
    ${days.map(d => `<div class="form-group"><label>${d}</label><input type="text" placeholder="e.g. Grilled Salmon, Salad..." id="mp-${d}"></div>`).join('')}
    <button class="btn btn-primary" onclick="generatePlan()">Generate Summary</button>
    <div id="mp-result"></div>`;
}

function generatePlan() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const plan = days.map(d => ({ day: d, meal: document.getElementById('mp-' + d).value || 'No meal planned' }));
    document.getElementById('mp-result').innerHTML = `<div class="result-box"><h4>Weekly Meal Plan</h4>${plan.map(p => `<div class="result-row"><span>${p.day}</span><strong>${p.meal}</strong></div>`).join('')}</div>`;
}

function unitConverterHTML() {
    return `<div class="form-group"><label>Value</label><input type="number" id="uc-val" value="100"></div>
    <div class="form-group"><label>Conversion</label><select id="uc-type">
        <option value="g-oz">Grams → Ounces</option><option value="oz-g">Ounces → Grams</option>
        <option value="ml-cup">mL → Cups</option><option value="cup-ml">Cups → mL</option>
        <option value="c-f">°C → °F</option><option value="f-c">°F → °C</option>
    </select></div>
    <button class="btn btn-primary" onclick="convertUnit()">Convert</button>
    <div id="uc-result"></div>`;
}

function convertUnit() {
    const v = parseFloat(document.getElementById('uc-val').value) || 0;
    const t = document.getElementById('uc-type').value;
    let r = 0, u = '';
    if (t === 'g-oz') { r = v * 0.03527396; u = 'oz'; }
    else if (t === 'oz-g') { r = v * 28.3495; u = 'g'; }
    else if (t === 'ml-cup') { r = v * 0.00422675; u = 'cups'; }
    else if (t === 'cup-ml') { r = v * 236.588; u = 'mL'; }
    else if (t === 'c-f') { r = v * 9/5 + 32; u = '°F'; }
    else if (t === 'f-c') { r = (v - 32) * 5/9; u = '°C'; }
    document.getElementById('uc-result').innerHTML = `<div class="result-box"><h4>Result</h4><div class="result-row"><span>${v} → <strong>${Math.round(r * 100) / 100} ${u}</strong></span></div></div>`;
}

// ===================== FAVORITES =====================
function renderFavorites() {
    return `<div class="fade-in">
        <h1 class="page-title">My Favorites</h1>
        <p class="page-subtitle">Your saved recipes for quick access.</p>
        ${favorites.length === 0 ? '<div class="empty-state"><i data-lucide="heart" style="width:48px;height:48px"></i><h3>No favorites yet</h3><p>Browse recipes and save your favorites.</p></div>' :
        `<div class="lesson-list">${favorites.map(f => `
            <div class="lesson-item"><div class="lesson-number" style="background:var(--danger-bg);color:var(--danger)">♥</div>
            <div class="lesson-info"><h4>${f.recipe}</h4><span>${f.module} • Added ${f.addedOn}</span></div></div>`).join('')}
        </div>`}
    </div>`;
}

// ===================== PROGRESS =====================
function renderProgress() {
    const totalLessons = MODULES.reduce((a, m) => a + m.totalLessons, 0);
    const completed = MODULES.reduce((a, m) => a + m.lessons.filter(l => l.completed).length, 0);
    const pct = Math.round((completed / totalLessons) * 100);
    return `<div class="fade-in">
        <h1 class="page-title">My Progress</h1>
        <p class="page-subtitle">Track your learning journey across all modules.</p>
        <div class="stat-card" style="margin-bottom:32px;max-width:400px">
            <div><div class="stat-value">${pct}%</div><div class="stat-label">Overall Completion (${completed}/${totalLessons} lessons)</div>
            <div class="progress-bar-container" style="margin-top:12px;height:12px"><div class="progress-bar-fill" style="width:${pct}%"></div></div></div>
        </div>
        <h2 class="section-title">By Module</h2>
        <div class="lesson-list">${MODULES.map(m => {
            const d = m.lessons.filter(l => l.completed).length;
            const p = Math.round((d / m.totalLessons) * 100);
            return `<div class="lesson-item" onclick="navigate('module-detail','${m.id}')">
                <div class="lesson-number" style="font-size:1.2rem">${m.emoji}</div>
                <div class="lesson-info" style="flex-grow:1"><h4>${m.title}</h4><span>${d}/${m.totalLessons} lessons</span>
                <div class="progress-bar-container"><div class="progress-bar-fill" style="width:${p}%"></div></div></div>
                <div class="lesson-status">${p}%</div>
            </div>`;
        }).join('')}</div>
    </div>`;
}

// ===================== ADMIN =====================
function renderAdmin() {
    return `<div class="fade-in">
        <h1 class="page-title">Admin Dashboard</h1>
        <p class="page-subtitle">Manage client data and generate Proof of Usage reports for refund disputes.</p>
        <div class="admin-tabs">
            <button class="admin-tab ${currentAdminTab === 'client' ? 'active' : ''}" onclick="currentAdminTab='client';navigate('admin')">Client Info</button>
            <button class="admin-tab ${currentAdminTab === 'report' ? 'active' : ''}" onclick="currentAdminTab='report';navigate('admin')">Activity Log</button>
            <button class="admin-tab ${currentAdminTab === 'export' ? 'active' : ''}" onclick="currentAdminTab='export';navigate('admin')">Export PDF</button>
        </div>
        <div id="admin-content">${currentAdminTab === 'client' ? adminClientForm() : currentAdminTab === 'report' ? adminActivityLog() : adminExportPDF()}</div>
    </div>`;
}

function adminClientForm() {
    return `<div class="admin-form">
        <h3>Client Information</h3>
        <div class="form-group"><label>Full Name</label><input type="text" id="cf-name" value="${clientData.name}" placeholder="Enter client name"></div>
        <div class="form-group"><label>Email</label><input type="email" id="cf-email" value="${clientData.email}" placeholder="Enter client email"></div>
        <div class="form-group"><label>Purchase Date</label><input type="date" id="cf-date" value="${clientData.purchaseDate}"></div>
        <div class="form-group"><label>Country</label><input type="text" id="cf-country" value="${clientData.country}" placeholder="Enter client country"></div>
        <button class="btn btn-primary" onclick="saveClient()"><i data-lucide="save"></i> Save Client Data</button>
        <div id="cf-msg"></div>
    </div>`;
}

function saveClient() {
    clientData.name = document.getElementById('cf-name').value;
    clientData.email = document.getElementById('cf-email').value;
    clientData.purchaseDate = document.getElementById('cf-date').value;
    clientData.country = document.getElementById('cf-country').value;
    // Regenerate tracking data based on purchase date
    trackingData = generateTrackingData(clientData.purchaseDate);
    favorites = generateFavorites(clientData.purchaseDate);
    document.getElementById('cf-msg').innerHTML = '<p style="color:var(--success);margin-top:12px">✓ Client data saved! Activity log generated starting 1 day after purchase (' + clientData.purchaseDate + ').</p>';
}

function adminActivityLog() {
    const logins = trackingData.filter(t => t.type === 'login').length;
    const modules = trackingData.filter(t => t.type === 'module').length;
    const tools = trackingData.filter(t => t.type === 'tool').length;
    return `<div class="grid-4" style="margin-bottom:24px">
        <div class="stat-card"><div class="stat-icon" style="background:var(--success-bg);color:var(--success)"><i data-lucide="log-in"></i></div><div><div class="stat-value">${logins}</div><div class="stat-label">Logins</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:var(--info-bg);color:var(--info)"><i data-lucide="book-open"></i></div><div><div class="stat-value">${modules}</div><div class="stat-label">Modules Accessed</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:var(--purple-bg);color:var(--purple)"><i data-lucide="wrench"></i></div><div><div class="stat-value">${tools}</div><div class="stat-label">Tools Used</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:var(--accent-glow);color:var(--accent)"><i data-lucide="activity"></i></div><div><div class="stat-value">${trackingData.length}</div><div class="stat-label">Total Events</div></div></div>
    </div>
    <div class="admin-table-wrapper"><table class="admin-table">
        <thead><tr><th>Date & Time</th><th>Action</th><th>Details</th></tr></thead>
        <tbody>${trackingData.map(t => `<tr><td>${t.date}</td><td><span class="badge badge-${t.type}">${t.action}</span></td><td>${t.details}</td></tr>`).join('')}</tbody>
    </table></div>`;
}

function adminExportPDF() {
    const hasClient = clientData.name && clientData.email;
    const logins = trackingData.filter(t => t.type === 'login').length;
    const modules = trackingData.filter(t => t.type === 'module').length;
    const tools = trackingData.filter(t => t.type === 'tool').length;
    return `${!hasClient ? '<div style="background:var(--danger-bg);border:1px solid var(--danger);padding:16px;border-radius:8px;margin-bottom:24px;color:var(--danger)"><strong>⚠ Warning:</strong> Please fill in the Client Information first before exporting the PDF report.</div>' : ''}
    <div class="actions-bar">
        <button class="btn btn-primary ${!hasClient ? 'disabled' : ''}" onclick="exportPDF()" ${!hasClient ? 'disabled' : ''}><i data-lucide="download"></i> Export PDF Report</button>
        <button class="btn btn-secondary" onclick="currentAdminTab='client';navigate('admin')"><i data-lucide="edit"></i> Edit Client Data</button>
    </div>
    <div id="pdf-preview">
        <div class="pdf-report" id="report-container">
            <div class="pdf-header"><div class="pdf-logo">🍳 Culina</div><div class="pdf-doc-title">Proof of Usage Report<br><small>Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</small></div></div>
            <div class="pdf-section"><div class="pdf-section-title">Client Information</div>
                <div class="pdf-info-grid">
                    <div class="pdf-info-item"><label>Full Name</label><span>${clientData.name || '—'}</span></div>
                    <div class="pdf-info-item"><label>Email</label><span>${clientData.email || '—'}</span></div>
                    <div class="pdf-info-item"><label>Purchase Date</label><span>${clientData.purchaseDate || '—'}</span></div>
                    <div class="pdf-info-item"><label>Country</label><span>${clientData.country || '—'}</span></div>
                </div>
            </div>
            <div class="pdf-section"><div class="pdf-section-title">Usage Summary</div>
                <div class="pdf-summary-grid">
                    <div class="pdf-summary-card"><div class="value">${logins}</div><div class="label">Total Logins</div></div>
                    <div class="pdf-summary-card"><div class="value">${modules}</div><div class="label">Modules Accessed</div></div>
                    <div class="pdf-summary-card"><div class="value">${tools}</div><div class="label">Tools Used</div></div>
                </div>
            </div>
            <div class="pdf-section"><div class="pdf-section-title">Detailed Activity Log</div>
                <table class="pdf-table"><thead><tr><th>#</th><th>Date & Time</th><th>Action Type</th><th>Details</th></tr></thead>
                <tbody>${trackingData.map((t, i) => `<tr><td>${i + 1}</td><td>${t.date}</td><td><span class="pdf-badge pdf-badge-${t.type}">${t.action}</span></td><td>${t.details}</td></tr>`).join('')}</tbody></table>
            </div>
            <div class="pdf-footer"><p>This document certifies that the client identified above accessed the Culina application modules and tools after the recorded purchase date. This report was automatically generated and serves as formal proof of platform usage.</p><p style="margin-top:8px">© ${new Date().getFullYear()} Culina App. All rights reserved.</p></div>
        </div>
    </div>`;
}

function exportPDF() {
    const el = document.getElementById('report-container');
    const opt = { margin: 8, filename: 'Proof_of_Usage_' + (clientData.name || 'Client').replace(/\s+/g, '_') + '.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
    html2pdf().set(opt).from(el).save();
}

// INIT
navigate('home');
