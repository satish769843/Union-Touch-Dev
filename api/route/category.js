const express = require("express")
const router = express.Router()
const controller = require("../controller/category")

router.get("/get", controller.get)
router.post("/add", controller.add)
router.patch("/edit/:catId", controller.edit)
router.put("/delete/:catId", controller.delete)
module.exports = router
