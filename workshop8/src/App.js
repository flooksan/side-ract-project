import React, { useState,useEffect } from 'react'
import './App.css'
import todoList from './assets/checklist.png'
import { v4 as uuidv4 } from 'uuid';
import List from './components/List';
import { Alert, AlertTitle, Stack, Modal, Typography, Box } from '@mui/material/';


function App() {
    // State
    const [inputTodo,setInputTodo] = useState('')
    const [list,setList] = useState([]) // list เปล่าเอาไว้เก็บ list todo ที่เรา input เข้ามา
    const [typeAlert,setTypeAlert] = useState({show:false, type:'info', text:'Standard'}) // state severity มี warning,error,info,success
    const [checkEditItem , setcheckEditItem] =useState(false)
    const [editId,setEditId] = useState('')
    // Effect
        // useEffect (()=> {
        //     setType
        // },[list])
    
    // Function
    const delayTimeShow = () => {
        // เป็น function ตั้งเวลาให้ปิด show alert component 
        // console.log('Alert close in 2 sec!')
        const delay = setTimeout(()=> {setTypeAlert({ show:false, type:'', text:'' })},1750);
        // clear timeout
        return () => clearTimeout(delay)
    }

    const submitData = (event) =>{
        // ดักจับ event ใน form when click submit 
       event.preventDefault() // และให้คงค่าทุกสิ่งใน form ก่อนที่จะ refresh หน้า และทุกฟิล
        if (!inputTodo) {
            setTypeAlert({show:true, type:'warning', text:'Input Invalid Text!'})
            // ตั้งเวลาให้ปิด show component โดยทำฟังก์ชั่น delayTimeShow
            delayTimeShow()
        } else {
            const newItem = {
                id: uuidv4(),
                title: inputTodo, //เอา todo ที่เราเขียนใน input มาเป็น value ของ title
            }
            setList([...list, newItem]) //เอาข้อมูลจากใน state list มาโชว์ทั้งหมดโดยใช้ spread operator จากนั้นเอา newItem object ด้านบนไปใส่ต่อ
            setInputTodo('') // clear input
            setTypeAlert({show:true, type:'success', text:'Input Text Success!'})
            delayTimeShow()
            // console.log(list)
        }
    }

    const removeItem =(id) => {
        
        const newList = list.filter((item)=>item.id !== id);
        setList(newList) //เขียนแค่นี้ก็ได้
        // setList([...newList])
        setTypeAlert({show:true, type:'success', text: `Delete Todo Success!`})
        delayTimeShow()
        
    }

    

    const editItem = (id) => {
        setcheckEditItem(true)
        // setTypeAlert({show:true, type:'info', text: `Edit Todo Success!`})
        // delayTimeShow()
        const searchItem =list.find((item)=>item.id === id)
        setEditId(searchItem )
        console.log('BF edit',editId)
        
    }

    const editInModal = (event) => {
        event.preventDefault()
        console.log('editInModal')
        if (editId.title) {
            console.log('valid')
           const newResult= list.map((item) => {
                if(item.id === editId.id) {
                    // console.log(item.id,editId.title)

                    return {...item,title:editId.title} // หมายความว่าให้ List ตัวที่ id ของlist เท่ากับ idของ editId tilte ถูกเปลี่ยนเป็น title ของ editId.title 
                }
                return item
            })
            // console.log('new',newResult)
            // setList ใหม่ = newResult
            setList(newResult)
            // Close Modal and clear
            setcheckEditItem(false)
            setEditId('')
            console.log('editId Clear!! ',editId)
            // Call Alert
            setTypeAlert({show:true, type:'info', text: `Edit Todo Success!`})
            delayTimeShow()
        }
        else {
            console.log('invalid')
            setTypeAlert({show:true, type:'warning', text:'Input Invalid Text!'})
            delayTimeShow()
        }
    }
    
  
  return (
    <section className='container'>
        <div className='header'>
        <img src={todoList} alt='todolist' width='40px' /> 
        <h1>TodoList App</h1>
        </div>
          <Stack sx={{ width: '100%',
            marginBottom: '10px',
            
            }} spacing={2}>
              {/* Show type alert */}
              { (typeAlert.show && !checkEditItem) &&
                   <Alert severity={typeAlert.type} sx={{ fontFamily: 'Montserrat', }} >
                       <AlertTitle sx={{ fontFamily: 'Montserrat', }} >{typeAlert.type}</AlertTitle>
                       This is an {typeAlert.type} alert — <strong>{typeAlert.text}</strong>
                       {/* {console.log('main alert')} */}
                   </Alert>
              }
          </Stack>
        <form className='form-group' onSubmit={submitData}>
            <input type="text" className="text-input" 
                onChange={(event)=>{setInputTodo(event.target.value)}}
                value={inputTodo}
        />
            <button type="submit" className='submit-btn'>เพิ่มข้อมูล</button>
        </form>
        <section className='list-container'>
              {setcheckEditItem &&
                  <Modal
                      open={checkEditItem}
                      onClose={()=>setcheckEditItem(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                  >
                      <Box sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '45%',
                          transform: 'translate(-50%, -50%)',
                          width: 500,
                          bgcolor: 'background.paper',
                          border: '2px solid #000',
                          boxShadow: 24,
                          p: 4,
                        }}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                              Edit Todo
                              {(typeAlert.show && checkEditItem) &&
                                
                                  <Alert severity={typeAlert.type} sx={{ fontFamily: 'Montserrat', marginBottom: '10px' }} >
                                      <AlertTitle sx={{ fontFamily: 'Montserrat', }} >{typeAlert.type}</AlertTitle>
                                      This is an {typeAlert.type} alert — <strong>{typeAlert.text}</strong>
                                      {/* {console.log('modal alert')} */}
                                  </Alert>
                              }
                          </Typography>
                          <form className='form-modal' onSubmit={editInModal} >
                            <input type='text' className='input-modal' defaultValue={editId.title}
                                onChange={(event)=>setEditId({ id:editId.id ,title:event.target.value })} />
                            <button className='btn-edit'>Edit</button>

                            
                          </form>
                      </Box>
                  </Modal>
               
              }
            {list.map((data,index) => {
                return <List key={index} {...data}  removeItem={removeItem} editItem={editItem} /> //props data ไปโดยส่งไปทั้ง id และ title ไม่ต้องมาเขียน id={data.id} , title={data.title}
            })}
        </section>
    </section>
  )
}

export default App