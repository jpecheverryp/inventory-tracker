const express = require("express");
const { User } = require("../models");
const router = express.Router();
const { authenticateToken } = require('../utils/auth')
const userRoutes = require("./users")

router.use("/users", userRoutes)

router.get('/myusername', authenticateToken, async (req, res) => {
    const userData = await User.findByPk(req.user.userId, {
        attributes: {
            exclude: ['password']
        }
    })
    res.json(userData.username)
})

router.get('/', (req, res) => {
    res.send("hello world")
})



module.exports = router