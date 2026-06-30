const productModel = require("../models/productModel");
const cloudinary = require("../config/cloudinaryConfig");

const createProduct = async (req, res) => {
    try {
        const { productName, price, description, image, category } = req.body;

        if (!productName || price == null || !description || !image || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }


        let cloudinaryRespones = await cloudinary.uploader.upload(image, { folder: "products" })
        const product = await productModel.create({
            productName,
            image: cloudinaryRespones.secure_url,
            price,
            description,
            category,
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.error("Create product error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { createProduct }