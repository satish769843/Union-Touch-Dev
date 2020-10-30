const niv = require("node-input-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserDB = require("../models/user")
const { getValidImageUrl } = require("../../Helper/Validation")
const router = require("../route/user")

// Register
exports.Register = async (req, res) => {
  const objValidation = new niv.Validator(req.body, {
    firstName: "required",
    lastName: "required",
    email: "required",
    password: "required",
    mobile: "required",
  })
  const matched = await objValidation.check()

  if (!matched) {
    return res
      .status(422)
      .send({ message: "Validation error", errors: objValidation.errors })
  }
  const profileName = req.body.firstName.charAt(0) + req.body.lastName.charAt(0)
  // console.log("exports.Register -> profileName", profileName)
  let profile = ""
  if (!req.file) {
    profile = await getValidImageUrl(req.file, profileName)
  } else {
    profile = (await process.env.URL) + req.file.path
  }
  const password = await bcrypt.hash(req.body.password, 10)
  // const mo = parseInt(req)
  try {
    const emailValid = await UserDB.findOne({ email: req.body.email })
    if (emailValid) {
      return res.status(409).json({ message: "Email Already Exits" })
    }
    const result = await UserDB({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password,
      mobile: parseInt(req.body.mobile),
      profile_pic: profile,
    })
    await result.save()
    return res
      .status(200)
      .json({ message: "User Register Successfully", result: result })
  } catch (err) {
    console.error(err.message)
    res
      .status(500)
      .json({ message: "Error occurred, Please try again later", error: err })
  }
}

// Login
exports.login = async (req, res) => {
  const objValidation = new niv.Validator(req.body, {
    email: "required",
    password: "required",
  })
  const matched = await objValidation.check()

  if (!matched) {
    return res
      .status(422)
      .send({ message: "Validation error", errors: objValidation.errors })
  }

  try {
    //
    const user = await UserDB.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ message: "Email Not Exits" })
    }
    const password = await bcrypt.compare(req.body.password, user.password)
    if (!password) {
      return res.status(401).json({ message: "Password is incorrect" })
    }
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "10d",
      },
    )
    return res.status(200).json({
      message: "User Auth Successfully",
      token: token,
      user: user,
    })
  } catch (err) {
    //
    console.error(err.message)
    res
      .status(500)
      .json({ message: "Error occurred, Please try again later", error: err })
  }
}
