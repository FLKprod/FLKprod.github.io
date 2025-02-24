import {createLineSpan,createImage, createText, createIconWithLink, createElementWithClass, createButton, createTextforSommaire, createVideo, createMenuItem } from './createElements.js';
import {createCarousel, generateImagePaths, createProjetCarousel} from './carroussel.js';
import { loadactuFromXML, searcharticle} from './actu.js';


gsap.registerPlugin(ScrollTrigger);

/************************** GESTION DU MENU EN ENTETE *********************************************/

document.addEventListener('contextmenu', event => event.preventDefault());
const buttonIds = ['presentation','services','projets', 'videos', 'photos','aproposdemoi','actu'];
buttonIds.forEach(buttonId => {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', function() {
        toggleTeamInfo(buttonId);
        scrollauto(".entete")
    });
});

toggleTeamInfo('presentation'); // commence par afficher la page presentation quand on arrive sur le site

/**************************************************************************************************/

/**************************** RENVOIT AU HAUT DE LA PAGE ******************************************/

export function scrollauto(div) {
    const entete = document.querySelector(div);
    const positionHautEntete = entete.offsetTop;

    const startPosition = window.scrollY;
    const distance = positionHautEntete - startPosition;
    const duration = 1000;
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); 

        const easeInOutQuad = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const newPosition = startPosition + distance * easeInOutQuad;
        window.scrollTo(0, newPosition);

        if (elapsedTime < duration) {
            requestAnimationFrame(animateScroll);
        }
    }
    requestAnimationFrame(animateScroll);
}

/**************************************************************************************************/

export async function toggleTeamInfo(id) {
    gsap.registerPlugin(ScrollTrigger);
    const daynightCheckbox = document.getElementById('daynight');

    var buttons = document.querySelectorAll('.sections-menu button');
    buttons.forEach(function(button) {
        button.classList.remove('select');
    });

    ['section-menu', 'down-menu'].forEach(menuId => {
        var menu = document.getElementById(menuId);
        if (menu) {
            var selectedButton = menu.querySelector(`#${id}`);
            if (selectedButton) {
                console.log("section " + id);
                selectedButton.classList.add('select');
            } else {
                console.warn(`Aucun bouton trouvé avec l'ID : ${id} dans ${menuId}`);
            }
        }
    });

    var presentationContainer = document.querySelector('.presentation-container');
    var aproposdemoiContainer = document.querySelector('.aproposdemoi-container');
    var videosContainer = document.querySelector('.videos-container');
    var servicesContainer = document.querySelector('.services-container');
    var projetsContainer = document.querySelector('.projets-container');
    var planContainer = document.querySelector('.plandusite-container');
    var photosContainer = document.querySelector('.photos-container');
    var actuContainer = document.querySelector('.actu-container');
    presentationContainer.innerHTML = '';
    planContainer.innerHTML='';
    servicesContainer.innerHTML = '';
    aproposdemoiContainer.innerHTML = '';
    videosContainer.innerHTML = '';
    projetsContainer.innerHTML = '';
    photosContainer.innerHTML = '';
    actuContainer.innerHTML = '';

    if(id=== 'services'){

        var intro2services = createElementWithClass('div','section-services');
            var text_intro2services = createElementWithClass('div','text-section-services');
                text_intro2services.appendChild(createText('h2',"Et si on travaillais ensemble ? "));
                    text_intro2services.appendChild(createText('p',"Ensemble, faisons quelque chose d’unique et à vos attentes !"));
            intro2services.appendChild(text_intro2services);
        servicesContainer.appendChild(intro2services);

        var intro2services = createElementWithClass('div','service');
        var image_intro2services = createElementWithClass('div','image-section');
        image_intro2services.appendChild(createImage('Photos/services/shooting_pro.jpg'));
        intro2services.appendChild(image_intro2services);
        var text_intro2services = createElementWithClass('div','text-section');
        text_intro2services.appendChild(createText('h2',"Shooting Photo Professionnel"));
        text_intro2services.appendChild(createText('p',`Offrez-vous un shooting photo professionnel pour sublimer votre image et valoriser vos projets. 
            Que ce soit pour des portraits, des photos corporate, ou des visuels destinés à votre marque, je vous accompagne avec une approche personnalisée et créative. 
            Avec des prises de vue soignées et un rendu de haute qualité, mettez votre meilleur atout en lumière.`));
            text_intro2services.appendChild(createButton("Checkez mes précédentes créations", () => toggleTeamInfo('photos')));
        intro2services.appendChild(text_intro2services);
        servicesContainer.appendChild(intro2services);

        var intro2services = createElementWithClass('div','service');
        
        
        var text_intro2services = createElementWithClass('div','text-section');
        text_intro2services.appendChild(createText('h2',"Shootings pour vos événements"));
        text_intro2services.appendChild(createText('p',`
            Immortalisez vos moments précieux avec des photos naturelles et authentiques. Basé en région parisienne et à Dijon, je me déplace partout en France pour capturer mariages, 
            anniversaires, événements privés ou professionnels. Je vous propose une couverture complète,
             des idées originales et des shootings adaptés pour refléter l’ambiance unique de votre journée.
              Contactez-moi pour créer ensemble des souvenirs inoubliables !     `));
            text_intro2services.appendChild(createButton("Checkez mes précédentes créations", () => toggleTeamInfo('photos')));
            intro2services.appendChild(text_intro2services);

        var image_intro2services = createElementWithClass('div','image-section');
        image_intro2services.appendChild(createImage('Photos/services/shooting.JPG'));
        intro2services.appendChild(image_intro2services);
        servicesContainer.appendChild(intro2services);

        var intro2services = createElementWithClass('div','service');
        var text_intro2services = createElementWithClass('div','text-section');
        var image_intro2services = createElementWithClass('div','image-section');
        image_intro2services.appendChild(createImage('Photos/services/shooting_urbain.jpeg'));
        intro2services.appendChild(image_intro2services);
        text_intro2services.appendChild(createText('h2', "Shooting photo à titre personnel"));
        text_intro2services.appendChild(createText('p', `Des photos authentiques au cœur de la ville, ou en pleine nature, capturant l’essence de votre univers.
            Que ce soit à Paris, Dijon ou partout en France, je vous propose des shootings adaptés à vos envies et à votre style.
            Prêt(e) à immortaliser vos moments dans un cadre urbain unique ? Contactez-moi pour organiser votre séance !        `));
        text_intro2services.appendChild(createButton("Checkez mes précédentes créations", () => toggleTeamInfo('photos')));
        intro2services.appendChild(text_intro2services);
        servicesContainer.appendChild(intro2services);

        var intro2services = createElementWithClass('div','service');
        var text_intro2services = createElementWithClass('div','text-section');
        text_intro2services.appendChild(createText('h2',"Création de Portfolio Personnalisé"));
        text_intro2services.appendChild(createText('p',`Un portfolio qui met en valeur votre talent, que vous soyez artiste, photographe, entrepreneur ou autre.
            Que ce soit pour un portfolio élégant, un site vitrine ou une présence en ligne unique, je peux vous concevoir des designs esthétiques et optimisés pour une navigation fluide.
            Ensemble, mettons en valeur votre image et vos projets avec un site qui vous distingue, et rien que pour vous !`));
        
            text_intro2services.appendChild(createButton("Checkez mes précédentes projets informatiques", () => toggleTeamInfo('projets')));
            intro2services.appendChild(text_intro2services);

        var image_intro2services = createElementWithClass('div','image-section');
        image_intro2services.appendChild(createImage('Photos/services/portofolio.jpg'));
        intro2services.appendChild(image_intro2services);
        servicesContainer.appendChild(intro2services);

        var intro2services = createElementWithClass('div','contact-services');
            var text_intro2services = createElementWithClass('div','text-section-services');
                text_intro2services.appendChild(createText('h2',"Intéréssé ?"));
                text_intro2services.appendChild(createText('p',`Contactez moi directement par courriel ou sur mes réseaux sociaux !`));
                var text_contact_intro2services = createElementWithClass('div','text-contacts-services');
                    text_contact_intro2services.appendChild(createIconWithLink("fab fa-instagram", "https://www.instagram.com/flkprod_/"));
                    text_contact_intro2services.appendChild(createIconWithLink("fab fa-linkedin", "https://www.linkedin.com/in/maxime-falkowski-9a4607216?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGJJZ%2FAWYSLGq0t%2BQS92TrQ%3D%3D"));
                    text_contact_intro2services.appendChild(createIconWithLink("fa fa-envelope", "window.location.href='mailto:maxime.falkowski@free.fr';"));
                text_intro2services.appendChild(text_contact_intro2services);
                intro2services.appendChild(text_intro2services);
        servicesContainer.appendChild(intro2services);

        gsap.utils.toArray(".service").forEach(service => {
            var tl1 = gsap.timeline({
                scrollTrigger: {
                    trigger: service,
                    start: "top center",  
                    end: "bottom bottom", 
                    scrub: true,  
                }
            });
            tl1.from(service.querySelectorAll(".service > *"), { 
                opacity: 0,
                y: "100%", 
                duration: 1 
            });
        });
        
    }
    if(id=== 'videos'){
        var intro2videos = createElementWithClass('div', 'section', 'section-videos');

        var text_intro2videos = createElementWithClass('div', 'text-section', 'video-section');
        text_intro2videos.appendChild(createText('h2', "Mes contenus vidéos"));
        text_intro2videos.appendChild(createText('p', `
            Jusqu'à présent, je partageais mes créations sur mon compte Instagram
            <a href='https://www.instagram.com/flkprod_/' target='_blank'>@FLKPROD_</a>, qui reste actif aujourd'hui.
            Désormais, c'est sur ce site que vous pourrez découvrir l'intégralité de mes réalisations.
            Explorez-les dans la section ci-dessous !`));
        text_intro2videos.appendChild(createText('h2', "Enjoy."));
        intro2videos.appendChild(text_intro2videos);
        videosContainer.appendChild(intro2videos);

        var galerie = createElementWithClass("div", "galerie-videos");

        const videosData = [
            {
                url: 'https://www.youtube.com/embed/sDuDS7t4UsU',
                title:'Creation #1',
                description: `Création d'une introduction avec pour thème la montée en puissance de
                la menace cybernétique dans notre ère moderne.`,
                competences:"Montage vidéo , Tournage Vidéo , Scénarisation"
            },
            {
                url: 'https://www.youtube.com/embed/fNdTNYmgD8o',
                title:'Présentation BDE Lepus Sinapis',
                description: "Création d'une vidéo humoristique pour une campagne du Bureau des Élèves de mon école d'ingénieurs, Polytech Dijon.",
                competences:"Montage vidéo , Tournage Vidéo , Scénarisation"
            }
        ];

        videosData.forEach(videoData => {
            var videoContainer = createElementWithClass("div", "video-container");
            var iframe = createVideo(videoData.url);
            videoContainer.appendChild(iframe);

            var videoTitle = createElementWithClass("h3", "video-description");
            videoTitle.textContent = videoData.title;
            videoContainer.appendChild(videoTitle);
            var videoDescription = createElementWithClass("p", "video-description");
            videoDescription.textContent = videoData.description;
            videoContainer.appendChild(videoDescription);
            
            const competences = createElementWithClass('div', 'competences');
            videoData.competences.split(', ').forEach(skill => {
                const skillTag = createElementWithClass('span', 'competence-tag');
                skillTag.textContent = skill;
                competences.appendChild(skillTag);
            });
            videoContainer.appendChild(competences);
            galerie.appendChild(videoContainer);
        });

        videosContainer.appendChild(galerie);

        gsap.from('.videos-container > *',{scale:0,stagger:1, duration:1});

    }
    else if(id=== 'presentation'){
        
        var intro2presentation = createElementWithClass('div','section-presentation');
        var text_intro2presentation = createElementWithClass('div','text-section-presentation');
            text_intro2presentation.appendChild(createText('h2',"Bienvenue"));
            text_intro2presentation.appendChild(createText('p',`Découvrez mon univers dédié à la photographie,
                 à la vidéo, et à mes projets numériques. Entre créativité visuelle et innovation technologique,
                  je partage ici mes réalisations, mes inspirations, mes collaborations, bref, ce qui me passionne dans la vie.`));
            text_intro2presentation.appendChild(createText('h2',"Enjoy."));
        intro2presentation.appendChild(text_intro2presentation);
        presentationContainer.appendChild(intro2presentation);




        var apropos2presentation = createElementWithClass('div','presentation-apropos-presentation');
        var image_apropos2presentation = createElementWithClass('div','image-presentation');
        image_apropos2presentation.appendChild(createImage("Photos/cyber.png"));
        var text_apropos2presentation = createElementWithClass('div','text-section-presentation');
        text_apropos2presentation.appendChild(createText('h2',"Moi c'est Maxime"));
        text_apropos2presentation.appendChild(createText('p',`Découvrez qui je suis et ce que je partage sur ce site !`));
                  text_apropos2presentation.appendChild(createText('h2',"Enjoy."));
        
        apropos2presentation.appendChild(image_apropos2presentation);
        apropos2presentation.appendChild(text_apropos2presentation);
        presentationContainer.appendChild(apropos2presentation);

        

        var intro2menupresentation = createElementWithClass('div','section-menu-presentation');
        const menuData = [
            {
                id: "projets",
                className: "projets",
                text: "Projets",
                description: "entre créations web et programmation avancée",
                imageUrl: "Photos/menu/projet.jpeg",
            },
            {
                id: "videos",
                className: "videos",
                text: "Multimedia",
                description: "Découvrez mes créations vidéos",
                imageUrl: "Photos/menu/videos.JPG",
            },
            {
                id: "photos",
                className: "photos",
                text: "Photographies",
                description: "Admirez mes meilleures photos",
                imageUrl: "Photos/menu/photos.gif",
            },
            ,
            {
                id: "services",
                className: "services",
                text: "Mes services",
                description: "Travaillons ensemble !",
                imageUrl: "Photos/menu/services.jpg",
            },
            {
                id: "actu",
                className: "actu",
                text: "Actualité",
                description: "Mes dernières news et articles",
                imageUrl: "Photos/menu/actu.jpg",
            }
            
        ];
    
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
            image2_presentation = createElementWithClass('div','yellow-dot');
            image_intro2presentation.appendChild(image2_presentation);

        presentationContainer.appendChild(intro2menupresentation);
        presentationContainer.appendChild(image_intro2presentation);

        const hoverArea = document.querySelector('.image-section-presentation');
        const yellowDot = document.querySelector('.yellow-dot');

        let mouseX = 0, mouseY = 0;  // Position de la souris

        // Suivre la position de la souris 
        hoverArea.addEventListener('mousemove', function(event) {
            const rect = hoverArea.getBoundingClientRect();
            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
        });

        // Déplacement du point avec un léger retard
        function moveDot() {
            const dotX = (mouseX - yellowDot.offsetLeft); 
            const dotY =  (mouseY - yellowDot.offsetTop); 
            yellowDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            requestAnimationFrame(moveDot);
        }

        // Démarre le mouvement du point dès que la souris survole la zone
        hoverArea.addEventListener('mouseenter', () => {
            yellowDot.style.opacity = 1;
            moveDot();
        });

        // Masque le point lorsque la souris quitte la zone
        hoverArea.addEventListener('mouseleave', () => {
            yellowDot.style.opacity = 0;
        });



        var items_menu = document.querySelectorAll('.menu-item');

        const tl_menuitems = gsap.timeline({
            scrollTrigger: {
                trigger: ".menu-item",
                start: "top 80%", 
                end: "bottom 80%", 
                scrub: true,
            }
        });

        items_menu.forEach((arg, index) => {
            const fromDirection = index % 2 === 0 ? -100 : 100;
            tl_menuitems.from(arg, {
                opacity: 0,
                y: fromDirection, 
                duration: 1, 
                ease: "power2.out", 
            }, index * 0.3);
        });

    }
    else if(id=== 'aproposdemoi'){
        
        var intro2presentation = createElementWithClass('div','section','moicmaxime');
        var image_intro2presentation = createElementWithClass('div','image-section');
        image_intro2presentation.appendChild(createImage('Photos/Apropos/maxime_wizya.png'));
        intro2presentation.appendChild(image_intro2presentation);

        var text_intro2presentation = createElementWithClass('div','text-section');
        text_intro2presentation.appendChild(createText('h2',"Moi, c’est Maxime"));
        text_intro2presentation.appendChild(createText('p',`J'ai 23 ans et je suis consultant GRC SAP chez <a href='https://wizya.fr/' target='_blank'>WIZYA</a>, en terres parisiennes.
            j'ai étudié en école d'ingénieur en sécurité informatique à Dijon.
            J'ai aussi suivi une formation en double diplôme en cybersécurité à Chicoutimi, au beau milieu du Québec.
            J'ai plusieurs grandes passions telles que la cybersécurité, dommaine dans lequel j'y exerce ma profession, mais aussi la photographie, la vidéo et l'informatique.`));
        text_intro2presentation.appendChild(createText('p',`En dehors de mon travail de consultant,
             je m'investis pleinement dans la création de contenus visuels que je partage sur mes réseaux sociaux,
            ainsi que dans des projets informatiques à titre personnel ou profesionnel.
            C'est sur ce site que vous trouverez toutes mes créations, aussi bien visuelles que informatiques.`));
        text_intro2presentation.appendChild(createLineSpan(0));
        text_intro2presentation.appendChild(createText('h2',"Pour résumer : "))
        text_intro2presentation.appendChild(createText('h6',` <i class="fa fa-briefcase" aria-hidden="true"></i> Consultant SAP GRC`));
        text_intro2presentation.appendChild(createText('h6',` <i class="fa fa-city"></i> WIZYA Consulting`));
        text_intro2presentation.appendChild(createText('h6',` <i class="fa fa-map-marker"></i> Paris, France`));
        text_intro2presentation.appendChild(createText('h6',` <i class="fa fa-camera"></i> <i class="fa fa-code"></i> <i class="fa fa-video"></i> <i class="fa fa-shield-alt" aria-hidden="true"></i> Passioné`));
        intro2presentation.appendChild(text_intro2presentation);
        aproposdemoiContainer.appendChild(intro2presentation);

        var intro2lbnl = createElementWithClass('div','section','berkeley');
            var text_intro2lbnl = createElementWithClass('div','text-section','desc-berkeley');
            text_intro2lbnl.appendChild(createText('h2',"Mon Experience à Berkeley"));
            
            var logoucberkeley=createElementWithClass('div','section','logoucberkeley');
            logoucberkeley.appendChild(createImage('Photos/Apropos/FUEGO.png'));
            text_intro2lbnl.appendChild(logoucberkeley)

            text_intro2lbnl.appendChild(createText('p',`En 2023, j'ai eu le privilège d'éfféctuer un stage de 3 mois au Lawrence Berkeley National Laboratory, dans la préstigieuse université de Californie.
                j'ai été immergé dans un environnement de recherche dynamique et stimulant.
                Les échanges avec des chercheurs de calibre mondial, comme Carlton Pennypacker, ont été une source d'inspiration constante pour moi.
                Le Laboratoire national de Berkeley est réputé pour ses avancées dans divers domaines scientifiques, et y travailler a été une expérience inestimable pour mon développement professionnel et personnel.`));

            text_intro2lbnl.appendChild(createImage('Photos/Apropos/carte_berkeley.png'));

            text_intro2lbnl.appendChild(createText('p',`J'ai eu ainsi l'occasion d'intégrer l'équipe <a href='https://fuego.ssl.berkeley.edu/' target='_blank'>FUEGO</a>, une equipe travaillant sur un projet
                 très innovant. Leur but ultime : concevoir un sattelite,
                 en partenariat avec la NASA, afin de détécter les incendies de forêt dans l'ouest américain.
                La nature en constante évolution des incendies de forêt exigeait des solutions innovantes et rapides, comme celle ci.
                Contribuer à la conception d'algorithmes de pointe pour l'analyse des données satellitaires m'a confronté à des problématiques complexes,
                stimulant ainsi ma créativité et ma résolution de problèmes.`));

            text_intro2lbnl.appendChild(createText('p',`Au-delà des aspects techniques, mon passage au LBNL m'a également permis de développer des compétences interpersonnelles essentielles.
                Travailler en équipe dans un environnement aussi diversifié, avec des personnes ne parlant pas la même langue et aux parcours variés,
                 m'a permis de développer mon anglais au maximum et d'être capable de parler courament cette langue.`));

            text_intro2lbnl.appendChild(createText('p',`En résumé, mon stage au Lawrence Berkeley National Laboratory a été une expérience transformative.
                Il m'a offert une vision approfondie du processus de recherche scientifique, tout en me permettant de contribuer à un projet d'importance capitale pour la société.
                Les leçons apprises et les souvenirs accumulés lors de cette expérience resteront gravés dans ma mémoire et guideront mes pas dans mes futurs projets professionnels.`));

            text_intro2lbnl.appendChild(createText('p',`Ma collaboration avec le Lawrence Berkeley National Laboratory a été bien plus qu'un simple stage professionnel.
                Elle a été une véritable immersion dans le monde de la recherche scientifique de pointe et une opportunité de contribuer à des projets ayant un impact tangible sur notre société et notre environnement.`));
            text_intro2lbnl.appendChild(createImage('Photos/Apropos/LBNL.jpg'));
            intro2lbnl.appendChild(text_intro2lbnl);
        
            var image_intro2lbnl = createElementWithClass('div','image-section','portrait');
            image_intro2lbnl.appendChild(createImage('Photos/Apropos/berkeley.jpg'));
            intro2lbnl.appendChild(image_intro2lbnl);
        aproposdemoiContainer.appendChild(intro2lbnl);

        var intro2quebec = createElementWithClass('div','section','quebec');
        var image_intro2quebec = createElementWithClass('div','image-section','portrait');
        image_intro2quebec.appendChild(createImage('Photos/Apropos/fjord.jpg'));
        intro2quebec.appendChild(image_intro2quebec);
        var text_intro2quebec = createElementWithClass('div','text-section','desc-quebec');
        text_intro2quebec.appendChild(createText('h2',"Mon Experience au Québèc"));
        text_intro2quebec.appendChild(createText('p',`Deux mois après mon expérience enrichissante à Berkeley,
            j'ai décidé de retourner en Amérique pour poursuivre un double diplôme dans le cadre d’un partenariat entre l’Université du Québec à Chicoutimi (UQAC)
            et mon école française, Polytech Dijon. `));

        text_intro2quebec.appendChild(createImage('Photos/Apropos/carte_quebec.png'));

        text_intro2quebec.appendChild(createText('p',`J'ai ainsi passé 10 mois à l'UQAC, où j'ai suivi une maîtrise (l'équivalent d’un master en France) en cybersécurité.
           Ce qui m'a particulièrement motivé, c'est l'approche pédagogique unique de l'UQAC, axée sur les projets concrets, bien plus nombreux que les cours traditionnels.
           Cette méthodologie m'a permis de travailler sur des projets très intéressants, ce qui a considérablement enrichi mon apprentissage et renforcé
           ma passion pour la cybersécurité.`));

        text_intro2quebec.appendChild(createText('p',`Durant ce cursus, j'ai développé des compétences approfondies dans des domaines clés tels que la gestion des incidents
            de sécurité, l'infonuagique, l'analyse forensique et la sécurité informatique. Cette expérience m'a également permis de découvrir la beauté exceptionnelle du Québec,
            une région où la chaleur humaine des habitants compense largement la rudesse des hivers glacials.`));

        text_intro2quebec.appendChild(createText('p',`En résumé, cette expérience a été aussi enrichissante sur le plan personnel que professionnel,
            et je la recommande vivement à tous ceux qui souhaitent conjuguer apprentissage et découverte culturelle.`));
        text_intro2quebec.appendChild(createImage('Photos/Apropos/UQAC_Quebec.jpg'));

        intro2quebec.appendChild(text_intro2quebec);
    
        aproposdemoiContainer.appendChild(intro2quebec);


        var intro2cybersection = createElementWithClass('div','section','cybersection');
        var text_intro2cybersection = createElementWithClass('div','text-section','desc-cybersection');
        text_intro2cybersection.appendChild(createText('h2',"Ma passion pour la Cybersécurité"));
        text_intro2cybersection.appendChild(createText('p',`La cybersécurité est bien plus qu’une simple discipline pour moi,
            c’est une véritable passion qui allie ma curiosité pour le monde numérique et mon amour pour le code. 
            Depuis mes débuts, je me suis toujours émerveillé par la manière dont la technologie peut être à la fois
             une opportunité incroyable et un terrain de menaces à comprendre et à maîtriser. Ce mélange entre protection,
              innovation et analyse me pousse constamment à me dépasser.`));
        text_intro2cybersection.appendChild(createText('p',`Ma passion pour le code s’intègre parfaitement dans cet univers,
                car chaque programme, chaque script que je développe devient un outil essentiel pour explorer,
                 détecter des vulnérabilités et concevoir des solutions. Je suis en perpétuelle quête d’apprentissage,
                  toujours à l’affût des nouvelles avancées dans la cybersécurité, des découvertes inédites et des opportunités 
                  qui s’offrent dans ce domaine en constante évolution. Qu’il s’agisse d’approfondir mes connaissances, de 
                  relever des défis techniques ou de m’investir dans des projets innovants, je suis animé par cette volonté de
                   comprendre et de contribuer à bâtir un monde numérique plus sûr et plus fiable.`));

        text_intro2cybersection.appendChild(createText('h2',"Mes Formations"));
        text_intro2cybersection.appendChild(createText('p',"Formation au diplome d'ingénieur en Sécurité Qualité Réseaux informatiques"));
        text_intro2cybersection.appendChild(createText('p',"Polytech Dijon, Bourgogne, FRANCE"));
        text_intro2cybersection.appendChild(createImage('Photos/Apropos/Polytech.png'));
        
        text_intro2cybersection.appendChild(createText('p',"Maîtrise (Master) en cybersécurité"));
        text_intro2cybersection.appendChild(createText('p',"UQAC (Université du Québèc à Chicoutimi, Québèc, CANADA)"));
        text_intro2cybersection.appendChild(createImage('Photos/Apropos/UQAC.jpg'));

        text_intro2cybersection.appendChild(createText('h2',"Mes Certifications en Réseaux / Cybersécurité"));

        var s1_certifications = createElementWithClass("div","class-certification");
        s1_certifications.appendChild(createImage('Photos/Apropos/CCNA.png'));
        var liste_1_certifications = document.createElement("ul");
        liste_1_certifications.appendChild(createText('li',"CCNA (<strong>C</strong>isco <strong>C</strong>ertified <strong>N</strong>etwork <strong>A</strong>ssociate) "));
        liste_1_certifications.appendChild(createText('li',"Cybersecurity Essentials By Cisco"));
        liste_1_certifications.appendChild(createText('li',"Network Security By Cisco"));
        liste_1_certifications.appendChild(createText('li',"Network Defense By Cisco"));
        liste_1_certifications.appendChild(createText('li',"Junior Cybersecurity Analyst Career"));
        s1_certifications.appendChild(liste_1_certifications);
        text_intro2cybersection.appendChild(s1_certifications);

        var s2_certifications = createElementWithClass("div","class-certification");
        s2_certifications.appendChild(createImage('Photos/Apropos/Fortinet.png'));
        var liste_2_certifications = document.createElement("ul");
        liste_2_certifications.appendChild(createText('li',"Fortinet Certified Associate Cybersecurity"));
        liste_2_certifications.appendChild(createText('li',"Fortinet Certified Fundamentals Cybersecurity"));
        
        s2_certifications.appendChild(liste_2_certifications);
        text_intro2cybersection.appendChild(s2_certifications);

        var  s5_certifications= createElementWithClass("div","class-certification");
        s5_certifications.appendChild(createImage('Photos/Apropos/cyberark.png'));
        var liste_5_certifications = document.createElement("ul");
        liste_5_certifications.appendChild(createText('li',"CyberArk Identity: Introduction to Workforce Password Management"));
        liste_5_certifications.appendChild(createText('li',"Introduction to CyberArk Identity Security"));
        s5_certifications.appendChild(liste_5_certifications);
        text_intro2cybersection.appendChild(s5_certifications);

        var s3_certifications = createElementWithClass("div","class-certification");
        s3_certifications.appendChild(createImage('Photos/Apropos/linux.png'));
        var liste_3_certifications = document.createElement("ul");
        liste_3_certifications.appendChild(createText('li',"BGD Linux Unhatched"));
        liste_3_certifications.appendChild(createText('li',"NDG Linux Essential"));
        s3_certifications.appendChild(liste_3_certifications);
        text_intro2cybersection.appendChild(s3_certifications);

        var  s4_certifications= createElementWithClass("div","class-certification");
        s4_certifications.appendChild(createImage('Photos/Apropos/htmlcssjs.png'));
        var liste_4_certifications = document.createElement("ul");
        liste_4_certifications.appendChild(createText('li',"JSE - Certified Entry-level JavaScript Programmer"));
        liste_4_certifications.appendChild(createText('li',"JSA - Certified Associate JavaScript Programmer"));
        s4_certifications.appendChild(liste_4_certifications);
        text_intro2cybersection.appendChild(s4_certifications);
        
        intro2cybersection.appendChild(text_intro2cybersection);
        var image_intro2cybersection = createElementWithClass('div','image-section','portrait');
        image_intro2cybersection.appendChild(createImage('Photos/Apropos/cybersection.jpg'));
        intro2cybersection.appendChild(image_intro2cybersection);
        aproposdemoiContainer.appendChild(intro2cybersection);


        var cv_section = createElementWithClass('div','section','cv');

        var image_certifications = createElementWithClass('div','image-section','portrait');
        image_certifications.appendChild(createImage('Photos/Apropos/lence.JPG'));
        cv_section.appendChild(image_certifications);
        
        var text_cv_section = createElementWithClass('div','text-section','contact-section');
        
        text_cv_section.appendChild(createText('h2',"Plus d'infos sur mon profil ?"));
        text_cv_section.appendChild(createText('p',"Vous pouvez consulter et télécharger mon CV dans les deux langues, anglaise et française, en cliquant sur les liens ci-dessous."));
        
        text_cv_section.appendChild(createIconWithLink("fa fa-file-pdf", "docs/Resume_Maxime_Falkowski.pdf"));
        text_cv_section.appendChild(createIconWithLink("fa fa-file-pdf", "docs/CV_Maxime_Falkowski.pdf"));
        text_cv_section.appendChild(createLineSpan(2));
        text_cv_section.appendChild(createText('h2',"Et pour me joindre ?"));
        text_cv_section.appendChild(createText('p',"Rien de plus simple, contactez moi par courriel ou via mes réseaux sociaux juste ici ! "));
        
        text_cv_section.appendChild(createIconWithLink("fab fa-instagram", "https://www.instagram.com/flkprod_/"));
        text_cv_section.appendChild(createIconWithLink("fab fa-linkedin", "https://www.linkedin.com/in/maxime-falkowski-9a4607216?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGJJZ%2FAWYSLGq0t%2BQS92TrQ%3D%3D"));
        text_cv_section.appendChild(createIconWithLink("fa fa-envelope", "window.location.href='mailto:maxime.falkowski@free.fr';"));
        cv_section.appendChild(text_cv_section);
        aproposdemoiContainer.appendChild(cv_section);
        
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


        gsap.from(".line", {
        scaleX: 0,
        transformOrigin: "left center", 
        ease: "none"
        });
        
        const elements = document.querySelectorAll('.moicmaxime > *');
        if (window.innerWidth > 1100) {
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
        }  

        var largeElements = aproposdemoiContainer.querySelectorAll(".desc-berkeley");
        if (window.innerWidth > 1100) {
            largeElements.forEach(large => {
                gsap.to(large, {
                    y: () => {
                        const berkeleyHeight = aproposdemoiContainer.querySelector('.berkeley').offsetHeight;
                        return Math.min(0, window.innerHeight - large.clientHeight - berkeleyHeight);
                    },
                    ease: "none",
                    scrollTrigger: {
                        trigger: '.berkeley',
                        pin: true,
                        start: "top top`",
                        end: () => {
                            const berkeleyHeight = document.querySelector('.berkeley').offsetHeight;
                            const largeHeight = large.clientHeight;
                            return `bottom ${Math.max(0, berkeleyHeight - largeHeight)}px`;
                        },
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                        onUpdate: self => {
                            console.log(`Progress: ${self.progress}, Direction: ${self.direction}`);
                        },
                    }
                });
            });
        }

        var largeElements = aproposdemoiContainer.querySelectorAll(".desc-quebec");
        if (window.innerWidth > 1100) {
            largeElements.forEach(large => {
                gsap.to(large, {
                    y: () => {
                        const quebecHeight = aproposdemoiContainer.querySelector('.quebec').offsetHeight;
                        return Math.min(0, window.innerHeight - large.clientHeight - quebecHeight);
                    },
                    ease: "none",
                    scrollTrigger: {
                        trigger: '.quebec',
                        pin: true,
                        start: `top ${6}em`, 
                        end: () => {
                            const quebecHeight = document.querySelector('.quebec').offsetHeight;
                            const largeHeight = large.clientHeight;
                            return `bottom ${Math.max(0, quebecHeight - largeHeight)}px`;
                        },
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                        onUpdate: self => {
                            console.log(`Progress: ${self.progress}, Direction: ${self.direction}`);
                        },
                    }
                });
            });
        }

        var largeElements = aproposdemoiContainer.querySelectorAll(".desc-cybersection");
        if (window.innerWidth > 1100) {
            largeElements.forEach(large => {
                gsap.to(large, {
                    y: () => {
                        const cybersectionHeight = aproposdemoiContainer.querySelector('.cybersection').offsetHeight;
                        return Math.min(0, window.innerHeight - large.clientHeight - cybersectionHeight);
                    },
                    ease: "none",
                    scrollTrigger: {
                        trigger: '.cybersection',
                        pin: true,
                        start: `top ${6}em`, 
                        end: () => {
                            const cybersectionHeight = document.querySelector('.cybersection').offsetHeight;
                            const largeHeight = large.clientHeight;
                            return `bottom ${Math.max(0, cybersectionHeight - largeHeight)}px`;
                        },
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                        onUpdate: self => {
                            console.log(`Progress: ${self.progress}, Direction: ${self.direction}`);
                        },
                    }
                });
            });
        }
    }
    else if(id === 'photos'){

        /************************************************* PARTIE PHOTO  ********************************************/

        var intro_for_photos= createElementWithClass('div','photos-presentation');
        var modal= createElementWithClass('div','modal');
        modal.id="carousel-modal";
        var modal_content= createElementWithClass('div','modal-content');
        modal_content.id="modal-content";
        modal.appendChild(modal_content);
        var image_intro_for_photos = createElementWithClass('div','image-photos-presentation');
        var img_for_image_intro_for_photos = createImage("Photos/sommaire_photos.jpg");
        img_for_image_intro_for_photos.id="image-intro-for-photo";
        if (!daynightCheckbox.checked) {
            img_for_image_intro_for_photos.src = "Photos/dark_sommaire_photos.jpg";
        }
        else{
            img_for_image_intro_for_photos.src = "Photos/sommaire_photos.jpg";
        }
        image_intro_for_photos.appendChild(img_for_image_intro_for_photos)
        var text_intro_for_photos = createElementWithClass('div','text-photos-presentation');
       
        intro_for_photos.appendChild(image_intro_for_photos)
        text_intro_for_photos.appendChild(createText('h3', "Mes contenus photographiques"));
        text_intro_for_photos.appendChild(createText('p', "Découvrez mes clichés qui reflètent ma passion pour la photographie et la créativité."));
        text_intro_for_photos.appendChild(createText('p',"Scroll légèrement, cette section est loin d'être vide"));
        text_intro_for_photos.appendChild(createImage('Photos/scrolling.gif'));
        photosContainer.appendChild(modal);
        intro_for_photos.appendChild(text_intro_for_photos)

        var sommaire_photos = createElementWithClass('ul', 'sommaire-photos');

        sommaire_photos.appendChild(createTextforSommaire('li', 'Photos Urbaines', 'Photos-Urbaines'));
        sommaire_photos.appendChild(createTextforSommaire('li', 'Photos Sportives', 'Photos-Sportives'));
        sommaire_photos.appendChild(createTextforSommaire('li', 'Photos Nature', 'Photos-Nature'));
        sommaire_photos.appendChild(createTextforSommaire('li', 'Photos Événementielles', 'Photos-Événementielles'));
        

        text_intro_for_photos.appendChild(sommaire_photos);

        sommaire_photos.addEventListener('click', function (event) {
            console.log("Clic détecté sur : ", event.target);
            var item = event.target;
            
            if (item.tagName.toLowerCase() === 'a') {
                event.preventDefault();
                
                console.log("Cible de l'élément cliqué (data-target) :", item.getAttribute('data-target'));
                const targetId = item.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);
                var textID="#"+targetId
                if (targetElement) {
                    console.log("Élément cible trouvé :", targetElement);
                    scrollauto(textID);
                } else {
                    console.log("Élément cible non trouvé:", targetId);
                }
            }
            
        });
        photosContainer.appendChild(intro_for_photos);

        gsap.from('.photos-presentation',{scale:0,stagger:1, duration:1});

        // SECTIONS / Photos Urbaines | Photos Sportives | Photos Événementielles | Shootings | Macrophotographie
        const categoriesData = [
            { name: 'Dijon', desc: "Bourgogne, France", nbrepictures: 4, category: 'Photos Urbaines' },
            { name: 'Strasbourg', desc: "Alsace, France", nbrepictures: 4, category: 'Photos Urbaines' },
            { name: 'Berlin', desc: "Allemagne, Europe", nbrepictures: 8, category: 'Photos Urbaines' },
            { name: 'San Francisco', desc: "California, USA", nbrepictures: 6, category: 'Photos Urbaines' },
            { name: 'Chicago', desc: "Illinois, USA", nbrepictures: 5, category: 'Photos Urbaines' },
            { name: 'Boston', desc: "Massachusetts, USA", nbrepictures: 6, category: 'Photos Urbaines' },
            { name: 'Paris', desc: "Ile-De-France, France", nbrepictures: 7, category: 'Photos Urbaines' },
            { name: 'Quebec City', desc: "Quebec, Canada", nbrepictures: 7, category: 'Photos Urbaines' },
            { name: 'Quebec', desc: "Quebec, Canada", nbrepictures: 10, category: 'Photos Nature' },
            { name: 'Baseball', desc: "San Francisco Giants, USA, saison 2022-2023", nbrepictures: 4, category: 'Photos Sportives' },
            { name: 'Basket', desc: "Betclic elite saison 2022-2023", nbrepictures: 3, category: 'Photos Sportives' },
            { name: 'Nanterre 92', desc: "Betclic elite saison 2024-2025", nbrepictures: 11, category: 'Photos Sportives' },
            { name: 'Paris Basketball', desc: "Euroleague saison 2024-2025", nbrepictures: 10, category: 'Photos Sportives' },
            { name: 'JDA Dijon Basket', desc: "Betclic elite saison 2024-2025", nbrepictures: 11, category: 'Photos Sportives' },
            { name: 'Automobile', desc: "Circuit Dijon-Prenois, 2024", nbrepictures: 7, category: 'Photos Événementielles' },
            { name: 'Rétro Mobile', desc: "Salon du Rétro mobile 2025, Paris, France", nbrepictures: 8, category: 'Photos Événementielles' }
        ];
        
        // TRIE DES SECTIONS EN CATEGORIES POUR FACILITER LE TOUT
        const groupByCategory = (data) => {
            return data.reduce((groups, item) => {
                if (!groups[item.category]) {
                    groups[item.category] = [];
                }
                groups[item.category].push(item);
                return groups;
            }, {});
        };
        const groupedData = groupByCategory(categoriesData);
        var modal = createElementWithClass('div', 'modal');
        modal.id = "carousel-modal";
        var modal_content = createElementWithClass('div', 'modal-content');
        modal_content.id = "modal-content";
        modal.appendChild(modal_content);
        photosContainer.appendChild(modal);

        // OUVERTURE ET FERMETURE DU MODAL POUR VOIR ET DEFILER DANS LES IMAGES
        const openModal = (carouselContent) => {
            modal_content.innerHTML = '';
            modal_content.appendChild(carouselContent);
            modal.classList.add('active');
        };

        const closeModal = (event) => {
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        };
        modal.addEventListener('click', closeModal);
        
        function replaceSpacesWithHyphens(input) {
            return input.replace(/\s+/g, '-');
        }
        Object.entries(groupedData).forEach(([category, items]) => {
            const categoryTitle = createElementWithClass('h2', 'category-title');
            categoryTitle.id = replaceSpacesWithHyphens(category);;
            categoryTitle.setAttribute('data-target', category);
            const categorySection = createElementWithClass('div', 'category-section', String.category);
        
            categoryTitle.textContent = "- " + category;
            photosContainer.appendChild(categoryTitle);
            items.forEach((item, index) => {
                const { name, desc, nbrepictures } = item;
                const carouselSection = createElementWithClass('div', 'section', 'photos');
                const images = generateImagePaths(name, nbrepictures);
                const categoryElement = createCarousel(name, desc, images, index,true);
        
                categoryElement.addEventListener('click', () => {
                    const enlargedCarousel = createCarousel(name, desc, images, index,false);
                    openModal(enlargedCarousel);
                });
    
                carouselSection.appendChild(categoryElement);
                categorySection.appendChild(carouselSection);
            });
            photosContainer.appendChild(categorySection);
        });

        const sections = document.querySelectorAll('.section.photos');
        
        
        sections.forEach((element, index) => {
            const offset = (window.innerWidth * 0.5) - parseFloat(getComputedStyle(document.documentElement).fontSize);
        
            gsap.fromTo(element, 
                {
                    autoAlpha: 0,x: index % 2 === 0 ? -offset : offset, 
                }, 
                {
                    autoAlpha: 1,     
                    x: 0,   
                    ease: "power2.out", 
                    scrollTrigger: {
                        trigger: element,
                        start: "25% bottom",
                        end: "75% bottom",  
                        scrub: true,  
                    }
                }
            );
        });        
    }
    else if(id === 'projets'){
        var intro2projects = createElementWithClass('div','section','projet-section');
        var image_intro2projects = createElementWithClass('div','image-projet-presentation');
        var img_for_image_intro_for_projets = createImage("Photos/projets.gif");
        img_for_image_intro_for_projets.id="image-intro-for-projet";
        image_intro2projects.appendChild(img_for_image_intro_for_projets);
        var text_intro2projects = createElementWithClass('div','text-section');
        text_intro2projects.appendChild(createText('h2',"Mes projets Informatiques"));
        text_intro2projects.appendChild(createText('p',"j'aime toujours développer de nouveaux programmes, que ce soit à titre personnel ou pour de potentiels clients"));
        text_intro2projects.appendChild(createText('p',"(Scroll légèrement, cette section est loin d'être vide)"));
        text_intro2projects.appendChild(createImage('Photos/scrolling.gif'));

        var sommaire_projets = createElementWithClass('ul', 'sommaire-projets');
        sommaire_projets.appendChild(createTextforSommaire('li', 'Projets Web', 'Projets-Web'));
        sommaire_projets.appendChild(createTextforSommaire('li', 'Projets de Programmation Avancée', 'Projets-de-Programmation-Avancée'));
        text_intro2projects.appendChild(sommaire_projets);

        sommaire_projets.addEventListener('click', function (event) {
            console.log("Clic détecté sur : ", event.target);
            var item = event.target;
            
            if (item.tagName.toLowerCase() === 'a') {
                event.preventDefault();
                
                console.log("Cible de l'élément cliqué (data-target) :", item.getAttribute('data-target'));
                const targetId = item.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);
                var textID="#"+targetId
                if(targetElement) {
                    console.log("Élément cible trouvé :", targetElement);
                    console.log(textID)
                    scrollauto(textID);
                } else {
                    console.log("Élément cible non trouvé:", targetId);
                }
            }
            
        });

        intro2projects.appendChild(image_intro2projects);
        intro2projects.appendChild(text_intro2projects);
        projetsContainer.appendChild(intro2projects);
        var menuList = [
            {
                name: "RockRush",
                category:"Projets-Web",
                github: "https://github.com/FLKprod/RockRush",
                videoLink: "Photos/projets/RockRush.mp4",
                imageSrc: "Photos/projets/RockRush.jpg",
                desc: `RockRush est un jeu en langage web créé durant ma formation ingénieur.
                C'est une version de Boulder Dash, un jeu classique où un mineur doit collecter tous les diamants sans se faire écraser par des pierres. \n
                Ce projet, réalisé durant mon cursus d'ingénieur en informatique, fut un travail très utile à la création de ce site internet.`,
                competences: "HTML / CSS, JavaScript"
            },
            {
                name: "Application DeepL",
                category:"Projets-de-Programmation-Avancée",
                github: "https://github.com/FLKprod/Appli_Android_Deepl",
                videoLink: "Photos/projets/DeepL.mp4",
                imageSrc: "Photos/projets/DeepL.png",
                desc: `Ce projet constitue une application Android que j'ai développée dans le cadre de ma formation d'ingénieur.
                Réalisé à travers l'outil de développement d'application Android Studio, cette application tire parti de l'API DeepL,
                une API avec version gratuite permettant d'utiliser les fonctionnalités de Deepl, traducteur mondialement connu.
                Son objectif principal est de fournir un service de traduction de texte efficace et convivial.`,
                competences: "Programmation Mobile, API"
            },
            {
                name: "201 Farehein",
                category:"Projets-de-Programmation-Avancée",
                github: "https://github.com/FLKprod/201F",
                videoLink: "Photos/projets/201F.mp4",
                imageSrc: "Photos/projets/201F.png",
                desc: `201 Farehein est une parodie du célèbre jeu mobile '94 degrees'. 
                Explorez un monde rempli de défis, de article hilarantes et de réponses surprenantes.
                Testez vos connaissances géographiques tout en vous amusant !` ,
                competences: "Python, Pygame"
            },
            {
                name: "CyberSafe",
                category:"Projets-Web",
                github: "https://github.com/FLKprod/Projet-IOT",
                videoLink: "Photos/projets/Cybersafe.mp4",
                imageSrc: "Photos/projets/Cybersafe.png",
                desc: `CyberSafe est une Plateforme de Surveillance des Vulnérabilités de Sécurité des Objets Connectés.
                 Elle se met à jour automatiquement pour informer les utilisateurs sur les vulnérabilités de sécurité
                  des objets connectés.`,
                competences: "HTML / CSS, JavaScript, IOT, JSON"
            },
            {
                name: "Verifile",
                category:"Projets-Web",
                github: "https://github.com/FLKprod/Verifile",
                videoLink: "Photos/projets/Verifile.mp4",
                imageSrc: "Photos/projets/Verifile.png",
                desc: `Verifile est un site permettant de scanner des URLs et des documents
                afin de déterminer leur fiabilité. Elle permet ainsi de protéger les utilisateurs des menaces sur le Web.
                Si le site ou le document n'a jamais été scanné par Verifile, un système de question réponse permet à l'utilisateur
                de prendre la meilleur décision quant a la fiabilité de ce dernier. Verifile est disponible sur internet en version d'essai juste <a href='https://verifileapp.fr/' target='_blank'>ici</a> `,
                competences: "HTML / CSS, JavaScript, Python, API"
            },
            {
                name: "LanbdaCash Tool",
                category:"Projets-de-Programmation-Avancée",
                github: "https://github.com/FLKprod/CloudProject",
                videoLink: "Photos/projets/landbacash.mp4",
                imageSrc: "Photos/projets/landbacash.png",
                desc: `LanbdaCash Tool est une application pour tester un programme et l'exécuter avec différentes valeurs de RAM afin comparer les prix d'exécution AWS (Amazon Web Services).
                Elle a pour simple but de guider un utilisateur sur la quantité de RAM nécésaire à emprunter pour avoir une bonne qualité d'éxécution tout en gardant un bon rapport qualité/prix.`,
                competences: "Cloud Computing, AWS, Python, Bash"
            },
            {
                name: "FLKprod.github.io",
                category:"Projets-Web",
                github: "https://github.com/FLKprod/FLKprod.github.io",
                videoLink: "",
                imageSrc: "Photos/projets/Flkprod.png",
                desc: `Ce site internet, tout simplement, créé de A à Z par moi-même.`,
                competences: "HTML / CSS, JavaScript, XML"
            },
            {
                name: "aleskflkphotos.github.io",
                category:"Projets-Web",
                github: "https://github.com/aleskflkphotos/aleskflkphotos.github.io",
                videoLink: "",
                imageSrc: "Photos/projets/aleskflkphotos.png",
                desc: `Ce site internet, créé de A à Z par moi-même, pour une connaissance, photographe indépendante. Son instagram est disponible juste ici pour les plus curieux : <a class="fab fa-instagram" onclick="window.open('https://www.instagram.com/aleskflkphotos/', '_blank'"></a>`,
                competences: "HTML / CSS, JavaScript"
            }
        ];

        const groupByCategory = (data) => {
            return data.reduce((groups, item) => {
                if (!groups[item.category]) {
                    groups[item.category] = [];
                }
                groups[item.category].push(item);
                return groups;
            }, {});
        };
        
        // Récupère les projets regroupés par catégorie
        const menuListGrouped = groupByCategory(menuList);
        Object.entries(menuListGrouped).forEach(([category, projects]) => {
            const categoryTitle = createElementWithClass('h2', 'category-title');
            categoryTitle.textContent = category;
            categoryTitle.id = category;
            categoryTitle.setAttribute('data-target', category);
            projetsContainer.appendChild(categoryTitle);
            const categoryContainer = createElementWithClass('div', 'category-container');
        
            projects.forEach(project => {
                const projet = createElementWithClass('div', 'projet');
        
                const images = [project.imageSrc];
                const carousel = createProjetCarousel(project.name, project.desc, images, project.videoLink, project.github);
                const titleElement = createElementWithClass('h3', 'project-title');
                titleElement.textContent = project.name;
        
                const competences = createElementWithClass('div', 'competences');
                project.competences.split(', ').forEach(skill => {
                    const skillTag = createElementWithClass('span', 'competence-tag');
                    skillTag.textContent = skill;
                    competences.appendChild(skillTag);
                });
                projet.appendChild(carousel);
                projet.appendChild(titleElement);
                projet.appendChild(competences);
                categoryContainer.appendChild(projet);
            });
            projetsContainer.appendChild(categoryContainer);
        });
        gsap.from('.projets-container > *',{scale:0,x:"50%", duration:1});        
    }
    else if(id === 'plandusite'){
        planContainer.appendChild(createText('h2', "Plan du site"));

        var columnsContainer = createElementWithClass('div', 'columns-container');
        const planData = [
            ["/", "Bienvenue"],
            ["Services", "Création de portofolios personnalisés", "Shootings photo spécialisés", "Shootings pour vos événements", "Shooting photo en milieu urbain"],
            ["Projets", "Projets Web",["RockRush", "Cybersafe", "Verifile","Flkprod.github.io", "aleskflkphotos.github.io"  ],"Projets de Programmation Avancée",["Application Deepl","201 Farehein","LandbaCash Tool"]],
            ["Multimedia", "Création #1", "Présentation BDE Lepus Sinapis"],
            ["Photographie", "Photos Urbaine", ["Dijon", "Strasbourg", "Berlin", "San Francisco", "Chicago", "Paris", "Quebec"], "Photos Sportives", ["Baseball", "Basket", "Nanterre 92", "Paris Basketball"], "Photos Evenementielles", ["Automobile","Retro Mobile 2025"]],
            ["A propos de moi", "Moi C'est Maxime", "Mon expérience à Berkeley","Mon Experience au Québèc", "Ma passion pour la cybersécurité", "Informations de contact"],
            ["Actualité"],
            ["Plan du site"]
        ];

        function appendItems(container, items, level = 0) {
            items.forEach((item) => {
                if (Array.isArray(item)) {
                    
                    const subContainer = createElementWithClass('div', 'sub-section','sub-section-level-${level}');
                    appendItems(subContainer, item, level + 1); 
                    container.appendChild(subContainer);
                } else {
                    const elementTag = level === 0 ? 'h3' : 'p';
                    const prefix = level > 0 ? "- " : ""; 
                    const element = createText(elementTag, prefix + item);
                    container.appendChild(element);
                }
            });
        }
        planData.forEach((items, index) => {
            if (index !== 0) {
                columnsContainer.appendChild(createElementWithClass("hr", "hr-plan"));
            }
            appendItems(columnsContainer, items);
        });
        planContainer.appendChild(columnsContainer);
    }
    else if(id === 'actu'){
        const actuContainer = document.querySelector('.actu-container');

        actuContainer.appendChild(createText('h2','Les dernières news de FLKprod_'));
        actuContainer.appendChild(createText('p',"Les dernières actualités et mises à jour de FLKprod_, afin de vous tenir informés des nouveautés et des projets à venir. Mais aussi des articles sur des sujets qui m'intéressent : C'est tout ce que vous retrouverez ici !"));
        var area_search =createElementWithClass("div","actu-container-search-area");
        const searchInput = document.createElement('input');
        searchInput.id = 'search';
        searchInput.placeholder = 'Rechercher un article';
        searchInput.addEventListener('input', searcharticle);
        area_search.appendChild(searchInput);
        actuContainer.appendChild(area_search);

        // Création du <select>
        const filterSelect = createElementWithClass("select","filter-select");
        filterSelect.id = "filter-select";

        // Liste des options
        const options = ["Filtrer les sujets", "Photographie", "Cybersécurité"];
        const values = ["all", "Photographie", "Cybersécurité"];

        // Ajout des options au <select>
        options.forEach((optionText, index) => {
            const option = document.createElement("option");
            option.value = values[index];
            option.textContent = optionText;
            filterSelect.appendChild(option);
        });
        area_search.appendChild(filterSelect);
        actuContainer.appendChild(area_search);

        const articleContainer = document.createElement('div');
        articleContainer.className = 'actu-article';
        actuContainer.appendChild(articleContainer);

        loadactuFromXML('/xml/actu.xml', actuContainer, searchInput);

        gsap.utils.toArray(".article").forEach(service => {
            var tl1 = gsap.timeline({
                scrollTrigger: {
                    trigger: service,
                    start: "top center",  
                    end: "bottom bottom", 
                    scrub: true,  
                }
            });
            tl1.from(service.querySelectorAll(".actu-article > .article"), { 
                opacity: 0,
                y: "100%", 
                duration: 1 
            });
        });
        

    }

    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
        }
    };
    const observer = new MutationObserver(callback);
    const targetNode = document.querySelector('body');
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(targetNode, config);
}

const buttons = document.querySelectorAll('#down-menu button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        toggleTeamInfo(button.id);
        scrollauto(".entete")
    });
});