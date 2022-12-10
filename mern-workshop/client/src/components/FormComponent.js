import React,{ useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import Swal from 'sweetalert2'

function FormComponent() {
    // State collect title,content and author
    const [state,setState] = useState({
        title:"",
        content:"",
        author:"",
    });

    //Destructure เพื่อเอาไปใช้ง่ายๆ
    const {title,content,author} = state

    // Set value state
    const inputValue = fieldName => event => { 
        /* เป็นการเขียน function ซ้อนฟังก์ชันเพื่อที่ว่าเราไปเปลี่ยนแปลงค่าที่ title มันก็จะส่ง title มาเป็นname 
            หลังจากนั้นก็เอามาเข้า funtion event ต่อ
        */
            // console.log(fieldName,"=",event.target.value) 
        setState({...state,[fieldName]:event.target.value}) 
        //เอาทุกตัวมา spread แล้วจากนั้นเราพิมพ์ไปที่ไหนตามค่า fieldName มันจะไป set ค่า field นั้นเป็นค่าที่พิมพ์
    }
    
    // Fuction
    const submitForm =(e)=> { //function ที่จะเอา object ไปเก็บไว้ที่ฐานข้อมูล
        e.preventDefault();
        // console.table({title,content,author}) // log table of object ออกมา
        // console.log("API URL = ",process.env.REACT_APP_API) // log env มาดู URL API
        
        // บันทึกข้อมูลโดย axios
        axios
        .post(`${process.env.REACT_APP_API}/create`,{title,content,author}) 
            // เรียก axios.method(`URL/path`) แล้วส่งค่า {title,content,author} เข้าไป
        .then(response => {
            //axios เป็น promise เราเลยดักด้วย .then
            Swal.fire(
                'Good job!',
                'Saved in database!',
                'success'
              )
            setState({...state,title:"",content:"",author:""}) //set ค่าให้เป็นค่าว่าง

        }).catch(err => {
            //error เอามาจาก controller ใน toppic validate จะมี error สองอันเป็น json คือ error !title and error !content
            console.log(err.response.data.error) 
            Swal.fire(
                'Error!',
                err.response.data.error,
                'error'
              )
        })
    }
  
    return (
    <div className='cotainer p-5'>
        <Navbar/>
        <h1>Write Blog</h1>
        {/* {JSON.stringify(state)} {/* แสดงค่า state ออกมา test ก่อนตอนที่เราจะไปทำอย่างอื่น */}  
        <form onSubmit={submitForm}>
            
            <div className="form-group mb-3">
                <label>Title : </label>
                <input type="text" className='form-control' 
                value={title} 
                onChange={inputValue("title")}

                />
            </div>
            
            <div className="form-group mb-3">
                <label>Content : </label>
                <textarea className='form-control' 
                    value={content} 
                    onChange={inputValue("content")}
                ></textarea>
                {/* <input type="area" className='form-control' /> */}
            </div>
            
            <div className="form-group mb-3">
                <label>Author : </label>
                <input type="text" className='form-control' 
                    value={author} 
                    onChange={inputValue("author")}
                />
            </div>

            <br/>
            <input type="submit" value="submit" className="btn btn-primary"/>
    
        </form>
    </div>
  )
}

export default FormComponent