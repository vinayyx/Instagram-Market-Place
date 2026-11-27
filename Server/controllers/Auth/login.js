
const Creator = require("../../models/Creator/creator.model");
const Brand = require("../../models/Brand/Brand.model");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // 2. Check JWT secret
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured");
        }

        // 3. Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // 4. Find account in both collections
        const [creator, brand] = await Promise.all([
            Creator.findOne({ email: normalizedEmail }).select("+password"),
            Brand.findOne({ businessEmail: normalizedEmail }).select("+password"),
        ]);

        // 5. Prevent ambiguous accounts
        if (creator && brand) {
            return res.status(409).json({
                success: false,
                message: "Multiple accounts found. Please contact support.",
            });
        }


        // 6. Identify user and role
        const user = creator || brand;
        const role = creator ? "creator" : "brand";

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // 7. Compare password
        const isPasswordCorrect = await user.comparePassword(password);


        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // 8. Check account status
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive",
            });
        }

        // 9. Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                role,
                ...(creator && {
                    accountType: creator.accountType,
                }),
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "7d",
            }
        );

        // 10. Remove password from response
        const userData = user.toObject();
        delete userData.password;

        // 11. Send response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            role,
            user: userData,
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


const getMe = async (req, res) => {
    try {
        // 1. Get user ID and role from JWT middleware
        const { id, role } = req.user;

        let user;

        // 2. Find user according to role
        if (role === "creator") {
            user = await Creator.findById(id).select("-password");
        }
        else if (role === "brand") {
            user = await Brand.findById(id).select("-password");
        }
        else {
            return res.status(403).json({
                success: false,
                message: "Invalid user role",
            });
        }

        // 3. Check user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // 4. Check account status
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive",
            });
        }

        // 5. Send user data
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            role,
            user,
        });

    } catch (error) {
        console.error("Get Me Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { login, getMe };


