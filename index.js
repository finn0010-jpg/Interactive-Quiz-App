// DOM elements
const mainHeader = document.getElementById('main-header');
const mainContent = document.getElementById('main-content');

// Function for inital DOM load
function loadInitialScreen() {
    let h1 = document.createElement('h1');
    h1.textContent = 'Welcome! This is a quiz that will test your general knowledge. Click the button below to start the quiz.';
    h1.classList.add('main-header');
    mainHeader.appendChild(h1);

    let startButton = document.createElement('button');
    startButton.textContent = 'Start Quiz';
    startButton.classList.add('start-button');
    mainContent.appendChild(startButton);
}
// Initial load screen
document.addEventListener('DOMContentLoaded', loadInitialScreen())

// Event listener for start button
startButton.addEventListener('click', () => {
    
})