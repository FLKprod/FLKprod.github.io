export function createTextElement(tag, textContent) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
}

export function createImage(src) {
    const element = document.createElement('img');
    element.src = src;
    return element;
}

export function createText(tag, textContent) {
    return createTextElement(tag, textContent);
}

export function createIcon(iconClass, fontSize, color, cursor, clickHandler) {
    const icon = document.createElement("i");
    icon.className = `fa ${iconClass}`;
    icon.style.fontSize = fontSize;
    icon.style.color = color;
    icon.style.cursor = cursor;
    icon.onclick = clickHandler;
    return icon;
}

export function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.onclick = clickHandler;
    return button;
}

export function createInfoSection(data) {
    const infoDiv = document.createElement("div");
    infoDiv.className = "info";

    data.forEach((item, index) => {
        if (item.type === 'paragraph') {
            const paragraph = document.createElement("p");
            paragraph.textContent = item.text;
            if (index === 1) {
                paragraph.classList.add('bold-text');
            }
            infoDiv.appendChild(paragraph);
        } else if (item.type === 'icon') {
            const icon = document.createElement("i");
            icon.className = item.iconClass;
            icon.style.fontSize = item.fontSize;
            icon.style.color = item.color;
            icon.style.cursor = item.cursor;
            icon.onclick = item.clickHandler;
            infoDiv.appendChild(icon);
        } else if (item.type === 'button') {
            const button = createButton(item.text, item.clickHandler);
            infoDiv.appendChild(button);
        }
    });
    return infoDiv;
}

export function createSocialLink(href, iconClass) {
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    const icon = document.createElement("i");
    icon.classList.add("fa", iconClass);
    link.appendChild(icon);
    return link;
}

export function createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
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
    iframeElement.title = "YouTube video player";
    iframeElement.frameborder = "0";
    iframeElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframeElement.allowfullscreen = true;
    return iframeElement;
}

export function createOverlayImage(src) {
    return createImageElement('img', 'overlay-image', src, 'Image de coin bas droit');
}

export function createImageElement(tag, className, src, alt) {
    const element = document.createElement(tag);
    element.className = className;
    element.src = src;
    element.alt = alt;
    return element;
}

export function createVideoWithOverlay(link, imageSrc) {
    const videoContainer = createElementWithClass('div', 'video-projet');
    const videoElement = createVideo(link);
    const overlayImage = createOverlayImage(imageSrc);

    videoContainer.appendChild(videoElement);
    videoContainer.appendChild(overlayImage);

    return videoContainer;
}