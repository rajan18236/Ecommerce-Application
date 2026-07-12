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



const isAdmin = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "seller") {
            return res.status(403).json({
                message: "Admin access only."
            });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: "Unauthorized - Admin only " })
    }
}
module.exports = { isLoggedIn, isAdmin }