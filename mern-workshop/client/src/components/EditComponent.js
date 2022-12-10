import React,{ useState,useEffect } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import Swal from 'sweetalert2'

function EditComponent(props) {
    // State collect title,content and author
    const [state,setState] = useState({
        title:"",
        content:"",
        author:"",
        slug:"",
    });

    //Destructure เพื่อเอาไปใช้ง่ายๆ
    const {title,content,author,slug} = state

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
        // ดึง data จาก api ตาม slug to edit
    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`) // ไปดึงข้อมูลมา
        .then(response => {
            const {title,content,author,slug} = response.data
            setState({title,content,author,slug})  // เอา slug มาเพื่อเวลาเราไปเปลี่ยนข้อมูล title,content,author มันจะได้เอาไป save ถูกตัว คือเอาไป save ทับทั้ง 3 ตัวใน slug เดิม
            // เขียนเป็น setState({...state,title,content,author,slug}) ก็ได้
        }).catch(err => Swal('Error',`${err}!!`,'error'))
        // eslint-disable-next-line
      }, [])

        // เราทำเป็น JSX เพื่อจะเอาไปใช้ใน return ด้านล่าง เอามาไว้แก้ไขข้อมูลฝั่งหน้าบ้าน
      const showUpdateForm=()=>(
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
            <input type="submit" value="Update" className="btn btn-primary"/>
    
        </form>
      )
      
      const submitForm =(e)=> { //function ที่จะเอา object ที่ edit ไปเก็บไว้ที่ฐานข้อมูล ที่ตรงกับ slug นั้นๆ
              e.preventDefault();
              // console.table({title,content,author}) // log table of object ออกมา
              // console.log("API URL = ",process.env.REACT_APP_API) // log env มาดู URL API
              
              // บันทึกข้อมูลโดย axios
              axios // frontend : axios.put /server/blog/slug >> backend : router.put('/blog/:slug',update)
              .put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author}) 
                  // เรียก axios.put`URL/path/slug`) แล้วส่งค่า {title,content,author} เข้าไปเพื่ออัพเดทการแก้ไขค่าของเรา
              .then(response => {
                  //axios เป็น promise เราเลยดักด้วย .then
                  Swal.fire(
                      'Good job!',
                      'Updated in database!',
                      'success'
                  )
                //   console.log(response)
                  const {title,content,author,slug} = response.data // เอาข้อมูลที่ save ไว้ใน database มาใช้งาน
                  // `data` is the response that was provided by the server เป็นของ axios ลองอ่าน doc ได้ https://axios-http.com/docs/res_schema
                  setState({title,content,author,slug})

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
        <h1>Edit Blog</h1>
        {showUpdateForm()} 
        {JSON.stringify(slug)}
        {/* showUpdateForm แสดงผลน่าตาของตัวอัพเดทข้อมูล เราสร้างเป็นฟังก์ชัน component ไว้ด้านบน return*/}
    </div>
  )
}

export default EditComponent