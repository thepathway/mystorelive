//backend\routes\upload.routes.js


import express from 'express';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const imagePath = `/uploads/${req.file.filename}`;
  res.json({ success: true, path: imagePath });
});

export default router;
