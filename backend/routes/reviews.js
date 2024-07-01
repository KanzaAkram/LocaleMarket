const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const authenticate = require('../middleware/authenticateToken'); 

// Add a review
router.post('/reviews', authenticate, async (req, res) => {
  const { message, product_id } = req.body;
  const buyer_id = req.user.id; // Assuming req.user contains the authenticated user info

  if (!message || !product_id) {
    return res.status(400).json({ message: 'Message and Product ID are required' });
  }

  try {
    const query = 'INSERT INTO reviews (message, product_id, buyer_id) VALUES (?, ?, ?)';
    await pool.query(query, [message, product_id, buyer_id]);
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
});

// Fetch reviews for a particular product
router.get('/:product_id', async (req, res) => {
    const { product_id } = req.params;
  
    try {
      const query = `
        SELECT r.review_id, r.message, r.product_id, r.buyer_id, b.name as buyer_name
        FROM reviews r
        JOIN buyers b ON r.buyer_id = b.buyer_id
        WHERE r.product_id = ?;
      `;
      const [rows] = await pool.query(query, [product_id]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No reviews found for this product' });
      }
  
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ message: 'Database error', error });
    }
  });

module.exports = router;
