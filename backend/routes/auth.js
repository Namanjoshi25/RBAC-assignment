// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/emailService');

// Register user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }



    // Create new user
    user = new User({
      name,
      email,
      password,
      role: 'user',

    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();
   
    res.status(200).json({msg:"User creation successfull"})

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(401).json({ msg: 'verify',verify:true });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    // Generate JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get current user
router.get('/currentUser', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.post('/preverification',async(req,res)=>{
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    const verificationToken = crypto.randomBytes(20).toString('hex');
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    await sendVerificationEmail(email, verificationToken, user.id);
   res.json({msg:"Please check your email"})
   

 
  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})
router.get('/verify/:userId/:token', async (req, res) => {
  try {
    const { userId, token } = req.params;
    
    // Find user by ID and token
    const user = await User.findOne({
      _id: userId,
      verificationToken: token
    });
    
    if (!user) {
      return res.status(400).json({ msg: 'Invalid verification link' });
    }
    
    // Update user verification status
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    
    res.status(200).json({ msg: 'Email verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;