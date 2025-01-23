const Questions = ({ question, onAnswerClick = () => {} }) => {
   return (
     <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto mt-8">
       <h2 className="text-2xl font-semibold text-gray-800 mb-6">{question.question}</h2>
 
       <ul className="space-y-4">
         {question.answerOptions.map((option) => (
           <li key={option.text}>
             <button
               onClick={() => onAnswerClick(option.isCorrect)}
               className="w-full text-left px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
             >
               {option.text}
             </button>
           </li>
         ))}
       </ul>
     </div>
   );
 };
 
 export default Questions;
 