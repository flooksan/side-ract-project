import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from './Navbar';


function SingleComponent(props) {
  const [blog,setBlog] = useState('')
  
  useEffect(() => { //ไปดึงข้อมูลจาก API ที่เราตั้งไว้แล้วไปดึงในส่วนของ route blog ในส่วนของ slug นั้นๆ ที่จะเอามาโชว์
    axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
    .then(response => {
        setBlog(response.data)
    }).catch(err => Swal('Error',`${err}!!`,'error'))
    // eslint-disable-next-line
  }, [])
  

    return (

    <div className='container p-5'>
        <Navbar/>
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
        <div className='text-black-50'>Author : {blog.author}  ,
        Time : {new Date(blog.createdAt).toLocaleString()}</div>
    </div>
    )
}

export default SingleComponent;