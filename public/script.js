let currentQuestionIndex = 0;
let score = 0;

async function fetchQuestions() {
  const response = await fetch("/questions");
  const questions = await response.json();
  return questions;
}

function displayQuestion(question) {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  questionElement.textContent = question.question;
  optionsElement.innerHTML = question.options
    .map(
      (option) =>
        `<button onclick="checkAnswer('${option}')">${option}</button>`
    )
    .join("");
}

function checkAnswer(selectedOption) {
  const questions = JSON.parse(sessionStorage.getItem("questions"));
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    alert(`Quiz Over! Your score is ${score}`);
  }
}

document.getElementById("next-btn").addEventListener("click", () => {
  const questions = JSON.parse(sessionStorage.getItem("questions"));
  if (currentQuestionIndex < questions.length) {
    displayQuestion(questions[currentQuestionIndex]);
  }
});

(async function init() {
  const questions = await fetchQuestions();
  sessionStorage.setItem("questions", JSON.stringify(questions));
  displayQuestion(questions[currentQuestionIndex]);
})();
