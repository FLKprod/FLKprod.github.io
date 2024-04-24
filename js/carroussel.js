import {
    createImage,
    createElementWithClass,
    createIcon,
    createText
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