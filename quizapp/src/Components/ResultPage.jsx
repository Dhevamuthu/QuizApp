import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import '../Styling/ResultPage.css';

const ResultPage = ({ score, questions, userAnswers }) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (score === 5) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Show confetti for 5 seconds
    }
  }, [score]);

  const handleAddToLikedQuiz = () => {
    const likedQuizzes = JSON.parse(localStorage.getItem('likedQuizzes')) || [];
    const newQuiz = { score, questions, userAnswers };

    // Check if the quiz already exists in the liked quizzes
    const isAlreadyLiked = likedQuizzes.some(
      quiz => JSON.stringify(quiz.questions) === JSON.stringify(newQuiz.questions)
    );

    if (!isAlreadyLiked) {
      likedQuizzes.push(newQuiz);
      localStorage.setItem('likedQuizzes', JSON.stringify(likedQuizzes));
      alert('Quiz added to liked quizzes!');
    } else {
      alert('This quiz is already in your liked quizzes!');
    }
  };

  return (
    <div className="result-page">
      {showConfetti && <Confetti />}
      <h1>Your Score: {score}/5</h1>
      {score === 5 && <div className="congrats-popup">Congratulations! You got a perfect score!</div>}
      <div className="answers">
        {questions.map((question, index) => (
          <div key={index} className="question-result">
            <p className="question">{question.question}</p>
            {question.options.map((option, i) => (
              <div
                key={i}
                className={`option ${option === question.answer ? 'correct' : option === userAnswers[index] ? 'incorrect' : ''}`}
              >
                {option}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='resultbuttons'>
        <button onClick={handleAddToLikedQuiz}>Add to Liked Quiz</button>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    </div>
  );
};

export default ResultPage;
