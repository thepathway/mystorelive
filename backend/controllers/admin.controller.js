// backend\controllers\admin.controller.js

import pool from '../models/db.js';

export async function getAdminStats(req, res) {
  try {
    const [[orderCount]] = await pool.query('SELECT COUNT(*) AS totalOrders FROM orders');
    const [[customerCount]] = await pool.query('SELECT COUNT(*) AS totalCustomers FROM customers');
    const [[salesTotal]] = await pool.query('SELECT SUM(amount) AS totalSales FROM payments');
    const [[productCount]] = await pool.query('SELECT COUNT(*) AS totalProducts FROM products');

    res.json({
      orders: orderCount.totalOrders,
      customers: customerCount.totalCustomers,
      revenue: salesTotal.totalSales || 0,
      products: productCount.totalProducts,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load admin stats', error: err.message });
  }
}
