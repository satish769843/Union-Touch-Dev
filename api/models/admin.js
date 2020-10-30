const mongoose = require("mongoose")

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      toLowerCase: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    access: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: true },
)
module.exports = mongoose.model("admin", adminSchema)
