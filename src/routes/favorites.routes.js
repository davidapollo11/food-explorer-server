const { Router } = require('express')

const FavoritesController = require('../controllers/FavoritesController')

const favoritesRoutes = Router()

const favoritesController = new FavoritesController()

favoritesRoutes.post('/:id', favoritesController.create)
favoritesRoutes.get('/:id', favoritesController.index)

module.exports = favoritesRoutes