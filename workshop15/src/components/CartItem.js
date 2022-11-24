// expand all item in cartitem
import React from 'react'
import plus from '../assets/ShoppingCart/image/plus.svg'
import minus from '../assets/ShoppingCart/image/minus.svg'
import deleteIcon from '../assets/ShoppingCart/image/delete-icn.svg'
import { MyCartContext } from '../management/context'

const CartItem = ({ id,name,image_url,price,quantity }) => {
  const { removeItem, toggleQuantity, formatNumber } = MyCartContext() //เรียกใช้ function removeItem() จาก MyCartContext()
    return (
    <div className='item'>
        <div className='product_image'>
            <img src={image_url} alt="gpu" width="150px" />
        </div>
        <div className='descriptiton'>
            <span>{name}</span>
            <span> price {formatNumber(price)} ฿</span>
        </div>
        <div className='item-group-3'>
            <div className='quantity'>
                                                                    {/* ในขณะกดปุ่ม จะบอกด้วยว่าเพิ่มหรือลบโดยส่ง parameter ตัวที่สองไป*/}
                <button className='plus' onClick={()=>toggleQuantity(id,'increment')}> 
                    <img src={plus} alt='plus' />
                </button>
                        {/* value ของ input ถ้าใส่ไปว่า defaultValue={quantity} ถ้าเราเพิ่มหรือลดค่า ค่ามันจะไม่แสดงมันจะโชว์ค่าเดิม */}
                <input type='text' value = {quantity} disabled /> 
                <button className='minus' onClick={()=>toggleQuantity(id,'decrement')}>
                    <img src={minus} alt='remove' />
                </button>
            </div>

            <div className='total-price'>
                {formatNumber(quantity * price)}
            </div>
        
            <div className='remove' onClick={()=>removeItem(id)}>  {/* ใส่ eventไปว่า onClick ให้เรียก callback ไปที่ removeItem(ส่งidไปด้วย) */}
                <img src={deleteIcon} alt='remove' />
            </div>
        </div>
    </div>
  )
}

export default CartItem

