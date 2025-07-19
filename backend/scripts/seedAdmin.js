// backend\scripts\seedAdmin.js

import bcrypt from 'bcryptjs';
import pool from '../models/db.js';

const email = 'admin@shoplive.com';
const password = bcrypt.hashSync('admin123', 10);
const role = 'admin';

const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';

pool.query(query, [email, password, role], (err, result) => {
  if (err) {
    console.error('❌ Failed to seed admin:', err);
  } else {
    console.log('✅ Admin user seeded successfully!');
  }
  process.exit();
});
