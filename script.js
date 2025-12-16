/**
 * Jules Caburian - Creative Producer
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initParallax();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    // Add animation class to elements
    const animatedElements = document.querySelectorAll(
        '.about-content, .about-image, .work-card, .value, .contact-content, .section-title'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for work cards
                if (entry.target.classList.contains('work-card')) {
                    const cards = document.querySelectorAll('.work-card');
                    cards.forEach((card, index) => {
                        card.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Subtle Parallax Effects
 */
function initParallax() {
    const heroDecoration = document.querySelector('.hero-decoration');
    const heroPattern = document.querySelector('.hero-pattern');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (heroDecoration) {
            heroDecoration.style.transform = `translateY(calc(-50% + ${rate * 0.5}px))`;
        }

        if (heroPattern) {
            heroPattern.style.transform = `translateY(${rate * 0.2}px)`;
        }
    });

    // Mouse move parallax for hero
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth - 0.5) * 20;
            const yPercent = (clientY / innerHeight - 0.5) * 20;

            if (heroDecoration) {
                heroDecoration.style.transform = `translateY(-50%) translate(${xPercent}px, ${yPercent}px)`;
            }
        });
    }
}

/**
 * Typing effect for tagline (optional enhancement)
 */
function initTypingEffect() {
    const tagline = document.querySelector('.hero-tagline');
    
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let index = 0;

        function type() {
            if (index < text.length) {
                tagline.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        }

        // Start typing after hero animation
        setTimeout(type, 1500);
    }
}

/**
 * Work card hover effects
 */
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.card-content').style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.querySelector('.card-content').style.transform = 'translateY(0)';
    });
});

/**
 * Active navigation link highlighting
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active link highlighting
updateActiveNavLink();

/**
 * Video Modal Handler
 */
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.video-modal-close');
    const videoFrame = document.getElementById('videoFrame');
    const videoCards = document.querySelectorAll('.work-card[data-video], .work-card[data-video-src]');

    if (!modal || !closeBtn || !videoFrame) return;

    // Open modal when card is clicked
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const videoSrc = this.getAttribute('data-video-src');
            
            if (videoId) {
                // YouTube embed
                videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else if (videoSrc) {
                // Google Drive or other embed
                videoFrame.src = videoSrc;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        videoFrame.src = '';
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);

    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize video modal
initVideoModal();

/**
 * Console greeting
 */
console.log('%c👋 Hello!', 'font-size: 24px; font-weight: bold;');
console.log('%cWelcome to Jules Caburian\'s website', 'font-size: 14px;');
console.log('%cInterested in collaboration? Reach out at linktr.ee/Balikbayancreative', 'font-size: 12px; color: #c75643;');

