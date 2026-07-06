const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken")

const isLoggedIn = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        if (!accessToken || !refreshToken) {
            return res.status(401).json({ message: "Session expired" })
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_KEY);
            let user = await userModel.findById(decoded.id).select("-password")

            if (!user) {
                return res.status(401).json({ message: "User not found" })
            }
            req.user = user
            next()

        } catch (error) {
            return res.status(403).json({ message: "Unauthorized - Access token " })
        }
    } catch (error) {
        console.log('Error on isLoggedIn middleware:', error.message);
        res.status(401).json({ message: "Unauthorized - Access token " })

    }
}

const isAdmin = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "seller") {
            return res.status(403).json({
                message: "Admin access only."
            });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: "Unauthorized- Admin only " })
    }
}
module.exports = { isLoggedIn, isAdmin }