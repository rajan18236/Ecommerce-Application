const express = require('express');
const router = express.Router();
const {createProduct} = require("../controllers/productController")
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddleware")

router.post("/create", isLoggedIn, isAdmin, createProduct)

module.exports = router