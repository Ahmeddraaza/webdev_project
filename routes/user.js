const express = require('express');
const router = express.Router();
const Users = require('../models/Employees'); // Assuming 'Employees.js' contains your User model

router.get('/getUser/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Destructure userId from req.params
    const user = await Users.findOne({ userId }); // Use Users (plural) instead of User
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
