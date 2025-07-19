// backend\models\order.model.js

import pool from './db.js';

export async function createOrder(orderData) {
  const {
    customerNumber,
    orderDate,
    requiredDate,
    shippedDate,
    status,
    comments,
    orderDetails = [],
  } = orderData;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert into orders table
    const [orderResult] = await connection.query(
      `INSERT INTO orders (customerNumber, orderDate, requiredDate, shippedDate, status, comments)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [customerNumber, orderDate, requiredDate, shippedDate, status, comments]
    );

    const orderNumber = orderResult.insertId;

    // Insert order details
    for (const item of orderDetails) {
      await connection.query(
        `INSERT INTO orderdetails (orderNumber, productCode, quantityOrdered, priceEach, orderLineNumber)
         VALUES (?, ?, ?, ?, ?)`,
        [orderNumber, item.productCode, item.quantityOrdered, item.priceEach, item.orderLineNumber]
      );
    }

    await connection.commit();
    return orderNumber;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

export async function getOrderByNumber(orderNumber) {
  const [orderRows] = await pool.query(
    `SELECT * FROM orders WHERE orderNumber = ?`,
    [orderNumber]
  );

  const [details] = await pool.query(
    `SELECT * FROM orderdetails WHERE orderNumber = ?`,
    [orderNumber]
  );

  return { ...orderRows[0], orderDetails: details };
}
