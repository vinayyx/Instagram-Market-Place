
const Creator = require("../../models/Creator/creator.model");
const Brand = require("../../models/Brand/Brand.model")
const jwt = require("jsonwebtoken");


// CREATOR REGISTOR 
const registerCreator = async (req, res) => {
  try {
    const {
      accountType,
      fullName,
      email,
      password,
      phone,
      dob,
      individualProfile,
      themePageProfile,
      bestReels,
    } = req.body;

    // 1. Validate account type
    if (!["individual", "theme_page"].includes(accountType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account type",
      });
    }

    // 2. Validate common fields
    if (!fullName || !email || !password || !phone || !dob) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // 3. Validate selected profile
    if (accountType === "individual" && !individualProfile) {
      return res.status(400).json({
        success: false,
        message: "Individual profile is required",
      });
    }

    if (accountType === "theme_page" && !themePageProfile) {
      return res.status(400).json({
        success: false,
        message: "Theme page profile is required",
      });
    }


    // 4. Check existing email in both collections
    const normalizedEmail = email.trim().toLowerCase();

    const [existingCreator, existingBrand] = await Promise.all([
      Creator.findOne({ email: normalizedEmail }),
      Brand.findOne({ businessEmail: normalizedEmail }),
    ]);

    if (existingCreator || existingBrand) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // 5. Prepare creator data
    const creatorData = {
      accountType,
      fullName,
      email: normalizedEmail,
      password,
      phone,
      dob,
      bestReels: bestReels || [],
    };

    // 6. Add selected profile
    if (accountType === "individual") {
      creatorData.individualProfile = individualProfile;
    } else {
      creatorData.themePageProfile = themePageProfile;
    }

    // 7. Save creator
    // Password automatically hashes through model pre-save middleware
    const creator = await Creator.create(creatorData);

    // 8. Generate JWT token
    const token = jwt.sign(
      {
        id: creator._id,
        role: "creator",
        accountType: creator.accountType,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // 9. Send response
    return res.status(201).json({
      success: true,
      message: "Creator registered successfully",

      token,
      role: "creator",

      creator: {
        id: creator._id,
        accountType: creator.accountType,
        fullName: creator.fullName,
        email: creator.email,
        phone: creator.phone,
        dob: creator.dob,

        individualProfile: creator.individualProfile,
        themePageProfile: creator.themePageProfile,

        bestReels: creator.bestReels,

        averageReelViews: creator.averageReelViews,
        averageReelLikes: creator.averageReelLikes,

        isEmailVerified: creator.isEmailVerified,
        createdAt: creator.createdAt,
      },
    });

  } catch (error) {
    console.error("Creator Registration Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const loginCreator = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check required fields
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

    // 3. Find creator by email
    // Password is hidden by default, so explicitly select it
    const creator = await Creator.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!creator) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4. Compare password
    const isPasswordCorrect = await creator.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 5. Check account status
    if (!creator.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

    // 6. Generate JWT
    const token = jwt.sign(
      {
        id: creator._id,
        role: "creator",
        accountType: creator.accountType,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // 7. Remove password from response
    const creatorData = creator.toObject();
    delete creatorData.password;

    // 8. Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      creator: creatorData,
    });

  } catch (error) {
    console.error("Creator Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { registerCreator, loginCreator };
