const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const notifController = require('../controllers/notifController')

router.post('/', checkAuth, notifController.createNotif)

router.get('/', checkAuth, notifController.viewAllNotif)

router.get('/:id', checkAuth, notifController.viewNotif)

router.delete('/:id', checkAuth, notifController.deleteNotif)

router.patch('/:id', checkAuth, notifController.updateNotif)


module.exports = router