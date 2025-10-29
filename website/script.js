document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const buttons = document.querySelectorAll('.btn');
    const featureCards = document.querySelectorAll('.feature-card');
    const steps = document.querySelectorAll('.step');
    const photoItems = document.querySelectorAll('.photo-item');

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(90, 148, 114, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    [...featureCards, ...steps, ...photoItems].forEach(element => {
        observer.observe(element);
    });

    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateStats = () => {
        if (hasAnimated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + suffix;
                }
            };
            
            updateCount();
        });
        
        hasAnimated = true;
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease-out ${0.1 * index}s backwards`;
    });


    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            z-index: 9999;
        `;
        document.body.appendChild(particle);
        return particle;
    };

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function(e) {
            this.style.transform = 'scale(1)';
        });
    });


    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    console.log('%c🎉 Welcome to ChanceWeMeet! 🎉', 'color: #3d8b5e; font-size: 20px; font-weight: bold;');
    console.log('%cConnecting lonely hearts, one coffee at a time ☕', 'color: #0288d1; font-size: 14px;');
});
