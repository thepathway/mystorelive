// backend\routes\categories.routes.js
import express from 'express';
import { getAllCategories } from '../controllers/categories.controller.js';

const router = express.Router();

// GET /api/categories
router.get('/', getAllCategories);

export default router;
