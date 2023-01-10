import './App.css';
import Navbar from './components/Navbar'
import axios from 'axios' //ใช้ดึงข้อมูล
import { useState,useEffect } from 'react' 
import Swal from 'sweetalert2'
import { getUser, getToken } from './services/authorize';

// import {Link} from "react-router-dom"

function App() {
  // State collect data from API
  const [blogs,setBlogs] = useState([])

  // Fetch Data
  const fetchData =()=>{
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then(response => {
      setBlogs(response.data) // response ตัวนี้ก็คือตัวที่ response กลับมาจากฝั่ง controller ที่เราสร้างว่า getAllBlogs
    }).catch(err => Swal('Error',`${err}!!`,'error')) ; 
  }

  // Fetch Data Async-await
  async function upDateData() {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API}/blogs`)
          setBlogs(response.data)
          // console.log('Async function',response.data)
      } catch (err) { Swal('Error',`${err}!!`,'error') }
  }
    

  // useEffect ให้มันfetchDataแค่ตอนเปิดหน้าเว๊ป
  useEffect(() => {upDateData()}
  // eslint-disable-next-line
  ,[])
  
  // Function 
    // confirm delete
  const confirmDelete = (slug) => {
    // console.log(slug)
    Swal.fire({
      title: `Do you want to delete ${slug} ?`,
      icon: "question",
      showCancelButton:true
    }).then((result) => {
      // ถ้ากด Ok แล้วทำอะไรต่อ
      if(result.isConfirmed) {
        //ส่ง request to API delete document match slug
          
          deleteBlog(slug)
            
      } 

    })
  }

  function deleteBlog (slug) {
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`, 
      {   // Send header to server for authorize
        headers: {
            authorization: `Bearer ${getToken()}`
        }
      })
    .then(response => {
      Swal.fire({
        title: `Deleteก ${response} success!`,icon: 'success',
      })
      fetchData() //หลังจากลบแล้วให้ FetchData ใหม่
    }).catch(err => console.log(err))
  }

  return (
    
    <div className="App p-5">
      <Navbar/>
      {blogs.map((item,index) => {
        return (
          <div className="col mb-3 mt-3 container-card"  key={index} >
            <div className="card-body">
              {/* <Link to={`/blog/${item.slug}`} > */}
                <a href={`/blog/${item.slug}`}><h4 className="card-title">{item.title}</h4></a>
              {/* </Link> */}
              <h6 className="card-subtitle mb-2 text-muted">Content</h6>
              <p className="card-text">{item.content.substring(0,180)}</p> 
                                      {/* แสดงผลบทความไม่เกิน 180 ตัวอักษร */}
              <div className='text-black-50'>Author : {item.author}  ,
               Time : {new Date(item.createdAt).toLocaleString()}</div>
              { getUser() && (
                <div>
                <a className='btn btn-outline-primary' href={`/blog/edit/${item.slug}`}>Edit</a> &nbsp;
              {/* &nbsp; (Non Breaking Space) */}
              <button className='btn btn-outline-danger' onClick={()=>confirmDelete(item.slug)} >Delete</button>
                </div>
              ) }
            </div><hr/>
          </div>
        )
      })}
      
    </div>
  );
}

export default App;
