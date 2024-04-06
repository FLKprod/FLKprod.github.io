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

        var intro2videos = createElementWithClass('div','section');

        var text_intro2videos = createElementWithClass('div','text-section');
        text_intro2videos.appendChild(createText('h2',"Mes contenus vidéos"));
        text_intro2videos.appendChild(createText('p',"Passionné par le montage vidéo et constamment à la recherche d'inspiration pour créer du contenu, je saute sur l'occasion de concrétiser une idée germeant dans mon esprit, à travers des vidéos captivantes et originales. Auparavant, je partageais mes créations sur mon compte Instagram @FLKPROD_, qui est toujours actif à ce jour. Maintenant, c'est sur ce site que toutes mes créations seront postées. Vous pouvez consulter toutes mes creations dans la rubrique ci-dessous. <strong>Enjoy.</strong>"));
        intro2videos.appendChild(text_intro2videos);
        videosContainer.appendChild(intro2videos);
        
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
        text_intro2presentation.appendChild(createText('h2',"Moi, c’est Maxime"));
        text_intro2presentation.appendChild(createText('p'," J'ai 22 ans et j'étudie en école d'ingénieur en sécurité informatique à Dijon. Actuellement, je suis en double diplôme en cybersécurité à Chicoutimi, au beau milieu du Québec. J'ai plusieurs grandes passions comme la photographie, la video et l'informatique."));
        text_intro2presentation.appendChild(createText('p',"En dehors des salles de cours, je m'investis pleinement dans la création de contenus visuels que je partage sur mes réseaux sociaux, ainsi que dans des projets informatiques a titre personnel pour l'instant. Vous pouvez explorer mes réalisations artistiques sur mon site internet, où je présente mes projets photographiques, vidéographiques, mais aussi informatiques."));
        intro2presentation.appendChild(text_intro2presentation);
        presentationContainer.appendChild(intro2presentation);

        var intro2lbnl = createElementWithClass('div','section');
        intro2lbnl.style="background-color:#02323e;color:white;";
        var text_intro2lbnl = createElementWithClass('div','text-section');
        text_intro2lbnl.appendChild(createText('p',"En 2023, j'ai eu l'opportunite et l'honneur d'effectuer un stage en tant que developpeur informatique a <strong>Berkeley</strong>, au sein des <strong>Lawrence Berkeley National Laboratory</strong> (LBNL). Ma mission portait sur le projet <strong>FUEGO</strong> (<a href='https://fuego.ssl.berkeley.edu/' target='_blank'>Fire Urgency Estimator in Geostationary Orbit</a>). Cette expérience captivante a été la concrétisation de mon rêve américain. Travailler au cœur de l'innovation technologique à Berkeley m'a offert une expérience unique, me permettant de contribuer au développement d'un outil de surveillance avancé pour estimer l'urgence des incendies. FUEGO exploite des technologies de pointe en télédétection pour évaluer en temps réel l'intensité et la propagation des incendies, combinant ces données avec des informations météorologiques et des modèles prédictifs. L'objectif est d'estimer rapidement la gravité des incendies, facilitant ainsi une réponse plus rapide et plus efficace des équipes d'intervention."));
        intro2lbnl.appendChild(text_intro2lbnl);

        var image_intro2lbnl = createElementWithClass('div','image-section');
        image_intro2lbnl.appendChild(createImage('Photos/LBNL.jpg'));
        image_intro2lbnl.classList.style = "width:50%;"
        intro2lbnl.appendChild(image_intro2lbnl);

        presentationContainer.appendChild(intro2lbnl);

        var certifications = createElementWithClass('div','section');
        certifications.style="background-color:lightblue;";

        var text_certifications = createElementWithClass('div','text-section');
        text_certifications.appendChild(createText('h2',"Mes Certifications Reseaux"));
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
        cv_section.style="background-color:#01556A;color:white;";
        var text_cv_section = createElementWithClass('div','text-section');
        
        text_cv_section.appendChild(createText('h2',"Plus d'infos sur mon profil ?"));
        text_cv_section.appendChild(createText('p',"Ci-joint mon CV en anglais et en francais"));
        
        text_cv_section.appendChild(createIconWithLink("fa fa-file-pdf", "docs/Resume_Maxime_Falkowski.pdf"));
        text_cv_section.appendChild(createIconWithLink("fa fa-file-pdf", "docs/CV_Maxime_Falkowski.pdf"));
        cv_section.appendChild(text_cv_section);

        presentationContainer.appendChild(cv_section);
        }
        else if(id === 'photos'){
            photosContainer.classList.add('fade-in');

            var citation = document.createElement('blockquote');
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
            var intro2projects = createElementWithClass('div','section');
            var text_intro2projects = createElementWithClass('div','text-section');
            text_intro2projects.appendChild(createText('h2',"Mes projets Informatiques"));
            text_intro2projects.appendChild(createText('p',"Étant en école d'ingénieurs et en maîtrise en cybersécurité, j'ai eu de nombreux projets informatiques à réaliser durant toute ma scolarité. Certains ne sont que des créations que j'ai réalisées par passion pour le code. <strong>Enjoy.</strong>"));
            intro2projects.appendChild(text_intro2projects);
            projetsContainer.appendChild(intro2projects);
            var projets = createElementWithClass('div','projets');
            
            var menuDiv = createElementWithClass('div','menu3');
            var menuList = [
                { name: "Flkprod.github.io", videoLink: "chemin_video_1.mp4", imageSrc: "chemin_image_1.jpg",desc:""},
                { name: "BoulderDash", videoLink: "chemin_video_2.mp4", imageSrc: "chemin_image_2.jpg" ,desc:""},
                { name: "94 Degrés", videoLink: "chemin_video_3.mp4", imageSrc: "chemin_image_3.jpg",desc:"" },
                { name: "TowerDefender", videoLink: "chemin_video_4.mp4", imageSrc: "chemin_image_4.jpg",desc:"" },
                { name: "ToDoList pour IOs", videoLink: "chemin_video_5.mp4", imageSrc: "chemin_image_5.jpg",desc:"" },
                { name: "Carte intéractive", videoLink: "chemin_video_6.mp4", imageSrc: "chemin_image_6.jpg",desc:"" },
                { name: "CyberSafe", videoLink: "chemin_video_7.mp4", imageSrc: "chemin_image_7.jpg",desc:"" },
                { name: "LanbdaCash", videoLink: "Photos/projets/landbacash.mp4", imageSrc: "Photos/projets/landbacash.png",desc:"Projet CLOUD Chicoutimi Wallah" }
            ];
            for (let i = 0; i < menuList.length; i++) {
                menuDiv.appendChild(createText('ul',menuList[i].name));
            }

            var projet = createElementWithClass('div','projet');
            projets.appendChild(menuDiv);
            projet.appendChild(createVideoWithOverlay('',''));

            var titre_projet=createText('h2', 'uiegguief')
            projet.appendChild(titre_projet);

            var description_projet = createText('p', 'Description du projet...')
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
}

