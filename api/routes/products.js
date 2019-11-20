const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const productController = require('../controllers/productController')

router.post('/', productController.createProduct)

router.get('/', productController.viewAllProducts)

router.get('/dashboard', productController.viewAllProductsInDashBoard)

router.get('/:id', productController.viewProduct)

router.delete('/:id', productController.deleteProduct)

router.patch('/:id', productController.updateProduct)

module.exports = router