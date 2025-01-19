import { createImage,createText,createElementWithClass } from "./createElements.js";

export function createQuestionElement(questionText, answerText, index) {
    const questionContainer = document.createElement('div');
    
    const question = createText('div', questionText);
    question.classList.add('question');
    question.onclick = function() { toggleAnswer(index); };

    const answer = createText('div', answerText);
    answer.classList.add('answer');
    answer.id = `answer-${index}`;

    questionContainer.appendChild(question);
    questionContainer.appendChild(answer);

    return questionContainer;
}


export function toggleAnswer(index) {
    const answer = document.getElementById(`answer-${index}`);
    answer.style.display = (answer.style.display === 'none' || answer.style.display === '') ? 'block' : 'none';
}


export function searchQuestions() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionText = item.querySelector('.question').textContent.toLowerCase();
        item.style.display = questionText.includes(searchQuery) ? '' : 'none';
    });
}


export function loadFAQ(faqData, questionsContainer) {
    questionsContainer.innerHTML = '';

    faqData.forEach((faq, index) => {
        const faqElement = createQuestionElement(faq.question, faq.answer, index);
        faqElement.classList.add('faq-item');
        questionsContainer.appendChild(faqElement);
    });
}

export function loadFAQFromXML(xmlPath, container, searchInput) {
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
            const questions = xmlDoc.getElementsByTagName("question");

            // Trouver ou créer le conteneur pour les questions
            let questionsContainer = container.querySelector('.faq-questions');
            if (!questionsContainer) {
                questionsContainer = document.createElement('div');
                questionsContainer.classList.add('faq-questions');
                container.appendChild(questionsContainer);
            }

            const questionElements = [];

            for (let question of questions) {
                const title = question.getElementsByTagName("title")[0]?.textContent;
                const answer = question.getElementsByTagName("answer")[0]?.textContent;
                const image = question.getElementsByTagName("image")[0];
                const imageSrc = image?.getAttribute("src");

                const questionElement = createElementWithClass("div", "question");
                questionElements.push({ element: questionElement, title });
                const titleElement = createText("h3", title);
                questionElement.appendChild(titleElement);
                const detailsContainer = createElementWithClass("div", "question-details");
                detailsContainer.style.display = "none";
                const answerElement = createText("p", answer);
                detailsContainer.appendChild(answerElement);


                if (imageSrc) {
                    const imgElement = createImage(imageSrc);
                    imgElement.classList.add('faq-image');
                    detailsContainer.appendChild(imgElement);
                }
                questionElement.appendChild(detailsContainer);


                questionElement.addEventListener("click", () => {
                    const isHidden = detailsContainer.style.display === "none";
                    detailsContainer.style.display = isHidden ? "flex" : "none"; 
                });
                questionsContainer.appendChild(questionElement);
            }

            searchInput.addEventListener("input", () => {
                const filterText = searchInput.value.toLowerCase();
                questionElements.forEach(({ element, title }) => {
                    const isVisible = title.toLowerCase().includes(filterText);
                    element.style.display = isVisible ? "flex" : "none";
                });
            });
        })
        .catch((error) => {
            console.error("Erreur lors du chargement du fichier XML :", error);
        });
}
