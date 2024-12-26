import {createLineSpan,createImage, createText, createIconWithLink, createElementWithClass, createGitHubLink, createImageElement, updateVideoElement, updateImageElement, updateLinkGithub, createVideoProject, createVideo, createMenuItem } from './createElements.js';
import {createCarousel, generateImagePaths} from './carroussel.js';

gsap.registerPlugin(ScrollTrigger);

/************************** GESTION DU MENU EN ENTETE *********************************************/

document.addEventListener('contextmenu', event => event.preventDefault());
const buttonIds = ['services','projets', 'videos', 'photos','aproposdemoi'];
buttonIds.forEach(buttonId => {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', function() {
        toggleTeamInfo(buttonId);
    });
});
const logopresentation = document.getElementById('logo');
logopresentation.addEventListener('click', () => {
    toggleTeamInfo('presentation');
});

toggleTeamInfo('presentation'); // commence par afficher la page presentation quand on arrive sur le site

/**************************************************************************************************/

/**************************** RENVOIT AU HAUT DE LA PAGE ******************************************/
function reveniralentete(){
    const entete = document.querySelector('.entete');
    const positionBasEntete = entete.offsetTop + entete.offsetHeight;
    window.scrollTo({
        top: positionBasEntete,
        behavior: 'smooth'
    });
}

/**************************************************************************************************/

export async function toggleTeamInfo(id) {
    const daynightCheckbox = document.getElementById('daynight');

    var buttons = document.querySelectorAll('.sections-menu button');
    buttons.forEach(function(button) {
        console.log("delete selected");
        button.classList.remove('select');
    });

    var menu = document.getElementById('section-menu');
    if (menu) {
        var selectedButton = menu.querySelector(`#${id}`);
        if (selectedButton) {
            console.log("section " + id);
            selectedButton.classList.add('select');
        } else {
            console.warn(`Aucun bouton trouvé avec l'ID : ${id}`);
        }
    }
    var menu = document.getElementById('down-menu');
    if (menu) {
        var selectedButton = menu.querySelector(`#${id}`);
        if (selectedButton) {
            console.log("section " + id);
            selectedButton.classList.add('select');
        } else {
            console.warn(`Aucun bouton trouvé avec l'ID : ${id}`);
        }
    }
    var presentationContainer = document.querySelector('.presentation-container');
    var aproposdemoiContainer = document.querySelector('.aproposdemoi-container');
    var videosContainer = document.querySelector('.videos-container');
    var servicesContainer = document.querySelector('.services-container');
    var projetsContainer = document.querySelector('.projets-container');
    var photosContainer = document.querySelector('.photos-container');
    aproposdemoiContainer.classList.remove('fade-in');
    presentationContainer.innerHTML = '';
    servicesContainer.innerHTML = '';
    aproposdemoiContainer.innerHTML = '';
    videosContainer.innerHTML = '';
    projetsContainer.innerHTML = '';
    photosContainer.innerHTML = '';

    if(id=== 'services'){
        gsap.from('.services-container',{scale:0,stagger:1, duration:1,stagger:1});
        var intro2services = createElementWithClass('div','section-services');
            
            var text_intro2services = createElementWithClass('div','text-section-services');
                text_intro2services.appendChild(createText('h2',"Et si on travaillais ensemble ? "));
                text_intro2services.appendChild(createText('p',`Après avoir réalisé de nombreux projets dans des domaines variés, je suis prêt et motivé à collaborer avec vous.
                    Que ce soit pour un projet informatique, vidéographique ou photographique, je serais ravi de mettre mon énergie et ma créativité au service de vos idées.`));
                    text_intro2services.appendChild(createText('h2',"Ensemble, faisons quelque chose d’unique et à vos attentes !"));
            intro2services.appendChild(text_intro2services);
        servicesContainer.appendChild(intro2services);

        var intro2services = createElementWithClass('div','service');
        

        var text_intro2services = createElementWithClass('div','text-section');
        text_intro2services.appendChild(createText('h2',"Création de Portfolios Personnalisés"));
        text_intro2services.appendChild(createText('p',`Un portfolio qui met en valeur votre talent.
            Que vous soyez artiste, photographe, designer ou autre, je vous accompagne pour créer un portfolio unique et adapté à vos besoins.

            Ce que je propose :

            <ul> - Design sur mesure pour mettre en avant vos projets.</ul>
            <ul> - Traitement des images pour un rendu professionnel.</ul>
            <ul> - Organisation claire et intuitive.</ul>
            <ul> - Compatible sur tous vos appareils (ordinateur, tablette, smartphone).</ul>
            Chaque projet est différent. Ensemble, créons un portfolio qui impressionnera vos clients ou partenaires. Contactez-moi pour démarrer votre projet !`));
        
        intro2services.appendChild(text_intro2services);
        var image_intro2services = createElementWithClass('div','image-section');
        image_intro2services.appendChild(createImage('Photos/porto.png'));
        intro2services.appendChild(image_intro2services);
        servicesContainer.appendChild(intro2services);

        var intro2services = createElementWithClass('div','service');
        var image_intro2services = createElementWithClass('div','image-section');
        image_intro2services.appendChild(createImage('Photos/shooting.png'));
        intro2services.appendChild(image_intro2services);
        var text_intro2services = createElementWithClass('div','text-section');
        text_intro2services.appendChild(createText('h2',"Shooting photo"));
        text_intro2services.appendChild(createText('p',`Des photos qui capturent vos plus beaux moments.
            Que ce soit pour un événement, un projet ou des besoins pros, je m’adapte à vos envies pour créer des clichés qui vous ressemblent.

            Ce que je propose :

            <ul> - Une séance sur mesure, définie avec vous.</ul>
            <ul> - Des idées originales pour des photos uniques.</ul>
            <ul> - Des shootings pour tout type d’événement : portraits, groupes, mariages, anniversaires, etc.</ul>
            <ul> - Un moment convivial pour des photos naturelles.</ul>
            Prêt pour un shooting à votre image ?
            Contactez-moi et organisons votre séance dès maintenant !`));
        
        intro2services.appendChild(text_intro2services);
        
        servicesContainer.appendChild(intro2services);



        var intro2services = createElementWithClass('div','service');
        var image_intro2services = createElementWithClass('div','image-section');
        image_intro2services.appendChild(createImage('Photos/montage.png'));
        intro2services.appendChild(image_intro2services);
        
        var text_intro2services = createElementWithClass('div','text-section');
        text_intro2services.appendChild(createText('h2',"Montage video"));
        text_intro2services.appendChild(createText('p',`Transformez vos idées en vidéos captivantes !

            Que ce soit pour un projet personnel, professionnel, ou un événement particulier, je vous propose un montage vidéo sur mesure, adapté à vos besoins. Ensemble, nous donnerons vie à vos images et vidéos pour créer un contenu fluide, impactant et à votre image.

            Ce que je vous propose :

            <ul> - Un montage personnalisé : Une vidéo qui correspond parfaitement à votre vision et vos attentes.</ul>
            <ul> - Des effets et transitions adaptés : Pour un rendu professionnel et dynamique.</ul>
            <ul> - Un storytelling efficace : Une structure claire pour capter et maintenir l’attention.</ul>
            <ul> - Flexibilité sur tous les formats : Adapté aux réseaux sociaux, présentations, événements, ou souvenirs personnels.</ul>
            Prêt à donner vie à vos projets ?
            Contactez-moi dès maintenant pour discuter de votre montage vidéo ! 🎥`));
        
        intro2services.appendChild(text_intro2services);
        servicesContainer.appendChild(intro2services);

        
        servicesContainer.appendChild(intro2services);
        const sections = document.querySelectorAll(".service");
        /*
        sections.forEach((element, index) => {
            gsap.fromTo(element, 
                {
                    autoAlpha: 0,      // Départ de l'animation (opacité 0)
                    x: index % 2 === 0 ? -300 : 300, // Si l'index est pair, il vient de la gauche (-300), sinon de la droite (300)
                }, 
                {
                    autoAlpha: 1,      // Fin de l'animation (opacité 1)
                    x: 0,              // Fin de l'animation (pas de décalage en x)
                    ease: "power2.out", // Ease pour l'animation
                    scrollTrigger: {
                        trigger: element,
                        start: "top center",  // Commencer l'animation lorsque le bas de l'élément atteint le centre de la fenêtre
                        end: "75% bottom",    // Arrêter l'animation lorsque le bas de l'élément atteint le bas de la fenêtre
                        scrub: true,             // Animation lissée
                    }
                }
            );
        });
        */
    }
    if(id=== 'videos'){

        // Créer la section principale pour les vidéos
        var intro2videos = createElementWithClass('div', 'section', 'section-videos');

        // Texte d'introduction
        var text_intro2videos = createElementWithClass('div', 'text-section', 'video-section');
        text_intro2videos.appendChild(createText('h2', "Mes contenus vidéos"));
        text_intro2videos.appendChild(createText('p', `
            Passionné par le montage vidéo et constamment à la recherche d'inspiration pour créer du contenu, 
            je saute sur l'occasion de concrétiser une idée germeant dans mon esprit, à travers des vidéos captivantes et originales.
            Auparavant, je partageais mes créations sur mon compte Instagram 
            <a href='https://www.instagram.com/flkprod_/' target='_blank'>@FLKPROD_</a>, qui est toujours actif à ce jour. 
            Maintenant, c'est sur ce site que toutes mes créations seront postées.
            Vous pouvez consulter toutes mes créations dans la rubrique ci-dessous. <strong>Enjoy.</strong>
        `));
        intro2videos.appendChild(text_intro2videos);
        videosContainer.appendChild(intro2videos);

        // Conteneur galerie
        var galerie = createElementWithClass("div", "galerie-videos");

        // Données des vidéos
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

        // Boucle pour créer chaque vidéo et sa description
        videosData.forEach(videoData => {
            // Créer le conteneur de la vidéo
            var videoContainer = createElementWithClass("div", "video-container");

            // Ajouter l'iframe pour la vidéo
            var iframe = createVideo(videoData.url);
            videoContainer.appendChild(iframe);

            // Ajouter la description de la vidéo
            var videoDescription = createElementWithClass("p", "video-description");
            videoDescription.textContent = videoData.description;
            videoContainer.appendChild(videoDescription);
            galerie.appendChild(videoContainer);
        });

        videosContainer.appendChild(galerie);

        // Animation GSAP
        gsap.from('.videos-container', {
            scale: 0,
            stagger: 1,
            duration: 1
        });

    }
    else if(id=== 'presentation'){
        gsap.from('.presentation-container',{scale:0,stagger:1, duration:1,stagger:1});

        var intro2presentation = createElementWithClass('div','section-presentation');
            
            var text_intro2presentation = createElementWithClass('div','text-section-presentation');
                text_intro2presentation.appendChild(createText('h2',"Bienvenue"));
                text_intro2presentation.appendChild(createText('p',`Découvrez mon univers dédié à la photographie, à la vidéo, et à mes projets numériques. Entre créativité visuelle et innovation technologique, je partage ici mes réalisations, mes inspirations, et mes collaborations.`));
                text_intro2presentation.appendChild(createText('h2',"Enjoy."));
            intro2presentation.appendChild(text_intro2presentation);
        presentationContainer.appendChild(intro2presentation);
        var intro2menupresentation = createElementWithClass('div','section-menu-presentation');
        const menuData = [
            {
                id: "projets",
                className: "projets",
                text: "Projets",
                description: "Découvrez mes projets récents.",
                imageUrl: "Photos/menu/projet.jpeg",
            },
            {
                id: "videos",
                className: "videos",
                text: "Multimedia",
                description: "Explorez mes créations multimédia.",
                imageUrl: "Photos/menu/videos.JPG",
            },
            {
                id: "photos",
                className: "photos",
                text: "Photographies",
                description: "Admirez mes meilleures photos.",
                imageUrl: "Photos/menu/photos.JPG",
            },
            ,
            {
                id: "services",
                className: "services",
                text: "Mes services",
                description: "Travaillons ensemble !",
                imageUrl: "Photos/shooting.JPG",
            },
            {
                id: "aproposdemoi",
                className: "aproposdemoi",
                text: "À Propos de Moi",
                description: "Apprenez à mieux me connaître.",
                imageUrl: "Photos/menu/moi.JPG",
            }
            
        ];
    
        // Create and append each menu item
        menuData.forEach(item => {
            const menuItem = createMenuItem(
                item.id,
                item.className,
                item.text,
                item.description,
                item.imageUrl
            );
            intro2menupresentation.appendChild(menuItem);
        });

        var image_intro2presentation = createElementWithClass('div','image-section-presentation');
            var image2_presentation=createImage("Photos/logos/flkprod.png");
            image2_presentation.id='presentation-img-2';
            image_intro2presentation.appendChild(image2_presentation);


        presentationContainer.appendChild(intro2menupresentation);
        presentationContainer.appendChild(image_intro2presentation);

    }
    else if(id=== 'aproposdemoi'){
        
        var intro2presentation = createElementWithClass('div','section','moicmaxime');
        var image_intro2presentation = createElementWithClass('div','image-section');
        image_intro2presentation.appendChild(createImage('Photos/Maxime_WIZYA.jpg'));
        intro2presentation.appendChild(image_intro2presentation);

        var text_intro2presentation = createElementWithClass('div','text-section');
        text_intro2presentation.appendChild(createText('h2',"Moi, c’est Maxime"));
        text_intro2presentation.appendChild(createText('p',`J'ai 23 ans et je suis consultant GRC SAP chez <a href='https://wizya.fr/' target='_blank'>WIZYA</a>, en terres parisiennes.
            j'ai étudié en école d'ingénieur en sécurité informatique à Dijon.
            J'ai aussi suivi une formation en double diplôme en cybersécurité à Chicoutimi, au beau milieu du Québec.
            J'ai plusieurs grandes passions telles que la photographie, la vidéo et l'informatique.`));
        text_intro2presentation.appendChild(createText('p',`En dehors des salles de cours, je m'investis pleinement dans la création de contenus visuels que je partage sur mes réseaux sociaux, ainsi que dans des projets informatiques à titre personnel pour l'instant.
            C'est sur ce site que vous trouverez toutes mes créations.`));
        text_intro2presentation.appendChild(createLineSpan(0));
        
        intro2presentation.appendChild(text_intro2presentation);
        aproposdemoiContainer.appendChild(intro2presentation);



        var intro2lbnl = createElementWithClass('div','section','berkeley');
        
        var text_intro2lbnl = createElementWithClass('div','text-section','desc-berkeley');
        text_intro2lbnl.appendChild(createText('h2',"Mon Experience a Berkeley"));
        text_intro2lbnl.appendChild(createText('p',`Durant mon stage au Lawrence Berkeley National Laboratory, j'ai été immergé dans un environnement de recherche dynamique et stimulant.
            Les échanges avec des chercheurs de calibre mondial ont été une source d'inspiration constante.
            Le Laboratoire national de Berkeley est réputé pour ses avancées dans divers domaines scientifiques, et y travailler a été une expérience inestimable pour mon développement professionnel et personnel.`));

        text_intro2lbnl.appendChild(createText('p',`En intégrant l'équipe FUEGO, j'ai été confronté à des défis technologiques passionnants.
            La nature en constante évolution des incendies de forêt exigeait des solutions innovantes et rapides.
            Contribuer à la conception d'algorithmes de pointe pour l'analyse des données satellitaires m'a confronté à des problématiques complexes, stimulant ainsi ma créativité et ma résolution de problèmes.`));

        text_intro2lbnl.appendChild(createText('p',`Au-delà des aspects techniques, mon passage au LBNL m'a également permis de développer des compétences interpersonnelles essentielles.
            Travailler en équipe dans un environnement aussi diversifié a nécessité une communication claire et efficace, ainsi qu'une capacité à collaborer avec des personnes aux parcours variés.
            Ces compétences sont précieuses, non seulement dans le domaine de la recherche, mais dans tous les aspects de ma carrière future.`));

        text_intro2lbnl.appendChild(createText('p',`En résumé, mon stage au Lawrence Berkeley National Laboratory a été une expérience transformative.
            Il m'a offert une vision approfondie du processus de recherche scientifique, tout en me permettant de contribuer à un projet d'importance capitale pour la société.
            Les leçons apprises et les souvenirs accumulés lors de cette expérience resteront gravés dans ma mémoire et guideront mes pas dans mes futurs projets professionnels.`));

        //text_intro2lbnl.appendChild(createText('p',`Ma collaboration avec le Lawrence Berkeley National Laboratory a été bien plus qu'un simple stage professionnel.
            //Elle a été une véritable immersion dans le monde de la recherche scientifique de pointe et une opportunité de contribuer à des projets ayant un impact tangible sur notre société et notre environnement.`));
        
        intro2lbnl.appendChild(text_intro2lbnl);
    
        var image_intro2lbnl = createElementWithClass('div','image-section','portrait');
        image_intro2lbnl.appendChild(createImage('Photos/LBNL.jpg'));
        intro2lbnl.appendChild(image_intro2lbnl);
        aproposdemoiContainer.appendChild(intro2lbnl);



        var certifications = createElementWithClass('div','formations');

        var text_certifications = createElementWithClass('div','certif-cisco');
        text_certifications.appendChild(createText('h2',"Mes Certifications en réseaux"));
        var liste_1_certifications = document.createElement("ul");
        liste_1_certifications.appendChild(createImage('Photos/CCNA.png'));
        liste_1_certifications.appendChild(createText('li',"<strong>CCNA</strong> (<strong>C</strong>isco <strong>C</strong>ertified <strong>N</strong>etwork <strong>A</strong>ssociate) "));
        liste_1_certifications.appendChild(createText('li',"Cybersecurity Essentials By Cisco"));
        liste_1_certifications.appendChild(createText('li',"Network Security By Cisco"));
        liste_1_certifications.appendChild(createText('li',"Network Defense By Cisco"));
        
        text_certifications.appendChild(liste_1_certifications);
        var liste_2_certifications = document.createElement("ul");
        liste_2_certifications.appendChild(createImage('Photos/Fortinet.png'));
        liste_2_certifications.appendChild(createText('li',"Fortinet Certified Associate Cybersecurity"));
        liste_2_certifications.appendChild(createText('li',"Fortinet Certified Fundamentals Cybersecurity"));
        liste_2_certifications.appendChild(createLineSpan(1));
        text_certifications.appendChild(liste_2_certifications);

        var liste_3_certifications = document.createElement("ul");
        liste_3_certifications.appendChild(createImage('Photos/linux.png'));
        liste_3_certifications.appendChild(createText('li',"BGD Linux Unhatched"));
        liste_3_certifications.appendChild(createText('li',"NDG Linux Essential"));
        text_certifications.appendChild(liste_3_certifications);

        var liste_4_certifications = document.createElement("ul");
        liste_4_certifications.appendChild(createImage('Photos/htmlcssjs.png'));
        liste_4_certifications.appendChild(createText('li',"JSE - Certified Entry-level JavaScript Programmer"));
        liste_4_certifications.appendChild(createText('li',"JSA - Certified Associate JavaScript Programmer"));
        text_certifications.appendChild(liste_4_certifications);


        certifications.appendChild(text_certifications);
        
        var text_ecoles_formations = createElementWithClass('div','ecoles_formations');
        text_ecoles_formations.appendChild(createText('h2',"Mes Formations"));
        var liste_1_ecoles_formations = document.createElement("ul");
        liste_1_ecoles_formations.appendChild(createText('p',"Formation au diplome d'ingénieur en Sécurité Qualité Réseaux informatiques"));
        liste_1_ecoles_formations.appendChild(createText('p',"Polytech Dijon, Dijon, Bourgogne, FRANCE"));
        liste_1_ecoles_formations.appendChild(createImage('Photos/Polytech.png'));
        
        
        
        text_ecoles_formations.appendChild(liste_1_ecoles_formations);
        var liste_2_ecoles_formations = document.createElement("ul");
        liste_2_ecoles_formations.appendChild(createText('p',"Maîtrise (Master) en cybersécurité"));
        liste_2_ecoles_formations.appendChild(createText('p',"UQAC ( Université du Québèc à Chicoutimi, Chicoutimi, Québèc, CANADA"));
        liste_2_ecoles_formations.appendChild(createImage('Photos/UQAC.jpg'));
        
        text_ecoles_formations.appendChild(liste_2_ecoles_formations);
        certifications.appendChild(text_ecoles_formations);




        aproposdemoiContainer.appendChild(certifications);

        var cv_section = createElementWithClass('div','section','cv');

        var image_certifications = createElementWithClass('div','image-section','portrait');
        image_certifications.appendChild(createImage('Photos/lence.JPG'));
        cv_section.appendChild(image_certifications);

        var text_cv_section = createElementWithClass('div','text-section','contact-section');
        
        text_cv_section.appendChild(createText('h2',"Plus d'infos sur mon profil ?"));
        text_cv_section.appendChild(createText('p',"Vous pouvez consulter et télécharger mon CV dans les deux langues, anglaise et française, en cliquant sur les liens ci-dessous."));
        
        text_cv_section.appendChild(createIconWithLink("fa fa-file-pdf", "docs/Resume_Maxime_Falkowski.pdf"));
        text_cv_section.appendChild(createIconWithLink("fa fa-file-pdf", "docs/CV_Maxime_Falkowski.pdf"));

        text_cv_section.appendChild(createText('h2',"Et pour me joindre ?"));
        text_cv_section.appendChild(createText('p',"Rien de plus simple, contactez moi par courriel ou via mes réseaux sociaux juste ici ! "));
        
        text_cv_section.appendChild(createIconWithLink("fab fa-instagram", "https://www.instagram.com/flkprod_/"));
        text_cv_section.appendChild(createIconWithLink("fab fa-linkedin", "https://www.linkedin.com/in/maxime-falkowski-9a4607216?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGJJZ%2FAWYSLGq0t%2BQS92TrQ%3D%3D"));
        text_cv_section.appendChild(createIconWithLink("fa fa-envelope", "window.location.href='mailto:maxime.falkowski@free.fr';"));

        cv_section.appendChild(text_cv_section);

        aproposdemoiContainer.appendChild(cv_section);
        
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
                trigger: ".formations",
                scrub: true,
                start: "top -25%", // Ajuster la valeur de départ
                end: "bottom top", // Ajuster la valeur de fin
                anticipatePin: 1,
            }
        });

            tl.from(".formations h2,.formations li, .formations img", {scale: 0, rotation:45, autoAlpha: 0, ease: "power2"})
            .from(".line1", {scaleX: 0, ease: "none"}, 0)
            .to(".certif-cisco", {backgroundColor: "	#e3d898"}, 0) // Changement de couleur
            .to(".ecoles_formations", {backgroundColor: "	#ffffff"}, 0) // Changement de couleur
            .to(".berkeley", {backgroundColor: "	#e3d898"}, 0); // Changement de couleur pour aproposdemoi-container
        
        var tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".cv", // Déclencher lorsque la quatrième div est visible
                start: "top 0%", // Ajuster la valeur de départ
                end: "bottom top", // Ajuster la valeur de fin
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
                y: () => (window.innerHeight - large.clientHeight - 750),
                ease: "none",
                scrollTrigger: {
                    trigger: '.berkeley',
                    pin: true,
                    start: "top 0%",
                    end: () => `bottom ${document.querySelector('.berkeley').offsetHeight - large.clientHeight}px`,
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                }
            });
        });
        
  
    }
    else if(id === 'photos'){

        /*****************************************************************************************************************************/
        /****************** PARTIE PHOTO  ********************************************************************************************/
        /* rajouter soucis de transparence avec les boutons **************************************************************************/
        /*****************************************************************************************************************************/


        


        var citation = document.createElement('div');
        citation.className='citation';
        citation.appendChild(createText('p', "Mes contenus photographiques"));
        photosContainer.appendChild(citation);
        gsap.from('.citation',{scale:0,stagger:1, duration:1});

        // Exemple de données (remplacez avec vos propres données)
        const categoriesData = [
        { name: 'Dijon', desc:"Bourgogne, France", nbrepictures:4},
        { name: 'Strasbourg', desc:"Alsace, France", nbrepictures:4},
        { name: 'San Francisco',desc:"California, USA", nbrepictures:4 },
        { name: 'Paris',desc:"Ile-De-France, France", nbrepictures:6 },
        { name: 'Quebec', desc:"Quebec, Canada", nbrepictures:4},
        { name: 'Baseball', desc:"San Francisco Giants, USA, saison 2022-2023", nbrepictures:4 },
        { name: 'Basket', desc:"Betclic elite saison 2022-2023", nbrepictures:4 },
        { name: 'Automobile',desc:"Circuit Dijon-Prenois, 2024", nbrepictures:6 }
        // Ajoutez plus de catégories avec leurs images au besoin
        ];

        categoriesData.forEach((categoryData, index) => {
            const { name, desc, nbrepictures } = categoryData;
        
            // Créer une section pour chaque catégorie
            const carouselSection = createElementWithClass('div', 'section', 'photos');
        
            // Générer les images et le carrousel
            const images = generateImagePaths(name, categoryData.nbrepictures);
            const categoryElement = createCarousel(name, desc, images,index); 
        
            // Ajouter la section au conteneur principal
            carouselSection.appendChild(categoryElement);
            photosContainer.appendChild(carouselSection);
        });

        

        const sections = document.querySelectorAll('.section.photos');

        sections.forEach((element, index) => {
            gsap.fromTo(element, 
                {
                    autoAlpha: 0,      // Départ de l'animation (opacité 0)
                    x: index % 2 === 0 ? -300 : 300, // Si l'index est pair, il vient de la gauche (-300), sinon de la droite (300)
                }, 
                {
                    autoAlpha: 1,      // Fin de l'animation (opacité 1)
                    x: 0,              // Fin de l'animation (pas de décalage en x)
                    ease: "power2.out", // Ease pour l'animation
                    scrollTrigger: {
                        trigger: element,
                        start: "25% bottom",  // Commencer l'animation lorsque le bas de l'élément atteint le centre de la fenêtre
                        end: "bottom bottom",    // Arrêter l'animation lorsque le bas de l'élément atteint le bas de la fenêtre
                        scrub: true,             // Animation lissée
                    }
                }
            );
        });
        
        
    }
    else if(id === 'projets'){
        gsap.from('.projets-container',{scale:0,stagger:1, duration:1,stagger:1});
        gsap.from('.menu-projets',{scale:0,stagger:1, duration:2,stagger:1});

        var intro2projects = createElementWithClass('div','section','video-section');
        var text_intro2projects = createElementWithClass('div','text-section','mes-projets');
        text_intro2projects.appendChild(createText('h2',"Mes projets Informatiques"));
        text_intro2projects.appendChild(createText('p',`Étant en école d'ingénieurs et en maîtrise en cybersécurité, j'ai eu de nombreux projets informatiques à réaliser durant toute ma scolarité. Certains ne sont que des créations que j'ai réalisées par passion pour le code. <strong>Enjoy.</strong>`));
        text_intro2projects.appendChild(createText('p','<strong>Enjoy.</strong>'));
        intro2projects.appendChild(text_intro2projects);
        projetsContainer.appendChild(intro2projects);
        var projets = createElementWithClass('div','projets');
        var areamenuDiv = createElementWithClass('div','area-menu-projets');
        var menuDiv = createElementWithClass('div','menu-projets');

        var menuList = [
            
            { name: "RockRush", github:"https://github.com/FLKprod/RockRush", videoLink: "Photos/projets/RockRush.mp4", imageSrc: "Photos/projets/RockRush.jpg" ,
                desc:`RockRush est un jeu en langage web créé durant ma formation ingénieur.
                C'est une version de Boulder Dash, un jeu classique où un mineur doit collecter tous les diamants sans se faire écraser par des pierres. \n
                les langages de programmation utilisés dans ce projet sont : 
                    <ul> - HTML </ul>
                    <ul> - CSS  </ul>
                    <ul> - Javascript </ul>
                Ce projet, réalisé durant mon cursus d'ingénieur en informatique, fut un travail très utile à la création de ce site internet.
                `},

            { name: "Application DeepL", github:"https://github.com/FLKprod/Appli_Android_Deepl", videoLink: "Photos/projets/DeepL.mp4", imageSrc: "Photos/projets/DeepL.png" ,
                desc:`Ce projet constitue une application Android que j'ai développée dans le cadre de ma formation d'ingénieur.
                Réalisé à travers l'outil de développement d'application Android Studio, cette application tire parti de l'API DeepL, une API avec version gratuite permettant d'utiliser les fonctions de Deepl, traducteur mondialement connu.
                Son objectif principal est de fournir un service de traduction de texte efficace et convivial.
                les langages de programmation utilisés dans ce projet sont : 
                    <ul> - Java </ul>
                    <ul> - XML  </ul>`},

            { name: "201 Farehein", github: "https://github.com/FLKprod/201F", videoLink: "Photos/projets/201F.mp4", imageSrc: "Photos/projets/201F.png",
                desc: `201 Farehein est une parodie du célèbre jeu de mots '94 degrees'. 
                Explorez un monde rempli de défis, de questions hilarantes et de réponses surprenantes. Testez vos connaissances géographiques tout en vous amusant !` },

            { name: "CyberSafe", github:"https://github.com/FLKprod/Projet-IOT", videoLink: "Photos/projets/Cybersafe.mp4", imageSrc: "Photos/projets/Cybersafe.png",
                desc:`Une Plateforme de Surveillance des Vulnérabilités de Sécurité des Objets Connectés.
                 Elle se met à jour automatiquement pour informer les utilisateurs sur les vulnérabilités de sécurité des objets connectés.`},
            /*
            { name: "TowerDefender", videoLink: "", imageSrc: "",desc:"" },
            { name: "Flkprod.github.io", videoLink: "dwwd", imageSrc: "Photos/logos/logoneg.png",desc:""},
            { name: "ToDoList pour IOs", videoLink: "", imageSrc: "",desc:"" },
            { name: "Carte intéractive", github:"https://github.com/FLKprod/MapEmblem", videoLink: "", imageSrc: "",desc:"Carte interactive pour les lieux partenaires de EMBLEM Dijon" },
             */
            { name: "LanbdaCash", github:"https://github.com/FLKprod/CloudProject", videoLink: "Photos/projets/landbacash.mp4", imageSrc: "Photos/projets/landbacash.png",
                desc:`Application pour tester un programme et l'executer avec differentes valeurs de RAM pour connaitre et comparer les prix d'execution d'AWS ( Amazon Web Services ).`}
        ];
        for (let i = 0; i < menuList.length; i++) {
            menuDiv.appendChild(createText('ul',menuList[i].name));
        }
        var firstItem = menuList[0]; // Récupération du premier élément
        var projet = createElementWithClass('div','projet');
        areamenuDiv.appendChild(menuDiv)
        projets.appendChild(areamenuDiv);
        var video_iframe=createVideoProject(firstItem.videoLink)
        projet.appendChild(video_iframe);
        
        var text_projet = createElementWithClass('div','text-projet')
        var title_projet = createElementWithClass('div','title-projet')
        var title_text_projet = createText('h2', firstItem.name);
        title_text_projet.class="titre_projet";
        var img_projet = createImageElement("img", 'img-projet', firstItem.imageSrc, "projet");
        title_projet.appendChild(img_projet);
        title_projet.appendChild(title_text_projet);
        
        var desc_projet = createText('p', firstItem.desc);
        desc_projet.class="description_projet";
        
        text_projet.appendChild(title_projet);
        text_projet.appendChild(desc_projet);
        text_projet.appendChild(createGitHubLink(firstItem.github));

        projet.appendChild(text_projet);
        menuDiv.addEventListener('click', function(event) {
            if (event.target.tagName === 'UL') {
                
                var videoLink = menuList.find(item => item.name === event.target.textContent)?.videoLink;
                var imageLink = menuList.find(item => item.name === event.target.textContent)?.imageSrc;
                var descLink = menuList.find(item => item.name === event.target.textContent)?.desc;
                var githublink = menuList.find(item => item.name === event.target.textContent)?.github;
                updateLinkGithub(githublink)
                console.log("Changement de projet" + videoLink + "  " + imageLink + " " + githublink);
                if (videoLink) {
                    video_iframe.scrollIntoView({ behavior: 'smooth' }); // Scroll auto jusqu'au menu-projets avec les noms des projets
                    desc_projet.innerHTML=descLink;
                    title_text_projet.innerHTML=event.target.textContent;
                    updateVideoElement(videoLink);
                    updateImageElement(imageLink);
                    
                }
            }});
        projets.appendChild(projet);
        projetsContainer.appendChild(projets);
    }
    else if(id === 'plandusite'){

    }


    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
        }
    };
    const observer = new MutationObserver(callback);
    const targetNode = document.querySelector('body');
    const config = { attributes: true, childList: true, subtree: true };
    reveniralentete()
    observer.observe(targetNode, config);
    
}

const buttons = document.querySelectorAll('#down-menu button');

// Ajouter un gestionnaire d'événements "click" à chaque bouton
buttons.forEach(button => {
    button.addEventListener('click', function() {
        toggleTeamInfo(button.id);
    });
});
