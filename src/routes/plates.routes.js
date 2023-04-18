const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const PlatesController = require('../controllers/PlatesController')
const PlatesImageController = require('../controllers/PlatesImageController')

const platesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const platesController = new PlatesController()
const platesImageController = new PlatesImageController()

platesRoutes.post('/', ensureAuthenticated, platesController.create)
platesRoutes.put('/:id', platesController.update)
platesRoutes.get('/:id', platesController.show)
platesRoutes.delete('/:id', platesController.delete)
platesRoutes.get('/', platesController.index)
platesRoutes.patch('/image/:id', ensureAuthenticated, upload.single('image'), platesImageController.update)

module.exports = platesRoutes