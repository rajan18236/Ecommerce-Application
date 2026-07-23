const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken")


const isLoggedIn = async (req, res, next) => {

    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Session expired. Please login again.",
            });
        }

        const decoded = jwt.verify(
            accessToken,
            process.env.JWT_KEY_AT
        );

        const user = await userModel
            .findById(decoded.id)
            .select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error("isLoggedIn:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token.",
        });
    }
};



const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        next();
    };
};
module.exports = { isLoggedIn, authorizeRoles }