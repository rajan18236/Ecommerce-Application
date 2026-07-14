const express = require("express");
const router = express.Router()
const { checkAuth, registerUser, loginUser, logoutUser } = require("../controllers/authController");
const { isLoggedIn } = require("../middlewares/authMiddleware");

router.get("/me",isLoggedIn,checkAuth)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isLoggedIn, logoutUser);


module.exports = router