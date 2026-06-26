
/**
 * FLK Production - Gallery System
 * Auto-generates carousels from folder structure
 */

(function() {
    'use strict';

    // --- Configuration ---
    // Pour GitHub Pages sans backend, tu devras utiliser un fichier XML
    // qui liste les dossiers et leurs images
    const GALLERY_CONFIG_URL = 'gallery-config.xml';

    // --- DOM Elements ---
    const galleryMain = document.getElementById('galleryMain');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');

    // --- State ---
    let currentGallery = [];
    let currentIndex = 0;

    // --- Load Gallery Config ---
    async function loadGalleryConfig() {
        try {
            const response = await fetch(GALLERY_CONFIG_URL);
            const xmlText = await response.text();
            const galleries = parseGalleryXML(xmlText);
            renderGalleries(galleries);
        } catch (error) {
            console.error('Error loading gallery config:', error);
            // Fallback avec données statiques
            renderGalleries(getStaticGalleryData());
        }
    }

    // --- Parse le fichier XML en objets JS ({ id, title, images: [{src, alt}] }) ---
    function parseGalleryXML(xmlText) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

        // En cas de XML malformé, le navigateur insère un <parsererror>
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
            throw new Error('Invalid XML in gallery-config.xml');
        }

        const galleryNodes = Array.from(xmlDoc.querySelectorAll('gallery'));

        return galleryNodes.map(galleryNode => {
            const imageNodes = Array.from(galleryNode.querySelectorAll('image'));
            return {
                id: galleryNode.getAttribute('id'),
                title: galleryNode.getAttribute('title'),
                images: imageNodes.map(imageNode => ({
                    src: imageNode.getAttribute('src'),
                    alt: imageNode.getAttribute('alt')
                }))
            };
        });
    }

    // --- Données statiques de fallback ---
    function getStaticGalleryData() {
        return [
            {
                id: 'mariage',
                title: 'Mariage',
                images: [
                    { src: 'photos/mariage/photo1.jpg', alt: 'Mariage 1' },
                    { src: 'photos/mariage/photo2.jpg', alt: 'Mariage 2' },
                    { src: 'photos/mariage/photo3.jpg', alt: 'Mariage 3' },
                    { src: 'photos/mariage/photo4.jpg', alt: 'Mariage 4' },
                    { src: 'photos/mariage/photo5.jpg', alt: 'Mariage 5' }
                ]
            },
            {
                id: 'sport',
                title: 'Sport',
                images: [
                    { src: 'photos/sport/photo1.jpg', alt: 'Sport 1' },
                    { src: 'photos/sport/photo2.jpg', alt: 'Sport 2' },
                    { src: 'photos/sport/photo3.jpg', alt: 'Sport 3' },
                    { src: 'photos/sport/photo4.jpg', alt: 'Sport 4' }
                ]
            },
            {
                id: 'portraits',
                title: 'Portraits',
                images: [
                    { src: 'photos/portraits/photo1.jpg', alt: 'Portrait 1' },
                    { src: 'photos/portraits/photo2.jpg', alt: 'Portrait 2' },
                    { src: 'photos/portraits/photo3.jpg', alt: 'Portrait 3' }
                ]
            }
        ];
    }

    // --- Render Galleries ---
    function renderGalleries(galleries) {
        if (!galleryMain) return;

        galleryMain.innerHTML = '';

        galleries.forEach((gallery, galleryIndex) => {
            const section = createGallerySection(gallery, galleryIndex);
            galleryMain.appendChild(section);
        });

        // Initialize carousels after rendering
        initCarousels();
    }

    // --- Create Gallery Section ---
    function createGallerySection(gallery, galleryIndex) {
        const section = document.createElement('section');
        section.className = 'gallery-section';
        section.id = `gallery-${gallery.id}`;
        section.setAttribute('data-reveal', '');
        section.style.transitionDelay = `${galleryIndex * 0.1}s`;

        section.innerHTML = `
            <div class="gallery-section-header">
                <h2 class="gallery-section-title">${gallery.title}</h2>
                <span class="gallery-section-count">${gallery.images.length} photos</span>
            </div>
            <div class="carousel-container">
                <button class="carousel-nav carousel-prev" aria-label="Précédent">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <div class="carousel" data-gallery="${gallery.id}">
                    ${gallery.images.map((img, index) => `
                        <div class="carousel-item" data-index="${index}" data-gallery="${gallery.id}">
                            <img src="${img.src}" alt="${img.alt}" loading="lazy">
                            <div class="carousel-item-overlay"></div>
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-nav carousel-next" aria-label="Suivant">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        `;

        // Store images data for lightbox
        section.galleryData = gallery.images;

        return section;
    }

    // --- Initialize Carousels ---
    function initCarousels() {
        const carousels = document.querySelectorAll('.carousel');

        carousels.forEach(carousel => {
            const container = carousel.closest('.carousel-container');
            const prevBtn = container.querySelector('.carousel-prev');
            const nextBtn = container.querySelector('.carousel-next');
            
            // Drag to scroll
            let isDown = false;
            let startX;
            let scrollLeft;

            carousel.addEventListener('mousedown', (e) => {
                isDown = true;
                carousel.classList.add('dragging');
                startX = e.pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });

            carousel.addEventListener('mouseleave', () => {
                isDown = false;
                carousel.classList.remove('dragging');
            });

            carousel.addEventListener('mouseup', () => {
                isDown = false;
                carousel.classList.remove('dragging');
            });

            carousel.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - carousel.offsetLeft;
                const walk = (x - startX) * 2;
                carousel.scrollLeft = scrollLeft - walk;
            });

            // Navigation buttons
            const scrollAmount = 400;

            prevBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });

            nextBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });

            // Click to open lightbox
            carousel.querySelectorAll('.carousel-item').forEach(item => {
                item.addEventListener('click', () => {
                    const galleryId = item.dataset.gallery;
                    const index = parseInt(item.dataset.index, 10);
                    openLightbox(galleryId, index);
                });
            });
        });
    }

    // --- Lightbox ---
    function openLightbox(galleryId, index) {
        const section = document.getElementById(`gallery-${galleryId}`);
        if (!section || !section.galleryData) return;

        currentGallery = section.galleryData;
        currentIndex = index;

        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    function updateLightboxImage() {
        const image = currentGallery[currentIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateLightboxImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxImage();
    }

    // --- Lightbox Events ---
    function initLightbox() {
        if (!lightbox) return;

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxPrev.addEventListener('click', prevImage);
        lightboxNext.addEventListener('click', nextImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        });

        // Touch swipe
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextImage();
                } else {
                    prevImage();
                }
            }
        }
    }

    // --- Scroll Reveal for gallery sections (reversible) ---
    function initGalleryReveal() {
        const revealOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: 0
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                } else {
                    entry.target.classList.remove('revealed');
                }
            });
        }, revealOptions);

        document.querySelectorAll('.gallery-section').forEach(section => {
            revealObserver.observe(section);
        });
    }

    // --- Initialize ---
    function init() {
        loadGalleryConfig();
        initLightbox();
        
        // Delay reveal init to allow sections to render
        setTimeout(initGalleryReveal, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
