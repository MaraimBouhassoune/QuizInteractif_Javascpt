
class QuizModel {
    constructor() {
        this.questions = [
            {
                text: "Quelle est la capitale de l'Empire byzantin, également appelée « Nouvelle Rome » ?",
                options: [
                    { text: "Rome", value: "A" },
                    { text: "Constantinople", value: "B" },
                    { text: "Alexandrie", value: "C" },
                    { text: "Athènes", value: "D" }
                ],
                correctAnswer: ["B"],
                multipleChoice: false,
                userAnswer: []
            },
            {
                text: "En quelle année a débuté la Première Guerre mondiale ?",
                options: [
                    { text: "1912", value: "A" },
                    { text: "1914", value: "B" },
                    { text: "1916", value: "C" },
                    { text: "1918", value: "D" }
                ],
                correctAnswer: ["B"],
                multipleChoice: false,
                userAnswer: []
            },
            {
                text: "Parmi ces cités, lesquelles ont été capitales d'empires précolombiens ?",
                options: [
                    { text: "Cuzco", value: "A" },
                    { text: "Tenochtitlan", value: "B" },
                    { text: "Machu Picchu", value: "C" },
                    { text: "Teotihuacan", value: "D" }
                ],
                correctAnswer: ["A", "B"],
                multipleChoice: true,
                userAnswer: []
            },
            {
                text: "En quelle année la Révolution française a-t-elle commencé avec la prise de la Bastille ?",
                options: [
                    { text: "1787", value: "A" },
                    { text: "1789", value: "B" },
                    { text: "1791", value: "C" },
                    { text: "1793", value: "D" }
                ],
                correctAnswer: ["B"],
                multipleChoice: false,
                userAnswer: []
            },
            {
                text: "Quelle est la capitale de l'ancien royaume d'Aksoum, important État commerçant en Afrique de l'Est ?",
                options: [
                    { text: "Lalibela", value: "A" },
                    { text: "Aksoum", value: "B" },
                    { text: "Tombouctou", value: "C" },
                    { text: "Marrakech", value: "D" }
                ],
                correctAnswer: ["B"],
                multipleChoice: false,
                userAnswer: []
            },
            {
                text: "En quelle année s'est terminée la Seconde Guerre mondiale en Europe (VE Day) ?",
                options: [
                    { text: "1943", value: "A" },
                    { text: "1944", value: "B" },
                    { text: "1945", value: "C" },
                    { text: "1946", value: "D" }
                ],
                correctAnswer: ["C"],
                multipleChoice: false,
                userAnswer: []
            },
            {
                text: "Quelle est la capitale du Premier Reich allemand fondé en 1871 ?",
                options: [
                    { text: "Berlin", value: "A" },
                    { text: "Munich", value: "B" },
                    { text: "Francfort", value: "C" },
                    { text: "Vienne", value: "D" }
                ],
                correctAnswer: ["A"],
                multipleChoice: false,
                userAnswer: []
            },
            {
                text: "Parmi ces dates, lesquelles marquent la fin de la Première et de la Seconde Guerre mondiale ?",
                options: [
                    { text: "1918", value: "A" },
                    { text: "1919", value: "B" },
                    { text: "1945", value: "C" },
                    { text: "1946", value: "D" }
                ],
                correctAnswer: ["B", "C"],
                multipleChoice: true,
                userAnswer: []
            },
            {
                text: "Quelle est la capitale de l'Empire moghol à son apogée en Inde ?",
                options: [
                    { text: "Delhi", value: "A" },
                    { text: "Agra", value: "B" },
                    { text: "Lahore", value: "C" },
                    { text: "Bombay", value: "D" }
                ],
                correctAnswer: ["B"],
                multipleChoice: false,
                userAnswer: []
            },
            {
                text: "En quelle année la guerre de Trente Ans a-t-elle pris fin avec la paix de Westphalie ?",
                options: [
                    { text: "1638", value: "A" },
                    { text: "1640", value: "B" },
                    { text: "1648", value: "C" },
                    { text: "1652", value: "D" }
                ],
                correctAnswer: ["C"],
                multipleChoice: false,
                userAnswer: []
            }
        ];

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.quizCompleted = false;
    }

    
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }


    getTotalQuestions() {
        return this.questions.length;
    }


    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }


    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            return true;
        }
        return false;
    }

  
    isFirstQuestion() {
        return this.currentQuestionIndex === 0;
    }

    isLastQuestion() {
        return this.currentQuestionIndex === this.questions.length - 1;
    }


    setAnswer(selectedAnswers) {
        this.questions[this.currentQuestionIndex].userAnswer = selectedAnswers;
    }


    getUserAnswer(index) {
        return this.questions[index].userAnswer;
    }


    calculateScore() {
        this.score = 0;
        this.questions.forEach(question => {
            const userAnswerSet = new Set(question.userAnswer);
            const correctAnswerSet = new Set(question.correctAnswer);
            
            // Check if sets are equal (same size and all elements match)
            if (userAnswerSet.size === correctAnswerSet.size && 
                [...userAnswerSet].every(value => correctAnswerSet.has(value))) {
                this.score++;
            }
        });
        
        this.quizCompleted = true;
        return this.score;
    }

 
    isAnswered(index) {
        return this.questions[index].userAnswer.length > 0;
    }


    allQuestionsAnswered() {
        return this.questions.every(question => question.userAnswer.length > 0);
    }

 
    getResultsSummary() {
        return this.questions.map((question, index) => {
            const userAnswerSet = new Set(question.userAnswer);
            const correctAnswerSet = new Set(question.correctAnswer);
            
            const isCorrect = userAnswerSet.size === correctAnswerSet.size && 
                [...userAnswerSet].every(value => correctAnswerSet.has(value));
     
            const userAnswerText = question.userAnswer.map(value => {
                const option = question.options.find(opt => opt.value === value);
                return option ? option.text : '';
            });
            
            const correctAnswerText = question.correctAnswer.map(value => {
                const option = question.options.find(opt => opt.value === value);
                return option ? option.text : '';
            });
            
            return {
                questionNumber: index + 1,
                questionText: question.text,
                isCorrect: isCorrect,
                userAnswerText: userAnswerText,
                correctAnswerText: correctAnswerText
            };
        });
    }

 
    resetQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.quizCompleted = false;
       
        this.questions.forEach(question => {
            question.userAnswer = [];
        });
    }
}
