const mongoose = require("mongoose")
const providerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      toLowerCase: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      toLowerCase: true,
      required: true,
    },
    email: {
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
      trim: true,
      toLowerCase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_Pic: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    address: {
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      landMark: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pincode: {
        type: Number,
      },
    },
    shopName: {
      type: String,
      required: true,
    },
    shopAddress: {
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      landMark: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pincode: {
        type: Number,
      },
    },

    experience: {
      type: Number,
      required: true,
    },
    addressProof: {
      type: String,
      required: true,
    },
    idProof: {
      type: String,
      required: true,
    },
    access: {
      type: Number, //1-request 2-accept 3-reject
      default: 1,
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model("provider", providerSchema)
