// backend/controllers/checkout.controller.js

import pool from '../models/db.js';

const { carts, cart_items, orders, orderdetails, customers, products } = pool;

exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id; // assuming req.user set from auth middleware
    const customer = await customers.findOne({ where: { userId } });
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    const cart = await carts.findOne({ where: { customerNumber: customer.customerNumber } });
    if (!cart) return res.status(400).json({ error: "No active cart found" });

    const items = await cart_items.findAll({ where: { cartId: cart.id } });
    if (!items.length) return res.status(400).json({ error: "Cart is empty" });

    // Create order
    const order = await orders.create({
      orderDate: new Date(),
      requiredDate: new Date(Date.now() + 7*24*60*60*1000), // 7 days later
      status: 'In Process',
      customerNumber: customer.customerNumber
    });

    // Create order details
    const orderDetailPromises = items.map(item => {
      return orderdetails.create({
        orderNumber: order.orderNumber,
        productCode: item.productCode,
        quantityOrdered: item.quantity,
        priceEach: /* fetch price from products table */,
        orderLineNumber: 1 // increment if multiple items
      });
    });

    await Promise.all(orderDetailPromises);

    // Clear cart
    await cart_items.destroy({ where: { cartId: cart.id } });
    await carts.destroy({ where: { id: cart.id } });

    res.json({ success: true, orderNumber: order.orderNumber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
