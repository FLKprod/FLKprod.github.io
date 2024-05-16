import {createImage, createText, createDivImage, createIconWithLink, createElementWithClass, createIcon, createOption, createVideo, createOverlayImage, createImageElement, createVideoWithOverlay, createVideoElement, updateVideoElement, updateImageElement } from './createElements.js';
import {createCategoryWithCarousel, createVideoCarousel, generateImagePaths} from './carroussel.js';

gsap.from('.logo',{scale:0,stagger:1, duration:1.5});
gsap.from('#logo',{opacity:0, x:"-20rem",duration:2});
gsap.from('.switch',{opacity:0, y:"-10rem",duration:2});
gsap.from('.social-networks',{opacity:0, y:"-10rem",duration:3});
gsap.from('.sections-menu',{opacity:0, x:"20rem",duration:2});
gsap.from('.menu-mobile',{opacity:0, x:"-20rem",duration:1,delay:2});
gsap.from('.down',{opacity:0, y:"-20rem",duration:2});


document.addEventListener('contextmenu', event => event.preventDefault());

toggleTeamInfo('presentation');
var introGif = document.getElementById("introGif");
var mainContent = document.getElementById("mainContent");
setTimeout(function() {
    introGif.style.opacity = 0;
    introGif.removeAttribute("loop");
    mainContent.style.opacity = 1;
    mainContent.classList.remove('hidden');
}, 0);
document.getElementById("introContainer").style.display='none';


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

const buttonIds = ['presentation', 'projets', 'videos', 'photos'];
buttonIds.forEach(buttonId => {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', function() {
        toggleTeamInfo(buttonId);
    });
});



function toggleTeamInfo(id) {
    
    var buttons = document.querySelectorAll('.menu button');
    buttons.forEach(function(button) {
        button.classList.remove('select');
    });
    var selectedButton = document.getElementById(id);
    if (selectedButton) {
        console.log("section " + id);
        selectedButton.classList.add('select');
    }

    var presentationContainer = document.querySelector('.presentation-container');
    var videosContainer = document.querySelector('.videos-container');
    var projetsContainer = document.querySelector('.projets-container');
    var photosContainer = document.querySelector('.photos-container');
    
    presentationContainer.innerHTML = '';
    videosContainer.innerHTML = '';
    projetsContainer.innerHTML = '';
    photosContainer.innerHTML = '';
    
    if(id=== 'videos'){

        gsap.from('.videos-container',{scale:0,stagger:1, duration:2,stagger:1});
        videosContainer.classList.add('fade-in');

        var intro2videos = createElementWithClass('div','section');

        var text_intro2videos = createElementWithClass('div','text-section');
        text_intro2videos.appendChild(createText('h2',"Mes contenus vidéos"));
        text_intro2videos.appendChild(createText('p',"Passionné par le montage vidéo et constamment à la recherche d'inspiration pour créer du contenu, je saute sur l'occasion de concrétiser une idée germeant dans mon esprit, à travers des vidéos captivantes et originales. Auparavant, je partageais mes créations sur mon compte Instagram <a href='https://www.instagram.com/flkprod_/' target='_blank'>@FLKPROD_</a>, qui est toujours actif à ce jour. Maintenant, c'est sur ce site que toutes mes créations seront postées. Vous pouvez consulter toutes mes creations dans la rubrique ci-dessous. <strong>Enjoy.</strong>"));
        intro2videos.appendChild(text_intro2videos);
        videosContainer.appendChild(intro2videos);
  
    
        var galerie =createElementWithClass("div","galerie-videos");
        galerie.appendChild(createImageElement("img", 'pelicule', "Photos/textures/pelicule.jpg", "Description de l'image"));

        const videosData = [
            {
                url: 'https://www.youtube.com/embed/sDuDS7t4UsU',
                description: "Création d'une introduction avec pour thème la montée en puissance de la menace cybernétique dans notre ère moderne."
            },
            {
                url: 'https://www.youtube.com/embed/fNdTNYmgD8o',
                description: "Création d'une vidéo humoristique pour une campagne du Bureau des Élèves de mon école d'ingénieurs."
            }
        ];
        
        var videos = createElementWithClass("div","videos");
        videos.appendChild(createVideoCarousel(videosData));
        galerie.appendChild(videos);
        
        galerie.appendChild(createImageElement("img", 'pelicule', "Photos/textures/pelicule.jpg", "Description de l'image"));
        videosContainer.appendChild(galerie);
        }
    else if(id=== 'presentation'){
        presentationContainer.classList.add('fade-in');
        
        gsap.from('.presentation-container',{scale:0,stagger:1, duration:2,stagger:1});
        var intro2presentation = createElementWithClass('div','section');
        var image_intro2presentation = createElementWithClass('div','image-section');
        image_intro2presentation.appendChild(createImage('Photos/moi.JPG'));
        intro2presentation.appendChild(image_intro2presentation);

        var text_intro2presentation = createElementWithClass('div','text-section');
        text_intro2presentation.appendChild(createText('h2',"Moi, c’est Maxime"));
        text_intro2presentation.appendChild(createText('p',"J'ai 22 ans et j'étudie en école d'ingénieur en sécurité informatique à Dijon. Actuellement, je suis en double diplôme en cybersécurité à Chicoutimi, au beau milieu du Québec. J'ai plusieurs grandes passions telles que la photographie, la vidéo et l'informatique."));
        text_intro2presentation.appendChild(createText('p',"En dehors des salles de cours, je m'investis pleinement dans la création de contenus visuels que je partage sur mes réseaux sociaux, ainsi que dans des projets informatiques à titre personnel pour l'instant. C'est sur ce site que vous trouverez toutes mes créations."));
        intro2presentation.appendChild(text_intro2presentation);
        presentationContainer.appendChild(intro2presentation);

        var intro2lbnl = createElementWithClass('div','section');

        var image_intro2lbnl = createElementWithClass('div','berkeley-section');
        image_intro2lbnl.appendChild(createImage('Photos/LBNL.jpg'));

        intro2lbnl.appendChild(image_intro2lbnl);
        var text_intro2lbnl = createElementWithClass('div','text-section');
        text_intro2lbnl.appendChild(createText('p',"En 2023, j'ai eu l'opportunite et l'honneur d'effectuer un stage en tant que developpeur informatique a <strong>Berkeley</strong>, au sein des <strong>Lawrence Berkeley National Laboratory</strong> (LBNL). Ma mission portait sur le projet <strong>FUEGO</strong> (<a href='https://fuego.ssl.berkeley.edu/' target='_blank'>Fire Urgency Estimator in Geostationary Orbit</a>). Cette expérience captivante a été la concrétisation de mon rêve américain. J'en parle davantage dans la rubrique PROJETS du site. N'hésitez pas à aller voir !"));
        intro2lbnl.appendChild(text_intro2lbnl);

        image_intro2lbnl = createElementWithClass('div','berkeley-section');
        image_intro2lbnl.appendChild(createImage('Photos/Berkeley.jpg'));
        intro2lbnl.appendChild(image_intro2lbnl);

        

        presentationContainer.appendChild(intro2lbnl);

        var certifications = createElementWithClass('div','section');

        var text_certifications = createElementWithClass('div','text-section');

        
        
        text_certifications.appendChild(createText('h2',"Mes Certifications en réseaux"));
        var listescertifications = document.createElement("ul");
        listescertifications.appendChild(createText('li',"<strong>CCNA</strong> (<strong>C</strong>isco <strong>C</strong>ertified <strong>N</strong>etwork <strong>A</strong>ssociate) "));
        listescertifications.appendChild(createText('li',"Cybersecurity Essentials By Cisco"));
        listescertifications.appendChild(createText('li',"Network Security By Cisco"));
        text_certifications.appendChild(listescertifications);
        certifications.appendChild(text_certifications);

        var image_certifications = createElementWithClass('div','image-section');
        image_certifications.appendChild(createImage('Photos/CCNA.png'));
        certifications.appendChild(image_certifications);
        presentationContainer.appendChild(certifications);

        var cv_section = createElementWithClass('div','section');

        var image_certifications = createElementWithClass('div','image-section');
        image_certifications.appendChild(createImage('Photos/Photo_CV.jpg'));
        cv_section.appendChild(image_certifications);

        var text_cv_section = createElementWithClass('div','text-section');
        
        text_cv_section.appendChild(createText('h2',"Plus d'infos sur mon profil ?"));
        text_cv_section.appendChild(createText('p',"Ci-joint mon CV en anglais et en français"));
        
        text_cv_section.appendChild(createIconWithLink("fa fa-file-pdf", "docs/Resume_Maxime_Falkowski.pdf"));
        text_cv_section.appendChild(createIconWithLink("fa fa-file-pdf", "docs/CV_Maxime_Falkowski.pdf"));

        text_cv_section.appendChild(createText('p',"<strong>PS :</strong> Je suis actuellement à la <strong>recherche</strong> d'un <strong>stage</strong> en <strong>cybersécurité</strong> à partir de <strong>septembre 2024</strong>. Si vous avez des opportunités à me proposer, je suis preneur !"));
        cv_section.appendChild(text_cv_section);

        presentationContainer.appendChild(cv_section);

        
        
        }
    else if(id === 'photos'){
        gsap.from('.photos-container',{scale:0,stagger:1, duration:2});
        photosContainer.classList.add('fade-in');

        var citation = document.createElement('div');
        citation.className='citation';
        citation.appendChild(createText('p', "Ce que la photographie reproduit à l’infini n’a lieu qu’une fois"));
        photosContainer.appendChild(citation);


        var intro2photographies = createElementWithClass('div','section');
        var image_intro2photographies = createElementWithClass('div','image-section');
        image_intro2photographies.appendChild(createImage('Photos/text-photo.JPG'));
        intro2photographies.appendChild(image_intro2photographies);

        var text_intro2photographies = createElementWithClass('div','text-section');
        text_intro2photographies.appendChild(createText('h2',"Mes contenus photographiques"));
        text_intro2photographies.appendChild(createText('p',"Toujours avec un appareil photo sur moi, la photographie est ma passion depuis mon enfance. L'idée de recréer des émotions à travers un fichier PNG me passionne depuis qu'on a mis une caméra entre mes mains. Depuis, je cherche toujours à créer de nouvelles œuvres, que vous pouvez trouver ici. <strong>Enjoy.</strong>"));
        intro2photographies.appendChild(text_intro2photographies);
        photosContainer.appendChild(intro2photographies);
        var categories_photos = createElementWithClass('div','categories_photos');

        var titre_categories = createElementWithClass('div','text-section');
        titre_categories.appendChild(createText('h2',"Categories"));
        photosContainer.appendChild(titre_categories);
        var menu_carrousels = createElementWithClass('div','menu_carrousels');
        menu_carrousels.appendChild(createDivImage("Voyages","Photos/voyages.png"));
        menu_carrousels.appendChild(createDivImage("Sports","Photos/sports.png"));
        photosContainer.appendChild(menu_carrousels);
        // Exemple de données (remplacez avec vos propres données)
        const categoriesData = [
        { name: 'Dijon', category:"Voyages", desc:"Bourgogne, France"},
        { name: 'Strasbourg', category:"Voyages",desc:"Alsace, France"},
        { name: 'San Francisco',category:"Voyages",desc:"California, USA" },
        { name: 'Quebec', category:"Voyages",desc:"Quebec, Canada" },
        { name: 'Baseball', category:"Sports",desc:"San Francisco Giants, USA, saison 2022-2023" },
        { name: 'Basket', category:"Sports",desc:"Betclic elite saison 2022-2023" }
        // Ajoutez plus de catégories avec leurs images au besoin
        ];

        // Créer et ajouter chaque catégorie avec son carrousel
        var carousel_section;
        categoriesData.forEach((categoryData, index) => {
            const carousel_section = createElementWithClass('div', 'section');
            const { name, category, desc } = categoryData;
            carousel_section.setAttribute("category", category);
            const images = generateImagePaths(name);
            const categoryElement = createCategoryWithCarousel(name, images, category);
            if (window.innerWidth < 1100) {
                var phone = true;
            }
            else{
                var phone = false;
            }
            // Vérifier si l'indice est impair
            const text_carousel_section = createElementWithClass('div', 'text-section');
                text_carousel_section.appendChild(createText('h2', name));
                text_carousel_section.appendChild(createText('p', desc));
            if (index % 2 === 1 && phone===false) {
                // Si l'indice est impair, inverser les éléments
                
                carousel_section.appendChild(text_carousel_section);
                carousel_section.appendChild(categoryElement);
            } else {
                // Si l'indice est pair, ajouter les éléments normalement
                carousel_section.appendChild(categoryElement);
                carousel_section.appendChild(text_carousel_section);
            }
            
            // Ajouter la section au conteneur de photos
            photosContainer.appendChild(carousel_section);
            });
            menu_carrousels.addEventListener('click', (event) => {
            const category = event.target.id.trim();
            console.log(category);
            if (category) {
                const allSections = document.querySelectorAll('.section');
        
                // Parcourir chaque section et vérifier si son attribut category correspond à la catégorie sélectionnée
                allSections.forEach(section => {
                    const sectionCategory = section.getAttribute('category');
                    if (sectionCategory && sectionCategory !== category) {
                        section.style.display = 'none';
                    } else {
                        section.style.display = 'flex';
                    }
                });
            }
        });
        
    }
    else if(id === 'projets'){
        gsap.from('.projets-container',{scale:0,stagger:1, duration:2,stagger:1});
        gsap.from('.menu3',{scale:0,stagger:1, duration:2,stagger:1});
        projetsContainer.classList.add('fade-in');
        var intro2projects = createElementWithClass('div','section');
        var text_intro2projects = createElementWithClass('div','text-section');
        text_intro2projects.appendChild(createText('h2',"Mes projets Informatiques"));
        text_intro2projects.appendChild(createText('p',"Étant en école d'ingénieurs et en maîtrise en cybersécurité, j'ai eu de nombreux projets informatiques à réaliser durant toute ma scolarité. Certains ne sont que des créations que j'ai réalisées par passion pour le code. <strong>Enjoy.</strong>"));
        intro2projects.appendChild(text_intro2projects);
        projetsContainer.appendChild(intro2projects);
        var projets = createElementWithClass('div','projets');
        
        var menuDiv = createElementWithClass('div','menu3');
        var menuList = [
            { name: "Flkprod.github.io", videoLink: "dwwd", imageSrc: "Photos/textures/logoneg.png",desc:""},
            { name: "FUEGO in Berkeley", videoLink: "wdwd", imageSrc: "Photos/projets/FUEGO.png",desc:"En 2023, j'ai eu l'opportunite et l'honneur d'effectuer un stage en tant que developpeur informatique a <strong>Berkeley</strong>, au sein des <strong>Lawrence Berkeley National Laboratory</strong> (LBNL). Ma mission portait sur le projet <strong>FUEGO</strong> (<a href='https://fuego.ssl.berkeley.edu/' target='_blank'>Fire Urgency Estimator in Geostationary Orbit</a>). Cette expérience captivante a été la concrétisation de mon rêve américain. Travailler au cœur de l'innovation technologique à Berkeley m'a offert une expérience unique, me permettant de contribuer au développement d'un outil de surveillance avancé pour estimer l'urgence des incendies. FUEGO exploite des technologies de pointe en télédétection pour évaluer en temps réel l'intensité et la propagation des incendies, combinant ces données avec des informations météorologiques et des modèles prédictifs. L'objectif est d'estimer rapidement la gravité des incendies, facilitant ainsi une réponse plus rapide et plus efficace des équipes d'intervention."},
            { name: "RockRush", videoLink: "Photos/projets/RockRush.mp4", imageSrc: "Photos/projets/RockRush.jpg" ,desc:"RockRush est un jeu en langage web créé durant ma formation ingénieur. C'est une version de Boulder Dash, un jeu classique où un mineur doit collecter tous les diamants sans se faire écraser par des pierres."},
            { name: "Application DeepL", videoLink: "Photos/projets/DeepL.mp4", imageSrc: "Photos/projets/DeepL.png" ,desc:"Ce projet constitue une application Android que j'ai développée dans le cadre de ma formation d'ingénieur. Conçue en Java et XML à l'aide d'Android Studio, cette application tire parti de l'API DeepL. Son objectif principal est de fournir un service de traduction de texte efficace et convivial."},
            { name: "201 Farehein", videoLink: "Photos/projets/201F.mp4", imageSrc: "Photos/projets/201F.png",desc: "201 Farehein est une parodie du célèbre jeu de mots '94 degrees'. Explorez un monde rempli de défis, de questions hilarantes et de réponses surprenantes. Testez vos connaissances géographiques tout en vous amusant !" },
            { name: "CyberSafe", videoLink: "Photos/projets/Cybersafe.mp4", imageSrc: "Photos/projets/Cybersafe.png",desc:"Une Plateforme de Surveillance des Vulnérabilités de Sécurité des Objets Connectés. Elle se met à jour automatiquement pour informer les utilisateurs sur les vulnérabilités de sécurité des objets connectés." },
            /*
            { name: "TowerDefender", videoLink: "", imageSrc: "",desc:"" },
            { name: "ToDoList pour IOs", videoLink: "", imageSrc: "",desc:"" },
            { name: "Carte intéractive", videoLink: "", imageSrc: "",desc:"" },*/
            
            { name: "LanbdaCash", videoLink: "Photos/projets/landbacash.mp4", imageSrc: "Photos/projets/landbacash.png",desc:"Projet CLOUD Chicoutimi " }
        ];
        for (let i = 0; i < menuList.length; i++) {
            menuDiv.appendChild(createText('ul',menuList[i].name));
        }
        var firstItem = menuList[0]; // Récupération du premier élément
        var projet = createElementWithClass('div','projet');
        projets.appendChild(menuDiv);
        var video_iframe=createVideoWithOverlay(firstItem.videoLink,firstItem.imageSrc)
        projet.appendChild(video_iframe);

        
        var titre_projet=createText('h2', firstItem.name)
        projet.appendChild(titre_projet);

        var description_projet = createText('p', firstItem.desc)
        projet.appendChild(description_projet);

        
        menuDiv.addEventListener('click', function(event) {
            if (event.target.tagName === 'UL') {
                
                var videoLink = menuList.find(item => item.name === event.target.textContent)?.videoLink;
                var imageLink = menuList.find(item => item.name === event.target.textContent)?.imageSrc;
                var descLink = menuList.find(item => item.name === event.target.textContent)?.desc;
                console.log("Changement de projet" + videoLink + "  " + imageLink);
                if (videoLink) {
                    projet.scrollIntoView({ behavior: 'smooth' });
                    description_projet.innerHTML=descLink;
                    titre_projet.innerHTML=event.target.textContent;
                    updateVideoElement(videoLink);
                    updateImageElement(imageLink);
                }
            }});
        projets.appendChild(projet);
        projetsContainer.appendChild(projets);
    }
        const sections = document.querySelectorAll('.section');

sections.forEach((section, index) => {
    const tl = gsap.timeline({ paused: true });
    const imgsections = section.querySelectorAll('.image-section'); // Sélectionner les .image-section dans cette section

    // Animation pour faire apparaître la section
    tl.from(section, { opacity: 0, x: '-10rem', ease: 'linear', duration: 0.3 });

    // Animation pour les .image-section dans cette section
    imgsections.forEach(imgsection => {
        gsap.from(imgsection, {
            opacity: 0,
            scale: 0.5,
            rotation: -180,
            x: -100,
            y: 100,
            duration: 3,
            ease: 'elastic.out(1, 0.3)'
        });
    });

    // Déclencher l'animation lorsque la section est visible à l'écran
    window.addEventListener("scroll", () => {
        const sectionTop = section.offsetTop;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scrollY > sectionTop - windowHeight * 0.001) {
            tl.play();
            // Pas besoin de jouer ims ici car il est déjà inclus dans la timeline tl
        } else {
            tl.reverse();
        }
    });
});

        
}

