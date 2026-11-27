
const Brand = require("../../models/Brand/Brand.model");
const Creator = require("../../models/Creator/creator.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerBrand = async (req, res) => {
  try {
    const {
      contactPersonName,
      businessEmail,
      mobileNumber,
      password,
      brandName,
      businessCategory,
      instagramProfileLink,
      website,
      state,
      city,
      businessDescription,
      brandLogo,
      creatorNiches,
      monthlyMarketingBudget,
    } = req.body;

    // 1. Validate required fields
    if (
      !contactPersonName ||
      !businessEmail ||
      !mobileNumber ||
      !password ||
      !brandName ||
      !businessCategory ||
      !state ||
      !city ||
      !businessDescription ||
      monthlyMarketingBudget === undefined ||
      monthlyMarketingBudget === null ||
      !creatorNiches
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // 2. Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // 3. Validate mobile number
    if (!/^[0-9]{10}$/.test(mobileNumber.trim())) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    // 4. Validate creator niches
    if (
      !Array.isArray(creatorNiches) ||
      creatorNiches.length === 0 ||
      creatorNiches.some(
        (niche) => typeof niche !== "string" || !niche.trim()
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Please select valid creator niches",
      });
    }

    // 5. Validate monthly budget
    const budget = Number(monthlyMarketingBudget);

    if (!Number.isFinite(budget) || budget < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid monthly marketing budget",
      });
    }

    // 6. Check JWT secret
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    // 7. Normalize email
    const normalizedEmail = businessEmail.trim().toLowerCase();

    // 8. Check email in Creator and Brand collections
    const [existingBrand, existingCreator] = await Promise.all([
      Brand.findOne({ businessEmail: normalizedEmail }),
      Creator.findOne({ email: normalizedEmail }),
    ]);

    if (existingBrand || existingCreator) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // 9. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 10. Create brand
    const brand = await Brand.create({
      contactPersonName: contactPersonName.trim(),
      businessEmail: normalizedEmail,
      mobileNumber: mobileNumber.trim(),
      password: hashedPassword,
      brandName: brandName.trim(),
      businessCategory: businessCategory.trim(),
      instagramProfileLink: instagramProfileLink?.trim() || "",
      website: website?.trim() || "",
      state: state.trim(),
      city: city.trim(),
      businessDescription: businessDescription.trim(),
      brandLogo: brandLogo?.trim() || "",
      creatorNiches: creatorNiches.map((niche) => niche.trim()),
      monthlyMarketingBudget: budget,
    });

    // 11. Generate JWT token
    const token = jwt.sign(
      {
        id: brand._id,
        role: "brand",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // 12. Remove password from response
    const brandData = brand.toObject();
    delete brandData.password;

    // 13. Send response
    return res.status(201).json({
      success: true,
      message: "Brand registered successfully",
      token,
      role: "brand",
      brand: brandData,
    });

  } catch (error) {
    console.error("Brand Registration Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
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

module.exports = {
  registerBrand,
};
