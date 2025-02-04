const Result = ({ userAnswers, questions, resetQuiz = () => {} }) => {
    const correctAnswer = userAnswers.filter((answer) => answer).length;
  
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-10 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Quiz Result</h2>
        <p className="text-xl text-gray-600 mb-6">
          You answered <span className="font-semibold text-blue-600">{correctAnswer}</span> out of{" "}
          <span className="font-semibold text-blue-600">{questions.length}</span> questions.
        </p>
  
        <div className="mt-6">
          {/* <span
            onClick={resetQuiz}
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Click here to retry
          </span> */}
        </div>
      </div>
    );
  };
  
  export default Result;
  