const userModel = require("../models/userModel");

const addToCart = async (req, res) => {
    try {
        let { product } = req.body
        let user = await userModel.findById(req.user._id)
        let idx = user.cartItems.findIndex(item => item.product.toString() === product)
        if (idx !== -1) {
            user.cartItems.splice(idx, 1)
            await user.save();
            return res.status(200).json({ success: false, message: "product removed from cart" })
        } else {
            user.cartItems.push({
                product,
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
        const { cartItemId } = req.body;
        const user = await userModel.findById(req.user._id)
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Request" })
        }
        const item = await user.cartItems.findIndex(item => item._id.toString() === cartItemId)
        if (item === -1) {
            return res.status(400).json({ success: false, message: 'Product not found' })
        } else {
            user.cartItems.splice(item, 1);
            await user.save()
            res.status(200).json({ success: true, message: 'Product remove from cart successfully' })
        }
    } catch (error) {
        console.log("Error on removeFromCart:", error.message)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const getAllCartItems = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).populate("cartItems.product")
        if (!user) {
            return res.status(400).json({ success: false, message: 'User Not Found' })
        }
        let items = user.cartItems
        res.status(200).json({ success: true, message: 'Successful to get cart item', items })
    } catch (error) {
        console.log("Error on getAllCartsItems:", error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const updateCartQty = async (req, res) => {
    try {
        const { cartId, qty } = req.body;
        const user = await userModel.findById(req.user._id)
        let idx = user.cartItems.findIndex(item => item._id.toString() === cartId)
        if (idx === -1) {
            return res.status(400).json({ success: false, message: 'Product not found' })
        } else {
            user.cartItems[idx].productQty = qty;
            await user.save()
            res.status(200).json({ success: true, message: 'Successfully to update' })
        }
    } catch (error) {
        console.log("Error on updateCartQty:", error.message);

    }

}
module.exports = { addToCart, removeFromCart, getAllCartItems, updateCartQty }