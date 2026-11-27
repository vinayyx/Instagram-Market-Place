
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

// Individual Creator Profile
const individualProfileSchema = new Schema(
  {
    instagramUsername: {
      type: String,
      trim: true,
      lowercase: true,
    },

    followers: {
      type: Number,
      min: 0,
      default: 0,
    },

    instagramProfileLink: {
      type: String,
      trim: true,
    },

    primaryNiche: {
      type: String,
      trim: true,
    },

    otherNiches: {
      type: [String],
      default: [],
    },

    contentLanguages: {
      type: [String],
      default: [],
    },

    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  { _id: false }
);

// Theme Page Profile
const themePageProfileSchema = new Schema(
  {
    pageName: {
      type: String,
      trim: true,
    },

    instagramUsername: {
      type: String,
      trim: true,
      lowercase: true,
    },

    followers: {
      type: Number,
      min: 0,
      default: 0,
    },

    instagramProfileLink: {
      type: String,
      trim: true,
    },

    primaryNiche: {
      type: String,
      trim: true,
    },

    otherNiches: {
      type: [String],
      default: [],
    },

    contentLanguages: {
      type: [String],
      default: [],
    },

    mainAudienceCountry: {
      type: String,
      trim: true,
    },

    contentType: {
      type: String,
      enum: ["original", "curated", "both"],
    },

    publishesSponsoredContent: {
      type: Boolean,
      default: false,
    },

    pageDescription: {
      type: String,
      trim: true,
      maxlength: 1500,
    },
  },
  { _id: false }
);

// Best Reel Schema
const bestReelSchema = new Schema(
  {
    reelLink: {
      type: String,
      trim: true,
    },

    views: {
      type: Number,
      min: 0,
      default: 0,
    },

    likes: {
      type: Number,
      min: 0,
      default: 0,
    },

    comments: {
      type: Number,
      min: 0,
      default: 0,
    },

    shares: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { _id: false }
);

// Main Creator Schema
const creatorSchema = new Schema(
  {
    // Account Type
    accountType: {
      type: String,
      enum: ["individual", "theme_page"],
      required: true,
    },

    // Common Personal Details
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    // Conditional Profiles
    individualProfile: {
      type: individualProfileSchema,
      default: undefined,
    },

    themePageProfile: {
      type: themePageProfileSchema,
      default: undefined,
    },

    // Common Best Reels (Maximum 3)
    bestReels: {
      type: [bestReelSchema],
      default: [],
      validate: {
        validator: (reels) => reels.length <= 3,
        message: "You can add maximum 3 best reels.",
      },
    },

    // Account Status
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

// Validate profile according to account type
creatorSchema.pre("validate", function () {
  if (this.accountType === "individual") {
    const profile = this.individualProfile;

    if (!profile) {
      this.invalidate(
        "individualProfile",
        "Individual profile is required."
      );
      return;
    }

    const requiredFields = [
      "instagramUsername",
      "instagramProfileLink",
      "primaryNiche",
      "bio",
      "city",
      "state",
    ];

    requiredFields.forEach((field) => {
      if (!profile[field]?.trim()) {
        this.invalidate(
          `individualProfile.${field}`,
          `${field} is required.`
        );
      }
    });

    if (!profile.contentLanguages?.length) {
      this.invalidate(
        "individualProfile.contentLanguages",
        "At least one content language is required."
      );
    }

    this.themePageProfile = undefined;
  }

  if (this.accountType === "theme_page") {
    const profile = this.themePageProfile;

    if (!profile) {
      this.invalidate(
        "themePageProfile",
        "Theme page profile is required."
      );
      return;
    }

    const requiredFields = [
      "pageName",
      "instagramUsername",
      "instagramProfileLink",
      "primaryNiche",
      "mainAudienceCountry",
      "contentType",
      "pageDescription",
    ];

    requiredFields.forEach((field) => {
      if (!profile[field]?.trim()) {
        this.invalidate(
          `themePageProfile.${field}`,
          `${field} is required.`
        );
      }
    });

    if (!profile.contentLanguages?.length) {
      this.invalidate(
        "themePageProfile.contentLanguages",
        "At least one content language is required."
      );
    }

    this.individualProfile = undefined;
  }
});

// Hash password before saving
creatorSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password during login
creatorSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Calculate average reel views
creatorSchema.virtual("averageReelViews").get(function () {
  if (!this.bestReels.length) return 0;

  const totalViews = this.bestReels.reduce(
    (total, reel) => total + reel.views,
    0
  );

  return Math.round(totalViews / this.bestReels.length);
});

// Calculate average reel likes
creatorSchema.virtual("averageReelLikes").get(function () {
  if (!this.bestReels.length) return 0;

  const totalLikes = this.bestReels.reduce(
    (total, reel) => total + reel.likes,
    0
  );

  return Math.round(totalLikes / this.bestReels.length);
});

module.exports = mongoose.model("Creator", creatorSchema);
