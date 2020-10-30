const niv = require("node-input-validator")
const bcrypt = require("bcryptjs")
const ProviderDB = require("../models/provider")
const jwt = require("jsonwebtoken")

// Get
exports.add = async (req, res) => {
  const objValidation = new niv.Validator(req.body, {
    firstName: "required",
    lastName: "required",
    email: "required",
    password: "required",
    Address1: "required",
    landMark: "required",
    city: "required",
    pincode: "required",
    shopName: "required",
    category: "required",
  })
  const match = await objValidation.check()
  if (!match) {
    return res
      .status(422)
      .send({ message: "Validation error", errors: objValidation.errors })
  }
  const password = await bcrypt.hash(req.body.password, 10)
  try {
    const emailValidation = await ProviderDB.findOne({ email: req.body.email })
    if (emailValidation) {
      return res.status(409).json({ message: "Email Already Exists" })
    }
    const result = await ProviderDB({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password,
      category: req.body.category,
      address: {
        address1: req.body.Address1[0],
        address2: req.body.Address2[0],
        landMark: req.body.landMark[0],
        city: req.body.city[0],
        state: req.body.state[0],
        pincode: req.body.pincode[0],
      },
      shopName: req.body.shopName,
      shopAddress: {
        address1: req.body.Address1[1],
        address2: req.body.Address2[1],
        landMark: req.body.landMark[1],
        city: req.body.city[1],
        state: req.body.state[1],
        pincode: req.body.pincode[1],
      },
      experience: req.body.experience,
      profile_Pic: process.env.URL + req.files[0].path,
      addressProof: process.env.URL + req.files[1].path,
      idProof: process.env.URL + req.files[2].path,
    })
    await result.save()
    return res
      .status(200)
      .json({ message: "Add User Successfully", result: result })
  } catch (err) {
    //
    console.log(err)
    return res
      .status(500)
      .json({ message: "Error occurred, Please try again later", error: err })
  }
}

// login
exports.login = async (req, res) => {
  const objValidation = new niv.Validator(req.body, {
    email: "required",
    password: "required",
  })
  const matched = await objValidation.check()
  if (!matched) {
    return res
      .status(422)
      .json({ message: "Validation error", errors: objValidation.errors })
  }
  try {
    const provider = await ProviderDB.findOne({ email: req.body.email })

    if (!provider) {
      return res.status(401).json({ message: "Email Not Found" })
    }
    const password = await bcrypt.compare(req.body.password, provider.password)
    if (!password) {
      return res.status(401).json({ message: "Invalid Password" })
    }
    const token = jwt.sign(
      {
        email: provider.email,
        id: provider._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "10d",
      },
    )
    return res.status(200).json({
      message: "Provider Login SuccessFully",
      token: token,
      provider: provider,
    })
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: "Error occurred, Please try again later", error: err })
  }
}
