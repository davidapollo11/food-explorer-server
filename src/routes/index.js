const { Router } = require('express')

const usersRoutes = require('./users.routes')
const platesRoutes = require('./plates.routes')
const favoritesRoutes = require('./favorites.routes')
const ordersRoutes = require('./orders.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/plates', platesRoutes)
routes.use('/favorites', favoritesRoutes)
routes.use('/orders', ordersRoutes)

module.exports = routes