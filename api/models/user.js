const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
      required: true,
      unique: true,
    },
    profile_pic: {
      type: String,
    },
    mobile: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model("user", userSchema)
