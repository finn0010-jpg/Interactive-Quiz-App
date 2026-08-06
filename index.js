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
        { value: 'capitals', text: 'Capitals' }
    ]

let categorySelect = document.createElement('select');
    categorySelect.id = 'category-select';
    categorySelect.classList.add('category-select');
    categorySelect.id = 'category-select';
    categorySelect.name = 'category-select';


let currentView = 'home';

// Function to show the home view
function showHomeView() {
    header = document.createElement('h1');
    header.textContent = 'Welcome! This is a quiz that will test your general knowledge. Click the button below to start the quiz.';
    header.classList.add('main-header');
    mainHeader.appendChild(header);

    startButton = document.createElement('button');
    startButton.textContent = 'Start Quiz';
    startButton.classList.add('start-button');
    mainContent.appendChild(startButton);

    currentView = 'home';
}

document.addEventListener('DOMContentLoaded', showHomeView());

// Function to show the category selection view
function showCategoryView() {
    mainHeader.innerHTML = '';
    mainContent.innerHTML = '';

    mainHeader.textContent = 'Select your category:';
    mainContent.appendChild(categorySelect);

    categoryOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        categorySelect.appendChild(optionElement);
    });

    currentView = 'categories';
}

categorySelect.addEventListener('change', () => {
        if (categorySelect.value === 'select') {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Please select a category to continue.';
            errorMessage.classList.add('error-message');
            mainContent.appendChild(errorMessage);
        } else {
            loadQuestions(categorySelect.value);
            loadData();
        }
    });



startButton.addEventListener('click', () => {
    showCategoryView();
});


// Function to load questions based on selected category
function loadQuestions(category) {
    categorySelect.remove();
    mainHeader.textContent = '';

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add('back-button');
    mainHeader.appendChild(backButton);

    backButton.addEventListener('click', () => {

        let hasBeenClicked = true;

        if (hasBeenClicked) {
        
            categorySelect.innerHTML = '';

            categorySelect.remove();

            hasBeenClicked = false;
            showCategoryView();
        } 
    });


}


function displayQuestions(questions) {
    questions.forEach((questionObj, index) => {
        mainContent.innerHTML += `
            <div class="question-container">
                <h2>Question ${index + 1}:</h2>
                <p>${questionObj.question}</p>
            </div>
        `;
    });
}
// Function to load questions once a category is selected
async function loadData() {
    try {
        const response = await fetch('./questionsandanswers.json');

        const data = await response.json();


    if (categorySelect.value === 'general') {
        const generalQuestions = data.general;
        displayQuestions(generalQuestions);
    }
            
    } catch (error) {
        console.error('Error loading data:', error);
    }
}