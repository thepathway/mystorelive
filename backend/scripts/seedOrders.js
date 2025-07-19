// backend\scripts\seedOrders.js

import pool from '../models/db.js';

const order = {
  orderNumber: 'ORD123456',
  orderDate: new Date(),
  status: 'Pending',
  customerNumber: 363 // make sure this user exists
};

async function seedOrder() {
  try {
    await pool.query(
      `INSERT INTO orders (orderNumber, orderDate, status, customerNumber)
       VALUES (?, ?, ?, ?)`,
      [order.orderNumber, order.orderDate, order.status, order.customerNumber]
    );
    console.log('✅ Sample order seeded.');
  } catch (err) {
    console.error('❌ Failed to seed order:', err);
  } finally {
    process.exit();
  }
}

seedOrder();
