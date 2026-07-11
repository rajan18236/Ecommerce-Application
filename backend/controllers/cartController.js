const userModel = require("../models/userModel");

const addToCart = async (req, res) => {
    try {
        let { product } = req.body
        let user = await userModel.findById(req.user._id)
        let idx = user.cartsItem.findIndex(item => item.productId == product)
        if (idx) {
            user.cartsItem.splice(idx, 1)
            await user.save();
            return res.status(200).json({ success: true, message: "product removed from cart" })
        } else {
            user.cartsItem.push({
                productId: product,
                productQty: 1
            })
            await user.save();
            return res.status(202).json({ success: true, message: "product added on cart" })
        }
    } catch (error) {
        console.error("Error on addToCart:", error.message);
        return res.status(405).json({ success: false, message: 'Internal server error' })
    }


}

const removeFromCart = async (req, res) => {
    try {
        let { product } = req.body;
        let user = await userModel.findById(req.user._id)
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Request" })
        }
        if (user.cartsItems.indexOf(product) === -1) {
            return res.status(400).json({ success: false, message: 'Product not found' })
        } else {
            user.cartsItems.splice(user.cartsItems.indexOf(product), 1)
            return res.status(203).json({ success: true, message: "Product remove successfully" })
        }
    } catch (error) {
        console.log("Error on removeFromCart:", error.message)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports = { addToCart, removeFromCart }