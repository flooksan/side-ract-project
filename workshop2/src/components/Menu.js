import React, { useContext } from 'react'
import { DataContext } from '../App'

const Menu = () => {
//   Destructure appState , setAppState จาก DataContext
  const { appState , setAppState } = useContext(DataContext)
//   console.log(`${appState},${setAppState}`) // menu, function() {[native code]}
    return (
        
    <div className='menu'>
        <h2>Menu</h2>
        {/* ให้ onClick ไป setAppState = quiz คราวนี้หน้า app จะเปลี่ยนจาก menu component เป็น quiz component */}
        <button onClick={() => setAppState('quiz')}>Start Quiz</button>
    </div>
  )
}

export default Menu