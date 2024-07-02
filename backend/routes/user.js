const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const { generateToken } = require("../utilities/auth");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const validRoles = ["seller", "buyer"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role selected" });
  }

  try {
    // Check if the email already exists in either the sellers or buyers table
    const emailCheckQuery =
      "SELECT email FROM sellers WHERE email = ? UNION SELECT email FROM buyers WHERE email = ?";
    const [emailRows] = await pool.query(emailCheckQuery, [email, email]);

    if (emailRows.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Define the table based on the role
    const table = role === "seller" ? "sellers" : "buyers";

    // Insert the user into the appropriate table
    const query = `INSERT INTO ${table} (name, email, password) VALUES (?, ?, ?)`;
    const [result] = await pool.query(query, [name, email, hashedPassword]);

    const token = generateToken({ id: result.insertId, email, role });
    res.status(201).json({
      message: "Registration successful",
      token,
      role, // Include role in the response
    });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Search in both tables for the user
    let query =
      "SELECT * FROM sellers WHERE email = ? UNION SELECT * FROM buyers WHERE email = ?";
    const [rows] = await pool.query(query, [email, email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Determine the user's role based on which table they were found in
    const role = rows[0].hasOwnProperty("seller_specific_column")
      ? "seller"
      : "buyer";
    const token = generateToken({ id: user.id, email: user.email, role });
    res.status(200).json({
      message: "Login successful",
      token,
      role, // Include role in the response
    });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
});

module.exports = router;
