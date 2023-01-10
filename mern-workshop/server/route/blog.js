//Route รับส่ง เกี่ยวกับการส่ง request จากผู้ใช้ และทำงานกับ controller

const express = require("express")
const router = express.Router()
const { create,getAllBlogs,singleBlog,remove,update } = require("../controller/blogController")
const { requireLogin } = require("../controller/authController")
        // router.get('/blog',(req,res) => { ไม่ต้องเขียน callback แล้วเพราะเราจัดการส่วนนี้ใน controller
        //     res.json({
        //         data:"Welcome to router blog!!"
        //     })
        // })

// จะมี create remove update ที่เราต้องเอา middleware requireLogin เพื่อตรวจสอบ token จากการ login
// ไปไว้ด้านหน้าก่อนที่จะทำการ process นั้นๆ เพื่อไม่ให้มีการเข้าไปแก้ไขอะไรต่างๆ มั่วๆถ้าไม่ใช่ admin
        
router.post('/create', requireLogin, create) 
// สร้าง blog แต่ต้อง login ก่อน
// ถ้าไม่ login จะขึ้นว่า UnauthorizedError: No authorization token was found
router.delete('/blog/:slug', requireLogin, remove) // Delete blog
router.put('/blog/:slug' , requireLogin, update) // Update blog content

router.get('/blogs', getAllBlogs) // ดึงข้อมูลมาใช้งานโดยดึงทุกอัน  
router.get('/blog/:slug',singleBlog)// สอบถามข้อมูลblogที่สนใจตามด้วย slug โดยอ้างตาม slug


module.exports = router;