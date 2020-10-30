const mongoose = require("mongoose")
const categorySchame = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      toLowerCase: true,
      required: true,
      unique: true,
    },
    flag: {
      type: Number,
      default: 1, // 1- show 2-delete
    },
  },
  { timestamps: true },
)
module.exports = mongoose.model("Category", categorySchame)
