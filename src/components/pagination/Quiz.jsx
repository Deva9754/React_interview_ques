import { useState } from "react";
import questions from "../../constants/question.json";
import Questions from "./Questions";
import Result from "./Result";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [currentQuestions, setCurrentQuestions] = useState(0);
  const [userAnswer, setUserAsnwer] = useState([]);
  const navigate=useNavigate()

  const handleNextQuestion = (isCorrect) => {
    setCurrentQuestions(currentQuestions + 1);
    setUserAsnwer([...userAnswer, isCorrect]);
  };

  const resetQuiz = () => {
    setCurrentQuestions(0);
    setUserAsnwer([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
       <button
          type="button"
          onClick={()=>navigate('/admin')}
          className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 font-semibold"
        >
          &larr; Back to Admin
        </button>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Quiz App</h1>

      {/* Questions Component */}
      {currentQuestions < questions.length ? (
        <Questions
          question={questions[currentQuestions]}
          onAnswerClick={handleNextQuestion}
        />
      ) : (
        // Result Component
        <Result
          userAnswers={userAnswer}
          questions={questions}
          resetQuiz={resetQuiz}
        />
      )}

      {currentQuestions === questions.length && (
        <button
          onClick={resetQuiz}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Restart Quiz
        </button>
      )}
    </div>
  );
};

export default Quiz;
