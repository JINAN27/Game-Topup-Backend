require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const connectDB = require("./config/database")
const gameRoutes = require("./routes/gameRoutes")
const topupRoutes = require("./routes/topupRoutes")

const app = express()
const port = process.env.PORT || 3001

// Connect to MongoDB
connectDB()

app.use(cors())
app.use(express.json())

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Routes
app.use("/api/games", gameRoutes)
app.use("/api/topup", topupRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

