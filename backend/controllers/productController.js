const productModel = require("../models/productModel");

const createProduct = async (req, res) => {
    try {
        const { productName, price, description, image, category } = req.body;
        if (!productName || !price || !description || !image || !category) {
            return res.status(500).json({ message: "All fields are required" })
        }
        const product = await productModel.create({
            productName,
            image,
            price,
            description,
            category
        })
        res.statu(200).json({ message: "Product created successfully" })
    } catch (error) {
        console.log("Create product error:", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}