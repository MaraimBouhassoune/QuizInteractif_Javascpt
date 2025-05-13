document.addEventListener('DOMContentLoaded', () => {
    const quizModel = new QuizModel();
    const quizView = new QuizView();
    const quizController = new QuizController(quizModel, quizView);
});
