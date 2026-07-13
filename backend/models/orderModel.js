const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required : true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required : true
        },
        productQty: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    stripeSessionId: {
        type: String,
        unique: true
    },
}, { timestamps: true }
)

module.exports = mongoose.model("order", orderSchema)