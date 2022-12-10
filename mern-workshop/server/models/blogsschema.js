//design schema เราจะมี Title, Content, Author, slug(url ใส่ไปเพื่อให้มีความสวยงาม)
// มี timestamp ด้วย
const mongoose = require("mongoose");
/* อีกท่าในการเขียน const {model, Schema} = mongoose และ 
        // destructure model function and Schema constructor from mongoose
        const {model, Schema} = mongoose

        // create a schema
        const UserSchema = new Schema({
        username: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        age: Number,
        email: String
        }, {timestamps: true})

        // create a model
        const User = model("User", UserSchema)
*/

// Schema
const blogSchema = mongoose.Schema({
    title:{ // call Field title
    type:String, //type ของ title และบังคับว่าต้องใส่ห้ามเป็นค่าว่าง (required:true) 
    required:true,
    unique:true, // title ห้ามตั้งชื่อซ้ำ
    },
    
    content:{
        type:{},
        required:true
    },

    author:{
        type:String, //type ของ author และระบุว่า admin write blog เท่านั้น
        default:"Admin"
    },

    slug:{
        type:String,
        lowercase:true, 
        
    }
},{timestamps:true}) //เก็บช่วงเวลา วันเดือนปี เมื่อสร้าง blog

module.exports = mongoose.model("blogSchema",blogSchema) // ส่งออก model blogSchema ในชื่อ blogSchema