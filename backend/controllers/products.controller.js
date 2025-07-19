// backend\controllers\products.controller.js
import pool from "../models/db.js";


export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    const products = rows.map(product => ({
      ...product,
      productImage: product.productImage ? product.productImage.replace('/public', '') : null
    }));
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
};

export const getProductByCode = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE productCode = ?', [req.params.code]);
  if (rows.length === 0) return res.status(404).json({ message: 'Product not found' });
  res.json(rows[0]);
};

export const getProductsByCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    const [products] = await pool.query(`
      SELECT p.* 
      FROM products p
      JOIN productlines pl ON p.productLine = pl.productLine
      JOIN categories c ON pl.categoryId = c.id
      WHERE c.slug = ?
    `, [slug]);

    res.json(products);
  } catch (err) {
    console.error('Error fetching category products:', err);
    res.status(500).json({ error: 'Failed to fetch category products' });
  }
};

export const createProduct = async (req, res) => {
  const {
    productCode,
    productName,
    productLine,
    productScale,
    productVendor,
    productDescription,
    quantityInStock,
    buyPrice,
    MSRP,
    productImage
  } = req.body;

  try {
    await pool.query(
      'INSERT INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [productCode, productName, productLine, productScale, productVendor, productDescription, quantityInStock, buyPrice, MSRP, productImage]
    );
    res.status(201).json({ message: 'Product created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product', details: err });
  }
};

export const updateProduct = async (req, res) => {
  const {
    productName,
    productLine,
    productScale,
    productVendor,
    productDescription,
    quantityInStock,
    buyPrice,
    MSRP,
    productImage
  } = req.body;

  try {
    await pool.query(
      `UPDATE products 
       SET productName=?, productLine=?, productScale=?, productVendor=?, 
           productDescription=?, quantityInStock=?, buyPrice=?, MSRP=?, productImage=? 
       WHERE productCode=?`,
      [productName, productLine, productScale, productVendor, productDescription, quantityInStock, buyPrice, MSRP, productImage, req.params.code]
    );
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product', details: err });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE productCode = ?', [req.params.code]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product', details: err });
  }
};
