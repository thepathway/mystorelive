// backend\controllers\categories.controller.js

import pool from '../models/db.js';

export const getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, slug, icon FROM categories ORDER BY name ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    res.status(500).json({ message: 'Failed to retrieve categories' });
  }
};
