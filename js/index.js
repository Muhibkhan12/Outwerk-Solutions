// Navbar scroll behavior
(function(){
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const currentScroll = window.scrollY;
                if (currentScroll > lastScroll && currentScroll > 100) {
                    navbar.classList.add('navbar-hidden');
                } else {
                    navbar.classList.remove('navbar-hidden');
                }
                if (currentScroll > 20) {
                    navbar.classList.add('navbar-blur');
                } else {
                    navbar.classList.remove('navbar-blur');
                }
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    }, {passive: true});
})();

// Mobile menu
(function(){
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    const spans = btn.querySelectorAll('span');
    let open = false;
    
    btn.addEventListener('click', function() {
        open = !open;
        menu.style.display = open ? 'block' : 'none';
        btn.setAttribute('aria-expanded', String(open));
        spans[0].style.transform = open ? 'rotate(45deg) translate(4px,4px)' : '';
        spans[1].style.opacity = open ? '0' : '1';
        spans[2].style.transform = open ? 'rotate(-45deg) translate(4px,-4px)' : '';
    });
})();

// Mobile submenus
(function(){
    function mkToggle(btnId, menuId, chevronId) {
        const btn = document.getElementById(btnId);
        const menu = document.getElementById(menuId);
        const chevron = btn ? btn.querySelector('.fa-chevron-down') : null;
        if (!btn || !menu || !chevron) return;
        
        let open = false;
        btn.addEventListener('click', function() {
            open = !open;
            menu.style.display = open ? 'block' : 'none';
            chevron.style.transform = open ? 'rotate(180deg)' : '';
        });
    }
    mkToggle('mobileServicesBtn', 'mobileServicesMenu');
    mkToggle('mobileCareersBtn', 'mobileCareersMenu');
})();

// Smooth scroll
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: 'smooth'});
}

// Typing effect
(function(){
    const texts = ['Reliable IT & Web Solutions.', 'Global Reach. Local Expertise.', 'Innovation That Delivers Results.'];
    const el = document.getElementById('typingText');
    if (!el) return;
    
    let i = 0, ci = 0, deleting = false;
    
    function tick() {
        const cur = texts[i];
        ci = deleting ? ci - 1 : ci + 1;
        el.textContent = cur.substring(0, ci);
        
        let delay = deleting ? 60 : 120;
        if (!deleting && ci === cur.length) {
            delay = 2000;
            deleting = true;
        } else if (deleting && ci === 0) {
            deleting = false;
            i = (i + 1) % texts.length;
            delay = 400;
        }
        setTimeout(tick, delay);
    }
    setTimeout(tick, 1000);
})();

// Hero desktop decorations
(function(){
    if (window.innerWidth >= 768) {
        const el = document.getElementById('heroDecoDesktop');
        if (el) el.style.display = 'block';
    }
})();

// Scroll to top button
(function(){
    const btn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', function(){
        btn.style.opacity = window.scrollY > 300 ? '1' : '0';
    }, {passive: true});
    
    btn.addEventListener('click', function() { 
        window.scrollTo({top: 0, behavior: 'smooth'}); 
    });
})();

// Counters
(function(){
    const counters = [
        {id: 'clientsCounter', end: 100, suffix: '+'},
        {id: 'projectsCounter', end: 250, suffix: '+'},
        {id: 'countriesCounter', end: 3, suffix: ''},
        {id: 'satisfactionStat', end: 98, suffix: '%'},
        {id: 'industriesStat', end: 45, suffix: '+'},
        {id: 'projectsStat2', end: 150, suffix: '+'}
    ];
    
    let done = false;
    
    function inView(el) {
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
    }
    
    function animate(el, end, suffix) {
        let start = 0;
        const step = Math.ceil(end / 60);
        
        function tick() {
            start = Math.min(start + step, end);
            el.textContent = start + suffix;
            if (start < end) requestAnimationFrame(tick);
        }
        tick();
    }
    
    function check() {
        if (done) return;
        
        const first = document.getElementById(counters[0].id);
        if (first && inView(first)) {
            done = true;
            counters.forEach(function(c) {
                const el = document.getElementById(c.id);
                if (el) animate(el, c.end, c.suffix);
            });
            
            document.querySelectorAll('.progress-bar').forEach(function(b) { 
                b.style.width = b.dataset.width ? b.dataset.width + '%' : '85%';
            });
        }
    }
    
    window.addEventListener('scroll', check, {passive: true});
    check();
})();

// OPTIMIZED TESTIMONIAL CAROUSEL - Uses transform for better performance
(function() {
    const slider = document.getElementById('testimonial-slider');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const indicators = document.querySelectorAll('.indicator-dot');
    const slides = document.querySelectorAll('.carousel-slide');

    if (!slider || !prevBtn || !nextBtn || !indicators.length || !slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoAdvanceTimer = null;

    function updateCarousel(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        // Using transform instead of left for better performance
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        indicators.forEach((dot, i) => {
            dot.style.backgroundColor = i === currentIndex ? (i % 2 === 0 ? '#118AB2' : '#06D6A0') : 'transparent';
        });
    }

    function startAutoAdvance() {
        if (autoAdvanceTimer) clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = setInterval(() => updateCarousel(currentIndex + 1), 5000);
    }

    function pauseAutoAdvance() {
        if (autoAdvanceTimer) {
            clearInterval(autoAdvanceTimer);
            autoAdvanceTimer = null;
        }
    }

    function resetAutoAdvance() {
        pauseAutoAdvance();
        startAutoAdvance();
    }

    prevBtn.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
        resetAutoAdvance();
    });

    nextBtn.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
        resetAutoAdvance();
    });

    indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
            resetAutoAdvance();
        });
    });

    slider.addEventListener('mouseenter', pauseAutoAdvance);
    slider.addEventListener('mouseleave', startAutoAdvance);

    // Touch/swipe support for mobile
    let touchStartX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseAutoAdvance();
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            updateCarousel(currentIndex + (diff > 0 ? 1 : -1));
            resetAutoAdvance();
        } else {
            startAutoAdvance();
        }
    }, { passive: true });

    updateCarousel(0);
    startAutoAdvance();

    window.addEventListener('beforeunload', () => {
        if (autoAdvanceTimer) clearInterval(autoAdvanceTimer);
    });
})();

// Footer scroll to top
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Update copyright year
(function() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// AOS init
document.addEventListener('DOMContentLoaded', function(){
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 120,
            disable: 'mobile'
        });
    }
});