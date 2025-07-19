// backend\controllers\cart.controller.js

import pool from '../models/db.js';

export const saveCart = async (req, res) => {
  const customerNumber = req.user.customerNumber;
  const cartItems = req.body.cart;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await conn.query(
      'DELETE FROM cart_items WHERE cartId IN (SELECT id FROM carts WHERE customerNumber = ?)',
      [customerNumber]
    );

    const [cartRes] = await conn.query(
      'INSERT INTO carts (customerNumber) VALUES (?)',
      [customerNumber]
    );

    const cartId = cartRes.insertId;

    const values = cartItems.map(item => [cartId, item.productCode, item.quantity]);

    await conn.query(
      'INSERT INTO cart_items (cartId, productCode, quantity) VALUES ?',
      [values]
    );

    await conn.commit();
    res.json({ success: true, cartId });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: 'Failed to save cart', message: err.message });
  } finally {
    conn.release();
  }
  console.log("Fetching cart for user:", req.user);

};

export const getCart = async (req, res) => {
  const customerNumber = req.user.customerNumber;

  try {
    const [rows] = await pool.query(`
      SELECT p.productCode, p.productName, p.productImage, p.price, ci.quantity
      FROM carts c
      JOIN cart_items ci ON c.id = ci.cartId
      JOIN products p ON p.productCode = ci.productCode
      WHERE c.customerNumber = ?
      ORDER BY ci.id DESC
    `, [customerNumber]);

    console.log("Fetching cart for user:", req.user);

      res.json(rows); // response sent
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart', message: err.message });
  }
  // console.log("Fetching cart for user:", req.user);

};
