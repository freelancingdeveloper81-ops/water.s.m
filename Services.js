document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Light/Dark Mode Toggle
    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    toggleBtn.addEventListener('click', () => {
        const isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        toggleBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });

    // 2. Persistent Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        toggleBtn.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    // 3. Simple Scroll Reveal Animation
    const blocks = document.querySelectorAll('.service-block');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        blocks.forEach(block => {
            const blockTop = block.getBoundingClientRect().top;
            if (blockTop < triggerBottom) {
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for animation
    blocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(50px)';
        block.style.transition = 'all 0.8s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
});