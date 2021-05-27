import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard'
import {fetchQuizQuestions,Difficulty,QuestionState} from './API'
import {GlobaleStyle , Wrapper} from './App.styles'

import Select from './components/FormSend'
const Total_Questions=10

export type AnswerObject={
  question:string
  answer:string
  correct:boolean
  correctAnswer:string
}



const App=()=> {

const initialApiData={
 
    
   category:{
    value:9,
   label:"Category",
    options :[
    {value:9, displayValue:"GeneralKnoledge"},
    {value:21, displayValue:"Sports"},
    {value:24, displayValue:"Politics"},
    {value:11, displayValue:"Film"},
    {value:12, displayValue:"Music"},
    
    {value:18, displayValue:"Computer"},
    {value:20, displayValue:"Mythology"},
    
    ]
   },
   difficulty:{
    value:Difficulty.EASY,
    label:"Difficulty",
    options:[
    {value:Difficulty.EASY, displayValue:"EASY"},
    {value:Difficulty.MEDIUM, displayValue:"MEDIUM"},
    {value:Difficulty.HARD, displayValue:"HARD"},
    ]

   }
  
  }


  const [loading,setLoading]=useState(false)
  const [questions,setQuestions]=useState<QuestionState[]>([])
  const [number,setNumber]=useState(0)
  const [userAnswers,setUserAnswers]=useState<AnswerObject[]>([])
  const [score,setscore]=useState(0)
  const [gameOver,setGameOver]=useState(true)

 
 

  const [apiData,setApiData]=useState<any>(initialApiData)
  const apiDataArray=[]

for(let key in apiData ){
  apiDataArray.push({
    id:key,
    config:apiData[key] 
  })

}


  const startTrivia= async ()=>{

    setLoading(true)
    setGameOver(false)

    const newQuestion = await fetchQuizQuestions(Total_Questions,apiData.difficulty.value,apiData.category.value)

    setQuestions(newQuestion)
    setscore(0)
    setNumber(0)
    setLoading(false)
    setUserAnswers([])

  }
 
  const checkAnswer=(e: React.MouseEvent<HTMLButtonElement>)=>{
    
    if(!gameOver){
      //user answer
      const answer = e.currentTarget.value

      //user answer check with current answer
      const correct= questions[number].correct_answer===answer

      if(correct){
        setscore(prev=> prev +1)
      }
    

      // Save answer 

      const answerObject={
        question:questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer

      }

      setUserAnswers(prev=>[
        ...prev,
        answerObject
      ])

    }

   
  }
  const inputChangeHandaler =(event:any,identifier:any)=>{
   const updateApiData={
     ...apiData
   }

   const updateApiElement={
     ...updateApiData[identifier]
   }
     
   updateApiElement.value=event.target.value;

   updateApiData[identifier] = updateApiElement
   setApiData(updateApiData)


  
    
  }
 
  const nextQuestion=()=>{

    // move to next question 
    const nextQuestion=number + 1

    if(nextQuestion+1===Total_Questions){
      setGameOver(true)
    }else{
      setNumber(nextQuestion)
    }
      console.log(nextQuestion)
  }
  return (
    <>
    <GlobaleStyle />
    <Wrapper>
    <h1>REACT QUIZ</h1>
    {
      gameOver || userAnswers.length===Total_Questions ? 

      <form onSubmit={startTrivia}>
        {
          apiDataArray.map((data)=>(
            
<Select 
        value={data.config.value}
        options={data.config.options}
        changed={(event:any)=>inputChangeHandaler(event,data.id)}
        label={data.config.label}
        key={data.id}
        />
        
          ))
        }
        
<button className='start'>
      Start
          </button>
      </form>
       : null

    }
  {!gameOver ? <p className="score">Score:{score}</p> : null}
    {loading && <p>Loading Quiestions</p> }

    {!gameOver && !loading &&(
    
    <QuestionCard
    questionNr={number +1}
    totalQuestions={Total_Questions}
    question={questions[number].question}
    answers={questions[number].answers}
    userAnswer={userAnswers? userAnswers[number]: undefined}
    callback={checkAnswer}
    />
    )}
    {!gameOver && !loading && userAnswers.length===number +1 && number !==Total_Questions -1 ?
    (
      <button className='next' onClick={nextQuestion}>NextQuestion
    </button>
    ): null
    
    }
    
    </Wrapper>
    </>
  );
}

export default App;
