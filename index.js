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

    mainHeader.textContent = 'Choose your category:';
    mainContent.appendChild(categorySelect);

    categorySelect.innerHTML = '';

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
            loadData(categorySelect.value);
        }
    });



startButton.addEventListener('click', () => {
    showCategoryView();
});


// Function to load questions based on selected category
function loadQuestions(category) {
    categorySelect.remove();
    mainHeader.textContent = '';

    const buttonWrapper = document.createElement('div')
    buttonWrapper.classList.add('btn-wrapper')

    const backButton = document.createElement('button')
    backButton.textContent = 'Back';
    backButton.classList.add('back-button')

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.classList.add('next-button');

    buttonWrapper.appendChild(backButton)
    buttonWrapper.appendChild(nextButton)

    mainHeader.appendChild(buttonWrapper)
    

    currentView = 'questions';

    backButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayCurrentQuestion();
        } else if (currentQuestionIndex === 0) {
            showCategoryView();
        }
    });

    nextButton.addEventListener('click', () => {
        showNextQuestion();
    });

}

let questions = [];
let currentQuestionIndex = 0;

function displayCurrentQuestion() {
    const questionObj = questions[currentQuestionIndex];
    mainContent.innerHTML = `
        <div class="question-container">
            <h2>Question ${currentQuestionIndex + 1}:</h2>
            <p>${questionObj.question_text}</p>
        </div>

        <div class="options-container">
            <form class="options-form">
                <label>
                    <input type="radio" name="option" value="${questionObj.options[0]}">
                    ${questionObj.options[0]}
                </label><br>
                <label>
                    <input type="radio" name="option" value="${questionObj.options[1]}">
                    ${questionObj.options[1]}
                </label><br>
                <label>
                    <input type="radio" name="option" value="${questionObj.options[2]}">
                    ${questionObj.options[2]}
                </label><br>
                <label>
                    <input type="radio" name="option" value="${questionObj.options[3]}">
                    ${questionObj.options[3]}
                </label>
            </form>
        </div>
    `;
}

function showNextQuestion() {
    currentQuestionIndex++;
    displayCurrentQuestion();
}


function showOptions(questionObj) {
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');

    questionObj.options.forEach(option => {
        const optionElement = document.createElement('button');
        optionElement.textContent = option;
        optionElement.classList.add('option-button');
        optionsContainer.appendChild(optionElement);
    });

    mainContent.appendChild(optionsContainer);
}



// Function to load questions once a category is selected
async function loadData(category) {
    try {
        const response = await fetch('./questionsandanswers.json');
        const data = await response.json();
        const selectedQuestions = data[category];

        if (selectedQuestions) {
            questions = selectedQuestions;
            displayCurrentQuestion();
        } else {
            mainContent.innerHTML = '<p>No questions found for this category.</p>';
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Keep track of user answers and display it after the last question
