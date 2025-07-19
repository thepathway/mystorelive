// backend\controllers\orders.controller.js

import pool from '../models/db.js';
// import { createOrder, getOrderByNumber } from '../models/order.model.js';


export const createOrder = async (req, res) => {
  const customerNumber = req.user.customerNumber;
  const cart = req.body.cart || [];

  try {
    const [customer] = await pool.query(
      "SELECT * FROM customers WHERE customerNumber = ?",
      [customerNumber]
    );

    if (!customer.length) return res.status(404).json({ error: "Customer not found" });

    const orderDate = new Date();
    const status = "In Process";
    const totalAmount = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    const [result] = await pool.query(
      "INSERT INTO orders (orderDate, status, customerNumber, totalAmount) VALUES (?, ?, ?, ?)",
      [orderDate, status, customerNumber, totalAmount]
    );

    const orderNumber = result.insertId;

    for (const item of cart) {
      await pool.query(
        "INSERT INTO orderdetails (orderNumber, productCode, quantityOrdered, priceEach) VALUES (?, ?, ?, ?)",
        [orderNumber, item.productCode, item.quantity || 1, item.price]
      );
    }

    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
};

export async function getOrderById(req, res) {
  const orderNumber = req.params.orderNumber;
  try {
    const [orderRows] = await pool.query('SELECT * FROM orders WHERE orderNumber = ?', [orderNumber]);
    const [details] = await pool.query('SELECT * FROM orderdetails WHERE orderNumber = ?', [orderNumber]);

    res.json({ order: orderRows[0], items: details });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order', error: err.message });
  }
}


export const getMyOrders = async (req, res) => {
  const customerNumber = req.user.customerNumber;

  try {
    const [orders] = await pool.query(
      "SELECT orderNumber, orderDate, status, totalAmount FROM orders WHERE customerNumber = ? ORDER BY orderDate DESC",
      [customerNumber]
    );

    for (let order of orders) {
      const [details] = await pool.query(
        `SELECT od.productCode, p.productName, p.productImage, od.quantityOrdered, od.priceEach
         FROM orderdetails od
         JOIN products p ON od.productCode = p.productCode
         WHERE od.orderNumber = ?`,
        [order.orderNumber]
      );
      order.items = details;
    }

    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ error: "Could not fetch orders" });
  }
};
