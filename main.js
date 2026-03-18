document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animations)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false,
            offset: 50
        });
    }

    // 2. Landing Page Logic
    const landing = document.getElementById('landing');
    const enterBtn = document.getElementById('enter-portfolio');
    
    if (enterBtn && landing) {
        enterBtn.addEventListener('click', () => {
            landing.style.opacity = '0';
            landing.style.transform = 'scale(1.1)';
            landing.style.pointerEvents = 'none';
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                landing.remove();
                // Trigger AOS again after landing is gone to ensure smooth entrance
                AOS.refresh();
            }, 800);
        });
    }

    // 3. Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle-btn');
    const root = document.documentElement;
    const themeIcon = themeBtn?.querySelector('i');
    
    const setTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    setTheme(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = root.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // 4. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Auto-close mobile menu
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

});
