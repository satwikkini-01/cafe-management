const express = require('express');
const menuController = require('./controllers/menuController');
const orderController = require('./controllers/orderController');
const inventoryController = require('./controllers/inventoryController');

const router = express.Router();

// Menu routes
router.post('/menu', menuController.addMenuItem);
router.get('/menu', menuController.viewMenu);

// Order routes
router.post('/order', orderController.placeOrder);
router.get('/orders', orderController.viewOrders);

// Inventory routes
router.post('/inventory', inventoryController.addInventoryItem);
router.get('/inventory', inventoryController.viewInventory);

module.exports = router;
