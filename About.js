/**
 * About Page Scripts
 * Handling Theme and Reveal Animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Intersection Observer for Scroll Animations ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));


    // --- 2. Theme Toggle Persistence ---
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Initial check
    document.documentElement.setAttribute('data-theme', savedTheme);
    if(themeToggle) {
        themeToggle.checked = savedTheme === 'dark';
        
        themeToggle.addEventListener('change', () => {
            const theme = themeToggle.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }

});