const mongoose = require("mongoose");

const nftSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    attributes: {
      trait_type: {
        type: String,
        trim: true
      },
      value: {
        type: String,
        trim: true
      }
    },
    owner: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      unique: true,
      trim: true
    },
    fileType: {
      type: String,
      trim: true
    },
    tokenId: {
      type: Number,
      unique: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    versionKey: false,
    strict: true
  }
);

module.exports = mongoose.model("NFT", nftSchema);