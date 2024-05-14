import {
    createImage,
    createElementWithClass,
    createIcon,
    createText,
    createVideoElement,
    updateVideoElement,
    updatedescVideo
  } from './createElements.js';
  
  // Fonction pour créer un carrousel pour une catégorie donnée
export function createCarousel(name, images, category) {
    const carouselContainer = createElementWithClass('div', 'carousel-container');
    const imageElement = createImage(images[0]);
    const prevButton = createIcon('fa fa-arrow-left', '1em', 'white', 'pointer', () => prevImage());
    const nextButton = createIcon('fa fa-arrow-right', '1em', 'white', 'pointer', () => nextImage());
  
    let currentIndex = 0;
  
    
    carouselContainer.appendChild(imageElement);
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);
  
    name.appendChild(carouselContainer);
  
    // Fonction pour afficher l'image suivante
    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      imageElement.src = images[currentIndex];
      imageElement.classList.add('fade-in');
      setTimeout(() => {
        imageElement.classList.remove('fade-in');
      }, 500);
    }
    
    // Fonction pour afficher l'image précédente
    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      imageElement.src = images[currentIndex];
      imageElement.classList.add('fade-in');
      setTimeout(() => {
        imageElement.classList.remove('fade-in');
      }, 500);
    }
    
    
  }

  export function createVideoCarousel(videos) {
    const carouselContainer = createElementWithClass('div', 'carousel-container');
    const videoElement = createVideoElement(videos[0].url,videos[0].description);
    const prevButton = createIcon('fa fa-arrow-left', '1em', 'white', 'pointer', () => prevVideo());
    const nextButton = createIcon('fa fa-arrow-right', '1em', 'white', 'pointer', () => nextVideo());

    let currentIndex = 0;

    carouselContainer.appendChild(videoElement);
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);
    // Fonction pour afficher la vidéo suivante
    function nextVideo() {
        currentIndex = (currentIndex + 1) % videos.length;
        updateVideoElement(videos[currentIndex].url)
        updatedescVideo(videos[currentIndex].description)
        videoElement.classList.add('fade-in');
        setTimeout(() => {
            videoElement.classList.remove('fade-in');
        }, 500);
    }

    // Fonction pour afficher la vidéo précédente
    function prevVideo() {
        currentIndex = (currentIndex - 1 + videos.length) % videos.length;
        videoElement.src = videos[currentIndex].url;
        videoElement.classList.add('fade-in');
        setTimeout(() => {
            videoElement.classList.remove('fade-in');
        }, 500);
    }

    return carouselContainer; // Retourne le conteneur du carrousel
}



  
  // Fonction pour créer une catégorie avec son carrousel
export function createCategoryWithCarousel(name, images,category) {
    const nameElement = createElementWithClass('div', 'categorie_photos');
    const titleElement = createText('h2', name);
    nameElement.setAttribute("category", category);
    nameElement.appendChild(titleElement);
    createCarousel(nameElement, images);

    return nameElement;
}

// Pour recuperer toutes les images d'un dossier afin de gerer le nombres d'image dans les carrousels dynamiquement
export function generateImagePaths(folderName) {
  const imagePaths = [];
  const imageCount = 4; // Nombre d'images dans chaque dossier
  for (let i = 1; i <= imageCount; i++) {
      imagePaths.push(`Photos/Carrousel/${folderName}/${folderName}${i}.jpg`);
  }
  return imagePaths;
}