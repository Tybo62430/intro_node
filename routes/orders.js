const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.use(function (req, res, next) {
  console.log('Timestamp is : ', Date.now())
  next()
})

router.use(function (req, res, next) {
  console.log('Method : ' + req.method + ' on Endpoint : ' + req.baseUrl + req.url)
  next()
})

router.get('/', orderController.searchOrders)

router.get('/create', orderController.create)

router.get('/:id', orderController.getOrderById)

router.post('/', orderController.createOrder)

router.put('/:id', orderController.updateOrderById)

router.delete('/:id', orderController.deleteOrderById)

module.exports = router
