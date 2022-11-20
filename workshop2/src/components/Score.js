import React,{useContext} from 'react'
import { DataContext } from '../App'
import QuestionsData from '../data/QuestionsData'

const Score = () => {
  const {score,setAppState,setScore} = useContext(DataContext)
    return (
    <div className='score'>
        <h2>Summary Score</h2>
        <h3>{score} /{QuestionsData.length} </h3>
        <button onClick={() => {
            setAppState('menu');
            setScore(0)
        } }>Retry</button>
    </div>
  )
}

export default Score