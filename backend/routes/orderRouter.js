const express = require("express");
const router  = express.Router();
const { isLoggedIn } = require("../middlewares/authMiddleware");
const {getOrders,getAllOrders}  = require("../controllers/orderController")
const {authorizeRoles} = require("../middlewares/authMiddleware")


router.get("/my-orders",isLoggedIn,getOrders);
router.get("/getAll",isLoggedIn,authorizeRoles('admin'),getAllOrders);

module.exports = router