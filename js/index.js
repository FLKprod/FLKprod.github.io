import {createImage, createText, createButton, createIconWithLink, createElementWithClass, createInput, createLabel, createTableContainer, createSelectElement, createOption, createVideo, createOverlayImage, createImageElement, createVideoWithOverlay, createVideoElement, updateVideoElement, updateImageElement } from './createElements.js';
import {createCategoryWithCarousel,createCarousel} from './carroussel.js';

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
        logo.src = "Photos/logo.png";
    } else {
        document.body.classList.remove('mode-nuit');
        logo.src = "Photos/logoneg.png";
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
    videosContainer.classList.remove('fade-in');
    projetsContainer.classList.remove('fade-in');
    photosContainer.classList.remove('fade-in');
    presentationContainer.classList.remove('fade-in');
    if(id=== 'videos'){
        videosContainer.classList.add('fade-in');
        videosContainer.appendChild(createText('h2',"Mes contenus vidéos"));
        videosContainer.appendChild(createText('p',"Passionné par le montage vidéo et constamment à la recherche d'inspiration pour créer du contenu, je saute sur l'occasion de concrétiser une idée germeant dans mon esprit, à travers des vidéos captivantes et originales. Vous pouvez consulter toutes mes creations dans la rubrique ci-dessous. Enjoy."));
        
        var galerie =createElementWithClass("div","galerie-videos");
        galerie.appendChild(createImageElement("img", 'pelicule', "Photos/pelicule.jpg", "Description de l'image"));

        var videos = createElementWithClass("div","videos");
        videos.appendChild(createVideoElement('https://www.youtube.com/embed/sDuDS7t4UsU', "Création d'une introduction avec pour thème la montée en puissance de la menace cybernétique dans notre ère moderne."));
        galerie.appendChild(videos);

        galerie.appendChild(createImageElement("img", 'pelicule', "Photos/pelicule.jpg", "Description de l'image"));
        videosContainer.appendChild(galerie);
        }
    else if(id=== 'presentation'){
        presentationContainer.classList.add('fade-in');

        var intro2presentation = createElementWithClass('div','section');
        var image_intro2presentation = createElementWithClass('div','image-section');
        image_intro2presentation.appendChild(createImage('Photos/moi.JPG'));
        intro2presentation.appendChild(image_intro2presentation);

        var text_intro2presentation = createElementWithClass('div','text-section');
        text_intro2presentation.appendChild(createText('p',"<strong>Moi, c’est Maxime.</strong> J'ai 22 ans et j'étudie en école d'ingénieur en sécurité informatique à Dijon. Actuellement, je suis en double diplôme en cybersécurité à Chicoutimi, au beau milieu du Québec. La photographie est un domaine qui me passionne. On peut toujours chercher à faire la meilleure image, à prendre la photo au meilleur moment. De plus en plus de personnes cherchent à scénariser leurs photos pour les partager sur les réseaux sociaux. Personnellement, je cherche plutôt à créer tout ce qui me passe par l'esprit : dès qu'une idée me vient, que ce soit pour une vidéo plus ou moins longue ou une photo, je la note et cherche à la réaliser au mieux et le plus rapidement possible. Auparavant, je partageais mes créations sur mon compte Instagram @FLKPROD_, qui est toujours actif à ce jour. Maintenant, c'est sur ce site que toutes mes créations seront postées, ce qui me permet d'être plus libre et de ne pas chercher à augmenter mes statistiques, mais simplement de partager ce que j'aime."));
        text_intro2presentation.appendChild(createText('p',"Ma passion pour la sécurité informatique se conjugue avec mon intérêt pour la photographie et la vidéo. En dehors des salles de cours, je m'investis pleinement dans la création de contenus visuels que je partage sur mes réseaux sociaux. Vous pouvez explorer mes réalisations artistiques sur mon site internet, où je présente mes projets photographiques et vidéographiques."));
        intro2presentation.appendChild(text_intro2presentation);
        presentationContainer.appendChild(intro2presentation);

        var certifications = createElementWithClass('div','section');
        certifications.style="background-color:lightblue;";

        var text_certifications = createElementWithClass('div','text-section');
        text_certifications.appendChild(createText('h2',"Mes Certifications Reseaux"));
        var listescertifications = document.createElement("ul");
        listescertifications.appendChild(createText('li',"<strong>CCsNA</strong> (<strong>C</strong>isco <strong>C</strong>ertified <strong>N</strong>etwork <strong>A</strong>ssociate) "));
        listescertifications.appendChild(createText('li',"Cybersecurity Essentials By Cisco"));
        text_certifications.appendChild(listescertifications);
        certifications.appendChild(text_certifications);

        var image_certifications = createElementWithClass('div','image-section');
        image_certifications.appendChild(createImage('Photos/CCNA.png'));
        certifications.appendChild(image_certifications);
        
        presentationContainer.appendChild(certifications);

        var cv_section = createElementWithClass('div','section');
        cv_section.style="background-color:#01556A;color:white;";
        var text_cv_section = createElementWithClass('div','text-section');
        
        text_cv_section.appendChild(createText('h2',"Plus d'infos sur mon profil ?"));
        text_cv_section.appendChild(createText('p',"Ci-joint mon CV et mon Linkedin"));
        text_cv_section.appendChild(createIconWithLink("fab fa-linkedin", "https://www.linkedin.com/in/maxime-falkowski-9a4607216?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGJJZ%2FAWYSLGq0t%2BQS92TrQ%3D%3D"));
        text_cv_section.appendChild(createIconWithLink("fa fa-file-pdf", "docs/CV_Maxime_Falkowski.pdf"));
        text_cv_section.appendChild(createIconWithLink("fa fa-file-pdf", "docs/Resume_Maxime_Falkowski.pdf"));
        cv_section.appendChild(text_cv_section);

        presentationContainer.appendChild(cv_section);
        
        /*
        presentationContainer.appendChild(createText('h3', 'Mon parcours'));
        presentationContainer.appendChild(createText('p', "Si je devais résumer ma vie et mon parcours en une phrase, ce serait la suivante."));
        var citation = document.createElement('blockquote');
        citation.className='citation';
        citation.appendChild(createText('p', "Grandir sous le lys, partir chercher son or pour s'apaiser sous l'érable."));
        presentationContainer.appendChild(citation);



        var city_section =createElementWithClass("div","city-presentation");
        city_section.appendChild(createText('h4', 'Grandir sous le Lys'));
        
        city_section.appendChild(createText('p',"Originaire de la charmante ville de <strong>Dijon</strong>, j'y ai vécu jusqu'à mes 21 ans. Mon enfance s'est épanouie au cœur d'un quartier empreint de souvenirs, où chaque rue portait le récit de ma croissance. Les ruelles familiales ont été le théâtre de jeux insouciants, et les parcs, le refuge de découvertes infinies. Au fil des années, Dijon a été le témoin de mon évolution, de mes premiers pas à l'école jusqu'à ma maturité à l'aube de mes études supérieures. C'est dans cette cité chaleureuse que j'ai forgé mes premières aspirations et tissé des liens indéfectibles. Ma ville natale, imprégnée d'histoire et de charme, demeure le point d'ancrage de qui je suis, et ses rues résonnent encore des échos joyeux de mon passé."));
        var imageSources = ["Photos/Dijon.jpg", "Photos/Dijon2.JPG", "Photos/Dijon3.JPG", "Photos/Dijon4.JPG"];
        var image_city_section = createElementWithClass('div','image_city_section');
        imageSources.forEach(src => {
            const imgElement = createImage(src);
            image_city_section.appendChild(imgElement);
        });
        city_section.appendChild(image_city_section)
        presentationContainer.appendChild(city_section);

        presentationContainer.appendChild(createText('h4',"Partir sur les terres des chercheurs d'Or" ));

        presentationContainer.appendChild(createText('p',"Au cours de mes études, j'ai eu l'opportunité de réaliser un stage à Berkeley aux Lawrence Berkeley National Laboratory (LBNL), travaillant sur le projet FUEGO (Fire Urgency Estimator in Geostationary Orbit). Cette expérience captivante a été bien plus qu'une simple opportunité professionnelle ; elle a été la concrétisation de mon rêve américain. Travailler au cœur de l'innovation technologique à Berkeley m'a offert une expérience unique, me permettant de contribuer au développement d'un outil de surveillance avancé pour estimer l'urgence des incendies. FUEGO exploite des technologies de pointe en télédétection pour évaluer en temps réel l'intensité et la propagation des incendies, combinant ces données avec des informations météorologiques et des modèles prédictifs. L'objectif est d'estimer rapidement la gravité des incendies, facilitant ainsi une réponse plus rapide et plus efficace des équipes d'intervention."));
        var imageSources = ["Photos/SF.JPG", "Photos/SF2.JPG", "Photos/SF3.JPG", "Photos/SF4.JPG"];
        imageSources.forEach(src => {
            const imgElement = createImage(src);
            presentationContainer.appendChild(imgElement);
        });
        presentationContainer.appendChild(createText('h4',"Se reposer sous l'Erable" ));

        presentationContainer.appendChild(createText('p',"Par la suite, j'ai choisi d'effectuer un parcours de double diplôme à Chicoutimi, à l'Université du Québec, et ma découverte du Canada n'a fait que renforcer mon appréciation pour ce pays. Le Canada m'a accueilli chaleureusement, offrant une qualité de vie exceptionnelle et une diversité culturelle qui a enrichi mon expérience académique. Cette expérience au Canada, combinée à mes voyages et expériences antérieurs, m'ont incontestablement ouvert l'esprit sur la diversité des approches et des perspectives en matière de technologie et de sécurité informatique. Voyager et vivre dans des endroits aussi différents a enrichi ma vision du monde, me dotant d'une compréhension approfondie des défis technologiques à l'échelle mondiale. Ainsi, mon parcours reflète ma volonté constante d'explorer, d'apprendre et de m'adapter aux évolutions de notre société de plus en plus interconnectée."));
        var imageSources = ["Photos/Canada.JPG", "Photos/Canada2.JPG", "Photos/Canada3.JPG", "Photos/Canada4.JPG"];
        imageSources.forEach(src => {
            const imgElement = createImage(src);
            presentationContainer.appendChild(imgElement);
        });

           */ 
        }
        else if(id === 'photos'){
            photosContainer.classList.add('fade-in');

            var intro2photographies = createElementWithClass('div','section');
            var image_intro2photographies = createElementWithClass('div','image-section');
            image_intro2photographies.appendChild(createImage('Photos/text-photo.JPG'));
            intro2photographies.appendChild(image_intro2photographies);

            var text_intro2photographies = createElementWithClass('div','text-section');
            text_intro2photographies.appendChild(createText('p',"Toujours avec un appareil photo sur moi, la photographie est ma passion depuis mon enfance. L'idée de recréer des émotions à travers un fichier PNG me passionne depuis qu'on a mis une caméra entre mes mains. Depuis, je cherche toujours à créer de nouvelles œuvres, que vous pouvez trouver ici. <strong>Enjoy.</strong>"));
            intro2photographies.appendChild(text_intro2photographies);
            photosContainer.appendChild(intro2photographies);
            var categories_photos = createElementWithClass('div','categories_photos');

            
            var citation = document.createElement('blockquote');
            citation.className='citation';
            citation.appendChild(createText('p', "Ce que la photographie reproduit à l’infini n’a lieu qu’une fois"));
            presentationContainer.appendChild(citation);

            // Exemple de données (remplacez avec vos propres données)
            const categoriesData = [
            { name: 'Dijon', images: ["Photos/Dijon.jpg", "Photos/Dijon2.JPG", "Photos/Dijon3.JPG", "Photos/Dijon4.JPG"] },
            { name: 'San Francisco', images: ["Photos/SF.JPG", "Photos/SF2.JPG", "Photos/SF3.JPG", "Photos/SF4.JPG"] },
            { name: 'Canada', images: ["Photos/Canada.JPG", "Photos/Canada2.JPG", "Photos/Canada3.JPG", "Photos/Canada4.JPG"] }
            // Ajoutez plus de catégories avec leurs images au besoin
            ];

            // Créer et ajouter chaque catégorie avec son carrousel
            categoriesData.forEach(categoryData => {
                const { name, images } = categoryData;
                const categoryElement = createCategoryWithCarousel(name, images);
                categories_photos.appendChild(categoryElement);
            });
            photosContainer.appendChild(categories_photos);
        }
        else if(id === 'projets'){ 
            projetsContainer.classList.add('fade-in');
            projetsContainer.appendChild(createText('h2',"Mes contenus vidéos"));
            projetsContainer.appendChild(createText('p',"Passionné par le montage vidéo et constamment à la recherche d'inspiration pour créer du contenu, je saute sur l'occasion de concrétiser une idée germeant dans mon esprit, à travers des vidéos captivantes et originales. Vous pouvez consulter toutes mes creations dans la rubrique ci-dessous. Enjoy."));
            
            var projets = createElementWithClass('div','projets');
            
            var menuDiv = createElementWithClass('div','menu3');
            var menuList = [
                { name: "Flkprod.github.io", videoLink: "chemin_video_1.mp4", imageSrc: "chemin_image_1.jpg" },
                { name: "BoulderDash", videoLink: "chemin_video_2.mp4", imageSrc: "chemin_image_2.jpg" },
                { name: "94 Degrés", videoLink: "chemin_video_3.mp4", imageSrc: "chemin_image_3.jpg" },
                { name: "TowerDefender", videoLink: "chemin_video_4.mp4", imageSrc: "chemin_image_4.jpg" },
                { name: "ToDoList pour IOs", videoLink: "chemin_video_5.mp4", imageSrc: "chemin_image_5.jpg" },
                { name: "Carte intéractive", videoLink: "chemin_video_6.mp4", imageSrc: "chemin_image_6.jpg" },
                { name: "CyberSafe", videoLink: "chemin_video_7.mp4", imageSrc: "chemin_image_7.jpg" },
                { name: "LanbdaCash", videoLink: "Photos/1216.mp4", imageSrc: "Photos/landbacash.png" }
            ];
            for (let i = 0; i < menuList.length; i++) {
                menuDiv.appendChild(createText('ul',menuList[i].name));
            }
            projets.appendChild(menuDiv);
            projets.appendChild(createVideoWithOverlay('',''));
            projets.appendChild(createText('h2', ''));
            projets.appendChild(createText('p', 'Description du projet...'));

            menuDiv.addEventListener('click', function(event) {
                if (event.target.tagName === 'UL') {
                    
                    var videoLink = menuList.find(item => item.name === event.target.textContent)?.videoLink;
                    var imageLink = menuList.find(item => item.name === event.target.textContent)?.imageSrc;
                    console.log("Changement de projet" + videoLink + "  " + imageLink);
                    if (videoLink) {
                        updateVideoElement(videoLink);
                        updateImageElement(imageLink);
                    }
                }});

            projetsContainer.appendChild(projets);
        }
}

