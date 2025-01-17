import React from 'react';

const LikedQuiz = () => {
  const likedQuizzes = JSON.parse(localStorage.getItem('likedQuizzes')) || [];

  return (
    <div className="liked-quiz-page">
      <h1>Your Liked Quizzes</h1>
      {likedQuizzes.length > 0 ? (
        likedQuizzes.map((quiz, index) => (
          <div key={index} className="liked-quiz">
            <h2>Quiz {index + 1}</h2>
            <p>Score: {quiz.score}/5</p>
            <div className="answers">
              {quiz.questions.map((question, i) => (
                <div key={i} className="question-result">
                  <p className="question">{question.question}</p>
                  {question.options.map((option, j) => (
                    <div
                      key={j}
                      className={`option ${option === question.answer ? 'correct' : option === quiz.userAnswers[i] ? 'incorrect' : ''}`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No quizzes liked yet!</p>
      )}
    </div>
  );
};

export default LikedQuiz;
