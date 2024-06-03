import {createLineSpan,createImage, createText, createDivImage, createIconWithLink, createElementWithClass, createGitHubLink, createOption, createVideo, createOverlayImage, createImageElement, createVideoWithOverlay, createVideoElement, updateVideoElement, updateImageElement } from './createElements.js';
import {createCategoryWithCarousel, createVideoCarousel, generateImagePaths} from './carroussel.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('contextmenu', event => event.preventDefault());
const buttonIds = ['presentation', 'projets', 'videos', 'photos'];
buttonIds.forEach(buttonId => {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', function() {
        toggleTeamInfo(buttonId);
    });
});
toggleTeamInfo('presentation');


async function toggleTeamInfo(id) {
    
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
    presentationContainer.classList.remove('fade-in');
    presentationContainer.innerHTML = '';
    videosContainer.innerHTML = '';
    projetsContainer.innerHTML = '';
    photosContainer.innerHTML = '';
    
    if(id=== 'videos'){

        gsap.from('.videos-container',{scale:0,stagger:1, duration:1,stagger:1});
        videosContainer.classList.add('fade-in');

        var intro2videos = createElementWithClass('div','section','section-videos');

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
        
        var intro2presentation = createElementWithClass('div','section','moicmaxime');
        var image_intro2presentation = createElementWithClass('div','image-section');
        image_intro2presentation.appendChild(createImage('Photos/Photo_CV.jpg'));
        intro2presentation.appendChild(image_intro2presentation);

        var text_intro2presentation = createElementWithClass('div','text-section');
        text_intro2presentation.appendChild(createText('h2',"Moi, c’est Maxime"));
        text_intro2presentation.appendChild(createText('p',"J'ai 22 ans et j'étudie en école d'ingénieur en sécurité informatique à Dijon. Actuellement, je suis en double diplôme en cybersécurité à Chicoutimi, au beau milieu du Québec. J'ai plusieurs grandes passions telles que la photographie, la vidéo et l'informatique."));
        text_intro2presentation.appendChild(createText('p',"En dehors des salles de cours, je m'investis pleinement dans la création de contenus visuels que je partage sur mes réseaux sociaux, ainsi que dans des projets informatiques à titre personnel pour l'instant. C'est sur ce site que vous trouverez toutes mes créations."));
        text_intro2presentation.appendChild(createLineSpan(0));
        
        intro2presentation.appendChild(text_intro2presentation);
        presentationContainer.appendChild(intro2presentation);



        var intro2lbnl = createElementWithClass('div','section','berkeley');
        
        var text_intro2lbnl = createElementWithClass('div','text-section','desc-berkeley');
        text_intro2lbnl.appendChild(createText('h2',"Mon Experience a Berkeley"));
        text_intro2lbnl.appendChild(createText('p',"Durant mon stage au Lawrence Berkeley National Laboratory, j'ai été immergé dans un environnement de recherche dynamique et stimulant. Les échanges avec des chercheurs de calibre mondial ont été une source d'inspiration constante. Le Laboratoire national de Berkeley est réputé pour ses avancées dans divers domaines scientifiques, et y travailler a été une expérience inestimable pour mon développement professionnel et personnel."));

        text_intro2lbnl.appendChild(createText('p',"En intégrant l'équipe FUEGO, j'ai été confronté à des défis technologiques passionnants. La nature en constante évolution des incendies de forêt exigeait des solutions innovantes et rapides. Contribuer à la conception d'algorithmes de pointe pour l'analyse des données satellitaires m'a confronté à des problématiques complexes, stimulant ainsi ma créativité et ma résolution de problèmes."));

        text_intro2lbnl.appendChild(createText('p',"Au-delà des aspects techniques, mon passage au LBNL m'a également permis de développer des compétences interpersonnelles essentielles. Travailler en équipe dans un environnement aussi diversifié a nécessité une communication claire et efficace, ainsi qu'une capacité à collaborer avec des personnes aux parcours variés. Ces compétences sont précieuses, non seulement dans le domaine de la recherche, mais dans tous les aspects de ma carrière future."));

        text_intro2lbnl.appendChild(createText('p',"En résumé, mon stage au Lawrence Berkeley National Laboratory a été une expérience transformative. Il m'a offert une vision approfondie du processus de recherche scientifique, tout en me permettant de contribuer à un projet d'importance capitale pour la société. Les leçons apprises et les souvenirs accumulés lors de cette expérience resteront gravés dans ma mémoire et guideront mes pas dans mes futurs projets professionnels."));

        text_intro2lbnl.appendChild(createText('p',"Ma collaboration avec le Lawrence Berkeley National Laboratory a été bien plus qu'un simple stage professionnel. Elle a été une véritable immersion dans le monde de la recherche scientifique de pointe et une opportunité de contribuer à des projets ayant un impact tangible sur notre société et notre environnement."));
        
        intro2lbnl.appendChild(text_intro2lbnl);
    
        var image_intro2lbnl = createElementWithClass('div','image-section','portrait');
        image_intro2lbnl.appendChild(createImage('Photos/LBNL.jpg'));
        intro2lbnl.appendChild(image_intro2lbnl);
        presentationContainer.appendChild(intro2lbnl);



        var certifications = createElementWithClass('div','section','certifications');

        var text_certifications = createElementWithClass('div','text-section');
        text_certifications.appendChild(createText('h2',"Mes Certifications en réseaux"));
        var listescertifications = document.createElement("ul");
        listescertifications.appendChild(createText('li',"<strong>CCNA</strong> (<strong>C</strong>isco <strong>C</strong>ertified <strong>N</strong>etwork <strong>A</strong>ssociate) "));
        listescertifications.appendChild(createText('li',"Cybersecurity Essentials By Cisco"));
        listescertifications.appendChild(createText('li',"Network Security By Cisco"));
        listescertifications.appendChild(createLineSpan(1));
        text_certifications.appendChild(listescertifications);
        certifications.appendChild(text_certifications);

        var image_certifications = createElementWithClass('div','image-section','paysage');
        image_certifications.appendChild(createImage('Photos/CCNA.png'));
        certifications.appendChild(image_certifications);
        presentationContainer.appendChild(certifications);

        var cv_section = createElementWithClass('div','section','cv');

        var image_certifications = createElementWithClass('div','image-section','portrait');
        image_certifications.appendChild(createImage('Photos/textures/lence.JPG'));
        cv_section.appendChild(image_certifications);

        var text_cv_section = createElementWithClass('div','text-section');
        
        text_cv_section.appendChild(createText('h2',"Plus d'infos sur mon profil ?"));
        text_cv_section.appendChild(createText('p',"Ci-joint mon CV en anglais et en français"));
        
        text_cv_section.appendChild(createIconWithLink("fa fa-file-pdf", "docs/Resume_Maxime_Falkowski.pdf"));
        text_cv_section.appendChild(createIconWithLink("fa fa-file-pdf", "docs/CV_Maxime_Falkowski.pdf"));

        text_cv_section.appendChild(createText('p',"<strong>PS :</strong> Je suis actuellement à la <strong>recherche</strong> d'un <strong>stage</strong> en <strong>cybersécurité</strong> à partir de <strong>septembre 2024</strong>. Si vous avez des opportunités à me proposer, je suis preneur !"));
        text_cv_section.appendChild(createLineSpan(2));
        cv_section.appendChild(text_cv_section);

        presentationContainer.appendChild(cv_section);

        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        // Création de l'animation pour la ligne
        gsap.from(".line", {
        scaleX: 0,
        transformOrigin: "left center", 
        ease: "none"
        });
        
        const elements = document.querySelectorAll('.moicmaxime > *');

        gsap.to(".line0", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
            trigger: ".moicmaxime",
            start: "top top",
            end: "+==100%",
            scrub: 1,
            anticipatePin: 1,
            }
        });
        
        // Animation pour déplacer les éléments vers la droite au début (0% à 25% de la ligne)
        gsap.to(elements, {
            xPercent: 0,
            ease: "none",
            scrollTrigger: {
            trigger: ".moicmaxime",
            start: "0%",
            end: "100%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            }
        });
        
        // Animation pour déplacer les éléments vers la gauche à la fin (75% à 100% de la ligne)
        gsap.to(elements, {
            xPercent: 0,
            ease: "none",
            scrollTrigger: {
            trigger: ".moicmaxime",
            start: "0%",
            end: "100%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            }
        });
        
        
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".certifications",
                scrub: true,

                start: "top 50%", // Ajuster la valeur de départ
                end: "bottom 100%", // Ajuster la valeur de fin
                anticipatePin: 1,
            }});

            tl.from(".certifications h2,.certifications li, .certifications img", {scale: 0, rotation:45, autoAlpha: 0, ease: "power2"})
            .from(".line1", {scaleX: 0, ease: "none"}, 0)
            .to(".certifications", {backgroundColor: "	#e3d898"}, 0) // Changement de couleur
            .to(".berkeley", {backgroundColor: "	#e3d898"}, 0); // Changement de couleur pour presentation-container
        
        var tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".cv", // Déclencher lorsque la quatrième div est visible
                start: "top 50%", // Ajuster la valeur de départ
                end: "bottom 100%", // Ajuster la valeur de fin
                scrub: true, // Pour une animation fluide
            }
        });

        // Ajouter l'animation pour la ligne
        tl2.to(".line2", { scaleX: 1, ease: "none" })
        .to(".cv", { backgroundColor: "black"}, 0);

        let largeElements = document.querySelectorAll(".desc-berkeley");

        // Parcourez chaque élément et appliquez l'animation
        largeElements.forEach(large => {
            gsap.to(large, {
                y: () => (window.innerHeight - large.clientHeight - 800),
                ease: "none",
                scrollTrigger: {
                    trigger: '.berkeley, .desc-berkeley ',
                    pin: true,
                    start: "top top",
                    end: () => "bottom 100%",
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                }
            });
        });
  
    }
    else if(id === 'photos'){
        gsap.from('.photos-container',{scale:0,stagger:1, duration:1});
        photosContainer.classList.add('fade-in');

        


        var intro2photographies = createElementWithClass('div','section');
        var image_intro2photographies = createElementWithClass('div','image-section');
        image_intro2photographies.appendChild(createImage('Photos/text-photo.JPG'));
        intro2photographies.appendChild(image_intro2photographies);

        var text_intro2photographies = createElementWithClass('div','text-section');
        text_intro2photographies.appendChild(createText('h2',"Mes contenus photographiques"));
        text_intro2photographies.appendChild(createText('p',"Toujours avec un appareil photo sur moi, la photographie est ma passion depuis mon enfance. L'idée de recréer des émotions à travers un fichier PNG me passionne depuis qu'on a mis une caméra entre mes mains. Depuis, je cherche toujours à créer de nouvelles œuvres, que vous pouvez trouver ici. <strong>Enjoy.</strong>"));
        intro2photographies.appendChild(text_intro2photographies);
        photosContainer.appendChild(intro2photographies);

        var citation = document.createElement('div');
        citation.className='citation';
        citation.appendChild(createText('p', "Ce que la photographie reproduit à l’infini n’a lieu qu’une fois"));
        photosContainer.appendChild(citation);
        
        var categories_photos = createElementWithClass('div','categories_photos');

        var titre_categories = createElementWithClass('div','text-section');
        titre_categories.appendChild(createText('h2',"Categories"));
        photosContainer.appendChild(titre_categories);
        var menu_carrousels = createElementWithClass('div','menu_carrousels');
        menu_carrousels.appendChild(createDivImage("Voyages","Photos/voyages.png"));
        menu_carrousels.appendChild(createDivImage("Sports","Photos/sports.png"));
        menu_carrousels.appendChild(createDivImage("All","Photos/textures/all.JPG"));
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
            const carousel_section = createElementWithClass('div', 'section',"photos");
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
                    const allSections = document.querySelectorAll('.section.photos');
            
                    // Parcourir chaque section et vérifier si son attribut category correspond à la catégorie sélectionnée
                    allSections.forEach(section => {
                        const sectionCategory = section.getAttribute('category');
                        if (sectionCategory && sectionCategory !== category && category !== 'All') {
                            section.style.display = 'none';
                        } else {
                            section.style.display = 'flex';
                        }
                    });
                }
            
        });

        const sections = document.querySelectorAll('.section.photos');

        sections.forEach((element) => {
                gsap.fromTo(element, 
                    {
                        autoAlpha: 0, // Départ de l'animation (opacité 0)
                        x: 300       // Départ de l'animation (décalage de 100px en y)
                    }, 
                    {
                        autoAlpha: 1, // Fin de l'animation (opacité 1)
                        x: 0,         // Fin de l'animation (pas de décalage en y)
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "bottom 75%",   // Commencer l'animation lorsque le haut de l'élément atteint 80% de la hauteur de la fenêtre
                            end: "top 25%",  // Arrêter l'animation lorsque le bas de l'élément atteint 20% de la hauteur de la fenêtre
                            scrub: true         // Animation lissée
                        }
                    }
                );
            });
        




        
        
    }
    else if(id === 'projets'){
        gsap.from('.projets-container',{scale:0,stagger:1, duration:1,stagger:1});
        gsap.from('.menu3',{scale:0,stagger:1, duration:2,stagger:1});
        projetsContainer.classList.add('fade-in');
        var intro2projects = createElementWithClass('div','section');
        var text_intro2projects = createElementWithClass('div','text-section','mes-projets');
        text_intro2projects.appendChild(createText('h2',"Mes projets Informatiques"));
        text_intro2projects.appendChild(createText('p',"Étant en école d'ingénieurs et en maîtrise en cybersécurité, j'ai eu de nombreux projets informatiques à réaliser durant toute ma scolarité. Certains ne sont que des créations que j'ai réalisées par passion pour le code. <strong>Enjoy.</strong>"));
        text_intro2projects.appendChild(createText('p','<strong>Enjoy.</strong>'));
        intro2projects.appendChild(text_intro2projects);
        projetsContainer.appendChild(intro2projects);
        var projets = createElementWithClass('div','projets');
        
        var menuDiv = createElementWithClass('div','menu3');
        var menuList = [
            
            { name: "RockRush", github:"https://github.com/FLKprod/RockRush", videoLink: "Photos/projets/RockRush.mp4", imageSrc: "Photos/projets/RockRush.jpg" ,desc:"RockRush est un jeu en langage web créé durant ma formation ingénieur. C'est une version de Boulder Dash, un jeu classique où un mineur doit collecter tous les diamants sans se faire écraser par des pierres."},
            { name: "Application DeepL", github:"https://github.com/FLKprod/Appli_Android_Deepl", videoLink: "Photos/projets/DeepL.mp4", imageSrc: "Photos/projets/DeepL.png" ,desc:"Ce projet constitue une application Android que j'ai développée dans le cadre de ma formation d'ingénieur. Conçue en Java et XML à l'aide d'Android Studio, cette application tire parti de l'API DeepL. Son objectif principal est de fournir un service de traduction de texte efficace et convivial."},
            { name: "201 Farehein", github: "https://github.com/FLKprod/201F", videoLink: "Photos/projets/201F.mp4", imageSrc: "Photos/projets/201F.png",desc: "201 Farehein est une parodie du célèbre jeu de mots '94 degrees'. Explorez un monde rempli de défis, de questions hilarantes et de réponses surprenantes. Testez vos connaissances géographiques tout en vous amusant !" },
            { name: "CyberSafe", github:"https://github.com/FLKprod/Projet-IOT", videoLink: "Photos/projets/Cybersafe.mp4", imageSrc: "Photos/projets/Cybersafe.png",desc:"Une Plateforme de Surveillance des Vulnérabilités de Sécurité des Objets Connectés. Elle se met à jour automatiquement pour informer les utilisateurs sur les vulnérabilités de sécurité des objets connectés." },
            /*
            { name: "TowerDefender", videoLink: "", imageSrc: "",desc:"" },
            { name: "Flkprod.github.io", videoLink: "dwwd", imageSrc: "Photos/textures/logoneg.png",desc:""},
            { name: "ToDoList pour IOs", videoLink: "", imageSrc: "",desc:"" },*/
            { name: "Carte intéractive", github:"https://github.com/FLKprod/MapEmblem", videoLink: "", imageSrc: "",desc:"Carte interactive pour les lieux partenaires de EMBLEM Dijon" },
            { name: "LanbdaCash", github:"https://github.com/FLKprod/CloudProject", videoLink: "Photos/projets/landbacash.mp4", imageSrc: "Photos/projets/landbacash.png",desc:"Application pour tester un programme et l'executer avec differentes valeurs de RAM pour connaitre et comparer les prix d'execution d'AWS ( Amazon Web Services )." }
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

        var github_projet = createGitHubLink(firstItem.github);
        projet.appendChild(github_projet);

        
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

    const targetNode = document.querySelector('body'); // Choisissez le nœud que vous souhaitez observer
    const config = { attributes: true, childList: true, subtree: true }; // Options d'observation

    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
        }
    };

    const observer = new MutationObserver(callback);

    // Commence à observer le nœud cible pour les mutations spécifiées
    observer.observe(targetNode, config);
}
