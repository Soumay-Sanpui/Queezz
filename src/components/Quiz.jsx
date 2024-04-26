import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ScoreCard from './ScoreCard';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(1);
  const [ca, setCa] = useState(0);
  const [wa, setWa] = useState(0);

  const getQuestionAnswer = async () => {
    try {
      const response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=OFFNKC4tMcj5wRaSXTXMGE4IRNNC2E78ksyynEV9&limit=${totalQuestions}`);
      const data = await response.json();
      setQuizData(data);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };
  useEffect(() => {
    getQuestionAnswer();
    toggleOnOff_All(false);
    clearSelectedAnswer();
  }, [totalQuestions]);

  const toggleOnOff_All = (isOn) => {
    const inputElements = document.querySelectorAll('button[type="button"]');
    for (const element of inputElements) {
      element.disabled = isOn;
    }
  };

  const clearSelectedAnswer = () => {
    const inputElements = document.querySelectorAll('button[type="button"]');
    for (const element of inputElements) {
      element.checked = false;
    }
  };
  

  const isCorrectAnswer = (currentSelectedAnswer) => {
    toggleOnOff_All(true);
    const correctAnswer = Object.keys(quizData[currentIndex].correct_answers).find(key => quizData[currentIndex].correct_answers[key] === "true").split('_')[1];
    if (currentSelectedAnswer === correctAnswer) {
      document.getElementById(correctAnswer).classList.add('correct');
      toast.success('Correct Answer 🎉', {autoClose: 2000})
      setCa(prevCa => prevCa + 1);
      setScore(prevScore => prevScore + 10);
    } else {
      setWa(prevWa => prevWa + 1);
      document.getElementById(correctAnswer).classList.add('correct');
      toast.error('Wrong Answer 😓')
      document.getElementById(currentSelectedAnswer).classList.add('incorrect');
    }
  };

  const handleClick = (e) => {
    const currentSelectedAnswer = e.target.value.split('_')[1];
    isCorrectAnswer(currentSelectedAnswer);
  };

  const handleNextClick = () => {
    if (currentIndex < quizData.length - 1) {
      toggleOnOff_All(false);
      setCurrentIndex(prevIndex => prevIndex + 1);
      clearSelectedAnswer();
      document.querySelectorAll('li').forEach(ele => ele.classList.remove('correct', 'incorrect'));
    }
  };
  return (
    <div className='transition-all w-screen h-screen text-white flex items-center justify-center flex-col bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black'>
      <h1 className='font-bold text-[6vw] drop-shadow-lg'>Quiz</h1>
      {quizData.length > 0 && (
        <div className='w-2/3 p-4 shadow-[0px_6px_23px_10px_#1a202c] rounded-lg select-none'>
          <p className='m-2 text-[1.5vw]'><strong>Question {currentIndex + 1}:</strong> {quizData[currentIndex].question}</p>
          <hr />
          <ul className='p-4 flex gap-5 flex-col'>
            {Object.keys(quizData[currentIndex].answers).filter(key => quizData[currentIndex].answers[key] !== null).map((key) => (
              <li key={key} id={key.split('_')[1]} className='hover:scale-95 text-[1.3vw] transition-all w-full h-full border border-white p-2 rounded-md'>
                  <button className='cursor-pointer w-full h-full' type="button" name="answer" value={key} onClick={(e) => handleClick(e)}>
                    {quizData[currentIndex].answers[key]}
                  </button >
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className='hover:scale-110 transition-all border border-gray-700 p-3 px-6 rounded-md mt-[1vw] hover:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-500 via-slate-200 to-neutral-700 hover:text-black font-semibold text-[1vw]' onClick={handleNextClick}>
        <p className='bg-clip-text bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-500 via-slate-200 to-neutral-700'>
          Next Question
        </p>
       </button>
       <ScoreCard score={score} totalQuestions={totalQuestions} setTotalQuestions={setTotalQuestions} ca={ca} wa={wa}/>
    </div>
  );
};

export default Quiz;

