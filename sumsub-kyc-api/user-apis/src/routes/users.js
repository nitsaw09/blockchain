const express = require("express");
const router = express.Router();
const db = require('../models');
const Users = db.users;

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await Users.create({ name, email, password })
        res.status(200).json({ user: newUser, message: 'User created successfully' });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;