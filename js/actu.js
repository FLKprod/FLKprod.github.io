import { createImage,createText,createElementWithClass } from "./createElements.js";
import{toggleTeamInfo} from './index.js';

function convertLinksToAnchors(text) {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        return `<a href="${url}" target="_blank">${url}</a>`;
    });
}


export function searcharticle() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const actuItems = document.querySelectorAll('.actu-item');
    actuItems.forEach(item => {
        const articleText = item.querySelector('.article').textContent.toLowerCase();
        item.style.display = articleText.includes(searchQuery) ? '' : 'none';
    });
}

export function loadactuFromXML(xmlPath, container, searchInput) {
    fetch(xmlPath)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then((xmlText) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");
            const articles = xmlDoc.getElementsByTagName("article");

            let articleContainer = container.querySelector('.actu-article');
            if (!articleContainer) {
                articleContainer = document.createElement('div');
                articleContainer.classList.add('actu-article');
                container.appendChild(articleContainer);
            }

            const articleElements = [];

            for (let article of articles) {
                const title = article.getElementsByTagName("title")[0]?.textContent;
                const sujet = article.getElementsByTagName("sujet")[0]?.textContent;
                const date = article.getElementsByTagName("date")[0]?.textContent;
                const corps = article.getElementsByTagName("corps")[0]?.textContent.split('\n');
                const button = article.getElementsByTagName("button")[0]?.textContent;
                const buttonId = article.getElementsByTagName("button")[0]?.id;
                const image = article.getElementsByTagName("image")[0];
                const imageSrc = image?.getAttribute("src");
                
                const articleElement = createElementWithClass("div", "article");
                articleElements.push({ element: articleElement, title });

                const detailsContainerTitle = createElementWithClass("div", "article-corps-title");
                const titleElement = createText("h3", title);
                const sujetlement = createText("h4", sujet);
                articleElement.setAttribute("sujet",sujet);
                const dateElement = createText("p", date);
                dateElement.className = "date";
                detailsContainerTitle.appendChild(titleElement);
                detailsContainerTitle.appendChild(sujetlement);
                detailsContainerTitle.appendChild(dateElement);

                const detailsContainebody = createElementWithClass("div", "article-corps-body");
                const detailsContainebodytext = createElementWithClass("div", "article-corps-body-text");
                detailsContainebody.style.maxHeight = '5em';  // Par défaut, hauteur réduite

                corps.forEach(corpsText => {
                    const corpsTextwithlink = convertLinksToAnchors(corpsText);
                    corpsText = corpsTextwithlink;
                    const corpsElement = createText("p", corpsText);
                    corpsElement.className = "corps";
                    detailsContainebodytext.appendChild(corpsElement);
                });

                const closeButton = document.createElement('button');
                closeButton.textContent = '-';
                closeButton.classList.add('close-button');
                closeButton.addEventListener("click", (event) => {
                    event.stopPropagation();  
                    console.log("close article")
                    detailsContainebody.style.maxHeight = '5em'; 
                    articleElement.classList.remove('expanded');
                });

                titleElement.addEventListener("click", (event) => {
                    event.stopPropagation(); // Empêche l'événement de se propager et d'ouvrir un autre article
                
                    const isExpanded = articleElement.classList.contains('expanded');
                
                    document.querySelectorAll('.article').forEach((otherArticle) => {
                        if (otherArticle !== articleElement) {
                            otherArticle.classList.remove('expanded');
                            otherArticle.style.height = '5em';
                        }
                    });
                    
                    // Vérifier si l'article est déjà ouvert
                    if (articleElement.classList.contains('expanded')) {
                        articleElement.classList.remove('expanded');
                        articleElement.style.height = '5em';
                    } else {
                        articleElement.classList.add('expanded');
                        articleElement.style.height = '100%';
                    }
                
                    if (isExpanded) {
                        articleElement.classList.remove('expanded');
                        detailsContainebody.style.maxHeight = '5em';
                    } else {
                        articleElement.classList.add('expanded');
                        detailsContainebody.style.maxHeight = '100%';
                        console.log("open article")
                    }
                });
                

                articleElement.appendChild(closeButton);
            
                if (button) {
                    const buttonElement = createText("button", button);
                    buttonElement.onclick = function() {
                        toggleTeamInfo(buttonId);
                    };
                    detailsContainebodytext.appendChild(buttonElement);
                }
                detailsContainebody.appendChild(detailsContainebodytext);
                
                const detailsContainebodyimage = createElementWithClass("div", "article-corps-body-img");
                if (imageSrc) {
                    const imgElement = createImage(imageSrc);
                    imgElement.classList.add('actu-image');
                    detailsContainebodyimage.appendChild(imgElement);
                }
                detailsContainebody.appendChild(detailsContainebodyimage);

                // Ajouter le contenu dans l'élément de l'article
                articleElement.appendChild(detailsContainerTitle);
                articleElement.appendChild(detailsContainebody);

                // Lorsqu'un article est cliqué, ouvrir cet article et fermer les autres
                articleElement.addEventListener("click", () => {
                    // Récupérer tous les articles
                    const allArticles = document.querySelectorAll('.article');
                    
                    // Fermer tous les autres articles ouverts
                    allArticles.forEach((otherArticle) => {
                        if (otherArticle !== articleElement && otherArticle.classList.contains('expanded')) {
                            // Enlever la classe 'expanded' de tous les autres articles
                            otherArticle.classList.remove('expanded');
                            const otherDetailsContainer = otherArticle.querySelector('.article-corps-body');
                            if (otherDetailsContainer) {
                                otherDetailsContainer.style.maxHeight = '5em'; // Réduire la hauteur du corps de l'article
                            }
                        }
                    });

                    // Ouvrir cet article
                    articleElement.classList.add('expanded');
                    detailsContainebody.style.maxHeight = '100%';  // Étendre la hauteur du corps de l'article
                    articleElement.style.height = '100%';  // Laisser la hauteur de l'article s'adapter à son contenu
                });

                articleContainer.appendChild(articleElement);
            }

            // Fonction de recherche des articles
            searchInput.addEventListener("input", () => {
                const filterText = searchInput.value.toLowerCase();
                articleElements.forEach(({ element, title }) => {
                    const isVisible = title.toLowerCase().includes(filterText);
                    element.style.display = isVisible ? "flex" : "none";
                });
            });


                const filterSelect = document.getElementById("filter-select");
                console.log("bsdiukfgsdiyfueidbf")
                filterSelect.addEventListener("change", function () {
                    const selectedSujet = filterSelect.value;
                    const allArticles = document.querySelectorAll('.article');
                    console.log("refiltrage");
                    allArticles.forEach(article => {
                        const sujet = article.getAttribute("sujet"); 
                        console.log(article.getAttribute("sujet"));
                        if (selectedSujet === "all" || sujet === selectedSujet) {
                            article.style.display = "block"; // Afficher l'article
                        } else {
                            article.style.display = "none"; // Cacher l'article
                        }
                    });
                });

        })
        .catch((error) => {
            console.error("Erreur lors du chargement du fichier XML :", error);
        });
}




