const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const pool = require('../db');
const authenticate = require('../middleware/authenticateToken');

router.post('/upload', authenticate, upload.single('image'), async (req, res) => {
  const { name, price, description, total_stock, small, medium, large, category_id } = req.body;
  const { file } = req;

  if (!name || !price || !description || !total_stock || !category_id || !file) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const imageUrl = `/${file.filename}`;
    const seller_id = req.user.id; // Use the authenticated user's ID

    const query = `INSERT INTO products (name, price, image, description, total_stock, small, medium, large, category_id, seller_id) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // await pool.query(query, [name, price, imageUrl, description, total_stock, small, medium, large, category_id, seller_id]);

    await pool.query(query, [name, price, imageUrl, description, total_stock, small || null, medium || null, large || null, category_id, seller_id]);

    res.status(201).json({ message: 'Product uploaded successfully' });
  } catch (error) {
    console.error('Error uploading product:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// Fetch all products
router.get('/all', async (req, res) => {
  try {
    const query = `
      SELECT 
          p.id, 
          p.name, 
          p.price, 
          p.image, 
          p.description, 
          p.total_stock, 
          p.small, 
          p.medium, 
          p.large, 
          p.category_id, 
          p.seller_id, 
          c.name AS category_name, 
          s.name AS seller_name
      FROM 
          products p
      JOIN 
          categories c ON p.category_id = c.category_id
      JOIN 
          sellers s ON p.seller_id = s.seller_id
          `;
    const [products] = await pool.query(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
});


router.get('/seller', authenticate, async (req, res) => {
  const seller_id = req.user.id; // Get seller ID from the authenticated user

  try {
    const query = `
      SELECT p.id, p.name, p.price, p.image, p.description, p.total_stock, p.small, p.medium, p.large, p.category_id, c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      WHERE p.seller_id = ?
    `;
    const [products] = await pool.query(query, [seller_id]);

    if (products.length === 0) {
      return res.status(200).json({ message: 'No products found for this seller.' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
});

// Fetch products by category
router.get('/category/:category_id', async (req, res) => {
  const { category_id } = req.params;

  try {
    const query = `
      SELECT p.id, p.name, p.price, p.image, p.description, p.total_stock, p.small, p.medium, p.large, p.category_id, c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      WHERE p.category_id = ?
    `;
    const [products] = await pool.query(query, [category_id]);

    if (products.length === 0) {
      return res.status(200).json({ message: 'No products found for this category.' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
});

// Fetch product details by product ID
router.get('/:product_id', async (req, res) => {
  const { product_id } = req.params;

  try {
    const query = `
      SELECT p.id, p.name, p.price, p.image, p.description, p.total_stock, p.small, p.medium, p.large, p.category_id, c.name AS category_name, p.seller_id, s.name AS seller_name
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      JOIN sellers s ON p.seller_id = s.seller_id
      WHERE p.id = ?
    `;
    const [products] = await pool.query(query, [product_id]);

    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json(products[0]);
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
});

module.exports = router;
