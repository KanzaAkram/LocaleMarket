const express = require('express');
const router = express.Router();
const pool = require('../db'); // Adjust the path to your database connection
const authenticate = require('../middleware/authenticateToken'); // Middleware to authenticate the user

// // Place an order
// router.post('/', authenticate, async (req, res) => {
//     const { items } = req.body; // `items` is an array of objects with `product_id`, `category_id`, `quantity`, `price`
//     const buyer_id = req.user.id;

//     if (!items || !items.length) {
//         return res.status(400).json({ message: 'Order items are required' });
//     }

//     try {
//         // Calculate total price for the order
//         let total_price = 0;
//         items.forEach(item => {
//             total_price += item.price * item.quantity;
//         });

//         // Insert into orders table
//         const [orderResult] = await pool.query('INSERT INTO orders (buyer_id, total_price) VALUES (?, ?)', [buyer_id, total_price]);
//         const order_id = orderResult.insertId;

//         // Insert into order_items table
//         const orderItemsPromises = items.map(item => {
//             return pool.query('INSERT INTO order_items (order_id, product_id, category_id, quantity, price) VALUES (?, ?, ?, ?, ?)', 
//                 [order_id, item.product_id, item.category_id, item.quantity, item.price * item.quantity]);
//         });

//         await Promise.all(orderItemsPromises);

//         res.status(201).json({ message: 'Order placed successfully', order_id });
//     } catch (error) {
//         res.status(500).json({ message: 'Database error', error });
//     }
// });


// Place an order
router.post('/', authenticate, async (req, res) => {
    const { items, first_name, last_name, email_address, phone_number, address, payment_method } = req.body;
    const buyer_id = req.user.id;
    console.log(req.user)
    if (!items || !items.length) {
        return res.status(400).json({ message: 'Order items are required' });
    }
    console.log(buyer_id, items, first_name, last_name, email_address, phone_number, payment_method)

    try {
        // Calculate total price for the order
        let total_price = 0;
        items.forEach(item => {
            total_price += item.price * item.quantity;
        });

        // Insert into orders table
        const [orderResult] = await pool.query(
            'INSERT INTO orders (buyer_id, total_price, first_name, last_name, email_address, phone_number, address, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [buyer_id, total_price, first_name, last_name, email_address, phone_number, address, payment_method]
        );
        const order_id = orderResult.insertId;

        // Insert into order_items table
        const orderItemsPromises = items.map(item => {
            return pool.query(
                'INSERT INTO order_items (order_id, product_id, category_id, quantity, price) VALUES (?, ?, ?, ?, ?)', 
                [order_id, item.product_id, item.category_id, item.quantity, item.price * item.quantity]
            );
        });

        await Promise.all(orderItemsPromises);

        res.status(201).json({ message: 'Order placed successfully', order_id });
    } catch (error) {
        res.status(500).json({ message: 'Database error', error });
    }
});


module.exports = router;
