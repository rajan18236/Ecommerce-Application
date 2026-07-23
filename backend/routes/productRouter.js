const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductCategory, getProductsOfAdmin, deleteProduct, editProduct, getProductById, disableProduct } = require("../controllers/productController")
const { isLoggedIn, authorizeRoles } = require("../middlewares/authMiddleware");

router.get("/getAll", getAllProducts)
router.post("/create", isLoggedIn, authorizeRoles('seller'), createProduct)
router.get("/my-products", isLoggedIn, authorizeRoles('seller'), getProductsOfAdmin)
router.delete("/delete/:productId", isLoggedIn, authorizeRoles('seller', 'admin'), deleteProduct)
router.put("/edit", isLoggedIn, authorizeRoles('seller', 'admin'), editProduct)
router.get("/:productId", isLoggedIn, authorizeRoles('seller', 'admin'), getProductById)
router.get("/category/:category", getProductCategory)
router.put('disable', isLoggedIn, authorizeRoles('admin'), disableProduct)


module.exports = router