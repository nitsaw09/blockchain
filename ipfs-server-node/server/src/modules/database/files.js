const mongoose = require("mongoose");

const filesSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      unique: true,
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
    hash: {
      type: String,
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

module.exports = mongoose.model("Files", filesSchema);