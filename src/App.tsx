import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard'
import {fetchQuizQuestions,Difficulty} from './API'

const Total_Questions=10

const App=()=> {

  
  const [loading,setLoading]=useState(false)
  const [questions,setQuestions]=useState([])
  const [number,setNumber]=useState(0)
  const [userAnswers,setUserAnswers]=useState([])
  const [score,setscore]=useState(0)
  const [gameOver,setGameOver]=useState(true)

  console.log(fetchQuizQuestions(Total_Questions,Difficulty.HARD))
  const startTrivia= async ()=>{

  }
  const checkAnswer=(e: React.MouseEvent<HTMLButtonElement>)=>{

   
  }
  const nextQuestion=()=>{
      
  }
  return (
    <div className="App">
    <h2>REACT QUIZ</h2>
    <button className='start' onClick={startTrivia}>
Start
    </button>
    <p className="score">Score</p>
    <p>Loading Quiestions</p>
    {/* <QuestionCard
    questionNr={number +1}
    totalQuestions={Total_Questions}
    question={questions[number].question}
    answers={questions[number].answers}
    userAnswer={userAnswers? userAnswers[number]: undefined}
    callback={checkAnswer}
    /> */}
    <button className='next' onClick={nextQuestion}>NextQuestion
    </button>
    </div>
  );
}

export default App;
