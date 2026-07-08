const express = require('express');
const router = express.Router();
const {createProduct, getAllProducts} = require("../controllers/productController")
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddleware");
const { getMaxListeners } = require('../models/adminModel');

router.post("/create", isLoggedIn, isAdmin, createProduct)
router.get("/getAll", getAllProducts)
module.exports = router