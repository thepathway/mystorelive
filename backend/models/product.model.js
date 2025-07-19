// backend\models\product.model.js

import pool from './db.js';

export async function getAllProducts() {
  const [rows] = await pool.query(`SELECT * FROM products`);
  return rows;
}

export async function getProductByCode(code) {
  const [rows] = await pool.query(`SELECT * FROM products WHERE productCode = ?`, [code]);
  return rows[0];
}

export async function createProduct(product) {
  const { productCode, productName, productDescription, productImage, price } = product;
  await pool.query(
    `INSERT INTO products (productCode, productName, productDescription, productImage, price)
     VALUES (?, ?, ?, ?, ?)`,
    [productCode, productName, productDescription, productImage, price]
  );
}

export async function updateProduct(code, product) {
  const { productName, productDescription, productImage, price } = product;
  await pool.query(
    `UPDATE products SET productName = ?, productDescription = ?, productImage = ?, price = ?
     WHERE productCode = ?`,
    [productName, productDescription, productImage, price, code]
  );
}

export async function deleteProduct(code) {
  await pool.query(`DELETE FROM products WHERE productCode = ?`, [code]);
}
