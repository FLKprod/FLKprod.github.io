import{toggleTeamInfo} from './index.js'

export function createText(tag, textContent) {
    const element = document.createElement(tag);
    element.innerHTML = textContent;
    return element;
}

export function createImage(src) {

    const element = document.createElement('img');
    
    element.src = src;
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

export function createIconWithLink(iconClass, link) {
    const icon = createIcon(iconClass);
    const iconLink = document.createElement("a");
    iconLink.href = link;
    iconLink.target = "_blank";
    iconLink.appendChild(icon);
    return iconLink;
}

export function createButton(text) {
    const button = document.createElement("button");
    button.textContent = text;
    return button;
}

export function createElementWithClass(tag, ...classNames) {
    const element = document.createElement(tag);
    element.classList.add(...classNames);
    return element;
}

export function createInput(type, id, placeholder, style) {
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    input.style.cssText = style;
    return input;
}

export function createLabel(text, forId) {
    const label = document.createElement('label');
    label.textContent = text;
    label.htmlFor = forId;
    return label;
}

export function createTableContainer() {
    const tableContainer = createElementWithClass('div', 'tableContainer');
    const table = createElementWithClass('div','vulnerabilityTable');
    const vulnerabilityTable = document.createElement('table');
    vulnerabilityTable.id = 'vulnerabilityTable';
    menu = createMenu();
    tableContainer.appendChild(menu);
    table.appendChild(vulnerabilityTable);
    tableContainer.appendChild(table)
    return tableContainer;
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

export function createVideoProject(link) {
    const videoContainer = createElementWithClass('div', 'video-projet');
    const videoElement = createVideo(link);
    videoContainer.appendChild(videoElement);

    return videoContainer;
}


export function createVideoElement(videoUrl, description) {
    var videoDiv = createElementWithClass("div", "video");
    var videoElement = createVideo(videoUrl);

    // Ajouter l'attribut allowfullscreen à l'élément vidéo
    videoElement.setAttribute('allowfullscreen', '');
    videoElement.setAttribute('loop', '');
    videoDiv.appendChild(videoElement);
    var videoElementDesc = createElementWithClass("p", "desc-video");
    videoElementDesc.textContent=description;
    videoDiv.appendChild(videoElementDesc);
    return videoDiv;
}


export function createDivImage(name, path) {
    // Créer la div
    const div = document.createElement('div');

    div.style.position = 'relative';
    div.className = name;
    const h2 = document.createElement('h2');
    h2.textContent=name;
    h2.style.position = 'absolute';
    h2.style.top = '50%'; 
    h2.style.left = '50%'; 
    h2.style.transform = 'translate(-50%, -50%)'; 
    h2.style.color = 'white';
    h2.id = name;
    div.appendChild(h2);
    // Créer l'image
    const img = document.createElement('img');
    img.src = path;
    img.id = name;
    img.style.width = '100%';
    img.style.height = '100%';

    // Ajouter l'image à la div
    div.appendChild(img);
    

    // Retourner la div
    return div;
}

export function createLineSpan(number) {
    const span = document.createElement('span');
    span.classList.add('line');
    var linenumber = 'line' + String(number); // Utiliser String() pour convertir le nombre en chaîne de caractères
    span.classList.add(linenumber);
    return span;
}



export function createGitHubLink(projectUrl) {
    var paragraph = createElementWithClass('div','githublink');
    paragraph.appendChild(createText('p',`Ce projet informatique est d'ailleurs disponible sur mon Github,
        que vous pouvez consulter en cliquant ici`));
    const link = document.createElement('a');
    link.href = projectUrl;
    link.target = '_blank'; // Ouvrir le lien dans un nouvel onglet
    link.rel = 'noopener noreferrer'; // Pour des raisons de sécurité
    link.className="fab fa-github"
    link.style.cursor = 'pointer'; // Curseur de la souris en forme de main pour indiquer que c'est cliquable
    paragraph.appendChild(link);

    return paragraph;
}

/************************** UPDATES  ******************************************/
export function updateVideoElement(videoUrl) {
    var videoElement = document.querySelector('iframe');
    if (videoElement){
        console.log('video trouvee' + videoElement.src);
    }
    videoElement.src = videoUrl;

}

export function updatedescVideo(desc) {
    var descElement = document.querySelector('.desc-video');
    if (descElement){
        console.log('desc trouvee : ' + descElement.textContent);
    }
    descElement.textContent = desc;

}

export function updateImageElement(imageSrc) {
    var divprojet = document.querySelector('.title-projet');
    if (divprojet){
        console.log('title trouvée');}
    var imageElement = divprojet.querySelector('.img-projet');
    if (imageElement) {
        console.log('Image trouvée : ' + imageElement.src);
        imageElement.src = imageSrc;
    } else {
        console.log('Image non trouvée');
    }
}

export function updateLinkGithub(githublink){
    var divprojet = document.querySelector('.githublink a');
    if (divprojet){
        divprojet.href = githublink
        console.log('link changed');
    } else {
            console.log('GIT non trouvée');
        }
}


export function createMenuItem(id, className, text, description, imageUrl) {
    // Create menu item container
    const menuItem = createElementWithClass("div", "menu-item", className);
    menuItem.id = id;
    menuItem.onclick = function() {
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

