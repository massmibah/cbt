const questions = [
    {
      question: "What is 2 + 2?",
      options: ["2", "3", "4", "5"],
      answer: "4",
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
      answer: "Paris",
    },
    {
      question: "What is the color of the sky?",
      options: ["Blue", "Green", "Red", "Yellow"],
      answer: "Blue",
    },
    {
      question: "What is 10 / 2?",
      options: ["3", "5", "10", "15"],
      answer: "5",
    },
    {
      question: "Which is the largest planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Jupiter",
    },
    {
      question: "What is 5 x 5?",
      options: ["15", "20", "25", "30"],
      answer: "25",
    },
    {
      question: "Which is the smallest prime number?",
      options: ["1", "2", "3", "5"],
      answer: "2",
    },
    {
      question: "Which continent is the Sahara Desert in?",
      options: ["Asia", "Africa", "Australia", "Europe"],
      answer: "Africa",
    },
    {
      question: "What is 9 + 6?",
      options: ["12", "14", "15", "16"],
      answer: "15",
    },
    {
      question: "What is the boiling point of water?",
      options: ["90°C", "100°C", "110°C", "120°C"],
      answer: "100°C",
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("next-btn");
  const scoreElement = document.getElementById("score");
  const timerElement = document.getElementById("timer");
  
  let timerInterval;
  let timeLeft = 15;
  
  function startTimer() {
    timeLeft = 15;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
  
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time Left: ${timeLeft}s`;
  
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        skipQuestion();
      }
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timerInterval);
  }
  
  function skipQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      displayResult();
    }
  }
  
  function showQuestion() {
    stopTimer();
    startTimer();
  
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
  
    currentQuestion.options.forEach((option) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.addEventListener("click", () => {
        selectAnswer(li, currentQuestion.answer);
        stopTimer();
      });
      optionsElement.appendChild(li);
    });
  }
  
  function selectAnswer(selectedOption, correctAnswer) {
    const options = document.querySelectorAll("#options li");
  
    options.forEach((option) => {
      option.style.pointerEvents = "none";
      if (option.textContent === correctAnswer) {
        option.style.background = "#4caf50";
      } else {
        option.style.background = "#e74c3c";
      }
    });
  
    if (selectedOption.textContent === correctAnswer) {
      score++;
      scoreElement.textContent = `Score: ${score}`;
    }
  }
  
  function nextQuestion() {
    stopTimer();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      displayResult();
    }
  }
  
  function displayResult() {
    stopTimer();
    questionElement.textContent = `Quiz Finished! Your score is ${score}/${questions.length}.`;
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
    timerElement.textContent = "";
  }
  
  nextButton.addEventListener("click", nextQuestion);
  
  
  showQuestion();
  