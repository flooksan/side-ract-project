const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const blogRoute = require('./route/blog')
const authRoute = require('./route/auth')


const app = express()

// Connect cloud database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology:false
})
.then(()=> console.log("Connected Database!!"))
.catch((err)=>console.log(err))

// middleware
app.use(express.json()) // ให้ server เป็นส่วนที่ให้บริการเกี่ยวกับ API จึงเรียกใช้ตัวนี้
app.use(cors())
app.use(morgan("dev")) // ดักตัว request dev short tiny ใช้ได้หมด

// route
        // app.get("*",(req,res) => { //test route
        //     res.json({
        //         data:"message from server"
        //     })
        // }) // start route ไม่ว่าจะเข้ามาโดยระบุเป็น url อะไรก็ได้

app.use('/api',blogRoute)
app.use('/api',authRoute) // path ชื่อเหมือนกันแต่ไปใช้ authRoute แทน

// port
const port = process.env.PORT || 8080; // ใช้ในกรณีถ้าเราไม่ได้ set port ไว้จะมาใช้ 8080 แทน
app.listen(port, ()=> console.log(`Start server in port:${port}`))