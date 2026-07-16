const productModel = require("../models/productModel")
const cloudinary = require("../config/cloudinaryConfig")

const createProduct = async (req, res) => {
    try {
        const {
            productName,
            price,
            description,
            image,
            category,
        } = req.body;

        if (!productName || !price || !description || !image || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(image, {
            folder: "products",
        });

        const product = await productModel.create({
            productName,
            image: cloudinaryResponse.secure_url,
            price,
            description,
            category,
            seller: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.error("Create product error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find().populate("seller")
        res.status(200).json({
            success: true,
            message: "Successfully get all products ",
            products
        })

    } catch (error) {
        console.log("Error on getallProducts:", error.message)
        return res.status(404).json({ success: false, message: "Internal server error" })
    }
};

const getProductCategory = async (req, res) => {
    try {
        const { category } = req.params
        if (!category) {
            return res.status(400).json({ success: false, message: "Category Not found" })
        }
        const products = await productModel.find({ category }).populate("seller")
        res.status(201).json({
            success: true,
            message: 'Request Successfully',
            products
        })
    } catch (error) {
        console.log("Error on getProductCategory:", error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
};

const getProductsOfAdmin = async (req, res) => {
    try {
        const products = await productModel.find({ seller: req.user._id })
        if (!products) {
            return res.status(400).json({ message: 'Products not found' })
        };
        res.status(200).json({
            success: true,
            products,
        })
    } catch (error) {
        console.log("Error on getProductOfAdmin:", error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
};

const deleteProduct = async (req, res) => {
    try {
        let { productId } = req.params;
        let product = await productModel.findByIdAndDelete(productId);
        if (!product) {
            return res.status(400).json({ success: false, message: "Invalid Request product not found" });
        }
        res.status(200).json({ success: true, message: "Product removed", product })
    } catch (error) {
        console.log("Error On deleteProduct:", error.message);
        return res.status(500).json({ success: false, err: error.message })

    }
};

const getProductById = async (req, res) => {
    try {
        let { productId } = req.params
        let product = await productModel.findById(productId);
        if (!product) {
            return res.status(400).json({ success: false, message: 'Product not found' })
        };
        res.status(200).json({ success: true, product })
    } catch (error) {
        console.log("Error on get product by id:", error.message);
        return res.status(500).json({ success: false, err: error.message })
    }
};

const editProduct = async (req, res) => {
    try {
        let {productData } = req.body;
        console.log( productData);

        let product = await productModel.findByIdAndUpdate(productData._id  ,  productData );
        if (!product) {
            return res.status(400).json({ success: true, message: 'Invalid Request product not found' })
        };
        res.status(200).json({ success: true, message: 'Product edit successfully', product })
    } catch (error) {
        console.log("Error On EditProduct:", error.message);
        return res.status(500).json({ success: false, err: error.message })

    }
}
module.exports = { createProduct, getAllProducts, getProductCategory, getProductsOfAdmin, deleteProduct, editProduct, getProductById }