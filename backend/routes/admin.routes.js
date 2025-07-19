// backend\routes\admin.routes.js

import express from 'express';
import { getAdminStats } from '../controllers/admin.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';
const router = express.Router();

router.get('/stats', verifyToken, isAdmin, getAdminStats);

export default router;
