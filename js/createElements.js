import{toggleTeamInfo,scrollauto} from './index.js'

export function createText(tag, textContent) {
    const element = document.createElement(tag);
    element.innerHTML = textContent;
    return element;
}

export function createTextforSommaire(tag, text, targetId) {
    var item = document.createElement(tag);
    var link = document.createElement('a');
    link.textContent = text;
    link.setAttribute('data-target', targetId);
    item.appendChild(link);
    return item;
}

export function createImage(src) {
    const element = document.createElement('img');
    element.src = src;
    element.alt = "By Maxime Falkowski";
    return element;
}

export function createIcon(iconClass, fontSize, color, cursor, clickHandler) {
    const icon = document.createElement("i");
    icon.className = iconClass;
    icon.style.fontSize = fontSize;
    icon.style.color = color;
    icon.style.cursor = cursor;
    icon.onclick = clickHandler;
    return icon;
}

export function createIconImage(src, classname, clickHandler) {
    const icon = document.createElement("img");
    icon.src = src;
    icon.alt = "By Maxime Falkowski";
    icon.className = classname;
    icon.onclick = clickHandler;
    return icon;
}

export function createIconWithLink(iconClass, link) {
    const icon = createIcon(iconClass);
    const iconLink = document.createElement("a");
    iconLink.href = link;
    iconLink.target = "_blank";
    iconLink.appendChild(icon);
    return iconLink;
}

export function createButton(text, clickInstruction) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickInstruction);
    return button;
}

export function createElementWithClass(tag, ...classNames) {
    const element = document.createElement(tag);
    element.classList.add(...classNames);
    return element;
}

export function createLabel(text, forId) {
    const label = document.createElement('label');
    label.textContent = text;
    label.htmlFor = forId;
    return label;
}

export function createSelectElement(id, onchange) {
    const select = document.createElement('select');
    select.id = id;
    select.onchange = onchange;
    return select;
}

export function createOption(value, text, disabled, selected) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    option.disabled = disabled;
    option.selected = selected;
    return option;
}

export function createVideo(link) {
    const iframeElement = document.createElement('iframe');
    iframeElement.src = link;
    iframeElement.alt = "By Maxime Falkowski";
    iframeElement.frameborder = "0";
    iframeElement.allow = "autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframeElement.allowfullscreen = true;
    iframeElement.loop = true;
    iframeElement.className ="custom-video";
    return iframeElement;
}

export function createImageElement(tag, className, src, alt) {
    const element = document.createElement(tag);
    element.className = className;
    element.src = src;
    element.alt = alt;
    return element;
}

export function createLineSpan(number) {
    const span = document.createElement('span');
    span.classList.add('line');
    var linenumber = 'line' + String(number);
    span.classList.add(linenumber);
    return span;
}

export function createGitHubLink(projectUrl) {
    var paragraph = createElementWithClass('div','githublink');
    paragraph.appendChild(createText('p',`Ce projet informatique est d'ailleurs disponible sur mon Github,
        que vous pouvez consulter en cliquant ici`));
    const link = document.createElement('a');
    link.href = projectUrl;
    link.target = '_blank'; 
    link.rel = 'noopener noreferrer';
    link.className="fab fa-github"
    link.style.cursor = 'pointer'; 
    paragraph.appendChild(link);
    return paragraph;
}

export function createMenuItem(id, className, text, description, imageUrl) {
    // Create menu item container
    const menuItem = createElementWithClass("div", "menu-item", className);
    menuItem.id = id;
    menuItem.onclick = function() {
        scrollauto(".entete")
        toggleTeamInfo(id);
    };
    // Set background image
    menuItem.style.backgroundImage = `url(${imageUrl})`;

    // Create text element
    const textElement = createElementWithClass("div", "menu-text");
    textElement.textContent = text;

    // Create description element
    const descElement = createElementWithClass("div", "menu-desc");
    descElement.textContent = description;

    // Append text and description to the menu item
    menuItem.appendChild(textElement);
    menuItem.appendChild(descElement);

    return menuItem;
}

export function createImageSlider(imagePaths) {
    const container = createElementWithClass('div','image-section');

    let currentIndex = 0;
    let imageElement = document.createElement('img');
    imageElement.src = imagePaths[currentIndex];
    imageElement.alt = 'Image slider';
    imageElement.style.position = 'absolute';
    imageElement.style.width = '100%'; 
    imageElement.style.height = '100%'; 
    imageElement.style.transition = 'transform 1s ease';
    container.appendChild(imageElement);

    // Fonction pour changer d'image avec l'animation de "slide"
    function changeImage() {
        // Créer une nouvelle image
        const newImage = document.createElement('img');
        newImage.src = imagePaths[(currentIndex + 1) % imagePaths.length];
        newImage.alt = 'Image slider';
        newImage.style.position = 'absolute';
        newImage.style.width = '100%';
        newImage.style.height = '100%';
        newImage.style.transform = 'translateX(100%)';
        newImage.style.transition = 'transform 1s ease';
        container.appendChild(newImage);

        // L'ancienne image se déplace à gauche
        imageElement.style.transform = 'translateX(-100%)';

        // Après la transition de 1 seconde
        setTimeout(() => {
            // Déplacer la nouvelle image à sa position
            newImage.style.transform = 'translateX(0%)';

            // Mettre à jour l'index de l'image
            currentIndex = (currentIndex + 1) % imagePaths.length;

            // Supprimer l'ancienne image du DOM après la transition
            setTimeout(() => {
                // Vérifier si l'image est toujours un enfant du conteneur avant de la supprimer
                if (container.contains(imageElement)) {
                    container.removeChild(imageElement);
                }
                imageElement = newImage; // Réassigner l'image actuelle
            }, 1000); // Après la transition
        }, 50);
    }

    // Appeler la fonction de changement d'image toutes les 3 secondes
    setInterval(changeImage, 3000);

    return container; // On retourne le conteneur à ajouter dans l'autre div
}


