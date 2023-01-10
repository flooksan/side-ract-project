import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { authenticate, getToken } from '../services/authorize';
import { withRouter } from 'react-router-dom';


function LoginComponent(props) {
    const [state,setState] = useState({
        username:"",
        password:"",
    });
    const {username,password} = state

    const inputValue = fieldName => event => {
        setState({...state,[fieldName]:event.target.value})
    }
    
    async function loginPost () {
       try {
        const response = await axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
        // import auth มาใช้ pass response and next(ตัวนี้จะเป็นการ next redirectหน้า)ไป
        // แล้วไปใส่ props ตรง LoginComponent ตัว props จะเก็บข้อมูล path ที่เราจะทำงานเช่นตอนนี้อยู่ที่ /login แต่เมื่อ login เสร็จจะไป path Createblog 
        // แต่จะทำได้เราต้องกำหนด WithRouter ไป login component
        authenticate(response,()=>props.history.push('/create'))
        window.location.reload(); // reload หน้าเว๊ปเพราะของเรามันไม่ reload เอง
        // window.location.replace('/create') // ใช้แบบนี้ก็ได้่
        } catch (err) { console.log(err.response.data.error) } // เอาเฉพาะข้อความ error ว่ารหัสผ่านไม่ถูกต้อง
    }

    const submitForm =(e)=> {
        e.preventDefault();
        //send username pass ไปขอ token and login ซึ่งเราส่ง username and password ไปจะได้ username + token คืนมา
        loginPost()
        
    }

    // เวลา login ถ้าเราไปใส่path /login มันจะกลับมาหน้า login ใหม่ได้ดังนั้นเลยมาเช็คว่าถ้า
    useEffect(()=>{
        
        getToken() && window.location.replace('/')
        // replace('/') getToken() && props.history.push('/') // ถ้ามี Token จากการ Login แล้วให้ redirect กลับไปหน้าแรก
    },[])
    
  
  return (
    <div className='cotainer p-5'>
        <Navbar/>
        <h1>Login</h1> 
        <form onSubmit={submitForm}>
            
            <div className="form-group mb-3">
                <label>Username : </label>
                <input type="text" className='form-control' 
                value={username} 
                onChange={inputValue("username")}

                />
            </div>
            
            <div className="form-group mb-3">
                <label>Password : </label>
                <input type="password" className='form-control' 
                    value={password} 
                    onChange={inputValue("password")}
                />
            </div>

            <br/>
            <input type="submit" value="login" className="btn btn-primary"/>
    
        </form>
    </div>
  )
}

export default withRouter(LoginComponent) 
// เอา with router เขียนร่วมกับ ตัวนี้ LoginComponent ให้เก็บประวัติว่าตอนนี้อยู่ login เมื่อ login เสร็จให้เปลี่ยน Path
// โดยไปทำที่กระบวนการ React Router แต่ต้องทำหลัง login เสร็จ โดยใส่ต่อจาก authenticate ว่าให้ props.history.push("/create") จะไป path /create
// ในตัว react router v.6 จะเปลี่ยนเป็น useNavigate แทน