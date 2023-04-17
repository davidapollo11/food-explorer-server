const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const FavoritesController = require('../controllers/FavoritesController')

const favoritesRoutes = Router()

const favoritesController = new FavoritesController()

favoritesRoutes.post('/', ensureAuthenticated, favoritesController.create)
favoritesRoutes.get('/', ensureAuthenticated, favoritesController.index)

module.exports = favoritesRoutes