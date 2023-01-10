const express = require("express")
const router = express.Router()
const {login} = require('../controller/authController')

// Other admin can login to edit blog
// client req ==> router
router.post('/login',login)


module.exports = router;