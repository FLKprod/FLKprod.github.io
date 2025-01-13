gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.from('#logo', {
    opacity: 0,
    x: "-10rem",
    duration: 2
});

gsap.from('.social-networks', {
    opacity: 0,
    x: "20rem",
    duration: 2
});



gsap.from('.banniere', {
    opacity: 0,  
    duration: 3, 
    ease: "power2.out"
});

gsap.from('.title', {
    scale: 0,
    stagger: 1,
    duration: 1.5
});

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".intro-for-photos",
        start: "top bottom", 
        end: "bottom center",  
        scrub: true,            
    }
});


var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#jda",
        start: "top bottom", 
        end: "bottom center",  
        scrub: true,            
    }
});

tl.from("#jda > h1", { 
    opacity: 0,     
    duration: 1, 
    ease: "power1.out", 
    stagger: 0.2 
});
tl.from('#jda > .img-section', {
    opacity: 0,
    y: "-25%",
    duration: 2
});

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#cotedor",
        start: "top bottom", 
        end: "bottom center",  
        scrub: true,            
    }
});

tl.from("#cotedor", { 
    opacity: 0,     
    duration: 1, 
    ease: "power1.out", 
    stagger: 0.2 
});
tl.from('#cotedor > .img-section', {
    opacity: 0,
    y: "-25%",
    duration: 2
});

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#nature",
        start: "top bottom", 
        end: "bottom center",  
        scrub: true,            
    }
});

tl.from("#nature", { 
    opacity: 0,     
    duration: 1, 
    ease: "power1.out", 
    stagger: 0.2 
});
tl.from('#nature > .img-section', {
    opacity: 0,
    y: "50%",
    x: "50%",
    duration: 2
});

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".personne",
        start: "top bottom", 
        end: "bottom center",  
        scrub: true,            
    }
});
tl.from('.personne', {
    opacity: 0,
    x: "50%",
    duration: 2
});


/********************FORM CONTACT************************************************** */

document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const subject = document.getElementById('subject').value;
    const body = document.getElementById('body').value;

    // Crée une URL mailto
    //const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Ouvre le client mail
    //window.location.href = mailtoLink;

    // Masque le formulaire avec une transition de fermeture verticale
    const formContainer = document.getElementById('emailForm');
    formContainer.classList.add('hidden');

    // Affiche le message de remerciement après un délai
    setTimeout(() => {
        const thankYouMessage = document.getElementById('thankYouMessage');
        thankYouMessage.classList.add('visible');
    }, 500);
});


