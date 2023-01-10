// Connect with database จักการเกี่ยวกับการประมวลผล   การเชื่อมต่อกับฐานข้อมูล คือ route จะจัดการเส้นทางอย่างเดียว
const slugify = require("slugify")
const blogSchema = require("../models/blogsschema") //นำ modal blog เข้ามาเพื่อบันทึกข้อมูล
const { v4 : uuidv4 } = require('uuid');

// Create Data
exports.create = (req,res) => {
    const {title,content,author,slugInput} = req.body // destucturing เพื่อเก็บค่าของตัวแปร
    // const slug = slugify(slugInput); // collect slug เพื่อเอาเป็น url 
    let slug = slugify(title)

    //Slug validate
    if(!slug) {
        slug = uuidv4(); // slug = empty when เป็นภาษาไทย ให้ใส่ค่าเป็น uuid
    }


    
    // Validate
    switch(true) { //ให้ request title เป็น true เพื่อตรวจสอบแต่ละเคสที่เข้ามา
        case !title : //ถ้า title เป็นค่าว่างให้ response status 400 badrequest และโชว์ข้อความ Plase input title
            return res.status(404).json({error:`Plase input title !!`})
            break;
        case !content :
            return res.status(400).json({error:`Plase input content !!`})
            break;
    }   
    
    // res.json({ เป็นการทดสอบการส่งข้อมูลเฉยๆ
    //         // data:req.body // เอา request ที่ส่งมาเป็น object เก็บเป็น object ส่วนนี้คือส่วนที่จะส่งไปเก็บใน DB
    //     data:{title,content,author,slug}
    // })

    // บันทึกข้อมูล
    blogSchema.create({title,content,author,slug},(err,blog) => {
        console.log(err)
        if(err) {
            res.status(400).json({error:`Error code : ${err.code}`})
        }
        res.json(blog)
    })


}


// Get Data
exports.getAllBlogs =(req,res)=> {
    blogSchema.find({}).exec((err,blogs) => {
        res.json(blogs)
    })
}

// Get Blog ที่สนใจ
exports.singleBlog =(req,res)=> {
    const {slug} = req.params; // user send params คือ slug ที่สนใจมาเราก็เอามาเข้า mongoose เพื่อค้นหา
    blogSchema.findOne({slug}).exec((err,blog) => {
        res.json(blog)
    })
}

// remove
exports.remove = (req,res) => {
    const {slug} = req.params;
    blogSchema.findOneAndRemove({slug}).exec((err,blog) => {
        if (err) {  console.log(err)  }
        res.json({
            message:"Delete success!"
        })
    })
}

// update or edit blog
exports.update = (req,res) => {
    const {slug} = req.params; // รับ slug ที่ส่งมาเป็นเงื่อนไงเอาไว้อัพเดท
    // ส่งข้อมูล มาอัพเดทหรือแก้มี => title,content,author
    const {title,content,author} = req.body // ไปเรียกข้อมูลมาเก็บไว้ใน title content author เพื่อจะเอาไปเข้า findOneAndUpdate
    // db.collection.findOneAndUpdate( filter, update, options )
    blogSchema.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog) => {
        if (err) {  console.log(err)  }
        res.send(blog) // res.json ก็ได้
    })
}


/* result 
    result จากการทำ slug
    "data": {
        "title": "Test send data to db",
        "content": "test send db by post",
        "author": "kloof.dev",
        "slug": "Test-send-data-to-db"
    }   

*/