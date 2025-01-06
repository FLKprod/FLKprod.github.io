import {
    createImage,
    createElementWithClass,
    createIcon,
    createText,
    createGitHubLink
  } from './createElements.js';
  
  export function createCarousel(name, desc, images, index) {
    const carouselContainer = createElementWithClass('div', 'carousel-container');
    const img_carrousel = createElementWithClass('div', 'image-wrapper');
    const imageElement = createImage(images[0]);
    const prevButton = createIcon('fa fa-arrow-left', '1em', 'white', 'pointer', () => prevImage());
    const nextButton = createIcon('fa fa-arrow-right', '1em', 'white', 'pointer', () => nextImage());
    const textOverlay = createElementWithClass('div', 'text-overlay');

    let currentIndex = 0;
    let startX = 0;
    let endX = 0;

    // Ajout des images et du texte
    img_carrousel.appendChild(imageElement);
    carouselContainer.appendChild(img_carrousel);
    textOverlay.appendChild(createText('h4', name));
    textOverlay.appendChild(createText('p', desc));
    carouselContainer.appendChild(textOverlay);
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);

    // Gestion du hover sur les boutons
    const hideTextOverlay = () => textOverlay.classList.add('hidden');
    const showTextOverlay = () => textOverlay.classList.remove('hidden');

    // Gestion du hover sur les boutons
    prevButton.addEventListener('mouseover', hideTextOverlay);
    prevButton.addEventListener('mouseout', showTextOverlay);
    nextButton.addEventListener('mouseover', hideTextOverlay);
    nextButton.addEventListener('mouseout', showTextOverlay);

    // Gestion du hover sur le textOverlay lui-même
    textOverlay.addEventListener('mouseover', hideTextOverlay);
    textOverlay.addEventListener('mouseout', showTextOverlay);

    // Gestion du glissement (swipe)
    img_carrousel.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });

    img_carrousel.addEventListener('touchend', (event) => {
        endX = event.changedTouches[0].clientX;
        if (startX > endX + 50) {
            nextImage();
        } else if (startX < endX - 50) {
            prevImage();
        }
    });

    // Fonction pour afficher l'image suivante
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    // Fonction pour afficher l'image précédente
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }

    // Fonction pour mettre à jour l'image affichée
    function updateImage() {
        imageElement.src = images[currentIndex];
        imageElement.classList.add('fade-in');
        setTimeout(() => {
            imageElement.classList.remove('fade-in');
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
    const totalPages = 4; // Quatre pages: image, vidéo, description, lien GitHub

    // Ajout des médias (images)
    media.forEach((mediaSrc) => {
        const slide = createElementWithClass('div', 'carousel-slide');
        const imageElement = createImage(mediaSrc);
        slide.appendChild(imageElement);
        imageWrapper.appendChild(slide);
    });
    
    // Ajout de la description sur une page dédiée (Page 2)
    const descriptionSlide = createElementWithClass('div', 'carousel-slide', 'text-slide');
    const descText = createText('p', desc);
    descriptionSlide.appendChild(descText);
    imageWrapper.appendChild(descriptionSlide);

    // Ajout de la vidéo comme page 3 si disponible
    if (videoLink) {
        const videoSlide = createElementWithClass('div', 'carousel-slide', 'video-slide');
        const videoElement = document.createElement('video');
        videoElement.src = videoLink;
        videoElement.controls = true;
        videoElement.className = 'carousel-video';
        videoSlide.appendChild(videoElement);
        imageWrapper.appendChild(videoSlide);
    }

    
    

    // Ajout du lien GitHub (Page 4)
    const githubSlide = createElementWithClass('div', 'carousel-slide', 'text-slide');
    githubSlide.appendChild(createGitHubLink(githubLink));
    imageWrapper.appendChild(githubSlide);

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

