import React, { useState } from 'react'
import './FormComponent.css'

const FormComponent = () => {
//   state value
  const [username,setUserName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [rePassword,setRePassword] = useState('')
//   state error
  const [errUser,setErrUser] = useState('')
  const [errEmail,setErrEmail] = useState('')
  const [errPwd,setErrPwd] = useState('')
  const [errRePwd,setErrRePwd] = useState('')
// state color
const [userColor,setUserColor] = useState('')
const [emailColor,setEmailColor] = useState('')

// validation input
const validationForm = (event) => {
    // preventDefault() ไม่ทำการ reset data ใน input หลังจากกดปุ่ม summit
    event.preventDefault()
    if(username.length>8) {
        setErrUser('')
        setUserColor('green')
    }else{
        setErrUser('ป้อนชื่อผู้ใช้ 8 ตัวอักษร')
        setUserColor('red')
    }
    if(email.includes('@')) {
        // check emailมี @ ไหม
        setErrEmail('')
        setEmailColor('green')
    }else{
        setErrEmail('Email ไม่ถูกต้อง')
        setEmailColor('red')
    }
    if(password.length>=8) {
        setErrPwd('')
    }else{
        setErrPwd('รหัสผ่านต้องมี 8 ตัวอักษร')
    }
    if(rePassword !== '' && rePassword === password) {
        setErrRePwd('')
    }else{
        setErrRePwd('รหัสผ่านไม่ตรงกัน')
    }
}

// cancle
const clearInput = () => {
    setUserName(''); 
    setEmail('');
    setPassword('');
    setRePassword('');
    setErrUser('');
    setErrEmail('');
    setErrPwd('');
    setErrRePwd('');
}

    return (
    <div className='container'>
    <h2>Register Form</h2>
        <form className='form' onSubmit={validationForm}>
            <div className="form-control" >
                <label>Username</label>
                <input type='text'value={username} 
                style={{borderColor: userColor}}
                onChange={({target}) => {
                    // เขียนแบบปกติ 
                    // ตัว parameterต้องเป็น event ด้วย
                    // console.log(event.target.value); setUserName(event.target.value)
                    // เขียนแบบ destructure
                    
                    console.log(target.value); setUserName(target.value)

                }} ></input>
                <small style={{color: userColor}} >{errUser}</small>
            </div>
            <div className="form-control" >
                <label>Email</label>
                <input type='text' value={email} 
                style={{borderColor: emailColor}}
                onChange={({target}) => {setEmail(target.value)}} ></input>
                <small style={{borderColor: emailColor}} > {errEmail} </small>
            </div>
            <div className="form-control" >
                <label>Password</label>
                <input type='password' value={password} onChange={({target}) => {setPassword(target.value)}} ></input>
                <small>{errPwd}</small>
            </div>
            <div className="form-control" >
                <label>Confirm Password</label>
                <input type='password' value={rePassword} onChange={({target}) => {setRePassword(target.value)}} ></input>
                <small>{errRePwd}</small>
            </div>
            <div className='btn-container'>
                  <button className='btn-reg'>Register</button>
                  <button className='btn-can' onClick={clearInput}>Cancle</button>
            </div>
        </form>
    </div>
  )
}

export default FormComponent