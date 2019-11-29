const Product = require('../models/ProductModel')
const mongoose = require('mongoose')

exports.createProduct = (req, res) => {
    console.log(req.file)
    const prod = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        code: req.body.code,
        productImage: req.file.path
    })
    prod.save()
        .then(response => {
            res.status(201).json({
                message: 'Product created!',
                data: {
                    _id: response._id,
                    name: response.name,
                    price: response.price,
                    productImage: response.productImage,
                    description: response.description,
                    code: response.code,
                    request: {
                        type: 'POST'
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}

exports.viewAllProducts = (req, res) => {
    Product.find()
        .exec()
        .then(response => {
            const result = {
                count: response.length,
                data: response.map(prod => {
                    return {
                        _id: prod._id,
                        name: prod.name,
                        price: prod.price,
                        productImage: prod.productImage,
                        description: prod.description,
                        code: prod.code,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3030/api/products/' + prod._id
                        }
                    }
                })
            }
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}

exports.sumprice = (req, res) => {
    Product.find()
        .exec()
        .then(response => {
            const result = response.map(row => {
                return row.price
            });
            var total = 0;
            for (var i = 0; i < result.length; i++) {
                total += result[i];
            }
            const sum = total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            res.status(200).json({
                sum: sum
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}

exports.viewAllProductsInDashBoard = (req, res) => {
    Product.find()
        .limit(5)
        .exec()
        .then(response => {
            const result = {
                count: response.length,
                data: response.map(prod => {
                    return {
                        _id: prod._id,
                        name: prod.name,
                        price: prod.price,
                        productImage: prod.productImage,
                        description: prod.description,
                        code: prod.code,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3030/api/products/' + prod._id
                        }
                    }
                })
            }
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}

exports.viewProduct = (req, res) => {
    const id = req.params.id
    Product.findById(id)
        .exec()
        .then(response => {
            res.status(200).json({
                _id: response._id,
                name: response.name,
                price: response.price,
                productImage: response.productImage,
                description: response.description,
                code: response.code,
                request: {
                    type: 'GET',
                    from: 'http://localhost:3030/api/products'
                }
            })
        })
}

exports.deleteProduct = (req, res) => {
    const id = req.params.id
    Product.deleteOne({ _id: id })
        .exec()
        .then(response => {
            res.status(200).json({
                message: 'product deleted'
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}

exports.updateProduct = (req, res) => {
    const id = req.params.id
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(response => {
            res.status(200).json({
                message: 'Product Updated'
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}