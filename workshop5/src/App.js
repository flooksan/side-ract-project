// import './App.css';
import React, {useEffect, useState} from 'react'
import money from './assets/img/money.png'
import CurrencyComponent from './components/CurrencyComponent';


function App() {
  // ------- API -------
  
  
  // state
  //สร้าง  state เอามาเก็บ currency โดย initail array จะเป็น empty array เพราะว่าเราเก็บหลายสกุลเงิน
  const [currencyChoice,setCurrencyChoice] = useState([])
    // สกุลเงินต้นทาง
  const [fromCurrency,setFromCurrency] = useState('USD')
    // สกุลเงินต้นทาง
  const [toCurrency,setToCurrency] = useState('THB')
    // จำนวนเงิน
    const [amount,setAmount] = useState(1)
    // อัตราการแลกเปลี่ยน
    const [exChangeRate,setExChangeRate] = useState(1)
    // check ว่า data มาจาก fromCurrency ไหม
    const [checkFromCurrency,setcheckFromCurrency] = useState(true)    
    // fromAmount and toAmount
    let fromAmount,toAmount;

    if(checkFromCurrency) {
      fromAmount = amount;
      toAmount = (amount*exChangeRate).toFixed(2)
    }else {
      // แปลงสกุลเงินปลายทาง(toAmount) ให้เป็นสกุลเงินต้นทาง(fromAmount)
      toAmount = amount;
      fromAmount = (amount/exChangeRate).toFixed(2)
    }

  useEffect(() => {
    // กำหนด link url
    const url =`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    // ใช้ useEffect ในการให้มัน fetch json จาก url คือเมื่อ render App component จะ fetch API
    
    // เมื่อทำการร้องขอข้อมูลจะได้ promise มาใช้ แล้วเราจะทำเอามาทำเป็น json
    fetch(url)
    .then(res => res.json())
    /* ดึงข้อมูลมาแสดงผลในส่วนของ control ซึ่งจะ dump ตัวข้อมูล json มา log ให้ดู
      ภายในนั้นจะมี object base : "USD" , rates: {object ของสกุลเงินโดยเอา base USD เทียบกับสกุลต่างๆ จะขึ้นเป็น
        THB: 35.88 ,  JPY: 140.42 } (ความหมาย 1 USD = 35.88 THB)
    */
    .then(data=> {
      setCurrencyChoice([ ...Object.keys(data.rates) ])
      // setexChangeRate ในแต่ละข้อมูลโดยใส่ data.rates[toCurrency] ตั้ง toCurrency ใส่ใน dependency ด้วยเพราะไม่งั้นค่า state exChangeRate จะไม่เปลี่ยน
      setExChangeRate(data.rates[toCurrency])

    })
    
    
    
    
                    // .then(data=> console.log(` ${toCurrency} : ${data.rates[toCurrency]}`))
                    // .then(data=> setCurrencyChoice([ ...Object.keys(data.rates) ]))
                    // เอา data.reates สกุลเงินต่างๆ ไปเก็บที่ state currencyChoice โดยเราจะเก็บเฉพาะ key value จะยังไม่เอามาใช้ 
                    // ...Object.keys(data.rates) เอา key ของ object data.rates มา ... sprad operator ใส่ array ถ้าไม่ใส่จะได้เป็น [Array(162)]
                    // ถ้าใส่ ... จะเป็น array ของ ["USD","AED", "AFN", "AMD", ... ]
                    // จากนั้นเอา currencyChoice โยนให้ CurrencyComponent เพื่อไป loop มาแสดงผล
                    // ใส่ empty dependency ไปเพื่อไม่ให้มัน fetch ซ้ำๆ ให้มัน fetch ครั่งเดียวตอน render 1st time
    // ต่อมาเราต้องการให้ fetch ทุกครั้งที่มีการเปลี่ยนค่าสกุลเงินหลักใส่ fromCurrency เข้าไป
  },[fromCurrency,toCurrency])

  // สร้าง fuction ดักจับว่ามีการเปลี่ยนแปลงค่าในสกุลเงินต้นทาง (amountFromCurrency) และ ปลายทาง (amountToCurrency) ไหม
  const amountFromCurrency = (e) => {
    // เมื่อตัวเลขถูกป้อนในช่อง input จะส่งมาให้ amountFromCurrency เป็นparameter e
    // จากนั้นจะ set ค่าเข้าไปใน amount
      setAmount(e.target.value)
      /* ถ้าส่งมาจาก Fromcurrency จะให้ค่า  setcheckFromCurrency = true แล้วไปเข้าใช้เงื่อนไขแรกของ if
      แล้วเก็บค่า amount ใส่ fromAmount
      fromAmount = amount;
      toAmount = (amount*exChangeRate).toFixed(2) */
      setcheckFromCurrency(true) 
  }
  const amountToCurrency = (e) => {
      setAmount(e.target.value)
      setcheckFromCurrency(false)
  }

  return (
    <div className="App">
      <img src={money} alt="money" className='money-img'/>
      <h1>App แปลงสกุลเงิน (API) </h1>
      <div className='container'>
        
        {/* สกุลเงินต้นทาง */}
        <CurrencyComponent 
          currencyChoice={currencyChoice}
          selectBaseCurrency ={fromCurrency}
          // ส่ง props changeCurrency ที่ข้างในจะไปเรียกใช้ call back setFromCurrency
          changeCurrency = {(event) => setFromCurrency(event.target.value)}
          // ส่งstate value ของสกุลเงินต้นทางไป
          fromAmount = {fromAmount}
          // ส่ง function เพื่อเช็คการเปลี่ยนแปลงค่าสกุลเงินต้นทางไป
          onChangeAmount ={amountFromCurrency}
         />
        {/* ส่ง props currencyChoice ไปทำงานใน component */}
        
        <div className='equal'> = </div>
        
        {/* สกุลเงินปลายทาง */}
        <CurrencyComponent 
          currencyChoice={currencyChoice} 
          selectSubCurrency = {toCurrency}
          changeCurrency = {(event) => setToCurrency(event.target.value)}
          // ส่งstate value ของสกุลเงินปลายทางไป
          toAmount = {toAmount}
          // ส่ง function เพื่อเช็คการเปลี่ยนแปลงค่าสกุลเงินปลายทางไป
          onChangeAmount ={amountToCurrency}
        />
      </div>
    </div>
  );
}

export default App;
