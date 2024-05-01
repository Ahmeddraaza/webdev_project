const Product = require("../models/Product");
var express = require("express");
var router = express.Router();


// Create a new product



router.post('/addproducts', async (req, res) => {
    try {
        const { Product_name,product_brand, quantity, price } = req.body;
        const newProduct = new Product({
            Product_name,
            product_brand,
            quantity,
            price
        });
        await newProduct.save();
        res.json({ msg: 'Product created successfully', data: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.delete('/products/:prod_id', async (req, res) => {
    try {
        const { prod_id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(prod_id);
        if (!deletedProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json({ msg: 'Product deleted successfully', data: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});


// Retrieve all products
router.get('/findproducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ msg: 'Products retrieved successfully', data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;