const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart-controller');

// Get all cart items for a user
router.get('/', cartController.getCart);

// Add to cart
router.post('/', cartController.addToCart);

// Update cart item
router.put('/:id', cartController.updateCartItem);

// Remove cart item
router.delete('/:id', cartController.removeCartItem);

router.delete('/clear', cartController.clearCart);

module.exports = router;