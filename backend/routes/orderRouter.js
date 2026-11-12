const express = require("express");
const router  = express.Router();
const { isLoggedIn } = require("../middlewares/authMiddleware");
const {getOrders,getAllOrders,deleteOrder}  = require("../controllers/orderController")
const {authorizeRoles} = require("../middlewares/authMiddleware")


router.get("/my-orders",isLoggedIn,getOrders);
router.get("/getAll",isLoggedIn,authorizeRoles('admin'),getAllOrders);
router.delete("/delete/:orderId",isLoggedIn,authorizeRoles('admin'),deleteOrder);

module.exports = router