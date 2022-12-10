//Route รับส่ง เกี่ยวกับการส่ง request จากผู้ใช้ และทำงานกับ controller

const express = require("express")
const router = express.Router()
const { create,getAllBlogs,singleBlog,remove,update } = require("../controller/blogController")

        // router.get('/blog',(req,res) => { ไม่ต้องเขียน callback แล้วเพราะเราจัดการส่วนนี้ใน controller
        //     res.json({
        //         data:"Welcome to router blog!!"
        //     })
        // })
router.post('/create',create) // สร้าง blog
router.get('/blogs',getAllBlogs) // ดึงข้อมูลมาใช้งานโดยดึงทุกอัน
router.get('/blog/:slug',singleBlog)// สอบถามข้อมูลblogที่สนใจตามด้วย slug โดยอ้างตาม slug
router.delete('/blog/:slug',remove) // Delete blog
router.put('/blog/:slug',update) // Update blog content


module.exports = router;