const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/authMiddleware");
const {createCheckoutSession, checkoutSuccess} = require("../controllers/paymentController")

router.post("/create-checkout-session",isLoggedIn,createCheckoutSession)
router.post("/checkout-success",isLoggedIn,checkoutSuccess)


module.exports = router;