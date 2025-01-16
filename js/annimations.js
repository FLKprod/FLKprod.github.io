gsap.from('.logo',{scale:0,stagger:1, duration:1.5 });
gsap.from('#logo',{opacity:0, x:"-20rem",duration:2});
gsap.from('.switch',{opacity:0, y:"-10rem",duration:2});
gsap.from('.social-networks',{opacity:0, y:"-10rem",duration:3});
gsap.from('.sections-menu',{opacity:0, x:"20rem",duration:2});
const offset = window.innerWidth * 0.7;

gsap.from('.menu-mobile', {
    opacity: 0,
    x: -offset,
    duration: 1,
    delay: 2
})

/*********************** INTRO DE DEBUT D'ENTREE SUR LE SITE************************************/

gsap.from('#introGif',{scale:0,stagger:1, duration:0.4,yoyo: true,repeat: 1});
var introGif = document.getElementById("introGif");
var mainContent = document.getElementById("mainContent");
setTimeout(function() {
    introGif.style.opacity = 0;
    mainContent.style.opacity = 1;
    mainContent.classList.remove('hidden');
    document.getElementById("introContainer").style.display='none';
    console.log("time");
}, 800);

/******************************* MODE NUIT  *****************************************************************/

const daynightCheckbox = document.getElementById('daynight');
const downlogo=document.getElementById('down-logo')
const image_intro_for_photo = document.getElementById('image-intro-for-photo');


function toggleModeNuit() {
    const daynightCheckbox = document.getElementById('daynight');
    const downlogo =document.getElementById('down-logo');
    const image_intro_for_photo = document.getElementById('image-intro-for-photo');
    if (!daynightCheckbox.checked) {
        document.body.classList.add('mode-nuit');
        if (downlogo) {
            downlogo.src = "Photos/logos/flkwhite.png";
        } else {
            console.warn("L'élément #down-logo est introuvable pour le mode nuit.");
        }

        if (image_intro_for_photo) {
            image_intro_for_photo.src = "Photos/dark_sommaire_photos.jpg";
        } else {
            console.warn("L'élément #image-intro-for-photo est introuvable pour le mode nuit.");
        }
    } else {
        document.body.classList.remove('mode-nuit');
        
        if (downlogo) {
            downlogo.src = "Photos/logos/flkblack.png";
        } else {
            console.warn("L'élément #down-logo est introuvable pour le mode jour.");
        }

        if (image_intro_for_photo) {
            image_intro_for_photo.src = "Photos/sommaire_photos.jpg";
        } else {
            console.warn("L'élément #image-intro-for-photo est introuvable pour le mode jour.");
        }
    }
}

toggleModeNuit();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
    daynightCheckbox.checked = window.matchMedia('(prefers-color-scheme: dark)').matches;
    toggleModeNuit();
});

document.getElementById('daynight').addEventListener('change', toggleModeNuit);

function toggleMenu() {
    var menuMobile = document.querySelector('.menu-mobile');
    var menuDesktopButtons = document.querySelectorAll('.sections-menu');
    menuMobile.classList.toggle('active');
    menuDesktopButtons.forEach(button => {
        if (button !== menuMobile){
            button.style.display = menuMobile.classList.contains('active') ? 'block' : 'none';
            button.classList.add('fondu');
        }
    });
}

const menuButton = document.querySelector('.menu-mobile');
menuButton.addEventListener('click', toggleMenu);


// BOUTON POUR RETOURNER TOUT EN HAUT DE L'ECRAN
const backToTopButton = document.getElementById('backToTopButton');

backToTopButton.addEventListener('click', () => {
    const startPosition = window.scrollY; // Position actuelle de défilement
    const targetPosition = 0; // Haut de la page
    const distance = targetPosition - startPosition; // Distance à parcourir
    const duration = 1000; // Durée totale de l'animation en millisecondes
    const startTime = performance.now();

    // Fonction d'animation
    function animateScroll(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Normalise entre 0 et 1

        // Courbe d'accélération et de ralentissement (easeInOutQuad)
        const easeInOutQuad = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        // Nouvelle position
        const newPosition = startPosition + distance * easeInOutQuad;
        window.scrollTo(0, newPosition);

        // Continue l'animation si le temps n'est pas écoulé
        if (elapsedTime < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
});


window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});


