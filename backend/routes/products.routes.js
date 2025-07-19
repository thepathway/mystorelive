
//backend\routes\products.routes.js << this file path

import express from 'express';
import upload from '../middleware/upload.js';
import {
  getAllProducts,
  getProductByCode,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} from '../controllers/products.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// 📦 Public routes
router.get('/', getAllProducts);
router.get('/:code', getProductByCode);
router.get('/category/:slug', getProductsByCategory);

// 🔐 Admin-only routes
router.post('/', verifyToken, isAdmin, createProduct);
router.put('/:code', verifyToken, isAdmin, updateProduct);
router.delete('/:code', verifyToken, isAdmin, deleteProduct);

// 🖼️ Image Upload (used in Admin Panel)
router.post('/upload', verifyToken, isAdmin, upload.single('image'), (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

export default router;


