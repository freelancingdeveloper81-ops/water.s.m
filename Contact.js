/**
 * Contact Page Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    // 1. Form Submission Handling
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Loading State
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        btn.disabled = true;

        // Simulate API Call
        setTimeout(() => {
            // Success Message
            feedback.innerHTML = '<i class="fas fa-check-circle"></i> Inquiry Sent! Our UK dispatch team will contact you shortly.';
            feedback.className = 'form-feedback success';
            
            // Reset Form
            contactForm.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;

            // Scroll to feedback
            feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 2000);
    });

    // 2. Scroll Reveal Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

    // 3. Theme Toggle Sync
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
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