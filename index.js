import { createTextElement, createImage, createText, createSocialLink, createInfoSection, createButton, createIcon, createElementWithClass, createInput, createLabel, createTableContainer, createSelectElement, createOption, createVideo, createOverlayImage, createImageElement, createVideoWithOverlay } from './createElements.js';

toggleTeamInfo('presentation');
var introGif = document.getElementById("introGif");
var mainContent = document.getElementById("mainContent");
setTimeout(function() {
    introGif.style.opacity = 0;
    introGif.removeAttribute("loop");
    mainContent.style.opacity = 1;
    mainContent.classList.remove('hidden');
}, 0);

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

// Écouter les changements dans le slider
document.getElementById('daynight').addEventListener('change', toggleModeNuit);

const buttonIds = ['presentation', 'projets', 'videos', 'contact'];
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
        console.log(id);
        selectedButton.classList.add('select');
    }

    var presentationContainer = document.querySelector('.presentation-container');
    var videosContainer = document.querySelector('.videos-container');
    var projetsContainer = document.querySelector('.projets-container');
    var contactContainer = document.querySelector('.contact-container');
    presentationContainer.innerHTML = '';
    videosContainer.innerHTML = '';
    projetsContainer.innerHTML = '';
    contactContainer.innerHTML = '';
    videosContainer.classList.remove('fade-in');
    projetsContainer.classList.remove('fade-in');
    contactContainer.classList.remove('fade-in');
    presentationContainer.classList.remove('fade-in');
    if(id=== 'videos'){
        videosContainer.classList.add('fade-in');
        videosContainer.appendChild(createText('h2',"Mes contenus vidéos"));
        videosContainer.appendChild(createText('p',"Mes contenus vidéos"));
        

        var videos =createElementWithClass("div","videos");
        var pelicule = createImage("Photos/pelicule.jpg");
        pelicule.className='pelicule';
        videos.appendChild(pelicule);

        var video =createElementWithClass("div","video");
        var videoyt = createVideo('https://www.youtube.com/embed/gydycy1WcT0');
        video.appendChild(videoyt);
        video.appendChild(createText('p',"Vidéo introductive pour une idée de court-métrage intitulé C.Y.B.E.R (Conscience Ybridée Brouillée, Exploration Radicale), explorant la conscience numérique et l'univers du hacking. "));
        videos.appendChild(video);
        
        var pelicule = createImage("Photos/pelicule.jpg");
        pelicule.className='pelicule';
        videos.appendChild(pelicule);

        video =createElementWithClass("div","video");
        videoyt = createVideo('https://www.youtube.com/embed/gydycy1WcT0');
        video.appendChild(videoyt);
        video.appendChild(createText('p',"Vidéo introductive pour une idée de court-métrage intitulé C.Y.B.E.R (Conscience Ybridée Brouillée, Exploration Radicale), explorant la conscience numérique et l'univers du hacking. "));
        videos.appendChild(video);

        pelicule = createImage("Photos/pelicule.jpg");
        pelicule.className='pelicule';
        videos.appendChild(pelicule);

        video =createElementWithClass("div","video");
        videoyt = createVideo('https://www.youtube.com/embed/gydycy1WcT0');
        video.appendChild(videoyt);
        video.appendChild(createText('p',"Vidéo introductive pour une idée de court-métrage intitulé C.Y.B.E.R (Conscience Ybridée Brouillée, Exploration Radicale), explorant la conscience numérique et l'univers du hacking. "));
        videos.appendChild(video);

        var pelicule = createImage("Photos/pelicule.jpg");
        pelicule.className='pelicule';
        videos.appendChild(pelicule);

        videosContainer.appendChild(videos);
        }
    else if(id=== 'presentation'){
        presentationContainer.classList.add('fade-in');
        presentationContainer.appendChild(createText('h2', "Moi, c'est Maxime"));
        presentationContainer.appendChild(createText('p',"Bonjour, je suis Maxime Falkowski, un étudiant en maîtrise informatique spécialisé en cybersécurité à l'Université du Québec à Chicoutimi (UQAC). En parallèle, je suis également étudiant à l'École Supérieure d'Ingénieurs de Recherche en Matériaux (ESIREM), où je me concentre sur l'ingénierie de la sécurité et la qualité des réseaux."));
        presentationContainer.appendChild(createText('p',"Ma passion pour la sécurité informatique se conjugue avec mon intérêt pour la photographie et la vidéo. En dehors des salles de cours, je m'investis pleinement dans la création de contenus visuels que je partage sur mes réseaux sociaux. Vous pouvez explorer mes réalisations artistiques sur mon site internet, où je présente mes projets photographiques et vidéographiques."));

        presentationContainer.appendChild(createText('h3', 'Mon parcours'));
        presentationContainer.appendChild(createText('p', "Si je devais résumer ma vie et mon parcours en une phrase, ce serait la suivante."));
        var citation = document.createElement('blockquote');
        citation.className='citation';
        citation.appendChild(createText('p', "Grandir sous le lys, partir chercher son or pour s'apaiser sous l'érable."));
        presentationContainer.appendChild(citation);

        presentationContainer.appendChild(createText('h4', 'Grandir sous le Lys'));
        presentationContainer.appendChild(createText('p',"Originaire de la charmante ville de Dijon, j'y ai vécu jusqu'à mes 21 ans. Mon enfance s'est épanouie au cœur d'un quartier empreint de souvenirs, où chaque rue portait le récit de ma croissance. Les ruelles familiales ont été le théâtre de jeux insouciants, et les parcs, le refuge de découvertes infinies. Au fil des années, Dijon a été le témoin de mon évolution, de mes premiers pas à l'école jusqu'à ma maturité à l'aube de mes études supérieures. C'est dans cette cité chaleureuse que j'ai forgé mes premières aspirations et tissé des liens indéfectibles. Ma ville natale, imprégnée d'histoire et de charme, demeure le point d'ancrage de qui je suis, et ses rues résonnent encore des échos joyeux de mon passé."));
        var imageSources = ["Photos/Dijon.jpg", "Photos/Dijon2.jpg", "Photos/Dijon3.jpg", "Photos/Dijon4.jpg"];
        imageSources.forEach(src => {
            const imgElement = createImage(src);
            presentationContainer.appendChild(imgElement);
        });
        presentationContainer.appendChild(createText('h4',"Partir sur les terres des chercheurs d'Or" ));

        presentationContainer.appendChild(createText('p',"Au cours de mes études, j'ai eu l'opportunité de réaliser un stage à Berkeley aux Lawrence Berkeley National Laboratory (LBNL), travaillant sur le projet FUEGO (Fire Urgency Estimator in Geostationary Orbit). Cette expérience captivante a été bien plus qu'une simple opportunité professionnelle ; elle a été la concrétisation de mon rêve américain. Travailler au cœur de l'innovation technologique à Berkeley m'a offert une expérience unique, me permettant de contribuer au développement d'un outil de surveillance avancé pour estimer l'urgence des incendies. FUEGO exploite des technologies de pointe en télédétection pour évaluer en temps réel l'intensité et la propagation des incendies, combinant ces données avec des informations météorologiques et des modèles prédictifs. L'objectif est d'estimer rapidement la gravité des incendies, facilitant ainsi une réponse plus rapide et plus efficace des équipes d'intervention."));
        var imageSources = ["Photos/SF.jpg", "Photos/SF2.jpg", "Photos/SF3.jpg", "Photos/SF4.jpg"];
        imageSources.forEach(src => {
            const imgElement = createImage(src);
            presentationContainer.appendChild(imgElement);
        });
        presentationContainer.appendChild(createText('h4',"Se reposer sous l'Erable" ));

        presentationContainer.appendChild(createText('p',"Par la suite, j'ai choisi d'embrasser un parcours de double diplôme à Chicoutimi, à l'Université du Québec, et ma découverte du Canada n'a fait que renforcer mon appréciation pour ce pays. Le Canada m'a accueilli chaleureusement, offrant une qualité de vie exceptionnelle et une diversité culturelle qui a enrichi mon expérience académique. Cette expérience au Canada, combinée à mes voyages et expériences antérieurs, m'ont incontestablement ouvert l'esprit sur la diversité des approches et des perspectives en matière de technologie et de sécurité informatique. Voyager et vivre dans des endroits aussi différents a enrichi ma vision du monde, me dotant d'une compréhension approfondie des défis technologiques à l'échelle mondiale. Ainsi, mon parcours reflète ma volonté constante d'explorer, d'apprendre et de m'adapter aux évolutions de notre société de plus en plus interconnectée."));
        var imageSources = ["Photos", "Photos/cwelogo.png", "Photos/nist-logo.png", "Photos/cornell-logo.png"];
        /*imageSources.forEach(src => {
            const imgElement = createImage(src);
            presentationContainer.appendChild(imgElement);
        });*/

            
        }
        else if(id === 'contact'){
            contactContainer.classList.add('fade-in');
            const itemscontactContainer = document.createElement("div");
            itemscontactContainer.classList.add("contact-text");
            var infoSectionData = [
                { type: 'icon', iconClass: "fa fa-envelope", clickHandler: function () {
                    window.location.href = "mailto:contact.flkprod@gmail.com";
                }},
                { type: 'paragraph', text: "Adresse courriel" },
                { type: 'paragraph', text: "contact.flkprod@gmail.com" }
            ];
            contactContainer.appendChild(createText('h2', "Me contacter ? C'est par ici !"));
            itemscontactContainer.appendChild(createInfoSection(infoSectionData));


            infoSectionData = [
                { type: 'icon', iconClass: "fab fa-github", clickHandler: function () {
                    window.open("https://github.com/FLKprod", "_blank");
                }}, { type: 'paragraph', text: "Github" },
                { type: 'paragraph', text: "Page officielle" }
            ];
            itemscontactContainer.appendChild(createInfoSection(infoSectionData));
            
            infoSectionData = [
                
                { type: 'icon', iconClass: "fab fa-instagram", clickHandler: function () {
                    window.open("https://www.instagram.com/flkprod_/", "_blank");
                }},{ type: 'paragraph', text: "Instagram" },
                { type: 'paragraph', text: "Page officielle" }
            ];
            itemscontactContainer.appendChild(createInfoSection(infoSectionData));
            infoSectionData = [
                { type: 'icon', iconClass: "fab fa-facebook", clickHandler: function () {
                    window.open("https://www.facebook.com/profile.php?id=100070487814685", "_blank");
                }},{ type: 'paragraph', text: "Facebook" },
                { type: 'paragraph', text: "Page officielle" }
            ];
            itemscontactContainer.appendChild(createInfoSection(infoSectionData));
            infoSectionData = [
                { type: 'icon', iconClass: "fab fa-tiktok", clickHandler: function () {
                    window.open("https://www.tiktok.com/@flkprod", "_blank");
                }}, { type: 'paragraph', text: "TikTok" },
                { type: 'paragraph', text: "Page officielle" }
            ];
            itemscontactContainer.appendChild(createInfoSection(infoSectionData));
            contactContainer.appendChild(itemscontactContainer);
        }
        else if(id === 'projets'){ 
            projetsContainer.classList.add('fade-in');
            var menuDiv = createElementWithClass('div','menu3');
            var menuList = [
                { name: "Flkprod.github.io", videoLink: "chemin_video_1.mp4", imageSrc: "chemin_image_1.jpg" },
                { name: "BoulderDash", videoLink: "chemin_video_2.mp4", imageSrc: "chemin_image_2.jpg" },
                { name: "94 Degrés", videoLink: "chemin_video_3.mp4", imageSrc: "chemin_image_3.jpg" },
                { name: "TowerDefender", videoLink: "chemin_video_4.mp4", imageSrc: "chemin_image_4.jpg" },
                { name: "ToDoList pour IOs", videoLink: "chemin_video_5.mp4", imageSrc: "chemin_image_5.jpg" },
                { name: "Carte intéractive", videoLink: "chemin_video_6.mp4", imageSrc: "chemin_image_6.jpg" },
                { name: "CyberSafe", videoLink: "chemin_video_7.mp4", imageSrc: "chemin_image_7.jpg" },
                { name: "LanbdaCash", videoLink: "Photos/1216.mp4", imageSrc: "Photos/SF.jpg" }
            ];

            menuDiv.addEventListener('click', function(event) {
                if (event.target.tagName === 'UL') {
                    console.log("CHANGE");
                    const selectedMenu = event.target.textContent;
                    const selectedProject = menuList.find(project => project.name === selectedMenu);
                    if (selectedProject) {
                        console.log("CHANGE");
                        loadVideo(selectedProject);
                    }
                }
            
            for (let i = 0; i < menuList.length; i++) {
                menuDiv.appendChild(createTextElement('ul',menuList[i].name));
            }
            projetsContainer.appendChild(menuDiv);
            menuDiv = createElementWithClass('div','projets');
            
            
            });projetsContainer.appendChild(menuDiv);
        }
}

function loadVideo(selectedProject) {
    var projetsDiv = document.querySelector('.projets');
    var projetsContainer = document.querySelector('.projets-container');
    projetsDiv.innerHTML = '';
    projetsDiv.appendChild(createVideoWithOverlay(selectedProject.videoLink, selectedProject.imageSrc));
    projetsDiv.appendChild(createTextElement('h2', selectedProject.name));
    projetsDiv.appendChild(createTextElement('p', 'Description du projet...'));
    projetsContainer.appendChild(projetsDiv);
}