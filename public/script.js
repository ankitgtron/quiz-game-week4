
async function loadQuestions() {
    try {
        const response = await fetch('/questions');
        const questions = await response.json();
        displayQuestions(questions);
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

function displayQuestions(questions) {
    const container = document.getElementById('questions');
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        const correctIndex = q.options.indexOf(q.answer);

        questionDiv.dataset.correct = correctIndex;
        
        questionDiv.innerHTML = `
            <h3>${index + 1}. ${q.question}</h3>
            <div class="options">
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        container.appendChild(questionDiv);
    });
}

function submitQuiz() {
    const questions = document.querySelectorAll('.question');
    let score = 0;
    
    questions.forEach((q, index) => {
        const selected = q.querySelector('input:checked');
        if (selected) {
            const userAnswer = parseInt(selected.value);
            const correctAnswer = parseInt(q.dataset.correct);
            if (userAnswer === correctAnswer) {
                score++;
            }
        }
    });
    
    document.getElementById('score').textContent = `Your score: ${score}/${questions.length}`;
}


window.onload = loadQuestions;
