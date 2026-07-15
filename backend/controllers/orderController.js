const orderModel = require("../models/orderModel");


module.exports.getOrders = async (req, res) => {
    try {
    const orderItems = await orderModel.find({ userId: req.user._id }).populate("products.product");
        if (!orderItems) {
            return res.status(400).json({ message: 'Invalid Request: Order Not found' })
        }
        res.status(200).json({
            success: true,
            message: "Successful to get Order of user",
            orderItems,
        })

    } catch (error) {
        console.log("Error on getting Order:", error.message);
        return res.status(500).json({
            message: error.message
        })
    }
};