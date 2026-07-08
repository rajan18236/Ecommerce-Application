const userModel = require("../models/userModel");
const adminModel = require("../models/adminModel");
const bcrypt = require('bcrypt');
const getToken = require("../ulits/getToken")
const { setTokenOnRedis, removeTokenFromRedis } = require("../ulits/setTokenOnRedis")

const registerUser = async (req, res) => {
    try {
        const { email, fullName, password, role } = req.body;

        // Validate input
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
            role: role || "customer" // Default role is "customer" if not provided
        });

        // Generate tokens
        const { accessToken, refreshToken } = getToken(newUser._id);
        setTokenOnRedis(newUser._id, refreshToken)
        // Store cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 60,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role
            },
            tokens: {
                accessToken,
                refreshToken,
            },
        });

    } catch (error) {
        console.error("Register User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const user = await userModel.findOne({ email }) || await adminModel.findOne({ fullName: email });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(401).json({ message: `Error on loginUser:`, err })
            }
            else if (result) {
                // Generate tokens
                const { accessToken, refreshToken } = getToken(user._id);
                setTokenOnRedis(user._id, refreshToken)
                // Store cookies
                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    maxAge: 15 * 60 * 60,
                });
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    maxAge: 7 * 24 * 60 * 60,
                });
                return res.status(201).json({
                    success: true,
                    message: "User login successfully.",
                    user: {
                        id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                        role: user.role
                    },
                    tokens: {
                        accessToken,
                        refreshToken,
                    },
                });
            }
            else {
                res.status(401).json({ message: "User not found" })
            }
        })

    } catch (error) {
        console.log("Login user error:", error.message);
        res.status(500).json({ message: "Internal server error" })

    }
}

const logoutUser = async (req, res) => {
    try {
        removeTokenFromRedis(req.user._id)
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.json({ message: "Logout successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}


module.exports = { registerUser, loginUser, logoutUser }