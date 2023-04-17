const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const OrdersController = require('../controllers/OrdersController')

const ordersRoutes = Router()

const ordersController = new OrdersController()

ordersRoutes.post('/', ensureAuthenticated, ordersController.create)
ordersRoutes.get('/', ordersController.index)

module.exports = ordersRoutes