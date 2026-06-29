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
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamp: true
}
)

module.exports = mongoose.model("product",productSchema)