const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors')

const app = express();
const router = require("./routes/index");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/webdevproject", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('Unable to connect to MongoDB:', error);
    });

// Routes
router.get('/', (req, res) => {
    res.render('index'); // Assuming you have an 'index.ejs' file in your views directory
});

// Other routes can be added here using router.get(), router.post(), etc.

// Mount the router

app.use('/', router);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
