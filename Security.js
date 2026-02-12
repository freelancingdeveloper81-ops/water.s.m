document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Theme Persistence Linking
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Load theme from shared storage
    const savedTheme = localStorage.getItem('aquaTheme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('aquaTheme', newTheme); // Sync across all files
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    // 2. Sidebar Panel Switching Logic
    const sideLinks = document.querySelectorAll('.side-link');
    const panels = document.querySelectorAll('.settings-panel');

    sideLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('data-target');
            if(!target) return; // Allow normal links like Reports.html

            e.preventDefault();

            // UI Refresh
            sideLinks.forEach(l => l.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            link.classList.add('active');
            const panel = document.getElementById(`${target}-panel`);
            if(panel) panel.classList.add('active');
        });
    });

    // 3. Populate Mock Users & Logs
    renderMockData();
});

function renderMockData() {
    // User Table
    const userBody = document.getElementById('userTableBody');
    const users = [
        {id: "AF-001", name: "Admin Main", role: "Super Admin", status: "Active"},
        {id: "AF-009", name: "Operator 01", role: "Stock Manager", status: "Active"}
    ];
    userBody.innerHTML = users.map(u => `
        <tr>
            <td>#${u.id}</td>
            <td><strong>${u.name}</strong></td>
            <td><span class="badge admin">${u.role}</span></td>
            <td><span class="status-on">${u.status}</span></td>
            <td><button class="btn-sm">Modify</button></td>
        </tr>
    `).join('');

    // Audit Logs
    const logContainer = document.getElementById('auditLogContainer');
    const logs = [
        {time: "11:20 AM", action: "Admin updated tax configuration.", type: "info"},
        {time: "10:05 AM", action: "Stock movement recorded by Operator_01.", type: "warn"},
        {time: "Yesterday", action: "System automatic cloud backup completed.", type: "success"}
    ];
    logContainer.innerHTML = logs.map(l => `
        <div class="audit-item ${l.type}">
            <div class="audit-time">${l.time}</div>
            <div class="audit-desc">${l.action}</div>
        </div>
    `).join('');
}

// 4. Global Action Simulation
window.saveAdminSettings = () => {
    const btn = event.currentTarget;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Securing Data...';
    
    setTimeout(() => {
        alert("✅ SYSTEM NOTIFICATION: Company profile and security protocols updated.");
        btn.innerHTML = 'Update Profile ✅';
    }, 1500);
}