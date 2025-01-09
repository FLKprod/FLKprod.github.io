import {
    createImage,
    createElementWithClass,
    createIcon,
    createText,
    createGitHubLink
  } from './createElements.js';
  
  export function createCarousel(name, desc, images, index,textoverlay) {
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
    // CARROUSEL POUR LE MENU
    if(textoverlay === true){
        textOverlay.appendChild(createText('h4', name));
        textOverlay.appendChild(createText('p', desc));
        carouselContainer.appendChild(textOverlay);
        
    }
    // CAROUSSEL POUR LE MODAL
    else{
        carouselContainer.appendChild(prevButton);
        carouselContainer.appendChild(nextButton);
    }

    // Modal global
    const modal = document.getElementById('carousel-modal');
    const modalContent = document.getElementById('modal-content');

    // Gestion de l'ouverture d'un modal
    function openModal(content) {
        const modal = document.getElementById('carousel-modal');
        const modalContent = document.getElementById('modal-content');

        // Vérifie si le modal est déjà visible
        if (modal.style.display === 'flex') {
            return; 
        }

        // Configure et affiche le modal
        modalContent.innerHTML = '';
        modalContent.appendChild(content.cloneNode(true)); 
        modal.style.display = 'flex';
    }

    // Gestion de la fermeture du modal
    document.addEventListener('click', (event) => {
        const modal = document.getElementById('carousel-modal');
        const modalContent = document.getElementById('modal-content');

        // Vérifie si le modal est visible
        if (modal.style.display === 'flex') {
            // Si le clic est à l'extérieur du contenu du modal, fermer
            if (!modalContent.contains(event.target)) {
                modal.style.display = 'none'; // Ferme le modal
                modalContent.innerHTML = ''; // Nettoie le contenu du modal
            }
        }
    });

    // Exemple d'utilisation pour ouvrir un modal
    document.querySelectorAll('.carousel-container').forEach((carousel) => {
        carousel.addEventListener('click', () => {
            openModal(carousel);
        });
    });


    // Fonction pour fermer le modal
    const closeModal = (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    };

    // Écouteurs pour ouvrir et fermer le modal
    img_carrousel.addEventListener('click', openModal);
    modal.addEventListener('click', closeModal);

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

    // Variables pour suivre la position initiale et finale du doigt
    let touchStartX = 0;
    let touchEndX = 0;


    // Détecter le début du toucher
    carouselContainer.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX; // Position initiale
    });

    // Détecter la fin du toucher
    carouselContainer.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX; // Position finale
        handleSwipeDirection(); // Analyser la direction
    });


    function handleSwipeDirection() {
        const deltaX = touchEndX - touchStartX;
        textOverlay.classList.add('hidden');
        if (Math.abs(deltaX) > 50) { // Seulement si le mouvement est significatif
            if (deltaX > 0) {
                handleSwipe('right'); // Swipe à droite
            } else {
                handleSwipe('left'); // Swipe à gauche
            }

            if (element.classList.contains('hidden')) {
                element.classList.remove('hidden'); // Afficher si caché
            } else {
                element.classList.add('hidden'); // Cacher si visible
            }
        }
    }

    // Fonction appelée lors d'un swipe détecté
    function handleSwipe(direction) {
        
        if (direction === 'left') {
            nextImage()
            // Ajoutez ici votre logique pour un swipe vers la gauche
        } else if (direction === 'right') {
            prevImage()
            // Ajoutez ici votre logique pour un swipe vers la droite
        }
    }

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
        // Crée un nouvel élément d'image pour la transition
        const nextImageElement = createImage(images[currentIndex]);
        nextImageElement.style.position = "absolute";
        nextImageElement.style.top = "0";
        nextImageElement.style.left = "0";
        nextImageElement.style.width = "100%";
        nextImageElement.style.height = "100%";
        nextImageElement.style.opacity = "0"; // Nouvelle image commence invisible
        nextImageElement.style.transition = "opacity 0.5s ease";
    
        // Ajoute la nouvelle image par-dessus l'image actuelle
        img_carrousel.appendChild(nextImageElement);
    
        // Lance l'animation en fondu
        setTimeout(() => {
            nextImageElement.style.opacity = "1"; // Nouvelle image devient visible
        }, 0);
    
        // Une fois l'animation terminée, remplace l'image principale et nettoie
        setTimeout(() => {
            // Supprime l'ancienne image de transition
            
    
            // Met à jour la référence de l'image principale
            imageElement = nextImageElement;
            img_carrousel.removeChild(imageElement);
        }, 500); // Délai égal à la durée de la transition
    }
    
    
    

    return carouselContainer;
}

// Fonction pour ouvrir un carrousel en grand
function openCarousel(carrousel) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
  
    // Copier le contenu du carrousel cliqué dans le modal
    modalContent.innerHTML = carrousel.innerHTML;
  
    // Afficher le modal
    modal.classList.add('active');
  }
  
  // Fonction pour fermer le modal
  function closeCarousel(event) {
    const modal = document.getElementById('modal');
  
    // Vérifier si l'utilisateur clique en dehors du contenu
    if (event.target === modal) {
      modal.classList.remove('active');
    }
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

