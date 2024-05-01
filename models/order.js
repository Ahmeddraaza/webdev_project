const mongoose = require('mongoose');
const Product = require('./Product'); // Import the Product model

const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    products: [{
        productname: {type: String, required: true},
        productId: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    total_amount: {type:Number,default: 0},
    createdAt: { type: Date, default: Date.now }
});

// Pre-save middleware to manage stock

OrderSchema.pre('save', async function(next) {
    try {
        let totalAmount = 0;
    
        // Update product quantities
        await Promise.all(this.products.map(async product => {
            const { productname, productId, quantity } = product;
            const foundProduct = await Product.findOne({ prod_id: productId });
            if (!foundProduct) throw new Error(`Product with ID ${productId} not found`);
            //const foundProduct_name = await Product.findOne({ Product_name: productname });
            //if (!foundProduct_name) throw new Error(`Product with name ${productname} not found`);
            if (foundProduct.quantity < quantity) throw new Error(`Insufficient stock for product ${foundProduct.name}`);
            totalAmount += foundProduct.price * quantity;

            // Reduce product quantity
            foundProduct.quantity -= quantity;
            await foundProduct.save();
        }));

        

        // Assign the total amount to the order
        this.total_amount = totalAmount;
        next();
    } catch (error) {
        next(error);
    }
});


const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
