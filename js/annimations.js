gsap.from('.logo',{scale:0,stagger:1, duration:1.5 });
gsap.from('#logo',{opacity:0, x:"-20rem",duration:2});
gsap.from('.switch',{opacity:0, y:"-10rem",duration:2});
gsap.from('.social-networks',{opacity:0, y:"-10rem",duration:3});
gsap.from('.sections-menu',{opacity:0, x:"20rem",duration:2});
const offset = window.innerWidth * 0.7; // 70% de la largeur de la fenêtre ( 20 de plus pour etre sur qu'il est bien caché)

gsap.from('.menu-mobile', {
    opacity: 0,
    x: -offset,  // Utilisation de la valeur calculée
    duration: 1,
    delay: 2
})
gsap.from('#introGif',{scale:0,stagger:1, duration:0.4,yoyo: true,repeat: 1});
/*
var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".section-presentation", // Déclencher lorsque la quatrième div est visible
        start: "top center", // Ajuster la valeur de départ
        end: "center bottom", // Ajuster la valeur de fin
        scrub: true, // Pour une animation fluide
    }
});

// Ajouter l'animation pour la ligne
tl2.to(".line4", { scaleX: 1, ease: "none" })
.to(".section-presentation", { backgroundColor: "red"}, 0);
*/
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
const logo = document.getElementById('presentation-img-2');
const downlogo=document.getElementById('down-logo')
const baniere = document.getElementById('baniere');
const photo2_presentation = document.getElementById('presentation-img-2');
function toggleModeNuit() {
    const daynightCheckbox = document.getElementById('daynight');
    const logo = document.getElementById('presentation-img-2');
    const downlogo =document.getElementById('down-logo')
    const baniere = document.getElementById('baniere');
    const photo2_presentation = document.getElementById('presentation-img-2');
    if (!daynightCheckbox.checked) {
        document.body.classList.add('mode-nuit');
        downlogo.src = "Photos/logos/flkwhite.png";
    } else {
        document.body.classList.remove('mode-nuit');
        console.log("mode nuit")
        downlogo.src = "Photos/logos/flkblack.png";
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


// Sélection du bouton
const backToTopButton = document.getElementById('backToTopButton');

// Ajout d'un écouteur d'événements au clic sur le bouton
backToTopButton.addEventListener('click', () => {
    // Faites défiler jusqu'au haut de la page
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Ajout d'un écouteur d'événements pour afficher ou masquer le bouton en fonction de la position de défilement de la page
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});


