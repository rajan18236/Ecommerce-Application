const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be 6 character long"]
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            productQty: {
                type: Number,
                default: 1
            }
        }
    ],
    role: {
        type: String,
        enum: ['customer', "seller",'admin'],
        default: "customer"
    },
}, {
    timestamps: true
}
)

module.exports = mongoose.model("user", userSchema)