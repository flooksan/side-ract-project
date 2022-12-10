import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
        <ul className='nav nav-tabs bg-dark'>
            
            <li className='nav-item pr-3 pt-3 pb-3 ' >
                <a href='/' className='nav-link text-light' >Home Page</a>
            </li>

            <li className='nav-item pr-3 pt-3 pb-3 ' >
                <a href='/create' className='nav-link text-light' >Write Blog</a>
            </li>

            {/* <li>
              <Link to={'/'}>Homepage</Link>
            </li> */}

        </ul>
    </nav>
  )
}

export default Navbar