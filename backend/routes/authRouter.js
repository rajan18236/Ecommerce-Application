const express = require("express");
const router = express.Router()
const { checkAuth, registerUser, loginUser, logoutUser, removeCartItems, getAllUser } = require("../controllers/authController");
const { isLoggedIn, authorizeRoles } = require("../middlewares/authMiddleware");

router.get("/me", isLoggedIn, checkAuth);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isLoggedIn, logoutUser);
router.get("/clearCartItems", isLoggedIn, removeCartItems);
router.get("/getUsers", isLoggedIn, authorizeRoles("admin"), getAllUser);


module.exports = router