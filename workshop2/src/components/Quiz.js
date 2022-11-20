import React,{ useState, useEffect, useContext } from 'react'
import { DataContext } from '../App'
import QuestionsData from '../data/QuestionsData'

const Quiz = () => {
    // state
    const [current,setCurrent] = useState(0)
    const [selectChoice,setSelectChoice] = useState('')
        // DataContext.Provider ส่งstate score,setScore มาจาก App.js เราเอามาใช้โดย destructuring 
    const { score,setScore,setAppState,appState } = useContext(DataContext)

    // useEffect 
    /* เรียกใช้ useEffect เมื่อมีการกดปุ่มเลือก choice คือ กดเลือกทำให้ไป setSelectChoice ทำให้ค่า selectChoice
     เปลี่ยน แล้วเราดักมันที่ useEffectเลยทำให้มันไปเลือก checkAnswer() */
    useEffect(()=> {
        checkAnswer() 
        // ด้านล่างเป็นการ fix error เมื่อมีการเรียกใช้ function ในตัวเอง useEffect()
        // eslint-disable-next-line
    },[selectChoice])

    // function
    const checkAnswer = () => {
        if(selectChoice !=='') {
            if(selectChoice === QuestionsData[current].answer) {
                // บอกว่าเลือกถูกและ เพิ่มคะแนน +1 และเลื่อนไปข้อถัดไปโดยใช้ nextQuestion()
                console.log('Right ✅')
                setScore(score+1)
                nextQuestion()
            }else { 
                console.log('Wrong ❌')
                nextQuestion()
            }
        }
    }

    const nextQuestion = () => {
        setSelectChoice('');
        if(current+1 === QuestionsData.length) {
            
            // เป็นการ reset choice ก่อนขึ้นหน้าใหม่ทุกครั้ง
            setAppState('score');

        }
        // เป็นการ reset choice ก่อนขึ้นหน้าใหม่ทุกครั้ง
        else {
            setCurrent(current+1);
        }

    }


    return (

    <div className='quiz'>
        <h2>{QuestionsData[current].question}</h2>
        <div className='choices'>
            <button onClick={()=>setSelectChoice("A")}> {QuestionsData[current].A} </button>
            <button onClick={()=>setSelectChoice("B")}> {QuestionsData[current].B} </button>
            <button onClick={()=>setSelectChoice("C")}> {QuestionsData[current].C} </button>
            <button onClick={()=>setSelectChoice("D")}> {QuestionsData[current].D} </button>
        </div>
        {/* show question page */}
        <p style={{color:'black'}} > {`${current+1} / ${QuestionsData.length}`} </p>
    </div>
  )
}

export default Quiz