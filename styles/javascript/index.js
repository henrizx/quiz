document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainerElement = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const prizeContainerElement = document.getElementById('prize-container');
    const restartButton = document.getElementById('restart-btn');
    const yesButton = document.getElementById('yes-btn');
    const noButton = document.getElementById('no-btn');

    let shuffledQuestions, currentQuestionIndex;
    let score = 0;

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    
    restartButton.addEventListener('click', restartGame);
    

    function startGame() {
        startButton.classList.add('hide');
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        score = 0;
        questionContainerElement.classList.remove('hide');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        clearStatusClass(document.body);
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        if (correct) {
            score++;
        }
        setStatusClass(document.body, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
        });
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            if (score >= 4) {
                showPrize();
            } else {
                startButton.innerText = 'Restart';
                startButton.classList.remove('hide');
            }
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function showPrize() {
        questionContainerElement.classList.add('hide');
        prizeContainerElement.classList.remove('hide');
    }

    function restartGame() {
        prizeContainerElement.classList.add('hide');
        startButton.innerText = 'Start';
        startButton.classList.remove('hide');
    }

    const questions = [
        {
            question: 'De onde surgiu o nome da banda?',
            answers: [
                { text: 'Tyler gostava de ver esquadrilhas de fumaça e primeira que viu haviam 21 pilotos no céu', correct: false },
                { text: 'De uma peça de teatro que o Tyler estudou na escola', correct: true },
                { text: 'De um poster de avião de brinquedo numa loja, era dia 21', correct: false },
                { text: 'foi um nome aleatório', correct: false },
                { text: 'Nenhuma das alternativas', correct: false }
            ]
        },
        {
            question: 'Qual a formação original da banda?',
            answers: [
                { text: 'Tyler, Brendon Urie e Nick Thomas', correct: false },
                { text: 'Joshua Dun, Aj Badcock, Tim Skipper e Eric Newcomer', correct: false },
                { text: 'Tyler, Nick Thomas e Chris Salih', correct: true },
                { text: 'Tyler, Aj Badcock, Tim Skipper e Eric Newcomer', correct: false }
            ]
        },
        {
            question: 'Tyler iria seguir outra carreira antes da musica, qual era?',
            answers: [
                { text: 'Salva vidas', correct: false },
                { text: 'Escritor', correct: false },
                { text: 'Vendedor numa loja de Taco Bell', correct: false },
                { text: 'Jogador de Basquete', correct: true },
                { text: 'Nenhuma, ele sempre foi musico', correct: false }
            ]
        },
        {
            question: 'Que dia o Josh nasceu?',
            answers: [
                { text: '17 de outubro de 1987', correct: false },
                { text: '01 de dezembro de 1988', correct: false },
                { text: '18 de junho de 1988', correct: true },
                { text: '02 de abril de 1989', correct: false },
                { text: '05 de maio de 1988', correct: false }
            ]
        },
        {
            question: 'Quantos albuns twenty one pilots possui atualmente?',
            answers: [
                { text: '5', correct: false },
                { text: '4', correct: false },
                { text: '6', correct: false },
                { text: '7', correct: false },
                { text: '9', correct: true }
            ]
        },
        {
            question: 'Em 2017, receberam um grammy, mas quando subiram ao palco fizeram algo que chocou todos. Oque foi?',
            answers: [
                { text: 'Eles tiram as calças', correct: true },
                { text: 'Eles beijaram o chão', correct: false },
                { text: 'Eles foram saltitando', correct: false },
                { text: 'Foram vestidos de Pokemons', correct: false },
                { text: 'Eles não aceitaram o grammy', correct: false }
            ]
        }
    ];
    restartButton.addEventListener('click', restartGame);
    yesButton.addEventListener('click', () => {
        window.location.href = 'pedido.html';
    });
    noButton.addEventListener('click', () => {
        window.location.href = 'affer.html';
    });
  
});
