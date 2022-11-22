import React from 'react'

const List = ({ id, title, removeItem, editItem }) => {
    
    return (
        <div className='list-item' >
            <p className='title' >{title}</p>
            <div className='btn-container'>
                <button className='btn-edit' onClick={() => editItem(id)} >Edit</button>
                {/* เรียกใช้ removeItem แล้วส่ง id เป็น parameter idเป็น id เดียวกับที่ส่งมาใน props*/}
                <button className='btn-delete' onClick={() => removeItem(id)} >Delete</button>
            </div>
        </div>
  )
}

export default List