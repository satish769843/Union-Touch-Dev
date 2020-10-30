const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
  destination: "./upload/provider",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
    )
  },
})
const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"))
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 4,
  },
  fileFilter: fileFilter,
})
const controller = require("../controller/provider")
router.post("/add", upload.any(), controller.add)
router.post("/login", controller.login)
module.exports = router
