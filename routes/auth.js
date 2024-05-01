const bcrypt = require("bcrypt");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")
const Users = require("../models/Employees")



router.post("/signUp", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Users.findOne({ email });
    if (user) return res.json({ msg: "USER EXISTS" });

    await Users.create({
      ...req.body,
      password: await bcrypt.hash(password, 5),
    });

    return res.json({ msg: "CREATED" });
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await Users.findOne({ email });
      if (!user) return res.json({ msg: "USER NOT FOUND" });
  
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) return res.json({ msg: "WRONG PASSWORD" });
  
      const token = jwt.sign(
        {
          _id: user._id,
          email,
          createdAt: new Date(),
          userType: user.userType
        },
        "MY_SECRET",
        { expiresIn: "1d" }
      );
  
      res.json({
        msg: "LOGGED IN",
        token,
      });
    } catch (error) {
      console.error(error);
    }
  });







    

/*router.post('/signup', async (req, res) => {
try {
    const checking = await collection.findOne({ name: req.body.name });

    if (checking) {
        // User already exists
        return res.send("User details already exist");
    }

    // User doesn't exist, insert data into MongoDB
    const newUser = new collection({
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 3)
    });
    
    // Validation for the 'name' field
    const nameRegex = /^(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/;
    if (!nameRegex.test(newUser.name)) {
        // Handle validation error, for example, send an error response
        return res.status(400).json({ error: "Name must contain one uppercase letter and a special character." });
    }
    
    // Continue with the rest of your code if validation passes
    // ...
    
    

    await newUser.save();
    return res.json({ msg: "CREATED" })

} catch (error) {
    // Handle errors more gracefully
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});
*/


module.exports = router