// backend\routes\cart.routes.js

import express from 'express';
import { saveCart, getCart } from '../controllers/cart.controller.js';
import  verifyToken  from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, saveCart);
router.get('/', verifyToken, getCart);

export default router;
