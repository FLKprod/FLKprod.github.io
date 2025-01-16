import {
    createImage,
    createElementWithClass,
    createIcon,
    createText,
    createGitHubLink,
    createIconImage
  } from './createElements.js';
  
  export function createCarousel(name, desc, images, index,textoverlay) {
    const carouselContainer = createElementWithClass('div', 'carousel-container');
    const img_carrousel = createElementWithClass('div', 'image-wrapper');
    const imageElement = createImage(images[0]);
    const prevButton = createIconImage('Photos/gauche.png','gauche-icon' ,() => prevImage());
    const nextButton = createIconImage('Photos/droite.png','droite-icon' , () => nextImage());
    const textOverlay = createElementWithClass('div', 'text-overlay');

    let currentIndex = 0;
    let startX = 0;
    let endX = 0;

    img_carrousel.appendChild(imageElement);
    carouselContainer.appendChild(img_carrousel);
    // CARROUSEL POUR LE MENU
    if(textoverlay === true){
        textOverlay.appendChild(createText('h4', name));
        textOverlay.appendChild(createText('p', desc));
        carouselContainer.appendChild(textOverlay);
        
    }
    // CAROUSSEL POUR LE MODAL
    else{
        var text_content_carrousel = createElementWithClass('div','text-content')
        text_content_carrousel.appendChild(createText('h2', name));
        text_content_carrousel.appendChild(createText('p', desc));
        carouselContainer.appendChild(text_content_carrousel);
        carouselContainer.appendChild(prevButton);
        carouselContainer.appendChild(nextButton);
    }

    const modal = document.getElementById('carousel-modal');
    const modalContent = document.getElementById('modal-content');

    // OUVERTURE DU MODAL
    function openModal(content) {
        const modal = document.getElementById('carousel-modal');
        const modalContent = document.getElementById('modal-content');
        if (modal.style.display === 'flex') {
            return; 
        }

        modalContent.innerHTML = '';
        modalContent.appendChild(content.cloneNode(true)); 
        modal.style.display = 'flex';
    }

    document.addEventListener('click', (event) => {
        const modal = document.getElementById('carousel-modal');
        const modalContent = document.getElementById('modal-content');
        if (modal.style.display === 'flex') {
            if (!modalContent.contains(event.target)) {
                modal.style.display = 'none';
                modalContent.innerHTML = '';
            }
        }
    });

    document.querySelectorAll('.carousel-container').forEach((carousel) => {
        carousel.addEventListener('click', () => {
            openModal(carousel);
        });
    });

    const closeModal = (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    };

    img_carrousel.addEventListener('click', openModal);
    modal.addEventListener('click', closeModal);

    const hideTextOverlay = () => textOverlay.classList.add('hidden');
    const showTextOverlay = () => textOverlay.classList.remove('hidden');

    prevButton.addEventListener('mouseover', hideTextOverlay);
    prevButton.addEventListener('mouseout', showTextOverlay);
    nextButton.addEventListener('mouseover', hideTextOverlay);
    nextButton.addEventListener('mouseout', showTextOverlay);

    textOverlay.addEventListener('mouseover', hideTextOverlay);
    textOverlay.addEventListener('mouseout', showTextOverlay);

    img_carrousel.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });

    // SLIDES ON SCREEN
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX; 
    });

    // Détecter la fin du toucher
    carouselContainer.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipeDirection();
    });


    function handleSwipeDirection() {
        const deltaX = touchEndX - touchStartX;
        textOverlay.classList.add('hidden');
        if (Math.abs(deltaX) > 50) { 
            if (deltaX > 0) {
                prevImage()
            } else {
                nextImage()
            }
            if (element.classList.contains('hidden')) {
                element.classList.remove('hidden'); 
            } else {
                element.classList.add('hidden'); 
            }
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
    function updateImage() {
        const nextImageElement = createImage(images[currentIndex]);
        nextImageElement.style.position = "absolute";
        nextImageElement.style.opacity = "0";
        nextImageElement.style.transition = "opacity 0.5s ease";

        img_carrousel.appendChild(nextImageElement);
    
        setTimeout(() => {
            nextImageElement.style.opacity = "1"; // Nouvelle image devient visible
        }, 0);
        setTimeout(() => {
            // MAJ de la référence de l'image principale
            imageElement = nextImageElement;
            img_carrousel.removeChild(imageElement);
        }, 500);
    }
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
