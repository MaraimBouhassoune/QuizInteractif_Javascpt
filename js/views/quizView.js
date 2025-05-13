class QuizView {
  constructor() {
    this.welcomeScreen = document.getElementById("welcome-screen");
    this.quizInterface = document.getElementById("quiz-interface");
    this.resultsScreen = document.getElementById("results-screen");

    this.startButton = document.getElementById("start-button");

    this.questionNumber = document.getElementById("question-number");
    this.progressBar = document.getElementById("progress-bar");
    this.timerCount = document.getElementById("timer-count");

    this.questionText = document.getElementById("question-text");
    this.multipleChoiceWarning = document.getElementById(
      "multiple-choice-warning"
    );
    this.answersContainer = document.getElementById("answers-container");
    this.prevButton = document.getElementById("prev-button");
    this.nextButton = document.getElementById("next-button");
    this.submitButton = document.getElementById("submit-button");

    this.scoreValue = document.getElementById("score-value");
    this.correctAnswers = document.getElementById("correct-answers");
    this.totalQuestions = document.getElementById("total-questions");
    this.scoreMessage = document.getElementById("score-message");
    this.answersSummaryContainer = document.getElementById(
      "answers-summary-container"
    );
    this.restartButton = document.getElementById("restart-button");
    this.homeButton = document.getElementById("home-button");
  }

  showWelcomeScreen() {
    this.welcomeScreen.classList.remove("d-none");
    this.quizInterface.classList.add("d-none");
    this.resultsScreen.classList.add("d-none");
  }

  showQuizInterface() {
    this.welcomeScreen.classList.add("d-none");
    this.quizInterface.classList.remove("d-none");
    this.resultsScreen.classList.add("d-none");
  }

  updateTimerDisplay(seconds) {
    this.timerCount.textContent = seconds;
  }

  showResultsScreen() {
    this.welcomeScreen.classList.add("d-none");
    this.quizInterface.classList.add("d-none");
    this.resultsScreen.classList.remove("d-none");
  }

  renderQuestion(question, currentIndex, totalQuestions) {
    this.questionNumber.textContent = `Question ${
      currentIndex + 1
    }/${totalQuestions}`;
    const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;
    this.progressBar.style.width = `${progressPercentage}%`;
    this.progressBar.setAttribute("aria-valuenow", progressPercentage);
    this.progressBar.textContent = `${Math.round(progressPercentage)}%`;

    this.questionText.textContent = question.text;

    if (question.multipleChoice) {
      this.multipleChoiceWarning.classList.remove("d-none");
    } else {
      this.multipleChoiceWarning.classList.add("d-none");
    }

    while (this.answersContainer.firstChild) {
      this.answersContainer.removeChild(this.answersContainer.firstChild);
    }
    question.options.forEach((option) => {
      const answerDiv = document.createElement("div");
      answerDiv.className = "answer-option";

      if (question.userAnswer.includes(option.value)) {
        answerDiv.classList.add("selected");
      }

      const inputType = question.multipleChoice ? "checkbox" : "radio";
      const inputId = `answer-${currentIndex}-${option.value}`;
      const inputName = question.multipleChoice
        ? `answer-${currentIndex}-multiple`
        : `answer-${currentIndex}`;

      const input = document.createElement("input");
      input.type = inputType;
      input.id = inputId;
      input.name = inputName;
      input.value = option.value;
      input.checked = question.userAnswer.includes(option.value);

      const label = document.createElement("label");
      label.className = "answer-label";
      label.htmlFor = inputId;
      label.textContent = option.text;

      answerDiv.appendChild(input);
      answerDiv.appendChild(label);

      answerDiv.addEventListener("click", (event) => {
        event.preventDefault();

        if (inputType === "radio") {
          const allOptions =
            this.answersContainer.querySelectorAll(".answer-option");
          allOptions.forEach((opt) => {
            opt.classList.remove("selected");
            opt.querySelector("input").checked = false;
          });

          answerDiv.classList.add("selected");
          input.checked = true;
        } else {
          answerDiv.classList.toggle("selected");
          input.checked = !input.checked;
        }
      });

      this.answersContainer.appendChild(answerDiv);
    });

    this.updateNavigationButtons(
      currentIndex === 0,
      currentIndex === totalQuestions - 1
    );
  }

  updateNavigationButtons(isFirst, isLast) {
    this.prevButton.disabled = isFirst;

    if (isLast) {
      this.nextButton.classList.add("d-none");
      this.submitButton.classList.remove("d-none");
    } else {
      this.nextButton.classList.remove("d-none");
      this.submitButton.classList.add("d-none");
    }
  }

  getSelectedAnswers() {
    const selectedInputs =
      this.answersContainer.querySelectorAll("input:checked");
    return Array.from(selectedInputs).map((input) => input.value);
  }

  renderResults(score, totalQuestions, resultsSummary) {
    this.scoreValue.textContent = score;
    this.correctAnswers.textContent = score;
    this.totalQuestions.textContent = totalQuestions;

    while (this.answersSummaryContainer.firstChild) {
      this.answersSummaryContainer.removeChild(
        this.answersSummaryContainer.firstChild
      );
    }
    resultsSummary.forEach((result) => {
      const resultItem = document.createElement("div");
      resultItem.className = "result-item";

      const statusClass = result.isCorrect
        ? "result-correct"
        : "result-incorrect";
      const statusIcon = result.isCorrect
        ? '<i class="fas fa-check-circle"></i>'
        : '<i class="fas fa-times-circle"></i>';

      let resultHTML = `
                <div class="result-question">
                    ${result.questionNumber}. ${result.questionText}
                </div>
                <div class="${statusClass}">
                    ${statusIcon} ${result.isCorrect ? "Correct" : "Incorrect"}
                </div>
            `;

      resultHTML += `<div class="result-answer">Votre réponse : ${
        result.userAnswerText.join(", ") || "Aucune réponse"
      }</div>`;

      if (!result.isCorrect) {
        resultHTML += `<div class="result-answer result-correct">Réponse correcte : ${result.correctAnswerText.join(
          ", "
        )}</div>`;
      }

      resultItem.innerHTML = resultHTML;
      this.answersSummaryContainer.appendChild(resultItem);
    });
  }

  celebrate() {
    // canvases automatiques : confetti() est exposé par la lib
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      // lance un petit “burst” de confetti
      confetti({
        particleCount: 50,
        angle: Math.random() * 60 + 60,
        spread: Math.random() * 10 + 50,
        origin: { x: Math.random(), y: Math.random() * 0.6 },
      });
      // jusqu’à la fin de la durée
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}
