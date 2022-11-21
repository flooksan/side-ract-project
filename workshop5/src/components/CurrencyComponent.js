import React from 'react'
import './CurrencyComponent.css'

function CurrencyComponent  (props)  {
    // ดึง data currencyChoice มาใช้จาก props ที่ส่งมา currencyChoice = ["USD","AED","AFN",...]
    const { currencyChoice,selectSubCurrency,
        selectBaseCurrency,changeCurrency,
        fromAmount,toAmount,
        onChangeAmount } = props
    
    return (
        // onChange={changeCurrency} เป็นฟังก์ชันที่เราจะส่ง event bottom up props ค่าที่เปลี่ยนแปลงใน component ไปให้ App component
    <div className='currency' >
        <select 
        onChange={changeCurrency}
        value={(selectBaseCurrency ? selectBaseCurrency :selectSubCurrency)}>
        {/* สร้าง select ให้มีตัวเลือกเป็น drop down คือ option */}
            {/* เข้าถึง array currencyChoice แต่ละตัวเพื่อเอามา map ทำเป็น option */}
            {currencyChoice.map(choice =>
            <option value={choice} key={choice} >{choice}</option>
            )}
        </select>
        <input type='number' 
            value={fromAmount ? fromAmount : toAmount }
            onChange = {(e)=> onChangeAmount(e)}
        />
    </div>
  )
}

export default CurrencyComponent