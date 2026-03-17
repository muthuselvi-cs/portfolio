// Landing Page Logic
const landing = document.getElementById('landing');
const enterBtn = document.getElementById('enter-portfolio');

if (enterBtn) {
    enterBtn.addEventListener('click', () => {
        landing.classList.add('hidden');
        document.body.style.overflowY = 'auto'; // Re-enable scroll
        setTimeout(() => {
            landing.style.display = 'none';
        }, 800);
    });
}

// Initially disable scroll for landing
if (landing && !landing.classList.contains('hidden')) {
    document.body.style.overflowY = 'hidden';
}

// Theme Toggle Logic
const themeToggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleButton) themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
}

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// Scroll Reveal
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', reveal);
reveal(); // Initial call

// Smooth scroll adjustments for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Offset for sticky nav
                behavior: 'smooth'
            });
        }
    });
});
