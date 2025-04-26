// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const userRole = require('../middleware/userRole');
const User = require('../models/User');

// Get all users (admin only)
router.get('/', [auth, userRole('admin')], async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user role (admin only)
router.patch('/:id/role', [auth, userRole('admin')], async (req, res) => {
  try {
    const { role } = req.body;
    
    // Validate role
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ msg: 'Invalid role' });
    }
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    user.role = role;
    await user.save();
    
    res.json({ msg: 'User role updated', user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;