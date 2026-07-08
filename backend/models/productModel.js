const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    category: {
        type: String,
        required: true,
        default: "Others",
        enum: ["Electronics", "Clothing", "Books", "Home & Kitchen", "Sports & Outdoors", "Beauty & Personal Care", "Toys & Games", "Automotive", "Health & Wellness", "Others"]
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {
    timestamp: true
}
)

module.exports = mongoose.model("product", productSchema)