const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/product-controller');

// Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, ''));
  }
});
const upload = multer({ storage });

// Public: Get all products
router.get('/', productController.getAllProducts);

// Admin: Add, update, delete products
router.post('/', upload.single('image'), productController.addProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;