import React from 'react'
import { Link,withRouter } from 'react-router-dom'
import {getUser,logout} from '../services/authorize'

function Navbar({history}) {
  return (
    <nav>
        <ul className='nav nav-tabs bg-dark'>
            
            <li className='nav-item pr-3 pt-3 pb-3 ' >
                <a href='/' className='nav-link text-light' >Home Page</a>
            </li>


            { getUser() && // ถ้ามี ข้อมูล user เก็บใน sessionstorage ให้โชว์ Write Blog
                <li className='nav-item pr-3 pt-3 pb-3 ' >
                    <a href='/create' className='nav-link text-light' >Write Blog</a>
                </li>
            }

            {
              !getUser() && ( // ถ้าไม่มี ข้อมูล user เก็บใน sessionstorage ให้โชว์ Login
                <li className='nav-item pr-3 pt-3 pb-3 ' >
                  <a href='/login' className='nav-link text-light' >Login</a>
                </li> )

            }
            
            {
              getUser() && ( // ถ้ามี ข้อมูล user เก็บใน sessionstorage ให้โชว์ Logout
                <li className='nav-item pr-3 pt-3 pb-3 ' >
                  <button  className='nav-link text-light' onClick={()=>logout(
                    () => history.push('/')
                  )}>Logout</button>
                </li> )
            }

        </ul>
    </nav>
  )
}

export default withRouter(Navbar); // ทำให้ Navbar set with Router ไปด้วย