import {
    createImage,
    createElementWithClass,
    createIcon,
    createText
  } from './createElements.js';
  
  // Fonction pour créer un carrousel pour une catégorie donnée
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
    textOverlay.appendChild(createText('h2', name));
    textOverlay.appendChild(createText('p', desc));
    carouselContainer.appendChild(textOverlay);
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);

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