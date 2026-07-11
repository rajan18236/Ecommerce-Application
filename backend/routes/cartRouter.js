const express  = require('express')
const router =  express.Router()
const {isLoggedIn} = require("../middlewares/authMiddleware")
const {addToCart, removeFromCart} = require("../controllers/cartController")


router.put("/addToCart", isLoggedIn, addToCart);
router.delete("/removeFromCart",isLoggedIn,removeFromCart);
// router.patch()
module.exports = router