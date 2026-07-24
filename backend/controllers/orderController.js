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

module.exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find()
        if (!orders) {
            return res.status(400).json({ message: 'No order Added' })
        }
        res.status(200).json({ success: true, orders })
    } catch (error) {
        console.log("Error on getAllOrder:",error.message);
        return res.status(500).json({ success: false, error: error.message })
    }
}