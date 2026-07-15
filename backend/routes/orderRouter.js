const express = require("express");
const router  = express.Router();
const { isLoggedIn } = require("../middlewares/authMiddleware");
const {getOrders}  = require("../controllers/orderController")


router.get("/my-orders",isLoggedIn,getOrders)

module.exports = router