const niv = require("node-input-validator")
const CategoryDB = require("../models/category")
const router = require("../route/user")
// get
exports.get = async (req, res) => {
  try {
    const result = await CategoryDB.aggregate([
      { $match: { flag: 1 } },
      {
        $project: {
          flag: 1,
          name: 1,
          createdAt: 1,
        },
      },
      { $sort: { createdAt: 1 } },
    ])
    return res
      .status(200)
      .json({ message: "Get All Category Successfully", result: result })
  } catch (err) {
    //
    console.log(err)
    return res
      .status(500)
      .json({ message: "Error occurred, Please try again later", error: err })
  }
}

// Add
exports.add = async (req, res) => {
  const objValidation = new niv.Validator(req.body, {
    name: "required",
  })
  const matched = await objValidation.check()
  if (!matched) {
    return res
      .status(422)
      .send({ message: "Validation error", errors: objValidation.errors })
  }
  const { name } = req.body

  try {
    const checkName = await CategoryDB.findOne({ name })
    if (checkName) {
      return res.status(409).json({ message: "Category already exists" })
    }
    const result = await CategoryDB({
      name,
    })
    await result.save()
    return res
      .status(200)
      .json({ message: "Category Create Successfully", result: result })
  } catch (err) {
    //
    console.error(err.message)
    return res
      .status(500)
      .json({ message: "Error occurred, Please try again later", error: err })
  }
}

// Edit

exports.edit = async (req, res) => {
  const objValidation = new niv.Validator(req.body, {
    name: "required",
  })
  const matched = await objValidation.check()
  if (!matched) {
    return res
      .status(422)
      .send({ message: "Validation error", errors: objValidation.errors })
  }
  const id = req.params.catId
  const { name } = req.body
  const newUpdate = {}
  if (name) newUpdate.name = name
  try {
    //
    const result = await CategoryDB.findByIdAndUpdate(
      id,
      { $set: newUpdate },
      { new: true },
    )
    return res
      .status(200)
      .json({ message: "Category Updated Successfully", result: result })
  } catch (err) {
    //
    console.log(err)
    return res
      .status(500)
      .json({ message: "Error occurred, Please try again later", error: err })
  }
}

// Delete
exports.delete = async (req, res) => {
  const objValidation = new niv.Validator(req.body, {
    flag: "required",
  })
  const matched = await objValidation.check()
  if (!matched) {
    return res
      .status(422)
      .send({ message: "Validation error", errors: objValidation.errors })
  }
  const id = req.params.catId
  const { flag } = req.body
  try {
    //
    const result = await CategoryDB.findByIdAndUpdate(
      id,
      { $set: { flag } },
      { new: true },
    )
    return res
      .status(200)
      .json({ message: "Category Delete Successfully", result: result })
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: "Error occurred, Please try again later", error: err })
  }
}
