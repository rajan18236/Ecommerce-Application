const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductCategory, getProductsOfAdmin, deleteProduct, editProduct,getProductById } = require("../controllers/productController")
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddleware");

router.get("/getAll", getAllProducts)
router.post("/create", isLoggedIn, isAdmin, createProduct)
router.get("/my-products", isLoggedIn, isAdmin, getProductsOfAdmin)
router.delete("/delete/:productId", isLoggedIn, isAdmin, deleteProduct)
router.put("/edit", isLoggedIn, isAdmin, editProduct)
router.get("/:productId", isLoggedIn, isAdmin, getProductById)
router.get("/category/:category", getProductCategory)


module.exports = router