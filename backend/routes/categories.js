const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM categories');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
});

module.exports = router;