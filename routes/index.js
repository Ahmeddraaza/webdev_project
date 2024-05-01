const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const productRouter = require("./product_index");
const orderouter = require("./order_index");
const userrouter = require("./user");

const authRouter = require("./auth");


//router.use("/products", productRouter);
//router.use("/order", orderouter);
//router.use("/Admin",adminrouter)
router.use("/auth", authRouter);
router.use("/user", userrouter);

module.exports = router;