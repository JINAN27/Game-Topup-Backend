const express = require("express")
const router = express.Router()
const topupController = require("../controllers/topupController")

router.get("/", topupController.getAllTopups)
router.get("/:id", topupController.getTopupById)
router.post("/", topupController.createTopup)
router.put("/:id", topupController.updateTopup)
router.delete("/:id", topupController.deleteTopup)

module.exports = router

