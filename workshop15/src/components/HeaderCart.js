import React from 'react'
import { MyCartContext } from '../management/context'

function HeaderCart() {
  const { amount } = MyCartContext()
  return (
    <button className='button'>
        <span>Cart</span>
        <span className='badge'><a href='#cart'>{amount}</a></span>
    </button>
  )
}

export default HeaderCart