const mongoose = require("mongoose");

const shortlistSchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
      required: true,
    },
  },
  { timestamps: true }
);

// One brand can shortlist a creator only once
shortlistSchema.index(
  { brand: 1, creator: 1 },
  { unique: true }
);

module.exports = mongoose.model("Shortlist", shortlistSchema);