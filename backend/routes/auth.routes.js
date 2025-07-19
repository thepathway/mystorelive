// backend\routes\auth.routes.js

// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import pool from '../models/db.js';

// const  login = (req, res) => {
//   const { email, password } = req.body;

//   pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
//     if (err || results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

//     const user = results[0];
//     if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Wrong password' });

//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.json({ token });
//   });
// };

// export default login;

//backend\routes\auth.routes.js

import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const router = express.Router();
router.post('/login', login);
router.post('/register', register);
export default router;
