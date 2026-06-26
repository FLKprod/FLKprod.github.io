/**
 * FLK Production - Main JavaScript
 * Animations, navigation, and interactive elements
 */

(function() {
    'use strict';

    // --- DOM Elements ---
    const loader = document.getElementById('loader');
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    // --- Loader ---
    function initLoader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.classList.remove('no-scroll');
            }, 1000);
        });
    }

    // --- Navigation ---
    function initNavigation() {
        // Scroll behavior
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add solid background on scroll
            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = nav.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // --- Scroll Reveal Animations (reversible : se rejoue en remontant) ---
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('[data-reveal]');

        const revealOptions = {
            root: null,
            // Se declenche un peu avant que l'element entre/sorte de l'ecran,
            // dans les deux sens, pour un rendu fluide qu'on scrolle vers le
            // haut ou vers le bas.
            rootMargin: '-10% 0px -10% 0px',
            threshold: 0
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // L'element entre dans la zone visible : on joue l'animation,
                    // qu'on scrolle vers le bas ou vers le haut.
                    entry.target.classList.add('revealed');
                } else {
                    // L'element quitte la zone visible (dans un sens ou l'autre) :
                    // on retire la classe pour que l'animation soit rejouee
                    // a l'envers si l'element redevient visible plus tard.
                    entry.target.classList.remove('revealed');
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });

        // Auto-add reveal to main sections if not already set
        document.querySelectorAll('.section').forEach((section, index) => {
            if (!section.hasAttribute('data-reveal')) {
                section.setAttribute('data-reveal', '');
                section.style.transitionDelay = `${index * 0.1}s`;
                revealObserver.observe(section);
            }
        });

        // Re-observe dynamiquement si du contenu est ajoute apres coup (ex: galerie)
        window.refreshScrollReveal = function() {
            document.querySelectorAll('[data-reveal]').forEach(el => {
                revealObserver.observe(el);
            });
        };
    }

    // --- Hero Video (lecture forcee en boucle, sans pause possible) ---
    function initHeroVideo() {
        const heroVideo = document.querySelector('.hero-video');
        if (!heroVideo) return;

        const tryPlay = () => {
            heroVideo.play().catch(() => {
                // Lecture auto bloquee par le navigateur : on retentera
                // dès la premiere interaction utilisateur.
                const resume = () => {
                    heroVideo.play().catch(() => {});
                    document.removeEventListener('click', resume);
                    document.removeEventListener('touchstart', resume);
                };
                document.addEventListener('click', resume, { once: true });
                document.addEventListener('touchstart', resume, { once: true });
            });
        };

        tryPlay();

        // Empeche toute mise en pause via clic, clavier ou menu contextuel
        heroVideo.addEventListener('pause', tryPlay);
        heroVideo.addEventListener('contextmenu', (e) => e.preventDefault());
        heroVideo.addEventListener('click', (e) => e.preventDefault());
        heroVideo.addEventListener('keydown', (e) => e.preventDefault());
    }

    // --- Parallax Effects ---
    function initParallax() {
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;
                heroBackground.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    // --- Service Cards Hover Effect ---
    function initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                serviceCards.forEach(c => {
                    if (c !== card) {
                        c.style.opacity = '0.5';
                    }
                });
            });
            
            card.addEventListener('mouseleave', () => {
                serviceCards.forEach(c => {
                    c.style.opacity = '1';
                });
            });
        });
    }

    // --- Cursor Effect (optional, for luxury feel) ---
    function initCursorEffect() {
        // Skip on touch devices
        if ('ontouchstart' in window) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
        document.body.appendChild(cursor);

        const cursorDot = cursor.querySelector('.cursor-dot');
        const cursorRing = cursor.querySelector('.cursor-ring');

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        // Smooth ring follow
        function animateRing() {
            ringX += (mouseX - ringX) * 0.1;
            ringY += (mouseY - ringY) * 0.1;
            
            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .carousel-item, .gallery-preview-item');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });

        // Add cursor styles dynamically
        const cursorStyles = document.createElement('style');
        cursorStyles.textContent = `
            .custom-cursor {
                position: fixed;
                top: 0;
                left: 0;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
            }
            .cursor-dot {
                position: absolute;
                width: 6px;
                height: 6px;
                background: #fff;
                border-radius: 50%;
                transform: translate(-50%, -50%);
            }
            .cursor-ring {
                position: absolute;
                width: 40px;
                height: 40px;
                border: 1px solid rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transition: width 0.3s, height 0.3s, border-color 0.3s;
            }
            .cursor-hover .cursor-ring {
                width: 60px;
                height: 60px;
                border-color: rgba(201, 169, 97, 0.8);
            }
            @media (max-width: 1024px) {
                .custom-cursor { display: none; }
            }
        `;
        document.head.appendChild(cursorStyles);
    }

    // --- Initialize All ---
    function init() {
        initLoader();
        initNavigation();
        initScrollReveal();
        initHeroVideo();
        initParallax();
        initServiceCards();
        // initCursorEffect(); // Uncomment for custom cursor
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
