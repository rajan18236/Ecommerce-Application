const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    productItems: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },


    ],
    role: {
        type: String,
        default: "admin"
    },
}, {
    timestamps: true

});

module.exports = mongoose.model('Admin', adminSchema);