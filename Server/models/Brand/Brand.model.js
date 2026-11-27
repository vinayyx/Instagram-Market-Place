
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const brandSchema = new mongoose.Schema(
  {
    // Contact person details
    contactPersonName: {
      type: String,
      required: [true, "Contact person name is required"],
      trim: true,
    },

    businessEmail: {
      type: String,
      required: [true, "Business email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid business email",
      ],
    },

    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    // Brand / company details
    brandName: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
    },

    businessCategory: {
      type: String,
      required: [true, "Business category is required"],
      trim: true,
    },

    instagramProfileLink: {
      type: String,
      trim: true,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    // Business location
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    // Business information
    businessDescription: {
      type: String,
      required: [true, "Business description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    brandLogo: {
      type: String,
      default: "",
      trim: true,
    },

    // Creator preferences
    creatorNiches: {
      type: [String],
      required: [true, "Please select creator niches"],
      validate: {
        validator: (value) => value.length > 0,
        message: "Select at least one creator niche",
      },
    },

    // Monthly marketing budget in INR
    monthlyMarketingBudget: {
      type: Number,
      required: [true, "Monthly marketing budget is required"],
      min: [0, "Budget cannot be negative"],
    },

    // Account status
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);



// Compare password during login
brandSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
