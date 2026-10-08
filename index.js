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

let categoryList = document.createElement('ul');
    categoryList.id = 'category-list';
    categoryList.classList.add('category-list');


let currentView = 'home';

let userSelection = []

// Function to show the home view
function showHomeView() {
    header = document.createElement('h1');
    header.textContent = 'Welcome! This is a quiz that will test your knowledge of your preferred subject. Select a category below to begin.';
    header.classList.add('main-header');
    mainHeader.appendChild(header);

    mainContent.appendChild(categoryList);

    categoryOptions.forEach(option => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<input type="radio" name="option" value="${option.value}"> ${option.text}`;
        categoryList.appendChild(listItem);
    });

    startButton = document.createElement('button');
    startButton.textContent = 'Start Quiz';
    startButton.classList.add('start-button');
    mainContent.appendChild(startButton);

    currentView = 'home';

    categoryList.addEventListener('change', () => {
        if (!categoryList.querySelector('input[name="option"]:checked') || categoryList.querySelector('input[name="option"]:checked').value === 'select') {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Please select a category to continue.';
            errorMessage.classList.add('error-message');
            mainContent.appendChild(errorMessage);
        } 
    });

    startButton.addEventListener('click', () => {
        const selectedOption = categoryList.querySelector('input[name="option"]:checked');
        if (!selectedOption || selectedOption.value === 'select') {
            alert('Please select a category to continue.');
        } else {
            loadQuestions(selectedOption.value);
        }
    });

}

document.addEventListener('DOMContentLoaded', showHomeView);

// End


// Function to show home view when clicking back button

function showHomeViewFromBackButton() {
    mainContent.innerHTML = '';
    mainHeader.innerHTML = '';
    showHomeView();
}

// End

// Function to load questions based on selected category
function loadQuestions(category) {
    mainHeader.innerHTML = '';
    mainContent.innerHTML = '';

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
            displayCurrentQuestion(category);
        } else if (currentQuestionIndex === 0) {
            showHomeViewFromBackButton();
        }
    });

    nextButton.addEventListener('click', () => {
        const selectedRadio = document.querySelector('input[name="option"]:checked');

        if (!selectedRadio) {
            alert("Please select an answer choice.");
            return;
        }

        userSelection[currentQuestionIndex] = selectedRadio.value;
        showNextQuestion();
    });

    loadData(category);
}

let questions = [];
let currentQuestionIndex = 0;

function displayCurrentQuestion(category) {
    const questionObj = questions[currentQuestionIndex];
    const savedAnswer = userSelection[currentQuestionIndex];
    const optionsMarkup = questionObj.options.map(option => {
        const isChecked = savedAnswer === option ? 'checked' : '';
        return `
            <label>
                <input type="radio" name="option" value="${option}" ${isChecked}>
                ${option}
            </label><br>
        `;
    }).join('');

    mainContent.innerHTML = `
        <div class="question-container">
            <h2>Question ${currentQuestionIndex + 1}:</h2>
            <p>${questionObj.question_text}</p>
        </div>

        <div class="options-container">
            <form class="options-form" id="options-form">
                ${optionsMarkup}
            </form>
        </div>
    `;
}

function showNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        checkAnswers()
    } else {
        displayCurrentQuestion();
    }
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

// End

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

function checkAnswers() {
    let score = 0

    const resultsMarkup = questions.map((questionObj, index) => {
        const userAnswer = userSelection[index];
        const isCorrect = userAnswer === questionObj.correctAnswer

        if (isCorrect) {
            score++
        }

        return `
            <div class="result-item">
                <h3><span>${index + 1}.</span> ${questionObj.question_text}</h3>
                <p>Your answer: ${userAnswer ?? 'No answer selected'}
                    ${isCorrect ? '✅' : `❌`}
                    ${!isCorrect ? `<p>Correct answer: ${questionObj.correctAnswer} ✅</p>` : ''}
                </p>
            </div>
        `

    }).join('')

    mainHeader.innerHTML = ''
    mainContent.innerHTML = `
        <div class="results-container">
            <h2>Your score: ${score} / ${questions.length}</h2>
            ${resultsMarkup}
        </div>
    `
}
// End
// Keep track of user answers and display total score after the last question
// Check the answers against the correct answers within the JSON