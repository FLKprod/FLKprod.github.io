import {
    createImage,
    createElementWithClass,
    createIcon,
    createText,
    createGitHubLink,
    createIconImage
  } from './createElements.js';
  
  export function createCarousel(name, desc, images, index, textoverlay) {
    const carouselContainer = createElementWithClass('div', 'carousel-container');
    const img_carrousel = createElementWithClass('div', 'image-wrapper');
    const imageElement = createImage(images[0]);
    const prevButton = createIconImage('Photos/gauche.png','gauche-icon' ,() => prevImage());
    const nextButton = createIconImage('Photos/droite.png','droite-icon' , () => nextImage());
    const textOverlay = createElementWithClass('div', 'text-overlay');

    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    img_carrousel.appendChild(imageElement);
    carouselContainer.appendChild(img_carrousel);

    if (textoverlay === true) {
        textOverlay.appendChild(createText('h4', name));
        textOverlay.appendChild(createText('p', desc));
        carouselContainer.appendChild(textOverlay);
    } else {
        const textContent = createElementWithClass('div','text-content');
        textContent.appendChild(createText('h2', name));
        textContent.appendChild(createText('p', desc));
        carouselContainer.appendChild(textContent);
        carouselContainer.appendChild(prevButton);
        carouselContainer.appendChild(nextButton);
    }

    // ✅ Centralisation des événements pour éviter les clignotements
    function hideTextOverlay() {
        textOverlay.classList.add('hidden');
    }

    function showTextOverlay() {
        textOverlay.classList.remove('hidden');
    }

    // ✅ Remplacement par mouseenter/mouseleave uniquement sur le container
    carouselContainer.addEventListener('mouseenter', hideTextOverlay);
    carouselContainer.addEventListener('mouseleave', showTextOverlay);

    // ✅ Swipe sur mobile
    carouselContainer.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    });

    carouselContainer.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipeDirection();
    });

    function handleSwipeDirection() {
        const deltaX = touchEndX - touchStartX;
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                prevImage();
            } else {
                nextImage();
            }
            hideTextOverlay();
            setTimeout(showTextOverlay, 3000); // ✅ Réaffiche après 3s
        }
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }

    function initializeCarousel() {
        const initialImage = createImage(images[currentIndex]);
        initialImage.style.position = "absolute";
        initialImage.style.opacity = "1";
        img_carrousel.appendChild(initialImage);
    }

    function updateImage() {
        const newImage = createImage(images[currentIndex]);
        newImage.style.position = "absolute";
        newImage.style.opacity = "0";
        newImage.style.transition = "opacity 0.3s ease-in-out";

        img_carrousel.appendChild(newImage);

        setTimeout(() => {
            newImage.style.opacity = "1";
        }, 10);

        setTimeout(() => {
            const imgs = img_carrousel.querySelectorAll("img");
            imgs.forEach((img, index) => {
                if (index < imgs.length - 1) {
                    img.remove();
                }
            });
        }, 300);
    }

    initializeCarousel();

    // ✅ Modal proprement géré
    const modal = document.getElementById('carousel-modal');
    const modalContent = document.getElementById('modal-content');

    function openModal(content) {
        if (modal.style.display === 'flex') return;

        modalContent.innerHTML = '';
        modalContent.appendChild(content.cloneNode(true));

        const img = new Image();
        img.src = images[currentIndex];
        img.onload = () => {
            modalContent.style.width = `${img.width}px`;
            modalContent.style.height = `${img.height}px`;
            modal.style.display = 'flex';
        };
    }

    img_carrousel.addEventListener('click', () => openModal(carouselContainer));

    modal.addEventListener('click', (event) => {
        if (!modalContent.contains(event.target)) {
            modal.style.display = 'none';
            modalContent.innerHTML = '';
        }
    });

    return carouselContainer;
}


// Pour recuperer toutes les images d'un dossier afin de gerer le nombres d'image dans les carrousels dynamiquement
export function generateImagePaths(folderName,nbrepictures) {
  const imagePaths = [];
  for (let i = 1; i <= nbrepictures; i++) {
      imagePaths.push(`Photos/Carrousel/${folderName}/${folderName}${i}.jpg`);
  }
  return imagePaths;
}





export function createProjetCarousel(name, desc, media, videoLink, githubLink) {
    const carouselContainer = createElementWithClass('div', 'carousel-container');
    const imageWrapper = createElementWithClass('div', 'carousel-images');
    const prevButton = createIcon('fa fa-arrow-left', '1em', 'white', 'pointer', () => changePage(-1));
    const nextButton = createIcon('fa fa-arrow-right', '1em', 'white', 'pointer', () => changePage(1));

    let currentPage = 0; // Page actuelle
    let totalPages = 1;

    // Ajout des médias (images)
    media.forEach((mediaSrc) => {
        const slide = createElementWithClass('div', 'carousel-slide');
        const imageElement = createImage(mediaSrc);
        slide.appendChild(imageElement);
        imageWrapper.appendChild(slide);
    });
    
    // Si la description est disponible, ajouter une page de description (Page 2)
    if (desc) {
        const descriptionSlide = createElementWithClass('div', 'carousel-slide', 'text-slide');
        const descText = createText('p', desc);
        descriptionSlide.appendChild(descText);
        imageWrapper.appendChild(descriptionSlide);
        totalPages++;  // Ajouter 1 page pour la description
    }

    // Ajout de la vidéo comme page 3 si disponible
    if (videoLink) {
        const videoSlide = createElementWithClass('div', 'carousel-slide', 'video-slide');
        const videoElement = document.createElement('video');
        videoElement.src = videoLink;
        videoElement.controls = true;
        videoElement.className = 'carousel-video';
        videoSlide.appendChild(videoElement);
        imageWrapper.appendChild(videoSlide);
        totalPages++;  // Ajouter 1 page pour la vidéo
    }

    // Ajout du lien GitHub (Page 4 si disponible)
    if (githubLink) {
        const githubSlide = createElementWithClass('div', 'carousel-slide', 'text-slide');
        githubSlide.appendChild(createGitHubLink(githubLink));
        imageWrapper.appendChild(githubSlide);
        totalPages++;  // Ajouter 1 page pour GitHub
    }

    carouselContainer.appendChild(imageWrapper);

    // Boutons de navigation (affichés uniquement si plusieurs pages)
    if (totalPages > 1) {
        carouselContainer.appendChild(prevButton);
        carouselContainer.appendChild(nextButton);
    }

    // Gestion de la navigation entre les pages
    function changePage(direction) {
        const oldPage = currentPage;
        currentPage = (currentPage + direction + totalPages) % totalPages;

        // Réinitialiser les vidéos à l'ancienne page
        const videos = imageWrapper.querySelectorAll('video');
        if (videos.length > 0) {
            videos.forEach((video) => {
                video.pause(); // Arrête la vidéo
                video.currentTime = 0; // Remet au début
            });
        }

        // Animation de glissement
        const offset = -currentPage * 100; // Déplacer par largeur de 100%
        imageWrapper.style.transform = `translateX(${offset}%)`;
        imageWrapper.classList.add('slide-transition');

        // Lancer automatiquement la vidéo si la nouvelle page en contient une
        const slides = imageWrapper.querySelectorAll('.carousel-slide');
        const currentSlide = slides[currentPage];
        const video = currentSlide.querySelector('video'); // Vérifie si la slide active contient une vidéo
        if (video) {
            video.play(); // Lance la vidéo automatiquement
        }

        // Supprimer l'animation après la transition
        setTimeout(() => {
            imageWrapper.classList.remove('slide-transition');
        }, 500);
    }

    return carouselContainer;
}
