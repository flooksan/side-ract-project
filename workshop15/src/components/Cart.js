// component จัดการตะกร้าสินค้า
import React from 'react'
import CartItem from './CartItem'
// import CartData from '../assets/ShoppingCart/data/CartData'
import { MyCartContext } from '../management/context'
// import { Alert, AlertTitle, Stack  } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';

const Cart = () => {
  const { cart, total, formatNumber } = MyCartContext() // ได้เป็น Object { cart: (5) […], total: 0, amount: 0 } คือ data initState นั่นเอง
    // ด้านบนเราดึงข้อมูล สินค้าในตะกร้ามาทำงานจาก MyCartContext() 
  // console.log('Item af remove',cart)
  
  if(cart.length ===0) {
    return (
      <div className='shopping-cart2'>
        <InfoIcon sx={{ 
          width:'200px',height:"100px", color:'#FFAC63',}} />
        <div className='empty'>Empty Cart!</div>
      </div>
      
    )

  } else {
    return (
      <div className='shopping-cart'>
          <div className='title' id='cart'>Item in Cart</div>
              {/* เข้าถึง array CartData โดยมีกี่ตัวให้ทำการ map ออกมาเป็น CartItem แต่ตอนนี้เรามีข้อมูล cart จาก contextแล้วเลยเปลี่ยน */} 
                {cart.map((data) => {
                  return <CartItem key={data.id} {...data} /> //spread operator object key แต่ละตัวมาเป็น props ส่งให้ cart item
              })} 
          <div className='footer'>Total {formatNumber(total)} ฿</div>
      </div>
    )
  }
  
}

export default Cart

    
