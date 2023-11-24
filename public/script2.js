const questionsData = [
        {
          "question": "What is the capital of France?",
          "subject": "Geography",
          "topic": "Countries and Capitals",
          "difficulty": "Easy",
          "marks": 5
        },
        {
          "question": "Who wrote 'Romeo and Juliet'?",
          "subject": "Literature",
          "topic": "Shakespearean Plays",
          "difficulty": "Medium",
          "marks": 10
        },
        {
          "question": "What is the chemical symbol for gold?",
          "subject": "Chemistry",
          "topic": "Elements",
          "difficulty": "Easy",
          "marks": 5
        },
        {
          "question": "What is the formula for calculating the area of a circle?",
          "subject": "Mathematics",
          "topic": "Geometry",
          "difficulty": "Medium",
          "marks": 10
        },
        {
          "question": "Who is known as the 'Father of Computer Science'?",
          "subject": "Computer Science",
          "topic": "Pioneers in Computer Science",
          "difficulty": "Hard",
          "marks": 20
        },
        {
          "question": "In which year did World War II end?",
          "subject": "History",
          "topic": "World War II",
          "difficulty": "Medium",
          "marks": 10
        },
        {
          "question": "What is the powerhouse of the cell?",
          "subject": "Biology",
          "topic": "Cell Biology",
          "difficulty": "Easy",
          "marks": 5
        },
        {
          "question": "What is the capital of Japan?",
          "subject": "Geography",
          "topic": "Countries and Capitals",
          "difficulty": "Easy",
          "marks": 5
        },
        {
          "question": "Who painted the Mona Lisa?",
          "subject": "Art",
          "topic": "Famous Paintings",
          "difficulty": "Medium",
          "marks": 10
        },
        {
          "question": "What is the boiling point of water in Celsius?",
          "subject": "Chemistry",
          "topic": "Physical Properties of Water",
          "difficulty": "Easy",
          "marks": 5
        },
        {
          "question": "Solve the equation: 2x + 5 = 15",
          "subject": "Mathematics",
          "topic": "Algebra",
          "difficulty": "Medium",
          "marks": 10
        },
        {
          "question": "Who developed the theory of relativity?",
          "subject": "Physics",
          "topic": "Theory of Relativity",
          "difficulty": "Hard",
          "marks": 20
        },
        {
          "question": "What is the official language of Brazil?",
          "subject": "Languages",
          "topic": "Brazilian Languages",
          "difficulty": "Easy",
          "marks": 5
        },
        {
          "question": "Name the largest planet in our solar system.",
          "subject": "Astronomy",
          "topic": "Planets",
          "difficulty": "Easy",
          "marks": 5
        },
        {
          "question": "Who discovered penicillin?",
          "subject": "Medicine",
          "topic": "History of Medicine",
          "difficulty": "Medium",
          "marks": 10
        },
        {
          "question": "What is the main function of the lungs?",
          "subject": "Biology",
          "topic": "Human Anatomy",
          "difficulty": "Easy",
          "marks": 5
        },
        {
          "question": "Who wrote 'To Kill a Mockingbird'?",
          "subject": "Literature",
          "topic": "Modern American Literature",
          "difficulty": "Medium",
          "marks": 10
        },
        {
          "question": "What is the chemical formula for water?",
          "subject": "Chemistry",
          "topic": "Chemical Formulas",
          "difficulty": "Easy",
          "marks": 5
        },
        {
          "question": "Simplify the expression: 3x + 2x - 5",
          "subject": "Mathematics",
          "topic": "Algebra",
          "difficulty": "Medium",
          "marks": 10
        },
        {
          "question": "Who is known as the 'Queen of Soul'?",
          "subject": "Music",
          "topic": "Soul Music",
          "difficulty": "Easy",
          "marks": 5
        },
        {
          "question": "What is the significance of the Magna Carta?",
          "subject": "History",
          "topic": "Medieval History",
          "difficulty": "Hard",
          "marks": 20
        }
  ];
  

function updateSliderValue(sliderId, valueId) {
  const slider = document.getElementById(sliderId);
  const value = document.getElementById(valueId);
  value.textContent = slider.value;

  slider.addEventListener('input', () => {
    value.textContent = slider.value;
  });
}

function setMaxValues() {
  const easyPercentage = parseInt(document.getElementById('easyMarks').value);
  const mediumSlider = document.getElementById('mediumMarks');
  const hardSlider = document.getElementById('hardMarks');

  mediumSlider.max = 100 - easyPercentage;
  hardSlider.max = 100 - easyPercentage;

  if (parseInt(mediumSlider.value) > mediumSlider.max) {
    mediumSlider.value = mediumSlider.max;
    document.getElementById('mediumValue').textContent = mediumSlider.max;
  }

  if (parseInt(hardSlider.value) > hardSlider.max) {
    hardSlider.value = hardSlider.max;
    document.getElementById('hardValue').textContent = hardSlider.max;
  }
}

function generateQuestions() {
  const totalMarks = parseInt(document.getElementById('totalMarks').value);
  const easyPercentage = parseInt(document.getElementById('easyMarks').value);
  const mediumPercentage = parseInt(document.getElementById('mediumMarks').value);
  const hardPercentage = parseInt(document.getElementById('hardMarks').value);

  updateSliderValue('easyMarks', 'easyValue');
  updateSliderValue('mediumMarks', 'mediumValue');
  updateSliderValue('hardMarks', 'hardValue');

  setMaxValues(); 

  const easyMarks = Math.round((easyPercentage / 100) * totalMarks);
  const mediumMarks = Math.round((mediumPercentage / 100) * totalMarks);
  const hardMarks = Math.round((hardPercentage / 100) * totalMarks);

  const easyQuestions = filterQuestionsByDifficulty(questionsData, 'Easy', easyMarks);
  const mediumQuestions = filterQuestionsByDifficulty(questionsData, 'Medium', mediumMarks);
  const hardQuestions = filterQuestionsByDifficulty(questionsData, 'Hard', hardMarks);

  sessionStorage.setItem('easyQuestions', JSON.stringify(easyQuestions));
  sessionStorage.setItem('mediumQuestions', JSON.stringify(mediumQuestions));
  sessionStorage.setItem('hardQuestions', JSON.stringify(hardQuestions));

  window.location.href = 'generated-questions.html';
}

function filterQuestionsByDifficulty(questions, difficulty, marks) {
  const filteredQuestions = questions.filter((question) => {
    return question.difficulty === difficulty;
  });

  shuffleArray(filteredQuestions);

  let selectedQuestions = [];
  let currentMarks = 0;

  for (const question of filteredQuestions) {
    if (currentMarks + question.marks <= marks) {
      selectedQuestions.push(question);
      currentMarks += question.marks;
    }
  }

  return selectedQuestions;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


updateSliderValue('easyMarks', 'easyValue');
updateSliderValue('mediumMarks', 'mediumValue');
updateSliderValue('hardMarks', 'hardValue');

document.getElementById('easyMarks').addEventListener('input', setMaxValues);
