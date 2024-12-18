import {
    createImage,
    createElementWithClass,
    createIcon,
    createText
  } from './createElements.js';
  
  // Fonction pour créer un carrousel pour une catégorie donnée
export function createCarousel(name, desc, images,index) {
    const carouselContainer = createElementWithClass('div', 'carousel-container');
    const img_carrousel = createElementWithClass('div', 'image-wrapper');
    const imageElement = createImage(images[0]);
    const prevButton = createIcon('fa fa-arrow-left', '1em', 'white', 'pointer', () => prevImage());
    const nextButton = createIcon('fa fa-arrow-right', '1em', 'white', 'pointer', () => nextImage());
    const textOverlay = createElementWithClass('div', 'text-overlay');

    let currentIndex = 0;
    
    img_carrousel.appendChild(imageElement);
    carouselContainer.appendChild(img_carrousel);       
    textOverlay.appendChild(createText('h2', name));
    textOverlay.appendChild(createText('p', desc));

    // Vérifier si on est en mode mobile
    /*const phone = window.innerWidth < 1100;
    if (index % 2 === 1 && !phone) {
      // Si l'indice est impair et qu'on n'est pas sur mobile, inverser les éléments
      F
      carouselContainer.appendChild(categoryElement);
    } else {
        // Sinon, ajouter dans l'ordre normal
        carouselContainer.appendChild(categoryElement);
        carouselContainer.appendChild(textOverlay);
    }*/
    carouselContainer.appendChild(textOverlay);
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);
  
    return carouselContainer;
  
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


// Pour recuperer toutes les images d'un dossier afin de gerer le nombres d'image dans les carrousels dynamiquement
export function generateImagePaths(folderName,nbrepictures) {
  const imagePaths = [];
  for (let i = 1; i <= nbrepictures; i++) {
      imagePaths.push(`Photos/Carrousel/${folderName}/${folderName}${i}.jpg`);
  }
  return imagePaths;
}