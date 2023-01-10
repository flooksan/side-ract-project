const jwt = require("jsonwebtoken")
const  { expressjwt }   = require("express-jwt")
// expressjwt เป็น function ถ้าเราประกาศปกติจะทำให้มัน error expressjwt is not function เลยต้อง destructure

const {PASSWORD,JWT_SECRET} = process.env

exports.login = function (req, res) {
    const {username,password} = req.body
    if(password === PASSWORD) {
    //login system
        //Create token เอา username เข้ามาใช้งาน  
            //jwt.sign(payload, secretOrPrivateKey, [options, callback])
        const token = jwt.sign({username},JWT_SECRET,{expiresIn: '1h'})
        res.json({token,username,text:"Test another send in token"})
    
    } else { 
        res.status(400).json({ error:"Password incorrect!" }) 
    }
    
}

// Middleware ตรวจสอบ Token
exports.requireLogin = expressjwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
})