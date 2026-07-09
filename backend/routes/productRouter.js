const express = require('express');
const router = express.Router();
const {createProduct, getAllProducts,getProductCategory} = require("../controllers/productController")
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddleware");
const { getMaxListeners } = require('../models/adminModel');

router.post("/create", isLoggedIn, isAdmin, createProduct)
router.get("/getAll", getAllProducts)
router.get("/category/:category", getProductCategory)
module.exports = router