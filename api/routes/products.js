const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const productController = require('../controllers/productController')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.post('/', checkAuth, upload.single('productImage'), productController.createProduct)

router.get('/', productController.viewAllProducts)

router.get('/sumprice', checkAuth, productController.sumprice)

router.get('/dashboard', checkAuth, productController.viewAllProductsInDashBoard)

router.get('/:id', productController.viewProduct)

router.delete('/:id', checkAuth, productController.deleteProduct)

router.patch('/:id', checkAuth, productController.updateProduct)

module.exports = router