document.addEventListener("DOMContentLoaded", function () {
    let cqi = 0;
    let marks = 0;
    let questions = [];

    fetch("/questions")
        .then(response => response.json())
        .then(data => {
            questions = data; //please ignore the keywords
            showQuestion(); //thodi cheating toh chlti h 
        })
        .catch(error => console.error("Error fetching questions:", error));

    function showQuestion() {
        //100% khud nhi bnaya but 100% gpt se bhi nhi kiya 50-50
        let quizContainer = document.getElementById("quiz");
        quizContainer.innerHTML = ""; // remove earlier response

        if (cqi < questions.length) {
            let q = questions[cqi];
            let div = document.createElement("div");
            div.innerHTML = `<h2>${q.question}</h2>
                ${q.options.map(opt => `<button onclick="checkAnswer('${opt}')">${opt}</button>`).join('')}
                <p>marks: <span id="marks">${marks}</span></p>
            `;
            quizContainer.appendChild(div);
        } else {
            showFinalmarks();
        }
    }

    window.checkAnswer = function (selected) {
        let correctAnswer = questions[cqi].answer;
        if (selected === correctAnswer) {
            marks++;
        }
        cqi++;
        showQuestion();
    };

    function showFinalmarks() {
        let quizContainer = document.getElementById("quiz");
        quizContainer.innerHTML = `<h2>Quiz Completed!</h2>
            <p>Your final marks: ${marks} / ${questions.length}</p>
            <button onclick="restartQuiz()">Restart Quiz</button>`;
    }

    window.restartQuiz = function () {
        cqi = 0;
        marks = 0;
        showQuestion();
    };
});
