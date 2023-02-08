const { Router } = require('express')
const platesRoutes = Router()

const PlatesController = require('../controllers/PlatesController')
const platesController = new PlatesController()

platesRoutes.post('/', platesController.create)
platesRoutes.get('/:id', platesController.show)
platesRoutes.delete('/:id', platesController.delete)
platesRoutes.get('/', platesController.index)

module.exports = platesRoutes