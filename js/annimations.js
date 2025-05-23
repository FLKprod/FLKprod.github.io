import{scrollauto} from './index.js'




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


function toggleModeNuit() {
    const daynightCheckbox = document.getElementById('daynight');
    const image_intro_for_photo = document.getElementById('image-intro-for-photo');
    if (!daynightCheckbox.checked) {
        document.body.classList.add('mode-nuit');

        if (image_intro_for_photo) {
            image_intro_for_photo.src = "Photos/dark_sommaire_photos.jpg";
        } else {
            console.warn("L'élément #image-intro-for-photo est introuvable pour le mode nuit.");
        }
    } else {
        document.body.classList.remove('mode-nuit');

        if (image_intro_for_photo) {
            image_intro_for_photo.src = "Photos/sommaire_photos.jpg";
        } else {
            console.warn("L'élément #image-intro-for-photo est introuvable pour le mode jour.");
        }
    }

}


const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (isDarkMode) {
    console.log("Mode sombre actif")
    daynightCheckbox.checked = false;
    toggleModeNuit();
}



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
    scrollauto(".up");
});


window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

if (window.innerWidth > 1100) {
    let lastScrollY = window.scrollY;
    const menu = document.querySelector('.menu');

    // Fonction principale de gestion du scroll
    function handleScroll() {
        if (window.scrollY > lastScrollY) {
            menu.classList.add('hidden'); // Cache le menu en descendant
        } else {
            menu.classList.remove('hidden'); // Montre le menu en remontant
        }
        lastScrollY = window.scrollY;
    }

    // Écouteur principal du scroll (PC et mobile)
    window.addEventListener('scroll', handleScroll);

    // Gestion spécifique du scroll tactile (au cas où `scroll` seul ne suffit pas)
    let touchStartY = 0;

    window.addEventListener('touchstart', (event) => {
        touchStartY = event.touches[0].clientY;
    });

    window.addEventListener('touchmove', (event) => {
        const touchEndY = event.touches[0].clientY;

        if (touchEndY < touchStartY) {
            menu.classList.add('hidden'); // Cache le menu en descendant
        } else {
            menu.classList.remove('hidden'); // Montre le menu en remontant
        }
        touchStartY = touchEndY;
    });

}
