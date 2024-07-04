const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');
const { generateToken } = require('../utilities/auth');
const router = express.Router();


// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const validRoles = ['seller', 'buyer'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role selected' });
  }

  try {
    // Check if the email already exists in either the sellers or buyers table
    const emailCheckQuery = 'SELECT email FROM sellers WHERE email = ? UNION SELECT email FROM buyers WHERE email = ?';
    const [emailRows] = await pool.query(emailCheckQuery, [email, email]);

    if (emailRows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Define the table based on the role
    const table = role === 'seller' ? 'sellers' : 'buyers';

    // Insert the user into the appropriate table
    const query = `INSERT INTO ${table} (name, email, password) VALUES (?, ?, ?)`;
    const [result] = await pool.query(query, [name, email, hashedPassword]);

    const token = generateToken({ id: result.insertId, email, role });
    res.status(201).json({ 
      message: 'Registration successful',
      token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user exists in the sellers table
    let sellerQuery = 'SELECT * FROM sellers WHERE email = ?';
    const [sellerRows] = await pool.query(sellerQuery, [email]);

    if (sellerRows.length > 0) {
      const user = sellerRows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = generateToken({ id: user.seller_id, email: user.email, role: 'seller' });
      return res.status(200).json({ 
        message: 'Login successful',
        token, 
        role: 'seller'
      });
    }

    // Check if the user exists in the buyers table
    let buyerQuery = 'SELECT * FROM buyers WHERE email = ?';
    const [buyerRows] = await pool.query(buyerQuery, [email]);

    if (buyerRows.length > 0) {
      const user = buyerRows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = generateToken({ id: user.buyer_id, email: user.email, role: 'buyer' });
      return res.status(200).json({ 
        message: 'Login successful',
        token, 
        role: 'buyer'
      });
    }

    // If the user is not found in either table
    return res.status(404).json({ message: 'Email does not exist. Please register.' });

  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
});

module.exports = router;
