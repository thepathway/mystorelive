
// backend\scripts\seedProducts.js

import pool from '../models/db.js';

const products = [
  {
    productCode: 'P1001',
    productName: 'Wireless Mouse',
    productDescription: 'Ergonomic and battery-efficient mouse',
    productImage: '/uploads/mouse.jpg',
    price: 25.99
  },
  {
    productCode: 'P1002',
    productName: 'Mechanical Keyboard',
    productDescription: 'RGB backlit keys and tactile feedback',
    productImage: '/uploads/keyboard.jpg',
    price: 59.99
  }
];

async function seedProducts() {
  try {
    for (const product of products) {
      await pool.query(
        `INSERT INTO products (productCode, productName, productDescription, productImage, price)
         VALUES (?, ?, ?, ?, ?)`,
        [product.productCode, product.productName, product.productDescription, product.productImage, product.price]
      );
    }
    console.log('✅ Sample products seeded.');
  } catch (err) {
    console.error('❌ Failed to seed products:', err);
  } finally {
    process.exit();
  }
}

seedProducts();
