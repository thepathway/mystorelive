

// backend/routes/location.routes.js
import express from 'express';
import { getCountries, getStatesByCountry, getCitiesByState } from '../controllers/location.controller.js';

const router = express.Router();

router.get('/countries', getCountries);
router.get('/states', getStatesByCountry);
router.get('/cities', getCitiesByState);

export default router;
