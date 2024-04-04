import {
    createImage,
    createElementWithClass,
    createIcon,
    createText
  } from './createElements.js';
  
  // Fonction pour créer un carrousel pour une catégorie donnée
export function createCarousel(category, images) {
    const carouselContainer = createElementWithClass('div', 'carousel-container');
    const imageElement = createImage(images[0]);
    const prevButton = createIcon('fa fa-arrow-left', '1em', 'white', 'pointer', () => prevImage());
    const nextButton = createIcon('fa fa-arrow-right', '1em', 'white', 'pointer', () => nextImage());
  
    let currentIndex = 0;
  
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(imageElement);
    carouselContainer.appendChild(nextButton);
  
    category.appendChild(carouselContainer);
  
    // Fonction pour afficher l'image suivante
    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      imageElement.src = images[currentIndex];
    }
  
    // Fonction pour afficher l'image précédente
    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      imageElement.addEventListener('fade-in');
      imageElement.src = images[currentIndex];
    }
  }
  
  // Fonction pour créer une catégorie avec son carrousel
export function createCategoryWithCarousel(categoryName, images) {
    const categoryElement = createElementWithClass('div', 'categorie_photos');
    const titleElement = createText('h2', categoryName);
  
    categoryElement.appendChild(titleElement);
    createCarousel(categoryElement, images);
  
    return categoryElement;
}

