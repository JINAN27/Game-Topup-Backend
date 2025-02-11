const Topup = require("../models/Topup")

exports.getAllTopups = async (req, res) => {
  try {
    const topups = await Topup.find().populate("gameId")
    res.json(topups)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getTopupById = async (req, res) => {
  try {
    const topup = await Topup.findById(req.params.id).populate("gameId")
    if (!topup) return res.status(404).json({ message: "Topup not found" })
    res.json(topup)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createTopup = async (req, res) => {
  const topup = new Topup({
    gameId: req.body.gameId,
    userId: req.body.userId,
    amount: req.body.amount,
    status: req.body.status || "pending",
  })

  try {
    const newTopup = await topup.save()
    res.status(201).json(newTopup)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateTopup = async (req, res) => {
  try {
    const topup = await Topup.findById(req.params.id)
    if (!topup) return res.status(404).json({ message: "Topup not found" })

    topup.status = req.body.status || topup.status
    topup.amount = req.body.amount || topup.amount

    const updatedTopup = await topup.save()
    res.json(updatedTopup)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteTopup = async (req, res) => {
  try {
    const topup = await Topup.findById(req.params.id)
    if (!topup) return res.status(404).json({ message: "Topup not found" })

    await topup.remove()
    res.json({ message: "Topup deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

