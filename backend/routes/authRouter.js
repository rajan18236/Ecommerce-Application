const express = require("express");
const router = express.Router()
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const { isLoggedIn } = require("../middlewares/authMiddleware");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isLoggedIn, logoutUser);
router.get("/me", isLoggedIn, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});

module.exports = router