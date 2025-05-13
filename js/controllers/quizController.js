class QuizController {
  constructor(model, view, timePerQuestion = 15) {
    this.model = model;
    this.view = view;
    this.timePerQuestion = timePerQuestion;
    this.timerIntervalId = null;
    this.timeoutId = null;
    this.initEventListeners();
    this.view.showWelcomeScreen();
  }

  initEventListeners() {
    this.view.startButton.addEventListener('click', () => {
      this.startQuiz();
    });
    this.view.prevButton.addEventListener('click', () => {
      this.saveCurrentAnswer();
      this.navigateToPreviousQuestion();
    });
    this.view.nextButton.addEventListener('click', () => {
      this.saveCurrentAnswer();
      this.navigateToNextQuestion();
    });
    this.view.submitButton.addEventListener('click', () => {
      this.saveCurrentAnswer();
      this.submitQuiz();
    });
    this.view.restartButton.addEventListener('click', () => {
      this.restartQuiz();
    });
    this.view.homeButton.addEventListener('click', () => {
      this.model.resetQuiz();
      this.view.showWelcomeScreen();
    });
  }

  startQuiz() {
    if (this.model.quizCompleted) {
      this.model.resetQuiz();
    }
    this.view.showQuizInterface();
    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    const currentQuestion = this.model.getCurrentQuestion();
    const currentIndex = this.model.currentQuestionIndex;
    const totalQuestions = this.model.getTotalQuestions();
    this.view.renderQuestion(currentQuestion, currentIndex, totalQuestions);
    this.resetTimer();
    this.startTimer();

     console.info(`Quiz – Question ${currentIndex + 1}/${totalQuestions}`);
  }

  saveCurrentAnswer() {
    const selectedAnswers = this.view.getSelectedAnswers();
    this.model.setAnswer(selectedAnswers);
    this.resetTimer();
  }

  navigateToPreviousQuestion() {
    if (this.model.previousQuestion()) {
      this.renderCurrentQuestion();
    }
  }

  navigateToNextQuestion() {
    if (this.model.nextQuestion()) {
      this.renderCurrentQuestion();
    }
  }

  submitQuiz() {
    const score = this.model.calculateScore();
    const totalQuestions = this.model.getTotalQuestions();
    const resultsSummary = this.model.getResultsSummary();
    this.view.renderResults(score, totalQuestions, resultsSummary);
    this.view.showResultsScreen();

    if (score === totalQuestions) {
      this.view.celebrate();
    }
  }

  restartQuiz() {
    this.model.resetQuiz();
    this.startQuiz();
  }

  onTimeUp() {
    this.model.setAnswer([]);
    if (this.model.isLastQuestion()) {
      this.submitQuiz();
    } else {
      this.navigateToNextQuestion();
    }
  }

  resetTimer() {
    clearInterval(this.timerIntervalId);
    clearTimeout(this.timeoutId);
    this.view.updateTimerDisplay(this.timePerQuestion);
  }

  startTimer() {
    let remaining = this.timePerQuestion;
    this.view.updateTimerDisplay(remaining);
    this.timerIntervalId = setInterval(() => {
      remaining--;
      this.view.updateTimerDisplay(remaining);
    }, 1000);
    this.timeoutId = setTimeout(() => {
      clearInterval(this.timerIntervalId);
      this.onTimeUp();
    }, this.timePerQuestion * 1000);
  }
}
