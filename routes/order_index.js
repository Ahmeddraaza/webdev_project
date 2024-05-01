const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Assuming you have an Order model

router.post('/addOrder', async (req, res) => {
    try {
        const { customerName, products} = req.body;

        // Check if products array is empty or not provided
        if (!products || products.length === 0) {
            return res.status(400).json({ msg: 'Products array cannot be empty' });
        }

        // Create a new order
        const order = new Order({ customerName, products});

        // Save the order
        await order.save();
        console.log('Order saved with total_amount:', order.total_amount);

        res.status(201).json({ msg: 'Order created successfully', order, total_amount: order.total_amount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error hai bc yea' });
    }
});

module.exports = router;
