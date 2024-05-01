
const express = require('express');
const router = express.Router();
const Users=require("../models/Employees")  

const Orders= require("../models/order")
const Product=require("../models/Product")

router.post('/createEmployee',async (req, res) => {
try {
    const { email, password } = req.body;

    let user = await Users.findOne({ email });
    if (user) return res.json({ msg: "USER EXISTS" });

    await Users.create({
      ...req.body,
      password: await bcrypt.hash(password, 5),
    });
    
} catch (error) {
    
}


})






router.post('/deleteEmployee', async (req, res) => {    
try {
    const {email}=req.body; 
    await Users.findOneAndDelete({email:email});

} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server Error' });  
}}
)

router.get("/getProducts", async (req, res) => {
    try {
        const Products = await Product.find();
res.json(Products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }



})

router.get("/getOrders", async (req, res) => {

    try {
        
        const orders = await Orders.find();
        res.json(orders);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    });

    router.post('/deleteOrder', async (req, res) => {
try {
    await Orders.findOneAndDelete({orderId:req.body.orderId});
    res.status(200).json({ message: "Order deleted successfully" });
} catch (error) {
    res.status(500).json({ message: error.message });
}
})

router.post('/updateProduct', async (req, res) => {
try {
  const product=  await Product.find({prod_id:req.body.prod_id});
   if(!product) {return res.status(404).json({ message: "Product not found" });}
   await Product.findOneAndUpdate({prod_id:req.body.prod_id},req.body);
    return res.status(200).json({ message: "Product updated successfully" });
    
} catch (error) {
    
    console.error(error);}})


    module.exports = router;


