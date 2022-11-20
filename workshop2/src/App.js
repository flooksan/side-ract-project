import React, { useState, createContext } from 'react'
import { Menu,Quiz,Score } from './components'
import './App.css'


// create context api  
export const DataContext = createContext()

function App() {
  const [appState,setAppState] = useState('menu')
  const [score,setScore] = useState(0)
  //เอา score,setScore โยนไปให้ quiz ใช้เพื่อนับคะแนน
  
  return (
    // datacontext ส่ง valueไปมี appState กับ ฟังก์ชัน setAppState
    <DataContext.Provider value={{appState,setAppState,score,setScore}}>
      <div className="app">
        <h1>Web Development Quiz</h1>
        {/* การจะแสดงผลขึ้นกับ state ของ appState */}
        {appState === 'menu' && <Menu />}
        {appState === 'quiz' && <Quiz />}
        {appState === 'score' && <Score />}
      </div>
    </DataContext.Provider>
  );
}

export default App;
