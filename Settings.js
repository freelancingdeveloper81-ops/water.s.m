document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Internal Link: Theme Persistence
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Load saved theme from shared localStorage
    const savedTheme = localStorage.getItem('aquaTheme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('aquaTheme', newTheme); // Shared key across all pages
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    // 2. Sidebar Navigation Logic
    window.showPanel = (panelId) => {
        // Hide all panels
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        // Remove active from all menu items
        document.querySelectorAll('.settings-menu li').forEach(li => li.classList.remove('active'));
        
        // Activate chosen panel & menu item
        document.getElementById(`${panelId}-panel`).classList.add('active');
        document.getElementById(`li-${panelId}`).classList.add('active');
    };

    // 3. Simulated Data Saving
    const companyForm = document.getElementById('companyForm');
    companyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = companyForm.querySelector('button');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Encrypting & Saving...";
        submitBtn.disabled = true;

        setTimeout(() => {
            alert("✅ SYSTEM NOTIFICATION: Company profile updated and synced with cloud database.");
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // 4. Activity Logs (Mock Data)
    const logs = [
        "Admin changed Tax rate to 5.0%",
        "New User 'Operator_01' registered",
        "Inventory backup successful",
        "System updated to version 4.5.2"
    ];
    const logContainer = document.getElementById('systemLogs');
    logs.forEach(log => {
        logContainer.innerHTML += `<div class="log-item"><strong>${new Date().toLocaleDateString()}</strong> - ${log}</div>`;
    });
});