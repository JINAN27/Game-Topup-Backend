const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const gameController = require("../controllers/gameController")

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/") // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage })

router.get("/", gameController.getAllGames)
router.get("/:id", gameController.getGameById)
router.post("/", upload.single("image"), gameController.createGame)
router.put("/:id", upload.single("image"), gameController.updateGame)
router.delete("/:id", gameController.deleteGame)

module.exports = router

