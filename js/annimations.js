gsap.from('.logo',{scale:0,stagger:1, duration:1.5 });
gsap.from('#logo',{opacity:0, x:"-20rem",duration:2});
gsap.from('.switch',{opacity:0, y:"-10rem",duration:2});
gsap.from('.social-networks',{opacity:0, y:"-10rem",duration:3});
gsap.from('.sections-menu',{opacity:0, x:"20rem",duration:2});
gsap.from('.menu-mobile',{opacity:0, x:"-20rem",duration:1,delay:2});
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
const logo = document.getElementById('logo');
function toggleModeNuit() {
    if (daynightCheckbox.checked) {
        document.body.classList.add('mode-nuit');
        logo.src = "Photos/textures/logo.png";
    } else {
        document.body.classList.remove('mode-nuit');
        logo.src = "Photos/textures/logoneg.png";
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