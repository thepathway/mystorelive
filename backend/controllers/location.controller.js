// backend\controllers\location.controller.js


import pool from "../models/db.js";

// GET all countries
export const getCountries = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name FROM countries ORDER BY name");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch countries:", err);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
};

// GET states by countryId
export const getStatesByCountry = async (req, res) => {
  const { countryId } = req.query;
  if (!countryId) return res.status(400).json({ error: "Missing countryId" });

  try {
    const [rows] = await pool.query(
      "SELECT id, name FROM states WHERE country_id = ? ORDER BY name",
      [countryId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch states:", err);
    res.status(500).json({ error: "Failed to fetch states" });
  }
};

// GET cities by stateId
export const getCitiesByState = async (req, res) => {
  const { stateId } = req.query;
  if (!stateId) return res.status(400).json({ error: "Missing stateId" });

  try {
    const [rows] = await pool.query(
      "SELECT id, name FROM cities WHERE state_id = ? ORDER BY name",
      [stateId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch cities:", err);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
};
