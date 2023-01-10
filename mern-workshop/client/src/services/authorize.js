// Collect token / usename => session storage
export const authenticate = (respose,next) => {
    // start browser and request to api ได้ข้อมูลอะไรเก็บมาเราจะเช็คผ่าน window มีค่าใช่ไหม?
    if (window !== "undefined") {
    // Collect data to session storage
        // Create session storage เก็บ token แลพะ user
        sessionStorage.setItem("token",JSON.stringify(respose.data.token)) //stringify เปลี่ยน string to JSON
        // Collect dataname "token", date = JSON.stringify(respose.data.token)
        sessionStorage.setItem("user",JSON.stringify(respose.data.username))
    }
    next()
}

// เป็น part service ให้บริการ token and user data 
// Pull token data 
export const getToken=()=> {
    if(window !== 'undefined') { // มีการเปิดใช้งานตัวเว๊ปหรือ run applicationไหม
        if(sessionStorage.getItem('token')) { // Check login มีการเอา token มาเก็บไว้ไหม 
            return JSON.parse(sessionStorage.getItem("token")) // Change JSON to Sring for use
        } else {
            return false // ไม่มี token
        }
    }
}

// Pull user data
export const getUser=()=> {
    if(window !== 'undefined') { // มีการเปิดใช้งานตัวเว๊ปหรือ run applicationไหม
        if(sessionStorage.getItem('user')) { // Check login มีการเอา user มาเก็บไว้ไหม 
            return JSON.parse(sessionStorage.getItem("user")) // Change JSON to Sring for use
        } else {
            return false // ไม่มี user
        }
    }
}

// Logout
export const logout = (next)=> {
    if(window !== 'underfined') {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        // window.location.replace('/')
        
    }
    next()
}