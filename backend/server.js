const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();  // Initialize Express app

app.use(cors());  // Use CORS middleware

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());  // Use body-parser middleware to parse JSON requests

// Use route modules
app.use('/user', require('./routes/user'));
app.use('/product', require('./routes/product'));
app.use('/category', require('./routes/categories'));
app.use('/review', require('./routes/reviews'));
app.use('/orders', require('./routes/orders'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
