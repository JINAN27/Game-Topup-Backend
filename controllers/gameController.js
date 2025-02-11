const Game = require("../models/Game")

exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find()
    res.json(games)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
    if (!game) return res.status(404).json({ message: "Game not found" })
    res.json(game)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createGame = async (req, res) => {
  const game = new Game({
    name: req.body.name,
    image: req.file ? req.file.path : "",
    description: req.body.description,
  })

  try {
    const newGame = await game.save()
    res.status(201).json(newGame)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
    if (!game) return res.status(404).json({ message: "Game not found" })

    game.name = req.body.name || game.name
    game.description = req.body.description || game.description
    if (req.file) {
      game.image = req.file.path
    }

    const updatedGame = await game.save()
    res.json(updatedGame)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
    if (!game) return res.status(404).json({ message: "Game not found" })

    await game.remove()
    res.json({ message: "Game deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

