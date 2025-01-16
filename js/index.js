import {createLineSpan,createImage, createText, createIconWithLink, createElementWithClass, createButton, createTextforSommaire, createVideo, createMenuItem } from './createElements.js';
import {createCarousel, generateImagePaths, createProjetCarousel} from './carroussel.js';

gsap.registerPlugin(ScrollTrigger);

/************************** GESTION DU MENU EN ENTETE *********************************************/

document.addEventListener('contextmenu', event => event.preventDefault());
const buttonIds = ['presentation','services','projets', 'videos', 'photos','aproposdemoi'];
buttonIds.forEach(buttonId => {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', function() {
        toggleTeamInfo(buttonId);
        reveniralentete()
    });
});

/* PARTIE EN DEV : CREATION DU SOMMAIRE POUR LES PHOTOS -> LIGNE 755
document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.sommaire-photos a');

    items.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault(); 
            const targetId = item.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'     
                });
            }
        });
    });
});

function scrollToElement(targetClassName) {
    const targetElement = document.querySelector(`.${targetClassName}`);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,  
            behavior: 'smooth'             
        });
    }
}
*/

toggleTeamInfo('presentation'); // commence par afficher la page presentation quand on arrive sur le site

/**************************************************************************************************/

/**************************** RENVOIT AU HAUT DE LA PAGE ******************************************/
export function reveniralentete() {
    const entete = document.querySelector('.entete');
    const positionHautEntete = entete.offsetTop;
    window.scrollTo({
        top: positionHautEntete,
        behavior: 'smooth'
    });
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
    presentationContainer.innerHTML = '';
    planContainer.innerHTML='';
    servicesContainer.innerHTML = '';
    aproposdemoiContainer.innerHTML = '';
    videosContainer.innerHTML = '';
    projetsContainer.innerHTML = '';
    photosContainer.innerHTML = '';

    if(id=== 'services'){

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
        text_intro2services.appendChild(createText('p',`Un portfolio qui met en valeur votre talent, que vous soyez artiste, photographe, designer ou autre.
            Ce que je peux vous proposer :

            <ul> - Un design sur mesure pour mettre en avant vos projets.</ul>
            <ul> - Du traitement des images pour un rendu professionnel.</ul>
            <ul> - Une organisation claire et intuitive.</ul>
            <ul> - Un portofolio compatible sur tous vos appareils (ordinateur, tablette, smartphone).</ul>

            Chaque projet est différent. Ensemble, créons votre portfolio, rien que pour vous !`));
        
            text_intro2services.appendChild(createButton("Checkez mes précédentes projets informatiques", () => toggleTeamInfo('projets')));
            intro2services.appendChild(text_intro2services);

        var image_intro2services = createElementWithClass('div','image-section');
        image_intro2services.appendChild(createImage('Photos/services/portofolio.jpg'));
        intro2services.appendChild(image_intro2services);
        servicesContainer.appendChild(intro2services);

        var intro2services = createElementWithClass('div','service');
        var image_intro2services = createElementWithClass('div','image-section');
        image_intro2services.appendChild(createImage('Photos/services/shooting_pro.jpg'));
        intro2services.appendChild(image_intro2services);
        var text_intro2services = createElementWithClass('div','text-section');
        text_intro2services.appendChild(createText('h2',"Shootings photo spécifiés"));
        text_intro2services.appendChild(createText('p',`Des photos qui capturent vos plus beaux moments, que ce soit pour un événement, un projet ou des besoins profesionnels.Je m’adapte à vos envies pour créer des clichés qui vous ressemblent.

            Ce que je peux vous proposer :

            <ul> - Une séance sur mesure, définie avec vous.</ul>
            <ul> - Des idées originales pour des photos uniques.</ul>
            <ul> - Des shootings pour tout type d’événement : portraits, groupes, mariages, anniversaires, etc.</ul>
            <ul> - Un moment convivial pour des photos naturelles.</ul>

            Prêt pour un shooting à votre image ? Organisons votre séance dès maintenant !      `));
            text_intro2services.appendChild(createButton("Checkez mes précédentes créations", () => toggleTeamInfo('photos')));
        intro2services.appendChild(text_intro2services);
        servicesContainer.appendChild(intro2services);

        var intro2services = createElementWithClass('div','service');
        
        
        var text_intro2services = createElementWithClass('div','text-section');
        text_intro2services.appendChild(createText('h2',"Shootings pour vos événements"));
        text_intro2services.appendChild(createText('p',`
            Immortalisez vos événements avec des photos qui capturent chaque instant précieux.
            Que ce soit un mariage, un anniversaire, une soirée ou tout autre moment important,
            je vous accompagne pour créer des souvenirs inoubliables. Basé en région parisienne et à Dijon,
            je peux également me déplacer partout en France pour répondre à vos besoins.

            Ce que je vous propose :

            <ul> - Une couverture adaptée à votre événement, pour ne rien manquer.</ul>
            <ul> - Des idées originales, afin de refléter l’ambiance unique de votre journée.</ul>
            <ul> - Des shootings variés : cérémonies, fêtes privées, événements d’entreprise, et bien plus.</ul>
            <ul> - Des photos naturelles et authentiques, pour retranscrire vos émotions.</ul>

            Prêt à immortaliser vos moments forts ? Contactez-moi et organisons votre shooting dès maintenant !         `));
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
        text_intro2services.appendChild(createText('h2', "Shooting photo en milieu urbain"));
        text_intro2services.appendChild(createText('p', `Des photos authentiques au cœur de la ville, capturant l’essence de votre univers urbain.
            Que ce soit à Paris, Dijon ou partout en France, je vous propose des shootings adaptés à vos envies et à votre style.
            Ensemble, nous transformerons les rues, les architectures et les ambiances citadines en toile de fond unique pour vos clichés.

        Ce que je peux vous offrir :

         <ul> - Une séance personnalisée, planifiée selon vos attentes.</ul>
         <ul> - Des idées créatives pour sublimer l’énergie de la ville dans vos photos.</ul>
         <ul> - Des shootings variés : portraits, mode, lifestyle, projets professionnels ou personnels.</ul>
         <ul> - Une expérience conviviale, pour des photos spontanées et naturelles.</ul>

        Prêt(e) à immortaliser vos moments dans un cadre urbain unique ? Contactez-moi pour organiser votre séance !        `));
        text_intro2services.appendChild(createButton("Checkez mes précédentes créations", () => toggleTeamInfo('photos')));
        intro2services.appendChild(text_intro2services);
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

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".service",
                start: "top center", 
                end: "bottom bottom",  
                scrub: true,            
            }
        });
        
        tl.from(".service > *", { 
            opacity: 0, 
            duration: 1, 
            y:"100%"
        });
    }
    if(id=== 'videos'){
        var intro2videos = createElementWithClass('div', 'section', 'section-videos');

        var text_intro2videos = createElementWithClass('div', 'text-section', 'video-section');
        text_intro2videos.appendChild(createText('h2', "Mes contenus vidéos"));
        text_intro2videos.appendChild(createText('p', `
            Auparavant, je partageais mes créations sur mon compte Instagram 
            <a href='https://www.instagram.com/flkprod_/' target='_blank'>@FLKPROD_</a>, qui est toujours actif à ce jour. 
            Maintenant, c'est sur ce site que toutes mes créations seront postées.
            Vous pouvez consulter toutes mes créations dans la rubrique ci-dessous.
        `));
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
            text_intro2presentation.appendChild(createText('p',`Découvrez mon univers dédié à la photographie, à la vidéo, et à mes projets numériques. Entre créativité visuelle et innovation technologique, je partage ici mes réalisations, mes inspirations, mes collaborations.`));
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
                imageUrl: "Photos/menu/services.jpeg",
            },
            {
                id: "aproposdemoi",
                className: "aproposdemoi",
                text: "À Propos de Moi",
                description: "Apprenez à mieux me connaître.",
                imageUrl: "Photos/menu/moi.JPG",
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

        presentationContainer.appendChild(intro2menupresentation);
        presentationContainer.appendChild(image_intro2presentation);
        gsap.from('.presentation-container > *',{scale:0,stagger:1, duration:1,stagger:1});

    }
    else if(id=== 'aproposdemoi'){
        
        var intro2presentation = createElementWithClass('div','section','moicmaxime');
        var image_intro2presentation = createElementWithClass('div','image-section');
        image_intro2presentation.appendChild(createImage('Photos/Apropos/Maxime_WIZYA.jpg'));
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
        text_intro2presentation.appendChild(createText('h2',"Pour résumer : "))
        text_intro2presentation.appendChild(createText('h6',` <i class="fa fa-briefcase" aria-hidden="true"></i> Consultant SAP GRC`));
        text_intro2presentation.appendChild(createText('h6',` <i class="fa fa-city"></i> WIZYA Consulting`));
        text_intro2presentation.appendChild(createText('h6',` <i class="fa fa-map-marker"></i> Paris, France`));
        text_intro2presentation.appendChild(createText('h6',` <i class="fa fa-camera"></i> <i class="fa fa-code"></i> <i class="fa fa-video"></i> Passioné`));
        intro2presentation.appendChild(text_intro2presentation);
        aproposdemoiContainer.appendChild(intro2presentation);



        var intro2lbnl = createElementWithClass('div','section','berkeley');
            var text_intro2lbnl = createElementWithClass('div','text-section','desc-berkeley');
            text_intro2lbnl.appendChild(createText('h2',"Mon Experience à Berkeley"));
            text_intro2lbnl.appendChild(createText('p',`Durant mon stage au Lawrence Berkeley National Laboratory, j'ai été immergé dans un environnement de recherche dynamique et stimulant.
                Les échanges avec des chercheurs de calibre mondial ont été une source d'inspiration constante.
                Le Laboratoire national de Berkeley est réputé pour ses avancées dans divers domaines scientifiques, et y travailler a été une expérience inestimable pour mon développement professionnel et personnel.`));

            text_intro2lbnl.appendChild(createImage('Photos/Apropos/carte_berkeley.png'));

            text_intro2lbnl.appendChild(createText('p',`En intégrant l'équipe FUEGO, j'ai été confronté à des défis technologiques passionnants.
                La nature en constante évolution des incendies de forêt exigeait des solutions innovantes et rapides.
                Contribuer à la conception d'algorithmes de pointe pour l'analyse des données satellitaires m'a confronté à des problématiques complexes, stimulant ainsi ma créativité et ma résolution de problèmes.`));

            text_intro2lbnl.appendChild(createText('p',`Au-delà des aspects techniques, mon passage au LBNL m'a également permis de développer des compétences interpersonnelles essentielles.
                Travailler en équipe dans un environnement aussi diversifié a nécessité une communication claire et efficace, ainsi qu'une capacité à collaborer avec des personnes aux parcours variés.
                Ces compétences sont précieuses, non seulement dans le domaine de la recherche, mais dans tous les aspects de ma carrière future.`));

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

        var certifications = createElementWithClass('div','formations');

        var text_certifications = createElementWithClass('div','certif-cisco');
        text_certifications.appendChild(createText('h2',"Mes Certifications en réseaux"));

        var s1_certifications = createElementWithClass("div","class-certification");
        s1_certifications.appendChild(createImage('Photos/Apropos/CCNA.png'));
        var liste_1_certifications = document.createElement("ul");
        liste_1_certifications.appendChild(createText('li',"CCNA (<strong>C</strong>isco <strong>C</strong>ertified <strong>N</strong>etwork <strong>A</strong>ssociate) "));
        liste_1_certifications.appendChild(createText('li',"Cybersecurity Essentials By Cisco"));
        liste_1_certifications.appendChild(createText('li',"Network Security By Cisco"));
        liste_1_certifications.appendChild(createText('li',"Network Defense By Cisco"));
        s1_certifications.appendChild(liste_1_certifications);
        text_certifications.appendChild(s1_certifications);
    
        var s2_certifications = createElementWithClass("div","class-certification");
        s2_certifications.appendChild(createImage('Photos/Apropos/Fortinet.png'));
        var liste_2_certifications = document.createElement("ul");
        liste_2_certifications.appendChild(createText('li',"Fortinet Certified Associate Cybersecurity"));
        liste_2_certifications.appendChild(createText('li',"Fortinet Certified Fundamentals Cybersecurity"));
        
        s2_certifications.appendChild(liste_2_certifications);
        text_certifications.appendChild(s2_certifications);

        var s3_certifications = createElementWithClass("div","class-certification");
        s3_certifications.appendChild(createImage('Photos/Apropos/linux.png'));
        var liste_3_certifications = document.createElement("ul");
        liste_3_certifications.appendChild(createText('li',"BGD Linux Unhatched"));
        liste_3_certifications.appendChild(createText('li',"NDG Linux Essential"));
        s3_certifications.appendChild(liste_3_certifications);
        text_certifications.appendChild(s3_certifications);

        var  s4_certifications= createElementWithClass("div","class-certification");
        s4_certifications.appendChild(createImage('Photos/Apropos/htmlcssjs.png'));
        var liste_4_certifications = document.createElement("ul");
        liste_4_certifications.appendChild(createText('li',"JSE - Certified Entry-level JavaScript Programmer"));
        liste_4_certifications.appendChild(createText('li',"JSA - Certified Associate JavaScript Programmer"));
        s4_certifications.appendChild(liste_4_certifications);
        
        text_certifications.appendChild(s4_certifications);
        text_certifications.appendChild(createLineSpan(1));

        certifications.appendChild(text_certifications);
        
        var text_ecoles_formations = createElementWithClass('div','ecoles_formations');
        text_ecoles_formations.appendChild(createText('h2',"Mes Formations"));
        var liste_1_ecoles_formations = document.createElement("div");
        liste_1_ecoles_formations.appendChild(createText('p',"Formation au diplome d'ingénieur en Sécurité Qualité Réseaux informatiques"));
        liste_1_ecoles_formations.appendChild(createText('p',"Polytech Dijon, Dijon, Bourgogne, FRANCE"));
        liste_1_ecoles_formations.appendChild(createImage('Photos/Apropos/Polytech.png'));
        
        
        
        text_ecoles_formations.appendChild(liste_1_ecoles_formations);
        var liste_2_ecoles_formations = document.createElement("div");
        liste_2_ecoles_formations.appendChild(createText('p',"Maîtrise (Master) en cybersécurité"));
        liste_2_ecoles_formations.appendChild(createText('p',"UQAC (Université du Québèc à Chicoutimi, Chicoutimi, Québèc, CANADA)"));
        liste_2_ecoles_formations.appendChild(createImage('Photos/Apropos/UQAC.jpg'));
        
        text_ecoles_formations.appendChild(liste_2_ecoles_formations);
        certifications.appendChild(text_ecoles_formations);

        aproposdemoiContainer.appendChild(certifications);

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

        // Création de l'animation pour la ligne dans section Moi c'est Maxime
        gsap.from(".line", {
        scaleX: 0,
        transformOrigin: "left center", 
        ease: "none"
        });
        
        const elements = document.querySelectorAll('.moicmaxime > *');

        // Animation pour moi c'est Maxime
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
                        start: "top ${6}em`",
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

        // TRANSITION POUR LA SECTION FORMATION            
        if (window.innerWidth > 1100) {
            var tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".formations",
                    scrub: true,
                    start: "top bottom",
                    end: "bottom top",
                    anticipatePin: 1,
                }
            });
        }
        else if (window.innerWidth > 768){
            var tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".formations",
                    scrub: true,
                    start: "top 75%", 
                    end: "bottom top",
                    anticipatePin: 1,
                }
            });
        }
        
        tl.from(".formations h2,.formations li, .formations img, .ecoles_formations p", {
            scale: 0, 
            rotation: 45, 
            autoAlpha: 0, 
            ease: "power2"
        },0)

        .from(".line1", {scaleX: 0, ease: "none"}, 0)
        .to(".certif-cisco", {scaleX: 1, ease: "none"})
        .to(".certif-cisco", {backgroundColor: "#e3d898"}, 0)
        .to(".ecoles_formations", {backgroundColor: "#192841"}, 0)
        .to(".quebec", {backgroundColor: "#e3d898"},0
        );

        // TRANSITION POUR SECTION CV
        var tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".cv",  
                start: "top bottom", 
                end: "top 25%",       
                scrub: true,              
            }
        });
        tl2.from(".line2", {scaleX: 0, backgroundColor: "#e3d898", ease: "none"}, 0)
        .to(".cv",{scaleX: 1, backgroundColor: "black", ease: "none"})
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
        text_intro_for_photos.appendChild(createText('p',"Scroll légèrement, cette section est loin d'être vide 😉"));
        photosContainer.appendChild(modal);
        intro_for_photos.appendChild(text_intro_for_photos)

        // PARTIE A FAIRE : FAIRE UN SOMMAIRE POUR LES CATEGORIES DE PHOTOS ET DESCENDRE DIRECT AU BON TRUC SI ON CLIQUE

        var sommaire_photos = createElementWithClass('div','sommaire-photos');
        sommaire_photos.id='sommaire-photos'
        sommaire_photos.appendChild(createTextforSommaire('a','Photos Urbaines','Photos Urbaines'))
        sommaire_photos.appendChild(createTextforSommaire('a','Photos Sportives','Photos Sportives'))
        sommaire_photos.appendChild(createTextforSommaire('a','Photos Événementielles','Photos Événementielles'))
        text_intro_for_photos.appendChild(sommaire_photos)

        photosContainer.appendChild(intro_for_photos);
        gsap.from('.photos-presentation',{scale:0,stagger:1, duration:1});

        // SECTIONS / Photos Urbaines | Photos Sportives | Photos Événementielles | Shootings | Macrophotographie
        const categoriesData = [
            { name: 'Dijon', desc: "Bourgogne, France", nbrepictures: 4, category: 'Photos Urbaines' },
            { name: 'Strasbourg', desc: "Alsace, France", nbrepictures: 4, category: 'Photos Urbaines' },
            { name: 'Berlin', desc: "Allemagne, Europe", nbrepictures: 5, category: 'Photos Urbaines' },
            { name: 'San Francisco', desc: "California, USA", nbrepictures: 4, category: 'Photos Urbaines' },
            { name: 'Chicago', desc: "Illinois, USA", nbrepictures: 2, category: 'Photos Urbaines' },
            { name: 'Paris', desc: "Ile-De-France, France", nbrepictures: 6, category: 'Photos Urbaines' },
            { name: 'Quebec', desc: "Quebec, Canada", nbrepictures: 14, category: 'Photos Urbaines' },
            { name: 'Baseball', desc: "San Francisco Giants, USA, saison 2022-2023", nbrepictures: 4, category: 'Photos Sportives' },
            { name: 'Basket', desc: "Betclic elite saison 2022-2023", nbrepictures: 4, category: 'Photos Sportives' },
            { name: 'Nanterre 92', desc: "Betclic elite saison 2024-2025", nbrepictures: 5, category: 'Photos Sportives' },
            { name: 'Paris Basketball', desc: "Euroleague saison 2024-2025", nbrepictures: 5, category: 'Photos Sportives' },
            { name: 'Automobile', desc: "Circuit Dijon-Prenois, 2024", nbrepictures: 7, category: 'Photos Événementielles' }
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
        
        Object.entries(groupedData).forEach(([category, items]) => {
            const categoryTitle = createElementWithClass('h2', 'category-title');
            categoryTitle.id = category;
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
        var img_for_image_intro_for_projets = createImage("Photos/image-projet.jpg");
        img_for_image_intro_for_projets.id="image-intro-for-projet";
        image_intro2projects.appendChild(img_for_image_intro_for_projets);
        var text_intro2projects = createElementWithClass('div','text-section');
        text_intro2projects.appendChild(createText('h2',"Mes projets Informatiques"));
        text_intro2projects.appendChild(createText('p',"Scroll légèrement, cette section est loin d'être vide 😉"));
        intro2projects.appendChild(image_intro2projects);
        intro2projects.appendChild(text_intro2projects);
        projetsContainer.appendChild(intro2projects);

        var projets = createElementWithClass('div', 'projets');
        var menuList = [
            {
                name: "RockRush",
                category:"Projets Web",
                github: "https://github.com/FLKprod/RockRush",
                videoLink: "Photos/projets/RockRush.mp4",
                imageSrc: "Photos/projets/RockRush.jpg",
                desc: `RockRush est un jeu en langage web créé durant ma formation ingénieur.
                C'est une version de Boulder Dash, un jeu classique où un mineur doit collecter tous les diamants sans se faire écraser par des pierres. \n
                les langages de programmation utilisés dans ce projet sont : 
                    <ul> - HTML </ul>
                    <ul> - CSS  </ul>
                    <ul> - Javascript </ul>
                Ce projet, réalisé durant mon cursus d'ingénieur en informatique, fut un travail très utile à la création de ce site internet.`,
                competences: "HTML / CSS, JavaScript"
            },
            {
                name: "Application DeepL",
                category:"Projets de Programmation Avancée",
                github: "https://github.com/FLKprod/Appli_Android_Deepl",
                videoLink: "Photos/projets/DeepL.mp4",
                imageSrc: "Photos/projets/DeepL.png",
                desc: `Ce projet constitue une application Android que j'ai développée dans le cadre de ma formation d'ingénieur.
                Réalisé à travers l'outil de développement d'application Android Studio, cette application tire parti de l'API DeepL, une API avec version gratuite permettant d'utiliser les fonctions de Deepl, traducteur mondialement connu.
                Son objectif principal est de fournir un service de traduction de texte efficace et convivial.
                les langages de programmation utilisés dans ce projet sont : 
                    <ul> - Java </ul>
                    <ul> - XML  </ul>`,
                competences: "Programmation Mobile, API"
            },
            {
                name: "201 Farehein",
                category:"Projets de Programmation Avancée",
                github: "https://github.com/FLKprod/201F",
                videoLink: "Photos/projets/201F.mp4",
                imageSrc: "Photos/projets/201F.png",
                desc: `201 Farehein est une parodie du célèbre jeu de mots '94 degrees'. 
                Explorez un monde rempli de défis, de questions hilarantes et de réponses surprenantes. Testez vos connaissances géographiques tout en vous amusant !` ,
                competences: "Python, Pygame"
            },
            {
                name: "CyberSafe",
                category:"Projets Web",
                github: "https://github.com/FLKprod/Projet-IOT",
                videoLink: "Photos/projets/Cybersafe.mp4",
                imageSrc: "Photos/projets/Cybersafe.png",
                desc: `Une Plateforme de Surveillance des Vulnérabilités de Sécurité des Objets Connectés.
                 Elle se met à jour automatiquement pour informer les utilisateurs sur les vulnérabilités de sécurité des objets connectés.`,
                competences: "HTML / CSS, JavaScript, IOT, JSON"
            },
            {
                name: "Verifile",
                category:"Projets Web",
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
                category:"Projets de Programmation Avancée",
                github: "https://github.com/FLKprod/CloudProject",
                videoLink: "Photos/projets/landbacash.mp4",
                imageSrc: "Photos/projets/landbacash.png",
                desc: `Application pour tester un programme et l'exécuter avec différentes valeurs de RAM pour comparer les prix d'exécution AWS (Amazon Web Services).`,
                competences: "Cloud Computing, AWS, Python, Bash"
            },
            {
                name: "FLKprod.github.io",
                category:"Projets Web",
                github: "https://github.com/FLKprod/FLKprod.github.io",
                videoLink: "",
                imageSrc: "Photos/projets/Flkprod.png",
                desc: `Ce site internet, tout simplement, créé de A à Z par moi-même.`,
                competences: "HTML / CSS, JavaScript"
            },
            {
                name: "aleskflkphotos.github.io",
                category:"Projets Web",
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
            ["Photographie", "Photos Urbaine", ["Dijon", "Strasbourg", "Berlin", "San Francisco", "Chicago", "Paris", "Quebec"], "Photos Sportives", ["Baseball", "Basket", "Nanterre 92", "Paris Basketball"], "Photos Evenementielles", ["Automobile"]],
            ["A propos de moi", "Moi C'est Maxime", "Mon expérience à Berkeley","Mon Experience au Québèc", "Ma formations",["Mes certifications en réseaux", "Mes formations"], "Informations sur mon profil"],
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
        reveniralentete()
    });
});