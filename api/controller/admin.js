const niv = require("node-input-validator")
const adminDB = require("../models/admin")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { getValidImageUrl } = require("../../Helper/Validation")

exports.add = async (req, res) => {
  const objValidation = new niv.Validator(req.body, {
    name: "required",
    email: "required",
    password: "required",
  })
  const matched = await objValidation.check()
  if (!matched) {
    return res
      .status(422)
      .send({ message: "Validation error", errors: objValidation.errors })
  }
  // console.log(req.file)
  let profile = ""
  if (!req.file) {
    profile = await getValidImageUrl(req.file, "AD")
  } else {
    profile = process.env.URL + req.file.path
  }
  const password = await bcrypt.hash(req.body.password, 10)
  try {
    const result = await adminDB({
      name: req.body.name,
      email: req.body.email,
      password: password,
      profilePic: profile,
    })
    result.save()
    return res.status(200).json({
      message: "Amdin Register Successfully",
      result: result,
    })
  } catch (err) {
    console.error(err.message)
    res
      .status(500)
      .json({ message: "Error occurred, Please try again later", error: err })
  }
}

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
    const admin = await adminDB.findOne({ email: req.body.email })
    if (!admin) {
      return res.status(409).json({ message: "Email is not Found" })
    }
    const password = await bcrypt.compare(req.body.password, admin.password)
    if (!password) {
      return res.status(401).json({ message: "Password Not Match" })
    }
    const token = jwt.sign(
      {
        email: admin.email,
        id: admin._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "10d",
      },
    )
    return res.status(200).json({
      message: "Admin Authorized Successfully",
      token: token,
      admin: admin,
    })
  } catch (err) {
    //
    console.log(err)
    return res
      .status(500)
      .json({ message: "Error occurred, Please try again later", error: err })
  }
}
