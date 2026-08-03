// DOM elements
const mainHeader = document.getElementById('main-header');
const mainContent = document.getElementById('main-content');
let header;
let startButton;

// Other variables
const categoryOptions = [
        { value: 'select', text: 'Select a category' },
        { value: 'general', text: 'General Knowledge' },
        { value: 'science', text: 'Science' },
        { value: 'history', text: 'History' },
        { value: 'sports', text: 'Sports' },
        { value: 'entertainment', text: 'Entertainment' }
    ]

let categorySelect = document.createElement('select');
    categorySelect.id = 'category-select';
    categorySelect.classList.add('category-select');
    categorySelect.id = 'category-select';
    categorySelect.name = 'category-select';


// Function for inital DOM load
function loadInitialScreen() {
    header = document.createElement('h1');
    header.textContent = 'Welcome! This is a quiz that will test your general knowledge. Click the button below to start the quiz.';
    header.classList.add('main-header');
    mainHeader.appendChild(header);
    
    startButton = document.createElement('button');
    startButton.textContent = 'Start Quiz';
    startButton.classList.add('start-button');
    mainContent.appendChild(startButton);
}
// Initial load screen
document.addEventListener('DOMContentLoaded', loadInitialScreen())

// Event listener for start button
startButton.addEventListener('click', () => {
    mainHeader.innerHTML = '';
    mainHeader.textContent = 'Select your category:'
    mainContent.innerHTML = '';

    mainContent.appendChild(categorySelect);

    categoryOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        categorySelect.appendChild(optionElement);
    });

})


function loadQuestions(category) {
    mainContent.innerHTML = '';
    mainHeader.innerHTML = '';
}

