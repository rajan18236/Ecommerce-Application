const express = require("express");
const router = express.Router()
const {registerUser,loginUser,logoutUser} = require("../controllers/authController");
const {isLoggedIn} = require("../middlewares/authMiddleware");


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",isLoggedIn,logoutUser);


module.exports = router