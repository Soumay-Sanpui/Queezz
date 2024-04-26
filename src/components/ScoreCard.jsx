import React from 'react'

const ScoreCard = ({score, totalQuestions, setTotalQuestions, ca, wa}) => {
  return (
    <div className='absolute text-[1vw] top-[1vw] right-[2vw] w-max h-max p-2 rounded-md bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black shadow-md shadow-slate-700'>
    <div className='flex gap-4 text-[1.4vw]'>
        <p className='hover:scale-105'>Score {score}</p>
        <label className='hover:scale-105 cursor-none' htmlFor="questions">Total Question: </label>
        <input id='questions' onChange={(e)=> {
            setTotalQuestions(e.target.value);
        }} type='number' max={20} min={1} value={totalQuestions} className='text-white bg-slate-900 rounded-md text-center'/>
        <p className='text-lime-500 font-semibold font-sans hover:scale-105 transition-all cursor-none'>Correct: {ca}</p>
        <p className='text-rose-600 font-semibold font-sans hover:scale-105 transition-all cursor-none'>wrong: {wa}</p>
        <img className='hover:cursor-pointer' onClick={()=> window.location.reload()} src="https://cdn-icons-png.flaticon.com/512/10313/10313040.png" width="30" height="30" alt="" title="" class="img-small" />
    </div>
    </div>
  )
}

export default ScoreCard