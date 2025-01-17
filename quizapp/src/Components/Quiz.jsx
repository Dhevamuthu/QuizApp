import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ResultPage from './ResultPage';
import '../Styling/Quiz.css';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(10);
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [lessonName, setLessonName] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [hasAlerted, setHasAlerted] = useState(false);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        if (!token) {
          alert("Please log in to attend the quiz.");
          window.location.href = '/login'; // Redirect to login page if not logged in
          return;
        }
        
        const response = await axios.get(`http://localhost:5000/quiz/${lessonId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token with the request
          },
        });
        const quizData = response.data;
        if (quizData) {
          setQuestions(quizData.questions);
          setLessonName(quizData.lessonName);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        if (error.response && error.response.status === 401) {
          alert("Please log in to attend the quiz.");
          window.location.href = '/login'; // Redirect to login page on authentication error
        }
      }
    };
  
    fetchQuizQuestions();
  }, [lessonId]);
  
  useEffect(() => {
    if (timer === 0 && !isSubmitted) {
      handleSubmit();
    }
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, isSubmitted]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerWarning();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        triggerWarning();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const triggerWarning = () => {
    setWarningCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount >= 2 && !hasAlerted) {
        setHasAlerted(true);
        alert("You have violated the quiz rules by switching tabs or exiting full-screen mode twice. Your test is over.");
        setScore(0);
        setShowResult(true);
      }
      return newCount;
    });
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    if (isSubmitted) 
    setIsSubmitted(true);
  
    const correctAnswer = questions[currentQuestionIndex].answer;
    const updatedScore = selectedOption === correctAnswer ? score + 1 : score;
  
    setUserAnswers([...userAnswers, selectedOption]);
  
    if (isLastQuestion) {
      // Get the user ID from localStorage (assuming it's stored there)
      const userId = localStorage.getItem('userId');
  
      // Send the score, lessonId, and userId to the backend
      try {
        await axios.post('http://localhost:5000/compquiz', {
          lessonId: lessonId,
          userId: userId, // Include the user ID
          score: updatedScore
        });
        console.log("Quiz results submitted successfully");
      } catch (error) {
        console.error("Error submitting quiz results:", error);
      }
  
      setShowResult(true);
    } else {
      handleNextQuestion();
    }
  };
  
  

  const handleNextQuestion = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setTimer(10);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (showResult) {
    return <ResultPage score={score} questions={questions} userAnswers={userAnswers} />;
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container" onCopy={(e) => e.preventDefault()}>
      <div className="timer">Time: {timer}s</div>
      <div className="question-box">
        <div className="lesson-name">{lessonName}</div>
        <div className="question">
          {questions[currentQuestionIndex].question}
        </div>
        <div className="options">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div
              key={index}
              className={`option-box opt${index + 1} ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={selectedOption === null}
        >
          {isLastQuestion ? 'Submit Answers' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
