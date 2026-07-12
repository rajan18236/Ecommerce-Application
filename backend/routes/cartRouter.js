const express = require('express')
const router = express.Router()
const { isLoggedIn } = require("../middlewares/authMiddleware")
const { addToCart, removeFromCart, getAllCartItems, updateCartQty } = require("../controllers/cartController")


router.put("/addToCart", isLoggedIn, addToCart);
router.delete("/removeFromCart", isLoggedIn, removeFromCart);
router.get("/getAllCartItems", isLoggedIn, getAllCartItems);
router.patch("/updateCart",isLoggedIn,updateCartQty)
module.exports = router