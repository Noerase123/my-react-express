const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const productController = require('../controllers/productController')

router.post('/', checkAuth, productController.createProduct)

router.get('/', productController.viewAllProducts)

router.get('/sumprice', checkAuth, productController.sumprice)

router.get('/dashboard', checkAuth, productController.viewAllProductsInDashBoard)

router.get('/:id', checkAuth, productController.viewProduct)

router.delete('/:id', checkAuth, productController.deleteProduct)

router.patch('/:id', checkAuth, productController.updateProduct)

module.exports = router