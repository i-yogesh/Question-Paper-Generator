document.addEventListener('DOMContentLoaded', displayQuestions);

function displayQuestions() {
  const easyQuestions = JSON.parse(sessionStorage.getItem('easyQuestions')) || [];
  const mediumQuestions = JSON.parse(sessionStorage.getItem('mediumQuestions')) || [];
  const hardQuestions = JSON.parse(sessionStorage.getItem('hardQuestions')) || [];

 
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<p>Easy Difficulty:</p>
                         <ul>${displayQuestionsList(easyQuestions)}</ul>
                         <p>Medium Difficulty:</p>
                         <ul>${displayQuestionsList(mediumQuestions)}</ul>
                         <p>Hard Difficulty:</p>
                         <ul>${displayQuestionsList(hardQuestions)}</ul>`;
}

function displayQuestionsList(questions) {
  return questions.map((question) => `<li>${question.question} - ${question.marks} Marks</li>`).join('');
}
