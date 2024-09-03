let correctAnswer;
let score = 0; // Initialize score

function generateQuestion() {
    const mode = document.getElementById('mode').value;
    let num1, num2, operation;
    let maxNum;

    switch (mode) {
        case 'easy':
            maxNum = 10;
            break;
        case 'medium':
            maxNum = 50;
            break;
        case 'hard':
            maxNum = 100;
            break;
    }

    num1 = Math.floor(Math.random() * maxNum) + 1;
    num2 = Math.floor(Math.random() * maxNum) + 1;
    operation = ['+', '-', '*'][Math.floor(Math.random() * 3)]; // Removed division

    correctAnswer = calculateAnswer(num1, num2, operation);
    document.getElementById('question').innerText = `${num1} ${operation} ${num2} = ?`;
}

function calculateAnswer(num1, num2, operation) {
    switch (operation) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
    }
}

function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById('userAnswer').value);
    const resultField = document.getElementById('result');

    if (isNaN(userAnswer)) {
        resultField.value = "Incorrect!";
        resultField.className = 'incorrect'; // Add incorrect class for styling
    } else if (userAnswer === correctAnswer) {
        resultField.value = "Correct!";
        resultField.className = ''; // Remove any styling
        score++; // Increase score by 1 for a correct answer
        updateScore(); // Update score display
        generateQuestion(); // Automatically generate a new question after correct answer
    } else {
        resultField.value = "Incorrect!";
        resultField.className = 'incorrect'; // Add incorrect class for styling
    }

    document.getElementById('userAnswer').value = ''; // Clear the answer field
}

function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

// Function to skip the current question and generate a new one
function skipQuestion() {
    generateQuestion(); // Simply generate a new question without checking the current one
}

// Function to handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkAnswer(); // Trigger the checkAnswer function when Enter is pressed
    }
}

// Initialize game with a default mode
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mode').addEventListener('change', generateQuestion);
    document.getElementById('userAnswer').addEventListener('keydown', handleKeyPress); // Add event listener for Enter key
    generateQuestion();
    updateScore(); // Initialize score display
});
