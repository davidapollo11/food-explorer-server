const { Router } = require('express')

const OrdersController = require('../controllers/OrdersController')

const ordersRoutes = Router()

const ordersController = new OrdersController()

ordersRoutes.post('/:id', ordersController.create)
ordersRoutes.get('/', ordersController.index)

module.exports = ordersRoutes