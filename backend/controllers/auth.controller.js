// backend\controllers\auth.controller.js

import pool from "../models/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {
      email,
      password,
      customerName,
      contactFirstName,
      contactLastName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state_id,
      postalCode,
      country_id
    } = req.body;

    const [[countryRow]] = await pool.query('SELECT name FROM countries WHERE id = ?', [country_id]);
    const [[stateRow]] = state_id
      ? await pool.query('SELECT name FROM states WHERE id = ?', [state_id])
      : [[]];

    const countryName = countryRow?.name || '';
    const stateName = stateRow?.name || null;

    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [userResult] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );
    const userId = userResult.insertId;

    const [maxCustomer] = await pool.query('SELECT MAX(customerNumber) AS max FROM customers');
    const newCustomerNumber = (maxCustomer[0]?.max || 1000) + 1;

    await pool.query(
      `INSERT INTO customers (
        customerNumber,
        customerName, contactFirstName, contactLastName, phone,
        addressLine1, addressLine2, city,
        state, state_id,
        postalCode,
        country, country_id,
        userId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newCustomerNumber,
        customerName, contactFirstName, contactLastName, phone,
        addressLine1, addressLine2 || null, city,
        stateName, state_id || null,
        postalCode || null,
        countryName, country_id,
        userId
      ]
    );

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ customerNumber: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({
      token,
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};
